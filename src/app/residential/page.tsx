

import Header from "@/components/layout/header";
import Hero from "./_components/hero";
import CitySelector from "./_components/city-selector";
import SiteFooter from "@/app/property/[id]/_components/site-footer";

export default function ResidentialPage() {
    return (
        <div className="bg-background">
            <Header />
            <main>
                <Hero />
                <CitySelector />
            </main>
            <SiteFooter />
        </div>
    )
}