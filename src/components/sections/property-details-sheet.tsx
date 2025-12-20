

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

interface PropertyDetailsSheetProps {
  propertyId: string | null;
  onClose: () => void;
  onViewDetails: (id: string) => void;
}

const WhatsAppIcon = () => (
    <Image src="https://www.buildersinfo.in/property-details/whatsapp.png" alt="WhatsApp" width={24} height={24} />
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

const PropertySheetCard = ({ propertyId, onClose, onViewDetails }: PropertyDetailsSheetProps) => {
    const property = properties.find(p => p.id === propertyId);
    const propertyImage = PlaceHolderImages.find(p => p.id === propertyId);
    const [isVerificationDialogOpen, setIsVerificationDialogOpen] = useState(false);

    if (!property) {
        return null;
    }
    
    // @ts-ignore
    const postedDate = property?.postedOn ? format(new Date(property.postedOn), "dd MMMM yyyy") : null;

    return (
        <>
            <Card className="h-full flex flex-col p-0 border-0 shadow-none bg-transparent">
                <CardContent className="p-0 flex flex-col h-full">
                    <div className="relative shrink-0">
                    {propertyImage && (
                        <div className="relative h-48 w-full rounded-t-lg overflow-hidden">
                        <Image
                            src={propertyImage.imageUrl}
                            alt={propertyImage.description}
                            fill
                            className="object-cover"
                            data-ai-hint={propertyImage.imageHint}
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent" />
                        </div>
                    )}
                    <div className="absolute top-4 right-4 flex gap-2">
                        <TooltipProvider>
                            <Tooltip>
                                <TooltipTrigger asChild>
                                    <Button variant="secondary" size="icon" className='h-8 w-8 rounded-full bg-black/30 hover:bg-black/50 text-white hover:text-white'>
                                        <Navigation className='h-4 w-4' />
                                    </Button>
                                </TooltipTrigger>
                                <TooltipContent>
                                    <p>Get Directions</p>
                                </TooltipContent>
                            </Tooltip>
                            <Tooltip>
                                <TooltipTrigger asChild>
                                    <Button variant="secondary" size="icon" className='h-8 w-8 rounded-full bg-black/30 hover:bg-black/50 text-white hover:text-white'>
                                        <Share2 className='h-4 w-4' />
                                    </Button>
                                </TooltipTrigger>
                                <TooltipContent>
                                    <p>Share</p>
                                </TooltipContent>
                            </Tooltip>
                            <Tooltip>
                                <TooltipTrigger asChild>
                                    <Button variant="secondary" size="icon" className='h-8 w-8 rounded-full bg-black/30 hover:bg-black/50 text-white hover:text-white'>
                                        <Heart className='h-4 w-4' />
                                    </Button>
                                </TooltipTrigger>
                                <TooltipContent>
                                    <p>Add to Wishlist</p>
                                </TooltipContent>
                            </Tooltip>
                        </TooltipProvider>
                    </div>
                    <div className="absolute bottom-0 left-0 p-4">
                        <div className="flex items-center gap-2">
                            <h2 className="text-2xl text-white font-bold">{property.name}</h2>
                            <Image src="https://cdn-icons-png.flaticon.com/512/5253/5253968.png" alt="Verified" width={24} height={24} />
                        </div>
                        <p className="text-neutral-300">{property.location}</p>
                    </div>
                    </div>
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
                            
                            {postedDate && <p><span className="font-semibold">Date Added:</span> {postedDate}</p>}
                        </div>
                        
                        {/* @ts-ignore */}
                        {property.size && <p className="text-base"><span className="font-semibold">Size:</span> {property.size} sq. yd.</p>}
                        
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

                        
                        <div className="text-sm text-muted-foreground space-y-2 p-4 border rounded-lg">
                        <div className="flex items-start gap-2">
                            <CheckCircle className="h-5 w-5 text-green-500 mt-0.5 shrink-0" />
                            <div>
                            <p className="text-foreground font-semibold">Preliminary verification done.</p>
                            <Button variant="link" className="text-xs p-0 h-auto" onClick={() => setIsVerificationDialogOpen(true)}>
                                Know the Process
                            </Button>
                            </div>
                        </div>
                        <div className="text-center border-t pt-4 mt-4">
                            <p className="text-xs text-red-600 mb-2">The land location with survey number could not be verified due to unavailability of cadastral maps.</p>
                            <Button variant="link" className="text-xs p-0 h-auto text-foreground font-normal underline">
                                <AlertTriangle className="h-4 w-4 mr-1" />
                                Report this listing
                            </Button>
                        </div>
                        </div>
                    </div>
                    <div className="p-4 border-t bg-background sticky bottom-0">
                        <div className="flex gap-2">
                            <TooltipProvider>
                                <Tooltip>
                                    <TooltipTrigger asChild>
                                        <Button variant="outline" size="icon" className="h-14 w-14">
                                            <Phone className="h-6 w-6" />
                                        </Button>
                                    </TooltipTrigger>
                                    <TooltipContent>
                                        <p>Call</p>
                                    </TooltipContent>
                                </Tooltip>
                                <Tooltip>
                                    <TooltipTrigger asChild>
                                        <Button variant="outline" size="icon" className="h-14 w-14">
                                            <WhatsAppIcon />
                                        </Button>
                                    </TooltipTrigger>
                                    <TooltipContent>
                                        <p>WhatsApp</p>
                                    </TooltipContent>
                                </Tooltip>
                            </TooltipProvider>
                            <Button variant="default" className="flex-1 text-lg h-14" onClick={() => onViewDetails(property.id)}>
                                View Details
                            </Button>
                        </div>
                    </div>
                </CardContent>
            </Card>
            <VerificationProcessDialog open={isVerificationDialogOpen} onOpenChange={setIsVerificationDialogOpen} />
        </>
    )
}


export function PropertyDetailsSheet({ propertyId, onClose, onViewDetails }: PropertyDetailsSheetProps) {
  const open = !!propertyId;
  const initialIndex = properties.findIndex(p => p.id === propertyId);

  return (
    <Sheet open={open} onOpenChange={(open) => !open && onClose()}>
      <SheetContent side="bottom" className="h-[90vh] flex flex-col p-0 bg-background border-0">
        <SheetHeader className="sr-only">
          <SheetTitle>Property Details</SheetTitle>
          <SheetDescription>Details for the selected property.</SheetDescription>
        </SheetHeader>
        {open && (
           <Carousel className="w-full h-full" opts={{
                startIndex: initialIndex,
                align: 'center',
                loop: true,
           }}>
                <CarouselContent className="h-full">
                    {properties.map((property) => (
                        <CarouselItem key={property.id} className="pt-12 basis-[90%] md:basis-1/3">
                            <div className="h-full overflow-hidden bg-card rounded-lg border">
                                <PropertySheetCard propertyId={property.id} onClose={onClose} onViewDetails={onViewDetails} />
                            </div>
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
