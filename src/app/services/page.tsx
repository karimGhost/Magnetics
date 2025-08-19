// app/services/page.tsx  (App Router)
// or pages/services.tsx  (Pages Router)

import Image from "next/image";

export default function ServicesPage() {
  return (
    <main className="min-h-screen bg-white text-gray-800" style={{marginTop:"80px"}}>
      {/* Hero Section */}
      <section className="relative bg-gradient-to-r from-indigo-500 via-green-600 to-green-500 text-white py-20">
        <div className="container mx-auto px-6 text-center">
          <h1 className="text-4xl md:text-6xl font-bold mb-6">Our Services</h1>
          <p className="max-w-2xl mx-auto text-lg md:text-xl">
            At MagenticsRepair, we bring your devices back to life with expert
            repair services for all your electronics.
          </p>
        </div>
      </section>

      {/* Services Grid */}
      <section className="py-16 container mx-auto px-6">
        <h2 className="text-3xl font-bold text-center mb-12">
          What We Offer
        </h2>

        <div className="grid md:grid-cols-3 gap-10">
          {[
            {
              title: "Phone Repair",
              desc: "Screen replacements, battery changes, charging issues, and more for all major brands.",
              img: "/Image/2.png",
            },
            {
              title: "Computer & Laptop Repair",
              desc: "Hardware upgrades, virus removal, system optimization, and motherboard fixes.",
              img: "/Image/3.png",
            },
            {
              title: "Tablet & iPad Repair",
              desc: "Cracked screens, battery issues, software problems, and more.",
              img: "/Image/2.png",
            },
            {
              title: "Accessories & Parts",
              desc: "Chargers, cables, protective cases, and genuine replacement parts.",
              img: "/Image/6.png",
            },
            {
              title: "Data Recovery",
              desc: "Lost your files? We help retrieve data from damaged or corrupted devices.",
              img: "/Image/4.png",
            },
            {
              title: "Other Electronics",
              desc: "We also handle TVs, gaming consoles, and other home electronics.",
              img: "/Image/5.png",
            },
          ].map((service, i) => (
            <div
              key={i}
              className="bg-white rounded-2xl shadow-md hover:shadow-lg transition p-6 text-center"
            >
              <Image
                src={service.img}
                alt={service.title}
                width={400}
                height={250}
                className="rounded-xl mx-auto mb-4"
              />
              <h3 className="text-xl font-semibold mb-2">{service.title}</h3>
              <p className="text-gray-600">{service.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* CTA Section */}
      <section className="bg-green-600 text-white py-16">
        <div className="container mx-auto px-6 text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            Need a repair today?
          </h2>
          <p className="mb-6 text-lg">
            Visit us at MagenticsRepair or book your service online. Your device
            deserves a second life!
          </p>
          <a
            href="/contact"
            className="px-6 py-3 bg-white text-green-600 font-semibold rounded-xl shadow hover:bg-gray-100 transition"
          >
            Book a Repair
          </a>
        </div>
      </section>
    </main>
  );
}
