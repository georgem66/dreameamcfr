import Section from "@/components/Section";
import StickerButton from "@/components/StickerButton";
import Splatter from "@/components/Splatter";
import { pageMeta } from "@/lib/seo";
import { blogPosts, links } from "@/lib/content";

export const metadata = pageMeta({
  title: "Blog",
  description:
    "Latest updates and stories: behind the scenes, training tips, mental health, and student voices from the TUT Colour Fun Run.",
  path: "/blog",
});

export default function BlogPage() {
  return (
    <div className="relative overflow-hidden pb-4">
      <header className="relative mx-auto max-w-4xl px-4 pb-4 pt-14 text-center sm:pt-20">
        <Splatter className="pointer-events-none absolute -right-12 -top-6 w-32 opacity-70 sm:w-56" />
        <span className="tag relative z-10">Blog</span>
        <h1 className="relative z-10 mt-5 text-[clamp(2.25rem,8vw,3.75rem)] uppercase">
          Latest Updates &amp; Stories
        </h1>
        <p className="relative z-10 mx-auto mt-5 max-w-2xl text-lg text-ink/75">
          News, training tips, and stories from behind the colour.
        </p>
      </header>

      <Section className="mx-auto mt-10 max-w-6xl px-4">
        <div className="grid gap-6 sm:grid-cols-2">
          {blogPosts.map((p) => (
            <article key={p.slug} className="card overflow-hidden">
              <div className="h-2 w-full" style={{ backgroundColor: p.accent }} />
              <div className="p-7">
                <div className="flex items-center gap-3">
                  <span aria-hidden="true" className="text-3xl">
                    {p.emoji}
                  </span>
                  <span
                    className="inline-flex items-center rounded-full border-2 px-3 py-1 text-[0.65rem] font-extrabold uppercase tracking-[0.15em]"
                    style={{ borderColor: p.accent, color: p.accent }}
                  >
                    {p.category}
                  </span>
                </div>
                <h2 className="mt-4 text-2xl leading-tight">{p.title}</h2>
                <p className="mt-2 text-ink/75">{p.excerpt}</p>
                <span className="mt-5 inline-block text-sm font-extrabold uppercase tracking-wide text-blue">
                  Coming soon →
                </span>
              </div>
            </article>
          ))}
        </div>
        <p className="mt-8 text-center text-sm text-ink/55">
          More stories on the way — the team adds posts as the event grows.
        </p>
      </Section>

      <Section className="mx-auto mt-14 max-w-3xl px-4 text-center">
        <h2 className="text-3xl sm:text-4xl">Want To Be In The Story?</h2>
        <p className="mt-3 text-ink/75">
          Run with us, volunteer, or share your Colour Run moment.
        </p>
        <div className="mt-6 flex flex-wrap justify-center gap-4">
          <StickerButton href={links.register} variant="pink" size="lg" external>
            Register Now
          </StickerButton>
          <StickerButton href="/contact" variant="white" size="lg">
            Contact Us
          </StickerButton>
        </div>
      </Section>
    </div>
  );
}
