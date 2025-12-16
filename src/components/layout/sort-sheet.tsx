
"use client";

import { useState } from 'react';
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";

const sortOptions = [
    { value: 'builtup-area', label: 'Builtup Area High/Low' },
    { value: 'price-high-low', label: 'Price High/Low' },
    { value: 'price-low-high', label: 'Price Low/High' },
    { value: 'newest', label: 'Newest First' },
];

export function SortSheet({ children }: { children: React.ReactNode }) {
  const [selectedValue, setSelectedValue] = useState('builtup-area');

  return (
    <Sheet>
      <SheetTrigger asChild>
        {children}
      </SheetTrigger>
      <SheetContent side="bottom" className="rounded-t-lg">
        <SheetHeader className="text-left">
          <SheetTitle>Sort by</SheetTitle>
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
