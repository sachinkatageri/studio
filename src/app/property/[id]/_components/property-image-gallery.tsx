
"use client";

import Image from 'next/image';
import { propertyImageGallery } from '@/lib/properties';
import { Button } from '@/components/ui/button';
import { useState, useRef, useEffect } from 'react';
import {
  Dialog,
  DialogContent,
} from "@/components/ui/dialog"
import { cn } from '@/lib/utils';
import { useIsMobile } from '@/hooks/use-mobile';
import { ArrowLeft, Share2, Heart, AlertTriangle, Camera, X } from 'lucide-react';
import { properties } from '@/lib/properties';
import { ScrollArea, ScrollBar } from '@/components/ui/scroll-area';
import { ShareOptions } from '@/components/layout/share-options';
import { Badge } from '@/components/ui/badge';
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '@/components/ui/tooltip';
import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from '@/components/ui/carousel';

const imageCategories = ["All Photos", "Main Image", "Elevation", "Amenities", "Floor Plan", "Master Plan"];

const GalleryView = ({ isMobile, onClose }: { isMobile: boolean, onClose: () => void }) => {
    const property = properties[0]; // Assuming first property for now
    const [activeTab, setActiveTab] = useState(imageCategories[0]);
    const sectionRefs = useRef<Record<string, HTMLElement | null>>({});
    const scrollContainerRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        const observer = new IntersectionObserver(
            (entries) => {
                entries.forEach((entry) => {
                    if (entry.isIntersecting) {
                        setActiveTab(entry.target.id);
                    }
                });
            },
            { root: scrollContainerRef.current, rootMargin: "-50% 0px -50% 0px" }
        );

        Object.values(sectionRefs.current).forEach((el) => {
            if (el) observer.observe(el);
        });

        return () => observer.disconnect();
    }, []);

    const scrollToCategory = (category: string) => {
        sectionRefs.current[category]?.scrollIntoView({
            behavior: 'smooth',
            block: 'start',
        });
    };
    
    const viewContent = (
        <>
            <header className="sticky top-0 z-20 bg-background/80 backdrop-blur-sm border-b">
                <div className="flex items-center justify-between gap-2 h-14 px-2">
                    <div className="flex items-center gap-1 min-w-0">
                        <Button variant="ghost" size="icon" onClick={onClose} className="shrink-0 h-9 w-9 md:hidden">
                            <ArrowLeft className="h-5 w-5" />
                        </Button>
                        <div className='truncate'>
                            <h1 className="text-sm font-semibold truncate">{property.name}</h1>
                            <p className="text-xs text-muted-foreground truncate">{property.location}</p>
                        </div>
                    </div>
                    <div className="flex items-center gap-1">
                        <ShareOptions>
                             <Button variant="ghost" size="icon" className="h-9 w-9">
                                <Share2 className="h-5 w-5" />
                            </Button>
                        </ShareOptions>
                        <Button variant="ghost" size="icon" className="h-9 w-9">
                            <Heart className="h-5 w-5" />
                        </Button>
                        <Button variant="ghost" size="icon" onClick={onClose} className="shrink-0 h-9 w-9 hidden md:inline-flex">
                            <X className="h-5 w-5" />
                        </Button>
                    </div>
                </div>
                 <ScrollArea className="w-full whitespace-nowrap border-b">
                    <div className="flex px-4 gap-4">
                        {imageCategories.map(category => (
                            <button 
                                key={category}
                                onClick={() => scrollToCategory(category)}
                                className={cn(
                                    "py-2 text-sm font-medium border-b-2 shrink-0",
                                    activeTab === category ? "border-primary text-primary" : "border-transparent text-muted-foreground"
                                )}
                            >
                                {category}
                            </button>
                        ))}
                    </div>
                    <ScrollBar orientation="horizontal" className="invisible" />
                </ScrollArea>
            </header>
            
            <ScrollArea className="flex-1" viewportRef={scrollContainerRef}>
                 <div className="p-4 grid grid-cols-2 md:grid-cols-3 gap-4">
                    {propertyImageGallery.map((image, index) => {
                        const category = imageCategories[(index % (imageCategories.length -1)) + 1]; // Mock category
                        return (
                            <div 
                                key={image.id}
                                id={category}
                                ref={(el) => { if (index === 0) sectionRefs.current['All Photos'] = el; sectionRefs.current[category] = el; }}
                                className="relative aspect-video rounded-lg overflow-hidden group"
                            >
                                <Image
                                    src={image.imageUrl}
                                    alt={image.description}
                                    fill
                                    className="object-cover"
                                    data-ai-hint={image.imageHint}
                                />
                                <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
                                <div className="absolute bottom-2 left-2 text-white text-xs px-2 py-1 rounded-md font-semibold">{category}</div>
                            </div>
                        )
                    })}
                </div>
            </ScrollArea>

            {isMobile && (
                <footer className="sticky bottom-0 bg-background/80 backdrop-blur-sm p-3 border-t">
                    <div className="bg-blue-50 border border-blue-200 text-blue-800 text-sm rounded-lg p-2 text-center mb-3">
                        <p><strong>40+ people</strong> are viewing this property</p>
                    </div>
                    <div className="flex gap-2">
                        <Button variant="outline" className="w-full h-11 rounded-lg">Contact</Button>
                        <Button className="w-full h-11 rounded-lg">
                            <Image src="https://www.buildersinfo.in/property-details/whatsapp.png" alt="WhatsApp" width={20} height={20} />
                            <span className="ml-2">WhatsApp</span>
                        </Button>
                    </div>
                </footer>
            )}
        </>
    );
    
    if (isMobile) {
        return (
            <div className="fixed inset-0 bg-background z-50 flex flex-col h-screen">
                {viewContent}
            </div>
        );
    }
    
    return <div className="flex flex-col h-full">{viewContent}</div>;
};


const ImageGalleryModal = ({ open, onOpenChange }: { open: boolean, onOpenChange: (open: boolean) => void }) => {
    return (
        <Dialog open={open} onOpenChange={onOpenChange}>
            <DialogContent className="max-w-6xl w-[90vw] h-[90vh] p-0 flex flex-col rounded-lg overflow-hidden">
                <GalleryView isMobile={false} onClose={() => onOpenChange(false)} />
            </DialogContent>
        </Dialog>
    )
}

const MobileImageGalleryView = ({ onClose }: { onClose: () => void }) => {
   return <GalleryView isMobile={true} onClose={onClose} />;
}


export default function PropertyImageGallery() {
    const [isModalOpen, setIsModalOpen] = useState(false);
    const isMobile = useIsMobile();
    
    const openGallery = () => setIsModalOpen(true);
    const closeGallery = () => setIsModalOpen(false);

    if (isMobile) {
        if (isModalOpen) {
            return <MobileImageGalleryView onClose={closeGallery} />;
        }
        return (
            <div className="relative h-[300px] w-full cursor-pointer" onClick={openGallery}>
                <Image
                    src={propertyImageGallery[0].imageUrl}
                    alt={propertyImageGallery[0].description}
                    fill
                    className="object-cover"
                    data-ai-hint={propertyImageGallery[0].imageHint}
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent" />

                <div className="absolute inset-0 flex items-center justify-center">
                    <div className="bg-black/50 text-white rounded-full px-4 py-2 text-sm backdrop-blur-sm">
                        Tap to see all images
                    </div>
                </div>

                <div className="absolute bottom-4 right-4 bg-black/60 text-white rounded-full px-3 py-1.5 flex items-center gap-2 text-sm backdrop-blur-sm">
                    <Camera className="h-4 w-4" />
                    <span>{propertyImageGallery.length}</span>
                </div>
            </div>
        )
    }
    
    return (
        <div className="space-y-2">
            <div className="grid grid-cols-3 grid-rows-2 gap-2 h-[400px] md:h-[500px]">
                {/* Main Image */}
                <div className="col-span-2 row-span-2 relative rounded-lg overflow-hidden group cursor-pointer" onClick={openGallery}>
                    <Image
                        src={propertyImageGallery[0].imageUrl}
                        alt={propertyImageGallery[0].description}
                        fill
                        className="object-cover"
                        data-ai-hint={propertyImageGallery[0].imageHint}
                        priority
                    />
                </div>
                {/* Top Right */}
                <div className="col-span-1 row-span-1 relative rounded-lg overflow-hidden group cursor-pointer" onClick={openGallery}>
                    <Image
                        src={propertyImageGallery[1].imageUrl}
                        alt={propertyImageGallery[1].description}
                        fill
                        className="object-cover"
                        data-ai-hint={propertyImageGallery[1].imageHint}
                    />
                </div>
                {/* Bottom Right with Video */}
                 <div className="col-span-1 row-span-1 relative rounded-lg overflow-hidden group cursor-pointer" onClick={openGallery}>
                    <Image
                        src={propertyImageGallery[2].imageUrl}
                        alt={propertyImageGallery[2].description}
                        fill
                        className="object-cover"
                        data-ai-hint={propertyImageGallery[2].imageHint}
                    />
                     <div className="absolute inset-0 bg-black/30 flex items-end justify-end p-2">
                        <Button variant="secondary" size="sm" className="text-white bg-black/50 hover:bg-black/70">
                            Watch Video
                        </Button>
                    </div>
                </div>
            </div>
            
            {/* Thumbnails */}
            <Carousel
              opts={{
                align: "start",
                dragFree: true,
              }}
              className="w-full"
            >
              <CarouselContent className="-ml-2">
                {propertyImageGallery.map((image, index) => (
                  <CarouselItem key={index} className="basis-1/4 md:basis-1/6 pl-2">
                    <div className="relative aspect-video rounded-md overflow-hidden cursor-pointer" onClick={openGallery}>
                      <Image
                        src={image.imageUrl}
                        alt={image.description}
                        fill
                        className="object-cover"
                      />
                    </div>
                  </CarouselItem>
                ))}
              </CarouselContent>
              <CarouselPrevious className="absolute -left-4 top-1/2 -translate-y-1/2 z-10" />
              <CarouselNext className="absolute -right-4 top-1/2 -translate-y-1/2 z-10" />
            </Carousel>

            <ImageGalleryModal open={!isMobile && isModalOpen} onOpenChange={setIsModalOpen} />
        </div>
    )
}
