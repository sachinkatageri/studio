
import { Card, CardContent } from "@/components/ui/card";
import Image from "next/image";

const clientLogos = [
    { id: 1, src: "https://images.unsplash.com/photo-1599305445671-ac291c95aaa9", alt: "Google logo", hint: "company logo" },
    { id: 2, src: "https://images.unsplash.com/photo-1611162617213-7d7a39e9b1d7", alt: "Facebook logo", hint: "social media" },
    { id: 3, src: "https://images.unsplash.com/photo-1611162618071-b39a2ec055fb", alt: "Netflix logo", hint: "streaming service" },
    { id: 4, src: "https://images.unsplash.com/photo-1529612700005-e35377bf1415", alt: "Amazon logo", hint: "ecommerce logo" },
    { id: 5, src: "https://images.unsplash.com/photo-1563694983011-6f4d90358083?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3NDE5ODJ8MHwxfHNlYXJjaHw1fHxsb2dvfGVufDB8fHx8MTc2OTE0OTIyMXww&ixlib=rb-4.1.0&q=80&w=1080", alt: "Company logo", hint: "photo sharing" },
];

export default function AssistedClientsCard() {
    return (
        <Card className="bg-muted/50">
            <CardContent className="p-4">
                <p className="text-sm text-center text-muted-foreground mb-4">
                    Rohit's team assisted 500+ corporates in Bangalore to move into their new office.
                </p>
                <div className="flex justify-around items-center flex-wrap gap-4">
                    {clientLogos.map((image) => (
                        <div key={image.id} className="relative h-12 w-12 rounded-full overflow-hidden">
                           <Image src={image.src} alt={image.alt} fill className="object-cover" data-ai-hint={image.hint} />
                        </div>
                    ))}
                </div>
            </CardContent>
        </Card>
    );
}
