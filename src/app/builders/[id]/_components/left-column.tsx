
import { Builder } from "@/lib/builders";
import AboutBuilder from "./about-builder";
import AwardsRecognition from "./awards-recognition";
import BuilderProfileCard from "./builder-profile-card";
import CompanyInfo from "./company-info";
import ContactInfo from "./contact-info";
import FAQ from "./faq";

export default function LeftColumn({ builder }: { builder: Builder }) {
    return (
        <div className="space-y-8">
            <BuilderProfileCard builder={builder} />
            <AboutBuilder />
            <CompanyInfo />
            <ContactInfo />
            <AwardsRecognition />
            <FAQ />
        </div>
    );
}
