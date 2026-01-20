
"use client";

import { properties } from '@/lib/properties';
import { Button } from '@/components/ui/button';
import { Check, School, Hotel, Hospital, Briefcase, MapPin, PlusCircle, Star, Wrench, UserCheck, User, CheckCircle } from 'lucide-react';
import { Separator } from '@/components/ui/separator';
import Image from 'next/image';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import Link from 'next/link';
import React, { useState } from 'react';
import { ScrollArea, ScrollBar } from '@/components/ui/scroll-area';
import { AmenitiesDialog } from '@/components/layout/amenities-dialog';
import { allAmenities } from '@/lib/amenities';
import VerificationCard from './verification-card';
import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from '@/components/ui/carousel';
import { Badge } from '@/components/ui/badge';
import { RatingDialog } from '@/components/layout/rating-dialog';

type Property = typeof properties[0];

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
        <CardHeader>
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
    const [isAmenitiesDialogOpen, setIsAmenitiesDialogOpen] = useState(false);
    const amenitiesToShow = allAmenities.slice(0, 11);
    const remainingCount = allAmenities.length - amenitiesToShow.length;

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

    const [activeCategory, setActiveCategory] = useState<NearbyCategory>('school');
    const [isRatingDialogOpen, setIsRatingDialogOpen] = useState(false);

    const categories: { id: NearbyCategory, label: string, icon: React.ReactNode }[] = [
        { id: 'school', label: 'Schools', icon: <School className="h-5 w-5" /> },
        { id: 'hospital', label: 'Hospitals', icon: <Hospital className="h-5 w-5" /> },
        { id: 'hotel', label: 'Hotels', icon: <Hotel className="h-5 w-5" /> },
        { id: 'business', label: 'Businesses', icon: <Briefcase className="h-5 w-5" /> },
    ];

    const totalReviews = 50;
    const ratings = [
        { star: 5, percentage: 80 },
        { star: 4, percentage: 12 },
        { star: 3, percentage: 5 },
        { star: 2, percentage: 2 },
        { star: 1, percentage: 1 },
    ];
    
     const reviews = [
        {
            name: 'Vedant Gupta',
            role: 'Owner',
            time: '11 months ago',
            rating: 4.8,
            good: 'The area has plenty of trees and this locality has so many garden park at wakable distance...',
            bad: 'The metro station is away from our area and the problem is getting buses are not frequen...'
        },
        {
            name: 'Kundan Singh',
            role: 'Other',
            time: '1 year ago',
            rating: 4.5,
            good: 'This is top notch locality with all the services and amenities available. Good place to live...',
            bad: 'Some Challenges like water scarcity increase in summer season. A bit far from the city center...'
        },
        {
            name: 'Priya Sharma',
            role: 'Tenant',
            time: '8 months ago',
            rating: 5.0,
            good: 'Absolutely love living here! The community is friendly and the management is very responsive.',
            bad: 'Guest parking can be a bit challenging on weekends.'
        }
    ];

    return (
        <div className="space-y-8 pb-20 md:pb-0">
            <Card id="amenities">
                <CardHeader>
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
            
            <Card id="locality" className="lg:col-span-3">
                <CardHeader>
                    <CardTitle>Location &amp; Landmark</CardTitle>
                </CardHeader>
                <Separator />
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
            </Card>

             <Card id="nearby" className="lg:col-span-3">
                <CardHeader>
                    <CardTitle>Nearby Places</CardTitle>
                </CardHeader>
                <Separator />
                <CardContent className="p-6">
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
                </CardContent>
            </Card>

            <VerificationCard />

            <OurServices />

             <Card id="ratings-reviews">
                <CardHeader>
                    <CardTitle>Rating & Reviews</CardTitle>
                </CardHeader>
                <Separator/>
                <CardContent className="p-6 space-y-8">
                     <div>
                        <div className="flex justify-between items-center mb-4">
                            <p className="text-sm md:text-base">Overall rating based on {totalReviews} reviews.</p>
                            <Button variant="outline" size="sm" onClick={() => setIsRatingDialogOpen(true)}>Rate property</Button>
                        </div>
                        <Card>
                            <CardContent className="p-4 md:p-6">
                                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                                    <div className="flex flex-col items-center justify-center md:border-r">
                                        <p className="text-3xl md:text-4xl font-bold">{property.rating}</p>
                                        <div className="flex items-center">
                                            {[...Array(Math.floor(property.rating))].map((_, i) => <Star key={i} className="h-4 w-4 md:h-5 md:w-5 text-yellow-400 fill-yellow-400" />)}
                                            {[...Array(5 - Math.floor(property.rating))].map((_, i) => <Star key={i} className="h-4 w-4 md:h-5 md:w-5 text-muted-foreground" />)}
                                        </div>
                                        <p className="text-xs md:text-sm text-muted-foreground mt-1">{totalReviews} ratings</p>
                                    </div>
                                    <div className="md:col-span-2">
                                    {ratings.map(r => (
                                            <div key={r.star} className="flex items-center gap-2">
                                                <span className="text-xs md:text-sm w-12">{r.star} star</span>
                                                <div className="w-full h-2 bg-muted rounded-full overflow-hidden">
                                                    <div className="h-full bg-yellow-400" style={{ width: `${'r.percentage'}%`}}></div>
                                                </div>
                                                <span className="text-xs md:text-sm w-8 text-right">{r.percentage}%</span>
                                            </div>
                                    ))}
                                    </div>
                                </div>
                            </CardContent>
                        </Card>
                    </div>
                    
                    <div>
                        <div className="flex justify-between items-center mb-4">
                            <h3 className="text-lg md:text-xl font-semibold">All resident reviews ({reviews.length} reviews)</h3>
                            <Button variant="link" className="text-primary p-0 h-auto text-sm md:text-base">View All</Button>
                        </div>
                        <Carousel className="w-full" opts={{ align: "start", loop: true }}>
                            <CarouselContent className="-ml-4">
                                {reviews.map((review, index) => (
                                    <CarouselItem key={index} className="pl-4 basis-full md:basis-1/2 lg:basis-1/3">
                                        <div className="p-1">
                                            <Card>
                                                <CardContent className="p-4 space-y-3">
                                                    <div className="flex justify-between items-start">
                                                        <div className="flex items-center gap-3">
                                                            <div className="w-10 h-10 rounded-full bg-primary/20 flex items-center justify-center">
                                                                <UserCheck className="w-6 h-6 text-primary" />
                                                            </div>
                                                            <div>
                                                                <p className="font-semibold text-sm md:text-base">{review.name}</p>
                                                                <p className="text-xs text-muted-foreground">{review.role} | {review.time}</p>
                                                            </div>
                                                        </div>
                                                        <Badge className="bg-green-100 text-green-800 border-green-200 text-xs md:text-sm">
                                                            {review.rating} <Star className="h-3 w-3 ml-1 fill-current" />
                                                        </Badge>
                                                    </div>
                                                    <div className="space-y-3">
                                                        <div>
                                                            <h4 className="font-semibold text-sm flex items-center gap-2"><CheckCircle className="h-4 w-4 text-green-500" /> Good things here</h4>
                                                            <p className="text-xs md:text-sm text-muted-foreground mt-1">{review.good} <Link href="#" className="text-primary font-medium">read more</Link></p>
                                                        </div>
                                                        <div>
                                                            <h4 className="font-semibold text-sm flex items-center gap-2"><Wrench className="h-4 w-4 text-orange-500" /> Things need to improve</h4>
                                                            <p className="text-xs md:text-sm text-muted-foreground mt-1">{review.bad} <Link href="#" className="text-primary font-medium">read more</Link></p>
                                                        </div>
                                                    </div>
                                                </CardContent>
                                            </Card>
                                        </div>
                                    </CarouselItem>
                                ))}
                            </CarouselContent>
                            <CarouselPrevious className="absolute left-0 top-1/2 -translate-y-1/2 z-10" />
                            <CarouselNext className="absolute right-0 top-1/2 -translate-y-1/2 z-10" />
                        </Carousel>
                    </div>
                </CardContent>
                 <RatingDialog open={isRatingDialogOpen} onOpenChange={setIsRatingDialogOpen} />
            </Card>

        </div>
    )
}

    