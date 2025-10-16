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

export interface SanityCompanyInfo {
  _id: string;
  _type: "companyInfo";
  companyName: string;
  phone: string;
  email: string;
  address: string;
  description?: string;
  socials?: {
    facebook?: string;
    instagram?: string;
    twitter?: string;
    linkedin?: string;
    tiktok?: string;
    whatsapp?: string;
  };
}

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
  video?: {
    asset: {
      _ref: string;
      _type: string;
      url?: string;
    };
    title?: string;
  };
  bedrooms?: number;
  bathrooms?: number;
  area?: number;
  floors?: number;
  floorPosition?: number;
  parking?: number;
  yearBuilt?: number;
  furnished?: boolean;
  features?: string[];
  isFeatured: boolean;
  publishedAt: string;
}
