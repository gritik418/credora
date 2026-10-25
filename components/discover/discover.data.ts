export type DiscoverTab = "all" | "people" | "organizations";

export type Person = {
  id: string;
  name: string;
  username: string;
  headline: string;
  location: string;
  avatar: string;
  initials: string;
  skills: string[];
  mutualConnections: number;
  verified?: boolean;
  connectionStatus: "none" | "pending" | "connected";
};

export type Organization = {
  id: string;
  name: string;
  slug: string;
  description: string;
  industry: string;
  logo: string;
  initials: string;
  members: number;
  location: string;
  verified?: boolean;
  tags: string[];
};

export const people: Person[] = [
  {
    id: "1",
    name: "Aarav Sharma",
    username: "aaravsharma",
    headline: "Senior Full Stack Developer at Vercel",
    location: "Bengaluru, India",
    avatar: "https://i.pravatar.cc/160?img=12",
    initials: "AS",
    skills: ["React", "Next.js", "Node.js"],
    mutualConnections: 12,
    verified: true,
    connectionStatus: "none",
  },
  {
    id: "2",
    name: "Priya Verma",
    username: "priyaverma",
    headline: "Product Designer · Building digital experiences",
    location: "Delhi, India",
    avatar: "https://i.pravatar.cc/160?img=47",
    initials: "PV",
    skills: ["UI/UX", "Figma", "Design Systems"],
    mutualConnections: 8,
    connectionStatus: "none",
  },
  {
    id: "3",
    name: "Dev Mehta",
    username: "devmehta",
    headline: "Software Engineer | Backend & Distributed Systems",
    location: "Pune, India",
    avatar: "https://i.pravatar.cc/160?img=33",
    initials: "DM",
    skills: ["TypeScript", "PostgreSQL", "Redis"],
    mutualConnections: 5,
    verified: true,
    connectionStatus: "pending",
  },
  {
    id: "4",
    name: "Ananya Kapoor",
    username: "ananyakapoor",
    headline: "Engineering Manager · Helping teams do their best work",
    location: "Gurugram, India",
    avatar: "https://i.pravatar.cc/160?img=44",
    initials: "AK",
    skills: ["Leadership", "Architecture", "React"],
    mutualConnections: 16,
    connectionStatus: "none",
  },
];

export const organizations: Organization[] = [
  {
    id: "1",
    name: "Pixel Labs",
    slug: "pixel-labs",
    description:
      "A product-focused team building tools for the next generation of the web.",
    industry: "Software Development",
    logo: "",
    initials: "PL",
    members: 128,
    location: "Bengaluru, India",
    verified: true,
    tags: ["SaaS", "Product", "Engineering"],
  },
  {
    id: "2",
    name: "Northstar Technologies",
    slug: "northstar-technologies",
    description:
      "Creating scalable digital products with a focus on engineering excellence.",
    industry: "Technology",
    logo: "",
    initials: "NT",
    members: 86,
    location: "Gurugram, India",
    verified: true,
    tags: ["Cloud", "AI", "Enterprise"],
  },
  {
    id: "3",
    name: "Studio Form",
    slug: "studio-form",
    description:
      "An independent design studio crafting meaningful digital experiences.",
    industry: "Design",
    logo: "",
    initials: "SF",
    members: 34,
    location: "Delhi, India",
    tags: ["Design", "Creative", "Digital"],
  },
];

export const trendingSkills = [
  "React",
  "TypeScript",
  "Product Design",
  "AI Engineering",
  "Node.js",
  "Leadership",
];

export const discoveryCategories = [
  { label: "Software Engineering", icon: "Code2" },
  { label: "Product & Design", icon: "Palette" },
  { label: "Artificial Intelligence", icon: "BrainCircuit" },
  { label: "Leadership", icon: "Users" },
];
