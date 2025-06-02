import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import LoginPopup from "@/components/LoginPopup"; // Import the LoginPopup component
import { auth, user } from "@/lib/firebase";
import LayoutWrapper from './LayoutWrapper'; // client component
import InstallPrompt from '@/components/InstallPrompt';

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata = {
  title: "Magnetics Shop",
  description: "Magnetics Reciept App",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
           <head>
        <link rel="manifest" href="/manifest.json" />
        <link rel="apple-touch-icon" href="/apple-icon.png" />
        <meta name="theme-color" content="#ffffff" />
      </head>
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
              {!user && <LoginPopup />}

<InstallPrompt />
        <LayoutWrapper>{children}</LayoutWrapper>
      </body>
    </html>
  );
}
