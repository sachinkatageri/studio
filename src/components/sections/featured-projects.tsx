import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import Image from 'next/image';
import Link from 'next/link';
import { ArrowRight, MapPin } from 'lucide-react';
import { PlaceHolderImages } from '@/lib/placeholder-images';
import { Badge } from '@/components/ui/badge';
import { properties } from '@/lib/properties';

const projects = properties.filter(p => ['project-1', 'project-2', 'godown-moula-ali'].includes(p.id));


export default function FeaturedProjects() {
  return (
    <section id="projects" className="py-16 sm:py-24">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-wrap justify-between items-center gap-4 mb-12">
          <div>
            <h2 className="text-3xl md:text-4xl font-bold font-headline">Featured Projects</h2>
            <p className="mt-2 text-lg text-muted-foreground">Handpicked projects for you.</p>
          </div>
          <Button variant="outline" asChild>
            <Link href="#">View All Projects <ArrowRight className="ml-2 h-4 w-4" /></Link>
          </Button>
        </div>
        <div className="grid gap-8 grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
          {projects.map((project) => {
            const projectImage = PlaceHolderImages.find(p => p.id === project.id);
            const offerPriceString = project.price ? String(project.price).replace(/[^0-9.]/g, '') : '0';
            const offerPrice = parseInt(offerPriceString, 10);
            const beforePrice = Math.round(offerPrice * 1.15);
            
            return (
              <Card key={project.id} className="overflow-hidden group">
                <div className="relative h-60">
                  {projectImage && (
                    <Image
                      src={projectImage.imageUrl}
                      alt={projectImage.description}
                      fill
                      className="object-cover transition-transform duration-300 group-hover:scale-105"
                      data-ai-hint={projectImage.imageHint}
                    />
                  )}
                   <Badge className="absolute top-4 left-4" variant={project.status === 'Ready to move' ? 'default' : 'secondary'}>{project.status}</Badge>
                </div>
                <CardContent className="p-6">
                  <h3 className="text-xl font-bold font-headline">{project.name}</h3>
                  <div className="flex items-center text-muted-foreground mt-2">
                    <MapPin className="h-4 w-4 mr-2" />
                    <span>{project.location}</span>
                  </div>
                   {project.size && <p className="mt-2 text-sm text-muted-foreground">Size: {project.size} sq. yd.</p>}

                   <div className="flex items-end gap-2 mt-4">
                    {project.price ? (
                        <>
                          <p className="font-semibold text-lg text-primary">
                              {project.price.startsWith('Starting') ? project.price : `₹${project.price}`}
                          </p>
                          {beforePrice > 0 && offerPrice > 0 && !project.price.startsWith('Starting') && (
                             <p className="text-sm text-muted-foreground line-through">
                                ₹{beforePrice.toLocaleString('en-IN')}
                            </p>
                          )}
                        </>
                    ) : project.pricePerSqFt ? (
                      <p className="font-semibold text-lg text-primary">₹{project.pricePerSqFt} <span className="text-sm font-normal">/sq.ft</span></p>
                    ) : null}
                  </div>

                   <Button className="mt-6 w-full" variant="outline">View Details</Button>
                </CardContent>
              </Card>
            );
          })}
        </div>
      </div>
    </section>
  );
}
