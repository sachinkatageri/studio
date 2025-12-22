
"use client";

import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
} from "@/components/ui/sheet";
import { Button } from "@/components/ui/button";
import { ArrowLeft, LocateFixed, Search } from "lucide-react";
import { Input } from "../ui/input";
import { ScrollArea } from "../ui/scroll-area";
import Image from "next/image";
import { useIsMobile } from "@/hooks/use-mobile";
import { Popover, PopoverContent } from "../ui/popover";

interface CitySelectionSheetProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

const topCities = [
    { name: 'Bangalore', icon: 'https://i.ibb.co/L9YvC2Z/bangalore.png' },
    { name: 'Chennai', icon: 'https://i.ibb.co/3W6dM2b/chennai.png' },
    { name: 'Delhi', icon: 'https://i.ibb.co/DLRg3t4/delhi.png' },
    { name: 'Gurgaon', icon: 'https://i.ibb.co/cQh5qV2/gurgaon.png' },
    { name: 'Hyderabad', icon: 'https://i.ibb.co/F8Q9bWJ/hyderabad.png' },
    { name: 'Kolkata', icon: 'https://i.ibb.co/bB3d5yG/kolkata.png' },
    { name: 'Lucknow', icon: 'https://i.ibb.co/k2DyrzS/lucknow.png' },
    { name: 'Mumbai', icon: 'https://i.ibb.co/GWCw6cK/mumbai.png' },
    { name: 'Navi Mumbai', icon: 'https://i.ibb.co/vQ1T2W6/navimumbai.png' },
    { name: 'Noida', icon: 'https://i.ibb.co/2MLj5Vp/noida.png' },
    { name: 'Pune', icon: 'https://i.ibb.co/hZJgG1J/pune.png' },
    { name: 'Thane', icon: 'https://i.ibb.co/gR2XkYr/thane.png' },
];

const otherCities = [
    'Adilabad', 'Agartala', 'Agra', 'Ahmedabad', 'Ahmednagar', 'Ajmer', 'Alair',
    'Alappuzha', 'Aligarh', 'Alipurduar', 'Ambala', 'Amravati', 'Amritsar', 'Anand',
    'Anantapur', 'Angul', 'Ankleshwar', 'Asansol', 'Aurangabad', 'Baddi', 'Bareilly',
    'Bathinda', 'Beed', 'Belgaum', 'Berhampur', 'Bhandara', 'Bharuch', 'Bhavnagar',
    'Bhilai', 'Bhiwadi', 'Bhiwani', 'Bhopal', 'Bhubaneswar', 'Bhuj', 'Bikaner', 'Bilaspur'
];


const CitySelectionContent = () => (
  <>
    <div className="p-4 shrink-0">
        <div className="relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" />
            <Input placeholder="Select or type your city" className="pl-10 h-11" />
        </div>
        <div className="flex justify-between items-center mt-2">
            <Button variant="ghost" className="justify-start text-base p-2 h-auto text-primary font-semibold">
                <LocateFixed className="mr-3 h-5 w-5" />
                Detect my location
            </Button>
             <Button variant="link" size="sm" className="text-muted-foreground">Reset City</Button>
        </div>
    </div>
    <ScrollArea className="flex-1 min-h-0">
        <div className="p-4">
            <h3 className="font-semibold mb-4">Top Cities</h3>
             <div className="grid grid-cols-4 gap-4">
                {topCities.map(city => (
                    <div key={city.name} className="flex flex-col items-center justify-center gap-2 p-2 rounded-lg hover:bg-muted text-center cursor-pointer">
                        <Image src={city.icon} alt={`${city.name} icon`} width={48} height={48} />
                        <span className="text-sm font-medium">{city.name}</span>
                    </div>
                ))}
            </div>
        </div>
        <div className="p-4">
            <h3 className="font-semibold mb-2">Other Cities</h3>
            <ul className="divide-y">
                {otherCities.map(city => (
                    <li key={city} className="py-3 text-muted-foreground cursor-pointer hover:bg-muted -mx-4 px-4">
                        {city}
                    </li>
                ))}
            </ul>
        </div>
    </ScrollArea>
  </>
);


export function CitySelectionSheet({ open, onOpenChange }: CitySelectionSheetProps) {
  const isMobile = useIsMobile();
  
  if (isMobile) {
    return (
      <Sheet open={open} onOpenChange={onOpenChange}>
        <SheetContent side="bottom" className="h-full max-h-full w-full p-0 flex flex-col">
          <SheetHeader className="p-4 flex-row items-center gap-2 border-b shrink-0 text-left">
              <Button variant="ghost" size="icon" onClick={() => onOpenChange(false)}>
                  <ArrowLeft />
              </Button>
            <SheetTitle className="text-xl font-bold">Country/City</SheetTitle>
          </SheetHeader>
          <CitySelectionContent />
        </SheetContent>
      </Sheet>
    )
  }

  // Popover for desktop
  return (
    <Popover open={open} onOpenChange={onOpenChange}>
        {/* The trigger is in the header, so we just need the content here */}
        <PopoverContent className="w-[480px] p-0 h-[600px] flex flex-col">
           <SheetHeader className="p-4 flex-row items-center gap-2 border-b shrink-0 text-left">
             <SheetTitle className="text-xl font-bold">Country/City</SheetTitle>
           </SheetHeader>
           <CitySelectionContent />
        </PopoverContent>
    </Popover>
  );
}
    