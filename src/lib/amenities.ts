
import { HardHat, BellRing, Package, ShieldCheck, Siren, Video, KeyRound, Coffee, GlassWater, Milk, CupSoda, Clock, Building, User, Wifi, Paperclip, StickyNote, Printer, Pen, Trash2, Phone, Briefcase, Handshake, Zap, Users, Warehouse, Check } from 'lucide-react';
import React from 'react';

export type AmenityCategory = 'GUEST_SERVICES' | 'SECURITY' | 'FOOD_BEVERAGES' | 'CLEANING' | 'PRODUCTIVITY' | 'ON_CREDIT';

export type Amenity = {
    name: string;
    category: AmenityCategory;
    icon: React.ElementType;
};

export const allAmenities: Amenity[] = [
    // GUEST_SERVICES
    { name: 'Guest Check-in', category: 'GUEST_SERVICES', icon: User },
    { name: 'Delivery Acceptance', category: 'GUEST_SERVICES', icon: BellRing },
    { name: 'Package Notification', category: 'GUEST_SERVICES', icon: Package },

    // SECURITY
    { name: 'Fire Safety', category: 'SECURITY', icon: Siren },
    { name: 'Guest Management', category: 'SECURITY', icon: User },
    { name: 'Video Surveillance', category: 'SECURITY', icon: Video },
    { name: 'Keycard Access', category: 'SECURITY', icon: KeyRound },

    // FOOD_BEVERAGES
    { name: 'Tea', category: 'FOOD_BEVERAGES', icon: CupSoda },
    { name: 'Coffee', category: 'FOOD_BEVERAGES', icon: Coffee },
    { name: 'Water', category: 'FOOD_BEVERAGES', icon: GlassWater },
    { name: 'Milk & Sweeteners', category: 'FOOD_BEVERAGES', icon: Milk },
    { name: 'Cups & Mugs', category: 'FOOD_BEVERAGES', icon: CupSoda },
    { name: '24/7 Pantry', category: 'FOOD_BEVERAGES', icon: Clock },
    { name: 'Cafeteria', category: 'FOOD_BEVERAGES', icon: Building },
    { name: 'Food Vendor', category: 'FOOD_BEVERAGES', icon: User },

    // CLEANING
    { name: 'Daily Cleaning', category: 'CLEANING', icon: Trash2 },
    { name: 'Trash Removal', category: 'CLEANING', icon: Trash2 },
    { name: 'Deep Cleaning', category: 'CLEANING', icon: Trash2 },
    { name: '24/7 Cleaning', category: 'CLEANING', icon: Clock },
    { name: 'Pest Control', category: 'CLEANING', icon: ShieldCheck },

    // PRODUCTIVITY
    { name: 'High-Speed WiFi', category: 'PRODUCTIVITY', icon: Wifi },
    { name: 'Tape & Clips', category: 'PRODUCTIVITY', icon: Paperclip },
    { name: 'Sticky Notes', category: 'PRODUCTIVITY', icon: StickyNote },
    { name: 'Printing & Copying', category: 'PRODUCTIVITY', icon: Printer },
    { name: 'Stationery', category: 'PRODUCTIVITY', icon: Pen },
    { name: 'Paper Shredding', category: 'PRODUCTIVITY', icon: Trash2 },
    { name: 'Envelopes', category: 'PRODUCTIVITY', icon: Pen },

    // ON_CREDIT
    { name: 'Phone Booths', category: 'ON_CREDIT', icon: Phone },
    { name: 'Conference Rooms', category: 'ON_CREDIT', icon: Briefcase },
    { name: 'Meeting Rooms', category: 'ON_CREDIT', icon: Briefcase },
    { name: 'Open Desk', category: 'ON_CREDIT', icon: User },
    { name: 'Event Sponsor', category: 'ON_CREDIT', icon: Handshake },
];

export const amenityIcons: { [key: string]: React.ElementType } = {
    'High-Speed WiFi': Wifi,
    'Meeting Rooms': Users,
    'Power Backup': Zap,
    '24/7 Security': ShieldCheck,
    'Loading Dock': Warehouse,
    'Printing': Printer,
    'Coffee Bar': Coffee,
    'Swimming Pool': Check, // Using Check as a generic icon
    'Gym': Check,
    'Clubhouse': Check,
    'Private Garden': Check,
    'Community Park': Check,
    'Jogging Track': Check,
    'Gated Community': ShieldCheck,
    '24/7 Access': Clock,
    'Event Space': Building,
    'Game Zone': Handshake, // Using Handshake as a generic icon
    'Free Tea & Coffee': Coffee,
    'Main Road Facing': Building,
    'Ample Parking': Check,
    'High Ceilings': Check,
  };
