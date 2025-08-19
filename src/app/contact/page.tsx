// app/contact/page.tsx  (App Router)
// or pages/contact.tsx  (Pages Router)

"use client";

import { useState } from "react";

export default function ContactPage() {
  const [form, setForm] = useState({ name: "", email: "", message: "" });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // TODO: integrate with Firestore, EmailJS, or backend API
    alert("Message sent! We’ll get back to you soon.");
    setForm({ name: "", email: "", message: "" });
  };

  return (
    <main className="min-h-screen bg-white text-gray-800" style={{marginTop:"80px"}}>
      {/* Hero */}
      <section className="relative bg-gradient-to-r from-indigo-500 via-green-600 to-green-500 text-white py-20">
        <div className="container mx-auto px-6 text-center">
          <h1 className="text-4xl md:text-6xl font-bold mb-6">Contact Us</h1>
          <p className="max-w-2xl mx-auto text-lg md:text-xl">
            Have questions or need a repair? Reach out to MagenticsRepair — we’re here to help.
          </p>
        </div>
      </section>

      {/* Contact Info + Form */}
      <section className="py-16 container mx-auto px-6 grid md:grid-cols-2 gap-12">
        {/* Contact Info */}
        <div>
          <h2 className="text-3xl font-bold mb-6">Get in Touch</h2>
          <p className="mb-4 text-gray-600">
            We’d love to hear from you! Contact us through the form or using the details below.
          </p>
          <ul className="space-y-4">
            <li>
              <strong>📍 Address:</strong> Nairobi, Kenya
            </li>
            <li>
              <strong>📞 Phone:</strong> +254703756305 / +254729222166
            </li>
            <li>
              <strong>📧 Email:</strong> support@magenticsrepair.com
            </li>
            <li>
              <strong>🕒 Hours:</strong> Mon–Sat: 9AM – 7PM
            </li>
          </ul>
        </div>

        {/* Contact Form */}
        <div>
          <h2 className="text-3xl font-bold mb-6">Send a Message</h2>
          <form onSubmit={handleSubmit} className="space-y-4">
            <input
              type="text"
              name="name"
              placeholder="Your Name"
              value={form.name}
              onChange={handleChange}
              required
              className="w-full p-3 border rounded-lg focus:ring-2 focus:ring-indigo-500"
            />
            <input
              type="email"
              name="email"
              placeholder="Your Email"
              value={form.email}
              onChange={handleChange}
              required
              className="w-full p-3 border rounded-lg focus:ring-2 focus:ring-indigo-500"
            />
            <textarea
              name="message"
              placeholder="Your Message"
              rows={5}
              value={form.message}
              onChange={handleChange}
              required
              className="w-full p-3 border rounded-lg focus:ring-2 focus:ring-indigo-500"
            ></textarea>
            <button
              type="submit"
              className="px-6 py-3 bg-green-600 text-white font-semibold rounded-xl shadow hover:bg-green-700 transition"
            >
              Send Message
            </button>
          </form>
        </div>
      </section>
    </main>
  );
}
