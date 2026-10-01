import { useCallback, useEffect, useRef, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { ChevronLeft, ChevronRight, X } from "lucide-react";
import SafeImage from "./SafeImage";
import { useReveal } from "../hooks/useReveal";
import { birthdayData as d } from "../data/birthdayData";

const ASPECTS = ["aspect-[3/4]", "aspect-square", "aspect-[4/5]", "aspect-[4/3]", "aspect-[3/4]", "aspect-square"];

function GalleryItem({ mem, i, onClick }) {
  const reveal = useReveal();
  const [lit, setLit] = useState(false);
  const pointer = useRef("mouse");
  // On touch: first tap blooms the photo into color, second tap opens it.
  const handleClick = () => {
    if (pointer.current === "touch" && !lit) return setLit(true);
    onClick();
  };
  return (
    <motion.button
      {...reveal}
      onPointerDown={(e) => { pointer.current = e.pointerType; }}
      onClick={handleClick}
      aria-label={`Open memory: ${mem.title}`}
      className="bloom-host group relative mb-3 block w-full overflow-hidden rounded-2xl md:mb-5"
    >
      <SafeImage bloom lit={lit} src={mem.image} alt={mem.title} className={`${ASPECTS[i % ASPECTS.length]} w-full`} />
      <span className="absolute inset-0 flex flex-col justify-end bg-gradient-to-t from-black/80 via-transparent p-3 text-left opacity-0 transition group-hover:opacity-100 group-focus-visible:opacity-100">
        <span className="eyebrow !text-base">{mem.date}</span>
        <span className="title text-lg">{mem.title}</span>
      </span>
    </motion.button>
  );
}

export default function MemoryGallery() {
  const [idx, setIdx] = useState(null);
  const reveal = useReveal();
  const n = d.memories.length;
  const close = useCallback(() => setIdx(null), []);
  const step = useCallback((s) => setIdx((i) => (i === null ? i : (i + s + n) % n)), [n]);

  useEffect(() => {
    if (idx === null) return;
    const onKey = (e) => {
      if (e.key === "Escape") close();
      if (e.key === "ArrowRight") step(1);
      if (e.key === "ArrowLeft") step(-1);
    };
    document.body.style.overflow = "hidden";
    window.addEventListener("keydown", onKey);
    return () => { window.removeEventListener("keydown", onKey); document.body.style.overflow = ""; };
  }, [idx, close, step]);

  const m = idx !== null ? d.memories[idx] : null;

  return (
    <section id="memories" className="section">
      <motion.div {...reveal} className="mb-14 text-center">
        <p className="eyebrow">chapter two</p>
        <h2 className="title text-5xl md:text-7xl">{d.galleryTitle} ❤️</h2>
        <p className="mt-5 text-xs tracking-widest text-warm/40">TOUCH A PHOTO TO BRING IT TO LIFE</p>
      </motion.div>
      <div className="columns-2 gap-3 md:columns-3 md:gap-5">
        {d.memories.map((mem, i) => (
          <GalleryItem
            key={i}
            i={i}
            mem={mem}
            onClick={() => setIdx(i)}
          />
        ))}
      </div>

      <AnimatePresence>
        {m && (
          <motion.div
            role="dialog" aria-modal="true" aria-label={m.title}
            className="fixed inset-0 z-50 flex flex-col items-center justify-center bg-black/80 p-4 backdrop-blur-xl"
            initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
            onClick={close}
          >
            <button onClick={close} aria-label="Close" className="btn-ghost absolute right-4 top-4 !px-3"><X size={20} /></button>
            <motion.figure
              key={idx}
              className="max-w-xl text-center" onClick={(e) => e.stopPropagation()}
              initial={{ opacity: 0, scale: 0.94 }} animate={{ opacity: 1, scale: 1 }} exit={{ opacity: 0, scale: 0.94 }}
            >
              <SafeImage src={m.image} alt={m.title} eager className="mx-auto max-h-[62vh] w-auto min-w-[240px] max-w-full rounded-2xl" />
              <figcaption className="mt-5">
                <p className="eyebrow">{m.date}</p>
                <p className="title text-2xl">{m.title}</p>
                <p className="mt-2 italic text-warm/70">"{m.description}"</p>
              </figcaption>
            </motion.figure>
            <div className="mt-6 flex gap-4" onClick={(e) => e.stopPropagation()}>
              <button className="btn-ghost" onClick={() => step(-1)} aria-label="Previous"><ChevronLeft size={20} /></button>
              <button className="btn-ghost" onClick={() => step(1)} aria-label="Next"><ChevronRight size={20} /></button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}
