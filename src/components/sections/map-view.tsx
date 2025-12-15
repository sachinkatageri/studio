"use client";

import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Checkbox } from '@/components/ui/checkbox';
import { Label } from '@/components/ui/label';
import { Search, SlidersHorizontal, Layers, List, ArrowRight } from 'lucide-react';
import Image from 'next/image';
import { useState } from 'react';
import { Sheet, SheetContent, SheetTrigger, SheetHeader, SheetTitle, SheetFooter } from '@/components/ui/sheet';
import { Separator } from '@/components/ui/separator';
import { Slider } from '@/components/ui/slider';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';

export default function MapView() {
  const [isFilterSheetOpen, setIsFilterSheetOpen] = useState(false);
  const [budget, setBudget] = useState([0, 30]);
  const [size, setSize] = useState([0, 50000]);

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
          <SheetContent className="flex flex-col">
            <SheetHeader>
              <SheetTitle>Filters</SheetTitle>
            </SheetHeader>
            <Separator className="my-4" />
            <div className="flex-grow overflow-y-auto pr-6 space-y-8">
              <div className="space-y-4">
                <h4 className="font-semibold text-lg">Type</h4>
                <div className="flex flex-wrap gap-2">
                  <div className="flex items-center space-x-2 bg-gray-100 dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-full px-4 py-2">
                    <Label htmlFor="commercial-filter" className="text-sm">Commercial</Label>
                    <Checkbox id="commercial-filter" />
                  </div>
                  <div className="flex items-center space-x-2 bg-gray-100 dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-full px-4 py-2">
                    <Label htmlFor="residential-filter" className="text-sm">Residential</Label>
                    <Checkbox id="residential-filter" />
                  </div>
                </div>
              </div>
              <Separator />
              <div className="space-y-4">
                <h4 className="font-semibold text-lg">Listed By:</h4>
                 <div className="flex flex-wrap gap-2">
                  <div className="flex items-center space-x-2 bg-gray-100 dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-full px-4 py-2">
                    <Label htmlFor="owner-filter" className="text-sm">Owner</Label>
                    <Checkbox id="owner-filter" />
                  </div>
                  <div className="flex items-center space-x-2 bg-gray-100 dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-full px-4 py-2">
                    <Label htmlFor="agent-filter" className="text-sm">Agent</Label>
                    <Checkbox id="agent-filter" />
                  </div>
                   <div className="flex items-center space-x-2 bg-gray-100 dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-full px-4 py-2">
                    <Label htmlFor="buildersinfo-filter" className="text-sm">Buildersinfo</Label>
                    <Checkbox id="buildersinfo-filter" />
                  </div>
                </div>
              </div>
              <Separator />
              <div className="space-y-4">
                <h4 className="font-semibold text-lg">Budget <span className="text-sm font-normal text-muted-foreground">(In Crores)</span></h4>
                <div className="flex justify-between text-sm text-muted-foreground">
                  <span>₹{budget[0]}cr</span>
                  <span>₹{budget[1]}cr</span>
                </div>
                <Slider
                  min={0}
                  max={30}
                  step={1}
                  value={budget}
                  onValueChange={setBudget}
                />
              </div>
              <Separator />
               <div className="space-y-4">
                <div className="flex items-center justify-between">
                    <h4 className="font-semibold text-lg">Size</h4>
                    <Select defaultValue="sq-yd">
                        <SelectTrigger className="w-[150px]">
                            <SelectValue placeholder="Select unit" />
                        </SelectTrigger>
                        <SelectContent>
                            <SelectItem value="sq-yd">Square Yards</SelectItem>
                            <SelectItem value="sq-ft">Square Feet</SelectItem>
                            <SelectItem value="sq-m">Square Meters</SelectItem>
                        </SelectContent>
                    </Select>
                </div>
                <div className="flex justify-between text-sm text-muted-foreground">
                  <span>{size[0].toLocaleString()} sq yd</span>
                  <span>{size[1].toLocaleString()} sq yd</span>
                </div>
                <Slider
                  min={0}
                  max={50000}
                  step={100}
                  value={size}
                  onValue-change={setSize}
                />
              </div>
            </div>
            <SheetFooter className="mt-auto pt-4 border-t">
              <Button variant="outline" className="w-full rounded-full">Clear all</Button>
              <Button onClick={() => setIsFilterSheetOpen(false)} className="w-full rounded-full">Apply <ArrowRight className="ml-2 h-4 w-4" /></Button>
            </SheetFooter>
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
