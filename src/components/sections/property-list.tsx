
"use client";

import Image from 'next/image';
import { PlaceHolderImages } from '@/lib/placeholder-images';
import { Card, CardContent } from '@/components/ui/card';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '../ui/tabs';

const properties = [
  {
    id: 'wework',
    name: 'WeWork Vaishnavi Signature',
    location: 'in Bellandur, Hyderabad, Karnataka',
    added: '4 December 2025',
    type: 'Commercial',
  },
  {
    id: '91springboard',
    name: '91Springboard',
    location: 'in Jhandewalan, Delhi, Delhi',
    added: '4 December 2025',
    type: 'Commercial',
  },
  {
    id: 'shop-boduppal',
    name: 'Shop in Boduppal',
    location: 'in Boduppal, Medchal, Telangana',
    size: 100,
    added: '29 November 2025',
    type: 'Commercial',
  },
  {
    id: 'restaurant-alwal',
    name: 'Restaurant',
    location: 'in Alwal, Medchal, Telangana',
    size: 1000,
    added: '29 November 2025',
    type: 'Commercial',
  },
  {
    id: 'godown-moula-ali',
    name: 'Godown/Warehouse',
    location: 'in Moula Ali, Medchal, Telangana',
    size: 2000,
    added: '29 November 2025',
    type: 'Commercial',
  },
   {
    id: 'project-1',
    name: 'Azure Urban Residences',
    location: 'Metropolis, CA',
    price: 'Starting from $500,000',
    status: 'Ready to move',
    type: 'Residential',
  },
  {
    id: 'project-2',
    name: 'Greenwood Villas',
    location: 'Serene Valley, TX',
    price: 'Starting from $750,000',
    status: 'New Launch',
    type: 'Residential',
  },
];

const commercialProperties = properties.filter(p => p.type === 'Commercial');
const residentialProperties = properties.filter(p => p.type === 'Residential');

const PropertyCard = ({ property }: { property: typeof properties[0]}) => {
  const propertyImage = PlaceHolderImages.find(p => p.id === property.id);
  return (
    <Card key={property.id} className="overflow-hidden group hover:bg-muted/50 cursor-pointer shadow-none border-0">
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
          {/* @ts-ignore */}
          {property.size && <p className="text-sm text-muted-foreground">Size: {property.size} sq. yd.</p>}
          <p className="text-xs text-muted-foreground/80 mt-1">Added on: {property.added}</p>
        </div>
      </CardContent>
    </Card>
  )
}

export default function PropertyList() {

    return (
    <div className="flex flex-col h-full bg-card">
      <div className="p-4 border-b">
          <Tabs defaultValue="all" className="w-full">
            <TabsList className="grid w-full grid-cols-3">
              <TabsTrigger value="all">All</TabsTrigger>
              <TabsTrigger value="commercial">Commercial</TabsTrigger>
              <TabsTrigger value="residential">Residential</TabsTrigger>
            </TabsList>
            <div className="py-4">
                <h2 className="text-xl font-bold">Properties</h2>
                <p className="text-sm text-muted-foreground">7 properties found</p>
            </div>
            <ScrollArea className="flex-1" style={{height: 'calc(100vh - 220px)'}}>
                <TabsContent value="all">
                    <div className="space-y-2">
                        {properties.map((property) => (
                            <PropertyCard key={property.id} property={property} />
                        ))}
                    </div>
                </TabsContent>
                <TabsContent value="commercial">
                    <div className="space-y-2">
                        {commercialProperties.map((property) => (
                            <PropertyCard key={property.id} property={property} />
                        ))}
                    </div>
                </TabsContent>
                <TabsContent value="residential">
                     <div className="space-y-2">
                        {residentialProperties.map((property) => (
                            <PropertyCard key={property.id} property={property} />
                        ))}
                    </div>
                </TabsContent>
            </ScrollArea>
        </Tabs>
      </div>
    </div>
  );
}
