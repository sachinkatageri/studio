
"use client";

import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogClose,
} from "@/components/ui/dialog";
import { Drawer, DrawerContent, DrawerHeader, DrawerTitle, DrawerClose, DrawerFooter } from "@/components/ui/drawer";
import { Button } from "@/components/ui/button";
import { ArrowRight, Check, ChevronDown, Crown, Info, Map, Train, X } from "lucide-react";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "../ui/accordion";
import { Badge } from "../ui/badge";
import { ScrollArea } from "../ui/scroll-area";
import { useState } from "react";
import { cn } from "@/lib/utils";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "../ui/select";
import { useIsMobile } from "@/hooks/use-mobile";

interface LayersDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

const layerGroups = {
    karnataka: [
        { name: "Survey No.S", icon: <SurveyIcon />, premium: false },
        { name: "Listings", icon: <ListingsIcon />, premium: false, selected: true },
    ],
    bengaluru: [
        { name: "Bengaluru Masterplan", icon: <Map className="w-8 h-8" />, premium: true, info: true },
        { name: "Anekal Masterplan", icon: <Map className="w-8 h-8" />, premium: true },
        { name: "Nelamangala Masterplan", icon: <Map className="w-8 h-8" />, premium: true },
        { name: "Hoskote Masterplan", icon: <Map className="w-8 h-8" />, premium: true },
        { name: "Chikkaballapura Masterplan", icon: <Map className="w-8 h-8" />, premium: true },
        { name: "Bengaluru Masterplan Roads", icon: <RoadsIcon />, premium: true },
        { name: "Metro Lines", icon: <Train className="w-8 h-8" />, premium: false },
        { name: "STRR", icon: <STRRIcon />, premium: false },
        { name: "Highways", icon: <HighwayIcon />, premium: false },
    ]
}

function SurveyIcon() {
    return (
        <div className="relative w-8 h-8">
            <svg width="100%" height="100%" viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M4 12L16 6L28 12L16 18L4 12Z" stroke="currentColor" strokeWidth="2" strokeLinejoin="round"/>
                <path d="M4 20L16 14" stroke="currentColor" strokeWidth="2" strokeLinejoin="round"/>
                <path d="M4 20V12" stroke="currentColor" strokeWidth="2" strokeLinejoin="round"/>
                <path d="M16 26V18" stroke="currentColor" strokeWidth="2" strokeLinejoin="round"/>
                <path d="M28 20V12" stroke="currentColor" strokeWidth="2" strokeLinejoin="round"/>
                <path d="M16 26L4 20" stroke="currentColor" strokeWidth="2" strokeLinejoin="round"/>
                <path d="M28 20L16 26" stroke="currentColor" strokeWidth="2" strokeLinejoin="round"/>
            </svg>
            <span className="absolute bottom-0 right-0 text-xs font-bold bg-background px-0.5">24</span>
        </div>
    )
}

function ListingsIcon() {
     return (
        <svg width="32" height="32" viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg">
            <rect x="4" y="4" width="24" height="24" rx="4" stroke="currentColor" strokeWidth="2" stroke-dasharray="4 4"/>
            <circle cx="10" cy="10" r="1.5" fill="currentColor"/>
            <circle cx="16" cy="12" r="1.5" fill="currentColor"/>
            <circle cx="22" cy="10" r="1.5" fill="currentColor"/>
            <circle cx="12" cy="18" r="1.5" fill="currentColor"/>
            <circle cx="20" cy="18" r="1.5" fill="currentColor"/>
            <circle cx="16" cy="22" r="1.5" fill="currentColor"/>
        </svg>
    )
}

function RoadsIcon() {
    return (
        <svg width="32" height="32" viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M16 4V28" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
            <path d="M4 16H28" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
            <path d="M12 12H20V20H12V12Z" fill="currentColor" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
        </svg>
    )
}

function STRRIcon() {
    return (
        <svg width="32" height="32" viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M28 16C28 22.6274 22.6274 28 16 28C9.37258 28 4 22.6274 4 16C4 9.37258 9.37258 4 16 4" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
            <path d="M28 16H20" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
        </svg>
    )
}

function HighwayIcon() {
    return (
        <svg width="32" height="32" viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M6 4V28" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
            <path d="M26 4V28" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
            <path d="M16 5V7" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
            <path d="M16 11V13" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
            <path d="M16 17V19" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
            <path d="M16 23V25" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
        </svg>
    )
}


const LayersContent = ({ onApply }: { onApply: () => void }) => {
  const [selectedLayers, setSelectedLayers] = useState<string[]>(['Listings']);
  const [activeCity, setActiveCity] = useState<string>('Bengaluru');

  const toggleLayer = (name: string) => {
    setSelectedLayers(prev => 
        prev.includes(name) ? prev.filter(l => l !== name) : [...prev, name]
    )
  }

  const handleClear = () => {
      setSelectedLayers([]);
  }

  return (
    <>
      <ScrollArea className="flex-1 min-h-0">
        <div className="p-4 space-y-6">
            <div className="space-y-4">
                 <div className="grid grid-cols-4 gap-4">
                    {layerGroups.karnataka.map(layer => (
                        <div key={layer.name} className="flex flex-col items-center gap-2 text-center" onClick={() => toggleLayer(layer.name)}>
                            <div className={cn(
                                "relative w-16 h-16 rounded-lg border-2 flex items-center justify-center cursor-pointer",
                                selectedLayers.includes(layer.name) ? "border-primary bg-primary/10" : "bg-muted"
                            )}>
                                {layer.icon}
                                {selectedLayers.includes(layer.name) && (
                                    <div className="absolute -top-1 -right-1 bg-green-500 rounded-full p-0.5 border-2 border-background">
                                        <Check className="h-3 w-3 text-white" />
                                    </div>
                                )}
                            </div>
                            <span className="text-xs font-medium">{layer.name}</span>
                        </div>
                    ))}
                </div>
            </div>
            
            <Accordion type="single" collapsible defaultValue="item-1" className="w-full">
                <AccordionItem value="item-1">
                    <AccordionTrigger className="p-0 hover:no-underline">
                         <Badge 
                            className="cursor-pointer text-base px-4 py-1"
                            variant={activeCity === 'Bengaluru' ? 'default' : 'secondary'}
                            onClick={() => setActiveCity('Bengaluru')}
                        >
                            Bengaluru
                        </Badge>
                    </AccordionTrigger>
                    <AccordionContent className="pt-4">
                      <ScrollArea className="h-48">
                        <div className="grid grid-cols-4 gap-4 pr-4">
                            {layerGroups.bengaluru.map(layer => (
                                <div key={layer.name} className="flex flex-col items-center gap-2 text-center" onClick={() => toggleLayer(layer.name)}>
                                    <div className={cn(
                                        "relative w-16 h-16 rounded-lg border-2 flex items-center justify-center cursor-pointer",
                                        selectedLayers.includes(layer.name) ? "border-primary bg-primary/10" : "bg-muted"
                                    )}>
                                        {layer.icon}
                                        {layer.premium && (
                                            <div className="absolute top-0 right-0 bg-background rounded-bl-lg rounded-tr-md p-0.5">
                                                <Crown className="h-3 w-3 text-amber-500 fill-current" />
                                            </div>
                                        )}
                                        {selectedLayers.includes(layer.name) && (
                                            <div className="absolute -top-1 -right-1 bg-green-500 rounded-full p-0.5 border-2 border-background">
                                                <Check className="h-3 w-3 text-white" />
                                            </div>
                                        )}
                                    </div>
                                    <div className="flex items-center gap-1">
                                        <span className="text-xs font-medium text-center">{layer.name}</span>
                                        {layer.info && <Info className="h-3 w-3 text-muted-foreground" />}
                                    </div>
                                </div>
                            ))}
                        </div>
                      </ScrollArea>
                    </AccordionContent>
                </AccordionItem>
            </Accordion>
        </div>
      </ScrollArea>
      <div className="p-4 border-t shrink-0 flex gap-4">
          <Button variant="outline" className="w-full" onClick={handleClear}>Clear all</Button>
          <Button className="w-full" onClick={onApply} disabled={selectedLayers.length === 0}>
              Apply <ArrowRight className="ml-2 h-4 w-4" />
          </Button>
      </div>
    </>
  )
}


export function LayersDialog({ open, onOpenChange }: LayersDialogProps) {
  const isMobile = useIsMobile();

  const handleApply = () => {
      onOpenChange(false);
  }

  if (isMobile) {
    return (
      <Drawer open={open} onOpenChange={onOpenChange}>
        <DrawerContent className="h-[90vh]">
          <DrawerHeader className="p-4 flex-row items-center justify-between border-b shrink-0">
            <div className="flex items-center gap-2">
              <DrawerTitle className="text-xl font-bold">Layers</DrawerTitle>
              <Select defaultValue="karnataka">
                  <SelectTrigger className="w-auto h-9 focus:ring-0 gap-1 font-semibold text-base border-input bg-background">
                      <SelectValue placeholder="Select State" />
                  </SelectTrigger>
                  <SelectContent>
                      <SelectItem value="karnataka">Karnataka</SelectItem>
                      <SelectItem value="telangana">Telangana</SelectItem>
                      <SelectItem value="delhi">Delhi</SelectItem>
                  </SelectContent>
              </Select>
            </div>
            <DrawerClose asChild>
              <Button variant="ghost" size="icon" className="h-8 w-8">
                  <X className="h-5 w-5" />
              </Button>
            </DrawerClose>
          </DrawerHeader>
          <div className="flex-1 flex flex-col min-h-0">
            <LayersContent onApply={handleApply} />
          </div>
        </DrawerContent>
      </Drawer>
    )
  }

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-h-[90vh] max-w-md w-full p-0 flex flex-col">
        <DialogHeader className="p-4 flex-row items-center justify-between border-b shrink-0">
          <div className="flex items-center gap-2">
            <DialogTitle className="text-xl font-bold">Layers</DialogTitle>
            <Select defaultValue="karnataka">
                <SelectTrigger className="w-auto h-9 focus:ring-0 gap-1 font-semibold text-base border-input bg-background">
                    <SelectValue placeholder="Select State" />
                </SelectTrigger>
                <SelectContent>
                    <SelectItem value="karnataka">Karnataka</SelectItem>
                    <SelectItem value="telangana">Telangana</SelectItem>
                    <SelectItem value="delhi">Delhi</SelectItem>
                </SelectContent>
            </Select>
          </div>
            <DialogClose asChild>
                <Button variant="ghost" size="icon" className="h-8 w-8">
                    <X className="h-5 w-5" />
                </Button>
            </DialogClose>
        </DialogHeader>
        <LayersContent onApply={handleApply} />
      </DialogContent>
    </Dialog>
  );
}
