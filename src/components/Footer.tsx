import Link from "next/link";
import Logo from "./Logo";
import { navLinks, socials, contact, event } from "@/lib/content";

export default function Footer() {
  return (
    <footer className="relative z-10 mt-24 border-t-[3px] border-ink bg-blue text-white">
      <div className="mx-auto grid max-w-6xl gap-10 px-4 py-12 sm:px-6 md:grid-cols-[1.5fr_1fr_1fr]">
        <div>
          <Logo className="text-white" />
          <p className="mt-4 max-w-xs text-sm text-white/80">
            {event.theme} A celebration of fitness, community, and mental-health
            awareness — hosted by TUT Sport Management students.
          </p>
          <div className="mt-5 flex flex-wrap gap-2">
            {socials.map((s) => (
              <a
                key={s.name}
                href={s.href}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={s.name}
                className="inline-flex h-10 w-10 items-center justify-center rounded-full border-2 border-white/70 text-xs font-extrabold transition-colors hover:border-ink hover:bg-yellow hover:text-ink"
              >
                {s.short}
              </a>
            ))}
          </div>
        </div>

        <div>
          <h3 className="text-lg">Explore</h3>
          <ul className="mt-3 space-y-2 text-sm">
            {navLinks.map((l) => (
              <li key={l.href}>
                <Link href={l.href} className="text-white/80 transition-colors hover:text-yellow">
                  {l.label}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        <div>
          <h3 className="text-lg">Get In Touch</h3>
          <ul className="mt-3 space-y-2 text-sm text-white/80">
            <li>
              <a href={`mailto:${contact.email}`} className="break-all transition-colors hover:text-yellow">
                {contact.email}
              </a>
            </li>
            <li>
              <a href={contact.phoneHref} className="transition-colors hover:text-yellow">
                {contact.phone}
              </a>
            </li>
            <li>{contact.location}</li>
          </ul>
        </div>
      </div>

      <div className="border-t border-white/20">
        <div className="mx-auto flex max-w-6xl flex-col items-center justify-between gap-2 px-4 py-4 text-xs text-white/70 sm:flex-row sm:px-6">
          <span>© 2026 TUT Colour Fun Run · Sport Management Dept</span>
          <span className="font-extrabold tracking-wide text-yellow">{event.hashtag}</span>
        </div>
      </div>
    </footer>
  );
}
