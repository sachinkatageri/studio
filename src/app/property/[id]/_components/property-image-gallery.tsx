
"use client";

import Image from 'next/image';
import { propertyImageGallery } from '@/lib/properties';
import { Button } from '@/components/ui/button';
import { Heart, Share2 } from 'lucide-react';
import { useState } from 'react';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"
import { cn } from '@/lib/utils';
import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from '@/components/ui/carousel';


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
    
    return (
        <div className="relative">
            <div className="grid grid-cols-2 md:grid-cols-4 grid-rows-2 gap-2 h-[300px]">
                {propertyImageGallery.slice(0, 5).map((image, index) => (
                    <div
                        key={image.id}
                        className={cn(
                            'relative overflow-hidden rounded-lg',
                            index === 0 && 'md:col-span-2 md:row-span-2',
                            index > 0 && 'col-span-1',
                        )}
                    >
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
            <div className="absolute top-4 left-4 flex gap-2">
                <Button variant="secondary" size="icon" className="rounded-full bg-white/80 hover:bg-white text-foreground/80 hover:text-foreground">
                    <Heart className="h-4 w-4" />
                </Button>
            </div>
             <div className="absolute top-4 right-4 flex gap-2">
                <Button variant="secondary" size="icon" className="rounded-full bg-white/80 hover:bg-white text-foreground/80 hover:text-foreground">
                    <Share2 className="h-4 w-4" />
                </Button>
            </div>
            <div className="absolute bottom-4 right-4 flex gap-2">
                <Button variant="secondary" onClick={() => setIsModalOpen(true)}>
                    9+ more
                </Button>
            </div>
            <ImageGalleryModal open={isModalOpen} onOpenChange={setIsModalOpen} />
        </div>
    )
}
