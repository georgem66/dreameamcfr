import Section from "@/components/Section";
import StickerButton from "@/components/StickerButton";
import Splatter from "@/components/Splatter";
import EpisodePlayer from "@/components/EpisodePlayer";
import { pageMeta } from "@/lib/seo";
import { podcast, socials } from "@/lib/content";

export const metadata = pageMeta({
  title: "Podcast",
  description:
    "Run For Change — the Colour Fun Run podcast. Interviews, participant stories, and tips on fitness, wellness, and mental health.",
  path: "/podcast",
});

export default function PodcastPage() {
  return (
    <div className="relative overflow-hidden pb-4">
      <header className="relative mx-auto max-w-4xl px-4 pb-4 pt-14 text-center sm:pt-20">
        <Splatter className="pointer-events-none absolute -left-12 -top-6 w-32 opacity-70 sm:w-56" />
        <span className="tag relative z-10">Podcast</span>
        <h1 className="relative z-10 mt-5 text-[clamp(2.25rem,8vw,3.75rem)] uppercase">
          {podcast.title}
        </h1>
        <p className="relative z-10 mx-auto mt-5 max-w-2xl text-lg text-ink/75">
          {podcast.subtitle}
        </p>
      </header>

      {/* Feature card */}
      <Section className="mx-auto mt-10 max-w-5xl px-4">
        <div className="card relative overflow-hidden bg-ink p-8 text-white sm:p-12">
          <Splatter className="pointer-events-none absolute -bottom-12 -right-12 w-56 opacity-80 sm:w-80" />
          <div className="relative z-10 flex flex-col items-start gap-4">
            <span aria-hidden="true" className="text-5xl">
              🎙️
            </span>
            <h2 className="text-4xl uppercase">{podcast.title}</h2>
            <p className="text-sm font-extrabold uppercase tracking-[0.2em] text-glow">
              {podcast.subtitle}
            </p>
            <p className="max-w-2xl text-lg text-white/85">{podcast.intro}</p>
            <span className="tag">{podcast.availability}</span>
          </div>
        </div>
      </Section>

      {/* Topics */}
      <Section className="mx-auto mt-14 max-w-6xl px-4">
        <h2 className="text-center text-3xl uppercase sm:text-4xl">What To Expect</h2>
        <div className="mt-8 grid gap-5 sm:grid-cols-2">
          {podcast.topics.map((t) => (
            <div key={t.text} className="card flex items-center gap-4 p-6">
              <span aria-hidden="true" className="text-3xl">
                {t.emoji}
              </span>
              <span className="text-lg font-medium">{t.text}</span>
            </div>
          ))}
        </div>
      </Section>

      {/* Episodes */}
      <Section className="mx-auto mt-14 max-w-5xl px-4">
        <h2 className="text-center text-3xl uppercase sm:text-4xl">Episodes</h2>

        {/* Featured: episode with a video */}
        <div className="mt-8 grid gap-6 md:grid-cols-[1fr_1.4fr] md:items-start">
          {podcast.episodes
            .filter((ep) => ep.video)
            .map((ep) => (
              <div key={ep.no} className="flex flex-col gap-4">
                <EpisodePlayer src={ep.video!} title={ep.title} />
                <div className="card flex items-center justify-between gap-4 p-5">
                  <div className="flex items-center gap-4">
                    <span className="font-display text-xl text-blue">
                      {ep.no}
                    </span>
                    <span className="text-lg font-semibold">{ep.title}</span>
                  </div>
                  <span className="shrink-0 rounded-full border-2 border-ink bg-yellow px-3 py-1 text-xs font-extrabold uppercase">
                    {ep.note}
                  </span>
                </div>
              </div>
            ))}

          {/* Upcoming list */}
          <div className="space-y-4">
            {podcast.episodes
              .filter((ep) => !ep.video)
              .map((ep) => (
                <div
                  key={ep.no}
                  className="card flex items-center justify-between gap-4 p-5 opacity-70"
                >
                  <div className="flex items-center gap-4">
                    <span className="font-display text-xl text-blue">
                      {ep.no}
                    </span>
                    <span className="text-lg font-semibold">{ep.title}</span>
                  </div>
                  <span className="shrink-0 rounded-full border-2 border-ink bg-yellow px-3 py-1 text-xs font-extrabold uppercase">
                    {ep.note}
                  </span>
                </div>
              ))}
          </div>
        </div>
      </Section>

      {/* Follow */}
      <Section className="mx-auto mt-14 max-w-3xl px-4 text-center">
        <h2 className="text-3xl sm:text-4xl">Catch Every Episode</h2>
        <p className="mt-3 text-ink/75">{podcast.availability}</p>
        <div className="mt-6 flex flex-wrap justify-center gap-3">
          {socials.map((s) => (
            <StickerButton key={s.name} href={s.href} variant="white" size="sm" external>
              {s.short} · {s.name}
            </StickerButton>
          ))}
        </div>
      </Section>
    </div>
  );
}
