"use"
// import { Header } from '@/components/layout/header';
// import { Footer } from '@/components/layout/footer';
import { HeroSection } from '@/components/sections/hero-section';
import { AboutUsSection } from '@/components/sections/about-us-section';
import { AchievementsSection } from '@/components/sections/achievements-section';
import { ServicesHighlightSection } from '@/components/sections/services-highlight-section';
import { TestimonialCarouselSection } from '@/components/sections/testimonial-carousel-section';
import { TechnicianDisplaySection } from '@/components/sections/technician-display-section';
import { SmartContentAssistantSection } from '@/components/sections/smart-content-assistant-section';
import { Separators } from '@/components/ui/separators';
import { Button } from '../ui/buttonn';
import { Card } from '../ui/card';
import { Icons } from '../icons';
import { Footer } from '@/components/layout/footer';

import { CardContent } from '../ui/card';
import Link from 'next/link';

export const metadata = {
  title: "About Us – Magnetics Repair Kenya",
  description: "Learn about Magnetics Repair, our mission, and why we're trusted by thousands across Kenya for reliable electronics and appliance repair.",
  keywords: ["about Magnetics Repair", "electronics technicians Kenya", "repair company info"],
  robots: "index, follow",
  alternates: {
    canonical: "https://magneticsrepair.co.ke/about",
  },
};
export default function TechnicianList() {
  return (

<div className="flex flex-col min-h-screen items-center -mt-[150px] lg:-mt-[200px] ">
  
      <main className="flex-grow">
        <HeroSection />
        <Separators decorative />
        <AboutUsSection />
        <Separators decorative />
        <AchievementsSection />
        <Separators decorative />
        <ServicesHighlightSection />
        <Separators decorative />
        <TestimonialCarouselSection />
        <Separators decorative />
        <TechnicianDisplaySection />
        <Separators decorative />
        <SmartContentAssistantSection />
      </main>
   <Footer /> 
    </div>
  );
}
