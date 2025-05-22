import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Trophy, Zap, Users, CheckCircle } from 'lucide-react';

const achievements = [
  {
    icon: <Trophy className="w-10 h-10 text-accent" />,
    title: "10,000+ Devices Repaired",
    description: "Successfully brought over ten thousand devices back to full functionality, showcasing our expertise and reliability.",
  },
  {
    icon: <Zap className="w-10 h-10 text-accent" />,
    title: "98% Customer Satisfaction",
    description: "Our commitment to quality service is reflected in our high customer satisfaction ratings and positive feedback.",
  },
  {
    icon: <Users className="w-10 h-10 text-accent" />,
    title: "Certified Technicians",
    description: "Our team consists of industry-certified professionals dedicated to providing the best repair solutions.",
  },
  {
    icon: <CheckCircle className="w-10 h-10 text-accent" />,
    title: "Eco-Friendly Repairs",
    description: "We prioritize sustainable practices by repairing devices, reducing e-waste and promoting a greener planet.",
  },
];

export function AchievementsSection() {
  return (
    <section id="achievements" className="w-full py-12 md:py-24 lg:py-32 bg-background">
      <div className="container px-4 md:px-6">
        <div className="flex flex-col items-center justify-center space-y-4 text-center mb-12">
          <div className="inline-block rounded-lg bg-primary/10 px-3 py-1 text-sm text-primary font-medium">
            Our Milestones
          </div>
          <h2 className="text-3xl font-bold tracking-tighter sm:text-5xl text-primary">What We&apos;ve Achieved</h2>
          <p className="max-w-[900px] text-muted-foreground md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
            We are proud of our journey and the trust our customers place in us. Here are some of our key accomplishments.
          </p>
        </div>
        <div className="mx-auto grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {achievements.map((achievement, index) => (
            <Card key={index} className="shadow-lg hover:shadow-xl transition-shadow transform hover:-translate-y-1 flex flex-col">
              <CardHeader className="items-center text-center">
                {achievement.icon}
                <CardTitle className="mt-4 text-xl">{achievement.title}</CardTitle>
              </CardHeader>
              <CardContent className="text-center flex-grow">
                <p className="text-muted-foreground">{achievement.description}</p>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
}
