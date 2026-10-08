import { ExperienceItem } from './types';

export const experienceContent: ExperienceItem[] = [
  {
    id: "elagent",
    role: "Full Stack Web Developer",
    organization: "ELAGENT",
    period: "Sep 2026 – Present",
    type: "Contract",
    location: "Remote (United States)",
    bullets: [
      "Work across frontend and backend on software projects in a remote engineering team."
    ],
    placeholders: [
      "[Add 1–2 specifics: features shipped, stack used, what you owned.]"
    ]
  },
  {
    id: "tma",
    role: "Student Intern",
    organization: "Tamale Metropolitan Assembly",
    period: "Aug 2026 – Present",
    type: "Internship",
    location: "On-site, Tamale",
    bullets: [
      "Support IT management and computer information systems activities."
    ],
    placeholders: [
      "[Add: systems you worked with, tasks, or improvements you made.]"
    ]
  },
  {
    id: "utas-ml",
    role: "Team Leader, Machine Learning Group",
    organization: "UTAS",
    period: "2026",
    type: "Leadership",
    location: "Navrongo",
    bullets: [
      "Led a team applying machine learning models to a chronic kidney disease dataset.",
      "Coordinated model testing and evaluated prediction accuracy."
    ],
    placeholders: [
      "[Add: models used, accuracy achieved, team size.]"
    ]
  },
  {
    id: "freelance",
    role: "Solo Full-Stack Developer",
    organization: "Freelance",
    period: "2025 – Present",
    type: "Freelance",
    location: "Remote / Tamale",
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
    bullets: [
      "Architected and built an end-to-end School Management System across two campuses, supporting 790+ active students, multi-stream classes, fee reconciliation and academic reporting.",
      "Engineered IndexedDB/Dexie local caching and background sync with UUID idempotency keys so staff can record fees and attendance during network outages.",
      "Built a digital fee ledger with dual verification between Form Teachers and School Accountants, including discrepancy logs, audit trails and digital handover receipts."
    ],
    placeholders: [],
    highlightStats: [
      {
        value: "790+",
        label: "active students across 2 campuses"
      },
      {
        value: "36+",
        label: "Mongoose models engineered"
      }
    ]
  }
];
