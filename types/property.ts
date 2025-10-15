export type PropertyType = "house-sale" | "house-rent" | "land" | "shortlet";
export type PropertyStatus = "available" | "sold" | "rented";

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
  createdAt: Date;
}

export interface FilterOptions {
  type: PropertyType | "all";
  location: string;
  minPrice: number;
  maxPrice: number;
  bedrooms: number | "all";
  bathrooms: number | "all";
}
