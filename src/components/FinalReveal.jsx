import { useState } from "react";
import { motion } from "framer-motion";
import { Heart } from "lucide-react";
import FloatingParticles from "./FloatingParticles";
import Confetti from "./Confetti";
import SafeImage from "./SafeImage";
import { birthdayData as d } from "../data/birthdayData";

const view = { once: true, margin: "-25%" };

export default function FinalReveal() {
  const [done, setDone] = useState(false);
  return (
    <>
      <section className="relative flex min-h-screen items-center justify-center overflow-hidden bg-black px-6 py-28 text-center">
        {done && <><FloatingParticles count={16} /><Confetti count={28} origin="35%" /></>}
        <div className="relative z-10">
          <motion.p className="title text-2xl italic text-warm/60 md:text-4xl" initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={view} transition={{ duration: 2 }}>
            And finally...
          </motion.p>
          <motion.h2 className="title mt-8 text-5xl md:text-8xl" initial={{ opacity: 0, filter: "blur(14px)" }} whileInView={{ opacity: 1, filter: "blur(0px)" }} viewport={view} transition={{ duration: 2.2, delay: 1.8 }}>
            Happy Birthday,<br /><span className="text-gradient">{d.herName}</span>
          </motion.h2>
          <motion.div initial={{ opacity: 0, scale: 0.5 }} whileInView={{ opacity: 1, scale: 1 }} viewport={view} transition={{ duration: 1.4, delay: 3.6 }} className="my-10">
            <Heart size={56} className="beat mx-auto text-rose-deep drop-shadow-[0_0_24px_rgba(201,80,107,.8)]" style={{ color: "var(--c-rose-deep)" }} fill="currentColor" />
          </motion.div>
          <motion.p className="title mx-auto max-w-xl whitespace-pre-line text-xl leading-relaxed text-warm/80 md:text-3xl" initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={view} transition={{ duration: 2, delay: 5 }}>
            {d.finalMessage}
          </motion.p>
          <motion.p
            className="eyebrow mt-12 !text-3xl" initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={view}
            transition={{ duration: 2, delay: 6.8 }} onAnimationComplete={() => setDone(true)}
          >
            With all my love,<br />{d.myName}
          </motion.p>
        </div>
      </section>

      <section className="relative bg-black px-5 pb-28">
        <motion.figure className="mx-auto max-w-4xl" initial={{ opacity: 0, scale: 0.96 }} whileInView={{ opacity: 1, scale: 1 }} viewport={{ once: true, margin: "-10%" }} transition={{ duration: 1.6 }}>
          <SafeImage src={d.finalImage} alt="One of our favorite photos" className="aspect-[4/5] w-full rounded-3xl shadow-2xl md:aspect-[16/10]" />
          <figcaption className="title mt-6 text-center text-xl italic text-warm/60 md:text-2xl">{d.finalCaption}</figcaption>
        </motion.figure>
      </section>
    </>
  );
}
