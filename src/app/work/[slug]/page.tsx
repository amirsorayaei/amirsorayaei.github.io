import type { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";
import { notFound } from "next/navigation";
import { ArrowLeft, ArrowUpRight, Mail } from "lucide-react";
import { FlowDiagram } from "@/components/flow-diagram";
import { ThemeToggle } from "@/components/theme-toggle";
import { caseStudies, getCaseStudy } from "@/content/case-studies";
import { evidenceLabel } from "@/content/claims";
import { site } from "@/content/site";

export function generateStaticParams() {
  return caseStudies.map((c) => ({ slug: c.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const study = getCaseStudy(slug);
  if (!study) return {};
  return {
    title: study.title,
    description: study.standfirst,
    openGraph: { title: study.title, description: study.standfirst },
  };
}

/** Section heading. Carries its own weight, so there is no label above it. */
function Section({
  id,
  heading,
  children,
}: {
  id: string;
  heading: string;
  children: React.ReactNode;
}) {
  return (
    <section aria-labelledby={id} className="pb-16">
      <div className="measure" />
      <div className="grid gap-8 pt-10 md:grid-cols-[13rem_minmax(0,1fr)] md:gap-12 lg:grid-cols-[16rem_minmax(0,1fr)] lg:gap-16">
        <h2
          id={id}
          className="text-2xl font-semibold tracking-[-0.03em] sm:text-3xl"
        >
          {heading}
        </h2>
        <div className="flex flex-col gap-6">{children}</div>
      </div>
    </section>
  );
}

function Prose({ paragraphs }: { paragraphs: string[] }) {
  return (
    <>
      {paragraphs.map((p) => (
        <p
          key={p.slice(0, 28)}
          className="max-w-[68ch] text-lg leading-relaxed"
        >
          {p}
        </p>
      ))}
    </>
  );
}

export default async function CaseStudyPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const study = getCaseStudy(slug);
  if (!study) notFound();

  return (
    <div className="mx-auto w-full max-w-[84rem] px-5 sm:px-8 lg:px-12">
      <header className="flex items-center justify-between gap-6 py-6">
        <Link
          href="/"
          className="annotation inline-flex items-center gap-2 transition-colors hover:text-foreground"
        >
          <ArrowLeft className="size-3.5" aria-hidden />
          {site.name}
        </Link>
        <ThemeToggle />
      </header>

      <div className="measure" />

      {/* --- snapshot: role, dates, team, and the one line ---------------- */}
      <section className="grid gap-10 pt-14 pb-16 lg:grid-cols-[minmax(0,1fr)_22rem] lg:gap-16 lg:pt-20">
        <div className="flex flex-col gap-7">
          <h1 className="max-w-[18ch] text-[clamp(2.25rem,5.4vw,4.25rem)] font-semibold leading-[0.94] tracking-[-0.04em]">
            {study.title}
          </h1>
          <p className="max-w-[62ch] text-xl leading-relaxed text-muted-foreground">
            {study.standfirst}
          </p>
        </div>

        <aside className="flex flex-col gap-6 border-line-soft lg:border-l lg:pl-10">
          <dl className="flex flex-col gap-5">
            <div>
              <dt className="annotation">Company</dt>
              <dd className="mt-1 text-xl font-medium">
                {study.url ? (
                  <a
                    href={study.url}
                    target="_blank"
                    rel="noreferrer noopener"
                    className="group inline-flex items-start gap-1.5 hover:underline"
                  >
                    {study.company}
                    <ArrowUpRight
                      className="mt-1 size-4 shrink-0 text-line transition-colors group-hover:text-signal"
                      aria-hidden
                    />
                  </a>
                ) : (
                  study.company
                )}
              </dd>
            </div>
            <div>
              <dt className="annotation">Role</dt>
              <dd className="mt-1 text-base">{study.role}</dd>
            </div>
            <div>
              <dt className="annotation">When</dt>
              <dd className="mt-1 text-base">
                {study.dates} · {study.mode}
              </dd>
            </div>
            <div>
              <dt className="annotation">Team</dt>
              <dd className="mt-1 text-base text-muted-foreground">
                {study.team}
              </dd>
            </div>
            <div>
              <dt className="annotation">Built with</dt>
              <dd className="annotation mt-1 !tracking-[0.1em] leading-relaxed">
                {study.stack.join("  ·  ")}
              </dd>
            </div>
          </dl>
        </aside>
      </section>

      {study.hero ? (
        <figure className="flex flex-col gap-3 pb-16">
          <div className="relative aspect-[16/9] w-full overflow-hidden border border-line-soft">
            <Image
              src={study.hero.src}
              alt={study.hero.alt}
              fill
              sizes="(max-width: 1024px) 100vw, 84rem"
              priority
              className="object-cover"
            />
          </div>
          <figcaption className="annotation">{study.hero.credit}</figcaption>
        </figure>
      ) : null}

      <Section id="before" heading="What was there before">
        <Prose paragraphs={study.before} />
      </Section>

      <Section id="owned" heading="What I owned">
        <ul className="flex max-w-[68ch] flex-col gap-4">
          {study.owned.map((item) => (
            <li key={item.slice(0, 28)} className="flex gap-3">
              <span
                className="mt-[0.7em] h-px w-4 shrink-0 bg-line"
                aria-hidden
              />
              <p className="text-lg leading-relaxed">{item}</p>
            </li>
          ))}
        </ul>
        <p className="max-w-[68ch] border-t border-line-soft pt-5 text-base leading-relaxed text-muted-foreground">
          {study.boundary}
        </p>
      </Section>

      <Section id="decisions" heading="What I decided, and what I ruled out">
        <div className="flex flex-col gap-10">
          {study.decisions.map((d) => (
            <div key={d.choice} className="flex max-w-[70ch] flex-col gap-3">
              <p className="text-lg font-medium leading-relaxed">{d.choice}</p>
              <p className="text-base leading-relaxed text-muted-foreground">
                <span className="annotation mr-2">Instead of</span>
                {d.insteadOf}
              </p>
              <p className="text-base leading-relaxed">{d.because}</p>
            </div>
          ))}
        </div>
      </Section>

      {study.flow ? (
        <Section id="how" heading="How it works">
          <FlowDiagram caption={study.flow.caption} steps={study.flow.steps} />
        </Section>
      ) : null}

      {study.wentWrong ? (
        <Section id="wrong" heading="What went wrong first">
          <p className="max-w-[68ch] text-lg leading-relaxed">
            {study.wentWrong.problem}
          </p>
          <p className="max-w-[68ch] text-lg leading-relaxed">
            {study.wentWrong.fix}
          </p>
          <p className="max-w-[68ch] border-t border-line-soft pt-5 text-base leading-relaxed text-muted-foreground">
            <span className="annotation mr-2">Confirmed by</span>
            {study.wentWrong.confirmed}
          </p>
        </Section>
      ) : null}

      <Section id="outcome" heading="What changed">
        <ul className="flex max-w-[70ch] flex-col gap-6">
          {study.outcomes.map((o) => (
            <li key={o.id} className="flex flex-col gap-1.5">
              <p className="text-lg leading-relaxed">{o.display}.</p>
              <p className="annotation">
                {"measuredBy" in o ? `${o.measuredBy} · ` : ""}
                {evidenceLabel[o.evidence]}
              </p>
              {o.scopeNote ? (
                <p className="text-sm leading-relaxed text-muted-foreground">
                  {o.scopeNote}
                </p>
              ) : null}
            </li>
          ))}
        </ul>
      </Section>

      {/* --- next ---------------------------------------------------------- */}
      <section className="pb-24">
        <div className="measure" />
        <div className="flex flex-wrap items-center justify-between gap-6 pt-12">
          <Link
            href="/"
            className="group inline-flex items-center gap-3 text-lg text-foreground decoration-signal underline-offset-[0.28em] hover:underline"
          >
            <ArrowLeft
              className="size-4 shrink-0 text-signal transition-transform group-hover:-translate-x-1"
              aria-hidden
            />
            All four companies
          </Link>
          <a
            href={`mailto:${site.email}`}
            className="group inline-flex items-center gap-3 border border-line px-5 py-3.5 text-base transition-colors hover:border-signal hover:text-signal"
          >
            <Mail className="size-4 shrink-0" aria-hidden />
            {site.email}
          </a>
        </div>
      </section>
    </div>
  );
}
