
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { BadgePercent, TrendingDown, LifeBuoy } from "lucide-react";

const consultationPoints = [
    {
        icon: <BadgePercent className="h-5 w-5 text-primary" />,
        title: "Zero Brokerage",
        description: "100% Service, 0% Brokerage"
    },
    {
        icon: <TrendingDown className="h-5 w-5 text-primary" />,
        title: "Lowest Price Guaranteed",
        description: "If you find a lower price, we will match it."
    },
    {
        icon: <LifeBuoy className="h-5 w-5 text-primary" />,
        title: "Full Service Support",
        description: "Our team is accountable for every step."
    }
]

export default function WhyChooseUsCard() {
    return (
        <Card>
            <CardHeader>
                <CardTitle className="text-base">Why Clients Choose Us</CardTitle>
            </CardHeader>
            <CardContent>
                <ul className="space-y-4">
                    {consultationPoints.map(point => (
                        <li key={point.title} className="flex items-start gap-3">
                            <div className="p-2 bg-primary/10 rounded-lg">
                                {point.icon}
                            </div>
                            <div>
                                <h4 className="font-semibold text-sm">{point.title}</h4>
                                <p className="text-xs text-muted-foreground mt-0.5">{point.description}</p>
                            </div>
                        </li>
                    ))}
                </ul>
            </CardContent>
        </Card>
    )
}
