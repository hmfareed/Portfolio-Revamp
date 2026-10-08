import { Project } from './types';

export const projectsContent: Project[] = [
  {
    slug: "klyro",
    title: "Klyro — Project Operating System for Teams & Organizations",
    pitch: "A project operating system that connects projects, tasks, roadmaps, collaboration, development workflows and delivery in one place.",
    role: "Founder",
    stack: [
      "AI integration",
      "Next.js",
      "TypeScript",
      "Tailwind CSS",
      "MongoDB",
      "Cloudinary",
      "Socket.io"
    ],
    categories: ["SaaS", "AI"],
    featured: true,
    features: [
      "A project operating system that connects projects, tasks, roadmaps, collaboration, development workflows and delivery in one place.",
      "Full-stack build with authentication, integrations and scalable collaboration workflows.",
      "Planned spec-first, with product docs split into focused markdown files.",
      "Mako Ai, your personal assistant that runs the whole system for you, have a problem? Just ask Mako"
    ],
    links: {
      live: null,
      github: null,
      caseStudySlug: "klyro"
    },
    image: "/images/projects/klyro.png",
    placeholders: ["[screenshots]"]
  },
  {
    slug: "kaypacks",
    title: "Kaypacks — Water Delivery E-Commerce Platform",
    pitch: "Full e-commerce platform for a water delivery business, with multiple brands and pack quantities.",
    role: "Full-Stack Developer",
    stack: [
      "Next.js",
      "TypeScript",
      "MongoDB",
      "Cloudinary",
      "Paystack",
      "Tailwind CSS",
      "Vercel"
    ],
    categories: ["e-commerce", "AI"],
    featured: true,
    features: [
      "Full e-commerce platform for a water delivery business, with multiple brands and pack quantities.",
      "Admin panel for products, orders and business settings.",
      "One-click GPS location capture at checkout that auto-fills delivery details.",
      "Direct WhatsApp ordering plus Paystack payments.",
      "Yango door delivery and self-pickup options.",
      "Customer-facing AI chatbot that recommends products, answers questions, places orders and escalates to human agents.",
      "Separate admin AI assistant for order summaries, inventory checks, store settings and sales analytics."
    ],
    links: {
      live: "https://kaypacks.vercel.app",
      github: null,
      caseStudySlug: "kaypacks"
    },
    image: "/images/projects/kaypacks.png",
    placeholders: []
  },
  {
    slug: "africart",
    title: "AfriCart — Multi-Vendor Marketplace PWA",
    pitch: "Multi-vendor marketplace with role-based dashboards, wholesale pricing and Mobile Money vendor payouts.",
    role: "Full-Stack Developer",
    stack: [
      "Next.js",
      "[MongoDB or PostgreSQL/Prisma: confirm]",
      "JWT",
      "Cloudinary",
      "Paystack"
    ],
    categories: ["e-commerce"],
    featured: true,
    features: [
      "Role-based dashboards for Admins, Vendors and Shoppers.",
      "Real-time cart discount and wholesale pricing engine.",
      "Admin tools for vendor verification, subscription tiers, hub-based fulfilment oversight and financial/inventory dashboards.",
      "Secure vendor onboarding with document-review workflows and multi-role JWT auth.",
      "Paystack subaccount/split payments for direct vendor payouts to Mobile Money.",
      "WCAG AA-compliant, dark-first responsive UI with custom skeleton loading states."
    ],
    links: {
      live: "https://africart-one.vercel.app",
      github: null,
      caseStudySlug: "africart"
    },
    image: "/images/projects/africart.png",
    placeholders: ["[MongoDB or PostgreSQL/Prisma: confirm]"]
  },
  {
    slug: "hanara-sms",
    title: "HANARA SMS — School Management System",
    pitch: "End-to-end School Management System across two campuses, supporting 790+ active students, multi-stream classes, fee reconciliation and academic reporting.",
    role: "Architect & Lead Software Developer",
    stack: [
      "React",
      "Vite",
      "Tailwind CSS",
      "Node.js",
      "Express",
      "MongoDB",
      "JWT",
      "Zod",
      "Socket.io"
    ],
    categories: ["education", "SaaS"],
    featured: false,
    features: [
      "36+ Mongoose models, secure REST APIs and polymorphic RBAC across 6 roles: Superadmin, Admin, Teacher, Accountant, Parent, Driver.",
      "Daily fee-collection ledger for feeding and bus fares with real-time tracking, discrepancy resolution and an immutable audit log.",
      "Attendance tracking and GPS-based teacher check-in/check-out.",
      "BECE-compliant grading engine with GES-standardised curriculum across 13 academic levels.",
      "Parent portal for results, attendance and fee history.",
      "Compliance with the Ghana Data Protection Act (Act 843): guardian-consent workflows and third-party API health monitoring.",
      "Offline-first record keeping with background sync (IndexedDB/Dexie)."
    ],
    links: {
      live: null,
      github: null,
      caseStudySlug: "hanara-sms"
    },
    image: "/images/projects/hanara-sms.png",
    placeholders: []
  },
  {
    slug: "slay-by-humu",
    title: "Slay by Humu — Luxury E-Commerce Storefront",
    pitch: "Luxury storefront with an AI shopping assistant built into the experience for product guidance.",
    role: "Full-Stack Developer",
    stack: [
      "React",
      "Node.js",
      "MongoDB",
      "Tailwind CSS",
      "Paystack"
    ],
    categories: ["e-commerce", "AI"],
    featured: false,
    features: [
      "Luxury storefront with an AI shopping assistant built into the experience for product guidance.",
      "Paystack payments, real-time order tracking and in-app notifications.",
      "Full admin panel: products and inventory, orders, customers and sales analytics."
    ],
    links: {
      live: "https://slaybyhumu.vercel.app",
      github: null,
      caseStudySlug: "slay-by-humu"
    },
    image: "/images/projects/slaybyhumu.png",
    placeholders: []
  },
  {
    slug: "threadly",
    title: "Threadly — Clothing E-Commerce Site",
    pitch: "Clothing storefront with Paystack checkout and Cloudinary-hosted product media, built with a two-person team.",
    role: "Lead Developer",
    stack: [
      "Next.js",
      "TypeScript",
      "MongoDB/Mongoose",
      "Tailwind CSS",
      "shadcn/ui",
      "Paystack",
      "Cloudinary",
      "Vercel"
    ],
    categories: ["e-commerce"],
    featured: false,
    features: [
      "Built with a two-person team, where you led the development.",
      "Clothing storefront with Paystack checkout and Cloudinary-hosted product media."
    ],
    links: {
      live: null,
      github: null,
      caseStudySlug: "threadly"
    },
    image: null,
    placeholders: ["[Add: features, live link, screenshots.]"]
  },
  {
    slug: "ai-order-assistant",
    title: "AI Order Assistant — Multi-Tenant SaaS for Food Vendors",
    pitch: "Multi-tenant SaaS for Ghanaian food vendors that takes orders across WhatsApp, SMS and voice, with POS support.",
    role: "Full-Stack Developer",
    stack: [
      "[Add: stack]"
    ],
    categories: ["SaaS", "AI"],
    featured: false,
    features: [
      "Multi-tenant SaaS for Ghanaian food vendors that takes orders across WhatsApp, SMS and voice, with POS support."
    ],
    links: {
      live: null,
      github: null,
      caseStudySlug: "ai-order-assistant"
    },
    image: null,
    placeholders: ["[Add: stack, how tenants are isolated, status, live link.]"]
  },
  {
    slug: "novelverse",
    title: "NovelVerse — Reading and Writing Platform",
    pitch: "Wattpad-style platform for reading and writing stories, with user roles, a coin-based economy and Clerk-powered subscriptions.",
    role: "Full-Stack Developer",
    stack: [
      "Next.js",
      "React",
      "TypeScript",
      "Clerk",
      "[Add: stack]"
    ],
    categories: ["SaaS"],
    featured: false,
    features: [
      "Wattpad-style platform for reading and writing stories, with user roles, a coin-based economy and Clerk-powered subscriptions."
    ],
    links: {
      live: null,
      github: null,
      caseStudySlug: "novelverse"
    },
    image: "/images/projects/novelverse.jpg",
    placeholders: ["[Add: stack, status, live link.]"]
  },
  {
    slug: "buildtogether",
    title: "BuildTogether — Startup Concept",
    pitch: "A platform where people post projects and recruit collaborators by role, with verified contribution records once a project is completed.",
    role: "Product Concept & Design",
    stack: [
      "Ideas I'm exploring"
    ],
    categories: ["SaaS"],
    featured: false,
    features: [
      "A platform where people post projects and recruit collaborators by role, with verified contribution records once a project is completed.",
      "Exploratory product concept showcasing spec-first thinking and collaborative developer workflows."
    ],
    links: {
      live: null,
      github: null,
      caseStudySlug: "buildtogether"
    },
    image: null,
    placeholders: []
  }
];
