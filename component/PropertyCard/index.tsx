import React from "react";
import Image from "next/image";
import Link from "next/link";
import { MapPin, Bed, Bath, Maximize, Tag, MessageCircle } from "lucide-react";
import { SanityProperty } from "@/types/sanity";
import { formatPrice, generateWhatsAppLink } from "@/utils/functions";
import { urlFor } from "@/lib/sanity.image";
import Button from "@/component/Button";

interface PropertyCardProps {
  property: SanityProperty;
}

export default function PropertyCard({ property }: PropertyCardProps) {
  const propertyTypeSlug = property.propertyType.slug.current;
  const propertyTypeTitle = property.propertyType.title;

  const getPropertyTypeLabel = (type: string) => {
    const labels: Record<string, string> = {
      "house-for-sale": "For Sale",
      "house-for-rent": "For Rent",
      land: "Land",
      shortlet: "Shortlet",
    };
    return labels[type] || type;
  };

  const getPriceLabel = (type: string) => {
    if (type === "house-for-rent") return "per year";
    if (type === "shortlet") return "per night";
    return "";
  };

  const getImageUrl = () => {
    try {
      if (property.images?.[0]?.asset) {
        const url = urlFor(property.images[0].asset)
          .width(600)
          .height(400)
          .url();
        return url || null;
      }
      return null;
    } catch (error) {
      console.error("Error generating image URL:", error);
      return null;
    }
  };

  const imageUrl = getImageUrl();

  return (
    <div className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-xl transition-shadow duration-300">
      {/* Image */}
      <div className="relative h-64 overflow-hidden group bg-gray-200">
        {imageUrl ? (
          <Image
            src={imageUrl}
            alt={property.images[0]?.alt || property.title}
            fill
            className="object-cover group-hover:scale-110 transition-transform duration-300"
          />
        ) : (
          <div className="absolute inset-0 flex items-center justify-center text-gray-400">
            <div className="text-center">
              <svg
                className="mx-auto h-12 w-12 text-gray-300"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z"
                />
              </svg>
              <p className="mt-2 text-sm">No image</p>
            </div>
          </div>
        )}
        <div className="absolute top-4 left-4">
          <span className="bg-primary text-white px-3 py-1 rounded-full text-sm font-semibold">
            {getPropertyTypeLabel(propertyTypeSlug)}
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
            {property.location.name}, {property.location.city.name}
          </span>
        </div>

        {/* Description */}
        <p className="text-gray-600 text-sm mb-4 line-clamp-2">
          {property.description}
        </p>

        {/* Property Details */}
        {propertyTypeSlug !== "land" && (
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
            {property.area && (
              <div className="flex items-center">
                <Maximize size={18} className="mr-1" />
                <span className="text-sm">{property.area} sqm</span>
              </div>
            )}
          </div>
        )}

        {propertyTypeSlug === "land" && property.area && (
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
            {getPriceLabel(propertyTypeSlug) && (
              <span className="text-xs text-gray-500">
                {getPriceLabel(propertyTypeSlug)}
              </span>
            )}
          </div>
        </div>

        {/* Action Buttons */}
        <div className="grid grid-cols-2 gap-3">
          <Button
            variant="primary"
            href={`/property/${property.slug.current}`}
            className="w-full text-sm"
          >
            View Details
          </Button>
          <a
            href={generateWhatsAppLink(property.title, property.slug.current)}
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
