# Product

<!-- impeccable:product-schema 1 -->

## Platform

web

## Stack

Next.js 16 App Router, TypeScript strict, `output: 'export'` (fully static). Tailwind CSS v4 with CSS-first `@theme` tokens. shadcn/ui components via CLI. Motion (Framer Motion 12) only where CSS cannot do the job. Local variable fonts via `next/font/local`.

Confirmed with the owner. Production deploy is GitHub Pages at `amirsorayaei.com` via the repo's existing `CNAME`; a GitHub Actions Pages workflow must be added because the previous one was deleted in commit `696783c`, which is why the site currently 404s. Vercel is preview-only. No server runtime, so no API routes, no server actions, and no runtime image optimization.

## Users

Primary and deciding audience: **hiring managers and technical recruiters at remote-first product companies**, evaluating Amir Sorayaei for a senior frontend or full-stack role. They arrive from a job application, a LinkedIn profile, or a resume link. They are scanning under time pressure and are asking two questions: can this person own a product end to end, and what has he actually shipped.

Secondary, explicitly not the tiebreaker: freelance and agency clients. Where the two readings conflict, the hiring-manager reading wins.

## Product Purpose

A personal portfolio that replaces a dead site. It exists so that someone holding Amir's resume can verify the work behind it in a few minutes and come away able to describe what he builds.

Success is a visitor who can state, without scrolling back: the kind of engineer he is, one specific thing he shipped and what it changed, and how to contact him.

## Positioning

Seven-plus years owning product features end to end, not just implementing designs. The specific, non-copyable combination in the evidence: a telemedicine platform where he took over incomplete applications and shipped real-time video consultation, an AI clinical documentation workflow, payments with payouts, and role-scoped access across five portals, while also being the person who instrumented the funnel and moved registration conversion himself.

The differentiator is the pairing of deep frontend craft with product and measurement instinct. He finds the problem, builds the thing, and reads the numbers afterward.

## Operating Context

- Remote-only work. Every role since September 2023 has been remote.
- Availability: **open to full-time remote roles.** Confirmed by the owner for display. It is a dated claim and must be removed on his instruction.
- Visitors are typically on a laptop during a review pass, and often on a phone from a LinkedIn tap. Both matter.
- Companion artifact is the one-page ATS resume, generated separately in `/Users/amir/Documents/Job Hunting`. The site must not contradict it.

## Capabilities and Constraints

Content surfaces: a landing page, four case-study pages (`levita-health`, `roomvu`, `top-menu`, `ecatalog`), and a printable resume page offering the Full-Stack PDF.

**Hard constraints that outrank every design consideration:**

- **No location, residence, citizenship, visa, work-authorization, sanctions, or eligibility claim anywhere on the site.** Employer locations are historical facts and stay. Amir's own is never stated.
- **Every factual claim traces to `resume-source/MASTER-RESUME-EVIDENCE.md`.** Claims render from typed data carrying an evidence class, never from free prose. A build-time validator and denylist enforce this.
- Retired claims that must never appear: A.P.P `34% / 60% / 50% / 20%`; Hoomaan `40% fewer bug reports`; Roomvu numeric `50% Google One-Tap`; Roomvu generic `15% performance`; Levita `built the entire platform from scratch`, `four apps`, `7 languages`, `24 specialties`; `1M+ users` alongside `400K paid`; any HIPAA, GDPR, uptime, revenue, or transaction claim.
- Roomvu's approximately 400K paid users is **platform scale, never Listing Videos adoption**, and must be worded so wherever it appears.
- No proprietary company code, repository links, or logged-in product screenshots. Public marketing pages only.
- Personal GitHub side projects are **out of scope for this version**. No labs section.
- Hoomaan appears as an experience entry only. No link, no project detail, no case study.

Landing page depth is deliberately shallow: banner, company name and outbound link, role, dates, company location and work mode, a short company brief, and a link onward. All substance lives on the case-study pages.

## Brand Commitments

- Name: Amir Sorayaei. Canonical title: Senior Full-Stack Developer.
- Contact is `mailto:amirsorayaeii@gmail.com` (the double `i` is correct), plus LinkedIn `linkedin.com/in/amir-sorayaei` and GitHub `github.com/amirsorayaei`. No hosted contact form.
- **Voice, binding.** Start from the before-state: what was broken when he arrived. Narrate as one connected story rather than a feature list. Name who benefits and how their day changed. Say what went badly first. Name a gap plainly instead of polishing it out. Hedge approximate numbers with roughly or about. Short sentences.
- **Banned in all copy: em-dashes.** Also banned: leverage, spearheaded, passionate about, proven track record, deep expertise, world-class, enterprise-grade, and three-adjective stacks.
- English is his second language, upper-intermediate. Copy should read as plainly written, not as marketing polish.
- The previous site is an **anti-reference**, not a baseline. It carried fabricated metrics and is being replaced entirely.

## Evidence on Hand

- `/Users/amir/Documents/Job Hunting/resume-source/MASTER-RESUME-EVIDENCE.md` is the sole factual authority. 665 lines, every claim carrying an evidence label.
- `/Users/amir/Documents/Job Hunting/PORTFOLIO-BUILD-PLAN.md` holds the agreed scope and the case-study spine.
- Company sites: `levitamed.com` verified live, `roomvu.com` verified live. `topmenumarket.com` and `ecatalog.top/platform` supplied by the owner but **not yet reachable from this environment; verify before publishing either link.**
- Levita's public site states 50+ certified doctors, 18 medical specialties, and partners Intermedica and Orange Farmaci. These are the company's own public claims and may appear only as attributed product context, never as Amir's personal metric.
- Resume PDF to host: `resume-source/fullstack/AmirSorayaei-Resume-FullStack.pdf`.
- **Absences that must not be filled by invention:** no product screenshots of any logged-in company interface exist. No photograph of Amir has been supplied. No testimonials, no client quotes, no company logos cleared for use, no Levita transaction or revenue figures. Do not fabricate any of these, and do not generate imagery that implies a real product screen.

## Product Principles

1. **Verifiable over impressive.** Every number on the page can be defended in an interview. A claim without provenance does not ship, however good it would look.
2. **The landing sells the click, the case study does the convincing.** Depth on the landing page is a failure of restraint.
3. **Scope honestly.** State what he owned and what the team owned. Ownership boundaries are stated in the copy, not implied by omission.
4. **Say the hard part.** The moment something went wrong first, and how the fix was confirmed, is the most credible content on the site. It is never edited out for smoothness.
5. **Fast and reachable from a phone.** A recruiter tapping a LinkedIn link on mobile is the common case, not the edge case.

## Accessibility & Inclusion

Target WCAG 2.2 AA. Full keyboard operation with visible focus, semantic landmarks and heading order, AA contrast in both themes, `prefers-reduced-motion` honored with motion-free fallbacks, and every route usable via direct navigation under static export.
