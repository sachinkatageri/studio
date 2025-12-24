
"use client";

import { Builder } from "@/lib/builders";
import Breadcrumbs from "./breadcrumbs";
import Header from "@/components/layout/header";
import Footer from "@/components/layout/footer";
import LeftColumn from "./left-column";
import RightColumn from "./right-column";

export default function BuilderDetailsPage({ builder }: { builder: Builder }) {
    return (
        <>
            <Header />
            <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-10 pt-20 md:pt-14">
                <div className="hidden md:block">
                    <Breadcrumbs builderName={builder.name} />
                </div>
                <h1 className="text-3xl font-bold mt-4">{builder.name}</h1>
                <p className="text-muted-foreground mt-1">Explore projects, and more from {builder.name}.</p>

                <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 mt-6">
                    <div className="lg:col-span-6">
                        <LeftColumn builder={builder} />
                    </div>
                    <div className="lg:col-span-6">
                        <RightColumn builder={builder} />
                    </div>
                </div>
            </div>
            <Footer />
        </>
    );
}
