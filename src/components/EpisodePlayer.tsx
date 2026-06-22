"use client";

import { useRef, useState } from "react";

/* Click-to-play video card for podcast episodes.
 * Shows a poster frame + play button until the user clicks;
 * once playing, the overlay disappears and native controls take over. */
export default function EpisodePlayer({
  src,
  title,
  aspect = "16/9",
}: {
  src: string;
  title: string;
  aspect?: "16/9" | "9/16";
}) {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [playing, setPlaying] = useState(false);

  const handlePlay = () => {
    const v = videoRef.current;
    if (!v) return;
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
          src={src}
          controls={playing}
          playsInline
          preload="metadata"
          className="absolute inset-0 h-full w-full object-contain"
          onEnded={() => setPlaying(false)}
        />
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
