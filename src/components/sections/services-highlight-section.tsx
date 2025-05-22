import Image from 'next/image';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Smartphone, Laptop, Code, CircuitBoard, Wrench } from 'lucide-react';
import { Button } from '@/components/ui/button';
import Link from 'next/link';

const services = [
  {
    icon: <Smartphone className="w-10 h-10 text-accent" />,
    title: "Mobile Repair",
    description: "Screen replacements, battery issues, water damage, and more for all major smartphone brands.",
    imageSrc: "/Image/2.png",
    imageHint: "mobile phone repair screen",
  },
  {
    icon: <Laptop className="w-10 h-10 text-accent" />,
    title: "Laptop Repair",
    description: "Hardware upgrades, software troubleshooting, keyboard/trackpad fixes, and performance optimization.",
    imageSrc: "/Image/3.png",
    imageHint: "laptop open repair",
  },
  {
    icon: <Code className="w-10 h-10 text-accent" />,
    title: "Software Solutions",
    description: "OS installations, virus removal, data recovery, and software configuration for optimal performance.",
    imageSrc:"/Image/4.png",
    imageHint: "software code screen",
  },
  {
    icon: <CircuitBoard className="w-10 h-10 text-accent" />,
    title: "Electronics Repair",
    description: "Expert repairs for various electronics including gaming consoles, audio equipment, and other gadgets.",
    imageSrc: "/Image/5.png",
    imageHint: "electronic circuit board",
  },
];

export function ServicesHighlightSection() {
  return (
    <section id="services" className="w-full py-12 md:py-24 lg:py-32 bg-secondary/50">
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
        <div className="mx-auto grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {services.map((service) => (
            <Card key={service.title} className="shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1 flex flex-col overflow-hidden">
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
