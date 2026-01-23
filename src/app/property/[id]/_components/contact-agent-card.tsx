
"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import Image from "next/image";
import { Badge } from "@/components/ui/badge";
import { Phone, Mail } from "lucide-react";
import { Separator } from "@/components/ui/separator";

const clientLogos = [
    { id: 1, src: "https://images.unsplash.com/photo-1599305445671-ac291c95aaa9", alt: "Google logo", hint: "company logo" },
    { id: 2, src: "https://images.unsplash.com/photo-1611162617213-7d7a39e9b1d7", alt: "Facebook logo", hint: "social media" },
    { id: 3, src: "https://images.unsplash.com/photo-1611162618071-b39a2ec055fb", alt: "Netflix logo", hint: "streaming service" },
    { id: 4, src: "https://images.unsplash.com/photo-1529612700005-e35377bf1415", alt: "Amazon logo", hint: "ecommerce logo" },
    { id: 5, src: "https://images.unsplash.com/photo-1611262588024-d12430b98925", alt: "Instagram logo", hint: "photo sharing" },
];

export default function ContactAgentCard({ propertyName }: { propertyName: string }) {
    return (
        <Card>
            <CardHeader>
                <CardTitle className="text-base">Interested in {propertyName}?</CardTitle>
            </CardHeader>
            <Separator />
            <CardContent className="space-y-4 pt-6">
                <div className="flex justify-between items-center gap-4">
                    <div className="flex items-center gap-4">
                        <div className="relative w-24 h-24 rounded-lg overflow-hidden">
                            <Image src="https://images.unsplash.com/photo-1544005313-94ddf0286df2?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3NDE5ODJ8MHwxfHNlYXJjaHwxOXx8cHJvZmlsZXxlbnwwfHx8fDE3NjkxNDg5MzZ8MA&ixlib=rb-4.1.0&q=80&w=1080" alt="Riya" fill className="object-cover" data-ai-hint="female agent" />
                        </div>
                        <div>
                            <h3 className="font-semibold">Say Hi To Riya</h3>
                            <p className="text-sm text-muted-foreground">+91 89*****896</p>
                            <Badge variant="outline" className="mt-1 font-medium">Buildersinfo Expert</Badge>
                        </div>
                    </div>
                     <div className="flex items-center gap-2">
                        <Button variant="outline" size="icon" className="h-9 w-9 rounded-full bg-green-100 border-green-200 text-green-600 hover:bg-green-200">
                           <Phone className="h-4 w-4" />
                        </Button>
                        <Button variant="outline" size="icon" className="h-9 w-9 rounded-full bg-green-100 border-green-200 text-green-600 hover:bg-green-200">
                           <Mail className="h-4 w-4" />
                        </Button>
                        <Button variant="outline" size="icon" className="h-9 w-9 rounded-full bg-green-100 border-green-200 text-green-600 hover:bg-green-200">
                           <Image src="https://www.buildersinfo.in/property-details/whatsapp.png" alt="WhatsApp" width={16} height={16} />
                        </Button>
                    </div>
                </div>
                <Button className="w-full">Contact Riya</Button>
                <Separator />
                 <div className="bg-muted/50 p-4 rounded-lg -m-2">
                    <p className="text-sm text-center text-muted-foreground mb-4">
                        Riya's team assisted 500+ corporates in Bangalore to move into their new office.
                    </p>
                    <div className="flex justify-around items-center flex-wrap gap-4">
                        {clientLogos.map((image) => (
                            <div key={image.id} className="relative h-12 w-12 rounded-full overflow-hidden">
                               <Image src={image.src} alt={image.alt} fill className="object-cover" data-ai-hint={image.hint} />
                            </div>
                        ))}
                    </div>
                </div>
            </CardContent>
        </Card>
    );
}
