
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
            <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-6">
                <Breadcrumbs builderName={builder.name} />

                <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mt-6">
                    <LeftColumn builder={builder} />
                    <RightColumn builder={builder} />
                </div>
            </div>
            <Footer />
        </>
    );
}
