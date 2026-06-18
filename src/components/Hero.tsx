"use client";

import { motion } from "motion/react";
import type { CSSProperties } from "react";
import StickerButton from "./StickerButton";
import Splatter from "./Splatter";
import { event, links } from "@/lib/content";

const container = {
  hidden: {},
  show: { transition: { staggerChildren: 0.12, delayChildren: 0.08 } },
};
const item = {
  hidden: { opacity: 0, y: 26 },
  show: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.6, ease: [0.16, 1, 0.3, 1] as [number, number, number, number] },
  },
};

export default function Hero() {
  return (
    <section className="relative overflow-hidden">
      <Splatter
        className="pointer-events-none absolute -right-20 -top-16 w-36 animate-floaty opacity-80 sm:-right-16 sm:-top-12 sm:w-96 sm:opacity-90"
        style={{ "--rot": "10deg" } as CSSProperties}
      />
      <Splatter
        className="pointer-events-none absolute -left-24 bottom-[-3rem] hidden w-72 animate-floaty opacity-90 sm:block sm:w-[28rem]"
        style={{ "--rot": "-14deg" } as CSSProperties}
      />

      <motion.div
        variants={container}
        initial="hidden"
        animate="show"
        className="relative z-10 mx-auto max-w-5xl px-4 py-16 text-center sm:px-6 sm:py-24"
      >
        <motion.div variants={item} className="mb-6 flex justify-center">
          <span className="tag">
            <span aria-hidden="true">🎨</span> The TUT Colour Fun Run · 2026
          </span>
        </motion.div>

        <motion.h1
          variants={item}
          className="font-display uppercase text-[clamp(2.4rem,8.5vw,7rem)]"
        >
          Run For Change,
          <br />
          <span className="text-blue">Run For All!</span>
        </motion.h1>

        <motion.p
          variants={item}
          className="mx-auto mt-6 max-w-2xl text-balance text-lg font-medium text-ink/80 sm:text-xl"
        >
          The TUT Colour Fun Run — {event.date} at {event.time}.
        </motion.p>

        <motion.div
          variants={item}
          className="mt-9 flex flex-wrap items-center justify-center gap-4"
        >
          <StickerButton href={links.register} variant="yellow" size="lg" external>
            [ Register to Run ]
          </StickerButton>
          <StickerButton href="/the-run" variant="white" size="lg">
            Event Details
          </StickerButton>
        </motion.div>
      </motion.div>
    </section>
  );
}
