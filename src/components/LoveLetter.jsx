import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { Mail } from "lucide-react";
import { useReveal } from "../hooks/useReveal";
import { birthdayData as d } from "../data/birthdayData";

export default function LoveLetter() {
  const [open, setOpen] = useState(false);
  const reveal = useReveal();
  const paragraphs = d.letter.split(/\n\s*\n/);
  return (
    <section id="letter" className="section">
      <motion.div {...reveal} className="text-center">
        <p className="eyebrow">chapter five</p>
        <h2 className="title text-4xl md:text-6xl">A Letter From<br />Me To You</h2>
      </motion.div>
      <div className="glass mx-auto mt-12 max-w-2xl overflow-hidden rounded-[2rem] p-6 text-center md:p-12">
        <AnimatePresence mode="wait">
          {!open ? (
            <motion.div key="closed" exit={{ opacity: 0, y: -20 }} className="py-8">
              <motion.div animate={{ y: [0, -6, 0] }} transition={{ duration: 3, repeat: Infinity }} className="mx-auto mb-6 flex h-20 w-28 items-center justify-center rounded-xl bg-gradient-to-br from-burgundy to-[#7a1f35] shadow-xl">
                <Mail size={34} className="text-gold" strokeWidth={1.2} />
              </motion.div>
              <p className="title text-2xl italic">I wrote something for you...</p>
              <button onClick={() => setOpen(true)} className="btn-glow mt-8">Read My Letter</button>
            </motion.div>
          ) : (
            <motion.div key="open" initial={{ opacity: 0, scaleY: 0.6, originY: 0 }} animate={{ opacity: 1, scaleY: 1 }} transition={{ duration: 0.9 }} className="text-left">
              {paragraphs.map((p, i) => (
                <motion.p
                  key={i}
                  initial={{ opacity: 0, y: 14, filter: "blur(6px)" }}
                  animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
                  transition={{ duration: 1, delay: 0.8 + i * 0.9 }}
                  className={`whitespace-pre-line text-base leading-8 text-warm/85 md:text-lg md:leading-9 ${i ? "mt-6" : "eyebrow !text-3xl"}`}
                >
                  {p}
                </motion.p>
              ))}
              <motion.p initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 1.2 + paragraphs.length * 0.9 }} className="eyebrow mt-8 !text-3xl text-right">
                — {d.myName}
              </motion.p>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </section>
  );
}
