import { useMemo } from "react";
import { motion, useReducedMotion } from "framer-motion";

const COLORS = ["#e8a0b0", "#d4af7a", "#c9506b", "#f6ece6"];

// One-shot, gentle burst. Mount it to trigger it.
export default function Confetti({ count = 36, origin = "50%" }) {
  const reduce = useReducedMotion();
  const pieces = useMemo(
    () =>
      Array.from({ length: count }, (_, i) => ({
        id: i,
        x: (Math.random() - 0.5) * 520,
        y: -120 - Math.random() * 260,
        rot: Math.random() * 540,
        size: 5 + Math.random() * 6,
        color: COLORS[i % COLORS.length],
        round: i % 3 === 0,
      })),
    [count]
  );
  if (reduce) return null;
  return (
    <div aria-hidden className="pointer-events-none absolute left-1/2 z-30" style={{ top: origin }}>
      {pieces.map((p) => (
        <motion.span
          key={p.id}
          className="absolute block"
          style={{ width: p.size, height: p.size * (p.round ? 1 : 0.5), background: p.color, borderRadius: p.round ? "50%" : 2 }}
          initial={{ x: 0, y: 0, opacity: 1, rotate: 0 }}
          animate={{ x: p.x, y: [0, p.y, p.y + 420], opacity: [1, 1, 0], rotate: p.rot }}
          transition={{ duration: 2.6, ease: "easeOut" }}
        />
      ))}
    </div>
  );
}
