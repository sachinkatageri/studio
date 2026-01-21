
"use client";

import ContactAgentCard from "./contact-agent-card";
import AssistedClientsCard from "./assisted-clients-card";
import WhyChooseUsCard from "./why-choose-us-card";
import { Button } from "@/components/ui/button";
import { Phone } from "lucide-react";
import AboutBrandCard from "./about-brand-card";
import FloorPlanCard from "./floor-plan-card";
import OpeningHoursCard from "./opening-hours-card";
import RatingsReviewsCard from "./ratings-reviews-card";

export default function RightColumn({ property }: { property: any }) {
    return (
        <div className="sticky top-24 space-y-6">
            <ContactAgentCard propertyName={property.name} />
            <AssistedClientsCard />
            <WhyChooseUsCard />
            <Button size="lg" className="w-full bg-accent hover:bg-accent/90 text-accent-foreground font-bold h-14 text-base">
                <Phone className="mr-2 h-5 w-5" />
                Request More Information or a Callback
            </Button>
            <AboutBrandCard />
            <FloorPlanCard />
            <OpeningHoursCard />
            <RatingsReviewsCard />
        </div>
    );
}
