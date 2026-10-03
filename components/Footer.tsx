"use client";

import { ArrowUp } from "lucide-react";

const columns = [
  {
    title: "Shop",
    links: ["New Arrivals", "Outerwear", "Evening", "Essentials", "Gift Cards"],
  },
  {
    title: "Atelier",
    links: ["Our Story", "Sustainability", "Craft", "Journal", "Careers"],
  },
  {
    title: "Client Care",
    links: ["Shipping", "Returns", "Repairs", "Book a Fitting", "Contact"],
  },
];

const socials = ["Instagram", "Pinterest", "Vimeo", "Journal"];

export default function Footer() {
  return (
    <footer className="relative overflow-hidden border-t border-ivory/10 bg-charcoal pt-14 sm:pt-20">
      <div className="container-edge">
        <div className="grid grid-cols-1 gap-10 sm:grid-cols-2 sm:gap-14 md:grid-cols-[1.4fr_repeat(3,1fr)]">
          <div>
            <p className="display text-3xl text-ivory">
              AUR<span className="text-champagne">É</span>LIA
            </p>
            <p className="mt-5 max-w-xs text-sm leading-relaxed text-ivory/55">
              Modern couture, quietly bold. Crafted from regenerative fibres in
              our Paris atelier since 2014.
            </p>
            <div className="mt-8 flex flex-wrap gap-3">
              {socials.map((s) => (
                <a
                  key={s}
                  href="#top"
                  data-cursor="hover"
                  className="rounded-full border border-ivory/15 px-4 py-2 text-[0.68rem] uppercase tracking-[0.2em] text-ivory/60 transition-colors duration-300 hover:border-champagne/60 hover:text-ivory"
                >
                  {s}
                </a>
              ))}
            </div>
          </div>

          {columns.map((col) => (
            <div key={col.title}>
              <p className="eyebrow mb-6">{col.title}</p>
              <ul className="space-y-3">
                {col.links.map((link) => (
                  <li key={link}>
                    <a
                      href="#top"
                      data-cursor="hover"
                      className="group inline-flex items-center gap-2 text-sm text-ivory/60 transition-colors duration-300 hover:text-ivory"
                    >
                      <span className="h-px w-0 bg-champagne transition-all duration-500 ease-out-expo group-hover:w-4" />
                      {link}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* Oversized wordmark */}
        <div className="mt-14 overflow-hidden sm:mt-20">
          <p className="display select-none whitespace-nowrap text-center text-[clamp(4rem,18vw,12rem)] leading-[0.8] text-ivory/[0.06]">
            AURÉLIA
          </p>
        </div>

        <div className="flex flex-col items-center justify-between gap-5 border-t border-ivory/10 py-7 text-center sm:py-8 md:flex-row md:text-left">
          <p className="text-xs uppercase tracking-[0.2em] text-ivory/40">
            © {new Date().getFullYear()} AURÉLIA Maison. All rights reserved.
          </p>
          <div className="flex items-center gap-8">
            <a
              href="#top"
              className="text-xs uppercase tracking-[0.2em] text-ivory/40 transition-colors hover:text-ivory"
            >
              Privacy
            </a>
            <a
              href="#top"
              className="text-xs uppercase tracking-[0.2em] text-ivory/40 transition-colors hover:text-ivory"
            >
              Terms
            </a>
            <a
              href="#top"
              data-cursor="hover"
              className="glass-panel flex h-10 w-10 items-center justify-center rounded-full text-ivory transition-colors duration-300 hover:text-champagne"
              aria-label="Back to top"
            >
              <ArrowUp size={16} />
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}