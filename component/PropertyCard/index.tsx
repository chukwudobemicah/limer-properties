import React from "react";
import Image from "next/image";
import Link from "next/link";
import { MapPin, Bed, Bath, Maximize, Tag, MessageCircle } from "lucide-react";
import { Property } from "@/types/property";
import { formatPrice, generateWhatsAppLink } from "@/utils/functions";
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

        {/* Price */}
        <div className="flex items-center pt-4 border-t border-gray-200 mb-4">
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

        {/* Action Buttons */}
        <div className="grid grid-cols-2 gap-3">
          <Button
            variant="primary"
            href={`/property/${property.id}`}
            className="w-full text-sm"
          >
            View Details
          </Button>
          <a
            href={generateWhatsAppLink(property.title, property.id)}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex w-full items-center justify-center px-4 py-2 rounded-full font-medium transition-all duration-200 ease-in-out hover:-translate-y-1 bg-green-500 hover:bg-green-600 text-white text-sm"
          >
            <MessageCircle size={16} className="mr-1" />
            WhatsApp
          </a>
        </div>
      </div>
    </div>
  );
}
