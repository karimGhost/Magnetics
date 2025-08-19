import Image from "next/image";
import { Linkedin } from "lucide-react";
import { Twitter } from "next/dist/lib/metadata/types/twitter-types";
import { Github } from "lucide-react";
export default function TeamSection() {
  const team = [
    {
      name: "Samuel",
      role: "Co-Founder, Lead Engineer (Repair Specialist)",
      img: "https://i.pravatar.cc/200?img=1",
      linkedin: "#",
      twitter: "#",
    },
    {
      name: "Keneth",
      role: "CTO/MobileTech Lead Engineer (Repair Specialist) ",
      img: "https://i.pravatar.cc/200?img=2",
      linkedin: "#",
      twitter: "#",
    },
    {
      name: "Remmy",
      role: "Principal Engineer (Repair Specialist)",
      img: "https://i.pravatar.cc/200?img=3",
      linkedin: "#",
      twitter: "#",
    },
    {
      name: "Karim",
      role: "Chief Technology Officer && Software / computer software and hardware  Diagnostics Engineer",
      img: "https://i.pravatar.cc/200?img=4",
      linkedin: "#",
      github: "#",
    },
    {
      name: "Timmonah",
      role: "Master Technician (Carpentry, Electrical & General Repairs)  All-Round Specialist, Technical Craftsman,Field Engineer (Carpentry & Electrical) General Services Lead Operations & Maintenance Specialist Innovation & Repairs Expert",
      img: "https://i.pravatar.cc/200?img=5",
      linkedin: "#",
    },
  ];

  return (
    <section className="py-16 container mx-auto px-6">
      <h2 className="text-3xl font-bold text-center mb-12 text-primary">
        Meet the Team
      </h2>
      <div className="grid sm:grid-cols-2 md:grid-cols-3 gap-10">
        {team.map((member, i) => (
          <div
            key={i}
            className="bg-white rounded-2xl shadow-md p-6 flex flex-col items-center text-center hover:shadow-xl hover:-translate-y-1 transition"
          >
            <Image
              src={"/Image/engineer.png"}
              alt={member.name + "image"}
              width={180}
              height={180}
              className="rounded-full mb-4 object-cover"
            />
            <h3 className="text-xl font-semibold">{member.name}</h3>
            <p className="text-gray-600 text-sm mb-4">{member.role}</p>

            {/* Social Links */}
            <div className="flex gap-4">
              {member.linkedin && (
                <a href={member.linkedin} target="_blank" rel="noopener noreferrer">
                  {/* <Linkedin className="text-blue-600 hover:text-blue-800 w-5 h-5" /> */}
                  <h2></h2>
                </a>
              )}
              {member.twitter && (
                <a href={member.twitter} target="_blank" rel="noopener noreferrer">
                  {/* <Twitter className="text-sky-500 hover:text-sky-700 w-5 h-5" /> */}
                </a>
              )}
              {member.github && (
                <a href={member.github} target="_blank" rel="noopener noreferrer">
                  {/* <Github className="text-gray-700 hover:text-black w-5 h-5" /> */}
                </a>
              )}
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
