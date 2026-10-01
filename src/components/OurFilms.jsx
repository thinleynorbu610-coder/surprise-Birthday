import { useCallback, useEffect, useRef, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { ChevronLeft, ChevronRight, Play, X } from "lucide-react";
import { useReveal } from "../hooks/useReveal";
import { birthdayData as d } from "../data/birthdayData";

// Muted black & white preview that only plays while it's on screen.
function FilmCard({ film, onOpen }) {
  const reveal = useReveal();
  const ref = useRef(null);
  useEffect(() => {
    const v = ref.current;
    if (!v) return;
    const io = new IntersectionObserver(([e]) => {
      if (e.isIntersecting) v.play().catch(() => {});
      else v.pause();
    }, { threshold: 0.4 });
    io.observe(v);
    return () => io.disconnect();
  }, []);
  return (
    <motion.button
      {...reveal}
      onClick={onOpen}
      aria-label={`Play film: ${film.title}`}
      className="bloom-host group relative w-[62vw] max-w-[260px] shrink-0 snap-center overflow-hidden rounded-3xl bg-black md:w-auto md:max-w-none"
    >
      <video
        ref={ref}
        src={film.src}
        poster={film.poster}
        muted loop playsInline preload="metadata"
        className="mono-video aspect-[9/16] w-full object-cover"
      />
      <span className="absolute inset-0 flex flex-col items-center justify-end bg-gradient-to-t from-black/75 via-transparent to-transparent p-4">
        <span className="mb-3 flex h-12 w-12 items-center justify-center rounded-full border border-white/30 bg-white/10 backdrop-blur-md transition group-hover:scale-110">
          <Play size={18} fill="currentColor" className="ml-0.5" />
        </span>
        <span className="title text-lg leading-tight">{film.title}</span>
      </span>
    </motion.button>
  );
}

export default function OurFilms({ audioRef }) {
  const reveal = useReveal();
  const [idx, setIdx] = useState(null);
  const films = d.films ?? [];
  const n = films.length;
  const isOpen = idx !== null;

  const close = useCallback(() => setIdx(null), []);
  const step = useCallback((s) => setIdx((i) => (i === null ? i : (i + s + n) % n)), [n]);

  // Pause the background song while a film plays with sound; resume after.
  useEffect(() => {
    if (!isOpen) return;
    const audio = audioRef?.current;
    const wasPlaying = !!audio && !audio.paused;
    audio?.pause();
    const onKey = (e) => {
      if (e.key === "Escape") close();
      if (e.key === "ArrowRight") step(1);
      if (e.key === "ArrowLeft") step(-1);
    };
    document.body.style.overflow = "hidden";
    window.addEventListener("keydown", onKey);
    return () => {
      window.removeEventListener("keydown", onKey);
      document.body.style.overflow = "";
      if (wasPlaying) audio.play().catch(() => {});
    };
  }, [isOpen, audioRef, close, step]);

  if (!n) return null;
  const f = isOpen ? films[idx] : null;

  return (
    <section id="films" className="section">
      <motion.div {...reveal} className="mb-12 text-center">
        <p className="eyebrow">in motion</p>
        <h2 className="title text-5xl md:text-7xl">{d.filmsTitle}</h2>
        <p className="mt-5 text-xs tracking-widest text-warm/40">TAP TO WATCH WITH SOUND</p>
      </motion.div>
      <div className="hide-scrollbar -mx-5 flex snap-x snap-mandatory gap-4 overflow-x-auto px-5 pb-2 md:mx-0 md:grid md:grid-cols-5 md:overflow-visible md:px-0">
        {films.map((film, i) => <FilmCard key={film.src} film={film} onOpen={() => setIdx(i)} />)}
      </div>

      <AnimatePresence>
        {f && (
          <motion.div
            role="dialog" aria-modal="true" aria-label={f.title}
            className="fixed inset-0 z-50 flex flex-col items-center justify-center bg-black/85 p-4 backdrop-blur-xl"
            initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
            onClick={close}
          >
            <button onClick={close} aria-label="Close" className="btn-ghost absolute right-4 top-4 !px-3"><X size={20} /></button>
            <motion.figure
              key={idx}
              className="text-center" onClick={(e) => e.stopPropagation()}
              initial={{ opacity: 0, scale: 0.94 }} animate={{ opacity: 1, scale: 1 }} exit={{ opacity: 0, scale: 0.94 }}
            >
              <video
                src={f.src} poster={f.poster}
                autoPlay controls playsInline
                onEnded={() => n > 1 && step(1)}
                className="mx-auto max-h-[72vh] w-auto rounded-2xl bg-black shadow-2xl"
              />
              <figcaption className="title mt-4 text-2xl">{f.title}</figcaption>
            </motion.figure>
            {n > 1 && (
              <div className="mt-5 flex gap-4" onClick={(e) => e.stopPropagation()}>
                <button className="btn-ghost" onClick={() => step(-1)} aria-label="Previous film"><ChevronLeft size={20} /></button>
                <button className="btn-ghost" onClick={() => step(1)} aria-label="Next film"><ChevronRight size={20} /></button>
              </div>
            )}
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}
