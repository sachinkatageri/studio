
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import Image from "next/image";

const segments = {
    residential: [
        { name: "Mumbai", img: "https://picsum.photos/seed/mumbai/100/100" },
        { name: "Hyderabad", img: "https://picsum.photos/seed/hyderabad/100/100" },
        { name: "Bangalore", img: "https://picsum.photos/seed/bangalore/100/100" },
        { name: "Chennai", img: "https://picsum.photos/seed/chennai/100/100" },
        { name: "Kolkata", img: "https://picsum.photos/seed/kolkata/100/100" },
        { name: "Goa", img: "https://picsum.photos/seed/goa/100/100" },
        { name: "Delhi", img: "https://picsum.photos/seed/delhi/100/100" },
        { name: "Pune", img: "https://picsum.photos/seed/pune/100/100" },
        { name: "Ahmedabad", img: "https://picsum.photos/seed/ahmedabad/100/100" },
        { name: "Noida", img: "https://picsum.photos/seed/noida/100/100" },
        { name: "Gurgaon", img: "https://picsum.photos/seed/gurgaon/100/100" },
    ],
    commercial: [],
    hospitality: [],
    retail: []
}

export default function OperationalSegments() {
    return (
        <Card>
            <CardHeader>
                <CardTitle>Operational Segments</CardTitle>
            </CardHeader>
            <CardContent>
                <Tabs defaultValue="residential">
                    <TabsList className="grid w-full grid-cols-4">
                        <TabsTrigger value="residential">Residential</TabsTrigger>
                        <TabsTrigger value="commercial">Commercial</TabsTrigger>
                        <TabsTrigger value="hospitality">Hospitality</TabsTrigger>
                        <TabsTrigger value="retail">Retail</TabsTrigger>
                    </TabsList>
                    <TabsContent value="residential" className="mt-4">
                        <div className="grid grid-cols-4 sm:grid-cols-6 md:grid-cols-8 gap-4">
                            {segments.residential.map(item => (
                                <div key={item.name} className="flex flex-col items-center gap-2 text-center">
                                    <div className="relative w-16 h-16 rounded-full overflow-hidden">
                                        <Image src={item.img} alt={item.name} fill className="object-cover" />
                                    </div>
                                    <p className="text-xs font-medium">{item.name}</p>
                                </div>
                            ))}
                        </div>
                    </TabsContent>
                    <TabsContent value="commercial"><p className="text-muted-foreground text-center p-4">No commercial segments to display.</p></TabsContent>
                    <TabsContent value="hospitality"><p className="text-muted-foreground text-center p-4">No hospitality segments to display.</p></TabsContent>
                    <TabsContent value="retail"><p className="text-muted-foreground text-center p-4">No retail segments to display.</p></TabsContent>
                </Tabs>
            </CardContent>
        </Card>
    );
}
