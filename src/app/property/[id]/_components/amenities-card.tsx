
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { allAmenities } from "@/lib/amenities";
import { Separator } from "@/components/ui/separator";

export default function AmenitiesCard() {
    // Select a subset of amenities to display, trying to match the image categories
    const guestServices = allAmenities.filter(a => a.category === 'GUEST_SERVICES').slice(0, 4);
    const food = allAmenities.filter(a => a.category === 'FOOD_BEVERAGES').slice(0, 4);
    const cleaning = allAmenities.filter(a => a.category === 'CLEANING').slice(0, 4);
    
    const amenitiesToShow = [...guestServices, ...food, ...cleaning];

    return (
        <Card id="amenities">
            <CardHeader>
                <CardTitle>Amenities</CardTitle>
            </CardHeader>
            <Separator />
            <CardContent>
                <div className="grid grid-cols-4 sm:grid-cols-5 md:grid-cols-7 gap-x-4 gap-y-6">
                    {amenitiesToShow.map((amenity, index) => (
                        <div key={index} className="flex flex-col items-center text-center gap-2">
                            <div className="flex items-center justify-center h-16 w-16 rounded-full bg-muted">
                                <amenity.icon className="h-8 w-8 text-primary" />
                            </div>
                            <p className="text-xs font-medium text-muted-foreground truncate w-full">{amenity.name}</p>
                        </div>
                    ))}
                </div>
            </CardContent>
        </Card>
    );
}
