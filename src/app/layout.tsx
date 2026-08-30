import type { Metadata } from "next";
import { Archivo } from "next/font/google";
import { TooltipProvider } from "@/components/ui/tooltip";
import { site, thesis } from "@/content/site";
import "./globals.css";

const archivo = Archivo({
  subsets: ["latin"],
  axes: ["wdth"],
  variable: "--font-archivo",
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL(site.url),
  title: {
    default: `${site.name}, ${site.title}`,
    template: `%s · ${site.name}`,
  },
  description: thesis,
  openGraph: {
    type: "website",
    url: site.url,
    title: `${site.name}, ${site.title}`,
    description: thesis,
    siteName: site.name,
  },
  alternates: { canonical: site.url },
};

/**
 * The direction contract. Written before the code, kept in the emitted markup
 * so the finish review can audit the build against what it promised.
 */
const CONTRACT = `<!--
  THESIS: this page is a measurement, not an introduction. It refuses the
  developer-portfolio arrangement of greeting, avatar, tech-logo marquee and
  same-size project cards.
  OWN-WORLD: two real diazo print processes. Whiteprint is ferro-blue line work
  on pale ozalid paper; blueprint is chalk line work on saturated ferro blue.
  Survey orange appears only on an "after" state, so colour means improvement.
  Archivo at three widths, dimension figures set expanded, annotations narrow
  and tracked. Ruled sheet, hairline measures with tick extensions, no cards.
  STORY: a hiring manager sees one defended number before any prose, reads four
  engagements as a scaled run, and leaves able to name what he built.
  FIRST VIEWPORT: full-bleed measure rule with before and after marks at true
  proportional positions; name, title and availability set as margin
  annotations around it; primary action sits on the rule's right terminal.
  FORM: "Before / After", candidate 3 of the grounded list; seed a5f06057.
  FINISH: unreviewed and undocumented is unfinished; this build ends with the
  finish review, the verdict, DESIGN.md, and every shipping raster carrying its
  provenance.
-->`;

/** Applies the stored or system theme before first paint. */
const THEME_SCRIPT = `(function(){try{var s=localStorage.getItem("theme");var d=s?s==="dark":!window.matchMedia("(prefers-color-scheme: light)").matches;document.documentElement.classList.toggle("dark",d);document.documentElement.style.colorScheme=d?"dark":"light";}catch(e){document.documentElement.classList.add("dark");}})();`;

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html
      lang="en"
      className={`dark ${archivo.variable}`}
      suppressHydrationWarning
    >
      <head>
        <script dangerouslySetInnerHTML={{ __html: THEME_SCRIPT }} />
      </head>
      <body className="antialiased">
        <div hidden dangerouslySetInnerHTML={{ __html: CONTRACT }} />
        <TooltipProvider delayDuration={120}>{children}</TooltipProvider>
      </body>
    </html>
  );
}
