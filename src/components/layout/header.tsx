
"use client";

import Link from 'next/link';
import { Button } from '@/components/ui/button';
import Image from 'next/image';
import { Crown, ArrowRight, Menu, User, Info, CheckSquare, Headset, Mail, Linkedin, Youtube, Instagram, FileText, Link2Off, X, Map, HelpCircle, ChevronRight, Facebook, Twitter, CheckCircle, Search, SlidersHorizontal, Globe, PlusCircle } from 'lucide-react';
import { Sheet, SheetContent, SheetTrigger, SheetClose, SheetHeader, SheetTitle, SheetDescription } from '@/components/ui/sheet';
import { Card, CardContent } from '../ui/card';
import { Separator } from '../ui/separator';
import { ThemeToggleButton } from '../theme-toggle';
import { TooltipProvider, Tooltip, TooltipTrigger, TooltipContent } from '@/components/ui/tooltip';
import { useState, useEffect } from 'react';
import { LoginDialog } from './login-dialog';
import { Input } from '../ui/input';
import { LayersDialog } from './layers-dialog';
import { LayersDeclarationDialog } from './layers-declaration-dialog';
import { CitySelectionSheet } from './city-selection-sheet';
import { Popover, PopoverContent, PopoverTrigger } from '../ui/popover';
import { Map as MapIcon, Satellite, Mountain, TrafficCone } from 'lucide-react';

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


const UserMenuButton = () => {
    const [isLoginOpen, setIsLoginOpen] = useState(false);
    return (
        <>
            <Sheet>
                <TooltipProvider>
                    <Tooltip>
                        <TooltipTrigger asChild>
                            <SheetTrigger asChild>
                                <Button variant="ghost" className="flex items-center gap-2 rounded-full p-1 pr-3 h-10 shadow-sm">
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
                <SheetContent side="right" className="w-full sm:w-[400px] p-0 flex flex-col rounded-l-lg">
                <SheetHeader className="sr-only">
                  <SheetTitle>User Menu</SheetTitle>
                  <SheetDescription>
                    Access your profile, settings, and other user-specific options.
                  </SheetDescription>
                </SheetHeader>
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
                        <Button onClick={() => setIsLoginOpen(true)}>Login</Button>
                    </div>
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
            <LoginDialog open={isLoginOpen} onOpenChange={setIsLoginOpen} />
        </>
    );
};


export default function Header({ onFilterClick, areFiltersApplied }: { onFilterClick?: () => void, areFiltersApplied?: boolean }) {
  const [isLayersDeclarationOpen, setIsLayersDeclarationOpen] = useState(false);
  const [isLayersDialogOpen, setIsLayersDialogOpen] = useState(false);
  const [isCitySheetOpen, setIsCitySheetOpen] = useState(false);

  const placeholderTexts = ['Search "Indiranagar"', 'Search "Koramangala"', 'Search "HSR Layout"'];
  const [placeholder, setPlaceholder] = useState('');
  const [textIndex, setTextIndex] = useState(0);
  const [charIndex, setCharIndex] = useState(0);
  const [isDeleting, setIsDeleting] = useState(false);

  useEffect(() => {
    const type = () => {
      const currentText = placeholderTexts[textIndex];
      if (isDeleting) {
        if (charIndex > 0) {
          setPlaceholder(currentText.substring(0, charIndex - 1));
          setCharIndex(charIndex - 1);
        } else {
          setIsDeleting(false);
          setTextIndex((prevIndex) => (prevIndex + 1) % placeholderTexts.length);
        }
      } else {
        if (charIndex < currentText.length) {
          setPlaceholder(currentText.substring(0, charIndex + 1));
          setCharIndex(charIndex + 1);
        } else {
          setTimeout(() => setIsDeleting(true), 2000); // Pause before deleting
        }
      }
    };

    const typingSpeed = isDeleting ? 100 : 150;
    const timeout = setTimeout(type, typingSpeed);
    return () => clearTimeout(timeout);
  }, [charIndex, isDeleting, textIndex, placeholderTexts]);

  const handleLayersClick = () => {
    setIsLayersDeclarationOpen(true);
  }

  const handleDeclarationProceed = () => {
    setIsLayersDialogOpen(true);
  }
  
  const handleCitySelection = () => {
      setIsCitySheetOpen(true);
  }

  return (
    <>
    <header className="bg-background fixed top-0 z-40 w-full border-b">
      <div className="px-4 sm:px-6 lg:px-8 flex justify-between items-center h-14">
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
            <Crown className="mr-2 h-4 w-4 text-amber-500" />
            Builders
          </Link>
        </nav>
        
        <div className="flex items-center gap-2">
            <Button className="bg-accent text-accent-foreground hover:bg-accent/90 shadow-lg h-10 flex-shrink-0 hidden md:flex items-center gap-2">
              <PlusCircle className="h-4 w-4" />
              List Property
            </Button>
            <ThemeToggleButton />
            <UserMenuButton />
        </div>
      </div>
       <div className="md:hidden absolute top-16 left-0 right-0 px-4 z-20">
            <div className="relative">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground z-10" />
                <Input
                    placeholder={placeholder}
                    className="pl-10 pr-20 h-12 bg-background shadow-lg"
                />
                <div className="absolute right-1 top-1/2 -translate-y-1/2 flex items-center">
                    <Button variant={areFiltersApplied ? "default" : "ghost"} size="icon" className="h-10 w-10" onClick={onFilterClick}>
                        <SlidersHorizontal className="h-5 w-5" />
                    </Button>
                    <Popover>
                        <PopoverTrigger asChild>
                            <Button variant="ghost" size="icon" className="h-10 w-10">
                                <Globe className="h-5 w-5" />
                            </Button>
                        </PopoverTrigger>
                        <PopoverContent className="w-48 p-2">
                            <div className="grid gap-1">
                                <Button variant="ghost" className="justify-start">
                                    <MapIcon className="mr-2 h-4 w-4" /> Default
                                </Button>
                                <Button variant="ghost" className="justify-start">
                                    <Satellite className="mr-2 h-4 w-4" /> Satellite
                                </Button>
                                <Button variant="ghost" className="justify-start">
                                    <Mountain className="mr-2 h-4 w-4" /> Terrain
                                </Button>
                                <Separator />
                                <Button variant="ghost" className="justify-start">
                                    <TrafficCone className="mr-2 h-4 w-4" /> Traffic
                                </Button>
                            </div>
                        </PopoverContent>
                    </Popover>
                </div>
            </div>
        </div>
    </header>
    <LayersDeclarationDialog 
      open={isLayersDeclarationOpen} 
      onOpenChange={setIsLayersDeclarationOpen}
      onProceed={handleDeclarationProceed}
    />
    <LayersDialog
        open={isLayersDialogOpen}
        onOpenChange={setIsLayersDialogOpen}
    />
    <CitySelectionSheet open={isCitySheetOpen} onOpenChange={setIsCitySheetOpen} />
    </>
  );
}
