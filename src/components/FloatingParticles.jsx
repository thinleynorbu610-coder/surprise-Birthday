import { useMemo } from "react";
import { motion, useReducedMotion } from "framer-motion";

// Few, cheap particles. Pass hearts to mix in tiny hearts.
export default function FloatingParticles({ count = 18, hearts = true }) {
  const reduce = useReducedMotion();
  const items = useMemo(
    () =>
      Array.from({ length: count }, (_, i) => ({
        id: i,
        left: Math.random() * 100,
        size: 3 + Math.random() * 6,
        dur: 12 + Math.random() * 14,
        delay: Math.random() * 10,
        heart: hearts && i % 4 === 0,
      })),
    [count, hearts]
  );
  if (reduce) return null;
  return (
    <div aria-hidden className="pointer-events-none absolute inset-0 overflow-hidden">
      {items.map((p) => (
        <motion.span
          key={p.id}
          className="absolute bottom-[-5%] block"
          style={{
            left: `${p.left}%`,
            width: p.heart ? p.size * 2.4 : p.size,
            height: p.heart ? p.size * 2.4 : p.size,
            color: "var(--c-rose)",
            background: p.heart ? "none" : "radial-gradient(circle, var(--c-gold), transparent 70%)",
            borderRadius: "50%",
          }}
          initial={{ y: 0, opacity: 0 }}
          animate={{ y: "-110vh", opacity: [0, 0.7, 0.7, 0], x: [0, 20, -20, 0] }}
          transition={{ duration: p.dur, delay: p.delay, repeat: Infinity, ease: "linear" }}
        >
          {p.heart && (
            <svg viewBox="0 0 24 24" fill="currentColor" width="100%" height="100%" opacity="0.6">
              <path d="M12 21s-8-5.2-8-11a4.5 4.5 0 0 1 8-2.8A4.5 4.5 0 0 1 20 10c0 5.8-8 11-8 11z" />
            </svg>
          )}
        </motion.span>
      ))}
    </div>
  );
}
