
"use client";

import AboutBrandCard from "./about-brand-card";

export default function RightColumn({ property }: { property: any }) {
    return (
        <div className="sticky top-24 space-y-6">
            <AboutBrandCard />
        </div>
    );
}
