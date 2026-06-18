import Link from "next/link";
import { tutLogo } from "@/lib/media";

/* Brand lockup: the official Tshwane University of Technology logo (in a white
   chip so it reads on the blue nav/footer) + the "TUT COLOUR FUN RUN" wordmark. */

export default function Logo({
  showText = true,
  className = "",
}: {
  showText?: boolean;
  className?: string;
}) {
  return (
    <Link
      href="/"
      aria-label="TUT Colour Fun Run — home"
      className={`group inline-flex items-center gap-2.5 ${className}`}
    >
      <span className="inline-flex shrink-0 items-center justify-center rounded-lg border-2 border-ink bg-white p-1 transition-transform duration-200 group-hover:-translate-y-0.5">
        <picture>
          <source srcSet={tutLogo.webp} type="image/webp" />
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src={tutLogo.png}
            alt={tutLogo.alt}
            width={tutLogo.width}
            height={tutLogo.height}
            decoding="async"
            className="h-8 w-auto sm:h-9"
          />
        </picture>
      </span>

      {showText && (
        <span className="font-display leading-[0.82]">
          <span className="block font-body text-[0.58rem] font-extrabold tracking-[0.3em]">
            TUT
          </span>
          <span className="block text-[1.05rem] tracking-tight">
            COLOUR <span className="text-yellow">FUN</span> RUN
          </span>
        </span>
      )}
    </Link>
  );
}
