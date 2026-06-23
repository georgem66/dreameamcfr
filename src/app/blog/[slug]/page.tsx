import Link from "next/link";
import { notFound } from "next/navigation";
import Section from "@/components/Section";
import StickerButton from "@/components/StickerButton";
import Splatter from "@/components/Splatter";
import { pageMeta } from "@/lib/seo";
import { blogPosts, links } from "@/lib/content";

/* Pre-render every known slug at build time. */
export async function generateStaticParams() {
  return blogPosts.map((p) => ({ slug: p.slug }));
}

type Props = PageProps<"/blog/[slug]">;

export async function generateMetadata({ params }: Props) {
  const { slug } = await params;
  const post = blogPosts.find((p) => p.slug === slug);
  if (!post) return {};
  return pageMeta({
    title: post.title,
    description: post.excerpt,
    path: `/blog/${post.slug}`,
  });
}

export default async function BlogPostPage({ params }: Props) {
  const { slug } = await params;
  const post = blogPosts.find((p) => p.slug === slug);
  if (!post) notFound();

  return (
    <div className="relative overflow-hidden pb-4">
      <header className="relative mx-auto max-w-4xl px-4 pb-4 pt-14 text-center sm:pt-20">
        <Splatter className="pointer-events-none absolute -right-12 -top-6 w-32 opacity-70 sm:w-56" />
        <span className="tag relative z-10">Blog</span>
        <h1 className="relative z-10 mt-5 text-[clamp(2.25rem,7vw,3.5rem)] uppercase leading-tight">
          {post.title}
        </h1>
        <div className="relative z-10 mt-5 flex flex-wrap items-center justify-center gap-3 text-sm text-ink/65">
          <span
            className="inline-flex items-center rounded-full border-2 px-3 py-1 text-[0.65rem] font-extrabold uppercase tracking-[0.15em]"
            style={{ borderColor: post.accent, color: post.accent }}
          >
            {post.category}
          </span>
          {post.date && (
            <>
              <span aria-hidden="true">·</span>
              <time>{post.date}</time>
            </>
          )}
        </div>
        <p className="relative z-10 mx-auto mt-5 max-w-2xl text-lg text-ink/75">
          {post.excerpt}
        </p>
      </header>

      <Section className="mx-auto mt-12 max-w-3xl px-4">
        <div className="card overflow-hidden">
          <div className="h-2 w-full" style={{ backgroundColor: post.accent }} />
          <div className="p-7 sm:p-10">
            <p className="text-lg leading-relaxed text-ink/85">{post.body}</p>
          </div>
        </div>
      </Section>

      {post.pdf && (
        <Section className="mx-auto mt-12 max-w-5xl px-4">
          <h2 className="text-center text-3xl uppercase sm:text-4xl">
            Open The PDF
          </h2>
          <p className="mx-auto mt-3 max-w-2xl text-center text-ink/75">
            Read it right here, or open it in a new tab for the full page.
          </p>
          <div className="card mt-8 overflow-hidden">
            {/* Browser-native PDF viewer. No extra deps. */}
            <iframe
              src={post.pdf}
              title={post.title}
              className="block h-[70vh] w-full bg-white sm:h-[80vh]"
            />
          </div>
          <div className="mt-5 flex flex-wrap justify-center gap-3">
            <StickerButton
              href={post.pdf}
              variant="yellow"
              size="md"
              external
            >
              Open PDF in new tab
            </StickerButton>
            <StickerButton href="/blog" variant="white" size="md">
              ← All posts
            </StickerButton>
          </div>
        </Section>
      )}

      {!post.pdf && (
        <Section className="mx-auto mt-14 max-w-3xl px-4 text-center">
          <p className="text-ink/65">More stories on the way — the team adds posts as the event grows.</p>
          <div className="mt-6">
            <StickerButton href="/blog" variant="white" size="md">
              ← All posts
            </StickerButton>
          </div>
        </Section>
      )}

      <Section className="mx-auto mt-16 max-w-3xl px-4 text-center">
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
