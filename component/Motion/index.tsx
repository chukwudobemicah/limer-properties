"use client";

import React, { useEffect, useState } from "react";
import { MotionConfig, motion, type Variants } from "framer-motion";

/** One easing curve for the whole site: quick start, soft landing. */
export const EASE = [0.22, 1, 0.36, 1] as const;

/** Wrap the app once: honours the visitor's "reduce motion" setting. */
export function MotionProvider({ children }: { children: React.ReactNode }) {
  return <MotionConfig reducedMotion="user">{children}</MotionConfig>;
}

type RevealProps = {
  children: React.ReactNode;
  className?: string;
  delay?: number;
  /** Distance to travel up, in px. */
  y?: number;
  as?: "div" | "section" | "li" | "article" | "span";
  id?: string;
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
  const Component = motion[as];
  return (
    <Component
      id={id}
      className={className}
      // `disabled` renders in place with no entrance (e.g. results re-rendering while filtering).
      initial={disabled ? false : { opacity: 0, y }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.15, margin: "0px 0px -40px 0px" }}
      transition={{ duration: 0.7, ease: EASE, delay }}
    >
      {children}
    </Component>
  );
}

const staggerParent: Variants = {
  hidden: {},
  show: (stagger: number = 0.09) => ({ transition: { staggerChildren: stagger } }),
};

export const staggerChild: Variants = {
  hidden: { opacity: 0, y: 20 },
  show: { opacity: 1, y: 0, transition: { duration: 0.7, ease: EASE } },
};

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
  as?: "div" | "ul" | "dl";
}) {
  const Component = motion[as];
  return (
    <Component
      className={className}
      variants={staggerParent}
      custom={stagger}
      initial="hidden"
      whileInView="show"
      viewport={{ once: true, amount: 0.1, margin: "0px 0px -40px 0px" }}
    >
      {children}
    </Component>
  );
}

export function StaggerItem({
  children,
  className,
  as = "div",
}: {
  children: React.ReactNode;
  className?: string;
  as?: "div" | "li" | "article";
}) {
  const Component = motion[as];
  return (
    <Component className={className} variants={staggerChild}>
      {children}
    </Component>
  );
}

/**
 * True once the page's fonts are ready, so intro animations never play in a
 * fallback font and then reshape. Doesn't wait for images (that's what made the
 * hero sit blank). Falls back after `maxWait` ms so nothing can stay hidden.
 */
export function useSiteLoaded(maxWait = 900) {
  const [loaded, setLoaded] = useState(false);
  useEffect(() => {
    let done = false;
    let frame = 0;
    const go = () => {
      if (done) return;
      done = true;
      // Next frame, so the hidden state paints before animating.
      frame = requestAnimationFrame(() => setLoaded(true));
    };
    if (typeof document !== "undefined" && "fonts" in document) {
      document.fonts.ready.then(go);
    } else {
      go();
    }
    const timer = window.setTimeout(go, maxWait);
    return () => {
      window.clearTimeout(timer);
      cancelAnimationFrame(frame);
    };
  }, [maxWait]);
  return loaded;
}
