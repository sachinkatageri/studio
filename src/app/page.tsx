

"use client";

import Header from '@/components/layout/header';
import MapView from '@/components/sections/map-view';
import PropertyList from '@/components/sections/property-list';
import { useState, useEffect } from 'react';
import { cn } from '@/lib/utils';
import PropertyFilters from '@/components/sections/property-filters';
import Footer from '@/components/layout/footer';
import { useIsMobile } from '@/hooks/use-mobile';
import { properties } from '@/lib/properties';
import { useRouter } from 'next/navigation';
import { Drawer } from "vaul";
import { Button } from '@/components/ui/button';
import { Menu, X, Search, Globe, SlidersHorizontal } from 'lucide-react';
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '@/components/ui/tooltip';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { Input } from '@/components/ui/input';
import { Separator } from '@/components/ui/separator';
import { Map as MapIcon, Satellite, Mountain, TrafficCone } from 'lucide-react';
import DesktopSearchBar from '@/components/layout/desktop-search-bar';


type SidebarView = 'list' | 'filters';
export type MobileView = 'list' | 'map';

export default function Home() {
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);
  const [sidebarView, setSidebarView] = useState<SidebarView>('list');
  const [areFiltersApplied, setAreFiltersApplied] = useState(false);
  const [mobileView, setMobileView] = useState<MobileView>('map');
  const [selectedPropertyId, setSelectedPropertyId] = useState<string | null>(null);
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);
  const [isFilterDrawerOpen, setIsFilterDrawerOpen] = useState(false);
  const isMobile = useIsMobile();
  const router = useRouter();


  const handleFilterClick = () => {
    if (isMobile) {
      setIsFilterDrawerOpen(true);
    } else {
      setSidebarView(current => (current === 'filters' ? 'list' : 'filters'));
      if (!isSidebarOpen) {
        setIsSidebarOpen(true);
      }
    }
  };

  const handleBackToList = () => {
    if (isMobile) {
      setIsFilterDrawerOpen(false);
    } else {
      setSidebarView('list');
    }
  }

  const handleApplyFilters = () => {
    setAreFiltersApplied(true);
    if (isMobile) {
      setIsFilterDrawerOpen(false);
    } else {
      setSidebarView('list');
    }
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

  const showHeaderAndFooter = !(isMobile && sidebarView === 'filters' && !isFilterDrawerOpen);
  
    const placeholderTexts = ['"Indiranagar"', '"Koramangala"', '"HSR Layout"'];
  const [placeholder, setPlaceholder] = useState('');
  const [textIndex, setTextIndex] = useState(0);
  const [charIndex, setCharIndex] = useState(0);
  const [isDeleting, setIsDeleting] = useState(false);

  useEffect(() => {
    const type = () => {
      const currentText = placeholderTexts[textIndex];
      if (isDeleting) {
        if (charIndex > 0) {
          setPlaceholder(currentText.substring(0, charIndex - 1));
          setCharIndex(charIndex - 1);
        } else {
          setIsDeleting(false);
          setTextIndex((prevIndex) => (prevIndex + 1) % placeholderTexts.length);
        }
      } else {
        if (charIndex < currentText.length) {
          setPlaceholder(currentText.substring(0, charIndex + 1));
          setCharIndex(charIndex + 1);
        } else {
          setTimeout(() => setIsDeleting(true), 2000); // Pause before deleting
        }
      }
    };

    const typingSpeed = isDeleting ? 100 : 150;
    const timeout = setTimeout(type, typingSpeed);
    return () => clearTimeout(timeout);
  }, [charIndex, isDeleting, textIndex]);


  if (isMobile) {
    return (
      <>
      <Drawer.Root open={isDrawerOpen} onOpenChange={setIsDrawerOpen} shouldScaleBackground>
        <div className="relative flex flex-col h-screen bg-background">
          <Header onFilterClick={handleFilterClick} areFiltersApplied={areFiltersApplied} />
          <div className="flex-1 flex flex-col overflow-hidden pt-14">
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
              >
                 <Drawer.Trigger asChild>
                    <div className={cn(
                        "absolute left-4 z-10 transition-all duration-300",
                        "bottom-20",
                         selectedPropertyId ? "bottom-[28rem]" : "bottom-20"
                    )}>
                        <Button variant="secondary" className="shadow-lg h-9 px-3">
                            <Menu className="mr-2 h-4 w-4" />
                            List View
                        </Button>
                    </div>
                  </Drawer.Trigger>
              </MapView>
            </main>
          </div>
          <Footer />
        </div>
        <Drawer.Portal>
          <Drawer.Overlay className="fixed inset-0 bg-black/40 z-50" />
          <Drawer.Content className="bg-background flex flex-col rounded-t-[10px] h-[96%] mt-24 fixed bottom-0 left-0 right-0 z-50">
            <Drawer.Title className="sr-only">Property List</Drawer.Title>
            <div className="p-0 bg-background rounded-t-[10px] flex-1 flex flex-col">
              <div className="p-4 flex items-center justify-between mb-0 border-b">
                <div className="mx-auto w-12 h-1.5 flex-shrink-0 rounded-full bg-muted-foreground/20" />
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
      <Drawer.Root open={isFilterDrawerOpen} onOpenChange={setIsFilterDrawerOpen}>
          <Drawer.Portal>
            <Drawer.Overlay className="fixed inset-0 bg-black/40 z-50" />
            <Drawer.Content className="bg-background flex flex-col h-[96%] fixed bottom-0 left-0 right-0 z-50">
                <Drawer.Title className="sr-only">Property Filters</Drawer.Title>
                <PropertyFilters onBack={handleBackToList} onApplyFilters={handleApplyFilters} onClearFilters={handleClearFilters} />
            </Drawer.Content>
          </Drawer.Portal>
        </Drawer.Root>
      </>
    )
  }

  return (
      <div className="relative flex flex-col h-screen bg-background">
        {showHeaderAndFooter && <Header onFilterClick={handleFilterClick} areFiltersApplied={areFiltersApplied} />}
        <div className="flex flex-1 flex-col md:flex-row overflow-hidden pt-14">
            <aside className={cn(
              "flex-col border-r transition-all duration-300 relative",
              "md:flex",
              isSidebarOpen ? "w-full md:w-[20%]" : "w-0",
              mobileView === 'list' || (isMobile && sidebarView === 'filters') ? "flex h-full" : 'hidden'
            )}>
              <div className="absolute top-4 left-4 right-4 z-10 hidden md:flex justify-between items-center gap-2">
                <DesktopSearchBar areFiltersApplied={areFiltersApplied} onFilterClick={handleFilterClick} />
              </div>
              <div className="pt-20 w-full flex-1 min-h-0">
                {sidebarView === 'list' 
                    ? <PropertyList onSelectProperty={handleSelectProperty} selectedPropertyId={selectedPropertyId} setMobileView={setMobileView} /> 
                    : <PropertyFilters onBack={handleBackToList} onApplyFilters={handleApplyFilters} onClearFilters={handleClearFilters} />
                }
              </div>
            </aside>
            <main className={cn(
              "relative transition-all duration-300 flex-1",
              "md:block",
              isSidebarOpen ? "md:w-[80%]" : "w-full",
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
