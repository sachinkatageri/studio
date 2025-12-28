

'use client';

import { ArrowLeft, MapPin, Locate, Train, Clock, Building, Home as HomeIcon } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { ScrollArea } from '../ui/scroll-area';
import { useState } from 'react';
import { cn } from '@/lib/utils';
import { Slider } from '../ui/slider';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '../ui/tabs';

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
        columns === 4 && "grid-cols-4",
        columns === 3 && "grid-cols-3",
        columns === 2 && "grid-cols-2",
        columns === 1 && "grid-cols-1"
    )}>
        {options.map(option => (
            <ToggleButton key={option} selected={selection.includes(option)} onClick={() => onToggle(option)}>
                {option}
            </ToggleButton>
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
    const [bhkType, setBhkType] = useState<string[]>([]);
    const [propertyStatus, setPropertyStatus] = useState('Ready');
    const [furnishing, setFurnishing] = useState('Full');
    const [parking, setParking] = useState<string[]>([]);
    const [priceRange, setPriceRange] = useState<[number, number]>([0, 10]);
    const [buildingType, setBuildingType] = useState<'residential' | 'commercial'>('residential');
    const [commercialBuildingTypes, setCommercialBuildingTypes] = useState<string[]>([]);
    const [residentialBuildingTypes, setResidentialBuildingTypes] = useState<string[]>([]);

    const toggleBhkType = (bhk: string) => {
        setBhkType(prev => prev.includes(bhk) ? prev.filter(item => item !== bhk) : [...prev, bhk]);
    }
     const toggleCommercialBuildingType = (type: string) => {
        setCommercialBuildingTypes(prev => prev.includes(type) ? prev.filter(item => item !== type) : [...prev, type]);
    }
    const toggleResidentialBuildingType = (type: string) => {
        setResidentialBuildingTypes(prev => prev.includes(type) ? prev.filter(item => item !== type) : [...prev, type]);
    }
     const toggleParking = (p: string) => {
        setParking(prev => prev.includes(p) ? prev.filter(item => item !== p) : [...prev, p]);
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

            <FilterSection title="Sale Type">
                <SingleSelectGrid options={["Buy Resale Properties", "New Builder Projects"]} selection="Buy Resale Properties" onSelect={() => {}} />
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
                    <TabsContent value="residential" className="mt-4">
                        <MultiSelectGrid 
                            options={["Apartment", "Gated Community Villa", "Independent House", "Standalone Building"]}
                            selection={residentialBuildingTypes}
                            onToggle={toggleResidentialBuildingType}
                            columns={1}
                        />
                    </TabsContent>
                    <TabsContent value="commercial" className="mt-4">
                        <MultiSelectGrid 
                            options={["Independent House", "Business Park", "Mall", "Standalone building", "Independent shop"]}
                            selection={commercialBuildingTypes}
                            onToggle={toggleCommercialBuildingType}
                            columns={1}
                        />
                    </TabsContent>
                </Tabs>
            </FilterSection>
            
            <FilterSection title="BHK Type">
                <MultiSelectGrid 
                    options={["1 RK", "1 BHK", "2 BHK", "3 BHK", "4 BHK", "4+ BHK"]}
                    selection={bhkType}
                    onToggle={toggleBhkType}
                    columns={3}
                />
            </FilterSection>
            
             <FilterSection title="Price Range">
                <div className="px-2">
                    <Slider 
                      value={priceRange} 
                      onValueChange={(value) => setPriceRange(value as [number, number])}
                      max={10} 
                      step={1} 
                    />
                    <div className="flex justify-between text-sm text-muted-foreground mt-2">
                        <span>₹{priceRange[0]} Cr</span>
                        <span>₹{priceRange[1]}{priceRange[1] === 10 ? ' Cr+' : ' Cr'}</span>
                    </div>
                </div>
            </FilterSection>
            
             <FilterSection title="Property Status">
                <div className="grid grid-cols-2 gap-2">
                    <ToggleButton selected={propertyStatus === 'Under Construction'} onClick={() => setPropertyStatus('Under Construction')}>
                        Under Construction
                    </ToggleButton>
                    <ToggleButton selected={propertyStatus === 'Ready'} onClick={() => setPropertyStatus('Ready')}>
                        Ready
                    </ToggleButton>
                </div>
            </FilterSection>

            <FilterSection title="Furnishing">
                <MultiSelectGrid 
                    options={["Full", "Semi", "None"]}
                    selection={furnishing === 'Full' ? ['Full'] : furnishing === 'Semi' ? ['Semi'] : ['None']}
                    onToggle={(option) => setFurnishing(option as 'Full' | 'Semi' | 'None')}
                    columns={3}
                />
            </FilterSection>
            
            <FilterSection title="Parking">
                <MultiSelectGrid 
                    options={["1", "2", "3+"]}
                    selection={parking}
                    onToggle={toggleParking}
                    columns={4}
                />
            </FilterSection>

        </div>
      </ScrollArea>
      <div className="p-4 border-t bg-card sticky bottom-0">
        <Button className="w-full" onClick={onApplyFilters}>Apply Filters</Button>
      </div>
    </div>
  );
}
