import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Info, Target, Eye } from 'lucide-react';
import Image from 'next/image';

export function AboutUsSection() {
  return (
    <section id="about" className="w-full py-12 md:py-24 lg:py-32 bg-secondary/50">
      <div className="container px-4 md:px-6">
        <div className="flex flex-col items-center justify-center space-y-4 text-center mb-12">
          <div className="inline-block rounded-lg bg-primary/10 px-3 py-1 text-sm text-primary font-medium">
            Who We Are
          </div>
          <h2 className="text-3xl font-bold tracking-tighter sm:text-5xl text-primary">About Magnetics</h2>
          <p className="max-w-[900px] text-muted-foreground md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
            Magnetics is dedicated to providing top-tier repair services for a wide range of electronic devices. Our mission is to deliver reliable, efficient, and affordable solutions to keep your technology running smoothly.
          </p>
        </div>
        <div className="mx-auto grid items-start gap-8 sm:max-w-4xl sm:grid-cols-1 md:gap-12 lg:max-w-5xl lg:grid-cols-2">
          <div className="flex justify-center items-center">
            <Image 
              src={"/Image/Magnetics.png"  }
              alt="Magnetics" 
              width={500} 
              height={350} 
              className="rounded-xl shadow-lg object-cover"
              data-ai-hint="team working electronics"
            />
          </div>
          <div className="grid gap-6">
            <Card className="shadow-lg hover:shadow-xl transition-shadow">
              <CardHeader className="flex flex-row items-center gap-4">
                <Info className="w-8 h-8 text-accent" />
                <CardTitle className="text-xl">Our Mission</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground">
                  To provide exceptional repair services with a focus on quality, speed, and customer satisfaction. We aim to be the leading name in electronics repair, trusted by individuals and businesses alike.
                </p>
              </CardContent>
            </Card>
            <Card className="shadow-lg hover:shadow-xl transition-shadow">
              <CardHeader className="flex flex-row items-center gap-4">
                <Eye className="w-8 h-8 text-accent" />
                <CardTitle className="text-xl">Our Vision</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground">
                  To be a community cornerstone where technology problems are solved efficiently, fostering a world where device longevity is prioritized and e-waste is minimized.
                </p>
              </CardContent>
            </Card>
             <Card className="shadow-lg hover:shadow-xl transition-shadow">
              <CardHeader className="flex flex-row items-center gap-4">
                <Target className="w-8 h-8 text-accent" />
                <CardTitle className="text-xl">Our Values</CardTitle>
              </CardHeader>
              <CardContent>
                <ul className="list-disc list-inside text-muted-foreground space-y-1">
                  <li><strong>Integrity:</strong> Honest and transparent services.</li>
                  <li><strong>Expertise:</strong> Continuous learning and skill development.</li>
                  <li><strong>Customer Focus:</strong> Putting your needs first.</li>
                  <li><strong>Sustainability:</strong> Promoting repair over replacement.</li>
                </ul>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </section>
  );
}
