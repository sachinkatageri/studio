"use client";

import { properties } from '@/lib/properties';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Check, Phone, ShieldCheck, Star, Users, Warehouse, Wifi, Zap, Building, Square, Bed, Bath, ParkingSquare, Armchair, MapPin, FileText, Clock, Building2, School, Hotel, Hospital, Briefcase, Heart, Share2, AlertTriangle, CheckCircle, Download, Wrench, UserCheck, User, Coffee, PlusCircle } from 'lucide-react';
import { Separator } from '@/components/ui/separator';
import Image from 'next/image';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import Link from 'next/link';
import React, 'useState } from 'react';
import { cn } from '@/lib/utils';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '@/components/ui/tooltip';
import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from '@/components/ui/carousel';
import { VerificationProcessDialog } from '@/components/layout/verification-process-dialog';
import { ScrollArea, ScrollBar } from '@/components/ui/scroll-area';
import { AmenitiesDialog } from '@/components/layout/amenities-dialog';
import { allAmenities } from '@/lib/amenities';
import VerificationCard from './verification-card';

type Property = typeof properties[0];

const PropertyOverview = ({ property }: { property: Property}) => (
    <Card id="overview">
        <CardHeader className='p-4'>
            <CardTitle>Overview</CardTitle>
        </CardHeader>
        <Separator />
        <CardContent className="p-6">
            {/* @ts-ignore */}
            <p className="text-muted-foreground text-sm md:text-base">{property.about}</p>
        </CardContent>
    </Card>
)

const PropertyAmenities = ({ property }: { property: Property}) => {
    const [isAmenitiesDialogOpen, setIsAmenitiesDialogOpen] = useState(false);
    const amenitiesToShow = allAmenities.slice(0, 11);
    const remainingCount = allAmenities.length - amenitiesToShow.length;

    return (
        <Card id="amenities">
            <CardHeader className='p-4'>
                <CardTitle>Amenities</CardTitle>
            </CardHeader>
            <Separator />
            <CardContent className="p-6">
                <div className="grid grid-cols-4 md:grid-cols-6 gap-4 md:gap-6">
                    {amenitiesToShow.map(amenity => (
                        <div key={amenity.name} className="flex flex-col items-center text-center gap-2">
                            <div className="flex items-center justify-center h-14 w-14 md:h-16 md:w-16 rounded-full bg-muted">
                                {amenity.icon ? <amenity.icon className="h-5 w-5 md:h-6 md:w-6 text-primary" /> : <Check className="h-5 w-5 md:h-6 md:w-6 text-primary" />}
                            </div>
                            <span className="text-xs md:text-sm font-medium">{amenity.name}</span>
                        </div>
                    ))}
                    {remainingCount > 0 && (
                        <div className="flex flex-col items-center text-center gap-2">
                            <button 
                                onClick={() => setIsAmenitiesDialogOpen(true)}
                                className="flex items-center justify-center h-14 w-14 md:h-16 md:w-16 rounded-full bg-muted hover:bg-muted/80 transition-colors"
                            >
                                <PlusCircle className="h-5 w-5 md:h-6 md:w-6 text-primary" />
                            </button>
                            <button onClick={() => setIsAmenitiesDialogOpen(true)} className="text-xs md:text-sm font-medium hover:underline">+{remainingCount} More</button>
                        </div>
                    )}
                </div>
            </CardContent>
            <AmenitiesDialog open={isAmenitiesDialogOpen} onOpenChange={setIsAmenitiesDialogOpen} />
        </Card>
    )
}

const PropertyLocation = () => (
  <CardContent className="p-6">
    <div className="relative h-80 w-full rounded-lg overflow-hidden">
        <Image src="https://images.unsplash.com/photo-1577086664693-894d8405334a?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3NDE5ODJ8MHwxfHNlYXJjaHwxNHx8bWFwfGVufDB8fHx8MTc2Nzk2NzI4NHww&ixlib=rb-4.1.0&q=80&w=1080" alt="Map location" fill className="object-cover" data-ai-hint="map location" />
        <div className="absolute inset-0 bg-black/20 flex items-center justify-center">
            <Button variant="secondary">
                <MapPin className="mr-2 h-4 w-4" />
                Click to view the location
            </Button>
        </div>
    </div>
  </CardContent>
)

const nearbyData = {
    school: [
        { name: 'Global International School', distance: '1.2 km' },
        { name: 'Oakridge International School', distance: '2.5 km' },
        { name: 'Delhi Public School', distance: '3.0 km' },
    ],
    hospital: [
        { name: 'Apollo Hospital', distance: '0.8 km' },
        { name: 'Care Hospital', distance: '1.5 km' },
        { name: 'MaxCure Hospital', distance: '2.1 km' },
    ],
    hotel: [
        { name: 'Taj Deccan', distance: '4.0 km' },
        { name: 'Marriott Hyderabad', distance: '5.5 km' },
        { name: 'The Park Hyderabad', distance: '6.0 km' },
    ],
    business: [
        { name: 'Infosys Campus', distance: '3.5 km' },
        { name: 'Google Office', distance: '4.2 km' },
        { name: 'TCS Synergy Park', distance: '5.0 km' },
    ],
};

type NearbyCategory = keyof typeof nearbyData;

const NearbyPlaces = () => {
    const [activeCategory, setActiveCategory] = useState<NearbyCategory>('school');

    const categories: { id: NearbyCategory, label: string, icon: React.ReactNode }[] = [
        { id: 'school', label: 'Schools', icon: <School className="h-5 w-5" /> },
        { id: 'hospital', label: 'Hospitals', icon: <Hospital className="h-5 w-5" /> },
        { id: 'hotel', label: 'Hotels', icon: <Hotel className="h-5 w-5" /> },
        { id: 'business', label: 'Businesses', icon: <Briefcase className="h-5 w-5" /> },
    ];

    return (
        <div>
            <div className="md:hidden">
                 <ScrollArea className="w-full whitespace-nowrap">
                    <div className="flex gap-2 mb-4">
                        {categories.map(category => (
                            <Button 
                                key={category.id} 
                                variant={activeCategory === category.id ? 'default' : 'outline'}
                                onClick={() => setActiveCategory(category.id)}
                                className="flex items-center gap-2 h-9 px-3"
                            >
                                {category.icon}
                                <span className="text-xs">{category.label}</span>
                            </Button>
                        ))}
                    </div>
                    <ScrollBar orientation="horizontal" className="invisible" />
                </ScrollArea>
            </div>
            <div className="hidden md:flex flex-wrap gap-2 mb-4">
                {categories.map(category => (
                    <Button 
                        key={category.id} 
                        variant={activeCategory === category.id ? 'default' : 'outline'}
                        onClick={() => setActiveCategory(category.id)}
                        className="flex items-center gap-2"
                    >
                        {category.icon}
                        <span>{category.label}</span>
                    </Button>
                ))}
            </div>
            <ul className="space-y-2">
                {nearbyData[activeCategory].map(item => (
                    <li key={item.name} className="flex justify-between p-2 rounded-md hover:bg-muted text-sm md:text-base">
                        <span className="font-medium">{item.name}</span>
                        <span className="text-muted-foreground">{item.distance}</span>
                    </li>
                ))}
            </ul>
        </div>
    );
};

const OurServices = () => {
    const services = [
      {
        title: 'Hand Holding',
        description: 'Guidance at every step, from selection to possession.',
      },
      {
        title: 'Tag Along',
        description: 'Invest in large land parcels with us, starting from ₹4 Lakh/Acre.',
      },
    ];
  
    return (
      <Card>
        <CardHeader className='p-4'>
            <CardTitle>Our Services</CardTitle>
        </CardHeader>
        <Separator />
        <CardContent className="p-6">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {services.map(service => (
                    <Card key={service.title}>
                    <CardHeader className="p-4 md:p-6">
                        <CardTitle className="text-base md:text-lg">{service.title}</CardTitle>
                    </CardHeader>
                    <CardContent className="p-4 md:p-6 pt-0">
                        <p className="text-xs md:text-sm text-muted-foreground">{service.description}</p>
                    </CardContent>
                    </Card>
                ))}
            </div>
        </CardContent>
      </Card>
    );
  };
  
export default function PropertyDetailsPanel({ property }: { property: Property }) {
    return (
        <div className="space-y-8 pb-20 md:pb-0">
            <PropertyOverview property={property} />
            <PropertyAmenities property={property} />
            
            <Card id="locality" className="lg:col-span-3">
                <CardHeader className='p-4'>
                    <CardTitle>Location &amp; Landmark</CardTitle>
                </CardHeader>
                <Separator />
                <PropertyLocation />
            </Card>

             <Card id="nearby" className="lg:col-span-3">
                <CardHeader className='p-4'>
                    <CardTitle>Nearby Places</CardTitle>
                </CardHeader>
                <Separator />
                <CardContent className="p-6">
                    <NearbyPlaces />
                </CardContent>
            </Card>

            <VerificationCard />
            <OurServices />
        </div>
    )
}
