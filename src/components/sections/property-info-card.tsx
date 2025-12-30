
"use client";

import * as React from 'react';
import Image from 'next/image';
import { PlaceHolderImages } from '@/lib/placeholder-images';
import { Card, CardContent } from '@/components/ui/card';
import { properties, propertyImageGallery } from '@/lib/properties';
import { Button } from '../ui/button';
import { X, MapPin, Phone, Share2, Navigation, Heart, AlertTriangle, Star, CheckCircle, Bed, Bath, Square, Armchair, ChevronLeft, ChevronRight, Building, Undo, Redo, Package, Siren, Users, Briefcase, LandPlot, Building2, Info, BellRing, KeyRound, Video, ArrowRight, ExternalLink } from 'lucide-react';
import { Badge } from '../ui/badge';
import { useState } from 'react';
import { VerificationProcessDialog } from '../layout/verification-process-dialog';
import { ShareOptions } from '../layout/share-options';
import { cn } from '@/lib/utils';
import { useIsMobile } from '@/hooks/use-mobile';
import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious, type CarouselApi } from '../ui/carousel';
import { ScrollArea, ScrollBar } from '../ui/scroll-area';
import { allAmenities, Amenity, AmenityCategory } from '@/lib/amenities';
import Link from 'next/link';

interface PropertyInfoCardProps {
  propertyId: string;
  onClose: () => void;
  onViewDetails: (id: string) => void;
  onNext: () => void;
  onPrev: () => void;
}

const UserIcon = (props: any) => <svg {...props} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M19 21v-2a4 4 0 0 0-4-4H9a4 4 0 0 0-4 4v2"/><circle cx="12" cy="7" r="4"/></svg>;

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
    setTouchStart(e.target.touches[0].clientX);
  };

  const handleTouchMove = (e: React.TouchEvent) => {
    setTouchEnd(e.target.touches[0].clientX);
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

  const amenitiesToShow = allAmenities.filter(a => ['GUEST_SERVICES', 'SECURITY', 'FOOD_BEVERAGES'].includes(a.category)).slice(0, 8);


  const brandStats = [
    { value: "2+", label: "Cities", icon: Building2},
    { value: "1000+", label: "Clients", icon: Users},
    { value: "27+", label: "Coworking Spaces", icon: Briefcase},
    { value: "8000+", label: "Seats", icon: Armchair}
  ];

  if (isMobile) {
      return (
        <div 
          className="w-full h-full flex flex-col justify-end p-[5%]"
        >
          <div
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
              <div className="p-4 pb-0">
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
              </div>

              <ScrollArea className="flex-1">
                  <div className="p-4 space-y-3">
                  <Card className="bg-card shadow-lg border-none">
                      <CardContent className="p-4 space-y-3">
                      <div className="flex justify-between items-start">
                          <div>
                          <button onClick={() => onViewDetails(property.id)} className="text-left">
                            <h2 className="text-lg font-bold flex items-center gap-2 hover:underline">
                                {property.name}
                                <Image src="https://cdn-icons-png.flaticon.com/512/5253/5253968.png" alt="Verified" width={20} height={20} />
                            </h2>
                          </button>
                          <p className="text-xs text-muted-foreground flex items-center gap-1"><MapPin className="h-3 w-3" /> {property.location}</p>
                          </div>
                          <Badge variant="secondary" className="bg-amber-100 text-amber-700 border-amber-200">
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
                  
                  <Card className="bg-card shadow-lg border-none">
                      <CardContent className="p-4">
                      <div className="grid grid-cols-4 gap-4">
                          {amenitiesToShow.slice(0, 4).map(amenity => {
                              const Icon = amenity.icon;
                              return (
                                <div key={amenity.name} className="flex flex-col items-center text-center gap-1.5">
                                    <div className="flex items-center justify-center h-12 w-12 rounded-lg bg-muted">
                                    <Icon className="h-6 w-6 text-primary" />
                                    </div>
                                    <span className="text-xs font-medium">{amenity.name}</span>
                                </div>
                              );
                          })}
                      </div>
                      </CardContent>
                  </Card>

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
                  
                  <Card className="bg-card shadow-lg border-none">
                      <CardContent className="p-4 flex items-center justify-between">
                          <div>
                              <h4 className="font-bold text-sm leading-tight">BHIVE<br/>Workspace</h4>
                          </div>
                          <div className="flex items-center gap-2">
                              <Button size="icon" className="rounded-full bg-primary/10 hover:bg-primary/20 h-10 w-10"><Phone className="h-5 w-5 text-primary" /></Button>
                              <Button size="icon" className="rounded-full bg-green-500/10 hover:bg-green-500/20 h-10 w-10">
                                  <Image src="https://www.buildersinfo.in/property-details/whatsapp.png" alt="WhatsApp" width={24} height={24} />
                              </Button>
                          </div>
                      </CardContent>
                  </Card>

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

  return (
    <div className="relative w-full max-w-5xl mx-auto flex items-center" >
        <Card className="w-full shadow-xl bg-card border rounded-2xl overflow-hidden grid grid-cols-12" style={{ height: '35vh' }}>
            <div className="col-span-5 relative group h-full">
                <div className="absolute top-2 left-2 z-10">
                    <Image src="https://i.ibb.co/sJJ7pxJW/1.png" alt="Grand Mercure" width={100} height={30} />
                </div>
                <div className="absolute top-2 right-2 z-10">
                    <Image src="https://i.ibb.co/Myvbrfq/Top-rated.png" alt="Top Rated" width={64} height={64} />
                </div>
                 
                <div className="relative w-full h-full">
                    <Image
                        src={propertyImageGallery[0].imageUrl}
                        alt={property.name}
                        fill
                        className="object-cover"
                        data-ai-hint={propertyImageGallery[0].imageHint}
                    />
                </div>
                
                <div className="absolute top-2 left-2 z-10 flex flex-row gap-2">
                    <Button variant="ghost" size="icon" className="h-8 w-8 rounded-full bg-black/30 text-white hover:bg-black/50"><Heart className="h-4 w-4" /></Button>
                    <ShareOptions><Button variant="ghost" size="icon" className="h-8 w-8 rounded-full bg-black/30 text-white hover:bg-black/50"><Share2 className="h-4 w-4" /></Button></ShareOptions>
                    <Button variant="ghost" size="icon" className="h-8 w-8 rounded-full bg-black/30 text-white hover:bg-black/50" onClick={onNext}><ArrowRight className="h-4 w-4" /></Button>
                    <Button variant="ghost" size="icon" className="h-8 w-8 rounded-full bg-black/30 text-white hover:bg-black/50" onClick={() => window.open(`/property/${propertyId}`, '_blank')}><ExternalLink className="h-4 w-4" /></Button>
                </div>
            </div>

            <div className="col-span-7 p-4 pr-8 flex flex-col justify-between h-full">
                <div className="flex justify-between items-start">
                    <div>
                        <div className="flex items-center gap-2">
                            <h2 className="text-xl font-bold leading-tight">{property.name}</h2>
                            <Badge variant="secondary" className="bg-amber-100 text-amber-700 border-amber-200">
                                <Star className="h-3 w-3 mr-1 fill-current" /> {property.rating}
                            </Badge>
                             <Image src="https://cdn-icons-png.flaticon.com/512/5253/5253968.png" alt="Verified" width={20} height={20} />
                        </div>
                        <div className="flex items-center gap-2 mt-1">
                            <MapPin className="h-4 w-4 text-muted-foreground" />
                            <p className="text-sm text-muted-foreground">{property.location}</p>
                        </div>
                    </div>
                    <div className="text-right flex-shrink-0 pl-4">
                        <p className="text-md text-muted-foreground line-through">₹8,000</p>
                        <p className="text-2xl font-bold text-primary">₹6,990</p>
                    </div>
                </div>

                 <div className="flex items-center gap-4 my-1">
                    <Badge variant="outline" className="text-green-600 border-green-200 bg-green-50 text-xs px-2 py-1 flex items-center gap-1">
                        <CheckCircle className="h-3 w-3" />
                        Best price guaranteed
                    </Badge>
                    <div className="flex items-center gap-2">
                        <Button variant="outline" size="icon" className="rounded-full h-8 w-8">
                            <Phone className="h-4 w-4 text-primary" />
                        </Button>
                        <Button variant="outline" size="icon" className="rounded-full h-8 w-8">
                           <Image src="https://www.buildersinfo.in/property-details/whatsapp.png" alt="WhatsApp" width={16} height={16} />
                        </Button>
                    </div>
                </div>

                <div className="grid grid-cols-12 gap-4 flex-grow items-center">
                    <div className="col-span-7">
                        <Card className="border-none shadow-none bg-muted/50 h-full">
                            <CardContent className="p-2">
                                <div className="grid grid-cols-4 gap-y-2 gap-x-1">
                                    {amenitiesToShow.map((amenity, index) => {
                                        const Icon = amenity.icon;
                                        return (
                                        <div key={index} className="flex flex-col items-center text-center gap-1">
                                            <div className="flex items-center justify-center h-8 w-8 rounded-md bg-background">
                                                <Icon className="h-5 w-5 text-primary" />
                                            </div>
                                            <span className="text-[10px] font-medium text-center leading-tight">{amenity.name}</span>
                                        </div>
                                        );
                                    })}
                                </div>
                            </CardContent>
                        </Card>
                    </div>
                    <div className="col-span-5 space-y-1">
                        <div className="flex items-center gap-2">
                            <h3 className="text-[10px] font-semibold uppercase text-muted-foreground tracking-wider">About the brand</h3>
                        </div>
                        <div className="w-6 h-0.5 bg-primary mt-0.5"></div>
                         <div className="flex items-center gap-2 pt-1">
                             <h4 className="font-bold text-sm leading-tight">BHIVE<br/>Workspace</h4>
                        </div>
                        <div className="grid grid-cols-2 gap-x-2 text-[10px]">
                            {brandStats.map(stat => (
                                <div key={stat.label} className="flex items-center gap-1">
                                    <stat.icon className="h-3 w-3 text-muted-foreground" />
                                    <div className='flex items-baseline gap-0.5'>
                                        <span className="font-bold text-[10px]">{stat.value}</span>
                                        <span className="text-muted-foreground text-[8px] whitespace-nowrap">{stat.label}</span>
                                    </div>
                                </div>
                            ))}
                        </div>
                        <p className="text-[10px] text-muted-foreground leading-snug pt-1">
                            BHIVE Workspace, established in 2014, specializes in providing Zero CapEx, Enterprise Grade, Customized... <Link href="#" className="text-primary font-semibold">Read more</Link>
                        </p>
                    </div>
                </div>
            </div>

            <button
                onClick={() => onViewDetails(property.id)}
                className="absolute -right-3 top-1/2 -translate-y-1/2 bg-primary text-primary-foreground h-full flex items-center justify-center px-3 rounded-r-lg hover:bg-primary/90 transition-colors z-10"
                style={{ writingMode: 'vertical-rl' }}
            >
                <span className="rotate-180 font-semibold tracking-wider text-xs">View Details</span>
            </button>
        </Card>
    </div>
  );
}
