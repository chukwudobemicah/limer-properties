"use client";

import React, { useEffect, useState } from "react";

type Phase = "loading" | "finishing" | "leaving" | "gone";

const MIN_VISIBLE = 1100; // long enough for the logo reveal to read
const MAX_WAIT = 1800; // never hold a slow connection hostage
const SESSION_KEY = "limer-intro";

/** Tells the hero (and anything else) that the page is on show. */
function announceReady() {
  (window as unknown as { __limerReady?: boolean }).__limerReady = true;
  window.dispatchEvent(new Event("limer:ready"));
}

/**
 * Branded loading screen on the first visit of a session: the logo wipes in,
 * a line fills as the page loads, then the panel lifts away. Rendered in the
 * server HTML so it covers the page from the first paint; an inline script in
 * <head> hides it straight away on later loads in the same session.
 */
export default function SiteLoader() {
  const [phase, setPhase] = useState<Phase>("loading");

  useEffect(() => {
    const html = document.documentElement;
    if (html.dataset.loader === "skip" || html.dataset.loader === "failsafe") {
      announceReady();
      setPhase("gone");
      return;
    }

    const timers: number[] = [];
    const later = (fn: () => void, ms: number) => timers.push(window.setTimeout(fn, ms));
    const start = performance.now();
    let cancelled = false;

    const fonts = "fonts" in document ? document.fonts.ready : Promise.resolve();
    const pageLoaded =
      document.readyState === "complete"
        ? Promise.resolve()
        : new Promise<void>((resolve) => window.addEventListener("load", () => resolve(), { once: true }));
    const cap = new Promise<void>((resolve) => later(resolve, MAX_WAIT));

    Promise.race([Promise.all([fonts, pageLoaded]), cap]).then(() => {
      if (cancelled) return;
      later(() => {
        setPhase("finishing");
        later(() => {
          setPhase("leaving");
          html.dataset.loader = "done";
          try {
            sessionStorage.setItem(SESSION_KEY, "1");
          } catch {
            /* private mode: show it again next time, no harm */
          }
          later(announceReady, 250);
          later(() => setPhase("gone"), 950);
        }, 380);
      }, Math.max(0, MIN_VISIBLE - (performance.now() - start)));
    });

    return () => {
      cancelled = true;
      timers.forEach(window.clearTimeout);
    };
  }, []);

  if (phase === "gone") return null;

  return (
    <div id="site-loader" data-phase={phase} aria-hidden="true">
      <div className="loader-inner">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src="/images/limer-logo-white.svg"
          alt=""
          width={600}
          height={139}
          className="loader-logo"
          fetchPriority="high"
        />
        <div className="loader-bar">
          <span className="loader-bar-run" />
          <span className="loader-bar-end" />
        </div>
        <span className="loader-tag">Your property, our priority</span>
      </div>
    </div>
  );
}

/** Inline in <head>: decide before first paint whether the loader shows. */
// The 8s failsafe hides the screen even if the site's JavaScript never runs.
export const LOADER_SCRIPT = `(function(){var d=document.documentElement,s="on";try{if(sessionStorage.getItem("${SESSION_KEY}"))s="skip"}catch(e){}d.setAttribute("data-loader",s);setTimeout(function(){if(d.getAttribute("data-loader")==="on")d.setAttribute("data-loader","failsafe")},8000)})()`;
