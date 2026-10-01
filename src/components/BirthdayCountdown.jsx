import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { useReveal } from "../hooks/useReveal";
import { birthdayData as d } from "../data/birthdayData";

// Parse YYYY-MM-DD as LOCAL midnight (avoids timezone off-by-one).
const parse = (s) => {
  const [y, m, day] = s.split("-").map(Number);
  return new Date(y, m - 1, day);
};

function calc() {
  const target = parse(d.birthdayDate);
  const now = new Date();
  const end = new Date(target.getFullYear(), target.getMonth(), target.getDate() + 1);
  if (now >= target && now < end) return { today: true };
  const ms = target - now;
  if (ms <= 0) return { past: true };
  return {
    days: Math.floor(ms / 864e5),
    hours: Math.floor(ms / 36e5) % 24,
    minutes: Math.floor(ms / 6e4) % 60,
    seconds: Math.floor(ms / 1e3) % 60,
  };
}

export default function BirthdayCountdown() {
  const reveal = useReveal();
  const [t, setT] = useState(calc);
  useEffect(() => {
    const id = setInterval(() => setT(calc()), 1000);
    return () => clearInterval(id);
  }, []);

  return (
    <section className="section text-center">
      <motion.div {...reveal}>
        {t.today || t.past ? (
          <h2 className="title text-4xl md:text-7xl">
            {t.today ? <>Today is all about <span className="text-gradient">you</span> ❤️</> : <>Every day with you is a <span className="text-gradient">celebration</span> ❤️</>}
          </h2>
        ) : (
          <>
            <p className="eyebrow">counting every second</p>
            <h2 className="title text-4xl md:text-6xl">Until Your Special Day</h2>
            <div className="mx-auto mt-10 grid max-w-2xl grid-cols-4 gap-2 md:gap-5" role="timer" aria-live="off">
              {["days", "hours", "minutes", "seconds"].map((k) => (
                <div key={k} className="glass rounded-2xl px-1 py-5 md:py-8">
                  <div className="title text-3xl tabular-nums md:text-6xl">{String(t[k]).padStart(2, "0")}</div>
                  <div className="mt-1 text-[10px] uppercase tracking-widest text-warm/50 md:text-xs">{k}</div>
                </div>
              ))}
            </div>
          </>
        )}
      </motion.div>
    </section>
  );
}
