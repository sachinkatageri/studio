
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
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '../ui/select';

interface PropertyFiltersProps {
  onBack: () => void;
  onApplyFilters: () => void;
}

export default function PropertyFilters({ onBack, onApplyFilters }: PropertyFiltersProps) {
  return (
    <div className="flex flex-col h-full bg-card p-4">
      <div className="flex items-center justify-between gap-2 pb-4 border-b">
        <div className="flex items-center gap-2">
            <Button variant="ghost" size="icon" onClick={onBack}>
              <ArrowLeft className="h-5 w-5" />
            </Button>
            <h2 className="text-lg font-semibold">Filters</h2>
        </div>
        <Button variant="link" className="text-primary p-0 h-auto">Clear all</Button>
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
            <CardTitle className="text-base">Listed By</CardTitle>
          </CardHeader>
          <CardContent>
            <RadioGroup defaultValue="all-listed">
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="owner" id="r-owner" />
                <Label htmlFor="r-owner">Owner</Label>
              </div>
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="agent" id="r-agent" />
                <Label htmlFor="r-agent">Agent</Label>
              </div>
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="buildersinfo" id="r-buildersinfo" />
                <Label htmlFor="r-buildersinfo">Buildersinfo</Label>
              </div>
            </RadioGroup>
          </CardContent>
        </Card>

        <div className="space-y-4">
            <h3 className="font-semibold">Budget (In Crores)</h3>
            <div className="space-y-3">
                <div className="flex justify-between items-center">
                    <Label>Range:</Label>
                    <span className="text-sm font-medium">₹0cr - ₹30cr</span>
                </div>
                <Slider defaultValue={[0, 30]} max={100} step={1} />
            </div>
        </div>

        <div className="space-y-4">
            <div className="flex items-center gap-4">
              <h3 className="font-semibold">Size</h3>
              <Select defaultValue="sq-yards">
                <SelectTrigger className="w-[150px]">
                  <SelectValue placeholder="Select unit" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="sq-yards">Square Yards</SelectItem>
                  <SelectItem value="sq-ft">Square Feet</SelectItem>
                  <SelectItem value="acres">Acres</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="space-y-3">
                <div className="flex justify-between items-center">
                    <Label>Range:</Label>
                    <span className="text-sm font-medium">0 - 50,000 sq yd</span>
                </div>
                <Slider defaultValue={[0, 50000]} max={100000} step={100} />
            </div>
        </div>
        
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
        <Button className="w-full" onClick={onApplyFilters}>Apply Filters</Button>
      </div>
    </div>
  );
}
