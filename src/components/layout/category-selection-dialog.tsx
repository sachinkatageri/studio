
"use client";

import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription
} from "@/components/ui/dialog";
import {
  Drawer,
  DrawerContent,
  DrawerHeader,
  DrawerTitle,
  DrawerDescription,
  DrawerFooter,
  DrawerClose
} from "@/components/ui/drawer";
import { Button } from "@/components/ui/button";
import { useIsMobile } from "@/hooks/use-mobile";
import { Building, Building2, User, Users } from "lucide-react";

interface CategorySelectionDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  city: string;
}

const categories = [
    { label: "Managed Space", icon: <Building className="h-6 w-6" /> },
    { label: "Unmanaged Space", icon: <Building2 className="h-6 w-6" /> },
    { label: "Coworking Dedicated", icon: <User className="h-6 w-6" /> },
    { label: "Coworking Shared", icon: <Users className="h-6 w-6" /> }
];

function DialogContentBody({ city, onSelect }: { city: string, onSelect: (category: string) => void }) {
    return (
        <div className="p-4 md:p-6 grid grid-cols-2 gap-4">
            {categories.map(category => (
                <Button 
                    key={category.label} 
                    variant="outline" 
                    className="h-auto py-4 flex flex-col gap-2"
                    onClick={() => onSelect(category.label)}
                >
                    {category.icon}
                    <span className="text-center text-wrap">{category.label}</span>
                </Button>
            ))}
        </div>
    );
}

export function CategorySelectionDialog({ open, onOpenChange, city }: CategorySelectionDialogProps) {
  const isMobile = useIsMobile();

  const handleSelect = (category: string) => {
    console.log(`Selected category: ${category} for city: ${city}`);
    onOpenChange(false);
  }

  if (isMobile) {
    return (
      <Drawer open={open} onOpenChange={onOpenChange}>
        <DrawerContent>
          <DrawerHeader className="text-left">
            <DrawerTitle>Select Category for {city}</DrawerTitle>
          </DrawerHeader>
          <DialogContentBody city={city} onSelect={handleSelect} />
          <DrawerFooter className="pt-2">
            <DrawerClose asChild>
              <Button variant="outline">Cancel</Button>
            </DrawerClose>
          </DrawerFooter>
        </DrawerContent>
      </Drawer>
    );
  }

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle>Select Category for {city}</DialogTitle>
        </DialogHeader>
        <DialogContentBody city={city} onSelect={handleSelect} />
      </DialogContent>
    </Dialog>
  );
}
