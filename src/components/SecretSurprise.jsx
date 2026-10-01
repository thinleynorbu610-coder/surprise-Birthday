import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { Heart } from "lucide-react";
import SafeImage from "./SafeImage";
import Confetti from "./Confetti";
import { useReveal } from "../hooks/useReveal";
import { birthdayData as d } from "../data/birthdayData";

export default function SecretSurprise() {
  const [found, setFound] = useState(false);
  const reveal = useReveal();
  return (
    <section id="surprise" className="section relative text-center">
      <AnimatePresence mode="wait">
        {!found ? (
          <motion.div key="t" {...reveal} exit={{ opacity: 0, scale: 0.95 }}>
            <p className="title whitespace-pre-line text-3xl italic md:text-5xl">{d.secret.teaser}</p>
            <button onClick={() => setFound(true)} className="btn-glow mt-10">
              {d.secret.button} <Heart size={18} fill="currentColor" className="beat" />
            </button>
          </motion.div>
        ) : (
          <motion.div key="s" initial={{ opacity: 0, scale: 0.85 }} animate={{ opacity: 1, scale: 1 }} transition={{ duration: 1 }}>
            <Confetti count={24} origin="30%" />
            <div className="glass mx-auto max-w-sm rounded-[2rem] p-3">
              {d.secret.video ? (
                <video
                  src={d.secret.video}
                  poster={d.secret.image}
                  autoPlay muted loop playsInline controls
                  aria-label="A secret memory"
                  className="max-h-[70vh] w-full rounded-[1.5rem] bg-black object-cover"
                />
              ) : (
                <SafeImage src={d.secret.image} alt="A secret memory" className="aspect-square w-full rounded-[1.5rem]" />
              )}
            </div>
            <p className="title mx-auto mt-8 max-w-xl text-2xl leading-snug md:text-4xl">{d.secret.message}</p>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}
