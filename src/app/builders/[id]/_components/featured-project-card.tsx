
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from "@/components/ui/carousel";
import Image from "next/image";
import { Project } from "@/lib/builders";
import { AreaChart, Building, CalendarDays, Star } from "lucide-react";
import Link from "next/link";
import { Progress } from "@/components/ui/progress";

export default function FeaturedProjectCard({ project }: { project: Project }) {
    const images = [
        { id: 1, src: "https://picsum.photos/seed/featured-1/800/600", alt: "Modern building exterior", hint: "modern building" },
        { id: 2, src: "https://picsum.photos/seed/featured-2/800/600", alt: "Living room interior", hint: "living room" },
        { id: 3, src: "https://picsum.photos/seed/featured-3/800/600", alt: "Lobby area", hint: "lobby interior" },
        { id: 4, src: "https://picsum.photos/seed/featured-4/800/600", alt: "Swimming pool", hint: "swimming pool" },
    ];

    return (
        <Card>
            <CardContent className="p-6">
                <div className="relative">
                    <Carousel>
                        <CarouselContent>
                            {images.map(image => (
                                <CarouselItem key={image.id}>
                                    <div className="aspect-[16/9] relative rounded-lg overflow-hidden">
                                        <Image src={image.src} alt={image.alt} fill className="object-cover" data-ai-hint={image.hint} />
                                    </div>
                                </CarouselItem>
                            ))}
                        </CarouselContent>
                        <CarouselPrevious className="absolute left-2 top-1/2 -translate-y-1/2 z-10" />
                        <CarouselNext className="absolute right-2 top-1/2 -translate-y-1/2 z-10" />
                    </Carousel>
                     <div className="absolute top-2 right-2 flex items-center gap-2">
                        <div className="bg-background/80 p-2 rounded-lg text-sm font-semibold">4.8 ★</div>
                    </div>
                </div>

                <div className="mt-4">
                    <h2 className="text-xl font-bold">The Prestige City Hyderabad</h2>
                    <p className="text-sm text-muted-foreground">Budvel, Hyderabad</p>
                </div>

                <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-4 text-sm">
                    <div className="flex items-center gap-2">
                        <Building className="h-5 w-5 text-primary" />
                        <div>
                            <p className="text-muted-foreground">Project Units</p>
                            <p className="font-semibold">405</p>
                        </div>
                    </div>
                    <div className="flex items-center gap-2">
                        <AreaChart className="h-5 w-5 text-primary" />
                        <div>
                            <p className="text-muted-foreground">Project Size</p>
                            <p className="font-semibold">4 Acre</p>
                        </div>
                    </div>
                    <div className="flex items-center gap-2">
                         <CalendarDays className="h-5 w-5 text-primary" />
                        <div>
                            <p className="text-muted-foreground">Launch Date</p>
                            <p className="font-semibold">Aug 2024</p>
                        </div>
                    </div>
                </div>

                <div className="mt-4 flex items-center gap-2">
                    <Badge variant="outline">2BHK</Badge>
                    <Badge variant="outline">3BHK</Badge>
                    <Badge variant="outline">4BHK</Badge>
                </div>

                <Card className="mt-4 bg-yellow-50 dark:bg-yellow-900/30 border-yellow-200 dark:border-yellow-800/50">
                    <CardContent className="p-3">
                        <div className="flex justify-between items-center text-sm mb-2">
                            <p className="font-semibold text-yellow-800 dark:text-yellow-200">Deal Bar</p>
                            <Link href="#" className="text-primary font-semibold">›</Link>
                        </div>
                        <div className="flex items-center gap-4">
                            <p className="text-xs text-muted-foreground whitespace-nowrap">42 Closes Deals</p>
                            <Progress value={75} className="h-2" />
                            <p className="text-xs text-muted-foreground whitespace-nowrap">132 In Progress</p>
                        </div>
                    </CardContent>
                </Card>

                <div className="grid grid-cols-3 gap-4 mt-4 text-sm text-center">
                    <div>
                        <p className="text-muted-foreground">Possession</p>
                        <p className="font-semibold">Sep 2028</p>
                    </div>
                     <div>
                        <p className="text-muted-foreground">Plot</p>
                        <p className="font-semibold">1,200 - 3,000 sqft</p>
                    </div>
                    <div>
                        <p className="text-muted-foreground">Propscore</p>
                        <div className="flex items-center justify-center gap-0.5">
                            {[...Array(4)].map((_, i) => <Star key={i} className="h-4 w-4 text-yellow-400 fill-yellow-400" />)}
                            <Star className="h-4 w-4 text-muted-foreground" />
                        </div>
                    </div>
                </div>

                <div className="mt-6 flex flex-col sm:flex-row justify-between items-center gap-4">
                    <div>
                        <p className="text-muted-foreground">Total Range</p>
                        <p className="text-2xl font-bold text-primary">₹1.16 Cr - ₹2.91 Cr</p>
                    </div>
                    <Button size="lg" className="w-full sm:w-auto">Contact Builder</Button>
                </div>

            </CardContent>
        </Card>
    );
}
