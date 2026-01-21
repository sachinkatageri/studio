"use client";

import { Button } from "@/components/ui/button";
import { properties } from "@/lib/properties";
import Image from "next/image";
import { Badge } from "@/components/ui/badge";
import { Star } from "lucide-react";

type Property = typeof properties[0];

export default function PropertyStickyHeader({ property }: { property: Property }) {
    const offerPriceString = property.price ? String(property.price).replace(/[^0-9.]/g, '') : '0';
    const offerPrice = parseInt(offerPriceString, 10);
    const beforePrice = Math.round(offerPrice * 1.15);

    return (
        <div className="hidden md:block fixed top-14 left-0 right-0 z-30 bg-background/95 backdrop-blur-sm border-b shadow-sm">
            <div className="container mx-auto px-4 sm:px-6 lg:px-8 h-16 flex justify-between items-center">
                <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2">
                        <h1 className="text-lg font-bold truncate">{property.name}</h1>
                        <Badge variant="secondary" className="bg-amber-100 text-amber-700 border-amber-200">
                            {property.rating} <Star className="h-3 w-3 ml-1 fill-current" />
                        </Badge>
                        <Image src="https://cdn-icons-png.flaticon.com/512/5253/5253968.png" alt="Verified" width={20} height={20} />
                    </div>
                </div>
                <div className="flex items-center gap-4 pl-8">
                     <div className="flex items-end gap-2">
                        <p className="text-lg font-bold text-primary">
                            {property.price && !property.price.startsWith('Starting') ? `₹${property.price}` : property.price}
                        </p>
                        {property.price && !property.price.startsWith('Starting') && offerPrice > 0 && (
                            <p className="text-sm text-muted-foreground line-through">
                                ₹{beforePrice.toLocaleString('en-IN')}
                            </p>
                        )}
                    </div>
                    <div className="flex items-center gap-2">
                        <Button variant="outline" className="h-11 rounded-lg">Contact</Button>
                        <Button className="h-11 rounded-lg">
                            <Image src="https://www.buildersinfo.in/property-details/whatsapp.png" alt="WhatsApp" width={20} height={20} />
                            <span className="ml-2">WhatsApp</span>
                        </Button>
                    </div>
                </div>
            </div>
        </div>
    );
}
