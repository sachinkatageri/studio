
"use client";

import Image from 'next/image';
import { PlaceHolderImages } from '@/lib/placeholder-images';
import { Card, CardContent } from '@/components/ui/card';
import { ScrollArea, ScrollBar } from '@/components/ui/scroll-area';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '../ui/tabs';
import { cn } from '@/lib/utils';
import { properties } from '@/lib/properties';
import type { MobileView } from '@/app/page';
import { Button } from '../ui/button';
import { ArrowUpDown, Check, ChevronDown, X } from 'lucide-react';
import { useState } from 'react';
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from '../ui/dropdown-menu';

const commercialProperties = properties.filter(p => p.type === 'Commercial');
const residentialProperties = properties.filter(p => p.type === 'Residential');

const PropertyCard = ({ property, onSelect, isSelected }: { property: typeof properties[0], onSelect: (id: string) => void, isSelected: boolean}) => {
  const propertyImage = PlaceHolderImages.find(p => p.id === property.id);
  
  const offerPriceString = property.price ? String(property.price).replace(/[^0-9.]/g, '') : '0';
  const offerPrice = parseInt(offerPriceString, 10);
  const beforePrice = Math.round(offerPrice * 1.15);

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
          {property.price && (
            <div className="flex items-end gap-2 mt-1">
              <p className="font-bold text-primary text-base">
                  {property.price.startsWith('Starting') ? property.price : `₹${property.price}`}
              </p>
              {beforePrice > 0 && offerPrice > 0 && !property.price.startsWith('Starting') && (
                 <p className="text-sm text-muted-foreground line-through">
                    ₹{beforePrice.toLocaleString('en-IN')}
                </p>
              )}
            </div>
          )}
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

const quickFilterOptions = ['Lands', 'Plots', 'Owner Listed', 'Last Month', 'No Brokerage', 'Verified', 'Video'];
const sortOptions = [
    { value: 'uploaded-date', label: 'Uploaded Date (Latest)' },
    { value: 'price-low-high', label: 'Price (low to high)' },
    { value: 'price-high-low', label: 'Price (high to low)' },
    { value: 'size-low-high', label: 'Size (low to high)' },
    { value: 'size-high-low', label: 'Size (high to low)' },
    { value: 'total-price-low-high', label: 'Total Price (low to high)' },
    { value: 'total-price-high-low', label: 'Total Price (high to low)' },
];


export default function PropertyList({ onSelectProperty, selectedPropertyId, setMobileView }: PropertyListProps) {
    const [quickFilters, setQuickFilters] = useState<string[]>([]);

    const toggleQuickFilter = (filter: string) => {
        setQuickFilters(prev => 
            prev.includes(filter) ? prev.filter(f => f !== filter) : [...prev, filter]
        );
    }
    
    return (
        <div className="flex flex-col h-full bg-card">
            <Tabs defaultValue="all" className="w-full flex flex-col flex-1 min-h-0">
                <div className="p-4 pb-0 border-b shrink-0">
                    <h2 className="text-xl font-bold">List View</h2>
                    <TabsList className="grid w-full grid-cols-3 mt-4">
                        <TabsTrigger value="all">All</TabsTrigger>
                        <TabsTrigger value="commercial">Commercial</TabsTrigger>
                        <TabsTrigger value="residential">Residential</TabsTrigger>
                    </TabsList>
                    <ScrollArea className="w-full whitespace-nowrap py-4">
                        <div className="flex gap-2">
                            {quickFilterOptions.map(filter => (
                                <Button
                                    key={filter}
                                    variant={quickFilters.includes(filter) ? 'default' : 'outline'}
                                    size="sm"
                                    onClick={() => toggleQuickFilter(filter)}
                                    className="rounded-full h-8"
                                >
                                    {quickFilters.includes(filter) && <Check className="mr-2 h-4 w-4" />}
                                    {filter}
                                </Button>
                            ))}
                        </div>
                        <ScrollBar orientation="horizontal" className="invisible" />
                    </ScrollArea>

                    <div className="flex justify-between items-center pb-2">
                        <p className="text-sm text-muted-foreground">6 properties found</p>
                        <DropdownMenu>
                            <DropdownMenuTrigger asChild>
                                <Button variant="ghost" size="sm">
                                    Sort by
                                    <ChevronDown className="ml-2 h-4 w-4" />
                                </Button>
                            </DropdownMenuTrigger>
                            <DropdownMenuContent align="end">
                                {sortOptions.map(option => (
                                    <DropdownMenuItem key={option.value}>
                                        {option.label}
                                    </DropdownMenuItem>
                                ))}
                            </DropdownMenuContent>
                        </DropdownMenu>
                    </div>
                </div>

                <div className="flex-1 relative">
                    <ScrollArea className="absolute inset-0">
                        <TabsContent value="all" className="mt-0">
                            <div>
                                {properties.map((property) => (
                                    <PropertyCard key={property.id} property={property} onSelect={onSelectProperty} isSelected={selectedPropertyId === property.id} />
                                ))}
                            </div>
                        </TabsContent>
                        <TabsContent value="commercial" className="mt-0">
                            <div>
                                {commercialProperties.map((property) => (
                                    <PropertyCard key={property.id} property={property} onSelect={onSelectProperty} isSelected={selectedPropertyId === property.id} />
                                ))}
                            </div>
                        </TabsContent>
                        <TabsContent value="residential" className="mt-0">
                            <div>
                                {residentialProperties.map((property) => (
                                    <PropertyCard key={property.id} property={property} onSelect={onSelectProperty} isSelected={selectedPropertyId === property.id} />
                                ))}
                            </div>
                        </TabsContent>
                    </ScrollArea>
                </div>
            </Tabs>
        </div>
    );
}
