
"use client";

import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import {
  Drawer,
  DrawerContent,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger,
  DrawerDescription,
} from "@/components/ui/drawer";
import { Button } from "@/components/ui/button";
import { useIsMobile } from "@/hooks/use-mobile";
import { Facebook, Twitter, Linkedin, Copy, Share2 } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import Image from "next/image";

const WhatsAppIcon = () => (
    <Image src="https://www.buildersinfo.in/property-details/whatsapp.png" alt="WhatsApp" width={24} height={24} />
);

const ShareContent = ({ url }: { url: string }) => {
    const { toast } = useToast();

    const copyToClipboard = () => {
        navigator.clipboard.writeText(url);
        toast({
            title: "Copied to clipboard!",
            description: "You can now share the link.",
        });
    };

    const shareOptions = [
        { name: 'WhatsApp', icon: <WhatsAppIcon />, href: `https://wa.me/?text=${encodeURIComponent(url)}` },
        { name: 'Facebook', icon: <Facebook className="h-6 w-6" />, href: `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(url)}` },
        { name: 'Twitter', icon: <Twitter className="h-6 w-6" />, href: `https://twitter.com/intent/tweet?url=${encodeURIComponent(url)}` },
        { name: 'LinkedIn', icon: <Linkedin className="h-6 w-6" />, href: `https://www.linkedin.com/shareArticle?mini=true&url=${encodeURIComponent(url)}` },
    ];

    return (
        <div className="p-4">
            <div className="grid grid-cols-4 gap-4 text-center">
                {shareOptions.map(option => (
                    <a key={option.name} href={option.href} target="_blank" rel="noopener noreferrer" className="flex flex-col items-center gap-2 text-muted-foreground hover:text-primary">
                        {option.icon}
                        <span className="text-xs">{option.name}</span>
                    </a>
                ))}
            </div>
            <div className="mt-6 relative">
                <input
                    type="text"
                    readOnly
                    value={url}
                    className="w-full border rounded-lg p-2 pr-12 text-sm bg-muted text-muted-foreground"
                />
                <Button variant="ghost" size="icon" className="absolute right-1 top-1/2 -translate-y-1/2 h-8 w-8" onClick={copyToClipboard}>
                    <Copy className="h-4 w-4" />
                </Button>
            </div>
        </div>
    );
};


export function ShareOptions({ children }: { children: React.ReactNode }) {
    const isMobile = useIsMobile();
    const shareUrl = typeof window !== 'undefined' ? window.location.href : '';

    if (isMobile) {
        return (
            <Drawer>
                <DrawerTrigger asChild>{children}</DrawerTrigger>
                <DrawerContent>
                    <DrawerHeader>
                        <DrawerTitle>Share this property</DrawerTitle>
                        <DrawerDescription>
                            Spread the word to your friends and family.
                        </DrawerDescription>
                    </DrawerHeader>
                    <ShareContent url={shareUrl} />
                </DrawerContent>
            </Drawer>
        );
    }

    return (
        <Popover>
            <PopoverTrigger asChild>{children}</PopoverTrigger>
            <PopoverContent className="w-96">
                <div className="space-y-2">
                    <h4 className="font-medium leading-none">Share this property</h4>
                    <p className="text-sm text-muted-foreground">
                        Spread the word to your friends and family.
                    </p>
                </div>
                <ShareContent url={shareUrl} />
            </PopoverContent>
        </Popover>
    );
}
