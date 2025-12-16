
import Header from '@/components/layout/header';
import { properties } from '@/lib/properties';
import { notFound } from 'next/navigation';
import PropertyPageContent from './_components/property-page-content';

export default function PropertyPage({ params }: { params: { id: string } }) {
  const property = properties.find(p => p.id === params.id);

  if (!property) {
    notFound();
  }

  return (
    <div className="bg-background">
      <Header />
      <PropertyPageContent property={property} />
    </div>
  );
}
