
"use client";

import Link from 'next/link';
import { Button } from '@/components/ui/button';
import Image from 'next/image';
import { Crown, ArrowRight, Menu, User, Settings, LogOut, Info, CheckSquare, Headset, Mail, Linkedin, Youtube, Instagram, FileText, Link2Off, ChevronDown, Copy, X } from 'lucide-react';
import { Sheet, SheetContent, SheetTrigger, SheetClose } from '@/components/ui/sheet';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '../ui/accordion';
import { Card, CardContent } from '../ui/card';

const WhatsAppIcon = () => (
    <svg
      role="img"
      viewBox="0 0 24 24"
      xmlns="http://www.w3.org/2000/svg"
      className="h-5 w-5"
    >
      <title>WhatsApp</title>
      <path d="M12.04 2.016c-5.523 0-10 4.477-10 10s4.477 10 10 10c1.554 0 3.045-.356 4.378-1.004l4.58 1.005-1.04-4.47c.72-1.39 1.12-3.01 1.12-4.71s-4.478-9.82-10.038-9.82zm4.19 12.06c-.195.345-.78.64-1.12.72-.29.07-.66.1-1.07-.06-.8-.31-1.59-.72-2.24-1.22s-1.15-1.1-1.6-1.8c-.13-.21-.26-.44-.35-.67-.36-.91-.18-1.42.15-1.8.1-.12.23-.15.34-.15.11 0 .22 0 .31.01.1.01.15.02.24.11.16.15.25.38.28.42.06.1.08.23.01.37-.1.21-.15.33-.24.43-.09.1-.18.2-.26.3-.08.08-.16.17-.06.31.08.13.33.56.73.94.55.51 1.05.81 1.4.92.17.05.28.04.38-.02.1-.06.41-.49.52-.66.11-.17.22-.18.37-.11.16.07.95.45 1.12.53s.27.12.31.18.06.27.01.52z" />
    </svg>
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
                <User className="h-5 w-5 text-muted-foreground" />
                <span className="font-medium">Profile</span>
                </Link>
            </SheetClose>
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
            <Accordion type="single" collapsible className="w-full">
                <AccordionItem value="contact-us" className="border-none">
                    <AccordionTrigger className="flex items-center gap-3 p-2 rounded-lg hover:bg-muted hover:no-underline font-medium">
                        <Headset className="h-5 w-5 text-muted-foreground" />
                        <span>Contact Us</span>
                    </AccordionTrigger>
                    <AccordionContent className="pt-2 pl-8 space-y-2">
                        <div className="relative pl-4 border-l">
                        <div className="space-y-4">
                                <div className="flex items-center gap-3 relative -ml-1">
                                    <div className="absolute -left-[1.1rem] top-1/2 -translate-y-1/2 h-px w-3 bg-border"></div>
                                    <Mail className="h-5 w-5 text-muted-foreground" />
                                    <Link href="mailto:support@buildersinfo.in" className="text-sm hover:underline">support@buildersinfo.in</Link>
                                    <Button variant="ghost" size="icon" className="h-7 w-7 ml-auto">
                                        <Copy className="h-4 w-4" />
                                    </Button>
                                </div>
                                <div className="flex items-center gap-3 relative -ml-1">
                                    <div className="absolute -left-[1.1rem] top-1/2 -translate-y-1/2 h-px w-3 bg-border"></div>
                                    <WhatsAppIcon />
                                    <Link href="#" className="text-sm hover:underline">Whatsapp</Link>
                                </div>
                                <div className="flex items-center gap-3 relative -ml-1">
                                    <div className="absolute -left-[1.1rem] top-1/2 -translate-y-1/2 h-px w-3 bg-border"></div>
                                    <Linkedin className="h-5 w-5 text-muted-foreground" />
                                    <Link href="#" className="text-sm hover:underline">LinkedIn</Link>
                                </div>
                                <div className="flex items-center gap-3 relative -ml-1">
                                    <div className="absolute -left-[1.1rem] top-1/2 -translate-y-1/2 h-px w-3 bg-border"></div>
                                    <Youtube className="h-5 w-5 text-muted-foreground" />
                                    <Link href="#" className="text-sm hover:underline">YouTube</Link>
                                </div>
                                <div className="flex items-center gap-3 relative -ml-1">
                                    <div className="absolute -left-[1.1rem] top-1/2 -translate-y-1/2 h-px w-3 bg-border"></div>
                                    <Instagram className="h-5 w-5 text-muted-foreground" />
                                    <Link href="#" className="text-sm hover:underline">Instagram</Link>
                                </div>
                        </div>
                        </div>
                    </AccordionContent>
                </AccordionItem>
            </Accordion>
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
            <SheetClose asChild>
                 <Link href="#" className="flex items-center gap-3 p-2 rounded-lg hover:bg-muted">
                    <Settings className="h-5 w-5 text-muted-foreground" />
                    <span className="font-medium">Settings</span>
                </Link>
            </SheetClose>
             <SheetClose asChild>
                 <Link href="#" className="flex items-center gap-3 p-2 rounded-lg hover:bg-muted">
                    <LogOut className="h-5 w-5 text-muted-foreground" />
                    <span className="font-medium">Log out</span>
                </Link>
            </SheetClose>
        </div>
    </SheetContent>
);


export default function Header() {
  return (
    <header className="bg-background/80 backdrop-blur-sm sticky top-0 z-40 border-b w-full">
      <div className="px-4 sm:px-6 lg:px-8 flex justify-between items-center h-16">
        <div className="flex items-center gap-2">
          <Sheet>
            <SheetTrigger asChild>
              <Button variant="ghost" size="icon" className="md:hidden">
                <Menu />
                <span className="sr-only">Toggle Menu</span>
              </Button>
            </SheetTrigger>
            <SheetContent side="left" className="w-full max-w-sm p-0 flex flex-col">
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
                      <Accordion type="single" collapsible className="w-full">
                        <AccordionItem value="contact-us" className="border-none">
                            <AccordionTrigger className="flex items-center gap-3 p-2 rounded-lg hover:bg-muted hover:no-underline font-medium">
                                 <Headset className="h-5 w-5 text-muted-foreground" />
                                <span>Contact Us</span>
                            </AccordionTrigger>
                            <AccordionContent className="pt-2 pl-8 space-y-2">
                                <div className="relative pl-4 border-l">
                                   <div className="space-y-4">
                                        <div className="flex items-center gap-3 relative -ml-1">
                                            <div className="absolute -left-[1.1rem] top-1/2 -translate-y-1/2 h-px w-3 bg-border"></div>
                                            <Mail className="h-5 w-5 text-muted-foreground" />
                                            <Link href="mailto:support@buildersinfo.in" className="text-sm hover:underline">support@buildersinfo.in</Link>
                                            <Button variant="ghost" size="icon" className="h-7 w-7 ml-auto">
                                                <Copy className="h-4 w-4" />
                                            </Button>
                                        </div>
                                        <div className="flex items-center gap-3 relative -ml-1">
                                            <div className="absolute -left-[1.1rem] top-1/2 -translate-y-1/2 h-px w-3 bg-border"></div>
                                            <WhatsAppIcon />
                                            <Link href="#" className="text-sm hover:underline">Whatsapp</Link>
                                        </div>
                                         <div className="flex items-center gap-3 relative -ml-1">
                                            <div className="absolute -left-[1.1rem] top-1/2 -translate-y-1/2 h-px w-3 bg-border"></div>
                                            <Linkedin className="h-5 w-5 text-muted-foreground" />
                                            <Link href="#" className="text-sm hover:underline">LinkedIn</Link>
                                        </div>
                                         <div className="flex items-center gap-3 relative -ml-1">
                                            <div className="absolute -left-[1.1rem] top-1/2 -translate-y-1/2 h-px w-3 bg-border"></div>
                                            <Youtube className="h-5 w-5 text-muted-foreground" />
                                            <Link href="#" className="text-sm hover:underline">YouTube</Link>
                                        </div>
                                         <div className="flex items-center gap-3 relative -ml-1">
                                            <div className="absolute -left-[1.1rem] top-1/2 -translate-y-1/2 h-px w-3 bg-border"></div>
                                            <Instagram className="h-5 w-5 text-muted-foreground" />
                                            <Link href="#" className="text-sm hover:underline">Instagram</Link>
                                        </div>
                                   </div>
                                </div>
                            </AccordionContent>
                        </AccordionItem>
                      </Accordion>
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
                <Button variant="ghost" size="icon" className="md:inline-flex">
                    <Menu />
                    <span className="sr-only">Open user menu</span>
                </Button>
            </SheetTrigger>
            <DesktopSheetMenu />
          </Sheet>
        </div>
      </div>
    </header>
  );
}

    