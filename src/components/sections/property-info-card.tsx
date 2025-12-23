
"use client";

import Image from 'next/image';
import { PlaceHolderImages } from '@/lib/placeholder-images';
import { Card, CardContent } from '@/components/ui/card';
import { properties, propertyImageGallery } from '@/lib/properties';
import { Button } from '../ui/button';
import { X, MapPin, Phone, Share2, Navigation, Heart, AlertTriangle, Star, CheckCircle } from 'lucide-react';
import { TooltipProvider, Tooltip, TooltipTrigger, TooltipContent } from '@/components/ui/tooltip';
import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from '../ui/carousel';
import { Separator } from '../ui/separator';
import { Badge } from '../ui/badge';
import { format } from 'date-fns';
import { useState } from 'react';
import { VerificationProcessDialog } from '../layout/verification-process-dialog';
import { amenityIcons } from './property-details-panel';
import { Check } from 'lucide-react';
import { ScrollArea } from '../ui/scroll-area';
import { ShareOptions } from '../layout/share-options';


interface PropertyInfoCardProps {
  propertyId: string;
  onClose: () => void;
  onViewDetails: (id: string) => void;
}

export function PropertyInfoCard({ propertyId, onClose, onViewDetails }: PropertyInfoCardProps) {
  const property = properties.find(p => p.id === propertyId);
  const propertyImage = PlaceHolderImages.find(p => p.id === propertyId);
  const [isVerificationDialogOpen, setIsVerificationDialogOpen] = useState(false);
  
  const galleryImages = propertyImageGallery.slice(0, 5);


  if (!property) return null;
  
  // @ts-ignore
  const postedDate = property?.postedOn ? format(new Date(property.postedOn), "dd MMMM yyyy") : null;
  const offerPriceString = property.price ? String(property.price).replace(/[^0-9.]/g, '') : '0';
  const offerPrice = parseInt(offerPriceString, 10);
  const beforePrice = Math.round(offerPrice * 1.15);

  return (
      <Card className="w-full max-w-sm mx-auto shadow-xl bg-card border rounded-lg overflow-hidden flex flex-col h-[80vh]">
        <TooltipProvider>
            <div className="relative">
                {propertyImage && (
                    <div className="relative h-48 w-full">
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
                <div className="absolute top-2 right-2 flex gap-2">
                    <ShareOptions>
                        <Tooltip>
                            <TooltipTrigger asChild>
                                <Button
                                    variant="secondary"
                                    size="icon"
                                    className="h-8 w-8 rounded-full bg-black/30 hover:bg-black/50 text-white hover:text-white"
                                >
                                    <Share2 className="h-4 w-4" />
                                </Button>
                            </TooltipTrigger>
                            <TooltipContent>
                                <p>Share</p>
                            </TooltipContent>
                        </Tooltip>
                    </ShareOptions>
                    <Tooltip>
                        <TooltipTrigger asChild>
                        <Button
                            variant="secondary"
                            size="icon"
                            className="h-8 w-8 rounded-full bg-black/30 hover:bg-black/50 text-white hover:text-white"
                        >
                            <Heart className="h-4 w-4" />
                        </Button>
                        </TooltipTrigger>
                        <TooltipContent>
                        <p>Add to Wishlist</p>
                        </TooltipContent>
                    </Tooltip>
                     <Tooltip>
                        <TooltipTrigger asChild>
                            <Button variant="ghost" size="icon" className="rounded-full h-8 w-8 shrink-0 bg-black/30 hover:bg-black/50 text-white hover:text-white" onClick={onClose}>
                                <X className="h-5 w-5" />
                            </Button>
                        </TooltipTrigger>
                        <TooltipContent>
                            <p>Close</p>
                        </TooltipContent>
                    </Tooltip>
                </div>
                <div className="absolute bottom-4 left-4">
                    <div className="flex items-center gap-2">
                        <h2 className="text-xl text-white font-bold">
                        {property.name}
                        </h2>
                        <Image
                        src="https://cdn-icons-png.flaticon.com/512/5253/5253968.png"
                        alt="Verified"
                        width={20}
                        height={20}
                        />
                    </div>
                    <p className="text-sm text-neutral-300">{property.location}</p>
                </div>
            </div>
             <div className="grid grid-cols-5 gap-1 p-1">
                {galleryImages.map(image => (
                    <div key={image.id} className="relative aspect-square rounded-md overflow-hidden cursor-pointer group transition-transform duration-200 hover:scale-105 hover:shadow-lg shadow-md">
                        <Image
                            src={image.imageUrl}
                            alt={image.description}
                            fill
                            className="object-cover"
                            data-ai-hint={image.imageHint}
                        />
                    </div>
                ))}
            </div>
            <ScrollArea className="flex-1 min-h-0">
                <div className="space-y-4 p-4 text-sm">
                    <div className="flex justify-between items-center">
                    <div>
                        {property.price ? (
                            <div className="flex items-end gap-2">
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
                    {property.status && (
                        <Badge variant="secondary">
                        {property.status}
                        </Badge>
                    )}
                    </div>

                    <div className="flex flex-wrap items-center gap-x-4 gap-y-1">
                    <div className="flex items-center gap-1">
                        <Star className="h-4 w-4 text-yellow-400 fill-yellow-400" />
                        <span className="font-semibold">{property.rating}</span>
                        <span className="text-muted-foreground">
                        ({property.reviews} reviews)
                        </span>
                    </div>

                    {postedDate && (
                        <p>
                        <span className="font-semibold">Date Added:</span>{' '}
                        {postedDate}
                        </p>
                    )}
                    </div>

                    {property.size && (
                    <p>
                        <span className="font-semibold">Size:</span> {property.size} sq.
                        yd.
                    </p>
                    )}

                    <div>
                    <h4 className="font-semibold mb-2">Amenities</h4>
                    <div className="grid grid-cols-4 gap-4">
                        {property.amenities?.slice(0, 4).map((amenity: string) => (
                        <div
                            key={amenity}
                            className="flex flex-col items-center text-center gap-2"
                        >
                            <div className="flex items-center justify-center h-12 w-12 rounded-lg bg-muted">
                            {/* @ts-ignore */}
                            {amenityIcons[amenity] || (
                                <Check className="h-5 w-5 text-primary" />
                            )}
                            </div>
                            <span className="text-xs font-medium">{amenity}</span>
                        </div>
                        ))}
                    </div>
                    </div>

                    <div className="text-xs text-muted-foreground space-y-2 p-3 border rounded-lg">
                    <div className="flex items-start gap-2">
                        <CheckCircle className="h-4 w-4 text-green-500 mt-0.5 shrink-0" />
                        <div>
                        <p className="text-foreground font-semibold">
                            Preliminary verification done.
                        </p>
                        <Button
                            variant="link"
                            className="text-xs p-0 h-auto"
                            onClick={() => setIsVerificationDialogOpen(true)}
                        >
                            Know the Process
                        </Button>
                        </div>
                    </div>
                    <div className="text-center border-t pt-3 mt-3">
                        <p className="text-red-600 mb-2">
                        The land location with survey number could not be verified due
                        to unavailability of cadastral maps.
                        </p>
                        <Button
                        variant="link"
                        className="text-xs p-0 h-auto text-foreground font-normal underline"
                        >
                        <AlertTriangle className="h-4 w-4 mr-1" />
                        Report this listing
                        </Button>
                    </div>
                    </div>
                </div>
            </ScrollArea>
            <div className="mt-auto">
                <Separator />
                <div className="p-4 bg-background shrink-0">
                    <div className="flex gap-2">
                        <TooltipProvider>
                        <Tooltip>
                            <TooltipTrigger asChild>
                            <Button variant="outline" size="icon" className="h-12 w-12 rounded-lg">
                                <Phone className="h-5 w-5" />
                            </Button>
                            </TooltipTrigger>
                            <TooltipContent>
                            <p>Call</p>
                            </TooltipContent>
                        </Tooltip>
                        <Tooltip>
                            <TooltipTrigger asChild>
                            <Button variant="outline" size="icon" className="h-12 w-12 rounded-lg">
                                <Image src="https://www.buildersinfo.in/property-details/whatsapp.png" alt="WhatsApp" width={20} height={20} />
                            </Button>
                            </TooltipTrigger>
                            <TooltipContent>
                            <p>WhatsApp</p>
                            </TooltipContent>
                        </Tooltip>
                        </TooltipProvider>
                        <Button
                        variant="default"
                        className="flex-1 text-base h-12 rounded-lg"
                        onClick={() => onViewDetails(property.id)}
                        >
                        View Details
                        </Button>
                    </div>
                </div>
            </div>
        </TooltipProvider>
         <VerificationProcessDialog open={isVerificationDialogOpen} onOpenChange={setIsVerificationDialogOpen} />
      </Card>
  );
}
