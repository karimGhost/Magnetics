// app/layout.jsx
import { Geist, Geist_Mono } from 'next/font/google';
import './globals.css';
import LayoutWrapper from './LayoutWrapper'; // client component
import { Toaster } from "@/components/ui/toaster";
import InstallPrompt from '@/components/InstallPrompt';

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
          <link rel="manifest" href="/manifest.json" />
      
        <link rel="apple-touch-icon" href="/apple-icon.png" />
        <meta name="theme-color" content="#ffffff" />
      </head>
      <body className={`${geistSans.variable} ${geistMono.variable} antialiased`}>
        <LayoutWrapper>{children}</LayoutWrapper>
        <Toaster />
      </body>
    </html>
  );
}
