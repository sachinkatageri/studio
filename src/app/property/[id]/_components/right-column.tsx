"use client";

import ContactAgentCard from "./contact-agent-card";
import WhyChooseUsCard from "./why-choose-us-card";
import AboutBrandCard from "./about-brand-card";
import FloorPlanCard from "./floor-plan-card";
import OpeningHoursCard from "./opening-hours-card";
import RatingsReviewsCard from "./ratings-reviews-card";

export default function RightColumn({ property }: { property: any }) {
    return (
        <div className="sticky top-24 space-y-6">
            <ContactAgentCard propertyName={property.name} />
            <WhyChooseUsCard />
            <AboutBrandCard />
            <FloorPlanCard />
            <OpeningHoursCard />
            <RatingsReviewsCard />
        </div>
    );
}
