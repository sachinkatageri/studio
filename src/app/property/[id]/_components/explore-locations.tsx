
import { Card, CardContent } from "@/components/ui/card";
import Image from "next/image";
import Link from "next/link";

const locations = [
    { name: "HSR Layout", imageUrl: "https://images.unsplash.com/photo-1527192491265-7e15c55b1ed2?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3NDE5ODJ8MHwxfHNlYXJjaHwxfHxjbyUyMHdvcmtpbmd8ZW58MHx8fHwxNzY4OTgxMTUzfDA&ixlib=rb-4.1.0&q=80&w=1080", imageHint: "office space" },
    { name: "Koramangala", imageUrl: "https://picsum.photos/seed/loc-kora/400/300", imageHint: "modern workspace" },
    { name: "MG Road", imageUrl: "https://picsum.photos/seed/loc-mgroad/400/300", imageHint: "office building" },
    { name: "Indiranagar", imageUrl: "https://picsum.photos/seed/loc-indira/400/300", imageHint: "creative office" },
    { name: "Whitefield", imageUrl: "https://picsum.photos/seed/loc-white/400/300", imageHint: "tech park" },
    { name: "Sanjay Nagar", imageUrl: "https://picsum.photos/seed/loc-sanjay/400/300", imageHint: "coworking area" },
    { name: "Electronic city", imageUrl: "https://picsum.photos/seed/loc-ecity/400/300", imageHint: "corporate building" },
    { name: "JP Nagar", imageUrl: "https://picsum.photos/seed/loc-jpnagar/400/300", imageHint: "startup office" },
    { name: "Jayanagar", imageUrl: "https://picsum.photos/seed/loc-jaya/400/300", imageHint: "shared office" },
    { name: "Hebbal", imageUrl: "https://picsum.photos/seed/loc-hebbal/400/300", imageHint: "business center" }
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
