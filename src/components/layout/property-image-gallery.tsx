
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
import { ArrowLeft, Share2, Heart, AlertTriangle } from 'lucide-react';
import { properties } from '@/lib/properties';
import { ScrollArea, ScrollBar } from '@/components/ui/scroll-area';
import { ShareOptions } from './share-options';

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
                        {(isMobile || !onClose) && ( // Show back button on mobile or if no close function is provided for desktop
                            <Button variant="ghost" size="icon" onClick={onClose} className="shrink-0 h-9 w-9">
                                <ArrowLeft className="h-5 w-5" />
                            </Button>
                        )}
                        <div className='truncate'>
                            <h1 className="text-sm font-semibold truncate">{property.name}</h1>
                            <p className="text-xs text-muted-foreground truncate">{property.location}</p>
                        </div>
                    </div>
                    <div className="flex items-center">
                        <ShareOptions>
                             <Button variant="outline" size="sm" className="h-8">
                                <Share2 className="h-4 w-4 mr-2" /> Share
                            </Button>
                        </ShareOptions>
                        <Button variant="outline" size="sm" className="h-8 ml-2">
                            <Heart className="h-4 w-4 mr-2" /> Save
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
                                     <ShareOptions>
                                        <Button variant="secondary" size="icon" className="h-8 w-8 rounded-full bg-black/50 text-white hover:bg-black/70">
                                            <Share2 className="h-4 w-4" />
                                        </Button>
                                    </ShareOptions>
                                    <Button variant="secondary" size="icon" className="h-8 w-8 rounded-full bg-black/50 text-white hover:bg-black/70">
                                        <AlertTriangle className="h-4 w-4" />
                                    </Button>
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
            <DialogContent className="max-w-4xl h-[90vh] p-0 flex flex-col">
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
    }
    
    return (
        <div className="relative cursor-pointer" onClick={openGallery}>
             <div className="grid grid-cols-2 md:grid-cols-4 grid-rows-2 gap-2 h-[250px] md:h-[450px]">
                {propertyImageGallery.slice(0, 5).map((image, index) => (
                    <div
                        key={image.id}
                        className={cn(
                            'relative overflow-hidden rounded-lg group',
                            index === 0 && 'md:col-span-2 md:row-span-2',
                            index > 0 && 'col-span-1',
                            index > 2 && 'hidden md:block'
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
            </div>
            <div className="absolute inset-0 flex items-center justify-center bg-black/30 md:bg-transparent">
                <div className="bg-black/50 text-white rounded-lg px-4 py-2 text-sm md:hidden">
                    Tap to see all images
                </div>
            </div>
             <div className="absolute bottom-4 right-4 flex gap-2">
                <Button variant="secondary">
                    Show all {propertyImageGallery.length} photos
                </Button>
            </div>
            <ImageGalleryModal open={!isMobile && isModalOpen} onOpenChange={setIsModalOpen} />
        </div>
    )
}
