

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
import { ChevronRight, ArrowLeft, Phone, Bookmark, Share2, CornerUpRight } from 'lucide-react';
import { format } from 'date-fns';
import { Button } from '@/components/ui/button';
import { useRouter } from 'next/navigation';
import Image from 'next/image';

type PropertyPageContentProps = {
    property: typeof properties[0];
}

const WhatsAppIcon = () => (
    <Image src="https://www.buildersinfo.in/property-details/whatsapp.png" alt="WhatsApp" width={20} height={20} />
);

const Breadcrumb = ({ property }: { property: typeof properties[0] }) => {
    const router = useRouter();
    // @ts-ignore
    const lastUpdated = property.postedOn ? format(new Date(property.postedOn), 'PPP') : 'N/A';
    
    return (
        <div className="md:mb-4">
            {/* Mobile header */}
            <div className="md:hidden flex items-center gap-2 h-14 bg-background border-b px-4 fixed top-16 left-0 right-0 z-40">
                <Button variant="ghost" size="icon" onClick={() => router.back()}>
                    <ArrowLeft />
                </Button>
                <h1 className="text-lg font-semibold truncate">Properties</h1>
            </div>

            {/* Desktop header */}
            <div className="hidden md:flex justify-between items-center">
                <div className="flex items-center text-sm text-muted-foreground">
                    <Link href="/" className="hover:text-primary">Home</Link>
                    <ChevronRight className="h-4 w-4 mx-1" />
                    <Link href="#" className="hover:text-primary">Properties</Link>
                    <ChevronRight className="h-4 w-4 mx-1" />
                    <span className="text-foreground font-medium truncate">{property.name}</span>
                </div>
                 <p className="text-sm text-muted-foreground">Last Updated: {lastUpdated}</p>
            </div>
        </div>
    )
}

const StickyFooter = ({ property }: { property: typeof properties[0] }) => {
    return (
        <div className="fixed bottom-0 left-0 right-0 md:hidden bg-background border-t z-40 p-2">
            <div className="flex justify-between items-center">
                <div className="text-xs">
                    {/* @ts-ignore */}
                    <p className="font-semibold">{property.size} Sq.Feet plot for sale in {property.location}</p>
                     {/* @ts-ignore */}
                    <p>for {property.price} lakhs @ {property.pricePerSqFt}/ Sq.Feet</p>
                </div>
                <div className="flex items-center gap-1">
                    <Button variant="ghost" size="icon"><Bookmark className="h-5 w-5" /></Button>
                    <Button variant="ghost" size="icon"><Share2 className="h-5 w-5" /></Button>
                    <Button variant="ghost" size="icon"><CornerUpRight className="h-5 w-5" /></Button>
                    <Button className="bg-yellow-400 text-black hover:bg-yellow-500">Contact Agent</Button>
                </div>
            </div>
        </div>
    )
}

export default function PropertyPageContent({ property }: PropertyPageContentProps) {

    return (
        <div className="bg-background pb-20 md:pb-0">
            <main className="container mx-auto px-0 sm:px-6 lg:px-8 md:pt-8 pb-8">
                <div className="px-4 sm:px-0 pt-14 md:pt-0">
                  <Breadcrumb property={property} />
                </div>
                <PropertyImageGallery />
            </main>
            
            <PropertyStickyNav />

            <main className="container mx-auto px-4 sm:px-6 lg:px-8 py-8">
                <div className="mt-8 grid grid-cols-1 lg:grid-cols-3 gap-12">
                    <div className="lg:col-span-2">
                        <PropertyDetailsPanel property={property} />
                    </div>
                    <div>
                        <PropertyContactForm />
                        <div className="mt-4 flex gap-2">
                            <Button className="flex-1 text-lg py-6">
                                <Phone className="mr-2" /> Contact
                            </Button>
                            <Button variant="outline" className="flex-1 text-lg py-6 border-primary text-primary hover:bg-primary hover:text-primary-foreground">
                                <WhatsAppIcon /> WhatsApp
                            </Button>
                        </div>
                    </div>
                </div>

                <div className="mt-16">
                    <SimilarProperties />
                </div>
            </main>
            
            <BrokerageBanner />
            <SiteFooter />
            <StickyFooter property={property} />
        </div>
    )
}
