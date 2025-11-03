"use client";

import React from "react";
import { motion } from "framer-motion";
import { useRouter } from "next/navigation";
import { Search } from "lucide-react";
import Select from "@/component/Select";
import {
  DEFAULT_MAX_PRICE,
  PropertyPurpose,
} from "@/hooks/useSanityPropertyFilter";

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

  const uniquePropertyTypeOptions = dedupeByLabel(propertyTypeOptions);
  const uniqueLocationOptions = dedupeByLabel(locationOptions);
  const uniqueStructureOptions = dedupeByLabel(structureOptions);

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const params = new URLSearchParams();
    const normalizedSearch = searchTerm.trim();

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

    const queryString = params.toString();
    router.push(`/properties${queryString ? `?${queryString}` : ""}`);
  };

  const handlePurposeClick = (purpose: PropertyPurpose) => {
    onPurposeChange(purpose);
    if (purpose === "land") {
      onTypeChange("land");
      onBedroomsChange("all");
      onBathroomsChange("all");
    } else if (purpose === "rent") {
      onTypeChange("house-for-rent");
    } else if (purpose === "shortlet") {
      onTypeChange("shortlet");
    }
  };

  const handleMinPriceChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { value } = event.target;
    if (value === "") {
      onPriceRangeChange([0, Math.max(priceRange[1], 0)]);
      return;
    }

    const parsed = Number(value);
    if (!Number.isNaN(parsed) && parsed >= 0) {
      onPriceRangeChange([parsed, Math.max(parsed, priceRange[1])]);
    }
  };

  const handleMaxPriceChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { value } = event.target;
    if (value === "") {
      onPriceRangeChange([
        Math.min(priceRange[0], DEFAULT_MAX_PRICE),
        DEFAULT_MAX_PRICE,
      ]);
      return;
    }

    const parsed = Number(value);
    if (!Number.isNaN(parsed) && parsed >= 0) {
      onPriceRangeChange([Math.min(priceRange[0], parsed), parsed]);
    }
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
    { label: "Land", value: "land" },
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
      <div className="bg-white/95 backdrop-blur-md w-full rounded-3xl shadow-xl border border-white/40 p-5 sm:p-8">
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
          </div>

          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-3">
              <div className="lg:col-span-2">
                <label
                  htmlFor="filter-search"
                  className="block text-sm font-medium text-gray-700 mb-2"
                >
                  Location, landmark or keyword
                </label>
                <div className="relative">
                  <Search
                    className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400"
                    size={18}
                  />
                  <input
                    id="filter-search"
                    type="text"
                    value={searchTerm}
                    onChange={(event) => onSearchTermChange(event.target.value)}
                    placeholder="Enter a state, locality or area"
                    className="w-full rounded-xl border border-gray-200 bg-white py-3 pl-11 pr-4 text-sm text-gray-700 focus:border-primary focus:ring-2 focus:ring-primary/30"
                  />
                </div>
              </div>

              <div>
                <label
                  className="block text-sm font-medium text-gray-700 mb-2"
                  htmlFor="filter-type"
                >
                  Property type
                </label>
                <Select
                  className="w-full"
                  value={selectedType}
                  onChange={(value) => onTypeChange(String(value))}
                  options={resolvedTypeOptions.map((option) => ({
                    value: option.value,
                    label: option.label,
                  }))}
                  placeholder="Select type"
                  labelId="filter-type"
                />
              </div>
            </div>

            <div
              className={`grid grid-cols-1 ${
                selectedPurpose === "land" ? "md:grid-cols-1" : "md:grid-cols-3"
              } gap-3`}
            >
              <div>
                <label
                  className="block text-sm font-medium text-gray-700 mb-2"
                  htmlFor="filter-location"
                >
                  Location
                </label>
                <Select
                  className="w-full"
                  value={selectedLocation}
                  onChange={(value) => onLocationChange(String(value))}
                  options={resolvedLocationOptions}
                  placeholder="Select location"
                  labelId="filter-location"
                />
              </div>

              {selectedPurpose !== "land" && (
                <>
                  <div>
                    <label
                      className="block text-sm font-medium text-gray-700 mb-2"
                      htmlFor="filter-bedrooms"
                    >
                      Bedrooms
                    </label>
                    <Select
                      className="w-full"
                      value={selectedBedrooms}
                      onChange={handleBedroomsChange}
                      options={BEDROOM_OPTIONS}
                      placeholder="Any bedrooms"
                      labelId="filter-bedrooms"
                    />
                  </div>

                  <div>
                    <label
                      className="block text-sm font-medium text-gray-700 mb-2"
                      htmlFor="filter-bathrooms"
                    >
                      Bathrooms
                    </label>
                    <Select
                      className="w-full"
                      value={selectedBathrooms}
                      onChange={handleBathroomsChange}
                      options={BATHROOM_OPTIONS}
                      placeholder="Any bathrooms"
                      labelId="filter-bathrooms"
                    />
                  </div>
                </>
              )}
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
              <div>
                <label
                  className="block text-sm font-medium text-gray-700 mb-2"
                  htmlFor="min-price-input"
                >
                  Minimum price (₦)
                </label>
                <input
                  id="min-price-input"
                  type="number"
                  min={0}
                  step={1000}
                  value={priceRange[0] === 0 ? "" : String(priceRange[0])}
                  onChange={handleMinPriceChange}
                  placeholder="No minimum"
                  className="w-full rounded-xl border border-gray-200 bg-white py-3 px-4 text-sm text-gray-700 focus:border-primary focus:ring-2 focus:ring-primary/30"
                />
              </div>

              <div>
                <label
                  className="block text-sm font-medium text-gray-700 mb-2"
                  htmlFor="max-price-input"
                >
                  Maximum price (₦)
                </label>
                <input
                  id="max-price-input"
                  type="number"
                  min={0}
                  step={1000}
                  value={
                    priceRange[1] === DEFAULT_MAX_PRICE
                      ? ""
                      : String(priceRange[1])
                  }
                  onChange={handleMaxPriceChange}
                  placeholder="No maximum"
                  className="w-full rounded-xl border border-gray-200 bg-white py-3 px-4 text-sm text-gray-700 focus:border-primary focus:ring-2 focus:ring-primary/30"
                />
              </div>
            </div>

            {selectedPurpose !== "land" && (
              <div className="border-t border-gray-100 pt-4">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                  <Select
                    label="Structure"
                    value={selectedStructure}
                    onChange={(value) => onStructureChange(String(value))}
                    options={resolvedStructureOptions}
                    placeholder="All structures"
                    labelId="filter-structure"
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
                    placeholder="Any"
                    labelId="filter-furnishing"
                  />
                </div>

                <div className="mt-4 text-sm text-gray-600">
                  Refine your search with furnished and structure details for
                  rentals and short lets.
                </div>
              </div>
            )}
            <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
              <button
                type="button"
                onClick={onResetFilters}
                className="inline-flex items-center justify-center rounded-lg border border-primary px-4 py-2 text-sm font-semibold text-primary transition-colors hover:bg-primary/10"
              >
                Reset filters
              </button>

              <button
                type="submit"
                className="inline-flex items-center justify-center gap-2 rounded-xl bg-primary px-6 py-3 text-sm font-semibold text-white transition-colors hover:bg-primary-dark"
              >
                <Search size={18} />
                Search
              </button>
            </div>
          </form>
        </div>
      </div>
    </motion.div>
  );
}
