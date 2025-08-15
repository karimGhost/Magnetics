// app/layout.jsx
import { Geist, Geist_Mono } from 'next/font/google';
import './globals.css';
import LayoutWrapper from './LayoutWrapper'; // client component
import { Toaster } from "@/components/ui/toaster";
import InstallPrompt from '@/components/InstallPrompt';
import GoogleAd from '@/components/GoogleAd';

const geistSans = Geist({
  variable: '--font-geist-sans',
  subsets: ['latin'],
});

const geistMono = Geist_Mono({
  variable: '--font-geist-mono',
  subsets: ['latin'],
});

export const metadata = {
  title: 'Magnetics',
  description: 'Manage repair receipts, signatures, and client reminders.',
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <head>
      
      <script async src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-1948682636540486"
     crossorigin="anonymous"/>
         <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "LocalBusiness",
              name: "Magnetics Repair",
              url: "https://magneticsrepair.co.ke",
              telephone: "+254113287002",
              address: {
                "@type": "PostalAddress",
                addressCountry: "KE",
              },
              description: "Trusted repair services for electronics, fridges, TVs, and appliances across Kenya.",
            }),
          }}
        />
          <link rel="manifest" href="/manifest.json" />
      
        <link rel="apple-touch-icon" href="/apple-icon.png" />
          <title>Magnetics Repair – Expert Electronics & Appliance Repair in Kenya</title>
  <meta name="description" content="Trusted repair services for electronics, fridges, TVs, and appliances across Kenya. Quick, affordable, and professional." />
  <meta name="robots" content="index, follow" />
  <link rel="canonical" href="https://magneticsrepair.co.ke" />
        <meta name="theme-color" content="#ffffff" />
      </head>
      <body className={`${geistSans.variable} ${geistMono.variable} antialiased`}>
     <GoogleAd />

        <LayoutWrapper>{children}</LayoutWrapper>
        <Toaster />
      </body>
    </html>
  );
}
