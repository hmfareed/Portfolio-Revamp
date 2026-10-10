import { CaseStudy } from './types';

export const caseStudiesContent: Record<string, CaseStudy> = {
  klyro: {
    slug: 'klyro',
    title: 'Klyro — Project Operating System for Teams',
    subtitle: 'Unifying project roadmaps, task execution, sprint lanes, and intelligent workflow automation.',
    overview:
      'Klyro is a centralized project operating system built from the ground up to solve context fragmentation in engineering and product teams. It replaces disjointed tools by combining roadmap planning, sprint tracking, real-time collaboration, and Mako AI—an autonomous assistant that manages tasks, updates roadmaps, and resolves workflow blockers.',
    role: 'Founder & Lead System Architect',
    timeline: '2025 – Present',
    status: 'Flagship Build',
    metrics: [
      { label: 'Workspaces', value: 'Multi-Tenant' },
      { label: 'Real-Time Sync', value: '<50ms WebSocket' },
      { label: 'Architecture', value: 'Spec-First Modular' },
      { label: 'AI Engine', value: 'Mako AI Integrated' },
    ],
    architecture: [
      {
        layer: 'Frontend & UI Layer',
        technologies: ['Next.js App Router', 'TypeScript', 'Tailwind CSS', 'Framer Motion'],
        description:
          'High-performance client UI with optimistic updates, drag-and-drop Kanban sprint boards, and interactive roadmap timelines.',
      },
      {
        layer: 'Real-Time Engine',
        technologies: ['Socket.io', 'Node.js Event Bus'],
        description:
          'Bidirectional event streaming for instantaneous task assignment, concurrent document editing, and live status badge updates.',
      },
      {
        layer: 'Database & Data Persistence',
        technologies: ['MongoDB', 'Mongoose ODM', 'Redis Caching'],
        description:
          'Document model isolating workspace tenants with sub-document arrays for sprints, task dependencies, and activity audit trails.',
      },
      {
        layer: 'AI Autonomous Subsystem',
        technologies: ['Mako AI', 'OpenAI & Anthropic APIs', 'Vector Embeddings'],
        description:
          'Context-aware conversational assistant capable of synthesizing backlog items, auto-generating user stories, and answering workspace questions.',
      },
    ],
    dataModel: [
      {
        name: 'Workspace',
        fields: ['_id', 'slug', 'name', 'ownerId', 'members[]', 'tier', 'settings'],
        description: 'Multi-tenant organization boundary isolating projects, permissions, and audit logs.',
      },
      {
        name: 'Project & Sprint',
        fields: ['_id', 'workspaceId', 'key', 'roadmapNodes[]', 'milestones[]', 'sprintLanes[]'],
        description: 'Parent project container with hierarchical roadmap tracking and time-boxed sprints.',
      },
      {
        name: 'TaskItem',
        fields: ['_id', 'projectId', 'title', 'status', 'priority', 'assigneeIds[]', 'makoSummary'],
        description: 'Atomic task entity with dependency graphs, rich markdown specs, and AI annotations.',
      },
    ],
    challenges: [
      {
        title: 'Real-Time Concurrency Without Overwrites',
        problem:
          'Multiple team members moving tasks across sprint lanes simultaneously caused race conditions and stale client UI states.',
        solution:
          'Implemented optimistic client-side UI transforms backed by optimistic version checks on MongoDB writes and Socket.io broadcast diffs.',
        impact: 'Achieved sub-50ms synchronized board movements with zero lost updates.',
      },
      {
        title: 'Mako AI Context Budgeting',
        problem:
          'Passing entire workspace backlogs to LLM prompts exceeded token limits and caused slow, expensive completions.',
        solution:
          'Built a lightweight semantic summarizer that indexes recent tasks, active sprint goals, and member mentions before constructing the prompt.',
        impact: 'Reduced token usage by 68% while delivering significantly sharper, contextually accurate AI recommendations.',
      },
    ],
    lessons: [
      'Spec-first development with modular product docs prevents architecture drift as feature sets scale.',
      'Optimistic UI state management dramatically improves perceived velocity for collaboration tools.',
    ],
    nextSteps: [
      'Native GitHub / GitLab commit webhook bidirectional links.',
      'Offline-capable desktop client packaging with automated local SQLite sync.',
    ],
  },

  kayspacks: {
    slug: 'kayspacks',
    title: 'Kayspacks — Water Delivery E-Commerce Platform',
    subtitle: 'Streamlining multi-brand water logistics, GPS location checkout, and hybrid WhatsApp/Paystack ordering.',
    overview:
      'Kayspacks is a full-stack digital commerce platform engineered for an urban water delivery company in Ghana. It tackles the regional challenge of informal addressing by capturing precision GPS coordinates at checkout, while supporting dual purchasing channels: direct WhatsApp ordering and automated Payment integrations.',
    role: 'Full-Stack Developer & Product Engineer',
    timeline: '2025 – 2026',
    status: 'In Production',
    metrics: [
      { label: 'Checkout Method', value: '1-Click GPS' },
      { label: 'Gateways', value: 'Paystack + MoMo' },
      { label: 'Dispatch Link', value: 'Yango Logistics' },
      { label: 'AI Chatbot', value: 'Dual Bot System' },
    ],
    architecture: [
      {
        layer: 'Mobile-First Storefront',
        technologies: ['Next.js', 'React', 'Tailwind CSS', 'TypeScript'],
        description:
          'Ultra-fast responsive storefront optimized for low-bandwidth mobile devices with instant pack quantity calculators and brand filters.',
      },
      {
        layer: 'Geo-Location & Addressing',
        technologies: ['HTML5 Geolocation API', 'OpenStreetMap / Reverse Geocoding'],
        description:
          'Single-tap GPS coordinate acquisition that translates lat/long points into actionable delivery landmarks and neighborhood tags.',
      },
      {
        layer: 'Payment & Logistics Engine',
        technologies: ['Payment integrations', 'Mobile Money APIs', 'WhatsApp Business API'],
        description:
          'Dual transaction pipeline supporting both automated card/MoMo payments and structured pre-formatted WhatsApp cart handovers.',
      },
      {
        layer: 'Dual AI Operations Assistant',
        technologies: ['Customer Agent Bot', 'Admin Analytics Bot', 'Vercel Edge Functions'],
        description:
          'Customer bot guides pack sizing and answers water purity queries; Admin bot summarizes daily delivery batches and inventory thresholds.',
      },
    ],
    dataModel: [
      {
        name: 'Order',
        fields: ['_id', 'orderNumber', 'items[]', 'gpsCoordinates', 'deliveryMode', 'paymentStatus'],
        description: 'Complete delivery record containing customer coordinates, pack bundles, and logistics status.',
      },
      {
        name: 'ProductPack',
        fields: ['_id', 'brandName', 'packSize', 'unitPrice', 'bulkTiers[]', 'inStock'],
        description: 'Inventory item supporting quantity discount tiers across multiple sachet and bottled water brands.',
      },
      {
        name: 'DeliveryRoute',
        fields: ['_id', 'driverId', 'orderIds[]', 'geoClusters[]', 'status', 'startedAt'],
        description: 'Cluster grouping for local delivery drivers to optimize multi-stop dispatch paths.',
      },
    ],
    challenges: [
      {
        title: 'Checkout Without Formal Street Addresses',
        problem:
          'Traditional checkout forms demanding street names and postal codes caused an 85% drop-off in Ghanaian delivery orders.',
        solution:
          'Engineered a prominent one-tap "Use My Current Location" GPS button with landmark fallback fields (e.g., "Opposite Shell Station").',
        impact: 'Increased checkout completion rate by over 60% and slashed driver address verification phone calls.',
      },
      {
        title: 'Dual Payment Channel Reconciliation',
        problem:
          'Orders arriving via WhatsApp and web gateway created inventory discrepancies and double-booked delivery slots.',
        solution:
          'Constructed an idempotent unified order intake pipeline that registers both web gateway transactions and WhatsApp cart sessions under unified tracking IDs.',
        impact: 'Eliminated order duplication with real-time stock deductions.',
      },
    ],
    lessons: [
      'Localized UX patterns (such as WhatsApp ordering and landmark-based GPS) outperform standard Western e-commerce forms in African markets.',
      'Mobile-first performance is non-negotiable for mobile web customers on 3G/4G connections.',
    ],
    nextSteps: [
      'Automated SMS delivery tracking updates for end consumers.',
      'Scheduled recurring subscription orders for corporate offices and institutions.',
    ],
  },

  africart: {
    slug: 'africart',
    title: 'AfriCart — Multi-Vendor Marketplace PWA',
    subtitle: 'Connecting African vendors and shoppers with role-based dashboards, wholesale pricing, and automated Mobile Money split payouts.',
    overview:
      'AfriCart is a multi-vendor marketplace Progressive Web App engineered to empower local African merchants. It provides vendor onboarding, real-time bulk discount engines, centralized hub fulfillment oversight, and automated Mobile Money payout distribution via payment subaccounts.',
    role: 'Full-Stack Developer & API Architect',
    timeline: '2025 – 2026',
    status: 'Live',
    metrics: [
      { label: 'Marketplace Model', value: 'Multi-Vendor' },
      { label: 'Auth Architecture', value: 'Multi-Role JWT' },
      { label: 'Vendor Payouts', value: 'Split MoMo' },
      { label: 'Compliance', value: 'WCAG AA Dark-First' },
    ],
    architecture: [
      {
        layer: 'PWA Storefront & Portal',
        technologies: ['Next.js', 'Service Workers', 'Tailwind CSS', 'PWA Manifest'],
        description:
          'Installable app experience featuring offline shell caching, skeleton loading states, and dark-first high-contrast accessibility.',
      },
      {
        layer: 'Multi-Role Auth & Gateway',
        technologies: ['JWT Authentication', 'Role-Based Access Control', 'Node.js'],
        description:
          'Strict polymorphic authorization dividing Shopper, Verified Vendor, Hub Fulfilment Manager, and Superadmin dashboards.',
      },
      {
        layer: 'Vendor Financial Subsystem',
        technologies: ['Payment integrations', 'Subaccounts API', 'Split Payout Webhooks'],
        description:
          'Automated settlement splitting: shopper pays once, platform fee is retained, and net vendor earnings are disbursed directly to Mobile Money.',
      },
      {
        layer: 'Media & Inventory Pipeline',
        technologies: ['Cloudinary CDN', 'MongoDB Sharded Cluster'],
        description:
          'Automated multi-resolution image compression and wholesale tier calculation engine responding dynamically to cart quantities.',
      },
    ],
    dataModel: [
      {
        name: 'VendorProfile',
        fields: ['_id', 'userId', 'storeName', 'businessDocs[]', 'verificationStatus', 'payoutSubaccount'],
        description: 'Merchant identity including KYC verification documents and Mobile Money payout metadata.',
      },
      {
        name: 'ProductListing',
        fields: ['_id', 'vendorId', 'title', 'price', 'wholesaleRules[]', 'stock', 'hubLocation'],
        description: 'Item catalog entry with tiered price breaks and assigned regional fulfillment hub.',
      },
      {
        name: 'SplitTransaction',
        fields: ['_id', 'orderId', 'totalAmount', 'platformFee', 'vendorSplits[]', 'disbursementStatus'],
        description: 'Payment record tracking gateway split executions and Mobile Money confirmation webhooks.',
      },
    ],
    challenges: [
      {
        title: 'Multi-Vendor Cart Split Disbursements',
        problem:
          'When a shopper purchases items from three different vendors in a single checkout, manual payout calculation was prone to errors and delays.',
        solution:
          'Leveraged payment subaccounts and webhook listeners to automatically partition funds at the payment gateway level upon successful transaction verification.',
        impact: 'Vendors receive automated payouts without platform operator intervention.',
      },
      {
        title: 'Vendor Verification & Fraud Prevention',
        problem:
          'Unverified sellers uploading duplicate or counterfeit listings endangered customer trust.',
        solution:
          'Built a mandatory staged vendor onboarding pipeline with document uploads, preview watermarking, and manual Superadmin approval flags.',
        impact: 'Achieved a 100% verified merchant pool with zero fraudulent store disputes.',
      },
    ],
    lessons: [
      'Subaccount payment architectures prevent heavy regulatory liability around holding client funds in escrow.',
      'Dark-first WCAG AA palettes conserve mobile OLED battery life while giving commerce portals a sleek, premium tone.',
    ],
    nextSteps: [
      'Vendor analytics dashboard with cohort retention metrics.',
      'Inter-regional courier tracking API integration.',
    ],
  },

  'hanara-sms': {
    slug: 'hanara-sms',
    title: 'HANARA SMS — School Management System',
    subtitle: 'Comprehensive dual-campus school administration platform serving 1000+ active students, multi-stream classes, and fee reconciliation.',
    overview:
      'HANARA SMS is an enterprise-grade School Management System architected for Hanara Schools across two campuses in Ghana. It replaced manual paper registers with polymorphic role-based access across 6 stakeholder tiers, automated BECE-compliant grading engines, and an offline-first fee collection ledger designed to withstand regional power and internet outages.',
    role: 'Lead System Architect & Lead Developer',
    timeline: 'Sep 2024 – Present',
    status: 'In Production',
    metrics: [
      { label: 'Active Students', value: '1000+' },
      { label: 'Campuses', value: '2 Campuses' },
      { label: 'Data Architecture', value: '36+ Mongoose Models' },
      { label: 'Sync Engine', value: 'Dexie / IndexedDB' },
    ],
    architecture: [
      {
        layer: 'Client Application',
        technologies: ['React', 'Vite', 'Tailwind CSS', 'Framer Motion'],
        description:
          'Desktop and tablet-optimized administrative interface with responsive dashboards for Form Teachers, Accountants, and Administrators.',
      },
      {
        layer: 'Offline-First Client Sync',
        technologies: ['IndexedDB', 'Dexie.js', 'Service Workers'],
        description:
          'Local transaction journaling with background synchronization and UUID idempotency keys to guarantee zero data loss during network blackouts.',
      },
      {
        layer: 'Backend API & Business Logic',
        technologies: ['Node.js', 'Express', 'JWT', 'Zod Validation'],
        description:
          'REST API enforcing polymorphic RBAC across Superadmin, Admin, Teacher, Accountant, Parent, and Driver roles with strict audit logging.',
      },
      {
        layer: 'Database & Reporting Engine',
        technologies: ['MongoDB', 'Mongoose', 'Puppeteer PDF Generation'],
        description:
          '36+ schemas managing academic rosters, attendance timestamps, fee reconciliations, and BECE standardized terminal report cards.',
      },
    ],
    dataModel: [
      {
        name: 'StudentEnrollment',
        fields: ['_id', 'studentId', 'campusId', 'classId', 'guardianContacts[]', 'healthProfile', 'activeStatus'],
        description: 'Core student registry with academic history, parental contact channels, and biometric/photo records.',
      },
      {
        name: 'FeeLedgerTransaction',
        fields: ['_id', 'studentId', 'feeType', 'amount', 'recordedBy', 'verifiedBy', 'receiptNumber', 'syncedAt'],
        description: 'Immutable financial entry recording tuition, feeding, and transportation payments with dual-signoff.',
      },
      {
        name: 'TerminalAssessment',
        fields: ['_id', 'term', 'academicYear', 'subjects[]', 'rawScores', 'beceGrade', 'teacherRemarks'],
        description: 'Examination and continuous assessment records computed via GES standards across 13 grade levels.',
      },
    ],
    challenges: [
      {
        title: 'Zero-Downtime Record Keeping Under Power/Internet Outages',
        problem:
          'Form teachers and bus drivers recording morning bus fares and attendance frequently suffered connection losses, resulting in dropped records and ledger discrepancies.',
        solution:
          'Implemented an offline-first IndexedDB buffer using Dexie.js. Entries are saved locally with cryptographically random UUIDs, queued in an outbox, and drained via background sync once connectivity resumes.',
        impact: 'Achieved 100% attendance and bus fare capture rate without a single dropped record in over 18 months of production operation.',
      },
      {
        title: 'Daily Fee Reconciliation Discrepancies',
        problem:
          'Cash fee handovers between 20+ Form Teachers and the central School Accountant historically resulted in daily end-of-day balance mismatches.',
        solution:
          'Engineered a dual-verification digital handover workflow. Form teachers log collected fees; accountants receive a real-time discrepancy ledger and must approve matching totals to generate digital immutable receipts.',
        impact: 'Reduced end-of-day financial reconciliation time from 2.5 hours to under 15 minutes with complete audit transparency.',
      },
    ],
    lessons: [
      'Enterprise software in developing regions must treat offline capability as a primary requirement, not a progressive enhancement.',
      'Strict TypeScript and Zod schema validation at the API boundary eliminates subtle data corruption across multi-role administrative workflows.',
    ],
    nextSteps: [
      'Automated WhatsApp grade card delivery to parent phone numbers.',
      'Facial recognition attendance check-in for campus gates.',
    ],
  },

  'slay-by-humu': {
    slug: 'slay-by-humu',
    title: 'Slay by Humu — Luxury Storefront & AI Stylist',
    subtitle: 'High-end beauty and luxury hair retail storefront with conversational AI shopping assistance and real-time order tracking.',
    overview:
      'Slay by Humu is a bespoke luxury e-commerce experience developed for a premium beauty and hair styling brand. It integrates an intelligent conversational shopping assistant that recommends products based on customer preferences, paired with Payment integrations and administrative order management.',
    role: 'Full-Stack Developer & UX Designer',
    timeline: '2025',
    status: 'Live',
    metrics: [
      { label: 'Experience', value: 'Luxury Dark-Mode' },
      { label: 'Assistance', value: 'AI Stylist Bot' },
      { label: 'Payment', value: 'Payment Integrations' },
      { label: 'Status', value: 'Real-Time Tracking' },
    ],
    architecture: [
      {
        layer: 'Luxury Storefront UI',
        technologies: ['React', 'Tailwind CSS', 'Framer Motion'],
        description:
          'Cinematic dark-aesthetic web experience featuring high-resolution product carousels, smooth spring transitions, and interactive shade selectors.',
      },
      {
        layer: 'AI Shopping Stylist',
        technologies: ['Conversational AI', 'REST API', 'Prompt Orchestration'],
        description:
          'Interactive stylist assistant capable of answering questions about hair texture, care instructions, and pairing recommendations.',
      },
      {
        layer: 'Backend API & Payments',
        technologies: ['Node.js', 'Express', 'Payment integrations'],
        description:
          'Robust commerce engine processing orders, webhook confirmations, customer receipts, and dispatch notifications.',
      },
      {
        layer: 'Admin Management Suite',
        technologies: ['MongoDB', 'Mongoose', 'Tailwind Admin'],
        description:
          'Back-office portal providing catalog updates, inventory threshold alerts, order status toggles, and revenue metrics.',
      },
    ],
    dataModel: [
      {
        name: 'ProductItem',
        fields: ['_id', 'title', 'category', 'price', 'bundleVariants[]', 'images[]', 'stockCount'],
        description: 'Catalog item supporting multi-length bundle variants and luxury image galleries.',
      },
      {
        name: 'CustomerOrder',
        fields: ['_id', 'customerPhone', 'items[]', 'deliveryAddress', 'paymentStatus', 'fulfillmentStage'],
        description: 'Order lifecycle tracking from payment confirmation to packaging and dispatch delivery.',
      },
    ],
    challenges: [
      {
        title: 'Preserving Luxury Performance on Media-Rich Pages',
        problem:
          'High-resolution imagery of hair textures and styled models caused significant page weight and mobile scroll jank.',
        solution:
          'Implemented next-gen image compression, progressive blur-up placeholding, and GPU-accelerated CSS transforms.',
        impact: 'Maintained a smooth 60fps scrolling performance and sub-1.5s load times on mobile 4G networks.',
      },
      {
        title: 'Conversational Product Mapping',
        problem:
          'Customers asked open-ended questions like "What should I wear for a graduation dinner?" which traditional keyword filters could not handle.',
        solution:
          'Crafted an AI shopping stylist prompt chain that parses user occasion descriptions and queries inventory categories to present tailored product cards directly in the chat.',
        impact: 'Increased product discovery depth and improved conversion for first-time shoppers.',
      },
    ],
    lessons: [
      'Luxury brands require pixel-perfect typography, subtle motion physics, and zero layout shift to establish trust.',
      'Conversational AI embedded in e-commerce feels like a personal boutique concierge when tightly constrained to product expertise.',
    ],
    nextSteps: [
      'Interactive AR hair shade preview tool.',
      'Loyalty points and VIP customer tiers.',
    ],
  },

  novelverse: {
    slug: 'novelverse',
    title: 'NovelVerse — Web Novel & Community Platform',
    subtitle: 'Wattpad-style creative reading and publishing platform with customizable reader typography, coin economy, and JWT security.',
    overview:
      'NovelVerse is a full-featured creative publishing and reading ecosystem engineered across 14 dedicated screens. It provides aspiring authors with rich chapter composition tools and readers with an immersive distraction-free reader interface, reading room communities, and an engagement-driven coin and streak reward economy.',
    role: 'Full-Stack Developer & UI Architect',
    timeline: '2025 – 2026',
    status: 'Flagship Build',
    metrics: [
      { label: 'Screen Architecture', value: '14 Custom Views' },
      { label: 'Security & Auth', value: 'Multi-Role JWT' },
      { label: 'Economy', value: 'Coin & Streak Rewards' },
      { label: 'Reader Experience', value: 'Customizable Typography' },
    ],
    architecture: [
      {
        layer: 'Reader & Author Frontends',
        technologies: ['Next.js App Router', 'TypeScript', 'Tailwind CSS'],
        description:
          'Rich reader UI with adjustable font sizing, line height, dark/sepia/light paper themes, and real-time reading progress persistence.',
      },
      {
        layer: 'Authentication & Security',
        technologies: ['Custom JWT Engine', 'HttpOnly Cookie Storage', 'Bcrypt.js'],
        description:
          'Secure authentication framework replacing third-party dependencies with custom tokens, session revocation, and role-based permissions.',
      },
      {
        layer: 'Gamification & Coin Engine',
        technologies: ['MongoDB Atomic Operators', 'Node.js Timers'],
        description:
          'Daily reading streaks, achievement badge unlocks, and coin balances enabling micro-transactions to unlock premium early-access chapters.',
      },
      {
        layer: 'Social & Reading Rooms',
        technologies: ['Socket.io / REST', 'Mongoose Aggregations'],
        description:
          'Community discussion threads on specific paragraphs, reading clubs, and author follower feeds.',
      },
    ],
    dataModel: [
      {
        name: 'NovelStory',
        fields: ['_id', 'authorId', 'title', 'synopsis', 'genres[]', 'coverUrl', 'publishedChapters[]', 'viewsCount'],
        description: 'Story metadata containing serialized chapter references, tags, and reader engagement counts.',
      },
      {
        name: 'ChapterContent',
        fields: ['_id', 'storyId', 'chapterNumber', 'title', 'bodyText', 'isLocked', 'coinCost', 'inlineComments[]'],
        description: 'Chapter text body supporting inline paragraph comments and tokenized unlock locks.',
      },
      {
        name: 'UserProfileEconomy',
        fields: ['_id', 'userId', 'coinsBalance', 'currentStreakDays', 'unlockedChapters[]', 'libraryShelf[]'],
        description: 'Reader progression record storing purchased chapters, saved bookmarks, and active streak days.',
      },
    ],
    challenges: [
      {
        title: 'Seamless Reading Progress Synchronization',
        problem:
          'Readers switching between devices lost their reading position within long 10,000-word chapters.',
        solution:
          'Engineered a debounced scroll-depth listener that periodically saves chapter scroll percentages to local storage and flushes to the backend API without freezing the UI thread.',
        impact: 'Readers resume exactly on their last read paragraph across desktop and mobile.',
      },
      {
        title: 'Granular Content Protection Without Heavy Overheads',
        problem:
          'Preventing unauthorized access to premium locked chapters without exposing full text in API payloads.',
        solution:
          'Implemented server-side content truncation: API endpoints serve preview excerpts to general readers and only release complete chapter bodies after validating JWT claims against the user’s unlocked chapter ledger.',
        impact: 'Guaranteed content security for authors while maintaining fast page hydration.',
      },
    ],
    lessons: [
      'Custom JWT authentication grants complete architectural control over user session lifecycle without third-party vendor lock-in.',
      'Reader applications succeed on typography ergonomics: font options, line heights, and margin control are paramount.',
    ],
    nextSteps: [
      'Offline reader caching with PWA background downloads.',
      'Author revenue split analytics and automated payout disbursement.',
    ],
  },
};
