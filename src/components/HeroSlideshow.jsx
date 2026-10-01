import { useEffect, useState } from "react";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";

const INTERVAL = 3800;

// Crossfades through the hero photos with a slow Ken Burns zoom.
export default function HeroSlideshow({ images, alt }) {
  const [i, setI] = useState(0);
  const reduce = useReducedMotion();
  const n = images.length;

  useEffect(() => {
    if (n < 2) return;
    const id = setInterval(() => setI((v) => (v + 1) % n), INTERVAL);
    return () => clearInterval(id);
  }, [n]);

  // Warm the cache so the next photo is ready before it fades in.
  useEffect(() => {
    if (n > 1) new Image().src = images[(i + 1) % n];
  }, [i, n, images]);

  return (
    <div className="relative aspect-[4/5] w-full overflow-hidden rounded-[1.5rem] bg-black">
      <AnimatePresence initial={false}>
        <motion.img
          key={images[i]}
          src={images[i]}
          alt={alt}
          decoding="async"
          className="absolute inset-0 h-full w-full object-cover"
          initial={{ opacity: 0, scale: reduce ? 1 : 1.12 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0 }}
          transition={{ opacity: { duration: 1.2 }, scale: { duration: INTERVAL / 1000 + 1.2, ease: "easeOut" } }}
        />
      </AnimatePresence>
      <div className="pointer-events-none absolute inset-x-0 bottom-0 h-1/4 bg-gradient-to-t from-black/50 to-transparent" />
      <div className="absolute inset-x-0 bottom-3 flex justify-center gap-1.5" aria-hidden>
        {images.map((src, k) => (
          <span key={src} className={`h-1 rounded-full transition-all duration-500 ${k === i ? "w-5 bg-white" : "w-1 bg-white/40"}`} />
        ))}
      </div>
    </div>
  );
}
