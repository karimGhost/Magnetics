'use client';
import { useEffect, useState } from 'react';
import {
  Dialog,
  DialogTrigger,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
} from '@/components/ui/dialog';


import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"; // assuming shadcn/ui
import { ref, set, push } from 'firebase/database';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Button } from '@/components/ui/button';
import { dbmessage } from '@/lib/firebasedb';
import useUserAuth from '@/hooks/useUserAuth';
export default function GetQuotePopup({open, setOpen}) {
  // const [open, setOpen] = useState(false);

  // const handleSubmit = (e: React.FormEvent) => {
  //   e.preventDefault();
  //   // Handle form logic here (e.g., send to server or Firestore)
  //   alert('Quote request submitted!');
  //   setOpen(false);
  // };

const {user, users} = useUserAuth()

 const [topic, setTopic] = useState('');
  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const [email, setEmail] = useState('');
  const [description, setDescription] = useState('');



useEffect(()=> {
  if(!users){
    return;
  }
     console.log("assigned", users)

}, [users])

const [assignedUser , SetassignedUser] = useState(null);
const [assigneduid, Setassigneduid] = useState(null)
useEffect(() => {

  
  if(topic === "about phone"){
     console.log("assigned", users.find((user) => user.username === "keneth"))

  }

switch (topic) {
  case "about phone":
    SetassignedUser(users.find((user) => user.username === "keneth")?.username) ;
    Setassigneduid(users.find((user) => user.username === "keneth")?.uid);
    console.log("huj", users.find((user) => user.username === "keneth").uid)

    break;
  case "about software":
  case "about laptop":
    SetassignedUser( users.find((user) => user.username === "karim")?.username);
        Setassigneduid(  users.find((user) => user.username === "karim")?.uid);

    break;
  case "about home appliance":
    SetassignedUser(users.find((user) => user.username === "Samuel")?.username);
        Setassigneduid(users.find((user) => user.username === "Samuel")?.uid);

    break;
  case "about electronics":
    SetassignedUser(users.find((user) => user.username === "REMMY")?.username);
        Setassigneduid(users.find((user) => user.username === "REMMY")?.uid);

    break;
  break;
  default:
  SetassignedUser(null);
        Setassigneduid(null);}
     
console.log("loggsin", assignedUser)
}, [topic])

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();


   
     if (!users) return alert('User not logged in');


  if (!topic) {
    alert("Please select a topic.");
    return;
  }

  if(!users){
    return;
  }

console.log("logg", assignedUser)


alert(users.find((user) => user.username === "remi"))

    const newNotifRef = push(ref(dbmessage, `notif/${assignedUser}`));
    await set(newNotifRef, {
      name,
      uid: assigneduid,
      phone,
      email,
      topic,
      description,
      createdAt: new Date().toISOString(),
    });

    alert('Quote request submitted!');
    setOpen(false);
    // Optional: Reset fields
    setTopic('');
    setName('');
    setPhone('');
    setEmail('');
    setDescription('');
  };





  return (
     <Dialog open={open} onOpenChange={setOpen}>
      <DialogContent className="sm:max-w-md" style={{zIndex:"300"}}>
        <DialogHeader>
          <DialogTitle>Get Your Free Quote</DialogTitle>
          <DialogDescription>
            Fill out the form below and we’ll get back to you shortly.
          </DialogDescription>
        </DialogHeader>

        <form onSubmit={handleSubmit} className="space-y-4">
          <Input
            type="text"
            placeholder="Your Name"
            required
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
          <Input
            type="number"
            placeholder="Your phone number"
            required
            value={phone}
            onChange={(e) => setPhone(e.target.value)}
          />
          <Input
            type="email"
            placeholder="Email Address"
            required
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />

         
<Select onValueChange={(val) => setTopic(val)}>
  <SelectTrigger className="w-full">
    <SelectValue placeholder="Select a topic" />
  </SelectTrigger>
  <SelectContent>
    <SelectItem value="about phone" className="hover:bg-green-100">About Phone</SelectItem>
    <SelectItem value="about software" className="hover:bg-green-100">About Software</SelectItem>
    <SelectItem value="about laptop" className="hover:bg-green-100">About Laptop</SelectItem>
    <SelectItem value="about electronics" className="hover:bg-green-100">About Electronics</SelectItem>
    <SelectItem value="about home appliance" className="hover:bg-green-100">About Home Appliance</SelectItem>
  </SelectContent>
</Select>

          <Textarea
            placeholder="Describe your issue..."
            required
            rows={4}
            value={description}
            onChange={(e) => setDescription(e.target.value)}
          />

          <DialogFooter className="gap-2">
            <Button type="button" variant="outline" onClick={() => setOpen(false)}>
              Cancel
            </Button>
            <Button style={{background:"#228C22"}} type="submit" className=" hover:bg-green-700 text-white">
              Submit
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}
