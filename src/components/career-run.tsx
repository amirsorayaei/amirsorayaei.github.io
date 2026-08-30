import { engagements, totalMonths } from "@/content/work";

/**
 * The career as one measure, drawn to true scale.
 *
 * Same notation as every other rule on the site, so the hero teaches the
 * grammar once before the work section uses it. Survey orange is not used
 * here: nothing on this line is an "after" state, and the colour means one
 * thing only.
 */
export function CareerRun() {
  const chronological = [...engagements].reverse();
  const first = chronological[0];
  const last = chronological[chronological.length - 1];

  const startYear = first.start.split(" ")[1];
  const endYear = last.end.split(" ")[1];

  const years = Math.floor(totalMonths / 12);

  return (
    <figure className="w-full">
      <figcaption className="mb-4 flex flex-wrap items-baseline justify-between gap-x-6 gap-y-1">
        <span className="text-base text-foreground sm:text-lg">
          {years}+ years, {engagements.length} companies, drawn to scale
        </span>
        <span className="annotation">
          {startYear} to {endYear}
        </span>
      </figcaption>

      <div className="measure" />

      {/* Segments. Width is months, so the line is the real shape of it. */}
      <div className="flex w-full" role="list">
        {chronological.map((e) => (
          <div
            key={e.id}
            role="listitem"
            className="relative border-l border-line pt-2 first:border-l-0"
            style={{ width: `${(e.months / totalMonths) * 100}%` }}
          >
            <span
              className="absolute -top-px left-0 h-[3px] w-full bg-line"
              aria-hidden
            />
            <span className="annotation hidden truncate pl-2 lg:block">
              {e.shortName}
            </span>
            <span className="sr-only">
              {e.company}, {e.start} to {e.end}
            </span>
          </div>
        ))}
      </div>
    </figure>
  );
}
