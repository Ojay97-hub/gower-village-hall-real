import { createClient } from '@supabase/supabase-js';
import * as dotenv from 'dotenv';
import { fileURLToPath } from 'url';
import { dirname, resolve } from 'path';

// Load env vars
const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);
dotenv.config({ path: resolve(__dirname, '../.env') });

const supabaseUrl = process.env.VITE_SUPABASE_URL;
const supabaseServiceKey = process.env.VITE_SUPABASE_SERVICE_ROLE_KEY || process.env.SUPABASE_SERVICE_ROLE_KEY; // Needs service key to bypass RLS

if (!supabaseUrl || !supabaseServiceKey) {
  console.error("Missing SUPABASE_URL or SUPABASE_SERVICE_ROLE_KEY in environment variables.");
  process.exit(1);
}

const supabase = createClient(supabaseUrl, supabaseServiceKey);

// Import the old data
// We can't easily import the .ts file directly from vanilla node without ts-node,
// so let's just copy the array here for the one-time run.
const blogPosts = [
    {
        title: "Summer Fête Returns Main Highlight",
        slug: "summer-fete-returns-main",
        excerpt: "Join us this July for the biggest village fête yet. Expect live music, local crafts, and fun for the whole family.",
        content: [
            "We are thrilled to announce that the Gower Village Fête is returning this July, and it promises to be the biggest and best one yet. After months of planning by our dedicated committee, we have put together a packed schedule of activities, entertainment, and local showcases.",
            "This year, the fête will once again be held on the village green, providing a picturesque backdrop for a day of community celebration. Visitors can look forward to a wide array of attractions, including traditional stalls, exciting games, and a vibrant artisan market featuring the very best crafts from local makers.",
            "Food lovers will be spoiled for choice with our expanded food court, offering everything from classic Welsh cakes and savory pastries to international street food. Don't forget to visit the classic tea tent for a refreshing brew and a slice of homemade cake.",
            "Live entertainment will run throughout the afternoon, with performances from local bands, a children's choir, and a special headline act that we'll be revealing closer to the date. There will also be plenty of activities for the little ones, including face painting, a bouncy castle, and traditional fairground rides.",
            "The annual produce show will also be making a return, giving local gardeners and bakers the chance to show off their best fruit, vegetables, and preserves. Make sure to get your entries in early!",
            "We can't wait to welcome everyone back for what is sure to be a fantastic day out for the whole family. Mark your calendars for Saturday, 15th July, and stay tuned for more updates."
        ],
        category: "Events",
        published_at: "2023-06-15T10:00:00Z",
    },
    {
        title: "Refurbishment Complete",
        slug: "refurbishment-complete",
        excerpt: "The village hall's interior has been fully updated. See the new facilities including the modern kitchen and accessibility improvements.",
        content: [
            "We are absolutely delighted to announce that the major refurbishment of the Gower Village Hall interior is now complete. This ambitious project, which has been months in the making, has transformed our beloved hall into a modern, accessible, and welcoming space for all.",
            "The heart of the refurbishment is the brand-new, commercial-grade kitchen. Designed to cater for large events, it features state-of-the-art appliances, ample preparation space, and improved hygiene facilities. This will be a game-changer for community dining events, weddings, and local caterers hiring the hall.",
            "Accessibility was a key priority for this project. We have installed a new ramped entrance, widened internal doorways, and added a fully compliant accessible washroom. We are committed to ensuring that the hall can be enjoyed by everyone in our community, regardless of their mobility needs.",
            "The main hall itself has received a much-needed facelift. The beautiful original wooden floor has been sanded and refinished, bringing it back to its former glory. We've also upgraded the lighting system to energy-efficient LEDs, which offer both bright, functional light and warm, atmospheric settings for evening events.",
            "A fresh coat of paint throughout, using a calming and neutral palette, has breathed new life into the entire building. The committee room has also been updated with new flooring and comfortable seating, making it an ideal space for smaller meetings and workshops.",
            "We would like to extend our heartfelt thanks to all the volunteers who helped with the painting and decorating, and to everyone who contributed to the fundraising efforts that made this possible. The hall is now ready to serve the community for generations to come."
        ],
        category: "Community",
        published_at: "2023-05-20T14:30:00Z",
    },
    {
        title: "A History of St. Illtyd's",
        slug: "history-st-illtyds",
        excerpt: "Discover the fascinating history of our local 12th-century church, from its Norman roots to the present day.",
        content: [
            "Standing proudly at the heart of our community, St. Illtyd's Church is a testament to centuries of local history. This beautifully preserved 12th-century building holds many stories within its ancient stone walls.",
            "The original church on this site is believed to have been founded by St. Illtyd himself in the 6th century, though no physical trace of that early wooden structure remains. The current stone church dates primarily from the Norman period, with significant additions made in the 13th and 14th centuries.",
            "One of the most striking features is the sturdy Norman tower, originally built not just for housing the bells, but also as a place of refuge during times of coastal raids. The thick walls and narrow slit windows offer a glimpse into the turbulent past of the Gower peninsula.",
            "Inside, the church is home to some remarkable historical artifacts. The finely carved stone font, dating back to the 12th century, has been used for baptisms in the village for over 800 years. The intricately crafted rood screen, though partially restored in Victorian times, still contains elements of the original 15th-century woodwork.",
            "St. Illtyd's has witnessed the ebb and flow of life in the village for generations. From times of great hardship to moments of joyous celebration, the church has been a constant presence. The surrounding churchyard, with its weathered gravestones, serves as a poignant record of the families who have lived and worked here.",
            "Today, St. Illtyd's remains an active place of worship and a vital part of our community. Its enduring beauty and historical significance make it a cherished landmark, drawing visitors and providing a quiet place for reflection. We encourage everyone to take a moment to explore this wonderful piece of our heritage."
        ],
        category: "Heritage",
        published_at: "2023-04-10T09:15:00Z",
    },
    {
        title: "Spring Wildlife Walk",
        slug: "spring-wildlife-walk",
        excerpt: "Join local expert David Thomas for a guided walk exploring the flora and fauna of the surrounding Gower countryside.",
        content: [
            "As the days lengthen and the weather warms, the Gower countryside bursts into life. It's the perfect time to explore the diverse habitats around our village, and we are excited to announce a guided Spring Wildlife Walk, led by local naturalist David Thomas.",
            "David, who has spent decades studying the wildlife of the Gower peninsula, will take us on a fascinating journey through local woodlands, meadows, and along the coastal paths. His deep knowledge and passion for nature will help us discover hidden wonders we might otherwise miss.",
            "The walk will focus on identifying the vibrant spring flora that is currently carpeting the woodlands, including bluebells, wild garlic, and early purple orchids. David will explain the ecological importance of these plants and how they support the local food web.",
            "We will also be keeping our eyes and ears open for returning migratory birds. Spring is an excellent time for birdwatching, and we hope to spot warblers, swallows, and perhaps even a elusive cuckoo. David will provide tips on identifying bird songs and calls.",
            "The route is approximately three miles long and includes some uneven terrain, so sturdy footwear is highly recommended. Please dress appropriately for the weather, as it can change quickly on the coast. Don't forget to bring your binoculars if you have them!",
            "This is a wonderful opportunity to learn more about the incredible natural environment right on our doorstep and to enjoy a healthy, informative morning out in the fresh air. The walk will conclude back at the village hall with a well-deserved cup of tea and a slice of cake."
        ],
        category: "Nature",
        published_at: "2023-03-25T11:45:00Z",
    },
    {
        title: "New Booking System Live",
        slug: "new-booking-system-live",
        excerpt: "We've upgraded our hall booking process. You can now check availability and request dates entirely online.",
        content: [
            "We are very pleased to announce the launch of our new online booking system for the Gower Village Hall. This upgrade is designed to make the process of hiring the hall smoother, faster, and more convenient for everyone.",
            "Previously, booking the hall required contacting our booking secretary directly, which could sometimes lead to delays. Now, you can view the hall's current availability in real-time by checking the calendar on our website.",
            "The new system allows you to easily browse available dates and times, select the slot that suits your needs, and submit a booking request online. You will then receive a prompt email confirmation once your request has been reviewed and approved.",
            "This digital approach not only improves the experience for our users but also greatly streamlines the administrative work for our volunteer committee. It ensures that bookings are managed efficiently and reduces the risk of double-bookings.",
            "We understand that some members of our community may prefer the traditional method, so our booking secretary is still available to assist with inquiries over the phone or via email. However, we encourage everyone to give the new online system a try.",
            "We believe this update is a significant step forward in modernizing the hall's operations and improving the service we provide to the community. Please visit the 'Bookings' page on our website to see the new system in action."
        ],
        category: "Community",
        published_at: "2023-02-05T08:30:00Z",
    },
    {
        title: "Autumn Craft Fair Announcement",
        slug: "autumn-craft-fair",
        excerpt: "Get ready for our annual Autumn Craft Fair. We are now accepting applications from local artisans and stallholders.",
        content: [
            "As the leaves begin to turn and the air grows crisp, we're already looking ahead to one of the highlights of our calendar: the Gower Village Autumn Craft Fair. This beloved annual event is a celebration of local creativity and a fantastic opportunity to find unique, handmade goods.",
            "The fair will take place in the village hall on Saturday, October 28th, from 10:00 AM to 4:00 PM. We'll be transforming the hall into a bustling marketplace, showcasing the extraordinary talents of artists and makers from across the Gower peninsula and beyond.",
            "We are currently accepting applications from prospective stallholders. Whether you create beautiful ceramics, intricate jewelry, hand-woven textiles, bespoke woodwork, or delicious artisanal foods, we want to hear from you. The fair is an excellent platform to reach a large, appreciative audience.",
            "We strive to curate a diverse selection of stalls, ensuring a wide range of high-quality products for our visitors to peruse. It's the perfect place to start your Christmas shopping early and support independent local businesses.",
            "In addition to the wonderful crafts, the fair will feature a popular local café pop-up, serving warming soups, freshly baked breads, and sweet treats throughout the day. It's a great excuse to meet up with friends, browse the stalls, and enjoy the cozy autumn atmosphere.",
            "If you're interested in booking a stall, please download the application form from our website or pick one up from the village shop. Spaces fill up quickly, so early application is advised. We look forward to another successful and inspiring craft fair!"
        ],
        category: "Events",
        published_at: "2023-09-01T15:20:00Z",
    }
];

async function seed() {
    console.log("Starting seed process...");

    for (const post of blogPosts) {
        // Convert paragraphs to markdown
        const markdown = post.content.join('\n\n');

        const { error } = await supabase.from('blog_posts').insert({
            title: post.title,
            slug: post.slug,
            excerpt: post.excerpt,
            content_markdown: markdown,
            category: post.category,
            published: true, // Auto publish seeded posts
            published_at: post.published_at,
            hero_image_url: null, // Don't migrate static images directly, allow admins to upload them
            featured: post.slug.includes("main") // Make the first one featured based on slug
        });

        if (error) {
            console.error(`Failed to insert ${post.slug}:`, error.message);
        } else {
            console.log(`Inserted ${post.slug}`);
        }
    }

    console.log("Seed complete.");
}

seed();
