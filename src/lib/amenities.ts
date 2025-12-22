
import { HardHat, BellRing, Package, ShieldCheck, Siren, Video, KeyRound, TeaCup, Coffee, GlassWater, Milk, CupSoda, Clock, Building, User, Wifi, Paperclip, StickyNote, Printer, Pen, Trash2, Phone, Briefcase, Handshake } from 'lucide-react';
import React from 'react';

export type AmenityCategory = 'GUEST_SERVICES' | 'SECURITY' | 'FOOD_BEVERAGES' | 'CLEANING' | 'PRODUCTIVITY' | 'ON_CREDIT';

export type Amenity = {
    name: string;
    category: AmenityCategory;
    icon: React.ElementType;
};

export const allAmenities: Amenity[] = [
    // GUEST_SERVICES
    { name: 'Guest check-in / registration', category: 'GUEST_SERVICES', icon: User },
    { name: 'Delivery acceptance/notification', category: 'GUEST_SERVICES', icon: BellRing },
    { name: 'Package notification', category: 'GUEST_SERVICES', icon: Package },

    // SECURITY
    { name: 'Fire and safety protocols', category: 'SECURITY', icon: Siren },
    { name: 'Guest management system', category: 'SECURITY', icon: User },
    { name: 'Security guards and video surveillance', category: 'SECURITY', icon: Video },
    { name: 'Keycard access', category: 'SECURITY', icon: KeyRound },

    // FOOD_BEVERAGES
    { name: 'Tea', category: 'FOOD_BEVERAGES', icon: TeaCup },
    { name: 'Coffee', category: 'FOOD_BEVERAGES', icon: Coffee },
    { name: 'Water', category: 'FOOD_BEVERAGES', icon: GlassWater },
    { name: 'Milk / Sweeteners', category: 'FOOD_BEVERAGES', icon: Milk },
    { name: 'Cups, mugs and more', category: 'FOOD_BEVERAGES', icon: CupSoda },
    { name: 'Pantry available 24/7', category: 'FOOD_BEVERAGES', icon: Clock },
    { name: 'Cafeteria', category: 'FOOD_BEVERAGES', icon: Building },
    { name: 'Food Vendor', category: 'FOOD_BEVERAGES', icon: User },

    // CLEANING
    { name: 'Daily upkeep of bathrooms', category: 'CLEANING', icon: Trash2 },
    { name: 'Nightly trash removal', category: 'CLEANING', icon: Trash2 },
    { name: 'Deep - cleaning', category: 'CLEANING', icon: Trash2 },
    { name: '24/7 general cleaning', category: 'CLEANING', icon: Clock },
    { name: 'Pest extermination', category: 'CLEANING', icon: ShieldCheck },

    // PRODUCTIVITY
    { name: 'High-speed Wi-Fi 24/7', category: 'PRODUCTIVITY', icon: Wifi },
    { name: 'Tape and paper clips', category: 'PRODUCTIVITY', icon: Paperclip },
    { name: 'Sticky notes', category: 'PRODUCTIVITY', icon: StickyNote },
    { name: 'Printers and copies', category: 'PRODUCTIVITY', icon: Printer },
    { name: 'Paper, pens, stapler', category: 'PRODUCTIVITY', icon: Pen },
    { name: 'Paper shredding', category: 'PRODUCTIVITY', icon: Trash2 },
    { name: 'Envelopes', category: 'PRODUCTIVITY', icon: Pen },

    // ON_CREDIT
    { name: 'Phone booth access', category: 'ON_CREDIT', icon: Phone },
    { name: 'Conference room access', category: 'ON_CREDIT', icon: Briefcase },
    { name: 'Meeting/conference room', category: 'ON_CREDIT', icon: Briefcase },
    { name: 'Open desk', category: 'ON_CREDIT', icon: User },
    { name: 'Event sponsor', category: 'ON_CREDIT', icon: Handshake },
];
