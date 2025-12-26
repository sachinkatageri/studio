
"use client";

import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetClose,
} from "@/components/ui/sheet";
import { Button } from "@/components/ui/button";
import { ArrowLeft, LocateFixed, Search, Building } from "lucide-react";
import { Input } from "../ui/input";
import { ScrollArea } from "../ui/scroll-area";
import Image from "next/image";
import { useIsMobile } from "@/hooks/use-mobile";

interface CitySelectionSheetProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onCitySelect: (city: string) => void;
}

const topCities = [
    { name: 'Bangalore' },
    { name: 'Chennai' },
    { name: 'Delhi' },
    { name: 'Gurgaon' },
    { name: 'Hyderabad' },
    { name: 'Kolkata' },
    { name: 'Lucknow' },
    { name: 'Mumbai' },
    { name: 'Navi Mumbai' },
    { name: 'Noida' },
    { name: 'Pune' },
    { name: 'Thane' },
];

const otherCities = [
    'Adilabad', 'Agartala', 'Agra', 'Ahmedabad', 'Ahmednagar', 'Ajmer', 'Alair',
    'Alappuzha', 'Aligarh', 'Alipurduar', 'Ambala', 'Amravati', 'Amritsar', 'Anand',
    'Anantapur', 'Angul', 'Ankleshwar', 'Asansol', 'Aurangabad', 'Baddi', 'Bareilly',
    'Bathinda', 'Beed', 'Belgaum', 'Berhampur', 'Bhandara', 'Bharuch', 'Bhavnagar',
    'Bhilai', 'Bhiwadi', 'Bhiwani', 'Bhopal', 'Bhubaneswar', 'Bhuj', 'Bikaner', 'Bilaspur'
];


const CitySelectionContent = ({ onOpenChange, onCitySelect }: { onOpenChange: (open: boolean) => void; onCitySelect: (city: string) => void; }) => (
  <>
    <SheetHeader className="p-4 flex-row items-center gap-2 border-b shrink-0 text-left">
        <Button variant="ghost" size="icon" onClick={() => onOpenChange(false)}>
            <ArrowLeft />
        </Button>
      <SheetTitle className="text-xl font-bold">Country/City</SheetTitle>
    </SheetHeader>
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
                    <div key={city.name} className="flex flex-col items-center justify-center gap-2 p-2 rounded-lg hover:bg-muted text-center cursor-pointer" onClick={() => onCitySelect(city.name)}>
                        <div className="w-12 h-12 flex items-center justify-center bg-muted rounded-full">
                            <Building className="h-6 w-6 text-primary" />
                        </div>
                        <span className="text-sm font-medium">{city.name}</span>
                    </div>
                ))}
            </div>
        </div>
        <div className="p-4">
            <h3 className="font-semibold mb-2">Other Cities</h3>
            <ul className="divide-y">
                {otherCities.map(city => (
                    <li key={city} className="py-3 text-muted-foreground cursor-pointer hover:bg-muted -mx-4 px-4" onClick={() => onCitySelect(city)}>
                        {city}
                    </li>
                ))}
            </ul>
        </div>
    </ScrollArea>
  </>
);


export function CitySelectionSheet({ open, onOpenChange, onCitySelect }: CitySelectionSheetProps) {
  const isMobile = useIsMobile();
  
  const side = isMobile ? 'bottom' : 'left';
  const className = isMobile ? 'h-[90%] max-h-full w-full p-0 flex flex-col' : 'w-[480px] p-0 flex flex-col';

  return (
    <Sheet open={open} onOpenChange={onOpenChange}>
      <SheetContent side={side} className={className} hideCloseButton>
        <CitySelectionContent onOpenChange={onOpenChange} onCitySelect={onCitySelect} />
      </SheetContent>
    </Sheet>
  )
}
