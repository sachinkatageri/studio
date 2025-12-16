
"use client";

import Image from 'next/image';
import { propertyImageGallery } from '@/lib/properties';
import { Button } from '@/components/ui/button';
import { Camera, Grid2x2, Heart, MessageCircle, Share2 } from 'lucide-react';
import { useState } from 'react';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"
import { cn } from '@/lib/utils';


const ImageGalleryModal = ({ open, onOpenChange }: { open: boolean, onOpenChange: (open: boolean) => void }) => {
    return (
        <Dialog open={open} onOpenChange={onOpenChange}>
            <DialogContent className="max-w-6xl h-[90vh] flex flex-col">
                <DialogHeader>
                    <DialogTitle>Property Gallery</DialogTitle>
                </DialogHeader>
                <div className="grid grid-cols-2 md:grid-cols-3 gap-2 overflow-y-auto flex-1 pr-2">
                    {propertyImageGallery.map(image => (
                        <div key={image.id} className="relative aspect-video w-full overflow-hidden rounded-md">
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
            <div className="absolute top-4 right-4 flex gap-2">
                <Button variant="secondary" size="icon" className="rounded-full bg-white/80 hover:bg-white">
                    <Share2 className="h-4 w-4" />
                </Button>
                <Button variant="secondary" size="icon" className="rounded-full bg-white/80 hover:bg-white">
                    <Heart className="h-4 w-4" />
                </Button>
                <Button variant="secondary" size="icon" className="rounded-full bg-white/80 hover:bg-white">
                    <MessageCircle className="h-4 w-4" />
                </Button>
            </div>
            <div className="absolute bottom-4 right-4 flex gap-2">
                <Button variant="secondary" onClick={() => setIsModalOpen(true)}>
                    <Grid2x2 className="mr-2 h-4 w-4" />
                    Show all photos
                </Button>
            </div>
            <ImageGalleryModal open={isModalOpen} onOpenChange={setIsModalOpen} />
        </div>
    )
}
