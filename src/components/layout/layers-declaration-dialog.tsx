
"use client";

import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogClose,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { X, ArrowRight } from "lucide-react";

interface LayersDeclarationDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onProceed: () => void;
}

export function LayersDeclarationDialog({ open, onOpenChange, onProceed }: LayersDeclarationDialogProps) {
  const handleProceed = () => {
    onProceed();
    onOpenChange(false);
  }

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle className="text-xl font-bold">Layers Declaration</DialogTitle>
           <DialogClose asChild>
                <button className="absolute right-4 top-4 rounded-sm opacity-70 ring-offset-background transition-opacity hover:opacity-100 focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 disabled:pointer-events-none data-[state=open]:bg-accent data-[state=open]:text-muted-foreground">
                    <X className="h-5 w-5" />
                    <span className="sr-only">Close</span>
                </button>
            </DialogClose>
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
