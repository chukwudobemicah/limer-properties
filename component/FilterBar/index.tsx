"use client";

import React from "react";
import { Search } from "lucide-react";
import { PropertyType } from "@/types/property";
import Select from "@/component/Select";

interface FilterBarProps {
  selectedType: PropertyType | "all";
  selectedLocation: string;
  onTypeChange: (type: PropertyType | "all") => void;
  onLocationChange: (location: string) => void;
  locations: string[];
}

export default function FilterBar({
  selectedType,
  selectedLocation,
  onTypeChange,
  onLocationChange,
  locations,
}: FilterBarProps) {
  return (
    <div className="bg-white rounded-lg shadow-lg p-6 -mt-10 relative z-10">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {/* Property Type Filter */}
        <Select
          label="Property Type"
          value={selectedType}
          onChange={(value) => onTypeChange(value as PropertyType | "all")}
          options={[
            { value: "all", label: "All Types" },
            { value: "house-sale", label: "House for Sale" },
            { value: "house-rent", label: "House for Rent" },
            { value: "land", label: "Land" },
            { value: "shortlet", label: "Shortlet" },
          ]}
        />

        {/* Location Filter */}
        <Select
          label="Location"
          value={selectedLocation}
          onChange={(value) => onLocationChange(String(value))}
          options={locations.map((location) => ({
            value: location,
            label: location,
          }))}
        />

        {/* Search Button */}
        <div className="flex items-end">
          <button
            className="w-full bg-primary text-white px-6 py-3 rounded-lg font-medium hover:bg-primary-dark transition-colors duration-200 flex items-center justify-center"
            aria-label="Search properties"
          >
            <Search size={20} className="mr-2" />
            Search
          </button>
        </div>
      </div>
    </div>
  );
}
