"use client";

import { useRef } from "react";
import dynamic from "next/dynamic";
import {
  motion,
  useScroll,
  useTransform,
  useReducedMotion,
} from "framer-motion";
import { ArrowDown } from "lucide-react";

const SilkScene = dynamic(() => import("@/components/three/SilkScene"), {
  ssr: false,
  loading: () => null,
});

const EASE = [0.19, 1, 0.22, 1] as const;
const TITLE = "AURÉLIA";

export default function Hero({ loaded }: { loaded: boolean }) {
  const sectionRef = useRef<HTMLElement>(null);
  const reduce = useReducedMotion();

  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start start", "end start"],
  });

  const titleY = useTransform(scrollYProgress, [0, 1], ["0%", "38%"]);
  const titleOpacity = useTransform(scrollYProgress, [0, 0.7], [1, 0]);
  const sceneY = useTransform(scrollYProgress, [0, 1], ["0%", "22%"]);
  const sceneScale = useTransform(scrollYProgress, [0, 1], [1, 1.14]);
  const metaOpacity = useTransform(scrollYProgress, [0, 0.4], [1, 0]);

  return (
    <section
      ref={sectionRef}
      id="top"
      className="relative flex min-h-[100svh] flex-col justify-between overflow-hidden pb-10 pt-32"
    >
      {/* Atmosphere glow */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute left-1/2 top-1/2 h-[70vmax] w-[70vmax] -translate-x-1/2 -translate-y-1/2 rounded-full opacity-60 blur-[120px]"
        style={{
          background:
            "radial-gradient(circle, rgba(201,169,106,0.22) 0%, rgba(180,98,63,0.10) 40%, transparent 70%)",
        }}
      />

      {/* 3D silk background */}
      <motion.div
        aria-hidden="true"
        className="absolute inset-0 -z-0"
        style={reduce ? undefined : { y: sceneY, scale: sceneScale }}
      >
        <SilkScene className="h-full w-full" />
      </motion.div>

      {/* Top meta row */}
      <motion.div
        className="container-edge relative z-10 flex items-start justify-between"
        style={reduce ? undefined : { opacity: metaOpacity }}
      >
        <motion.p
          className="eyebrow max-w-[14rem]"
          initial={{ opacity: 0, y: 16 }}
          animate={loaded ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.9, ease: EASE, delay: 0.2 }}
        >
          Regenerative couture, made in Paris
        </motion.p>
        <motion.p
          className="eyebrow hidden text-right md:block"
          initial={{ opacity: 0, y: 16 }}
          animate={loaded ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.9, ease: EASE, delay: 0.32 }}
        >
          Fall / Winter 2026
          <br />
          Vol. VII
        </motion.p>
      </motion.div>

      {/* Center kinetic title */}
      <motion.div
        className="relative z-10 flex flex-col items-center px-4"
        style={reduce ? undefined : { y: titleY, opacity: titleOpacity }}
      >
        <div className="flex justify-center overflow-hidden">
          {TITLE.split("").map((char, i) => (
            <motion.span
              key={i}
              className="display text-gradient-champagne whitespace-nowrap text-[clamp(3.4rem,17.5vw,15rem)] leading-[0.82] tracking-tightest"
              initial={{ y: "120%", rotate: 6, opacity: 0 }}
              animate={loaded ? { y: "0%", rotate: 0, opacity: 1 } : {}}
              transition={{
                duration: 1.25,
                ease: EASE,
                delay: 0.35 + i * 0.075,
              }}
            >
              {char}
            </motion.span>
          ))}
        </div>

        <motion.p
          className="mt-4 max-w-xl px-3 text-center text-sm leading-relaxed text-ivory/70 sm:text-base"
          initial={{ opacity: 0, y: 20 }}
          animate={loaded ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 1, ease: EASE, delay: 1.05 }}
        >
          Limited-edition garments sculpted from regenerative fibres — designed
          to outlive every trend.
        </motion.p>

        <motion.div
          className="mt-9 flex w-full flex-col items-stretch justify-center gap-4 px-2 sm:w-auto sm:flex-row sm:flex-wrap sm:items-center sm:px-0"
          initial={{ opacity: 0, y: 20 }}
          animate={loaded ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 1, ease: EASE, delay: 1.25 }}
        >
          <a href="#collection" className="btn-premium btn-solid justify-center" data-cursor="hover">
            <span>Explore the Collection</span>
          </a>
          <a href="#story" className="btn-premium justify-center" data-cursor="hover">
            <span>Our Story</span>
          </a>
        </motion.div>
      </motion.div>

      {/* Bottom row */}
      <motion.div
        className="container-edge relative z-10 flex items-end justify-between gap-4"
        style={reduce ? undefined : { opacity: metaOpacity }}
      >
        <motion.a
          href="#collection"
          className="flex items-center gap-3 text-ivory/60 transition-colors hover:text-ivory"
          initial={{ opacity: 0 }}
          animate={loaded ? { opacity: 1 } : {}}
          transition={{ duration: 1, delay: 1.5 }}
          data-cursor="hover"
        >
          <span className="flex h-9 w-9 items-center justify-center rounded-full border border-ivory/25">
            <motion.span
              animate={reduce ? {} : { y: [0, 4, 0] }}
              transition={{ duration: 1.8, repeat: Infinity, ease: "easeInOut" }}
            >
              <ArrowDown size={15} />
            </motion.span>
          </span>
          <span className="eyebrow">Scroll to discover</span>
        </motion.a>

        <motion.div
          className="hidden text-right sm:block"
          initial={{ opacity: 0 }}
          animate={loaded ? { opacity: 1 } : {}}
          transition={{ duration: 1, delay: 1.6 }}
        >
          <p className="display text-2xl text-ivory">42</p>
          <p className="eyebrow mt-1">Hands per garment</p>
        </motion.div>
      </motion.div>
    </section>
  );
}