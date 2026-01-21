
"use client";

import { useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import Image from "next/image";
import Link from "next/link";
import { ArrowRight, ChevronLeft, ChevronRight, Star } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from "@/components/ui/carousel";
import { cn } from "@/lib/utils";

const similarPropertiesData = [
    {
        id: "workshaala",
        name: "Workshaala",
        location: "Koramangala",
        rating: 4.8,
        ratingText: "Excellent",
        price: "7,999",
        discount: "44% off",
        imageUrl: "https://images.unsplash.com/photo-1600210492493-0946911123ea?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3NDE5ODJ8MHwxfHNlYXJjaHw1fHxpbnRlcmlvcnxlbnwwfHx8fDE3Njg5ODA4NTJ8MA&ixlib=rb-4.1.0&q=80&w=1080",
        imageHint: "office interior"
    },
    {
        id: "incubex",
        name: "INCUBEX",
        location: "Koramangala",
        rating: 4.2,
        ratingText: "Very Good",
        price: "5,999",
        guarantee: "Best Price Guarantee",
        imageUrl: "https://picsum.photos/seed/incubex/400/300",
        imageHint: "building exterior"
    },
    {
        id: "smart-space",
        name: "Smart Space",
        location: "Koramangala",
        rating: 3.9,
        ratingText: "Good",
        price: "4,999",
        discount: "34% off",
        imageUrl: "https://picsum.photos/seed/smart-space/400/300",
        imageHint: "modern building"
    },
    {
        id: "urban-vault",
        name: "Urban Vault",
        location: "Koramangala",
        rating: 4.2,
        ratingText: "Very Good",
        price: "5,999",
        guarantee: "Best Price Guarantee",
        imageUrl: "https://picsum.photos/seed/urban-vault/400/300",
        imageHint: "office building"
    },
    {
        id: "indiqube",
        name: "Indiqube",
        location: "Koramangala",
        rating: 4.2,
        ratingText: "Very Good",
        price: "5,999",
        guarantee: "Best Price Guarantee",
        imageUrl: "https://picsum.photos/seed/indiqube/400/300",
        imageHint: "night building"
    }
];

const locations = ["Koramangala", "MG Road", "HSR", "Indiranagar", "Hebbal"];

const SimilarPropertyCard = ({ property }: { property: typeof similarPropertiesData[0] }) => (
    <Card className="overflow-hidden h-full group">
        <div className="relative aspect-[4/3]">
            <Image
                src={property.imageUrl}
                alt={property.name}
                fill
                className="object-cover transition-transform duration-300 group-hover:scale-105"
                data-ai-hint={property.imageHint}
            />
            {property.discount && (
                <Badge variant="destructive" className="absolute top-2 left-2">{property.discount}</Badge>
            )}
            {property.guarantee && (
                <Badge variant="default" className="absolute top-2 left-2 bg-green-600 hover:bg-green-700">{property.guarantee}</Badge>
            )}
        </div>
        <CardContent className="p-4">
            <h3 className="font-bold">{property.name}</h3>
            <p className="text-sm text-muted-foreground">{property.location}</p>
            <div className="flex justify-between items-center mt-2">
                <div className="flex items-center gap-1">
                    <Badge>{property.rating}</Badge>
                    <span className="text-sm font-medium">{property.ratingText}</span>
                </div>
                <p className="font-bold text-lg">₹{property.price}</p>
            </div>
        </CardContent>
    </Card>
);

export default function SimilarProperties() {
    const [activeLocation, setActiveLocation] = useState("Koramangala");

    return (
        <section id="similar-properties" className="py-12 bg-muted/30">
            <div className="container mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex flex-wrap justify-between items-center gap-4 mb-8">
                    <div>
                        <h2 className="text-2xl md:text-3xl font-bold font-headline">Similar Properties</h2>
                        <p className="mt-1 text-muted-foreground">Handpicked properties for you.</p>
                    </div>
                    <div className="flex items-center gap-1 border rounded-lg p-1 bg-background">
                        {locations.map(loc => (
                             <Button 
                                key={loc} 
                                variant={activeLocation === loc ? "default" : "ghost"}
                                onClick={() => setActiveLocation(loc)}
                                className={cn("px-3 py-1 h-auto text-sm", activeLocation === loc && "shadow")}
                            >
                                {loc}
                            </Button>
                        ))}
                         <Button variant="ghost" asChild className="px-3 py-1 h-auto text-sm text-primary">
                            <Link href="#">View all <ChevronRight className="h-4 w-4" /></Link>
                        </Button>
                    </div>
                </div>

                <Carousel
                    opts={{
                        align: "start",
                        loop: true,
                    }}
                    className="w-full"
                >
                    <CarouselContent className="-ml-4">
                        {similarPropertiesData.map((property) => (
                            <CarouselItem key={property.id} className="pl-4 basis-full sm:basis-1/2 md:basis-1/3 lg:basis-1/4">
                                <Link href={`/property/${property.id}`} className="block h-full">
                                    <SimilarPropertyCard property={property} />
                                </Link>
                            </CarouselItem>
                        ))}
                    </CarouselContent>
                    <CarouselPrevious className="absolute left-0 top-1/2 -translate-y-1/2 z-10" />
                    <CarouselNext className="absolute right-0 top-1/2 -translate-y-1/2 z-10" />
                </Carousel>
            </div>
        </section>
    );
}
