"use client";

import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useRouter } from "next/navigation";
import {
  Search,
  SlidersHorizontal,
  ChevronDown,
  ChevronUp,
} from "lucide-react";
import Select from "@/component/Select";
import {
  DEFAULT_MAX_PRICE,
  PropertyPurpose,
} from "@/hooks/useSanityPropertyFilter";
import { formatPrice } from "@/utils/functions";

interface Option {
  label: string;
  value: string;
}

const dedupeByLabel = (options: Option[]) => {
  const seen = new Set<string>();

  return options.filter((option) => {
    const key = option.label.trim().toLowerCase();
    if (seen.has(key)) {
      return false;
    }

    seen.add(key);
    return true;
  });
};

interface FilterBarProps {
  selectedPurpose: PropertyPurpose;
  onPurposeChange: (purpose: PropertyPurpose) => void;
  searchTerm: string;
  onSearchTermChange: (term: string) => void;
  selectedType: string;
  onTypeChange: (type: string) => void;
  selectedBedrooms: number | "all";
  onBedroomsChange: (bedrooms: number | "all") => void;
  selectedBathrooms: number | "all";
  onBathroomsChange: (bathrooms: number | "all") => void;
  selectedStructure: string;
  onStructureChange: (structure: string) => void;
  selectedFurnished: "all" | "furnished" | "unfurnished";
  onFurnishedChange: (value: "all" | "furnished" | "unfurnished") => void;
  selectedLocation: string;
  onLocationChange: (location: string) => void;
  priceRange: [number, number];
  onPriceRangeChange: (range: [number, number]) => void;
  onResetFilters: () => void;
  propertyTypeOptions: Option[];
  locationOptions: Option[];
  structureOptions: Option[];
}

const MIN_PRICE_OPTIONS: Array<{ value: string; label: string }> = [
  { value: "all", label: "No Min" },
  { value: "5000000", label: formatPrice(5_000_000) },
  { value: "10000000", label: formatPrice(10_000_000) },
  { value: "20000000", label: formatPrice(20_000_000) },
  { value: "50000000", label: formatPrice(50_000_000) },
  { value: "100000000", label: formatPrice(100_000_000) },
];

const MAX_PRICE_OPTIONS: Array<{ value: string; label: string }> = [
  { value: "all", label: "No Max" },
  { value: "10000000", label: formatPrice(10_000_000) },
  { value: "20000000", label: formatPrice(20_000_000) },
  { value: "50000000", label: formatPrice(50_000_000) },
  { value: "100000000", label: formatPrice(100_000_000) },
  { value: "200000000", label: formatPrice(200_000_000) },
  { value: String(DEFAULT_MAX_PRICE), label: formatPrice(DEFAULT_MAX_PRICE) },
];

const BEDROOM_OPTIONS: Array<{ value: string; label: string }> = [
  { value: "all", label: "Bedrooms" },
  { value: "1", label: "1" },
  { value: "2", label: "2" },
  { value: "3", label: "3" },
  { value: "4", label: "4" },
  { value: "5", label: "5" },
];

const BATHROOM_OPTIONS: Array<{ value: string; label: string }> = [
  { value: "all", label: "Any" },
  { value: "1", label: "1" },
  { value: "2", label: "2" },
  { value: "3", label: "3" },
  { value: "4", label: "4" },
  { value: "5", label: "5" },
];

const FURNISHING_OPTIONS: Array<{
  value: "all" | "furnished" | "unfurnished";
  label: string;
}> = [
  { value: "all", label: "Any" },
  { value: "furnished", label: "Furnished" },
  { value: "unfurnished", label: "Unfurnished" },
];

export default function FilterBar({
  selectedPurpose,
  onPurposeChange,
  searchTerm,
  onSearchTermChange,
  selectedType,
  onTypeChange,
  selectedBedrooms,
  onBedroomsChange,
  selectedBathrooms,
  onBathroomsChange,
  selectedStructure,
  onStructureChange,
  selectedFurnished,
  onFurnishedChange,
  selectedLocation,
  onLocationChange,
  priceRange,
  onPriceRangeChange,
  onResetFilters,
  propertyTypeOptions,
  locationOptions,
  structureOptions,
}: FilterBarProps) {
  const router = useRouter();
  const [isMoreOptionsOpen, setIsMoreOptionsOpen] = useState(false);

  const uniquePropertyTypeOptions = dedupeByLabel(propertyTypeOptions);
  const uniqueLocationOptions = dedupeByLabel(locationOptions);
  const uniqueStructureOptions = dedupeByLabel(structureOptions);

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const params = new URLSearchParams();
    const normalizedSearch = searchTerm.trim();

    params.set("purpose", selectedPurpose);

    if (normalizedSearch.length > 0) {
      params.set("search", normalizedSearch);
    }

    if (selectedType !== "all") {
      params.set("type", selectedType);
    }

    if (selectedLocation !== "all") {
      params.set("location", selectedLocation);
    }

    if (selectedBedrooms !== "all") {
      params.set("bedrooms", String(selectedBedrooms));
    }

    if (selectedBathrooms !== "all") {
      params.set("bathrooms", String(selectedBathrooms));
    }

    if (selectedStructure !== "all") {
      params.set("structure", selectedStructure);
    }

    if (selectedFurnished !== "all") {
      params.set("furnished", selectedFurnished);
    }

    if (priceRange[0] > 0) {
      params.set("minPrice", String(priceRange[0]));
    }

    if (priceRange[1] < DEFAULT_MAX_PRICE) {
      params.set("maxPrice", String(priceRange[1]));
    }

    setIsMoreOptionsOpen(false);

    const queryString = params.toString();
    router.push(`/properties${queryString ? `?${queryString}` : ""}`);
  };

  const handlePurposeClick = (purpose: PropertyPurpose) => {
    onPurposeChange(purpose);
    onTypeChange("all");
  };

  const handleMinPriceChange = (value: string) => {
    const minPrice = value === "all" ? 0 : Number(value);
    onPriceRangeChange([minPrice, priceRange[1]]);
  };

  const handleMaxPriceChange = (value: string) => {
    const maxPrice = value === "all" ? DEFAULT_MAX_PRICE : Number(value);
    onPriceRangeChange([priceRange[0], maxPrice]);
  };

  const handleBedroomsChange = (value: string | number) => {
    if (value === "all") {
      onBedroomsChange("all");
      return;
    }
    onBedroomsChange(Number(value));
  };

  const handleBathroomsChange = (value: string | number) => {
    if (value === "all") {
      onBathroomsChange("all");
      return;
    }
    onBathroomsChange(Number(value));
  };

  const purposeTabs: Array<{ label: string; value: PropertyPurpose }> = [
    { label: "Buy", value: "buy" },
    { label: "Rent", value: "rent" },
    { label: "Short Let", value: "shortlet" },
  ];

  const resolvedTypeOptions: Option[] = [
    { value: "all", label: "All Types" },
    ...uniquePropertyTypeOptions,
  ];

  const resolvedLocationOptions: Option[] = [
    { value: "all", label: "All Locations" },
    ...uniqueLocationOptions,
  ];

  const resolvedStructureOptions: Option[] = [
    { value: "all", label: "All Structures" },
    ...uniqueStructureOptions,
  ];

  return (
    <motion.div
      initial={{ y: 20, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ delay: 0.4, duration: 0.5 }}
      className="max-w-5xl w-full mx-auto"
    >
      <div className="bg-white/95 backdrop-blur-md rounded-3xl shadow-xl border border-white/40 p-5 sm:p-8">
        <div className="flex flex-col gap-6">
          <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4 border-b border-gray-100 pb-4">
            <div className="flex items-center bg-gray-100 rounded-full p-1 text-sm font-medium w-full lg:w-auto">
              {purposeTabs.map((tab) => {
                const isActive = tab.value === selectedPurpose;
                return (
                  <button
                    key={tab.value}
                    type="button"
                    onClick={() => handlePurposeClick(tab.value)}
                    className={`flex-1 lg:flex-none px-4 sm:px-6 py-2 rounded-full transition-colors ${
                      isActive
                        ? "bg-white shadow text-gray-900"
                        : "text-gray-500 hover:text-gray-800"
                    }`}
                  >
                    {tab.label}
                  </button>
                );
              })}
            </div>

            <button
              type="button"
              onClick={() => setIsMoreOptionsOpen((previous) => !previous)}
              className="inline-flex items-center gap-2 self-end lg:self-auto text-sm font-medium text-primary"
            >
              <SlidersHorizontal size={16} />
              More search options
              {isMoreOptionsOpen ? (
                <ChevronUp size={16} />
              ) : (
                <ChevronDown size={16} />
              )}
            </button>
          </div>

          <form onSubmit={handleSubmit} className="flex flex-col gap-4">
            <div className="grid grid-cols-1 lg:grid-cols-[minmax(0,2fr)_repeat(4,minmax(0,1fr))] gap-3">
              <div className="col-span-1 lg:col-span-1">
                <div className="relative h-full">
                  <Search
                    className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400"
                    size={18}
                  />
                  <input
                    type="text"
                    value={searchTerm}
                    onChange={(event) => onSearchTermChange(event.target.value)}
                    placeholder="Enter a state, locality or area"
                    className="w-full h-full rounded-xl border border-gray-200 bg-white py-3 pl-11 pr-4 text-sm text-gray-700 focus:border-primary focus:ring-2 focus:ring-primary/30"
                  />
                </div>
              </div>

              <Select
                value={selectedType}
                onChange={(value) => onTypeChange(String(value))}
                options={resolvedTypeOptions.map((option) => ({
                  value: option.value,
                  label: option.label,
                }))}
                placeholder="Type"
                className="lg:col-span-1"
              />

              <Select
                value={selectedBedrooms}
                onChange={handleBedroomsChange}
                options={BEDROOM_OPTIONS}
                placeholder="Bedrooms"
                className="lg:col-span-1"
              />

              <Select
                value={priceRange[0] === 0 ? "all" : String(priceRange[0])}
                onChange={(value) => handleMinPriceChange(String(value))}
                options={MIN_PRICE_OPTIONS}
                placeholder="Min price"
                className="lg:col-span-1"
              />

              <Select
                value={
                  priceRange[1] === DEFAULT_MAX_PRICE
                    ? "all"
                    : String(priceRange[1])
                }
                onChange={(value) => handleMaxPriceChange(String(value))}
                options={MAX_PRICE_OPTIONS}
                placeholder="Max price"
                className="lg:col-span-1"
              />
            </div>

            <div className="flex flex-col gap-3 sm:flex-row sm:justify-end">
              <button
                type="submit"
                className="inline-flex items-center justify-center gap-2 rounded-xl bg-primary px-6 py-3 text-sm font-semibold text-white transition-colors hover:bg-primary-dark"
              >
                <Search size={18} />
                Search
              </button>
            </div>
          </form>

          <AnimatePresence initial={false}>
            {isMoreOptionsOpen && (
              <motion.div
                initial={{ height: 0, opacity: 0 }}
                animate={{ height: "auto", opacity: 1 }}
                exit={{ height: 0, opacity: 0 }}
                transition={{ duration: 0.3 }}
                className="overflow-hidden border-t border-gray-100 pt-4"
              >
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                  <Select
                    label="Location"
                    value={selectedLocation}
                    onChange={(value) => onLocationChange(String(value))}
                    options={resolvedLocationOptions}
                  />

                  <Select
                    label="Bathrooms"
                    value={selectedBathrooms}
                    onChange={handleBathroomsChange}
                    options={BATHROOM_OPTIONS}
                  />

                  <Select
                    label="Structure"
                    value={selectedStructure}
                    onChange={(value) => onStructureChange(String(value))}
                    options={resolvedStructureOptions}
                  />

                  <Select
                    label="Furnishing"
                    value={selectedFurnished}
                    onChange={(value) =>
                      onFurnishedChange(
                        value as "all" | "furnished" | "unfurnished"
                      )
                    }
                    options={FURNISHING_OPTIONS}
                  />
                </div>

                <div className="mt-4 flex flex-col-reverse gap-3 sm:flex-row sm:items-center sm:justify-between">
                  <button
                    type="button"
                    onClick={() => setIsMoreOptionsOpen(false)}
                    className="text-sm font-medium text-gray-500 hover:text-gray-700"
                  >
                    Hide options
                  </button>
                  <button
                    type="button"
                    onClick={() => {
                      onResetFilters();
                      setIsMoreOptionsOpen(false);
                    }}
                    className="inline-flex items-center justify-center rounded-lg border border-primary px-4 py-2 text-sm font-semibold text-primary transition-colors hover:bg-primary/10"
                  >
                    Reset filters
                  </button>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>
    </motion.div>
  );
}
