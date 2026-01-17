
"use client";

import { Button } from "@/components/ui/button";
import { Builder } from "@/lib/builders";
import Image from "next/image";
import { useState } from "react";

export default function DesktopStickyHeader({ builder }: { builder: Builder }) {
    const [imgSrc, setImgSrc] = useState(builder.logoUrl);
    const emptyImage = "data:image/gif;base64,R0lGODlhAQABAIAAAAAAAP///yH5BAEAAAAALAAAAAABAAEAAAIBRAA7";

    return (
        <div className="hidden md:block fixed top-14 left-0 right-0 z-30 bg-background/95 backdrop-blur-sm border-b shadow-sm">
            <div className="container mx-auto px-4 sm:px-6 lg:px-8 h-16 flex justify-between items-center">
                <div className="flex items-center gap-4">
                    <Image
                        src={imgSrc}
                        alt={`${builder.name} logo`}
                        width={40}
                        height={40}
                        className="rounded-full object-contain border p-0.5"
                        onError={() => setImgSrc(emptyImage)}
                    />
                    <div>
                        <h1 className="text-lg font-bold truncate">{builder.name}</h1>
                        <p className="text-xs text-muted-foreground">{builder.location}</p>
                    </div>
                </div>

                <div className="flex items-center gap-6">
                    <div className="text-center">
                        <p className="font-bold text-lg">{builder.totalProjects}+</p>
                        <p className="text-xs text-muted-foreground">Projects</p>
                    </div>
                    <div className="text-center">
                        <p className="font-bold text-lg">{builder.experience} Yrs</p>
                        <p className="text-xs text-muted-foreground">Experience</p>
                    </div>
                    <Button>Contact Builder</Button>
                </div>
            </div>
        </div>
    );
}
