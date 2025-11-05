"use client";

import { useMemo, useRef, useState } from "react";
import { SanityProperty } from "@/types/sanity";

export type PropertyPurpose = "land" | "rent" | "management";
export type FilterPurpose = PropertyPurpose | "all";

export const DEFAULT_MAX_PRICE = 500_000_000;

interface UseSanityPropertyFilterProps {
  properties: SanityProperty[];
  initialPurpose?: FilterPurpose;
}

export function useSanityPropertyFilter({
  properties,
  initialPurpose = "all",
}: UseSanityPropertyFilterProps) {
  const initialPurposeReference = useRef<FilterPurpose>(initialPurpose);
  const [selectedPurpose, setSelectedPurpose] = useState<FilterPurpose>(
    initialPurposeReference.current
  );
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
    const normalizeSlug = (value?: string) =>
      (value || "").toLowerCase().trim().replace(/\s+/g, "-");

    const getPropertyTypeSlug = (pt: any): string => {
      if (typeof pt === "string") return normalizeSlug(pt);
      if (pt && typeof pt === "object") return pt.slug?.current || "";
      return "";
    };

    const getLocationString = (loc: any): string => {
      if (typeof loc === "string") return loc;
      if (loc && typeof loc === "object") {
        const parts: string[] = [];
        if (loc.name) parts.push(loc.name);
        if (loc.city?.name) parts.push(loc.city.name);
        if (loc.state?.name) parts.push(loc.state.name);
        return parts.join(", ");
      }
      return "";
    };

    const getLocationSlug = (loc: any): string => {
      if (typeof loc === "string") return ""; // we no longer key by slug for strings
      return loc?.slug?.current || "";
    };

    const getStructureSlug = (st: any): string => {
      if (typeof st === "string") return normalizeSlug(st);
      if (st && typeof st === "object") return st.slug?.current || "";
      return "";
    };

    const normalizedSearch = searchTerm.trim().toLowerCase();

    return properties.filter((property) => {
      const propertyTypeSlug = getPropertyTypeSlug(property.propertyType);

      const matchesPurpose = (() => {
        if (selectedPurpose === "all") return true;
        if (!propertyTypeSlug) return true;
        if (selectedPurpose === "land")
          return propertyTypeSlug.includes("land");
        if (selectedPurpose === "rent")
          return propertyTypeSlug.includes("for-rent");
        if (selectedPurpose === "management")
          return propertyTypeSlug.includes("management");
        return true;
      })();

      const matchesType =
        selectedType === "all" || propertyTypeSlug === selectedType;

      const locationSlug = getLocationSlug(property.location as any);
      const matchesLocation =
        selectedLocation === "all" || locationSlug === selectedLocation;

      const locationString = getLocationString(property.location as any);
      const matchesSearch =
        normalizedSearch.length === 0 ||
        [locationString, property.title]
          .filter((value): value is string => Boolean(value))
          .some((value) => value.toLowerCase().includes(normalizedSearch));

      const matchesBedrooms =
        selectedBedrooms === "all" || property.bedrooms === selectedBedrooms;

      const matchesBathrooms =
        selectedBathrooms === "all" || property.bathrooms === selectedBathrooms;

      const structureSlug = getStructureSlug(property.structure as any);
      const matchesStructure =
        selectedStructure === "all" || structureSlug === selectedStructure;

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
    setSelectedPurpose(initialPurposeReference.current);
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
