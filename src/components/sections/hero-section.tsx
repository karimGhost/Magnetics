import Image from 'next/image';
import { Button } from '@/components/ui/button';
import Link from 'next/link';
import { Zap, ChevronRight } from 'lucide-react';
import GetQuotePopup from '../GetQuotePopup';
import { useState } from 'react';
export function HeroSection() {

  const [open, setOpen] = useState(false)
  return (
    <section className="w-full py-12 md:py-24 lg:py-32 bg-gradient-to-br from-primary/10 via-background to-background">
      <div className="container px-4 md:px-6">
        <div className="grid gap-6 lg:grid-cols-[1fr_400px] lg:gap-12 xl:grid-cols-[1fr_600px]">
          <div className="flex flex-col justify-center space-y-4">
            <div className="space-y-2">
              <h1 className="text-4xl font-bold tracking-tighter sm:text-5xl xl:text-6xl/none text-primary">
                Expert Tech Repair, Lightning Fast.
              </h1>
              <p className="max-w-[600px] text-muted-foreground md:text-xl">
                At Magnetics , we revive your devices with precision and accuracy. From computers, smartphones to complex electronics, trust our certified technicians.
              </p>
            </div>

{
  
  <GetQuotePopup open={open}  setOpen={setOpen}/>

}

            <div className="flex flex-col gap-2 min-[400px]:flex-row">
              <Button onClick={() => setOpen(true)} asChild size="lg" className="shadow-lg hover:shadow-xl transition-shadow">
                <Link href="#quote">
                  Get a Free Quote
                  <ChevronRight className="ml-2 h-5 w-5" />
                </Link>
              </Button>
              <Button asChild variant="outline" size="lg" className="shadow-lg hover:shadow-xl transition-shadow">
                <Link href="#services">
                  Our Services
                </Link>
              </Button>
            </div>
          </div>
          <Image
           src= "/Image/1.png" // "https://placehold.co/600x400.png"
            alt="Hero Image"
            width={600}
            height={400}
            className="mx-auto aspect-video overflow-hidden rounded-xl object-cover sm:w-full lg:order-last lg:aspect-square shadow-xl"
            data-ai-hint="electronics repair tools"
          />
        </div>
      </div>
    </section>
  );
}
