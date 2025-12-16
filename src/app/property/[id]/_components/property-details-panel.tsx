

"use client";

import { properties } from '@/lib/properties';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Check, Phone, ShieldCheck, Star, Users, Warehouse, Wifi, Zap, Building, Square, Bed, Bath, ParkingSquare, Armchair, MapPin, FileText, Clock, Building2, School, Hotel, Hospital, Briefcase, Heart, Share2 } from 'lucide-react';
import { Separator } from '@/components/ui/separator';
import Image from 'next/image';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import Link from 'next/link';
import React, { useState } from 'react';
import { cn } from '@/lib/utils';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';

type Property = typeof properties[0];

const amenityIcons: { [key: string]: React.ReactNode } = {
    'High-Speed WiFi': <Wifi className="h-5 w-5 text-primary" />,
    'Meeting Rooms': <Users className="h-5 w-5 text-primary" />,
    'Power Backup': <Zap className="h-5 w-5 text-primary" />,
    '24/7 Security': <ShieldCheck className="h-5 w-5 text-primary" />,
    'Loading Dock': <Warehouse className="h-5 w-5 text-primary" />,
    'Printing': <Check className="h-5 w-5 text-primary" />,
    'Coffee Bar': <Check className="h-5 w-5 text-primary" />,
  };
  
const PropertyOverview = ({ property }: { property: Property}) => (
    <div>
        <h2 className="text-xl font-semibold mb-4">Overview</h2>
        {/* @ts-ignore */}
        <p className="text-muted-foreground">{property.about}</p>
    </div>
)


const PropertyAmenities = ({ property }: { property: Property}) => (
    <div>
        <h2 className="text-xl font-semibold mb-4">Amenities</h2>
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
            {property.amenities.map(amenity => (
                <div key={amenity} className="flex items-center gap-3">
                    {amenityIcons[amenity] || <Check className="h-5 w-5 text-primary" />}
                    <span className="text-sm">{amenity}</span>
                </div>
            ))}
        </div>
    </div>
)

const WhatsAppIcon = () => (
    <Image src="https://www.buildersinfo.in/property-details/whatsapp.png" alt="WhatsApp" width={20} height={20} />
);

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
        <Image src="https://picsum.photos/seed/map-detail/1000/400" alt="Map location" fill className="object-cover" data-ai-hint="map location" />
        <div className="absolute inset-0 bg-black/20 flex items-center justify-center">
            <Button variant="secondary">
                <MapPin className="mr-2 h-4 w-4" />
                View on Map
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
            <div className="flex flex-wrap gap-2 mb-4">
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
                    <li key={item.name} className="flex justify-between p-2 rounded-md hover:bg-muted">
                        <span className="font-medium">{item.name}</span>
                        <span className="text-muted-foreground">{item.distance}</span>
                    </li>
                ))}
            </ul>
        </div>
    );
};


const PropertyReviews = ({ property }: { property: Property }) => {
    const totalReviews = 50;
    const ratings = [
        { star: 5, percentage: 80 },
        { star: 4, percentage: 12 },
        { star: 3, percentage: 5 },
        { star: 2, percentage: 2 },
        { star: 1, percentage: 1 },
    ];
    
    return (
        <div>
            <div className="flex justify-between items-center mb-4">
                <p>Overall rating based on {totalReviews} reviews.</p>
                <Button variant="outline">Rate property</Button>
            </div>
            <Card>
                <CardContent className="p-6">
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                        <div className="flex flex-col items-center justify-center border-r">
                            <p className="text-4xl font-bold">{property.rating}</p>
                            <div className="flex items-center">
                                {[...Array(Math.floor(property.rating))].map((_, i) => <Star key={i} className="h-5 w-5 text-yellow-400 fill-yellow-400" />)}
                                {[...Array(5 - Math.floor(property.rating))].map((_, i) => <Star key={i} className="h-5 w-5 text-muted-foreground" />)}
                            </div>
                            <p className="text-sm text-muted-foreground mt-1">{totalReviews} ratings</p>
                        </div>
                        <div className="md:col-span-2">
                           {ratings.map(r => (
                                <div key={r.star} className="flex items-center gap-2">
                                    <span className="text-sm w-12">{r.star} star</span>
                                    <div className="w-full h-2 bg-muted rounded-full overflow-hidden">
                                        <div className="h-full bg-yellow-400" style={{ width: `${r.percentage}%`}}></div>
                                    </div>
                                    <span className="text-sm w-8 text-right">{r.percentage}%</span>
                                </div>
                           ))}
                        </div>
                    </div>
                </CardContent>
            </Card>
        </div>
    )
}

const LayoutImageGallery = ({ images }: { images: { id: number, src: string, alt: string, hint: string }[] }) => (
    <div className="w-full mx-auto">
        <div className="grid grid-cols-4 grid-rows-2 gap-2 aspect-[2/1]">
            {images.map((image, index) => (
                <div key={image.id} className={cn(
                    "relative overflow-hidden rounded-lg",
                    index === 0 && 'col-span-2 row-span-2',
                    index === 1 && 'col-span-1 row-span-1',
                    index === 2 && 'col-span-1 row-span-1',
                    index === 3 && 'col-span-1 row-span-1',
                    index === 4 && 'col-span-1 row-span-1',
                )}>
                    <Image
                        src={image.src}
                        alt={image.alt}
                        fill
                        className="object-cover"
                        data-ai-hint={image.hint}
                    />
                </div>
            ))}
        </div>
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
            <TabsList className="grid w-full grid-cols-3 mb-4">
                <TabsTrigger value="small">6-15 Seats</TabsTrigger>
                <TabsTrigger value="medium">16-30 Seats</TabsTrigger>
                <TabsTrigger value="large">31-60 Seats</TabsTrigger>
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

const PropertyDocument = () => (
    <div>
        <Card>
            <CardContent className="p-4 flex items-center justify-between">
                <div className="flex items-center gap-4">
                    <FileText className="h-8 w-8 text-primary" />
                    <div>
                        <p className="font-semibold">Property Brochure.pdf</p>
                        <p className="text-sm text-muted-foreground">2.5 MB</p>
                    </div>
                </div>
                <Button asChild variant="outline">
                    <Link href="/sample.pdf" target="_blank" download>View PDF</Link>
                </Button>
            </CardContent>
        </Card>
    </div>
);


const OpeningHours = () => (
    <ul className="space-y-2 text-sm">
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
        <ul className="space-y-3 text-sm">
            {details.map(detail => (
                <li key={detail.label} className="flex justify-between">
                    <span className="text-muted-foreground">{detail.label}</span>
                    <span className="font-medium">{detail.value}</span>
                </li>
            ))}
        </ul>
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
              <CardHeader>
                <CardTitle className="text-lg">{service.title}</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-muted-foreground">{service.description}</p>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    );
  };
  


export default function PropertyDetailsPanel({ property }: { property: Property }) {
    return (
        <div className="space-y-8">
            <div>
                <div className="flex justify-between items-start">
                    <div className="flex-1">
                        <h1 className="text-3xl font-bold">{property.name}</h1>
                        <p className="text-muted-foreground mt-1">{property.location}</p>
                    </div>
                    <div className="flex items-center gap-2">
                        <Button variant="ghost" size="icon">
                            <Heart className="h-6 w-6" />
                            <span className="sr-only">Add to wishlist</span>
                        </Button>
                        <Button variant="ghost" size="icon">
                            <Share2 className="h-6 w-6" />
                            <span className="sr-only">Share</span>
                        </Button>
                    </div>
                </div>
            </div>
            
            <div className="mt-4 flex flex-wrap gap-4 items-center">
                <p className="text-2xl font-bold text-primary">
                    {/* @ts-ignore */}
                    ₹{property.price}
                    <span className="text-base text-muted-foreground font-normal"> (₹{property.pricePerSqFt}/sq.ft)</span>
                </p>
                <Badge variant="secondary">{property.status}</Badge>
                {property.type === 'Commercial' && <Badge>Zero Brokerage</Badge>}
            </div>

            <div className="mt-6 flex flex-wrap gap-6">
                <div className="flex flex-col">
                    <span className="text-sm text-muted-foreground">Area</span>
                    {/* @ts-ignore */}
                    <span className="font-semibold">{property.size} sq.ft</span>
                </div>
                <div className="flex flex-col">
                    <span className="text-sm text-muted-foreground">Developer</span>
                    <span className="font-semibold">Vaishnavi</span>
                </div>
                 <div className="flex flex-col">
                    <span className="text-sm text-muted-foreground">Furnishing</span>
                    <span className="font-semibold">Furnished</span>
                </div>
            </div>

            <div className="mt-6 flex gap-2">
                <Button className="flex-1 text-lg py-6">
                    <Phone className="mr-2" /> Contact
                </Button>
                <Button variant="outline" className="flex-1 text-lg py-6 border-primary text-primary hover:bg-primary hover:text-primary-foreground">
                    <WhatsAppIcon /> WhatsApp
                </Button>
            </div>
            
            <Separator />
            <PropertyOverview property={property} />

            <Separator />
            <PropertyAmenities property={property} />
            
            {/* @ts-ignore */}
            {property.priceBreakdown && (
                <>
                    <Separator />
                    <Card>
                        <CardHeader>
                            <CardTitle className="text-xl">Pricing Details</CardTitle>
                        </CardHeader>
                        <CardContent>
                            <PricingDetails property={property} />
                        </CardContent>
                    </Card>
                </>
            )}

            <Separator />
            <Card>
                <CardHeader>
                    <CardTitle className="text-xl">Property Layout</CardTitle>
                </CardHeader>
                <CardContent>
                    <PropertyLayout property={property} />
                </CardContent>
            </Card>

            <Separator />
             <Card>
                <CardHeader>
                    <CardTitle className="text-xl">Location & Landmark</CardTitle>
                </CardHeader>
                <CardContent>
                    <PropertyLocation />
                </CardContent>
            </Card>
            
            <Separator />
            <Card>
                <CardHeader>
                    <CardTitle className="text-xl">Nearby Places</CardTitle>
                </CardHeader>
                <CardContent>
                    <NearbyPlaces />
                </CardContent>
            </Card>

            <Separator />
            <Card>
                <CardHeader>
                    <CardTitle className="text-xl">Opening Hours</CardTitle>
                </CardHeader>
                <CardContent>
                    <OpeningHours />
                </CardContent>
            </Card>

            <Separator />
            <Card>
                <CardHeader>
                    <CardTitle className="text-xl">Property Details</CardTitle>
                </CardHeader>
                <CardContent>
                    <AdditionalPropertyDetails />
                </CardContent>
            </Card>

            <Separator />
            <Card>
                <CardHeader>
                    <CardTitle className="text-xl">Rating & Reviews</CardTitle>
                </CardHeader>
                <CardContent>
                    <PropertyReviews property={property} />
                </CardContent>
            </Card>

            <Separator />
            <Card>
                <CardHeader>
                    <CardTitle className="text-xl">Property Video</CardTitle>
                </CardHeader>
                <CardContent>
                    <PropertyVideo />
                </CardContent>
            </Card>

            <Separator />
            <Card>
                <CardHeader>
                    <CardTitle className="text-xl">Floor Plan</CardTitle>
                </CardHeader>
                <CardContent>
                    <PropertyPlan />
                </CardContent>
            </Card>

            <Separator />
            <Card>
                <CardHeader>
                    <CardTitle className="text-xl">Property Document</CardTitle>
                </CardHeader>
                <CardContent>
                    <PropertyDocument />
                </CardContent>
            </Card>
            
            <Separator />
            <OurServices />
        </div>
    )
}
