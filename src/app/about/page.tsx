import Section from "@/components/Section";
import StickerButton from "@/components/StickerButton";
import Splatter from "@/components/Splatter";
import { pageMeta } from "@/lib/seo";
import { about, links } from "@/lib/content";
import { teamPhoto } from "@/lib/media";

export const metadata = pageMeta({
  title: "About Us",
  description:
    "The Colour Fun Run is hosted by TUT Sport Management students to promote health, mental wellness, and community engagement.",
  path: "/about",
});

export default function AboutPage() {
  return (
    <div className="relative overflow-hidden pb-4">
      <header className="relative mx-auto max-w-4xl px-4 pb-4 pt-14 text-center sm:pt-20">
        <Splatter className="pointer-events-none absolute -right-12 -top-6 w-32 opacity-70 sm:w-56" />
        <span className="tag relative z-10">About Us</span>
        <h1 className="relative z-10 mt-5 text-[clamp(2.25rem,8vw,3.75rem)] uppercase">
          Why We Run
        </h1>
        <p className="relative z-10 mx-auto mt-5 max-w-2xl text-lg text-ink/75">
          {about.intro}
        </p>
      </header>

      <Section className="mx-auto mt-12 max-w-5xl px-4">
        <div className="card bg-blue p-8 text-center text-white sm:p-12">
          <h2 className="text-3xl sm:text-4xl">{about.beliefLead}</h2>
          <p className="mx-auto mt-4 max-w-2xl text-lg text-white/85">{about.belief}</p>
        </div>
      </Section>

      <Section className="mx-auto mt-16 max-w-6xl px-4">
        <h2 className="text-center text-3xl uppercase sm:text-4xl">Our Goals</h2>
        <div className="mt-8 grid gap-5 sm:grid-cols-2">
          {about.goals.map((g) => (
            <div key={g.title} className="card flex gap-4 p-6">
              <span
                aria-hidden="true"
                className="inline-flex h-12 w-12 shrink-0 items-center justify-center rounded-xl border-[3px] border-ink bg-yellow text-2xl"
              >
                {g.emoji}
              </span>
              <div>
                <h3 className="text-xl">{g.title}</h3>
                <p className="mt-1 text-ink/75">{g.text}</p>
              </div>
            </div>
          ))}
        </div>
      </Section>

      {/* Meet the team */}
      <Section className="mx-auto mt-16 max-w-5xl px-4">
        <h2 className="text-center text-3xl uppercase sm:text-4xl">Meet The Team</h2>
        <p className="mx-auto mt-3 max-w-2xl text-center text-ink/75">
          The Sport Management students bringing the colour to TUT.
        </p>
        <figure className="card mx-auto mt-8 max-w-md overflow-hidden p-0">
          <div
            className="relative w-full bg-cover bg-center"
            style={{
              aspectRatio: `${teamPhoto.width} / ${teamPhoto.height}`,
              backgroundImage: `url("${teamPhoto.blurDataURL}")`,
            }}
          >
            <picture>
              <source
                type="image/avif"
                srcSet={teamPhoto.avif}
                sizes="(min-width: 640px) 28rem, 92vw"
              />
              <source
                type="image/webp"
                srcSet={teamPhoto.webp}
                sizes="(min-width: 640px) 28rem, 92vw"
              />
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src={teamPhoto.jpg}
                alt={teamPhoto.alt}
                width={teamPhoto.width}
                height={teamPhoto.height}
                loading="lazy"
                decoding="async"
                className="h-auto w-full"
              />
            </picture>
          </div>
          <figcaption className="border-t-[3px] border-ink bg-yellow px-5 py-3 text-center text-sm font-extrabold uppercase tracking-wide">
            <span aria-hidden="true">🎨</span> Run. Splash. Shine.
          </figcaption>
        </figure>
      </Section>

      <Section className="mx-auto mt-16 max-w-3xl px-4 text-center">
        <h2 className="text-3xl sm:text-4xl">Be Part Of It</h2>
        <p className="mt-3 text-ink/75">
          Lace up, grab a white tee, and join the most colourful run of the year.
        </p>
        <div className="mt-6 flex flex-wrap justify-center gap-4">
          <StickerButton href={links.register} variant="pink" size="lg" external>
            Register Now
          </StickerButton>
          <StickerButton href="/the-run" variant="white" size="lg">
            Event Details
          </StickerButton>
        </div>
      </Section>
    </div>
  );
}
