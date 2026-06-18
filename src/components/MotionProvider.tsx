"use client";

import { MotionConfig } from "motion/react";
import type { ReactNode } from "react";

/** Respects the user's "reduce motion" OS setting across all animations. */
export default function MotionProvider({ children }: { children: ReactNode }) {
  return <MotionConfig reducedMotion="user">{children}</MotionConfig>;
}
