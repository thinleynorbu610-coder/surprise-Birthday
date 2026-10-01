import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { Menu, X } from "lucide-react";

const LINKS = [
  ["Home", "home"], ["Our Story", "story"], ["Memories", "memories"],
  ["About You", "about"], ["Films", "films"], ["Letter", "letter"], ["Surprise", "surprise"],
];

export default function Navbar() {
  const [open, setOpen] = useState(false);
  const go = (id) => {
    setOpen(false);
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
  };
  return (
    <motion.nav
      aria-label="Main"
      className="fixed left-0 right-0 top-3 z-30 mx-auto w-[calc(100%-1.5rem)] max-w-3xl"
      initial={{ opacity: 0, y: -20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.6, duration: 0.8 }}
    >
      <div className="glass flex items-center justify-between rounded-full px-3 py-2 md:justify-center">
        <ul className="hidden gap-1 md:flex">
          {LINKS.map(([label, id]) => (
            <li key={id}>
              <button onClick={() => go(id)} className="rounded-full px-3 py-1.5 text-xs tracking-wide text-warm/70 transition hover:bg-white/10 hover:text-warm">{label}</button>
            </li>
          ))}
        </ul>
        <span className="eyebrow pl-3 md:hidden">for you ❤️</span>
        <button className="btn-ghost !min-h-[40px] !px-3 md:hidden" aria-expanded={open} aria-label={open ? "Close menu" : "Open menu"} onClick={() => setOpen(!open)}>
          {open ? <X size={18} /> : <Menu size={18} />}
        </button>
      </div>
      <AnimatePresence>
        {open && (
          <motion.ul initial={{ opacity: 0, y: -8 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -8 }}
            className="glass mt-2 rounded-3xl p-2 md:hidden" style={{ background: "rgba(11,7,9,.92)" }}>
            {LINKS.map(([label, id]) => (
              <li key={id}><button onClick={() => go(id)} className="w-full rounded-2xl px-4 py-3 text-left text-warm/80 hover:bg-white/10">{label}</button></li>
            ))}
          </motion.ul>
        )}
      </AnimatePresence>
    </motion.nav>
  );
}
