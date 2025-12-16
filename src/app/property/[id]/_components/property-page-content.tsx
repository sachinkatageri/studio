
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
import { ChevronRight, ArrowLeft } from 'lucide-react';
import { format } from 'date-fns';
import { Button } from '@/components/ui/button';
import { useRouter } from 'next/navigation';

type PropertyPageContentProps = {
    property: typeof properties[0];
}

const Breadcrumb = ({ property }: { property: typeof properties[0] }) => {
    const router = useRouter();
    // @ts-ignore
    const lastUpdated = property.postedOn ? format(new Date(property.postedOn), 'PPP') : 'N/A';
    
    return (
        <div className="mb-4">
            {/* Mobile header */}
            <div className="md:hidden flex items-center gap-2">
                <Button variant="ghost" size="icon" onClick={() => router.back()}>
                    <ArrowLeft />
                </Button>
                <h1 className="text-lg font-semibold">Properties</h1>
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

export default function PropertyPageContent({ property }: PropertyPageContentProps) {

    return (
        <div className="bg-background">
            <main className="container mx-auto px-4 sm:px-6 lg:px-8 py-8">
                <Breadcrumb property={property} />
                <PropertyImageGallery />

                <div className="mt-8">
                    <PropertyStickyNav />
                </div>

                <div className="mt-8 grid grid-cols-1 lg:grid-cols-3 gap-12">
                    <div className="lg:col-span-2">
                        <PropertyDetailsPanel property={property} />
                    </div>
                    <div>
                        <PropertyContactForm />
                    </div>
                </div>

                <div className="mt-16">
                    <SimilarProperties />
                </div>

            </main>
            <BrokerageBanner />
            <SiteFooter />
        </div>
    )
}
