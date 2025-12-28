

"use client";

import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Layers, PanelLeft, Search, SlidersHorizontal, ChevronLeft, ChevronRight, Check, Map, Satellite, Globe, Mountain, TrafficCone, MapPin, LocateFixed, ZoomIn, ZoomOut, PlusCircle, List, Heart, Share2, Navigation, Building, Home, Menu } from 'lucide-react';
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
import { useState, useEffect } from 'react';
import { PropertyInfoCard } from './property-info-card';
import { PropertyDetailsSheet } from './property-details-sheet';
import { useIsMobile } from '@/hooks/use-mobile';
import { properties } from '@/lib/properties';
import type { MobileView } from '@/app/page';
import { LayersDeclarationDialog } from '../layout/layers-declaration-dialog';
import { LayersDialog } from '../layout/layers-dialog';
import { Drawer } from 'vaul';
import { ListPropertySheet } from '../layout/list-property-sheet';
import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from '../ui/carousel';

interface MapViewProps {
  isSidebarOpen: boolean;
  toggleSidebar: () => void;
  onFilterClick: () => void;
  areFiltersApplied: boolean;
  selectedPropertyId: string | null;
  onCloseInfoCard: () => void;
  onMarkerClick: (id: string) => void;
  onViewDetails: (id: string) => void;
  setMobileView?: (view: MobileView) => void;
  children?: React.ReactNode;
}

const propertyPositions = [
  { id: 'wework', top: '35%', left: '40%' },
  { id: '91springboard', top: '50%', left: '60%' },
  { id: 'shop-boduppal', top: '65%', left: '30%' },
  { id: 'godown-moula-ali', top: '80%', left: '50%' },
  { id: 'project-1', top: '45%', left: '20%' },
  { id: 'project-2', top: '60%', left: '80%' },
];

export default function MapView({ isSidebarOpen, toggleSidebar, onFilterClick, areFiltersApplied, selectedPropertyId, onCloseInfoCard, onMarkerClick, onViewDetails, setMobileView, children }: MapViewProps) {
  const [isLayersDeclarationOpen, setIsLayersDeclarationOpen] = useState(false);
  const [isLayersDialogOpen, setIsLayersDialogOpen] = useState(false);
  const [isGpsActive, setIsGpsActive] = useState(false);
  const [isListPropertySheetOpen, setIsListPropertySheetOpen] = useState(false);
  const isMobile = useIsMobile();

  const mapImages = {
    hybrid: 'https://i.pinimg.com/736x/e4/44/82/e4448285ad21f8c19b7d30d1fd740b71.jpg',
  };

  const mapHints = {
    hybrid: 'satellite map',
  };

  const handleLayersClick = () => {
    setIsLayersDeclarationOpen(true);
  }

  const handleDeclarationProceed = () => {
    setIsLayersDialogOpen(true);
  }

  const toggleGps = () => {
    setIsGpsActive(prev => !prev);
    // TODO: Add logic to actually get and track user location
  }

  const handleNextProperty = () => {
    if (!selectedPropertyId) return;
    const currentIndex = properties.findIndex(p => p.id === selectedPropertyId);
    const nextIndex = (currentIndex + 1) % properties.length;
    onMarkerClick(properties[nextIndex].id);
  };

  const handlePrevProperty = () => {
    if (!selectedPropertyId) return;
    const currentIndex = properties.findIndex(p => p.id === selectedPropertyId);
    const prevIndex = (currentIndex - 1 + properties.length) % properties.length;
    onMarkerClick(properties[prevIndex].id);
  };


  const initialIndex = selectedPropertyId ? properties.findIndex(p => p.id === selectedPropertyId) : -1;

  return (
    <>
    <div className="relative h-full w-full">
      <Image
        src={mapImages.hybrid}
        alt="Map of Bengaluru"
        fill
        objectFit="cover"
        className="z-0"
        data-ai-hint={mapHints.hybrid}
      />
      
      {propertyPositions.map(pos => {
        const property = properties.find(p => p.id === pos.id);
        if (!property) return null;

        const MarkerIcon = property.type === 'Commercial' ? Building : Home;
        
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
                    <MarkerIcon className={cn(
                      "h-5 w-5",
                      selectedPropertyId === pos.id ? 'text-white' : 'text-primary'
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

       {isMobile && children}

       <div className={cn(
           "absolute right-4 z-10 flex flex-col items-center gap-2 transition-all duration-300",
            "bottom-20",
            selectedPropertyId && "bottom-[22rem]"
        )}>
            <TooltipProvider>
                <div className="flex flex-col bg-background/80 backdrop-blur-sm border rounded-lg shadow-lg">
                    <Tooltip>
                        <TooltipTrigger asChild>
                            <Button variant="ghost" size="icon" className="h-12 w-12" onClick={() => setIsListPropertySheetOpen(true)}>
                                <PlusCircle />
                            </Button>
                        </TooltipTrigger>
                        <TooltipContent side="left">
                            <p>List Property</p>
                        </TooltipContent>
                    </Tooltip>
                    <Separator />
                    <Tooltip>
                        <TooltipTrigger asChild>
                            <Button 
                                variant="ghost" 
                                size="icon" 
                                className="h-12 w-12" 
                                onClick={toggleGps}
                            >
                               <LocateFixed className={cn(
                                   isGpsActive ? "text-green-500" : "text-red-500"
                               )} />
                            </Button>
                        </TooltipTrigger>
                        <TooltipContent side="left">
                            <p>{isGpsActive ? "Tracking current location" : "Recenter to current location"}</p>
                        </TooltipContent>
                    </Tooltip>
                    <Separator />
                     <Tooltip>
                        <TooltipTrigger asChild>
                            <Button variant="ghost" size="icon" className="h-12 w-12" onClick={handleLayersClick}>
                                <Layers />
                            </Button>
                        </TooltipTrigger>
                        <TooltipContent side="left">
                            <p>Map Layers</p>
                        </TooltipContent>
                    </Tooltip>
                </div>
            </TooltipProvider>
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
            <div className="absolute bottom-4 left-0 right-0 w-full z-20 flex justify-center items-center">
                <PropertyInfoCard
                    propertyId={selectedPropertyId}
                    onClose={onCloseInfoCard}
                    onViewDetails={onViewDetails}
                    onNext={handleNextProperty}
                    onPrev={handlePrevProperty}
                />
            </div>
        )}
       
       {isMobile && (
          <PropertyDetailsSheet propertyId={selectedPropertyId} onClose={onCloseInfoCard} onViewDetails={onViewDetails} onNext={handleNextProperty} onPrev={handlePrevProperty} />
       )}

    </div>
    <LayersDeclarationDialog 
      open={isLayersDeclarationOpen} 
      onOpenChange={setIsLayersDeclarationOpen}
      onProceed={handleDeclarationProceed}
    />
    <LayersDialog
        open={isLayersDialogOpen}
        onOpenChange={setIsLayersDialogOpen}
    />
    <ListPropertySheet open={isListPropertySheetOpen} onOpenChange={setIsListPropertySheetOpen} />
    </>
  );
}
