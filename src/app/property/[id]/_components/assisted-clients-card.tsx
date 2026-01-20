
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
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
        <Card>
            <CardHeader>
                <CardTitle className="text-base">We have assisted</CardTitle>
            </CardHeader>
            <CardContent>
                <p className="text-xs text-muted-foreground mb-4">
                    Rohit's team assisted 500+ corporates in Bangalore to move into their new office.
                </p>
                <div className="flex justify-around items-center flex-wrap gap-4">
                    {clientLogos.map((client) => (
                        <div key={client.name} className="relative h-6 w-10">
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
