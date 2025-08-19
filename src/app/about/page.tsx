// app/about/page.tsx  (Next.js App Router)
// or pages/about.tsx  (Next.js Pages Router)

import Image from "next/image";
import TeamSection from "./Teamsection";

export default function AboutPage() {
  return (
    <main className="min-h-screen bg-white text-gray-800 mt-5" style={{marginTop:"80px"}}>
      {/* Hero Section */}
      <section className="relative bg-gradient-to-r from-indigo-500  via-green-700 to-green-500 text-white py-20">
        <div className="container mx-auto px-6 text-center">
          <h1 className="text-4xl md:text-6xl font-bold mb-6">About Us</h1>

          {/* Option 1 */}
          <p className="max-w-2xl mx-auto text-lg md:text-xl mb-4">
            Your trusted partner for all electronic repairs — from computers to
            phones, we bring your devices back to life.
          </p>

          {/* Option 2 */}
          <p className="max-w-2xl mx-auto text-lg md:text-xl mb-4">
            We’re your go-to team for electronic repairs. Whether it’s
            computers, phones, or more — we revive your devices and bring them
            back to life!
          </p>

          {/* Option 3 */}
          <p className="max-w-2xl mx-auto text-lg md:text-xl">
            Trusted experts in electronic repair — from phones to computers, we
            give your devices a second life.
          </p>
        </div>
      </section>

      {/* Mission Section */}
      <section className="py-16 container mx-auto px-6">
        <div className="grid md:grid-cols-2 gap-10 items-center">
          <div>
            <h2 className="text-3xl font-bold mb-4">Our Mission</h2>
            <p className="text-lg text-gray-600">
              At MagneticsRepair, our mission is to create a platform where creativity,
              connection, and innovation thrive. We believe in empowering people
              with tools that inspire collaboration and community.
            </p>
          </div>
          <div>
            <Image
              src="/Image/mission.png"
              alt="Our Mission"
              width={500}
              height={350}
              className="rounded-2xl shadow-lg"
            />
          </div>
        </div>
      </section>

      {/* Values Section */}
      <section className="bg-gray-50 py-16">
        <div className="container mx-auto px-6 text-center">
          <h2 className="text-3xl font-bold mb-12">Our Values</h2>
          <div className="grid md:grid-cols-3 gap-10">
            {[
              {
                title: "Innovation",
                desc: "We embrace creativity and encourage bold ideas.",
              },
              {
                title: "Integrity",
                desc: "We act with honesty and transparency in everything we do.",
              },
              {
                title: "Community",
                desc: "We foster an inclusive environment for all voices.",
              },
            ].map((value, i) => (
              <div
                key={i}
                className="p-6 bg-white rounded-2xl shadow-md hover:shadow-lg transition"
              >
                <h3 className="text-xl font-semibold mb-3">{value.title}</h3>
                <p className="text-gray-600">{value.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Team Section */}
     <TeamSection/>

      {/* CTA Section */}
      <section className="bg-green-700 text-white py-16">
        <div className="container mx-auto px-6 text-center">
        
          <p className="mb-6 text-lg">
            Reach out today and let’s build something amazing together.
          </p>
          <a
            href="/contact"
            className="px-6 py-3 bg-white text-indigo-600 font-semibold rounded-xl shadow hover:bg-gray-100 transition"
          >
            Contact Us
          </a>
        </div>
      </section>
    </main>
  );
}
