
"use client";

import Image from 'next/image';
import { PlaceHolderImages } from '@/lib/placeholder-images';
import { Card, CardContent, CardHeader, CardTitle, CardFooter } from '@/components/ui/card';
import { properties } from '@/lib/properties';
import { Button } from '../ui/button';
import { X, Phone, Wifi, Users, Printer, Star, Check, CheckCircle, Coffee } from 'lucide-react';
import { Badge } from '../ui/badge';
import { Separator } from '../ui/separator';
import { TooltipProvider, Tooltip, TooltipTrigger, TooltipContent } from '@/components/ui/tooltip';

const WhatsAppIcon = () => (
    <Image src="https://www.buildersinfo.in/property-details/whatsapp.png" alt="WhatsApp" width={16} height={16} />
);


interface PropertyInfoCardProps {
  propertyId: string;
  onClose: () => void;
  onViewDetails: (id: string) => void;
}

const amenityIcons: { [key: string]: React.ReactNode } = {
  'High-Speed WiFi': <Wifi className="h-5 w-5 text-primary" />,
  'Meeting Rooms': <Users className="h-5 w-5 text-primary" />,
  'Printing': <Printer className="h-5 w-5 text-primary" />,
  'Coffee Bar': <Coffee className="h-5 w-5 text-primary" />,
};


export function PropertyInfoCard({ propertyId, onClose, onViewDetails }: PropertyInfoCardProps) {
  const property = properties.find(p => p.id === propertyId);
  const propertyImage = PlaceHolderImages.find(p => p.id === propertyId);

  if (!property) return null;

  const offerPriceString = property.price ? String(property.price).replace(/[^0-9.]/g, '') : '0';
  const offerPrice = parseInt(offerPriceString, 10);
  const beforePrice = Math.round(offerPrice * 1.15);
  
  return (
      <Card className="w-full max-w-6xl mx-auto shadow-lg bg-card border rounded-lg">
        <TooltipProvider>
            <div className="grid grid-cols-3 items-center">
                {/* Section 1: Property Info */}
                <div className="flex items-center gap-4 p-4 col-span-1">
                    <div className="relative h-20 w-20 rounded-lg overflow-hidden shrink-0">
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

                {/* Section 2: Key Details */}
                <div className="grid grid-cols-3 items-center gap-4 text-sm col-span-1">
                    <div className='text-center'>
                        <p className="text-muted-foreground">Price</p>
                        {property.price && (
                            <div className="flex items-end justify-center gap-2">
                            <p className="font-bold text-primary text-base">
                                {property.price.startsWith('Starting') ? property.price : `₹${property.price}`}
                            </p>
                            {!property.price.startsWith('Starting') && offerPrice > 0 && (
                            <p className="text-sm text-muted-foreground line-through">
                                ₹{beforePrice.toLocaleString('en-IN')}
                            </p>
                            )}
                            </div>
                        )}
                    </div>
                    <div className='text-center'>
                        <p className="text-muted-foreground">Rating</p>
                        <div className="flex items-center justify-center gap-1">
                        <Star className="h-4 w-4 text-yellow-400 fill-yellow-400" />
                        <span className="font-semibold">{property.rating} <span className="font-normal text-muted-foreground">({property.reviews})</span></span>
                        </div>
                    </div>
                    <div className="text-center">
                        <p className="text-muted-foreground">Size</p>
                        {/* @ts-ignore */}
                        <p className="font-semibold">{property.size} sq.ft</p>
                    </div>
                </div>

                {/* Section 3: Actions */}
                <div className="flex items-center gap-2 justify-self-end p-4 col-span-1">
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
  );
}
