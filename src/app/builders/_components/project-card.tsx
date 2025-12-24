
import { Project } from "@/lib/builders";
import Image from "next/image";

export const ProjectCard = ({ project, view }: { project: Project; view: 'grid' | 'list' }) => {
    if (view === 'list') {
        return (
             <div className="flex items-center gap-4 p-3 rounded-lg border bg-background hover:bg-muted/50 cursor-pointer">
                <div className="relative h-20 w-24 rounded-md overflow-hidden shrink-0">
                    <Image src={project.imageUrl} alt={project.name} fill className="object-cover" data-ai-hint={project.imageHint} />
                </div>
                <div className="flex-1">
                    <h4 className="font-semibold truncate text-sm">{project.name}</h4>
                    <p className="text-xs text-muted-foreground truncate">{project.location}</p>
                    <p className="text-sm font-bold text-primary mt-1">{project.price}</p>
                </div>
            </div>
        )
    }
    
    // Grid view for horizontal scroll in list view card
    return (
        <div className="w-40 flex-shrink-0">
            <div className="relative h-24 rounded-lg overflow-hidden">
                <Image src={project.imageUrl} alt={project.name} fill className="object-cover" data-ai-hint={project.imageHint} />
            </div>
            <div className="mt-2">
                <h4 className="font-semibold truncate text-sm">{project.name}</h4>
                <p className="text-xs text-muted-foreground truncate">{project.location}</p>
                <p className="text-sm font-bold text-primary mt-1">{project.price}</p>
            </div>
        </div>
    );
}
