import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import Image from 'next/image';
import Link from 'next/link';
import { ArrowRight, MapPin } from 'lucide-react';
import { PlaceHolderImages } from '@/lib/placeholder-images';
import { Badge } from '@/components/ui/badge';
import { properties } from '@/lib/properties';

const similarProperties = properties.slice(0, 3);

export default function SimilarProperties() {
  return (
    <section id="projects" className="py-16 sm:py-24">
      <div className="flex flex-wrap justify-between items-center gap-4 mb-12">
        <div>
          <h2 className="text-3xl md:text-4xl font-bold font-headline">Similar Properties</h2>
          <p className="mt-2 text-lg text-muted-foreground">Handpicked properties for you.</p>
        </div>
        <Button variant="outline" asChild>
          <Link href="#">View All Properties <ArrowRight className="ml-2 h-4 w-4" /></Link>
        </Button>
      </div>
      <div className="grid gap-8 grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
        {similarProperties.map((project) => {
          const projectImage = PlaceHolderImages.find(p => p.id === project.id);
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
                {/* @ts-ignore */}
                <p className="mt-4 font-semibold text-lg text-primary">{project.price}</p>
                 <Button className="mt-6 w-full" variant="outline">View Details</Button>
              </CardContent>
            </Card>
          );
        })}
      </div>
    </section>
  );
}
