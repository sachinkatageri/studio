
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

interface CategorySelectionDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  city: string;
}

const categories = [
    "Managed Space",
    "Unmanaged Space",
    "Coworking Dedicated",
    "Coworking Shared"
];

function DialogContentBody({ city, onSelect }: { city: string, onSelect: (category: string) => void }) {
    return (
        <div className="p-4 md:p-6 grid grid-cols-2 gap-4">
            {categories.map(category => (
                <Button 
                    key={category} 
                    variant="outline" 
                    className="h-auto py-4 text-center text-wrap"
                    onClick={() => onSelect(category)}
                >
                    {category}
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
