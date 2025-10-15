export type PropertyType = "house-sale" | "house-rent" | "land" | "shortlet";
export type PropertyStatus = "available" | "sold" | "rented";
export type PropertyStructure =
  | "bungalow"
  | "duplex"
  | "flat"
  | "terrace"
  | "mansion"
  | "other";

export interface Property {
  id: string;
  title: string;
  description: string;
  type: PropertyType;
  status: PropertyStatus;
  price: number;
  location: string;
  city: string;
  state: string;
  bedrooms?: number;
  bathrooms?: number;
  area: number; // in square meters
  images: string[];
  features: string[];
  isFeatured: boolean;
  yearBuilt?: number;
  parking?: number;
  furnished?: boolean;
  structure?: PropertyStructure;
  floors?: number; // number of floors/stories
  createdAt: Date;
}

export interface FilterOptions {
  type: PropertyType | "all";
  location: string;
  minPrice: number;
  maxPrice: number;
  bedrooms: number | "all";
  bathrooms: number | "all";
  structure: PropertyStructure | "all";
  furnished: "all" | "furnished" | "unfurnished";
}
