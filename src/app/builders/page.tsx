
"use client";

import Header from "@/components/layout/header";
import { Button } from "@/components/ui/button";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";
import { builders } from "@/lib/builders";
import { ChevronDown, ListFilter, LayoutGrid, LayoutList } from "lucide-react";
import BuilderCard from "./_components/builder-card";
import Footer from "@/components/layout/footer";
import { useState } from "react";
import { cn } from "@/lib/utils";

export default function BuildersPage() {
    const [view, setView] = useState<'list' | 'grid'>('grid');
    const [location, setLocation] = useState('Bangalore');

    const locations = ['Bangalore', 'Mumbai', 'Delhi', 'Chennai', 'Hyderabad'];

    return (
        <>
            <Header />
            <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-20 md:py-24">
                <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8 gap-4">
                    <div>
                        <h1 className="text-3xl font-bold">Builders in {location}</h1>
                        <p className="text-muted-foreground mt-1">{builders.length} results</p>
                    </div>
                    <div className="flex w-full md:w-auto items-center gap-2">
                        <DropdownMenu>
                            <DropdownMenuTrigger asChild>
                                <Button variant="outline" className="flex-1 md:flex-initial">
                                    {location}
                                    <ChevronDown className="ml-2 h-4 w-4" />
                                </Button>
                            </DropdownMenuTrigger>
                            <DropdownMenuContent align="end">
                                {locations.map(loc => (
                                    <DropdownMenuItem key={loc} onClick={() => setLocation(loc)}>
                                        {loc}
                                    </DropdownMenuItem>
                                ))}
                            </DropdownMenuContent>
                        </DropdownMenu>
                        <DropdownMenu>
                            <DropdownMenuTrigger asChild>
                                <Button variant="outline" className="flex-1 md:flex-initial">
                                    Sort by: Property
                                    <ChevronDown className="ml-2 h-4 w-4" />
                                </Button>
                            </DropdownMenuTrigger>
                            <DropdownMenuContent align="end">
                                <DropdownMenuItem>Property</DropdownMenuItem>
                                <DropdownMenuItem>Experience</DropdownMenuItem>
                                <DropdownMenuItem>Total Projects</DropdownMenuItem>
                            </DropdownMenuContent>
                        </DropdownMenu>
                        <Button variant="outline" size="icon" className="shrink-0">
                            <ListFilter className="h-4 w-4" />
                        </Button>
                         <div className="flex items-center bg-muted rounded-lg p-1 ml-auto md:ml-0">
                            <Button variant="ghost" size="icon" className={cn("h-8 w-8", view === 'list' && "bg-background shadow-sm")} onClick={() => setView('list')}>
                                <LayoutList className="h-4 w-4" />
                            </Button>
                            <Button variant="ghost" size="icon" className={cn("h-8 w-8", view === 'grid' && "bg-background shadow-sm")} onClick={() => setView('grid')}>
                                <LayoutGrid className="h-4 w-4" />
                            </Button>
                        </div>
                    </div>
                </div>

                <div className={cn(
                    view === 'list' 
                        ? "space-y-6" 
                        : "grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6"
                )}>
                    {builders.map(builder => (
                        <BuilderCard key={builder.id} builder={builder} view={view} />
                    ))}
                </div>
            </div>
            <Footer />
        </>
    );
}
