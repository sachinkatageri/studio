

"use client";

import Image from 'next/image';
import { PlaceHolderImages } from '@/lib/placeholder-images';
import { Card, CardContent, CardHeader, CardTitle, CardFooter } from '@/components/ui/card';
import { properties } from '@/lib/properties';
import { Button } from '../ui/button';
import { X, Phone, Share2, Navigation, Wifi, Users, Printer, Coffee, Clock, Presentation, Gamepad2, Car, Zap, Utensils, Armchair, Warehouse, ShieldCheck, Home, Star, AlertTriangle, Heart, MapPin, Check, ChevronRight, CheckCircle } from 'lucide-react';
import { Badge } from '../ui/badge';
import { Separator } from '../ui/separator';
import { format } from "date-fns";
import { TooltipProvider, Tooltip, TooltipTrigger, TooltipContent } from '@/components/ui/tooltip';
import { useState } from 'react';
import { VerificationProcessDialog } from '../layout/verification-process-dialog';

const WhatsAppIcon = () => (
    <Image src="https://www.buildersinfo.in/property-details/whatsapp.png" alt="WhatsApp" width={16} height={16} />
);


interface PropertyInfoCardProps {
  propertyId: string;
  onClose: () => void;
  onViewDetails: (id: string) => void;
}

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
  'Swimming Pool': <Home className="h-4 w-4" />, // Placeholder
  'Gym': <Home className="h-4 w-4" />, // Placeholder
  'Clubhouse': <Home className="h-4 w-4" />, // Placeholder
  'Private Garden': <Home className="h-4 w-4" />, // Placeholder
  'Community Park': <Home className="h-4 w-4" />, // Placeholder
  'Jogging Track': <Home className="h-4 w-4" />, // Placeholder
  'Gated Community': <ShieldCheck className="h-4 w-4" />,
};


export function PropertyInfoCard({ propertyId, onClose, onViewDetails }: PropertyInfoCardProps) {
  const property = properties.find(p => p.id === propertyId);
  const propertyImage = PlaceHolderImages.find(p => p.id === propertyId);
  const [showDisclaimerDetails, setShowDisclaimerDetails] = useState(false);
  const [isVerificationDialogOpen, setIsVerificationDialogOpen] = useState(false);

  if (!property) return null;
  
  // @ts-ignore
  const postedDate = property.postedOn ? format(new Date(property.postedOn), "dd MMMM yyyy") : null;

  return (
    <>
    <Card className="w-96 shadow-2xl flex flex-col max-h-[calc(100vh-6rem)]">
        <TooltipProvider>
      <CardHeader className="p-0 relative">
        {propertyImage && (
          <div className="relative h-48 w-full">
            <Image
              src={propertyImage.imageUrl}
              alt={propertyImage.description}
              fill
              className="object-cover rounded-t-lg"
              data-ai-hint={propertyImage.imageHint}
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent rounded-t-lg" />
          </div>
        )}
        <Tooltip>
            <TooltipTrigger asChild>
                <Button variant="ghost" size="icon" className="absolute top-2 right-2 bg-black/30 hover:bg-black/50 text-white hover:text-white rounded-full h-8 w-8" onClick={onClose}>
                  <X className="h-4 w-4" />
                </Button>
            </TooltipTrigger>
            <TooltipContent>
                <p>Close</p>
            </TooltipContent>
        </Tooltip>
        <div className="absolute top-2 left-2 flex gap-2">
            <Tooltip>
                <TooltipTrigger asChild>
                    <Button variant="secondary" size="icon" className='h-8 w-8 rounded-full bg-white hover:bg-neutral-100 text-foreground'>
                        <Navigation className='h-4 w-4' />
                    </Button>
                </TooltipTrigger>
                <TooltipContent>
                    <p>Get Directions</p>
                </TooltipContent>
            </Tooltip>
            <Tooltip>
                <TooltipTrigger asChild>
                    <Button variant="secondary" size="icon" className='h-8 w-8 rounded-full bg-white hover:bg-neutral-100 text-foreground'>
                        <Share2 className='h-4 w-4' />
                    </Button>
                </TooltipTrigger>
                <TooltipContent>
                    <p>Share</p>
                </TooltipContent>
            </Tooltip>
            <Tooltip>
                <TooltipTrigger asChild>
                    <Button variant="secondary" size="icon" className='h-8 w-8 rounded-full bg-white hover:bg-neutral-100 text-foreground'>
                        <Heart className='h-4 w-4' />
                    </Button>
                </TooltipTrigger>
                <TooltipContent>
                    <p>Add to Wishlist</p>
                </TooltipContent>
            </Tooltip>
        </div>
        <div className="absolute bottom-0 left-0 p-4 w-full">
          <div className="flex items-center gap-2">
            <CardTitle className="text-xl font-bold text-white">{property.name}</CardTitle>
            <Image src="https://cdn-icons-png.flaticon.com/512/5253/5253968.png" alt="Verified" width={24} height={24} />
          </div>
          <p className="text-sm text-neutral-300 mt-1">{property.location}</p>
        </div>
      </CardHeader>
      <CardContent className="p-4 space-y-4 overflow-y-auto flex-1">
        <div className="flex justify-between items-center">
          <p className="text-xl font-bold text-primary">₹{property.pricePerSqFt} <span className="text-sm font-normal text-muted-foreground">/sq.ft</span></p>
          {property.status && <Badge variant="secondary">{property.status}</Badge>}
        </div>
        
        {/* @ts-ignore */}
        {property.size && <p className="text-sm "><span className="font-semibold">Size:</span> {property.size} sq. yd.</p>}

        <div className="flex flex-wrap items-center gap-x-4 gap-y-1 text-sm">
            <div className="flex items-center gap-1">
                <Star className="h-4 w-4 text-yellow-400 fill-yellow-400" />
                <span className="font-semibold">{property.rating}</span>
                <span className="text-muted-foreground">({property.reviews} reviews)</span>
            </div>
            <p><span className="font-semibold">Posted by:</span> Owner</p>
             {/* @ts-ignore */}
            {postedDate && <p><span className="font-semibold">Date Added:</span> {postedDate}</p>}
        </div>
        

        <Separator />
        
        <div>
            <h4 className="text-sm font-semibold mb-2">About</h4>
            <p className="text-sm text-muted-foreground">{property.about}</p>
        </div>

        <div>
            <h4 className="text-sm font-semibold mb-2">Amenities</h4>
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

      </CardContent>
      <CardFooter className="p-4 border-t bg-background">
        <div className="flex gap-2 w-full">
            <Tooltip>
                <TooltipTrigger asChild>
                    <Button size="icon" className="h-12 w-12">
                        <Phone />
                    </Button>
                </TooltipTrigger>
                <TooltipContent>
                    <p>Call</p>
                </TooltipContent>
            </Tooltip>
            <Tooltip>
                <TooltipTrigger asChild>
                    <Button variant="outline" size="icon" className="h-12 w-12 border-primary text-primary hover:bg-primary hover:text-white">
                        <WhatsAppIcon />
                    </Button>
                </TooltipTrigger>
                <TooltipContent>
                    <p>WhatsApp</p>
                </TooltipContent>
            </Tooltip>
            <Button variant="default" className="flex-1 text-lg h-12" onClick={() => onViewDetails(property.id)}>
                View Details
            </Button>
        </div>
      </CardFooter>
      </TooltipProvider>
    </Card>
    <VerificationProcessDialog open={isVerificationDialogOpen} onOpenChange={setIsVerificationDialogOpen} />
    </>
  );
}
