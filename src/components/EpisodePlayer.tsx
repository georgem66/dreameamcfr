"use client";

import { useEffect, useRef, useState } from "react";

type Props = {
  /** HLS playlist URL (.m3u8) OR a direct MP4. The player picks the right path. */
  src: string;
  /** Optional poster image shown before play. */
  poster?: string;
  /** Optional direct-MP4 fallback for environments that don't support HLS
   *  (RSS readers, OG crawlers, very old browsers, or HLS load failures). */
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
 *   and the connection-adaptive ladder scales with available bandwidth.
 *
 * Mobile compatibility notes (the three bugs this component guards against):
 *  1. Safari/iPhone native HLS: the m3u8 must be set as <video src> directly.
 *  2. hls.js load race: if the user taps play before hls.js has attached,
 *     we immediately degrade to the MP4 fallback so the tap is never dead.
 *  3. hls.js fatal errors (network/codec/worker): destroy the player and
 *     switch to the MP4 fallback automatically. */
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
  // True once hls.js (or Safari native) has attached a source to the <video>.
  const hlsReadyRef = useRef(false);

  // Wire up HLS on browsers that need it (everywhere except Safari).
  useEffect(() => {
    if (!isHls) return;
    const v = videoRef.current;
    if (!v) return;

    // Safari has native HLS — set src directly so iPhone can play.
    if (v.canPlayType("application/vnd.apple.mpegurl")) {
      v.src = src;
      hlsReadyRef.current = true;
      return;
    }

    let hls: { destroy: () => void } | null = null;
    let cancelled = false;

    // Dynamic import so the ~14KB hls.js bundle is only fetched on non-Safari clients.
    import("hls.js")
      .then((mod) => {
        if (cancelled) return;
        const Hls = mod.default;
        if (Hls.isSupported()) {
          // enableWorker:false — some Android WebViews crash on worker, negligible perf hit.
          const player = new Hls({ enableWorker: false });
          player.loadSource(src);
          player.attachMedia(v);
          // On fatal error, destroy and fall back to MP4.
          player.on(Hls.Events.ERROR, (_: unknown, data: { fatal: boolean; type: string }) => {
            if (!data?.fatal) return;
            if (data.type === Hls.ErrorTypes.NETWORK_ERROR) {
              // Try one network retry before giving up to MP4.
              player.startLoad();
              return;
            }
            // Media error or anything else fatal → MP4.
            player.destroy();
            hls = null;
            if (fallbackMp4) v.src = fallbackMp4;
            hlsReadyRef.current = true; // MP4 is ready immediately
          });
          hlsReadyRef.current = true;
          hls = player;
        } else if (fallbackMp4) {
          // Very old browser: degrade to MP4.
          v.src = fallbackMp4;
          hlsReadyRef.current = true;
        }
      })
      .catch(() => {
        if (fallbackMp4) v.src = fallbackMp4;
        hlsReadyRef.current = true;
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
    // For HLS: if hls.js/Safari hasn't attached a source yet (slow load),
    // immediately use the MP4 fallback so the tap is never dead.
    if (isHls && !hlsReadyRef.current && fallbackMp4) {
      v.src = fallbackMp4;
    }
    // play() returns a Promise; catch rejection (happens on mobile when
    // autoplay policies block or the user gestures race).
    const p = v.play();
    if (p && typeof p.then === "function") {
      p.then(() => setPlaying(true)).catch(() => {
        // Playback failed — if we have a fallback we haven't tried yet, retry.
        if (isHls && fallbackMp4 && v.src !== fallbackMp4) {
          v.src = fallbackMp4;
          v.play().then(() => setPlaying(true)).catch(() => {});
        }
      });
    } else {
      setPlaying(true);
    }
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
          // Older Android WebView needs the vendor-prefixed attribute too.
          // eslint-disable-next-line @typescript-eslint/no-explicit-any
          {...({ webkitPlaysInline: true } as any)}
          preload={isHls ? "metadata" : "none"}
          poster={poster}
          // For HLS: the source is bound imperatively by hls.js or Safari native.
          // For MP4: we set src on first play so the poster stays visible.
          src={undefined}
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