"use client";
import Image from 'next/image';
import React, {useState} from 'react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Smartphone, Laptop, Code, CircuitBoard, Wrench } from 'lucide-react';
import { Button } from '@/components/ui/button';
import Link from 'next/link';
import ApplianceGrid from '../ApplianceGrid';
const services = [
  {
    icon: <Smartphone className="w-10 h-10 text-accent" />,
    title: "Mobile Repair",
    description: "Screen replacements, battery issues, water damage, and more for all major smartphone brands.",
    imageSrc: "/Image/2.png",
    imageHint: "mobile phone repair screen",
        name: "Mobile Repairing",
image:"/Image/1.png",
 descrip : "📱 Mobile Phone Repairs at Magnetics Repair\n\nAt Magnetics Repair, we offer fast, professional mobile phone repairs backed by expert technicians and quality parts. Here's how we bring your phone back to life:\n\n🔍 1. Free Diagnosis\nWe begin with a , no-obligation diagnostic check to identify hardware or software issues — whether it's a cracked screen, battery drain, unresponsive buttons, or charging problems.\n\n🛠️ 2. Expert Repair by Certified Technicians\nOur trained specialists use advanced tools to perform precision repairs. From screen and battery replacements to camera, speaker, and charging port fixes, we handle all brands including iPhone, Samsung, OnePlus, Xiaomi, and more.\n\n🔄 3. Genuine Parts & Seamless Integration\nWe use OEM-quality or genuine replacement parts to ensure optimal performance and compatibility — no glitches, no slowdowns, no compromise.\n\n✅ 4. Rigorous Quality Checks\nEvery repaired device undergoes multi-point testing before handover. We ensure your phone works just as smoothly as it did on day one.\n\n🚀 5. Quick Turnaround & Warranty\nMost repairs are done within the same day, and we provide a warranty on all repair work for your peace of mind.\n\n🛡️ Why Choose Magnetics Repair?\n✔ Fast service\n✔ Transparent pricing\n✔ Skilled technicians\n✔ Quality you can trust",

    id: 1,
  },

  {
    icon: <Laptop className="w-10 h-10 text-accent" />,
    title: "Laptop Repair",
    description: "Hardware upgrades, software troubleshooting, keyboard/trackpad fixes, and performance optimization.",
    imageSrc: "/Image/3.png",
    imageHint: "laptop open repair",
     name: "Laptop Repairing",
    image:"/Image/2.png",
    descrip : "💻 Laptop Repairs at Magnetics Repair\nAt Magnetics Repair, we specialize in fast, reliable laptop repairs to get you back on track — whether you're working, studying, or gaming. Here’s how we restore your device with precision:\n\n🔍 1.  Comprehensive Diagnosis\nWe begin every repair with a free diagnostic check. Whether it’s a slow system, broken screen, overheating, battery issue, or software glitch — we identify the root cause accurately.\n\n🛠️ 2. Certified Technicians, Expert Repairs\nOur experienced technicians handle all major brands — Dell, HP, Lenovo, Apple MacBooks, Asus, Acer, and more. From hardware replacements (screens, fans, keyboards, SSDs) to OS recovery and virus removal, we do it all with care.\n\n🔄 3. Genuine Parts, Seamless Performance\nWe use high-quality OEM or genuine parts to ensure your laptop performs like new — no slowdowns, no short-term fixes, just long-lasting results.\n\n✅ 4. Quality Control & Testing\nEvery repaired laptop undergoes extensive quality testing. We check everything from boot speed to battery life, display, and system stability before it's handed back.\n\n🚀 5. Quick Turnaround + Warranty\nMost repairs are done same-day or next-day, and every service is backed by a warranty for your peace of mind.\n\n🛡️ Why Choose Magnetics Repair?\n✔ Fast & professional service\n✔ Transparent pricing\n✔ Certified experts\n✔ Trusted by 1000s of customers\n✔ Warranty-backed repairs",
    id: 2,
  },
  {
    icon: <Code className="w-10 h-10 text-accent" />,
    title: "Software Solutions",
    description: "OS installations, virus removal, data recovery, and software configuration for optimal performance.",
    imageSrc:"/Image/4.png",
    imageHint: "software code screen",
     name: "Software  solutions ",
image:"/Image/3.png",
 descrip :"🖥️ Software Solutions at Magnetics Repair\n\nAt Magnetics Repair, we provide expert software support to keep your devices running smoothly and securely. Whether you're dealing with performance issues or need a fresh setup, we've got you covered.\n\n🛠️ 1. Operating System (OS) Installation\nWe offer clean, secure OS installations for Windows, macOS, and Linux systems. From fresh installs to upgrades, we ensure your device is ready to perform.\n\n🦠 2. Virus & Malware Removal\nGot a sluggish PC or strange pop-ups? Our advanced tools eliminate viruses, malware, spyware, and adware — restoring both performance and peace of mind.\n\n💾 3. Data Recovery & Backup\nAccidentally deleted files or dealing with a corrupted drive? We specialize in safe data recovery and help you set up reliable backups to avoid future loss.\n\n⚙️ 4. Software Setup & Optimization\nWe install and configure essential software (MS Office, drivers, editing tools, etc.) and fine-tune your system for speed, stability, and security.\n\n🚀 Fast Turnaround + Expert Support\nMost services are completed the same day. We ensure everything runs smoothly before handing it back to you.\n\n🛡️ Why Choose Magnetics Repair?\n✔ Skilled software technicians\n✔ Secure & privacy-respecting service\n✔ Transparent pricing\n✔ Support for all major platforms\n✔ Trusted by 1000s of happy clients",
    id: 3,
  },
  {
    icon: <CircuitBoard className="w-10 h-10 text-accent" />,
    title: "Electronics Repair",
        description: "Expert repairs for various electronics including  consoles, audio equipment, and other gadgets.",

 descrip : "🔧 Electronics Repairs at Magnetics Repair\n\nAt Magnetics Repair, we specialize in expert repairs for a wide range of electronic devices. Whether it's your gaming console, audio equipment, or other essential gadgets — we bring them back to life with precision and care.\n\n🎮 1. Console Repairs\nFrom PlayStation and Xbox to Nintendo Switch, we fix overheating, HDMI issues, power failures, disk read errors, and more — ensuring a smooth gaming experience.\n\n🎧 2. Audio Equipment Servicing\nWe repair headphones, speakers, amplifiers, and sound systems. Whether it's distortion, connectivity issues, or power faults — your audio gear is in safe hands.\n\n🔌 3. Other Electronics & Gadgets\nSmart home devices, digital cameras, smartwatches, drones, and more — we diagnose and repair a wide range of modern tech devices quickly and professionally.\n\n🛠️ Certified Technicians & Genuine Parts\nOur experts use top-grade tools and quality parts to ensure lasting performance and reliability.\n\n✅ Multi-Point Testing\nEvery repair goes through rigorous testing before it's returned — no guesswork, just guaranteed results.\n\n🚀 Fast Turnaround + Warranty\nWe aim for same-day or next-day service and back every repair with a warranty for your peace of mind.\n\n🛡️ Why Choose Magnetics Repair?\n✔ Skilled & certified tech specialists\n✔ Transparent pricing\n✔ Support for various electronics\n✔ Trusted by thousands of tech users",
    imageSrc: "/Image/5.png",
    imageHint: "electronic circuit board",
     name: "Electronic Repair",
image:"/Image/5.png",

    id: 4,
  },

   {
    icon: <Wrench className="w-10 h-10 text-accent" />,
    title: "Home Appliancess",
    description: "We specialize in repairing refrigerators, washing machines, ovens, dryers, microwaves, and more — fast, affordable, and reliable.",
    imageSrc: "/Image/6.png",
    imageHint: "Home Appliancess",
    id: 5,
 descrip :"🛠️ Home Appliance Repairs at Magnetics Repair\n\nWe specialize in repairing all major home appliances — fast, affordable, and reliable. Whether it’s your refrigerator, washing machine, or microwave, we get it working like new again.\n\n🧊 1. Refrigerator Repairs\nFrom cooling issues to compressor or defrost problems, we service all brands quickly to keep your food fresh and safe.\n\n🧺 2. Washing Machines & Dryers\nWe handle everything from drum issues and water leaks to electrical faults. Whether it's top-load, front-load, or dryer combos — we've got you covered.\n\n🔥 3. Oven & Microwave Repairs\nIf your oven won’t heat or the microwave isn’t working, we fix heating elements, control panels, and more — restoring full kitchen function.\n\n🔧 4. Other Appliances\nDishwashers, freezers, cooktops, and more — we provide expert repair for a wide range of appliances to keep your home running smoothly.\n\n✅ Certified Technicians & Genuine Parts\nOur experienced team uses high-quality tools and manufacturer-approved parts for every job.\n\n🚀 Fast Turnaround + Warranty\nMost repairs are completed same-day or next-day, and all work is backed by a service warranty.\n\n🛡️ Why Choose Magnetics Repair?\n✔ Prompt & professional service\n✔ Upfront pricing\n✔ Skilled, certified technicians\n✔ Trusted for home comfort & safety",
     name: "Home Appliancess",
image:"/Image/6.png",
  },
];

export function ServicesHighlightSection() {

    const [selected, setSelected] = useState(null);

  return (
    <section  id="services" className="w-full py-12 md:py-24 lg:py-32 bg-secondary/50" >
      <div className="container px-4 md:px-6">
        <div className="flex flex-col items-center justify-center space-y-4 text-center mb-12">
          <div className="inline-block rounded-lg bg-primary/10 px-3 py-1 text-sm text-primary font-medium">
            Our Expertise
          </div>
          <h2 className="text-3xl font-bold tracking-tighter sm:text-5xl text-primary">What We Fix</h2>
          <p className="max-w-[900px] text-muted-foreground md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
            We offer comprehensive repair services for a wide array of devices, ensuring your tech is always in top condition.
          </p>
        </div>

         <ApplianceGrid    selected={selected} setSelected = {setSelected}
 />
        
        <div className="mx-auto grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {services.map((service) => (
            <Card  key={service.title} onClick={() => setSelected(service)} className="shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1 flex flex-col overflow-hidden">
              <div className="relative w-full h-48">
                <Image
                  src={service.imageSrc}
                  alt={service.title}
                  layout="fill"
                  objectFit="cover"
                  data-ai-hint={service.imageHint}
                />
              </div>
              <CardHeader className="items-center text-center pt-6">
                {service.icon}
                <CardTitle className="mt-4 text-xl">{service.title}</CardTitle>
              </CardHeader>
              <CardContent className="text-center flex-grow">
                <CardDescription>{service.description}</CardDescription>
              </CardContent>
              <div className="p-6 pt-0">
                 <Button variant="outline" className="w-full" asChild>
                    <Link href={`#quote?service=${encodeURIComponent(service.title)}`}>Learn More</Link>
                  </Button>
              </div>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
}
