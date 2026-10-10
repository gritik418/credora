"use client";

import { AnimatePresence, motion } from "framer-motion";
import { useEffect, useState } from "react";
import Logo from "../logo/Logo";

const loadingTexts = [
  "Connecting your professional identity...",
  "Organizing your career journey...",
  "Building your professional profile...",
  "Getting everything ready...",
];

const CredoraLoader = () => {
  const [textIndex, setTextIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setTextIndex((prev) => {
        if (prev >= loadingTexts.length - 1) {
          clearInterval(interval);
          return prev;
        }

        return prev + 1;
      });
    }, 1800);

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="fixed inset-0 z-50 flex min-h-screen items-center justify-center overflow-hidden bg-[#0A192F]">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_45%,rgba(79,70,229,0.14),transparent_35%)]" />

      <motion.div
        animate={{
          scale: [1, 1.08, 1],
          opacity: [0.2, 0.35, 0.2],
        }}
        transition={{
          duration: 3,
          repeat: Infinity,
          ease: "easeInOut",
        }}
        className="absolute h-72 w-72 rounded-full bg-indigo-500/10 blur-3xl"
      />

      <div className="relative flex flex-col items-center">
        <motion.div
          initial={{ opacity: 0, scale: 0.85 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{
            duration: 0.6,
            ease: [0.22, 1, 0.36, 1],
          }}
          className="relative flex h-60 w-60 items-center justify-center"
        >
          <motion.div
            animate={{ rotate: 360 }}
            transition={{
              duration: 2.5,
              repeat: Infinity,
              ease: "linear",
            }}
            className="absolute inset-0 rounded-full border border-white/5 border-t-indigo-400 border-r-violet-500"
          />

          <Logo size="large" />
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{
            delay: 0.25,
            duration: 0.5,
          }}
          className="mt-7 text-center"
        >
          <p className="text-sm text-slate-400">
            Your professional identity, connected.
          </p>
        </motion.div>

        <div className="mt-8 flex h-6 items-center justify-center">
          <AnimatePresence mode="wait">
            <motion.p
              key={textIndex}
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -8 }}
              transition={{ duration: 0.35 }}
              className="text-sm font-medium text-slate-300"
            >
              {loadingTexts[textIndex]}
            </motion.p>
          </AnimatePresence>
        </div>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5 }}
          className="mt-5 flex items-center gap-2"
        >
          {[0, 1, 2].map((item) => (
            <motion.span
              key={item}
              animate={{
                opacity: [0.3, 1, 0.3],
                scale: [0.8, 1, 0.8],
              }}
              transition={{
                duration: 1.2,
                repeat: Infinity,
                delay: item * 0.2,
                ease: "easeInOut",
              }}
              className="h-1.5 w-1.5 rounded-full bg-indigo-400"
            />
          ))}
        </motion.div>
      </div>
    </div>
  );
};

export default CredoraLoader;
