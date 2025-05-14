import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import LoginPopup from "@/components/LoginPopup"; // Import the LoginPopup component
import { auth, user } from "@/lib/firebase";
import LayoutWrapper from './LayoutWrapper'; // client component

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
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
              {!user && <LoginPopup />}

        <LayoutWrapper>{children}</LayoutWrapper>
      </body>
    </html>
  );
}
