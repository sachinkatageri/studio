
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import Image from "next/image";
import { Badge } from "@/components/ui/badge";
import { Phone, Mail } from "lucide-react";

export default function ContactAgentCard({ propertyName }: { propertyName: string }) {
    return (
        <Card>
            <CardHeader>
                <CardTitle className="text-base">Interested in {propertyName}?</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
                <div className="flex items-center gap-4">
                    <div className="relative w-16 h-16 rounded-full overflow-hidden">
                        <Image src="https://picsum.photos/seed/rohit/200/200" alt="Rohit" fill className="object-cover" data-ai-hint="male agent" />
                    </div>
                    <div>
                        <h3 className="font-semibold">Say Hi To Rohit</h3>
                        <p className="text-sm text-muted-foreground">+91 89*****896</p>
                        <Badge variant="outline" className="mt-1 font-medium">Buildersinfo Expert</Badge>
                    </div>
                </div>
                <div className="flex justify-between items-center">
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
                    <Button variant="outline">Contact Rohit</Button>
                </div>
            </CardContent>
        </Card>
    );
}
