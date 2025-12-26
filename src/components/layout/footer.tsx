
"use client";

import Link from 'next/link';
import { Map, Building, Home, Crown, Info } from 'lucide-react';
import { cn } from '@/lib/utils';
import { usePathname } from 'next/navigation';

export default function Footer() {
  const pathname = usePathname();

  const navItems = [
    { id: 'map-view', label: 'Map-View', icon: <Map className="h-5 w-5" />, href: '/' },
    { id: 'commercial', label: 'Commercial', icon: <Building className="h-5 w-5" />, href: '#' },
    { id: 'residential', label: 'Residential', icon: <Home className="h-5 w-5" />, href: '#' },
    { id: 'builders', label: 'Builders', icon: <Crown className="h-5 w-5" />, href: '/builders' },
  ];

  const getActiveView = () => {
    if (pathname === '/') return 'map-view';
    if (pathname.startsWith('/builders')) return 'builders';
    if (pathname.startsWith('/commercial')) return 'commercial';
    if (pathname.startsWith('/residential')) return 'residential';
    return '';
  }
  
  const activeView = getActiveView();


  return (
    <footer className="md:hidden fixed bottom-0 z-40 w-full bg-background border-t shadow-[0_-4px_12px_rgba(0,0,0,0.05)] rounded-t-lg">
      <div className="container mx-auto h-14 flex justify-around items-center">
        {navItems.map((item) => (
          <Link
            key={item.id}
            href={item.href}
            className={cn(
              "flex flex-col items-center justify-center gap-1 transition-colors w-full h-full",
              activeView === item.id ? "text-primary" : "text-muted-foreground hover:text-primary"
            )}>
            {item.icon}
            <span className="text-xs font-medium">{item.label}</span>
          </Link>
        ))}
      </div>
    </footer>
  );
}
