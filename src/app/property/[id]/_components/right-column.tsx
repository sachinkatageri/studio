
"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { useState } from "react";
import { Star } from "lucide-react";
import Image from "next/image";
import { Separator } from "@/components/ui/separator";
import { RatingDialog } from "@/components/layout/rating-dialog";
import PropertyContactForm from "./property-contact-form";
import { Badge } from "@/components/ui/badge";

const FloorPlanCard = () => (
    <Card id="plan">
        <CardHeader>
            <CardTitle>Floor Plan</CardTitle>
        </CardHeader>
        <CardContent>
            <div className="relative aspect-video w-full rounded-lg overflow-hidden border">
                <Image src="https://picsum.photos/seed/floor-plan/1000/600" alt="Property floor plan" fill className="object-contain p-4" data-ai-hint="floor plan" />
            </div>
        </CardContent>
    </Card>
);

const OpeningHoursCard = () => (
    <Card>
        <CardHeader>
            <CardTitle>Opening Hours</CardTitle>
        </CardHeader>
        <CardContent>
             <ul className="space-y-3 text-sm">
                <li className="flex justify-between items-center">
                    <span className="font-semibold">Monday - Friday</span>
                    <Badge variant="outline">9:00 AM - 6:00 PM</Badge>
                </li>
                <li className="flex justify-between items-center">
                    <span className="font-semibold">Saturday</span>
                    <Badge variant="destructive">Closed</Badge>
                </li>
                <li className="flex justify-between items-center">
                    <span className="font-semibold">Sunday</span>
                    <Badge variant="destructive">Closed</Badge>
                </li>
            </ul>
        </CardContent>
    </Card>
);

const RatingSummaryCard = ({ property }: { property: any }) => {
    const [isRatingDialogOpen, setIsRatingDialogOpen] = useState(false);
    const totalReviews = 50;
    const ratings = [
        { star: 5, percentage: 80 },
        { star: 4, percentage: 12 },
        { star: 3, percentage: 5 },
        { star: 2, percentage: 2 },
        { star: 1, percentage: 1 },
    ];
    return (
        <Card>
            <CardHeader>
                <div className="flex justify-between items-center">
                    <CardTitle>Rating &amp; Reviews</CardTitle>
                    <Button variant="outline" size="sm" onClick={() => setIsRatingDialogOpen(true)}>Rate property</Button>
                </div>
            </CardHeader>
            <Separator/>
            <CardContent className="p-6 space-y-4">
                <div className="flex flex-col items-center justify-center">
                    <p className="text-4xl font-bold">{property.rating}</p>
                    <div className="flex items-center">
                        {[...Array(Math.floor(property.rating))].map((_, i) => <Star key={i} className="h-5 w-5 text-yellow-400 fill-yellow-400" />)}
                        {[...Array(5 - Math.floor(property.rating))].map((_, i) => <Star key={i} className="h-5 w-5 text-muted-foreground" />)}
                    </div>
                    <p className="text-sm text-muted-foreground mt-1">{totalReviews} ratings</p>
                </div>
                <div className="space-y-1">
                    {ratings.map(r => (
                        <div key={r.star} className="flex items-center gap-2">
                            <span className="text-xs w-12">{r.star} star</span>
                            <div className="w-full h-2 bg-muted rounded-full overflow-hidden">
                                <div className="h-full bg-yellow-400" style={{ width: `${r.percentage}%`}}></div>
                            </div>
                            <span className="text-xs w-8 text-right">{r.percentage}%</span>
                        </div>
                    ))}
                </div>
            </CardContent>
            <RatingDialog open={isRatingDialogOpen} onOpenChange={setIsRatingDialogOpen} />
        </Card>
    );
};

export default function RightColumn({ property }: { property: any }) {
    return (
        <div className="sticky top-24 space-y-6">
            <PropertyContactForm />
            <RatingSummaryCard property={property} />
            <FloorPlanCard />
            <OpeningHoursCard />
        </div>
    );
}
