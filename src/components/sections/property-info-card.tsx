
"use client";

import Image from 'next/image';
import { PlaceHolderImages } from '@/lib/placeholder-images';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { properties } from './property-list';
import { Button } from '../ui/button';
import { X, Phone, MessageSquare } from 'lucide-react';
import { Badge } from '../ui/badge';

interface PropertyInfoCardProps {
  propertyId: string;
  onClose: () => void;
}

export function PropertyInfoCard({ propertyId, onClose }: PropertyInfoCardProps) {
  const property = properties.find(p => p.id === propertyId);
  const propertyImage = PlaceHolderImages.find(p => p.id === propertyId);

  if (!property) return null;

  return (
    <Card className="w-80 shadow-2xl">
      <CardHeader className="p-0 relative">
        {propertyImage && (
          <div className="relative h-40 w-full">
            <Image
              src={propertyImage.imageUrl}
              alt={propertyImage.description}
              fill
              className="object-cover rounded-t-lg"
              data-ai-hint={propertyImage.imageHint}
            />
          </div>
        )}
        <Button variant="ghost" size="icon" className="absolute top-2 right-2 bg-black/30 hover:bg-black/50 text-white hover:text-white rounded-full h-8 w-8" onClick={onClose}>
          <X className="h-4 w-4" />
        </Button>
        <div className="absolute bottom-0 left-0 p-3 bg-gradient-to-t from-black/80 to-transparent w-full rounded-b-lg">
          <CardTitle className="text-lg font-bold text-white">{property.name}</CardTitle>
          <p className="text-sm text-neutral-300">{property.location}</p>
        </div>
      </CardHeader>
      <CardContent className="p-4 space-y-3">
        <div className="flex justify-between items-center">
          <p className="text-lg font-bold text-primary">₹{property.pricePerSqFt} <span className="text-sm font-normal text-muted-foreground">/sq.ft</span></p>
          {/* @ts-ignore */}
          {property.status && <Badge variant="secondary">{property.status}</Badge>}
        </div>
        
        {/* @ts-ignore */}
        {property.size && <p className="text-sm "><span className="font-semibold">Size:</span> {property.size} sq. yd.</p>}

        <p className="text-sm"><span className="font-semibold">Posted by:</span> Owner</p>

        <div className="flex gap-2 pt-2">
            <Button className="flex-1">
                <Phone className="mr-2 h-4 w-4" /> Call
            </Button>
            <Button variant="outline" className="flex-1">
                <MessageSquare className="mr-2 h-4 w-4" /> Message
            </Button>
        </div>

      </CardContent>
    </Card>
  );
}
