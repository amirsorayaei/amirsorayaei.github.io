/**
 * Every factual claim rendered anywhere on this site originates here.
 *
 * Nothing in a page, a component, or an MDX file may assert a number, a scale,
 * or an outcome in free prose. It renders from one of these records or it does
 * not ship. `npm run validate:claims` enforces that, plus a denylist of claims
 * that have been permanently retired.
 *
 * Authority: /Users/amir/Documents/Job Hunting/resume-source/MASTER-RESUME-EVIDENCE.md
 */

/**
 * confirmed      directly confirmed and sufficiently defined for external use
 * approximate    honest recollection, must be hedged with roughly/about/more than
 * team_scale     company or platform scale, never an individual outcome
 * code_supported visible in an inspected codebase, proves scope not impact
 */
export type EvidenceClass =
  | "confirmed"
  | "approximate"
  | "team_scale"
  | "code_supported";

export type Claim = {
  id: string;
  evidence: EvidenceClass;
  /** The exact permitted wording. Never paraphrase this at a call site. */
  display: string;
  /** Guards against a reader drawing a bigger conclusion than the claim supports. */
  scopeNote?: string;
  /** Where in the evidence ledger this is defended. */
  source: string;
};

/** A claim with a measured before and after. Drawn to true scale. */
export type Delta = Claim & {
  /** What was measured. Without this a before and after is just a number. */
  subject: string;
  before: number;
  after: number;
  unit: string;
  betterWhen: "higher" | "lower";
  beforeLabel: string;
  afterLabel: string;
  /** How the change was observed. Shown as the footnote on the measure. */
  measuredBy: string;
};

export const deltas = {
  levitaRegistration: {
    id: "levita-registration-conversion",
    subject: "Patients who finished registering",
    evidence: "confirmed",
    display:
      "Raised conversion through the main patient-registration step from below 10% to above 40% over 1 to 2 months",
    source: "Metrics ledger, Levita, row 1. Directly observed in PostHog.",
    before: 10,
    after: 40,
    unit: "%",
    betterWhen: "higher",
    beforeLabel: "below 10%",
    afterLabel: "above 40%",
    measuredBy: "PostHog funnels, reviewed week over week",
  },
  levitaDocumentation: {
    id: "levita-documentation-time",
    subject: "Doctor time per consultation write-up",
    evidence: "approximate",
    display:
      "Cut the post-consultation documentation workflow from roughly 15 minutes to under 5",
    scopeNote:
      "Prescription and lab decisions stayed manual clinical work. The AI step reduced summary preparation.",
    source: "Metrics ledger, Levita, row 5.",
    before: 15,
    after: 5,
    unit: " min",
    betterWhen: "lower",
    beforeLabel: "roughly 15 min",
    afterLabel: "under 5 min",
    measuredBy: "Doctor workflow before and after the AI report step",
  },
  roomvuSubscribe: {
    id: "roomvu-subscribe-conversion",
    subject: "Subscribes from the campaign page",
    evidence: "confirmed",
    display:
      "Increased subscribe conversion by approximately 30%, measured through Metabase funnels",
    scopeNote:
      "A relative improvement on one campaign page, not percentage points, and not a platform-wide result.",
    source: "Metrics ledger, Roomvu, row 4. Funnels defined by the data team.",
    before: 100,
    after: 130,
    unit: "",
    betterWhen: "higher",
    beforeLabel: "baseline",
    afterLabel: "about 30% more",
    measuredBy: "Metabase funnels over the following two weeks",
  },
  roomvuGtmetrix: {
    id: "roomvu-gtmetrix",
    subject: "GTmetrix score on underperforming pages",
    evidence: "approximate",
    display:
      "Raised GTmetrix scores from roughly 65 to 85 to 90 on underperforming pages",
    source: "Metrics ledger, Roomvu, row 5.",
    before: 65,
    after: 87,
    unit: "",
    betterWhen: "higher",
    beforeLabel: "roughly 65",
    afterLabel: "85 to 90",
    measuredBy: "GTmetrix and Lighthouse, checked regularly",
  },
  topMenuLoad: {
    id: "topmenu-initial-load",
    subject: "Top Menu initial page load",
    evidence: "approximate",
    display:
      "Cut initial load from about 2 seconds to under 1 second by splitting a 4MB bundle into route-level chunks",
    source: "Metrics ledger, A.P.P, row 5. Observed in Chrome DevTools and build output.",
    before: 2,
    after: 1,
    unit: "s",
    betterWhen: "lower",
    beforeLabel: "about 2s",
    afterLabel: "under 1s",
    measuredBy: "Chrome DevTools Network, Lighthouse, GTmetrix",
  },
  hoomaanSetup: {
    id: "hoomaan-project-setup",
    subject: "Setup time for a new client project",
    evidence: "approximate",
    display: "Reduced new-project setup from 4 to 5 days to about one day",
    source: "Metrics ledger, Hoomaan, row 2. Reusable boilerplate.",
    before: 4.5,
    after: 1,
    unit: " days",
    betterWhen: "lower",
    beforeLabel: "4 to 5 days",
    afterLabel: "about 1 day",
    measuredBy: "Setup time across repeated agency project launches",
  },
} as const satisfies Record<string, Delta>;

export const claims = {
  levitaOwnership: {
    id: "levita-ownership",
    evidence: "confirmed",
    display:
      "Took over incomplete patient and doctor applications, completed them for production use within two months, and delivered the admin portal in under three weeks",
    scopeNote:
      "The platform was not built from scratch. Two applications existed and were incomplete.",
    source: "Levita context and delivery sequence.",
  },
  levitaConsultation: {
    id: "levita-consultation",
    evidence: "confirmed",
    display:
      "Replaced an external Google Meet workflow with an in-product Daily/WebRTC consultation experience by month three",
    source: "Levita built-in consultation system.",
  },
  levitaScale: {
    id: "levita-patients",
    evidence: "approximate",
    display: "Used by approximately 300 to 400 patients",
    source: "Levita product scale.",
  },
  roomvuPlatform: {
    id: "roomvu-platform-scale",
    evidence: "team_scale",
    display:
      "Within a subscription platform serving approximately 400K paid users",
    scopeNote:
      "Platform scale. Not Listing Videos adoption, and not an individual outcome.",
    source: "Metrics ledger, Roomvu, row 1.",
  },
  roomvuSoleFrontend: {
    id: "roomvu-sole-frontend",
    evidence: "confirmed",
    display:
      "The team's only dedicated frontend engineer for the final eight months",
    source: "Roomvu context and ownership.",
  },
  roomvuListingVideos: {
    id: "roomvu-listing-videos",
    evidence: "confirmed",
    display:
      "Owned the end-to-end frontend of the Listing Videos experience, so agents could customize, preview, schedule, and publish branded property videos across major social channels",
    scopeNote:
      "Frontend ownership. Backend and product outcomes stayed team work.",
    source: "Roomvu Listing Videos product scope.",
  },
  roomvuPackages: {
    id: "roomvu-packages",
    evidence: "confirmed",
    display:
      "Extracted reusable video players into independently versioned NPM packages and enforced the supported APIs through TypeScript and ESLint rules, so updates landed in one place instead of being forked per team",
    source: "Roomvu media architecture and consistency.",
  },
  topMenuFromZero: {
    id: "topmenu-from-zero",
    evidence: "confirmed",
    display:
      "Built Top Menu's frontend from zero and kept primary ownership of it, through real ordering workflows and renewable annual subscriptions",
    source: "A.P.P context and ownership.",
  },
  ecatalogArchitecture: {
    id: "ecatalog-architecture",
    evidence: "confirmed",
    display:
      "Set up eCatalog's initial frontend architecture with another developer, then guided delivery as implementation moved to the team",
    scopeNote: "Architecture and guidance. The implementation was not all his.",
    source: "A.P.P context and ownership.",
  },
  topMenuCustomers: {
    id: "topmenu-customers",
    evidence: "approximate",
    display: "Served more than 400 restaurant customers",
    source: "Metrics ledger, A.P.P, row 1.",
  },
  topMenuVisits: {
    id: "topmenu-visits",
    evidence: "confirmed",
    display:
      "Handled more than 500K monthly menu visits, deduplicated per user per day",
    scopeNote: "Menu visits, not registered users.",
    source: "Metrics ledger, A.P.P, row 2.",
  },
  appTeam: {
    id: "app-team",
    evidence: "confirmed",
    display: "Guided a rotating team of 4 to 5 developers",
    source: "Metrics ledger, A.P.P, row 7.",
  },
  ecatalogSubscriptions: {
    id: "ecatalog-subscriptions",
    evidence: "approximate",
    display: "Supported more than 30 annual eCatalog subscriptions",
    source: "Metrics ledger, A.P.P, row 4.",
  },
  hoomaanEcosystem: {
    id: "hoomaan-ecosystem",
    evidence: "confirmed",
    display:
      "Delivered a four-application production ecosystem for a large hypermarket, including live tracking for approximately four couriers",
    scopeNote: "One large client, not a multi-store system.",
    source: "Metrics ledger, Hoomaan, row 3.",
  },
} as const satisfies Record<string, Claim>;

/**
 * Facts about a company published by that company, on its own public site.
 * These are attributed product context. They are never Amir's personal metric.
 */
export const attributed = {
  levitaPublic: {
    id: "levita-public-site",
    evidence: "confirmed",
    display:
      "Levita's public site lists 50+ certified doctors across 18 medical specialties, with Intermedica and Orange Farmaci as partners",
    scopeNote: "Published by Levita on levitamed.com. Company scale, not an individual outcome.",
    source: "levitamed.com, read 2026-08-30.",
  },
} as const satisfies Record<string, Claim>;

export const evidenceLabel: Record<EvidenceClass, string> = {
  confirmed: "Confirmed",
  approximate: "Approximate",
  team_scale: "Platform scale",
  code_supported: "Code supported",
};
