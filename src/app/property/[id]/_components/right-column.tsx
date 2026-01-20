"use client";

import { Button } from "@/components/ui/button";
import ContactAgentCard from "./contact-agent-card";
import AssistedClientsCard from "./assisted-clients-card";
import WhyChooseUsCard from "./why-choose-us-card";

export default function RightColumn({ property }: { property: any }) {
    return (
        <div className="sticky top-24 space-y-6">
            <ContactAgentCard propertyName={property.name} />
            <AssistedClientsCard />
            <WhyChooseUsCard />
            <Button size="lg" className="w-full bg-accent hover:bg-accent/90 text-accent-foreground font-bold h-12">
                Request More Information or a Callback
            </Button>
        </div>
    );
}
