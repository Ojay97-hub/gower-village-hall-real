export const ADMIN_ROLES = [
    {
        id: 'blog',
        label: 'Blog',
        description: 'Create, edit and publish blog posts',
        color: 'blue',
    },
    {
        id: 'bookings',
        label: 'Hall Bookings',
        description: 'View and manage hall booking enquiries',
        color: 'green',
    },
    {
        id: 'coffee_mornings',
        label: 'Coffee Mornings',
        description: 'Manage coffee morning events and announcements',
        color: 'amber',
    },
] as const;

export type AdminRole = typeof ADMIN_ROLES[number]['id'];

/** Tailwind classes for each role colour */
export const ROLE_COLORS: Record<string, { badge: string; dot: string }> = {
    blue:  { badge: 'bg-blue-50 text-blue-700 border-blue-100',   dot: 'bg-blue-400' },
    green: { badge: 'bg-green-50 text-green-700 border-green-100', dot: 'bg-green-400' },
    amber: { badge: 'bg-amber-50 text-amber-700 border-amber-100', dot: 'bg-amber-400' },
};
