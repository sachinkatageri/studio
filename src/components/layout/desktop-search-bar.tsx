
"use client";

import { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Search, Globe, SlidersHorizontal, Map as MapIcon, Satellite, Mountain, TrafficCone } from 'lucide-react';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { Separator } from '@/components/ui/separator';
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '@/components/ui/tooltip';

interface DesktopSearchBarProps {
  areFiltersApplied: boolean;
  onFilterClick: () => void;
}

export default function DesktopSearchBar({ areFiltersApplied, onFilterClick }: DesktopSearchBarProps) {
  const placeholderTexts = ['"Indiranagar"', '"Koramangala"', '"HSR Layout"'];
  const [placeholder, setPlaceholder] = useState('');
  const [textIndex, setTextIndex] = useState(0);
  const [charIndex, setCharIndex] = useState(0);
  const [isDeleting, setIsDeleting] = useState(false);

  useEffect(() => {
    const type = () => {
      const currentText = placeholderTexts[textIndex];
      if (isDeleting) {
        if (charIndex > 0) {
          setPlaceholder(currentText.substring(0, charIndex - 1));
          setCharIndex(charIndex - 1);
        } else {
          setIsDeleting(false);
          setTextIndex((prevIndex) => (prevIndex + 1) % placeholderTexts.length);
        }
      } else {
        if (charIndex < currentText.length) {
          setPlaceholder(currentText.substring(0, charIndex + 1));
          setCharIndex(charIndex + 1);
        } else {
          setTimeout(() => setIsDeleting(true), 2000); // Pause before deleting
        }
      }
    };

    const typingSpeed = isDeleting ? 100 : 150;
    const timeout = setTimeout(type, typingSpeed);
    return () => clearTimeout(timeout);
  }, [charIndex, isDeleting, textIndex, placeholderTexts]);

  return (
    <div className="relative flex items-center h-12 text-foreground shadow-lg bg-background rounded-lg" style={{width: "420px"}}>
      <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground pointer-events-none" />
      <span className="pl-10 text-sm text-muted-foreground">Search </span>
      <Input
        type="text"
        placeholder={placeholder}
        className="w-full pr-24 h-full bg-transparent border-none focus-visible:ring-0 focus-visible:ring-offset-0"
      />
      <div className="absolute right-1 top-1/2 -translate-y-1/2 flex items-center">
        <TooltipProvider>
          <Tooltip>
            <TooltipTrigger asChild>
              <Button
                variant={areFiltersApplied ? "default" : "ghost"}
                size="icon"
                className="h-10 w-10"
                onClick={onFilterClick}
              >
                <SlidersHorizontal />
              </Button>
            </TooltipTrigger>
            <TooltipContent>
              <p>Filters</p>
            </TooltipContent>
          </Tooltip>
        </TooltipProvider>
        <Popover>
          <PopoverTrigger asChild>
            <Button variant="ghost" size="icon" className="h-10 w-10">
              <Globe className="h-5 w-5" />
            </Button>
          </PopoverTrigger>
          <PopoverContent className="w-48 p-2">
            <div className="grid gap-1">
              <Button variant="ghost" className="justify-start">
                <MapIcon className="mr-2 h-4 w-4" /> Default
              </Button>
              <Button variant="ghost" className="justify-start">
                <Satellite className="mr-2 h-4 w-4" /> Satellite
              </Button>
              <Button variant="ghost" className="justify-start">
                <Mountain className="mr-2 h-4 w-4" /> Terrain
              </Button>
              <Separator />
              <Button variant="ghost" className="justify-start">
                <TrafficCone className="mr-2 h-4 w-4" /> Traffic
              </Button>
            </div>
          </PopoverContent>
        </Popover>
      </div>
    </div>
  );
}
