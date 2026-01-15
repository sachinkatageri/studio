

"use client";

import { properties } from '@/lib/properties';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Check, Phone, ShieldCheck, Star, Users, Warehouse, Wifi, Zap, Building, Square, Bed, Bath, ParkingSquare, Armchair, MapPin, FileText, Clock, Building2, School, Hotel, Hospital, Briefcase, Heart, Share2, AlertTriangle, CheckCircle, Download, Wrench, UserCheck, User, Coffee, PlusCircle } from 'lucide-react';
import { Separator } from '@/components/ui/separator';
import Image from 'next/image';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import Link from 'next/link';
import React, { useState } from 'react';
import { cn } from '@/lib/utils';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '@/components/ui/tooltip';
import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from '@/components/ui/carousel';
import { VerificationProcessDialog } from '@/components/layout/verification-process-dialog';
import { ScrollArea, ScrollBar } from '@/components/ui/scroll-area';
import { AmenitiesDialog } from '@/components/layout/amenities-dialog';
import { allAmenities } from '@/lib/amenities';
import { RatingDialog } from '@/components/layout/rating-dialog';

type Property = typeof properties[0];

export const amenityIcons: { [key: string]: React.ReactNode } = {
    'High-Speed WiFi': <Wifi className="h-6 w-6 text-primary" />,
    'Meeting Rooms': <Users className="h-6 w-6 text-primary" />,
    'Power Backup': <Zap className="h-6 w-6 text-primary" />,
    '24/7 Security': <ShieldCheck className="h-6 w-6 text-primary" />,
    'Loading Dock': <Warehouse className="h-6 w-6 text-primary" />,
    'Printing': <Check className="h-6 w-6 text-primary" />,
    'Coffee Bar': <Coffee className="h-6 w-6 text-primary" />,
    'Swimming Pool': <Check className="h-6 w-6 text-primary" />,
    'Gym': <Check className="h-6 w-6 text-primary" />,
    'Clubhouse': <Check className="h-6 w-6 text-primary" />,
    'Private Garden': <Check className="h-6 w-6 text-primary" />,
    'Community Park': <Check className="h-6 w-6 text-primary" />,
    'Jogging Track': <Check className="h-6 w-6 text-primary" />,
    'Gated Community': <ShieldCheck className="h-6 w-6 text-primary" />,
  };
  
const PropertyOverview = ({ property }: { property: Property}) => (
    <div id="overview">
        <h2 className="text-xl font-semibold mb-4">Overview</h2>
        {/* @ts-ignore */}
        <p className="text-muted-foreground text-sm md:text-base">{property.about}</p>
    </div>
)


const PropertyAmenities = ({ property }: { property: Property}) => {
    const [isAmenitiesDialogOpen, setIsAmenitiesDialogOpen] = useState(false);
    const amenitiesToShow = allAmenities.slice(0, 11);
    const remainingCount = allAmenities.length - amenitiesToShow.length;

    return (
        <div id="amenities">
            <h2 className="text-xl font-semibold mb-4">Amenities</h2>
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
            <AmenitiesDialog open={isAmenitiesDialogOpen} onOpenChange={setIsAmenitiesDialogOpen} />
        </div>
    )
}

const PricingDetails = ({ property }: { property: Property}) => (
    // @ts-ignore
    property.priceBreakdown && (
        <ul className="space-y-2 text-sm">
            {/* @ts-ignore */}
            {property.priceBreakdown.map(item => (
            <li key={item.item} className="flex justify-between">
                <span className="text-muted-foreground">{item.item}</span>
                <div className="flex items-center gap-2">
                {/* @ts-ignore */}
                {item.included && <Badge variant="secondary">Included</Badge>}
                <span>{item.value}</span>
                </div>
            </li>
            ))}
        </ul>
    )
)

const PropertyLocation = () => (
    <div className="relative h-80 w-full rounded-lg overflow-hidden">
        <Image src="https://images.unsplash.com/photo-1577086664693-894d8405334a?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3NDE5ODJ8MHwxfHNlYXJjaHwxNHx8bWFwfGVufDB8fHx8MTc2Nzk2NzI4NHww&ixlib=rb-4.1.0&q=80&w=1080" alt="Map location" fill className="object-cover" data-ai-hint="map location" />
        <div className="absolute inset-0 bg-black/20 flex items-center justify-center">
            <Button variant="secondary">
                <MapPin className="mr-2 h-4 w-4" />
                Click to view the location
            </Button>
        </div>
    </div>
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


const PropertyReviews = ({ property }: { property: Property }) => {
    const [isRatingDialogOpen, setIsRatingDialogOpen] = useState(false);
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
        <div id="ratings-reviews" className="space-y-8">
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
                                            <div className="h-full bg-yellow-400" style={{ width: `${r.percentage}%`}}></div>
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
                                                    <h4 className="font-semibold text-sm flex items-center gap-2"><Wrench className="h-4 w-4 text-orange-500" /> Things need improvement</h4>
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
            
            <RatingDialog open={isRatingDialogOpen} onOpenChange={setIsRatingDialogOpen} />
        </div>
    )
}


const LayoutImageGallery = ({ images }: { images: { id: number, src: string, alt: string, hint: string }[] }) => (
    <div className="w-full mx-auto">
        <Carousel>
            <CarouselContent>
                {images.map((image) => (
                    <CarouselItem key={image.id}>
                        <div className="relative aspect-[4/3] w-full overflow-hidden rounded-lg">
                            <Image
                                src={image.src}
                                alt={image.alt}
                                fill
                                className="object-cover"
                                data-ai-hint={image.hint}
                            />
                        </div>
                    </CarouselItem>
                ))}
            </CarouselContent>
            <CarouselPrevious className="absolute left-4 top-1/2 -translate-y-1/2 z-10" />
            <CarouselNext className="absolute right-4 top-1/2 -translate-y-1/2 z-10" />
        </Carousel>
    </div>
);

const PropertyLayout = ({ property }: { property: Property }) => {
    const layouts = {
        small: [
            { id: 1, src: "https://picsum.photos/seed/layout-small-1/800/600", alt: "Small office layout", hint: "small office" },
            { id: 2, src: "https://picsum.photos/seed/layout-small-2/800/600", alt: "Small meeting room", hint: "small meeting room" },
            { id: 3, src: "https://picsum.photos/seed/layout-small-3/800/600", alt: "Compact workspace", hint: "compact workspace" },
            { id: 4, src: "https://picsum.photos/seed/layout-small-4/800/600", alt: "Focused work area", hint: "work area" },
            { id: 5, src: "https://picsum.photos/seed/layout-small-5/800/600", alt: "Focused work area 2", hint: "work area" },
        ],
        medium: [
            { id: 1, src: "https://picsum.photos/seed/layout-medium-1/800/600", alt: "Medium office layout", hint: "medium office" },
            { id: 2, src: "https://picsum.photos/seed/layout-medium-2/800/600", alt: "Team collaboration space", hint: "team space" },
            { id: 3, src: "https://picsum.photos/seed/layout-medium-3/800/600", alt: "Open plan office", hint: "open office" },
            { id: 4, src: "https://picsum.photos/seed/layout-medium-4/800/600", alt: "Brainstorming room", hint: "brainstorming room" },
             { id: 5, src: "https://picsum.photos/seed/layout-medium-5/800/600", alt: "Brainstorming room 2", hint: "brainstorming room" },
        ],
        large: [
            { id: 1, src: "https://picsum.photos/seed/layout-large-1/800/600", alt: "Large office layout", hint: "large office" },
            { id: 2, src: "https://picsum.photos/seed/layout-large-2/800/600", alt: "Corporate office space", hint: "corporate office" },
            { id: 3, src: "https://picsum.photos/seed/layout-large-3/800/600", alt: "Expansive workspace", hint: "expansive workspace" },
            { id: 4, src: "https://picsum.photos/seed/layout-large-4/800/600", alt: "Executive suite", hint: "executive suite" },
             { id: 5, src: "https://picsum.photos/seed/layout-large-5/800/600", alt: "Executive suite 2", hint: "executive suite" },
        ],
    };

    return (
        <Tabs defaultValue="small">
            <TabsList variant="pill" className="grid w-full grid-cols-3 mb-4">
                <TabsTrigger variant="pill" value="small" className="text-xs md:text-sm">6-15 Seats</TabsTrigger>
                <TabsTrigger variant="pill" value="medium" className="text-xs md:text-sm">16-30 Seats</TabsTrigger>
                <TabsTrigger variant="pill" value="large" className="text-xs md:text-sm">31-60 Seats</TabsTrigger>
            </TabsList>
            <TabsContent value="small">
                <LayoutImageGallery images={layouts.small} />
            </TabsContent>
            <TabsContent value="medium">
                <LayoutImageGallery images={layouts.medium} />
            </TabsContent>
            <TabsContent value="large">
                <LayoutImageGallery images={layouts.large} />
            </TabsContent>
        </Tabs>
    );
};
  

const PropertyVideo = () => (
    <div className="aspect-video w-full rounded-lg overflow-hidden">
        <iframe
            className="w-full h-full"
            src="https://www.youtube.com/embed/dQw4w9WgXcQ"
            title="YouTube video player"
            frameBorder="0"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen
        ></iframe>
    </div>
);

const PropertyPlan = () => (
    <div className="relative aspect-video w-full rounded-lg overflow-hidden border">
        <Image src="https://picsum.photos/seed/floor-plan/1000/600" alt="Property floor plan" fill className="object-contain p-4" data-ai-hint="floor plan" />
    </div>
);

const brochureImages = [
    { id: 1, src: "https://picsum.photos/seed/brochure-1/800/600", alt: "Brochure page 1", hint: "brochure page" },
    { id: 2, src: "https://picsum.photos/seed/brochure-2/800/600", alt: "Brochure page 2", hint: "brochure interior" },
    { id: 3, src: "https://picsum.photos/seed/brochure-3/800/600", alt: "Brochure page 3", hint: "brochure layout" },
];

const PropertyDocument = () => (
    <div>
        <Carousel className="w-full">
            <CarouselContent>
                {brochureImages.map((image) => (
                    <CarouselItem key={image.id}>
                        <div className="relative aspect-video w-full overflow-hidden rounded-lg">
                            <Image
                                src={image.src}
                                alt={image.alt}
                                fill
                                className="object-cover"
                                data-ai-hint={image.hint}
                            />
                        </div>
                    </CarouselItem>
                ))}
            </CarouselContent>
            <div className="absolute inset-0 flex items-center justify-center bg-black/40">
                 <Button asChild variant="secondary" size="lg">
                    <Link href="/sample.pdf" target="_blank">View Brochure</Link>
                </Button>
            </div>
             <Button asChild size="icon" className="absolute top-2 right-2 z-10 bg-accent hover:bg-accent/90 text-accent-foreground rounded-full h-10 w-10">
                <Link href="/sample.pdf" target="_blank" download>
                    <Download className="h-5 w-5" />
                </Link>
            </Button>
            <CarouselPrevious className="absolute left-4 top-1/2 -translate-y-1/2 z-10" />
            <CarouselNext className="absolute right-4 top-1/2 -translate-y-1/2 z-10" />
        </Carousel>
    </div>
);


const OpeningHours = () => (
    <ul className="space-y-3 text-sm py-2">
        <li className="flex justify-between">
            <span className="text-muted-foreground">Monday - Friday</span>
            <span>9:00 AM - 6:00 PM</span>
        </li>
        <li className="flex justify-between">
            <span className="text-muted-foreground">Saturday</span>
            <span>Closed</span>
        </li>
        <li className="flex justify-between">
            <span className="text-muted-foreground">Sunday</span>
            <span>Closed</span>
        </li>
    </ul>
);

const AdditionalPropertyDetails = () => {
    const details = [
        { label: 'Category', value: 'Commercial' },
        { label: 'Property Type', value: 'Techpark' },
        { label: 'Under Management', value: 'Yes' },
        { label: 'Available Floors', value: '10th' },
        { label: 'Office Space Solutions', value: 'Floor 10th' },
        { label: 'Facilities', value: '4W PARKING, 2W PARKING' },
        { label: 'Builder Name', value: 'A' },
    ];

    return (
        <div id="developer">
            <ul className="space-y-3 text-sm">
                {details.map(detail => (
                    <li key={detail.label} className="flex justify-between">
                        <span className="text-muted-foreground">{detail.label}</span>
                        <span className="font-medium">{detail.value}</span>
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
      <div>
        <h2 className="text-xl font-semibold mb-4">Our Services</h2>
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
      </div>
    );
  };
  


export default function PropertyDetailsPanel({ property }: { property: Property }) {
    return (
        <div className="space-y-8 pb-20 md:pb-0">
             <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                <div className="md:col-span-2">
                    <PropertyOverview property={property} />
                </div>
                <Card>
                    <CardHeader>
                        <CardTitle className="text-xl">Opening Hours</CardTitle>
                    </CardHeader>
                    <CardContent className="p-6 pt-0">
                        <OpeningHours />
                    </CardContent>
                </Card>
            </div>
            
            <Card>
                <CardContent className="p-6">
                    <PropertyAmenities property={property} />
                </CardContent>
            </Card>
            
            <Card id="layout" className="lg:col-span-3">
                <CardHeader>
                    <CardTitle className="text-xl">Property Layout</CardTitle>
                </CardHeader>
                <CardContent>
                    <PropertyLayout property={property} />
                </CardContent>
            </Card>

            <Card id="locality" className="lg:col-span-3">
                <CardHeader>
                    <CardTitle className="text-xl">Location &amp; Landmark</CardTitle>
                </CardHeader>
                <CardContent className="p-0">
                    <PropertyLocation />
                </CardContent>
            </Card>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                 <Card id="nearby">
                    <CardHeader>
                        <CardTitle className="text-xl">Nearby Places</CardTitle>
                    </CardHeader>
                    <CardContent className="p-6">
                        <NearbyPlaces />
                    </CardContent>
                </Card>
                 <Card>
                    <CardHeader>
                        <CardTitle className="text-xl">Property Details</CardTitle>
                    </CardHeader>
                    <CardContent className="p-6">
                        <AdditionalPropertyDetails />
                    </CardContent>
                </Card>
            </div>
            
            <Card>
                <CardHeader>
                    <CardTitle className="text-xl">Rating &amp; Reviews</CardTitle>
                </CardHeader>
                <CardContent className="p-6">
                    <PropertyReviews property={property} />
                </CardContent>
            </Card>
            
            <div className="grid md:grid-cols-3 gap-8">
                <Card id="video" className="max-w-lg mx-auto w-full">
                    <CardHeader>
                        <CardTitle className="text-xl">Property Video</CardTitle>
                    </CardHeader>
                    <CardContent className="p-6">
                        <PropertyVideo />
                    </CardContent>
                </Card>

                <Card id="plan" className="max-w-lg mx-auto w-full">
                    <CardHeader>
                        <CardTitle className="text-xl">Floor Plan</CardTitle>
                    </CardHeader>
                    <CardContent className="p-6">
                        <PropertyPlan />
                    </CardContent>
                </Card>
                 <Card id="documents" className="max-w-lg mx-auto w-full">
                    <CardHeader>
                        <CardTitle className="text-xl">Property Document</CardTitle>
                    </CardHeader>
                    <CardContent className="p-6">
                        <PropertyDocument />
                    </CardContent>
                </Card>
            </div>
            
            <Card>
                <CardContent className="p-6">
                    <OurServices />
                </CardContent>
            </Card>
        </div>
    )
}
