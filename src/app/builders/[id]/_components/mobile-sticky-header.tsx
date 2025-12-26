
"use client";

import { Builder } from "@/lib/builders";
import { Button } from "@/components/ui/button";
import { ArrowLeft } from "lucide-react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { useState } from "react";

export default function MobileStickyHeader({ builder }: { builder: Builder }) {
    const router = useRouter();
    const [imgSrc, setImgSrc] = useState(builder.logoUrl);
    const emptyImage = "data:image/gif;base64,R0lGODlhAQABAIAAAAAAAP///yH5BAEAAAAALAAAAAABAAEAAAIBRAA7";

    return (
        <div className="md:hidden flex items-center gap-2 h-14 bg-background/95 backdrop-blur-sm px-2 fixed top-0 left-0 right-0 z-40 border-b">
            <Button variant="ghost" size="icon" onClick={() => router.back()} className="shrink-0 h-9 w-9">
                <ArrowLeft className="h-5 w-5" />
            </Button>
            <div className="flex items-center gap-2 min-w-0">
                <Image 
                    src={imgSrc} 
                    alt={`${builder.name} logo`} 
                    width={32} 
                    height={32} 
                    className="rounded-full object-contain border p-0.5 shrink-0"
                    onError={() => setImgSrc(emptyImage)}
                />
                <div className="truncate">
                    <p className="text-sm font-semibold truncate">{builder.name}</p>
                    <p className="text-xs text-muted-foreground truncate">{builder.location}</p>
                </div>
            </div>
        </div>
    );
}
