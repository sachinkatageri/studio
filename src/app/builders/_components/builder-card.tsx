
"use client"

import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Builder } from "@/lib/builders";
import Image from "next/image";
import { ProjectCard } from "./project-card";
import { Button } from "@/components/ui/button";
import { ScrollArea, ScrollBar } from "@/components/ui/scroll-area";
import { cn } from "@/lib/utils";
import { Award, Building2 } from "lucide-react";
import { useState } from "react";
import { Separator } from "@/components/ui/separator";
import Link from "next/link";

export default function BuilderCard({ builder, view }: { builder: Builder, view: 'list' | 'grid' }) {
    const [imgSrc, setImgSrc] = useState(builder.logoUrl);
    const emptyImage = "data:image/gif;base64,R0lGODlhAQABAIAAAAAAAP///yH5BAEAAAAALAAAAAABAAEAAAIBRAA7";

    if (view === 'grid') {
        return (
            <div className="border rounded-lg p-4 flex flex-col h-full">
                <div className="flex items-center gap-3">
                    <Image 
                      src={imgSrc} 
                      alt={`${builder.name} logo`} 
                      width={40} 
                      height={40} 
                      className="rounded-full object-contain border p-1" 
                      onError={() => setImgSrc(emptyImage)}
                    />
                    <div>
                        <h2 className="text-sm md:text-md font-bold">{builder.name}</h2>
                        <p className="text-xs text-muted-foreground">{builder.location}</p>
                    </div>
                </div>

                <div className="flex justify-between items-center gap-4 text-center mt-4">
                    <div>
                        <p className="font-bold text-base md:text-lg">{builder.totalProjects}</p>
                        <p className="text-xs text-muted-foreground">Projects</p>
                    </div>
                     <div>
                        <p className="font-bold text-base md:text-lg">{builder.experience} Yrs</p>
                        <p className="text-xs text-muted-foreground">Exp.</p>
                    </div>
                </div>
                
                <Tabs defaultValue="completed" className="mt-4 flex-grow flex flex-col">
                    <TabsList className="grid-cols-none justify-start p-0 h-auto bg-transparent text-xs border-b">
                        <TabsTrigger value="completed">Completed ({builder.completedProjects.length})</TabsTrigger>
                        <TabsTrigger value="ongoing">Ongoing ({builder.ongoingProjects.length})</TabsTrigger>
                        <TabsTrigger value="upcoming">Upcoming ({builder.upcomingProjects.length})</TabsTrigger>
                    </TabsList>

                    <div className="mt-4 flex-grow">
                        <TabsContent value="completed" className="mt-0 h-full">
                             <div className="space-y-3">
                                {builder.completedProjects.slice(0, 2).map(project => (
                                    <ProjectCard key={project.id} project={project} view="list" />
                                ))}
                                {builder.completedProjects.length > 2 && (
                                    <Button variant="link" className="text-primary p-0 h-auto text-xs">
                                        +{builder.completedProjects.length - 2} View All
                                    </Button>
                                )}
                            </div>
                        </TabsContent>
                        <TabsContent value="ongoing" className="mt-0 h-full">
                             <div className="space-y-3">
                                {builder.ongoingProjects.slice(0, 2).map(project => (
                                    <ProjectCard key={project.id} project={project} view="list" />
                                ))}
                                {builder.ongoingProjects.length > 2 && (
                                    <Button variant="link" className="text-primary p-0 h-auto text-xs">
                                        +{builder.ongoingProjects.length - 2} View All
                                    </Button>
                                )}
                            </div>
                        </TabsContent>
                        <TabsContent value="upcoming" className="mt-0 h-full">
                             <div className="space-y-3">
                                {builder.upcomingProjects.slice(0, 2).map(project => (
                                    <ProjectCard key={project.id} project={project} view="list" />
                                ))}
                                {builder.upcomingProjects.length > 2 && (
                                    <Button variant="link" className="text-primary p-0 h-auto text-xs">
                                        +{builder.upcomingProjects.length - 2} View All
                                    </Button>
                                )}
                            </div>
                        </TabsContent>
                    </div>
                </Tabs>

                <div className="mt-auto pt-4">
                    <Separator className="mb-4" />
                    <div className="text-right">
                        <Button asChild variant="default" size="sm" className="w-full md:w-auto bg-accent hover:bg-accent/90 text-accent-foreground">
                            <Link href={`/builders/${builder.id}`}>View Details</Link>
                        </Button>
                    </div>
                </div>
            </div>
        )
    }

    // List View
    return (
        <div className="border rounded-lg p-4 md:p-6 flex flex-col h-full">
            <div className="flex justify-between items-start gap-6">
                <div className="flex items-center gap-4">
                     <Image 
                        src={imgSrc} 
                        alt={`${builder.name} logo`} 
                        width={64} 
                        height={64} 
                        className="rounded-lg object-contain border p-1"
                        onError={() => setImgSrc(emptyImage)}
                     />
                    <div>
                        <h2 className="text-lg md:text-xl font-bold">{builder.name}</h2>
                        <p className="text-sm md:text-base text-muted-foreground">{builder.location}</p>
                    </div>
                </div>

                <div className="flex items-center gap-8 text-left md:text-center">
                    <div>
                        <p className="font-bold text-xl md:text-2xl">{builder.totalProjects}</p>
                        <p className="text-xs md:text-sm text-muted-foreground">Total Projects</p>
                    </div>
                    <div>
                        <p className="font-bold text-xl md:text-2xl">{builder.experience} Years</p>
                        <p className="text-xs md:text-sm text-muted-foreground">Experience</p>
                    </div>
                </div>
            </div>

            <Tabs defaultValue="completed" className="mt-4 flex-grow flex flex-col">
                <TabsList className="grid-cols-none justify-start p-0 h-auto bg-transparent border-b">
                    <TabsTrigger value="completed">Completed ({builder.completedProjects.length})</TabsTrigger>
                    <TabsTrigger value="ongoing">Ongoing ({builder.ongoingProjects.length})</TabsTrigger>
                    <TabsTrigger value="upcoming">Upcoming ({builder.upcomingProjects.length})</TabsTrigger>
                </TabsList>

                <div className="mt-4 flex-grow">
                    <TabsContent value="completed" className="mt-0 h-full">
                        <ScrollArea>
                            <div className="flex space-x-4 pb-4">
                                {builder.completedProjects.slice(0, 3).map(project => (
                                    <ProjectCard key={project.id} project={project} view="grid" />
                                ))}
                                {builder.completedProjects.length > 3 && (
                                    <div className="w-40 flex-shrink-0">
                                        <div className="relative h-24 rounded-lg overflow-hidden bg-muted flex items-center justify-center">
                                            <Button variant="outline" className="bg-background">
                                                +{builder.completedProjects.length - 3} View All
                                            </Button>
                                        </div>
                                    </div>
                                )}
                            </div>
                            <ScrollBar orientation="horizontal" />
                        </ScrollArea>
                    </TabsContent>
                    <TabsContent value="ongoing" className="mt-0 h-full">
                         <ScrollArea>
                            <div className="flex space-x-4 pb-4">
                                {builder.ongoingProjects.slice(0, 3).map(project => (
                                    <ProjectCard key={project.id} project={project} view="grid" />
                                ))}
                                {builder.ongoingProjects.length > 3 && (
                                    <div className="w-40 flex-shrink-0">
                                        <div className="relative h-24 rounded-lg overflow-hidden bg-muted flex items-center justify-center">
                                            <Button variant="outline" className="bg-background">
                                                +{builder.ongoingProjects.length - 3} View All
                                            </Button>
                                        </div>
                                    </div>
                                )}
                            </div>
                            <ScrollBar orientation="horizontal" />
                        </ScrollArea>
                    </TabsContent>
                    <TabsContent value="upcoming" className="mt-0 h-full">
                         <ScrollArea>
                            <div className="flex space-x-4 pb-4">
                                {builder.upcomingProjects.slice(0, 3).map(project => (
                                    <ProjectCard key={project.id} project={project} view="grid" />
                                ))}
                                {builder.upcomingProjects.length > 3 && (
                                    <div className="w-40 flex-shrink-0">
                                        <div className="relative h-24 rounded-lg overflow-hidden bg-muted flex items-center justify-center">
                                            <Button variant="outline" className="bg-background">
                                                +{builder.upcomingProjects.length - 3} View All
                                            </Button>
                                        </div>
                                    </div>
                                )}
                            </div>
                            <ScrollBar orientation="horizontal" />
                        </ScrollArea>
                    </TabsContent>
                </div>
            </Tabs>
             <div className="mt-auto pt-4">
                <Separator className="mb-4"/>
                <div className="text-right">
                    <Button asChild variant="default" className="w-full md:w-auto bg-accent hover:bg-accent/90 text-accent-foreground">
                        <Link href={`/builders/${builder.id}`}>View Details</Link>
                    </Button>
                </div>
            </div>
        </div>
    )
}
