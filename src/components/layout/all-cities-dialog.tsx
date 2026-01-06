
"use client";

import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import {
  Drawer,
  DrawerContent,
  DrawerHeader,
  DrawerTitle,
} from "@/components/ui/drawer";
import { useIsMobile } from "@/hooks/use-mobile";
import { Input } from "../ui/input";
import { ScrollArea } from "../ui/scroll-area";
import { useState } from "react";
import { Search } from "lucide-react";

interface AllCitiesDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onCitySelect: (city: string) => void;
}

const topCities = [
    'Bangalore', 'Chennai', 'Delhi', 'Gurgaon', 'Hyderabad', 
    'Kolkata', 'Lucknow', 'Mumbai', 'Navi Mumbai', 'Noida', 'Pune', 'Thane'
];

const allCitiesList = [
    ...topCities,
    'Adilabad', 'Agartala', 'Agra', 'Ahmedabad', 'Ahmednagar', 'Ajmer', 'Alair',
    'Alappuzha', 'Aligarh', 'Alipurduar', 'Ambala', 'Amravati', 'Amritsar', 'Anand',
    'Anantapur', 'Angul', 'Ankleshwar', 'Asansol', 'Aurangabad', 'Baddi', 'Bareilly',
    'Bathinda', 'Beed', 'Belgaum', 'Berhampur', 'Bhandara', 'Bharuch', 'Bhavnagar',
    'Bhilai', 'Bhiwadi', 'Bhiwani', 'Bhopal', 'Bhubaneswar', 'Bhuj', 'Bikaner', 'Bilaspur'
].filter((value, index, self) => self.indexOf(value) === index).sort();


function AllCitiesContent({ onCitySelect }: { onCitySelect: (city: string) => void; }) {
    const [searchTerm, setSearchTerm] = useState('');
    const filteredCities = allCitiesList.filter(city => 
        city.toLowerCase().includes(searchTerm.toLowerCase())
    );

    const handleSelect = (city: string) => {
        onCitySelect(city);
    }

    return (
        <>
            <div className="p-4 border-b shrink-0">
                <div className="relative">
                    <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" />
                    <Input 
                        placeholder="Search city..." 
                        className="pl-10 h-11"
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                    />
                </div>
            </div>
            <ScrollArea className="flex-1 min-h-0">
                <div className="p-4">
                    <h3 className="font-semibold mb-4 text-sm">All Cities</h3>
                    <ul className="divide-y -mx-4">
                        {filteredCities.map(city => (
                            <li 
                                key={city} 
                                className="py-3 px-4 text-muted-foreground cursor-pointer hover:bg-muted"
                                onClick={() => handleSelect(city)}
                            >
                                {city}
                            </li>
                        ))}
                    </ul>
                </div>
            </ScrollArea>
        </>
    )
}

export function AllCitiesDialog({ open, onOpenChange, onCitySelect }: AllCitiesDialogProps) {
  const isMobile = useIsMobile();

  const handleSelect = (city: string) => {
      onCitySelect(city);
      onOpenChange(false);
  }

  if (isMobile) {
    return (
      <Drawer open={open} onOpenChange={onOpenChange}>
        <DrawerContent className="h-[90vh] flex flex-col">
          <DrawerHeader className="text-left shrink-0">
            <DrawerTitle>Select a City</DrawerTitle>
          </DrawerHeader>
          <AllCitiesContent onCitySelect={handleSelect} />
        </DrawerContent>
      </Drawer>
    );
  }

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-md h-[70vh] flex flex-col p-0">
        <DialogHeader className="p-4 border-b shrink-0">
          <DialogTitle>Select a City</DialogTitle>
        </DialogHeader>
        <AllCitiesContent onCitySelect={handleSelect} />
      </DialogContent>
    </Dialog>
  );
}
