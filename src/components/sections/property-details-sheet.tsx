
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
import { Phone, Share2, Navigation, Heart, AlertTriangle, Star, Home, ShieldCheck, Warehouse, Armchair, Utensils, Zap, Car, Gamepad2, Presentation, Clock, Coffee, Printer, Users, Wifi } from "lucide-react";
import { Separator } from "../ui/separator";
import { formatDistanceToNow } from "date-fns";

interface PropertyDetailsSheetProps {
  propertyId: string | null;
  onClose: () => void;
}

const WhatsAppIcon = () => (
    <svg
      role="img"
      viewBox="0 0 24 24"
      xmlns="http://www.w3.org/2000/svg"
      className="h-4 w-4 fill-current"
    >
      <title>WhatsApp</title>
      <path d="M12.04 2.016c-5.523 0-10 4.477-10 10s4.477 10 10 10c1.554 0 3.045-.356 4.378-1.004l4.58 1.005-1.04-4.47c.72-1.39 1.12-3.01 1.12-4.71s-4.478-9.82-10.038-9.82zm4.19 12.06c-.195.345-.78.64-1.12.72-.29.07-.66.1-1.07-.06-.8-.31-1.59-.72-2.24-1.22s-1.15-1.1-1.6-1.8c-.13-.21-.26-.44-.35-.67-.36-.91-.18-1.42.15-1.8.1-.12.23-.15.34-.15.11 0 .22 0 .31.01.1.01.15.02.24.11.16.15.25.38.28.42.06.1.08.23.01.37-.1.21-.15.33-.24.43-.09.1-.18.2-.26.3-.08.08-.16.17-.06.31.08.13.33.56.73.94.55.51 1.05.81 1.4.92.17.05.28.04.38-.02.1-.06.41-.49.52-.66.11-.17.22-.18.37-.11.16.07.95.45 1.12.53s.27.12.31.18.06.27.01.52z" />
    </svg>
);

const amenityIcons: { [key: string]: React.ReactNode } = {
  'High-Speed WiFi': <Wifi className="h-4 w-4" />,
  'Meeting Rooms': <Users className="h-4 w-4" />,
  'Printing': <Printer className="h-4 w-4" />,
  'Coffee Bar': <Coffee className="h-4 w-4" />,
  '24/7 Access': <Clock className="h-4 w-4" />,
  'Event Space': <Presentation className="h-4 w-4" />,
  'Game Zone': <Gamepad2 className="h-4 w-4" />,
  'Free Tea & Coffee': <Coffee className="h-4 w-4" />,
  'Main Road Facing': <Car className="h-4 w-4" />,
  'Ample Parking': <Car className="h-4 w-4" />,
  'Power Backup': <Zap className="h-4 w-4" />,
  'Full Kitchen': <Utensils className="h-4 w-4" />,
  'Seating Area': <Armchair className="h-4 w-4" />,
  'Restrooms': <Home className="h-4 w-4" />,
  'Valet Parking': <Car className="h-4 w-4" />,
  'Loading Dock': <Warehouse className="h-4 w-4" />,
  '24/7 Security': <ShieldCheck className="h-4 w-4" />,
  'High Ceilings': <Home className="h-4 w-4" />,
  'Swimming Pool': <Home className="h-4 w-4" />,
  'Gym': <Home className="h-4 w-4" />,
  'Clubhouse': <Home className="h-4 w-4" />,
  'Private Garden': <Home className="h-4 w-4" />,
  'Community Park': <Home className="h-4 w-4" />,
  'Jogging Track': <Home className="h-4 w-4" />,
  'Gated Community': <ShieldCheck className="h-4 w-4" />,
};


export function PropertyDetailsSheet({ propertyId, onClose }: PropertyDetailsSheetProps) {
  const property = properties.find(p => p.id === propertyId);
  const propertyImage = PlaceHolderImages.find(p => p.id === propertyId);
  
  // @ts-ignore
  const postedDate = property?.postedOn ? formatDistanceToNow(new Date(property.postedOn), { addSuffix: true }) : null;

  return (
    <Sheet open={!!propertyId} onOpenChange={(open) => !open && onClose()}>
      <SheetContent side="bottom" className="h-[90vh] flex flex-col p-0">
        {property && (
          <>
            <SheetHeader className="relative shrink-0">
              {propertyImage && (
                <div className="relative h-48 w-full">
                  <Image
                    src={propertyImage.imageUrl}
                    alt={propertyImage.description}
                    fill
                    className="object-cover"
                    data-ai-hint={propertyImage.imageHint}
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
                </div>
              )}
              <div className="absolute top-4 right-4 flex gap-2">
                <Button variant="secondary" size="icon" className='h-8 w-8 rounded-full bg-black/30 hover:bg-black/50 text-white hover:text-white'>
                    <Navigation className='h-4 w-4' />
                </Button>
                <Button variant="secondary" size="icon" className='h-8 w-8 rounded-full bg-black/30 hover:bg-black/50 text-white hover:text-white'>
                    <Share2 className='h-4 w-4' />
                </Button>
                <Button variant="secondary" size="icon" className='h-8 w-8 rounded-full bg-black/30 hover:bg-black/50 text-white hover:text-white'>
                    <Heart className='h-4 w-4' />
                </Button>
              </div>
              <div className="absolute bottom-0 left-0 p-4">
                <SheetTitle className="text-2xl text-white">{property.name}</SheetTitle>
                <SheetDescription className="text-neutral-300">{property.location}</SheetDescription>
              </div>
            </SheetHeader>
            <div className="flex-1 overflow-y-auto space-y-4 p-4">
                <div className="flex justify-between items-center">
                    <p className="text-2xl font-bold text-primary">₹{property.pricePerSqFt} <span className="text-base font-normal text-muted-foreground">/sq.ft</span></p>
                    {property.status && <Badge variant="secondary" className="text-base">{property.status}</Badge>}
                </div>

                <div className="flex flex-wrap items-center gap-x-4 gap-y-1 text-sm">
                    <div className="flex items-center gap-1">
                        <Star className="h-4 w-4 text-yellow-400 fill-yellow-400" />
                        <span className="font-semibold">{property.rating}</span>
                        <span className="text-muted-foreground">({property.reviews} reviews)</span>
                    </div>
                    <p><span className="font-semibold">Posted by:</span> Owner</p>
                    {postedDate && <p><span className="font-semibold">Posted:</span> {postedDate}</p>}
                </div>
                
                {/* @ts-ignore */}
                {property.size && <p className="text-base"><span className="font-semibold">Size:</span> {property.size} sq. yd.</p>}
                
                <Separator />
                
                <div>
                    <h4 className="text-base font-semibold mb-2">About</h4>
                    <p className="text-sm text-muted-foreground">{property.about}</p>
                </div>

                <div>
                    <h4 className="text-base font-semibold mb-2">Amenities</h4>
                    <div className="flex flex-wrap gap-2">
                        {/* @ts-ignore */}
                        {property.amenities?.map((amenity: string) => (
                            <Badge key={amenity} variant="outline" className="font-normal flex items-center gap-2">
                                {amenityIcons[amenity] || <Home className="h-4 w-4" />}
                                {amenity}
                            </Badge>
                        ))}
                    </div>
                </div>
                
                 <div className="text-center">
                  <Button variant="link" className="text-xs text-muted-foreground h-auto p-0">
                      <AlertTriangle className="h-3 w-3 mr-1" />
                      Report this property
                  </Button>
              </div>
            </div>
            <div className="p-4 border-t bg-background space-y-2 sticky bottom-0">
                <div className="flex gap-2">
                    <Button className="flex-1 text-lg py-6">
                        <Phone className="mr-2 h-5 w-5" /> Call
                    </Button>
                    <Button variant="outline" className="flex-1 text-lg py-6">
                        <WhatsAppIcon /> WhatsApp
                    </Button>
                </div>
                <Button variant="default" className="w-full text-lg py-6">
                  View Details
                </Button>
            </div>
          </>
        )}
      </SheetContent>
    </Sheet>
  )
}

    