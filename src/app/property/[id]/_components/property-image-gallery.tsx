
"use client";

import Image from 'next/image';
import { propertyImageGallery } from '@/lib/properties';
import { Button } from '@/components/ui/button';
import { Camera, Grid2x2 } from 'lucide-react';
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
        <div className="relative aspect-[4/3] w-full overflow-hidden rounded-l-lg">
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
        <div className="flex flex-col gap-4">
            {sideImages.map(image => (
                 <div key={image.id} className="relative aspect-[4/3] w-full overflow-hidden rounded-r-lg">
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
            <DialogContent className="max-w-4xl">
                <DialogHeader>
                    <DialogTitle>Property Gallery</DialogTitle>
                </DialogHeader>
                <div className="grid grid-cols-2 md:grid-cols-3 gap-4 max-h-[80vh] overflow-y-auto">
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
            <div className="hidden md:grid grid-cols-2 gap-4">
                <MainImage />
                <SideImages />
            </div>
            <div className="md:hidden">
                <MainImage />
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
