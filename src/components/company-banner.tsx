import Image from "next/image";

/**
 * A band from the company's own public marketing page.
 *
 * Two rules it exists under:
 *
 * 1. Real pages only. These are captures of the live public site, cropped to
 *    the brand band. No mocked product interfaces, and nothing showing a
 *    person: republishing someone's photograph to decorate a portfolio is not
 *    ours to do.
 *
 * 2. It has to live in this world. Four marketing sites means four brand
 *    palettes, which would tear the drawing sheet apart. The capture is
 *    desaturated and blended into the sheet's own ink, so it reads as a
 *    reference to the company rather than as an advert for it. Hovering
 *    restores the real colour, because the honest version should be one
 *    gesture away.
 */
export function CompanyBanner({
  src,
  company,
}: {
  src: string;
  company: string;
}) {
  return (
    <div className="group/banner relative h-20 w-full overflow-hidden border border-line-soft sm:h-24">
      <Image
        src={src}
        alt={`The public ${company} site`}
        fill
        sizes="(max-width: 768px) 100vw, 60vw"
        className="object-cover object-left grayscale-[0.85] contrast-[0.9] transition-[filter,opacity] duration-500 group-hover/banner:grayscale-0 group-hover/banner:contrast-100"
      />
      {/* the sheet's ink, pulled over the capture so it joins the world */}
      <div
        className="pointer-events-none absolute inset-0 bg-paper opacity-45 mix-blend-color transition-opacity duration-500 group-hover/banner:opacity-0"
        aria-hidden
      />
      <div
        className="pointer-events-none absolute inset-0 bg-background opacity-25 transition-opacity duration-500 group-hover/banner:opacity-0"
        aria-hidden
      />
    </div>
  );
}
