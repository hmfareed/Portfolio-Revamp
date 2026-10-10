import { ExperienceItem } from './types';

export const experienceContent: ExperienceItem[] = [
  {
    id: "elagent",
    role: "Full Stack Web Developer",
    organization: "ELAGENT",
    period: "Sep 2026 – Present",
    type: "Contract",
    location: "Remote (United States)",
    logo: "/images/logos/elagent.png",
    bullets: [
      "Architected and built the centralized Admin Dashboard for ELAGENT, enabling internal operational control, metrics tracking, and platform workflows.",
      "Engineered database architecture and schemas on Supabase (PostgreSQL), setting up relational data models, automated migrations, and secure query access.",
      "Containerized application services and local environments with Docker, ensuring environment parity and streamlined collaboration across the engineering team."
    ],
    placeholders: [],
    highlightStats: [
      {
        value: "Admin Hub",
        label: "dashboard built for internal operations"
      },
      {
        value: "Supabase & Docker",
        label: "relational DB & containerized workflow"
      }
    ]
  },
  {
    id: "tma",
    role: "Student Intern",
    organization: "Tamale Metropolitan Assembly",
    period: "Aug 2026 – Present",
    type: "Internship",
    location: "On-site, Tamale",
    logo: "/images/logos/tma.png",
    bullets: [
      "Collaborated directly with the Management Information Systems (MIS) department to support computer systems, municipal network uptime, and IT operations.",
      "Assisted in managing client engagements and constituent services, helping residents process municipal inquiries and digital administrative records.",
      "Managed official documentation, reporting, and high-volume administrative printing workflows across metropolitan departments."
    ],
    placeholders: [],
    highlightStats: [
      {
        value: "MIS Dept",
        label: "systems support & municipal IT ops"
      },
      {
        value: "Client Services",
        label: "constituent data & documentation"
      }
    ]
  },
  {
    id: "utas-ml",
    role: "Team Leader, Machine Learning Group",
    organization: "UTAS",
    period: "2026",
    type: "Leadership",
    location: "Navrongo",
    logo: "/images/logos/utas.png",
    bullets: [
      "Led a student research team applying machine learning classification models to a chronic disease dataset to calculate predictive accuracy for heart disease diagnosis.",
      "Coordinated feature preprocessing, model training, and performance benchmarking across algorithms to optimize detection accuracy.",
      "Directed team workflows, experiment evaluations, and model validation metrics (precision, recall, and overall accuracy) on clinical indicators."
    ],
    placeholders: [],
    highlightStats: [
      {
        value: "Heart Disease",
        label: "predictive classification modeling"
      },
      {
        value: "Team Lead",
        label: "algorithm testing & accuracy evaluation"
      }
    ]
  },
  {
    id: "freelance",
    role: "Solo Full-Stack Developer",
    organization: "Freelance",
    period: "2025 – Present",
    type: "Freelance",
    location: "Remote / Tamale",
    logo: "/images/profile/fareed.png",
    bullets: [
      "Designed, built and deployed full-stack web apps end to end for clients and personal ventures.",
      "Owned the full lifecycle: specs, Stitch/Banani UI prototyping, implementation and deployment.",
      "Delivered e-commerce, school, vendor-tooling and content platforms (see Projects)."
    ],
    placeholders: []
  },
  {
    id: "hanara",
    role: "Form Teacher & Software Developer",
    organization: "Hanara Schools",
    period: "Sep 2024 – Present",
    type: "Full-time",
    location: "Tamale · Hybrid",
    logo: "/images/logos/hanara-schools.png",
    bullets: [
      "Architected and built an end-to-end School Management System across two campuses, supporting 1000+ active students, multi-stream classes, fee reconciliation and academic reporting.",
      "Engineered IndexedDB/Dexie local caching and background sync with UUID idempotency keys so staff can record fees and attendance during network outages.",
      "Built a digital fee ledger with dual verification between Form Teachers and School Accountants, including discrepancy logs, audit trails and digital handover receipts."
    ],
    placeholders: [],
    highlightStats: [
      {
        value: "1000+",
        label: "active students across 2 campuses"
      },
      {
        value: "36+",
        label: "Mongoose models engineered"
      }
    ]
  }
];
