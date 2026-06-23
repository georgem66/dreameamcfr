"use client";

import { useEffect, useRef, useState } from "react";

type Props = {
  /** HLS playlist URL (.m3u8) OR a direct MP4. The player picks the right path. */
  src: string;
  /** Optional poster image shown before play. */
  poster?: string;
  /** Optional direct-MP4 fallback for environments that don't support HLS
   *  (RSS readers, OG crawlers, very old browsers). */
  fallbackMp4?: string;
  title: string;
  aspect?: "16/9" | "9/16";
};

/* Click-to-play video card for podcast episodes.
 * - Shows a poster frame + play button until the user clicks.
 * - Once playing, the overlay disappears and the player takes over.
 * - Adaptive streaming: the player picks HLS (Safari native, or hls.js on
 *   Chrome / Firefox / Edge) when given an .m3u8, and falls back to a plain
 *   MP4 otherwise. Phones get a small rendition, desktops get a bigger one,
 *   and the connection-adaptive ladder scales with available bandwidth. */
export default function EpisodePlayer({
  src,
  poster,
  fallbackMp4,
  title,
  aspect = "16/9",
}: Props) {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [playing, setPlaying] = useState(false);
  const isHls = /\.m3u8(\?|$)/i.test(src);

  // Wire up HLS on browsers that need it (everywhere except Safari).
  useEffect(() => {
    if (!isHls) return;
    const v = videoRef.current;
    if (!v) return;

    // Safari has native HLS.
    if (v.canPlayType("application/vnd.apple.mpegurl")) return;

    let hls: { destroy: () => void } | null = null;
    let cancelled = false;

    // Dynamic import so the ~14KB hls.js bundle is only fetched on non-Safari clients.
    import("hls.js")
      .then((mod) => {
        if (cancelled) return;
        const Hls = mod.default;
        if (Hls.isSupported()) {
          const player = new Hls({ enableWorker: true });
          player.loadSource(src);
          player.attachMedia(v);
          hls = player;
        } else if (fallbackMp4) {
          // Very old browser: degrade to MP4.
          v.src = fallbackMp4;
        }
      })
      .catch(() => {
        if (fallbackMp4) v.src = fallbackMp4;
      });

    return () => {
      cancelled = true;
      hls?.destroy();
    };
  }, [src, fallbackMp4, isHls]);

  const handlePlay = () => {
    const v = videoRef.current;
    if (!v) return;
    // For non-HLS sources, set src on first play (lets the poster render first).
    if (!isHls && !v.src) v.src = src;
    v.play();
    setPlaying(true);
  };

  return (
    <div className="card relative overflow-hidden bg-white">
      <div
        className="relative w-full bg-ink"
        style={{ aspectRatio: aspect }}
      >
        <video
          ref={videoRef}
          controls={playing}
          playsInline
          preload={isHls ? "metadata" : "none"}
          poster={poster}
          // For HLS: the source is bound imperatively by hls.js.
          // For MP4: we set src on first play so the poster stays visible.
          src={isHls ? undefined : undefined}
          className="absolute inset-0 h-full w-full object-contain"
          onEnded={() => setPlaying(false)}
        >
          {fallbackMp4 && !isHls && <source src={fallbackMp4} type="video/mp4" />}
        </video>
        {!playing && (
          <button
            type="button"
            onClick={handlePlay}
            aria-label={`Play ${title}`}
            className="group absolute inset-0 flex flex-col items-center justify-center gap-3 bg-ink/30 transition-colors hover:bg-ink/40"
          >
            <span
              aria-hidden="true"
              className="flex h-20 w-20 items-center justify-center rounded-full border-[3px] border-ink bg-yellow text-3xl text-ink shadow-[4px_4px_0_0_var(--color-ink)] transition-transform group-hover:scale-110"
            >
              ▶
            </span>
            <span className="rounded-full border-2 border-ink bg-white px-3 py-1 text-xs font-extrabold uppercase tracking-wider text-ink">
              Click to play
            </span>
          </button>
        )}
      </div>
    </div>
  );
}
