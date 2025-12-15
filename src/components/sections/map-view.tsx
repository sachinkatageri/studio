

"use client";

import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Layers, PanelLeft, Search, SlidersHorizontal, ChevronLeft, ChevronRight } from 'lucide-react';
import Image from 'next/image';
import { cn } from '@/lib/utils';
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip"


interface MapViewProps {
  isSidebarOpen: boolean;
  toggleSidebar: () => void;
  onFilterClick: () => void;
  areFiltersApplied: boolean;
}

export default function MapView({ isSidebarOpen, toggleSidebar, onFilterClick, areFiltersApplied }: MapViewProps) {

  return (
    <div className="relative h-full w-full">
      <Image
        src="https://picsum.photos/seed/map/1920/1080"
        alt="Map of Bengaluru"
        layout="fill"
        objectFit="cover"
        className="z-0"
        data-ai-hint="satellite map"
      />
      
      <div className="absolute top-4 left-1/2 -translate-x-1/2 z-10 w-full max-w-md">
        <div className="relative flex items-center gap-2">
            <div className="relative w-full">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" />
              <Input
                type="text"
                placeholder="Search for property, project, or builder..."
                className="w-full pl-10 h-12 text-foreground shadow-lg"
              />
            </div>
            <Button 
              variant={areFiltersApplied ? "default" : "secondary"} 
              size="icon" 
              className="shadow-lg h-12 w-12 flex-shrink-0" 
              onClick={onFilterClick}
            >
              <SlidersHorizontal />
            </Button>
        </div>
      </div>

       <div className="absolute top-20 left-4 z-10 flex flex-col gap-2">
         <Button variant="secondary" size="icon" className="shadow-lg">
           <Layers />
         </Button>
       </div>
      
       <TooltipProvider>
        <div className={cn(
            "absolute top-1/2 -translate-y-1/2 z-10 transition-all duration-300",
            isSidebarOpen ? "left-0" : "left-0"
            )}>
            <Tooltip>
                <TooltipTrigger asChild>
                    <Button variant="secondary" size="icon" className="rounded-l-none h-20 w-8 p-1" onClick={toggleSidebar}>
                        {isSidebarOpen ? <ChevronLeft className="h-6 w-6" /> : <ChevronRight className="h-6 w-6" />}
                    </Button>
                </TooltipTrigger>
                <TooltipContent side="right">
                    <p>{isSidebarOpen ? "Collapse side panel" : "Expand side panel"}</p>
                </TooltipContent>
            </Tooltip>
        </div>
       </TooltipProvider>

    </div>
  );
}
