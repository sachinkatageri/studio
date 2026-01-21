
"use client";

import { useState } from 'react';
import Image from 'next/image';
import { properties } from '@/lib/properties';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Heart, Share2, MapPin, Star } from 'lucide-react';
import { VerificationProcessDialog } from '@/components/layout/verification-process-dialog';
import { ShareOptions } from '@/components/layout/share-options';
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '@/components/ui/tooltip';

type Property = typeof properties[0];

export function PropertyInfoSection({ property }: { property: Property }) {
    const [isVerificationDialogOpen, setIsVerificationDialogOpen] = useState(false);
    
    return (
        <>
            <div id="info" className="md:pt-0">
                <div className="flex justify-between items-start">
                    <div className="flex-1">
                        <div className="flex items-center gap-2">
                           <h1 className="text-xl md:text-3xl font-bold">{property.name}</h1>
                            <Badge variant="secondary" className="bg-amber-100 text-amber-700 border-amber-200">
                                {property.rating} <Star className="h-3 w-3 ml-1 fill-current" />
                            </Badge>
                           <Image src="https://cdn-icons-png.flaticon.com/512/5253/5253968.png" alt="Verified" width={24} height={24} className="md:w-7 md:h-7" />
                        </div>
                        <div className="flex items-center gap-2 text-muted-foreground mt-2 text-sm md:text-base">
                            <MapPin className="h-4 w-4 text-muted-foreground" />
                            <p className="text-sm">{property.location}</p>
                            <Button variant="link" className="p-0 h-auto text-primary text-sm">(View on Map)</Button>
                        </div>
                    </div>
                    <div className="hidden md:flex items-center gap-2">
                         <TooltipProvider>
                            <Tooltip>
                                <TooltipTrigger asChild>
                                    <Button variant="outline" size="icon">
                                        <Heart className="h-5 w-5" />
                                    </Button>
                                </TooltipTrigger>
                                <TooltipContent>
                                    <p>Save to wishlist</p>
                                </TooltipContent>
                            </Tooltip>
                            <ShareOptions>
                                <Tooltip>
                                    <TooltipTrigger asChild>
                                        <Button variant="outline" size="icon">
                                            <Share2 className="h-5 w-5" />
                                        </Button>
                                    </TooltipTrigger>
                                    <TooltipContent>
                                        <p>Share</p>
                                    </TooltipContent>
                                </Tooltip>
                            </ShareOptions>
                         </TooltipProvider>
                    </div>
                </div>
            </div>
            <VerificationProcessDialog open={isVerificationDialogOpen} onOpenChange={setIsVerificationDialogOpen} />
        </>
    );
}
