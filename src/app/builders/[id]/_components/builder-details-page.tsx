
"use client";

import { Builder } from "@/lib/builders";
import Breadcrumbs from "./breadcrumbs";
import BuilderProfileCard from "./builder-profile-card";
import AboutBuilder from "./about-builder";
import CompanyInfo from "./company-info";
import ContactInfo from "./contact-info";
import AwardsRecognition from "./awards-recognition";
import FAQ from "./faq";
import FeaturedProjectCard from "./featured-project-card";
import KeyProjects from "./key-projects";
import TeamSection from "./team-section";
import OperationalSegments from "./operational-segments";
import GetInTouchForm from "./get-in-touch-form";
import Header from "@/components/layout/header";
import Footer from "@/components/layout/footer";

export default function BuilderDetailsPage({ builder }: { builder: Builder }) {
    return (
        <>
            <Header />
            <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-6">
                <Breadcrumbs builderName={builder.name} />

                <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mt-6">
                    {/* Left Column */}
                    <div className="lg:col-span-1 space-y-8">
                        <BuilderProfileCard builder={builder} />
                        <AboutBuilder />
                        <CompanyInfo />
                        <ContactInfo />
                        <AwardsRecognition />
                        <FAQ />
                    </div>

                    {/* Right Column */}
                    <div className="lg:col-span-2 space-y-8">
                        <FeaturedProjectCard project={builder.completedProjects[0]} />
                        <KeyProjects projects={builder.completedProjects.slice(1, 4)} />
                        <TeamSection />
                        <OperationalSegments />
                        <GetInTouchForm />
                    </div>
                </div>
            </div>
            <Footer />
        </>
    );
}
