"use client";

import { useState, useMemo } from "react";
import { SanityProperty } from "@/types/sanity";

export type PropertyPurpose = "buy" | "rent" | "shortlet";

export const DEFAULT_MAX_PRICE = 500_000_000;

interface UseSanityPropertyFilterProps {
  properties: SanityProperty[];
}

export function useSanityPropertyFilter({
  properties,
}: UseSanityPropertyFilterProps) {
  const [selectedPurpose, setSelectedPurpose] =
    useState<PropertyPurpose>("buy");
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedType, setSelectedType] = useState("all");
  const [selectedLocation, setSelectedLocation] = useState("all");
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
    0,
    DEFAULT_MAX_PRICE,
  ]);

  const filteredProperties = useMemo(() => {
    return properties.filter((property) => {
      const propertyTypeSlug = property.propertyType?.slug.current ?? "";

      const matchesPurpose = (() => {
        if (!propertyTypeSlug) {
          return true;
        }

        if (selectedPurpose === "buy") {
          return (
            propertyTypeSlug.includes("for-sale") ||
            propertyTypeSlug.includes("sale") ||
            propertyTypeSlug.includes("land")
          );
        }

        if (selectedPurpose === "rent") {
          return propertyTypeSlug.includes("for-rent");
        }

        if (selectedPurpose === "shortlet") {
          return propertyTypeSlug.includes("shortlet");
        }

        return true;
      })();

      const matchesType =
        selectedType === "all" || propertyTypeSlug === selectedType;

      const matchesLocation =
        selectedLocation === "all" ||
        property.location?.slug.current === selectedLocation;

      const normalizedSearch = searchTerm.trim().toLowerCase();
      const matchesSearch =
        normalizedSearch.length === 0 ||
        [
          property.location?.name,
          property.location?.city?.name,
          property.location?.state?.name,
          property.title,
        ]
          .filter((value): value is string => Boolean(value))
          .some((value) => value.toLowerCase().includes(normalizedSearch));

      const matchesBedrooms =
        selectedBedrooms === "all" || property.bedrooms === selectedBedrooms;

      const matchesBathrooms =
        selectedBathrooms === "all" || property.bathrooms === selectedBathrooms;

      const matchesStructure =
        selectedStructure === "all" ||
        property.structure?.slug.current === selectedStructure;

      const matchesFurnished =
        selectedFurnished === "all" ||
        (selectedFurnished === "furnished" && property.furnished === true) ||
        (selectedFurnished === "unfurnished" && property.furnished === false);

      const matchesPrice =
        property.price >= priceRange[0] && property.price <= priceRange[1];

      return (
        matchesPurpose &&
        matchesType &&
        matchesLocation &&
        matchesSearch &&
        matchesBedrooms &&
        matchesBathrooms &&
        matchesStructure &&
        matchesFurnished &&
        matchesPrice
      );
    });
  }, [
    properties,
    selectedPurpose,
    searchTerm,
    selectedType,
    selectedLocation,
    selectedBedrooms,
    selectedBathrooms,
    selectedStructure,
    selectedFurnished,
    priceRange,
  ]);

  const resetFilters = () => {
    setSelectedPurpose("buy");
    setSearchTerm("");
    setSelectedType("all");
    setSelectedLocation("all");
    setSelectedBedrooms("all");
    setSelectedBathrooms("all");
    setSelectedStructure("all");
    setSelectedFurnished("all");
    setPriceRange([0, DEFAULT_MAX_PRICE]);
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
    searchTerm,
    setSearchTerm,
    selectedPurpose,
    setSelectedPurpose,
    resetFilters,
  };
}
