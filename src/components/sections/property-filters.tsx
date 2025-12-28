

'use client';

import { ArrowLeft, MapPin, Locate, Train, Clock, Building, Home as HomeIcon, Search, Check } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { ScrollArea } from '../ui/scroll-area';
import { useState } from 'react';
import { cn } from '@/lib/utils';
import { Slider } from '../ui/slider';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '../ui/tabs';
import { Switch } from '../ui/switch';
import { Label } from '../ui/label';

interface PropertyFiltersProps {
  onBack: () => void;
  onApplyFilters: () => void;
  onClearFilters: () => void;
}

const FilterSection = ({ title, children }: { title: string, children: React.ReactNode }) => (
    <div className="py-4">
        <h3 className="font-semibold text-foreground mb-3">{title}</h3>
        {children}
    </div>
);

const ToggleButton = ({ children, selected, onClick }: { children: React.ReactNode, selected?: boolean, onClick?: () => void }) => (
    <Button
        variant={selected ? 'default' : 'outline'}
        className={cn(
            "w-full justify-center h-auto py-1.5 px-2 text-xs whitespace-normal", // Allow text to wrap
            selected ? "bg-primary text-primary-foreground" : "bg-card hover:bg-muted"
        )}
        onClick={onClick}
    >
        {children}
    </Button>
);

const MultiSelectGrid = ({ options, selection, onToggle, columns = 4 }: { options: string[], selection: string[], onToggle: (option: string) => void, columns?: number }) => (
    <div className={cn("grid gap-2", 
        columns === 5 && "grid-cols-5",
        columns === 4 && "grid-cols-4",
        columns === 3 && "grid-cols-3",
        columns === 2 && "grid-cols-2",
        columns === 1 && "grid-cols-1"
    )}>
        {options.map(option => (
            <Button
                key={option}
                variant={selection.includes(option) ? 'default' : 'outline'}
                className="h-auto text-xs py-1.5 px-2"
                onClick={() => onToggle(option)}
            >
                {selection.includes(option) && <Check className="w-3 h-3 mr-1" />}
                {option}
            </Button>
        ))}
    </div>
);

const SingleSelectGrid = ({ options, selection, onSelect, columns = 2 }: { options: string[], selection: string, onSelect: (option: string) => void, columns?: number }) => (
     <div className={cn("grid gap-2", 
        columns === 3 && "grid-cols-3",
        columns === 2 && "grid-cols-2"
    )}>
        {options.map(option => (
            <ToggleButton key={option} selected={selection === option} onClick={() => onSelect(option)}>
                {option}
            </ToggleButton>
        ))}
    </div>
);


export default function PropertyFilters({ onBack, onApplyFilters, onClearFilters }: PropertyFiltersProps) {
    const [searchType, setSearchType] = useState<'locality' | 'metro' | 'travel'>('locality');
    const [lookingFor, setLookingFor] = useState('Full House');
    const [propertyType, setPropertyType] = useState<string[]>(['Apartment']);
    const [bedrooms, setBedrooms] = useState<string[]>(['2 BHK']);
    const [saleType, setSaleType] = useState('New');
    const [constructionStatus, setConstructionStatus] = useState('Ready To Move');
    const [washrooms, setWashrooms] = useState<string[]>(['+2']);
    const [floors, setFloors] = useState<string[]>([]);
    const [facing, setFacing] = useState<string[]>([]);
    const [reraRegistered, setReraRegistered] = useState(false);
    const [withOffers, setWithOffers] = useState(false);
    const [furnishingStatus, setFurnishingStatus] = useState<string[]>(['Furnished']);
    const [postedBy, setPostedBy] = useState<string[]>(['Owners']);
    const [possessionStatus, setPossessionStatus] = useState<string[]>(['Ready To Move']);
    const [amenities, setAmenities] = useState<string[]>(['24 x 7 Security', 'Power Backup', `Visitor's Parking`]);
    const [bhkType, setBhkType] = useState<string[]>([]);
    const [priceRange, setPriceRange] = useState<[number, number]>([0, 10]);
    const [buildingType, setBuildingType] = useState<'residential' | 'commercial'>('residential');
    const [commercialBuildingTypes, setCommercialBuildingTypes] = useState<string[]>([]);
    
    const toggleMultiSelect = (setter: React.Dispatch<React.SetStateAction<string[]>>, value: string) => {
        setter(prev => prev.includes(value) ? prev.filter(item => item !== value) : [...prev, value]);
    }

    
    const getPlaceholderText = () => {
        switch (searchType) {
            case 'locality':
                return "Search upto 3 localities or landmarks";
            case 'metro':
                return "Search for metro stations";
            case 'travel':
                return "Enter your office/destination";
            default:
                return "Search...";
        }
    }

  return (
    <div className="flex flex-col h-full bg-card">
      <div className="flex items-center justify-between gap-2 p-4 border-b shrink-0 sticky top-0 z-10 bg-card">
        <div className="flex items-center gap-2">
            <Button variant="ghost" size="icon" onClick={onBack}>
              <ArrowLeft className="h-5 w-5" />
            </Button>
            <h2 className="text-lg font-semibold">Filters</h2>
        </div>
        <Button variant="link" className="text-primary p-0 h-auto" onClick={onClearFilters}>Clear all</Button>
      </div>

      <ScrollArea className="flex-1 min-h-0">
        <div className="p-4 divide-y">
            <FilterSection title="Search Type">
                <div className="flex bg-muted rounded-lg p-1 gap-1">
                    <Button 
                        variant="ghost" 
                        className={cn(
                            "w-1/3 text-xs px-2 h-auto py-2",
                            searchType === 'locality' ? 'bg-background shadow-sm' : ''
                        )}
                        onClick={() => setSearchType('locality')}
                    >
                        <MapPin className="mr-2 h-4 w-4"/> Locality
                    </Button>
                    <Button 
                        variant="ghost" 
                        className={cn(
                            "w-1/3 text-xs px-2 h-auto py-2",
                            searchType === 'metro' ? 'bg-background shadow-sm' : ''
                        )}
                        onClick={() => setSearchType('metro')}
                    >
                        <Train className="mr-2 h-4 w-4"/> Along Metro
                    </Button>
                     <Button 
                        variant="ghost" 
                        className={cn(
                            "w-1/3 text-xs px-2 h-auto py-2",
                            searchType === 'travel' ? 'bg-background shadow-sm' : ''
                        )}
                        onClick={() => setSearchType('travel')}
                    >
                        <Clock className="mr-2 h-4 w-4"/> Travel time
                    </Button>
                </div>
                <div className="relative mt-3">
                    <MapPin className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" />
                    <Input 
                        placeholder={getPlaceholderText()}
                        className="pl-10 pr-10" 
                    />
                     <Button variant="ghost" size="icon" className="absolute right-1 top-1/2 -translate-y-1/2 h-9 w-9">
                        <Locate className="h-5 w-5" />
                    </Button>
                </div>
            </FilterSection>

            <FilterSection title="Looking For">
                <div className="grid grid-cols-2 gap-2">
                    <ToggleButton selected={lookingFor === 'Full House'} onClick={() => setLookingFor('Full House')}>
                        Full House
                    </ToggleButton>
                    <ToggleButton selected={lookingFor === 'Land/Plot'} onClick={() => setLookingFor('Land/Plot')}>
                        Land/Plot
                    </ToggleButton>
                </div>
            </FilterSection>
            
            <FilterSection title="Building Type">
                <Tabs value={buildingType} onValueChange={(value) => setBuildingType(value as 'residential' | 'commercial')} className="w-full">
                    <TabsList variant="pill" className="grid w-full grid-cols-2">
                        <TabsTrigger value="residential" variant="pill"><HomeIcon className="mr-2 h-4 w-4" />Residential</TabsTrigger>
                        <TabsTrigger value="commercial" variant="pill"><Building className="mr-2 h-4 w-4" />Commercial</TabsTrigger>
                    </TabsList>
                    <TabsContent value="residential" className="mt-4 space-y-4">
                        <FilterSection title="Property Type">
                            <MultiSelectGrid options={["Plot", "Villa", "Apartment", "Independent House", "Builder Floor", "Penthouse"]} selection={propertyType} onToggle={(v) => toggleMultiSelect(setPropertyType, v)} columns={2}/>
                        </FilterSection>
                        <FilterSection title="Bedrooms">
                             <MultiSelectGrid options={["1 BHK", "1 RK", "1.5 BHK", "2 BHK", "2.5 BHK", "3 BHK", "3.5 BHK", "4 BHK", "5 BHK", "6 BHK", "6+ BHK", "Studio"]} selection={bedrooms} onToggle={(v) => toggleMultiSelect(setBedrooms, v)} columns={3}/>
                        </FilterSection>
                        <FilterSection title="Sale Type">
                            <MultiSelectGrid options={["New", "Resale"]} selection={[saleType]} onToggle={setSaleType} columns={2}/>
                        </FilterSection>
                        <FilterSection title="Construction Status">
                            <MultiSelectGrid options={["Ready To Move", "Under Construction"]} selection={[constructionStatus]} onToggle={setConstructionStatus} columns={2}/>
                        </FilterSection>
                        <FilterSection title="Number of washrooms">
                            <MultiSelectGrid options={["+1", "+2", "+3", "+4", "+5"]} selection={washrooms} onToggle={(v) => toggleMultiSelect(setWashrooms, v)} columns={5}/>
                        </FilterSection>
                        <FilterSection title="Floor">
                             <MultiSelectGrid options={["Basement", "Ground", "1-4", "5-8", "9-12", "13-16", "16+"]} selection={floors} onToggle={(v) => toggleMultiSelect(setFloors, v)} columns={4}/>
                        </FilterSection>
                        <FilterSection title="Facing">
                            <MultiSelectGrid options={["East", "North", "North-East", "North-West", "South", "South-East", "South-West", "West"]} selection={facing} onToggle={(v) => toggleMultiSelect(setFacing, v)} columns={2}/>
                        </FilterSection>
                        <div className="flex items-center justify-between py-4">
                            <Label htmlFor="rera-registered" className="font-semibold">RERA Registered Properties</Label>
                            <Switch id="rera-registered" checked={reraRegistered} onCheckedChange={setReraRegistered} />
                        </div>
                        <div className="flex items-center justify-between py-4">
                            <Label htmlFor="with-offers" className="font-semibold">Properties with Offers</Label>
                            <Switch id="with-offers" checked={withOffers} onCheckedChange={setWithOffers} />
                        </div>
                         <FilterSection title="Furnishing Status">
                            <MultiSelectGrid options={["Furnished", "Semi-Furnished", "Unfurnished", "Gated Communities"]} selection={furnishingStatus} onToggle={(v) => toggleMultiSelect(setFurnishingStatus, v)} columns={2}/>
                        </FilterSection>
                        <FilterSection title="Posted by">
                             <MultiSelectGrid options={["Owners", "Partner Agents"]} selection={postedBy} onToggle={(v) => toggleMultiSelect(setPostedBy, v)} columns={2}/>
                        </FilterSection>
                        <FilterSection title="Possession Status">
                            <MultiSelectGrid options={["Ready To Move", "Under Construction"]} selection={possessionStatus} onToggle={(v) => toggleMultiSelect(setPossessionStatus, v)} columns={2}/>
                        </FilterSection>
                        <FilterSection title="Amenities">
                             <MultiSelectGrid options={["24 x 7 Security", "Attached Market", "Power Backup", "Swimming Pool", "Visitor's Parking", "Clubhouse", "Central AC", "Kids Play Area", "Intercom", "Vaastu Compliant", "Air Conditioned", "Lift"]} selection={amenities} onToggle={(v) => toggleMultiSelect(setAmenities, v)} columns={2}/>
                        </FilterSection>
                    </TabsContent>
                    <TabsContent value="commercial" className="mt-4">
                        <MultiSelectGrid 
                            options={["Independent House", "Business Park", "Mall", "Standalone building", "Independent shop"]}
                            selection={commercialBuildingTypes}
                            onToggle={(v) => toggleMultiSelect(setCommercialBuildingTypes, v)}
                            columns={1}
                        />
                    </TabsContent>
                </Tabs>
            </FilterSection>

        </div>
      </ScrollArea>
      <div className="p-4 border-t bg-card sticky bottom-0">
        <Button className="w-full" onClick={onApplyFilters}>Apply Filters</Button>
      </div>
    </div>
  );
}
