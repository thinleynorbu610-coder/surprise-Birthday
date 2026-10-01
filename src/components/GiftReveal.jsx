import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import Confetti from "./Confetti";
import { useReveal } from "../hooks/useReveal";

export default function GiftReveal() {
  const [open, setOpen] = useState(false);
  const reveal = useReveal();
  return (
    <section className="relative flex min-h-[90vh] flex-col items-center justify-center overflow-hidden px-6 py-24 text-center">
      <AnimatePresence mode="wait">
        {!open ? (
          <motion.div key="closed" exit={{ opacity: 0, scale: 0.9 }} {...reveal}>
            <p className="title text-3xl md:text-5xl">I have one more thing for you...</p>
            <button
              onClick={() => setOpen(true)}
              aria-label="Open the gift"
              className="group relative mx-auto mt-14 block h-40 w-40 rounded-2xl"
            >
              <span aria-hidden className="absolute -inset-6 rounded-full bg-rose/20 blur-2xl transition group-hover:bg-rose/35" />
              {/* box */}
              <span className="absolute bottom-0 left-0 right-0 h-28 rounded-b-2xl bg-gradient-to-b from-[#7a1f35] to-burgundy shadow-2xl" />
              <span aria-hidden className="absolute bottom-0 left-1/2 h-28 w-5 -translate-x-1/2 bg-gold/80" />
              {/* lid */}
              <motion.span
                className="absolute left-[-6px] right-[-6px] top-[18px] h-14 rounded-xl bg-gradient-to-b from-[#9b2a46] to-[#7a1f35] shadow-lg"
                animate={{ y: [0, -4, 0] }} transition={{ duration: 2.4, repeat: Infinity }}
              >
                <span aria-hidden className="absolute left-1/2 top-0 h-full w-5 -translate-x-1/2 bg-gold/80" />
                <span aria-hidden className="absolute -top-5 left-1/2 h-6 w-12 -translate-x-[110%] rounded-full border-4 border-gold/80" />
                <span aria-hidden className="absolute -top-5 left-1/2 h-6 w-12 translate-x-[10%] rounded-full border-4 border-gold/80" />
              </motion.span>
            </button>
            <p className="mt-10 text-sm tracking-widest text-warm/50">TAP TO OPEN</p>
          </motion.div>
        ) : (
          <motion.div key="open" initial={{ opacity: 0, scale: 0.8 }} animate={{ opacity: 1, scale: 1 }} transition={{ duration: 1.2, delay: 0.5 }}>
            <motion.div aria-hidden className="absolute left-1/2 top-1/2 h-[30rem] w-[30rem] -translate-x-1/2 -translate-y-1/2 rounded-full"
              style={{ background: "radial-gradient(circle, rgba(232,160,176,.35), transparent 65%)" }}
              initial={{ scale: 0 }} animate={{ scale: 1.6 }} transition={{ duration: 1.8 }} />
            <Confetti origin="45%" />
            <p className="title relative text-3xl leading-snug md:text-6xl">
              This website is made from<br /><span className="text-gradient">my favorite memories with you.</span>
            </p>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}
