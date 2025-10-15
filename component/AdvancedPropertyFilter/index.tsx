"use client";

import React from "react";
import { Search, X } from "lucide-react";
import { PropertyType, PropertyStructure } from "@/types/property";
import Button from "@/component/Button";

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
        <div>
          <label
            htmlFor="property-type-filter"
            className="block text-sm font-medium text-gray-700 mb-2"
          >
            Property Type
          </label>
          <select
            id="property-type-filter"
            value={selectedType}
            onChange={(event) =>
              onTypeChange(event.target.value as PropertyType | "all")
            }
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
          >
            <option value="all">All Types</option>
            <option value="house-sale">House for Sale</option>
            <option value="house-rent">House for Rent</option>
            <option value="land">Land</option>
            <option value="shortlet">Shortlet</option>
          </select>
        </div>

        {/* Location */}
        <div>
          <label
            htmlFor="location-filter"
            className="block text-sm font-medium text-gray-700 mb-2"
          >
            Location
          </label>
          <select
            id="location-filter"
            value={selectedLocation}
            onChange={(event) => onLocationChange(event.target.value)}
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
          >
            {locations.map((location) => (
              <option key={location} value={location}>
                {location}
              </option>
            ))}
          </select>
        </div>

        {/* Structure Type */}
        <div>
          <label
            htmlFor="structure-filter"
            className="block text-sm font-medium text-gray-700 mb-2"
          >
            Property Structure
          </label>
          <select
            id="structure-filter"
            value={selectedStructure}
            onChange={(event) =>
              onStructureChange(event.target.value as PropertyStructure | "all")
            }
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
          >
            <option value="all">All Structures</option>
            <option value="bungalow">Bungalow</option>
            <option value="duplex">Duplex</option>
            <option value="flat">Flat/Apartment</option>
            <option value="terrace">Terrace</option>
            <option value="mansion">Mansion</option>
            <option value="other">Other</option>
          </select>
        </div>

        {/* Bedrooms */}
        <div>
          <label
            htmlFor="bedrooms-filter"
            className="block text-sm font-medium text-gray-700 mb-2"
          >
            Bedrooms
          </label>
          <select
            id="bedrooms-filter"
            value={selectedBedrooms}
            onChange={(event) => {
              const value = event.target.value;
              onBedroomsChange(value === "all" ? "all" : Number(value));
            }}
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
          >
            <option value="all">Any</option>
            <option value="1">1 Bedroom</option>
            <option value="2">2 Bedrooms</option>
            <option value="3">3 Bedrooms</option>
            <option value="4">4 Bedrooms</option>
            <option value="5">5 Bedrooms</option>
            <option value="6">6+ Bedrooms</option>
          </select>
        </div>

        {/* Bathrooms */}
        <div>
          <label
            htmlFor="bathrooms-filter"
            className="block text-sm font-medium text-gray-700 mb-2"
          >
            Bathrooms
          </label>
          <select
            id="bathrooms-filter"
            value={selectedBathrooms}
            onChange={(event) => {
              const value = event.target.value;
              onBathroomsChange(value === "all" ? "all" : Number(value));
            }}
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
          >
            <option value="all">Any</option>
            <option value="1">1 Bathroom</option>
            <option value="2">2 Bathrooms</option>
            <option value="3">3 Bathrooms</option>
            <option value="4">4 Bathrooms</option>
            <option value="5">5+ Bathrooms</option>
          </select>
        </div>

        {/* Furnished Status */}
        <div>
          <label
            htmlFor="furnished-filter"
            className="block text-sm font-medium text-gray-700 mb-2"
          >
            Furnishing
          </label>
          <select
            id="furnished-filter"
            value={selectedFurnished}
            onChange={(event) =>
              onFurnishedChange(
                event.target.value as "all" | "furnished" | "unfurnished"
              )
            }
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
          >
            <option value="all">All</option>
            <option value="furnished">Furnished</option>
            <option value="unfurnished">Unfurnished</option>
          </select>
        </div>

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
