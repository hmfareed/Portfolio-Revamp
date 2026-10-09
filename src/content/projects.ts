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
    slug: "kayspacks",
    title: "Kayspacks — Water Delivery E-Commerce Platform",
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
      live: "https://kayspack.vercel.app",
      github: null,
      caseStudySlug: "kayspacks"
    },
    image: "/images/projects/kayspacks.png",
    placeholders: []
  },
  {
    slug: "africart",
    title: "AfriCart — Multi-Vendor Marketplace PWA",
    pitch: "Multi-vendor marketplace with role-based dashboards, wholesale pricing and Mobile Money vendor payouts.",
    role: "Full-Stack Developer",
    stack: [
      "Next.js",
      "TypeScript",
      "Tailwind CSS",
      "MongoDB",
      "JWT",
      "Vercel",
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
    placeholders: []
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
    slug: "novelverse",
    title: "NovelVerse — Reading and Writing Platform",
    pitch: "Wattpad-style platform for reading and writing stories, with user roles, a coin-based economy and JWT authentication.",
    role: "Full-Stack Developer",
    stack: [
      "Next.js",
      "TypeScript",
      "Tailwind CSS",
      "MongoDB",
      "JWT"
    ],
    categories: ["SaaS"],
    featured: false,
    features: [
      "Wattpad-style platform for reading and writing stories, with user roles, a coin-based economy and JWT authentication."
    ],
    links: {
      live: null,
      github: "https://github.com/hmfareed/Novel-webapp",
      caseStudySlug: "novelverse"
    },
    image: "/images/projects/novelverse.jpg",
    placeholders: []
  }
];
