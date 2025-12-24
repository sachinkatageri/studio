
"use client";

import * as React from 'react';
import Image from 'next/image';
import { PlaceHolderImages } from '@/lib/placeholder-images';
import { Card, CardContent } from '@/components/ui/card';
import { properties, propertyImageGallery } from '@/lib/properties';
import { Button } from '../ui/button';
import { X, MapPin, Phone, Share2, Navigation, Heart, AlertTriangle, Star, CheckCircle, Bed, Bath, Building, Square, Armchair, ChevronLeft, ChevronRight } from 'lucide-react';
import { Badge } from '../ui/badge';
import { useState } from 'react';
import { VerificationProcessDialog } from '../layout/verification-process-dialog';
import { ShareOptions } from '../layout/share-options';
import { cn } from '@/lib/utils';
import { useIsMobile } from '@/hooks/use-mobile';
import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious, type CarouselApi } from '../ui/carousel';
import { ScrollArea, ScrollBar } from '../ui/scroll-area';

interface PropertyInfoCardProps {
  propertyId: string;
  onClose: () => void;
  onViewDetails: (id: string) => void;
  onNext: () => void;
  onPrev: () => void;
}

export function PropertyInfoCard({ propertyId, onClose, onViewDetails, onNext, onPrev }: PropertyInfoCardProps) {
  const property = properties.find(p => p.id === propertyId);
  const [isVerificationDialogOpen, setIsVerificationDialogOpen] = useState(false);
  const isMobile = useIsMobile();
  
  const staticImageUrl = "https://img.freepik.com/free-photo/3d-rendering-house-model_23-2150799715.jpg?semt=ais_hybrid&w=740&q=80";

  const [api, setApi] = React.useState<CarouselApi>()
  const [current, setCurrent] = React.useState(0)
  const [count, setCount] = React.useState(0)

  React.useEffect(() => {
    if (!api) return;
    setCount(api.scrollSnapList().length);
    setCurrent(api.selectedScrollSnap());
    api.on("select", () => setCurrent(api.selectedScrollSnap()));
  }, [api]);

  if (!property) return null;

  if (isMobile) {
      return (
        <div className="flex-1 bg-background/95 backdrop-blur-sm rounded-t-2xl flex flex-col overflow-hidden">
          <ScrollArea className="flex-1">
            <div className="p-2 space-y-3">
              {/* Image Gallery Card */}
              <Card className="overflow-hidden border-0 shadow-none bg-transparent">
                <CardContent className="p-0">
                  <div className="relative">
                    <Carousel className="w-full" setApi={setApi}>
                        <CarouselContent>
                            {propertyImageGallery.slice(0, 5).map((image) => (
                                <CarouselItem key={image.id}>
                                    <div className="relative w-full aspect-[4/3] rounded-xl overflow-hidden">
                                        <Image src={image.imageUrl} alt={image.description} fill className="object-cover" data-ai-hint={image.imageHint} />
                                    </div>
                                </CarouselItem>
                            ))}
                        </CarouselContent>
                    </Carousel>
                    <div className="absolute top-3 right-3 flex items-center gap-2">
                        <ShareOptions><Button variant="secondary" size="icon" className="h-8 w-8 rounded-full bg-black/40 text-white border-none hover:bg-black/60"><Share2 className="h-4 w-4" /></Button></ShareOptions>
                        <Button variant="secondary" size="icon" className="h-8 w-8 rounded-full bg-black/40 text-white border-none hover:bg-black/60"><Heart className="h-4 w-4" /></Button>
                        <Button variant="secondary" size="icon" onClick={onClose} className="h-8 w-8 rounded-full bg-black/40 text-white border-none hover:bg-black/60"><X className="h-4 w-4" /></Button>
                    </div>
                     <div className="absolute z-10 top-1/2 -translate-y-1/2 flex justify-between w-full px-2">
                        <Button onClick={onPrev} size="icon" className="h-8 w-8 rounded-full bg-black/40 text-white border-none hover:bg-black/60">
                            <ChevronLeft className="h-5 w-5" />
                        </Button>
                        <Button onClick={onNext} size="icon" className="h-8 w-8 rounded-full bg-black/40 text-white border-none hover:bg-black/60">
                            <ChevronRight className="h-5 w-5" />
                        </Button>
                    </div>
                    <div className="absolute bottom-3 left-1/2 -translate-x-1/2 flex items-center gap-2">
                      {Array.from({ length: count }).map((_, i) => (
                        <button key={i} onClick={() => api?.scrollTo(i)} className={cn('h-1.5 w-1.5 rounded-full transition-all', current === i ? 'w-4 bg-white' : 'bg-white/50')}/>
                      ))}
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* Primary Details Card */}
              <Card className="bg-card shadow-lg border-none">
                <CardContent className="p-4 space-y-3">
                  <div className="flex justify-between items-start">
                    <div>
                      <h2 className="text-lg font-bold flex items-center gap-2">
                        {property.name}
                        <Image src="https://cdn-icons-png.flaticon.com/512/5253/5253968.png" alt="Verified" width={20} height={20} />
                      </h2>
                      <p className="text-xs text-muted-foreground flex items-center gap-1"><MapPin className="h-3 w-3" /> {property.location}</p>
                    </div>
                     <Badge variant="secondary" className="bg-green-100 text-green-800 border-green-200">
                        {property.rating} <Star className="h-3 w-3 ml-1 fill-current" />
                    </Badge>
                  </div>
                  <div className="grid grid-cols-3 gap-2 text-center text-xs text-muted-foreground pt-2">
                      <div className="flex items-center gap-2"><Building className="h-4 w-4 text-primary" /> <span>{property.type}</span></div>
                      {/* @ts-ignore */}
                      {property.size && <div className="flex items-center gap-2"><Square className="h-4 w-4 text-primary" /> <span>{property.size} sq.ft</span></div>}
                      <div className="flex items-center gap-2"><Armchair className="h-4 w-4 text-primary" /> <span>Furnished</span></div>
                  </div>
                </CardContent>
              </Card>

              {/* Developer/Agent Card */}
              <Card className="bg-card shadow-lg border-none">
                 <CardContent className="p-4 flex items-center justify-between">
                    <div className="flex items-center gap-3">
                        <Image src="https://i.ibb.co/L9YvC2Z/bangalore.png" alt="Developer Logo" width={40} height={40} className="rounded-full" />
                        <div>
                            <h3 className="font-semibold">Vaishnavi Group</h3>
                            <p className="text-xs text-muted-foreground">Developer</p>
                        </div>
                    </div>
                    <div className="flex items-center gap-2">
                        <Button size="icon" className="rounded-full bg-green-100 hover:bg-green-200 h-10 w-10"><Phone className="h-5 w-5 text-green-700" /></Button>
                         <Button size="icon" className="rounded-full bg-blue-100 hover:bg-blue-200 h-10 w-10">
                            <Image src="https://www.buildersinfo.in/property-details/whatsapp.png" alt="WhatsApp" width={24} height={24} />
                        </Button>
                    </div>
                 </CardContent>
              </Card>
              
               {/* Key Stats Card */}
              <div className="grid grid-cols-3 gap-3">
                <Card className="bg-card shadow-lg border-none text-center">
                    <CardContent className="p-3">
                        <p className="text-xs text-muted-foreground">Price</p>
                        <p className="font-bold text-sm text-primary">₹{property.pricePerSqFt} <span className="font-normal text-xs">/sq.ft</span></p>
                    </CardContent>
                </Card>
                 <Card className="bg-card shadow-lg border-none text-center">
                    <CardContent className="p-3">
                        <p className="text-xs text-muted-foreground">Status</p>
                        <p className="font-bold text-sm">{property.status}</p>
                    </CardContent>
                </Card>
                 <Card className="bg-card shadow-lg border-none text-center">
                    <CardContent className="p-3">
                        <p className="text-xs text-muted-foreground">Reviews</p>
                        <p className="font-bold text-sm">{property.reviews}</p>
                    </CardContent>
                </Card>
              </div>

            </div>
          </ScrollArea>
          <div className="p-3 bg-background/95 border-t">
             <Button className="w-full h-12 text-base" onClick={() => onViewDetails(property.id)}>View Full Details</Button>
          </div>
        </div>
      );
  }
  
  // Desktop card
  return (
    <div className="relative w-full max-w-lg mx-auto p-4">
      <Card className="w-full shadow-xl bg-card border rounded-lg overflow-hidden">
        <div className="grid grid-cols-10 h-[300px]">
            <div className="col-span-4 relative">
                 <Carousel className="w-full h-full" setApi={setApi}>
                    <CarouselContent className="h-full">
                        {propertyImageGallery.slice(0, 5).map((image, index) => (
                            <CarouselItem key={index} className="h-full">
                                <div className="relative h-full w-full">
                                    <Image
                                        src={image.imageUrl}
                                        alt={property.name}
                                        fill
                                        className="object-cover"
                                        data-ai-hint={image.imageHint}
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
                        className={cn( 'h-2 w-2 rounded-full', index === current ? 'bg-white' : 'bg-white/50')}
                        onClick={() => api?.scrollTo(index)}
                    />
                    ))}
                </div>
            </div>
            <div className="col-span-6 p-4 flex flex-col justify-between relative">
                <div>
                    <p className="text-xs text-muted-foreground">{property.location}</p>
                    <div className="flex items-center gap-2">
                        <h3 className="font-semibold text-base">{property.name}</h3>
                        <Image src="https://cdn-icons-png.flaticon.com/512/5253/5253968.png" alt="Verified" width={16} height={16}/>
                    </div>
                    {property.price ? (
                        <div className="flex items-end gap-2 mt-2">
                            <p className="text-xl font-bold text-primary">
                                {property.price.startsWith('Starting') ? property.price : `₹${property.price}`}
                            </p>
                        </div>
                    ) : (
                    <p className="text-xl font-bold text-primary">₹{property.pricePerSqFt} <span className="text-xs font-normal text-muted-foreground">/sq.ft</span></p>
                    )}
                     <div className="flex items-center gap-1 mt-2">
                        <Star className="h-4 w-4 text-yellow-400 fill-yellow-400" />
                        <span className="font-semibold">{property.rating}</span>
                        <span className="text-muted-foreground"> ({property.reviews} reviews) </span>
                    </div>
                </div>
                
                <div className="flex gap-2 items-center">
                    <div className="flex items-center gap-3">
                          <Image src="https://i.ibb.co/L9YvC2Z/bangalore.png" alt="Developer Logo" width={40} height={40} className="rounded-full" />
                          <div>
                              <h3 className="font-semibold text-sm">Vaishnavi Group</h3>
                              <p className="text-xs text-muted-foreground">Developer</p>
                          </div>
                      </div>
                </div>

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
             <div className="absolute top-2 right-2 flex gap-2 z-20">
                <ShareOptions>
                    <Button variant="secondary" size="icon" className="h-8 w-8 rounded-full bg-black/30 hover:bg-black/50 text-white hover:text-white">
                        <Share2 className="h-4 w-4" />
                    </Button>
                </ShareOptions>
                <Button variant="secondary" size="icon" className="h-8 w-8 rounded-full bg-black/30 hover:bg-black/50 text-white hover:text-white">
                    <Heart className="h-4 w-4" />
                </Button>
                <Button variant="secondary" size="icon" onClick={onClose} className="h-8 w-8 rounded-full bg-black/30 hover:bg-black/50 text-white hover:text-white">
                      <X className="h-4 w-4" />
                  </Button>
            </div>
        </div>
      </Card>
      <Button onClick={onPrev} size="icon" className="absolute left-0 top-1/2 -translate-y-1/2 z-10 h-8 w-8 rounded-full bg-black/40 text-white border-none hover:bg-black/60">
        <ChevronLeft className="h-5 w-5" />
      </Button>
      <Button onClick={onNext} size="icon" className="absolute right-0 top-1/2 -translate-y-1/2 z-10 h-8 w-8 rounded-full bg-black/40 text-white border-none hover:bg-black/60">
        <ChevronRight className="h-5 w-5" />
      </Button>
       <VerificationProcessDialog open={isVerificationDialogOpen} onOpenChange={setIsVerificationDialogOpen} />
    </div>
  );
}

    