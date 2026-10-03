"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ArrowRight, Check } from "lucide-react";
import { RevealWords, FadeUp } from "@/components/Reveal";

export default function Newsletter() {
  const [email, setEmail] = useState("");
  const [sent, setSent] = useState(false);

  const submit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!email.includes("@")) return;
    setSent(true);
  };

  return (
    <section
      id="newsletter"
      className="relative overflow-hidden border-t border-ivory/10 py-20 sm:py-28 md:py-40"
    >
      {/* glow */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute left-1/2 top-0 h-[40vmax] w-[40vmax] -translate-x-1/2 -translate-y-1/2 rounded-full opacity-50 blur-[120px]"
        style={{
          background:
            "radial-gradient(circle, rgba(201,169,106,0.28) 0%, transparent 70%)",
        }}
      />

      <div className="container-edge relative z-10">
        <div className="mx-auto max-w-3xl text-center">
          <FadeUp>
            <p className="eyebrow mb-6">The Atelier List</p>
          </FadeUp>
          <h2 className="display text-3xl text-ivory sm:text-4xl md:text-5xl lg:text-6xl">
            <RevealWords text="Be first to the" />{" "}
            <span className="italic text-gradient-champagne">
              <RevealWords text="next drop." delay={0.15} />
            </span>
          </h2>
          <FadeUp delay={0.15}>
            <p className="mx-auto mt-6 max-w-xl text-ivory/60">
              Private previews, atelier invitations and a small welcome gift on
              your first order. No noise — only what matters.
            </p>
          </FadeUp>

          <FadeUp delay={0.25}>
            <div className="mt-12">
              <AnimatePresence mode="wait">
                {!sent ? (
                  <motion.form
                    key="form"
                    onSubmit={submit}
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    className="mx-auto flex max-w-xl flex-col items-stretch gap-5 sm:flex-row sm:items-center sm:gap-4"
                  >
                    <label className="sr-only" htmlFor="email">
                      Email address
                    </label>
                    <input
                      id="email"
                      type="email"
                      required
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      placeholder="your@email.com"
                      className="w-full flex-1 border-b border-ivory/25 bg-transparent px-1 py-4 text-ivory placeholder:text-ivory/35 outline-none transition-colors duration-300 focus:border-champagne"
                    />
                    <button
                      type="submit"
                      className="btn-premium btn-solid justify-center sm:justify-start"
                      data-cursor="hover"
                    >
                      <span>Subscribe</span>
                      <ArrowRight size={15} className="relative z-10" />
                    </button>
                  </motion.form>
                ) : (
                  <motion.div
                    key="success"
                    initial={{ opacity: 0, y: 16 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6, ease: [0.19, 1, 0.22, 1] }}
                    className="glass-panel mx-auto flex max-w-xl items-center justify-center gap-3 rounded-full px-6 py-5"
                  >
                    <span className="flex h-7 w-7 items-center justify-center rounded-full bg-champagne text-obsidian">
                      <Check size={15} />
                    </span>
                    <p className="text-sm text-ivory">
                      Welcome to the atelier. Check your inbox.
                    </p>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          </FadeUp>

          <FadeUp delay={0.35}>
            <p className="mt-6 text-xs uppercase tracking-[0.2em] text-ivory/35">
              By subscribing you agree to our privacy policy.
            </p>
          </FadeUp>
        </div>
      </div>
    </section>
  );
}