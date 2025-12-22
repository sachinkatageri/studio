
"use client";

import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetDescription,
} from "@/components/ui/sheet";
import { Drawer, DrawerContent, DrawerHeader, DrawerTitle, DrawerDescription, DrawerClose } from "@/components/ui/drawer";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import Image from "next/image";
import { useIsMobile } from "@/hooks/use-mobile";
import { X } from "lucide-react";
import Link from "next/link";

interface ListPropertySheetProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

const WhatsAppIcon = () => (
    <Image src="https://www.buildersinfo.in/property-details/whatsapp.png" alt="WhatsApp" width={24} height={24} />
);

const ListPropertyContent = () => (
    <div className="p-6 text-center flex flex-col items-center justify-center flex-1">
        <Image src="https://www.buildersinfo.in/_next/image?url=%2Flogo.png&w=256&q=75" alt="BuildersInfo Logo" width={150} height={40} className="mb-6" />
        <h2 className="text-2xl font-bold font-headline mb-2">List Your Land or Property for Free!</h2>
        <p className="text-muted-foreground mb-8">
            Reach thousands of potential buyers by listing your property on BuildersInfo. Our team will help you get started.
        </p>
        <Button asChild size="lg" className="w-full max-w-xs bg-green-500 hover:bg-green-600 text-white text-base font-bold h-14">
            <Link href="https://wa.me/919876543210" target="_blank">
                <WhatsAppIcon />
                <span className="ml-3">Contact on WhatsApp</span>
            </Link>
        </Button>
    </div>
);

export function ListPropertySheet({ open, onOpenChange }: ListPropertySheetProps) {
  const isMobile = useIsMobile();

  if (isMobile) {
    return (
      <Drawer open={open} onOpenChange={onOpenChange}>
        <DrawerContent>
          <DrawerHeader className="text-left">
             <div className="flex justify-between items-center">
                <DrawerTitle>List Your Property</DrawerTitle>
                <DrawerClose asChild>
                    <Button variant="ghost" size="icon" className="h-8 w-8">
                        <X className="h-5 w-5" />
                    </Button>
                </DrawerClose>
            </div>
          </DrawerHeader>
          <ListPropertyContent />
        </DrawerContent>
      </Drawer>
    );
  }

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle className="sr-only">List Your Property</DialogTitle>
          <DialogDescription className="sr-only">
            Contact us to list your land or property for free on BuildersInfo.
          </DialogDescription>
        </DialogHeader>
        <div className="-m-6">
            <ListPropertyContent />
        </div>
      </DialogContent>
    </Dialog>
  );
}
