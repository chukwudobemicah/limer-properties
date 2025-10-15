"use client";

import { useState, useMemo } from "react";
import { Property, PropertyType, PropertyStructure } from "@/types/property";

interface UseAdvancedPropertyFilterProps {
  properties: Property[];
}

export function useAdvancedPropertyFilter({
  properties,
}: UseAdvancedPropertyFilterProps) {
  const [selectedType, setSelectedType] = useState<PropertyType | "all">("all");
  const [selectedLocation, setSelectedLocation] =
    useState<string>("All Locations");
  const [selectedBedrooms, setSelectedBedrooms] = useState<number | "all">(
    "all"
  );
  const [selectedBathrooms, setSelectedBathrooms] = useState<number | "all">(
    "all"
  );
  const [selectedStructure, setSelectedStructure] = useState<
    PropertyStructure | "all"
  >("all");
  const [selectedFurnished, setSelectedFurnished] = useState<
    "all" | "furnished" | "unfurnished"
  >("all");
  const [priceRange, setPriceRange] = useState<[number, number]>([
    0, 500000000,
  ]);

  const filteredProperties = useMemo(() => {
    return properties.filter((property) => {
      const matchesType =
        selectedType === "all" || property.type === selectedType;

      const matchesLocation =
        selectedLocation === "All Locations" ||
        property.location === selectedLocation;

      const matchesBedrooms =
        selectedBedrooms === "all" || property.bedrooms === selectedBedrooms;

      const matchesBathrooms =
        selectedBathrooms === "all" || property.bathrooms === selectedBathrooms;

      const matchesStructure =
        selectedStructure === "all" || property.structure === selectedStructure;

      const matchesFurnished =
        selectedFurnished === "all" ||
        (selectedFurnished === "furnished" && property.furnished === true) ||
        (selectedFurnished === "unfurnished" && property.furnished === false);

      const matchesPrice =
        property.price >= priceRange[0] && property.price <= priceRange[1];

      return (
        matchesType &&
        matchesLocation &&
        matchesBedrooms &&
        matchesBathrooms &&
        matchesStructure &&
        matchesFurnished &&
        matchesPrice
      );
    });
  }, [
    properties,
    selectedType,
    selectedLocation,
    selectedBedrooms,
    selectedBathrooms,
    selectedStructure,
    selectedFurnished,
    priceRange,
  ]);

  const resetFilters = () => {
    setSelectedType("all");
    setSelectedLocation("All Locations");
    setSelectedBedrooms("all");
    setSelectedBathrooms("all");
    setSelectedStructure("all");
    setSelectedFurnished("all");
    setPriceRange([0, 500000000]);
  };

  return {
    selectedType,
    selectedLocation,
    selectedBedrooms,
    selectedBathrooms,
    selectedStructure,
    selectedFurnished,
    priceRange,
    filteredProperties,
    setSelectedType,
    setSelectedLocation,
    setSelectedBedrooms,
    setSelectedBathrooms,
    setSelectedStructure,
    setSelectedFurnished,
    setPriceRange,
    resetFilters,
  };
}
