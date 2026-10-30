"use client";

import React, { useEffect, useRef, useState } from "react";
import { useInView } from "framer-motion";
import { cn, formatPrice } from "@/utils/functions";

const REEL = "01234567890123456789";

/**
 * A price whose digits spin up like slot-machine reels and settle left to right.
 * framer-motion only tells us when it's on screen; the spin itself is a CSS
 * transform transition, latched with data-rolled so re-renders never replay it.
 */
export default function RollingPrice({
  price,
  className,
  delay = 0.1,
  play = true,
}: {
  price: number;
  className?: string;
  delay?: number;
  /** Hold the spin until this turns true (e.g. after the hero intro). */
  play?: boolean;
}) {
  const text = formatPrice(price);
  const ref = useRef<HTMLSpanElement>(null);
  const inView = useInView(ref, { once: true, amount: 0.5 });
  const [rolled, setRolled] = useState(false);

  useEffect(() => {
    if (!inView || !play || rolled) return;
    const frame = requestAnimationFrame(() => setRolled(true));
    return () => cancelAnimationFrame(frame);
  }, [inView, play, rolled]);

  const digitCount = text.replace(/\D/g, "").length;
  // Keep the whole thing short: reels stop within ~0.3s of each other.
  const step = Math.min(0.045, 0.3 / Math.max(digitCount, 1));
  let digitIndex = 0;

  return (
    <span ref={ref} className={cn("roll", className)} data-rolled={rolled || undefined}>
      <span className="sr-only">{text}</span>
      <span aria-hidden="true">
        {Array.from(text).map((char, index) => {
          if (!/\d/.test(char)) return <span key={index}>{char}</span>;
          const digit = Number(char);
          const order = digitIndex++;
          return (
            <span
              key={index}
              className="roll-digit"
              style={
                {
                  "--to": `${-(10 + digit) * 5}%`,
                  "--roll-delay": `${delay + order * step}s`,
                } as React.CSSProperties
              }
            >
              <span className="roll-ghost">{char}</span>
              <span className="roll-col">
                {Array.from(REEL).map((reelDigit, reelIndex) => (
                  <span key={reelIndex}>{reelDigit}</span>
                ))}
              </span>
            </span>
          );
        })}
      </span>
    </span>
  );
}
