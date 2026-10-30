"use client";

import React, { Suspense, useEffect, useMemo, useState } from "react";
import { useSearchParams } from "next/navigation";
import ListingRow, { ListingRowSkeleton } from "@/component/ListingRow";
import RequestBanner from "@/component/RequestBanner";
import { Reveal } from "@/component/Motion";
import { ChevronDownIcon } from "@/component/Icons";
import { useSanityProperties } from "@/hooks/useSanityProperties";
import { useSanityCompanyInfo } from "@/hooks/useSanityCompanyInfo";
import {
  PROPERTY_TABS,
  PropertyTab,
  getAreaName,
  getLocation,
  getTypeSlug,
  PRICE_SUGGESTIONS,
  formatNaira,
  matchesTab,
  parsePrice,
  tabFromParam,
} from "@/lib/property";
import { cn } from "@/utils/functions";


const SIZE_OPTIONS = [
  { value: "any", label: "Any size", min: 0, max: Infinity },
  { value: "0-500", label: "Under 500 m²", min: 0, max: 500 },
  { value: "500-1000", label: "500 – 1,000 m²", min: 500, max: 1000 },
  { value: "1000+", label: "Over 1,000 m²", min: 1000, max: Infinity },
];

const SORT_OPTIONS = [
  { value: "newest", label: "Newest first" },
  { value: "price-asc", label: "Price: low to high" },
  { value: "price-desc", label: "Price: high to low" },
];

function PropertiesContent() {
  const searchParams = useSearchParams();
  const { properties, loading } = useSanityProperties();
  const { companyInfo } = useSanityCompanyInfo();

  const [tab, setTab] = useState<PropertyTab>("all");
  const [location, setLocation] = useState("all");
  const [searchTerm, setSearchTerm] = useState("");
  const [minPriceText, setMinPriceText] = useState("");
  const [maxPriceText, setMaxPriceText] = useState("");
  const [size, setSize] = useState("any");
  const [sort, setSort] = useState("newest");

  // Apply ?type=, ?search= (or legacy ?location=) and ?maxPrice= from links/search.
  useEffect(() => {
    setTab(tabFromParam(searchParams.get("type")));
    const term = searchParams.get("search") || searchParams.get("location") || "";
    setSearchTerm(term);
    setLocation(term ? "search" : "all");
    const min = Number(searchParams.get("minPrice"));
    const max = Number(searchParams.get("maxPrice"));
    setMinPriceText(min > 0 ? formatNaira(min) : "");
    setMaxPriceText(max > 0 ? formatNaira(max) : "");
  }, [searchParams]);

  const minPrice = parsePrice(minPriceText);
  const maxPrice = parsePrice(maxPriceText);
  const priceInvalid = minPrice !== null && maxPrice !== null && minPrice > maxPrice;

  const areaOptions = useMemo(() => {
    const areas = new Set(
      properties.map((property) => getAreaName(property.location)).filter((area) => area !== "—"),
    );
    return Array.from(areas).sort();
  }, [properties]);

  const tabCounts = useMemo(() => {
    const counts = Object.fromEntries(PROPERTY_TABS.map((item) => [item.value, 0])) as Record<
      PropertyTab,
      number
    >;
    for (const property of properties) {
      const slug = getTypeSlug(property.propertyType);
      for (const item of PROPERTY_TABS) if (matchesTab(slug, item.value)) counts[item.value] += 1;
    }
    return counts;
  }, [properties]);

  const results = useMemo(() => {
    // If min and max are swapped, read them the way the person meant.
    const low = Math.min(minPrice ?? 0, maxPrice ?? Infinity);
    const high = Math.max(minPrice ?? 0, maxPrice ?? Infinity);
    const priceRange = priceInvalid ? { min: low, max: high } : { min: minPrice ?? 0, max: maxPrice ?? Infinity };
    const sizeRange = SIZE_OPTIONS.find((option) => option.value === size) ?? SIZE_OPTIONS[0];
    const term = searchTerm.trim().toLowerCase();

    const filtered = properties.filter((property) => {
      if (!matchesTab(getTypeSlug(property.propertyType), tab)) return false;

      if (location === "search" && term) {
        const haystack = `${property.title} ${getLocation(property.location)}`.toLowerCase();
        if (!haystack.includes(term)) return false;
      } else if (location !== "all" && location !== "search") {
        if (getAreaName(property.location) !== location) return false;
      }

      if (property.price < priceRange.min || property.price > priceRange.max) return false;

      if (size !== "any") {
        if (!property.area) return false;
        if (property.area < sizeRange.min || property.area > sizeRange.max) return false;
      }
      return true;
    });

    return filtered.sort((a, b) => {
      if (sort === "price-asc") return a.price - b.price;
      if (sort === "price-desc") return b.price - a.price;
      return (
        new Date(b.publishedAt || b._createdAt).getTime() -
        new Date(a.publishedAt || a._createdAt).getTime()
      );
    });
  }, [properties, tab, location, searchTerm, minPrice, maxPrice, priceInvalid, size, sort]);

  const resetFilters = () => {
    setTab("all");
    setLocation("all");
    setSearchTerm("");
    setMinPriceText("");
    setMaxPriceText("");
    setSize("any");
    setSort("newest");
  };

  const locationSelectOptions = [
    { value: "all", label: "All of Lagos & Ogun" },
    ...(searchTerm ? [{ value: "search", label: `“${searchTerm}”` }] : []),
    ...areaOptions.map((area) => ({ value: area, label: area })),
  ];


  return (
    <div className="min-h-screen bg-white">
      {/* Page header */}
      <section className="mx-auto flex w-full max-w-[1440px] flex-col gap-6 px-5 pt-16 pb-12 md:px-10 lg:flex-row lg:items-end lg:justify-between xl:px-16 xl:pt-[88px]">
        <Reveal className="flex flex-col gap-5">
          <span className="label-mono text-cobalt">
            Properties · {loading ? "…" : properties.length} available
          </span>
          <h1 className="text-[clamp(2.875rem,10.5vw,5.75rem)] leading-[0.95] font-serif font-normal tracking-[-0.015em] text-balance text-ink">
            Every listing, checked.
          </h1>
        </Reveal>
        <Reveal delay={0.12}>
          <p className="max-w-[400px] pb-1.5 text-[18px] leading-7 text-graphite">
            Land, homes and shortlets across Lagos and Ogun — each one inspected by our team
            before it&apos;s listed.
          </p>
        </Reveal>
      </section>

      {/* Filters */}
      <section className="mx-auto w-full max-w-[1440px] px-5 md:px-10 xl:px-16">
        <div className="flex gap-4 overflow-x-auto border-b border-rule sm:gap-8" role="tablist">
          {PROPERTY_TABS.map((item) => (
            <button
              key={item.value}
              type="button"
              role="tab"
              aria-selected={tab === item.value}
              onClick={() => setTab(item.value)}
              className={cn(
                "-mb-px flex shrink-0 items-baseline border-b-2 pb-4 text-[15px] transition-colors sm:text-[16px]",
                tab === item.value
                  ? "border-ink font-semibold text-ink"
                  : "border-transparent text-graphite hover:text-ink",
              )}
            >
              {item.label}
              <span className="pl-1.5 font-mono text-[12px] font-normal text-graphite">
                {loading ? "" : tabCounts[item.value]}
              </span>
            </button>
          ))}
        </div>

        <div className="grid grid-cols-2 border-b-[1.5px] border-ink lg:grid-cols-4">
          <FilterSelect
            label="Location"
            value={location}
            onChange={setLocation}
            options={locationSelectOptions}
            className="pl-0 max-lg:col-span-2 max-lg:border-r-0 max-lg:border-b"
          />
          <PriceField
            minText={minPriceText}
            maxText={maxPriceText}
            onMinChange={setMinPriceText}
            onMaxChange={setMaxPriceText}
            swapped={priceInvalid}
            className="max-lg:col-span-2 max-lg:border-r-0 max-lg:border-b max-lg:pl-0"
          />
          <FilterSelect label="Plot size" value={size} onChange={setSize} options={SIZE_OPTIONS} className="max-lg:pl-0" />
          <FilterSelect label="Sort by" value={sort} onChange={setSort} options={SORT_OPTIONS} className="border-r-0" />
        </div>
      </section>

      {/* Results */}
      <section className="mx-auto w-full max-w-[1440px] px-5 md:px-10 xl:px-16">
        {loading ? (
          Array.from({ length: 3 }).map((_, index) => <ListingRowSkeleton key={index} />)
        ) : results.length > 0 ? (
          results.map((property) => (
            <Reveal key={property._id} y={32}>
              <ListingRow property={property} companyInfo={companyInfo} />
            </Reveal>
          ))
        ) : (
          <div className="flex flex-col items-start gap-4 border-b border-rule py-16">
            <p className="text-[24px] font-bold tracking-[-0.01em] text-ink">
              No listings match these filters yet.
            </p>
            <p className="max-w-[520px] text-[17px] leading-[26px] text-graphite">
              Try a wider search — or tell us what you need below and we&apos;ll find it for you.
            </p>
            <button
              type="button"
              onClick={resetFilters}
              className="border-b-[1.5px] border-ink pb-1 text-[16px] font-semibold text-ink hover:text-cobalt"
            >
              Clear all filters
            </button>
          </div>
        )}
      </section>

      <section className="mx-auto w-full max-w-[1440px] px-5 pt-24 pb-28 md:px-10 xl:px-16 xl:pb-32">
        <Reveal>
          <RequestBanner companyInfo={companyInfo} />
        </Reveal>
      </section>
    </div>
  );
}

function FilterSelect({
  label,
  value,
  onChange,
  options,
  className,
}: {
  label: string;
  value: string;
  onChange: (value: string) => void;
  options: { value: string; label: string }[];
  className?: string;
}) {
  const id = `filter-${label.toLowerCase().replace(/\s+/g, "-")}`;
  return (
    <div className={cn("relative flex flex-col gap-1 border-r border-rule px-6 py-[18px]", className)}>
      <label htmlFor={id} className="field-label">
        {label}
      </label>
      <select
        id={id}
        value={value}
        onChange={(event) => onChange(event.target.value)}
        className="w-full appearance-none bg-transparent pr-6 text-[16px] text-ink outline-none"
      >
        {options.map((option) => (
          <option key={option.value} value={option.value}>
            {option.label}
          </option>
        ))}
      </select>
      <ChevronDownIcon
        size={12}
        className="pointer-events-none absolute right-6 bottom-[22px] text-graphite"
      />
    </div>
  );
}

function PriceField({
  minText,
  maxText,
  onMinChange,
  onMaxChange,
  swapped,
  className,
}: {
  minText: string;
  maxText: string;
  onMinChange: (value: string) => void;
  onMaxChange: (value: string) => void;
  swapped: boolean;
  className?: string;
}) {
  // Tidy "40m" -> "₦40,000,000" when the person leaves the box.
  const tidy = (text: string, set: (value: string) => void) => {
    const value = parsePrice(text);
    if (value !== null) set(formatNaira(value));
  };

  const inputClass =
    "w-full min-w-0 bg-transparent text-[16px] text-ink outline-none placeholder:text-graphite focus:placeholder:text-placeholder";

  return (
    <div className={cn("flex flex-col gap-1 border-r border-rule px-6 py-[18px]", className)}>
      <div className="flex items-baseline justify-between gap-2">
        <label htmlFor="filter-price-min" className="field-label">
          Price (₦)
        </label>
        {swapped && (
          <span className="font-mono text-[10px] tracking-[0.08em] text-cobalt uppercase">
            Min &gt; max — swapped
          </span>
        )}
      </div>
      <div className="flex items-center gap-2">
        <input
          id="filter-price-min"
          aria-label="Minimum price"
          inputMode="decimal"
          list="price-suggestions"
          placeholder="Min"
          value={minText}
          onChange={(event) => onMinChange(event.target.value)}
          onBlur={() => tidy(minText, onMinChange)}
          className={inputClass}
        />
        <span className="shrink-0 text-graphite" aria-hidden="true">
          –
        </span>
        <input
          aria-label="Maximum price"
          inputMode="decimal"
          list="price-suggestions"
          placeholder="Max"
          value={maxText}
          onChange={(event) => onMaxChange(event.target.value)}
          onBlur={() => tidy(maxText, onMaxChange)}
          className={inputClass}
        />
        {(minText || maxText) && (
          <button
            type="button"
            onClick={() => {
              onMinChange("");
              onMaxChange("");
            }}
            className="shrink-0 font-mono text-[11px] tracking-[0.08em] text-graphite uppercase hover:text-ink"
            aria-label="Clear price"
          >
            Clear
          </button>
        )}
      </div>
      <datalist id="price-suggestions">
        {PRICE_SUGGESTIONS.map((suggestion) => (
          <option key={suggestion} value={suggestion} />
        ))}
      </datalist>
    </div>
  );
}

export default function PropertiesPage() {
  return (
    <Suspense fallback={<div className="min-h-screen bg-white" />}>
      <PropertiesContent />
    </Suspense>
  );
}
