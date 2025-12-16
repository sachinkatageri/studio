
"use client";

import Image from 'next/image';
import { PlaceHolderImages } from '@/lib/placeholder-images';
import { Card, CardContent } from '@/components/ui/card';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '../ui/tabs';
import { cn } from '@/lib/utils';
import { useState } from 'react';

export const properties = [
  {
    id: 'wework',
    name: 'WeWork Vaishnavi Signature',
    location: 'in Bellandur, Hyderabad, Karnataka',
    pricePerSqFt: 120,
    type: 'Commercial',
    about: 'A vibrant co-working space in the heart of the tech hub, offering flexible office solutions for startups and enterprises.',
    amenities: ['High-Speed WiFi', 'Meeting Rooms', 'Printing', 'Coffee Bar'],
    status: 'Available',
    rating: 4.8,
    reviews: 120,
    postedOn: '2024-07-15'
  },
  {
    id: '91springboard',
    name: '91Springboard',
    location: 'in Jhandewalan, Delhi, Delhi',
    pricePerSqFt: 110,
    type: 'Commercial',
    about: 'Collaborative and inspiring workspace designed to foster innovation and networking among professionals.',
    amenities: ['24/7 Access', 'Event Space', 'Game Zone', 'Free Tea & Coffee'],
    status: 'Available',
    rating: 4.5,
    reviews: 88,
    postedOn: '2024-07-12'
  },
  {
    id: 'shop-boduppal',
    name: 'Shop in Boduppal',
    location: 'in Boduppal, Medchal, Telangana',
    size: 100,
    pricePerSqFt: 95,
    type: 'Commercial',
    about: 'Prime retail space located on a busy street, perfect for a small business or a boutique store.',
    amenities: ['Main Road Facing', 'Ample Parking', 'Power Backup'],
    status: 'For Rent',
    rating: 4.2,
    reviews: 15,
    postedOn: '2024-07-18'
  },
  {
    id: 'godown-moula-ali',
    name: 'Godown/Warehouse',
    location: 'in Moula Ali, Medchal, Telangana',
    size: 2000,
    pricePerSqFt: 80,
    type: 'Commercial',
    about: 'Spacious and secure warehouse facility suitable for storage and logistics, with easy access to major highways.',
    amenities: ['Loading Dock', '24/7 Security', 'High Ceilings'],
    status: 'Available',
    rating: 4.0,
    reviews: 10,
    postedOn: '2024-07-05'
  },
   {
    id: 'project-1',
    name: 'Azure Urban Residences',
    location: 'Metropolis, CA',
    price: 'Starting from $500,000',
    status: 'Ready to move',
    type: 'Residential',
    pricePerSqFt: 250,
    about: 'Modern living in the city center with breathtaking views and world-class amenities.',
    amenities: ['Swimming Pool', 'Gym', 'Clubhouse', '24/7 Security'],
    rating: 4.9,
    reviews: 250,
    postedOn: '2024-07-20'
  },
  {
    id: 'project-2',
    name: 'Greenwood Villas',
    location: 'Serene Valley, TX',
    price: 'Starting from $750,000',
    status: 'New Launch',
    type: 'Residential',
    pricePerSqFt: 300,
    about: 'Luxurious villas nestled in nature, offering a peaceful and upscale lifestyle.',
    amenities: ['Private Garden', 'Community Park', 'Jogging Track', 'Gated Community'],
    rating: 4.7,
    reviews: 95,
    postedOn: '2024-07-21'
  },
];

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

interface PropertyListProps {
  onSelectProperty: (propertyId: string) => void;
}

export default function PropertyList({ onSelectProperty }: PropertyListProps) {
    const [selectedId, setSelectedId] = useState<string | null>(null);

    const handleSelect = (id: string) => {
        setSelectedId(id);
        onSelectProperty(id);
    }

    return (
    <div className="flex flex-col h-full bg-card">
      <div className="p-4 border-b flex flex-col flex-1">
          <Tabs defaultValue="all" className="w-full flex flex-col flex-1">
            <TabsList className="grid w-full grid-cols-3">
              <TabsTrigger value="all">All</TabsTrigger>
              <TabsTrigger value="commercial">Commercial</TabsTrigger>
              <TabsTrigger value="residential">Residential</TabsTrigger>
            </TabsList>
            <div className="py-4">
                <p className="text-sm text-muted-foreground">6 properties found</p>
            </div>
            <ScrollArea className="flex-1 -mx-4" >
                <TabsContent value="all">
                    <div className="px-4">
                        {properties.map((property) => (
                            <PropertyCard key={property.id} property={property} onSelect={handleSelect} isSelected={selectedId === property.id} />
                        ))}
                    </div>
                </TabsContent>
                <TabsContent value="commercial">
                    <div className="px-4">
                        {commercialProperties.map((property) => (
                            <PropertyCard key={property.id} property={property} onSelect={handleSelect} isSelected={selectedId === property.id} />
                        ))}
                    </div>
                </TabsContent>
                <TabsContent value="residential">
                     <div className="px-4">
                        {residentialProperties.map((property) => (
                            <PropertyCard key={property.id} property={property} onSelect={handleSelect} isSelected={selectedId === property.id} />
                        ))}
                    </div>
                </TabsContent>
            </ScrollArea>
        </Tabs>
      </div>
    </div>
  );
}
