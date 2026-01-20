
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Check } from "lucide-react";

const benefits = [
    "Zero brokerage fee",
    "Design & layout support",
    "Largest network of offices",
    "Your own office consultant",
];

export default function WhyBuildersinfoCard() {
    return (
        <Card className="bg-muted/50">
            <CardContent className="p-6 flex flex-col md:flex-row items-center justify-between gap-6">
                <h3 className="font-bold text-lg whitespace-nowrap">Why choose Buildersinfo?</h3>
                <ul className="grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-2 flex-grow">
                    {benefits.map((benefit, index) => (
                        <li key={index} className="flex items-center gap-2">
                            <Check className="h-4 w-4 text-green-500" />
                            <span className="text-sm font-medium">{benefit}</span>
                        </li>
                    ))}
                </ul>
                <Button className="shrink-0">Get Free Consultation</Button>
            </CardContent>
        </Card>
    );
}
