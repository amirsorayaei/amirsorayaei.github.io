import { Mail, ArrowUpRight, Download } from "lucide-react";
import { CareerRun } from "@/components/career-run";
import { EngagementRow } from "@/components/engagement-row";
import { ThemeToggle } from "@/components/theme-toggle";
import { attributed } from "@/content/claims";
import { engagements } from "@/content/work";
import { site, thesis, capabilities, about } from "@/content/site";

const longestMonths = Math.max(...engagements.map((e) => e.months));

export default function Home() {
  return (
    <div className="mx-auto w-full max-w-[84rem] px-5 sm:px-8 lg:px-12">
      {/* ----------------------------------------------------------------- */}
      <header className="flex items-center justify-between gap-6 py-6">
        <p className="annotation !tracking-[0.2em] text-foreground">
          {site.name}
        </p>
        <div className="flex items-center gap-3">
          <ThemeToggle />
          <a
            href={`mailto:${site.email}`}
            className="annotation border border-line-soft px-2.5 py-1.5 transition-colors hover:border-line hover:text-foreground"
          >
            Email
          </a>
        </div>
      </header>

      <div className="measure" />

      {/* --- hero: who he is, and the career drawn to scale ---------------- */}
      <section className="grid gap-10 pt-14 pb-16 lg:grid-cols-[minmax(0,1fr)_22rem] lg:gap-16 lg:pt-20 lg:pb-24">
        <div className="flex flex-col justify-between gap-12">
          <div className="flex flex-col gap-7">
            <h1 className="max-w-[16ch] text-[clamp(2.75rem,6.8vw,5rem)] font-semibold leading-[0.92] tracking-[-0.045em]">
              I build the product, then I find out if it worked.
            </h1>
            <p className="max-w-[58ch] text-lg leading-relaxed text-muted-foreground sm:text-xl">
              {thesis}
            </p>
          </div>

          <CareerRun />
        </div>

        {/* margin annotations: the drawing sheet's title block */}
        <aside className="flex h-full flex-col justify-between gap-10 border-line-soft lg:border-l lg:pl-10">
          <dl className="flex flex-col gap-5">
            <div>
              <dt className="annotation">Who</dt>
              <dd className="mt-1 text-xl font-medium">{site.name}</dd>
            </div>
            <div>
              <dt className="annotation">Discipline</dt>
              <dd className="mt-1 text-xl font-medium">{site.title}</dd>
            </div>
            <div>
              <dt className="annotation">Experience</dt>
              <dd className="mt-1 text-xl font-medium">
                {site.experienceYears} years
              </dd>
            </div>
            <div>
              <dt className="annotation">Status</dt>
              <dd className="mt-1 flex items-baseline gap-2 text-xl font-medium text-signal">
                <span
                  className="size-2 shrink-0 translate-y-[-0.15em] rounded-full bg-signal"
                  aria-hidden
                />
                {site.availability}
              </dd>
            </div>
          </dl>

          <div className="measure" />

          <div className="flex flex-col gap-3">
            <a
              href={`mailto:${site.email}`}
              className="group inline-flex items-center justify-between gap-3 border border-line px-4 py-3 text-base transition-colors hover:border-signal hover:text-signal"
            >
              <span className="inline-flex items-center gap-2.5">
                <Mail className="size-4 shrink-0" aria-hidden />
                {site.email}
              </span>
              <ArrowUpRight
                className="size-4 shrink-0 transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5"
                aria-hidden
              />
            </a>
            <div className="flex gap-3">
              <a
                href={site.linkedin}
                target="_blank"
                rel="noreferrer noopener"
                className="annotation flex-1 border border-line-soft px-3 py-2.5 text-center transition-colors hover:border-line hover:text-foreground"
              >
                LinkedIn
              </a>
              <a
                href={site.github}
                target="_blank"
                rel="noreferrer noopener"
                className="annotation flex-1 border border-line-soft px-3 py-2.5 text-center transition-colors hover:border-line hover:text-foreground"
              >
                GitHub
              </a>
            </div>
          </div>
        </aside>
      </section>

      {/* --- the run ------------------------------------------------------ */}
      <section aria-labelledby="work" className="pt-4">
        <div className="measure" />
        <h2
          id="work"
          className="pt-10 text-2xl font-semibold tracking-[-0.03em] sm:text-3xl"
        >
          Four companies, newest first
        </h2>

        <div className="divide-y divide-line-soft">
          {engagements.map((engagement) => (
            <EngagementRow
              key={engagement.id}
              engagement={engagement}
              longestMonths={longestMonths}
            />
          ))}
        </div>
      </section>

      {/* --- capabilities -------------------------------------------------- */}
      <section aria-labelledby="capabilities" className="pt-6 pb-20">
        <div className="measure" />
        <h2
          id="capabilities"
          className="pt-10 pb-10 text-2xl font-semibold tracking-[-0.03em] sm:text-3xl"
        >
          What I have actually built with
        </h2>

        <dl className="grid gap-x-12 gap-y-10 sm:grid-cols-2 lg:grid-cols-3">
          {capabilities.map((cap) => (
            <div key={cap.name} className="flex flex-col gap-3">
              <dt className="text-lg font-semibold tracking-[-0.02em]">
                {cap.name}
              </dt>
              <dd className="flex flex-col gap-3">
                <p className="text-base leading-relaxed text-muted-foreground">
                  {cap.detail}
                </p>
                <p className="annotation !tracking-[0.1em] leading-relaxed">
                  {cap.tools.join("  ·  ")}
                </p>
              </dd>
            </div>
          ))}
        </dl>
      </section>

      {/* --- about --------------------------------------------------------- */}
      <section aria-labelledby="about" className="pb-20">
        <div className="measure" />
        <div className="grid gap-8 pt-10 md:grid-cols-[13rem_minmax(0,1fr)] md:gap-12 lg:grid-cols-[16rem_minmax(0,1fr)] lg:gap-16">
          <h2
            id="about"
            className="text-2xl font-semibold tracking-[-0.03em] sm:text-3xl"
          >
            How I work
          </h2>
          <div className="flex max-w-[68ch] flex-col gap-6">
            {about.map((para) => (
              <p key={para.slice(0, 24)} className="text-lg leading-relaxed">
                {para}
              </p>
            ))}
            <p className="border-t border-line-soft pt-5 text-sm text-muted-foreground">
              {attributed.levitaPublic.display}.{" "}
              <span className="annotation">
                {attributed.levitaPublic.scopeNote}
              </span>
            </p>
          </div>
        </div>
      </section>

      {/* --- contact ------------------------------------------------------- */}
      <section aria-labelledby="contact" className="pb-24">
        <div className="measure" />
        <div className="flex flex-col gap-10 pt-14">
          <h2
            id="contact"
            className="max-w-[16ch] text-[clamp(2rem,5vw,3.75rem)] font-semibold leading-[0.95] tracking-[-0.04em]"
          >
            Tell me what is broken.
          </h2>

          <div className="flex flex-wrap items-center gap-4">
            <a
              href={`mailto:${site.email}`}
              className="group inline-flex items-center gap-3 bg-signal px-6 py-4 text-lg font-medium text-paper transition-opacity hover:opacity-90"
            >
              <Mail className="size-5 shrink-0" aria-hidden />
              {site.email}
            </a>
            <a
              href={site.resumePdf}
              className="group inline-flex items-center gap-3 border border-line px-6 py-4 text-lg transition-colors hover:border-signal hover:text-signal"
            >
              <Download className="size-5 shrink-0" aria-hidden />
              Resume, one page
            </a>
          </div>
        </div>
      </section>

      <footer className="flex flex-wrap items-center justify-between gap-4 border-t border-line-soft py-8">
        <p className="annotation">
          {site.name} · {site.title}
        </p>
        <p className="annotation">
          Every number on this site is defended in an interview
        </p>
      </footer>
    </div>
  );
}
