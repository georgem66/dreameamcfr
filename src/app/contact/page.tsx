import Section from "@/components/Section";
import StickerButton from "@/components/StickerButton";
import Splatter from "@/components/Splatter";
import { pageMeta } from "@/lib/seo";
import { contact, socials, links } from "@/lib/content";

export const metadata = pageMeta({
  title: "Contact Us",
  description:
    "Get in touch with the TUT Colour Fun Run team — email, phone, location, and social media.",
  path: "/contact",
});

const cards = [
  { label: "Email", value: contact.email, href: `mailto:${contact.email}`, emoji: "✉️", color: "var(--color-pink)" },
  { label: "Phone", value: contact.phone, href: contact.phoneHref, emoji: "📞", color: "var(--color-blue)" },
  { label: "Location", value: contact.location, href: null, emoji: "📍", color: "#8b3fe8" },
];

export default function ContactPage() {
  return (
    <div className="relative overflow-hidden pb-4">
      <header className="relative mx-auto max-w-4xl px-4 pb-4 pt-14 text-center sm:pt-20">
        <Splatter className="pointer-events-none absolute -right-12 -top-6 w-32 opacity-70 sm:w-56" />
        <span className="tag relative z-10">Contact Us</span>
        <h1 className="relative z-10 mt-5 text-[clamp(2.25rem,8vw,3.75rem)] uppercase">
          Let’s Talk
        </h1>
        <p className="relative z-10 mx-auto mt-5 max-w-2xl text-lg text-ink/75">
          We’d love to hear from you!
        </p>
      </header>

      <Section className="mx-auto mt-10 max-w-5xl px-4">
        <div className="grid gap-5 sm:grid-cols-3">
          {cards.map((c) => (
            <div key={c.label} className="card flex flex-col gap-3 p-7">
              <span
                aria-hidden="true"
                className="inline-flex h-12 w-12 items-center justify-center rounded-xl border-[3px] border-ink text-2xl"
                style={{ backgroundColor: c.color }}
              >
                {c.emoji}
              </span>
              <span className="text-xs font-extrabold uppercase tracking-[0.2em] text-ink/55">
                {c.label}
              </span>
              {c.href ? (
                <a href={c.href} className="break-words font-semibold transition-colors hover:text-blue">
                  {c.value}
                </a>
              ) : (
                <span className="break-words font-semibold">{c.value}</span>
              )}
            </div>
          ))}
        </div>
      </Section>

      <Section className="mx-auto mt-12 max-w-4xl px-4">
        <h2 className="text-center text-3xl uppercase sm:text-4xl">Follow The Journey</h2>
        <div className="mt-8 grid gap-4 sm:grid-cols-2">
          {socials.map((s) => (
            <a
              key={s.name}
              href={s.href}
              target="_blank"
              rel="noopener noreferrer"
              className="card flex items-center justify-between p-5 transition-transform duration-200 hover:-translate-y-1"
            >
              <span className="flex items-center gap-3">
                <span className="inline-flex h-9 w-9 items-center justify-center rounded-full border-2 border-ink bg-yellow text-xs font-extrabold">
                  {s.short}
                </span>
                <span className="font-semibold">{s.name}</span>
              </span>
              <span className="text-sm text-ink/60">{s.handle}</span>
            </a>
          ))}
        </div>
      </Section>

      <Section className="mx-auto mt-12 max-w-3xl px-4">
        <div className="card bg-pink p-8 text-center text-white sm:p-10">
          <h2 className="text-3xl sm:text-4xl">Ready To Run?</h2>
          <p className="mt-3 text-white/90">
            Secure your spot at the 2026 Colour Fun Run.
          </p>
          <div className="mt-6 flex justify-center">
            <StickerButton href={links.register} variant="yellow" size="lg" external>
              Register Now
            </StickerButton>
          </div>
        </div>
      </Section>
    </div>
  );
}
