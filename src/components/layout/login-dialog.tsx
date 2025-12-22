
"use client";

import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import Image from "next/image";
import { ArrowRight } from "lucide-react";

interface LoginDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export function LoginDialog({ open, onOpenChange }: LoginDialogProps) {
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader className="items-center">
          <Image src="https://www.buildersinfo.in/_next/image?url=%2Flogo.png&w=256&q=75" alt="BuildersInfo Logo" width={120} height={30} className="mb-4" />
          <DialogTitle className="text-2xl font-bold">Login</DialogTitle>
        </DialogHeader>
        <div className="grid gap-4 py-4">
          <div className="grid gap-2">
            <Label htmlFor="phone">Phone number</Label>
            <div className="flex items-center gap-2">
              <div className="relative">
                <div className="absolute inset-y-0 left-0 flex items-center pl-3">
                  <Image src="https://cdnjs.cloudflare.com/ajax/libs/twemoji/14.0.2/72x72/1f1ee-1f1f3.png" alt="India Flag" width={20} height={20} />
                </div>
                <Input
                  id="country-code"
                  defaultValue="+91"
                  className="pl-10 w-24 bg-muted border-r-0 rounded-r-none"
                  readOnly
                />
              </div>
              <Input id="phone" placeholder="" className="rounded-l-none" />
            </div>
            <p className="text-xs text-muted-foreground">
              We'll send you a 6-digit code to verify your number.
            </p>
          </div>
        </div>
        <Button type="submit" size="lg" className="w-full bg-yellow-500 hover:bg-yellow-600 text-black font-bold">
          Send OTP <ArrowRight className="ml-2 h-5 w-5" />
        </Button>
      </DialogContent>
    </Dialog>
  );
}
