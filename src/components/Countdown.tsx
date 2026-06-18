"use client";

import { useEffect, useState } from "react";
import { event } from "@/lib/content";

type Parts = { days: number; hours: number; mins: number; secs: number };

function timeLeft(target: number): Parts {
  const total = Math.max(0, target - Date.now());
  return {
    days: Math.floor(total / 86_400_000),
    hours: Math.floor((total % 86_400_000) / 3_600_000),
    mins: Math.floor((total % 3_600_000) / 60_000),
    secs: Math.floor((total % 60_000) / 1000),
  };
}

const pad = (n: number, len = 2) => String(n).padStart(len, "0");

export default function Countdown() {
  const target = new Date(event.startISO).getTime();
  const [parts, setParts] = useState<Parts | null>(null);

  useEffect(() => {
    const tick = () => setParts(timeLeft(target));
    tick();
    const id = setInterval(tick, 1000);
    return () => clearInterval(id);
  }, [target]);

  const units = [
    { label: "Days", value: parts ? pad(parts.days, 3) : "———" },
    { label: "Hrs", value: parts ? pad(parts.hours) : "——" },
    { label: "Min", value: parts ? pad(parts.mins) : "——" },
    { label: "Sec", value: parts ? pad(parts.secs) : "——" },
  ];

  const label = parts
    ? `${parts.days} days, ${parts.hours} hours and ${parts.mins} minutes until the run`
    : "Countdown to the run";

  return (
    <div
      role="timer"
      aria-label={label}
      className="scoreboard inline-flex max-w-full flex-col items-center gap-3 px-4 py-4 sm:px-9 sm:py-6"
    >
      <span className="font-body text-[0.6rem] font-extrabold uppercase tracking-[0.3em] text-[#bff7ec] sm:text-xs sm:tracking-[0.32em]">
        Days Until We Run
      </span>
      <div className="flex items-start gap-1.5 sm:gap-4" aria-hidden="true">
        {units.map((u, i) => (
          <div key={u.label} className="flex items-start gap-1.5 sm:gap-4">
            <div className="flex flex-col items-center">
              <span className="scoreboard-digit text-[1.7rem] leading-none tabular-nums sm:text-5xl md:text-6xl">
                {u.value}
              </span>
              <span className="mt-1.5 text-[0.5rem] uppercase tracking-[0.2em] text-glow/70 sm:mt-2 sm:text-[0.7rem] sm:tracking-[0.25em]">
                {u.label}
              </span>
            </div>
            {i < units.length - 1 && (
              <span className="scoreboard-digit text-xl leading-none sm:text-5xl md:text-6xl">
                :
              </span>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}
