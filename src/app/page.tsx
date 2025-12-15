
"use client";

import Header from '@/components/layout/header';
import MapView from '@/components/sections/map-view';
import PropertyList from '@/components/sections/property-list';
import { useState } from 'react';
import { cn } from '@/lib/utils';

export default function Home() {
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);

  return (
      <div className="flex flex-col h-screen bg-background">
        <Header />
        <div className="flex flex-1 overflow-hidden">
          <aside className={cn(
            "hidden md:flex flex-col border-r transition-all duration-300",
            isSidebarOpen ? "w-[30%]" : "w-0"
          )}>
            {isSidebarOpen && <PropertyList />}
          </aside>
          <main className={cn(
            "relative transition-all duration-300",
            isSidebarOpen ? "w-[70%]" : "w-full"
            )}>
            <MapView isSidebarOpen={isSidebarOpen} toggleSidebar={() => setIsSidebarOpen(!isSidebarOpen)} />
          </main>
        </div>
      </div>
  );
}
