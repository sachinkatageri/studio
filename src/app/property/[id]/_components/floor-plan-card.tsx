
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import Image from "next/image";

export default function FloorPlanCard() {
    return (
        <Card>
            <CardHeader>
                <CardTitle>Floor Plan</CardTitle>
            </CardHeader>
            <Separator />
            <CardContent>
                <div className="relative aspect-[4/3] w-full rounded-lg overflow-hidden border">
                    <Image src="https://qhstatic-us-s3.coohom.com/image/png/1722395916045/fd1.png" alt="Property floor plan" fill className="object-contain p-4" data-ai-hint="floor plan" />
                </div>
            </CardContent>
        </Card>
    );
}
