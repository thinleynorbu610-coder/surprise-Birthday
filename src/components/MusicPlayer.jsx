import { useEffect, useRef, useState } from "react";
import { motion } from "framer-motion";
import { Pause, Play, Volume2, Music } from "lucide-react";
import { useReveal } from "../hooks/useReveal";
import { birthdayData as d } from "../data/birthdayData";

const fmt = (s) => (isFinite(s) ? `${Math.floor(s / 60)}:${String(Math.floor(s % 60)).padStart(2, "0")}` : "0:00");

export default function MusicPlayer({ audioRef }) {
  const reveal = useReveal();
  const [playing, setPlaying] = useState(false);
  const [time, setTime] = useState(0);
  const [dur, setDur] = useState(0);
  const [vol, setVol] = useState(0.8);
  const [missing, setMissing] = useState(false);

  useEffect(() => {
    const a = audioRef.current;
    if (!a) return;
    const on = {
      timeupdate: () => setTime(a.currentTime),
      loadedmetadata: () => setDur(a.duration),
      play: () => setPlaying(true),
      pause: () => setPlaying(false),
      ended: () => setPlaying(false),
      error: () => setMissing(true),
    };
    Object.entries(on).forEach(([e, f]) => a.addEventListener(e, f));
    if (a.error) setMissing(true);
    return () => Object.entries(on).forEach(([e, f]) => a.removeEventListener(e, f));
  }, [audioRef]);

  const toggle = () => {
    const a = audioRef.current;
    if (!a || missing) return;
    a.paused ? a.play().catch(() => setMissing(true)) : a.pause();
  };
  const seek = (e) => { audioRef.current.currentTime = +e.target.value; setTime(+e.target.value); };
  const volume = (e) => { setVol(+e.target.value); audioRef.current.volume = +e.target.value; };

  return (
    <section id="song" className="section text-center">
      <motion.div {...reveal}>
        <p className="eyebrow">chapter five</p>
        <h2 className="title text-4xl md:text-6xl">If Our Story<br />Had a Sound...</h2>
        <div className="glass mx-auto mt-12 max-w-md rounded-[2rem] p-8">
          <div className={`relative mx-auto h-48 w-48 rounded-full ${playing ? "spin-slow" : ""}`}
            style={{ background: "repeating-radial-gradient(circle, #111 0 3px, #1a1a1a 3px 5px)", boxShadow: "0 0 50px rgba(201,80,107,.3)" }}>
            <div className="absolute inset-[32%] flex items-center justify-center rounded-full bg-gradient-to-br from-burgundy to-rose">
              <Music size={22} />
            </div>
            <div className="absolute inset-[47%] rounded-full bg-midnight" />
          </div>
          <h3 className="title mt-8 text-3xl">{d.song.title}</h3>
          <p className="text-sm text-warm/50">{d.song.artist}</p>

          {missing ? (
            <p className="mt-6 rounded-2xl border border-gold/30 bg-gold/5 p-4 text-sm text-gold">
              Add your favorite song to /public/music/our-song.mp3
            </p>
          ) : (
            <>
              <div className="mt-6 flex items-center gap-3 text-xs text-warm/60">
                <span className="w-9 text-right tabular-nums">{fmt(time)}</span>
                <input type="range" min="0" max={dur || 0} step="0.1" value={time} onChange={seek} aria-label="Progress" className="h-1 flex-1 accent-[var(--c-rose)]" />
                <span className="w-9 text-left tabular-nums">{fmt(dur)}</span>
              </div>
              <div className="mt-6 flex items-center justify-between gap-4">
                <span className="w-24" />
                <button onClick={toggle} aria-label={playing ? "Pause" : "Play"} className="btn-glow !h-14 !w-14 !justify-center !p-0">
                  {playing ? <Pause size={22} /> : <Play size={22} className="ml-0.5" />}
                </button>
                <label className="flex w-24 items-center gap-2 text-warm/60">
                  <Volume2 size={16} />
                  <input type="range" min="0" max="1" step="0.05" value={vol} onChange={volume} aria-label="Volume" className="h-1 w-full accent-[var(--c-rose)]" />
                </label>
              </div>
            </>
          )}
        </div>
      </motion.div>
    </section>
  );
}
