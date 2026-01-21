
"use client";

import { properties } from '@/lib/properties';
import PropertyImageGallery from './property-image-gallery';
import PropertyDetailsPanel from './property-details-panel';
import SimilarProperties from './similar-properties';
import BrokerageBanner from './brokerage-banner';
import SiteFooter from './site-footer';
import { PropertyStickyNav } from './property-sticky-nav';
import Link from 'next/link';
import { ChevronRight, ArrowLeft, Share2, Calendar } from 'lucide-react';
import { format } from 'date-fns';
import { Button } from '@/components/ui/button';
import { useRouter } from 'next/navigation';
import { useIsMobile } from '@/hooks/use-mobile';
import Image from 'next/image';
import Header from '@/components/layout/header';
import { PropertyInfoSection } from './property-info-section';
import { useState, useEffect } from 'react';
import PropertyStickyHeader from './property-sticky-header';
import RightColumn from './right-column';
import PropertySpecsCard from './property-specs-card';
import CustomInfrastructureCard from './custom-infrastructure-card';
import AmenitiesCard from './amenities-card';
import WhyBuildersinfoCard from './why-buildersinfo-card';
import ExploreLocations from './explore-locations';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { Drawer, DrawerContent, DrawerTrigger } from '@/components/ui/drawer';
import ScheduleTourCard from './schedule-tour-card';
import { Tooltip, TooltipProvider, TooltipContent, TooltipTrigger } from '@/components/ui/tooltip';

type PropertyPageContentProps = {
    property: typeof properties[0];
}

const MobileHeader = ({ property }: { property: typeof properties[0] }) => {
    const router = useRouter();
    return (
        <div className="md:hidden flex items-center justify-between gap-2 h-14 bg-background/80 backdrop-blur-sm px-2 fixed top-0 left-0 right-0 z-40 border-b">
            <div className='flex items-center gap-1 min-w-0'>
                <Button variant="ghost" size="icon" onClick={() => router.back()} className="shrink-0 h-9 w-9">
                    <ArrowLeft className="h-5 w-5" />
                </Button>
                <h1 className="text-sm font-semibold truncate">{property.name}</h1>
            </div>
            <div className='flex items-center'>
                 {/* ShareOptions can be here */}
            </div>
        </div>
    );
};

const MobileFooter = () => (
    <div className="md:hidden fixed bottom-0 left-0 right-0 z-40 bg-background border-t p-2">
        <div className="flex gap-2">
            <Button variant="outline" className="w-full h-11 rounded-lg">Contact</Button>
            <Button className="w-full h-11 rounded-lg">
                <Image src="https://www.buildersinfo.in/property-details/whatsapp.png" alt="WhatsApp" width={20} height={20} />
                <span className="ml-2">WhatsApp</span>
            </Button>
        </div>
    </div>
)

export default function PropertyPageContent({ property }: PropertyPageContentProps) {
    const isMobile = useIsMobile();
    const postedDate = property.postedOn ? format(new Date(property.postedOn), "dd MMMM yyyy") : 'N/A';
    const [showStickyHeader, setShowStickyHeader] = useState(false);

    useEffect(() => {
        if (isMobile) return;

        const handleScroll = () => {
            if (window.scrollY > 350) {
                setShowStickyHeader(true);
            } else {
                setShowStickyHeader(false);
            }
        };

        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, [isMobile]);

    return (
        <div className="bg-background">
            {isMobile ? <MobileHeader property={property} /> : <Header />}
            
            {showStickyHeader && !isMobile && <PropertyStickyHeader property={property} />}

            <main className="pt-14">
                <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-4">
                    <div className="hidden md:flex justify-between items-center text-sm">
                        <div className="flex items-center text-muted-foreground">
                            <Link href="/" className="hover:text-primary">Home</Link>
                            <ChevronRight className="h-4 w-4 mx-1" />
                            <Link href="/" className="hover:text-primary">Properties</Link>
                            <ChevronRight className="h-4 w-4 mx-1" />
                            <span className="text-foreground font-medium truncate max-w-[200px]">{property.name}</span>
                        </div>
                        <p className="text-muted-foreground">Date Added: <span className="font-medium text-foreground">{postedDate}</span></p>
                    </div>
                </div>
            
                <div className="container mx-auto px-4 sm:px-6 lg:px-8 mt-6">
                    <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
                        <div className="lg:col-span-8 space-y-8">
                                <PropertyInfoSection property={property} />
                                <PropertyImageGallery />
                                
                                <PropertyStickyNav />

                                <PropertySpecsCard property={property} />
                                <CustomInfrastructureCard />
                                <AmenitiesCard />
                                <WhyBuildersinfoCard />
                                <PropertyDetailsPanel property={property} />
                        </div>
                        <div className="hidden lg:block lg:col-span-4">
                          <RightColumn property={property} />
                        </div>
                         <div className="lg:hidden mt-8">
                            <RightColumn property={property} />
                        </div>
                    </div>
                </div>
                
                <SimilarProperties />
                <ExploreLocations />

            </main>
            
            <BrokerageBanner />
            <SiteFooter />

            {isMobile ? (
                <Drawer>
                    <DrawerTrigger asChild>
                        <Button
                            className="fixed bottom-20 right-4 z-30 h-16 w-16 rounded-full shadow-lg bg-primary hover:bg-primary/90"
                            size="icon"
                        >
                            <Calendar className="h-8 w-8" />
                        </Button>
                    </DrawerTrigger>
                    <DrawerContent>
                        <ScheduleTourCard />
                    </DrawerContent>
                </Drawer>
            ) : (
                <div className="fixed bottom-8 right-8 z-50">
                    <Popover>
                        <PopoverTrigger asChild>
                             <TooltipProvider>
                                <Tooltip>
                                    <TooltipTrigger asChild>
                                        <Button
                                            size="icon"
                                            className="h-16 w-16 rounded-full shadow-lg bg-primary hover:bg-primary/90"
                                        >
                                            <Calendar className="h-8 w-8" />
                                        </Button>
                                    </TooltipTrigger>
                                    <TooltipContent side="left">
                                        <p>Schedule a Tour</p>
                                    </TooltipContent>
                                </Tooltip>
                            </TooltipProvider>
                        </PopoverTrigger>
                        <PopoverContent className="w-96 mr-4 mb-2 p-0" side="top" align="end">
                            <ScheduleTourCard />
                        </PopoverContent>
                    </Popover>
                </div>
            )}
            
            {isMobile && <MobileFooter />}
        </div>
    )
}
