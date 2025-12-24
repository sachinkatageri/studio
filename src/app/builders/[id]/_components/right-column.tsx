
import { Builder } from "@/lib/builders";
import FeaturedProjectCard from "./featured-project-card";
import GetInTouchForm from "./get-in-touch-form";
import KeyProjects from "./key-projects";
import OperationalSegments from "./operational-segments";
import TeamSection from "./team-section";

export default function RightColumn({ builder }: { builder: Builder }) {
    return (
        <div className="space-y-8">
            <FeaturedProjectCard project={builder.completedProjects[0]} />
            <KeyProjects projects={builder.completedProjects.slice(1, 4)} />
            <TeamSection />
            <OperationalSegments />
            <GetInTouchForm />
        </div>
    );
}
