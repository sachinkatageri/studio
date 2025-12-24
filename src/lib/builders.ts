
export type Project = {
    id: string;
    name: string;
    location: string;
    price: string;
    imageUrl: string;
    imageHint: string;
};

export type Builder = {
    id: string;
    name: string;
    location: string;
    logoUrl: string;
    totalProjects: number;
    experience: number; // in years
    completedProjects: Project[];
    ongoingProjects: Project[];
    upcomingProjects: Project[];
};

export const builders: Builder[] = [
    {
        id: 'prestige-group',
        name: 'Prestige Group',
        location: 'Bangalore',
        logoUrl: 'https://i.ibb.co/3cYf6C5/prestige-logo.png',
        totalProjects: 120,
        experience: 35,
        completedProjects: [
            { id: 'p1', name: 'Prestige Greens', location: 'Whitefield, Bangalore', price: '₹ 1.5 Cr - 2.5 Cr', imageUrl: 'https://picsum.photos/seed/p1/400/300', imageHint: 'modern apartment' },
            { id: 'p2', name: 'Prestige Acropolis', location: 'Koramangala, Bangalore', price: '₹ 2.2 Cr - 3.8 Cr', imageUrl: 'https://picsum.photos/seed/p2/400/300', imageHint: 'luxury residence' },
            { id: 'p3', name: 'Prestige Lakeside Habitat', location: 'Varthur, Bangalore', price: '₹ 80 L - 1.5 Cr', imageUrl: 'https://picsum.photos/seed/p3/400/300', imageHint: 'villa exterior' },
        ],
        ongoingProjects: [],
        upcomingProjects: [],
    },
    ...Array.from({ length: 9 }, (_, i) => ({
        id: `builder-${10 - i}`,
        name: `Builder Name ${10 - i}`,
        location: 'Bangalore',
        logoUrl: `https://i.ibb.co/dMYW960/builder-logo.png`,
        totalProjects: 150 + i * 5,
        experience: 10 + i,
        completedProjects: [
            { id: `b${10 - i}-p1`, name: `Project Alpha ${10 - i}`, location: 'HSR Layout, Bangalore', price: '₹ 1.0 Cr - 1.5 Cr', imageUrl: `https://picsum.photos/seed/b${10 - i}-p1/400/300`, imageHint: 'modern building' },
            { id: `b${10 - i}-p2`, name: `Project Beta ${10 - i}`, location: 'Sarjapur, Bangalore', price: '₹ 80 L - 1.2 Cr', imageUrl: `https://picsum.photos/seed/b${10 - i}-p2/400/300`, imageHint: 'apartment exterior' },
             { id: `b${10 - i}-p3`, name: `Project Gamma ${10 - i}`, location: 'Indiranagar, Bangalore', price: '₹ 1.2 Cr - 2.0 Cr', imageUrl: `https://picsum.photos/seed/b${10-i}-p3/400/300`, imageHint: 'modern home' },
        ],
        ongoingProjects: [
            { id: `b${10 - i}-p-on1`, name: `Ongoing Project 1`, location: 'Marathahalli', price: 'Contact for price', imageUrl: `https://picsum.photos/seed/b${10 - i}-pon1/400/300`, imageHint: 'construction site' },
        ],
        upcomingProjects: [
             { id: `b${10 - i}-p-up1`, name: `Upcoming Project 1`, location: 'Electronic City', price: 'TBD', imageUrl: `https://picsum.photos/seed/b${10 - i}-pup1/400/300`, imageHint: 'architectural plan' },
        ],
    }))
];
