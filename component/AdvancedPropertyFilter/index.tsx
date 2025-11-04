"use client";

import React, { useState, useEffect } from "react";
import { Search, X } from "lucide-react";
import { DEFAULT_MAX_PRICE } from "@/hooks/useSanityPropertyFilter";

interface AdvancedPropertyFilterProps {
  searchTerm: string;
  selectedBedrooms: number | "all";
  selectedBathrooms: number | "all";
  selectedStructure: string;
  selectedFurnished: "all" | "furnished" | "unfurnished";
  priceRange: [number, number];
  onSearchTermChange: (term: string) => void;
  onBedroomsChange: (bedrooms: number | "all") => void;
  onBathroomsChange: (bathrooms: number | "all") => void;
  onStructureChange: (structure: string) => void;
  onFurnishedChange: (furnished: "all" | "furnished" | "unfurnished") => void;
  onPriceRangeChange: (range: [number, number]) => void;
  onResetFilters: () => void;
  resultsCount: number;
}

export default function AdvancedPropertyFilter({
  searchTerm,
  selectedBedrooms,
  selectedBathrooms,
  selectedStructure,
  selectedFurnished,
  priceRange,
  onSearchTermChange,
  onBedroomsChange,
  onBathroomsChange,
  onStructureChange,
  onFurnishedChange,
  onPriceRangeChange,
  onResetFilters,
  resultsCount,
}: AdvancedPropertyFilterProps) {
  // Local state for filter values
  const [localSearchTerm, setLocalSearchTerm] = useState(searchTerm);
  const [localPriceRange, setLocalPriceRange] =
    useState<[number, number]>(priceRange);

  // Sync local state with props when they change (e.g., on reset)
  useEffect(() => {
    setLocalSearchTerm(searchTerm);
    setLocalPriceRange(priceRange);
  }, [searchTerm, priceRange]);

  const handleMinPriceChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { value } = event.target;
    if (value === "") {
      setLocalPriceRange([0, localPriceRange[1]]);
      return;
    }
    const parsed = Number(value);
    if (!Number.isNaN(parsed) && parsed >= 0) {
      setLocalPriceRange([parsed, localPriceRange[1]]);
    }
  };

  const handleMaxPriceChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { value } = event.target;
    if (value === "") {
      setLocalPriceRange([localPriceRange[0], DEFAULT_MAX_PRICE]);
      return;
    }
    const parsed = Number(value);
    if (!Number.isNaN(parsed) && parsed >= 0) {
      setLocalPriceRange([localPriceRange[0], parsed]);
    }
  };

  const handleApplyFilters = () => {
    onSearchTermChange(localSearchTerm);
    onPriceRangeChange(localPriceRange);
  };

  const handleReset = () => {
    setLocalSearchTerm("");
    setLocalPriceRange([0, DEFAULT_MAX_PRICE]);
    onResetFilters();
  };

  return (
    <div className="bg-white rounded-lg shadow-md p-6 sticky top-20">
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-xl font-bold text-gray-900 flex items-center">
          <Search size={24} className="mr-2 text-primary" />
          Filter Properties
        </h2>
        <button
          onClick={handleReset}
          className="text-sm text-primary hover:text-primary-dark flex items-center"
        >
          <X size={16} className="mr-1" />
          Reset
        </button>
      </div>

      <div className="space-y-4">
        {/* Location Search */}
        <div>
          <label
            htmlFor="advanced-filter-location"
            className="block text-sm font-medium text-gray-700 mb-2"
          >
            Location
          </label>
          <div className="relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 w-4 h-4" />
            <input
              id="advanced-filter-location"
              type="text"
              value={localSearchTerm}
              onChange={(event) => setLocalSearchTerm(event.target.value)}
              placeholder="Enter a state, locality or area"
              className="w-full rounded-lg border border-gray-300 bg-white py-2.5 pl-10 pr-3 text-sm text-gray-900 focus:border-primary focus:ring-2 focus:ring-primary/30 outline-none"
            />
          </div>
        </div>

        {/* Structure Type */}
        {/* <Select
          label="Property Structure"
          value={selectedStructure}
          onChange={(value) => onStructureChange(String(value))}
          options={[
            { value: "all", label: "All Structures" },
            { value: "bungalow", label: "Bungalow" },
            { value: "duplex", label: "Duplex" },
            { value: "flat", label: "Flat/Apartment" },
            { value: "terrace", label: "Terrace" },
            { value: "mansion", label: "Mansion" },
            { value: "detached-house", label: "Detached House" },
            { value: "semi-detached", label: "Semi-Detached" },
          ]}
        /> */}

        {/* Bedrooms */}
        {/* <Select
          label="Bedrooms"
          value={selectedBedrooms}
          onChange={(value) => {
            onBedroomsChange(value === "all" ? "all" : Number(value));
          }}
          options={[
            { value: "all", label: "Any" },
            { value: "1", label: "1 Bedroom" },
            { value: "2", label: "2 Bedrooms" },
            { value: "3", label: "3 Bedrooms" },
            { value: "4", label: "4 Bedrooms" },
            { value: "5", label: "5 Bedrooms" },
            { value: "6", label: "6+ Bedrooms" },
          ]}
        /> */}

        {/* Bathrooms */}
        {/* <Select
          label="Bathrooms"
          value={selectedBathrooms}
          onChange={(value) => {
            onBathroomsChange(value === "all" ? "all" : Number(value));
          }}
          options={[
            { value: "all", label: "Any" },
            { value: "1", label: "1 Bathroom" },
            { value: "2", label: "2 Bathrooms" },
            { value: "3", label: "3 Bathrooms" },
            { value: "4", label: "4 Bathrooms" },
            { value: "5", label: "5+ Bathrooms" },
          ]}
        /> */}

        {/* Furnished Status */}
        {/* <Select
          label="Furnishing"
          value={selectedFurnished}
          onChange={(value) =>
            onFurnishedChange(value as "all" | "furnished" | "unfurnished")
          }
          options={[
            { value: "all", label: "All" },
            { value: "furnished", label: "Furnished" },
            { value: "unfurnished", label: "Unfurnished" },
          ]}
        /> */}

        {/* Price Range */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Price Range (₦)
          </label>
          <div className="space-y-2">
            <input
              type="number"
              placeholder="Min Price"
              value={localPriceRange[0] === 0 ? "" : String(localPriceRange[0])}
              onChange={handleMinPriceChange}
              className="w-full px-4 py-2 border border-gray-300 text-black rounded-lg focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
            />
            <input
              type="number"
              placeholder="Max Price"
              value={
                localPriceRange[1] === DEFAULT_MAX_PRICE
                  ? ""
                  : String(localPriceRange[1])
              }
              onChange={handleMaxPriceChange}
              className="w-full px-4 py-2 border border-gray-300 text-black rounded-lg focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
            />
          </div>
        </div>
      </div>

      {/* Apply Filter Button */}
      <div className="mt-6 pt-6 border-t border-gray-200">
        <button
          onClick={handleApplyFilters}
          className="w-full bg-primary text-white px-6 py-3 rounded-lg font-medium hover:bg-primary-dark transition-colors"
        >
          Apply Filters
        </button>
      </div>

      {/* Results Count */}
      <div className="mt-6 pt-6 border-t border-gray-200">
        <p className="text-center text-sm text-gray-600">
          <span className="font-bold text-primary text-lg">{resultsCount}</span>{" "}
          {resultsCount === 1 ? "property" : "properties"} found
        </p>
      </div>
    </div>
  );
}
