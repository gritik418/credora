"use client";

import { AnimatePresence, motion } from "framer-motion";
import { FolderKanban, LayoutDashboard, ListTodo, Users } from "lucide-react";
import { useEffect, useState } from "react";

const loadingTexts = [
  "Opening your workspace...",
  "Loading workspace projects...",
  "Organizing tasks and discussions...",
  "Getting everything ready...",
];

const WorkspaceLoader = () => {
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

  const icons = [FolderKanban, LayoutDashboard, ListTodo, Users];

  const ActiveIcon = icons[textIndex];

  return (
    <div className="fixed inset-0 z-50 flex min-h-screen items-center justify-center overflow-hidden bg-[#050505]">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_45%,rgba(79,70,229,0.16),transparent_38%)]" />

      <motion.div
        animate={{
          scale: [1, 1.15, 1],
          opacity: [0.15, 0.3, 0.15],
        }}
        transition={{
          duration: 3,
          repeat: Infinity,
          ease: "easeInOut",
        }}
        className="absolute h-72 w-72 rounded-full bg-indigo-500/15 blur-3xl"
      />

      <div className="relative flex flex-col items-center px-6">
        <motion.div
          initial={{ opacity: 0, scale: 0.85 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{
            duration: 0.6,
            ease: [0.22, 1, 0.36, 1],
          }}
          className="relative flex h-36 w-36 items-center justify-center"
        >
          <motion.div
            animate={{ rotate: 360 }}
            transition={{
              duration: 3,
              repeat: Infinity,
              ease: "linear",
            }}
            className="absolute inset-0 rounded-full border border-white/5 border-t-indigo-400 border-r-violet-500"
          />

          <motion.div
            animate={{
              scale: [1, 1.05, 1],
              boxShadow: [
                "0 0 20px rgba(99,102,241,0.05)",
                "0 0 40px rgba(99,102,241,0.16)",
                "0 0 20px rgba(99,102,241,0.05)",
              ],
            }}
            transition={{
              duration: 2.5,
              repeat: Infinity,
              ease: "easeInOut",
            }}
            className="flex h-24 w-24 items-center justify-center rounded-3xl border border-indigo-400/20 bg-indigo-500/8 backdrop-blur-xl"
          >
            <AnimatePresence mode="wait">
              <motion.div
                key={textIndex}
                initial={{ opacity: 0, y: 8, scale: 0.9 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                exit={{ opacity: 0, y: -8, scale: 0.9 }}
                transition={{ duration: 0.3 }}
              >
                <ActiveIcon className="h-11 w-11 text-indigo-300" />
              </motion.div>
            </AnimatePresence>
          </motion.div>

          <motion.span
            animate={{
              opacity: [0.3, 1, 0.3],
              scale: [0.8, 1.1, 0.8],
            }}
            transition={{
              duration: 2,
              repeat: Infinity,
              ease: "easeInOut",
            }}
            className="absolute right-2 top-5 h-2 w-2 rounded-full bg-violet-400 shadow-[0_0_12px_rgba(167,139,250,0.8)]"
          />

          <motion.span
            animate={{
              opacity: [0.2, 0.8, 0.2],
              scale: [0.8, 1.2, 0.8],
            }}
            transition={{
              duration: 2,
              repeat: Infinity,
              delay: 0.6,
              ease: "easeInOut",
            }}
            className="absolute bottom-5 left-1 h-1.5 w-1.5 rounded-full bg-indigo-300"
          />
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2, duration: 0.5 }}
          className="mt-8 text-center"
        >
          <h2 className="text-xl font-semibold tracking-tight text-white">
            Preparing your workspace
          </h2>

          <p className="mt-2 text-sm text-slate-400">
            Your projects, tasks, and team are coming together.
          </p>
        </motion.div>

        <div className="mt-7 flex h-6 items-center justify-center">
          <AnimatePresence mode="wait">
            <motion.p
              key={textIndex}
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -8 }}
              transition={{ duration: 0.35 }}
              className="text-sm font-medium text-indigo-200/90"
            >
              {loadingTexts[textIndex]}
            </motion.p>
          </AnimatePresence>
        </div>

        <div className="mt-5 flex items-center gap-2">
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
        </div>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5 }}
          className="mt-10 flex items-center gap-2 rounded-full border border-white/6 bg-white/3 px-4 py-2"
        >
          <span className="h-1.5 w-1.5 rounded-full bg-emerald-400" />

          <span className="text-xs text-slate-400">
            Workspace initialization
          </span>
        </motion.div>
      </div>
    </div>
  );
};

export default WorkspaceLoader;
