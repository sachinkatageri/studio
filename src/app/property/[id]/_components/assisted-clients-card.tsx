
import { Card, CardContent } from "@/components/ui/card";
import Image from "next/image";

const randomImages = [
    { id: 1, src: "https://picsum.photos/seed/client1/100/50", alt: "Random client image 1", hint: "abstract pattern" },
    { id: 2, src: "https://picsum.photos/seed/client2/100/50", alt: "Random client image 2", hint: "office building" },
    { id: 3, src: "https://picsum.photos/seed/client3/100/50", alt: "Random client image 3", hint: "modern architecture" },
    { id: 4, src: "https://picsum.photos/seed/client4/100/50", alt: "Random client image 4", hint: "cityscape" },
    { id: 5, src: "https://picsum.photos/seed/client5/100/50", alt: "Random client image 5", hint: "nature" },
];

export default function AssistedClientsCard() {
    return (
        <Card className="bg-muted/50">
            <CardContent className="p-4">
                <p className="text-sm text-center text-muted-foreground mb-4">
                    Rohit's team assisted 500+ corporates in Bangalore to move into their new office.
                </p>
                <div className="flex justify-around items-center flex-wrap gap-4">
                    {randomImages.map((image) => (
                        <div key={image.id} className="relative h-10 w-16">
                           <Image src={image.src} alt={image.alt} fill className="object-contain" data-ai-hint={image.hint} />
                        </div>
                    ))}
                </div>
            </CardContent>
        </Card>
    );
}
