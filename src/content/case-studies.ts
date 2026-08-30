import { claims, deltas, type Claim, type Delta } from "./claims";

/**
 * Long-form case studies.
 *
 * Section order is fixed across all four so a reviewer can find the same thing
 * in the same place every time: what was broken, what he owned, what he decided
 * and what he ruled out, how it works, what went wrong first, what changed.
 *
 * The "decisions" section is the one most engineering portfolios skip. It is
 * the reason this page exists rather than a list of features.
 *
 * Nothing here may state a metric in prose. Outcomes render from claims.ts.
 */

export type FlowStep = {
  /** Who or what performs this step. Becomes the lane label. */
  actor: string;
  label: string;
  detail?: string;
  /** This step used to happen outside the product. Marked in the schematic. */
  wasOutside?: boolean;
};

export type Decision = {
  /** The call that was made. */
  choice: string;
  /** What it was chosen over. The part that is usually missing. */
  insteadOf: string;
  /** Why. */
  because: string;
};

export type CaseStudy = {
  slug: string;
  company: string;
  /** Employer link, or the product's own site. */
  url: string | null;
  /** True once the link has been opened and confirmed reachable. */
  urlVerified: boolean;
  title: string;
  role: string;
  dates: string;
  mode: string;
  team: string;
  /** One line. What a reviewer takes away if they read nothing else. */
  standfirst: string;
  /** What existed, and what was broken, when he arrived. */
  before: string[];
  /** What he owned, and explicitly what he did not. */
  owned: string[];
  boundary: string;
  decisions: Decision[];
  flow: { caption: string; steps: FlowStep[] } | null;
  /** The part that went badly, and how the fix was confirmed. */
  wentWrong: { problem: string; fix: string; confirmed: string } | null;
  outcomes: (Claim | Delta)[];
  stack: string[];
};

export const caseStudies: CaseStudy[] = [
  {
    slug: "levita-health",
    company: "Levita Health",
    url: "https://levitamed.com",
    urlVerified: true,
    title: "Taking over a half-built telemedicine platform",
    role: "Senior Full-Stack Developer",
    dates: "Dec 2025 to Aug 2026",
    mode: "Remote",
    team: "Primary owner across the Levita repositories, after the previous developer moved to another product",
    standfirst:
      "Two unfinished applications, consultations happening on Google Meet, and payment arranged privately between doctor and patient. Nine months later all of it ran inside the product.",
    before: [
      "The patient and doctor applications existed but were incomplete. The previous developer handed the project over and moved to another product, and I became the primary owner across the repositories.",
      "There was no admin portal at all. Clinic and pharmacy were ideas rather than working products.",
      "Consultations happened on Google Meet. The doctor left the product to take the call, which meant leaving the patient record behind, then came back afterwards to write everything up.",
      "Payment was arranged between the doctor and the patient outside the platform. Nothing about it was the product's problem, which also meant the product could not do anything about it.",
    ],
    owned: [
      "Completed the patient and doctor applications and prepared them for production use.",
      "Built the admin portal from nothing, then brought up the clinic and pharmacy experiences afterwards.",
      "Owned frontend and Convex backend delivery across the whole set of connected workflows: booking, consultations, reports, prescriptions, labs, notifications, payments, and the operational portals.",
      "Proposed and implemented the product analytics, then used it to find and fix the registration drop-off myself rather than waiting for it to be assigned.",
    ],
    boundary:
      "I did not build the platform from scratch. Two applications already existed and were incomplete. What I built from zero was the admin portal, the in-product consultation, the AI documentation workflow, the payment and payout flow, and the clinic and pharmacy experiences.",
    decisions: [
      {
        choice:
          "Move the consultation inside the product, on Daily and WebRTC.",
        insteadOf: "Keeping the Google Meet link that already worked.",
        because:
          "Meet worked as a video call and failed as a consultation. The doctor could not see the patient record while talking to them, and nothing that happened in the call came back into the system. Owning the call meant the record, the chat, the screen share, and the recording could all be in one place.",
      },
      {
        choice:
          "Take payment before the meeting is created, hold it, and credit the doctor's share to a wallet.",
        insteadOf:
          "Letting the doctor and patient settle it privately, as they had been.",
        because:
          "A consultation that is paid for afterwards is a consultation somebody has to chase. Collecting first made the booking real, and the wallet plus an admin-reviewed withdrawal meant the platform could account for its own commission instead of guessing.",
      },
      {
        choice:
          "Have the AI draft the report and require the doctor to review, edit, and accept it.",
        insteadOf: "Generating the final document automatically.",
        because:
          "Transcription and summarising are safe to automate. Prescriptions and lab decisions are clinical judgement and stayed manual. The draft saves the typing, not the thinking.",
      },
      {
        choice:
          "Scope every query by role and tenant, and fail closed on cross-tenant access.",
        insteadOf: "Filtering records in the interface.",
        because:
          "Five portals read the same database. A patient record hidden by the frontend is not hidden. Getting this wrong in a health product is not a bug, it is an incident.",
      },
    ],
    flow: {
      caption:
        "One consultation, end to end. The marked steps are the ones that used to happen outside the product: payment arranged privately, the call on Google Meet, and the write-up in the doctor's own time afterwards.",
      steps: [
        { actor: "Patient", label: "Books", detail: "Picks a doctor by specialty or symptom" },
        { actor: "Patient", label: "Pays", detail: "Stripe checkout, before the meeting exists", wasOutside: true },
        { actor: "Both", label: "Consultation", detail: "Daily and WebRTC, with the record on screen", wasOutside: true },
        { actor: "System", label: "Records", detail: "Room and token lifecycle, recording webhook" },
        { actor: "System", label: "Transcribes", detail: "Soniox, with speaker separation" },
        { actor: "System", label: "Drafts report", detail: "OpenRouter, with retry and stale-draft timeout" },
        { actor: "Doctor", label: "Reviews and accepts", detail: "Edits the draft, decides prescriptions and labs", wasOutside: true },
        { actor: "System", label: "Notifies and pays out", detail: "Patient notified, doctor share credited to wallet" },
      ],
    },
    wentWrong: {
      problem:
        "The audio and video quality was genuinely bad at first. Building the call was the easy part. Making it good enough that a doctor would rather use it than send a Meet link was not.",
      fix: "Worked through the Daily configuration, including noise cancellation, echo control, and adaptive quality, and added device permission and readiness checks before the user is put into the meeting rather than after.",
      confirmed:
        "Test sessions with doctors and simulated patients, repeated until the feedback stopped being about the connection. The doctors' own reason for preferring it was that they never had to leave Levita.",
    },
    outcomes: [
      deltas.levitaRegistration,
      deltas.levitaDocumentation,
      claims.levitaOwnership,
      claims.levitaScale,
    ],
    stack: [
      "Next.js",
      "TypeScript",
      "Convex",
      "Daily",
      "WebRTC",
      "Stripe",
      "Soniox",
      "OpenRouter",
      "PostHog",
    ],
  },

  {
    slug: "roomvu",
    company: "Roomvu",
    url: "https://www.roomvu.com",
    urlVerified: true,
    title: "The page people visited and did not subscribe from",
    role: "Senior Front-End Developer",
    dates: "Sep 2023 to Dec 2025",
    mode: "Remote",
    team: "Dedicated frontend team went from three engineers to two, then to one",
    standfirst:
      "Traffic to the campaign page was steady. Subscriptions from it were not. The problem turned out to be the part of the page nobody was measuring.",
    before: [
      "Listing Videos let an agent turn a property listing into a branded video and schedule it out to their social channels. It was a paid feature, so the sample a free user could edit and preview but not share was the thing that had to sell the subscription.",
      "Sample videos went out through email campaigns to free users, landing them on one campaign page. Visitor volume to that page was stable. The number of people who clicked subscribe was not what it should have been.",
      "Video player logic was being edited in place and forked by different teams, so the same fix had to be made more than once and did not always get made the same way.",
      "The dedicated frontend team shrank from three engineers to two, and for the final eight months I was the only one.",
    ],
    owned: [
      "The Listing Videos frontend end to end: the player, the editor, the configuration, the pages, and the integration.",
      "Performance auditing on the important landing pages and funnels, which I started doing without being asked and then presented in meetings.",
      "The video player packages and the rules that kept other teams on the supported version of them.",
      "End-to-end coverage on the flows worth protecting: signup, onboarding, and video-led registration.",
    ],
    boundary:
      "Frontend ownership. The backend and the product outcomes were team work, and the funnels I measured against were defined and maintained by the data team. The platform's roughly 400K paid users is company scale, not the number of people who used Listing Videos.",
    decisions: [
      {
        choice:
          "Look at how the page loaded rather than at how many people arrived.",
        insteadOf: "Treating steady traffic as proof the page was fine.",
        because:
          "Visitor volume was stable, so the instinct is to look upstream at acquisition. But the same number of people kept arriving and not converting, which points at what happens after they land. Slow video delivery, oversized images, and long loaders were doing the damage.",
      },
      {
        choice:
          "Stream the video over HLS and preload only the current image plus the next two.",
        insteadOf:
          "Loading the full video and every image before the page felt ready.",
        because:
          "The visitor decides in the first seconds. Everything the page fetches that they have not scrolled to yet is spending their attention on something they cannot see.",
      },
      {
        choice:
          "Extract the video players into independently versioned NPM packages.",
        insteadOf: "Letting each team keep its own copy of the player logic.",
        because:
          "One fix should land once. Forked players meant the same bug got solved several times and sometimes differently, which is worse than not solving it, because now the behaviour depends on which page you are on.",
      },
      {
        choice:
          "Enforce the supported API with TypeScript types and ESLint rules that point at the replacement.",
        insteadOf: "Writing it down and telling people.",
        because:
          "Documentation does not stop anyone. A rule that fires in the editor and names the function to use instead does, and it keeps working after everybody has forgotten the conversation.",
      },
    ],
    flow: {
      caption:
        "What the visitor waits for, in order. What changed was not which assets the page loads, it is when it loads them.",
      steps: [
        { actor: "Email", label: "Sample video", detail: "Campaign to free users" },
        { actor: "Page", label: "First paint", detail: "No layout shift while media resolves" },
        { actor: "Page", label: "Video streams", detail: "HLS, so the full file never blocks" },
        { actor: "Page", label: "Images window", detail: "Current plus next two, rest in background" },
        { actor: "Visitor", label: "Subscribe", detail: "The action the page exists for" },
        { actor: "Funnel", label: "Paid checkout", detail: "Measured in Metabase" },
      ],
    },
    wentWrong: {
      problem:
        "The obvious reading was wrong. Steady traffic and weak conversion looks like an acquisition or a pricing problem, and that is where the conversation starts. It cost time before anyone looked at the page itself.",
      fix: "Measured the page instead of arguing about it. GTmetrix, Lighthouse, Chrome DevTools, and Web Vitals on the actual campaign page, which made the media loading the obvious suspect rather than a theory.",
      confirmed:
        "Metabase funnels maintained by the data team, watched over the following two weeks. Visitor volume had not moved, so the change in subscribes was attributable to the page.",
    },
    outcomes: [
      deltas.roomvuSubscribe,
      deltas.roomvuGtmetrix,
      claims.roomvuListingVideos,
      claims.roomvuSoleFrontend,
      claims.roomvuPlatform,
    ],
    stack: [
      "React",
      "Next.js",
      "TypeScript",
      "HLS",
      "NPM packages",
      "ESLint",
      "Cypress",
      "GitLab CI",
      "Metabase",
    ],
  },

  {
    slug: "top-menu",
    company: "A.P.P Software Solutions",
    url: "https://topmenumarket.com",
    urlVerified: false,
    title: "A 4MB bundle and 400 restaurants",
    role: "Lead Front-End Developer",
    dates: "Sep 2020 to Sep 2023",
    mode: "On-site, Mashhad",
    team: "Rotating team of 4 to 5 developers",
    standfirst:
      "A digital menu a diner opens at the table has one job, and it has to do it before they put the phone down. Ours took about two seconds and shipped four megabytes to do it.",
    before: [
      "I built Top Menu's frontend from zero and kept primary ownership of it. It went on to serve more than 400 restaurants on renewable annual subscriptions, with real ordering and real support.",
      "As it grew, the whole application shipped as one bundle of roughly 4MB, and the initial load sat at about two seconds. The person waiting is standing in a restaurant holding their own phone on somebody else's wifi.",
      "Server data lived in Redux with Redux Persist and a cache I maintained by hand. The same data got fetched again in different places because it was easier than working out whether it was already there.",
    ],
    owned: [
      "The frontend from the first commit through four-plus years in production.",
      "Weekly sprint review and planning for a rotating team of 4 to 5 developers, translating what the CEO and the customers wanted into scoped work.",
      "Recruiting, onboarding, and reviewing developers until they could work in the system independently.",
      "Talking to the restaurant customers directly, which is where the next piece of work usually came from.",
    ],
    boundary:
      "I built and owned Top Menu's frontend. The team's work was theirs; my part was the architecture, the review, and deciding what got built next. I also advocated for bringing in dedicated DevOps ownership rather than doing it myself.",
    decisions: [
      {
        choice:
          "Split the bundle at the route level and load chunks lazily.",
        insteadOf:
          "Optimising inside the existing single bundle, or blaming the network.",
        because:
          "A diner opening a menu needs one route. Shipping them the admin screens, the ordering flow, and every other page first is the actual cost, and no amount of tuning inside a 4MB bundle fixes shipping 4MB.",
      },
      {
        choice:
          "Move server data to React Query with SSR-backed requests, and take Redux out of it entirely.",
        insteadOf: "Keeping Redux Persist and improving the manual cache.",
        because:
          "The cache I was maintaining by hand was a worse version of something that already exists and is well tested. Server state has its own rules: it goes stale, it refetches, it belongs to the server. Client state does not.",
      },
      {
        choice: "Keep Zustand, but only for the client state that needed it.",
        insteadOf: "Moving everything into one store because one store is tidy.",
        because:
          "Once the server data was out, what remained was small. A large global store for a small amount of genuinely global state is just the old problem with a new library.",
      },
    ],
    flow: {
      caption:
        "What a diner actually touches. Everything to the right of the scan is what the route split protects.",
      steps: [
        { actor: "Diner", label: "Scans the code", detail: "At the table, on their own phone" },
        { actor: "App", label: "Loads one route", detail: "Route chunk, not the whole application" },
        { actor: "Diner", label: "Reads the menu", detail: "The thing they came for" },
        { actor: "Diner", label: "Orders", detail: "Real orders, not a demo" },
        { actor: "Restaurant", label: "Receives and manages", detail: "Admin side, its own chunk" },
      ],
    },
    wentWrong: {
      problem:
        "I wanted to claim the React Query migration cut our API requests by half, because it obviously reduced them. I could not show it. The measurement was never set up before the change, so the number would have been a guess wearing a percentage sign.",
      fix: "Kept the claims to what was actually measured: the bundle size and the initial load, both of which were observed directly in the build output and in Chrome DevTools before and after.",
      confirmed:
        "Chrome DevTools Network and the build output for the bundle, Lighthouse and GTmetrix for the load. The request reduction stays an unmeasured improvement, which is why it is not a number anywhere on this site.",
    },
    outcomes: [
      deltas.topMenuLoad,
      claims.topMenuFromZero,
      claims.topMenuCustomers,
      claims.topMenuVisits,
      claims.appTeam,
    ],
    stack: [
      "React",
      "TypeScript",
      "React Query",
      "Zustand",
      "SSR",
      "Code splitting",
      "Lighthouse",
      "GTmetrix",
    ],
  },

  {
    slug: "ecatalog",
    company: "A.P.P Software Solutions",
    url: "https://ecatalog.top/platform",
    urlVerified: false,
    title: "Setting the architecture, then handing it over",
    role: "Lead Front-End Developer",
    dates: "Sep 2020 to Sep 2023",
    mode: "On-site, Mashhad",
    team: "Started with one other developer, then the wider team",
    standfirst:
      "This one is short, because my part of it was short. I set the shape and then other people built it.",
    before: [
      "eCatalog was the second product, doing for product catalogues what Top Menu did for restaurant menus, and sold the same way: renewable annual subscriptions with support.",
      "It started from nothing, alongside a Top Menu codebase that had already taught us which early decisions get expensive.",
    ],
    owned: [
      "Set up the initial frontend architecture together with one other developer.",
      "Guided the delivery as implementation moved to team members, through review and sprint planning rather than by writing most of it.",
    ],
    boundary:
      "Most of the eCatalog implementation is not mine. I established the architecture and guided the people who built it. It is on this site because setting up a codebase other people then work in is a different skill from writing it yourself, not because I want credit for the whole product.",
    decisions: [
      {
        choice:
          "Carry the structure over from Top Menu rather than starting the conversation again.",
        insteadOf: "Treating a new product as a chance to try everything new.",
        because:
          "We had just spent a long time learning what a monolithic bundle and a hand-managed cache cost us. A second product built by a rotating team is exactly the situation where those lessons are worth more than novelty.",
      },
      {
        choice: "Hand implementation to the team early and review it.",
        insteadOf: "Keeping the interesting parts and delegating the rest.",
        because:
          "People become productive in a codebase by working in it, not by watching. Reviewing their work was slower for me in the short term and is the reason the product kept moving when I was on Top Menu.",
      },
    ],
    flow: null,
    wentWrong: null,
    outcomes: [claims.ecatalogArchitecture, claims.ecatalogSubscriptions],
    stack: ["React", "TypeScript", "Component architecture", "Code review"],
  },
];

export function getCaseStudy(slug: string) {
  return caseStudies.find((c) => c.slug === slug);
}
