import { motion } from "framer-motion";
import FloatingParticles from "./FloatingParticles";
import SafeImage from "./SafeImage";
import HeroSlideshow from "./HeroSlideshow";
import { birthdayData as d } from "../data/birthdayData";

export default function Hero() {
  return (
    <section id="home" className="relative flex min-h-screen items-center overflow-hidden">
      <div aria-hidden className="absolute left-1/2 top-0 h-[70vh] w-[140%] -translate-x-1/2 opacity-40"
        style={{ background: "conic-gradient(from 180deg at 50% 0%, transparent 40%, rgba(212,175,122,.18) 50%, transparent 60%)" }} />
      <div aria-hidden className="absolute inset-0" style={{ background: "radial-gradient(ellipse at 50% 100%, rgba(90,22,39,.55), transparent 65%)" }} />
      <FloatingParticles count={14} />
      <div className="section relative z-10 grid w-full items-center gap-12 py-24 md:grid-cols-2">
        <div className="text-center md:text-left">
          <motion.p className="eyebrow" initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.3, duration: 1 }}>
            a day just for you
          </motion.p>
          <motion.h2
            className="title mt-3 text-5xl sm:text-6xl lg:text-8xl"
            initial={{ opacity: 0, y: 30, filter: "blur(12px)" }}
            animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
            transition={{ duration: 1.4, delay: 0.4 }}
          >
            Happy Birthday,<br /><span className="text-gradient">{d.herName}</span> ❤️
          </motion.h2>
          <motion.p
            className="mx-auto mt-8 max-w-md whitespace-pre-line text-base leading-8 text-warm/70 md:mx-0 md:text-lg"
            initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 1.4, delay: 1.2 }}
          >
            {d.heroMessage}
          </motion.p>
        </div>
        <motion.div
          className="relative mx-auto w-full max-w-sm"
          initial={{ opacity: 0, scale: 0.92, filter: "blur(10px)" }}
          animate={{ opacity: 1, scale: 1, filter: "blur(0px)" }}
          transition={{ duration: 1.4, delay: 0.8 }}
        >
          <div aria-hidden className="absolute -inset-4 rounded-[2rem] bg-gradient-to-tr from-rose/30 via-transparent to-gold/30 blur-2xl" />
          <div className="glass relative rounded-[2rem] p-3">
            {d.heroImages?.length ? (
              <HeroSlideshow images={d.heroImages} alt={d.heroImageAlt} />
            ) : (
              <SafeImage src={d.heroImage} alt={d.heroImageAlt} eager className="aspect-[4/5] w-full rounded-[1.5rem]" />
            )}
          </div>
        </motion.div>
      </div>
    </section>
  );
}
