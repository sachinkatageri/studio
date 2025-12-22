
"use client";

import { useState } from 'react';
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
  SheetDescription,
  SheetClose
} from "@/components/ui/sheet";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Button } from '../ui/button';
import { X } from 'lucide-react';

const sortOptions = [
    { value: 'relevance', label: 'Relevance' },
    { value: 'builtup-area', label: 'Builtup Area High/Low' },
    { value: 'price-high-low', label: 'Price High/Low' },
    { value: 'price-low-high', label: 'Price Low/High' },
    { value: 'newest', label: 'Newest First' },
];

export function SortSheet({ children }: { children: React.ReactNode }) {
  const [selectedValue, setSelectedValue] = useState('relevance');

  return (
    <Sheet>
      <SheetTrigger asChild>
        {children}
      </SheetTrigger>
      <SheetContent side="bottom" className="rounded-t-lg">
        <SheetHeader className="flex-row items-center justify-between text-left">
          <SheetTitle>Sort by</SheetTitle>
           <SheetClose asChild>
                <Button variant="ghost" size="icon" className="h-8 w-8">
                    <X className="h-5 w-5" />
                </Button>
            </SheetClose>
        </SheetHeader>
        <RadioGroup value={selectedValue} onValueChange={setSelectedValue} className="mt-4 space-y-1">
          {sortOptions.map(option => (
             <Label 
                key={option.value} 
                htmlFor={option.value}
                className="flex items-center justify-between p-4 rounded-lg hover:bg-muted"
            >
                {option.label}
                <RadioGroupItem value={option.value} id={option.value} />
            </Label>
          ))}
        </RadioGroup>
      </SheetContent>
    </Sheet>
  );
}
