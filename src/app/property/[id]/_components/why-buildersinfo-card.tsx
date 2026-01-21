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
            <CardContent className="p-4 md:p-6">
                <div className="flex flex-col md:flex-row items-center md:justify-between gap-4 md:gap-6">
                    <div className="text-center md:text-left">
                        <h3 className="font-bold text-lg">Why choose Buildersinfo?</h3>
                    </div>
                    <ul className="grid grid-cols-2 gap-x-4 gap-y-3 w-full md:flex-grow">
                        {benefits.map((benefit, index) => (
                            <li key={index} className="flex items-center gap-2">
                                <Check className="h-4 w-4 text-green-500 shrink-0" />
                                <span className="text-sm font-medium">{benefit}</span>
                            </li>
                        ))}
                    </ul>
                    <Button className="shrink-0 w-full md:w-auto">Get Free Consultation</Button>
                </div>
            </CardContent>
        </Card>
    );
}
