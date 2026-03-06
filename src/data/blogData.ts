import threeCliffsBay from "../assets/three-cliffs-bay.png";
import torBayBeach from "../assets/tor-bay-beach.png";
import pennardChurch from "../assets/pennard-church.png";
import busyHallPic from "../assets/busy-hall-pic.jpeg";
import cakeMorning from "../assets/cake-morning-summer.jpeg";
import flowerArrangement from "../assets/flower-arrangement.jpg";
import penmaenSign from "../assets/penmaen-sign.jpeg";
import bellFlower from "../assets/bell-flower.jpeg";
import torbay from "../assets/torbay.jpeg";

export type Category = "All" | "Community" | "Events" | "Nature" | "Heritage";

export interface BlogPost {
    id: number;
    slug: string;
    title: string;
    excerpt: string;
    content: string[];
    category: Exclude<Category, "All">;
    image: string;
    date: string;
    readTime: string;
}

export const blogPosts: BlogPost[] = [
    {
        id: 1,
        slug: "guardians-of-three-cliffs",
        title: "Guardians of Three Cliffs: Preserving Gower's Most Iconic Coastline",
        excerpt: "How the local community is working together to protect the stunning Three Cliffs Bay and its surrounding habitats for future generations.",
        content: [
            "Three Cliffs Bay has long been considered one of the most beautiful beaches in Wales, and indeed the whole of the UK. With its dramatic limestone cliffs, sweeping sandy beach, and the picturesque ruins of Pennard Castle overlooking the bay, it's a landscape that has captivated visitors for centuries.",
            "But this natural wonder faces growing pressures. Increased footfall, coastal erosion, and the effects of climate change are all taking their toll on this fragile ecosystem. That's why a group of dedicated local residents have come together to form the Three Cliffs Conservation Group.",
            "The group meets monthly at the village hall to plan their conservation efforts. Their work includes regular beach cleans, dune stabilisation projects, and educational walks for school groups. They've also been working with Natural Resources Wales to monitor the rare plant species that grow in the sand dunes.",
            "\"We're not trying to stop people enjoying the bay,\" says group coordinator Margaret Evans. \"We just want to make sure it's here for our grandchildren and their grandchildren to enjoy too. It's about finding that balance between access and preservation.\"",
            "One of their most successful initiatives has been the installation of new waymarked paths that guide walkers away from the most sensitive dune areas. The paths were designed in consultation with local farmers and the National Trust, and have significantly reduced the trampling of rare orchids and other wildflowers.",
            "The group is always looking for new volunteers. If you'd like to get involved, they meet on the first Saturday of each month at the village hall at 10am. All are welcome, and no experience is necessary — just a love of this incredible corner of the Gower Peninsula.",
        ],
        category: "Nature",
        image: threeCliffsBay,
        date: "28 Feb 2026",
        readTime: "5 min read",
    },
    {
        id: 2,
        slug: "summer-fete-centenary",
        title: "Summer Fête Returns: A Celebration of 100 Years",
        excerpt: "This year's summer fête promises to be the biggest yet as the village hall celebrates its centenary with live music, local food stalls, and family fun.",
        content: [
            "Mark your calendars for what promises to be the event of the decade. On Saturday 18th July, Penmaen and Nicholaston Village Hall will host its annual summer fête — but this year, it's going to be extra special as we celebrate 100 years since the hall first opened its doors to the community.",
            "The hall was built in 1926 by local craftsmen using stone quarried from the nearby hillside. It was funded entirely by donations from the community, and has served as the beating heart of village life ever since. From wartime dances to wedding receptions, from committee meetings to Christmas pantomimes, the hall has seen it all.",
            "This year's fête will feature live music from local bands, a hog roast, craft stalls, children's games, and a special exhibition of photographs documenting the hall's history through the decades. There will also be a display of memorabilia contributed by village residents.",
            "\"We've been overwhelmed by the response,\" says committee chair David Thomas. \"People have been bringing in old photos, programmes from past events, even the original plans for the building. It's going to be a wonderful celebration of everything this hall means to our community.\"",
            "The fête will run from 12pm to 6pm, with live music continuing into the evening. Entry is free, though donations to the hall's maintenance fund are always gratefully received. There will be a licensed bar and plenty of food options, so come hungry!",
            "Volunteers are still needed to help with setup and running stalls on the day. If you can spare a few hours, please contact the committee through the village hall website or pop into the hall during opening hours.",
        ],
        category: "Events",
        image: busyHallPic,
        date: "22 Feb 2026",
        readTime: "4 min read",
    },
    {
        id: 3,
        slug: "pennard-church-medieval-ruins",
        title: "The Story Behind Pennard Church's Medieval Ruins",
        excerpt: "Exploring the fascinating history of the 13th-century church swallowed by sand dunes and what it tells us about life on the Gower Peninsula.",
        content: [
            "Standing on the clifftop above Three Cliffs Bay, the ruined walls of St Mary's Church at Pennard are one of the Gower's most evocative landmarks. But how did a church end up buried in sand dunes, and what does it tell us about life on this peninsula 800 years ago?",
            "The church was built in the early 13th century, during a period of Norman expansion into Wales. It served a small but thriving community of farmers and fishermen who lived in the village of Pennard, which at that time was located much closer to the coast than today's settlement.",
            "The trouble began in the 14th century. A series of devastating sand storms, probably triggered by deforestation and overgrazing of the dunes, began to engulf the village. The sand came in waves, slowly but relentlessly burying homes, fields, and eventually the church itself.",
            "By the early 15th century, the situation had become untenable. The villagers were forced to abandon their homes and move inland to the present-day location of Pennard. The church was left to the elements, its walls gradually disappearing beneath the advancing dunes.",
            "Archaeological excavations in the 20th century revealed the full extent of the buried village, including the foundations of houses, a castle, and field boundaries. Pottery, coins, and other artefacts paint a picture of a community that was surprisingly well-connected to the wider medieval world.",
            "Today, the church ruins are a scheduled ancient monument managed by Cadw. They can be reached via a beautiful walk from Southgate car park, following the cliff path above Pobbles Bay and Three Cliffs Bay. It's a walk that combines stunning coastal scenery with a fascinating glimpse into Gower's turbulent past.",
        ],
        category: "Heritage",
        image: pennardChurch,
        date: "15 Feb 2026",
        readTime: "6 min read",
    },
    {
        id: 4,
        slug: "community-cake-morning",
        title: "Community Cake Morning Raises Record Funds",
        excerpt: "Generous villagers turned up in droves for the spring cake morning, raising over £800 for hall renovations and community projects.",
        content: [
            "The village hall was packed to the rafters last Saturday for what turned out to be our most successful cake morning ever. Over 120 people came through the doors between 10am and 1pm, and between them they raised an incredible £823 for the hall renovation fund.",
            "The tables groaned under the weight of home-baked treats. Victoria sponges, fruit cakes, Welsh cakes, brownies, scones, and more exotic offerings like baklava and Portuguese custard tarts were all on offer, along with endless cups of tea and coffee.",
            "\"The variety and quality of baking was outstanding,\" says organiser Sarah Williams. \"We had contributions from over 30 different bakers, and every single item was homemade. It's a real testament to the generosity and talent of our community.\"",
            "The funds raised will go towards the ongoing renovation of the hall's kitchen, which is being updated to meet modern food hygiene standards. The new kitchen will include a commercial dishwasher, new work surfaces, and improved ventilation.",
            "The cake morning also served as an informal community gathering, with neighbours catching up over tea and new residents getting to know their fellow villagers. Several people signed up to join the hall committee, and a number of new ideas for community events were discussed.",
            "The next cake morning is planned for June, with a strawberries and cream theme to celebrate the start of summer. Watch this space for details!",
        ],
        category: "Community",
        image: cakeMorning,
        date: "10 Feb 2026",
        readTime: "3 min read",
    },
    {
        id: 5,
        slug: "tor-bay-beach-clean",
        title: "Tor Bay Beach Clean: Volunteers Make a Difference",
        excerpt: "Over 60 volunteers gathered for the annual beach clean at Tor Bay, collecting 30 bags of litter and restoring this beautiful stretch of Gower coastline.",
        content: [
            "Armed with bin bags, litter pickers, and plenty of enthusiasm, over 60 volunteers descended on Tor Bay last Sunday for the annual beach clean organised by the Penmaen and Nicholaston Environmental Group.",
            "Despite the chilly February weather, the turnout was the highest yet, with families, dog walkers, and even a group of scouts all pitching in. By the end of the morning, they had collected 30 bags of rubbish, plus several larger items including a car tyre, a broken surfboard, and what appeared to be part of a lobster pot.",
            "\"Most of the litter is plastic,\" explains organiser James Roberts. \"Bottles, packaging, fragments of fishing nets — it all ends up on our beaches eventually. Every piece we pick up is one less piece that could harm marine wildlife.\"",
            "The group also recorded their findings as part of the Marine Conservation Society's national beach clean survey. This data helps scientists track the types and quantities of litter washing up on UK beaches, and informs policy decisions about plastic pollution.",
            "After the clean, volunteers were treated to hot soup and rolls at the village hall, donated by the Gower Inn. It was a chance to warm up, share stories from the morning, and plan future conservation activities.",
            "The environmental group runs beach cleans throughout the year, with the next one planned for April at Pobbles Bay. Equipment is provided, and all ages are welcome. Check the village noticeboard or website for details.",
        ],
        category: "Nature",
        image: torBayBeach,
        date: "5 Feb 2026",
        readTime: "4 min read",
    },
    {
        id: 6,
        slug: "flower-festival-village-hall",
        title: "Flower Festival Brings Colour to the Village Hall",
        excerpt: "Local florists and garden enthusiasts showcased incredible arrangements at this year's flower festival, transforming the hall into a botanical wonderland.",
        content: [
            "For three glorious days last weekend, the village hall was transformed into a riot of colour and fragrance as the annual flower festival took over every corner of the building.",
            "Over 40 displays were created by local florists, garden club members, and talented amateurs, each interpreting this year's theme of 'Seasons of the Gower'. From spring bluebells to autumn berries, every season was represented in stunning floral arrangements.",
            "The highlight of the show was undoubtedly the centrepiece — a six-foot tall arrangement by professional florist Emma Davies that depicted the four seasons in a single display. Using entirely locally-sourced flowers and foliage, it was a masterclass in floral artistry.",
            "\"The standard this year was incredible,\" says flower festival coordinator Anne Price. \"We had entries from people who've never competed before, and some of them were absolutely stunning. It just goes to show how much hidden talent we have in our community.\"",
            "The festival also featured demonstrations of flower arranging techniques, a plant sale, and a children's competition to create the best miniature garden in a seed tray. The winners received gardening vouchers donated by local businesses.",
            "Over 300 visitors attended across the three days, making it the most successful flower festival in the event's 15-year history. Plans are already underway for next year's event, with the theme expected to be announced at the summer fête.",
        ],
        category: "Events",
        image: flowerArrangement,
        date: "1 Feb 2026",
        readTime: "3 min read",
    },
    {
        id: 7,
        slug: "gower-way-local-trails",
        title: "Walking the Gower Way: A Guide to Local Trails",
        excerpt: "From cliff-top paths to woodland walks, discover the best routes for exploring the Gower Peninsula on foot, starting right from the village.",
        content: [
            "One of the great joys of living in or visiting Penmaen and Nicholaston is the incredible network of walking trails that radiate out from the village in every direction. Whether you're looking for a gentle amble or a challenging hike, there's something for everyone.",
            "The most popular route is undoubtedly the cliff path to Three Cliffs Bay. Starting from the village hall car park, this 2-mile walk takes you through farmland and along the clifftop, with breathtaking views of the bay unfolding as you go. Allow about an hour each way, and don't forget your camera.",
            "For something longer, try the circular walk to Oxwich Bay via Nicholaston Woods. This 5-mile route takes you through ancient woodland carpeted with bluebells in spring, before emerging onto the golden sands of Oxwich. Return via the cliff path for a full day's walking.",
            "If you prefer inland walks, the route through Parkmill to Parc le Breos is a gem. This 3-mile walk follows the Ilston stream through a beautiful wooded valley to the Neolithic burial chamber of Parc le Breos, one of the best-preserved prehistoric monuments in Wales.",
            "For the more adventurous, the Gower Way long-distance path passes right through the village. This 35-mile route runs from Rhossili in the west to Penlle'r Castell in the east, and can be walked over two to three days with overnight stops in local accommodation.",
            "Whatever route you choose, remember to wear appropriate footwear, carry water, and check the weather forecast before setting out. Maps of all local walking routes are available from the village hall noticeboard and the Gower Heritage Centre in Parkmill.",
        ],
        category: "Nature",
        image: torbay,
        date: "25 Jan 2026",
        readTime: "7 min read",
    },
    {
        id: 8,
        slug: "penmaen-welcome-sign",
        title: "New Welcome Sign Unveiled at Penmaen Village Entrance",
        excerpt: "The newly designed welcome sign was officially unveiled by the committee chair, marking a fresh chapter for the village's arrival experience.",
        content: [
            "After months of planning, design, and construction, the new Penmaen village welcome sign was formally unveiled last weekend in a ceremony attended by over 50 local residents.",
            "The sign, which stands at the eastern entrance to the village on the A4118, was carved from local Pennant sandstone by stonemason Huw Griffiths. It features the village name in both English and Welsh, along with a carved relief depicting Three Cliffs Bay and the surrounding landscape.",
            "\"We wanted something that reflected the character of the village and the beauty of its setting,\" explains committee chair David Thomas, who cut the ribbon at the unveiling ceremony. \"Huw has done an incredible job of capturing the essence of Penmaen in stone.\"",
            "The project was funded by a combination of community fundraising and a grant from the Gower Society. Total costs came to around £3,500, with much of the groundwork done by volunteers from the hall committee.",
            "The old sign, a simple wooden post that had been in place since the 1980s, had been damaged by years of wind and rain. It will be preserved and displayed in the village hall as a piece of local history.",
            "The unveiling was followed by afternoon tea at the village hall, where residents celebrated with sandwiches, scones, and, of course, plenty of cake. Several visitors stopped their cars to photograph the new sign, proving that first impressions really do count!",
        ],
        category: "Community",
        image: penmaenSign,
        date: "20 Jan 2026",
        readTime: "3 min read",
    },
    {
        id: 9,
        slug: "wildflower-meadow-project",
        title: "Wildflower Meadow Project Launches at Bell Flower Field",
        excerpt: "A new conservation project aims to restore native wildflower meadows across the Gower, starting with the fields around Penmaen and Nicholaston.",
        content: [
            "A pioneering conservation project has been launched to restore wildflower meadows in the fields surrounding Penmaen and Nicholaston, with the aim of creating a haven for pollinators and other wildlife.",
            "The Gower Wildflower Project, supported by the National Trust and Natural Resources Wales, will work with local farmers to convert selected fields back to traditional hay meadows. The project focuses on a field known locally as Bell Flower Field, named for the harebells that once grew there in abundance.",
            "\"Wildflower meadows have declined by 97% in the UK since the 1930s,\" says project officer Dr. Helen Jones. \"Here on the Gower, we still have some fragments of species-rich grassland, but they're under constant pressure. This project aims to reverse that decline, one field at a time.\"",
            "The first phase involves collecting seed from existing wildflower sites on the Gower and using it to establish new meadows. Species being targeted include yellow rattle, bird's-foot trefoil, ox-eye daisy, and of course the harebell that gives Bell Flower Field its name.",
            "Local volunteers are being recruited to help with seed collection and meadow management. Training sessions will be held at the village hall, covering topics such as plant identification, seed harvesting techniques, and meadow cutting regimes.",
            "The project has a five-year timeframe, with the hope that by 2031, several hectares of new wildflower meadow will be established in the Penmaen and Nicholaston area. If successful, the model could be rolled out across the wider Gower Peninsula.",
        ],
        category: "Nature",
        image: bellFlower,
        date: "15 Jan 2026",
        readTime: "5 min read",
    },
];

export const categories: Category[] = ["All", "Community", "Events", "Nature", "Heritage"];
