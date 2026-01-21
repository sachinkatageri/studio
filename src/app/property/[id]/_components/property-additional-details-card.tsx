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
                <ul className="space-y-3 text-sm">
                    {details.map(detail => (
                        <li key={detail.label} className="flex justify-between">
                            <span className="text-muted-foreground">{detail.label}</span>
                            <span className="font-medium text-right">{detail.value}</span>
                        </li>
                    ))}
                </ul>
            </CardContent>
        </Card>
    );
}
