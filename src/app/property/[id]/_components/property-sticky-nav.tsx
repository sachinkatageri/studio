
"use client";

import { useEffect, useState } from 'react';
import { cn } from '@/lib/utils';
import { ChevronRight } from 'lucide-react';
import { ScrollArea, ScrollBar } from '@/components/ui/scroll-area';

const navItems = [
    { label: 'Overview', href: '#overview' },
    { label: 'Amenities', href: '#amenities' },
    { label: 'Price Details', href: '#price-estimate' },
    { label: 'Location', href: '#locality' },
    { label: 'Ratings & Reviews', href: '#ratings-reviews' },
    { label: 'About Developer', href: '#developer' },
];

export function PropertyStickyNav() {
    const [isSticky, setIsSticky] = useState(false);
    const [activeId, setActiveId] = useState('');

    useEffect(() => {
        const handleScroll = () => {
            const sections = navItems.map(item => document.querySelector(item.href));
            const scrollPosition = window.scrollY + 150;

            let currentSectionId = '';
            for (let i = sections.length - 1; i >= 0; i--) {
                const section = sections[i];
                if (section && (section as HTMLElement).offsetTop <= scrollPosition) {
                    currentSectionId = section.id;
                    break;
                }
            }
            setActiveId(currentSectionId);

            if (window.scrollY > 450) {
                setIsSticky(true);
            } else {
                setIsSticky(false);
            }
        };

        window.addEventListener('scroll', handleScroll);
        return () => {
            window.removeEventListener('scroll', handleScroll);
        };
    }, []);

    const handleNavClick = (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
        e.preventDefault();
        const targetElement = document.querySelector(href);
        if (targetElement) {
            const topOffset = targetElement.getBoundingClientRect().top + window.scrollY - 100;
            window.scrollTo({
                top: topOffset,
                behavior: 'smooth'
            });
        }
    };


    return (
        <div className={cn(
            'bg-background transition-all duration-300 z-30',
            isSticky ? 'fixed top-16 left-0 right-0 shadow-md border-b' : 'relative'
        )}>
            <div className="container mx-auto px-4 sm:px-6 lg:px-8">
                <ScrollArea className="w-full whitespace-nowrap">
                    <div className="flex items-center">
                        {navItems.map((item) => (
                            <a
                                key={item.label}
                                href={item.href}
                                onClick={(e) => handleNavClick(e, item.href)}
                                className={cn(
                                    'inline-block px-4 py-4 text-sm font-semibold uppercase tracking-wider border-b-2',
                                    activeId === item.href.substring(1)
                                        ? 'border-primary text-primary'
                                        : 'border-transparent text-muted-foreground hover:text-primary'
                                )}
                            >
                                {item.label}
                            </a>
                        ))}
                    </div>
                    <ScrollBar orientation="horizontal" />
                </ScrollArea>
            </div>
        </div>
    );
}
