
"use client";

import { useEffect, useState, useRef } from 'react';
import { cn } from '@/lib/utils';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { ScrollArea, ScrollBar } from '@/components/ui/scroll-area';

const navItems = [
    { label: 'Overview', href: '#overview' },
    { label: 'Amenities', href: '#amenities' },
    { label: 'Price Details', href: '#price-estimate' },
    { label: 'Layout', href: '#layout' },
    { label: 'Location', href: '#locality' },
    { label: 'Nearby', href: '#nearby' },
    { label: 'Ratings & Reviews', href: '#ratings-reviews' },
    { label: 'Video', href: '#video' },
    { label: 'Floor Plan', href: '#plan' },
    { label: 'Documents', href: '#documents' },
];

export function PropertyStickyNav() {
    const [isSticky, setIsSticky] = useState(false);
    const [activeId, setActiveId] = useState('');
    const scrollViewportRef = useRef<HTMLDivElement>(null);
    const [showLeftArrow, setShowLeftArrow] = useState(false);
    const [showRightArrow, setShowRightArrow] = useState(true);

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

    const handleHorizontalScroll = () => {
        if (scrollViewportRef.current) {
            const { scrollLeft, scrollWidth, clientWidth } = scrollViewportRef.current;
            setShowLeftArrow(scrollLeft > 0);
            setShowRightArrow(scrollLeft < scrollWidth - clientWidth -1);
        }
    }

    useEffect(() => {
        window.addEventListener('scroll', handleScroll);
        const scrollArea = scrollViewportRef.current;
        if (scrollArea) {
            scrollArea.addEventListener('scroll', handleHorizontalScroll);
            handleHorizontalScroll();
        }

        return () => {
            window.removeEventListener('scroll', handleScroll);
             if (scrollArea) {
                scrollArea.removeEventListener('scroll', handleHorizontalScroll);
            }
        };
    }, []);

    const scroll = (direction: 'left' | 'right') => {
        if (scrollViewportRef.current) {
            const scrollAmount = direction === 'left' ? -200 : 200;
            scrollViewportRef.current.scrollBy({ left: scrollAmount, behavior: 'smooth' });
        }
    };

    return (
        <div className={cn(
            'bg-background transition-all duration-300 z-30',
            isSticky ? 'fixed top-16 left-0 right-0 shadow-md border-b' : 'relative'
        )}>
            <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative">
                {showLeftArrow && (
                    <button 
                        onClick={() => scroll('left')}
                        className="absolute left-0 top-1/2 -translate-y-1/2 z-10 bg-background/80 backdrop-blur-sm rounded-full shadow-md hover:bg-muted"
                    >
                        <ChevronLeft className="h-6 w-6 text-foreground" />
                    </button>
                )}
                <ScrollArea className="w-full whitespace-nowrap" viewportRef={scrollViewportRef}>
                    <div className="flex items-center px-8">
                        {navItems.map((item) => (
                            <a
                                key={item.label}
                                href={item.href}
                                onClick={(e) => handleNavClick(e, item.href)}
                                className={cn(
                                    'inline-block px-4 py-4 text-sm font-semibold uppercase tracking-wider border-b-2 shrink-0',
                                    activeId === item.href.substring(1)
                                        ? 'border-primary text-primary'
                                        : 'border-transparent text-muted-foreground hover:text-primary'
                                )}
                            >
                                {item.label}
                            </a>
                        ))}
                    </div>
                    <ScrollBar orientation="horizontal" className="invisible" />
                </ScrollArea>
                {showRightArrow && (
                    <button 
                        onClick={() => scroll('right')}
                        className="absolute right-0 top-1/2 -translate-y-1/2 z-10 bg-background/80 backdrop-blur-sm rounded-full shadow-md hover:bg-muted"
                    >
                        <ChevronRight className="h-6 w-6 text-foreground" />
                    </button>
                )}
            </div>
        </div>
    );
}
