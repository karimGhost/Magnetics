import Link from 'next/link';
import { Separator } from '@/components/ui/separator';
import { Facebook, Twitter, Instagram } from 'lucide-react';

export function Footer() {
  const currentYear = new Date().getFullYear();
  return (
    <footer className="w-full bg-muted text-muted-foreground py-8 " style={{alignItems:"center"}}>
      <div className="container max-w-screen-2xl">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-8">
          <div>
            <h3 className="text-lg font-semibold text-foreground mb-2">Magnetics </h3>
            <p className="text-sm">
              Your trusted partner for all electronic repair needs. We bring your devices back to life!
            </p>
          </div>
          {/* <div>
            <h3 className="text-lg font-semibold text-foreground mb-2">Quick Links</h3>
            <ul className="space-y-1 text-sm">
              <li><Link href="#about" className="hover:text-primary">About Us</Link></li>
              <li><Link href="#services" className="hover:text-primary">Services</Link></li>
              <li><Link href="#testimonials" className="hover:text-primary">Testimonials</Link></li>
              <li><Link href="#contact" className="hover:text-primary">Contact Us</Link></li>
            </ul>
          </div> */}
          <div style={{float:"right"}}>
            <h3 className="text-lg font-semibold text-foreground mb-2">Follow Us</h3>
            <div className="flex space-x-4">
              <Link href="#" aria-label="Facebook" className="hover:text-primary"><Facebook size={20} /></Link>
              <Link href="#" aria-label="Twitter" className="hover:text-primary"><Twitter size={20} /></Link>
              <Link href="#" aria-label="Instagram" className="hover:text-primary"><Instagram size={20} /></Link>
            </div>
          </div>
        </div>
        <Separator className="my-4 bg-border" />
        <div className="text-center text-sm">
          <p>&copy; {currentYear} Magnetics. All rights reserved.</p>
          <p>Designed with care by karim.</p>
        </div>
      </div>
    </footer>
  );
}
