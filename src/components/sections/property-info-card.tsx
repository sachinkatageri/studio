
"use client";

import * as React from 'react';
import Image from 'next/image';
import { PlaceHolderImages } from '@/lib/placeholder-images';
import { Card, CardContent } from '@/components/ui/card';
import { properties, propertyImageGallery } from '@/lib/properties';
import { Button } from '../ui/button';
import { X, MapPin, Phone, Share2, Navigation, Heart, AlertTriangle, Star, CheckCircle } from 'lucide-react';
import { TooltipProvider, Tooltip, TooltipTrigger, TooltipContent } from '@/components/ui/tooltip';
import { Separator } from '../ui/separator';
import { Badge } from '../ui/badge';
import { format } from 'date-fns';
import { useState } from 'react';
import { VerificationProcessDialog } from '../layout/verification-process-dialog';
import { amenityIcons } from '@/lib/amenities';
import { Check } from 'lucide-react';
import { ScrollArea } from '../ui/scroll-area';
import { ShareOptions } from '../layout/share-options';
import { cn } from '@/lib/utils';
import { useIsMobile } from '@/hooks/use-mobile';
import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious, type CarouselApi } from '../ui/carousel';


interface PropertyInfoCardProps {
  propertyId: string;
  onClose: () => void;
  onViewDetails: (id: string) => void;
}

export function PropertyInfoCard({ propertyId, onClose, onViewDetails }: PropertyInfoCardProps) {
  const property = properties.find(p => p.id === propertyId);
  const propertyImage = PlaceHolderImages.find(p => p.id === propertyId);
  const [isVerificationDialogOpen, setIsVerificationDialogOpen] = useState(false);
  const isMobile = useIsMobile();
  
  const galleryImages = propertyImageGallery.slice(0, 5);
  const staticImageUrl = "https://img.freepik.com/free-photo/3d-rendering-house-model_23-2150799715.jpg?semt=ais_hybrid&w=740&q=80";


  const [api, setApi] = React.useState<CarouselApi>()
  const [current, setCurrent] = React.useState(0)
  const [count, setCount] = React.useState(0)

  React.useEffect(() => {
    if (!api) {
      return
    }

    setCount(api.scrollSnapList().length)
    setCurrent(api.selectedScrollSnap())

    api.on("select", () => {
      setCurrent(api.selectedScrollSnap())
    })
  }, [api])


  if (!property) return null;
  
  const postedDate = property?.postedOn ? format(new Date(property.postedOn), "dd MMMM yyyy") : null;
  const offerPriceString = property.price ? String(property.price).replace(/[^0-9.]/g, '') : '0';
  const offerPrice = parseInt(offerPriceString, 10);
  const beforePrice = Math.round(offerPrice * 1.15);

  if (isMobile) {
      return (
      <Card className="w-full max-w-sm mx-auto shadow-xl bg-card border rounded-lg overflow-hidden flex flex-col h-[80vh]">
        <div className="relative col-span-3">
            <Carousel className="w-full h-48" setApi={setApi}>
                <CarouselContent className="h-full">
                    {galleryImages.map((image, index) => (
                        <CarouselItem key={image.id} className="h-full">
                            <div className="relative h-full w-full">
                                <Image
                                    src={staticImageUrl}
                                    alt={property.name}
                                    fill
                                    className="object-cover"
                                />
                            </div>
                        </CarouselItem>
                    ))}
                </CarouselContent>
            </Carousel>
            <div className="absolute bottom-2 left-0 right-0 z-20 flex items-center justify-center gap-2">
                {Array.from({ length: count }).map((_, index) => (
                <button
                    key={index}
                    className={cn(
                    'h-1.5 w-1.5 rounded-full',
                    index === current ? 'bg-white' : 'bg-white/50'
                    )}
                    onClick={() => api?.scrollTo(index)}
                />
                ))}
            </div>
            <div className="absolute top-2 right-2 flex gap-2 z-20">
                <ShareOptions>
                    <Button
                        variant="secondary"
                        size="icon"
                        className="h-8 w-8 rounded-full bg-black/30 hover:bg-black/50 text-white hover:text-white"
                    >
                        <Share2 className="h-4 w-4" />
                    </Button>
                </ShareOptions>
                <Button
                    variant="secondary"
                    size="icon"
                    className="h-8 w-8 rounded-full bg-black/30 hover:bg-black/50 text-white hover:text-white"
                >
                    <Heart className="h-4 w-4" />
                </Button>
                 <Button variant="ghost" size="icon" className="rounded-full h-8 w-8 shrink-0 bg-black/30 hover:bg-black/50 text-white hover:text-white" onClick={onClose}>
                    <X className="h-5 w-5" />
                </Button>
            </div>
        </div>
        <div className="flex-1 flex flex-col min-h-0">
            <div className="p-4">
                 <p className="text-xs text-muted-foreground">{property.location}</p>
                <div className="flex items-center gap-2">
                    <h3 className="font-semibold text-base">{property.name}</h3>
                    <Image
                        src="https://cdn-icons-png.flaticon.com/512/5253/5253968.png"
                        alt="Verified"
                        width={16}
                        height={16}
                    />
                </div>
                {property.price ? (
                    <div className="flex items-end gap-2 mt-2">
                        <p className="text-xl font-bold text-primary">
                            {property.price.startsWith('Starting') ? property.price : `₹${property.price}`}
                        </p>
                        {beforePrice > 0 && offerPrice > 0 && !property.price.startsWith('Starting') && (
                            <p className="text-xs text-muted-foreground line-through">
                                ₹{beforePrice.toLocaleString('en-IN')}
                            </p>
                        )}
                    </div>
                ) : (
                <p className="text-xl font-bold text-primary">₹{property.pricePerSqFt} <span className="text-xs font-normal text-muted-foreground">/sq.ft</span></p>
                )}
            </div>
            <ScrollArea className="flex-1 min-h-0 px-4">
                <div className="space-y-4 text-sm pb-4">
                    <div className="flex flex-wrap items-center gap-x-4 gap-y-1">
                        <div className="flex items-center gap-1">
                            <Star className="h-4 w-4 text-yellow-400 fill-yellow-400" />
                            <span className="font-semibold">{property.rating}</span>
                            <span className="text-muted-foreground">({property.reviews} reviews)</span>
                        </div>
                        {postedDate && (<p><span className="font-semibold">Posted:</span>{' '}{postedDate}</p>)}
                    </div>
                    {/* @ts-ignore */}
                    {property.size && (<p><span className="font-semibold">Size:</span> {property.size} sq. yd.</p>)}

                    {property.amenities && (
                        <div className="space-y-2">
                            <h4 className="font-semibold mb-2 text-sm">Amenities</h4>
                            <div className="grid grid-cols-4 gap-4">
                                {property.amenities.map((amenityName: string) => {
                                    const Icon = amenityIcons[amenityName];
                                    return (
                                        <div key={amenityName} className="flex flex-col items-center text-center gap-1">
                                            <div className="flex items-center justify-center h-10 w-10 rounded-full bg-muted">
                                                {Icon ? <Icon className="h-5 w-5 text-primary" /> : <Check className="h-5 w-5 text-primary" />}
                                            </div>
                                            <span className="text-xs font-medium">{amenityName}</span>
                                        </div>
                                    );
                                })}
                            </div>
                        </div>
                    )}
                </div>
            </ScrollArea>
            <div className="p-4 border-t bg-background shrink-0">
                <div className="flex gap-2">
                    <Button variant="outline" size="icon" className="h-11 w-11 rounded-lg">
                        <Phone className="h-5 w-5" />
                    </Button>
                    <Button variant="outline" size="icon" className="h-11 w-11 rounded-lg">
                        <Image src="https://www.buildersinfo.in/property-details/whatsapp.png" alt="WhatsApp" width={20} height={20} />
                    </Button>
                    <Button
                        variant="default"
                        className="flex-1 text-base h-11 rounded-lg"
                        onClick={() => onViewDetails(property.id)}
                    >
                        View Details
                    </Button>
                </div>
            </div>
        </div>
         <VerificationProcessDialog open={isVerificationDialogOpen} onOpenChange={setIsVerificationDialogOpen} />
      </Card>
    );
  }
  
  return (
    <Card className="w-full max-w-5xl mx-auto shadow-xl bg-card border rounded-lg overflow-hidden h-[300px]">
        <div className="grid grid-cols-10 h-full">
            <div className="col-span-3 relative">
                 <Carousel className="w-full h-full" setApi={setApi}>
                    <CarouselContent className="h-full">
                        {galleryImages.map((image, index) => (
                            <CarouselItem key={index} className="h-full">
                                <div className="relative h-full w-full">
                                    <Image
                                        src={staticImageUrl}
                                        alt={property.name}
                                        fill
                                        className="object-cover"
                                    />
                                </div>
                            </CarouselItem>
                        ))}
                    </CarouselContent>
                </Carousel>
                <div className="absolute bottom-4 left-0 right-0 z-20 flex items-center justify-center gap-2">
                    {Array.from({ length: count }).map((_, index) => (
                    <button
                        key={index}
                        className={cn(
                        'h-2 w-2 rounded-full',
                        index === current ? 'bg-white' : 'bg-white/50'
                        )}
                        onClick={() => api?.scrollTo(index)}
                    />
                    ))}
                </div>
                 <div className="absolute top-2 left-2 flex gap-2 z-20">
                    <ShareOptions>
                        <Button
                            variant="secondary"
                            size="icon"
                            className="h-8 w-8 rounded-full bg-black/30 hover:bg-black/50 text-white hover:text-white"
                        >
                            <Share2 className="h-4 w-4" />
                        </Button>
                    </ShareOptions>
                    <Button
                        variant="secondary"
                        size="icon"
                        className="h-8 w-8 rounded-full bg-black/30 hover:bg-black/50 text-white hover:text-white"
                    >
                        <Heart className="h-4 w-4" />
                    </Button>
                </div>
            </div>
            <div className="col-span-7 p-4 grid grid-cols-2 gap-4 relative">
                 <Button variant="ghost" size="icon" className="absolute top-2 right-2 h-8 w-8" onClick={onClose}>
                    <X className="h-5 w-5" />
                </Button>
                <div className="text-sm">
                    <p className="text-xs text-muted-foreground">{property.location}</p>
                    <div className="flex items-center gap-2">
                        <h3 className="font-semibold text-base">{property.name}</h3>
                        <Image
                            src="https://cdn-icons-png.flaticon.com/512/5253/5253968.png"
                            alt="Verified"
                            width={16}
                            height={16}
                        />
                    </div>
                    {property.price ? (
                        <div className="flex items-end gap-2 mt-2">
                            <p className="text-xl font-bold text-primary">
                                {property.price.startsWith('Starting') ? property.price : `₹${property.price}`}
                            </p>
                            {beforePrice > 0 && offerPrice > 0 && !property.price.startsWith('Starting') && (
                                <p className="text-xs text-muted-foreground line-through">
                                    ₹{beforePrice.toLocaleString('en-IN')}
                                </p>
                            )}
                        </div>
                    ) : (
                    <p className="text-xl font-bold text-primary">₹{property.pricePerSqFt} <span className="text-xs font-normal text-muted-foreground">/sq.ft</span></p>
                    )}
                     <div className="flex items-center gap-1 mt-2">
                        <Star className="h-4 w-4 text-yellow-400 fill-yellow-400" />
                        <span className="font-semibold">{property.rating}</span>
                        <span className="text-muted-foreground">
                        ({property.reviews} reviews)
                        </span>
                    </div>
                     {postedDate && (
                        <p className="mt-1">
                        <span className="font-semibold">Posted:</span>{' '}
                        {postedDate}
                        </p>
                    )}
                    {/* @ts-ignore */}
                     {property.size && (
                        <p className="mt-1">
                            <span className="font-semibold">Size:</span> {property.size} sq.
                            yd.
                        </p>
                    )}

                </div>
                
                <div className="relative flex flex-col">
                    <ScrollArea className="flex-1 pr-4 -mr-4">
                        <div className="space-y-4">
                            {property.amenities && (
                                <div className="space-y-2">
                                    <h4 className="font-semibold mb-2 text-sm">Amenities</h4>
                                    <div className="grid grid-cols-4 gap-4">
                                        {property.amenities.map((amenityName: string) => {
                                            const Icon = amenityIcons[amenityName];
                                            return (
                                                <div key={amenityName} className="flex flex-col items-center text-center gap-1">
                                                    <div className="flex items-center justify-center h-10 w-10 rounded-full bg-muted">
                                                        {Icon ? <Icon className="h-5 w-5 text-primary" /> : <Check className="h-5 w-5 text-primary" />}
                                                    </div>
                                                    <span className="text-xs font-medium">{amenityName}</span>
                                                </div>
                                            );
                                        })}
                                    </div>
                                </div>
                            )}

                        </div>
                    </ScrollArea>
                    <div className="flex gap-2 pt-4 sticky bottom-0 bg-card">
                        <Button variant="outline" size="icon" className="h-11 w-11 rounded-lg">
                            <Phone className="h-5 w-5" />
                        </Button>
                        <Button variant="outline" size="icon" className="h-11 w-11 rounded-lg">
                            <Image src="https://www.buildersinfo.in/property-details/whatsapp.png" alt="WhatsApp" width={20} height={20} />
                        </Button>
                        <Button
                        variant="default"
                        className="flex-1 text-base h-11 rounded-lg"
                        onClick={() => onViewDetails(property.id)}
                        >
                        View Details
                        </Button>
                    </div>
                </div>
            </div>
        </div>
         <VerificationProcessDialog open={isVerificationDialogOpen} onOpenChange={setIsVerificationDialogOpen} />
    </Card>
  );
}
