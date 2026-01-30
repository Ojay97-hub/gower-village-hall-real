// Seed script for Regular Activities
// Run this file to populate the database with initial regular activities
// Usage: npx ts-node scripts/seedActivities.ts
// Or copy the SQL below and run it directly in your Supabase SQL Editor

/*
-- SQL to insert directly into Supabase (copy and paste into SQL Editor):

INSERT INTO regular_activities (title, description, icon, schedule, color_theme, action_type, action_text, action_link)
VALUES
  (
    'Art Classes',
    'Creative art sessions for all skill levels in a welcoming environment.',
    'Palette',
    'Weekly sessions',
    'sage',
    'button',
    'Check schedule',
    '/contact'
  ),
  (
    'Gower Harmony Choir',
    'Beautiful harmonies and community singing led by Kate Davies.',
    'Music',
    'Weekly rehearsals',
    'forest',
    'link',
    'Learn more',
    '/contact'
  ),
  (
    'Village Coffee Mornings',
    'Join us for coffee, cake, and friendly conversation. All welcome!',
    'Coffee',
    'First Saturday of every month',
    'warm',
    'button',
    'See dates',
    '/contact'
  ),
  (
    'Community Yoga',
    'Relaxing yoga sessions suitable for all abilities and experience levels.',
    'Heart',
    'Thursdays 10am',
    'moss',
    'link',
    'Book a session',
    '/contact'
  ),
  (
    'Book Club',
    'Monthly book discussions in a friendly, welcoming atmosphere.',
    'BookOpen',
    'Last Wednesday of the month',
    'olive',
    'none',
    NULL,
    NULL
  ),
  (
    'Community Group Meetings',
    'Regular meetings for local community groups and organisations.',
    'Users',
    'Various times',
    'slate',
    'button',
    'Enquire about booking',
    '/contact'
  );
*/

// If you want to run this programmatically with Node.js:
import { createClient } from '@supabase/supabase-js';

const supabaseUrl = process.env.VITE_SUPABASE_URL || '';
const supabaseKey = process.env.VITE_SUPABASE_ANON_KEY || '';

const supabase = createClient(supabaseUrl, supabaseKey);

const activities = [
  {
    title: 'Art Classes',
    description: 'Creative art sessions for all skill levels in a welcoming environment.',
    icon: 'Palette',
    schedule: 'Weekly sessions',
    color_theme: 'sage',
    action_type: 'button',
    action_text: 'Check schedule',
    action_link: '/contact',
  },
  {
    title: 'Gower Harmony Choir',
    description: 'Beautiful harmonies and community singing led by Kate Davies.',
    icon: 'Music',
    schedule: 'Weekly rehearsals',
    color_theme: 'forest',
    action_type: 'link',
    action_text: 'Learn more',
    action_link: '/contact',
  },
  {
    title: 'Village Coffee Mornings',
    description: 'Join us for coffee, cake, and friendly conversation. All welcome!',
    icon: 'Coffee',
    schedule: 'First Saturday of every month',
    color_theme: 'warm',
    action_type: 'button',
    action_text: 'See dates',
    action_link: '/contact',
  },
  {
    title: 'Community Yoga',
    description: 'Relaxing yoga sessions suitable for all abilities and experience levels.',
    icon: 'Heart',
    schedule: 'Thursdays 10am',
    color_theme: 'moss',
    action_type: 'link',
    action_text: 'Book a session',
    action_link: '/contact',
  },
  {
    title: 'Book Club',
    description: 'Monthly book discussions in a friendly, welcoming atmosphere.',
    icon: 'BookOpen',
    schedule: 'Last Wednesday of the month',
    color_theme: 'olive',
    action_type: 'none',
    action_text: null,
    action_link: null,
  },
  {
    title: 'Community Group Meetings',
    description: 'Regular meetings for local community groups and organisations.',
    icon: 'Users',
    schedule: 'Various times',
    color_theme: 'slate',
    action_type: 'button',
    action_text: 'Check schedule',
    action_link: '/contact',
  },
];

async function seedActivities() {
  console.log('Seeding regular activities...');

  const { data, error } = await supabase
    .from('regular_activities')
    .insert(activities);

  if (error) {
    console.error('Error seeding activities:', error);
  } else {
    console.log('Successfully seeded activities!', data);
  }
}

seedActivities();
