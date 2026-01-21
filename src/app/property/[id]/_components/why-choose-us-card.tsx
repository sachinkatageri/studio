
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { BadgePercent, TrendingDown, Cog } from "lucide-react";

const consultationPoints = [
    {
        icon: <div className="w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center"><BadgePercent className="h-5 w-5 text-primary" /></div>,
        title: "Zero Brokerage",
        description: "100% Service, 0% Brokerage"
    },
    {
        icon: <div className="w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center"><TrendingDown className="h-5 w-5 text-primary" /></div>,
        title: "Lowest Price Guaranteed",
        description: "Highly unlikely, but if you find a lower price anywhere, tell us and we will match it."
    },
    {
        icon: <div className="w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center"><Cog className="h-5 w-5 text-primary" /></div>,
        title: "Full Service Support",
        description: "Our sales personnel are accountable for every step."
    }
]

export default function WhyChooseUsCard() {
    return (
        <Card>
            <CardHeader>
                <CardTitle className="text-base">Why Clients Choose Us for Consultation</CardTitle>
            </CardHeader>
            <CardContent>
                <ul className="space-y-4">
                    {consultationPoints.map((point, index) => (
                        <li key={point.title} className={`flex items-start gap-4 ${index < consultationPoints.length - 1 ? 'pb-4 border-b' : ''}`}>
                            {point.icon}
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
