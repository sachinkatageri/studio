import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";

const details = [
    { label: 'Category', value: 'Commercial' },
    { label: 'Property Type', value: 'Techpark' },
    { label: 'Under Management', value: 'Yes' },
    { label: 'Available Floors', value: '10th' },
    { label: 'Office Space Solutions', value: 'Floor 10th' },
    { label: 'Facilities', value: '4W PARKING, 2W PARKING' },
    { label: 'Builder Name', value: 'A' },
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
                        <div key={detail.label}>
                            <p className="text-muted-foreground">{detail.label}</p>
                            <p className="font-semibold">{detail.value}</p>
                        </div>
                    ))}
                </div>
            </CardContent>
        </Card>
    );
}
