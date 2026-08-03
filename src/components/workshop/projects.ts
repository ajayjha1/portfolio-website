export type Project = {
  slug: string;
  title: string;
  category: string;
  blurb: string;
  tags: string[];
  href: string;
  thumb: string; // /workshop/projects/<slug>.png — falls back to gradient
};

export const PROJECTS: Project[] = [
  {
    slug: "brand-intelligence-ai",
    title: "Brand Intelligence AI",
    category: "AI",
    blurb: "AI powered platform that turns news into actionable brand insights.",
    tags: ["Next.js", "Python", "AI"],
    href: "/Projects",
    thumb: "/workshop/projects/brand-intelligence-ai.png",
  },
  {
    slug: "mma-playground",
    title: "MMA Playground",
    category: "MMA",
    blurb: "My space to train, track, and share knowledge about martial arts.",
    tags: ["Next.js", "Tailwind", "Stripe"],
    href: "/Playground",
    thumb: "/workshop/projects/mma-playground.png",
  },
  {
    slug: "ecommerce-store",
    title: "E-Commerce Store",
    category: "Web",
    blurb: "A full stack MERN e-com app with smooth UX and secure checkout.",
    tags: ["MERN", "Redux", "Tailwind"],
    href: "/Projects",
    thumb: "/workshop/projects/ecommerce-store.png",
  },
  {
    slug: "ai-chat-dashboard",
    title: "AI Chat Dashboard",
    category: "AI",
    blurb: "Chat with your data. Built with AI + RAG for smarter answers.",
    tags: ["Next.js", "OpenAI", "Pinecone"],
    href: "/Projects",
    thumb: "/workshop/projects/ai-chat-dashboard.png",
  },
  {
    slug: "personal-website-v2",
    title: "Personal Website v2",
    category: "Web",
    blurb: "This workshop. Built with Next.js, Framer Motion and lots of ☕.",
    tags: ["Next.js", "Framer Motion"],
    href: "/Projects",
    thumb: "/workshop/projects/personal-website-v2.png",
  },
];
