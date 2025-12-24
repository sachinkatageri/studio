
"use client"

import { Builder } from "@/lib/builders";
import Image from "next/image";
import Link from "next/link";
import { useState } from "react";

export default function MobileBuilderCard({ builder }: { builder: Builder }) {
    const [imgSrc, setImgSrc] = useState(builder.logoUrl);
    const emptyImage = "data:image/gif;base64,R0lGODlhAQABAIAAAAAAAP///yH5BAEAAAAALAAAAAABAAEAAAIBRAA7";

    return (
        <Link href={`/builders/${builder.id}`} className="block">
            <div className="border rounded-lg p-4 flex flex-col items-center justify-center text-center h-full aspect-square">
                <div className="relative w-16 h-16 mb-2">
                    <Image
                        src={imgSrc}
                        alt={`${builder.name} logo`}
                        fill
                        className="object-contain"
                        onError={() => setImgSrc(emptyImage)}
                    />
                </div>
                <p className="text-xs font-semibold truncate w-full">{builder.name}</p>
            </div>
        </Link>
    );
}
