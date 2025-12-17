
"use client";

import Image from 'next/image';
import { propertyImageGallery } from '@/lib/properties';
import { Button } from '@/components/ui/button';
import { useState } from 'react';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"
import { cn } from '@/lib/utils';
import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from '@/components/ui/carousel';
import { useIsMobile } from '@/hooks/use-mobile';
import { Badge } from '@/components/ui/badge';
import { Check, Camera, Share2, Heart, GalleryVertical } from 'lucide-react';


const ImageGalleryModal = ({ open, onOpenChange }: { open: boolean, onOpenChange: (open: boolean) => void }) => {
    return (
        <Dialog open={open} onOpenChange={onOpenChange}>
            <DialogContent className="max-w-6xl h-[90vh] flex flex-col">
                <DialogHeader>
                    <DialogTitle>Property Gallery</DialogTitle>
                </DialogHeader>
                <Carousel className="w-full h-full flex-1">
                    <CarouselContent className="h-full">
                        {propertyImageGallery.map(image => (
                            <CarouselItem key={image.id}>
                                <div className="relative h-full w-full overflow-hidden rounded-md">
                                    <Image
                                        src={image.imageUrl}
                                        alt={image.description}
                                        fill
                                        className="object-contain"
                                        data-ai-hint={image.imageHint}
                                    />
                                </div>
                            </CarouselItem>
                        ))}
                    </CarouselContent>
                    <CarouselPrevious className="absolute left-4 top-1/2 -translate-y-1/2 z-10" />
                    <CarouselNext className="absolute right-4 top-1/2 -translate-y-1/2 z-10" />
                </Carousel>
            </DialogContent>
        </Dialog>
    )
}


export default function PropertyImageGallery() {
    const [isModalOpen, setIsModalOpen] = useState(false);
    const imagesToShow = 5;
    const remainingImages = propertyImageGallery.length;
    const isMobile = useIsMobile();

    if (isMobile) {
        return (
            <div className="relative">
                <Carousel className="w-full" onClick={() => setIsModalOpen(true)}>
                    <CarouselContent>
                        {propertyImageGallery.slice(0, 1).map((image) => (
                            <CarouselItem key={image.id}>
                                <div className="relative aspect-[4/3] w-full">
                                    <Image
                                        src={image.imageUrl}
                                        alt={image.description}
                                        fill
                                        className="object-cover"
                                        data-ai-hint={image.imageHint}
                                    />
                                    <div className="absolute inset-0 bg-black/30" />
                                </div>
                            </CarouselItem>
                        ))}
                    </CarouselContent>
                </Carousel>

                <div className="absolute top-4 right-4 flex items-center gap-2">
                    <Button variant="secondary" size="icon" className="rounded-full bg-background/80 text-foreground hover:bg-background">
                        <Share2 className="h-5 w-5" />
                    </Button>
                    <Button variant="secondary" size="icon" className="rounded-full bg-background/80 text-foreground hover:bg-background">
                        <Heart className="h-5 w-5" />
                    </Button>
                </div>
                
                <Badge variant="secondary" className="absolute top-4 left-4 bg-background/80 text-foreground border-transparent">
                    <Check className="h-4 w-4 mr-1 text-green-500" />
                    RERA
                </Badge>

                 <div 
                    className="absolute inset-0 flex items-center justify-center cursor-pointer"
                    onClick={() => setIsModalOpen(true)}
                 >
                    <div className="bg-black/50 text-white rounded-lg px-4 py-2 text-sm">
                        Tap to see all images
                    </div>
                </div>

                <div className="absolute bottom-4 right-4">
                     <Button variant="secondary" className="bg-black/60 text-white hover:bg-black/80" onClick={() => setIsModalOpen(true)}>
                        <Camera className="mr-2 h-4 w-4" /> {remainingImages}
                    </Button>
                </div>
                 <ImageGalleryModal open={isModalOpen} onOpenChange={setIsModalOpen} />
            </div>
        )
    }
    
    return (
        <div className="relative">
            <div className="grid grid-cols-2 md:grid-cols-4 grid-rows-2 gap-2 h-[400px]">
                {propertyImageGallery.slice(0, imagesToShow).map((image, index) => (
                    <div
                        key={image.id}
                        className={cn(
                            'relative overflow-hidden rounded-lg group cursor-pointer',
                            index === 0 && 'md:col-span-2 md:row-span-2',
                            index > 0 && 'col-span-1',
                        )}
                        onClick={() => setIsModalOpen(true)}
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
            <div className="absolute bottom-4 right-4 flex gap-2">
                <Button variant="secondary" onClick={() => setIsModalOpen(true)}>
                    <GalleryVertical className="mr-2 h-4 w-4" />
                    {remainingImages > 0 ? `Show all ${remainingImages} photos` : 'View Gallery'}
                </Button>
            </div>
            <ImageGalleryModal open={isModalOpen} onOpenChange={setIsModalOpen} />
        </div>
    )
}
