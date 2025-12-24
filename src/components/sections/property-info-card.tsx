
"use client";

import * as React from 'react';
import Image from 'next/image';
import { PlaceHolderImages } from '@/lib/placeholder-images';
import { Card, CardContent } from '@/components/ui/card';
import { properties, propertyImageGallery } from '@/lib/properties';
import { Button } from '../ui/button';
import { X, MapPin, Phone, Share2, Navigation, Heart, AlertTriangle, Star, CheckCircle, Bed, Bath, Square, Armchair, ChevronLeft, ChevronRight, Building } from 'lucide-react';
import { Badge } from '../ui/badge';
import { useState } from 'react';
import { VerificationProcessDialog } from '../layout/verification-process-dialog';
import { ShareOptions } from '../layout/share-options';
import { cn } from '@/lib/utils';
import { useIsMobile } from '@/hooks/use-mobile';
import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious, type CarouselApi } from '../ui/carousel';
import { ScrollArea, ScrollBar } from '../ui/scroll-area';
import { allAmenities } from '@/lib/amenities';

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
  
  const [api, setApi] = React.useState<CarouselApi>()
  const [current, setCurrent] = React.useState(0)
  const [count, setCount] = React.useState(0)

  const [touchStart, setTouchStart] = useState<number | null>(null);
  const [touchEnd, setTouchEnd] = useState<number | null>(null);

  const minSwipeDistance = 50;

  const handleTouchStart = (e: React.TouchEvent) => {
    setTouchEnd(null);
    setTouchStart(e.targetTouches[0].clientX);
  };

  const handleTouchMove = (e: React.TouchEvent) => {
    setTouchEnd(e.targetTouches[0].clientX);
  };

  const handleTouchEnd = () => {
    if (!touchStart || !touchEnd) return;
    const distance = touchStart - touchEnd;
    const isLeftSwipe = distance > minSwipeDistance;
    const isRightSwipe = distance < -minSwipeDistance;

    if (isLeftSwipe) {
      onNext();
    } else if (isRightSwipe) {
      onPrev();
    }

    setTouchStart(null);
    setTouchEnd(null);
  };


  React.useEffect(() => {
    if (!api) return;
    setCount(api.scrollSnapList().length);
    setCurrent(api.selectedScrollSnap());
    api.on("select", () => setCurrent(api.selectedScrollSnap()));
  }, [api]);

  if (!property) return null;

  const propertyAmenities = allAmenities.slice(0, 4);

  if (isMobile) {
      return (
        <div 
          className="w-full h-full flex flex-col justify-end p-[5%]"
          onClick={onClose}
        >
          <div
             onClick={(e) => e.stopPropagation()}
             className="relative"
          >
            <Button onClick={onPrev} size="icon" className="absolute left-[-25px] top-1/2 -translate-y-1/2 z-20 h-8 w-8 rounded-full bg-black/40 text-white border-none hover:bg-black/60">
                <ChevronLeft className="h-5 w-5" />
            </Button>
            <Button onClick={onNext} size="icon" className="absolute right-[-25px] top-1/2 -translate-y-1/2 z-20 h-8 w-8 rounded-full bg-black/40 text-white border-none hover:bg-black/60">
                <ChevronRight className="h-5 w-5" />
            </Button>
            <div 
              className="bg-background/95 backdrop-blur-sm rounded-2xl flex flex-col overflow-hidden h-[90vh]"
              onTouchStart={handleTouchStart}
              onTouchMove={handleTouchMove}
              onTouchEnd={handleTouchEnd}
            >
              <ScrollArea className="flex-1">
                  <div className="p-4 space-y-3">
                  {/* Image Gallery Card */}
                  <Card className="overflow-hidden border-0 shadow-none bg-transparent">
                      <CardContent className="p-0">
                      <div className="relative">
                          <Carousel className="w-full" setApi={setApi}>
                              <CarouselContent>
                                  {propertyImageGallery.length > 0 ? propertyImageGallery.slice(0, 5).map((image) => (
                                      <CarouselItem key={image.id}>
                                          <div className="relative w-full aspect-[16/9] rounded-xl overflow-hidden">
                                              <Image src={image.imageUrl} alt={image.description} fill className="object-cover" data-ai-hint={image.imageHint} />
                                          </div>
                                      </CarouselItem>
                                  )) : (
                                      <CarouselItem>
                                          <div className="relative w-full aspect-[16/9] rounded-xl overflow-hidden bg-muted flex items-center justify-center">
                                              <p className="text-muted-foreground text-sm">No Images</p>
                                          </div>
                                      </CarouselItem>
                                  )}
                              </CarouselContent>
                          </Carousel>
                          <div className="absolute top-3 right-3 flex items-center gap-2">
                              <ShareOptions><Button variant="secondary" size="icon" className="h-8 w-8 rounded-full bg-black/40 text-white border-none hover:bg-black/60"><Share2 className="h-4 w-4" /></Button></ShareOptions>
                              <Button variant="secondary" size="icon" className="h-8 w-8 rounded-full bg-black/40 text-white border-none hover:bg-black/60"><Heart className="h-4 w-4" /></Button>
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
                          <Badge variant="secondary" className="bg-primary/10 text-primary border-primary/20">
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
                  
                  {/* Amenities Card */}
                  <Card className="bg-card shadow-lg border-none">
                      <CardContent className="p-4">
                      <div className="grid grid-cols-4 gap-4">
                          {propertyAmenities.map(amenity => (
                          <div key={amenity.name} className="flex flex-col items-center text-center gap-1.5">
                              <div className="flex items-center justify-center h-12 w-12 rounded-lg bg-muted">
                              <amenity.icon className="h-6 w-6 text-primary" />
                              </div>
                              <span className="text-xs font-medium">{amenity.name}</span>
                          </div>
                          ))}
                      </div>
                      </CardContent>
                  </Card>

                  {/* Developer/Agent Card */}
                  <Card className="bg-card shadow-lg border-none">
                      <CardContent className="p-4 flex items-center justify-between">
                          <div className="flex items-center gap-3">
                              <Image src="https://storage.googleapis.com/realtyplusmag-news-photo/108330.Vaishnavi-Group.png" alt="Developer Logo" width={40} height={40} className="rounded-full object-contain" />
                              <div>
                                  <h3 className="font-semibold">Vaishnavi Group</h3>
                                  <p className="text-xs text-muted-foreground">Developer</p>
                              </div>
                          </div>
                          <div className="flex items-center gap-2">
                              <Button size="icon" className="rounded-full bg-primary/10 hover:bg-primary/20 h-10 w-10"><Phone className="h-5 w-5 text-primary" /></Button>
                              <Button size="icon" className="rounded-full bg-green-500/10 hover:bg-green-500/20 h-10 w-10">
                                  <Image src="https://www.buildersinfo.in/property-details/whatsapp.png" alt="WhatsApp" width={24} height={24} />
                              </Button>
                          </div>
                      </CardContent>
                  </Card>
                  
                  {/* Key Stats Card */}
                  <div className="grid grid-cols-3 gap-3">
                      <Card className="bg-background text-center border">
                          <CardContent className="p-3">
                              <p className="text-xs text-muted-foreground">Price</p>
                              <p className="font-bold text-sm text-primary">₹{property.pricePerSqFt} <span className="font-normal text-xs">/sq.ft</span></p>
                          </CardContent>
                      </Card>
                      <Card className="bg-background text-center border">
                          <CardContent className="p-3">
                              <p className="text-xs text-muted-foreground">Status</p>
                              <p className="font-bold text-sm text-foreground">{property.status}</p>
                          </CardContent>
                      </Card>
                      <Card className="bg-background text-center border">
                          <CardContent className="p-3">
                              <p className="text-xs text-muted-foreground">Reviews</p>
                              <p className="font-bold text-sm text-foreground">{property.reviews}</p>
                          </CardContent>
                      </Card>
                  </div>

                  </div>
              </ScrollArea>
              <div className="p-4 bg-transparent border-t-0 mt-auto">
                  <Button className="w-full h-12 text-base" onClick={() => onViewDetails(property.id)}>View Full Details</Button>
              </div>
            </div>
          </div>
        </div>
      );
  }
  
  // Desktop card
  return (
    <div className="relative w-full max-w-5xl mx-auto">
       <Button onClick={onPrev} size="icon" className="absolute left-[-40px] top-1/2 -translate-y-1/2 z-10 h-8 w-8 rounded-full bg-black/40 text-white border-none hover:bg-black/60">
        <ChevronLeft className="h-5 w-5" />
      </Button>
      <Button onClick={onNext} size="icon" className="absolute right-[-40px] top-1/2 -translate-y-1/2 z-10 h-8 w-8 rounded-full bg-black/40 text-white border-none hover:bg-black/60">
        <ChevronRight className="h-5 w-5" />
      </Button>
      <Card className="w-full shadow-xl bg-card border rounded-lg overflow-hidden">
        <div className="grid grid-cols-3 h-72">
            <div className="relative col-span-1">
                 <Carousel className="w-full h-full" setApi={setApi}>
                    <CarouselContent className="h-full">
                        {propertyImageGallery.length > 0 ? propertyImageGallery.slice(0, 5).map((image, index) => (
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
                        )) : (
                           <CarouselItem className="h-full">
                                <div className="relative h-full w-full bg-muted flex items-center justify-center">
                                    <p className="text-muted-foreground">No Images</p>
                                </div>
                            </CarouselItem>
                        )}
                    </CarouselContent>
                </Carousel>
                <div className="absolute top-2 right-2 flex gap-2 z-20">
                    <ShareOptions>
                        <Button variant="secondary" size="icon" className="h-8 w-8 rounded-full bg-black/30 hover:bg-black/50 text-white hover:text-white">
                            <Share2 className="h-4 w-4" />
                        </Button>
                    </ShareOptions>
                    <Button variant="secondary" size="icon" className="h-8 w-8 rounded-full bg-black/30 hover:bg-black/50 text-white hover:text-white">
                        <Heart className="h-4 w-4" />
                    </Button>
                </div>
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
            <div className="col-span-1 p-4 flex flex-col justify-between relative border-l border-r">
                <ScrollArea className='h-full -m-4'>
                    <div className='p-4 space-y-3'>
                        <div>
                            <div className="flex justify-between items-start">
                                <div>
                                    <h2 className="text-xl font-bold flex items-center gap-2">
                                        {property.name}
                                        <Image src="https://cdn-icons-png.flaticon.com/512/5253/5253968.png" alt="Verified" width={20} height={20} />
                                    </h2>
                                    <p className="text-sm text-muted-foreground flex items-center gap-1"><MapPin className="h-3 w-3" /> {property.location}</p>
                                </div>
                                <Badge variant="secondary" className="bg-primary/10 text-primary border-primary/20">
                                    {property.rating} <Star className="h-3 w-3 ml-1 fill-current" />
                                </Badge>
                            </div>
                        </div>
                        <div className="grid grid-cols-3 gap-2 text-center text-sm text-muted-foreground pt-2">
                            <div className="flex items-center gap-2"><Building className="h-4 w-4 text-primary" /> <span>{property.type}</span></div>
                            {/* @ts-ignore */}
                            {property.size && <div className="flex items-center gap-2"><Square className="h-4 w-4 text-primary" /> <span>{property.size} sq.ft</span></div>}
                            <div className="flex items-center gap-2"><Armchair className="h-4 w-4 text-primary" /> <span>Furnished</span></div>
                        </div>
                        
                        <Card className="bg-card shadow-none border">
                            <CardContent className="p-3">
                                <div className="grid grid-cols-4 gap-2">
                                    {propertyAmenities.map(amenity => (
                                    <div key={amenity.name} className="flex flex-col items-center text-center gap-1">
                                        <div className="flex items-center justify-center h-10 w-10 rounded-lg bg-muted">
                                        <amenity.icon className="h-5 w-5 text-primary" />
                                        </div>
                                        <span className="text-xs font-medium leading-tight">{amenity.name}</span>
                                    </div>
                                    ))}
                                </div>
                            </CardContent>
                        </Card>
                    </div>
                </ScrollArea>
            </div>
            <div className="col-span-1 p-4 flex flex-col justify-between">
                <div className="space-y-3">
                    <div className="grid grid-cols-3 gap-3">
                        <Card className="bg-background text-center border">
                            <CardContent className="p-3">
                                <p className="text-xs text-muted-foreground">Price</p>
                                <p className="font-bold text-sm text-primary">₹{property.pricePerSqFt} <span className="font-normal text-xs">/sq.ft</span></p>
                            </CardContent>
                        </Card>
                        <Card className="bg-background text-center border">
                            <CardContent className="p-3">
                                <p className="text-xs text-muted-foreground">Status</p>
                                <p className="font-bold text-sm text-foreground">{property.status}</p>
                            </CardContent>
                        </Card>
                        <Card className="bg-background text-center border">
                            <CardContent className="p-3">
                                <p className="text-xs text-muted-foreground">Reviews</p>
                                <p className="font-bold text-sm text-foreground">{property.reviews}</p>
                            </CardContent>
                        </Card>
                    </div>
                    <div className="flex items-center justify-between pt-2">
                         <div className="flex items-center gap-3">
                            <Image src="https://picsum.photos/seed/dev-logo/40/40" alt="Developer Logo" width={40} height={40} className="rounded-full object-contain" />
                            <div>
                                <h3 className="font-semibold">Vaishnavi Group</h3>
                                <p className="text-xs text-muted-foreground">Developer</p>
                            </div>
                        </div>
                         <div className="flex items-center gap-2">
                            <Button size="icon" className="rounded-full bg-primary/10 hover:bg-primary/20 h-10 w-10"><Phone className="h-5 w-5 text-primary" /></Button>
                            <Button size="icon" className="rounded-full bg-green-500/10 hover:bg-green-500/20 h-10 w-10">
                                <Image src="https://www.buildersinfo.in/property-details/whatsapp.png" alt="WhatsApp" width={24} height={24} />
                            </Button>
                        </div>
                    </div>
                </div>
                <div className="mt-2">
                    <Button
                        variant="default"
                        className="flex-1 text-base h-11 rounded-lg w-full"
                        onClick={() => onViewDetails(property.id)}
                    >
                        View Details
                    </Button>
                </div>
            </div>
        </div>
      </Card>
       <VerificationProcessDialog open={isVerificationDialogOpen} onOpenChange={setIsVerificationDialogOpen} />
    </div>
  );
}
