import Image from 'next/image';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Wrench, Cpu, ShieldCheck } from 'lucide-react';
import useUserAuth from '@/hooks/useUserAuth';
import { useRouter } from 'next/navigation';
const technicians = [
  {
    name: "Alice Wonderland",
    specialization: "Mobile & Laptop Expert",
    avatarSrc: "https://placehold.co/150x150.png",
    avatarFallback: "AW",
    bio: "Alice has over 10 years of experience in diagnosing and repairing complex hardware issues in smartphones and laptops. She's passionate about bringing devices back to life.",
    skills: ["Screen Replacement", "Motherboard Repair", "Data Recovery"],
    imageHint: "female technician smiling",
  },
  {
    name: "Bob The Builder",
    specialization: "Software & Electronics Guru",
    avatarSrc: "https://placehold.co/150x150.png",
    avatarFallback: "BB",
    bio: "Bob is a master of software troubleshooting and intricate electronics repair. He can tackle anything from OS errors to faulty circuit boards.",
    skills: ["OS Installation", "Virus Removal", "Soldering", "Console Repair"],
    imageHint: "male technician tools",
  },
  {
    name: "Carol Danvers",
    specialization: "Lead Diagnostics Technician",
    avatarSrc: "https://placehold.co/150x150.png",
    avatarFallback: "CD",
    bio: "Carol excels at pinpointing the root cause of any tech problem. Her meticulous approach ensures accurate and efficient repairs.",
    skills: ["Advanced Diagnostics", "Quality Assurance", "Customer Consultation"],
    imageHint: "technician focused work",
  },
   {
    name: "David Lee",
    specialization: "Network & Systems Specialist",
    avatarSrc: "https://placehold.co/150x150.png",
    avatarFallback: "DL",
    bio: "David ensures all repaired devices are network-ready and systems perform optimally. He's our go-to for connectivity and performance issues.",
    skills: ["Network Setup", "System Optimization", "Security Audits"],
    imageHint: "asian technician smiling",
  },
];

export function TechnicianDisplaySection() {

  const {users} = useUserAuth();
  const router = useRouter();
  return (


  <section   id="techs" className="w-full py-16 md:py-24 lg:py-32 bg-gradient-to-br from-primary/10 via-background to-background">
  <div className="container mx-auto px-4 md:px-6">
        

        <div className="flex flex-col items-center justify-center space-y-4 text-center mb-12">
          <div className="inline-block rounded-lg bg-primary/10 px-3 py-1 text-sm text-primary font-medium">
            Our Experts
          </div>
          <h2 className="text-3xl font-bold tracking-tighter sm:text-5xl text-primary">Meet Our Skilled Technicians</h2>
          <p className="max-w-[900px] text-muted-foreground md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
            Our team of certified and experienced technicians is the backbone of Magnetics. Get to know the experts who will handle your devices with utmost care and precision.
          </p>
        </div>
        <div className="mx-auto grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {users.map((tech) => (
            <Card key={tech.username}  onClick={() => router.push(`/Profiles?id=${tech.id}`)} className="shadow-lg hover:shadow-xl transition-shadow transform hover:-translate-y-1 flex flex-col text-center">
              <CardHeader  className="items-center pt-6">
                <Avatar className="w-24 h-24 mb-4 border-4 border-primary shadow-md">
                  <AvatarImage src={tech.dp} alt={tech.username} data-ai-hint={tech.dp} />
                  <AvatarFallback>{tech.username?.slice(0, 1).toUpperCase()}</AvatarFallback>
                </Avatar>
                <CardTitle className="text-xl">{tech.username}</CardTitle>

   {Array.isArray(tech.skills) ? (
  tech.skills.map((skill) => (
    <CardDescription
      key={skill}
className="text-accent font-medium"    >
      {skill}
    </CardDescription>
  ))
) : tech.skills && typeof tech.skills === "object" ? (
  Object.entries(tech.skills).map(([key, value]) => (
    <CardDescription key={key} className="text-accent font-medium">
      <strong>{key}:</strong> {value}
    </CardDescription>
  ))
) : (
  <CardDescription className="text-accent font-medium">
    {tech.skills || "No skills listed."}
  </CardDescription>
)}

              </CardHeader>
              <CardContent className="flex-grow">
                <p className="text-sm text-muted-foreground mb-3">{tech.bio}</p>
                <div className="flex flex-wrap justify-center gap-2">
             
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
}
