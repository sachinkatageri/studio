

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

type PropertyPageContentProps = {
    property: typeof properties[0];
}

const MobileHeader = ({ property }: { property: typeof properties[0] }) => {
    const router = useRouter();
    return (
        <div className="md:hidden flex items-center justify-between gap-2 h-16 bg-background/80 backdrop-blur-sm px-2 fixed top-0 left-0 right-0 z-40">
            <div className='flex items-center gap-1'>
                <Button variant="ghost" size="icon" onClick={() => router.back()}>
                    <ArrowLeft />
                </Button>
                <h1 className="text-lg font-semibold truncate">{property.name}</h1>
            </div>
            <div className='flex items-center'>
                <Button variant="ghost" size="icon">
                    <Search className="h-5 w-5" />
                </Button>
                <Button variant="ghost" size="icon">
                    <Phone className="h-5 w-5" />
                </Button>
                <Button variant="ghost" size="icon">
                    <MoreVertical className="h-5 w-5" />
                </Button>
            </div>
        </div>
    );
};

const Breadcrumb = ({ property }: { property: typeof properties[0] }) => {
    // @ts-ignore
    const lastUpdated = property.postedOn ? format(new Date(property.postedOn), 'PPP') : 'N/A';
    
    return (
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
    )
}


export default function PropertyPageContent({ property }: PropertyPageContentProps) {
    const isMobile = useIsMobile();

    return (
        <div className="bg-background pb-20 md:pb-0">
            {isMobile ? <MobileHeader property={property} /> : <Header />}
            
            <main className="container mx-auto px-0 sm:px-6 lg:px-8 md:pt-8 pb-8">
                <div className="px-4 sm:px-0 pt-16 md:pt-0">
                  <Breadcrumb property={property} />
                </div>
                <div className="md:mt-4">
                    <PropertyImageGallery />
                </div>
            </main>
            
            {!isMobile && <PropertyStickyNav />}

            <main className="container mx-auto px-4 sm:px-6 lg:px-8 py-8">
                 
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
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


const Header = () => {
  const router = useRouter();
  // @ts-ignore
  return (
      <header className="bg-background/80 backdrop-blur-sm sticky top-0 z-40 border-b w-full">
        <div className="px-4 sm:px-6 lg:px-8 flex justify-between items-center h-16">
          <div className="flex items-center gap-2">
            <Link href="/" className="flex items-center gap-2 shrink-0">
              <Image src="https://www.buildersinfo.in/_next/image?url=%2Flogo.png&w=256&q=75" alt="BuildersInfo Logo" width={120} height={30} />
            </Link>
          </div>
        </div>
      </header>
  )
}
