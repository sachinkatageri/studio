
"use client";

import { properties } from '@/lib/properties';
import CheckTravelTimeCard from './check-travel-time-card';
import NearbyLandmarksCard from './nearby-landmarks-card';

type Property = typeof properties[0];

export default function PropertyDetailsPanel({ property }: { property: Property }) {
    return (
        <div className="space-y-8 pb-20 md:pb-0">
           <NearbyLandmarksCard propertyName={property.name} />
           <CheckTravelTimeCard />
        </div>
    )
}
