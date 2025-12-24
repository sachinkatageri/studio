import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Award } from "lucide-react";

const awards = [
    {
        title: "Best Developer Award 2023",
        issuer: "CREDAI"
    },
    {
        title: "Customer Satisfaction Award",
        issuer: "Real Estate Summit"
    }
];

export default function AwardsRecognition() {
    return (
        <Card>
            <CardHeader>
                <CardTitle>Awards & Recognition</CardTitle>
            </CardHeader>
            <CardContent>
                <ul className="space-y-4">
                    {awards.map((award, index) => (
                        <li key={index} className="flex items-center gap-4">
                            <div className="p-2 bg-yellow-100 dark:bg-yellow-900/50 rounded-full">
                                <Award className="h-6 w-6 text-yellow-500" />
                            </div>
                            <div>
                                <p className="font-semibold">{award.title}</p>
                                <p className="text-sm text-muted-foreground">{award.issuer}</p>
                            </div>
                        </li>
                    ))}
                </ul>
            </CardContent>
        </Card>
    );
}
