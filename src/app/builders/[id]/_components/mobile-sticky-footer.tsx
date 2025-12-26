
import { Button } from "@/components/ui/button";
import { Builder } from "@/lib/builders";
import Link from "next/link";

export default function MobileStickyFooter({ builder }: { builder: Builder }) {
    const projectSections = [
        { 
            href: "#projects", 
            label: `Projects (${builder.totalProjects}+)`
        },
        { 
            href: "#ongoing-projects",
            label: `Ongoing (${builder.ongoingProjects.length})` 
        },
        { 
            href: "#upcoming-projects",
            label: `Upcoming (${builder.upcomingProjects.length})` 
        }
    ];

    return (
        <div className="fixed bottom-0 left-0 right-0 md:hidden bg-background border-t p-2 z-40">
            <div className="grid grid-cols-3 gap-2">
                {projectSections.map(section => (
                    <Button key={section.href} asChild variant="outline">
                        <Link href={section.href} className="text-xs h-9 px-2">
                            {section.label}
                        </Link>
                    </Button>
                ))}
            </div>
        </div>
    );
}
