import Hero from "@/components/Hero";
import Countdown from "@/components/Countdown";
import Section from "@/components/Section";
import StickerButton from "@/components/StickerButton";
import Splatter from "@/components/Splatter";
import JsonLd from "@/components/JsonLd";
import { eventJsonLd } from "@/lib/jsonld";
import { event, highlights, links } from "@/lib/content";

const marqueeItems = [
  "Run. Splash. Shine.",
  "#RunForChangeRunForAll",
  "24 Oct 2026",
  "TUT Pretoria Campus",
];

export default function Home() {
  return (
    <>
      <JsonLd data={eventJsonLd()} />
      <Hero />

      {/* Countdown scoreboard */}
      <section className="px-4">
        <div className="mx-auto flex max-w-6xl justify-center">
          <Countdown />
        </div>
      </section>

      {/* Marquee strip */}
      <div className="marquee my-14 border-y-[3px] border-ink bg-yellow py-3">
        <div
          className="marquee__track font-display text-2xl uppercase tracking-tight sm:text-3xl"
          aria-hidden="true"
        >
          {[0, 1].map((dup) =>
            marqueeItems.map((m, i) => (
              <span key={`${dup}-${i}`} className="flex items-center gap-8">
                {m}
                <span className="text-pink">✺</span>
              </span>
            ))
          )}
        </div>
      </div>

      {/* Welcome */}
      <Section className="mx-auto max-w-3xl px-4 text-center">
        <span className="tag">Welcome</span>
        <h2 className="mt-5 text-[clamp(2rem,7vw,3rem)]">
          Welcome to the TUT Colour Fun Run 2026!
        </h2>
        <p className="mt-5 text-lg leading-relaxed text-ink/75">{event.welcome}</p>
      </Section>

      {/* Key highlights */}
      <Section className="mx-auto mt-16 max-w-6xl px-4">
        <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {highlights.map((h) => (
            <div
              key={h.label}
              className="card flex flex-col gap-3 p-6 transition-transform duration-200 hover:-translate-y-1"
            >
              <span
                aria-hidden="true"
                className="inline-flex h-12 w-12 items-center justify-center rounded-xl border-[3px] border-ink text-2xl"
                style={{ backgroundColor: h.color }}
              >
                {h.emoji}
              </span>
              <span className="text-xs font-extrabold uppercase tracking-[0.2em] text-ink/55">
                {h.label}
              </span>
              <span className="break-words font-display text-xl leading-tight">
                {h.value}
              </span>
            </div>
          ))}
        </div>
      </Section>

      {/* Festival experience */}
      <Section className="mx-auto mt-20 max-w-6xl px-4">
        <div className="card relative overflow-hidden border-ink bg-blue p-8 text-white sm:p-12">
          <Splatter className="pointer-events-none absolute -right-12 -top-12 w-56 opacity-90 sm:w-80" />
          <div className="relative z-10 max-w-2xl">
            <h2 className="text-3xl uppercase sm:text-4xl">
              <span aria-hidden="true">⚡</span> The Lifestyle Festival Experience{" "}
              <span aria-hidden="true">⚡</span>
            </h2>
            <p className="mt-5 text-lg leading-relaxed text-white/85">
              More than a race. Join students, staff, and alumni at the TUT
              Pretoria Campus for non-stop music, local food stalls, and
              high-energy themed colour stations — all celebrating fitness,
              social inclusion, and mental-health awareness.
            </p>
            <div className="mt-8 flex flex-wrap gap-4">
              <StickerButton href="/the-run" variant="yellow">
                See the Route
              </StickerButton>
              <StickerButton href="/about" variant="white">
                Our Mission
              </StickerButton>
            </div>
          </div>
        </div>
      </Section>

      {/* Call to action */}
      <Section className="mx-auto mt-20 max-w-4xl px-4">
        <div className="card relative overflow-hidden bg-yellow p-8 text-center sm:p-12">
          <Splatter className="pointer-events-none absolute -bottom-16 -left-12 w-56 opacity-80 sm:w-72" />
          <div className="relative z-10">
            <h2 className="text-[clamp(2rem,7vw,3rem)] uppercase">
              Don’t Miss Out — Register Now!
            </h2>
            <p className="mx-auto mt-4 max-w-xl text-lg font-medium text-ink/80">
              Be part of the most colourful event of the year. Spots are limited,
              so secure your place today.
            </p>
            <div className="mt-8 flex flex-wrap items-center justify-center gap-4">
              <StickerButton href={links.register} variant="pink" size="lg" external>
                Register Here
              </StickerButton>
              <StickerButton href={links.volunteer} variant="white" size="lg" external>
                Volunteer
              </StickerButton>
              <StickerButton href={links.sponsor} variant="blue" size="lg" external>
                Sponsor Us
              </StickerButton>
            </div>
          </div>
        </div>
      </Section>
    </>
  );
}
