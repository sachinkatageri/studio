
"use client";

import AboutBrandCard from "./about-brand-card";
import AssistedClientsCard from "./assisted-clients-card";
import ContactAgentCard from "./contact-agent-card";
import WhyChooseUsCard from "./why-choose-us-card";

export default function RightColumn({ property }: { property: any }) {
    return (
        <div className="sticky top-24 space-y-6">
            <ContactAgentCard propertyName={property.name} />
            <div className="grid grid-cols-1 gap-6">
                <AssistedClientsCard />
                <WhyChooseUsCard />
            </div>
            <AboutBrandCard />
        </div>
    );
}
