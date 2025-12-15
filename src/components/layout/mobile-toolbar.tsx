
'use client';

import { List, MapPin } from 'lucide-react';
import { Button } from '../ui/button';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '../ui/select';
import { cn } from '@/lib/utils';

interface MobileToolbarProps {
    mobileView: 'list' | 'map';
    setMobileView: (view: 'list' | 'map') => void;
}

export default function MobileToolbar({ mobileView, setMobileView }: MobileToolbarProps) {
  return (
    <div className="md:hidden flex items-center justify-between p-2 border-b bg-background">
      <div className="flex items-center gap-2">
        <span className="text-sm text-muted-foreground">Sort by:</span>
        <Select defaultValue="builtup-area">
          <SelectTrigger className="w-[180px] h-9">
            <SelectValue placeholder="Sort by" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="builtup-area">Builtup Area High/Low</SelectItem>
            <SelectItem value="price-high-low">Price High/Low</SelectItem>
            <SelectItem value="price-low-high">Price Low/High</SelectItem>
            <SelectItem value="newest">Newest First</SelectItem>
          </SelectContent>
        </Select>
      </div>
      <div className="flex items-center border rounded-md">
        <Button 
            variant={mobileView === 'list' ? 'secondary' : 'ghost'} 
            size="icon" 
            className="h-9 w-9 rounded-r-none border-r"
            onClick={() => setMobileView('list')}
        >
          <List className="h-5 w-5" />
        </Button>
        <Button 
            variant={mobileView === 'map' ? 'secondary' : 'ghost'} 
            size="icon" 
            className="h-9 w-9 rounded-l-none"
            onClick={() => setMobileView('map')}
        >
          <MapPin className={cn("h-5 w-5", mobileView === 'map' ? 'text-primary' : 'text-muted-foreground')} />
        </Button>
      </div>
    </div>
  );
}
