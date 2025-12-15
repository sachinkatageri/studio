
"use client";

import { Button } from '@/components/ui/button';
import { Layers, List, PanelLeft } from 'lucide-react';
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
