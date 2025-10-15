import React from "react";
import Image from "next/image";
import Link from "next/link";
import { MapPin, Bed, Bath, Maximize, Tag } from "lucide-react";
import { Property } from "@/types/property";
import { formatPrice } from "@/utils/functions";
import Button from "@/component/Button";

interface PropertyCardProps {
  property: Property;
}

export default function PropertyCard({ property }: PropertyCardProps) {
  const getPropertyTypeLabel = (type: string) => {
    const labels: Record<string, string> = {
      "house-sale": "For Sale",
      "house-rent": "For Rent",
      land: "Land",
      shortlet: "Shortlet",
    };
    return labels[type] || type;
  };

  const getPriceLabel = (type: string) => {
    if (type === "house-rent") return "per year";
    if (type === "shortlet") return "per night";
    return "";
  };

  return (
    <div className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-xl transition-shadow duration-300">
      {/* Image */}
      <div className="relative h-64 overflow-hidden group">
        <Image
          src={property.images[0]}
          alt={property.title}
          fill
          className="object-cover group-hover:scale-110 transition-transform duration-300"
        />
        <div className="absolute top-4 left-4">
          <span className="bg-primary text-white px-3 py-1 rounded-full text-sm font-semibold">
            {getPropertyTypeLabel(property.type)}
          </span>
        </div>
        {property.isFeatured && (
          <div className="absolute top-4 right-4">
            <span className="bg-accent text-white px-3 py-1 rounded-full text-sm font-semibold">
              Featured
            </span>
          </div>
        )}
      </div>

      {/* Content */}
      <div className="p-6">
        {/* Title */}
        <h3 className="text-xl font-bold text-gray-900 mb-2 line-clamp-1">
          {property.title}
        </h3>

        {/* Location */}
        <div className="flex items-center text-gray-600 mb-4">
          <MapPin size={16} className="mr-1" />
          <span className="text-sm">
            {property.location}, {property.city}
          </span>
        </div>

        {/* Description */}
        <p className="text-gray-600 text-sm mb-4 line-clamp-2">
          {property.description}
        </p>

        {/* Property Details */}
        {property.type !== "land" && (
          <div className="flex items-center gap-4 mb-4 text-gray-700">
            {property.bedrooms && (
              <div className="flex items-center">
                <Bed size={18} className="mr-1" />
                <span className="text-sm">{property.bedrooms}</span>
              </div>
            )}
            {property.bathrooms && (
              <div className="flex items-center">
                <Bath size={18} className="mr-1" />
                <span className="text-sm">{property.bathrooms}</span>
              </div>
            )}
            <div className="flex items-center">
              <Maximize size={18} className="mr-1" />
              <span className="text-sm">{property.area} sqm</span>
            </div>
          </div>
        )}

        {property.type === "land" && (
          <div className="flex items-center gap-4 mb-4 text-gray-700">
            <div className="flex items-center">
              <Maximize size={18} className="mr-1" />
              <span className="text-sm">{property.area} sqm</span>
            </div>
          </div>
        )}

        {/* Price and CTA */}
        <div className="flex items-center justify-between pt-4 border-t border-gray-200">
          <div className="flex items-center">
            <Tag size={18} className="mr-1 text-primary" />
            <div className="flex flex-col">
              <span className="text-2xl font-bold text-primary">
                {formatPrice(property.price)}
              </span>
              {getPriceLabel(property.type) && (
                <span className="text-xs text-gray-500">
                  {getPriceLabel(property.type)}
                </span>
              )}
            </div>
          </div>
          <Button variant="primary" href={`/property/${property.id}`}>
            View Details
          </Button>
        </div>
      </div>
    </div>
  );
}
