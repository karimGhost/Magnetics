import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Info, Target, Eye } from 'lucide-react';
import Image from 'next/image';

export const metadata = {
  title: "Contact Magnetics Repair – Get in Touch Today",
  description: "Reach out to Magnetics Repair for inquiries, service booking, and expert help with your electronics or appliances.",
  keywords: ["contact Magnetics Repair", "electronics repair contact", "book repair Kenya"],
  robots: "index, follow",
  alternates: {
    canonical: "https://magneticsrepair.co.ke/contact",
  },
};
export function AboutUsSection() {
  return (
<section   id="about" className="w-full py-16 md:py-24 lg:py-32 bg-gradient-to-br from-primary/10 via-background to-background">
  <div className="container mx-auto px-4 md:px-6">
    {/* Section Header */}
    <div className="flex flex-col items-center justify-center space-y-4 text-center mb-16">
      <div className="inline-block rounded-full bg-primary/10 px-4 py-1 text-sm font-medium text-primary">
        Who We Are
      </div>
      <h2 className="text-3xl md:text-5xl font-bold tracking-tight text-primary">
        About Magnetics
      </h2>
      <p className="max-w-3xl text-muted-foreground text-base md:text-lg lg:text-xl">
        Magnetics is dedicated to providing top-tier repair services for a wide
        range of electronic devices. Our mission is to deliver reliable,
        efficient, and affordable solutions to keep your technology running
        smoothly.
      </p>
    </div>

    {/* Content Grid */}
    <div className="flex justify-center">
      <div className="grid items-center gap-12 lg:grid-cols-2 lg:gap-16 max-w-6xl w-full">
        {/* Left: Image */}
        <div className="flex justify-center lg:justify-end">
          <Image
            src="/Image/Magnetics.png"
            alt="Magnetics Team"
            width={520}
            height={360}
            className="rounded-2xl shadow-xl object-cover"
            data-ai-hint="team working electronics"
          />
        </div>

        {/* Right: Cards */}
        <div className="grid gap-8">
          <Card className="shadow-lg hover:shadow-xl transition-shadow">
            <CardHeader className="flex flex-row items-center gap-4">
              <Info className="w-8 h-8 text-accent" />
              <CardTitle className="text-xl font-semibold">
                Our Mission
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-muted-foreground">
                To provide exceptional repair services with a focus on quality,
                speed, and customer satisfaction. We aim to be the leading name
                in electronics repair, trusted by individuals and businesses
                alike.
              </p>
            </CardContent>
          </Card>

          <Card className="shadow-lg hover:shadow-xl transition-shadow">
            <CardHeader className="flex flex-row items-center gap-4">
              <Eye className="w-8 h-8 text-accent" />
              <CardTitle className="text-xl font-semibold">
                Our Vision
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-muted-foreground">
                To be a community cornerstone where technology problems are
                solved efficiently, fostering a world where device longevity is
                prioritized and e-waste is minimized.
              </p>
            </CardContent>
          </Card>

          <Card className="shadow-lg hover:shadow-xl transition-shadow">
            <CardHeader className="flex flex-row items-center gap-4">
              <Target className="w-8 h-8 text-accent" />
              <CardTitle className="text-xl font-semibold">
                Our Values
              </CardTitle>
            </CardHeader>
            <CardContent>
              <ul className="list-disc list-inside text-muted-foreground space-y-2">
                <li>
                  <strong>Integrity:</strong> Honest and transparent services.
                </li>
                <li>
                  <strong>Expertise:</strong> Continuous learning and skill
                  development.
                </li>
                <li>
                  <strong>Customer Focus:</strong> Putting your needs first.
                </li>
                <li>
                  <strong>Sustainability:</strong> Promoting repair over
                  replacement.
                </li>
              </ul>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  </div>
</section>


  );
}
