

"use client";

import Link from 'next/link';
import { Button } from '@/components/ui/button';
import Image from 'next/image';
import { Crown, ArrowRight, Menu, User, Info, CheckSquare, Headset, Mail, Linkedin, Youtube, Instagram, FileText, Link2Off, X, Map, HelpCircle, ChevronRight, Facebook, Twitter, CheckCircle } from 'lucide-react';
import { Sheet, SheetContent, SheetTrigger, SheetClose } from '@/components/ui/sheet';
import { Card, CardContent } from '../ui/card';
import { Separator } from '../ui/separator';
import { ThemeToggleButton } from '../theme-toggle';
import { TooltipProvider, Tooltip, TooltipTrigger, TooltipContent } from '@/components/ui/tooltip';

const WhatsAppIcon = () => (
    <Image src="https://www.buildersinfo.in/property-details/whatsapp.png" alt="WhatsApp" width={20} height={20} />
);

const AppStoreButton = () => (
    <Link href="#" className="inline-block">
        <Image src="https://c.housingcdn.com/demand/s/client/common/assets/app-store.10009972.png" alt="Download on the App Store" width={120} height={40} />
    </Link>
)
const PlayStoreButton = () => (
    <Link href="#" className="inline-block">
        <Image src="https://c.housingcdn.com/demand/s/client/common/assets/google-play.2c209e8c.png" alt="Get it on Google Play" width={120} height={40} />
    </Link>
)

const socialLinks = [
    { icon: <Facebook className="h-5 w-5" />, href: "#" },
    { icon: <Twitter className="h-5 w-5" />, href: "#" },
    { icon: <Instagram className="h-5 w-5" />, href: "#" },
    { icon: <Linkedin className="h-5 w-5" />, href: "#" },
    { icon: <Youtube className="h-5 w-5" />, href: "#" },
]


const UserMenuButton = () => (
    <Sheet>
        <TooltipProvider>
            <Tooltip>
                <TooltipTrigger asChild>
                    <SheetTrigger asChild>
                        <Button variant="outline" className="flex items-center gap-2 rounded-full p-1 pr-3 h-10 shadow-sm">
                            <Menu className="h-5 w-5" />
                            <div className="bg-muted rounded-full p-1">
                               <User className="h-5 w-5 text-primary" />
                            </div>
                        </Button>
                    </SheetTrigger>
                </TooltipTrigger>
                <TooltipContent>
                    <p>User Menu</p>
                </TooltipContent>
            </Tooltip>
        </TooltipProvider>
        <SheetContent side="right" className="w-full sm:w-[400px] p-0 flex flex-col">
           <div className="p-4 bg-muted/50">
              <div className="flex items-center gap-4">
                  <div className="bg-primary/20 rounded-full p-2">
                    <User className="h-10 w-10 text-primary" />
                  </div>
                  <div className="flex-1">
                      <h3 className="font-bold text-lg">Hello 👋</h3>
                      <ul className="text-sm text-muted-foreground mt-1 space-y-1">
                          <li className="flex items-center gap-2"><CheckCircle className="h-4 w-4 text-green-500" /> Easy Contact with sellers</li>
                          <li className="flex items-center gap-2"><CheckCircle className="h-4 w-4 text-green-500" /> Personalized experience</li>
                      </ul>
                  </div>
                  <Button>Login</Button>
              </div>
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
                   <SheetClose asChild>
                     <Link href="#" className="flex items-center justify-between p-2 rounded-lg hover:bg-muted">
                        <div className="flex items-center gap-3">
                            <HelpCircle className="h-5 w-5 text-muted-foreground" />
                            <span className="font-medium">Visit Help Center</span>
                        </div>
                        <ChevronRight className="h-5 w-5 text-muted-foreground" />
                    </Link>
                  </SheetClose>
              </nav>

              <Card className="bg-yellow-100 border-yellow-200 dark:bg-yellow-900/50 dark:border-yellow-800/50">
                <CardContent className="p-4 flex items-center gap-4">
                    <div>
                        <h3 className="font-bold">Tag Along</h3>
                        <p className="text-sm">Buy Large Land Parcels with us, starting @ 4 Lakh/ Acre.</p>
                    </div>
                    <Image src="https://www.buildersinfo.in/tag-along-pic.svg" alt="Tag Along" width={100} height={80} className="rounded-md shrink-0" />
                </CardContent>
              </Card>

              <Card>
                <CardContent className="p-4 space-y-4">
                    <h3 className="font-semibold text-center">Download Builderinfo App</h3>
                    <div className="flex items-center justify-center gap-4">
                        <div className="flex flex-col gap-2">
                           <AppStoreButton />
                           <PlayStoreButton />
                        </div>
                        <Image src="https://c.housingcdn.com/demand/s/client/common/assets/qr-code.f143ed3a.png" alt="QR Code" width={80} height={80} data-ai-hint="qr code" />
                    </div>
                </CardContent>
              </Card>

            </div>
             <div className="p-4 border-t mt-auto space-y-4">
                <Link href="#" className="flex items-center gap-3 p-2 rounded-lg hover:bg-muted">
                    <Link2Off className="h-5 w-5 text-muted-foreground" />
                    <span className="font-medium">Privacy Policy</span>
                </Link>
                <Link href="#" className="flex items-center gap-3 p-2 rounded-lg hover:bg-muted">
                    <FileText className="h-5 w-5 text-muted-foreground" />
                    <span className="font-medium">Terms & Conditions</span>
                </Link>
                <Separator />
                <div className="flex items-center justify-center gap-4">
                    <h3 className="font-medium text-sm">Follow on</h3>
                    {socialLinks.map((link, i) => (
                        <Link key={i} href={link.href} className="text-muted-foreground hover:text-primary">
                            {link.icon}
                        </Link>
                    ))}
                </div>
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
