import { motion } from "framer-motion";
import { Sparkles } from "lucide-react";
import FloatingParticles from "./FloatingParticles";
import { birthdayData } from "../data/birthdayData";

export default function OpeningScreen({ onOpen }) {
  return (
    <motion.div
      className="fixed inset-0 z-40 flex items-center justify-center overflow-y-auto bg-midnight px-6 text-center"
      style={{ background: "radial-gradient(ellipse at 50% 30%, #2a0f1a 0%, var(--c-bg) 70%)" }}
      exit={{ opacity: 0, scale: 1.08, filter: "blur(14px)" }}
      transition={{ duration: 1.1, ease: "easeInOut" }}
    >
      <FloatingParticles count={16} />
      <div className="relative z-10 py-10">
        <motion.h1
          className="title text-4xl text-warm sm:text-5xl md:text-7xl"
          initial={{ opacity: 0, y: 20, filter: "blur(10px)" }}
          animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
          transition={{ duration: 1.4, delay: 0.2 }}
        >
          Hey, <span className="text-gradient">{birthdayData.herName}</span>...
        </motion.h1>
        <motion.p
          className="title mt-3 text-2xl italic text-warm/80 md:text-4xl"
          initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 1.4, delay: 1.2 }}
        >
          I made something special for you.
        </motion.p>
        <motion.p
          className="mx-auto mt-10 max-w-sm text-sm leading-7 text-warm/60 md:text-base"
          initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 1.4, delay: 2.2 }}
        >
          Don't rush.<br />Take your time.<br />This one is just for you. ❤️
        </motion.p>
        <motion.div initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 1, delay: 3.1 }} className="mt-12">
          <button onClick={onOpen} className="btn-glow">
            <Sparkles size={18} /> Open Your Surprise
          </button>
        </motion.div>
      </div>
    </motion.div>
  );
}
