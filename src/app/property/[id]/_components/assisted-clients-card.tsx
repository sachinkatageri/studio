
import { Card, CardContent } from "@/components/ui/card";
import Image from "next/image";

const clientLogos = [
    { name: "Pepsi", logoUrl: "https://i.ibb.co/hZqgVJv/pepsi.png", hint: "pepsi logo" },
    { name: "GE", logoUrl: "https://i.ibb.co/6yZztR1/ge.png", hint: "ge logo" },
    { name: "P&G", logoUrl: "https://i.ibb.co/7Qr0B4Y/pg.png", hint: "p&g logo" },
    { name: "HP", logoUrl: "https://i.ibb.co/VvZf3Xp/hp.png", hint: "hp logo" },
    { name: "Dell", logoUrl: "https://i.ibb.co/jGGbT3B/dell.png", hint: "dell logo" },
];

export default function AssistedClientsCard() {
    return (
        <Card className="bg-muted/50">
            <CardContent className="p-4">
                <p className="text-sm text-center text-muted-foreground mb-4">
                    Rohit's team assisted 500+ corporates in Bangalore to move into their new office.
                </p>
                <div className="flex justify-around items-center flex-wrap gap-4">
                    {clientLogos.map((client) => (
                        <div key={client.name} className="relative h-10 w-16">
                           <Image src={client.logoUrl} alt={client.name} fill className="object-contain" data-ai-hint={client.hint} />
                        </div>
                    ))}
                </div>
            </CardContent>
        </Card>
    );
}
