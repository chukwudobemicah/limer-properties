import React, { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import { MapPin, Bed, Bath, Maximize, Tag } from "lucide-react";
import { SanityProperty, SanityCompanyInfo } from "@/types/sanity";
import { formatPrice } from "@/utils/functions";
import { urlFor } from "@/lib/sanity.image";
import { motion, AnimatePresence } from "framer-motion";
import ContactMethodModal from "@/component/ContactMethodModal";

interface PropertyCardProps {
  property: SanityProperty;
  companyInfo: SanityCompanyInfo | null;
}

export default function PropertyCard({
  property,
  companyInfo,
}: PropertyCardProps) {
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [showContactModal, setShowContactModal] = useState(false);

  // Convert propertyType string to slug format for compatibility
  const getPropertyTypeSlug = (propertyType: string | any): string => {
    if (typeof propertyType === "string") {
      // Normalize to slug format
      const normalized = propertyType.toLowerCase().replace(/\s+/g, "-");
      // Check for common variations
      if (
        normalized.includes("house-for-sale") ||
        normalized.includes("for-sale")
      ) {
        return "house-for-sale";
      }
      if (
        normalized.includes("house-for-rent") ||
        normalized.includes("for-rent")
      ) {
        return "house-for-rent";
      }
      if (normalized.includes("land")) {
        return "land";
      }
      if (normalized.includes("shortlet")) {
        return "shortlet";
      }
      return normalized;
    }
    // Handle old reference format (backward compatibility)
    if (
      propertyType &&
      typeof propertyType === "object" &&
      "slug" in propertyType
    ) {
      return propertyType.slug?.current || "";
    }
    return "";
  };

  const propertyTypeSlug = getPropertyTypeSlug(property.propertyType);

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

  const getLocationString = (location: string | any): string => {
    if (typeof location === "string") {
      return location;
    }
    // Handle old reference format (for backward compatibility)
    if (location && typeof location === "object") {
      if (location.name) {
        const parts = [location.name];
        if (location.city?.name) parts.push(location.city.name);
        if (location.state?.name) parts.push(location.state.name);
        return parts.join(", ");
      }
    }
    return "Location not specified";
  };

  // Get all image URLs
  const getAllImageUrls = () => {
    try {
      if (!property.images || property.images.length === 0) return [];

      return property.images
        .map((image) => {
          try {
            if (image?.asset) {
              return urlFor(image.asset).width(600).height(400).url();
            }
            return null;
          } catch {
            return null;
          }
        })
        .filter((url): url is string => url !== null);
    } catch (error) {
      console.error("Error generating image URLs:", error);
      return [];
    }
  };

  const imageUrls = getAllImageUrls();
  const hasMultipleImages = imageUrls.length > 1;

  // Auto-slide effect for multiple images
  useEffect(() => {
    if (!hasMultipleImages) return;

    const interval = setInterval(() => {
      setCurrentImageIndex((previous) =>
        previous === imageUrls.length - 1 ? 0 : previous + 1
      );
    }, 4000); // Change image every 4 seconds

    return () => clearInterval(interval);
  }, [hasMultipleImages, imageUrls.length]);

  // Generate full property details URL
  const propertyDetailsUrl =
    typeof window !== "undefined"
      ? `${window.location.origin}/property/${property.slug.current}`
      : `/property/${property.slug.current}`;

  const handleContact = (method: "whatsapp" | "email" | "call") => {
    if (!companyInfo) return;

    const locationString = getLocationString(property.location);
    const propertyDetails = `Property: ${property.title}
Location: ${locationString}
Price: ${formatPrice(property.price)}
${property.bedrooms ? `Bedrooms: ${property.bedrooms}` : ""}
${property.bathrooms ? `Bathrooms: ${property.bathrooms}` : ""}
${property.documentTitle ? `Document Title: ${property.documentTitle}` : ""}

View property: ${propertyDetailsUrl}`;

    if (method === "call" && companyInfo.phone) {
      window.location.href = `tel:${companyInfo.phone.replace(/\s+/g, "")}`;
    } else if (method === "whatsapp" && companyInfo.phone) {
      const whatsappMessage = encodeURIComponent(
        `Hello! I'm interested in this property:\n\n${propertyDetails}\n\nPlease provide more information.`
      );
      const whatsappUrl = `https://wa.me/${companyInfo.phone.replace(
        /\D/g,
        ""
      )}?text=${whatsappMessage}`;
      window.open(whatsappUrl, "_blank", "noopener,noreferrer");
    } else if (method === "email" && companyInfo.email) {
      const subject = encodeURIComponent(`Inquiry about ${property.title}`);
      const emailBody = encodeURIComponent(
        `Hello! I'm interested in this property:\n\n${propertyDetails}\n\nPlease provide more information.\n\nThank you!`
      );
      const mailtoUrl = `mailto:${companyInfo.email}?subject=${subject}&body=${emailBody}`;
      window.location.href = mailtoUrl;
    }

    setShowContactModal(false);
  };

  return (
    <div className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-xl transition-shadow duration-300 group">
      {/* Image Slider */}
      <Link href={`/property/${property.slug.current}`} className="block">
        <div className="relative h-64 overflow-hidden bg-gray-200">
          {imageUrls.length > 0 ? (
            <>
              <AnimatePresence mode="wait">
                <motion.div
                  key={currentImageIndex}
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.5 }}
                  className="absolute inset-0"
                >
                  <Image
                    src={imageUrls[currentImageIndex]}
                    alt={
                      property.images[currentImageIndex]?.alt || property.title
                    }
                    fill
                    className="object-cover group-hover:scale-110 transition-transform duration-300"
                  />
                </motion.div>
              </AnimatePresence>

              {/* Image Indicators */}
              {hasMultipleImages && (
                <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 flex gap-2 z-10">
                  {imageUrls.map((_, index) => (
                    <button
                      key={index}
                      onClick={(event) => {
                        event.preventDefault();
                        event.stopPropagation();
                        setCurrentImageIndex(index);
                      }}
                      className={`w-2 h-2 rounded-full transition-all duration-300 ${
                        index === currentImageIndex
                          ? "bg-white w-6"
                          : "bg-white/60 hover:bg-white/80"
                      }`}
                      aria-label={`View image ${index + 1}`}
                    />
                  ))}
                </div>
              )}
            </>
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
          <div className="absolute top-4 left-4 z-10">
            <span className="bg-primary text-white px-3 py-1 rounded-full text-sm font-semibold">
              {getPropertyTypeLabel(propertyTypeSlug)}
            </span>
          </div>
          {property.isFeatured && (
            <div className="absolute top-4 right-4 z-10">
              <span className="bg-accent text-white px-3 py-1 rounded-full text-sm font-semibold">
                Featured
              </span>
            </div>
          )}
        </div>
      </Link>

      {/* Content */}
      <div className="p-6">
        <Link href={`/property/${property.slug.current}`} className="block">
          {/* Title */}
          <h3 className="text-xl font-bold text-gray-900 mb-2 line-clamp-1">
            {property.title}
          </h3>

          {/* Location */}
          <div className="flex items-center text-gray-600 mb-4">
            <MapPin size={16} className="mr-1" />
            <span className="text-sm">
              {getLocationString(property.location)}
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
        </Link>

        {/* Action Buttons */}
        <div className="grid grid-cols-2 gap-3">
          <Link
            href={`/property/${property.slug.current}`}
            className="inline-flex w-full items-center justify-center px-4 py-2 rounded-full font-medium transition-all duration-200 ease-in-out hover:-translate-y-1 bg-primary hover:bg-primary-dark text-white text-sm"
          >
            View Details
          </Link>
          <button
            onClick={(event) => {
              event.preventDefault();
              event.stopPropagation();
              setShowContactModal(true);
            }}
            className="inline-flex w-full items-center justify-center px-4 py-2 rounded-full font-medium transition-all duration-200 ease-in-out hover:-translate-y-1 bg-primary hover:bg-primary-dark text-white text-sm"
          >
            Contact Us
          </button>
        </div>
      </div>

      <ContactMethodModal
        isOpen={showContactModal}
        onClose={() => setShowContactModal(false)}
        companyInfo={companyInfo}
        onSubmit={handleContact}
        title="Contact us about this property"
        description="Choose how you'd like to get in touch with us."
      />
    </div>
  );
}
