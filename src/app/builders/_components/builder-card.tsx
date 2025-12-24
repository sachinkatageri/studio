
"use client"

import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Builder } from "@/lib/builders";
import Image from "next/image";
import { ProjectCard } from "./project-card";
import { Button } from "@/components/ui/button";
import { ScrollArea, ScrollBar } from "@/components/ui/scroll-area";

export default function BuilderCard({ builder }: { builder: Builder }) {
    return (
        <div className="border rounded-lg p-4 md:p-6">
            <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
                <div className="flex items-center gap-4">
                    <Image src={builder.logoUrl} alt={`${builder.name} logo`} width={56} height={56} className="rounded-full object-contain border p-1" />
                    <div>
                        <h2 className="text-xl font-bold">{builder.name}</h2>
                        <p className="text-muted-foreground">{builder.location}</p>
                    </div>
                </div>
                <div className="flex items-center gap-8 text-center">
                    <div>
                        <p className="font-bold text-lg">{builder.totalProjects}</p>
                        <p className="text-xs text-muted-foreground">Total Projects</p>
                    </div>
                    <div>
                        <p className="font-bold text-lg">{builder.experience} Years</p>
                        <p className="text-xs text-muted-foreground">Experience</p>
                    </div>
                </div>
            </div>

            <Tabs defaultValue="completed" className="mt-4">
                <TabsList>
                    <TabsTrigger value="completed">Completed Projects ({builder.completedProjects.length})</TabsTrigger>
                    <TabsTrigger value="ongoing">Ongoing Projects ({builder.ongoingProjects.length})</TabsTrigger>
                    <TabsTrigger value="upcoming">Upcoming Projects ({builder.upcomingProjects.length})</TabsTrigger>
                </TabsList>
                <TabsContent value="completed" className="mt-4">
                    <ScrollArea>
                        <div className="flex space-x-4 pb-4">
                            {builder.completedProjects.map(project => (
                                <ProjectCard key={project.id} project={project} />
                            ))}
                             <div className="flex-shrink-0 w-40 h-56 flex flex-col items-center justify-center bg-muted rounded-lg">
                                <button className="text-primary font-semibold">+ {builder.completedProjects.length} More</button>
                            </div>
                        </div>
                        <ScrollBar orientation="horizontal" />
                    </ScrollArea>
                </TabsContent>
                <TabsContent value="ongoing" className="mt-4">
                     <ScrollArea>
                        <div className="flex space-x-4 pb-4">
                            {builder.ongoingProjects.map(project => (
                                <ProjectCard key={project.id} project={project} />
                            ))}
                             <div className="flex-shrink-0 w-40 h-56 flex flex-col items-center justify-center bg-muted rounded-lg">
                                <button className="text-primary font-semibold">+ {builder.ongoingProjects.length} More</button>
                            </div>
                        </div>
                        <ScrollBar orientation="horizontal" />
                    </ScrollArea>
                </TabsContent>
                <TabsContent value="upcoming" className="mt-4">
                     <ScrollArea>
                        <div className="flex space-x-4 pb-4">
                            {builder.upcomingProjects.map(project => (
                                <ProjectCard key={project.id} project={project} />
                            ))}
                             <div className="flex-shrink-0 w-40 h-56 flex flex-col items-center justify-center bg-muted rounded-lg">
                                <button className="text-primary font-semibold">+ {builder.upcomingProjects.length} More</button>
                            </div>
                        </div>
                        <ScrollBar orientation="horizontal" />
                    </ScrollArea>
                </TabsContent>
            </Tabs>
            <div className="mt-4 text-right">
                <Button variant="default">View Details</Button>
            </div>
        </div>
    )
}
