import Link from 'next/link';
import { Facebook, Twitter, Linkedin } from 'lucide-react';
import Image from 'next/image';

export default function Footer() {
  return (
    <footer className="bg-card border-t mt-16">
      <div className="container mx-auto py-12 px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          <div className="space-y-4">
            <Link href="/" className="flex items-center gap-2">
               <Image src="https://www.buildersinfo.in/_next/image?url=%2Flogo.png&w=256&q=75" alt="BuildersInfo Logo" width={140} height={35} />
            </Link>
            <p className="text-muted-foreground text-sm">Your one-stop solution for construction and real estate information.</p>
          </div>
          <div>
            <h3 className="text-sm font-semibold text-foreground tracking-wider uppercase">Quick Links</h3>
            <ul className="mt-4 space-y-2">
              <li><Link href="#services" className="text-sm text-muted-foreground hover:text-primary">Services</Link></li>
              <li><Link href="#projects" className="text-sm text-muted-foreground hover:text-primary">Projects</Link></li>
              <li><Link href="#about" className="text-sm text-muted-foreground hover:text-primary">About</Link></li>
              <li><Link href="#contact" className="text-sm text-muted-foreground hover:text-primary">Contact</Link></li>
            </ul>
          </div>
          <div>
            <h3 className="text-sm font-semibold text-foreground tracking-wider uppercase">Legal</h3>
            <ul className="mt-4 space-y-2">
              <li><Link href="#" className="text-sm text-muted-foreground hover:text-primary">Privacy Policy</Link></li>
              <li><Link href="#" className="text-sm text-muted-foreground hover:text-primary">Terms of Service</Link></li>
            </ul>
          </div>
          <div>
            <h3 className="text-sm font-semibold text-foreground tracking-wider uppercase">Follow Us</h3>
            <div className="flex mt-4 space-x-4">
              <Link href="#" className="text-muted-foreground hover:text-primary"><Facebook /></Link>
              <Link href="#" className="text-muted-foreground hover:text-primary"><Twitter /></Link>
              <Link href="#" className="text-muted-foreground hover:text-primary"><Linkedin /></Link>
            </div>
          </div>
        </div>
        <div className="mt-12 border-t pt-8 text-center">
          <p className="text-sm text-muted-foreground">&copy; 2024 BuildersInfo. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
}
