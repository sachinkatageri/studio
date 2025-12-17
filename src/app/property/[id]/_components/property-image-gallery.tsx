
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
    const remainingImages = propertyImageGallery.length - imagesToShow;
    const isMobile = useIsMobile();

    if (isMobile) {
        return (
            <div className="relative">
                <Carousel className="w-full">
                    <CarouselContent>
                        {propertyImageGallery.map((image) => (
                            <CarouselItem key={image.id}>
                                <div className="relative aspect-[4/3] w-full">
                                    <Image
                                        src={image.imageUrl}
                                        alt={image.description}
                                        fill
                                        className="object-cover"
                                        data-ai-hint={image.imageHint}
                                    />
                                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/20 to-transparent" />
                                </div>
                            </CarouselItem>
                        ))}
                    </CarouselContent>
                    <CarouselPrevious className="absolute left-4 top-1/2 -translate-y-1/2 z-10" />
                    <CarouselNext className="absolute right-4 top-1/2 -translate-y-1/2 z-10" />
                </Carousel>
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
                    {remainingImages > 0 ? `${remainingImages}+ more` : 'View Gallery'}
                </Button>
            </div>
            <ImageGalleryModal open={isModalOpen} onOpenChange={setIsModalOpen} />
        </div>
    )
}
