import Link from "next/link";
import { ChevronRight } from "lucide-react";

export default function Breadcrumbs({ builderName }: { builderName: string }) {
    return (
        <div className="flex items-center text-sm text-muted-foreground">
            <Link href="/" className="hover:text-primary">Home</Link>
            <ChevronRight className="h-4 w-4 mx-1" />
            <Link href="/builders" className="hover:text-primary">Builders</Link>
            <ChevronRight className="h-4 w-4 mx-1" />
            <span className="font-medium text-foreground">{builderName}</span>
        </div>
    );
}
