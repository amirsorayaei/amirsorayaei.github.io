import type { FlowStep } from "@/content/case-studies";

/**
 * A schematic of how the thing actually works.
 *
 * Deliberately not a picture of the product. None of these interfaces are
 * public, and a mocked-up screenshot of a private clinical tool would be a
 * fabrication dressed as evidence. A schematic claims only what it draws.
 *
 * Real markup rather than an exported image, so it reflows on a phone, reads
 * in a screen reader, and follows the theme.
 */
export function FlowDiagram({
  caption,
  steps,
}: {
  caption: string;
  steps: FlowStep[];
}) {
  return (
    <figure className="flex flex-col gap-6">
      <ol className="grid gap-px overflow-hidden border border-line-soft bg-line-soft sm:grid-cols-2 lg:grid-cols-4">
        {steps.map((step, i) => (
          <li
            key={step.label}
            className="group relative flex min-h-[9.5rem] flex-col gap-2 bg-background p-5"
          >
            <div className="flex items-baseline justify-between gap-3">
              <span className="annotation">{step.actor}</span>
              <span className="annotation tabular-nums text-line" aria-hidden>
                {String(i + 1).padStart(2, "0")}
              </span>
            </div>

            {step.wasOutside ? (
              <span
                className="absolute inset-x-0 top-0 h-[3px] bg-signal"
                aria-hidden
              />
            ) : null}

            <p className="text-lg font-medium leading-tight tracking-[-0.02em]">
              {step.label}
            </p>

            {step.detail ? (
              <p className="text-sm leading-relaxed text-muted-foreground">
                {step.detail}
              </p>
            ) : null}

            {step.wasOutside ? (
              <p className="annotation mt-auto pt-2 text-signal">
                Used to happen outside
              </p>
            ) : null}
          </li>
        ))}
      </ol>

      <figcaption className="max-w-[68ch] text-sm leading-relaxed text-muted-foreground">
        {caption}
      </figcaption>
    </figure>
  );
}
