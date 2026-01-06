
"use client";

import Header from "@/components/layout/header";
import Hero from "./_components/hero";
import CitySelector from "./_components/city-selector";
import CommercialFooter from "./_components/footer";
import { useIsMobile } from "@/hooks/use-mobile";
import Footer from "@/components/layout/footer";

export default function CommercialPage() {
    const isMobile = useIsMobile();
    return (
        <div className="bg-background">
            {!isMobile && <Header />}
            <main>
                <Hero />
                <CitySelector />
            </main>
            {isMobile ? <Footer /> : <CommercialFooter />}
        </div>
    )
}
