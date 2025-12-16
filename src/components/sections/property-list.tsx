
"use client";

import Image from 'next/image';
import { PlaceHolderImages } from '@/lib/placeholder-images';
import { Card, CardContent } from '@/components/ui/card';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '../ui/tabs';
import { cn } from '@/lib/utils';
import { properties } from '@/lib/properties';
import type { MobileView } from '@/app/page';
import { Button } from '../ui/button';
import { Map } from 'lucide-react';


const commercialProperties = properties.filter(p => p.type === 'Commercial');
const residentialProperties = properties.filter(p => p.type === 'Residential');

const PropertyCard = ({ property, onSelect, isSelected }: { property: typeof properties[0], onSelect: (id: string) => void, isSelected: boolean}) => {
  const propertyImage = PlaceHolderImages.find(p => p.id === property.id);
  return (
    <Card 
      key={property.id} 
      className={cn(
        "overflow-hidden group hover:bg-muted/50 cursor-pointer shadow-none border-0 border-b rounded-none",
        isSelected && "bg-muted/50"
      )}
      onClick={() => onSelect(property.id)}
    >
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
        <div className="flex flex-col gap-1 flex-1">
            <div className="flex items-center gap-2">
                <h3 className="font-semibold text-base leading-tight">{property.name}</h3>
                <Image src="https://cdn-icons-png.flaticon.com/512/5253/5253968.png" alt="Verified" width={16} height={16} />
            </div>
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

interface PropertyListProps {
  onSelectProperty: (propertyId: string) => void;
  selectedPropertyId: string | null;
  setMobileView: (view: MobileView) => void;
}

export default function PropertyList({ onSelectProperty, selectedPropertyId, setMobileView }: PropertyListProps) {
    return (
    <div className="flex flex-col h-full bg-card">
      <div className="p-4 border-b flex flex-col flex-1 min-h-0">
          <Tabs defaultValue="all" className="w-full flex flex-col flex-1 min-h-0">
            <TabsList className="grid w-full grid-cols-3">
              <TabsTrigger value="all">All</TabsTrigger>
              <TabsTrigger value="commercial">Commercial</TabsTrigger>
              <TabsTrigger value="residential">Residential</TabsTrigger>
            </TabsList>
            <div className="py-4">
                <p className="text-sm text-muted-foreground">6 properties found</p>
            </div>
            <ScrollArea className="flex-1 -mx-4">
                <TabsContent value="all" className="mt-0">
                    <div className="px-4">
                        {properties.map((property) => (
                            <PropertyCard key={property.id} property={property} onSelect={onSelectProperty} isSelected={selectedPropertyId === property.id} />
                        ))}
                    </div>
                </TabsContent>
                <TabsContent value="commercial" className="mt-0">
                    <div className="px-4">
                        {commercialProperties.map((property) => (
                            <PropertyCard key={property.id} property={property} onSelect={onSelectProperty} isSelected={selectedPropertyId === property.id} />
                        ))}
                    </div>
                </TabsContent>
                <TabsContent value="residential" className="mt-0">
                     <div className="px-4">
                        {residentialProperties.map((property) => (
                            <PropertyCard key={property.id} property={property} onSelect={onSelectProperty} isSelected={selectedPropertyId === property.id} />
                        ))}
                    </div>
                </TabsContent>
            </ScrollArea>
        </Tabs>
      </div>
    </div>
  );
}
