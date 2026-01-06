

"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import Image from "next/image";
import { CategorySelectionDialog } from "@/components/layout/category-selection-dialog";

const cities = [
    { name: 'Mumbai', icon: 'https://picsum.photos/seed/mumbai-icon/100/100' },
    { name: 'Hyderabad', icon: 'https://picsum.photos/seed/hyderabad-icon/100/100' },
    { name: 'Bangalore', icon: 'https://picsum.photos/seed/bangalore-icon/100/100' },
    { name: 'Chennai', icon: 'https://picsum.photos/seed/chennai-icon/100/100' },
    { name: 'Pune', icon: 'https://picsum.photos/seed/pune-icon/100/100' },
    { name: 'Noida', icon: 'https://picsum.photos/seed/noida-icon/100/100' },
    { name: 'Delhi', icon: 'https://picsum.photos/seed/delhi-icon/100/100' },
    { name: 'Indore', icon: 'https://picsum.photos/seed/indore-icon/100/100' },
    { name: 'Ahmedabad', icon: 'https://picsum.photos/seed/ahmedabad-icon/100/100' },
    { name: 'Jaipur', icon: 'https://picsum.photos/seed/jaipur-icon/100/100' },
    { name: 'Kerala', icon: 'https://picsum.photos/seed/kerala-icon/100/100' },
    { name: 'Chandigarh', icon: 'https://picsum.photos/seed/chandigarh-icon/100/100' },
    { name: 'Kolkata', icon: 'https://picsum.photos/seed/kolkata-icon/100/100' },
    { name: 'Goa', icon: 'https://picsum.photos/seed/goa-icon/100/100' },
    { name: 'Bhubaneswar', icon: 'https://picsum.photos/seed/bhubaneswar-icon/100/100' },
    { name: 'Uttar Pradesh', icon: 'https://picsum.photos/seed/up-icon/100/100' },
    { name: 'Lucknow', icon: 'https://picsum.photos/seed/lucknow-icon/100/100' },
];

export default function CitySelector() {
    const [isDialogOpen, setIsDialogOpen] = useState(false);
    const [selectedCity, setSelectedCity] = useState<string | null>(null);

    const handleCityClick = (city: string) => {
        setSelectedCity(city);
        setIsDialogOpen(true);
    };

    return (
        <>
            <section className="py-16 bg-muted/30" id="cities">
                <div className="container mx-auto px-4">
                    <div className="grid lg:grid-cols-2 gap-8 items-center">
                        <div>
                            <h2 className="text-3xl font-bold font-headline mb-2">Select by City</h2>
                            <div className="w-24 h-1.5 bg-accent mb-8"></div>
                            <div className="grid grid-cols-4 sm:grid-cols-5 md:grid-cols-6 gap-6">
                                {cities.map(city => (
                                    <div key={city.name} className="flex flex-col items-center gap-2 text-center cursor-pointer group" onClick={() => handleCityClick(city.name)}>
                                        <div className="relative w-20 h-20 rounded-full overflow-hidden border-2 border-transparent group-hover:border-accent transition-all duration-300 transform group-hover:scale-110">
                                            <Image src={city.icon} alt={city.name} fill className="object-cover" data-ai-hint="city landmark" />
                                        </div>
                                        <p className="text-sm font-medium text-muted-foreground group-hover:text-accent">{city.name}</p>
                                    </div>
                                ))}
                                 <div className="flex flex-col items-center gap-2 text-center cursor-pointer group">
                                    <div className="relative w-20 h-20 rounded-full overflow-hidden bg-primary flex items-center justify-center transition-all duration-300 transform group-hover:scale-110">
                                        <span className="text-white text-sm font-bold">See All</span>
                                    </div>
                                    <p className="text-sm font-medium text-muted-foreground group-hover:text-primary">More Cities</p>
                                </div>
                            </div>
                        </div>
                        <div className="hidden lg:block relative h-full min-h-[400px] rounded-2xl overflow-hidden">
                             <Image src="https://picsum.photos/seed/mountains/800/1000" alt="Mountains" fill className="object-cover" data-ai-hint="mountains clouds" />
                        </div>
                    </div>
                </div>
            </section>
            {selectedCity && (
                <CategorySelectionDialog 
                    open={isDialogOpen} 
                    onOpenChange={setIsDialogOpen} 
                    city={selectedCity}
                    pageType="commercial"
                />
            )}
        </>
    )
}
