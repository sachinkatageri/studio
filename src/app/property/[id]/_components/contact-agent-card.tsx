
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import Image from "next/image";
import { Badge } from "@/components/ui/badge";
import { Phone, Mail } from "lucide-react";
import { Separator } from "@/components/ui/separator";

const randomImages = [
    { id: 1, src: "https://picsum.photos/seed/client1/100/100", alt: "Random client image 1", hint: "abstract pattern" },
    { id: 2, src: "https://picsum.photos/seed/client2/100/100", alt: "Random client image 2", hint: "office building" },
    { id: 3, src: "https://images.unsplash.com/photo-1599305445671-ac291c95aaa9?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3NDE5ODJ8MHwxfHNlYXJjaHwxfHxsb2dvfGVufDB8fHx8MTc2ODk5MDE3Nnww&ixlib=rb-4.1.0&q=80&w=1080", alt: "Client logo", hint: "logo" },
    { id: 4, src: "https://images.unsplash.com/photo-1557053964-937650b63311?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3NDE5ODJ8MHwxfHNlYXJjaHwxOXx8bG9nb3xlbnwwfHx8fDE3Njg5OTAxNzZ8MA&ixlib=rb-4.1.0&q=80&w=1080", alt: "Client logo", hint: "logo" },
    { id: 5, src: "https://images.unsplash.com/photo-1611162617474-5b21e879e113?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3NDE5ODJ8MHwxfHNlYXJjaHwxMnx8aWNvbnxlbnwwfHx8fDE3NjkwMTQ3ODN8MA&ixlib=rb-4.1.0&q=80&w=1080", alt: "Client icon", hint: "icon" },
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
                        <div className="relative w-16 h-16 rounded-lg overflow-hidden">
                            <Image src="https://images.unsplash.com/photo-1531891437562-4301cf35b7e4?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3NDE5ODJ8MHwxfHNlYXJjaHwyMHx8cHJvZmlsZXxlbnwwfHx8fDE3NjkwMTkwNTV8MA&ixlib=rb-4.1.0&q=80&w=1080" alt="Rohit" fill className="object-cover" data-ai-hint="male agent" />
                        </div>
                        <div>
                            <h3 className="font-semibold">Say Hi To Rohit</h3>
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
                <Button className="w-full">Contact Rohit</Button>
                <Separator />
                 <div className="bg-muted/50 p-4 rounded-lg -m-2">
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
                </div>
            </CardContent>
        </Card>
    );
}
