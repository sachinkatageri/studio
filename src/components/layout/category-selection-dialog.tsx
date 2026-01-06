

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
  DrawerDescription
} from "@/components/ui/drawer";
import { Button } from "@/components/ui/button";
import { useIsMobile } from "@/hooks/use-mobile";
import { Building, Building2, User, Users, Home, Hand, Hotel } from "lucide-react";
import { useRouter } from "next/navigation";

interface CategorySelectionDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  city: string;
  pageType: 'commercial' | 'residential';
}

const commercialCategories = [
    { label: "Managed Space", icon: <Building className="h-6 w-6" /> },
    { label: "Unmanaged Space", icon: <Building2 className="h-6 w-6" /> },
    { label: "Coworking Dedicated", icon: <User className="h-6 w-6" /> },
    { label: "Coworking Shared", icon: <Users className="h-6 w-6" /> }
];

const residentialCategories = [
    { label: "Rent", icon: <Home className="h-6 w-6" /> },
    { label: "Sale", icon: <Hand className="h-6 w-6" /> },
    { label: "PG/Hostel", icon: <Hotel className="h-6 w-6" /> },
    { label: "Flatmates", icon: <Users className="h-6 w-6" /> },
];

function DialogContentBody({ city, onSelect, pageType }: { city: string, onSelect: (category: string) => void, pageType: 'commercial' | 'residential' }) {
    const categories = pageType === 'commercial' ? commercialCategories : residentialCategories;
    
    return (
        <div className="p-4 md:p-6 grid grid-cols-2 gap-4">
            {categories.map(category => (
                <Button 
                    key={category.label} 
                    variant="outline" 
                    className="h-28 py-4 flex flex-col items-center justify-center gap-2"
                    onClick={() => onSelect(category.label)}
                >
                    {category.icon}
                    <span className="text-center text-xs text-wrap">{category.label}</span>
                </Button>
            ))}
        </div>
    );
}

export function CategorySelectionDialog({ open, onOpenChange, city, pageType }: CategorySelectionDialogProps) {
  const isMobile = useIsMobile();
  const router = useRouter();

  const handleSelect = (category: string) => {
    onOpenChange(false);
    router.push(`/?city=${encodeURIComponent(city)}&category=${encodeURIComponent(category)}`);
  }

  if (isMobile) {
    return (
      <Drawer open={open} onOpenChange={onOpenChange}>
        <DrawerContent>
          <DrawerHeader className="text-left">
            <DrawerTitle>Select Category for {city}</DrawerTitle>
          </DrawerHeader>
          <DialogContentBody city={city} onSelect={handleSelect} pageType={pageType} />
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
        <DialogContentBody city={city} onSelect={handleSelect} pageType={pageType} />
      </DialogContent>
    </Dialog>
  );
}
