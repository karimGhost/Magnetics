"use client";

import { useState, useEffect } from 'react';
import Image from 'next/image';
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/buttonn';
import { ChevronLeft, ChevronRight, Star, Quote } from 'lucide-react';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';

interface Testimonial {
  id: number;
  quote: string;
  author: string;
  role: string;
  avatarSrc: string;
  avatarFallback: string;
  rating: number;
  imageHint?: string;
}

const testimonialsData: Testimonial[] = [
  {
    id: 1,
    quote: "Magnetics  saved my laptop! Quick service and very professional. Highly recommend them for any tech issues.",
    author: "Sheilah Amwata",
    role: "Graphic Designer",
    avatarSrc: "https://placehold.co/100x100.png",
    avatarFallback: "SM",
    rating: 5,
    imageHint: "smiling woman",
  },
  {
    id: 2,
    quote: "My phone screen was shattered, and they fixed it within hours. Looks brand new! Amazing customer service.",
    author: "John ",
    role: "Student",
    avatarSrc: "https://placehold.co/100x100.png",
    avatarFallback: "JD",
    rating: 5,
    imageHint: "happy man",
  },
  {
    id: 3,
    quote: "The team at Magnetics  is incredibly knowledgeable. They diagnosed and resolved a complex software issue on my PC efficiently.",
    author: "Mary muthoni",
    role: "Software Engineer",
    avatarSrc: "https://placehold.co/100x100.png",
    avatarFallback: "LC",
    rating: 5,
    imageHint: "professional woman",
  },
];

export function TestimonialCarouselSection() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true);
  }, []);

  const handlePrev = () => {
    setCurrentIndex((prevIndex) => (prevIndex === 0 ? testimonialsData.length - 1 : prevIndex - 1));
  };

  const handleNext = () => {
    setCurrentIndex((prevIndex) => (prevIndex === testimonialsData.length - 1 ? 0 : prevIndex + 1));
  };
  
  if (!isClient) {
    // Render a placeholder or null on the server to avoid hydration mismatch
    return (
      <section id="testimonials" className="w-full py-12 md:py-24 lg:py-32 bg-background">
        <div className="container px-4 md:px-6 text-center">
          <h2 className="text-3xl font-bold tracking-tighter sm:text-5xl text-primary mb-2">Loading Testimonials...</h2>
        </div>
      </section>
    );
  }

  const currentTestimonial = testimonialsData[currentIndex];

  return (
 
       
  <section   id="testimonials" className="w-full py-16 md:py-24 lg:py-32 bg-gradient-to-br from-primary/10 via-background to-background">
  <div className="container mx-auto px-4 md:px-6">
         
        <div className="flex flex-col items-center justify-center space-y-4 text-center mb-12">
          <div className="inline-block rounded-lg bg-primary/10 px-3 py-1 text-sm text-primary font-medium">
            Client Voices
          </div>
          <h2 className="text-3xl font-bold tracking-tighter sm:text-5xl text-primary">Hear From Our Clients</h2>
          <p className="max-w-[900px] text-muted-foreground md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
            Our clients love our work. Read what they have to say about their experience with Magnetics .
          </p>
        </div>

        <div className="relative max-w-3xl mx-auto">
          <Card className="shadow-xl overflow-hidden">
            <CardHeader className="bg-primary/5 p-6 text-center">
               <Quote className="w-12 h-12 text-accent mx-auto mb-4" />
               <CardTitle className="text-2xl font-semibold leading-snug text-foreground">
                 &ldquo;{currentTestimonial.quote}&rdquo;
               </CardTitle>
            </CardHeader>
            <CardContent className="p-6">
              <div className="flex items-center justify-center space-x-1 mb-4">
                {Array(5).fill(0).map((_, i) => (
                  <Star
                    key={i}
                    className={`w-5 h-5 ${i < currentTestimonial.rating ? 'text-yellow-400 fill-yellow-400' : 'text-muted-foreground'}`}
                  />
                ))}
              </div>
            </CardContent>
            <CardFooter className="flex flex-col items-center justify-center p-6 pt-0 border-t bg-secondary/30">
                <Avatar className="w-16 h-16 mb-2 border-2 border-primary">
                  <AvatarImage src={currentTestimonial.avatarSrc} alt={currentTestimonial.author} data-ai-hint={currentTestimonial.imageHint} />
                  <AvatarFallback>{currentTestimonial.avatarFallback}</AvatarFallback>
                </Avatar>
                <p className="font-semibold text-lg text-primary">{currentTestimonial.author}</p>
                <p className="text-sm text-muted-foreground">{currentTestimonial.role}</p>
            </CardFooter>
          </Card>

          <Button
            variant="outline"
            size="icon"
            className="absolute left-0 top-1/2 -translate-y-1/2 -translate-x-12 rounded-full h-10 w-10 shadow-md hidden md:flex"
            onClick={handlePrev}
            aria-label="Previous testimonial"
          >
            <ChevronLeft className="w-6 h-6" />
          </Button>
          <Button
            variant="outline"
            size="icon"
            className="absolute right-0 top-1/2 -translate-y-1/2 translate-x-12 rounded-full h-10 w-10 shadow-md hidden md:flex"
            onClick={handleNext}
            aria-label="Next testimonial"
          >
            <ChevronRight className="w-6 h-6" />
          </Button>
          
          {/* Mobile buttons */}
          <div className="md:hidden flex justify-center mt-4 space-x-4">
             <Button
                variant="outline"
                size="icon"
                className="rounded-full h-10 w-10 shadow-md"
                onClick={handlePrev}
                aria-label="Previous testimonial"
              >
                <ChevronLeft className="w-6 h-6" />
              </Button>
              <Button
                variant="outline"
                size="icon"
                className="rounded-full h-10 w-10 shadow-md"
                onClick={handleNext}
                aria-label="Next testimonial"
              >
                <ChevronRight className="w-6 h-6" />
              </Button>
          </div>
        </div>
      </div>
    </section>
  );
}
