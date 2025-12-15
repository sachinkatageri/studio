
'use client';

import { ArrowLeft } from 'lucide-react';
import { Button } from '@/components/ui/button';
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { Label } from '@/components/ui/label';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Checkbox } from '@/components/ui/checkbox';
import { Slider } from '../ui/slider';
import { Input } from '../ui/input';

interface PropertyFiltersProps {
  onBack: () => void;
}

export default function PropertyFilters({ onBack }: PropertyFiltersProps) {
  return (
    <div className="flex flex-col h-full bg-card p-4">
      <div className="flex items-center gap-2 pb-4 border-b">
        <Button variant="ghost" size="icon" onClick={onBack}>
          <ArrowLeft className="h-5 w-5" />
        </Button>
        <h2 className="text-lg font-semibold">Filters</h2>
      </div>

      <div className="flex-1 overflow-y-auto space-y-6 p-2 mt-4">
        <Card>
          <CardHeader>
            <CardTitle className="text-base">Property Type</CardTitle>
          </CardHeader>
          <CardContent>
            <RadioGroup defaultValue="all">
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="all" id="r-all" />
                <Label htmlFor="r-all">All</Label>
              </div>
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="residential" id="r-residential" />
                <Label htmlFor="r-residential">Residential</Label>
              </div>
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="commercial" id="r-commercial" />
                <Label htmlFor="r-commercial">Commercial</Label>
              </div>
            </RadioGroup>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="text-base">Price Range</CardTitle>
          </CardHeader>
          <CardContent className='pt-2'>
            <Slider defaultValue={[25, 75]} />
             <div className="flex justify-between text-sm text-muted-foreground mt-2">
                <span>$100k</span>
                <span>$2M</span>
              </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="text-base">Area (sq. ft.)</CardTitle>
          </CardHeader>
          <CardContent className="flex items-center gap-2">
            <Input type="number" placeholder="Min" />
            <span>-</span>
            <Input type="number" placeholder="Max" />
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader>
            <CardTitle className="text-base">Amenities</CardTitle>
          </CardHeader>
          <CardContent className="space-y-2">
            <div className="flex items-center space-x-2">
              <Checkbox id="amenity-parking" />
              <Label htmlFor="amenity-parking">Parking</Label>
            </div>
            <div className="flex items-center space-x-2">
              <Checkbox id="amenity-pool" />
              <Label htmlFor="amenity-pool">Swimming Pool</Label>
            </div>
            <div className="flex items-center space-x-2">
              <Checkbox id="amenity-gym" />
              <Label htmlFor="amenity-gym">Gym</Label>
            </div>
          </CardContent>
        </Card>
      </div>
      <div className="pt-4 border-t mt-auto">
        <Button className="w-full">Apply Filters</Button>
      </div>
    </div>
  );
}
