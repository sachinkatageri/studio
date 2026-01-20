
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

export default function OpeningHoursCard() {
    return (
        <Card>
            <CardHeader>
                <CardTitle>Opening Hours</CardTitle>
            </CardHeader>
            <CardContent>
                <ul className="space-y-3 text-sm">
                    <li className="flex justify-between items-center">
                        <span className="text-muted-foreground">Monday - Friday</span>
                        <span className="font-medium">9:00 AM - 6:00 PM</span>
                    </li>
                    <li className="flex justify-between items-center">
                        <span className="text-muted-foreground">Saturday</span>
                        <Badge variant="destructive">Closed</Badge>
                    </li>
                    <li className="flex justify-between items-center">
                        <span className="text-muted-foreground">Sunday</span>
                        <Badge variant="destructive">Closed</Badge>
                    </li>
                </ul>
            </CardContent>
        </Card>
    );
}
