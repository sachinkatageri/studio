
import { Project } from "@/lib/builders";
import Image from "next/image";

export const ProjectCard = ({ project }: { project: Project }) => {
    return (
        <div className="w-48 flex-shrink-0">
            <div className="relative h-32 rounded-lg overflow-hidden">
                <Image src={project.imageUrl} alt={project.name} fill className="object-cover" data-ai-hint={project.imageHint} />
            </div>
            <div className="mt-2 p-2">
                <h4 className="font-semibold truncate text-sm">{project.name}</h4>
                <p className="text-xs text-muted-foreground truncate">{project.location}</p>
                <p className="text-sm font-bold text-primary mt-1">{project.price}</p>
            </div>
        </div>
    );
}
