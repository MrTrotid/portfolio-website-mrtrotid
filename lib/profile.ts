// Type definition for project data structure
export type Project = {
  name: string;
  summary: string | string[];
  href: string;
  image: string;
  year: string;
  tags: string[];
};

// Type definition for experience data structure
export type Experience = {
  title: string;
  org: string;
  period: string;
  description: string;
  achievements?: string[];
  logo?: string;
};

// Type definition for leadership data structure
export type Leadership = {
  name: string;
  role: string;
  period: string;
  description: string;
  achievements: string[];
  logo?: string;
};

// Type definition for achievement data structure
export type Achievement = {
  title: string;
  detail: string;
};

// Main profile data object containing all portfolio information
export const profile = {
  name: "Baman Prasad Guragain",
  alias: "MrTrotid",
  role: "Cybersecurity Enthusiast & Creative Developer",
  intro:
    "Cybersecurity enthusiast and developer focused on modern web applications and practical security.",
  whatIDo: [
    "Build experimental web projects",
    "Explore security vulnerabilities",
    "Work with modern technologies",
    "Learn and apply cybersecurity concepts",
    "Collaborate on innovative ideas",
  ],
  skills: {
    frontend: [
      "Next.js",
      "TypeScript",
      "React",
      "Tailwind CSS",
      "Framer Motion",
      "GSAP",
    ],
    security: [
      "OWASP Top 10",
      "Threat Modeling",
      "Web App Security",
      "Security Testing",
    ],
    tools: ["Git", "Linux", "Playwright", "Vitest", "Figma", "GitHub Actions"],
  },
  projects: [
    {
      name: "AQ Sentinel",
      summary: [
        "**Problem:** Real-time air quality monitoring was inaccessible due to expensive hardware.",
        "**Action:** Built an IoT solution combining an ESP32 microcontroller with a custom React/Node.js web app to process sensor telemetry.",
        "**Result:** Delivered an affordable, real-time air quality visualization platform.",
      ],
      href: "https://projects.bamanguragain.com.np",
      image: "/projects/aqsentinel.png",
      year: "2025",
      tags: ["Next.js", "Data Visualization", "IoT", "ESP32"],
    },
    {
      name: "MeroAushadhi",
      summary: [
        "**Problem:** Medical information was largely inaccessible and difficult to understand for Nepali-speaking users.",
        "**Action:** Developed a comprehensive medicine information application integrating Google Generative AI, Flowise, and Supabase.",
        "**Result:** Made complex medical data accessible, understandable, and actionable in native Nepali.",
      ],
      href: "https://projects.bamanguragain.com.np",
      image: "/projects/portfolio.png",
      year: "2025",
      tags: ["React", "Google Generative AI", "Flowise", "Supabase"],
    },
    {
      name: "Sherlock Scramble Solver",
      summary: [
        "**Problem:** Manually finding hidden words in large 15x15 grids was tedious and time-consuming.",
        "**Action:** Engineered an intelligent algorithm utilizing advanced pattern matching and optimized data structures.",
        "**Result:** Achieved millisecond resolution times, successfully finding all hidden words efficiently.",
      ],
      href: "https://projects.bamanguragain.com.np",
      image: "/projects/portfolio.png",
      year: "2024",
      tags: ["Algorithms", "Grid Search", "Python"],
    },
  ] as Project[],
  experience: [
    {
      title: "SEO Content Writer",
      org: "Gadgetbyte Nepal",
      period: "Aug 2025 - Dec 2025",
      description:
        "Wrote and optimized technology content with an SEO focus for Gadgetbyte Nepal. Collaborated with the developer team to identify and resolve frontend and backend bugs, optimized website performance, and helped team members understand the newly built website architecture and features.",
      achievements: [
        "Produced SEO-optimized articles and reviews",
        "Identified and documented bugs in frontend and backend",
        "Collaborated with developer team to optimize website performance",
        "Helped team members understand new website features and architecture",
      ],
      logo: "/logos/gadgetbyte.png",
    },
  ] as Experience[],
  leadership: [
    {
      name: "Interact Club of Matribhumi Baluwatar",
      role: "Information Technology Officer",
      period: "Jul 2025 - Present",
      description:
        "Responsible for designing digital materials and contributing to the development and maintenance of the club's website to strengthen its online presence. Works closely with the executive team to implement technical solutions for events, registrations, and announcements, while supporting digital initiatives that enhance communication, streamline workflows, and improve overall member engagement.",
      achievements: [
        "Designed digital materials to strengthen online presence",
        "Developed and maintained the club website",
        "Implemented technical solutions for events and registrations",
        "Enhanced communication and streamlined workflows",
      ],
      logo: "/logos/ICMB.png",
    },
    {
      name: "SXC A Level Alumni Club",
      role: "Executive",
      period: "Jan 2024 - Jan 2026",
      description:
        "Organized two national-level mathematics competitions, managing logistics, coordinating participants, and ensuring smooth execution. Led planning and implementation of alumni meet and homecoming events, alongside smaller alumni programs, fostering community engagement and networking opportunities. Associated with St. Xavier's College, Maitighar.",
      achievements: [
        "Organized two national-level mathematics competitions",
        "Managed logistics and participant coordination",
        "Led alumni meet and homecoming implementation",
        "Fostered community engagement and networking",
      ],
      logo: "/logos/stxaviers.png",
    },
    {
      name: "SXC A Level Computer Club",
      role: "Member",
      period: "Jan 2024 - Jan 2025",
      description:
        "Contributed to the development of a game featured in the college magazine, applying creativity and technical skills in a collaborative setting. Actively participated in various club events, supporting team efforts and gaining experience in event-based collaboration.",
      achievements: [
        "Contributed to game development featured in college magazine",
        "Applied creativity and technical skills collaboratively",
        "Participated in various club events",
        "Gained experience in event-based collaboration",
      ],
      logo: "/logos/stxaviers.png",
    },
    {
      name: "Junior Jaycees Budhanilkantha",
      role: "Event Manager & Deputy Manager of Information Technology",
      period: "Feb 2024 - Jan 2025",
      description:
        "Organized and led community service programs focused on supporting orphanages and animal welfare. Coordinated event logistics, facilitated teamwork, and ensured successful execution of initiatives. Applied technical skills to support program operations and enhance community engagement.",
      achievements: [
        "Organized community service programs for orphanages and animal welfare",
        "Coordinated event logistics and facilitated teamwork",
        "Supported program operations with IT skills",
      ],
      logo: "/logos/JCI_logo.jpeg",
    },
    {
      name: "Nepal Scouts",
      role: "Patrol Leader",
      period: "Apr 2019 - Apr 2021",
      description:
        "Guided a group of peers during various scouting activities, including organizing and participating in scout camps. Coordinated tasks, ensured team collaboration, and contributed to a positive group experience. Developed skills in leadership, communication, and outdoor skills while fostering responsibility and teamwork.",
      achievements: [
        "Guided peers during scouting activities and camps",
        "Coordinated tasks and ensured team collaboration",
        "Developed leadership, communication, and outdoor skills",
      ],
      logo: "/logos/Nepal_scout.png",
    },
  ] as Leadership[],
  achievements: [
    {
      title: "3rd Place in Cambridge Code League",
      detail: "Achieved 3rd place in the Cambridge Code League A-levels hackathon.",
    },
    {
      title: "Best UI/UX in Cambridge Code League",
      detail: "Won the Best UI/UX award in the Cambridge Code League.",
    },
    {
      title: "1st Place in STEAM Exhibition",
      detail:
        "Secured 1st place in the St. Xavier College intra-college STEAM exhibition during A levels.",
    },
  ] as Achievement[],
  links: {
    certifications: "https://certifications.bamanguragain.com.np",
    projects: "https://projects.bamanguragain.com.np",
    resume: "https://resume.bamanguragain.com.np",
    email: "mailto:contact@bamanguragain.com.np",
    github: "https://github.com/mrtrotid",
    linkedin: "https://linkedin.com/in/mrtrotid",
    youtube: "https://youtube.com/@mrtrotid",
    instagram: "https://instagram.com/mrtrotid",
  },
} as const;
