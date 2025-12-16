
"use client";

import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Layers, PanelLeft, Search, SlidersHorizontal, ChevronLeft, ChevronRight, Check, Map, Satellite, Globe, Mountain, TrafficCone, MapPin, LocateFixed, ZoomIn, ZoomOut, PlusCircle } from 'lucide-react';
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
import { properties } from '@/lib/properties';

interface MapViewProps {
  isSidebarOpen: boolean;
  toggleSidebar: () => void;
  onFilterClick: () => void;
  areFiltersApplied: boolean;
  selectedPropertyId: string | null;
  onCloseInfoCard: () => void;
  onMarkerClick: (id: string) => void;
  onViewDetails: (id: string) => void;
}

type MapType = 'default' | 'satellite' | 'hybrid' | 'terrain';

const propertyPositions = [
  { id: 'wework', top: '35%', left: '40%' },
  { id: '91springboard', top: '50%', left: '60%' },
  { id: 'shop-boduppal', top: '65%', left: '30%' },
  { id: 'godown-moula-ali', top: '80%', left: '50%' },
  { id: 'project-1', top: '45%', left: '20%' },
  { id: 'project-2', top: '60%', left: '80%' },
];

export default function MapView({ isSidebarOpen, toggleSidebar, onFilterClick, areFiltersApplied, selectedPropertyId, onCloseInfoCard, onMarkerClick, onViewDetails }: MapViewProps) {
  const [mapType, setMapType] = useState<MapType>('hybrid');
  const isMobile = useIsMobile();

  const mapImages = {
    default: 'https://picsum.photos/seed/map-default/1920/1080',
    satellite: 'https://picsum.photos/seed/map-satellite/1920/1080',
    hybrid: 'https://images.unsplash.com/photo-1569336415962-a4bd9f69cd83?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3NDE5ODJ8MHwxfHNlYXJjaHwyfHxnb29nbGUlMjBtYXB8ZW58MHx8fHwxNzY1ODc0NjQyfDA&ixlib=rb-4.1.0&q=80&w=1080',
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
      
      {propertyPositions.map(pos => {
        const property = properties.find(p => p.id === pos.id);
        if (!property) return null;
        return (
          <TooltipProvider key={pos.id}>
            <Tooltip>
              <TooltipTrigger asChild>
                <div 
                  className="absolute z-10 -translate-x-1/2 -translate-y-full cursor-pointer" 
                  style={{ top: pos.top, left: pos.left }}
                  onClick={() => onMarkerClick(pos.id)}
                >
                  <div className={cn(
                      "flex items-center gap-1 p-1 rounded-full shadow-lg transition-colors",
                      selectedPropertyId === pos.id ? 'bg-primary text-primary-foreground' : 'bg-background'
                    )}>
                    <MapPin className={cn(
                      "h-5 w-5",
                      selectedPropertyId === pos.id ? 'text-white fill-white' : 'text-primary fill-current'
                    )} />
                    <span className="text-xs font-bold pr-2 whitespace-nowrap">₹{property.pricePerSqFt}</span>
                  </div>
                  <div className={cn(
                    "w-2 h-2 rounded-full mx-auto shadow-lg",
                    selectedPropertyId === pos.id ? "bg-primary" : "bg-background"
                    )}></div>
                </div>
              </TooltipTrigger>
              <TooltipContent>
                <p>{property.name}</p>
              </TooltipContent>
            </Tooltip>
          </TooltipProvider>
        );
      })}

      <div className="absolute top-4 left-4 right-4 z-10 flex justify-between items-center gap-2">
        <div className="relative flex-1 max-w-lg">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground pointer-events-none" />
          <Input
            type="text"
            placeholder="Search for property, project, or builder..."
            className="w-full pl-10 pr-12 h-12 text-foreground shadow-lg"
          />
          <Button 
            variant={areFiltersApplied ? "default" : "ghost"} 
            size="icon" 
            className="absolute right-1 top-1/2 -translate-y-1/2 h-10 w-10" 
            onClick={onFilterClick}
          >
            <SlidersHorizontal />
          </Button>
        </div>
        <Button className="bg-accent text-accent-foreground hover:bg-accent/90 shadow-lg h-12 flex-shrink-0 hidden md:flex">
          <PlusCircle className="mr-2 h-5 w-5" /> List my property
        </Button>
    </div>

       <div className="absolute bottom-4 left-4 z-10">
          <Popover>
            <PopoverTrigger asChild>
              <Button variant="ghost" size="icon" className="shadow-lg h-12 w-12 bg-background/80 backdrop-blur-sm hover:bg-background/90 border">
                <Layers className="text-foreground" />
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
        <div className="absolute bottom-4 left-1/2 -translate-x-1/2 z-20">
          <PropertyInfoCard propertyId={selectedPropertyId} onClose={onCloseInfoCard} onViewDetails={onViewDetails} />
        </div>
       )}

       <div className="absolute bottom-4 right-4 z-10 flex flex-col items-center gap-2">
           <div className="flex flex-col bg-background/80 backdrop-blur-sm border rounded-lg shadow-lg">
                <Button variant="ghost" size="icon" className="h-12 w-12">
                   <LocateFixed />
                </Button>
                <Separator />
                <Button variant="ghost" size="icon" className="h-12 w-12">
                   <ZoomIn />
                </Button>
                <Separator />
                <Button variant="ghost" size="icon" className="h-12 w-12">
                   <ZoomOut />
                </Button>
           </div>
       </div>
       
       {isMobile && (
          <PropertyDetailsSheet propertyId={selectedPropertyId} onClose={onCloseInfoCard} onViewDetails={onViewDetails} />
       )}

    </div>
  );
}

    