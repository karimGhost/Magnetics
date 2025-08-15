import Link from 'next/link';
import { Separator } from '@/components/ui/separator';
import { Facebook, Instagram, Twitter, Music2 } from 'lucide-react'; // Music2 as TikTok placeholder
import { Wrench } from 'lucide-react';
import Image from 'next/image';
export function Footer() {
  const currentYear = new Date().getFullYear();
  return (
<footer className="w-full bg-muted text-muted-foreground py-8">
  <div className="container max-w-screen-xl mx-auto">
    {/* Top Section */}
    <div className="flex flex-col md:flex-row md:justify-between md:items-start gap-8 text-center md:text-left">
      
      {/* Logo + Description */}
      <div className="flex flex-col items-center md:items-start max-w-sm mx-auto md:mx-0">
        <Image
          alt="Magnetics"
          width={150}
          height={150}
          src="/Image/Logo.png"
          className="mb-4"
        />
        <p className="text-sm">
          Your trusted partner for all electronic repair needs. We bring your devices back to life!
        </p>
      </div>

      {/* Quick Links */}
      <div className="flex flex-col items-center lg:ml-[-200px] md:items-start space-y-2">
        <h3 className="text-lg font-semibold text-foreground mb-2 text-primary">
          Quick Links
        </h3>
        <Link href="/about" className="hover:text-primary">About Us</Link>
        <Link href="/services" className="hover:text-primary">Services</Link>
        <Link href="/contact" className="hover:text-primary">Contact</Link>
      </div>

      {/* Social Links */}
      <div className="flex flex-col items-center md:items-end">
        <h3 className="text-lg font-semibold text-foreground mb-2 text-primary">
          Follow Us
        </h3>
        <div className="flex space-x-4">
          <Link href="https://facebook.com" aria-label="Facebook" className="hover:text-primary" target="_blank">
            <Facebook size={20} />
          </Link>
          <Link href="https://instagram.com" aria-label="Instagram" className="hover:text-primary" target="_blank">
            <Instagram size={20} />
          </Link>
          <Link href="https://x.com" aria-label="Twitter/X" className="hover:text-primary" target="_blank">
            <Twitter size={20} />
          </Link>
          <Link href="https://tiktok.com" aria-label="TikTok" className="hover:text-primary" target="_blank">
            <Music2 size={20} />
          </Link>
        </div>
      </div>
    </div>

    {/* Divider */}
    <Separator className="my-4 bg-border" />

    {/* Bottom Section */}
    <div className="text-center text-sm space-y-1">
      <p>&copy; {currentYear} Magnetics. All rights reserved.</p>
      <p>Designed with care by Karim.</p>
    </div>
  </div>
</footer>


  );
}

  {/* <div>
            <h3 className="text-lg font-semibold text-foreground mb-2">Quick Links</h3>
            <ul className="space-y-1 text-sm">
              <li><Link href="#about" className="hover:text-primary">About Us</Link></li>
              <li><Link href="#services" className="hover:text-primary">Services</Link></li>
              <li><Link href="#testimonials" className="hover:text-primary">Testimonials</Link></li>
              <li><Link href="#contact" className="hover:text-primary">Contact Us</Link></li>
            </ul>
          </div> */}