"use client";

import { useEffect, useState } from "react";
import { client } from "@/lib/sanity.client";
import { SanityProperty } from "@/types/sanity";

const PROPERTIES_QUERY = `*[_type == "property"] | order(publishedAt desc) {
  _id,
  _createdAt,
  title,
  slug,
  propertyType->{
    _id,
    title,
    value,
    description
  },
  status->{
    _id,
    title,
    value,
    color
  },
  location->{
    _id,
    name,
    city,
    state,
    slug
  },
  structure->{
    _id,
    title,
    value,
    floors,
    description
  },
  description,
  price,
  images[]{
    asset,
    alt,
    caption
  },
  bedrooms,
  bathrooms,
  area,
  floors,
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
