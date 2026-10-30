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
};

/** Fades + lifts its content into place the first time it scrolls into view. */
export function Reveal({ children, className, delay = 0, y = 28, as = "div", id }: RevealProps) {
  const Component = motion[as];
  return (
    <Component
      id={id}
      className={className}
      initial={{ opacity: 0, y }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.2, margin: "0px 0px -60px 0px" }}
      transition={{ duration: 0.8, ease: EASE, delay }}
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
  hidden: { opacity: 0, y: 28 },
  show: { opacity: 1, y: 0, transition: { duration: 0.75, ease: EASE } },
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
      viewport={{ once: true, amount: 0.15, margin: "0px 0px -60px 0px" }}
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
 * True once the page has fully loaded (window "load"), so intro animations
 * start after fonts and the hero photo are in. Falls back after `maxWait` ms
 * so content can never stay hidden on a slow connection.
 */
export function useSiteLoaded(maxWait = 2500) {
  const [loaded, setLoaded] = useState(false);
  useEffect(() => {
    if (document.readyState === "complete") {
      // Next frame, so the hidden state paints before animating.
      const frame = requestAnimationFrame(() => setLoaded(true));
      return () => cancelAnimationFrame(frame);
    }
    const done = () => setLoaded(true);
    window.addEventListener("load", done, { once: true });
    const timer = window.setTimeout(done, maxWait);
    return () => {
      window.removeEventListener("load", done);
      window.clearTimeout(timer);
    };
  }, [maxWait]);
  return loaded;
}
