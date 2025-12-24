
"use client";

import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogClose,
} from "@/components/ui/dialog";
import { Drawer, DrawerContent, DrawerHeader, DrawerTitle, DrawerClose, DrawerFooter, DrawerDescription } from "@/components/ui/drawer";

import { Button } from "@/components/ui/button";
import { X, ArrowRight } from "lucide-react";
import { useIsMobile } from "@/hooks/use-mobile";
import { ScrollArea } from "../ui/scroll-area";

interface LayersDeclarationDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onProceed: () => void;
}

function LayersDeclarationContent({ onProceed }: { onProceed: () => void }) {
  return (
    <>
      <div className="text-sm text-muted-foreground space-y-4 py-4">
        <p>
            Disclaimer: The map layers on buildersinfo.in are created using publicly available data and are intended for general informational purposes only. While we've made best efforts to ensure accuracy by referencing sources like HMDA.gov.in, Bhuvan-ISRO, and others, limitations such as outdated records, digitisation errors, satellite distortions, and missing cadastral data may affect the accuracy of the visual overlays.
        </p>
        <p>
            These maps are not substitutes for official government surveys or legal verification. Users are advised to independently verify all details with the appropriate authorities before making any land or investment decisions.
        </p>
        <p>
            By using these layers, you acknowledge and accept these limitations. Click on info icon (in layers section) to know more about individual layers.
        </p>
      </div>
      <Button onClick={onProceed} className="w-full bg-accent text-accent-foreground hover:bg-accent/90 font-bold">
          Proceed <ArrowRight className="ml-2 h-4 w-4" />
      </Button>
    </>
  )
}

export function LayersDeclarationDialog({ open, onOpenChange, onProceed }: LayersDeclarationDialogProps) {
  const isMobile = useIsMobile();
  
  const handleProceed = () => {
    onProceed();
    onOpenChange(false);
  }

  if (isMobile) {
    return (
      <Drawer open={open} onOpenChange={onOpenChange}>
        <DrawerContent hideCloseButton>
          <DrawerHeader className="text-left">
            <div className="flex justify-between items-center">
              <div>
                <DrawerTitle>Layers Declaration</DrawerTitle>
                <DrawerDescription>
                    Review the disclaimer before proceeding.
                </DrawerDescription>
              </div>
            </div>
          </DrawerHeader>
            <div className="px-4">
                 <div className="text-sm text-muted-foreground space-y-4">
                    <p>
                        Disclaimer: The map layers on buildersinfo.in are created using publicly available data and are intended for general informational purposes only. While we've made best efforts to ensure accuracy by referencing sources like HMDA.gov.in, Bhuvan-ISRO, and others, limitations such as outdated records, digitisation errors, satellite distortions, and missing cadastral data may affect the accuracy of the visual overlays.
                    </p>
                    <p>
                        These maps are not substitutes for official government surveys or legal verification. Users are advised to independently verify all details with the appropriate authorities before making any land or investment decisions.
                    </p>
                    <p>
                        By using these layers, you acknowledge and accept these limitations. Click on info icon (in layers section) to know more about individual layers.
                    </p>
                </div>
            </div>
          <DrawerFooter className="pt-2">
            <Button onClick={handleProceed} className="w-full bg-accent text-accent-foreground hover:bg-accent/90 font-bold">
                Proceed <ArrowRight className="ml-2 h-4 w-4" />
            </Button>
            <DrawerClose asChild>
                <Button variant="outline">Cancel</Button>
            </DrawerClose>
          </DrawerFooter>
        </DrawerContent>
      </Drawer>
    )
  }

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle className="text-xl font-bold">Layers Declaration</DialogTitle>
        </DialogHeader>
        <div className="text-sm text-muted-foreground space-y-4 py-4">
            <p>
                Disclaimer: The map layers on buildersinfo.in are created using publicly available data and are intended for general informational purposes only. While we've made best efforts to ensure accuracy by referencing sources like HMDA.gov.in, Bhuvan-ISRO, and others, limitations such as outdated records, digitisation errors, satellite distortions, and missing cadastral data may affect the accuracy of the visual overlays.
            </p>
            <p>
                These maps are not substitutes for official government surveys or legal verification. Users are advised to independently verify all details with the appropriate authorities before making any land or investment decisions.
            </p>
            <p>
                By using these layers, you acknowledge and accept these limitations. Click on info icon (in layers section) to know more about individual layers.
            </p>
        </div>
        <Button onClick={handleProceed} className="w-full bg-accent text-accent-foreground hover:bg-accent/90 font-bold">
            Proceed <ArrowRight className="ml-2 h-4 w-4" />
        </Button>
      </DialogContent>
    </Dialog>
  );
}
