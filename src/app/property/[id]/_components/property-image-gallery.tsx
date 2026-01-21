
"use client";

import Image from 'next/image';
import { propertyImageGallery } from '@/lib/properties';
import { Button } from '@/components/ui/button';
import { PlayCircle, Download, Camera } from 'lucide-react';
import { ScrollArea, ScrollBar } from '@/components/ui/scroll-area';
import { useIsMobile } from '@/hooks/use-mobile';
import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from '@/components/ui/carousel';

export default function PropertyImageGallery() {
    const isMobile = useIsMobile();
    const remainingImages = propertyImageGallery.length;

    // Fallback for SSR or if isMobile is undefined to prevent layout shift
    if (isMobile === undefined) {
        return (
            <div className="relative aspect-video w-full animate-pulse bg-muted rounded-lg" />
        )
    }

    // Mobile view with Carousel
    if (isMobile) {
        return (
            <div className="space-y-2">
                <Carousel>
                    <CarouselContent>
                        {propertyImageGallery.slice(0, 5).map(image => (
                            <CarouselItem key={image.id}>
                                <div className="aspect-[16/9] relative rounded-lg overflow-hidden">
                                    <Image src={image.imageUrl} alt={image.description} fill className="object-cover" data-ai-hint={image.imageHint} />
                                </div>
                            </CarouselItem>
                        ))}
                    </CarouselContent>
                    <CarouselPrevious className="absolute left-2 top-1/2 -translate-y-1/2 z-10" />
                    <CarouselNext className="absolute right-2 top-1/2 -translate-y-1/2 z-10" />
                </Carousel>
                <div className="grid grid-cols-3 gap-2">
                    <Button variant="outline" size="sm" className="h-auto p-2 text-xs">
                        <Camera className="mr-1.5 h-4 w-4" />
                        All Photos
                    </Button>
                    <Button variant="outline" size="sm" className="h-auto p-2 text-xs">
                        <PlayCircle className="mr-1.5 h-4 w-4" />
                        Video
                    </Button>
                    <Button variant="outline" size="sm" className="h-auto p-2 text-xs">
                        <Download className="mr-1.5 h-4 w-4" />
                        Brochure
                    </Button>
                </div>
            </div>
        );
    }

    // Desktop view
    const mainImage = propertyImageGallery[0];
    const sideImage1 = propertyImageGallery[1];
    const videoThumbnail = propertyImageGallery[2];
    const bottomThumbnails = propertyImageGallery.slice(3);

    return (
        <div className="space-y-2">
            <div className="grid grid-cols-1 md:grid-cols-3 md:grid-rows-2 gap-2 md:h-[450px]">
                {/* Main Image */}
                <div className="relative md:col-span-2 md:row-span-2 rounded-lg overflow-hidden group cursor-pointer aspect-[4/3] md:aspect-auto">
                    <Image
                        src={mainImage.imageUrl}
                        alt={mainImage.description}
                        fill
                        className="object-cover"
                        data-ai-hint={mainImage.imageHint}
                        priority
                    />
                </div>
                {/* Side Image 1 */}
                <div className="relative md:col-span-1 md:row-span-1 rounded-lg overflow-hidden group cursor-pointer aspect-[4/3] md:aspect-auto">
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
                {/* Video Thumbnail */}
                <div className="relative md:col-span-1 md:row-span-1 rounded-lg overflow-hidden group cursor-pointer aspect-[4/3] md:aspect-auto">
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
            {/* Bottom Thumbnails */}
            <div className="relative">
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
                <div className="absolute bottom-4 right-4 flex gap-2">
                    <Button variant="secondary" className="bg-black/50 text-white hover:bg-black/70">
                        <Camera className="mr-2 h-4 w-4" />
                        {remainingImages > 0 ? `Show all ${remainingImages} photos` : 'View All'}
                    </Button>
                </div>
            </div>
        </div>
    )
}
