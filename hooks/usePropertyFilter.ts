"use client";

import { useState, useMemo } from "react";
import { Property, PropertyType } from "@/types/property";

interface UsePropertyFilterProps {
  properties: Property[];
}

export function usePropertyFilter({ properties }: UsePropertyFilterProps) {
  const [selectedType, setSelectedType] = useState<PropertyType | "all">("all");
  const [selectedLocation, setSelectedLocation] =
    useState<string>("All Locations");

  const filteredProperties = useMemo(() => {
    return properties.filter((property) => {
      const matchesType =
        selectedType === "all" || property.type === selectedType;
      const matchesLocation =
        selectedLocation === "All Locations" ||
        property.location === selectedLocation;

      return matchesType && matchesLocation;
    });
  }, [properties, selectedType, selectedLocation]);

  const handleTypeChange = (type: PropertyType | "all") => {
    setSelectedType(type);
  };

  const handleLocationChange = (location: string) => {
    setSelectedLocation(location);
  };

  return {
    selectedType,
    selectedLocation,
    filteredProperties,
    handleTypeChange,
    handleLocationChange,
  };
}
