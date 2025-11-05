"use client";

import { useEffect, useState } from "react";
import { client } from "@/lib/sanity.client";
import { SanityProperty } from "@/types/sanity";

const PROPERTIES_QUERY = `*[_type == "property"] | order(publishedAt desc) {
  _id,
  _createdAt,
  title,
  slug,
  propertyType,
  status,
  location,
  documentTitle,
  structure,
  description,
  price,
  images[]{
    asset,
    alt,
    caption
  },
  videos[]{
    asset->{
      _ref,
      _type,
      url
    },
    title
  },
  bedrooms,
  bathrooms,
  area,
  floors,
  floorPosition,
  parking,
  yearBuilt,
  furnished,
  features,
  isFeatured,
  publishedAt
}`;

export function useSanityProperties() {
  const [properties, setProperties] = useState<SanityProperty[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);

  useEffect(() => {
    async function fetchProperties() {
      try {
        setLoading(true);
        const data = await client.fetch<SanityProperty[]>(PROPERTIES_QUERY);
        setProperties(data);
        setError(null);
      } catch (error) {
        console.error("Error fetching properties:", error);
        setError(error as Error);
      } finally {
        setLoading(false);
      }
    }

    fetchProperties();
  }, []);

  return { properties, loading, error };
}
