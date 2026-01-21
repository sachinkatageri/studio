"use client";

import { useEffect, useState, useRef } from 'react';
import { cn } from '@/lib/utils';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { ScrollArea, ScrollBar } from '@/components/ui/scroll-area';
import { useIsMobile } from '@/hooks/use-mobile';

const navItems = [
    { label: 'Overview', href: '#info' },
    { label: 'Specs', href: '#specs' },
    { label: 'Amenities', href: '#amenities' },
    { label: 'Floor Plan', href: '#floor-plan' },
    { label: 'Nearby', href: '#nearby' },
    { label: 'Ratings', href: '#ratings-reviews' },
    { label: 'Brand', href: '#brand' },
    { label: 'Details', href: '#details' },
    { label: 'Infrastructure', href: '#custom-infra' },
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
        if (!navRef.current) return;

        const propertyHeaderVisible = !isMobile && window.scrollY > 350;
        setIsPropertyHeaderVisible(propertyHeaderVisible);

        const sections = navItems.map(item => document.querySelector(item.href) as HTMLElement).filter(Boolean);
        
        let scrollPosition = window.scrollY;
        let stickyHeaderHeight = 0;
        if (isMobile) {
            stickyHeaderHeight = 56 + 48; // mobile header + nav
        } else {
            stickyHeaderHeight = 56 + 56; // main header + nav
            if(propertyHeaderVisible) {
                stickyHeaderHeight += 64; // property sticky header
            }
        }
        
        // Add a small offset to make the active state trigger a bit earlier
        const activationOffset = 5;
        scrollPosition += stickyHeaderHeight + activationOffset;

        let currentSectionId = '';
        for (const section of sections) {
            if (section.offsetTop <= scrollPosition) {
                currentSectionId = section.id;
            } else {
                break;
            }
        }
        setActiveId(currentSectionId || (sections.length > 0 ? sections[0].id : ''));

        const topNavHeight = 56; // main header height (h-14)
        const galleryElement = document.getElementById('info')?.parentElement;
        
        if (galleryElement && window.scrollY > (galleryElement.offsetTop + galleryElement.offsetHeight) - topNavHeight) {
            setIsSticky(true);
        } else {
            setIsSticky(false);
        }
    };

    const handleNavClick = (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
        e.preventDefault();
        const targetElement = document.querySelector(href) as HTMLElement;
        if (targetElement) {
            const propertyHeaderVisible = !isMobile && window.scrollY > 350;
            let totalNavHeight = 0;
            if (!isMobile) {
                const mainHeaderHeight = 56;
                const propertyStickyHeaderHeight = 64;
                const tabsHeight = 56;
                totalNavHeight = mainHeaderHeight + tabsHeight;
                if (propertyHeaderVisible) {
                    totalNavHeight += propertyStickyHeaderHeight;
                }
            } else {
                totalNavHeight = 56 + 48; // Mobile header + sticky nav height
            }
            
            const topOffset = targetElement.offsetTop - totalNavHeight;
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
        window.addEventListener('scroll', handleScroll, { passive: true });
        const scrollArea = scrollViewportRef.current;
        if (scrollArea) {
            scrollArea.addEventListener('scroll', handleHorizontalScroll, { passive: true });
        }
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

    if (isMobile === undefined) return <div className={cn('h-14', isMobile && 'h-0')} />;

    return (
        <div ref={navRef} className={cn(
                'bg-background z-30 transition-all duration-200', 
                isSticky 
                    ? cn('fixed left-0 right-0 shadow-md border-b', isMobile ? 'top-14 h-[48px]' : 'h-14', isPropertyHeaderVisible ? 'top-[90px]' : 'top-14')
                    : cn('relative', isMobile ? 'h-0 invisible' : 'mt-6')
            )}>
             {(!isMobile || isSticky) && (
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
             )}
        </div>
    );
}
