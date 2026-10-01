import { motion } from "framer-motion";
import { Heart } from "lucide-react";
import { useReveal } from "../hooks/useReveal";
import { birthdayData as d } from "../data/birthdayData";

function Card({ text, i }) {
  const reveal = useReveal((i % 4) * 0.08);
  return (
    <motion.li
      {...reveal}
      whileHover={{ y: -6, scale: 1.03 }}
      whileTap={{ scale: 0.97 }}
      tabIndex={0}
      className="glass group flex min-h-[9rem] w-[72vw] max-w-[18rem] shrink-0 snap-center flex-col justify-between rounded-3xl p-5 md:w-auto md:max-w-none"
    >
      <Heart size={18} className="text-rose transition group-hover:scale-125 group-hover:fill-current" />
      <p className="title text-2xl leading-tight">{text}</p>
    </motion.li>
  );
}

export default function LoveCards() {
  const reveal = useReveal();
  return (
    <section id="about" className="section">
      <motion.div {...reveal} className="mb-12 text-center">
        <p className="eyebrow">chapter three</p>
        <h2 className="title text-4xl md:text-6xl">A Few Things<br />I Love About You</h2>
      </motion.div>
      {/* swipeable row on mobile, grid on desktop */}
      <ul className="hide-scrollbar -mx-5 flex snap-x snap-mandatory gap-4 overflow-x-auto px-5 pb-4 md:mx-0 md:grid md:grid-cols-3 md:overflow-visible md:px-0 lg:grid-cols-4">
        {d.reasonsILoveYou.map((t, i) => <Card key={i} text={t} i={i} />)}
      </ul>
      <p className="mt-2 text-center text-xs tracking-widest text-warm/40 md:hidden">SWIPE →</p>
    </section>
  );
}
