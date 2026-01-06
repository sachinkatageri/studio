
"use client";

import Header from "@/components/layout/header";
import Footer from "@/components/layout/footer";
import { Button } from "@/components/ui/button";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";
import { properties } from "@/lib/properties";
import { ChevronDown, ListFilter, LayoutGrid, LayoutList } from "lucide-react";
import { useState } from "react";
import { useSearchParams } from 'next/navigation';
import PropertyCard from "./_components/property-card";
import { cn } from "@/lib/utils";
import { Tooltip, TooltipProvider, TooltipTrigger, TooltipContent } from "@/components/ui/tooltip";
import { useIsMobile } from "@/hooks/use-mobile";

export default function PropertiesPage() {
    const searchParams = useSearchParams();
    const city = searchParams.get('city') || 'All Cities';
    const category = searchParams.get('category');
    
    const [view, setView] = useState<'list' | 'grid'>('grid');
    const isMobile = useIsMobile();
    
    const filteredProperties = properties.filter(p => {
        let matches = true;
        if (category && category.toLowerCase().includes('commercial')) {
            matches = p.type === 'Commercial';
        } else if (category && category.toLowerCase().includes('residential')) {
            matches = p.type === 'Residential';
        }
        return matches;
    });

    const pageTitle = category ? `${category} in ${city}` : `Properties in ${city}`;

    return (
        <>
            <Header />
            <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-20 md:py-24">
                <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8 gap-4">
                    <div>
                        <h1 className="text-2xl md:text-3xl font-bold">{pageTitle}</h1>
                        <p className="text-sm text-muted-foreground mt-1">{filteredProperties.length} results found</p>
                    </div>
                     <div className="flex w-full md:w-auto items-center gap-2">
                        <DropdownMenu>
                            <DropdownMenuTrigger asChild>
                                <Button variant="outline" className="flex-1 md:flex-initial">
                                    Sort by: Relevance
                                    <ChevronDown className="ml-2 h-4 w-4" />
                                </Button>
                            </DropdownMenuTrigger>
                            <DropdownMenuContent align="end">
                                <DropdownMenuItem>Relevance</DropdownMenuItem>
                                <DropdownMenuItem>Price: Low to High</DropdownMenuItem>
                                <DropdownMenuItem>Price: High to Low</DropdownMenuItem>
                                <DropdownMenuItem>Newest First</DropdownMenuItem>
                            </DropdownMenuContent>
                        </DropdownMenu>
                        <Button variant="outline" size="icon" className="shrink-0">
                            <ListFilter className="h-4 w-4" />
                        </Button>
                         <div className="hidden md:flex items-center bg-muted rounded-lg p-1 ml-auto md:ml-0">
                            <TooltipProvider>
                                <Tooltip>
                                    <TooltipTrigger asChild>
                                        <Button variant="ghost" size="icon" className={cn("h-8 w-8", view === 'list' && "bg-background shadow-sm")} onClick={() => setView('list')}>
                                            <LayoutList className="h-4 w-4" />
                                        </Button>
                                    </TooltipTrigger>
                                    <TooltipContent>
                                        <p>List View</p>
                                    </TooltipContent>
                                </Tooltip>
                                <Tooltip>
                                    <TooltipTrigger asChild>
                                        <Button variant="ghost" size="icon" className={cn("h-8 w-8", view === 'grid' && "bg-background shadow-sm")} onClick={() => setView('grid')}>
                                            <LayoutGrid className="h-4 w-4" />
                                        </Button>
                                    </TooltipTrigger>
                                    <TooltipContent>
                                        <p>Grid View</p>
                                    </TooltipContent>
                                </Tooltip>
                            </TooltipProvider>
                        </div>
                    </div>
                </div>

                <div className={cn(
                    "grid gap-6",
                    view === 'list' ? "grid-cols-1" : "grid-cols-1 sm:grid-cols-2 lg:grid-cols-3"
                )}>
                    {filteredProperties.map(property => (
                        <PropertyCard key={property.id} property={property} view={view} />
                    ))}
                </div>
            </div>
            <Footer />
        </>
    );
}
