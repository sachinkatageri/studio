import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Builder } from "@/lib/builders";
import Image from "next/image";
import { ArrowRight } from "lucide-react";

export default function BuilderProfileCard({ builder }: { builder: Builder }) {
    return (
        <Card className="p-6">
            <div className="flex flex-col items-center">
                <div className="w-32 h-32 relative mb-4">
                    <Image src={builder.logoUrl} alt={`${builder.name} logo`} fill className="object-contain" />
                </div>
                <h1 className="text-2xl font-bold">{builder.name}</h1>
                <p className="text-sm text-muted-foreground">"Add Prestige to your life"</p>
            </div>

            <div className="grid grid-cols-2 gap-4 mt-6">
                <div className="bg-primary text-primary-foreground p-4 rounded-lg text-center">
                    <p className="text-3xl font-bold">{builder.totalProjects}+</p>
                    <p className="text-sm">Projects</p>
                </div>
                <div className="bg-orange-500 text-white p-4 rounded-lg text-center">
                    <p className="text-3xl font-bold">{builder.ongoingProjects.length}</p>
                    <p className="text-sm">Ongoing</p>
                </div>
                <div className="col-span-2 bg-green-500 text-white p-4 rounded-lg text-center flex items-center justify-between">
                    <div>
                        <p className="text-3xl font-bold">{builder.upcomingProjects.length}</p>
                        <p className="text-sm">Upcoming</p>
                    </div>
                    <ArrowRight className="h-6 w-6" />
                </div>
            </div>

            <div className="grid grid-cols-2 gap-4 mt-6 text-center">
                <div>
                    <p className="text-3xl font-bold">{builder.experience}+</p>
                    <p className="text-sm text-muted-foreground">Years of Experience</p>
                </div>
                <div>
                    <p className="text-3xl font-bold">12</p>
                    <p className="text-sm text-muted-foreground">Cities Presence</p>
                </div>
            </div>

            <div className="space-y-4 mt-6">
                <Card>
                    <CardContent className="p-4">
                        <h3 className="font-semibold mb-2">Our Mission</h3>
                        <p className="text-sm text-muted-foreground">To create exceptional spaces that enhance Peoples' lives and contribute to sustainable urban development through innovation and excellence.</p>
                    </CardContent>
                </Card>
                <Card>
                    <CardContent className="p-4">
                        <h3 className="font-semibold mb-2">Our Vision</h3>
                        <p className="text-sm text-muted-foreground">To be the most trusted and preferred real estate brand, setting benchmarks in quality and customer satisfaction across India.</p>
                    </CardContent>
                </Card>
            </div>
        </Card>
    );
}
