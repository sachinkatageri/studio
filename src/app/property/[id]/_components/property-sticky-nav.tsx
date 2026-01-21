"use client";

import { useEffect, useState, useRef } from 'react';
import { cn } from '@/lib/utils';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { ScrollArea, ScrollBar } from '@/components/ui/scroll-area';
import { useIsMobile } from '@/hooks/use-mobile';

const navItems = [
    { label: 'Overview', href: '#info' },
    { label: 'Specs', href: '#specs' },
    { label: 'Infrastructure', href: '#custom-infra' },
    { label: 'Amenities', href: '#amenities' },
    { label: 'Details', href: '#details' },
    { label: 'Nearby', href: '#nearby' },
    { label: 'Brand', href: '#brand' },
    { label: 'Floor Plan', href: '#floor-plan' },
    { label: 'Ratings', href: '#ratings-reviews' },
];

export function PropertyStickyNav() {
    const [isSticky, setIsSticky] = useState(false);
    const [activeId, setActiveId] = useState('info');
    const scrollViewportRef = useRef<HTMLDivElement>(null);
    const [showLeftArrow, setShowLeftArrow] = useState(false);
    const [showRightArrow, setShowRightArrow] = useState(true);
    const navRef = useRef<HTMLDivElement>(null);
    const isMobile = useIsMobile();
    const [isPropertyHeaderVisible, setIsPropertyHeaderVisible] = useState(false);

    const handleScroll = () => {
        const propertyHeaderVisible = !isMobile && window.scrollY > 350;
        setIsPropertyHeaderVisible(propertyHeaderVisible);

        const sections = navItems.map(item => document.querySelector(item.href));
        let scrollPosition = window.scrollY;

        if (isMobile) {
            scrollPosition += 120; // mobile header + nav
        } else {
            let offset = 180;
            if(!propertyHeaderVisible) offset -= 64; // aporox height of property sticky header
            scrollPosition += offset;
        }

        let currentSectionId = '';
        for (let i = sections.length - 1; i >= 0; i--) {
            const section = sections[i];
            if (section && (section as HTMLElement).offsetTop <= scrollPosition) {
                currentSectionId = section.id;
                break;
            }
        }
        setActiveId(currentSectionId || 'info');

        const topNavHeight = 56; // main header height (h-14)
        
        if (navRef.current && window.scrollY > navRef.current.offsetTop - topNavHeight) {
            setIsSticky(true);
        } else {
            setIsSticky(false);
        }
    };

    const handleNavClick = (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
        e.preventDefault();
        const targetElement = document.querySelector(href);
        if (targetElement) {
            let totalNavHeight = 0;
            if (!isMobile) {
                const mainHeaderHeight = 56;
                const propertyStickyHeaderHeight = 64;
                const tabsHeight = 56;
                totalNavHeight = mainHeaderHeight + tabsHeight;
                if (window.scrollY > 350) {
                    totalNavHeight += propertyStickyHeaderHeight;
                }
            } else {
                totalNavHeight = 56 + 48; // Mobile header + sticky nav height
            }
            
            const topOffset = targetElement.getBoundingClientRect().top + window.scrollY - totalNavHeight;
            window.scrollTo({
                top: topOffset,
                behavior: 'smooth'
            });
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
                isSticky && (isMobile ? 'fixed top-14 left-0 right-0 shadow-md border-b h-[48px]' : cn('fixed left-0 right-0 shadow-md border-b h-14', isPropertyHeaderVisible ? 'top-[90px]' : 'top-14')),
                !isSticky && (isMobile ? 'h-[48px] border-b' : 'h-14')
            )}>
            <div className={cn("relative mx-auto flex items-center h-full", isMobile ? 'container' : 'container')}>
                 {isMobile ? (
                    <ScrollArea className="w-full whitespace-nowrap" viewportRef={scrollViewportRef}>
                        <div className="flex h-full items-center">
                             {navItems.map((item) => (
                                <a
                                    key={item.label}
                                    href={item.href}
                                    data-id={item.href.substring(1)}
                                    onClick={(e) => handleNavClick(e, item.href)}
                                    className={cn(
                                        'inline-block px-3 py-3 text-xs font-semibold border-b-2 shrink-0 h-full flex items-center',
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
                        <div className="flex px-8 h-full items-center">
                            {navItems.map((item) => (
                                <a
                                    key={item.label}
                                    href={item.href}
                                    data-id={item.href.substring(1)}
                                    onClick={(e) => handleNavClick(e, item.href)}
                                    className={cn(
                                        'inline-flex items-center px-4 h-full text-sm font-semibold uppercase tracking-wider border-b-2 shrink-0',
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
