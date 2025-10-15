"use client";

import React from "react";
import { Search, X } from "lucide-react";
import { PropertyType, PropertyStructure } from "@/types/property";
import Select from "@/component/Select";

interface AdvancedPropertyFilterProps {
  selectedType: PropertyType | "all";
  selectedLocation: string;
  selectedBedrooms: number | "all";
  selectedBathrooms: number | "all";
  selectedStructure: PropertyStructure | "all";
  selectedFurnished: "all" | "furnished" | "unfurnished";
  priceRange: [number, number];
  onTypeChange: (type: PropertyType | "all") => void;
  onLocationChange: (location: string) => void;
  onBedroomsChange: (bedrooms: number | "all") => void;
  onBathroomsChange: (bathrooms: number | "all") => void;
  onStructureChange: (structure: PropertyStructure | "all") => void;
  onFurnishedChange: (furnished: "all" | "furnished" | "unfurnished") => void;
  onPriceRangeChange: (range: [number, number]) => void;
  onResetFilters: () => void;
  locations: string[];
  resultsCount: number;
}

export default function AdvancedPropertyFilter({
  selectedType,
  selectedLocation,
  selectedBedrooms,
  selectedBathrooms,
  selectedStructure,
  selectedFurnished,
  priceRange,
  onTypeChange,
  onLocationChange,
  onBedroomsChange,
  onBathroomsChange,
  onStructureChange,
  onFurnishedChange,
  onPriceRangeChange,
  onResetFilters,
  locations,
  resultsCount,
}: AdvancedPropertyFilterProps) {
  const handleMinPriceChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const value = Number(event.target.value);
    onPriceRangeChange([value, priceRange[1]]);
  };

  const handleMaxPriceChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const value = Number(event.target.value);
    onPriceRangeChange([priceRange[0], value]);
  };

  return (
    <div className="bg-white rounded-lg shadow-md p-6 sticky top-20">
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-xl font-bold text-gray-900 flex items-center">
          <Search size={24} className="mr-2 text-primary" />
          Filter Properties
        </h2>
        <button
          onClick={onResetFilters}
          className="text-sm text-primary hover:text-primary-dark flex items-center"
        >
          <X size={16} className="mr-1" />
          Reset
        </button>
      </div>

      <div className="space-y-4">
        {/* Property Type */}
        <Select
          label="Property Type"
          value={selectedType}
          onChange={(value) => onTypeChange(value as PropertyType | "all")}
          options={[
            { value: "all", label: "All Types" },
            { value: "house-for-sale", label: "House for Sale" },
            { value: "house-for-rent", label: "House for Rent" },
            { value: "land", label: "Land" },
            { value: "shortlet", label: "Shortlet" },
          ]}
        />

        {/* Location */}
        <Select
          label="Location"
          value={selectedLocation}
          onChange={(value) => onLocationChange(String(value))}
          options={locations.map((location) => ({
            value: location,
            label: location,
          }))}
        />

        {/* Structure Type */}
        <Select
          label="Property Structure"
          value={selectedStructure}
          onChange={(value) =>
            onStructureChange(value as PropertyStructure | "all")
          }
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
        />

        {/* Bedrooms */}
        <Select
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
        />

        {/* Bathrooms */}
        <Select
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
        />

        {/* Furnished Status */}
        <Select
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
        />

        {/* Price Range */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Price Range (₦)
          </label>
          <div className="space-y-2">
            <input
              type="number"
              placeholder="Min Price"
              value={priceRange[0]}
              onChange={handleMinPriceChange}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
            />
            <input
              type="number"
              placeholder="Max Price"
              value={priceRange[1]}
              onChange={handleMaxPriceChange}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
            />
          </div>
        </div>
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
