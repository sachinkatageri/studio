

"use client";

import ScheduleTourCard from "./schedule-tour-card";

export default function RightColumn({ property }: { property: any }) {
    return (
        <div className="sticky top-24 space-y-6">
            <ScheduleTourCard />
        </div>
    );
}
