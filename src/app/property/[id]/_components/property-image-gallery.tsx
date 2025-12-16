
"use client";

import Image from 'next/image';
import { propertyImageGallery } from '@/lib/properties';
import { Button } from '@/components/ui/button';
import { Camera, Grid2x2, Heart, Share2 } from 'lucide-react';
import { useState } from 'react';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"


const MainImage = () => {
    const mainImage = propertyImageGallery[0];
    return (
        <div className="relative w-full h-[250px] md:h-full overflow-hidden md:rounded-l-lg">
            <Image
                src={mainImage.imageUrl}
                alt={mainImage.description}
                fill
                className="object-cover"
                data-ai-hint={mainImage.imageHint}
            />
        </div>
    )
}

const SideImages = () => {
    const sideImages = propertyImageGallery.slice(1, 3);
    return (
        <div className="hidden md:flex flex-col gap-2">
            {sideImages.map((image, index) => (
                 <div key={image.id} className={`relative w-full h-full overflow-hidden ${index === 0 ? 'rounded-tr-lg' : ''} ${index === sideImages.length - 1 ? 'rounded-br-lg' : ''}`}>
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
    )
}

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
             <div className="grid grid-cols-1 md:grid-cols-2 md:grid-rows-1 gap-2 md:h-[500px]">
                <div className="md:row-span-1">
                    <MainImage />
                </div>
                <div className="md:row-span-1">
                    <SideImages />
                </div>
            </div>
            <div className="absolute top-4 right-4 flex gap-2">
                <Button variant="secondary" size="icon" className="rounded-full bg-white/80 hover:bg-white">
                    <Share2 className="h-4 w-4" />
                </Button>
                <Button variant="secondary" size="icon" className="rounded-full bg-white/80 hover:bg-white">
                    <Heart className="h-4 w-4" />
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
