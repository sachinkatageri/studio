
"use client";

import Link from 'next/link';
import { Map, List } from 'lucide-react';
import { usePathname } from 'next/navigation';
import { cn } from '@/lib/utils';

export default function Footer() {
  const pathname = usePathname();

  const navItems = [
    { href: "/map-view", label: "Map View", icon: <Map className="h-5 w-5" /> },
    { href: "/list-view", label: "List View", icon: <List className="h-5 w-5" /> },
  ];

  return (
    <footer className="md:hidden sticky bottom-0 z-40 w-full bg-background border-t">
      <div className="container mx-auto h-16 flex justify-around items-center">
        {navItems.map((item) => (
          <Link 
            key={item.href}
            href="#"
            // The functionality will be fully implemented in a future step.
            // href={item.href} 
            className={cn(
              "flex flex-col items-center justify-center gap-1 transition-colors w-full h-full",
              // pathname === item.href ? "text-primary" : "text-muted-foreground hover:text-primary"
              item.href.includes('map') ? "text-primary" : "text-muted-foreground hover:text-primary"
            )}>
            {item.icon}
            <span className="text-xs font-medium">{item.label}</span>
          </Link>
        ))}
      </div>
    </footer>
  );
}
