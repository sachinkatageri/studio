

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
import { ArrowUpDown, Building, Check, ChevronDown, Heart, Home, MessageCircle, X } from 'lucide-react';
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
        "overflow-hidden group hover:shadow-lg transition-shadow duration-300 cursor-pointer rounded-lg hover:bg-yellow-50 dark:hover:bg-yellow-900/20",
        isSelected ? "ring-2 ring-primary border-primary" : "border"
      )}
      onClick={() => onSelect(property.id)}
    >
      <CardContent className="p-2 flex gap-3 items-start">
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
        <div className="flex flex-col gap-1 flex-1 min-w-0">
            <div className="flex justify-between items-start">
                <div className="flex items-center gap-2">
                    <h3 className="font-semibold text-sm leading-tight truncate">{property.name}</h3>
                    <Image src="https://cdn-icons-png.flaticon.com/512/5253/5253968.png" alt="Verified" width={16} height={16} />
                </div>
                 <div className="flex items-center gap-0.5">
                    <Button variant="ghost" size="icon" className="h-7 w-7 text-muted-foreground hover:text-rose-500 hover:bg-rose-100 dark:hover:bg-rose-900/50">
                        <Heart className="h-4 w-4" />
                    </Button>
                    <Button variant="ghost" size="icon" className="h-7 w-7 text-muted-foreground hover:text-green-500 hover:bg-green-100 dark:hover:bg-green-900/50">
                        <Image src="https://www.buildersinfo.in/property-details/whatsapp.png" alt="WhatsApp" width={16} height={16} />
                    </Button>
                </div>
            </div>
          <p className="text-xs text-muted-foreground truncate">{property.location}</p>
          
          <div className="flex items-end gap-2 mt-1">
            {property.price ? (
                <>
                  <p className="font-bold text-primary text-sm">
                      {property.price.startsWith('Starting') ? property.price : `₹${property.price}`}
                  </p>
                  {beforePrice > 0 && offerPrice > 0 && !property.price.startsWith('Starting') && (
                     <p className="text-xs text-muted-foreground line-through">
                        ₹{beforePrice.toLocaleString('en-IN')}
                    </p>
                  )}
                </>
            ) : property.pricePerSqFt ? (
              <p className="font-bold text-primary text-sm">₹{property.pricePerSqFt} <span className="text-xs font-normal">/sq.ft</span></p>
            ) : null}
          </div>
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

const quickFilterOptions = ['For Sale', 'For Rent', 'Ready to Move', 'New Projects', 'Verified', 'Video'];
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
                <div className="px-4 pt-4 pb-0 border-b shrink-0">
                    
                    <TabsList variant="pill" className="grid w-full grid-cols-3">
                        <TabsTrigger variant="pill" value="all">All</TabsTrigger>
                        <TabsTrigger variant="pill" value="commercial"><Building className="mr-2 h-4 w-4" />Commercial</TabsTrigger>
                        <TabsTrigger variant="pill" value="residential"><Home className="mr-2 h-4 w-4" />Residential</TabsTrigger>
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
                        <p className="text-xs text-muted-foreground">{properties.length} properties found</p>
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

                <ScrollArea className="flex-1 overflow-y-auto">
                    <TabsContent value="all" className="mt-0">
                        <div className="space-y-3 p-4">
                            {properties.map((property) => (
                                <PropertyCard key={property.id} property={property} onSelect={onSelectProperty} isSelected={selectedPropertyId === property.id} />
                            ))}
                        </div>
                    </TabsContent>
                    <TabsContent value="commercial" className="mt-0">
                        <div className="space-y-3 p-4">
                            {commercialProperties.map((property) => (
                                <PropertyCard key={property.id} property={property} onSelect={onSelectProperty} isSelected={selectedPropertyId === property.id} />
                            ))}
                        </div>
                    </TabsContent>
                    <TabsContent value="residential" className="mt-0">
                        <div className="space-y-3 p-4">
                            {residentialProperties.map((property) => (
                                <PropertyCard key={property.id} property={property} onSelect={onSelectProperty} isSelected={selectedPropertyId === property.id} />
                            ))}
                        </div>
                    </TabsContent>
                </ScrollArea>
            </Tabs>
        </div>
    );
}
