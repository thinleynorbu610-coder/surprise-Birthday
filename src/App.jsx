import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { birthdayData } from "./data/birthdayData";
import LoadingScreen from "./components/LoadingScreen";
import OpeningScreen from "./components/OpeningScreen";
import Navbar from "./components/Navbar";
import Hero from "./components/Hero";
import GiftReveal from "./components/GiftReveal";
import StoryTimeline from "./components/StoryTimeline";
import MemoryGallery from "./components/MemoryGallery";
import LoveCards from "./components/LoveCards";
import FavoriteMoments from "./components/FavoriteMoments";
import OurFilms from "./components/OurFilms";
import BirthdayCountdown from "./components/BirthdayCountdown";
import LoveLetter from "./components/LoveLetter";
import PoeticSection from "./components/PoeticSection";
import SecretSurprise from "./components/SecretSurprise";
import FinalReveal from "./components/FinalReveal";

export default function App() {
  const [stage, setStage] = useState("loading"); // loading -> opening -> main

  useEffect(() => {
    document.title = birthdayData.pageTitle;
    const t = setTimeout(() => setStage("opening"), 2800);
    return () => clearTimeout(t);
  }, []);

  useEffect(() => {
    document.body.style.overflow = stage === "main" ? "" : "hidden";
  }, [stage]);

  const open = () => {
    setStage("main");
  };

  return (
    <>
      <AnimatePresence>{stage === "loading" && <LoadingScreen key="l" />}</AnimatePresence>
      <AnimatePresence>{stage === "opening" && <OpeningScreen key="o" onOpen={open} />}</AnimatePresence>

      {stage === "main" && (
        <motion.main initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 1.4 }}>
          <Navbar />
          <Hero />
          <GiftReveal />
          <StoryTimeline />
          <MemoryGallery />
          <LoveCards />
          <FavoriteMoments />
          <OurFilms />
          <BirthdayCountdown />
          <LoveLetter />
          <PoeticSection />
          <SecretSurprise />
          <FinalReveal />
        </motion.main>
      )}
    </>
  );
}
