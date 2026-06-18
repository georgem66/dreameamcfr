/* ============================================================
   TUT Colour Fun Run 2026 — all editable site content lives here.
   Non-developers: change the text in this file to update the site.
   ============================================================ */

export const site = {
  name: "TUT Colour Fun Run 2026",
  shortName: "Colour Fun Run",
  description:
    "Join the TUT Colour Fun Run on 24 October 2026 at the Pretoria Campus — a 5km celebration of fitness, colour, community, and mental-health awareness. #RunForChangeRunForAll",
  locale: "en_ZA",
  // Site origin for canonical URLs, sitemap, robots.txt, Open Graph and structured data.
  // Resolution order: explicit env → Vercel production domain → placeholder.
  // Set NEXT_PUBLIC_SITE_URL to your own/custom domain when you have one.
  url: (() => {
    const explicit = process.env.NEXT_PUBLIC_SITE_URL;
    if (explicit) return explicit.replace(/\/+$/, "");
    const vercel = process.env.VERCEL_PROJECT_PRODUCTION_URL;
    if (vercel) return `https://${vercel}`;
    return "https://tut-colour-fun-run.vercel.app";
  })(),
};

export const event = {
  name: "TUT Colour Fun Run 2026",
  shout: "Run For Change, Run For All!",
  date: "24 October 2026",
  time: "09:00",
  // Countdown target — South African Standard Time (UTC+2).
  startISO: "2026-10-24T09:00:00+02:00",
  // Approximate finish time (used for event structured data) — adjust if needed.
  endISO: "2026-10-24T13:00:00+02:00",
  venue: "Tshwane University of Technology — Pretoria Campus",
  venueShort: "TUT Pretoria Campus",
  theme: "Run. Splash. Shine.",
  hashtag: "#RunForChangeRunForAll",
  distance: "5 km",
  route:
    "A 5km fun run packed with colour-splash zones and high-energy activity stations along the route.",
  welcome:
    "A vibrant celebration of fitness, fun, community spirit, and creating awareness of mental health and social inclusion. Join students, staff, and alumni as we run, laugh, and get covered in colour. This is more than a race — it’s about building connections, promoting wellness, and creating unforgettable memories.",
  entryFees: [
    { who: "Students", price: "R20" },
    { who: "Staff & Alumni", price: "R50" },
  ],
  whatToBring: ["A white T-shirt", "A water bottle", "Lots of energy!"],
  safety:
    "Non-toxic, biodegradable powders will be used throughout the run. Medical staff will be on-site for the duration of the event.",
  eventFlow: [
    {
      no: "01",
      title: "Warm-Up",
      text: "A pre-run warm-up aerobics session to get every body moving and ready.",
      emoji: "🤸",
    },
    {
      no: "02",
      title: "The Colour Run",
      text: "Colour-splash and activity stations light up the 5km route from start to finish.",
      emoji: "🌈",
    },
    {
      no: "03",
      title: "The Celebration",
      text: "A post-run party with music, food stalls, and photo booths to keep the energy high.",
      emoji: "🎉",
    },
  ],
};

export const highlights = [
  { label: "Date", value: "24 October 2026", emoji: "📅", color: "var(--color-pink)" },
  { label: "Venue", value: "TUT Pretoria Campus", emoji: "📍", color: "var(--color-blue)" },
  { label: "Theme", value: "Run. Splash. Shine.", emoji: "✨", color: "#8b3fe8" },
  { label: "Hashtag", value: "#RunForChangeRunForAll", emoji: "💬", color: "#ff7a00" },
];

/* External actions — paste your real links below.
   These currently point nowhere ("#"). */
export const links = {
  register: "#", // TODO: paste your registration form URL (e.g. Google Form)
  volunteer: "#", // TODO: paste your volunteer sign-up URL
  sponsor: "#", // TODO: paste your sponsorship enquiry URL
};

export const contact = {
  email: "230072264@tut.ac.za",
  phone: "072 751 2636",
  phoneHref: "tel:+27727512636",
  location: "Tshwane University of Technology, Pretoria Campus",
};

export const socials = [
  {
    name: "Instagram",
    handle: "@TUTColourFunRun",
    short: "IG",
    // TODO: confirm these profile URLs are correct
    href: "https://instagram.com/TUTColourFunRun",
  },
  {
    name: "TikTok",
    handle: "@TUTColourFunRun",
    short: "TK",
    href: "https://www.tiktok.com/@TUTColourFunRun",
  },
  {
    name: "Facebook",
    handle: "TUT Colour Fun Run",
    short: "FB",
    href: "https://facebook.com/TUTColourFunRun",
  },
  {
    name: "Twitter / X",
    handle: "@TUTColourFunRun",
    short: "X",
    href: "https://x.com/TUTColourFunRun",
  },
];

export const navLinks = [
  { label: "Home", href: "/" },
  { label: "About Us", href: "/about" },
  { label: "The Run", href: "/the-run" },
  { label: "Blog", href: "/blog" },
  { label: "Podcast", href: "/podcast" },
  { label: "Contact Us", href: "/contact" },
];

export const about = {
  intro:
    "The Colour Fun Run is hosted by the Sport Management students at the Tshwane University of Technology. Our mission is to create an inclusive, energetic event that promotes health, mental wellness, and community engagement.",
  beliefLead: "We believe sport is a powerful tool for unity.",
  belief:
    "Through this event we bring people together, celebrate movement, and remind one another that everyone belongs at the start line.",
  goals: [
    {
      title: "Move Together",
      text: "Encourage student participation in fitness and active, healthy living.",
      emoji: "🏃",
    },
    {
      title: "Mind Matters",
      text: "Raise awareness about mental health and everyday wellness.",
      emoji: "💚",
    },
    {
      title: "Build Bonds",
      text: "Strengthen ties between students, staff, alumni, and local communities.",
      emoji: "🤝",
    },
    {
      title: "Show TUT",
      text: "Showcase the creativity, colour, and energy of TUT to everyone.",
      emoji: "🎨",
    },
  ],
};

export const blogPosts = [
  {
    slug: "behind-the-scenes",
    category: "Behind the Scenes",
    emoji: "🎬",
    title: "Meet the Team Behind the Colour",
    excerpt:
      "Meet the organising team and volunteers making this event possible — the people powering the most colourful day of the year.",
    body: "Full story coming soon. (Editable placeholder — Richie can write this section.)",
    accent: "var(--color-pink)",
  },
  {
    slug: "training-tips",
    category: "Training Tips",
    emoji: "👟",
    title: "How to Prep for a Fun Run, Stress-Free",
    excerpt:
      "You don’t need to be an athlete. Here’s how to get ready for 5km of colour without the pressure.",
    body: "Full story coming soon. (Editable placeholder — Richie can write this section.)",
    accent: "var(--color-blue)",
  },
  {
    slug: "mental-health-matters",
    category: "Mental Health Matters",
    emoji: "💚",
    title: "Why Events Like This Build Resilience",
    excerpt:
      "Movement, community, and a little colour go a long way. Here’s how the run supports mental wellbeing.",
    body: "Full story coming soon. (Editable placeholder — Richie can write this section.)",
    accent: "#3fd15e",
  },
  {
    slug: "student-voices",
    category: "Student Voices",
    emoji: "📣",
    title: "Favourite Colour Run Moments",
    excerpt:
      "Hear from past participants about the moments that made the Colour Fun Run unforgettable.",
    body: "Full story coming soon. (Editable placeholder — Richie can write this section.)",
    accent: "#ff7a00",
  },
];

export const podcast = {
  title: "Run For Change",
  subtitle: "The Colour Fun Run Podcast",
  intro:
    "Tune in for short, high-energy episodes about the run, the movement, and the people who make it happen.",
  availability: "Available on all our social media platforms.",
  topics: [
    { text: "Interviews with organisers and student leaders", emoji: "🎙️" },
    { text: "Stories straight from participants", emoji: "💬" },
    { text: "Tips on fitness, wellness, and event prep", emoji: "🧘" },
    { text: "Special guests on sport and mental health", emoji: "⭐" },
  ],
  episodes: [
    { no: "EP 01", title: "Why We Run For Change", note: "Coming soon" },
    { no: "EP 02", title: "Race-Day, Behind the Mic", note: "Coming soon" },
    { no: "EP 03", title: "Minds in Motion", note: "Coming soon" },
  ],
};
