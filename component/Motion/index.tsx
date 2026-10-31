"use client";

import React, { useEffect, useRef, useState } from "react";
import { MotionConfig, useInView } from "framer-motion";
import { cn } from "@/utils/functions";

/** One easing curve for the whole site: quick start, soft landing. */
export const EASE = [0.22, 1, 0.36, 1] as const;

/** Wrap the app once: honours the visitor's "reduce motion" setting (gallery, toasts). */
export function MotionProvider({ children }: { children: React.ReactNode }) {
  return <MotionConfig reducedMotion="user">{children}</MotionConfig>;
}

/*
 * How the scroll animations work
 * ------------------------------
 * framer-motion's `useInView` decides WHEN something is on screen; the movement
 * itself is a CSS transition (see `.reveal` in globals.css). The CSS runs on the
 * browser's compositor, so it stays smooth while the page is busy loading data,
 * and because it's driven by a data attribute that only ever flips once, React
 * re-renders can never restart or flicker it.
 */

const VIEWPORT = { once: true, amount: 0.15, margin: "0px 0px -40px 0px" } as const;

type Tag = "div" | "section" | "li" | "article" | "span" | "ul" | "dl";

type RevealProps = {
  children: React.ReactNode;
  className?: string;
  /** Seconds to wait once in view. */
  delay?: number;
  /** Distance to travel up, in px. */
  y?: number;
  as?: Tag;
  id?: string;
  /** Show immediately with no entrance (e.g. results re-rendering while filtering). */
  disabled?: boolean;
};

/** Fades + lifts its content into place the first time it scrolls into view. */
export function Reveal({
  children,
  className,
  delay = 0,
  y = 20,
  as = "div",
  id,
  disabled = false,
}: RevealProps) {
  const ref = useRef<HTMLElement>(null);
  const inView = useInView(ref, VIEWPORT);
  // Latch: once shown (or disabled at first render) it stays shown forever.
  const [shown, setShown] = useState(disabled);
  useEffect(() => {
    if (inView) setShown(true);
  }, [inView]);

  return React.createElement(
    as,
    {
      ref,
      id,
      className: cn("reveal", className),
      "data-shown": shown || undefined,
      style: { "--reveal-delay": `${delay}s`, "--reveal-y": `${y}px` } as React.CSSProperties,
    },
    children,
  );
}

const StaggerContext = React.createContext(false);

/** Parent that reveals its <StaggerItem> children one after another. */
export function Stagger({
  children,
  className,
  stagger = 0.09,
  as = "div",
}: {
  children: React.ReactNode;
  className?: string;
  stagger?: number;
  as?: Tag;
}) {
  const ref = useRef<HTMLElement>(null);
  const inView = useInView(ref, { ...VIEWPORT, amount: 0.1 });
  const [shown, setShown] = useState(false);
  useEffect(() => {
    if (inView) setShown(true);
  }, [inView]);

  // Give each item its position so CSS can delay it (index × stagger).
  let index = 0;
  const items = React.Children.map(children, (child) =>
    React.isValidElement(child) && child.type === StaggerItem
      ? React.cloneElement(child as React.ReactElement<StaggerItemProps>, {
          delay: index++ * stagger,
        })
      : child,
  );

  return React.createElement(
    as,
    { ref, className },
    <StaggerContext.Provider value={shown}>{items}</StaggerContext.Provider>,
  );
}

type StaggerItemProps = {
  children: React.ReactNode;
  className?: string;
  as?: Tag;
  /** Set by <Stagger>. */
  delay?: number;
};

export function StaggerItem({ children, className, as = "div", delay = 0 }: StaggerItemProps) {
  const shown = React.useContext(StaggerContext);
  return React.createElement(
    as,
    {
      className: cn("reveal", className),
      "data-shown": shown || undefined,
      style: { "--reveal-delay": `${delay}s` } as React.CSSProperties,
    },
    children,
  );
}

/**
 * True once the page's fonts are ready, so intro animations never play in a
 * fallback font and then reshape. Doesn't wait for images. Falls back after
 * `maxWait` ms so nothing can stay hidden.
 */
/**
 * True once the page is on show: after the loading screen lifts (first visit),
 * or once fonts are ready (later visits). Capped so nothing waits forever.
 */
export function useSiteLoaded(maxWait = 3500) {
  const [loaded, setLoaded] = useState(false);
  useEffect(() => {
    let done = false;
    let frame = 0;
    const timers: number[] = [];
    const go = () => {
      if (done) return;
      done = true;
      // Next frame, so the hidden state paints before animating.
      frame = requestAnimationFrame(() => setLoaded(true));
    };
    const onReady = () => {
      if ("fonts" in document) document.fonts.ready.then(go);
      else go();
      timers.push(window.setTimeout(go, 900));
    };
    if ((window as unknown as { __limerReady?: boolean }).__limerReady) onReady();
    else window.addEventListener("limer:ready", onReady, { once: true });
    timers.push(window.setTimeout(go, maxWait));
    return () => {
      window.removeEventListener("limer:ready", onReady);
      timers.forEach(window.clearTimeout);
      cancelAnimationFrame(frame);
    };
  }, [maxWait]);
  return loaded;
}
