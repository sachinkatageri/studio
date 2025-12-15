import Link from 'next/link';
import { Button } from '@/components/ui/button';
import Image from 'next/image';

export default function Header() {
  return (
    <header className="py-4 px-4 sm:px-6 lg:px-8 bg-background/80 backdrop-blur-sm sticky top-0 z-40 border-b">
      <div className="container mx-auto flex justify-between items-center">
        <Link href="/" className="flex items-center gap-2">
          <Image src="https://www.buildersinfo.in/_next/image?url=%2Flogo.png&w=256&q=75" alt="BuildersInfo Logo" width={120} height={30} />
        </Link>
        <nav className="hidden md:flex gap-6 items-center">
          <Link href="#services" className="text-sm font-medium hover:text-primary transition-colors">Services</Link>
          <Link href="#projects" className="text-sm font-medium hover:text-primary transition-colors">Projects</Link>
          <Link href="#about" className="text-sm font-medium hover:text-primary transition-colors">About</Link>
        </nav>
        <Button asChild>
          <Link href="#contact">Contact Us</Link>
        </Button>
      </div>
    </header>
  );
}
