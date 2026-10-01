import { motion } from "framer-motion";
import { birthdayData as d } from "../data/birthdayData";

export default function PoeticSection() {
  const lines = d.poetic.answer.split("\n");
  return (
    <section className="flex min-h-[90vh] items-center justify-center px-6 py-24 text-center">
      <div>
        <motion.p
          className="title text-3xl italic text-warm/60 md:text-5xl"
          initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={{ once: true, margin: "-20%" }} transition={{ duration: 2 }}
        >
          {d.poetic.lead}
        </motion.p>
        <div className="title mt-12 text-2xl leading-relaxed md:text-5xl md:leading-snug">
          {lines.map((l, i) => (
            <motion.p
              key={i}
              className={l ? "" : "h-6"}
              initial={{ opacity: 0, filter: "blur(8px)" }}
              whileInView={{ opacity: 1, filter: "blur(0px)" }}
              viewport={{ once: true, margin: "-20%" }}
              transition={{ duration: 1.6, delay: 1.6 + i * 0.7 }}
            >
              {l}
            </motion.p>
          ))}
        </div>
      </div>
    </section>
  );
}
