

"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import Image from "next/image";
import { CategorySelectionDialog } from "@/components/layout/category-selection-dialog";
import { AllCitiesDialog } from "@/components/layout/all-cities-dialog";
import { cities } from "@/lib/cities";

export default function CitySelector() {
    const [isCategoryDialogOpen, setIsCategoryDialogOpen] = useState(false);
    const [isAllCitiesDialogOpen, setIsAllCitiesDialogOpen] = useState(false);
    const [selectedCity, setSelectedCity] = useState<string | null>(null);

    const handleCityClick = (city: string) => {
        setSelectedCity(city);
        setIsCategoryDialogOpen(true);
    };
    
    return (
        <>
            <section className="py-16 bg-muted/30" id="cities">
                <div className="container mx-auto px-4">
                    <div className="grid lg:grid-cols-2 gap-8 items-center">
                        <div>
                            <h2 className="text-3xl font-bold font-headline mb-2">Select by City</h2>
                            <div className="w-24 h-1.5 bg-accent mb-8"></div>
                            <div className="grid grid-cols-4 sm:grid-cols-5 md:grid-cols-6 gap-x-4 gap-y-6">
                                {cities.map(city => (
                                    <div key={city.name} className="flex flex-col items-center gap-2 text-center cursor-pointer group" onClick={() => handleCityClick(city.name)}>
                                        <div className="relative w-16 h-16 sm:w-20 sm:h-20 rounded-full overflow-hidden border-2 border-transparent group-hover:border-accent transition-all duration-300 transform group-hover:scale-110">
                                            <Image src={city.icon} alt={city.name} fill className="object-cover" data-ai-hint="city landmark" />
                                        </div>
                                        <p className="text-xs sm:text-sm font-medium text-muted-foreground group-hover:text-accent">{city.name}</p>
                                    </div>
                                ))}
                                 <div className="flex flex-col items-center gap-2 text-center cursor-pointer group" onClick={() => setIsAllCitiesDialogOpen(true)}>
                                     <div className="relative w-16 h-16 sm:w-20 sm:h-20 rounded-full overflow-hidden bg-primary flex items-center justify-center transition-all duration-300 transform group-hover:scale-110">
                                        <span className="text-white text-xs sm:text-sm font-bold text-center">See All</span>
                                    </div>
                                    <p className="text-xs sm:text-sm font-medium text-muted-foreground group-hover:text-primary">More Cities</p>
                                </div>
                            </div>
                        </div>
                        <div className="hidden lg:block relative h-full min-h-[400px] rounded-2xl overflow-hidden">
                             <Image src="https://picsum.photos/seed/gateway-of-india/800/1000" alt="Gateway of India" fill className="object-cover" data-ai-hint="historic monument" />
                        </div>
                    </div>
                </div>
            </section>
            {selectedCity && (
                <CategorySelectionDialog 
                    open={isCategoryDialogOpen} 
                    onOpenChange={setIsCategoryDialogOpen} 
                    city={selectedCity}
                    pageType="residential"
                />
            )}
            <AllCitiesDialog
                open={isAllCitiesDialogOpen}
                onOpenChange={setIsAllCitiesDialogOpen}
                onCitySelect={handleCityClick}
            />
        </>
    )
}
