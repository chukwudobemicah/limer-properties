"use client";

import React, { useState, useEffect } from "react";
import { useParams } from "next/navigation";
import Link from "next/link";
import Image from "next/image";
import {
  MapPin,
  Bed,
  Bath,
  Maximize,
  Calendar,
  Car,
  Check,
  ChevronLeft,
  ChevronRight,
  Building2,
} from "lucide-react";
import { client } from "@/lib/sanity.client";
import {
  SanityProperty,
  SanityPropertyType,
  SanityLocation,
  SanityPropertyStructure,
} from "@/types/sanity";
import { urlFor } from "@/lib/sanity.image";
import type { SanityImageSource } from "@sanity/image-url/lib/types/types";
import { formatPrice } from "@/utils/functions";
import { useSanityCompanyInfo } from "@/hooks/useSanityCompanyInfo";
import Button from "@/component/Button";
import PropertyDetailsSkeleton from "@/component/PropertyDetailsSkeleton";
import ContactMethodModal from "@/component/ContactMethodModal";
import { motion, AnimatePresence } from "framer-motion";

export default function PropertyDetails() {
  const params = useParams();
  const propertySlug = params.id as string;

  const [property, setProperty] = useState<SanityProperty | null>(null);
  const [loading, setLoading] = useState(true);
  const [currentMediaIndex, setCurrentMediaIndex] = useState(0);
  const [showContactModal, setShowContactModal] = useState(false);

  const { companyInfo, loading: companyLoading } = useSanityCompanyInfo();

  useEffect(() => {
    async function fetchProperty() {
      try {
        setLoading(true);
        const query = `*[_type == "property" && slug.current == $slug][0] {
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

        const data = await client.fetch<SanityProperty>(query, {
          slug: propertySlug,
        });
        setProperty(data);
      } catch (error) {
        console.error("Error fetching property:", error);
      } finally {
        setLoading(false);
      }
    }

    fetchProperty();
  }, [propertySlug]);

  // Combine images and videos into a single media array - must be before early returns
  const mediaItems = React.useMemo(() => {
    if (!property) return [];

    type MediaItem =
      | {
          type: "image";
          data: { asset: SanityImageSource; alt?: string; caption?: string };
          index: number;
        }
      | {
          type: "video";
          data: {
            asset: { _ref: string; _type: string; url?: string };
            title?: string;
          };
          index: number;
        };

    const items: MediaItem[] = [];

    // Add all images
    property.images?.forEach((image, index) => {
      items.push({ type: "image", data: image, index });
    });

    // Add all videos if they exist
    property.videos?.forEach((video, videoIndex) => {
      if (video?.asset?.url) {
        items.push({
          type: "video",
          data: video,
          index: (property.images?.length || 0) + videoIndex,
        });
      }
    });

    return items;
  }, [property]);

  if (loading || companyLoading) {
    return <PropertyDetailsSkeleton />;
  }

  if (!property) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-3xl font-bold text-gray-900 mb-4">
            Property Not Found
          </h1>
          <p className="text-gray-600 mb-8">
            The property you&apos;re looking for doesn&apos;t exist.
          </p>
          <Button variant="primary" href="/">
            Back to Home
          </Button>
        </div>
      </div>
    );
  }

  // Convert propertyType string to slug format for compatibility
  const getPropertyTypeSlug = (
    propertyType: string | SanityPropertyType
  ): string => {
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
      const ref = propertyType as { slug?: { current?: string } };
      return ref.slug?.current || "";
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

  const getLocationString = (location: string | SanityLocation): string => {
    if (typeof location === "string") {
      return location;
    }
    // Handle old reference format (shouldn't happen but for backward compatibility)
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

  const handleContact = (method: "whatsapp" | "email" | "call") => {
    if (!companyInfo || !property) return;

    const propertyDetailsUrl =
      typeof window !== "undefined"
        ? `${window.location.origin}/property/${property.slug.current}`
        : `/property/${property.slug.current}`;

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

  const nextMedia = () => {
    setCurrentMediaIndex((previous) =>
      previous === mediaItems.length - 1 ? 0 : previous + 1
    );
  };

  const previousMedia = () => {
    setCurrentMediaIndex((previous) =>
      previous === 0 ? mediaItems.length - 1 : previous - 1
    );
  };

  const currentMedia = mediaItems[currentMediaIndex];

  const getCurrentMediaUrl = () => {
    if (!currentMedia) return null;

    if (currentMedia.type === "image") {
      try {
        if (currentMedia.data?.asset) {
          const url = urlFor(currentMedia.data.asset)
            .width(1200)
            .height(800)
            .url();
          return url || null;
        }
      } catch (error) {
        console.error("Error generating image URL:", error);
      }
    }

    return null;
  };

  const currentMediaUrl = getCurrentMediaUrl();

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto px-3 sm:px-4 lg:px-6 xl:px-8 py-6 sm:py-8 lg:py-12">
        {/* Breadcrumb */}
        <div className="mb-4 sm:mb-6">
          <nav className="flex" aria-label="Breadcrumb">
            <ol className="flex items-center space-x-1 sm:space-x-2 text-xs sm:text-sm overflow-x-auto">
              <li>
                <Link href="/" className="text-gray-500 hover:text-primary">
                  Home
                </Link>
              </li>
              <li>
                <span className="text-gray-400">/</span>
              </li>
              <li>
                <Link
                  href="/properties"
                  className="text-gray-500 hover:text-primary"
                >
                  Properties
                </Link>
              </li>
              <li>
                <span className="text-gray-400">/</span>
              </li>
              <li className="text-gray-900 font-medium">{property.title}</li>
            </ol>
          </nav>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 sm:gap-6 lg:gap-8">
          {/* Main Content */}
          <div className="lg:col-span-2 space-y-4 sm:space-y-6 lg:space-y-8">
            {/* Media Gallery (Images & Video) */}
            <div className="bg-white rounded-lg shadow-md overflow-hidden">
              <div className="relative h-64 sm:h-80 md:h-96 lg:h-[500px] bg-gray-200">
                {currentMedia ? (
                  <AnimatePresence mode="wait">
                    <motion.div
                      key={currentMediaIndex}
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      exit={{ opacity: 0 }}
                      transition={{ duration: 0.3 }}
                      className="absolute inset-0"
                    >
                      {currentMedia.type === "image" && currentMediaUrl ? (
                        <Image
                          src={currentMediaUrl}
                          alt={
                            currentMedia.data?.alt ||
                            `${property.title} - Image ${currentMediaIndex + 1}`
                          }
                          fill
                          className="object-cover"
                        />
                      ) : currentMedia.type === "video" ? (
                        <video
                          controls
                          className="w-full h-full object-contain bg-black"
                          preload="metadata"
                          key={currentMediaIndex}
                        >
                          <source
                            src={currentMedia.data.asset.url}
                            type="video/mp4"
                          />
                          <source
                            src={currentMedia.data.asset.url}
                            type="video/webm"
                          />
                          <source
                            src={currentMedia.data.asset.url}
                            type="video/ogg"
                          />
                          Your browser does not support the video tag.
                        </video>
                      ) : null}
                    </motion.div>
                  </AnimatePresence>
                ) : (
                  <div className="absolute inset-0 flex items-center justify-center text-gray-400">
                    <div className="text-center">
                      <svg
                        className="mx-auto h-16 w-16 sm:h-20 sm:w-20 lg:h-24 lg:w-24 text-gray-300"
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
                      <p className="mt-2 sm:mt-4 text-sm sm:text-base lg:text-lg">
                        No media available
                      </p>
                    </div>
                  </div>
                )}

                {mediaItems.length > 1 && (
                  <>
                    <button
                      onClick={previousMedia}
                      className="absolute left-2 sm:left-4 top-1/2 -translate-y-1/2 bg-white/90 hover:bg-white text-gray-900 p-1.5 sm:p-2 rounded-full transition-all z-10 shadow-md"
                      aria-label="Previous media"
                    >
                      <ChevronLeft className="w-4 h-4 sm:w-6 sm:h-6" />
                    </button>
                    <button
                      onClick={nextMedia}
                      className="absolute right-2 sm:right-4 top-1/2 -translate-y-1/2 bg-white/90 hover:bg-white text-gray-900 p-1.5 sm:p-2 rounded-full transition-all z-10 shadow-md"
                      aria-label="Next media"
                    >
                      <ChevronRight className="w-4 h-4 sm:w-6 sm:h-6" />
                    </button>
                  </>
                )}

                <div className="absolute top-2 sm:top-4 left-2 sm:left-4 z-10">
                  <span className="bg-primary text-white px-2 sm:px-4 py-1 sm:py-2 rounded-full text-xs sm:text-sm font-semibold">
                    {getPropertyTypeLabel(propertyTypeSlug)}
                  </span>
                </div>

                {property.isFeatured && (
                  <div className="absolute top-2 sm:top-4 right-2 sm:right-4 z-10">
                    <span className="bg-accent text-white px-2 sm:px-4 py-1 sm:py-2 rounded-full text-xs sm:text-sm font-semibold">
                      Featured
                    </span>
                  </div>
                )}
              </div>

              {/* Thumbnail Gallery */}
              {mediaItems.length > 1 && (
                <div className="p-2 sm:p-3 lg:p-4 flex gap-1.5 sm:gap-2 overflow-x-auto">
                  {mediaItems.map((media, index) => {
                    if (media.type === "image") {
                      const getThumbnailUrl = () => {
                        try {
                          if (media.data?.asset) {
                            const url = urlFor(media.data.asset)
                              .width(160)
                              .height(160)
                              .url();
                            return url || null;
                          }
                          return null;
                        } catch {
                          return null;
                        }
                      };

                      const thumbnailUrl = getThumbnailUrl();

                      if (!thumbnailUrl) return null;

                      return (
                        <button
                          key={index}
                          onClick={() => setCurrentMediaIndex(index)}
                          className={`relative w-16 h-16 sm:w-20 sm:h-20 flex-shrink-0 rounded-md sm:rounded-lg overflow-hidden transition-all ${
                            index === currentMediaIndex
                              ? "ring-2 ring-primary ring-offset-2"
                              : "opacity-60 hover:opacity-100"
                          }`}
                        >
                          <Image
                            src={thumbnailUrl}
                            alt={
                              media.data.alt || `Thumbnail ${media.index + 1}`
                            }
                            fill
                            className="object-cover"
                          />
                        </button>
                      );
                    } else {
                      // Video thumbnail
                      return (
                        <button
                          key={index}
                          onClick={() => setCurrentMediaIndex(index)}
                          className={`relative w-16 h-16 sm:w-20 sm:h-20 flex-shrink-0 rounded-md sm:rounded-lg overflow-hidden bg-gray-900 transition-all ${
                            index === currentMediaIndex
                              ? "ring-2 ring-primary ring-offset-2"
                              : "opacity-60 hover:opacity-100"
                          }`}
                        >
                          <div className="absolute inset-0 flex items-center justify-center">
                            <svg
                              className="w-6 h-6 sm:w-8 sm:h-8 text-white"
                              fill="currentColor"
                              viewBox="0 0 20 20"
                            >
                              <path d="M6.3 2.841A1.5 1.5 0 004 4.11V15.89a1.5 1.5 0 002.3 1.269l9.344-5.89a1.5 1.5 0 000-2.538L6.3 2.84z" />
                            </svg>
                          </div>
                          <span
                            className="absolute bottom-1 left-1 right-1 text-[10px] sm:text-xs text-white bg-black/60 px-1 py-0.5 rounded text-center truncate"
                            title={media.data.title || "Video"}
                          >
                            {media.data.title || "Video"}
                          </span>
                        </button>
                      );
                    }
                  })}
                </div>
              )}
            </div>

            {/* Property Details */}
            <div className="bg-white rounded-lg shadow-md p-4 sm:p-6">
              <h1 className="text-2xl sm:text-3xl font-bold text-gray-900 mb-3 sm:mb-4">
                {property.title}
              </h1>

              <div className="flex items-center text-gray-600 mb-4 sm:mb-6">
                <MapPin className="w-4 h-4 sm:w-5 sm:h-5 mr-1.5 sm:mr-2 flex-shrink-0" />
                <span className="text-sm sm:text-base lg:text-lg">
                  {getLocationString(property.location)}
                </span>
              </div>

              <div className="grid grid-cols-2 sm:flex sm:flex-wrap gap-3 sm:gap-4 lg:gap-6 mb-4 sm:mb-6 pb-4 sm:pb-6 border-b border-gray-200">
                {property.bedrooms && (
                  <div className="flex items-center">
                    <Bed className="w-5 h-5 sm:w-6 sm:h-6 mr-1.5 sm:mr-2 text-primary flex-shrink-0" />
                    <div>
                      <p className="text-xs sm:text-sm text-gray-600">
                        Bedrooms
                      </p>
                      <p className="text-black text-sm sm:text-base font-semibold">
                        {property.bedrooms}
                      </p>
                    </div>
                  </div>
                )}
                {property.bathrooms && (
                  <div className="flex items-center">
                    <Bath className="w-5 h-5 sm:w-6 sm:h-6 mr-1.5 sm:mr-2 text-primary flex-shrink-0" />
                    <div>
                      <p className="text-xs sm:text-sm text-gray-600">
                        Bathrooms
                      </p>
                      <p className="text-black text-sm sm:text-base font-semibold">
                        {property.bathrooms}
                      </p>
                    </div>
                  </div>
                )}
                {property.area && (
                  <div className="flex items-center">
                    <Maximize className="w-5 h-5 sm:w-6 sm:h-6 mr-1.5 sm:mr-2 text-primary flex-shrink-0" />
                    <div>
                      <p className="text-xs sm:text-sm text-gray-600">Area</p>
                      <p className="text-black text-sm sm:text-base font-semibold">
                        {property.area} sqm
                      </p>
                    </div>
                  </div>
                )}
                {property.structure && (
                  <div className="flex items-center">
                    <Building2 className="w-5 h-5 sm:w-6 sm:h-6 mr-1.5 sm:mr-2 text-primary flex-shrink-0" />
                    <div>
                      <p className="text-xs sm:text-sm text-gray-600">
                        Structure
                      </p>
                      <p className="text-black text-sm sm:text-base font-semibold">
                        {typeof property.structure === "string"
                          ? property.structure
                          : (property.structure as SanityPropertyStructure)
                              ?.title || "N/A"}
                      </p>
                    </div>
                  </div>
                )}
                {property.floors && (
                  <div className="flex items-center">
                    <Building2 className="w-5 h-5 sm:w-6 sm:h-6 mr-1.5 sm:mr-2 text-primary flex-shrink-0" />
                    <div>
                      <p className="text-xs sm:text-sm text-gray-600">Floors</p>
                      <p className="text-black text-sm sm:text-base font-semibold">
                        {property.floors}{" "}
                        {property.floors === 1 ? "floor" : "floors"}
                      </p>
                    </div>
                  </div>
                )}
                {property.floorPosition !== undefined &&
                  property.floorPosition !== null && (
                    <div className="flex items-center">
                      <Building2 className="w-5 h-5 sm:w-6 sm:h-6 mr-1.5 sm:mr-2 text-primary flex-shrink-0" />
                      <div>
                        <p className="text-xs sm:text-sm text-gray-600">
                          Floor Position
                        </p>
                        <p className="text-black text-sm sm:text-base font-semibold">
                          {property.floorPosition === 0
                            ? "Ground Floor"
                            : `${property.floorPosition}${
                                property.floorPosition === 1
                                  ? "st"
                                  : property.floorPosition === 2
                                  ? "nd"
                                  : property.floorPosition === 3
                                  ? "rd"
                                  : "th"
                              } Floor`}
                        </p>
                      </div>
                    </div>
                  )}
                {property.parking && (
                  <div className="flex items-center">
                    <Car className="w-5 h-5 sm:w-6 sm:h-6 mr-1.5 sm:mr-2 text-primary flex-shrink-0" />
                    <div>
                      <p className="text-xs sm:text-sm text-gray-600">
                        Parking
                      </p>
                      <p className="text-black text-sm sm:text-base font-semibold">
                        {property.parking} spaces
                      </p>
                    </div>
                  </div>
                )}
                {property.yearBuilt && (
                  <div className="flex items-center">
                    <Calendar className="w-5 h-5 sm:w-6 sm:h-6 mr-1.5 sm:mr-2 text-primary flex-shrink-0" />
                    <div>
                      <p className="text-xs sm:text-sm text-gray-600">
                        Year Built
                      </p>
                      <p className="text-black text-sm sm:text-base font-semibold">
                        {property.yearBuilt}
                      </p>
                    </div>
                  </div>
                )}
              </div>

              <div>
                <h2 className="text-xl sm:text-2xl font-bold text-gray-900 mb-3 sm:mb-4">
                  Description
                </h2>
                <p className="text-sm sm:text-base text-gray-600 leading-relaxed">
                  {property.description}
                </p>
              </div>
            </div>

            {/* Features */}
            {property.features && property.features.length > 0 && (
              <div className="bg-white rounded-lg shadow-md p-4 sm:p-6">
                <h2 className="text-xl sm:text-2xl font-bold text-gray-900 mb-3 sm:mb-4">
                  Features & Amenities
                </h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-2 sm:gap-3 md:gap-4">
                  {property.features.map((feature, index) => (
                    <div key={index} className="flex items-center">
                      <Check className="w-4 h-4 sm:w-5 sm:h-5 text-success mr-2 flex-shrink-0" />
                      <span className="text-xs sm:text-sm md:text-base text-gray-700">
                        {feature}
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>

          {/* Sidebar */}
          <div className="lg:col-span-1">
            <div className="bg-white rounded-lg shadow-md p-4 sm:p-5 lg:p-6 sticky top-4 sm:top-6 lg:top-24">
              <div className="mb-4 sm:mb-6">
                <p className="text-xs sm:text-sm text-gray-600 mb-1">Price</p>
                <p className="text-2xl sm:text-3xl lg:text-4xl font-bold text-primary">
                  {formatPrice(property.price)}
                </p>
                {getPriceLabel(propertyTypeSlug) && (
                  <p className="text-xs sm:text-sm text-gray-600 mt-1">
                    {getPriceLabel(propertyTypeSlug)}
                  </p>
                )}
              </div>

              {property.furnished !== undefined && (
                <div className="mb-4 sm:mb-6 pb-4 sm:pb-6 border-b border-gray-200">
                  <p className="text-xs sm:text-sm text-gray-600">Status</p>
                  <p className="text-black text-sm sm:text-base font-semibold">
                    {property.furnished ? "Furnished" : "Unfurnished"}
                  </p>
                </div>
              )}

              {property.documentTitle && (
                <div className="mb-4 sm:mb-6 pb-4 sm:pb-6 border-b border-gray-200">
                  <p className="text-xs sm:text-sm text-gray-600">
                    Document Title
                  </p>
                  <p className="text-black text-sm sm:text-base font-semibold">
                    {property.documentTitle}
                  </p>
                </div>
              )}

              <div className="space-y-3 sm:space-y-4">
                <Button
                  variant="primary"
                  className="w-full text-sm sm:text-base"
                  onClick={() => setShowContactModal(true)}
                >
                  Contact Us
                </Button>
              </div>

              <div className="mt-4 sm:mt-6 pt-4 sm:pt-6 border-t border-gray-200">
                <h3 className="text-black text-sm sm:text-base font-semibold text-gray-900 mb-2 sm:mb-4">
                  Need Help?
                </h3>
                <p className="text-xs sm:text-sm text-gray-600 mb-3 sm:mb-4">
                  Contact our team for more information about this property.
                </p>
                <div className="space-y-1.5 sm:space-y-2 text-xs sm:text-sm">
                  {companyInfo?.phone && (
                    <p className="text-gray-700">
                      <span className="font-medium">Phone:</span>{" "}
                      {companyInfo.phone}
                    </p>
                  )}
                  {companyInfo?.email && (
                    <p className="text-gray-700">
                      <span className="font-medium">Email:</span>{" "}
                      {companyInfo.email}
                    </p>
                  )}
                </div>
              </div>
            </div>
          </div>
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
