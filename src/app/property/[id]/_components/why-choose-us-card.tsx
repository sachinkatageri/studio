import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { BadgePercent, TrendingDown, LifeBuoy } from "lucide-react";

const consultationPoints = [
    {
        icon: <BadgePercent className="h-6 w-6 text-primary" />,
        title: "Zero Brokerage",
        description: "100% Service, 0% Brokerage"
    },
    {
        icon: <TrendingDown className="h-6 w-6 text-primary" />,
        title: "Lowest Price Guaranteed",
        description: "Highly unlikely, but if you find a lower price anywhere, tell us and we will match it."
    },
    {
        icon: <LifeBuoy className="h-6 w-6 text-primary" />,
        title: "Full Service Support",
        description: "Our sales personnel are accountable for every step"
    }
]

export default function WhyChooseUsCard() {
    return (
        <Card>
            <CardHeader>
                <CardTitle className="text-base">Why Clients Choose Us for Consultation</CardTitle>
            </CardHeader>
            <CardContent>
                <ul className="space-y-6">
                    {consultationPoints.map(point => (
                        <li key={point.title} className="flex items-start gap-4">
                            <div className="p-2 bg-muted rounded-lg">
                                {point.icon}
                            </div>
                            <div>
                                <h4 className="font-semibold text-sm">{point.title}</h4>
                                <p className="text-xs text-muted-foreground mt-1">{point.description}</p>
                            </div>
                        </li>
                    ))}
                </ul>
            </CardContent>
        </Card>
    )
}
