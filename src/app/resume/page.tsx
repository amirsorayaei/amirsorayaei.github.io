import type { Metadata } from "next";
import Link from "next/link";
import { ArrowLeft, Download } from "lucide-react";
import { ThemeToggle } from "@/components/theme-toggle";
import { engagements } from "@/content/work";
import { site, education, languages, capabilities } from "@/content/site";

export const metadata: Metadata = {
  title: "Resume",
  description: `${site.name}, ${site.title}. Seven years across telemedicine, real-estate SaaS, and restaurant commerce.`,
  openGraph: {
    images: [{ url: "/og/resume.png", width: 1200, height: 630 }],
  },
  twitter: { card: "summary_large_image", images: ["/og/resume.png"] },
};

/**
 * The resume, rendered from the same data as the rest of the site so the two
 * cannot drift apart. The PDF is the one-page ATS version, generated separately
 * and offered alongside.
 *
 * Prints on white with black text regardless of the theme on screen: a diazo
 * ground would eat a printer's toner and read worse on paper.
 */
export default function ResumePage() {
  return (
    <div className="mx-auto w-full max-w-[64rem] px-5 sm:px-8 lg:px-12">
      <header className="flex items-center justify-between gap-6 py-6 print:hidden">
        <Link
          href="/"
          className="annotation -m-2 inline-flex items-center gap-2 p-2 transition-colors hover:text-foreground"
        >
          <ArrowLeft className="size-3.5" aria-hidden />
          {site.name}
        </Link>
        <div className="flex items-center gap-3">
          <ThemeToggle />
          <a
            href={site.resumePdf}
            className="annotation inline-flex items-center gap-2 border border-line px-3 py-2.5 transition-colors hover:border-signal hover:text-signal"
          >
            <Download className="size-3.5" aria-hidden />
            PDF
          </a>
        </div>
      </header>

      <div className="measure print:hidden" />

      <article className="flex max-w-[46rem] flex-col gap-12 py-14 print:max-w-none print:py-0">
        {/* identity */}
        <div className="flex flex-col gap-5">
          <div>
            <h1 className="text-4xl font-semibold tracking-[-0.04em] sm:text-5xl">
              {site.name}
            </h1>
            <p className="mt-2 text-xl text-muted-foreground">{site.title}</p>
          </div>

          <div className="flex flex-wrap gap-x-6 gap-y-2 text-sm">
            <a
              href={`mailto:${site.email}`}
              className="-my-1 py-1 underline-offset-[0.28em] hover:underline"
            >
              {site.email}
            </a>
            <a
              href={site.linkedin}
              target="_blank"
              rel="noreferrer noopener"
              className="-my-1 py-1 underline-offset-[0.28em] hover:underline"
            >
              linkedin.com/in/amir-sorayaei
            </a>
            <a
              href={site.github}
              target="_blank"
              rel="noreferrer noopener"
              className="-my-1 py-1 underline-offset-[0.28em] hover:underline"
            >
              github.com/amirsorayaei
            </a>
          </div>

          <p className="max-w-[68ch] text-base leading-relaxed">
            Senior full-stack developer with {site.experienceYears} years
            delivering React, Next.js, and TypeScript products across
            telemedicine, real-estate SaaS, and commerce. Owns features from
            frontend architecture through serverless workflows, real-time video,
            payments, AI integrations, and production delivery.
          </p>
        </div>

        {/* experience */}
        <section className="flex flex-col gap-8">
          <h2 className="border-b border-line-soft pb-2 text-lg font-semibold tracking-[-0.02em]">
            Experience
          </h2>

          {engagements.map((e) => (
            <div key={e.id} className="flex flex-col gap-3">
              <div className="flex flex-wrap items-baseline justify-between gap-x-6 gap-y-1">
                <h3 className="text-lg font-semibold tracking-[-0.02em]">
                  {e.company}
                  <span className="font-normal text-muted-foreground">
                    {" · "}
                    {e.role}
                  </span>
                </h3>
                <p className="annotation">
                  {e.start} to {e.end} · {e.mode}
                </p>
              </div>

              <ul className="flex flex-col gap-2">
                {e.built.map((b) => (
                  <li key={b.id} className="flex gap-3">
                    <span
                      className="mt-[0.7em] h-px w-3 shrink-0 bg-line"
                      aria-hidden
                    />
                    <p className="max-w-[64ch] text-base leading-relaxed">{b.display}.</p>
                  </li>
                ))}
                <li className="flex gap-3">
                  <span
                    className="mt-[0.7em] h-px w-3 shrink-0 bg-line"
                    aria-hidden
                  />
                  <p className="max-w-[64ch] text-base leading-relaxed">
                    {e.headline.display}.
                  </p>
                </li>
              </ul>
            </div>
          ))}
        </section>

        {/* skills */}
        <section className="flex flex-col gap-4">
          <h2 className="border-b border-line-soft pb-2 text-lg font-semibold tracking-[-0.02em]">
            Skills
          </h2>
          <dl className="flex flex-col gap-2">
            {capabilities.map((c) => (
              <div
                key={c.name}
                className="grid gap-x-4 sm:grid-cols-[12rem_minmax(0,1fr)]"
              >
                <dt className="text-base font-medium">{c.name}</dt>
                <dd className="text-base text-muted-foreground">
                  {c.tools.join(", ")}
                </dd>
              </div>
            ))}
          </dl>
        </section>

        {/* education and languages */}
        <section className="grid gap-8 sm:grid-cols-2">
          <div className="flex flex-col gap-4">
            <h2 className="border-b border-line-soft pb-2 text-lg font-semibold tracking-[-0.02em]">
              Education
            </h2>
            <div>
              <p className="text-base font-medium">{education.degree}</p>
              <p className="text-base text-muted-foreground">
                {education.school}, {education.years}
              </p>
            </div>
          </div>

          <div className="flex flex-col gap-4">
            <h2 className="border-b border-line-soft pb-2 text-lg font-semibold tracking-[-0.02em]">
              Languages
            </h2>
            <dl className="flex flex-col gap-1">
              {languages.map((l) => (
                <div key={l.name} className="flex gap-2 text-base">
                  <dt className="font-medium">{l.name}</dt>
                  <dd className="text-muted-foreground">{l.level}</dd>
                </div>
              ))}
            </dl>
          </div>
        </section>

        <p className="border-t border-line-soft pt-5 text-sm text-muted-foreground print:hidden">
          The one-page version, formatted for applicant tracking systems, is
          available as a{" "}
          <a
            href={site.resumePdf}
            className="text-foreground decoration-signal underline underline-offset-[0.28em]"
          >
            PDF
          </a>
          .
        </p>
      </article>
    </div>
  );
}
