
"use client";

import Image from 'next/image';
import { propertyImageGallery } from '@/lib/properties';
import { Button } from '@/components/ui/button';
import { useState, useRef, useEffect }from 'react';
import {
  Dialog,
  DialogContent,
} from "@/components/ui/dialog"
import { cn } from '@/lib/utils';
import { useIsMobile } from '@/hooks/use-mobile';
import { ArrowLeft, Share2, Heart, AlertTriangle, Camera, X, Check } from 'lucide-react';
import { properties } from '@/lib/properties';
import { ScrollArea, ScrollBar } from '@/components/ui/scroll-area';
import { ShareOptions } from '@/components/layout/share-options';
import { Badge } from '@/components/ui/badge';
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '@/components/ui/tooltip';

const imageCategories = ["Main Image", "Elevation", "Amenities", "Floor Plan", "Master Plan"];

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
                 <div className="flex flex-col">
                    {propertyImageGallery.map((image, index) => {
                        const category = imageCategories[index % imageCategories.length]; // Mock category
                        return (
                            <div 
                                key={image.id}
                                id={category}
                                ref={(el) => (sectionRefs.current[category] = el)}
                                className="relative"
                            >
                                <Image
                                    src={image.imageUrl}
                                    alt={image.description}
                                    width={800}
                                    height={600}
                                    className="w-full h-auto"
                                    data-ai-hint={image.imageHint}
                                />
                                <div className="absolute bottom-2 left-2 bg-black/50 text-white text-xs px-2 py-1 rounded-md">{category}</div>
                                <div className="absolute top-2 right-2 flex flex-col gap-2">
                                    <TooltipProvider>
                                     <ShareOptions>
                                        <Tooltip>
                                            <TooltipTrigger asChild>
                                                 <Button variant="secondary" size="icon" className="h-8 w-8 rounded-full bg-black/50 text-white hover:bg-black/70">
                                                    <Share2 className="h-4 w-4" />
                                                </Button>
                                            </TooltipTrigger>
                                            <TooltipContent><p>Share</p></TooltipContent>
                                        </Tooltip>
                                    </ShareOptions>
                                    <Tooltip>
                                        <TooltipTrigger asChild>
                                             <Button variant="secondary" size="icon" className="h-8 w-8 rounded-full bg-black/50 text-white hover:bg-black/70">
                                                <AlertTriangle className="h-4 w-4" />
                                            </Button>
                                        </TooltipTrigger>
                                        <TooltipContent><p>Report</p></TooltipContent>
                                    </Tooltip>
                                    </TooltipProvider>
                                </div>
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
            <DialogContent className="max-w-4xl h-[90vh] p-0 flex flex-col rounded-lg overflow-hidden">
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

                <Badge variant="secondary" className="absolute top-4 left-4 bg-background/80 backdrop-blur-sm text-foreground">
                    <Check className="h-4 w-4 mr-1 text-green-500" />
                    RERA
                </Badge>
                
                <TooltipProvider>
                    <Tooltip>
                        <TooltipTrigger asChild>
                            <Button variant="secondary" size="icon" className="absolute top-4 right-4 h-10 w-10 rounded-full bg-background/80 backdrop-blur-sm text-foreground">
                                <Heart className="h-5 w-5" />
                            </Button>
                        </TooltipTrigger>
                        <TooltipContent>
                            <p>Save to wishlist</p>
                        </TooltipContent>
                    </Tooltip>
                </TooltipProvider>


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
    
    const remainingImages = propertyImageGallery.length - 5;

    return (
        <div className="relative container mx-auto cursor-pointer" onClick={openGallery}>
            <div className="grid grid-cols-2 md:grid-cols-4 grid-rows-2 gap-2 h-[250px] md:h-[450px]">
                <div className="relative md:col-span-2 md:row-span-2 rounded-lg overflow-hidden group">
                    <Image
                        src={propertyImageGallery[0].imageUrl}
                        alt={propertyImageGallery[0].description}
                        fill
                        className="object-cover transition-transform duration-300 group-hover:scale-105"
                        data-ai-hint={propertyImageGallery[0].imageHint}
                    />
                    <div className="absolute inset-0 bg-black/20 opacity-0 group-hover:opacity-100 transition-opacity" />
                </div>
                {propertyImageGallery.slice(1, 5).map((image, index) => (
                    <div
                        key={image.id}
                        className={cn(
                            'relative overflow-hidden rounded-lg group',
                            'col-span-1 hidden md:block'
                        )}
                    >
                        <Image
                            src={image.imageUrl}
                            alt={image.description}
                            fill
                            className="object-cover transition-transform duration-300 group-hover:scale-105"
                            data-ai-hint={image.imageHint}
                        />
                         <div className="absolute inset-0 bg-black/20 opacity-0 group-hover:opacity-100 transition-opacity" />
                    </div>
                ))}
                {propertyImageGallery.length > 5 && (
                    <div className="relative col-span-1 row-span-1 hidden md:block rounded-lg overflow-hidden group">
                         <Image
                            src={propertyImageGallery[4].imageUrl}
                            alt={propertyImageGallery[4].description}
                            fill
                            className="object-cover transition-transform duration-300 group-hover:scale-105"
                            data-ai-hint={propertyImageGallery[4].imageHint}
                        />
                        <div className="absolute inset-0 bg-black/60 flex items-center justify-center text-white">
                            <Button variant="secondary" className="bg-black/50 text-white hover:bg-black/70">
                                <Camera className="mr-2 h-4 w-4" />
                                {remainingImages > 0 ? `+${remainingImages} Photos` : 'View All'}
                            </Button>
                        </div>
                    </div>
                )}
            </div>
            
            <ImageGalleryModal open={!isMobile && isModalOpen} onOpenChange={setIsModalOpen} />
        </div>
    )
}
