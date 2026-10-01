import { motion } from "framer-motion";
import { Heart } from "lucide-react";

export default function LoadingScreen() {
  return (
    <motion.div
      className="fixed inset-0 z-50 flex flex-col items-center justify-center bg-midnight px-6 text-center"
      exit={{ opacity: 0 }}
      transition={{ duration: 0.8 }}
    >
      <Heart className="beat mb-8 text-rose" size={30} fill="currentColor" />
      <motion.p
        className="title text-3xl text-warm md:text-5xl"
        initial={{ opacity: 0, filter: "blur(8px)" }}
        animate={{ opacity: 1, filter: "blur(0px)" }}
        transition={{ duration: 1.2 }}
      >
        Something special is being prepared...
      </motion.p>
      <div className="mt-10 h-px w-40 overflow-hidden bg-white/10" role="progressbar" aria-label="Loading">
        <motion.div
          className="h-full bg-gradient-to-r from-rose to-gold"
          initial={{ width: 0 }}
          animate={{ width: "100%" }}
          transition={{ duration: 2.4, ease: "easeInOut" }}
        />
      </div>
    </motion.div>
  );
}
