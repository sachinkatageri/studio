
"use client";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Star, UserCheck, CheckCircle, Wrench } from "lucide-react";
import Link from "next/link";
import { Carousel, CarouselContent, CarouselItem, CarouselPrevious, CarouselNext } from "@/components/ui/carousel";
import { useState } from "react";
import { RatingDialog } from "@/components/layout/rating-dialog";
import { properties } from "@/lib/properties";

export default function RatingsReviewsCard() {
    const property = properties[0]; // dummy data
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
    ];

    return (
        <Card id="ratings-reviews">
            <CardHeader>
                <CardTitle>Rating &amp; Reviews</CardTitle>
            </CardHeader>
            <CardContent className="space-y-8">
                 <div>
                    <div className="flex justify-between items-center mb-4">
                        <p className="text-sm">Overall rating based on {totalReviews} reviews.</p>
                        <Button variant="outline" size="sm" onClick={() => setIsRatingDialogOpen(true)}>Rate property</Button>
                    </div>
                    <div className="grid grid-cols-1 gap-6">
                        <div className="flex flex-col items-center justify-center">
                            <p className="text-4xl font-bold">{property.rating}</p>
                            <div className="flex items-center">
                                {[...Array(Math.floor(property.rating))].map((_, i) => <Star key={i} className="h-5 w-5 text-yellow-400 fill-yellow-400" />)}
                                {[...Array(5 - Math.floor(property.rating))].map((_, i) => <Star key={i} className="h-5 w-5 text-muted-foreground" />)}
                            </div>
                            <p className="text-sm text-muted-foreground mt-1">{totalReviews} ratings</p>
                        </div>
                        <div>
                        {ratings.map(r => (
                                <div key={r.star} className="flex items-center gap-2">
                                    <span className="text-sm w-12">{r.star} star</span>
                                    <div className="w-full h-2 bg-muted rounded-full overflow-hidden">
                                        <div className="h-full bg-yellow-400" style={{ width: `${'r.percentage'}%`}}></div>
                                    </div>
                                    <span className="text-sm w-8 text-right">{r.percentage}%</span>
                                </div>
                        ))}
                        </div>
                    </div>
                </div>
                
                <div>
                    <div className="flex justify-between items-center mb-4">
                        <h3 className="text-lg font-semibold">All resident reviews ({reviews.length} reviews)</h3>
                        <Button variant="link" className="text-primary p-0 h-auto">View All</Button>
                    </div>
                    <Carousel className="w-full" opts={{ align: "start", loop: true }}>
                        <CarouselContent className="-ml-4">
                            {reviews.map((review, index) => (
                                <CarouselItem key={index} className="pl-4">
                                    <div className="p-1">
                                        <Card className="border-none shadow-none">
                                            <CardContent className="p-0 space-y-3">
                                                <div className="flex justify-between items-start">
                                                    <div className="flex items-center gap-3">
                                                        <div className="w-10 h-10 rounded-full bg-primary/20 flex items-center justify-center">
                                                            <UserCheck className="w-6 h-6 text-primary" />
                                                        </div>
                                                        <div>
                                                            <p className="font-semibold">{review.name}</p>
                                                            <p className="text-xs text-muted-foreground">{review.role} | {review.time}</p>
                                                        </div>
                                                    </div>
                                                    <Badge className="bg-green-100 text-green-800 border-green-200">
                                                        {review.rating} <Star className="h-3 w-3 ml-1 fill-current" />
                                                    </Badge>
                                                </div>
                                                <div className="space-y-3">
                                                    <div>
                                                        <h4 className="font-semibold text-sm flex items-center gap-2"><CheckCircle className="h-4 w-4 text-green-500" /> Good things here</h4>
                                                        <p className="text-sm text-muted-foreground mt-1">{review.good} <Link href="#" className="text-primary font-medium">read more</Link></p>
                                                    </div>
                                                    <div>
                                                        <h4 className="font-semibold text-sm flex items-center gap-2"><Wrench className="h-4 w-4 text-orange-500" /> Things need to improve</h4>
                                                        <p className="text-sm text-muted-foreground mt-1">{review.bad} <Link href="#" className="text-primary font-medium">read more</Link></p>
                                                    </div>
                                                </div>
                                            </CardContent>
                                        </Card>
                                    </div>
                                </CarouselItem>
                            ))}
                        </CarouselContent>
                        <CarouselPrevious className="absolute -left-4 top-1/2 -translate-y-1/2 z-10" />
                        <CarouselNext className="absolute -right-4 top-1/2 -translate-y-1/2 z-10" />
                    </Carousel>
                </div>
            </CardContent>
             <RatingDialog open={isRatingDialogOpen} onOpenChange={setIsRatingDialogOpen} />
        </Card>
    );
}
