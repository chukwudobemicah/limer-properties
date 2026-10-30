"use client";

import React, { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { SanityCompanyInfo, SanityProperty } from "@/types/sanity";
import { SearchIcon, WhatsAppIcon } from "@/component/Icons";
import { getWhatsAppUrl } from "@/lib/contact";
import { getAreaName, getLocation, getPropertyPath, getSizeLabel } from "@/lib/property";
import { formatPrice, cn } from "@/utils/functions";

const SEARCH_TABS = [
  { value: "sale", label: "For sale" },
  { value: "rent", label: "Rent" },
  { value: "land", label: "Land" },
  { value: "shortlet", label: "Shortlet" },
] as const;

const BUDGETS = [
  { value: "", label: "Any budget" },
  { value: "10000000", label: "Up to ₦10M" },
  { value: "25000000", label: "Up to ₦25M" },
  { value: "50000000", label: "Up to ₦50M" },
  { value: "100000000", label: "Up to ₦100M" },
  { value: "250000000", label: "Up to ₦250M" },
  { value: "500000000", label: "Up to ₦500M" },
];

interface HomeHeroProps {
  featured?: SanityProperty;
  companyInfo: SanityCompanyInfo | null;
}

export default function HomeHero({ featured, companyInfo }: HomeHeroProps) {
  const router = useRouter();
  const [tab, setTab] = useState<(typeof SEARCH_TABS)[number]["value"]>("sale");
  const [where, setWhere] = useState("");
  const [budget, setBudget] = useState("");

  const handleSearch = (event: React.FormEvent) => {
    event.preventDefault();
    const params = new URLSearchParams({ type: tab });
    if (where.trim()) params.set("search", where.trim());
    if (budget) params.set("maxPrice", budget);
    router.push(`/properties?${params.toString()}`);
  };

  return (
    <section className="mx-auto flex w-full max-w-[1440px] flex-col gap-12 px-5 pt-12 pb-20 md:px-10 lg:flex-row lg:items-stretch lg:gap-14 xl:px-16 xl:pt-[72px] xl:pb-28">
      {/* Copy */}
      <div className="flex flex-col gap-8 lg:w-[56%] lg:shrink-0 xl:w-[700px] xl:pt-10">
        <span className="label-mono text-cobalt">
          <span
            className="mr-2 inline-block h-2 w-2 -translate-y-px rounded-full bg-cobalt align-middle"
            aria-hidden="true"
          />
          Lekki · Ibeju-Lekki · Ogun · Lagos Island
        </span>
        <h1 className="text-[52px] leading-[52px] font-extrabold tracking-[-0.035em] text-ink sm:text-[72px] sm:leading-[72px] xl:text-[88px] xl:leading-[88px]">
          Verified land and homes across Lagos.
        </h1>
        <p className="max-w-[520px] text-[17px] leading-[28px] text-graphite sm:text-[19px] sm:leading-[30px]">
          We check the title, walk the plot and stand behind every listing — then
          manage the property for you once it&apos;s yours.
        </p>

        {/* Search */}
        <form
          onSubmit={handleSearch}
          className="mt-2 flex w-full max-w-[640px] flex-col border-[1.5px] border-ink"
          role="search"
        >
          <div className="flex overflow-x-auto border-b border-rule" role="tablist">
            {SEARCH_TABS.map((item) => (
              <button
                key={item.value}
                type="button"
                role="tab"
                aria-selected={tab === item.value}
                onClick={() => setTab(item.value)}
                className={cn(
                  "shrink-0 px-[22px] py-3.5 font-mono text-[12px] tracking-[0.12em] uppercase transition-colors",
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
            <label className="flex flex-col gap-1 border-b border-rule px-[22px] py-4 sm:w-[180px] sm:shrink-0 sm:border-b-0">
              <span className="field-label">Budget</span>
              <select
                value={budget}
                onChange={(event) => setBudget(event.target.value)}
                className="appearance-none bg-transparent text-[17px] text-ink outline-none"
              >
                {BUDGETS.map((option) => (
                  <option key={option.label} value={option.value}>
                    {option.label}
                  </option>
                ))}
              </select>
            </label>
            <button
              type="submit"
              className="flex items-center justify-center gap-2.5 bg-cobalt px-7 py-4 text-[16px] font-semibold text-white transition-colors hover:bg-[#1a32b8]"
            >
              <SearchIcon size={18} color="#FFFFFF" />
              Search
            </button>
          </div>
        </form>

        <a
          href={getWhatsAppUrl(undefined, companyInfo)}
          target="_blank"
          rel="noopener noreferrer"
          className="group flex flex-wrap items-center gap-3 text-[16px] text-graphite"
        >
          <WhatsAppIcon size={20} color="#1FAF55" />
          Rather just ask?
          <span className="font-semibold text-ink underline group-hover:text-cobalt">
            Chat with an advisor on WhatsApp
          </span>
        </a>
      </div>

      {/* Image + plot tag */}
      <div className="relative min-h-[360px] flex-1 bg-mist sm:min-h-[480px] lg:min-h-0">
        <Image
          src="https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?w=1600&q=80"
          alt="Modern detached home with a pool"
          fill
          priority
          sizes="(min-width: 1024px) 40vw, 100vw"
          className="object-cover"
        />
        {featured && <PlotTag property={featured} />}
      </div>
    </section>
  );
}

function PlotTag({ property }: { property: SanityProperty }) {
  return (
    <Link
      href={getPropertyPath(property)}
      className="absolute right-4 bottom-4 left-4 flex flex-col gap-2.5 border border-ink bg-white px-[22px] py-5 transition-transform hover:-translate-y-0.5 sm:right-auto sm:w-[280px] lg:-left-10 lg:bottom-10"
    >
      <div className="flex items-center justify-between gap-3">
        <span className="truncate font-mono text-[11px] tracking-[0.12em] whitespace-nowrap uppercase text-cobalt">
          {property.documentTitle ? `Verified · ${property.documentTitle}` : "Featured"}
        </span>
        <span className="truncate font-mono text-[11px] tracking-[0.08em] text-graphite">
          {getAreaName(property.location)}
        </span>
      </div>
      <span className="line-clamp-2 text-[20px] leading-6 font-bold tracking-[-0.01em] text-ink">
        {property.title}
      </span>
      <span className="sr-only">{getLocation(property.location)}</span>
      <div className="flex items-baseline justify-between border-t border-rule pt-2.5">
        <span className="font-mono text-[12px] text-graphite">{getSizeLabel(property)}</span>
        <span className="text-[18px] font-bold text-ink">{formatPrice(property.price)}</span>
      </div>
    </Link>
  );
}
