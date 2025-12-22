
"use client";

import Header from '@/components/layout/header';
import MapView from '@/components/sections/map-view';
import PropertyList from '@/components/sections/property-list';
import { useState } from 'react';
import { cn } from '@/lib/utils';
import PropertyFilters from '@/components/sections/property-filters';
import Footer from '@/components/layout/footer';
import { useIsMobile } from '@/hooks/use-mobile';
import { properties } from '@/lib/properties';
import { useRouter } from 'next/navigation';
import { Drawer } from "vaul";
import { Button } from '@/components/ui/button';
import { X } from 'lucide-react';

type SidebarView = 'list' | 'filters';
export type MobileView = 'list' | 'map';

export default function Home() {
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);
  const [sidebarView, setSidebarView] = useState<SidebarView>('list');
  const [areFiltersApplied, setAreFiltersApplied] = useState(false);
  const [mobileView, setMobileView] = useState<MobileView>('map');
  const [selectedPropertyId, setSelectedPropertyId] = useState<string | null>(null);
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);
  const isMobile = useIsMobile();
  const router = useRouter();


  const handleFilterClick = () => {
    setSidebarView(current => (current === 'filters' ? 'list' : 'filters'));
    if (!isSidebarOpen) {
      setIsSidebarOpen(true);
    }
    if (isMobile) {
      setMobileView('list');
    }
  };

  const handleBackToList = () => {
    setSidebarView('list');
  }

  const handleApplyFilters = () => {
    setAreFiltersApplied(true);
    setSidebarView('list');
  }
  
  const handleClearFilters = () => {
    setAreFiltersApplied(false);
  }

  const handleSelectProperty = (propertyId: string) => {
    setSelectedPropertyId(propertyId);
    if (window.innerWidth < 768) { // md breakpoint
      setMobileView('map');
      setIsDrawerOpen(false);
    }
  }
  
  const handleMarkerClick = (propertyId: string) => {
    setSelectedPropertyId(propertyId);
  }

  const handleCloseInfoCard = () => {
    setSelectedPropertyId(null);
  }
  
  const handleViewDetails = (propertyId: string) => {
    router.push(`/property/${propertyId}`);
  }

  const showHeaderAndFooter = !(isMobile && sidebarView === 'filters');

  if (isMobile) {
    return (
      <Drawer.Root open={isDrawerOpen} onOpenChange={setIsDrawerOpen} shouldScaleBackground>
        <div className="relative flex flex-col h-screen bg-background">
          <Header onFilterClick={handleFilterClick} areFiltersApplied={areFiltersApplied} />
          <div className="flex-1 flex flex-col overflow-hidden">
            <main className="relative flex-1">
              <MapView 
                isSidebarOpen={isSidebarOpen} 
                toggleSidebar={() => setIsSidebarOpen(!isSidebarOpen)}
                onFilterClick={handleFilterClick}
                areFiltersApplied={areFiltersApplied}
                selectedPropertyId={selectedPropertyId}
                onCloseInfoCard={handleCloseInfoCard}
                onMarkerClick={handleMarkerClick}
                onViewDetails={handleViewDetails}
              />
            </main>
          </div>
          <Footer />
        </div>
        <Drawer.Portal>
          <Drawer.Overlay className="fixed inset-0 bg-black/40 z-50" />
          <Drawer.Content className="bg-background flex flex-col rounded-t-[10px] h-[96%] mt-24 fixed bottom-0 left-0 right-0 z-50">
            <div className="p-4 bg-background rounded-t-[10px] flex-1 flex flex-col">
              <div className="flex items-center justify-between mb-4">
                <div className="mx-auto w-12 h-1.5 flex-shrink-0 rounded-full bg-muted-foreground/20" />
                <Drawer.Close asChild>
                  <Button variant="ghost" size="icon" className="h-8 w-8">
                    <X className="h-4 w-4" />
                  </Button>
                </Drawer.Close>
              </div>

              <div className="flex-1 overflow-y-auto">
                <PropertyList 
                  onSelectProperty={handleSelectProperty} 
                  selectedPropertyId={selectedPropertyId} 
                  setMobileView={() => {}} // No-op as we are in drawer
                />
              </div>
            </div>
          </Drawer.Content>
        </Drawer.Portal>
      </Drawer.Root>
    )
  }

  return (
      <div className="relative flex flex-col h-screen bg-background md:h-auto">
        {showHeaderAndFooter && <Header onFilterClick={handleFilterClick} areFiltersApplied={areFiltersApplied} />}
        <div className="flex flex-1 flex-col md:flex-row md:overflow-hidden pt-14">
            <aside className={cn(
              "flex-col border-r transition-all duration-300",
              "md:flex",
              isSidebarOpen ? "w-full md:w-[30%]" : "w-0",
              mobileView === 'list' || (isMobile && sidebarView === 'filters') ? 'flex h-full' : 'hidden'
            )}>
              {sidebarView === 'list' 
                  ? <PropertyList onSelectProperty={handleSelectProperty} selectedPropertyId={selectedPropertyId} setMobileView={setMobileView} /> 
                  : <PropertyFilters onBack={handleBackToList} onApplyFilters={handleApplyFilters} onClearFilters={handleClearFilters} />
              }
            </aside>
            <main className={cn(
              "relative transition-all duration-300 flex-1",
              "md:block",
              isSidebarOpen ? "md:w-[70%]" : "w-full",
              mobileView === 'map' ? 'block w-full' : 'hidden',
              isMobile && sidebarView === 'filters' && 'hidden'
              )}>
              <MapView 
                isSidebarOpen={isSidebarOpen} 
                toggleSidebar={() => setIsSidebarOpen(!isSidebarOpen)}
                onFilterClick={handleFilterClick}
                areFiltersApplied={areFiltersApplied}
                selectedPropertyId={selectedPropertyId}
                onCloseInfoCard={handleCloseInfoCard}
                onMarkerClick={handleMarkerClick}
                onViewDetails={handleViewDetails}
                setMobileView={setMobileView}
              />
            </main>
        </div>
        {showHeaderAndFooter && <Footer />}
      </div>
  );
}
