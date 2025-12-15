
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
    pricePerSqFt: 120,
    type: 'Commercial',
  },
  {
    id: '91springboard',
    name: '91Springboard',
    location: 'in Jhandewalan, Delhi, Delhi',
    pricePerSqFt: 110,
    type: 'Commercial',
  },
  {
    id: 'shop-boduppal',
    name: 'Shop in Boduppal',
    location: 'in Boduppal, Medchal, Telangana',
    size: 100,
    pricePerSqFt: 95,
    type: 'Commercial',
  },
  {
    id: 'restaurant-alwal',
    name: 'Restaurant',
    location: 'in Alwal, Medchal, Telangana',
    size: 1000,
    pricePerSqFt: 150,
    type: 'Commercial',
  },
  {
    id: 'godown-moula-ali',
    name: 'Godown/Warehouse',
    location: 'in Moula Ali, Medchal, Telangana',
    size: 2000,
    pricePerSqFt: 80,
    type: 'Commercial',
  },
   {
    id: 'project-1',
    name: 'Azure Urban Residences',
    location: 'Metropolis, CA',
    price: 'Starting from $500,000',
    status: 'Ready to move',
    type: 'Residential',
    pricePerSqFt: 250,
  },
  {
    id: 'project-2',
    name: 'Greenwood Villas',
    location: 'Serene Valley, TX',
    price: 'Starting from $750,000',
    status: 'New Launch',
    type: 'Residential',
    pricePerSqFt: 300,
  },
];

const commercialProperties = properties.filter(p => p.type === 'Commercial');
const residentialProperties = properties.filter(p => p.type === 'Residential');

const PropertyCard = ({ property }: { property: typeof properties[0]}) => {
  const propertyImage = PlaceHolderImages.find(p => p.id === property.id);
  return (
    <Card key={property.id} className="overflow-hidden group hover:bg-muted/50 cursor-pointer shadow-none border-0 border-b rounded-none">
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
           {/* @ts-ignore */}
          {property.pricePerSqFt && <p className="text-sm font-semibold text-primary mt-1">₹{property.pricePerSqFt} Per Sq.ft Per Month</p>}
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
                <p className="text-sm text-muted-foreground">7 properties found</p>
            </div>
            <ScrollArea className="flex-1" style={{height: 'calc(100vh - 240px)'}}>
                <TabsContent value="all">
                    <div className="-mx-4">
                        {properties.map((property) => (
                            <PropertyCard key={property.id} property={property} />
                        ))}
                    </div>
                </TabsContent>
                <TabsContent value="commercial">
                    <div className="-mx-4">
                        {commercialProperties.map((property) => (
                            <PropertyCard key={property.id} property={property} />
                        ))}
                    </div>
                </TabsContent>
                <TabsContent value="residential">
                     <div className="-mx-4">
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
