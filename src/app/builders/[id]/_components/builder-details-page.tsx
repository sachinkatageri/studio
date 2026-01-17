
"use client";

import { Builder } from "@/lib/builders";
import Breadcrumbs from "./breadcrumbs";
import Header from "@/components/layout/header";
import Footer from "@/components/layout/footer";
import LeftColumn from "./left-column";
import RightColumn from "./right-column";
import MobileStickyFooter from "./mobile-sticky-footer";
import { useIsMobile } from "@/hooks/use-mobile";
import MobileStickyHeader from "./mobile-sticky-header";
import { useState, useEffect } from "react";
import DesktopStickyHeader from "./desktop-sticky-header";

export default function BuilderDetailsPage({ builder }: { builder: Builder }) {
    const isMobile = useIsMobile();
    const [showStickyHeader, setShowStickyHeader] = useState(false);

    useEffect(() => {
        if (isMobile) return;

        const handleScroll = () => {
            if (window.scrollY > 400) {
                setShowStickyHeader(true);
            } else {
                setShowStickyHeader(false);
            }
        };

        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, [isMobile]);
    
    return (
        <>
            {isMobile ? <MobileStickyHeader builder={builder} /> : <Header />}
            {showStickyHeader && !isMobile && <DesktopStickyHeader builder={builder} />}
            <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-10 pt-20 md:pt-14 pb-40 md:pb-10">
                <div className="hidden md:block">
                    <Breadcrumbs builderName={builder.name} />
                </div>
                <h1 className="text-2xl md:text-3xl font-bold mt-4 hidden md:block">{builder.name}</h1>
                <p className="text-sm md:text-base text-muted-foreground mt-1 hidden md:block">Explore projects, and more from {builder.name}.</p>

                <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 mt-6">
                    <div className="lg:col-span-6">
                        <LeftColumn builder={builder} />
                    </div>
                    <div className="lg:col-span-6">
                        <RightColumn builder={builder} />
                    </div>
                </div>
            </div>
            {isMobile ? <MobileStickyFooter builder={builder} /> : <Footer />}
        </>
    );
}
