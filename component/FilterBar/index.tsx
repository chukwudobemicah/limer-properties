"use client";

import React from "react";
import { Search } from "lucide-react";
import { PropertyType } from "@/types/property";

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
        <div>
          <label
            htmlFor="property-type"
            className="block text-sm font-medium text-gray-700 mb-2"
          >
            Property Type
          </label>
          <select
            id="property-type"
            value={selectedType}
            onChange={(event) =>
              onTypeChange(event.target.value as PropertyType | "all")
            }
            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
          >
            <option value="all">All Types</option>
            <option value="house-sale">House for Sale</option>
            <option value="house-rent">House for Rent</option>
            <option value="land">Land</option>
            <option value="shortlet">Shortlet</option>
          </select>
        </div>

        {/* Location Filter */}
        <div>
          <label
            htmlFor="location"
            className="block text-sm font-medium text-gray-700 mb-2"
          >
            Location
          </label>
          <select
            id="location"
            value={selectedLocation}
            onChange={(event) => onLocationChange(event.target.value)}
            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
          >
            {locations.map((location) => (
              <option key={location} value={location}>
                {location}
              </option>
            ))}
          </select>
        </div>

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
