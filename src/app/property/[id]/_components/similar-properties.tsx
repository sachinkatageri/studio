
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
          <h2 className="text-2xl md:text-4xl font-bold font-headline">Similar Properties</h2>
          <p className="mt-2 text-base md:text-lg text-muted-foreground">Handpicked properties for you.</p>
        </div>
        <Button variant="outline" asChild>
          <Link href="#">View All Properties <ArrowRight className="ml-2 h-4 w-4" /></Link>
        </Button>
      </div>
      <div className="grid gap-8 grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
        {similarProperties.map((project) => {
          const projectImage = PlaceHolderImages.find(p => p.id === project.id);
          return (
            <Link key={project.id} href={`/property/${project.id}`} className="group">
              <Card className="overflow-hidden h-full">
                <div className="relative aspect-[4/3]">
                  {projectImage && (
                    <Image
                      src={projectImage.imageUrl}
                      alt={projectImage.description}
                      fill
                      className="object-cover transition-transform duration-300 group-hover:scale-105"
                      data-ai-hint={projectImage.imageHint}
                    />
                  )}
                </div>
                <CardContent className="p-4">
                  <h3 className="text-lg md:text-xl font-bold font-headline">{project.name}</h3>
                  <p className="text-muted-foreground mt-1 text-sm">{project.location}</p>
                  <p className="mt-4 font-bold text-lg md:text-xl text-primary">{project.price}</p>
                </CardContent>
              </Card>
            </Link>
          );
        })}
      </div>
    </section>
  );
}
