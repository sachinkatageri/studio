
"use client";

import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetDescription,
} from "@/components/ui/sheet"
import { properties } from './property-list';
import Image from "next/image";
import { PlaceHolderImages } from "@/lib/placeholder-images";
import { Badge } from "../ui/badge";
import { Button } from "../ui/button";
import { Phone, MessageSquare } from "lucide-react";

interface PropertyDetailsSheetProps {
  propertyId: string | null;
  onClose: () => void;
}

export function PropertyDetailsSheet({ propertyId, onClose }: PropertyDetailsSheetProps) {
  const property = properties.find(p => p.id === propertyId);
  const propertyImage = PlaceHolderImages.find(p => p.id === propertyId);

  return (
    <Sheet open={!!propertyId} onOpenChange={(open) => !open && onClose()}>
      <SheetContent side="bottom" className="h-[90vh]">
        <SheetHeader>
          {propertyImage && (
            <div className="relative h-48 w-full -mx-6 -mt-6">
              <Image
                src={propertyImage.imageUrl}
                alt={propertyImage.description}
                fill
                className="object-cover"
                data-ai-hint={propertyImage.imageHint}
              />
            </div>
          )}
          <div className="pt-4">
            {property && (
                <>
                <SheetTitle className="text-2xl">{property.name}</SheetTitle>
                <SheetDescription>{property.location}</SheetDescription>
                </>
            )}
          </div>
        </SheetHeader>
        {property && (
            <div className="py-4 space-y-4">
                <div className="flex justify-between items-center">
                    <p className="text-2xl font-bold text-primary">₹{property.pricePerSqFt} <span className="text-base font-normal text-muted-foreground">/sq.ft</span></p>
                    {/* @ts-ignore */}
                    {property.status && <Badge variant="secondary" className="text-base">{property.status}</Badge>}
                </div>
                
                {/* @ts-ignore */}
                {property.size && <p className="text-lg"><span className="font-semibold">Size:</span> {property.size} sq. yd.</p>}

                <p className="text-lg"><span className="font-semibold">Posted by:</span> Owner</p>
                
                <div className="flex gap-2 pt-4">
                    <Button className="flex-1 text-lg py-6">
                        <Phone className="mr-2 h-5 w-5" /> Call
                    </Button>
                    <Button variant="outline" className="flex-1 text-lg py-6">
                        <MessageSquare className="mr-2 h-5 w-5" /> Message
                    </Button>
                </div>
            </div>
        )}
      </SheetContent>
    </Sheet>
  )
}
