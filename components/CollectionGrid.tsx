"use client";

/* eslint-disable @next/next/no-img-element */
import { useRef } from "react";
import {
  motion,
  useMotionValue,
  useSpring,
  useTransform,
  useReducedMotion,
} from "framer-motion";
import { ArrowUpRight } from "lucide-react";
import { products, type Product } from "@/lib/data";
import { FadeUp, RevealWords } from "@/components/Reveal";

function ProductCard({ product, index }: { product: Product; index: number }) {
  const ref = useRef<HTMLDivElement>(null);
  const reduce = useReducedMotion();

  const mx = useMotionValue(0.5);
  const my = useMotionValue(0.5);

  const rotateX = useSpring(useTransform(my, [0, 1], [8, -8]), {
    stiffness: 200,
    damping: 22,
  });
  const rotateY = useSpring(useTransform(mx, [0, 1], [-8, 8]), {
    stiffness: 200,
    damping: 22,
  });

  const shineX = useTransform(mx, [0, 1], ["0%", "100%"]);
  const shineY = useTransform(my, [0, 1], ["0%", "100%"]);
  const shine = useTransform(
    [shineX, shineY],
    ([x, y]: string[]) =>
      `radial-gradient(320px circle at ${x} ${y}, rgba(244,239,231,0.14), transparent 65%)`
  );

  const handleMove = (e: React.MouseEvent) => {
    if (reduce || !ref.current) return;
    const rect = ref.current.getBoundingClientRect();
    mx.set((e.clientX - rect.left) / rect.width);
    my.set((e.clientY - rect.top) / rect.height);
  };

  const reset = () => {
    mx.set(0.5);
    my.set(0.5);
  };

  return (
    <motion.article
      initial={{ opacity: 0, y: 60 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-12%" }}
      transition={{ duration: 0.9, ease: [0.19, 1, 0.22, 1], delay: index * 0.1 }}
      className="group [perspective:1200px]"
    >
      <motion.div
        ref={ref}
        onMouseMove={handleMove}
        onMouseLeave={reset}
        style={reduce ? undefined : { rotateX, rotateY, transformStyle: "preserve-3d" }}
        className="relative overflow-hidden rounded-[4px] border border-ivory/10 bg-graphite"
        data-cursor="hover"
      >
        <div className="relative aspect-[3/4] overflow-hidden">
          <img
            src={product.image}
            alt={product.name}
            loading="lazy"
            className="h-full w-full object-cover transition-transform duration-[1.1s] ease-out-expo group-hover:scale-[1.07]"
          />
          <div
            className="absolute inset-0"
            style={{
              background: `linear-gradient(to top, rgba(8,8,10,0.92) 0%, rgba(8,8,10,0.15) 45%, transparent 100%)`,
            }}
          />
          {/* accent wash */}
          <div
            className="absolute inset-0 opacity-0 transition-opacity duration-700 group-hover:opacity-100"
            style={{
              background: `linear-gradient(140deg, ${product.accent}22, transparent 55%)`,
            }}
          />
          {/* cursor shine */}
          <motion.div
            aria-hidden="true"
            className="pointer-events-none absolute inset-0 opacity-0 transition-opacity duration-500 group-hover:opacity-100"
            style={{ background: shine }}
          />
        </div>

        <div className="absolute left-0 right-0 bottom-0 flex items-end justify-between p-6">
          <div>
            <p className="eyebrow mb-2">{product.category}</p>
            <h3 className="display text-2xl text-ivory md:text-[1.7rem]">
              {product.name}
            </h3>
            <p className="mt-1 text-sm text-champagne">{product.price}</p>
          </div>
          <span className="flex h-11 w-11 shrink-0 translate-y-2 items-center justify-center rounded-full border border-champagne/50 text-champagne opacity-0 transition-all duration-500 ease-out-expo group-hover:translate-y-0 group-hover:opacity-100">
            <ArrowUpRight size={16} />
          </span>
        </div>

        <span className="absolute right-5 top-5 display text-sm text-ivory/45">
          0{index + 1}
        </span>
      </motion.div>
    </motion.article>
  );
}

export default function CollectionGrid() {
  return (
    <section id="collection" className="relative py-20 sm:py-28 md:py-40">
      <div className="container-edge">
        <div className="flex flex-col gap-8 md:flex-row md:items-end md:justify-between">
          <div className="max-w-2xl">
            <FadeUp>
              <p className="eyebrow mb-4 md:mb-5">The Collection — 2026</p>
            </FadeUp>
            <h2 className="display text-4xl text-ivory sm:text-5xl lg:text-6xl">
              <RevealWords text="Pieces built to" />{" "}
              <span className="italic text-gradient-champagne">
                <RevealWords text="outlive" delay={0.2} />
              </span>{" "}
              <RevealWords text="the season." delay={0.35} />
            </h2>
          </div>
          <FadeUp delay={0.2} className="md:pb-3">
            <a
              href="#collection"
              className="group inline-flex items-center gap-3 text-sm uppercase tracking-[0.2em] text-ivory/70 transition-colors hover:text-ivory"
              data-cursor="hover"
            >
              View all pieces
              <span className="h-px w-10 bg-champagne transition-all duration-500 group-hover:w-16" />
            </a>
          </FadeUp>
        </div>

        <div className="mt-12 grid grid-cols-1 gap-5 sm:grid-cols-2 sm:gap-6 lg:grid-cols-4">
          {products.map((product, i) => (
            <ProductCard key={product.id} product={product} index={i} />
          ))}
        </div>
      </div>
    </section>
  );
}