
"use client";

import { useEffect, useState } from "react";
import {
  Dialog,
  DialogContent,
} from "@/components/ui/dialog";
import { Button } from "../ui/button";
import { ArrowLeft, Search } from "lucide-react";
import { Command, CommandEmpty, CommandGroup, CommandInput, CommandItem, CommandList } from "../ui/command";
import { Input } from "../ui/input";

const popularSearches = ["HSR Layout", "Koramangala", "Indiranagar", "Whitefield"];
const recentSearches = ["Brigade Road", "MG Road"];

interface MobileSearchOverlayProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export default function MobileSearchOverlay({ open, onOpenChange }: MobileSearchOverlayProps) {
  const [searchTerm, setSearchTerm] = useState('');

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="p-0 gap-0 h-full w-full max-w-full sm:max-w-full sm:h-full rounded-none border-none flex flex-col">
        <div className="p-4 border-b flex items-center gap-2">
            <Button variant="ghost" size="icon" onClick={() => onOpenChange(false)}>
                <ArrowLeft />
            </Button>
            <div className="relative flex-1">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" />
                <Input 
                    placeholder="Search by locality, landmark or project" 
                    className="pl-10 h-11"
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                />
            </div>
        </div>
        <Command className="flex-1 min-h-0">
          <CommandList className="max-h-full">
            <CommandEmpty>No results found.</CommandEmpty>
            <CommandGroup heading="Recent Searches">
                {recentSearches.map(search => (
                    <CommandItem key={search} onSelect={() => setSearchTerm(search)}>{search}</CommandItem>
                ))}
            </CommandGroup>
            <CommandGroup heading="Popular Searches">
               {popularSearches.map(search => (
                    <CommandItem key={search} onSelect={() => setSearchTerm(search)}>{search}</CommandItem>
                ))}
            </CommandGroup>
          </CommandList>
        </Command>
      </DialogContent>
    </Dialog>
  )
}
