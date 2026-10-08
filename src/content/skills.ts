import { SkillCategoryGroup } from './types';

export const skillsContent: SkillCategoryGroup[] = [
  {
    id: "languages",
    title: "Languages",
    skills: ["JavaScript", "TypeScript", "HTML", "CSS"],
    doodle: "languages",
    stickyColor: "yellow",
    tilt: -1.5
  },
  {
    id: "frontend",
    title: "Frontend",
    skills: [
      "React",
      "Next.js",
      "Vite",
      "Tailwind CSS",
      "shadcn/ui",
      "Bootstrap",
      "UI design",
      "PWA",
      "Accessibility (WCAG AA)"
    ],
    doodle: "frontend",
    stickyColor: "pink",
    tilt: 1.2
  },
  {
    id: "backend",
    title: "Backend",
    skills: [
      "Node.js",
      "Express",
      "REST APIs",
      "JWT authentication",
      "Zod/Joi validation",
      "Role-based access control",
      "Socket.io (real-time)"
    ],
    doodle: "backend",
    stickyColor: "blue",
    tilt: -2
  },
  {
    id: "databases",
    title: "Databases and ORMs",
    skills: [
      "MongoDB",
      "Mongoose",
      "PostgreSQL",
      "Prisma",
      "Neon",
      "Docker",
      "Redis",
      "Kubernetes",
      "Caching",
      "IndexedDB/Dexie (offline-first)"
    ],
    doodle: "database",
    stickyColor: "green",
    tilt: 1.8
  },
  {
    id: "payments",
    title: "Payments & Integrations",
    skills: [
      "Paystack (payments, subaccounts, split payments to Mobile Money)",
      "Clerk (auth and subscriptions)",
      "Cloudinary (media)",
      "Nodemailer and Resend (email)",
      "Arkesel (SMS)",
      "WhatsApp ordering"
    ],
    doodle: "payments",
    stickyColor: "amber",
    tilt: -1
  },
  {
    id: "ai",
    title: "AI Features",
    skills: [
      "Real AI assistants using API keys from Nvidia, Google and OpenAI",
      "Customer-facing AI chatbots",
      "Admin AI assistants",
      "AI shopping assistants",
      "Voice and messaging order flows"
    ],
    doodle: "ai",
    stickyColor: "yellow",
    tilt: 2.2
  },
  {
    id: "tooling",
    title: "Deployment & Tooling",
    skills: [
      "Vercel",
      "Netlify",
      "Railway",
      "Git/GitHub",
      "Command Line (Bash)",
      "Google Stitch",
      "Banani",
      "Google Antigravity",
      "Picsart"
    ],
    doodle: "tooling",
    stickyColor: "pink",
    tilt: -1.7
  },
  {
    id: "beyond",
    title: "Beyond Code",
    skills: [
      "Team leadership",
      "Project planning and specs",
      "UI prototyping",
      "Teaching Mathematics, Science and Computing"
    ],
    doodle: "beyond",
    stickyColor: "green",
    tilt: 1.4
  }
];
