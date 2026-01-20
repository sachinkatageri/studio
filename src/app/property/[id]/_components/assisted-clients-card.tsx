import { Card, CardContent } from "@/components/ui/card";
import Image from "next/image";

const clientLogos = [
    { name: "Pepsi", logoUrl: "https://i.ibb.co/9hbdjVq/pepsi-logo.png" },
    { name: "GE", logoUrl: "https://i.ibb.co/kXyVkq4/ge-logo.png" },
    { name: "P&G", logoUrl: "https://i.ibb.co/1MjYdMM/pg-logo.png" },
    { name: "HP", logoUrl: "https://i.ibb.co/zVv7TqF/hp-logo.png" },
    { name: "Dell", logoUrl: "https://i.ibb.co/P9tPqZL/dell-logo.png" },
]

export default function AssistedClientsCard() {
    return (
        <Card className="bg-muted/50 border">
            <CardContent className="p-4 text-center">
                <p className="text-sm text-muted-foreground mb-4">
                    Rohit's team assisted 500+ corporates in Bangalore to move into their new office.
                </p>
                <div className="flex justify-around items-center">
                    {clientLogos.map((client) => (
                        <div key={client.name} className="relative h-8 w-12">
                            <Image
                                src={client.logoUrl}
                                alt={client.name}
                                fill
                                className="object-contain"
                            />
                        </div>
                    ))}
                </div>
            </CardContent>
        </Card>
    )
}
