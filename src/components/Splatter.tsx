import type { CSSProperties } from "react";

/* Decorative multi-colour paint-splatter. Purely cosmetic (aria-hidden).
   Size / position / rotate it from the parent via `className`. */

const BLOB =
  "M96 26C120 22 132 44 140 64C150 70 168 70 170 88C172 104 156 110 150 122C156 138 150 160 128 162C112 163 104 150 92 150C76 158 52 160 44 142C36 126 50 112 44 100C30 96 24 78 38 68C50 60 62 66 70 60C74 42 80 30 96 26Z";

const LAYERS = [
  { fill: "#00c2ff", t: "translate(-16 -6) rotate(0 100 100) scale(1)" },
  { fill: "#ff2bd0", t: "translate(14 -10) rotate(48 100 100) scale(0.9)" },
  { fill: "#ffd400", t: "translate(-6 16) rotate(124 100 100) scale(0.84)" },
  { fill: "#3fd15e", t: "translate(22 14) rotate(206 100 100) scale(0.68)" },
  { fill: "#8b3fe8", t: "translate(0 -4) rotate(262 100 100) scale(0.58)" },
  { fill: "#ff7a00", t: "translate(-22 20) rotate(318 100 100) scale(0.48)" },
];

const DROPS = [
  { cx: 180, cy: 58, r: 7, fill: "#ff2bd0" },
  { cx: 28, cy: 150, r: 9, fill: "#00c2ff" },
  { cx: 166, cy: 152, r: 6, fill: "#ffd400" },
  { cx: 150, cy: 22, r: 5, fill: "#3fd15e" },
  { cx: 16, cy: 70, r: 6, fill: "#8b3fe8" },
  { cx: 60, cy: 16, r: 5, fill: "#ff7a00" },
  { cx: 188, cy: 112, r: 4, fill: "#ff3b3b" },
  { cx: 118, cy: 184, r: 5, fill: "#00c2ff" },
  { cx: 8, cy: 120, r: 4, fill: "#ffd400" },
  { cx: 176, cy: 186, r: 3, fill: "#8b3fe8" },
  { cx: 44, cy: 188, r: 3, fill: "#ff2bd0" },
];

export default function Splatter({
  className = "",
  style,
}: {
  className?: string;
  style?: CSSProperties;
}) {
  return (
    <svg
      viewBox="0 0 200 200"
      className={className}
      style={{ overflow: "visible", ...style }}
      aria-hidden="true"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      {LAYERS.map((l, i) => (
        <path key={i} d={BLOB} transform={l.t} fill={l.fill} opacity={0.95} />
      ))}
      {DROPS.map((d, i) => (
        <circle key={`d${i}`} cx={d.cx} cy={d.cy} r={d.r} fill={d.fill} />
      ))}
    </svg>
  );
}
