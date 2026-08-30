/**
 * Identity, contact, and capability clusters.
 *
 * No location, residence, citizenship, visa, work-authorization, sanctions, or
 * eligibility statement appears here or anywhere else on the site. Employer
 * locations in work.ts are historical facts about those employers.
 */

export const site = {
  name: "Amir Sorayaei",
  title: "Senior Full-Stack Developer",
  /** Confirmed for display 2026-08-30. Dated claim. Remove on request. */
  availability: "Open to full-time remote roles",
  experienceYears: "7+",
  email: "amirsorayaeii@gmail.com",
  linkedin: "https://www.linkedin.com/in/amir-sorayaei",
  github: "https://github.com/amirsorayaei",
  resumePdf: "/AmirSorayaei-Resume.pdf",
  /**
   * Where the site actually answers today. Open Graph images are absolute URLs
   * built from this, so pointing it at a domain that does not resolve yet gives
   * every share a broken preview. Set NEXT_PUBLIC_SITE_URL to
   * https://amirsorayaei.com once that custom domain is attached in Pages.
   */
  url: process.env.NEXT_PUBLIC_SITE_URL ?? "https://amirsorayaei.github.io",
} as const;

/**
 * The thesis. This is the only place the site describes Amir in the abstract,
 * and it stays this short on purpose. Everything else is evidence.
 */
export const thesis =
  "I take over products that are half-finished and make them work, then check whether the change actually helped. Seven years of that, across telemedicine, real-estate SaaS, and restaurant commerce.";

export type Capability = {
  name: string;
  /** Concrete things built with it. Never a proficiency rating. */
  detail: string;
  tools: string[];
};

export const capabilities: Capability[] = [
  {
    name: "Product frontend",
    detail:
      "Portals, editors, and media-heavy interfaces. Shared UI primitives and documented standards so one change lands in one place.",
    tools: ["React", "Next.js", "TypeScript", "Tailwind CSS", "Radix"],
  },
  {
    name: "Real-time and video",
    detail:
      "In-product consultation with live connection state, device permission checks, screen sharing, chat, and recording. Live courier tracking over WebSockets.",
    tools: ["Daily", "WebRTC", "WebSockets", "Convex realtime", "HLS"],
  },
  {
    name: "Backend and workflows",
    detail:
      "Serverless backend behind interconnected workflows: booking, consultations, reports, prescriptions, labs, notifications.",
    tools: ["Convex", "Node.js", "REST APIs", "Webhooks"],
  },
  {
    name: "Payments",
    detail:
      "Payment collected before booking, commission split into in-app wallets, and withdrawals routed through admin review.",
    tools: ["Stripe", "Checkout", "Signed webhooks", "Wallets and payouts"],
  },
  {
    name: "Measurement",
    detail:
      "Instrumenting the funnel first, then changing the page. Events across landing, signup, onboarding, and payment, reviewed week over week.",
    tools: ["PostHog", "Metabase", "A/B testing", "GTmetrix", "Lighthouse"],
  },
  {
    name: "AI in the workflow",
    detail:
      "Recorded consultation into transcription, into a drafted clinical report a doctor reviews, edits, and approves. The human stays in the loop.",
    tools: ["Soniox", "OpenRouter", "Google Vision"],
  },
  {
    name: "Authorization",
    detail:
      "Role and tenant scoping across five separate portals, with fail-closed cross-tenant checks so records stay with the people allowed to see them.",
    tools: ["RBAC", "Tenant isolation", "Hashed credentials"],
  },
  {
    name: "Quality gates",
    detail:
      "End-to-end checks on signup and onboarding running in CI before deployment, with recorded failure video to find the exact broken step.",
    tools: ["Cypress", "GitLab CI", "ESLint", "TypeScript constraints"],
  },
];

/**
 * The honest note. Kept because naming a gap plainly is what makes the rest
 * believable, and because it is true.
 */
export const about = [
  "I usually arrive after someone else has started. At Levita the patient and doctor apps already existed and were not finished. At Roomvu the team went from three frontend engineers to one. Most of what I am good at comes from that: reading a codebase somebody else wrote, working out what is actually broken, and shipping the next thing without breaking what already works.",
  "The part I care about is what happens after the deploy. It is easy to ship a redesign and call it an improvement. I would rather instrument the funnel first, change one thing, and find out. Sometimes the answer is that it did nothing.",
  "English is my second language. I read and write it comfortably and I work entirely in English, but I am upper-intermediate, not fluent, and I would rather say that here than have you find out on a call.",
];

export const education = {
  degree: "B.Sc. Computer Engineering",
  school: "Shahrood University of Technology",
  years: "2016 to 2020",
} as const;

export const languages = [
  { name: "Persian", level: "Native" },
  { name: "English", level: "Upper-Intermediate (B2)" },
] as const;
