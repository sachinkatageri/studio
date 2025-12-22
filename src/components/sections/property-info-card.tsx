
"use client";

import Image from 'next/image';
import { PlaceHolderImages } from '@/lib/placeholder-images';
import { Card, CardContent } from '@/components/ui/card';
import { properties, propertyImageGallery } from '@/lib/properties';
import { Button } from '../ui/button';
import { X, MapPin } from 'lucide-react';
import { TooltipProvider, Tooltip, TooltipTrigger, TooltipContent } from '@/components/ui/tooltip';
import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from '../ui/carousel';
import { Separator } from '../ui/separator';

const WhatsAppIcon = () => (
    <Image src="https://www.buildersinfo.in/property-details/whatsapp.png" alt="WhatsApp" width={20} height={20} />
);


interface PropertyInfoCardProps {
  propertyId: string;
  onClose: () => void;
  onViewDetails: (id: string) => void;
}

export function PropertyInfoCard({ propertyId, onClose, onViewDetails }: PropertyInfoCardProps) {
  const property = properties.find(p => p.id === propertyId);

  if (!property) return null;
  
  const offerPriceString = property.price ? String(property.price).replace(/[^0-9.]/g, '') : '0';
  const offerPrice = parseInt(offerPriceString, 10);
  const beforePrice = Math.round(offerPrice * 1.15);

  return (
      <Card className="w-full max-w-sm mx-auto shadow-xl bg-card border rounded-lg relative overflow-hidden">
        <TooltipProvider>
            <div className="p-4 space-y-2">
                <div className="flex justify-between items-start">
                    <div className="flex items-center gap-2">
                        <h3 className="font-bold text-lg">{property.name}</h3>
                        <Image src="https://cdn-icons-png.flaticon.com/512/5253/5253968.png" alt="Verified" width={18} height={18} />
                    </div>
                    <Tooltip>
                        <TooltipTrigger asChild>
                            <Button variant="ghost" size="icon" className="rounded-full h-8 w-8 shrink-0 -mt-1 -mr-1" onClick={onClose}>
                                <X className="h-5 w-5" />
                            </Button>
                        </TooltipTrigger>
                        <TooltipContent>
                            <p>Close</p>
                        </TooltipContent>
                    </Tooltip>
                </div>
                <p className="text-sm text-muted-foreground flex items-center gap-2"><MapPin className="h-4 w-4" /> {property.location}</p>
                 {property.price && (
                    <div className="flex items-end gap-2">
                        <p className="text-xl font-bold text-primary">
                            {property.price.startsWith('Starting') ? property.price : `₹${property.price}`}
                        </p>
                        {beforePrice > 0 && offerPrice > 0 && !property.price.startsWith('Starting') && (
                            <p className="text-base text-muted-foreground line-through">
                                ₹{beforePrice.toLocaleString('en-IN')}
                            </p>
                        )}
                    </div>
                )}
            </div>
            
            <Separator />

            <Carousel className="w-full">
                <CarouselContent>
                    {propertyImageGallery.slice(0, 5).map((image) => (
                        <CarouselItem key={image.id}>
                            <div className="relative aspect-[4/3] w-full">
                                <Image
                                    src={image.imageUrl}
                                    alt={image.description}
                                    fill
                                    className="object-cover"
                                    data-ai-hint={image.imageHint}
                                />
                            </div>
                        </CarouselItem>
                    ))}
                </CarouselContent>
                <CarouselPrevious className="absolute left-2 top-1/2 -translate-y-1/2 z-10" />
                <CarouselNext className="absolute right-2 top-1/2 -translate-y-1/2 z-10" />
            </Carousel>
        </TooltipProvider>
      </Card>
  );
}
