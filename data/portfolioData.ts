// ─── Type Definitions ────────────────────────────────────────────────────────

export interface NavLink {
  label: string;
  href: string;
}

export interface Skill {
  name: string;
  category: "frontend" | "backend" | "database" | "devops" | "ai" | "tools";
  icon?: string;
}

export interface Project {
  id: string;
  title: string;
  tagline: string;
  description: string;
  image: string;
  techStack: string[];
  liveDemoUrl: string | null;
  githubUrl: string | null;
  architecture: string;
  highlights: string[];
  grade?: string;
}

export interface Experience {
  id: string;
  role: string;
  company: string;
  location: string;
  period: string;
  type: "internship" | "freelance" | "fulltime";
  description: string;
  responsibilities: string[];
  techUsed: string[];
}

export interface Testimonial {
  id: string;
  quote: string;
  author: string;
  role: string;
  organization: string;
  context: string;
}

export interface SocialLink {
  platform: string;
  url: string;
  icon: string;
}

// ─── Profile Data ────────────────────────────────────────────────────────────

export const profile = {
  name: "Saad Naseer",
  title: "Full Stack Developer & Applied AI Integrator",
  location: "Lahore, Pakistan",
  email: "saadnaseer146@gmail.com",
  phone: "+92 304 5297606",
  bio: "I build robust, full-stack applications that bridge modern web technologies with applied AI — from enterprise financial platforms to fine-tuned LLM vulnerability scanners. Currently pursuing my BS in Computer Science at UCP with a 3.46 CGPA, while shipping production systems for real clients.",
  resumeUrl: "/Saad_Naseer_CV_Latest.pdf",
  avatarUrl: "/Saad.PNG",
  education: {
    degree: "BS Computer Science",
    institution: "University of Central Punjab (UCP)",
    period: "2022 – 2026",
    cgpa: "3.46 / 4.0",
  },
};

// ─── Navigation ──────────────────────────────────────────────────────────────

export const navLinks: NavLink[] = [
  { label: "About", href: "#about" },
  { label: "Skills", href: "#skills" },
  { label: "Projects", href: "#projects" },
  { label: "Experience", href: "#experience" },
  { label: "Testimonials", href: "#testimonials" },
  { label: "GitHub", href: "#github" },
  { label: "Contact", href: "#contact" },
];

// ─── Social Links ────────────────────────────────────────────────────────────

export const socialLinks: SocialLink[] = [
  {
    platform: "GitHub",
    url: "https://github.com/itzzsaadi",
    icon: "github",
  },
  {
    platform: "LinkedIn",
    url: "https://www.linkedin.com/in/saad-naseer-b66ba617b/",
    icon: "linkedin",
  },
  {
    platform: "Email",
    url: "mailto:saadnaseer146@gmail.com",
    icon: "mail",
  },
];

// ─── Skills ──────────────────────────────────────────────────────────────────

export const skills: Skill[] = [
  // Frontend
  { name: "React", category: "frontend" },
  { name: "Next.js", category: "frontend" },
  { name: "TypeScript", category: "frontend" },
  { name: "JavaScript", category: "frontend" },
  { name: "HTML5 / CSS3", category: "frontend" },
  { name: "Tailwind CSS", category: "frontend" },
  { name: "Bootstrap", category: "frontend" },
  { name: "Framer Motion", category: "frontend" },
  // Backend
  { name: "Node.js", category: "backend" },
  { name: "C#", category: "backend" },
  { name: "ASP.NET MVC", category: "backend" },
  { name: "FastAPI", category: "backend" },
  { name: "Python", category: "backend" },
  { name: "REST APIs", category: "backend" },
  { name: "Better Auth", category: "backend" },
  { name: "Zod", category: "backend" },
  // Database
  { name: "PostgreSQL", category: "database" },
  { name: "SQL Server", category: "database" },
  { name: "Prisma ORM", category: "database" },
  { name: "Complex SQL", category: "database" },
  // AI / ML
  { name: "Qwen2.5-Coder", category: "ai" },
  { name: "QLoRA Fine-tuning", category: "ai" },
  { name: "Tree-sitter AST", category: "ai" },
  { name: "Tesseract OCR", category: "ai" },
  { name: "LinearSVC", category: "ai" },
  { name: "OpenCV", category: "ai" },
  // DevOps & Tools
  { name: "Git / GitHub", category: "devops" },
  { name: "Vitest", category: "devops" },
  { name: "Playwright", category: "devops" },
  { name: "VS Code", category: "tools" },
];

export const skillCategories: Record<string, string> = {
  frontend: "Frontend",
  backend: "Backend",
  database: "Databases",
  ai: "AI & Machine Learning",
  devops: "Testing & DevOps",
  tools: "Tools",
};

// ─── Projects ────────────────────────────────────────────────────────────────

export const projects: Project[] = [
  {
    id: "cdc-lab",
    title: "CDC Lab Accounts System",
    tagline: "Full-stack financial & asset management platform",
    description:
      "A comprehensive financial and asset tracking platform for CDC Diagnostic Laboratories. Features role-based access control, multi-branch accounting, automated reporting, and real-time asset lifecycle management — eliminating manual bottlenecks across all branches.",
    image: "/projects/cdc-lab.jpg",
    techStack: [
      "Next.js",
      "TypeScript",
      "PostgreSQL",
      "Prisma",
      "Better Auth",
      "Zod",
      "Vitest",
      "Playwright",
    ],
    liveDemoUrl: null,
    githubUrl: null,
    architecture:
      "App Router-based Next.js frontend with server actions for mutations. Prisma ORM over PostgreSQL for type-safe database access. Better Auth handles session-based authentication with role-based middleware guards. Zod schemas validate all inputs at the boundary layer. Vitest for unit/integration tests, Playwright for E2E flows across multi-branch scenarios.",
    highlights: [
      "Role-based access control across multiple lab branches",
      "Automated financial reporting and asset lifecycle tracking",
      "Full test coverage with Vitest + Playwright E2E",
      "Type-safe data layer with Prisma + Zod validation",
    ],
  },
  {
    id: "secureguard",
    title: "SecureGuard Pro",
    tagline: "AI-powered vulnerability detection engine",
    description:
      "An AI-driven static analysis tool that detects code vulnerabilities using a fine-tuned Qwen2.5-Coder LLM. Parses source code into ASTs via Tree-sitter, maps vulnerability patterns, and generates actionable remediation reports. Awarded consecutive 'A' grades in FYP evaluation.",
    image: "/projects/secureguard.jpg",
    techStack: [
      "React",
      "FastAPI",
      "PostgreSQL",
      "Qwen2.5-Coder",
      "QLoRA",
      "Tree-sitter",
      "Python",
    ],
    liveDemoUrl: null,
    githubUrl: null,
    architecture:
      "React SPA frontend communicates with a FastAPI backend. Source code is parsed into Abstract Syntax Trees using Tree-sitter, then fed into a Qwen2.5-Coder model fine-tuned with QLoRA on a 300K+ vulnerability dataset. PostgreSQL stores scan results and vulnerability patterns. The pipeline supports multi-language parsing and severity-ranked output.",
    highlights: [
      "Fine-tuned Qwen2.5-Coder with QLoRA on 300K+ vulnerability samples",
      "AST-level code parsing via Tree-sitter for multi-language support",
      "Severity-ranked vulnerability reports with remediation suggestions",
      "Graded 'A' in both Phase 1 and Phase 2 FYP evaluations",
    ],
    grade: "A (Phase 1 & 2)",
  },
  {
    id: "ecommerce",
    title: "E-Commerce Web Application",
    tagline: "Full-featured online retail platform",
    description:
      "A complete e-commerce solution featuring product catalog management, shopping cart, order processing, and admin dashboard. Built with enterprise-grade ASP.NET MVC architecture and SQL Server for robust data management.",
    image: "/projects/ecommerce.jpg",
    techStack: ["ASP.NET MVC", "C#", "SQL Server", "Bootstrap", "JavaScript"],
    liveDemoUrl: null,
    githubUrl: null,
    architecture:
      "Classic MVC architecture with ASP.NET. Controller layer handles routing and business logic, Entity Framework maps to SQL Server database. Bootstrap-based responsive frontend with JavaScript for dynamic interactions. Supports product CRUD, cart management, and order lifecycle tracking.",
    highlights: [
      "Full product catalog with search, filter, and category management",
      "Shopping cart and order processing pipeline",
      "Admin dashboard for inventory and order management",
      "Responsive Bootstrap frontend with dynamic JS interactions",
    ],
  },
  {
    id: "ai-text",
    title: "AI Text Extractor & Toxicity Classifier",
    tagline: "OCR + ML text analysis pipeline",
    description:
      "An intelligent document processing pipeline that extracts text from images using Tesseract OCR and classifies content toxicity using a trained LinearSVC model. OpenCV handles image preprocessing for optimal OCR accuracy.",
    image: "/projects/ai-text.jpg",
    techStack: ["Python", "Tesseract OCR", "LinearSVC", "OpenCV", "scikit-learn"],
    liveDemoUrl: null,
    githubUrl: null,
    architecture:
      "Image input is preprocessed with OpenCV (noise reduction, binarization, deskewing) before passing to Tesseract OCR for text extraction. Extracted text is vectorized using TF-IDF and classified by a LinearSVC model trained on labeled toxicity datasets. The pipeline outputs confidence scores and category labels.",
    highlights: [
      "OpenCV preprocessing for optimal OCR accuracy",
      "TF-IDF vectorization with LinearSVC classification",
      "Multi-category toxicity scoring with confidence levels",
      "End-to-end image-to-classification pipeline",
    ],
  },
  {
    id: "library",
    title: "Advanced Library Management System",
    tagline: "Relational database design & complex SQL",
    description:
      "A database-first library management system demonstrating advanced relational schema design, complex SQL queries, stored procedures, and efficient indexing strategies for high-volume book catalog and loan management.",
    image: "/projects/library.jpg",
    techStack: ["SQL", "Database Design", "Stored Procedures", "ER Modeling"],
    liveDemoUrl: null,
    githubUrl: null,
    architecture:
      "Normalized relational schema with proper foreign key constraints and indexes. Features complex JOIN queries, subqueries, CTEs, and stored procedures for book availability tracking, overdue calculations, and member history. ER modeling covers Books, Authors, Members, Loans, Reservations, and Fines.",
    highlights: [
      "Normalized relational schema with ER modeling",
      "Complex SQL: JOINs, CTEs, subqueries, stored procedures",
      "Efficient indexing strategies for catalog search",
      "Loan lifecycle management with automated overdue tracking",
    ],
  },
];

// ─── Experience ──────────────────────────────────────────────────────────────

export const experiences: Experience[] = [
  {
    id: "quaidsoft",
    role: "Full Stack Developer Intern",
    company: "Quaid Soft",
    location: "Lahore, Pakistan",
    period: "March 2026 – August 2026",
    type: "internship",
    description:
      "Contributed to enterprise ERP systems, building server-side ASP.NET architecture and managing SQL Server database operations. Delivered clean, deadline-compliant code across multiple internal tools.",
    responsibilities: [
      "Developed and maintained ASP.NET MVC modules for enterprise ERP systems",
      "Designed and optimized SQL Server database schemas and stored procedures",
      "Built responsive client-facing frontends for internal business tools",
      "Collaborated with senior engineers on production deployment workflows",
    ],
    techUsed: ["C#", "ASP.NET MVC", "SQL Server", "JavaScript", "Bootstrap"],
  },
  {
    id: "freelance",
    role: "Freelance Full Stack Developer",
    company: "Independent",
    location: "Remote",
    period: "January 2026 – Present",
    type: "freelance",
    description:
      "Designing and shipping production-grade web applications for clients, including retail inventory systems and laboratory management platforms, using modern TypeScript/Next.js stacks.",
    responsibilities: [
      "Architected and delivered full-stack applications from requirements to deployment",
      "Built the CDC Lab Accounts System — a multi-branch financial and asset platform",
      "Implemented authentication, RBAC, and automated reporting features",
      "Managed client communication, timelines, and iterative delivery cycles",
    ],
    techUsed: ["Next.js", "TypeScript", "PostgreSQL", "Prisma", "Better Auth"],
  },
];

// ─── Testimonials ────────────────────────────────────────────────────────────

export const testimonials: Testimonial[] = [
  {
    id: "mustafa",
    quote:
      "During his six months with us at Quaid Soft, Saad demonstrated exceptional reliability and a rapid grasp of enterprise workflows. He contributed substantially to our server-side ASP.NET architecture and ERP database operations, consistently writing clean code, meeting strict delivery deadlines, and exhibiting strong problem-solving skills.",
    author: "Muhammad Mustafa",
    role: "Chief Executive Officer",
    organization: "Quaid Soft",
    context: "6-Month Full Stack Developer Internship",
  },
  {
    id: "fyp-advisor",
    quote:
      "Saad demonstrated outstanding technical depth throughout both Phase 1 and Phase 2 of his capstone project. Integrating AST parsing with fine-tuned LLMs on a 300K+ vulnerability dataset was an ambitious engineering undertaking, and his implementation delivered robust, production-grade results deserving of consecutive 'A' grades.",
    author: "FYP Evaluation Committee",
    role: "Project Advisor",
    organization: "Department of Computer Science, UCP",
    context: "SecureGuard Pro — AI Vulnerability Detection (Graded 'A')",
  },
  {
    id: "cdc-lead",
    quote:
      "Saad engineered our laboratory's financial and asset tracking system from the ground up. He took complex role-based requirements and turned them into a smooth, dependable platform that eliminated manual reporting bottlenecks across our branches. An absolute pleasure to work with.",
    author: "Project Lead",
    role: "Operations Manager",
    organization: "CDC Diagnostic Laboratories",
    context: "Full-Stack Lab Accounting & Asset Platform",
  },
];

// ─── Formspree ───────────────────────────────────────────────────────────────

// Replace with your actual Formspree endpoint after creating a form at https://formspree.io
export const FORMSPREE_ENDPOINT = "https://formspree.io/f/xwlpzwap";
