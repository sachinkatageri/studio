"use client";

import Image from 'next/image';
import { PlaceHolderImages } from '@/lib/placeholder-images';
import { Card, CardContent } from '@/components/ui/card';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Input } from '../ui/input';
import { ArrowRight, Search, SlidersHorizontal } from 'lucide-react';
import { useState } from 'react';
import { Button } from '../ui/button';
import { Checkbox } from '../ui/checkbox';
import { Label } from '../ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '../ui/select';
import { Separator } from '../ui/separator';
import { Slider } from '../ui/slider';
import { Tabs, TabsList, TabsTrigger } from '../ui/tabs';

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
    const [budget, setBudget] = useState([0, 30]);
    const [size, setSize] = useState([0, 50000]);

    return (
    <div className="flex flex-col h-full bg-card">
      <div className="p-4 border-b space-y-4">
        <div>
            <h2 className="text-xl font-bold">Properties</h2>
            <p className="text-sm text-muted-foreground">5 properties found</p>
        </div>
        <div className="relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" />
            <Input
              type="text"
              placeholder="Search properties..."
              className="w-full pl-10 h-10 bg-background"
            />
          </div>
      </div>
      <ScrollArea className="flex-1">
        <div className="p-2 space-y-2">
          {properties.map((property) => {
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
                    {property.size && <p className="text-sm text-muted-foreground">Size: {property.size} sq. yd.</p>}
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
