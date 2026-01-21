
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { Building, Building2, ShieldCheck, Layers, Briefcase, ParkingCircle, User } from "lucide-react";

const details = [
    { label: 'Category', value: 'Commercial', icon: Building },
    { label: 'Property Type', value: 'Techpark', icon: Building2 },
    { label: 'Under Management', value: 'Yes', icon: ShieldCheck },
    { label: 'Available Floors', value: '10th', icon: Layers },
    { label: 'Office Space Solutions', value: 'Floor 10th', icon: Briefcase },
    { label: 'Facilities', value: '4W PARKING, 2W PARKING', icon: ParkingCircle },
    { label: 'Builder Name', value: 'A', icon: User },
];

export default function PropertyAdditionalDetailsCard() {
    return (
        <Card>
            <CardHeader>
                <CardTitle>Property Details</CardTitle>
            </CardHeader>
            <Separator />
            <CardContent className="pt-6">
                <div className="grid grid-cols-2 md:grid-cols-3 gap-y-6 gap-x-4 text-sm">
                    {details.map(detail => (
                        <div key={detail.label} className="flex items-start gap-3">
                           <detail.icon className="h-5 w-5 text-primary mt-0.5 shrink-0" />
                           <div>
                                <p className="text-muted-foreground">{detail.label}</p>
                                <p className="font-semibold">{detail.value}</p>
                           </div>
                        </div>
                    ))}
                </div>
            </CardContent>
        </Card>
    );
}
