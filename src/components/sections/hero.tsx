import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Search } from 'lucide-react';
import Image from 'next/image';
import { PlaceHolderImages } from '@/lib/placeholder-images';

export default function Hero() {
  const heroImage = PlaceHolderImages.find(p => p.id === "hero-image-1");
  return (
    <section className="relative h-[600px] flex items-center justify-center text-center">
      {heroImage && (
        <Image
          src={heroImage.imageUrl}
          alt={heroImage.description}
          fill
          className="object-cover"
          data-ai-hint={heroImage.imageHint}
          priority
        />
      )}
      <div className="absolute inset-0 bg-black/50" />
      <div className="relative container mx-auto px-4 sm:px-6 lg:px-8 z-10 text-white">
        <h1 className="text-4xl md:text-6xl font-extrabold font-headline tracking-tight">
          Find Your Dream Property
        </h1>
        <p className="mt-4 max-w-2xl mx-auto text-lg md:text-xl text-neutral-200">
          Discover thousands of properties, projects, and builders in your city.
        </p>
        <div className="mt-8 max-w-xl mx-auto flex flex-col sm:flex-row items-center gap-2">
          <div className="relative w-full">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" />
            <Input
              type="text"
              placeholder="Search for property, project, or builder..."
              className="w-full pl-10 h-12 text-foreground"
            />
          </div>
          <Button size="lg" className="w-full sm:w-auto h-12">Search</Button>
        </div>
      </div>
    </section>
  );
}
