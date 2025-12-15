
"use client";

import Link from 'next/link';
import { Map, List } from 'lucide-react';
import { cn } from '@/lib/utils';
import type { MobileView } from '@/app/page';

interface FooterProps {
    mobileView: MobileView;
    setMobileView: (view: MobileView) => void;
}

export default function Footer({ mobileView, setMobileView }: FooterProps) {

  const navItems = [
    { view: "map" as MobileView, label: "Map View", icon: <Map className="h-5 w-5" /> },
    { view: "list" as MobileView, label: "List View", icon: <List className="h-5 w-5" /> },
  ];

  return (
    <footer className="md:hidden sticky bottom-0 z-40 w-full bg-background border-t">
      <div className="container mx-auto h-16 flex justify-around items-center">
        {navItems.map((item) => (
          <button
            key={item.view}
            onClick={() => setMobileView(item.view)}
            className={cn(
              "flex flex-col items-center justify-center gap-1 transition-colors w-full h-full",
              mobileView === item.view ? "text-primary" : "text-muted-foreground hover:text-primary"
            )}>
            {item.icon}
            <span className="text-xs font-medium">{item.label}</span>
          </button>
        ))}
      </div>
    </footer>
  );
}
