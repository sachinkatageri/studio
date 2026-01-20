
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import Image from "next/image";

export default function FloorPlanCard() {
    return (
        <Card>
            <CardHeader>
                <CardTitle>Floor Plan</CardTitle>
            </CardHeader>
            <CardContent>
                <div className="relative aspect-[4/3] w-full rounded-lg overflow-hidden border">
                    <Image src="https://picsum.photos/seed/floor-plan/1000/600" alt="Property floor plan" fill className="object-contain p-4" data-ai-hint="floor plan" />
                </div>
            </CardContent>
        </Card>
    );
}
