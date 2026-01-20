
"use client";

import PropertyContactForm from "./property-contact-form";
import AboutBrandCard from "./about-brand-card";
import WhyChooseUsCard from "./why-choose-us-card";
import AssistedClientsCard from "./assisted-clients-card";
import ScheduleTourCard from "./schedule-tour-card";
import FloorPlanCard from "./floor-plan-card";
import OpeningHoursCard from "./opening-hours-card";
import RatingsReviewsCard from "./ratings-reviews-card";

export default function RightColumn({ property }: { property: any }) {
    return (
        <div className="sticky top-24 space-y-6">
            <PropertyContactForm />
            <WhyChooseUsCard />
            <AssistedClientsCard />
            <AboutBrandCard />
            <ScheduleTourCard />
            <FloorPlanCard />
            <OpeningHoursCard />
            <RatingsReviewsCard />
        </div>
    );
}
