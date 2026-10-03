"use client";

/* eslint-disable @next/next/no-img-element */
import { useEffect, useRef, useState } from "react";
import { motion, useInView, useScroll, useTransform, useReducedMotion } from "framer-motion";
import { stats } from "@/lib/data";
import { FadeUp, RevealWords } from "@/components/Reveal";

function CountUp({
  value,
  suffix = "",
  duration = 1800,
}: {
  value: number;
  suffix?: string;
  duration?: number;
}) {
  const ref = useRef<HTMLSpanElement>(null);
  const inView = useInView(ref, { once: true, margin: "-15%" });
  const [display, setDisplay] = useState(0);
  const reduce = useReducedMotion();

  useEffect(() => {
    if (!inView) return;
    if (reduce) {
      setDisplay(value);
      return;
    }
    let raf = 0;
    const start = performance.now();
    const tick = (now: number) => {
      const t = Math.min((now - start) / duration, 1);
      // ease-out-expo
      const eased = t === 1 ? 1 : 1 - Math.pow(2, -10 * t);
      setDisplay(Math.round(eased * value));
      if (t < 1) raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [inView, value, duration, reduce]);

  return (
    <span ref={ref} className="tabular-nums">
      {display}
      {suffix}
    </span>
  );
}

export default function Craft() {
  const sectionRef = useRef<HTMLElement>(null);
  const reduce = useReducedMotion();
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start end", "end start"],
  });
  const imgY = useTransform(scrollYProgress, [0, 1], ["-12%", "12%"]);

  return (
    <section ref={sectionRef} id="journal" className="relative py-20 sm:py-24 md:py-32">
      {/* Parallax editorial banner */}
      <div className="relative h-[42vh] overflow-hidden sm:h-[52vh] md:h-[64vh]">
        <motion.div
          className="absolute inset-0 -top-[14%] h-[128%]"
          style={reduce ? undefined : { y: imgY }}
        >
          <img
            src="https://images.unsplash.com/photo-1445205170230-053b83016050?auto=format&fit=crop&w=2000&q=80"
            alt="Inside the AURÉLIA atelier"
            loading="lazy"
            className="h-full w-full object-cover"
          />
        </motion.div>
        <div className="absolute inset-0 bg-gradient-to-b from-obsidian/70 via-obsidian/30 to-obsidian" />
        <div className="container-edge absolute inset-0 flex items-center">
          <div className="max-w-3xl">
            <FadeUp>
              <p className="eyebrow mb-5">Inside the Atelier</p>
            </FadeUp>
            <h2 className="display text-3xl text-ivory sm:text-4xl lg:text-6xl">
              <RevealWords text="Slow hands," />{" "}
              <span className="italic text-gradient-champagne">
                <RevealWords text="lasting cloth." delay={0.15} />
              </span>
            </h2>
          </div>
        </div>
      </div>

      {/* Stats */}
      <div className="container-edge mt-14 md:mt-20">
        <div className="grid grid-cols-2 gap-x-6 gap-y-10 sm:gap-x-8 md:grid-cols-4 md:gap-y-12">
          {stats.map((stat, i) => (
            <FadeUp key={stat.label} delay={i * 0.08}>
              <div className="border-t border-ivory/12 pt-6">
                <p className="display text-4xl text-gradient-champagne sm:text-5xl md:text-6xl">
                  <CountUp value={stat.value} suffix={stat.suffix} />
                </p>
                <p className="eyebrow mt-3">{stat.label}</p>
              </div>
            </FadeUp>
          ))}
        </div>
      </div>
    </section>
  );
}