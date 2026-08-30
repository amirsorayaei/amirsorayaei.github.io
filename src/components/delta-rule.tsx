import { cn } from "@/lib/utils";
import { evidenceLabel, type Delta } from "@/content/claims";

/**
 * The measure. The one mark this site is built from.
 *
 * Positions are true to the numbers: both marks are placed on a domain of
 * max(before, after), so the distance between them is the real change drawn to
 * scale. Nothing here is eyeballed, and nothing here is decorative.
 *
 * Survey orange marks the "after" state and appears nowhere else.
 */

type Size = "hero" | "row";

function place(pct: number) {
  // Keep the figure inside the track at the extremes instead of letting it
  // hang off the edge of the sheet.
  const shift = pct >= 88 ? "-100%" : pct <= 12 ? "0%" : "-50%";
  return { left: `${pct}%`, transform: `translateX(${shift})` };
}

export function DeltaRule({
  delta,
  size = "row",
  animate = false,
  className,
}: {
  delta: Delta;
  size?: Size;
  animate?: boolean;
  className?: string;
}) {
  const domain = Math.max(delta.before, delta.after);
  const beforePct = (delta.before / domain) * 100;
  const afterPct = (delta.after / domain) * 100;

  const spanLeft = Math.min(beforePct, afterPct);
  const spanWidth = Math.abs(afterPct - beforePct);
  const growsRight = afterPct >= beforePct;

  const isHero = size === "hero";

  return (
    <figure className={cn("w-full", className)}>
      <div
        className={cn(
          "relative w-full",
          isHero ? "h-28 sm:h-32" : "h-12",
          animate && "delta-animate",
        )}
      >
        {/* Dimension figures.
            At hero scale they sit directly over the mark they describe. At row
            scale the labels are too wide for that, so they take the ends of the
            measure in position order and the marks alone carry the geometry. */}
        {isHero ? (
          <div className="absolute inset-x-0 top-0 hidden h-[3.75rem] sm:block">
            <span
              className="absolute bottom-0 whitespace-nowrap text-muted-foreground"
              style={place(beforePct)}
            >
              <span className="figure block text-5xl font-medium">
                {delta.beforeLabel}
              </span>
            </span>

            <span
              className="absolute bottom-0 whitespace-nowrap text-signal"
              style={place(afterPct)}
            >
              <span className="figure block text-6xl font-semibold">
                {delta.afterLabel}
              </span>
            </span>
          </div>
        ) : null}

        {/* Narrow screens, and every row-scale measure, take the ends of the
            line in position order. The marks alone carry the geometry. */}
        <div
          className={cn(
            "absolute inset-x-0 top-0 flex items-baseline justify-between gap-4",
            isHero && "sm:hidden",
          )}
        >
          {(growsRight
            ? ([
                ["before", delta.beforeLabel],
                ["after", delta.afterLabel],
              ] as const)
            : ([
                ["after", delta.afterLabel],
                ["before", delta.beforeLabel],
              ] as const)
          ).map(([role, label]) => (
            <span
              key={role}
              className={cn(
                "figure",
                role === "after"
                  ? "font-semibold text-signal"
                  : "font-medium text-muted-foreground",
                isHero
                  ? role === "after"
                    ? "text-3xl"
                    : "text-2xl"
                  : role === "after"
                    ? "text-xl"
                    : "text-lg",
              )}
            >
              {label}
            </span>
          ))}
        </div>

        {/* the track */}
        <div
          className={cn(
            "absolute inset-x-0",
            isHero ? "top-[3.75rem] sm:top-[4.25rem]" : "top-[2.5rem]",
          )}
        >
          <div className="measure" />

          {/* the change, drawn to scale */}
          <span
            className={cn(
              "delta-span absolute top-0 h-[3px] bg-signal",
              growsRight ? "origin-left" : "origin-right",
            )}
            style={{ left: `${spanLeft}%`, width: `${spanWidth}%` }}
          />

          {/* before: hollow. after: filled. */}
          <span
            aria-hidden
            className="absolute size-[9px] -translate-x-1/2 -translate-y-[4px] rounded-full border border-line bg-background"
            style={{ left: `${beforePct}%` }}
          />
          <span
            aria-hidden
            className="delta-mark absolute size-[11px] -translate-x-1/2 -translate-y-[5px] rounded-full bg-signal"
            style={{ left: `${afterPct}%` }}
          />
        </div>

        {/* The extent of the sheet this measure is drawn across. Only at hero
            scale, where there is room for it to mean something. */}
        {isHero ? (
          <div
            className="absolute inset-x-0 bottom-0 flex items-end justify-between gap-4"
            aria-hidden
          >
            <span className="annotation">0</span>
            <span className="annotation">
              {domain}
              {delta.unit.trim()}
            </span>
          </div>
        ) : null}
      </div>

      <figcaption
        className={cn(
          "mt-3 flex flex-wrap items-baseline gap-x-3 gap-y-1 border-t border-line-soft pt-3",
          isHero && "mt-5 pt-4",
        )}
      >
        <span className="sr-only">{delta.display}.</span>
        <span
          className={cn(
            "text-foreground",
            isHero ? "text-base sm:text-lg" : "text-sm",
          )}
        >
          {delta.measuredBy}
        </span>
        <span className="annotation">{evidenceLabel[delta.evidence]}</span>
        {delta.scopeNote ? (
          <span className="basis-full text-sm text-muted-foreground">
            {delta.scopeNote}
          </span>
        ) : null}
      </figcaption>
    </figure>
  );
}
