"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";
import Logo from "./Logo";
import StickerButton from "./StickerButton";
import { navLinks, links } from "@/lib/content";

export default function Navbar() {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50 border-b-[3px] border-ink bg-blue text-white">
      <nav className="mx-auto flex h-16 max-w-6xl items-center justify-between gap-4 px-4 sm:px-6">
        <Logo className="text-white" />

        <ul className="hidden items-center gap-1 lg:flex">
          {navLinks.map((l) => {
            const active = pathname === l.href;
            return (
              <li key={l.href}>
                <Link
                  href={l.href}
                  className={`relative px-3 py-2 text-sm font-extrabold uppercase tracking-wide transition-colors ${
                    active ? "text-yellow" : "text-white/85 hover:text-white"
                  }`}
                >
                  {l.label}
                  {active && (
                    <span className="absolute inset-x-3 -bottom-0.5 h-1 rounded-full bg-yellow" />
                  )}
                </Link>
              </li>
            );
          })}
        </ul>

        <div className="hidden lg:block">
          <StickerButton href={links.register} variant="pink" size="sm" external>
            Register Now
          </StickerButton>
        </div>

        <button
          type="button"
          onClick={() => setOpen((o) => !o)}
          aria-label="Toggle menu"
          aria-expanded={open}
          className="inline-flex h-10 w-10 items-center justify-center rounded-xl border-[3px] border-ink bg-yellow text-ink shadow-sticker lg:hidden"
        >
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round">
            {open ? (
              <>
                <line x1="5" y1="5" x2="19" y2="19" />
                <line x1="19" y1="5" x2="5" y2="19" />
              </>
            ) : (
              <>
                <line x1="3" y1="7" x2="21" y2="7" />
                <line x1="3" y1="12" x2="21" y2="12" />
                <line x1="3" y1="17" x2="21" y2="17" />
              </>
            )}
          </svg>
        </button>
      </nav>

      {open && (
        <div className="border-t-[3px] border-ink bg-blue-deep px-4 pb-5 pt-3 lg:hidden">
          <ul className="flex flex-col gap-1">
            {navLinks.map((l) => {
              const active = pathname === l.href;
              return (
                <li key={l.href}>
                  <Link
                    href={l.href}
                    onClick={() => setOpen(false)}
                    className={`block rounded-xl px-4 py-3 text-sm font-extrabold uppercase tracking-wide transition-colors ${
                      active ? "bg-yellow text-ink" : "text-white/90 hover:bg-white/10"
                    }`}
                  >
                    {l.label}
                  </Link>
                </li>
              );
            })}
          </ul>
          <div className="mt-4">
            <StickerButton href={links.register} variant="pink" external className="w-full">
              Register Now
            </StickerButton>
          </div>
        </div>
      )}
    </header>
  );
}
