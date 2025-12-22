
"use client";

import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogClose,
} from "@/components/ui/dialog";
import { Drawer, DrawerContent, DrawerHeader, DrawerTitle, DrawerClose } from "@/components/ui/drawer";
import { Button } from "@/components/ui/button";
import { X } from "lucide-react";
import { useIsMobile } from "@/hooks/use-mobile";
import { ScrollArea } from "../ui/scroll-area";
import { allAmenities, Amenity, AmenityCategory } from "@/lib/amenities";
import { cn } from "@/lib/utils";
import React from "react";

interface AmenitiesDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

const groupedAmenities = allAmenities.reduce((acc, amenity) => {
    (acc[amenity.category] = acc[amenity.category] || []).push(amenity);
    return acc;
}, {} as Record<AmenityCategory, Amenity[]>);


function AmenitiesContent() {
  return (
    <ScrollArea className="h-full">
        <div className="p-6 pt-0 space-y-6">
            {Object.entries(groupedAmenities).map(([category, amenities]) => (
                <div key={category}>
                    <h3 className="font-semibold text-lg mb-4 capitalize">{category.toLowerCase().replace(/_/g, ' ')}</h3>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        {amenities.map(amenity => (
                            <div key={amenity.name} className="flex items-center gap-3">
                                <div className="flex items-center justify-center h-10 w-10 rounded-lg bg-muted shrink-0">
                                   {amenity.icon ? <amenity.icon className="h-5 w-5 text-primary" /> : <X className="h-5 w-5 text-primary" />}
                                </div>
                                <span className="text-sm">{amenity.name}</span>
                            </div>
                        ))}
                    </div>
                </div>
            ))}
        </div>
    </ScrollArea>
  )
}

export function AmenitiesDialog({ open, onOpenChange }: AmenitiesDialogProps) {
  const isMobile = useIsMobile();
  
  if (isMobile) {
    return (
      <Drawer open={open} onOpenChange={onOpenChange}>
        <DrawerContent className="h-[90vh]">
            <DrawerHeader className="p-4 flex items-center justify-between border-b shrink-0">
                 <DrawerTitle className="text-xl font-bold">All Amenities</DrawerTitle>
                 <DrawerClose asChild>
                    <Button variant="ghost" size="icon" className="h-8 w-8">
                        <X className="h-5 w-5" />
                    </Button>
                </DrawerClose>
            </DrawerHeader>
            <div className="flex-1 flex flex-col min-h-0">
                <AmenitiesContent />
            </div>
        </DrawerContent>
      </Drawer>
    )
  }

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-3xl">
        <DialogHeader>
          <DialogTitle className="text-2xl font-bold">All Amenities</DialogTitle>
           <DialogClose asChild>
                <button className="absolute right-4 top-4 rounded-sm opacity-70 ring-offset-background transition-opacity hover:opacity-100 focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 disabled:pointer-events-none data-[state=open]:bg-accent data-[state=open]:text-muted-foreground">
                    <X className="h-5 w-5" />
                    <span className="sr-only">Close</span>
                </button>
            </DialogClose>
        </DialogHeader>
        <AmenitiesContent />
      </DialogContent>
    </Dialog>
  );
}
