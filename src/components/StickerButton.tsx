import Link from "next/link";
import type { ReactNode } from "react";

type Variant = "yellow" | "pink" | "white" | "blue" | "ink";
type Size = "sm" | "md" | "lg";

const VARIANTS: Record<Variant, string> = {
  yellow: "bg-yellow text-ink",
  pink: "bg-pink text-white animate-pulse-glow",
  white: "bg-white text-ink",
  blue: "bg-blue text-white",
  ink: "bg-ink text-white",
};

const SIZES: Record<Size, string> = {
  sm: "px-4 py-2 text-xs",
  md: "px-6 py-3 text-sm",
  lg: "px-8 py-4 text-base sm:text-lg",
};

export default function StickerButton({
  href,
  children,
  variant = "yellow",
  size = "md",
  external,
  className = "",
}: {
  href: string;
  children: ReactNode;
  variant?: Variant;
  size?: Size;
  external?: boolean;
  className?: string;
}) {
  const cls =
    "group inline-flex items-center justify-center gap-2 rounded-2xl border-[3px] border-ink font-extrabold uppercase tracking-wide shadow-sticker " +
    "transition-transform duration-150 ease-out hover:-translate-x-0.5 hover:-translate-y-0.5 active:translate-x-0 active:translate-y-0 " +
    `${VARIANTS[variant]} ${SIZES[size]} ${className}`;

  const isHttp = href.startsWith("http");
  const isInternal = href.startsWith("/") && !external;

  if (isInternal) {
    return (
      <Link href={href} className={cls}>
        {children}
      </Link>
    );
  }

  return (
    <a
      href={href}
      className={cls}
      target={isHttp ? "_blank" : undefined}
      rel={isHttp ? "noopener noreferrer" : undefined}
    >
      {children}
    </a>
  );
}
