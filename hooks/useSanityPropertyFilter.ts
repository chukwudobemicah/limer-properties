"use client";

import { useState, useMemo } from "react";
import { SanityProperty } from "@/types/sanity";

interface UseSanityPropertyFilterProps {
  properties: SanityProperty[];
}

export function useSanityPropertyFilter({
  properties,
}: UseSanityPropertyFilterProps) {
  const [selectedType, setSelectedType] = useState<string>("all");
  const [selectedLocation, setSelectedLocation] = useState<string>("all");
  const [selectedBedrooms, setSelectedBedrooms] = useState<number | "all">(
    "all"
  );
  const [selectedBathrooms, setSelectedBathrooms] = useState<number | "all">(
    "all"
  );
  const [selectedStructure, setSelectedStructure] = useState<string>("all");
  const [selectedFurnished, setSelectedFurnished] = useState<
    "all" | "furnished" | "unfurnished"
  >("all");
  const [priceRange, setPriceRange] = useState<[number, number]>([
    0, 500000000,
  ]);

  const filteredProperties = useMemo(() => {
    return properties.filter((property) => {
      const matchesType =
        selectedType === "all" || property.propertyType?.value === selectedType;

      const matchesLocation =
        selectedLocation === "all" ||
        property.location?._id === selectedLocation;

      const matchesBedrooms =
        selectedBedrooms === "all" || property.bedrooms === selectedBedrooms;

      const matchesBathrooms =
        selectedBathrooms === "all" || property.bathrooms === selectedBathrooms;

      const matchesStructure =
        selectedStructure === "all" ||
        property.structure?.value === selectedStructure;

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
    setSelectedLocation("all");
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
