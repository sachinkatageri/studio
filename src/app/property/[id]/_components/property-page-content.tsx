

"use client";

import { properties } from '@/lib/properties';
import PropertyImageGallery from './property-image-gallery';
import PropertyDetailsPanel from './property-details-panel';
import PropertyContactForm from './property-contact-form';
import SimilarProperties from './similar-properties';
import BrokerageBanner from './brokerage-banner';
import SiteFooter from './site-footer';
import { PropertyStickyNav } from './property-sticky-nav';
import Link from 'next/link';
import { ChevronRight, ArrowLeft, Search, Phone, MoreVertical, Share2, Heart, Check, Building2 } from 'lucide-react';
import { format } from 'date-fns';
import { Button } from '@/components/ui/button';
import { useRouter } from 'next/navigation';
import { useIsMobile } from '@/hooks/use-mobile';
import Image from 'next/image';
import { Badge } from '@/components/ui/badge';
import Header from '@/components/layout/header';
import { PropertyInfoSection } from './property-info-section';
import { Separator } from '@/components/ui/separator';

type PropertyPageContentProps = {
    property: typeof properties[0];
}

const WhatsAppIcon = () => (
    <Image src="https://www.buildersinfo.in/property-details/whatsapp.png" alt="WhatsApp" width={20} height={20} />
);

const MobileHeader = ({ property }: { property: typeof properties[0] }) => {
    const router = useRouter();
    return (
        <div className="md:hidden flex items-center justify-between gap-2 h-14 bg-background/80 backdrop-blur-sm px-2 fixed top-0 left-0 right-0 z-40 border-b">
            <div className='flex items-center gap-1 min-w-0'>
                <Button variant="ghost" size="icon" onClick={() => router.back()} className="shrink-0">
                    <ArrowLeft />
                </Button>
                <h1 className="text-lg font-semibold truncate">{property.name}</h1>
            </div>
            <div className='flex items-center'>
                <Button variant="ghost" size="icon">
                    <Search className="h-5 w-5" />
                </Button>
                <Button variant="ghost" size="icon">
                    <Share2 className="h-5 w-5" />
                </Button>
            </div>
        </div>
    );
};

const MobileFooter = () => (
    <div className="md:hidden fixed bottom-0 left-0 right-0 z-40 bg-background border-t p-2">
        <div className="flex gap-2">
            <Button variant="outline" className="w-full h-12 rounded-lg">Contact</Button>
            <Button className="w-full h-12 rounded-lg">
                <WhatsAppIcon />
                <span className="ml-2">WhatsApp</span>
            </Button>
        </div>
    </div>
)




export default function PropertyPageContent({ property }: PropertyPageContentProps) {
    const isMobile = useIsMobile();

    return (
        <div className="bg-background">
            {isMobile ? <MobileHeader property={property} /> : <Header />}
            
            <main className="pt-14">
                <div>
                    <PropertyImageGallery />
                </div>
            
            <div className="container mx-auto px-4 sm:px-6 lg:px-8 pt-4 pb-16 md:py-8">
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
                    <div className="lg:col-span-2">
                        <PropertyInfoSection property={property} />
                    </div>
                    <div className="hidden lg:block">
                        <PropertyContactForm />
                    </div>
                </div>
            </div>

            {!isMobile && <PropertyStickyNav />}

            <div className="container mx-auto px-4 sm:px-6 lg:px-8 pt-4 pb-16 md:py-8">
                <div className="lg:col-span-2">
                    <PropertyDetailsPanel property={property} />
                </div>

                <div className="mt-16">
                    <SimilarProperties />
                </div>
            </div>
            </main>
            
            <BrokerageBanner />
            <SiteFooter />
            {isMobile && <MobileFooter />}
        </div>
    )
}
