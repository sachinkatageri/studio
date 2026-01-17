"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { cn } from "@/lib/utils";
import { Building, Building2, Search, Users, Wallet, Columns, LayoutGrid, SlidersHorizontal } from "lucide-react";
import Image from "next/image";
import { useState } from "react";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { Label } from "@/components/ui/label";
import { Separator } from "@/components/ui/separator";
import { Drawer, DrawerContent, DrawerHeader, DrawerTitle, DrawerDescription, DrawerTrigger } from "@/components/ui/drawer";
import { useIsMobile } from "@/hooks/use-mobile";

const filterOptions = [
    { label: "Managed Space", value: "managed-space", icon: <Building className="h-5 w-5" /> },
    { label: "Unmanaged Space", value: "unmanaged-space", icon: <Building2 className="h-5 w-5" /> },
    { label: "Coworking Dedicated", value: "coworking-dedicated", icon: <Users className="h-5 w-5" /> },
    { label: "Coworking Shared", value: "coworking-shared", icon: <Users className="h-5 w-5" /> },
    { label: "Price Per Desk", value: "price-per-desk", icon: <Wallet className="h-5 w-5" /> },
    { label: "Price Per Sqft", value: "price-per-sqft", icon: <Columns className="h-5 w-5" /> },
    { label: "No. Of Seats", value: "no-of-seats", icon: <LayoutGrid className="h-5 w-5" /> },
]

const PreferencesContent = () => (
    <div className="space-y-4">
        <div className="grid grid-cols-2 items-center gap-4">
            <div className="space-y-1">
                <Label htmlFor="price-per-desk" className="font-bold">Price per Desk</Label>
                <p className="text-xs text-muted-foreground">Select your budget</p>
            </div>
            <Select>
                <SelectTrigger id="price-per-desk" className="w-full">
                    <SelectValue placeholder="₹2000-4000" />
                </SelectTrigger>
                <SelectContent>
                    <SelectItem value="2000-4000">₹2000-4000</SelectItem>
                    <SelectItem value="4000-6000">₹4000-6000</SelectItem>
                    <SelectItem value="6000-8000">₹6000-8000</SelectItem>
                </SelectContent>
            </Select>
        </div>
        <Separator />
        <div className="grid grid-cols-2 items-center gap-4">
            <div className="space-y-1">
                <Label htmlFor="price-per-sqft" className="font-bold">Price per Sqft</Label>
                <p className="text-xs text-muted-foreground">Select your budget</p>
            </div>
            <Select>
                <SelectTrigger id="price-per-sqft" className="w-full">
                    <SelectValue placeholder="N/A" />
                </SelectTrigger>
                <SelectContent>
                    <SelectItem value="na">N/A</SelectItem>
                    <SelectItem value="50-100">₹50-100</SelectItem>
                    <SelectItem value="100-150">₹100-150</SelectItem>
                </SelectContent>
            </Select>
        </div>
        <Separator />
        <div className="grid grid-cols-2 items-center gap-4">
             <div className="space-y-1">
                <Label htmlFor="no-of-seats" className="font-bold">No. of Seats</Label>
                <p className="text-xs text-muted-foreground">How many people?</p>
            </div>
            <Select>
                <SelectTrigger id="no-of-seats" className="w-full">
                    <SelectValue placeholder="less than 10" />
                </SelectTrigger>
                <SelectContent>
                    <SelectItem value="lt10">less than 10</SelectItem>
                    <SelectItem value="10-20">10-20</SelectItem>
                    <SelectItem value="20-50">20-50</SelectItem>
                    <SelectItem value="gt50">50+</SelectItem>
                </SelectContent>
            </Select>
        </div>
    </div>
);

const ResponsivePreferences = () => {
    const isMobile = useIsMobile();
    const [open, setOpen] = useState(false);

    const trigger = (
        <Button variant="outline" className="w-full justify-start text-left font-normal text-muted-foreground">
            <SlidersHorizontal className="mr-2 h-4 w-4" />
            Preferences
        </Button>
    );
    
    if (isMobile === undefined) {
        return trigger; // Or a skeleton loader
    }

    if (isMobile) {
        return (
            <Drawer open={open} onOpenChange={setOpen}>
                <DrawerTrigger asChild>{trigger}</DrawerTrigger>
                <DrawerContent>
                    <DrawerHeader>
                        <DrawerTitle>Preferences</DrawerTitle>
                        <DrawerDescription>
                            Set your preferences to filter properties.
                        </DrawerDescription>
                    </DrawerHeader>
                    <div className="p-4">
                        <PreferencesContent />
                    </div>
                </DrawerContent>
            </Drawer>
        );
    }

    return (
        <Popover open={open} onOpenChange={setOpen}>
            <PopoverTrigger asChild>{trigger}</PopoverTrigger>
            <PopoverContent className="w-80 p-4" align="end">
                <PreferencesContent />
            </PopoverContent>
        </Popover>
    );
};


export default function Hero() {
    const [selectedFilter, setSelectedFilter] = useState("managed-space");

    return (
        <section className="relative h-[550px] flex items-center justify-center text-center text-white">
            <Image 
                src="https://picsum.photos/seed/commercial-hero/1920/1080"
                alt="Modern living room"
                fill
                className="object-cover"
                data-ai-hint="modern living room"
            />
            <div className="absolute inset-0 bg-black/50" />
            <div className="relative z-10 container mx-auto px-4">
                <h1 className="text-4xl md:text-5xl font-bold font-headline">Embrace The Era of <span className="text-accent">Brokerage Free</span> Real Estate</h1>
                <div className="mt-8 bg-background/20 backdrop-blur-sm rounded-2xl p-4 max-w-4xl mx-auto">
                    <div className="grid grid-cols-4 md:grid-cols-7 gap-2">
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
                    <div className="mt-4 grid grid-cols-1 md:grid-cols-4 gap-2 items-center bg-background p-2 rounded-lg">
                        <div className="relative md:col-span-2">
                            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" />
                            <Input placeholder="Search by Location" className="pl-10 text-foreground border-none focus-visible:ring-0" />
                        </div>
                        <Select value={selectedFilter} onValueChange={setSelectedFilter}>
                            <SelectTrigger className="text-foreground border focus:ring-0">
                                <SelectValue placeholder="Select Space Type" />
                            </SelectTrigger>
                            <SelectContent>
                                {filterOptions.map(option => (
                                     <SelectItem key={option.value} value={option.value}>{option.label}</SelectItem>
                                ))}
                            </SelectContent>
                        </Select>
                        <div className="flex items-center gap-2">
                           <ResponsivePreferences />
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
