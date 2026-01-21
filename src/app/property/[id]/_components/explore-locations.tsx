
import { Card, CardContent } from "@/components/ui/card";
import Image from "next/image";
import Link from "next/link";

const locations = [
    { name: "HSR Layout", imageUrl: "https://images.unsplash.com/photo-1527192491265-7e15c55b1ed2?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3NDE5ODJ8MHwxfHNlYXJjaHwxfHxjbyUyMHdvcmtpbmd8ZW58MHx8fHwxNzY4OTgxMTUzfDA&ixlib=rb-4.1.0&q=80&w=1080", imageHint: "office space" },
    { name: "Koramangala", imageUrl: "https://images.unsplash.com/photo-1531973576160-7125cd663d86?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3NDE5ODJ8MHwxfHNlYXJjaHw4fHxvZmZpY2V8ZW58MHx8fHwxNzY4OTgxMTExfDA&ixlib=rb-4.1.0&q=80&w=1080", imageHint: "modern workspace" },
    { name: "MG Road", imageUrl: "https://images.unsplash.com/photo-1605797491749-0c6989a44356?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3NDE5ODJ8MHwxfHNlYXJjaHwyMHx8Y28lMjB3b3JrfGVufDB8fHx8MTc2ODk4MTIyN3ww&ixlib=rb-4.1.0&q=80&w=1080", imageHint: "office building" },
    { name: "Indiranagar", imageUrl: "https://images.unsplash.com/photo-1601762429744-46fe92ccd903?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3NDE5ODJ8MHwxfHNlYXJjaHwxNXx8Y293b3JraW5nfGVufDB8fHx8MTc2ODk4MTI0N3ww&ixlib=rb-4.1.0&q=80&w=1080", imageHint: "creative office" },
    { name: "Whitefield", imageUrl: "https://images.unsplash.com/photo-1614070776241-fb47cec38278?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3NDE5ODJ8MHwxfHNlYXJjaHwxN3x8Y293b3JraW5nfGVufDB8fHx8MTc2ODk4MTI0N3ww&ixlib=rb-4.1.0&q=80&w=1080", imageHint: "tech park" },
    { name: "Sanjay Nagar", imageUrl: "https://images.unsplash.com/photo-1497366811353-6870744d04b2?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3NDE5ODJ8MHwxfHNlYXJjaHwxN3x8Y28lMjB3b3JraW5nfGVufDB8fHx8MTc2ODk4MTE1M3ww&ixlib=rb-4.1.0&q=80&w=1080", imageHint: "coworking area" },
    { name: "Electronic city", imageUrl: "https://images.unsplash.com/photo-1589834390005-5d4fb9bf3d32?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3NDE5ODJ8MHwxfHNlYXJjaHwxOHx8aW50ZXJpb3J8ZW58MHx8fHwxNzY4OTgwODUyfDA&ixlib=rb-4.1.0&q=80&w=1080", imageHint: "corporate building" },
    { name: "JP Nagar", imageUrl: "https://images.unsplash.com/photo-1559209537-dafe2fe2886b?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3NDE5ODJ8MHwxfHNlYXJjaHw2fHxvZmZpY2UlMjBhcGNlfGVufDB8fHx8MTc2ODk4MTMwNXww&ixlib=rb-4.1.0&q=80&w=1080", imageHint: "startup office" },
    { name: "Jayanagar", imageUrl: "https://images.unsplash.com/photo-1541746972996-4e0b0f43e02a?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3NDE5ODJ8MHwxfHNlYXJjaHwxNXx8b2ZmaWNlJTIwfGVufDB8fHx8MTc2ODk4MTMxOHww&ixlib=rb-4.1.0&q=80&w=1080", imageHint: "shared office" },
    { name: "Hebbal", imageUrl: "https://images.unsplash.com/photo-1497215728101-856f4ea42174?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3NDE5ODJ8MHwxfHNlYXJjaHwxfHxvZmZpY2V8ZW58MHx8fHwxNzY4OTgxMTExfDA&ixlib=rb-4.1.0&q=80&w=1080", imageHint: "business center" }
];

export default function ExploreLocations() {
    return (
        <section className="py-12 bg-yellow-50 dark:bg-yellow-900/30">
            <div className="container mx-auto px-4 sm:px-6 lg:px-8">
                <h2 className="text-2xl md:text-3xl font-bold font-headline mb-8">Explore Top Coworking Locations in Bangalore</h2>
                <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-6">
                    {locations.map(location => (
                        <Card key={location.name} className="overflow-hidden group">
                             <Link href="#" className="block">
                                <div className="relative aspect-[4/3]">
                                     <Image
                                        src={location.imageUrl}
                                        alt={`Coworking space in ${location.name}`}
                                        fill
                                        className="object-cover transition-transform duration-300 group-hover:scale-105"
                                        data-ai-hint={location.imageHint}
                                    />
                                </div>
                                <CardContent className="p-4">
                                    <h3 className="font-semibold">Coworking Space in {location.name}</h3>
                                    <p className="text-sm text-primary group-hover:underline mt-1">Explore Spaces</p>
                                </CardContent>
                            </Link>
                        </Card>
                    ))}
                </div>
            </div>
        </section>
    )
}
