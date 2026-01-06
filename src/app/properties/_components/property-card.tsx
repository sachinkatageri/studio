
"use client";

import Image from 'next/image';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Heart, MapPin, Building, Home as HomeIcon } from 'lucide-react';
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

    const isList = view === 'list';

    return (
        <Card className={cn("overflow-hidden transition-shadow duration-300 group", !isList && "h-full")}>
            <div className={cn("flex w-full", isList ? "flex-col md:flex-row" : "flex-col h-full")}>
                <div className={cn("relative shrink-0", isList ? "w-full h-48 md:w-48 md:h-full" : "w-full aspect-video")}>
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

                <div className="flex-1 flex flex-col p-4">
                    <div className="flex justify-between items-start">
                        <Badge variant={property.type === 'Commercial' ? 'secondary' : 'default'} className="capitalize mb-2">
                            {property.type === 'Commercial' ? <Building className="h-3 w-3 mr-1" /> : <HomeIcon className="h-3 w-3 mr-1" />}
                            {property.type}
                        </Badge>
                        <Button variant="ghost" size="icon" className="h-8 w-8 -mt-1 -mr-1">
                            <Heart className="h-4 w-4" />
                        </Button>
                    </div>

                    <h3 className="font-bold text-base md:text-lg leading-tight truncate group-hover:underline">
                        {property.name}
                    </h3>
                    <p className="text-sm text-muted-foreground flex items-center gap-1 mt-1 truncate">
                        <MapPin className="h-4 w-4 shrink-0" />
                        {property.location}
                    </p>
                    
                    <div className="flex-grow"></div>

                    <div className="flex items-center justify-between mt-3">
                        <p className="font-bold text-base md:text-lg text-primary">
                            {property.price || `₹${property.pricePerSqFt}/sqft`}
                        </p>
                        <Badge variant="outline">{property.status}</Badge>
                    </div>

                    <Button asChild className="w-full mt-4">
                        <Link href={`/property/${property.id}`}>View Details</Link>
                    </Button>
                </div>
            </div>
        </Card>
    );
}
