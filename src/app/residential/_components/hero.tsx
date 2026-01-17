
"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { cn } from "@/lib/utils";
import { Tag, Search, Users, Home, Hotel } from "lucide-react";
import Image from "next/image";
import { useState } from "react";

const filterOptions = [
    { label: "Rent", value: "rent", icon: <Home className="h-5 w-5" /> },
    { label: "Sale", value: "sale", icon: <Tag className="h-5 w-5" /> },
    { label: "PG/Hostel", value: "pg-hostel", icon: <Hotel className="h-5 w-5" /> },
    { label: "Flatmates", value: "flatmates", icon: <Users className="h-5 w-5" /> },
]

export default function Hero() {
    const [selectedFilter, setSelectedFilter] = useState("rent");

    return (
        <section className="relative h-[550px] flex items-center justify-center text-center text-white">
            <Image 
                src="https://picsum.photos/seed/residential-hero/1920/1080"
                alt="Modern living room"
                fill
                className="object-cover"
                data-ai-hint="modern living room"
            />
            <div className="absolute inset-0 bg-black/50" />
            <div className="relative z-10 container mx-auto px-4">
                <h1 className="text-4xl md:text-5xl font-bold font-headline">Embrace The Era of <span className="text-accent">Brokerage Free</span> Real Estate</h1>
                <div className="mt-8 bg-background/20 backdrop-blur-sm rounded-2xl p-4 max-w-4xl mx-auto">
                    <div className="grid grid-cols-4 gap-2">
                        {filterOptions.map(option => (
                            <button 
                                key={option.label}
                                onClick={() => setSelectedFilter(option.value)}
                                className={cn(
                                    "flex flex-col items-center justify-center gap-2 p-3 rounded-lg transition-colors text-white",
                                    selectedFilter === option.value 
                                        ? "bg-primary/80" 
                                        : "bg-black/20 hover:bg-black/40"
                                )}
                            >
                                {option.icon}
                                <span className="text-xs text-center">{option.label}</span>
                            </button>
                        ))}
                    </div>
                    <div className="mt-4 grid grid-cols-1 md:grid-cols-3 gap-2 items-center bg-background p-2 rounded-lg">
                        <div className="relative md:col-span-2">
                            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" />
                            <Input placeholder="Search by Location" className="pl-10 text-foreground border-none focus-visible:ring-0" />
                        </div>
                        <div className="flex items-center gap-2">
                            <Select value={selectedFilter} onValueChange={setSelectedFilter}>
                                <SelectTrigger className="text-foreground focus:ring-0">
                                    <SelectValue placeholder="Select Type" />
                                </SelectTrigger>
                                <SelectContent>
                                    {filterOptions.map(option => (
                                        <SelectItem key={option.value} value={option.value}>{option.label}</SelectItem>
                                    ))}
                                </SelectContent>
                            </Select>
                            <Button size="icon" className="bg-accent hover:bg-accent/90 shrink-0">
                                <Search className="h-5 w-5 text-accent-foreground" />
                            </Button>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
}
