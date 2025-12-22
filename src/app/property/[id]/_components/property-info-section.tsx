
"use client";

import { useState } from 'react';
import Image from 'next/image';
import { properties } from '@/lib/properties';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Heart, Share2, AlertTriangle, CheckCircle } from 'lucide-react';
import { VerificationProcessDialog } from '@/components/layout/verification-process-dialog';

type Property = typeof properties[0];

export function PropertyInfoSection({ property }: { property: Property }) {
    const [isVerificationDialogOpen, setIsVerificationDialogOpen] = useState(false);
    
    const offerPriceString = property.price ? String(property.price).replace(/[^0-9.]/g, '') : '0';
    const offerPrice = parseInt(offerPriceString, 10);
    const beforePrice = Math.round(offerPrice * 1.15);

    return (
        <>
            <div id="info" className="md:pt-0 pt-4">
                <div className="flex justify-between items-start">
                    <div className="flex-1">
                        <div className="flex items-center gap-2">
                           <h1 className="text-lg md:text-3xl font-bold">{property.name}</h1>
                           <Image src="https://cdn-icons-png.flaticon.com/512/5253/5253968.png" alt="Verified" width={24} height={24} className="md:w-7 md:h-7" />
                        </div>
                        <p className="text-muted-foreground mt-1 text-xs md:text-base">{property.location}</p>
                    </div>
                    <div className="hidden md:flex items-center gap-2">
                        <Button variant="outline" size="icon">
                            <Heart className="h-5 w-5" />
                        </Button>
                        <Button variant="outline" size="icon">
                            <Share2 className="h-5 w-5" />
                        </Button>
                    </div>
                </div>
            
            
                <div className="mt-4 flex flex-wrap gap-2 md:gap-4 items-center">
                    <div className="flex items-end gap-2">
                        <p className="text-lg md:text-2xl font-bold text-primary">
                            {property.price && !property.price.startsWith('Starting') ? `₹${property.price}` : property.price}
                        </p>
                        {property.price && !property.price.startsWith('Starting') && offerPrice > 0 && (
                            <p className="text-xs md:text-base text-muted-foreground line-through">
                                ₹{beforePrice.toLocaleString('en-IN')}
                            </p>
                        )}
                    </div>
                    <Badge variant="secondary" className="text-xs">{property.status}</Badge>
                    {property.type === 'Commercial' && <Badge className="text-xs">Zero Brokerage</Badge>}
                </div>

                <div className="mt-6 grid grid-cols-3 gap-4 text-sm md:text-base">
                    <div className="flex flex-col">
                        <span className="text-xs md:text-sm text-muted-foreground">Area</span>
                        {/* @ts-ignore */}
                        <span className="font-semibold text-sm">{property.size} sq.ft</span>
                    </div>
                    <div className="flex flex-col">
                        <span className="text-xs md:text-sm text-muted-foreground">Developer</span>
                        <span className="font-semibold text-sm">Vaishnavi</span>
                    </div>
                    <div className="flex flex-col">
                        <span className="text-xs md:text-sm text-muted-foreground">Furnishing</span>
                        <span className="font-semibold text-sm">Furnished</span>
                    </div>
                </div>

                 <div className="mt-6 text-sm text-muted-foreground space-y-2 p-3 md:p-4 border rounded-lg">
                    <div className="flex items-start gap-2">
                        <CheckCircle className="h-5 w-5 text-blue-500 mt-0.5 shrink-0" />
                        <div>
                        <p className="text-foreground font-semibold text-sm">Preliminary verification done.</p>
                        <Button variant="link" className="text-xs p-0 h-auto" onClick={() => setIsVerificationDialogOpen(true)}>
                            Know the Process
                        </Button>
                        </div>
                    </div>
                    <div className="text-center border-t pt-3 mt-3">
                        <p className="text-xs text-red-600 mb-2">The land location with survey number could not be verified due to unavailability of cadastral maps.</p>
                        <Button variant="link" className="text-xs p-0 h-auto text-foreground font-normal underline">
                            <AlertTriangle className="h-4 w-4 mr-1" />
                            Report this listing
                        </Button>
                    </div>
                </div>
            </div>
            <VerificationProcessDialog open={isVerificationDialogOpen} onOpenChange={setIsVerificationDialogOpen} />
        </>
    );
}
