import Link from "next/link";
import { ArrowUpRight, ArrowRight } from "lucide-react";
import { DeltaRule } from "@/components/delta-rule";
import { evidenceLabel } from "@/content/claims";
import type { Engagement } from "@/content/work";

/**
 * One engagement, drawn as a station on the run rather than as a card.
 *
 * The left column is the title block of a drawing sheet: dates, the duration
 * bar drawn to true scale against the longest engagement, and where the company
 * was. The right column carries the company's own words and the one measured
 * change it is remembered by.
 */
export function EngagementRow({
  engagement,
  longestMonths,
}: {
  engagement: Engagement;
  longestMonths: number;
}) {
  const {
    company,
    role,
    url,
    start,
    end,
    months,
    location,
    mode,
    brief,
    headline,
    built,
    context,
    caseStudies,
  } = engagement;

  const years = Math.floor(months / 12);
  const rest = months % 12;
  const duration = [
    years ? `${years} yr` : null,
    rest ? `${rest} mo` : null,
  ]
    .filter(Boolean)
    .join(" ");

  return (
    <article className="grid gap-8 py-14 md:grid-cols-[13rem_minmax(0,1fr)] md:gap-12 lg:grid-cols-[16rem_minmax(0,1fr)] lg:gap-16">
      {/* title block */}
      <div className="flex flex-col gap-4">
        <div className="flex items-baseline justify-between gap-3 md:flex-col md:items-start md:gap-2">
          <p className="figure text-xl text-foreground">
            {start}
            <span className="text-line"> to </span>
            {end}
          </p>
          <p className="annotation">{duration}</p>
        </div>

        {/* duration, true to scale against the longest engagement */}
        <div
          className="h-[3px] bg-line"
          style={{ width: `${(months / longestMonths) * 100}%` }}
          aria-hidden
        />

        <dl className="flex flex-col gap-2">
          <div>
            <dt className="annotation">Where</dt>
            <dd className="text-sm text-muted-foreground">{location}</dd>
          </div>
          <div>
            <dt className="annotation">Mode</dt>
            <dd className="text-sm text-muted-foreground">{mode}</dd>
          </div>
        </dl>
      </div>

      {/* the work */}
      <div className="flex flex-col gap-7">
        <header className="flex flex-col gap-2">
          <h3 className="text-3xl font-semibold tracking-[-0.035em] sm:text-4xl">
            {url ? (
              <a
                href={url}
                target="_blank"
                rel="noreferrer noopener"
                className="group inline-flex items-start gap-1.5 decoration-line-soft underline-offset-[0.22em] hover:underline"
              >
                {company}
                <ArrowUpRight
                  className="mt-1 size-5 shrink-0 text-line transition-colors group-hover:text-signal"
                  aria-hidden
                />
                <span className="sr-only">(opens {company} in a new tab)</span>
              </a>
            ) : (
              company
            )}
          </h3>
          <p className="text-base text-muted-foreground">{role}</p>
        </header>

        {/* What the company does. Context, not his work, so it sits quieter. */}
        <p className="max-w-[68ch] text-base leading-relaxed text-muted-foreground">
          {brief}
        </p>

        {/* What he built. This leads. */}
        <ul className="flex max-w-[68ch] flex-col gap-5">
          {built.map((note) => (
            <li key={note.id} className="flex flex-col gap-1.5">
              <div className="flex gap-3">
                <span
                  className="mt-[0.7em] h-px w-4 shrink-0 bg-line"
                  aria-hidden
                />
                <p className="text-lg leading-relaxed text-foreground">
                  {note.display}.{" "}
                  <span className="annotation whitespace-nowrap">
                    {evidenceLabel[note.evidence]}
                  </span>
                </p>
              </div>
              {note.scopeNote ? (
                <p className="pl-7 text-sm text-muted-foreground">
                  {note.scopeNote}
                </p>
              ) : null}
            </li>
          ))}
        </ul>

        {/* Scale the work sat inside. Never billed as his own output. */}
        {context.length > 0 ? (
          <ul className="flex max-w-[68ch] flex-col gap-2 border-t border-line-soft pt-5">
            {context.map((c) => (
              <li key={c.id} className="text-sm text-muted-foreground">
                {c.display}.{" "}
                <span className="annotation whitespace-nowrap">
                  {evidenceLabel[c.evidence]}
                </span>
                {c.scopeNote ? (
                  <span className="block text-muted-foreground/85">
                    {c.scopeNote}
                  </span>
                ) : null}
              </li>
            ))}
          </ul>
        ) : null}

        {/* And then what changed because of it. Evidence, not headline. */}
        <DeltaRule
          delta={headline}
          className="max-w-[42rem] border-t border-line-soft pt-7"
        />

        {caseStudies.length > 0 ? (
          <div className="flex flex-wrap gap-x-8 gap-y-3 pt-1">
            {caseStudies.map((cs) => (
              <Link
                key={cs.slug}
                href={`/work/${cs.slug}`}
                className="group inline-flex items-center gap-2 text-base text-foreground decoration-signal underline-offset-[0.28em] hover:underline"
              >
                {cs.title}
                <ArrowRight
                  className="size-4 shrink-0 text-signal transition-transform group-hover:translate-x-1"
                  aria-hidden
                />
              </Link>
            ))}
          </div>
        ) : null}
      </div>
    </article>
  );
}
