
import { properties } from '@/lib/properties';
import { notFound } from 'next/navigation';
import PropertyPageContent from './_components/property-page-content';

export default function PropertyPage({ params }: { params: { id: string } }) {
  const property = properties.find(p => p.id === params.id);

  if (!property) {
    notFound();
  }

  return (
    <div className="bg-background pt-14">
      <PropertyPageContent property={property} />
    </div>
  );
}

    