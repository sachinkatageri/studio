
"use client";

import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetDescription,
} from "@/components/ui/sheet"
import { properties } from '@/lib/properties';
import Image from "next/image";
import { PlaceHolderImages } from "@/lib/placeholder-images";
import { Badge } from "../ui/badge";
import { Button } from "../ui/button";
import { Phone, Share2, Navigation, Heart, AlertTriangle, Star, Home, ShieldCheck, Warehouse, Armchair, Utensils, Zap, Car, Gamepad2, Presentation, Clock, Coffee, Printer, Users, Wifi, MapPin, Check, ChevronRight, CheckCircle } from "lucide-react";
import { Separator } from "../ui/separator";
import { format } from "date-fns";
import { TooltipProvider, Tooltip, TooltipTrigger, TooltipContent } from '@/components/ui/tooltip';
import { useState } from "react";
import { VerificationProcessDialog } from "../layout/verification-process-dialog";
import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from "../ui/carousel";
import { Card, CardContent } from "../ui/card";
import { ScrollArea } from "../ui/scroll-area";
import { PropertyInfoCard } from "./property-info-card";

interface PropertyDetailsSheetProps {
  propertyId: string | null;
  onClose: () => void;
  onViewDetails: (id: string) => void;
}

export function PropertyDetailsSheet({ propertyId, onClose, onViewDetails }: PropertyDetailsSheetProps) {
  const open = !!propertyId;
  const initialIndex = open ? properties.findIndex(p => p.id === propertyId) : -1;

  return (
    <Sheet open={open} onOpenChange={(open) => !open && onClose()}>
      <SheetContent side="bottom" className="h-[85vh] max-h-[85vh] flex flex-col p-0 bg-transparent border-0">
        <SheetHeader className="sr-only">
          <SheetTitle>Property Details</SheetTitle>
          <SheetDescription>Details for the selected property.</SheetDescription>
        </SheetHeader>
        {open && initialIndex !== -1 && (
           <Carousel className="w-full h-full" opts={{
                startIndex: initialIndex,
                align: 'center',
                loop: true,
           }}>
                <CarouselContent className="h-full -ml-4">
                    {properties.map((property) => (
                        <CarouselItem key={property.id} className="basis-[90%] md:basis-1/3 pl-4">
                            <PropertyInfoCard propertyId={property.id} onClose={onClose} onViewDetails={onViewDetails} />
                        </CarouselItem>
                    ))}
                </CarouselContent>
                <CarouselPrevious className="absolute left-0 top-1/2 -translate-y-1/2 z-10" />
                <CarouselNext className="absolute right-0 top-1/2 -translate-y-1/2 z-10" />
            </Carousel>
        )}
      </SheetContent>
    </Sheet>
  )
}
