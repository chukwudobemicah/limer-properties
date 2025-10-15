"use client";

import { useEffect, useState } from "react";
import { client } from "@/lib/sanity.client";
import {
  SanityPropertyType,
  SanityLocation,
  SanityPropertyStructure,
  SanityPropertyStatus,
} from "@/types/sanity";

export function useSanityFilters() {
  const [propertyTypes, setPropertyTypes] = useState<SanityPropertyType[]>([]);
  const [locations, setLocations] = useState<SanityLocation[]>([]);
  const [structures, setStructures] = useState<SanityPropertyStructure[]>([]);
  const [statuses, setStatuses] = useState<SanityPropertyStatus[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);

  useEffect(() => {
    async function fetchFilters() {
      try {
        setLoading(true);

        const [typesData, locationsData, structuresData, statusesData] =
          await Promise.all([
            client.fetch<SanityPropertyType[]>(
              `*[_type == "propertyType"] | order(title asc)`
            ),
            client.fetch<SanityLocation[]>(
              `*[_type == "location"] | order(name asc)`
            ),
            client.fetch<SanityPropertyStructure[]>(
              `*[_type == "propertyStructure"] | order(title asc)`
            ),
            client.fetch<SanityPropertyStatus[]>(
              `*[_type == "propertyStatus"] | order(title asc)`
            ),
          ]);

        setPropertyTypes(typesData);
        setLocations(locationsData);
        setStructures(structuresData);
        setStatuses(statusesData);
        setError(null);
      } catch (error) {
        console.error("Error fetching filters:", error);
        setError(error as Error);
      } finally {
        setLoading(false);
      }
    }

    fetchFilters();
  }, []);

  return {
    propertyTypes,
    locations,
    structures,
    statuses,
    loading,
    error,
  };
}
