

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
import { ShareOptions } from '@/components/layout/share-options';

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
                <ShareOptions>
                    <Button variant="ghost" size="icon" className="h-9 w-9">
                        <Share2 className="h-5 w-5" />
                    </Button>
                </ShareOptions>
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

    return (
        <div className="bg-background">
            {isMobile ? <MobileHeader property={property} /> : <Header />}
            
            <main className="pt-14">
                <div className="hidden md:block container mx-auto px-4 sm:px-6 lg:px-8 py-4">
                    <div className="flex justify-between items-center text-sm">
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
                <div>
                    <PropertyImageGallery />
                </div>
            
            <div className="container mx-auto px-4 sm:px-6 lg:px-8 pt-4 pb-16 md:py-8">
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 md:gap-12">
                    <div className="lg:col-span-2">
                        <PropertyInfoSection property={property} />
                    </div>
                    <div className="hidden lg:block">
                        <div className="sticky top-28">
                          <PropertyContactForm />
                        </div>
                    </div>
                </div>
            </div>

            <PropertyStickyNav />

            <div className="container mx-auto px-4 sm:px-6 lg:px-8 pt-4 pb-16 md:py-8">
                <div className="lg:grid lg:grid-cols-3 lg:gap-12">
                    <div className="lg:col-span-3 space-y-8">
                        <PropertyDetailsPanel property={property} />
                        <div className="lg:hidden">
                            <PropertyContactForm />
                        </div>
                    </div>
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
