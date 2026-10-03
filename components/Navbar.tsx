"use client";

import { useState } from "react";
import { AnimatePresence, motion, useScroll, useSpring } from "framer-motion";
import { Menu, X } from "lucide-react";
import { cn } from "@/lib/utils";

const LINKS = [
  { label: "Collection", href: "#collection" },
  { label: "The Story", href: "#story" },
  { label: "Journal", href: "#journal" },
];

export default function Navbar() {
  const [open, setOpen] = useState(false);
  const { scrollYProgress } = useScroll();
  const progress = useSpring(scrollYProgress, {
    stiffness: 120,
    damping: 30,
    restDelta: 0.001,
  });

  return (
    <>
      <motion.header
        initial={{ y: -80, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 1, ease: [0.19, 1, 0.22, 1], delay: 0.2 }}
        className="fixed inset-x-0 top-0 z-[200]"
      >
        <div className="container-edge flex items-center justify-between py-6">
          <a
            href="#top"
            className="display text-2xl tracking-tightest text-ivory md:text-3xl"
            data-cursor="hover"
          >
            AUR<span className="text-champagne">É</span>LIA
          </a>

          <nav className="hidden items-center gap-10 lg:flex">
            {LINKS.map((link) => (
              <a
                key={link.href}
                href={link.href}
                data-cursor="hover"
                className="group relative text-[0.72rem] uppercase tracking-[0.24em] text-ivory/70 transition-colors duration-300 hover:text-ivory"
              >
                {link.label}
                <span className="absolute -bottom-1.5 left-0 h-px w-0 bg-champagne transition-all duration-500 ease-out-expo group-hover:w-full" />
              </a>
            ))}
          </nav>

          <div className="flex items-center gap-4">
            <a
              href="#newsletter"
              className="btn-premium hidden !px-6 !py-3 md:inline-flex"
              data-cursor="hover"
            >
              <span>Book a Fitting</span>
            </a>
            <button
              type="button"
              aria-label="Open menu"
              onClick={() => setOpen(true)}
              className="glass-panel flex h-11 w-11 items-center justify-center rounded-full text-ivory lg:hidden"
            >
              <Menu size={18} />
            </button>
          </div>
        </div>

        <motion.div
          className="h-px origin-left bg-gradient-to-r from-champagne-dark via-champagne to-champagne-light"
          style={{ scaleX: progress }}
        />
      </motion.header>

      <AnimatePresence>
        {open && (
          <motion.div
            className="fixed inset-0 z-[300] bg-obsidian/95 backdrop-blur-xl lg:hidden"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.4 }}
          >
            <div className="container-edge flex items-center justify-between py-6">
              <span className="display text-2xl text-ivory">AURÉLIA</span>
              <button
                type="button"
                aria-label="Close menu"
                onClick={() => setOpen(false)}
                className="glass-panel flex h-11 w-11 items-center justify-center rounded-full text-ivory"
              >
                <X size={18} />
              </button>
            </div>
            <nav className="mt-16 flex flex-col gap-2 px-6">
              {LINKS.map((link, i) => (
                <motion.a
                  key={link.href}
                  href={link.href}
                  onClick={() => setOpen(false)}
                  initial={{ opacity: 0, y: 30 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{
                    delay: 0.1 + i * 0.07,
                    duration: 0.6,
                    ease: [0.19, 1, 0.22, 1],
                  }}
                  className={cn(
                    "display border-b border-ivory/10 py-5 text-4xl text-ivory"
                  )}
                >
                  {link.label}
                </motion.a>
              ))}
              <motion.a
                href="#newsletter"
                onClick={() => setOpen(false)}
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.42, duration: 0.6 }}
                className="btn-premium btn-solid mt-8 w-max"
              >
                <span>Book a Fitting</span>
              </motion.a>
            </nav>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}