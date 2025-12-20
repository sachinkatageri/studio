
"use client";

import Image from 'next/image';
import { PlaceHolderImages } from '@/lib/placeholder-images';
import { Card, CardContent, CardHeader, CardTitle, CardFooter } from '@/components/ui/card';
import { properties } from '@/lib/properties';
import { Button } from '../ui/button';
import { X, Phone, Wifi, Users, Printer, Star, Check, CheckCircle, Coffee, Share2, Heart, Navigation } from 'lucide-react';
import { Badge } from '../ui/badge';
import { Separator } from '../ui/separator';
import { TooltipProvider, Tooltip, TooltipTrigger, TooltipContent } from '@/components/ui/tooltip';
import { format } from 'date-fns';

const WhatsAppIcon = () => (
    <Image src="https://www.buildersinfo.in/property-details/whatsapp.png" alt="WhatsApp" width={20} height={20} />
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
};


export function PropertyInfoCard({ propertyId, onClose, onViewDetails }: PropertyInfoCardProps) {
  const property = properties.find(p => p.id === propertyId);
  const propertyImage = PlaceHolderImages.find(p => p.id === propertyId);

  if (!property) return null;
  
  // @ts-ignore
  const postedDate = property?.postedOn ? format(new Date(property.postedOn), "dd MMMM yyyy") : null;

  return (
      <Card className="w-full max-w-4xl mx-auto shadow-xl bg-card border rounded-lg relative overflow-visible">
        <TooltipProvider>
            <div className="grid grid-cols-12">
                {/* Left Section: Image and Info */}
                <div className="col-span-4 relative h-full">
                    <div className="relative h-full w-full rounded-l-lg overflow-hidden">
                        {propertyImage && (
                            <Image
                            src={propertyImage.imageUrl}
                            alt={propertyImage.description}
                            fill
                            className="object-cover"
                            data-ai-hint={propertyImage.imageHint}
                            />
                        )}
                        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent" />
                    </div>
                     <div className="absolute top-2 left-2 flex gap-1">
                        <Button variant="secondary" size="icon" className="h-8 w-8 rounded-full bg-black/40 text-white border-white/20 hover:bg-black/60"><Navigation className="h-4 w-4" /></Button>
                        <Button variant="secondary" size="icon" className="h-8 w-8 rounded-full bg-black/40 text-white border-white/20 hover:bg-black/60"><Share2 className="h-4 w-4" /></Button>
                        <Button variant="secondary" size="icon" className="h-8 w-8 rounded-full bg-black/40 text-white border-white/20 hover:bg-black/60"><Heart className="h-4 w-4" /></Button>
                    </div>
                    <div className="absolute bottom-2 left-2 text-white">
                        <div className="flex items-center gap-1.5">
                            <h3 className="font-bold">{property.name}</h3>
                             <Image src="https://cdn-icons-png.flaticon.com/512/5253/5253968.png" alt="Verified" width={18} height={18} />
                        </div>
                        <p className="text-xs text-neutral-300 mt-0.5">{property.location}</p>
                    </div>
                </div>

                {/* Middle Section: Details */}
                <div className="col-span-4 p-4 flex flex-col justify-center">
                    <div className="space-y-3">
                         <div>
                            <p className="text-2xl font-bold text-primary">₹{property.pricePerSqFt}<span className="text-sm font-normal text-muted-foreground">/sq.ft</span></p>
                        </div>
                        {/* @ts-ignore */}
                        {property.size && <p><span className="font-semibold">Size:</span> {property.size} sq. yd.</p>}

                        <div className="flex flex-wrap items-center gap-x-4 gap-y-1 text-sm">
                            <div className="flex items-center gap-1">
                                <Star className="h-4 w-4 text-yellow-400 fill-yellow-400" /> 
                                <span className="font-semibold">{property.rating}</span>
                                <span className="text-muted-foreground">({property.reviews} reviews)</span>
                            </div>
                            <p><span className="font-semibold">Posted by:</span> Owner</p>
                        </div>

                         {postedDate && <p className="text-sm"><span className="font-semibold">Date Added:</span> {postedDate}</p>}
                    </div>
                </div>

                {/* Right Section: Actions & Amenities */}
                <div className="col-span-4 p-4 border-l flex flex-col justify-center">
                    <div>
                        <h4 className="font-semibold mb-2 text-sm">Amenities</h4>
                        <div className="grid grid-cols-2 gap-2 mb-4">
                            {property.amenities.slice(0, 4).map(amenity => (
                                <div key={amenity} className="flex items-center gap-2 text-sm">
                                    {amenityIcons[amenity] || <Check className="h-4 w-4 text-primary" />}
                                    <span>{amenity}</span>
                                </div>
                            ))}
                        </div>
                         <div className="flex items-center gap-2 text-sm text-green-600 mb-4">
                            <CheckCircle className="h-4 w-4" />
                            <p>Preliminary verification done.</p>
                        </div>
                         <div className="flex items-center gap-2">
                            <Button variant="outline" size="icon" className="h-10 w-10">
                                <Phone className="h-5 w-5" />
                            </Button>
                             <Button variant="outline" size="icon" className="h-10 w-10 border-green-500 text-green-500 hover:bg-green-50 hover:text-green-600">
                                <WhatsAppIcon />
                            </Button>
                            <Button className="flex-1 h-10" onClick={() => onViewDetails(property.id)}>
                                View Details
                            </Button>
                        </div>
                    </div>
                </div>
            </div>
             <Tooltip>
                <TooltipTrigger asChild>
                    <Button variant="ghost" size="icon" className="absolute top-1 right-1 rounded-full h-8 w-8" onClick={onClose}>
                        <X className="h-5 w-5" />
                    </Button>
                </TooltipTrigger>
                <TooltipContent>
                    <p>Close</p>
                </TooltipContent>
            </Tooltip>
        </TooltipProvider>
      </Card>
  );
}
