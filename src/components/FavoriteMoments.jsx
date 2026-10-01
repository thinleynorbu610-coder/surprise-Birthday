import { useCallback, useState } from "react";
import { motion, useReducedMotion } from "framer-motion";
import { ChevronLeft, ChevronRight } from "lucide-react";
import SafeImage from "./SafeImage";
import { useReveal } from "../hooks/useReveal";
import { birthdayData as d } from "../data/birthdayData";

const CARD = "w-[68vw] max-w-sm md:w-80";

function CardBody({ m, lit }) {
  return (
    <>
      <SafeImage bloom lit={lit} src={m.image} alt={m.title} className="pointer-events-none aspect-[4/5] w-full rounded-2xl" />
      <div className="px-2 pb-3 pt-4">
        <p className="eyebrow !text-base">{m.date}</p>
        <h3 className="title text-2xl">{m.title}</h3>
        <p className="mt-2 text-sm italic text-warm/60">{m.description}</p>
      </div>
    </>
  );
}

// Coverflow carousel: the centre card is in color, its neighbours sit
// behind it — smaller, tilted and black & white.
export default function FavoriteMoments() {
  const reveal = useReveal();
  const reduce = useReducedMotion();
  const memories = d.memories;
  const n = memories.length;
  const [i, setI] = useState(0);
  const go = useCallback((s) => setI((v) => (v + s + n) % n), [n]);

  const onKey = (e) => {
    if (e.key === "ArrowRight") { e.preventDefault(); go(1); }
    if (e.key === "ArrowLeft") { e.preventDefault(); go(-1); }
  };

  return (
    <section className="relative overflow-hidden py-24">
      <motion.div {...reveal} className="mb-10 px-5 text-center">
        <p className="eyebrow">chapter four</p>
        <h2 className="title text-4xl md:text-6xl">Our Favorite Moments</h2>
        <p className="mt-3 text-xs tracking-widest text-warm/40">SWIPE OR USE THE ARROWS</p>
      </motion.div>

      <div
        role="region" aria-roledescription="carousel" aria-label="Our favorite moments"
        tabIndex={0} onKeyDown={onKey}
        className="relative mx-auto max-w-6xl px-5 focus-visible:outline-none"
        style={{ perspective: 1400 }}
      >
        <motion.div
          className="relative flex cursor-grab justify-center active:cursor-grabbing"
          drag="x" dragConstraints={{ left: 0, right: 0 }} dragElastic={0.18}
          onDragEnd={(_, info) => {
            if (info.offset.x < -50 || info.velocity.x < -400) go(1);
            else if (info.offset.x > 50 || info.velocity.x > 400) go(-1);
          }}
        >
          {/* Invisible copy of a card gives the stage its height */}
          <div aria-hidden className={`invisible glass rounded-3xl p-3 ${CARD}`}><CardBody m={memories[i]} /></div>

          {memories.map((m, k) => {
            let rel = k - i;
            if (rel > n / 2) rel -= n;
            if (rel < -n / 2) rel += n;
            const dist = Math.abs(rel);
            const active = rel === 0;
            return (
              <motion.article
                key={k}
                aria-hidden={!active}
                onTap={() => !active && setI(k)}
                className={`bloom-host glass absolute top-0 rounded-3xl p-3 ${CARD} ${active ? "" : "cursor-pointer"}`}
                initial={false}
                animate={{
                  x: `${rel * 58}%`,
                  scale: 1 - Math.min(dist, 3) * 0.14,
                  rotateY: rel * -16,
                  opacity: dist > 2 ? 0 : 1 - dist * 0.3,
                  filter: active ? "blur(0px)" : `blur(${dist}px)`,
                }}
                style={{ zIndex: 10 - dist, pointerEvents: dist > 2 ? "none" : "auto" }}
                transition={reduce ? { duration: 0 } : { type: "spring", stiffness: 220, damping: 30 }}
              >
                <CardBody m={m} lit={active} />
              </motion.article>
            );
          })}
        </motion.div>

        <button onClick={() => go(-1)} aria-label="Previous moment"
          className="btn-ghost absolute left-2 top-[38%] z-20 !h-12 !w-12 -translate-y-1/2 justify-center !p-0 backdrop-blur-md transition hover:scale-110 hover:bg-white/15 md:left-8 md:!h-14 md:!w-14">
          <ChevronLeft size={24} />
        </button>
        <button onClick={() => go(1)} aria-label="Next moment"
          className="btn-ghost absolute right-2 top-[38%] z-20 !h-12 !w-12 -translate-y-1/2 justify-center !p-0 backdrop-blur-md transition hover:scale-110 hover:bg-white/15 md:right-8 md:!h-14 md:!w-14">
          <ChevronRight size={24} />
        </button>
      </div>

      <div className="mt-8 flex flex-col items-center gap-3">
        <div className="flex gap-1.5">
          {memories.map((m, k) => (
            <button key={k} onClick={() => setI(k)} aria-label={`Go to ${m.title}`} aria-current={k === i}
              className="flex h-6 items-center px-0.5">
              <span className={`block h-1.5 rounded-full transition-all duration-500 ${k === i ? "w-6 bg-rose" : "w-1.5 bg-white/25 hover:bg-white/60"}`} />
            </button>
          ))}
        </div>
        <p className="text-xs tabular-nums tracking-widest text-warm/40" aria-live="polite">
          {String(i + 1).padStart(2, "0")} / {String(n).padStart(2, "0")}
        </p>
      </div>
    </section>
  );
}
