
import Header from "@/components/layout/header";
import Hero from "./_components/hero";
import CitySelector from "./_components/city-selector";
import CommercialFooter from "./_components/footer";

export default function CommercialPage() {
    return (
        <div className="bg-background">
            <Header />
            <main>
                <Hero />
                <CitySelector />
            </main>
            <CommercialFooter />
        </div>
    )
}
