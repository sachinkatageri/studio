
"use client";

import Image from 'next/image';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Heart, MapPin, Building, Home as HomeIcon, Star } from 'lucide-react';
import { Badge } from '@/components/ui/badge';
import Link from 'next/link';
import { properties } from '@/lib/properties'; // Assuming properties data is available
import { cn } from '@/lib/utils';
import { PlaceHolderImages } from '@/lib/placeholder-images';

type PropertyCardProps = {
    property: typeof properties[0];
    view: 'list' | 'grid';
};

export default function PropertyCard({ property, view }: PropertyCardProps) {
    const projectImage = PlaceHolderImages.find(p => p.id === property.id);

    if (view === 'grid') {
        return (
            <Card className="overflow-hidden transition-shadow duration-300 group h-full">
                <div className="flex flex-col h-full">
                    <Link href={`/property/${property.id}`} className="block">
                        <div className="relative shrink-0 w-full aspect-[4/3]">
                            {projectImage && (
                                <Image
                                    src={projectImage.imageUrl}
                                    alt={projectImage.description}
                                    fill
                                    className="object-cover transition-transform duration-300 group-hover:scale-105"
                                    data-ai-hint={projectImage.imageHint}
                                />
                            )}
                        </div>
                    </Link>

                    <div className="flex-1 flex flex-col p-4">
                         <div className="flex-grow">
                            <div className="flex justify-between items-start">
                                <Badge variant={property.type === 'Commercial' ? 'secondary' : 'default'} className="capitalize mb-2">
                                    {property.type === 'Commercial' ? <Building className="h-3 w-3 mr-1" /> : <HomeIcon className="h-3 w-3 mr-1" />}
                                    {property.type}
                                </Badge>
                                <Button variant="ghost" size="icon" className="h-8 w-8 -mt-1 -mr-1">
                                    <Heart className="h-4 w-4" />
                                </Button>
                            </div>
                            <Link href={`/property/${property.id}`}>
                                <h3 className="font-bold text-base md:text-lg leading-tight truncate group-hover:underline">
                                    {property.name}
                                </h3>
                            </Link>
                            <p className="text-sm text-muted-foreground flex items-center gap-1 mt-1 truncate">
                                <MapPin className="h-4 w-4 shrink-0" />
                                {property.location}
                            </p>
                        </div>
                        
                        <div className="flex items-center justify-between mt-3">
                            <p className="font-bold text-base md:text-lg text-primary">
                                {property.price || `₹${property.pricePerSqFt}/sqft`}
                            </p>
                            <Badge variant="outline">{property.status}</Badge>
                        </div>

                         <Button asChild className="w-full mt-4 hidden md:inline-flex">
                           <Link href={`/property/${property.id}`}>View Details</Link>
                        </Button>
                    </div>
                </div>
            </Card>
        );
    }
    
    // List View
    return (
        <Card className="overflow-hidden transition-shadow duration-300 group">
            <div className="flex flex-col sm:flex-row">
                <Link href={`/property/${property.id}`} className="block relative shrink-0 w-full sm:w-1/3 md:w-1/4 h-48 sm:h-auto">
                    {projectImage && (
                        <Image
                            src={projectImage.imageUrl}
                            alt={projectImage.description}
                            fill
                            className="object-cover"
                            data-ai-hint={projectImage.imageHint}
                        />
                    )}
                     <Button variant="ghost" size="icon" className="absolute top-2 right-2 h-8 w-8 bg-black/30 text-white hover:bg-black/50">
                        <Heart className="h-4 w-4" />
                    </Button>
                </Link>
                <div className="flex-1 p-4 flex flex-col">
                    <div className="flex-1">
                        <div className="flex items-center justify-between">
                            <p className="text-sm text-muted-foreground">{property.type}</p>
                            <div className="flex items-center gap-1 text-sm font-bold">
                                <Star className="h-4 w-4 text-yellow-400 fill-yellow-400" />
                                {property.rating}
                                <span className="text-xs font-normal text-muted-foreground">({property.reviews} reviews)</span>
                            </div>
                        </div>
                        <Link href={`/property/${property.id}`}>
                            <h3 className="font-bold text-lg leading-tight mt-1 group-hover:underline">
                                {property.name}
                            </h3>
                        </Link>
                        <p className="text-sm text-muted-foreground flex items-center gap-1 mt-1">
                            <MapPin className="h-4 w-4 shrink-0" />
                            {property.location}
                        </p>
                        
                        <p className="text-sm text-muted-foreground mt-2 line-clamp-2">
                            {property.about}
                        </p>
                    </div>

                    <div className="mt-4 pt-4 border-t flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
                        <div>
                            <p className="font-bold text-lg text-primary">
                                {property.price || `₹${property.pricePerSqFt}/sqft`}
                            </p>
                            {/* @ts-ignore */}
                            {property.size && (
                                 /* @ts-ignore */
                                <p className="text-sm text-muted-foreground">{property.size} sq.ft. | {property.status}</p>
                            )}
                        </div>
                        <Button asChild className="w-full sm:w-auto">
                           <Link href={`/property/${property.id}`}>View Details</Link>
                        </Button>
                    </div>
                </div>
            </div>
        </Card>
    );
}
