import { useReducedMotion } from "framer-motion";

// Shared scroll-reveal props: <motion.div {...useReveal(0.1)} />
export function useReveal(delay = 0) {
  const reduce = useReducedMotion();
  return {
    initial: reduce ? false : { opacity: 0, y: 36, filter: "blur(8px)" },
    whileInView: { opacity: 1, y: 0, filter: "blur(0px)" },
    viewport: { once: true, margin: "-80px" },
    transition: { duration: 0.9, delay, ease: [0.22, 1, 0.36, 1] },
  };
}
