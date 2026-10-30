"use client";

import React, { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { SanityCompanyInfo, SanityProperty } from "@/types/sanity";
import { ArrowRightIcon, WhatsAppIcon } from "@/component/Icons";
import { useSiteLoaded } from "@/component/Motion";
import { getWhatsAppUrl } from "@/lib/contact";
import {
  PRICE_SUGGESTIONS,
  formatNaira,
  getAreaName,
  getLocation,
  getPropertyPath,
  getSizeLabel,
  parsePrice,
} from "@/lib/property";
import { formatPrice, cn } from "@/utils/functions";

const SEARCH_TABS = [
  { value: "sale", label: "For sale", phrase: "a property to buy" },
  { value: "rent", label: "Rent", phrase: "a home to rent" },
  { value: "land", label: "Land", phrase: "land to buy" },
  { value: "shortlet", label: "Shortlet", phrase: "a shortlet" },
] as const;

type TabValue = (typeof SEARCH_TABS)[number]["value"];

const HEADLINE = "Verified land and homes across Lagos.";

interface HomeHeroProps {
  featured?: SanityProperty;
  companyInfo: SanityCompanyInfo | null;
}

/** WhatsApp message built from what the visitor picked in the search box. */
export function buildRequestMessage(tab: TabValue, where: string, budget: string): string {
  const phrase = SEARCH_TABS.find((item) => item.value === tab)?.phrase ?? "a property";
  const maxPrice = parsePrice(budget);
  const parts = [`Hello Limer! I'm looking for ${phrase}`];
  if (where.trim()) parts.push(` in ${where.trim()}`);
  if (maxPrice) parts.push(`, with a budget of up to ${formatNaira(maxPrice)}`);
  parts.push(". Please send me the options you have available.");
  return parts.join("");
}

export default function HomeHero({ featured, companyInfo }: HomeHeroProps) {
  const loaded = useSiteLoaded();
  const [tab, setTab] = useState<TabValue>("sale");
  const [where, setWhere] = useState("");
  const [budget, setBudget] = useState("");
  const [photoReady, setPhotoReady] = useState(false);
  // Safety net: never leave the photo hidden if the load event was missed (e.g. cached).
  useEffect(() => {
    const timer = window.setTimeout(() => setPhotoReady(true), 2500);
    return () => window.clearTimeout(timer);
  }, []);

  const handleMessage = (event: React.FormEvent) => {
    event.preventDefault();
    window.open(
      getWhatsAppUrl(buildRequestMessage(tab, where, budget), companyInfo),
      "_blank",
      "noopener,noreferrer",
    );
  };

  // Same filters, for people who'd rather browse than message.
  const browseParams = new URLSearchParams({ type: tab });
  if (where.trim()) browseParams.set("search", where.trim());
  const maxPrice = parsePrice(budget);
  if (maxPrice) browseParams.set("maxPrice", String(maxPrice));

  /** Intro delay for an element (CSS keyframes in globals.css, started by data-ready). */
  const delay = (seconds: number) => ({ "--d": `${seconds}s` }) as React.CSSProperties;

  return (
    <section
      data-ready={loaded || undefined}
      className="mx-auto flex w-full max-w-[1440px] flex-col gap-9 px-5 pb-16 sm:gap-12 md:px-10 lg:flex-row lg:items-stretch lg:gap-14 lg:pt-12 lg:pb-20 xl:px-16 xl:pt-[72px] xl:pb-28">
      {/* Copy — sits below the photo on phones, left of it on desktop */}
      <div className="order-2 flex flex-col gap-6 sm:gap-8 lg:order-1 lg:w-[56%] lg:shrink-0 xl:w-[700px] xl:pt-10">
        <span
          style={delay(0.15)}
          className="intro label-mono text-cobalt max-sm:text-[10.5px] max-sm:tracking-[0.1em]"
        >
          <span
            className="mr-2 inline-block h-2 w-2 -translate-y-px rounded-full bg-cobalt align-middle"
            aria-hidden="true"
          />
          Lekki · Ibeju-Lekki · Ogun · Lagos Island
        </span>

        <h1
          aria-label={HEADLINE}
          className="text-[clamp(2.75rem,12vw,5.25rem)] leading-[0.98] font-serif font-normal tracking-[-0.015em] text-balance text-ink lg:text-[min(7vw,104px)] lg:leading-[0.95]"
        >
          {HEADLINE.split(" ").map((word, index) => (
            <React.Fragment key={index}>
              <span aria-hidden="true" className="-mb-[0.12em] inline-block overflow-hidden pb-[0.12em] align-top">
                <span
                  className={word === "Lagos." ? "intro-word italic" : "intro-word"}
                  style={delay(0.25 + index * 0.06)}
                >
                  {word}
                </span>
              </span>
              {index < HEADLINE.split(" ").length - 1 && " "}
            </React.Fragment>
          ))}
        </h1>

        <p
          style={delay(0.65)}
          className="intro max-w-[560px] text-[16px] leading-[26px] text-graphite sm:text-[18px] sm:leading-[30px]"
        >
          We check the title, walk the plot and stand behind every listing — then manage the
          property for you once it&apos;s yours.
        </p>

        {/* Request box → WhatsApp */}
        <form
          style={delay(0.8)}
          onSubmit={handleMessage}
          className="intro mt-2 flex w-full max-w-[640px] flex-col border-[1.5px] border-ink"
          aria-label="Tell us what you're looking for"
        >
          <div className="flex border-b border-rule" role="tablist">
            {SEARCH_TABS.map((item) => (
              <button
                key={item.value}
                type="button"
                role="tab"
                aria-selected={tab === item.value}
                onClick={() => setTab(item.value)}
                className={cn(
                  "flex-1 px-2 py-3.5 font-mono text-[11px] tracking-[0.1em] uppercase transition-colors sm:flex-none sm:px-[22px] sm:text-[12px] sm:tracking-[0.12em]",
                  tab === item.value ? "bg-ink text-white" : "text-graphite hover:text-ink",
                )}
              >
                {item.label}
              </button>
            ))}
          </div>
          <div className="flex flex-col sm:flex-row sm:items-stretch">
            <label className="flex flex-1 flex-col gap-1 border-b border-rule px-[22px] py-4 sm:border-r sm:border-b-0">
              <span className="field-label">Where</span>
              <input
                value={where}
                onChange={(event) => setWhere(event.target.value)}
                placeholder="Sangotedo, Abijo, Ajah…"
                className="bg-transparent text-[17px] text-ink outline-none placeholder:text-ink"
              />
            </label>
            <label className="flex flex-col gap-1 border-b border-rule px-[22px] py-4 sm:w-[200px] sm:shrink-0 sm:border-b-0">
              <span className="field-label">Max budget</span>
              <input
                value={budget}
                onChange={(event) => setBudget(event.target.value)}
                onBlur={() => {
                  const value = parsePrice(budget);
                  if (value) setBudget(formatNaira(value));
                }}
                inputMode="decimal"
                list="hero-budget-suggestions"
                placeholder="Any, e.g. ₦50M"
                className="w-full min-w-0 bg-transparent text-[17px] text-ink outline-none placeholder:text-graphite"
              />
              <datalist id="hero-budget-suggestions">
                {PRICE_SUGGESTIONS.map((suggestion) => (
                  <option key={suggestion} value={suggestion} />
                ))}
              </datalist>
            </label>
            <button
              type="submit"
              className="flex items-center justify-center gap-2.5 bg-wa px-7 py-4 text-[16px] font-semibold text-white transition-opacity hover:opacity-90"
            >
              <WhatsAppIcon size={18} color="#FFFFFF" />
              Message
            </button>
          </div>
        </form>

        <div className="intro" style={delay(0.95)}>
          <Link
            href={`/properties?${browseParams.toString()}`}
            className="group inline-flex flex-wrap items-center gap-2 text-[16px] text-graphite"
          >
            Prefer to browse first?
            <span className="inline-flex items-center gap-1.5 font-semibold text-ink underline group-hover:text-cobalt">
              See matching listings
              <ArrowRightIcon size={14} />
            </span>
          </Link>
        </div>
      </div>

      {/* Photo — full-bleed at the very top on phones; fades in once loaded */}
      <div className="relative order-1 -mx-5 h-[300px] sm:h-[420px] md:-mx-10 lg:order-2 lg:mx-0 lg:h-auto lg:flex-1">
        <div className="absolute inset-0 overflow-hidden bg-mist">
          <div className="hero-photo absolute inset-0" data-shown={(loaded && photoReady) || undefined}>
            <Image
              onLoad={() => setPhotoReady(true)}
              src="https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?w=1600&q=80"
              alt="Modern detached home with a pool"
              fill
              priority
              sizes="(min-width: 1024px) 40vw, 100vw"
              className="object-cover"
            />
          </div>
        </div>
        {featured && (
          // Positioned wrapper (not the link) so the slide-in transform can't move its anchor.
          <div
            style={delay(0.6)}
            className="intro-slide absolute right-4 bottom-4 left-4 sm:right-auto sm:w-[280px] md:left-10 lg:-left-10 lg:bottom-10"
          >
            <PlotTag property={featured} />
          </div>
        )}
      </div>
    </section>
  );
}

function PlotTag({ property }: { property: SanityProperty }) {
  const label = property.documentTitle ? `Verified · ${property.documentTitle}` : "Featured";

  return (
    <Link
      href={getPropertyPath(property)}
      className="block border border-ink bg-white transition-transform hover:-translate-y-0.5"
    >
      {/* Phones: one slim strip so the photo stays visible */}
      <span className="flex items-center gap-3 px-4 py-3 sm:hidden">
        <span className="flex min-w-0 flex-1 flex-col gap-0.5">
          <span className="font-mono text-[10px] tracking-[0.12em] uppercase text-cobalt">
            {label} · {getAreaName(property.location)}
          </span>
          <span className="truncate text-[15px] font-bold text-ink">{property.title}</span>
        </span>
        <span className="shrink-0 text-[15px] font-bold text-ink">{formatPrice(property.price)}</span>
      </span>

      {/* Tablet and up: the full plot sheet */}
      <span className="hidden flex-col gap-2.5 px-[22px] py-5 sm:flex">
        <span className="flex items-center justify-between gap-3">
          <span className="truncate font-mono text-[11px] tracking-[0.12em] whitespace-nowrap uppercase text-cobalt">
            {label}
          </span>
          <span className="truncate font-mono text-[11px] tracking-[0.08em] text-graphite">
            {getAreaName(property.location)}
          </span>
        </span>
        <span className="line-clamp-2 text-[20px] leading-6 font-bold tracking-[-0.01em] text-ink">
          {property.title}
        </span>
        <span className="sr-only">{getLocation(property.location)}</span>
        <span className="flex items-baseline justify-between border-t border-rule pt-2.5">
          <span className="font-mono text-[12px] text-graphite">{getSizeLabel(property)}</span>
          <span className="text-[18px] font-bold text-ink">{formatPrice(property.price)}</span>
        </span>
      </span>
    </Link>
  );
}
