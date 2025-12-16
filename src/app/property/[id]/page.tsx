import Header from '@/components/layout/header';
import { properties } from '@/lib/properties';
import { notFound } from 'next/navigation';
import PropertyImageGallery from './_components/property-image-gallery';
import PropertyDetailsPanel from './_components/property-details-panel';
import PropertyContactForm from './_components/property-contact-form';
import BrokerageBanner from './_components/brokerage-banner';
import SiteFooter from './_components/site-footer';
import SimilarProperties from './_components/similar-properties';

export default function PropertyPage({ params }: { params: { id: string } }) {
  const property = properties.find(p => p.id === params.id);

  if (!property) {
    notFound();
  }

  return (
    <div className="bg-background">
      <Header />
      <main className="container mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <PropertyImageGallery />

        <div className="mt-8 grid grid-cols-1 lg:grid-cols-3 gap-12">
          <div className="lg:col-span-2">
            <PropertyDetailsPanel property={property} />
          </div>
          <div>
            <PropertyContactForm />
          </div>
        </div>

        <SimilarProperties />
        
      </main>
      <BrokerageBanner />
      <SiteFooter />
    </div>
  );
}
