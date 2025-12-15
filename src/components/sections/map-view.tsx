
"use client";

import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Checkbox } from '@/components/ui/checkbox';
import { Label } from '@/components/ui/label';
import { Search, SlidersHorizontal, Layers, List, X } from 'lucide-react';
import Image from 'next/image';
import { useState } from 'react';
import { Sheet, SheetContent, SheetTrigger, SheetHeader, SheetTitle, SheetDescription } from '@/components/ui/sheet';


export default function MapView() {
  const [isFilterSheetOpen, setIsFilterSheetOpen] = useState(false);
  return (
    <div className="relative h-full w-full">
      <Image
        src="https://picsum.photos/seed/map/1920/1080"
        alt="Map of Bengaluru"
        layout="fill"
        objectFit="cover"
        className="z-0"
        data-ai-hint="satellite map"
      />
      <div className="absolute top-4 left-1/2 -translate-x-1/2 z-10 w-full max-w-md px-4 sm:max-w-lg">
        <div className="relative">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" />
          <Input
            type="text"
            placeholder="Search Location"
            className="w-full pl-10 h-12 shadow-lg"
          />
        </div>
      </div>
      <div className="absolute top-4 right-4 z-10 flex items-center gap-2">
        <div className="hidden md:flex items-center space-x-2 bg-background p-2 rounded-md shadow-lg">
          <Checkbox id="commercial-desktop" />
          <Label htmlFor="commercial-desktop" className="text-sm font-medium">Commercial</Label>
        </div>
        <div className="hidden md:flex items-center space-x-2 bg-background p-2 rounded-md shadow-lg">
          <Checkbox id="residential-desktop" />
          <Label htmlFor="residential-desktop" className="text-sm font-medium">Residential</Label>
        </div>
        <Sheet open={isFilterSheetOpen} onOpenChange={setIsFilterSheetOpen}>
          <SheetTrigger asChild>
            <Button variant="secondary" className="shadow-lg">
              <SlidersHorizontal className="mr-0 md:mr-2 h-4 w-4" />
              <span className="hidden md:inline">Filters</span>
            </Button>
          </SheetTrigger>
          <SheetContent>
            <SheetHeader>
              <SheetTitle>Filters</SheetTitle>
              <SheetDescription>
                Refine your property search.
              </SheetDescription>
            </SheetHeader>
            <div className="py-4">
              <div className="space-y-4">
                <h4 className="font-semibold">Property Type</h4>
                <div className="flex items-center space-x-2">
                  <Checkbox id="commercial-mobile" />
                  <Label htmlFor="commercial-mobile">Commercial</Label>
                </div>
                <div className="flex items-center space-x-2">
                  <Checkbox id="residential-mobile" />
                  <Label htmlFor="residential-mobile">Residential</Label>
                </div>
              </div>
            </div>
            <Button onClick={() => setIsFilterSheetOpen(false)} className="w-full">Apply Filters</Button>
          </SheetContent>
        </Sheet>
      </div>

       <div className="absolute top-20 left-4 z-10 flex flex-col gap-2">
         <Button variant="secondary" size="icon" className="shadow-lg">
           <Layers />
         </Button>
       </div>
      
       <div className="absolute bottom-24 left-4 z-10 flex flex-col gap-2">
         <Button variant="secondary" size="icon" className="shadow-lg">
           <List />
         </Button>
       </div>

    </div>
  );
}
