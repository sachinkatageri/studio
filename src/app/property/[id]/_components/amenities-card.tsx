"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { allAmenities } from "@/lib/amenities";
import { Separator } from "@/components/ui/separator";
import { useState } from "react";
import { AmenitiesDialog } from "@/components/layout/amenities-dialog";
import { PlusCircle } from "lucide-react";

export default function AmenitiesCard() {
    const [isAmenitiesDialogOpen, setIsAmenitiesDialogOpen] = useState(false);
    
    // Show 20 amenities and a "view all" button as the 21st item.
    const amenitiesToShow = allAmenities.slice(0, 20);

    return (
        <Card id="amenities">
            <CardHeader>
                <CardTitle>Amenities</CardTitle>
            </CardHeader>
            <Separator />
            <CardContent className="pt-6">
                <div className="grid grid-cols-4 sm:grid-cols-5 md:grid-cols-7 gap-x-4 gap-y-6">
                    {amenitiesToShow.map((amenity, index) => (
                        <div key={index} className="flex flex-col items-center text-center gap-2">
                            <div className="flex items-center justify-center h-16 w-16 rounded-full bg-muted">
                                <amenity.icon className="h-8 w-8 text-primary" />
                            </div>
                            <p className="text-xs font-medium text-muted-foreground truncate w-full">{amenity.name}</p>
                        </div>
                    ))}
                    {/* The "View All" button will be the 21st item in the grid */}
                    <div className="flex flex-col items-center text-center gap-2">
                        <button
                            onClick={() => setIsAmenitiesDialogOpen(true)}
                            className="flex items-center justify-center h-16 w-16 rounded-full bg-muted hover:bg-muted/80 transition-colors"
                        >
                            <PlusCircle className="h-8 w-8 text-primary" />
                        </button>
                        <button onClick={() => setIsAmenitiesDialogOpen(true)} className="text-xs font-medium text-muted-foreground hover:underline truncate w-full">
                            View All
                        </button>
                    </div>
                </div>
            </CardContent>
            <AmenitiesDialog open={isAmenitiesDialogOpen} onOpenChange={setIsAmenitiesDialogOpen} />
        </Card>
    );
}
