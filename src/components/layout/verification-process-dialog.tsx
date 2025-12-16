
"use client";

import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogClose,
} from "@/components/ui/dialog";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { X } from "lucide-react";

interface VerificationProcessDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

const Step = ({ number, title, children }: { number: number, title: string, children: React.ReactNode }) => (
    <div className="flex gap-4">
        <div className="flex flex-col items-center">
            <div className="flex items-center justify-center w-8 h-8 rounded-full bg-muted text-muted-foreground font-bold">
                {number}
            </div>
            {number === 1 && <div className="w-px h-full border-l border-dashed my-2"></div>}
        </div>
        <div>
            <h4 className="font-semibold text-lg">{title}</h4>
            <div className="text-muted-foreground text-sm mt-1">{children}</div>
        </div>
    </div>
);


export function VerificationProcessDialog({ open, onOpenChange }: VerificationProcessDialogProps) {
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-md p-0">
        <DialogHeader className="p-4 flex-row items-center justify-between border-b">
          <DialogTitle className="text-xl font-bold">Verification Process</DialogTitle>
          <div className="flex items-center gap-2">
            <Select defaultValue="karnataka">
                <SelectTrigger className="w-auto border-none focus:ring-0 gap-2">
                    <SelectValue placeholder="Select State" />
                </SelectTrigger>
                <SelectContent>
                    <SelectItem value="karnataka">Karnataka</SelectItem>
                    <SelectItem value="telangana">Telangana</SelectItem>
                     <SelectItem value="delhi">Delhi</SelectItem>
                </SelectContent>
            </Select>
            <DialogClose asChild>
                <button className="p-1 rounded-full hover:bg-muted md:hidden">
                 <X className="h-5 w-5" />
                </button>
            </DialogClose>
          </div>
        </DialogHeader>
        <div className="p-6 pt-2">
            <Tabs defaultValue="plot">
                <TabsList className="bg-muted p-1 rounded-full">
                    <TabsTrigger value="land" className="rounded-full px-6">Land</TabsTrigger>
                    <TabsTrigger value="plot" className="rounded-full px-6">Plot</TabsTrigger>
                </TabsList>
                <TabsContent value="plot" className="mt-6">
                    <div className="space-y-6">
                        <Step number={1} title="Plot Credentials">
                            <p>We verify the credentials on the E- Swathu Document and BDA Allotment letter for BDA sites.</p>
                            <h5 className="font-semibold text-foreground mt-4 mb-2">Credentials:</h5>
                            <ul className="list-disc pl-5 space-y-1">
                                <li>Property Number Id</li>
                                <li>Property Type</li>
                                <li>Property Classification</li>
                                <li>Site area</li>
                                <li>Owner Name</li>
                            </ul>
                        </Step>
                        <Step number={2} title="Location">
                            <p>Match land location with the corresponding survey number on cadastral maps. Access maps via the Dishank app using district, taluk, hobli and village details.</p>
                        </Step>
                    </div>
                </TabsContent>
                <TabsContent value="land">
                    <p className="text-muted-foreground text-center py-8">Land verification process will be updated soon.</p>
                </TabsContent>
            </Tabs>
        </div>
      </DialogContent>
    </Dialog>
  );
}
