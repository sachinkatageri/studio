

import { properties } from '@/lib/properties';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Check, Phone, ShieldCheck, Star, Users, Warehouse, Wifi, Zap, Building, Square, Bed, Bath, ParkingSquare, Armchair, MapPin } from 'lucide-react';
import { Separator } from '@/components/ui/separator';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion';
import Image from 'next/image';
import { Card, CardContent } from '@/components/ui/card';

type Property = typeof properties[0];

const amenityIcons: { [key: string]: React.ReactNode } = {
    'High-Speed WiFi': <Wifi className="h-5 w-5 text-primary" />,
    'Meeting Rooms': <Users className="h-5 w-5 text-primary" />,
    'Power Backup': <Zap className="h-5 w-5 text-primary" />,
    '24/7 Security': <ShieldCheck className="h-5 w-5 text-primary" />,
    'Loading Dock': <Warehouse className="h-5 w-5 text-primary" />,
  };
  
const PropertyOverview = ({ property }: { property: Property}) => (
    <div className="mt-8">
        <h2 className="text-xl font-semibold mb-4">Overview</h2>
        {/* @ts-ignore */}
        <p className="text-muted-foreground">{property.about}</p>
    </div>
)


const PropertyAmenities = ({ property }: { property: Property}) => (
    <div className="mt-8">
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
    <svg role="img" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 fill-current">
      <title>WhatsApp</title>
      <path d="M12.04 2.016c-5.523 0-10 4.477-10 10s4.477 10 10 10c1.554 0 3.045-.356 4.378-1.004l4.58 1.005-1.04-4.47c.72-1.39 1.12-3.01 1.12-4.71s-4.478-9.82-10.038-9.82zm4.19 12.06c-.195.345-.78.64-1.12.72-.29.07-.66.1-1.07-.06-.8-.31-1.59-.72-2.24-1.22s-1.15-1.1-1.6-1.8c-.13-.21-.26-.44-.35-.67-.36-.91-.18-1.42.15-1.8.1-.12.23-.15.34-.15.11 0 .22 0 .31.01.1.01.15.02.24.11.16.15.25.38.28.42.06.1.08.23.01.37-.1.21-.15.33-.24.43-.09.1-.18.2-.26.3-.08.08-.16.17-.06.31.08.13.33.56.73.94.55.51 1.05.81 1.4.92.17.05.28.04.38-.02.1-.06.41-.49.52-.66.11-.17.22-.18.37-.11.16.07.95.45 1.12.53s.27.12.31.18.06.27.01.52z" />
    </svg>
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

const PropertyLayout = ({ property }: { property: Property }) => {
    const isCommercial = property.type === 'Commercial';
  
    const residentialLayoutItems = [
      { icon: <Building className="h-5 w-5 text-primary" />, label: 'Type', value: 'Apartment' },
      { icon: <Square className="h-5 w-5 text-primary" />, label: 'Area', value: '1800 sqft' },
      { icon: <Bed className="h-5 w-5 text-primary" />, label: 'Bedrooms', value: '3' },
      { icon: <Bath className="h-5 w-5 text-primary" />, label: 'Bathrooms', value: '3' },
      { icon: <ParkingSquare className="h-5 w-5 text-primary" />, label: 'Parking', value: '2 spots' },
      { icon: <Armchair className="h-5 w-5 text-primary" />, label: 'Furnishing', value: 'Furnished' },
    ];
  
    const commercialLayoutItems = [
      { icon: <Users className="h-5 w-5 text-primary" />, label: 'Seats', value: '6-15' },
      { icon: <Users className="h-5 w-5 text-primary" />, label: 'Seats', value: '16-30' },
      { icon: <Users className="h-5 w-5 text-primary" />, label: 'Seats', value: '31-60' },
    ];
  
    const layoutItems = isCommercial ? commercialLayoutItems : residentialLayoutItems;
  
    return (
        <div className={`grid grid-cols-2 sm:grid-cols-3 ${isCommercial ? 'md:grid-cols-3' : 'md:grid-cols-4 lg:grid-cols-3'} gap-4`}>
          {layoutItems.map((item, index) => (
            <div key={index} className="p-4 border rounded-lg flex flex-col items-center justify-center gap-2 text-center">
              {item.icon}
              <p className="text-sm text-muted-foreground">{item.label}</p>
              <p className="font-semibold">{item.value}</p>
            </div>
          ))}
        </div>
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

export default function PropertyDetailsPanel({ property }: { property: Property }) {
    return (
        <div>
            <div>
                <h1 className="text-3xl font-bold">{property.name}</h1>
                <p className="text-muted-foreground mt-1">{property.location}</p>
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
                <Button variant="outline" className="flex-1 text-lg py-6">
                    <WhatsAppIcon /> WhatsApp
                </Button>
            </div>

            <Separator className="my-8" />

            <PropertyOverview property={property} />

            <Separator className="my-8" />
            
            <PropertyAmenities property={property} />

            <Separator className="my-8" />

            <Accordion type="single" collapsible className="w-full space-y-4">
                {/* @ts-ignore */}
                {property.priceBreakdown && (
                    <AccordionItem value="pricing">
                        <AccordionTrigger className="text-xl font-semibold">Pricing Details</AccordionTrigger>
                        <AccordionContent>
                            <PricingDetails property={property} />
                        </AccordionContent>
                    </AccordionItem>
                )}

                <AccordionItem value="layout">
                    <AccordionTrigger className="text-xl font-semibold">Property Layout</AccordionTrigger>
                    <AccordionContent>
                        <PropertyLayout property={property} />
                    </AccordionContent>
                </AccordionItem>

                <AccordionItem value="location">
                    <AccordionTrigger className="text-xl font-semibold">Location & Landmark</AccordionTrigger>
                    <AccordionContent>
                        <PropertyLocation />
                    </AccordionContent>
                </AccordionItem>

                <AccordionItem value="reviews">
                    <AccordionTrigger className="text-xl font-semibold">Rating & Reviews</AccordionTrigger>
                    <AccordionContent>
                        <PropertyReviews property={property} />
                    </AccordionContent>
                </AccordionItem>

                <AccordionItem value="video">
                    <AccordionTrigger className="text-xl font-semibold">Property Video</AccordionTrigger>
                    <AccordionContent>
                        <PropertyVideo />
                    </AccordionContent>
                </AccordionItem>

                <AccordionItem value="plan">
                    <AccordionTrigger className="text-xl font-semibold">Property Plan</AccordionTrigger>
                    <AccordionContent>
                        <PropertyPlan />
                    </AccordionContent>
                </AccordionItem>
            </Accordion>
        </div>
    )
}
