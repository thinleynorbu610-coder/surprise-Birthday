import { useRef, useState } from "react";
import { motion } from "framer-motion";
import SafeImage from "./SafeImage";
import { useReveal } from "../hooks/useReveal";
import { birthdayData as d } from "../data/birthdayData";

function Item({ item, index }) {
  const reveal = useReveal();
  const [lit, setLit] = useState(false);
  const pointer = useRef("mouse");
  const left = index % 2 === 0;
  return (
    <motion.li {...reveal} className="relative grid pl-10 md:grid-cols-2 md:gap-16 md:pl-0">
      <span aria-hidden className="absolute left-[7px] top-3 h-3 w-3 rounded-full bg-rose shadow-[0_0_14px_var(--c-rose)] md:left-1/2 md:-translate-x-1/2" />
      <div
        className={`bloom-host glass rounded-3xl p-5 ${left ? "md:col-start-1 md:text-right" : "md:col-start-2"}`}
        onPointerDown={(e) => { pointer.current = e.pointerType; }}
        onClick={() => pointer.current === "touch" && setLit((v) => !v)}
      >
        <p className="eyebrow">{item.date}</p>
        <h3 className="title mt-1 text-2xl md:text-3xl">{item.title}</h3>
        <p className="mt-3 text-sm leading-7 text-warm/70 md:text-base">{item.description}</p>
        {item.image && <SafeImage bloom lit={lit} src={item.image} alt={item.title} className="mt-4 aspect-[16/10] w-full rounded-2xl" />}
      </div>
    </motion.li>
  );
}

export default function StoryTimeline() {
  const reveal = useReveal();
  return (
    <section id="story" className="section">
      <motion.div {...reveal} className="mb-16 text-center">
        <p className="eyebrow">chapter one</p>
        <h2 className="title text-5xl md:text-7xl">Our Story</h2>
        <p className="mt-5 whitespace-pre-line text-warm/60">{d.storyIntro}</p>
      </motion.div>
      <div className="relative">
        <span aria-hidden className="absolute bottom-0 left-[12px] top-0 w-px bg-gradient-to-b from-transparent via-rose/50 to-transparent md:left-1/2" />
        <ol className="space-y-12">
          {d.timeline.map((item, i) => <Item key={i} item={item} index={i} />)}
        </ol>
      </div>
    </section>
  );
}
