"use client";

import { cn } from "@/lib/utils";

/**
 * Infinite editorial ticker. Content is duplicated so the CSS translate loop
 * (0 -> -50%) is seamless.
 */
export default function Marquee({
  words,
  direction = "left",
  className,
}: {
  words: string[];
  direction?: "left" | "right";
  className?: string;
}) {
  const row = (
    <div className="flex shrink-0 items-center">
      {words.map((word, i) => (
        <div key={i} className="flex items-center">
          <span className="display whitespace-nowrap px-8 text-2xl text-ivory/70 sm:text-3xl md:text-4xl">
            {word}
          </span>
          <span className="text-champagne" aria-hidden="true">
            ✦
          </span>
        </div>
      ))}
    </div>
  );

  return (
    <div
      className={cn(
        "flex w-full overflow-hidden border-y border-ivory/10 py-6",
        className
      )}
    >
      <div
        className={cn(
          "flex min-w-full shrink-0",
          direction === "left"
            ? "animate-marquee"
            : "animate-marquee-reverse"
        )}
        aria-hidden="true"
      >
        {row}
        {row}
      </div>
    </div>
  );
}