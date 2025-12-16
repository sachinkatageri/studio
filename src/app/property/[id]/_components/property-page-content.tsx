
"use client";

import { properties } from '@/lib/properties';
import PropertyImageGallery from './property-image-gallery';
import PropertyDetailsPanel from './property-details-panel';
import PropertyContactForm from './property-contact-form';
import SimilarProperties from './similar-properties';
import BrokerageBanner from './brokerage-banner';
import SiteFooter from './site-footer';
import { PropertyStickyNav } from './property-sticky-nav';

type PropertyPageContentProps = {
    property: typeof properties[0];
}

export default function PropertyPageContent({ property }: PropertyPageContentProps) {
    return (
        <div className="bg-background">
            <main className="container mx-auto px-4 sm:px-6 lg:px-8 py-8">
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
