"use client";

import { useEffect, useState } from "react";
import { client } from "@/lib/sanity.client";
import {
  SanityPropertyType,
  SanityLocation,
  SanityPropertyStructure,
} from "@/types/sanity";

function uniqueBySlug<T extends { slug?: { current?: string }; _id: string }>(
  items: T[]
) {
  const seen = new Set<string>();

  return items.filter((item) => {
    const key = item.slug?.current ?? item._id;
    if (!key) {
      return false;
    }

    if (seen.has(key)) {
      return false;
    }

    seen.add(key);
    return true;
  });
}

export function useSanityFilters() {
  const [propertyTypes, setPropertyTypes] = useState<SanityPropertyType[]>([]);
  const [locations, setLocations] = useState<SanityLocation[]>([]);
  const [structures, setStructures] = useState<SanityPropertyStructure[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);

  useEffect(() => {
    async function fetchFilters() {
      try {
        setLoading(true);

        const [typesData, locationsData, structuresData] = await Promise.all([
          client.fetch<SanityPropertyType[]>(
            `*[_type == "propertyType"] | order(title asc)`
          ),
          client.fetch<SanityLocation[]>(
            `*[_type == "location"] | order(name asc) {
              _id,
              name,
              city->{_id, name, slug},
              state->{_id, name, slug},
              slug
            }`
          ),
          client.fetch<SanityPropertyStructure[]>(
            `*[_type == "propertyStructure"] | order(title asc)`
          ),
        ]);

        setPropertyTypes(uniqueBySlug(typesData));
        setLocations(uniqueBySlug(locationsData));
        setStructures(uniqueBySlug(structuresData));
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
    loading,
    error,
  };
}
