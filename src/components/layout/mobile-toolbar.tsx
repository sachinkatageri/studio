
'use client';

import { ArrowUpDown, List, MapPin, PlusCircle } from 'lucide-react';
import { Button } from '../ui/button';
import { cn } from '@/lib/utils';
import { SortSheet } from './sort-sheet';

interface MobileToolbarProps {
    mobileView: 'list' | 'map';
    setMobileView: (view: 'list' | 'map') => void;
}

export default function MobileToolbar({ mobileView, setMobileView }: MobileToolbarProps) {
  return (
    <div className="md:hidden flex items-center justify-between p-2 border-b bg-background">
      <div className="flex items-center gap-2">
        <SortSheet>
          <Button variant="outline" size="icon" className="h-9 w-9">
            <ArrowUpDown className="h-4 w-4" />
          </Button>
        </SortSheet>
         <Button variant="outline" size="sm" className="h-9">
            <PlusCircle className="mr-2 h-4 w-4" />
            List
          </Button>
      </div>
      <div className="p-1 bg-muted rounded-lg flex items-center">
        <Button
          variant={mobileView === 'list' ? 'secondary' : 'ghost'}
          size="sm"
          className="h-7"
          onClick={() => setMobileView('list')}
        >
          <List className="mr-2 h-4 w-4" />
          List
        </Button>
        <Button
          variant={mobileView === 'map' ? 'secondary' : 'ghost'}
          size="sm"
          className="h-7"
          onClick={() => setMobileView('map')}
        >
          <MapPin className="mr-2 h-4 w-4" />
          Map
        </Button>
      </div>
    </div>
  );
}
