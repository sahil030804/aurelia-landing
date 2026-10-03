"use client";

import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { testimonials } from "@/lib/data";
import { FadeUp } from "@/components/Reveal";

const press = ["VOGUE", "MONOCLE", "KINFOLK", "WWD", "LES ÉCHOS"];

export default function Testimonials() {
  const [index, setIndex] = useState(0);

  useEffect(() => {
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const id = window.setInterval(
      () => setIndex((i) => (i + 1) % testimonials.length),
      reduce ? 999999999 : 6500
    );
    return () => window.clearInterval(id);
  }, []);

  const current = testimonials[index];

  return (
    <section className="relative py-20 sm:py-28 md:py-40">
      <div className="container-edge">
        <FadeUp>
          <p className="eyebrow mb-16 text-center">Worn & Trusted</p>
        </FadeUp>

        <div className="relative mx-auto min-h-[340px] max-w-4xl px-1 text-center sm:min-h-[300px] md:min-h-[340px]">
          <AnimatePresence mode="wait">
            <motion.figure
              key={index}
              initial={{ opacity: 0, y: 24 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -24 }}
              transition={{ duration: 0.7, ease: [0.19, 1, 0.22, 1] }}
            >
              <span
                aria-hidden="true"
                className="display mb-4 block text-6xl text-champagne/40 md:text-8xl"
              >
                &ldquo;
              </span>
              <blockquote className="display text-xl leading-snug text-ivory sm:text-2xl md:text-3xl lg:text-4xl">
                {current.quote}
              </blockquote>
              <figcaption className="mt-8">
                <p className="text-sm uppercase tracking-[0.24em] text-champagne">
                  {current.author}
                </p>
                <p className="mt-2 text-xs uppercase tracking-[0.2em] text-ivory/45">
                  {current.role}
                </p>
              </figcaption>
            </motion.figure>
          </AnimatePresence>
        </div>

        {/* dots */}
        <div className="mt-12 flex justify-center gap-3">
          {testimonials.map((_, i) => (
            <button
              key={i}
              type="button"
              aria-label={`Show testimonial ${i + 1}`}
              onClick={() => setIndex(i)}
              className="group p-2"
            >
              <span
                className={`block h-1.5 rounded-full transition-all duration-500 ease-out-expo ${
                  i === index
                    ? "w-8 bg-champagne"
                    : "w-1.5 bg-ivory/25 group-hover:bg-ivory/50"
                }`}
              />
            </button>
          ))}
        </div>

        {/* press logos */}
        <div className="mt-16 flex flex-wrap items-center justify-center gap-x-8 gap-y-6 border-t border-ivory/10 pt-10 sm:gap-x-14 sm:gap-y-8 md:mt-24 md:pt-14">
          {press.map((name, i) => (
            <FadeUp key={name} delay={i * 0.06}>
              <span className="display text-lg tracking-[0.28em] text-ivory/40 transition-colors duration-500 hover:text-ivory/80 md:text-xl">
                {name}
              </span>
            </FadeUp>
          ))}
        </div>
      </div>
    </section>
  );
}