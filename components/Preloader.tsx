"use client";

import { useEffect, useRef, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";

const EASE = [0.19, 1, 0.22, 1] as const;
const BRAND = "AURÉLIA";

/**
 * Luxury preloader: animated wordmark + progress counter, then a two-panel
 * curtain reveal that hands control to the hero.
 */
export default function Preloader({
  onComplete,
}: {
  onComplete: () => void;
}) {
  const [count, setCount] = useState(0);
  const [done, setDone] = useState(false);
  const onCompleteRef = useRef(onComplete);
  onCompleteRef.current = onComplete;

  useEffect(() => {
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reduce) {
      setCount(100);
      const t = setTimeout(() => {
        setDone(true);
        onCompleteRef.current();
      }, 200);
      return () => clearTimeout(t);
    }

    document.documentElement.style.overflow = "hidden";
    let current = 0;
    const id = window.setInterval(() => {
      current += Math.random() * 14 + 5;
      if (current >= 100) {
        current = 100;
        window.clearInterval(id);
        setTimeout(() => {
          setDone(true);
          document.documentElement.style.overflow = "";
          onCompleteRef.current();
        }, 420);
      }
      setCount(Math.floor(current));
    }, 130);

    return () => {
      window.clearInterval(id);
      document.documentElement.style.overflow = "";
    };
  }, []);

  return (
    <AnimatePresence>
      {!done && (
        <motion.div
          className="fixed inset-0 z-[9999] flex flex-col items-center justify-center bg-obsidian"
          exit={{ opacity: 0 }}
          transition={{ duration: 0.5, delay: 0.5, ease: "easeInOut" }}
        >
          {/* Two-panel curtain */}
          <motion.div
            className="absolute left-0 top-0 h-full w-1/2 bg-obsidian"
            initial={{ y: 0 }}
            exit={{ y: "-100%" }}
            transition={{ duration: 0.9, ease: EASE }}
          />
          <motion.div
            className="absolute right-0 top-0 h-full w-1/2 bg-obsidian"
            initial={{ y: 0 }}
            exit={{ y: "100%" }}
            transition={{ duration: 0.9, ease: EASE }}
          />

          <div className="relative z-10 flex flex-col items-center">
            <div className="flex overflow-hidden">
              {BRAND.split("").map((char, i) => (
                <motion.span
                  key={i}
                  className="display text-gradient-champagne text-5xl tracking-tightest sm:text-7xl md:text-8xl"
                  initial={{ y: "115%", opacity: 0 }}
                  animate={{ y: "0%", opacity: 1 }}
                  transition={{
                    duration: 1,
                    ease: EASE,
                    delay: 0.15 + i * 0.06,
                  }}
                >
                  {char}
                </motion.span>
              ))}
            </div>
            <motion.p
              className="eyebrow mt-6"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.9, duration: 0.8 }}
            >
              Modern Couture
            </motion.p>
          </div>

          <div className="absolute bottom-10 left-0 right-0 z-10 flex items-end justify-between px-6 md:px-12">
            <span className="eyebrow hidden sm:block">Paris · Est. 2014</span>
            <span className="display text-3xl text-ivory/80 tabular-nums md:text-4xl">
              {count.toString().padStart(3, "0")}
              <span className="text-champagne">%</span>
            </span>
          </div>

          {/* thin progress line */}
          <motion.div
            className="absolute bottom-0 left-0 h-px bg-gradient-to-r from-champagne-dark via-champagne to-champagne-light"
            style={{ width: `${count}%` }}
            transition={{ ease: "linear" }}
          />
        </motion.div>
      )}
    </AnimatePresence>
  );
}