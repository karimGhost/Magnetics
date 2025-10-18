import Image from 'next/image';
import { Button } from '../ui/buttonn';
import Link from 'next/link';
import { Zap, ChevronRight } from 'lucide-react';
import GetQuotePopup from '../GetQuotePopup';
import { motion } from 'framer-motion';

import { useState } from 'react';
import TechHeading from './TechHeading';


const text = "Expert Tech Repair, Lightning Fast.";

const wordVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: {
      delay: i * 0.12,
      duration: 0.4,
      ease: 'easeOut',
    },
  }),
};
export function HeroSection() {




const [open, setOpen] = useState(false)
  return (
  <section className="w-full py-16 md:py-24 lg:py-32 bg-gradient-to-br from-primary/10 via-background to-background">
  <div className="container mx-auto px-4 md:px-6">
    <div className="grid items-center gap-8 lg:grid-cols-2 lg:gap-12">
      
      {/* Left side - Text */}
      <div className="flex flex-col justify-center space-y-6">
        <div className="space-y-4">
          <h1 className="text-4xl font-bold tracking-tight sm:text-5xl xl:text-6xl text-primary">
            Expert Tech Repair, Lightning Fast.
          </h1>
          <p className="max-w-[600px] text-muted-foreground md:text-xl">
            At MagenticsRepair, we revive your devices with precision and care. 
            From computers and smartphones to complex electronics, 
            trust our certified technicians to bring your devices back to life.
          </p>
        </div>

        {/* Buttons */}
        <div className="flex flex-col gap-3 sm:flex-row">
          <Button 
            onClick={() => setOpen(true)} 
            asChild 
            size="lg" 
            className="shadow-lg hover:shadow-xl transition-shadow"
          >
            <Link href="#quote">
              Get a Free Quote
              <ChevronRight className="ml-2 h-5 w-5" />
            </Link>
          </Button>
          <Button 
            asChild 
            variant="outline" 
            size="lg" 
            className="shadow-lg hover:shadow-xl transition-shadow"
          >
            <Link href="#services">
              Our Services
            </Link>
          </Button>
        </div>
      </div>

      {/* Right side - Image */}
      <div className="flex justify-center">
        <Image
          src="/Image/1.png"
          alt="Hero Image"
          width={600}
          height={500}
          className="rounded-2xl object-cover shadow-2xl w-full max-w-[500px] lg:max-w-[600px]"
          priority
        />
      </div>
    </div>
  </div>
</section>

  );
}
