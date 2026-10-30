"use client";

import { useCachedQuery } from "@/lib/sanity.cache";
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

const NO_PROPERTIES: SanityProperty[] = [];

export function useSanityProperties() {
  const { data, loading, error } = useCachedQuery<SanityProperty[]>(PROPERTIES_QUERY, NO_PROPERTIES);
  return { properties: data, loading, error };
}
