"use client"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from "@/components/ui/carousel";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useState, useEffect } from "react";
import { format, addDays, eachDayOfInterval } from "date-fns";
import { Separator } from "@/components/ui/separator";

export default function ScheduleTourCard() {
    const [dates, setDates] = useState<{ day: string, date: string, month: string }[]>([]);
    const [selectedDate, setSelectedDate] = useState(0);

    useEffect(() => {
        const today = new Date();
        const interval = eachDayOfInterval({ start: today, end: addDays(today, 13) });
        const formattedDates = interval.map(date => ({
            day: format(date, 'E'),
            date: format(date, 'd'),
            month: format(date, 'MMM')
        }));
        setDates(formattedDates);
    }, []);

    return (
        <Card>
            <CardHeader className="text-center p-0">
                <CardTitle className="text-sm font-semibold uppercase tracking-wider bg-primary/10 text-primary py-3">Schedule a Tour</CardTitle>
            </CardHeader>
            <Separator />
            <CardContent className="p-4 space-y-4">
                <div className="relative">
                    <Carousel opts={{ align: "start" }}>
                        <CarouselContent className="-ml-2">
                            {dates.map((d, index) => (
                                <CarouselItem key={index} className="basis-1/4 pl-2">
                                    <div
                                        onClick={() => setSelectedDate(index)}
                                        className={`p-2 border rounded-lg text-center cursor-pointer ${selectedDate === index ? 'bg-primary text-primary-foreground' : 'bg-background'}`}
                                    >
                                        <p className="text-xs">{d.day}</p>
                                        <p className="font-bold text-lg">{d.date}</p>
                                        <p className="text-xs">{d.month}</p>
                                    </div>
                                </CarouselItem>
                            ))}
                        </CarouselContent>
                        <CarouselPrevious className="absolute left-2 top-1/2 -translate-y-1/2" />
                        <CarouselNext className="absolute right-2 top-1/2 -translate-y-1/2" />
                    </Carousel>
                </div>
                <div>
                    <p className="font-semibold mb-2 text-sm">Tour Type</p>
                    <Tabs defaultValue="in-person" className="w-full">
                        <TabsList variant="pill" className="grid w-full grid-cols-2">
                            <TabsTrigger value="in-person" variant="pill">In Person</TabsTrigger>
                            <TabsTrigger value="video-chat" variant="pill">Video Chat</TabsTrigger>
                        </TabsList>
                    </Tabs>
                </div>
                <div>
                     <Select>
                        <SelectTrigger>
                            <SelectValue placeholder="Time" />
                        </SelectTrigger>
                        <SelectContent>
                            <SelectItem value="10:00">10:00 AM</SelectItem>
                            <SelectItem value="11:00">11:00 AM</SelectItem>
                            <SelectItem value="14:00">02:00 PM</SelectItem>
                            <SelectItem value="15:00">03:00 PM</SelectItem>
                        </SelectContent>
                    </Select>
                </div>
                 <form className="space-y-3">
                    <Input placeholder="Name" />
                    <Input placeholder="Phone" />
                    <Input type="email" placeholder="Email" />
                    <Textarea placeholder="Enter your Message" />
                    <Button type="submit" className="w-full">Submit a Tour Request</Button>
                    <Button variant="outline" className="w-full">BOOK YOUR VIDEO TOUR NOW</Button>
                </form>
            </CardContent>
        </Card>
    );
}
