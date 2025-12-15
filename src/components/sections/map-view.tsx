
"use client";

import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Layers, PanelLeft, Search, SlidersHorizontal, ChevronLeft, ChevronRight, Check, Map, Satellite, Globe, Mountain, TrafficCone } from 'lucide-react';
import Image from 'next/image';
import { cn } from '@/lib/utils';
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip"
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { Separator } from '../ui/separator';
import { useState } from 'react';
import { PropertyInfoCard } from './property-info-card';
import { PropertyDetailsSheet } from './property-details-sheet';
import { useIsMobile } from '@/hooks/use-mobile';

interface MapViewProps {
  isSidebarOpen: boolean;
  toggleSidebar: () => void;
  onFilterClick: () => void;
  areFiltersApplied: boolean;
  selectedPropertyId: string | null;
  onCloseInfoCard: () => void;
}

type MapType = 'default' | 'satellite' | 'hybrid' | 'terrain';

export default function MapView({ isSidebarOpen, toggleSidebar, onFilterClick, areFiltersApplied, selectedPropertyId, onCloseInfoCard }: MapViewProps) {
  const [mapType, setMapType] = useState<MapType>('hybrid');
  const isMobile = useIsMobile();

  const mapImages = {
    default: 'https://picsum.photos/seed/map-default/1920/1080',
    satellite: 'https://picsum.photos/seed/map-satellite/1920/1080',
    hybrid: 'https://picsum.photos/seed/map/1920/1080',
    terrain: 'https://picsum.photos/seed/map-terrain/1920/1080'
  };

  const mapHints = {
    default: 'street map',
    satellite: 'satellite imagery',
    hybrid: 'satellite map',
    terrain: 'terrain map'
  };

  return (
    <div className="relative h-full w-full">
      <Image
        src={mapImages[mapType]}
        alt="Map of Bengaluru"
        layout="fill"
        objectFit="cover"
        className="z-0"
        data-ai-hint={mapHints[mapType]}
      />
      
      <div className="absolute top-4 left-1/2 -translate-x-1/2 z-10 w-full max-w-md px-4 md:px-0">
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

       <div className="absolute bottom-4 left-4 z-10 flex flex-col gap-2">
          <Popover>
            <PopoverTrigger asChild>
              <Button variant="secondary" size="icon" className="shadow-lg h-12 w-12">
                <Layers />
              </Button>
            </PopoverTrigger>
            <PopoverContent className="w-60 p-2">
                <div className="space-y-1">
                    <h3 className="px-2 py-1.5 text-sm font-semibold">Map Type</h3>
                    <div className="space-y-1">
                        <Button variant={mapType === 'default' ? 'secondary' : 'ghost'} className="w-full justify-start" onClick={() => setMapType('default')}>
                            <Map className="mr-2 h-4 w-4" /> Default {mapType === 'default' && <Check className="ml-auto h-4 w-4" />}
                        </Button>
                        <Button variant={mapType === 'satellite' ? 'secondary' : 'ghost'} className="w-full justify-start" onClick={() => setMapType('satellite')}>
                            <Satellite className="mr-2 h-4 w-4" /> Satellite {mapType === 'satellite' && <Check className="ml-auto h-4 w-4" />}
                        </Button>
                        <Button variant={mapType === 'hybrid' ? 'secondary' : 'ghost'} className="w-full justify-start" onClick={() => setMapType('hybrid')}>
                            <Globe className="mr-2 h-4 w-4" /> Hybrid {mapType === 'hybrid' && <Check className="ml-auto h-4 w-4" />}
                        </Button>
                        <Button variant={mapType === 'terrain' ? 'secondary' : 'ghost'} className="w-full justify-start" onClick={() => setMapType('terrain')}>
                            <Mountain className="mr-2 h-4 w-4" /> Terrain {mapType === 'terrain' && <Check className="ml-auto h-4 w-4" />}
                        </Button>
                    </div>
                    <Separator className="my-2" />
                    <h3 className="px-2 py-1.5 text-sm font-semibold">Layers</h3>
                    <Button variant='ghost' className="w-full justify-start">
                        <TrafficCone className="mr-2 h-4 w-4" /> Traffic
                    </Button>
                </div>
            </PopoverContent>
          </Popover>
       </div>
      
       <TooltipProvider>
        <div className={cn(
            "absolute top-1/2 -translate-y-1/2 z-10 transition-all duration-300",
            "hidden md:block",
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

       {selectedPropertyId && !isMobile && (
        <div className="absolute bottom-4 right-4 z-10">
          <PropertyInfoCard propertyId={selectedPropertyId} onClose={onCloseInfoCard} />
        </div>
       )}
       
       {isMobile && (
          <PropertyDetailsSheet propertyId={selectedPropertyId} onClose={onCloseInfoCard} />
       )}

    </div>
  );
}
