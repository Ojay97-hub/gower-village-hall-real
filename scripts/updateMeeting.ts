
import { createClient } from '@supabase/supabase-js';
import dotenv from 'dotenv';
dotenv.config();

const supabaseUrl = process.env.VITE_SUPABASE_URL || '';
const supabaseKey = process.env.VITE_SUPABASE_ANON_KEY || '';

if (!supabaseUrl || !supabaseKey) {
    console.error('Missing Supabase credentials in environment variables');
    process.exit(1);
}

const supabase = createClient(supabaseUrl, supabaseKey);

async function updateMeetingText() {
    console.log('Updating Community Group Meetings text...');

    const { data, error } = await supabase
        .from('regular_activities')
        .update({ action_text: 'Check schedule' })
        .eq('title', 'Community Group Meetings');

    if (error) {
        console.error('Error updating activity:', error);
    } else {
        console.log('Successfully updated activity text to "Check schedule"');
    }
}

updateMeetingText();
