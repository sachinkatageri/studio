
"use client";

import Image from 'next/image';
import { PlaceHolderImages } from '@/lib/placeholder-images';
import { Card, CardContent, CardHeader, CardTitle, CardFooter } from '@/components/ui/card';
import { properties } from './property-list';
import { Button } from '../ui/button';
import { X, Phone, Share2, Navigation, Wifi, Users, Printer, Coffee, Clock, Presentation, Gamepad2, Car, Zap, Utensils, Armchair, Warehouse, ShieldCheck, Home, Star, AlertTriangle, Heart, MapPin } from 'lucide-react';
import { Badge } from '../ui/badge';
import { Separator } from '../ui/separator';
import { formatDistanceToNow } from 'date-fns';

const WhatsAppIcon = () => (
    <svg
      role="img"
      viewBox="0 0 24 24"
      xmlns="http://www.w3.org/2000/svg"
      className="h-4 w-4 fill-current"
    >
      <title>WhatsApp</title>
      <path d="M12.04 2.016c-5.523 0-10 4.477-10 10s4.477 10 10 10c1.554 0 3.045-.356 4.378-1.004l4.58 1.005-1.04-4.47c.72-1.39 1.12-3.01 1.12-4.71s-4.478-9.82-10.038-9.82zm4.19 12.06c-.195.345-.78.64-1.12.72-.29.07-.66.1-1.07-.06-.8-.31-1.59-.72-2.24-1.22s-1.15-1.1-1.6-1.8c-.13-.21-.26-.44-.35-.67-.36-.91-.18-1.42.15-1.8.1-.12.23-.15.34-.15.11 0 .22 0 .31.01.1.01.15.02.24.11.16.15.25.38.28.42.06.1.08.23.01.37-.1.21-.15.33-.24.43-.09.1-.18.2-.26.3-.08.08-.16.17-.06.31.08.13.33.56.73.94.55.51 1.05.81 1.4.92.17.05.28.04.38-.02.1-.06.41-.49.52-.66.11-.17.22-.18.37-.11.16.07.95.45 1.12.53s.27.12.31.18.06.27.01.52z" />
    </svg>
);


interface PropertyInfoCardProps {
  propertyId: string;
  onClose: () => void;
}

const amenityIcons: { [key: string]: React.ReactNode } = {
  'High-Speed WiFi': <Wifi className="h-4 w-4" />,
  'Meeting Rooms': <Users className="h-4 w-4" />,
  'Printing': <Printer className="h-4 w-4" />,
  'Coffee Bar': <Coffee className="h-4 w-4" />,
  '24/7 Access': <Clock className="h-4 w-4" />,
  'Event Space': <Presentation className="h-4 w-4" />,
  'Game Zone': <Gamepad2 className="h-4 w-4" />,
  'Free Tea & Coffee': <Coffee className="h-4 w-4" />,
  'Main Road Facing': <Car className="h-4 w-4" />,
  'Ample Parking': <Car className="h-4 w-4" />,
  'Power Backup': <Zap className="h-4 w-4" />,
  'Full Kitchen': <Utensils className="h-4 w-4" />,
  'Seating Area': <Armchair className="h-4 w-4" />,
  'Restrooms': <Home className="h-4 w-4" />,
  'Valet Parking': <Car className="h-4 w-4" />,
  'Loading Dock': <Warehouse className="h-4 w-4" />,
  '24/7 Security': <ShieldCheck className="h-4 w-4" />,
  'High Ceilings': <Home className="h-4 w-4" />,
  'Swimming Pool': <Home className="h-4 w-4" />, // Placeholder
  'Gym': <Home className="h-4 w-4" />, // Placeholder
  'Clubhouse': <Home className="h-4 w-4" />, // Placeholder
  'Private Garden': <Home className="h-4 w-4" />, // Placeholder
  'Community Park': <Home className="h-4 w-4" />, // Placeholder
  'Jogging Track': <Home className="h-4 w-4" />, // Placeholder
  'Gated Community': <ShieldCheck className="h-4 w-4" />,
};


export function PropertyInfoCard({ propertyId, onClose }: PropertyInfoCardProps) {
  const property = properties.find(p => p.id === propertyId);
  const propertyImage = PlaceHolderImages.find(p => p.id === propertyId);
  const mapImage = PlaceHolderImages.find(p => p.id === 'map-location');

  if (!property) return null;
  
  // @ts-ignore
  const postedDate = property.postedOn ? formatDistanceToNow(new Date(property.postedOn), { addSuffix: true }) : null;

  return (
    <Card className="w-96 shadow-2xl flex flex-col max-h-[calc(100vh-6rem)]">
      <CardHeader className="p-0 relative">
        {propertyImage && (
          <div className="relative h-48 w-full">
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
        <div className="absolute top-2 left-2 flex gap-2">
            <Button variant="secondary" size="icon" className='h-8 w-8 rounded-full'>
                <Navigation className='h-4 w-4' />
            </Button>
            <Button variant="secondary" size="icon" className='h-8 w-8 rounded-full'>
                <Share2 className='h-4 w-4' />
            </Button>
            <Button variant="secondary" size="icon" className='h-8 w-8 rounded-full'>
                <Heart className='h-4 w-4' />
            </Button>
        </div>
        <div className="absolute bottom-0 left-0 p-4 bg-gradient-to-t from-black/80 to-transparent w-full rounded-b-lg">
          <CardTitle className="text-xl font-bold text-white">{property.name}</CardTitle>
          <p className="text-sm text-neutral-300 mt-1">{property.location}</p>
        </div>
      </CardHeader>
      <CardContent className="p-4 space-y-4 overflow-y-auto flex-1">
        <div className="flex justify-between items-center">
          <p className="text-xl font-bold text-primary">₹{property.pricePerSqFt} <span className="text-sm font-normal text-muted-foreground">/sq.ft</span></p>
          {property.status && <Badge variant="secondary">{property.status}</Badge>}
        </div>
        
        {/* @ts-ignore */}
        {property.size && <p className="text-sm "><span className="font-semibold">Size:</span> {property.size} sq. yd.</p>}

        <div className="flex flex-wrap items-center gap-x-4 gap-y-1 text-sm">
            <div className="flex items-center gap-1">
                <Star className="h-4 w-4 text-yellow-400 fill-yellow-400" />
                <span className="font-semibold">{property.rating}</span>
                <span className="text-muted-foreground">({property.reviews} reviews)</span>
            </div>
            <p><span className="font-semibold">Posted by:</span> Owner</p>
             {/* @ts-ignore */}
            {postedDate && <p><span className="font-semibold">Posted:</span> {postedDate}</p>}
        </div>
        

        <Separator />
        
        <div>
            <h4 className="text-sm font-semibold mb-2">About</h4>
            <p className="text-sm text-muted-foreground">{property.about}</p>
        </div>

        <div>
            <h4 className="text-sm font-semibold mb-2">Amenities</h4>
            <div className="flex flex-wrap gap-2">
                {/* @ts-ignore */}
                {property.amenities?.map((amenity: string) => (
                    <Badge key={amenity} variant="outline" className="font-normal flex items-center gap-2">
                        {amenityIcons[amenity] || <Home className="h-4 w-4" />}
                        {amenity}
                    </Badge>
                ))}
            </div>
        </div>

        <div>
          <h4 className="text-sm font-semibold mb-2">Location</h4>
          <div className="relative h-40 rounded-lg overflow-hidden">
            {mapImage && (
              <Image
                src={mapImage.imageUrl}
                alt={mapImage.description}
                fill
                className="object-cover"
                data-ai-hint={mapImage.imageHint}
              />
            )}
            <div className='absolute inset-0 bg-black/10 flex items-center justify-center'>
                <Button variant="secondary">
                    <MapPin className="mr-2 h-4 w-4" />
                    View on map
                </Button>
            </div>
          </div>
        </div>

        <div className="text-center">
            <Button variant="link" className="text-xs text-muted-foreground h-auto p-0">
                <AlertTriangle className="h-3 w-3 mr-1" />
                Report this property
            </Button>
        </div>

      </CardContent>
      <CardFooter className="p-4 border-t bg-background space-y-2 flex-col items-stretch">
        <div className="flex gap-2">
            <Button className="flex-1">
                <Phone className="mr-2 h-4 w-4" /> Call
            </Button>
            <Button variant="outline" className="flex-1 border-[#25D366] text-[#25D366] hover:bg-[#25D366] hover:text-white">
                <WhatsAppIcon /> WhatsApp
            </Button>
        </div>
        <Button variant="default" className="w-full">
            View Details
        </Button>
      </CardFooter>
    </Card>
  );
}

    