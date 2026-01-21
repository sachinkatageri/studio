"use client";

import Image from 'next/image';
import { propertyImageGallery } from '@/lib/properties';
import { Button } from '@/components/ui/button';
import { PlayCircle, Download, Camera } from 'lucide-react';
import { ScrollArea, ScrollBar } from '@/components/ui/scroll-area';
import { useIsMobile } from '@/hooks/use-mobile';
import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from '@/components/ui/carousel';
import { Drawer, DrawerContent, DrawerHeader, DrawerTitle, DrawerTrigger } from '@/components/ui/drawer';
import { useState } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog"

export default function PropertyImageGallery() {
    const isMobile = useIsMobile();
    const totalImages = propertyImageGallery.length;
    const [isVideoDialogOpen, setIsVideoDialogOpen] = useState(false);
    const [isBrochureDialogOpen, setIsBrochureDialogOpen] = useState(false);

    // Fallback for SSR or if isMobile is undefined to prevent layout shift
    if (isMobile === undefined) {
        return (
            <div className="relative aspect-video w-full animate-pulse bg-muted rounded-lg" />
        )
    }

    // Mobile view with Carousel
    if (isMobile) {
        return (
            <>
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
                        <Drawer>
                            <DrawerTrigger asChild>
                                 <Button variant="outline" size="sm" className="h-auto p-2 text-xs">
                                    <Camera className="mr-1.5 h-4 w-4" />
                                    All Photos
                                </Button>
                            </DrawerTrigger>
                            <DrawerContent className="h-[90vh]">
                                <DrawerHeader>
                                    <DrawerTitle>All Photos</DrawerTitle>
                                </DrawerHeader>
                                <ScrollArea className="flex-1">
                                    <div className="grid grid-cols-2 gap-2 p-4">
                                        {propertyImageGallery.map(image => (
                                            <div key={image.id} className="aspect-square relative rounded-lg overflow-hidden">
                                                <Image src={image.imageUrl} alt={image.description} fill className="object-cover" data-ai-hint={image.imageHint} />
                                            </div>
                                        ))}
                                    </div>
                                </ScrollArea>
                            </DrawerContent>
                        </Drawer>
                        
                        <Drawer>
                            <DrawerTrigger asChild>
                                <Button variant="outline" size="sm" className="h-auto p-2 text-xs">
                                    <PlayCircle className="mr-1.5 h-4 w-4" />
                                    Video
                                </Button>
                            </DrawerTrigger>
                            <DrawerContent>
                                <DrawerHeader>
                                    <DrawerTitle>Property Video</DrawerTitle>
                                </DrawerHeader>
                                <div className="p-4">
                                    <div className="aspect-video w-full rounded-lg overflow-hidden">
                                        <iframe
                                            className="w-full h-full"
                                            src="https://www.youtube.com/embed/dQw4w9WgXcQ"
                                            title="YouTube video player"
                                            frameBorder="0"
                                            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                                            allowFullScreen
                                        ></iframe>
                                    </div>
                                </div>
                            </DrawerContent>
                        </Drawer>

                        <AlertDialog open={isBrochureDialogOpen} onOpenChange={setIsBrochureDialogOpen}>
                            <AlertDialogTrigger asChild>
                                <Button variant="outline" size="sm" className="h-auto p-2 text-xs">
                                    <Download className="mr-1.5 h-4 w-4" />
                                    Brochure
                                </Button>
                            </AlertDialogTrigger>
                             <AlertDialogContent>
                                <AlertDialogHeader>
                                    <AlertDialogTitle>Download Brochure</AlertDialogTitle>
                                    <AlertDialogDescription>
                                        Do you want to download the property brochure?
                                    </AlertDialogDescription>
                                </AlertDialogHeader>
                                <AlertDialogFooter>
                                    <AlertDialogCancel>Cancel</AlertDialogCancel>
                                    <AlertDialogAction asChild>
                                        <a href="/sample.pdf" download="brochure.pdf">Download</a>
                                    </AlertDialogAction>
                                </AlertDialogFooter>
                            </AlertDialogContent>
                        </AlertDialog>
                    </div>
                </div>
            </>
        );
    }

    // Desktop view
    const mainImage = propertyImageGallery.length > 0 ? propertyImageGallery[0] : null;
    const sideImage1 = propertyImageGallery.length > 1 ? propertyImageGallery[1] : null;
    const videoThumbnail = propertyImageGallery.length > 2 ? propertyImageGallery[2] : null;
    const bottomThumbnails = propertyImageGallery.slice(3);

    return (
        <div className="space-y-2">
            <div className="grid grid-cols-1 md:grid-cols-3 md:grid-rows-2 gap-2 md:h-[450px]">
                {/* Main Image */}
                <div className="relative md:col-span-2 md:row-span-2 rounded-lg overflow-hidden group cursor-pointer aspect-[4/3] md:aspect-auto">
                    {mainImage && (
                        <Image
                            src={mainImage.imageUrl}
                            alt={mainImage.description}
                            fill
                            className="object-cover"
                            data-ai-hint={mainImage.imageHint}
                            priority
                        />
                    )}
                </div>
                {/* Side Image 1 */}
                <div className="relative md:col-span-1 md:row-span-1 rounded-lg overflow-hidden group cursor-pointer aspect-[4/3] md:aspect-auto">
                    {sideImage1 && (
                        <>
                            <Image
                                src={sideImage1.imageUrl}
                                alt={sideImage1.description}
                                fill
                                className="object-cover"
                                data-ai-hint={sideImage1.imageHint}
                            />
                            <div className="absolute top-2 right-2">
                                <AlertDialog open={isBrochureDialogOpen} onOpenChange={setIsBrochureDialogOpen}>
                                    <AlertDialogTrigger asChild>
                                        <Button variant="secondary" size="sm" className="h-auto px-2 py-1 text-xs bg-black/50 text-white hover:bg-black/70">
                                            <Download className="h-3 w-3 mr-1" />
                                            PDF FILE
                                        </Button>
                                    </AlertDialogTrigger>
                                    <AlertDialogContent>
                                        <AlertDialogHeader>
                                            <AlertDialogTitle>Download Brochure</AlertDialogTitle>
                                            <AlertDialogDescription>
                                                Do you want to download the property brochure?
                                            </AlertDialogDescription>
                                        </AlertDialogHeader>
                                        <AlertDialogFooter>
                                            <AlertDialogCancel>Cancel</AlertDialogCancel>
                                            <AlertDialogAction asChild>
                                                <a href="/sample.pdf" download="brochure.pdf">Download</a>
                                            </AlertDialogAction>
                                        </AlertDialogFooter>
                                    </AlertDialogContent>
                                </AlertDialog>
                            </div>
                        </>
                    )}
                </div>
                {/* Video Thumbnail */}
                <Dialog open={isVideoDialogOpen} onOpenChange={setIsVideoDialogOpen}>
                    <DialogTrigger asChild>
                        <div className="relative md:col-span-1 md:row-span-1 rounded-lg overflow-hidden group cursor-pointer aspect-[4/3] md:aspect-auto">
                            {videoThumbnail && (
                                <>
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
                                </>
                            )}
                        </div>
                    </DialogTrigger>
                    <DialogContent className="max-w-3xl p-0">
                        <DialogHeader className="sr-only">
                            <DialogTitle>Property Video</DialogTitle>
                        </DialogHeader>
                        <div className="aspect-video">
                            <iframe
                                className="w-full h-full"
                                src="https://www.youtube.com/embed/dQw4w9WgXcQ?autoplay=1"
                                title="YouTube video player"
                                frameBorder="0"
                                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                                allowFullScreen
                            ></iframe>
                        </div>
                    </DialogContent>
                </Dialog>
            </div>
            {/* Bottom Thumbnails */}
            <div className="relative">
                <ScrollArea className="w-full whitespace-nowrap">
                    <div className="flex gap-2 pb-2">
                        {bottomThumbnails.map((image, index) => (
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
                               {index === bottomThumbnails.length - 1 ? (
                                    <div className="absolute inset-0 bg-black/60 flex flex-col items-center justify-center text-white text-center p-1">
                                        <Camera className="h-6 w-6 mb-1" />
                                        <p className="text-xs font-semibold leading-tight">Show all {totalImages} photos</p>
                                    </div>
                                ) : (
                                    <div className="absolute inset-0 bg-black/30 opacity-0 group-hover:opacity-100 transition-opacity" />
                                )}
                            </div>
                        ))}
                    </div>
                    <ScrollBar orientation="horizontal" />
                </ScrollArea>
            </div>
        </div>
    )
}
