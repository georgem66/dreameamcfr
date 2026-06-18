import Section from "@/components/Section";
import StickerButton from "@/components/StickerButton";
import Splatter from "@/components/Splatter";
import JsonLd from "@/components/JsonLd";
import { eventJsonLd } from "@/lib/jsonld";
import { pageMeta } from "@/lib/seo";
import { event, links } from "@/lib/content";

export const metadata = pageMeta({
  title: "The Run",
  description:
    "Date, route, entry fees, what to bring, safety, and the full event flow for the TUT Colour Fun Run on 24 October 2026.",
  path: "/the-run",
});

const essentials = [
  { label: "Date", value: event.date, emoji: "📅" },
  { label: "Start Time", value: event.time, emoji: "⏰" },
  { label: "Venue", value: event.venueShort, emoji: "📍" },
  { label: "Distance", value: event.distance, emoji: "🏁" },
];

export default function TheRunPage() {
  return (
    <div className="relative overflow-hidden pb-4">
      <JsonLd data={eventJsonLd()} />
      <header className="relative mx-auto max-w-4xl px-4 pb-4 pt-14 text-center sm:pt-20">
        <Splatter className="pointer-events-none absolute -left-12 -top-8 w-32 opacity-70 sm:w-56" />
        <span className="tag relative z-10">The Run</span>
        <h1 className="relative z-10 mt-5 text-[clamp(2.25rem,8vw,3.75rem)] uppercase">
          Everything You Need To Know
        </h1>
        <p className="relative z-10 mx-auto mt-5 max-w-2xl text-lg text-ink/75">
          {event.route}
        </p>
      </header>

      {/* Essentials */}
      <Section className="mx-auto mt-12 max-w-6xl px-4">
        <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {essentials.map((e) => (
            <div key={e.label} className="card flex flex-col gap-3 p-6">
              <span
                aria-hidden="true"
                className="inline-flex h-12 w-12 items-center justify-center rounded-xl border-[3px] border-ink bg-yellow text-2xl"
              >
                {e.emoji}
              </span>
              <span className="text-xs font-extrabold uppercase tracking-[0.2em] text-ink/55">
                {e.label}
              </span>
              <span className="font-display text-xl leading-tight">{e.value}</span>
            </div>
          ))}
        </div>
      </Section>

      {/* Fees / Bring / Safety */}
      <Section className="mx-auto mt-8 max-w-6xl px-4">
        <div className="grid gap-5 md:grid-cols-3">
          <div className="card p-7">
            <h3 className="text-2xl">Entry Fees</h3>
            <ul className="mt-4 space-y-3">
              {event.entryFees.map((f) => (
                <li
                  key={f.who}
                  className="flex items-center justify-between border-b-2 border-dashed border-ink/15 pb-2"
                >
                  <span className="font-medium">{f.who}</span>
                  <span className="rounded-lg border-2 border-ink bg-yellow px-3 py-1 font-display text-lg">
                    {f.price}
                  </span>
                </li>
              ))}
            </ul>
          </div>

          <div className="card p-7">
            <h3 className="text-2xl">What To Bring</h3>
            <ul className="mt-4 space-y-3">
              {event.whatToBring.map((w) => (
                <li key={w} className="flex items-start gap-3">
                  <span aria-hidden="true" className="mt-1 text-pink">
                    ●
                  </span>
                  <span className="font-medium">{w}</span>
                </li>
              ))}
            </ul>
          </div>

          <div className="card bg-blue p-7 text-white">
            <h3 className="text-2xl">Safety First</h3>
            <p className="mt-4 leading-relaxed text-white/85">{event.safety}</p>
          </div>
        </div>
      </Section>

      {/* Event flow */}
      <Section className="mx-auto mt-16 max-w-5xl px-4">
        <h2 className="text-center text-3xl uppercase sm:text-4xl">Event Flow</h2>
        <div className="mt-12 grid gap-8 sm:grid-cols-3">
          {event.eventFlow.map((s) => (
            <div key={s.no} className="card relative px-6 pb-7 pt-10 text-center">
              <span className="absolute -top-4 left-1/2 inline-flex h-9 -translate-x-1/2 items-center rounded-full border-[3px] border-ink bg-pink px-4 font-display text-white">
                {s.no}
              </span>
              <span aria-hidden="true" className="text-4xl">
                {s.emoji}
              </span>
              <h3 className="mt-3 text-xl">{s.title}</h3>
              <p className="mt-2 text-ink/75">{s.text}</p>
            </div>
          ))}
        </div>
      </Section>

      {/* CTA */}
      <Section className="mx-auto mt-16 max-w-3xl px-4 text-center">
        <h2 className="text-3xl sm:text-4xl">See You At The Start Line</h2>
        <div className="mt-6 flex flex-wrap justify-center gap-4">
          <StickerButton href={links.register} variant="pink" size="lg" external>
            Register Now
          </StickerButton>
          <StickerButton href={links.volunteer} variant="white" size="lg" external>
            Volunteer
          </StickerButton>
        </div>
      </Section>
    </div>
  );
}
