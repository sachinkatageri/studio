
import { Card, CardContent } from "@/components/ui/card";
import Image from "next/image";

const randomImages = [
    { id: 1, src: "https://picsum.photos/seed/client1/100/100", alt: "Random client image 1", hint: "abstract pattern" },
    { id: 2, src: "https://picsum.photos/seed/client2/100/100", alt: "Random client image 2", hint: "office building" },
    { id: 3, src: "https://images.unsplash.com/photo-1599305445671-ac291c95aaa9?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3NDE5ODJ8MHwxfHNlYXJjaHwxfHxsb2dvfGVufDB8fHx8MTc2ODk5MDE3Nnww&ixlib=rb-4.1.0&q=80&w=1080", alt: "Client logo", hint: "logo" },
    { id: 4, src: "https://images.unsplash.com/photo-1557053964-937650b63311?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3NDE5ODJ8MHwxfHNlYXJjaHwxOXx8bG9nb3xlbnwwfHx8fDE3Njg5OTAxNzZ8MA&ixlib=rb-4.1.0&q=80&w=1080", alt: "Client logo", hint: "logo" },
    { id: 5, src: "https://images.unsplash.com/photo-1611162617474-5b21e879e113?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3NDE5ODJ8MHwxfHNlYXJjaHwxMnx8aWNvbnxlbnwwfHx8fDE3NjkwMTQ3ODN8MA&ixlib=rb-4.1.0&q=80&w=1080", alt: "Client icon", hint: "icon" },
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
                        <div key={image.id} className="relative h-12 w-12 rounded-full overflow-hidden">
                           <Image src={image.src} alt={image.alt} fill className="object-cover" data-ai-hint={image.hint} />
                        </div>
                    ))}
                </div>
            </CardContent>
        </Card>
    );
}
