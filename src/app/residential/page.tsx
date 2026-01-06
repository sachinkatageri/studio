
"use client";

import Header from "@/components/layout/header";
import Hero from "./_components/hero";
import CitySelector from "./_components/city-selector";
import SiteFooter from "@/app/property/[id]/_components/site-footer";
import { useIsMobile } from "@/hooks/use-mobile";
import Footer from "@/components/layout/footer";

export default function ResidentialPage() {
    const isMobile = useIsMobile();
    return (
        <div className="bg-background">
            <Header />
            <main>
                <Hero />
                <CitySelector />
            </main>
            {isMobile ? <Footer /> : <SiteFooter />}
        </div>
    )
}
