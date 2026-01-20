"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import Image from "next/image";
import { MapPin, School, Hospital, Hotel, Briefcase, Building, Train, Utensils, Banknote, Building2 } from "lucide-react";
import { ScrollArea, ScrollBar } from "@/components/ui/scroll-area";
import { useState } from "react";

const nearbyData = {
    schools: [
        { name: 'Global International School', distance: '1.2 km' },
        { name: 'Oakridge International School', distance: '2.5 km' },
        { name: 'Delhi Public School', distance: '3.0 km' },
    ],
    hospitals: [
        { name: 'Apollo Hospital', distance: '0.8 km' },
        { name: 'Care Hospital', distance: '1.5 km' },
        { name: 'MaxCure Hospital', distance: '2.1 km' },
    ],
    banks: [
        { name: 'Kotak Mahindra Bank', distance: '1.22 KM' },
        { name: 'Icici Bank Ltd', distance: '1.37 KM' },
        { name: 'Andhra Bank', distance: '1.43 KM' },
    ],
    "bus stops": [],
    temples: [],
    atms: [],
    malls: [],
};

type NearbyCategory = keyof typeof nearbyData;

export default function NearbyLandmarksCard({ propertyName }: { propertyName: string }) {
    const [activeCategory, setActiveCategory] = useState<NearbyCategory>('banks');

    const categories: { id: NearbyCategory, label: string, icon: React.ReactNode }[] = [
        { id: 'schools', label: 'Schools', icon: <School className="h-5 w-5" /> },
        { id: 'bus stops', label: 'Bus Stops', icon: <Building className="h-5 w-5" /> },
        { id: 'hospitals', label: 'Hospitals', icon: <Hospital className="h-5 w-5" /> },
        { id: 'banks', label: 'Banks', icon: <Banknote className="h-5 w-5" /> },
        { id: 'temples', label: 'Temples', icon: <Building2 className="h-5 w-5" /> },
        { id: 'atms', label: 'ATMs', icon: <Briefcase className="h-5 w-5" /> },
        { id: 'malls', label: 'Malls', icon: <Hotel className="h-5 w-5" /> },
    ];
    
    return (
        <Card>
            <CardHeader>
                <CardTitle>Nearby Landmarks - {propertyName}</CardTitle>
            </CardHeader>
            <CardContent>
                <div className="relative h-60 w-full rounded-lg overflow-hidden mb-4">
                    <Image src="https://images.unsplash.com/photo-1577086664693-894d8405334a?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3NDE5ODJ8MHwxfHNlYXJjaHwxNHx8bWFwfGVufDB8fHx8MTc2Nzk2NzI4NHww&ixlib=rb-4.1.0&q=80&w=1080" alt="Map location" fill className="object-cover" data-ai-hint="map location" />
                    <div className="absolute inset-0 bg-black/20 flex items-center justify-center">
                        <Button variant="secondary">
                            <MapPin className="mr-2 h-4 w-4" />
                            View on Map
                        </Button>
                    </div>
                </div>

                <ScrollArea className="w-full whitespace-nowrap">
                    <div className="flex gap-2 mb-4">
                        {categories.map(category => (
                            <Button 
                                key={category.id} 
                                variant={activeCategory === category.id ? 'default' : 'outline'}
                                onClick={() => setActiveCategory(category.id)}
                                className="flex items-center gap-2"
                            >
                                {category.icon}
                                <span>{category.label}</span>
                            </Button>
                        ))}
                    </div>
                    <ScrollBar orientation="horizontal" className="invisible" />
                </ScrollArea>
                
                <h4 className="font-semibold mb-2 capitalize">{activeCategory} Near by {propertyName}</h4>
                {nearbyData[activeCategory].length > 0 ? (
                    <>
                        <ul className="space-y-2">
                            {nearbyData[activeCategory].map(item => (
                                <li key={item.name} className="flex justify-between p-2 rounded-md hover:bg-muted text-sm">
                                    <span className="font-medium">{item.name}</span>
                                    <span className="text-muted-foreground">{item.distance}</span>
                                </li>
                            ))}
                        </ul>
                         <div className="text-center mt-4">
                            <Button variant="outline">View More</Button>
                        </div>
                    </>
                ) : <p className="text-sm text-muted-foreground">No {activeCategory} found nearby.</p>
                }
            </CardContent>
        </Card>
    );
}
