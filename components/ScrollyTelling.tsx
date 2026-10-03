"use client";

/* eslint-disable @next/next/no-img-element */
import { useEffect, useRef, useState } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { chapters } from "@/lib/data";
import { cn } from "@/lib/utils";

/**
 * Pinned horizontal scrollytelling.
 * GSAP ScrollTrigger pins the viewport-height wrapper and scrubs the track
 * sideways as the user scrolls vertically — a four-chapter brand story.
 * Users who prefer reduced motion get a static, vertically stacked fallback.
 */
export default function ScrollyTelling() {
  const sectionRef = useRef<HTMLElement>(null);
  const trackRef = useRef<HTMLDivElement>(null);
  const progressRef = useRef<HTMLDivElement>(null);
  const [reduced, setReduced] = useState(false);

  useEffect(() => {
    if (typeof window === "undefined") return;
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reduce) {
      setReduced(true);
      return;
    }

    gsap.registerPlugin(ScrollTrigger);

    const ctx = gsap.context(() => {
      const track = trackRef.current;
      const section = sectionRef.current;
      if (!track || !section) return;

      const getDistance = () =>
        Math.max(0, track.scrollWidth - window.innerWidth);

      const tween = gsap.to(track, {
        x: () => -getDistance(),
        ease: "none",
        scrollTrigger: {
          trigger: section,
          start: "top top",
          end: () => "+=" + getDistance(),
          scrub: 1,
          pin: true,
          anticipatePin: 1,
          invalidateOnRefresh: true,
          onUpdate: (self) => {
            if (progressRef.current) {
              progressRef.current.style.transform = `scaleX(${self.progress})`;
            }
          },
        },
      });

      gsap.utils.toArray<HTMLElement>(".story-media img").forEach((img) => {
        gsap.fromTo(
          img,
          { xPercent: -6 },
          {
            xPercent: 6,
            ease: "none",
            scrollTrigger: {
              trigger: img,
              containerAnimation: tween,
              start: "left right",
              end: "right left",
              scrub: true,
            },
          }
        );
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={sectionRef}
      id="story"
      className={cn("relative bg-charcoal", !reduced && "overflow-hidden")}
    >
      {!reduced && (
        <div className="absolute bottom-0 left-0 z-30 h-px w-full bg-ivory/10">
          <div
            ref={progressRef}
            className="h-full origin-left bg-gradient-to-r from-champagne-dark to-champagne-light"
            style={{ transform: "scaleX(0)" }}
          />
        </div>
      )}

      <div
        className={cn(
          reduced
            ? "block py-24"
            : "flex h-[100svh] items-center overflow-hidden"
        )}
      >
        <div
          ref={trackRef}
          className={cn(
            reduced
              ? "mx-auto flex max-w-5xl flex-col gap-24 px-6"
              : "flex h-full items-center will-change-transform"
          )}
        >
          <div
            className={cn(
              "flex flex-col justify-center",
              reduced
                ? ""
                : "h-full w-[92vw] shrink-0 px-6 sm:w-[52vw] md:w-[46vw] md:px-16"
            )}
          >
            <p className="eyebrow mb-6">The Story</p>
            <h2 className="display text-4xl leading-[0.95] text-ivory sm:text-5xl lg:text-7xl">
              Four chapters,
              <br />
              <span className="italic text-gradient-champagne">
                one conscience.
              </span>
            </h2>
            <p className="mt-8 max-w-md text-ivory/60">
              Scroll to move through the making of an AURÉLIA piece — from the
              soil that grows the fibre to the loop that closes at the end of
              its life.
            </p>
          </div>

          {chapters.map((chapter) => (
            <article
              key={chapter.index}
              className={cn(
                "story-panel flex flex-col items-stretch justify-center gap-6 py-10",
                reduced
                  ? "md:flex-row md:items-center md:gap-8"
                  : "h-full w-[92vw] shrink-0 px-6 sm:w-[68vw] md:w-[62vw] md:flex-row md:items-center md:gap-8 md:px-16"
              )}
            >
              <div
                className={cn(
                  "story-media relative overflow-hidden rounded-[4px] border border-ivory/10",
                  reduced
                    ? "h-[42vh] w-full md:h-[52vh] md:w-1/2"
                    : "h-[36vh] w-full sm:h-[44vh] md:h-[62vh] md:w-1/2"
                )}
              >
                <img
                  src={chapter.image}
                  alt={chapter.title}
                  loading="lazy"
                  className="absolute -inset-x-[12%] inset-y-0 h-full w-[124%] object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-charcoal/80 to-transparent" />
              </div>
              <div
                className={cn(
                  reduced ? "w-full md:w-1/2" : "w-full md:w-1/2"
                )}
              >
                <span className="display text-5xl text-champagne/40 sm:text-6xl md:text-8xl">
                  {chapter.index}
                </span>
                <h3 className="display mt-4 text-2xl text-ivory sm:text-3xl md:mt-6 md:text-5xl">
                  {chapter.title}
                </h3>
                <p className="mt-4 max-w-md text-sm leading-relaxed text-ivory/65 md:mt-6 md:text-base">
                  {chapter.body}
                </p>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
