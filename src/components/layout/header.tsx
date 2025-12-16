

"use client";

import Link from 'next/link';
import { Button } from '@/components/ui/button';
import Image from 'next/image';
import { Crown, ArrowRight, Menu, User, Info, CheckSquare, Headset, Mail, Linkedin, Youtube, Instagram, FileText, Link2Off, X, Map } from 'lucide-react';
import { Sheet, SheetContent, SheetTrigger, SheetClose } from '@/components/ui/sheet';
import { Card, CardContent } from '../ui/card';
import { Separator } from '../ui/separator';
import { ThemeToggleButton } from '../theme-toggle';

const WhatsAppIcon = () => (
    <Image src="https://www.buildersinfo.in/property-details/whatsapp.png" alt="WhatsApp" width={20} height={20} />
);

const DesktopSheetMenu = () => (
    <SheetContent side="right" className="w-full max-w-sm p-0 flex flex-col">
        <div className="flex items-center justify-between p-4 border-b">
        <Link href="#" className="flex items-center gap-2 font-semibold">
            <User className="h-6 w-6 rounded-full bg-muted p-1" />
            <span>Login</span>
        </Link>
        <SheetClose asChild>
            <Button variant="ghost" size="icon">
                <X className="h-5 w-5" />
            </Button>
        </SheetClose>
        </div>
        <div className="flex-grow overflow-y-auto p-4 space-y-4">
        <nav className="flex flex-col gap-1">
            <SheetClose asChild>
                <Link href="#" className="flex items-center gap-3 p-2 rounded-lg hover:bg-muted">
                <Info className="h-5 w-5 text-muted-foreground" />
                <span className="font-medium">About Us</span>
                </Link>
            </SheetClose>
            <SheetClose asChild>
                <Link href="#" className="flex items-center gap-3 p-2 rounded-lg hover:bg-muted">
                    <CheckSquare className="h-5 w-5 text-muted-foreground" />
                    <span className="font-medium">Our Verification Process</span>
                </Link>
            </SheetClose>
        </nav>

        <Card className="bg-yellow-100 border-yellow-200">
            <CardContent className="p-4 flex items-center gap-4">
                <div>
                    <h3 className="font-bold">Tag Along</h3>
                    <p className="text-sm">Buy Large Land Parcels with us, starting @ 4 Lakh/ Acre.</p>
                </div>
                <Image src="https://picsum.photos/seed/tag-along/100/80" alt="Tag Along" width={100} height={80} className="rounded-md shrink-0" data-ai-hint="land parcel map" />
            </CardContent>
        </Card>
        </div>
        <div className="p-4 border-t mt-auto space-y-1">
            <SheetClose asChild>
                <Link href="#" className="flex items-center gap-3 p-2 rounded-lg hover:bg-muted">
                    <Link2Off className="h-5 w-5 text-muted-foreground" />
                    <span className="font-medium">Privacy Policy</span>
                </Link>
            </SheetClose>
            <SheetClose asChild>
                <Link href="#" className="flex items-center gap-3 p-2 rounded-lg hover:bg-muted">
                    <FileText className="h-5 w-5 text-muted-foreground" />
                    <span className="font-medium">Terms & Conditions</span>
                </Link>
            </SheetClose>
        </div>
    </SheetContent>
);

const UserMenuButton = () => (
    <Sheet>
        <SheetTrigger asChild>
            <Button variant="outline" className="flex items-center gap-2 rounded-full p-1 pr-3 h-10 shadow-sm">
                <Menu className="h-5 w-5" />
                <div className="bg-muted rounded-full p-1">
                   <User className="h-5 w-5 text-primary" />
                </div>
            </Button>
        </SheetTrigger>
        <SheetContent side="right" className="w-full max-w-sm p-0 flex flex-col">
           <div className="flex items-center justify-between p-4 border-b">
              <Link href="#" className="flex items-center gap-2 font-semibold">
                <User className="h-6 w-6 rounded-full bg-muted p-1" />
                <span>Login</span>
              </Link>
              <SheetClose asChild>
                <Button variant="ghost" size="icon">
                    <X className="h-5 w-5" />
                </Button>
              </SheetClose>
            </div>
            <div className="flex-grow overflow-y-auto p-4 space-y-4">
              <nav className="flex flex-col gap-1 md:hidden">
                  <SheetClose asChild>
                    <Link href="#" className="flex items-center gap-3 p-2 rounded-lg hover:bg-muted">
                      <Map className="h-5 w-5 text-muted-foreground" />
                      <span className="font-medium">Map-View</span>
                    </Link>
                  </SheetClose>
                  <SheetClose asChild>
                    <Link href="#" className="flex items-center gap-3 p-2 rounded-lg hover:bg-muted">
                      <span className="font-medium">Commercial</span>
                    </Link>
                  </SheetClose>
                  <SheetClose asChild>
                    <Link href="#" className="flex items-center gap-3 p-2 rounded-lg hover:bg-muted">
                      <span className="font-medium">Residential</span>
                    </Link>
                  </SheetClose>
                  <SheetClose asChild>
                    <Link href="#" className="flex items-center gap-3 p-2 rounded-lg hover:bg-muted">
                      <Crown className="h-5 w-5 text-muted-foreground" />
                      <span className="font-medium">Builders</span>
                    </Link>
                  </SheetClose>
                  <Separator />
              </nav>
              
              <nav className="flex flex-col gap-1">
                  <SheetClose asChild>
                    <Link href="#" className="flex items-center gap-3 p-2 rounded-lg hover:bg-muted">
                      <Info className="h-5 w-5 text-muted-foreground" />
                      <span className="font-medium">About Us</span>
                    </Link>
                  </SheetClose>
                  <SheetClose asChild>
                     <Link href="#" className="flex items-center gap-3 p-2 rounded-lg hover:bg-muted">
                        <CheckSquare className="h-5 w-5 text-muted-foreground" />
                        <span className="font-medium">Our Verification Process</span>
                    </Link>
                  </SheetClose>
              </nav>

              <Card className="bg-yellow-100 border-yellow-200 dark:bg-yellow-900/50 dark:border-yellow-800/50">
                <CardContent className="p-4 flex items-center gap-4">
                    <div>
                        <h3 className="font-bold">Tag Along</h3>
                        <p className="text-sm">Buy Large Land Parcels with us, starting @ 4 Lakh/ Acre.</p>
                    </div>
                    <Image src="https://picsum.photos/seed/tag-along/100/80" alt="Tag Along" width={100} height={80} className="rounded-md shrink-0" data-ai-hint="land parcel map" />
                </CardContent>
              </Card>
            </div>
             <div className="p-4 border-t mt-auto space-y-1">
                <Link href="#" className="flex items-center gap-3 p-2 rounded-lg hover:bg-muted">
                    <Link2Off className="h-5 w-5 text-muted-foreground" />
                    <span className="font-medium">Privacy Policy</span>
                </Link>
                <Link href="#" className="flex items-center gap-3 p-2 rounded-lg hover:bg-muted">
                    <FileText className="h-5 w-5 text-muted-foreground" />
                    <span className="font-medium">Terms & Conditions</span>
                </Link>
            </div>
        </SheetContent>
    </Sheet>
);


export default function Header() {
  return (
    <header className="bg-background/80 backdrop-blur-sm sticky top-0 z-40 border-b w-full">
      <div className="px-4 sm:px-6 lg:px-8 flex justify-between items-center h-16">
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
            <ThemeToggleButton />
            <UserMenuButton />
        </div>
      </div>
    </header>
  );
}
