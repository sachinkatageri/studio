
"use client";

import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Calendar } from "@/components/ui/calendar";
import { useState } from "react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Phone, CheckCircle, Mail, MessageSquare, Star, Wrench, UserCheck, Download } from "lucide-react";
import Image from "next/image";
import { properties } from "@/lib/properties";
import { Separator } from "@/components/ui/separator";
import { RatingDialog } from "@/components/layout/rating-dialog";
import Link from "next/link";
import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from "@/components/ui/carousel";
import { Badge } from "@/components/ui/badge";

const ContactAgentCard = () => (
    <Card>
        <CardContent className="p-4">
            <div className="flex items-center gap-4">
                <Avatar className="h-12 w-12">
                    <AvatarImage src="https://picsum.photos/seed/agent/100" />
                    <AvatarFallback>IA</AvatarFallback>
                </Avatar>
                <div>
                    <p className="font-bold">Isha Ambani</p>
                    <p className="text-xs text-muted-foreground">Sr. Vice President</p>
                    <div className="flex items-center gap-2 mt-1">
                        <Image src="https://www.buildersinfo.in/property-details/whatsapp.png" alt="WhatsApp" width={16} height={16} />
                        <Mail className="h-4 w-4 text-muted-foreground" />
                        <Phone className="h-4 w-4 text-muted-foreground" />
                    </div>
                </div>
                <Button className="ml-auto bg-green-500 hover:bg-green-600">Contact Bank</Button>
            </div>
        </CardContent>
    </Card>
);

const ScheduleTourForm = () => {
    const [date, setDate] = useState<Date | undefined>(new Date());

    return (
        <Card>
            <CardHeader>
                <CardTitle>Schedule a Tour</CardTitle>
            </CardHeader>
            <CardContent>
                <Calendar
                    mode="single"
                    selected={date}
                    onSelect={setDate}
                    className="p-0"
                />
                <div className="space-y-3 mt-4">
                    <Tabs defaultValue="in-person" className="w-full">
                        <TabsList className="grid w-full grid-cols-2">
                            <TabsTrigger value="in-person">In-Person</TabsTrigger>
                            <TabsTrigger value="video-chat">Video Chat</TabsTrigger>
                        </TabsList>
                    </Tabs>
                    <Input placeholder="Time" />
                    <Input placeholder="Name" />
                    <Input placeholder="Phone" />
                    <Input type="email" placeholder="Email" />
                    <Textarea placeholder="Enter your message" />
                    <Button className="w-full">Submit Tour Request</Button>
                    <Button variant="outline" className="w-full">BOOK YOUR WE-WORK TOUR NOW</Button>
                </div>
            </CardContent>
        </Card>
    );
};

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
        <Card id="ratings-reviews">
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
                                <div className="h-full bg-yellow-400" style={{ width: `${'${r.percentage}'}%`}}></div>
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
            <ContactAgentCard />
            <ScheduleTourForm />
            <FloorPlanCard />
            <OpeningHoursCard />
            <RatingSummaryCard property={property} />
        </div>
    );
}
