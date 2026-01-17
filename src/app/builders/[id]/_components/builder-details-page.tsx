
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
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { MessageSquare } from "lucide-react";
import GetInTouchForm from "./get-in-touch-form";
import { Drawer, DrawerContent, DrawerTrigger } from "@/components/ui/drawer";

export default function BuilderDetailsPage({ builder }: { builder: Builder }) {
    const isMobile = useIsMobile();
    const [showStickyHeader, setShowStickyHeader] = useState(false);
    const [isFabExpanded, setIsFabExpanded] = useState(true);

    useEffect(() => {
        if (isMobile) {
            setIsFabExpanded(false);
            return;
        }

        const handleScroll = () => {
            if (window.scrollY > 400) {
                setShowStickyHeader(true);
            } else {
                setShowStickyHeader(false);
            }
        };

        window.addEventListener('scroll', handleScroll);
        
        const timer = setTimeout(() => {
            setIsFabExpanded(false);
        }, 3000);

        return () => {
            window.removeEventListener('scroll', handleScroll);
            clearTimeout(timer);
        };
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

            {!isMobile && (
                <div
                    onMouseEnter={() => setIsFabExpanded(true)}
                    onMouseLeave={() => setIsFabExpanded(false)}
                    className="fixed bottom-8 right-8 z-50"
                >
                    <Popover>
                        <PopoverTrigger asChild>
                            <Button
                                className={cn(
                                    "rounded-full shadow-lg bg-primary hover:bg-primary/90 transition-all duration-300 ease-in-out",
                                    isFabExpanded ? "h-14 px-6" : "h-16 w-16"
                                )}
                            >
                                <div className="flex items-center justify-center overflow-hidden">
                                    <MessageSquare className="h-6 w-6 shrink-0" />
                                    <div className={cn(
                                        "transition-all duration-300 ease-in-out",
                                        isFabExpanded ? "w-auto ml-2" : "w-0 ml-0"
                                    )}>
                                        <span className="whitespace-nowrap">
                                            Get in Touch
                                        </span>
                                    </div>
                                </div>
                            </Button>
                        </PopoverTrigger>
                        <PopoverContent className="w-96 mr-4 mb-2 p-0" side="top" align="end">
                            <GetInTouchForm />
                        </PopoverContent>
                    </Popover>
                </div>
            )}

            {isMobile && (
                <Drawer>
                    <DrawerTrigger asChild>
                         <Button
                            className="fixed bottom-20 right-4 z-30 h-16 w-16 rounded-full shadow-lg bg-primary hover:bg-primary/90"
                            size="icon"
                        >
                            <MessageSquare className="h-8 w-8" />
                        </Button>
                    </DrawerTrigger>
                    <DrawerContent>
                        <GetInTouchForm className="border-none shadow-none" />
                    </DrawerContent>
                </Drawer>
            )}
            
            {isMobile ? <MobileStickyFooter builder={builder} /> : <Footer />}
        </>
    );
}
