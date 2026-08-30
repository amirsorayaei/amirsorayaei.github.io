import Image from "next/image";

/**
 * The company's own mark, square, in the title block.
 *
 * Square rather than a wide band on purpose. A wide banner has to be cropped
 * out of a marketing page, so it drags in whatever happened to be next to the
 * logo. A square forces a decision about what the one subject is, and it gives
 * the work section a fixed left rail to read down.
 *
 * Marks only, never hero art: hero photographs are usually pictures of real
 * people, and a stranger's face is not decoration for someone else's portfolio.
 * Where no mark exists, the company gets a monogram set in the site's own
 * lettering rather than a borrowed image.
 */
export function CompanyMark({
  src,
  company,
  shortName,
}: {
  src: string | null;
  company: string;
  shortName: string;
}) {
  if (!src) {
    return (
      <div
        className="flex size-14 shrink-0 items-center justify-center border border-line-soft"
        aria-hidden
      >
        <span className="text-2xl font-semibold tracking-[-0.05em] text-line">
          {shortName.slice(0, 1)}
        </span>
      </div>
    );
  }

  return (
    <div className="relative size-14 shrink-0 overflow-hidden border border-line-soft">
      <Image
        src={src}
        alt={`${company} logo`}
        fill
        sizes="56px"
        className="object-contain opacity-90 transition-opacity duration-300 hover:opacity-100"
      />
    </div>
  );
}
