
"use client";

import { useEffect, useState, useRef } from 'react';
import { cn } from '@/lib/utils';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { ScrollArea, ScrollBar } from '@/components/ui/scroll-area';
import { useIsMobile } from '@/hooks/use-mobile';

const navItems = [
    { label: 'Overview', href: '#overview' },
    { label: 'Amenities', href: '#amenities' },
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
    const [activeId, setActiveId] = useState('overview');
    const scrollViewportRef = useRef<HTMLDivElement>(null);
    const [showLeftArrow, setShowLeftArrow] = useState(false);
    const [showRightArrow, setShowRightArrow] = useState(true);
    const navRef = useRef<HTMLDivElement>(null);
    const isMobile = useIsMobile();

    const handleScroll = () => {
        if (!isMobile) {
            const sections = navItems.map(item => document.querySelector(item.href));
            const scrollPosition = window.scrollY + 180; // Adjusted for both headers

            let currentSectionId = '';
            for (let i = sections.length - 1; i >= 0; i--) {
                const section = sections[i];
                if (section && (section as HTMLElement).offsetTop <= scrollPosition) {
                    currentSectionId = section.id;
                    break;
                }
            }
            setActiveId(currentSectionId || 'overview');

            const topNavHeight = 56; // main header height (h-14)
            
            if (navRef.current && window.scrollY > navRef.current.offsetTop - topNavHeight) {
                setIsSticky(true);
            } else {
                setIsSticky(false);
            }
        } else {
             const sections = navItems.map(item => document.querySelector(item.href));
            const scrollPosition = window.scrollY + 120; // Adjusted for mobile header and nav

            let currentSectionId = '';
            for (let i = sections.length - 1; i >= 0; i--) {
                const section = sections[i];
                if (section && (section as HTMLElement).offsetTop <= scrollPosition) {
                    currentSectionId = section.id;
                    break;
                }
            }
            setActiveId(currentSectionId || 'overview');

            if (navRef.current && window.scrollY > navRef.current.offsetTop - 56) {
                setIsSticky(true);
            } else {
                setIsSticky(false);
            }
        }
    };

    const handleNavClick = (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
        e.preventDefault();
        const targetElement = document.querySelector(href);
        if (targetElement) {
            if (!isMobile) {
                const topNavHeight = 56; // main header height (h-14)
                const tabsHeight = 65;
                const totalNavHeight = topNavHeight + tabsHeight;
                const topOffset = targetElement.getBoundingClientRect().top + window.scrollY - totalNavHeight + 10;
                window.scrollTo({
                    top: topOffset,
                    behavior: 'smooth'
                });
            } else {
                const mobileNavHeight = 56 + 48; // Mobile header + sticky nav height
                const topOffset = targetElement.getBoundingClientRect().top + window.scrollY - mobileNavHeight;
                window.scrollTo({
                    top: topOffset,
                    behavior: 'smooth'
                });
            }
        }
    };

    const handleHorizontalScroll = () => {
        if (scrollViewportRef.current) {
            const { scrollLeft, scrollWidth, clientWidth } = scrollViewportRef.current;
            setShowLeftArrow(scrollLeft > 5);
            setShowRightArrow(scrollLeft < scrollWidth - clientWidth - 5);
        }
    }

    useEffect(() => {
        window.addEventListener('scroll', handleScroll);
        const scrollArea = scrollViewportRef.current;
        if (scrollArea) {
            scrollArea.addEventListener('scroll', handleHorizontalScroll);
        }

        // Set initial activeId and scroll state
        handleScroll();
        handleHorizontalScroll();

        return () => {
            window.removeEventListener('scroll', handleScroll);
             if (scrollArea) {
                scrollArea.removeEventListener('scroll', handleHorizontalScroll);
            }
        };
    }, [isMobile]);

    useEffect(() => {
        if (!scrollViewportRef.current || !activeId) return;

        const activeTab = scrollViewportRef.current.querySelector(`[data-id="${activeId}"]`);
        
        if (activeTab) {
            activeTab.scrollIntoView({ behavior: 'smooth', block: 'nearest', inline: 'center' });
        }
        handleHorizontalScroll();
    }, [activeId]);

    const scroll = (direction: 'left' | 'right') => {
        if (scrollViewportRef.current) {
            const scrollAmount = direction === 'left' ? -200 : 200;
            scrollViewportRef.current.scrollBy({ left: scrollAmount, behavior: 'smooth' });
        }
    };

    if (isMobile === undefined) return null; // Avoid rendering on server or during hydration

    return (
        <div ref={navRef} className={cn(
                'relative bg-background top-0 z-30', 
                isSticky && (isMobile ? 'fixed top-14 left-0 right-0 shadow-md border-b h-[48px]' : 'fixed top-14 left-0 right-0 shadow-md border-b h-[65px]'),
                !isSticky && (isMobile ? 'h-[48px] border-b' : 'h-[65px]')
            )}>
            <div className={cn("relative mx-auto flex items-center", isMobile ? 'container' : 'container')}>
                 {isMobile ? (
                    <ScrollArea className="w-full whitespace-nowrap" viewportRef={scrollViewportRef}>
                        <div className="flex">
                             {navItems.map((item) => (
                                <a
                                    key={item.label}
                                    href={item.href}
                                    data-id={item.href.substring(1)}
                                    onClick={(e) => handleNavClick(e, item.href)}
                                    className={cn(
                                        'inline-block px-3 py-3 text-xs font-semibold border-b-2 shrink-0',
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
                 ) : (
                    <>
                    {showLeftArrow && (
                        <button 
                            onClick={() => scroll('left')}
                            className="absolute left-0 top-1/2 -translate-y-1/2 z-10 bg-background/80 backdrop-blur-sm rounded-full shadow-md hover:bg-muted"
                        >
                            <ChevronLeft className="h-6 w-6 text-foreground" />
                        </button>
                    )}
                    <ScrollArea className="w-full whitespace-nowrap" viewportRef={scrollViewportRef}>
                        <div className="flex px-8">
                            {navItems.map((item) => (
                                <a
                                    key={item.label}
                                    href={item.href}
                                    data-id={item.href.substring(1)}
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
                    </>
                 )}
            </div>
        </div>
    );
}
