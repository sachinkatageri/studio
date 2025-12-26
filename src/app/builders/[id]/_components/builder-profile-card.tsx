
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Builder } from "@/lib/builders";
import Image from "next/image";
import { ArrowUpRight } from "lucide-react";

export default function BuilderProfileCard({ builder }: { builder: Builder }) {
    return (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-6">
            {/* Left Side */}
            <div className="space-y-4 md:space-y-6">
                <Card className="p-4 md:p-6 hidden md:flex flex-col items-center justify-center text-center aspect-square">
                    <div className="w-24 h-24 md:w-40 md:h-40 relative mb-4">
                        <Image src={builder.logoUrl} alt={`${builder.name} logo`} fill className="object-contain" />
                    </div>
                </Card>
                <div className="grid grid-cols-2 gap-4 md:gap-6">
                    <Card className="p-4 md:p-6 text-center">
                        <p className="text-2xl md:text-4xl font-bold">{builder.experience}+</p>
                        <p className="text-xs md:text-sm text-muted-foreground mt-1">Years of Exp.</p>
                    </Card>
                    <Card className="p-4 md:p-6 text-center">
                        <p className="text-2xl md:text-4xl font-bold">12</p>
                        <p className="text-xs md:text-sm text-muted-foreground mt-1">Cities Presence</p>
                    </Card>
                </div>
            </div>

            {/* Right Side */}
            <div className="space-y-4 md:space-y-6">
                <div className="grid grid-cols-2 gap-4 md:gap-6">
                    <Card className="bg-primary text-primary-foreground p-4 md:p-6 rounded-2xl relative aspect-square flex flex-col justify-center text-center">
                        <Button variant="ghost" size="icon" className="absolute top-2 right-2 h-8 w-8 bg-white/20 hover:bg-white/30 text-white rounded-full">
                            <ArrowUpRight className="h-4 w-4" />
                        </Button>
                        <p className="text-2xl md:text-4xl font-bold">{builder.totalProjects}+</p>
                        <p className="text-xs md:text-sm">Projects</p>
                    </Card>
                    <Card className="bg-accent text-accent-foreground p-4 md:p-6 rounded-2xl relative aspect-square flex flex-col justify-center text-center">
                         <Button variant="ghost" size="icon" className="absolute top-2 right-2 h-8 w-8 bg-black/10 hover:bg-black/20 text-accent-foreground rounded-full">
                            <ArrowUpRight className="h-4 w-4" />
                        </Button>
                        <p className="text-2xl md:text-4xl font-bold">{builder.ongoingProjects.length}</p>
                        <p className="text-xs md:text-sm">Ongoing</p>
                    </Card>
                </div>
                <Card className="col-span-2 bg-green-600 text-white p-4 md:p-6 rounded-2xl relative flex items-center justify-between">
                     <Button variant="ghost" size="icon" className="absolute top-2 right-2 h-8 w-8 bg-white/20 hover:bg-white/30 text-white rounded-full">
                        <ArrowUpRight className="h-4 w-4" />
                    </Button>
                    <div>
                        <p className="text-2xl md:text-4xl font-bold">{builder.upcomingProjects.length}</p>
                        <p className="text-xs md:text-sm">Upcoming</p>
                    </div>
                </Card>
                <div className="grid grid-cols-2 gap-4 md:gap-6">
                    <Card>
                        <CardContent className="p-4 md:p-6">
                            <h3 className="font-semibold mb-2 text-sm md:text-lg">Our Mission</h3>
                            <p className="text-xs md:text-sm text-muted-foreground">To create exceptional spaces that enhance Peoples' lives.</p>
                        </CardContent>
                    </Card>
                    <Card>
                        <CardContent className="p-4 md:p-6">
                            <h3 className="font-semibold mb-2 text-sm md:text-lg">Our Vision</h3>
                            <p className="text-xs md:text-sm text-muted-foreground">To be the most trusted and preferred real estate brand.</p>
                        </CardContent>
                    </Card>
                </div>
            </div>
        </div>
    );
}
