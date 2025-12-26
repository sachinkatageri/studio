
import { Button } from "@/components/ui/button";
import { Builder } from "@/lib/builders";
import Link from "next/link";
import Image from "next/image";

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
        <div className="fixed bottom-0 left-0 right-0 md:hidden bg-background/95 backdrop-blur-sm p-2 border-t z-40 space-y-2">
             <div className="flex gap-2">
                <Button variant="outline" className="w-full h-11 rounded-lg">Contact</Button>
                <Button className="w-full h-11 rounded-lg">
                    <Image src="https://www.buildersinfo.in/property-details/whatsapp.png" alt="WhatsApp" width={20} height={20} />
                    <span className="ml-2">WhatsApp</span>
                </Button>
            </div>
        </div>
    );
}
