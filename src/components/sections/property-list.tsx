"use client";

import Image from 'next/image';
import { PlaceHolderImages } from '@/lib/placeholder-images';
import { Card, CardContent } from '@/components/ui/card';
import { ScrollArea } from '@/components/ui/scroll-area';

const properties = [
  {
    id: 'wework',
    name: 'WeWork Vaishnavi Signature',
    location: 'in Bellandur, Hyderabad, Karnataka',
    added: '4 December 2025',
  },
  {
    id: '91springboard',
    name: '91Springboard',
    location: 'in Jhandewalan, Delhi, Delhi',
    added: '4 December 2025',
  },
  {
    id: 'shop-boduppal',
    name: 'Shop in Boduppal',
    location: 'in Boduppal, Medchal, Telangana',
    size: 100,
    added: '29 November 2025',
  },
  {
    id: 'restaurant-alwal',
    name: 'Restaurant',
    location: 'in Alwal, Medchal, Telangana',
    size: 1000,
    added: '29 November 2025',
  },
  {
    id: 'godown-moula-ali',
    name: 'Godown/Warehouse',
    location: 'in Moula Ali, Medchal, Telangana',
    size: 2000,
    added: '29 November 2025',
  },
];

export default function PropertyList() {
    return (
    <div className="flex flex-col h-full">
      <div className="p-4 border-b">
        <h2 className="text-xl font-bold">Properties</h2>
        <p className="text-sm text-muted-foreground">5 properties found</p>
      </div>
      <ScrollArea className="flex-1">
        <div className="p-2 space-y-2">
          {properties.map((property) => {
            const propertyImage = PlaceHolderImages.find(p => p.id === property.id);
            return (
              <Card key={property.id} className="overflow-hidden group hover:bg-muted/50 cursor-pointer">
                <CardContent className="p-3 flex gap-3 items-start">
                   <div className="relative h-24 w-24 rounded-md overflow-hidden shrink-0">
                    {propertyImage && (
                      <Image
                        src={propertyImage.imageUrl}
                        alt={propertyImage.description}
                        fill
                        className="object-cover"
                        data-ai-hint={propertyImage.imageHint}
                      />
                    )}
                  </div>
                  <div className="flex flex-col gap-1">
                    <h3 className="font-semibold text-base leading-tight">{property.name}</h3>
                    <p className="text-sm text-muted-foreground">{property.location}</p>
                    {property.size && <p className="text-sm text-muted-foreground">Size: {property.size}</p>}
                    <p className="text-xs text-muted-foreground/80 mt-1">Added on: {property.added}</p>
                  </div>
                </CardContent>
              </Card>
            );
          })}
        </div>
      </ScrollArea>
    </div>
  );
}
