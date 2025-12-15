"use client";

import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Layers, PanelLeft, Search, SlidersHorizontal } from 'lucide-react';
import Image from 'next/image';

interface MapViewProps {
  isSidebarOpen: boolean;
  toggleSidebar: () => void;
}

export default function MapView({ isSidebarOpen, toggleSidebar }: MapViewProps) {

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
            <Button variant="secondary" size="icon" className="shadow-lg h-12 w-12 flex-shrink-0">
              <SlidersHorizontal />
            </Button>
        </div>
      </div>

       <div className="absolute top-20 left-4 z-10 flex flex-col gap-2">
         <Button variant="secondary" size="icon" className="shadow-lg">
           <Layers />
         </Button>
       </div>
      
       <div className="absolute bottom-24 left-4 z-10 flex flex-col gap-2">
         <Button variant="secondary" size="icon" className="shadow-lg" onClick={toggleSidebar}>
           <PanelLeft className="h-5 w-5" />
         </Button>
       </div>

    </div>
  );
}
