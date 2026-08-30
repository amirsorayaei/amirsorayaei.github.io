import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import { site } from "@/content/site";

export default function NotFound() {
  return (
    <div className="mx-auto flex min-h-dvh w-full max-w-[84rem] flex-col justify-center gap-8 px-5 py-20 sm:px-8 lg:px-12">
      <p className="annotation">404</p>
      <h1 className="max-w-[14ch] text-[clamp(2.25rem,6vw,4.5rem)] font-semibold leading-[0.94] tracking-[-0.04em]">
        There is nothing at this address.
      </h1>
      <div className="measure max-w-[42rem]" />
      <Link
        href="/"
        className="group inline-flex w-fit items-center gap-3 text-lg decoration-signal underline-offset-[0.28em] hover:underline"
      >
        <ArrowLeft
          className="size-4 shrink-0 text-signal transition-transform group-hover:-translate-x-1"
          aria-hidden
        />
        Back to {site.name}
      </Link>
    </div>
  );
}
