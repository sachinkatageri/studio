
"use client";

import Header from '@/components/layout/header';
import MapView from '@/components/sections/map-view';
import PropertyList from '@/components/sections/property-list';
import { useState } from 'react';
import { cn } from '@/lib/utils';
import PropertyFilters from '@/components/sections/property-filters';
import MobileToolbar from '@/components/layout/mobile-toolbar';
import Footer from '@/components/layout/footer';

type SidebarView = 'list' | 'filters';
export type MobileView = 'list' | 'map';

export default function Home() {
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);
  const [sidebarView, setSidebarView] = useState<SidebarView>('list');
  const [areFiltersApplied, setAreFiltersApplied] = useState(false);
  const [mobileView, setMobileView] = useState<MobileView>('map');
  const [selectedPropertyId, setSelectedPropertyId] = useState<string | null>(null);

  const handleFilterClick = () => {
    setSidebarView(current => (current === 'filters' ? 'list' : 'filters'));
    if (!isSidebarOpen) {
      setIsSidebarOpen(true);
    }
  };

  const handleBackToList = () => {
    setSidebarView('list');
  }

  const handleApplyFilters = () => {
    setAreFiltersApplied(true);
    setSidebarView('list');
  }

  const handleSelectProperty = (propertyId: string) => {
    setSelectedPropertyId(propertyId);
    if (window.innerWidth < 768) { // md breakpoint
      setMobileView('map');
    }
  }
  
  const handleMarkerClick = (propertyId: string) => {
    setSelectedPropertyId(propertyId);
  }

  const handleCloseInfoCard = () => {
    setSelectedPropertyId(null);
  }

  return (
      <div className="flex flex-col h-screen bg-background">
        <Header />
        <MobileToolbar mobileView={mobileView} setMobileView={setMobileView} />
        <div className="flex flex-1 overflow-hidden">
          <aside className={cn(
            "flex-col border-r transition-all duration-300",
            "md:flex",
            isSidebarOpen ? "w-[30%]" : "w-0",
            mobileView === 'list' ? 'flex w-full' : 'hidden'
          )}>
            {sidebarView === 'list' 
                ? <PropertyList onSelectProperty={handleSelectProperty} /> 
                : <PropertyFilters onBack={handleBackToList} onApplyFilters={handleApplyFilters} />
            }
          </aside>
          <main className={cn(
            "relative transition-all duration-300",
            "md:block",
            isSidebarOpen ? "w-[70%]" : "w-full",
            mobileView === 'map' ? 'block w-full' : 'hidden'
            )}>
            <MapView 
              isSidebarOpen={isSidebarOpen} 
              toggleSidebar={() => setIsSidebarOpen(!isSidebarOpen)}
              onFilterClick={handleFilterClick}
              areFiltersApplied={areFiltersApplied}
              selectedPropertyId={selectedPropertyId}
              onCloseInfoCard={handleCloseInfoCard}
              onMarkerClick={handleMarkerClick}
            />
          </main>
        </div>
        <Footer mobileView={mobileView} setMobileView={setMobileView} />
      </div>
  );
}
