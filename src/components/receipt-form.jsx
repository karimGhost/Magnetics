"use client";

import * as React  from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { format } from "date-fns";
import { cn } from "@/lib/utils";
import { receiptFormSchema } from "@/lib/schemas/receipt";
import { useToast } from "@/hooks/use-toast";
import { generateSMSReminder } from "@/ai/flows/generate-sms-reminder";
import { useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { Textarea } from "@/components/ui/textarea";
import { SignatureInput } from "@/components/signature-input";
import { Icons } from "@/components/icons";

import { initializeApp } from "firebase/app";
import { getDatabase } from "firebase/database";

import { db } from "@/lib/firebasedb"; // adjust path as needed
import { ref, set } from "firebase/database";
import { v4 as uuidv4 } from "uuid"; // for unique ID
import { nullable } from "zod";
 import useUserAuth from "@/hooks/useUserAuth";
 import html2canvas from "html2canvas";
import jsPDF from "jspdf";
import { renderToStaticMarkup } from "react-dom/server";
import { InvoiceCard } from "./InvoicePreview";


export function ReceiptForm() {
  const { toast } = useToast();
  const [currentTime, setCurrentTime] = React.useState("");
  const [isSubmittingSms, setIsSubmittingSms] = React.useState(false);






    const {user, users } = useUserAuth();
 const username  =   users?.find((i) => i.uid === user?.uid)?.username ?? null;

  useEffect(() => {
    const now = new Date();
    setCurrentTime(format(now, "PPPp")); 
    
    const timerId = setInterval(() => {
       setCurrentTime(format(new Date(), "PPPp"));
    }, 60000);
    return () => clearInterval(timerId);
  }, []);


    // const technicianName = username?.replace("@gmail.com", "") ; // Replace with dynamic username later




async function generatePDF(data) {
  const container = document.createElement("div");
  container.innerHTML = renderToStaticMarkup(<InvoiceCard data={data} />);
  document.body.appendChild(container);

  const canvas = await html2canvas(container, { scale: 2 });
  const imgData = canvas.toDataURL("image/png");
  const pdf = new jsPDF("p", "mm", "a4");
  const imgProps = pdf.getImageProperties(imgData);
  const pdfWidth = pdf.internal.pageSize.getWidth();
  const pdfHeight = (imgProps.height * pdfWidth) / imgProps.width;

 
  
  document.body.removeChild(container); // clean up


  container.style.position = "fixed";
  container.style.left = "-9999px";
  container.innerHTML = renderToStaticMarkup(<InvoiceCard data={data} />);
  document.body.appendChild(container);


 

  // 🔽 Show preview & print in new window using same component
  const previewHtml = renderToStaticMarkup(<InvoiceCard data={data} />);
  const previewWindow = window.open("", "_blank", "width=800,height=1000");

  if (previewWindow) {
    previewWindow.document.write(`
      <html>
        <head>
          <title class="text-primary ">Magnetics Repair shop</title>
          <style>
            body {
              font-family: sans-serif;
              padding: 2rem;
              background: #fff;
            }
          </style>
        </head>
        <body onload="window.print()">
          ${previewHtml}
        </body>
      </html>
    `);
    previewWindow.document.close();
  } else {
    alert("Popup blocked. Please allow popups for this site.");
  }

 pdf.addImage(imgData, "PNG", 0, 0, pdfWidth, pdfHeight);
  pdf.save(`${data.clientName.replace(/\s+/g, "_")}_magnetics.pdf`);

    document.body.removeChild(container); // Clean up hidden render


}

  const form = useForm({
    resolver: zodResolver(receiptFormSchema),
    defaultValues: {
      clientName: "",
      technicianName: username?.toString() ,
      technicianSignature: "",
      clientSignature: "",
      itemName: "",
      itemDetails: "",
      price: 0, 
  advancepay: 0,    // ✅ must be present and coerced
      collectionDate: 0,
      repairDuration: "",
      clientPhoneNumber: "",
      technicianPhoneNumber: "",
    },
  });


  useEffect(() => {
  if (username) {
    form.reset({
      ...form.getValues(),
      technicianName: username,
    });
  }
}, [username]);



async function onSave(data) {
  console.log("Receipt Data:", data);
  if (!username) return;

  const uniqueId = uuidv4();
  const path = `/${username}/pendingRepairs/${data.clientName}/${uniqueId}`;

  // ✅ Sanitize/prepare data
  const preparedData = {
    ...data,
    collectionDate: data.collectionDate instanceof Date
      ? data.collectionDate.toISOString() // or .getTime()
      : data.collectionDate,
  };

  try {
    await set(ref(db, path), preparedData);

    toast({
      title: "Receipt Saved!",
      description: "Receipt data has been logged to the console.",
      variant: "default",
      className: "bg-accent text-accent-foreground",
    });

        await generatePDF(preparedData); // 🚀 Generate PDF here

  } catch (error) {
    console.error("Error saving data:", error);
    toast({
      title: "Failed to save data",
      description: "Receipt data was not saved.",
      variant: "default",
      className: "bg-accent text-accent-foreground",
    });
  }


}



  function onPrint() {
    window.print();
    toast({
      title: "Printing...",
      description: "Your browser's print dialog should appear.",
    });
  }

  async function onSendSms() {
    const values = form.getValues();
    if (!values.clientName || !values.itemName || !values.collectionDate || !values.technicianName) {
      toast({
        title: "Missing Information",
        description: "Please fill in Client Name, Item Name, Collection Date, and Technician Name to send an SMS.",
        variant: "destructive",
      });
      form.trigger(['clientName', 'itemName', 'collectionDate', 'technicianName']);
      return;
    }

    setIsSubmittingSms(true);
    try {
      const smsInput = {
        clientName: values.clientName,
        itemName: values.itemName,
        collectionDate: format(values.collectionDate, "yyyy-MM-dd"),
        technicianName: values.technicianName,
      };
      const result = await generateSMSReminder(smsInput);
      toast({
        title: "SMS Reminder Generated",
        description: (
          <pre className="mt-2 w-[340px] rounded-md bg-slate-950 p-4">
            <code className="text-white">{result.smsReminder}</code>
          </pre>
        ),
        duration: 9000, 
        className: "bg-accent text-accent-foreground",
      });
    } catch (error) {
      console.error("Error generating SMS:", error);
      toast({
        title: "Error Generating SMS",
        description: "Could not generate SMS reminder. Please try again.",
        variant: "destructive",
      });
    } finally {
      setIsSubmittingSms(false);
    }
  }

  const clientConsentText = "I hereby leave my item with Magnetics Repair Shop for repair. I understand that I must collect the item on or after the agreed collection date. I acknowledge the terms and authorize the repair process.";

  return (
    <Card className="w-full max-w-2xl mx-auto my-8 shadow-xl">
      <CardHeader>
        <CardTitle className="text-3xl font-bold text-primary">New Repair Receipt </CardTitle>
        <CardDescription>Fill in the details below to create a new repair receipt.</CardDescription>

        <div className="text-sm text-muted-foreground pt-2">
          <Icons.Clock className="inline-block mr-1 h-4 w-4" />
          Current Date & Time: {currentTime || "Loading..."}
        </div>
      </CardHeader>
      <CardContent>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSave)} className="space-y-8">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <FormField
                control={form.control}
                name="clientName"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Client Name</FormLabel>
                    <FormControl>
                      <Input placeholder="Martin " {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )} 
              />
              <FormField
                control={form.control}
                name="technicianName"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Technician Name</FormLabel>
                    <FormControl>
        <Input placeholder={username ?? "Technician Name"} {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>

            <FormField
              control={form.control}
              name="itemName"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Item Name</FormLabel>
                  <FormControl>
                    <Input placeholder="e.g., Laptop, Smartphone, Amplifier" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="itemDetails"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Item Details / Description of Problem</FormLabel>
                  <FormControl>
                    <Textarea
                      placeholder="Describe the item and the issue (e.g., 'iPhone 12, screen cracked, battery drains quickly')"
                      className="resize-y min-h-[100px]"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <FormField
                control={form.control}
                name="price"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Price (ksh)</FormLabel>
                    <FormControl>
                      <Input type="number" placeholder="150.00" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              
 <FormField
  control={form.control}
  name="advancepay"
  render={({ field }) => (
    <FormItem>
      <FormLabel>Advance Pay (Ksh)</FormLabel>
      <FormControl>
        <Input type="number" placeholder="e.g. 100" {...field} />
      </FormControl>
      <FormMessage />
    </FormItem>
  )}
/>

              <FormField
                control={form.control}
                name="collectionDate"
                render={({ field }) => (
                  <FormItem className="flex flex-col">
                    <FormLabel>Collection Date</FormLabel>
                    <Popover>
                      <PopoverTrigger asChild>
                        <FormControl>
                          <Button
                            variant={"outline"}
                            className={cn(
                              "w-full pl-3 text-left font-normal",
                              !field.value && "text-muted-foreground"
                            )}
                          >
                            {field.value ? (
                              format(field.value, "PPP")
                            ) : (
                              <span>Pick a date</span>
                            )}
                            <Icons.CalendarDays className="ml-auto h-4 w-4 opacity-50" />
                          </Button>
                        </FormControl>
                      </PopoverTrigger>
                      <PopoverContent className="w-auto p-0" align="start">
                        <Calendar
                          mode="single"
                          selected={field.value}
                          onSelect={field.onChange}
                          disabled={(date) => date < new Date(new Date().setDate(new Date().getDate() -1)) } 
                          initialFocus
                        />
                      </PopoverContent>
                    </Popover>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>

            <FormField
              control={form.control}
              name="repairDuration"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Duration to Complete Repair</FormLabel>
                  <FormControl>
                    <Input placeholder="e.g., 3-5 business days, 1 week" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <FormField
                control={form.control}
                name="clientPhoneNumber"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Client Phone Number</FormLabel>
                    <FormControl>
                      <Input type="tel" placeholder="+254 (000) 000-000" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="technicianPhoneNumber"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Technician Phone Number</FormLabel>
                    <FormControl>
                      <Input type="tel" placeholder="+254 (000) 000-000" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>

            <div className="space-y-4 rounded-md border border-border p-4 shadow-sm bg-secondary/30">
              <h3 className="text-lg font-semibold">Client Consent</h3>
              <p className="text-sm text-muted-foreground">{clientConsentText}</p>
              <FormField
                control={form.control}
                name="clientSignature"
                render={({ field }) => (
                  <FormItem>
                    <FormControl>
                      <SignatureInput label="Client Signature" id="clientSignature" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>

             <FormField
                control={form.control}
                name="technicianSignature"
                render={({ field }) => (
                  <FormItem>
                    <FormControl>
                      <SignatureInput label="Technician Signature" id="technicianSignature" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            
            <CardFooter className="flex flex-col sm:flex-row justify-end gap-3 p-0 pt-6">
              {/* <Button type="button" variant="outline" onClick={onPrint}>
                <Icons.Printer className="mr-2 h-4 w-4" />
                Print to PDF
              </Button> */}
              {/* <Button type="button" variant="outline" onClick={onSendSms} disabled={isSubmittingSms}>
                {isSubmittingSms ? (
                    <Icons.Clock className="mr-2 h-4 w-4 animate-spin" />
                ) : (
                    <Icons.Send className="mr-2 h-4 w-4" />
                )}
                Send SMS Reminder
              </Button> */}
              <Button type="submit" className="bg-primary hover:bg-primary/90 text-primary-foreground" disabled={form.formState.isSubmitting}>
                 {form.formState.isSubmitting ? (
                    <Icons.Clock className="mr-2 h-4 w-4 animate-spin" />
                ) : (
                    <Icons.Save className="mr-2 h-4 w-4" />
                )}
                Save Receipt
              </Button>
            </CardFooter>
          </form>
        </Form>
      </CardContent>
    </Card>
  );
}
