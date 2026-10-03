import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

/** Constrain a value between min and max. */
export function clamp(value: number, min: number, max: number) {
  return Math.min(Math.max(value, min), max);
}

/** Linear interpolate between two numbers. */
export function lerp(a: number, b: number, t: number) {
  return a + (b - a) * t;
}

/** Map a value from one range to another (optionally clamped). */
export function mapRange(
  value: number,
  inMin: number,
  inMax: number,
  outMin: number,
  outMax: number,
  shouldClamp = true
) {
  const t = (value - inMin) / (inMax - inMin);
  const result = outMin + t * (outMax - outMin);
  return shouldClamp
    ? clamp(result, Math.min(outMin, outMax), Math.max(outMin, outMax))
    : result;
}