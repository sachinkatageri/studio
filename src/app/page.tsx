
"use client";

import Header from '@/components/layout/header';
import MapView from '@/components/sections/map-view';
import PropertyList from '@/components/sections/property-list';
import { useState } from 'react';
import { cn } from '@/lib/utils';
import PropertyFilters from '@/components/sections/property-filters';

type SidebarView = 'list' | 'filters';

export default function Home() {
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);
  const [sidebarView, setSidebarView] = useState<SidebarView>('list');

  const handleFilterClick = () => {
    setSidebarView(current => (current === 'filters' ? 'list' : 'filters'));
    if (!isSidebarOpen) {
      setIsSidebarOpen(true);
    }
  };

  const handleBackToList = () => {
    setSidebarView('list');
  }

  return (
      <div className="flex flex-col h-screen bg-background">
        <Header />
        <div className="flex flex-1 overflow-hidden">
          <aside className={cn(
            "hidden md:flex flex-col border-r transition-all duration-300",
            isSidebarOpen ? "w-[30%]" : "w-0"
          )}>
            {isSidebarOpen && (
              sidebarView === 'list' 
                ? <PropertyList /> 
                : <PropertyFilters onBack={handleBackToList} />
            )}
          </aside>
          <main className={cn(
            "relative transition-all duration-300",
            isSidebarOpen ? "w-[70%]" : "w-full"
            )}>
            <MapView 
              isSidebarOpen={isSidebarOpen} 
              toggleSidebar={() => setIsSidebarOpen(!isSidebarOpen)}
              onFilterClick={handleFilterClick}
            />
          </main>
        </div>
      </div>
  );
}
