import { SanityImageSource } from "@sanity/image-url/lib/types/types";

export interface SanityPropertyType {
  _id: string;
  title: string;
  value: string;
  description?: string;
}

export interface SanityLocation {
  _id: string;
  name: string;
  city: string;
  state: string;
  slug: {
    current: string;
  };
}

export interface SanityPropertyStructure {
  _id: string;
  title: string;
  value: string;
  floors?: number;
  description?: string;
}

export interface SanityPropertyStatus {
  _id: string;
  title: string;
  value: string;
  color: string;
}

export interface SanityProperty {
  _id: string;
  _createdAt: string;
  title: string;
  slug: {
    current: string;
  };
  propertyType: SanityPropertyType;
  status: SanityPropertyStatus;
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
