

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
import { cn } from '@/lib/utils';

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
  const [isVerificationDialogOpen, setIsVerificationDialogOpen] = useState(false);

  if (!property) return null;
  
  const postedDate = property.postedOn ? format(new Date(property.postedOn), "dd MMMM yyyy") : null;

  return (
    <>
      <Card className="w-full max-w-6xl mx-auto shadow-lg bg-card border rounded-lg">
        <TooltipProvider>
          <div className="grid grid-cols-1 md:grid-cols-3 items-center gap-4 p-4">
            {/* Section 1: Image and Title */}
            <div className="flex items-center gap-4">
                <div className="relative h-24 w-24 rounded-lg overflow-hidden shrink-0">
                    {propertyImage && (
                        <Image
                        src={propertyImage.imageUrl}
                        alt={propertyImage.description}
                        fill
                        className="object-cover"
                        data-ai-hint={propertyImage.imageHint}
                        />
                    )}
                </div>
                <div>
                    <div className="flex items-center gap-2">
                        <h3 className="text-lg font-bold">{property.name}</h3>
                        <Image src="https://cdn-icons-png.flaticon.com/512/5253/5253968.png" alt="Verified" width={20} height={20} />
                    </div>
                    <p className="text-sm text-muted-foreground mt-1">{property.location}</p>
                </div>
            </div>

            {/* Section 2: Details */}
            <div className="flex items-center justify-center gap-6 text-sm border-x px-6">
                 <div>
                    <p className="text-muted-foreground">Price</p>
                    <p className="font-bold text-primary">₹{property.pricePerSqFt} <span className="font-normal text-muted-foreground">/sq.ft</span></p>
                </div>
                {property.size && (
                    <div>
                        <p className="text-muted-foreground">Size</p>
                        <p className="font-semibold">{property.size} sq. yd.</p>
                    </div>
                )}
                 <div className="flex items-center gap-1">
                    <Star className="h-4 w-4 text-yellow-400 fill-yellow-400" />
                    <div>
                        <p className="text-muted-foreground">Rating</p>
                        <span className="font-semibold">{property.rating} <span className="font-normal text-muted-foreground">({property.reviews})</span></span>
                    </div>
                </div>
            </div>

            {/* Section 3: Actions */}
            <div className="flex items-center gap-2 justify-self-end">
                <Tooltip>
                    <TooltipTrigger asChild>
                        <Button variant="outline" size="icon" className="h-11 w-11 rounded-full">
                            <Phone />
                        </Button>
                    </TooltipTrigger>
                    <TooltipContent>
                        <p>Call</p>
                    </TooltipContent>
                </Tooltip>
                <Tooltip>
                    <TooltipTrigger asChild>
                        <Button variant="outline" size="icon" className="h-11 w-11 rounded-full border-green-500 text-green-500 hover:bg-green-500 hover:text-white">
                            <WhatsAppIcon />
                        </Button>
                    </TooltipTrigger>
                    <TooltipContent>
                        <p>WhatsApp</p>
                    </TooltipContent>
                </Tooltip>
                <Button className="h-11 px-6 rounded-full" onClick={() => onViewDetails(property.id)}>
                    View Details
                </Button>
                <Tooltip>
                    <TooltipTrigger asChild>
                        <Button variant="ghost" size="icon" className="rounded-full h-11 w-11" onClick={onClose}>
                            <X className="h-5 w-5" />
                        </Button>
                    </TooltipTrigger>
                    <TooltipContent>
                        <p>Close</p>
                    </TooltipContent>
                </Tooltip>
            </div>
          </div>
        </TooltipProvider>
      </Card>
      <VerificationProcessDialog open={isVerificationDialogOpen} onOpenChange={setIsVerificationDialogOpen} />
    </>
  );
}

