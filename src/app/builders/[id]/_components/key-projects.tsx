import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Project } from "@/lib/builders";
import Image from "next/image";
import Link from "next/link";

export default function KeyProjects({ projects }: { projects: Project[] }) {
    return (
        <Card>
            <CardHeader>
                <CardTitle>Key Projects</CardTitle>
            </CardHeader>
            <CardContent>
                <ul className="space-y-4">
                    {projects.map(project => (
                        <li key={project.id}>
                            <Link href={`/property/${project.id}`} className="flex items-center gap-4 p-2 rounded-lg hover:bg-muted">
                                <div className="relative h-16 w-16 rounded-lg overflow-hidden shrink-0">
                                    <Image src={project.imageUrl} alt={project.name} fill className="object-cover" data-ai-hint={project.imageHint} />
                                </div>
                                <div>
                                    <p className="font-semibold">{project.name}</p>
                                    <p className="text-sm text-muted-foreground">{project.location}</p>
                                </div>
                            </Link>
                        </li>
                    ))}
                </ul>
            </CardContent>
        </Card>
    );
}
