import { builders } from "@/lib/builders";
import { notFound } from "next/navigation";
import BuilderDetailsPage from "./_components/builder-details-page";

export default function BuilderPage({ params }: { params: { id: string } }) {
    const builder = builders.find(b => b.id === params.id);

    if (!builder) {
        notFound();
    }

    return <BuilderDetailsPage builder={builder} />;
}
