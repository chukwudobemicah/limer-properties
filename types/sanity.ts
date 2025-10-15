import { SanityImageSource } from "@sanity/image-url/lib/types/types";

export interface SanityPropertyType {
  _id: string;
  title: string;
  slug: {
    current: string;
  };
}

export interface SanityCity {
  _id: string;
  name: string;
  slug: {
    current: string;
  };
}

export interface SanityState {
  _id: string;
  name: string;
  slug: {
    current: string;
  };
}

export interface SanityLocation {
  _id: string;
  name: string;
  city: SanityCity;
  state: SanityState;
  slug: {
    current: string;
  };
}

export interface SanityPropertyStructure {
  _id: string;
  title: string;
  slug: {
    current: string;
  };
}

export type PropertyStatus = "available" | "sold" | "rented";

export interface SanityProperty {
  _id: string;
  _createdAt: string;
  title: string;
  slug: {
    current: string;
  };
  propertyType: SanityPropertyType;
  status: PropertyStatus;
  location: SanityLocation;
  structure?: SanityPropertyStructure;
  description: string;
  price: number;
  images: Array<{
    asset: SanityImageSource;
    alt?: string;
    caption?: string;
  }>;
  bedrooms?: number;
  bathrooms?: number;
  area: number;
  floors?: number;
  parking?: number;
  yearBuilt?: number;
  furnished: boolean;
  features: string[];
  isFeatured: boolean;
  publishedAt: string;
}
