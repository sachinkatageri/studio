"use client";

import Image from 'next/image';
import { propertyImageGallery } from '@/lib/properties';
import { Button } from '@/components/ui/button';
import { PlayCircle, Download } from 'lucide-react';
import { ScrollArea, ScrollBar } from '@/components/ui/scroll-area';

export default function PropertyImageGallery() {
    const mainImage = propertyImageGallery[0];
    const sideImage1 = propertyImageGallery[1];
    const videoThumbnail = propertyImageGallery[2];
    const bottomThumbnails = propertyImageGallery.slice(3);

    return (
        <div className="space-y-2">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
                {/* Main Image */}
                <div 
                    className="relative aspect-square md:aspect-auto rounded-lg overflow-hidden group cursor-pointer"
                >
                    <Image
                        src={mainImage.imageUrl}
                        alt={mainImage.description}
                        fill
                        className="object-cover"
                        data-ai-hint={mainImage.imageHint}
                        priority
                    />
                </div>
                {/* Side Images */}
                <div className="grid grid-rows-2 gap-2">
                    <div 
                        className="relative rounded-lg overflow-hidden group cursor-pointer"
                    >
                        <Image
                            src={sideImage1.imageUrl}
                            alt={sideImage1.description}
                            fill
                            className="object-cover"
                            data-ai-hint={sideImage1.imageHint}
                        />
                        <div className="absolute top-2 right-2">
                             <Button variant="secondary" size="sm" className="h-auto px-2 py-1 text-xs bg-black/50 text-white hover:bg-black/70">
                                <Download className="h-3 w-3 mr-1" />
                                PDF FILE
                            </Button>
                        </div>
                    </div>
                    <div 
                        className="relative rounded-lg overflow-hidden group cursor-pointer"
                    >
                        <Image
                            src={videoThumbnail.imageUrl}
                            alt={videoThumbnail.description}
                            fill
                            className="object-cover"
                            data-ai-hint={videoThumbnail.imageHint}
                        />
                        <div className="absolute inset-0 bg-black/40 flex flex-col items-center justify-center">
                            <PlayCircle className="h-12 w-12 text-white/80" />
                             <Button variant="link" className="text-white text-xs mt-2">
                                WATCH VIDEO
                            </Button>
                        </div>
                    </div>
                </div>
            </div>
            {/* Bottom Thumbnails */}
            <ScrollArea className="w-full whitespace-nowrap">
                <div className="flex gap-2 pb-2">
                    {bottomThumbnails.map((image) => (
                        <div
                            key={image.id}
                            className="relative h-20 w-28 rounded-md overflow-hidden shrink-0 cursor-pointer group"
                        >
                            <Image
                                src={image.imageUrl}
                                alt={image.description}
                                fill
                                className="object-cover"
                                data-ai-hint={image.imageHint}
                            />
                             <div className="absolute inset-0 bg-black/30 opacity-0 group-hover:opacity-100 transition-opacity" />
                        </div>
                    ))}
                </div>
                 <ScrollBar orientation="horizontal" />
            </ScrollArea>
        </div>
    )
}
