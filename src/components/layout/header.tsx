
"use client";

import Link from 'next/link';
import { Button } from '@/components/ui/button';
import Image from 'next/image';
import { Crown, ArrowRight, Menu } from 'lucide-react';
import { Sheet, SheetContent, SheetTrigger, SheetClose } from '@/components/ui/sheet';

export default function Header() {
  return (
    <header className="py-2 px-4 sm:px-6 lg:px-8 bg-background/80 backdrop-blur-sm sticky top-0 z-40 border-b">
      <div className="container mx-auto flex justify-between items-center">
        <div className="flex items-center gap-2">
          <Link href="/" className="flex items-center gap-2 shrink-0">
            <Image src="https://www.buildersinfo.in/_next/image?url=%2Flogo.png&w=256&q=75" alt="BuildersInfo Logo" width={120} height={30} />
          </Link>
        </div>
        <nav className="hidden md:flex gap-6 items-center">
          <Link href="#" className="flex items-center text-sm font-medium hover:text-primary transition-colors">
            <span className="w-2 h-2 rounded-full bg-primary mr-2"></span>
            Map-View
          </Link>
          <Link href="#" className="text-sm font-medium text-muted-foreground hover:text-primary transition-colors">
            Commercial
          </Link>
          <Link href="#" className="text-sm font-medium text-muted-foreground hover:text-primary transition-colors">
            Residential
          </Link>
           <Link href="#" className="flex items-center text-sm font-medium text-muted-foreground hover:text-primary transition-colors">
            <Crown className="mr-2 h-4 w-4" />
            Builders
          </Link>
        </nav>
        <div className="flex items-center gap-2">
          <Button className="hidden sm:inline-flex">Login <ArrowRight className="ml-2 h-4 w-4" /></Button>
          <Sheet>
            <SheetTrigger asChild>
              <Button variant="ghost" size="icon" className="md:hidden">
                <Menu />
                <span className="sr-only">Toggle Menu</span>
              </Button>
            </SheetTrigger>
            <SheetContent side="right" className="w-full max-w-xs">
              <div className="flex flex-col h-full">
                <div className="p-6 border-b">
                  <Link href="/" className="flex items-center gap-2">
                     <Image src="https://www.buildersinfo.in/_next/image?url=%2Flogo.png&w=256&q=75" alt="BuildersInfo Logo" width={120} height={30} />
                  </Link>
                </div>
                <nav className="flex-grow p-6 flex flex-col gap-6">
                  <SheetClose asChild>
                    <Link href="#" className="flex items-center text-lg font-medium hover:text-primary transition-colors">
                      <span className="w-2 h-2 rounded-full bg-primary mr-3"></span>
                      Map-View
                    </Link>
                  </SheetClose>
                  <SheetClose asChild>
                    <Link href="#" className="text-lg font-medium text-muted-foreground hover:text-primary transition-colors">
                      Commercial
                    </Link>
                  </SheetClose>
                  <SheetClose asChild>
                    <Link href="#" className="text-lg font-medium text-muted-foreground hover:text-primary transition-colors">
                      Residential
                    </Link>
                  </SheetClose>
                  <SheetClose asChild>
                    <Link href="#" className="flex items-center text-lg font-medium text-muted-foreground hover:text-primary transition-colors">
                      <Crown className="mr-3 h-5 w-5" />
                      Builders
                    </Link>
                  </SheetClose>
                </nav>
                <div className="p-6 border-t">
                  <SheetClose asChild>
                    <Button className="w-full">Login <ArrowRight className="ml-2 h-4 w-4" /></Button>
                  </SheetClose>
                </div>
              </div>
            </SheetContent>
          </Sheet>
        </div>
      </div>
    </header>
  );
}
