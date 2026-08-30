import { claims, deltas, type Claim, type Delta } from "./claims";

export type CaseStudyLink = {
  slug: string;
  title: string;
  /** The product's own public site. Null until a link is verified reachable. */
  url: string | null;
};

export type Engagement = {
  id: string;
  company: string;
  /** Fits inside a narrow segment of the career run. */
  shortName: string;
  role: string;
  /** The company's public site. Null when none exists. */
  url: string | null;
  start: string;
  end: string;
  /** Months served. Drawn to true scale on the run, never eyeballed. */
  months: number;
  location: string;
  mode: "Remote" | "On-site";
  /** What the company does, in plain terms. Two or three sentences, no more. */
  brief: string;
  /** The one measured change this engagement is remembered by. */
  headline: Delta;
  /** Supporting facts shown on the landing card. Kept to two. */
  notes: Claim[];
  caseStudies: CaseStudyLink[];
};

export const engagements: Engagement[] = [
  {
    id: "levita",
    shortName: "Levita",
    company: "Levita Health",
    role: "Senior Full-Stack Developer",
    url: "https://levitamed.com",
    start: "Dec 2025",
    end: "Aug 2026",
    months: 9,
    location: "Barcelona, serving Albania and the Balkans",
    mode: "Remote",
    brief:
      "Telemedicine for Albania. A patient picks a doctor by specialty or symptom, pays, and meets them on video inside the product. Prescriptions and lab results land back in their account afterwards.",
    headline: deltas.levitaRegistration,
    notes: [claims.levitaOwnership, claims.levitaConsultation],
    caseStudies: [
      {
        slug: "levita-health",
        title: "Taking over a half-built telemedicine platform",
        url: "https://levitamed.com",
      },
    ],
  },
  {
    id: "roomvu",
    shortName: "Roomvu",
    company: "Roomvu",
    role: "Senior Front-End Developer",
    url: "https://www.roomvu.com",
    start: "Sep 2023",
    end: "Dec 2025",
    months: 28,
    location: "Vancouver, Canada",
    mode: "Remote",
    brief:
      "Real-estate marketing on subscription. An agent turns a property listing into a branded video and schedules it out to their social channels without leaving the platform.",
    headline: deltas.roomvuSubscribe,
    notes: [claims.roomvuPlatform, claims.roomvuSoleFrontend],
    caseStudies: [
      {
        slug: "roomvu",
        title: "The page people visited and did not subscribe from",
        url: "https://www.roomvu.com",
      },
    ],
  },
  {
    id: "app",
    shortName: "A.P.P",
    company: "A.P.P Software Solutions",
    role: "Lead Front-End Developer",
    url: null,
    start: "Sep 2020",
    end: "Sep 2023",
    months: 36,
    location: "Mashhad, Iran",
    mode: "On-site",
    brief:
      "Two subscription products for local businesses. Top Menu put restaurant menus and ordering on a phone. eCatalog did the same for product catalogues. Both sold on renewable annual plans with support.",
    headline: deltas.topMenuLoad,
    notes: [claims.topMenuVisits, claims.appTeam],
    caseStudies: [
      {
        slug: "top-menu",
        title: "A 4MB bundle and 400 restaurants",
        url: "https://topmenumarket.com",
      },
      {
        slug: "ecatalog",
        title: "Setting the architecture, then handing it over",
        url: "https://ecatalog.top/platform",
      },
    ],
  },
  {
    id: "hoomaan",
    shortName: "Hoomaan",
    company: "Hoomaan",
    role: "Front-End Developer",
    url: null,
    start: "Apr 2019",
    end: "Sep 2020",
    months: 18,
    location: "Mashhad, Iran",
    mode: "On-site",
    brief:
      "A digital agency. A new client application roughly every two months, taken from first commit through release and support.",
    headline: deltas.hoomaanSetup,
    notes: [claims.hoomaanEcosystem],
    caseStudies: [],
  },
];

export const totalMonths = engagements.reduce((sum, e) => sum + e.months, 0);
