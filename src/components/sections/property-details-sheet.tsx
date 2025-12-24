
"use client";

import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetDescription,
} from "@/components/ui/sheet"
import { properties } from '@/lib/properties';
import { PropertyInfoCard } from "./property-info-card";

interface PropertyDetailsSheetProps {
  propertyId: string | null;
  onClose: () => void;
  onViewDetails: (id: string) => void;
  onNext: () => void;
  onPrev: () => void;
}

export function PropertyDetailsSheet({ propertyId, onClose, onViewDetails, onNext, onPrev }: PropertyDetailsSheetProps) {
  const open = !!propertyId;
  const property = properties.find(p => p.id === propertyId);

  return (
    <Sheet open={open} onOpenChange={(open) => !open && onClose()}>
      <SheetContent 
        side="bottom" 
        className="h-[95%] flex flex-col p-0 bg-transparent border-0"
        onClick={(e) => e.stopPropagation()} // Prevent closing when clicking inside content
      >
        <SheetHeader className="sr-only">
          <SheetTitle>Property Details</SheetTitle>
          <SheetDescription>Details for the selected property.</SheetDescription>
        </SheetHeader>
        {property && (
            <PropertyInfoCard 
              propertyId={property.id} 
              onClose={onClose} 
              onViewDetails={onViewDetails}
              onNext={onNext}
              onPrev={onPrev}
            />
        )}
      </SheetContent>
    </Sheet>
  )
}
