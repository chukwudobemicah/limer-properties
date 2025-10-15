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
  Loader2,
  Building2,
} from "lucide-react";
import { client } from "@/lib/sanity.client";
import { SanityProperty } from "@/types/sanity";
import { urlFor } from "@/lib/sanity.image";
import { formatPrice } from "@/utils/functions";
import Button from "@/component/Button";
import { motion, AnimatePresence } from "framer-motion";

export default function PropertyDetails() {
  const params = useParams();
  const propertySlug = params.id as string;

  const [property, setProperty] = useState<SanityProperty | null>(null);
  const [loading, setLoading] = useState(true);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  useEffect(() => {
    async function fetchProperty() {
      try {
        setLoading(true);
        const query = `*[_type == "property" && slug.current == $slug][0] {
          _id,
          _createdAt,
          title,
          slug,
          propertyType->{
            _id,
            title,
            slug
          },
          status,
          location->{
            _id,
            name,
            city->{
              _id,
              name,
              slug
            },
            state->{
              _id,
              name,
              slug
            },
            slug
          },
          structure->{
            _id,
            title,
            slug
          },
          description,
          price,
          images[]{
            asset,
            alt,
            caption
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

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <Loader2 className="animate-spin text-primary" size={48} />
      </div>
    );
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

  const propertyTypeSlug = property.propertyType.slug.current;

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

  const nextImage = () => {
    setCurrentImageIndex((previous) =>
      previous === property.images.length - 1 ? 0 : previous + 1
    );
  };

  const previousImage = () => {
    setCurrentImageIndex((previous) =>
      previous === 0 ? property.images.length - 1 : previous - 1
    );
  };

  const getCurrentImageUrl = () => {
    try {
      if (property.images?.[currentImageIndex]?.asset) {
        const url = urlFor(property.images[currentImageIndex].asset)
          .width(1200)
          .height(800)
          .url();
        return url || null;
      }
      return null;
    } catch (error) {
      console.error("Error generating image URL:", error);
      return null;
    }
  };

  const currentImageUrl = getCurrentImageUrl();

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Breadcrumb */}
        <div className="mb-6">
          <nav className="flex" aria-label="Breadcrumb">
            <ol className="flex items-center space-x-2 text-sm">
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

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Main Content */}
          <div className="lg:col-span-2 space-y-8">
            {/* Image Gallery */}
            <div className="bg-white rounded-lg shadow-md overflow-hidden">
              <div className="relative h-96 md:h-[500px] bg-gray-200">
                {currentImageUrl ? (
                  <AnimatePresence mode="wait">
                    <motion.div
                      key={currentImageIndex}
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      exit={{ opacity: 0 }}
                      transition={{ duration: 0.3 }}
                      className="absolute inset-0"
                    >
                      <Image
                        src={currentImageUrl}
                        alt={
                          property.images[currentImageIndex]?.alt ||
                          `${property.title} - Image ${currentImageIndex + 1}`
                        }
                        fill
                        className="object-cover"
                      />
                    </motion.div>
                  </AnimatePresence>
                ) : (
                  <div className="absolute inset-0 flex items-center justify-center text-gray-400">
                    <div className="text-center">
                      <svg
                        className="mx-auto h-24 w-24 text-gray-300"
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
                      <p className="mt-4 text-lg">No image available</p>
                    </div>
                  </div>
                )}

                {property.images.length > 1 && (
                  <>
                    <button
                      onClick={previousImage}
                      className="absolute left-4 top-1/2 -translate-y-1/2 bg-white/80 hover:bg-white text-gray-900 p-2 rounded-full transition-all"
                      aria-label="Previous image"
                    >
                      <ChevronLeft size={24} />
                    </button>
                    <button
                      onClick={nextImage}
                      className="absolute right-4 top-1/2 -translate-y-1/2 bg-white/80 hover:bg-white text-gray-900 p-2 rounded-full transition-all"
                      aria-label="Next image"
                    >
                      <ChevronRight size={24} />
                    </button>
                  </>
                )}

                <div className="absolute top-4 left-4">
                  <span className="bg-primary text-white px-4 py-2 rounded-full text-sm font-semibold">
                    {getPropertyTypeLabel(propertyTypeSlug)}
                  </span>
                </div>

                {property.isFeatured && (
                  <div className="absolute top-4 right-4">
                    <span className="bg-accent text-white px-4 py-2 rounded-full text-sm font-semibold">
                      Featured
                    </span>
                  </div>
                )}
              </div>

              {/* Thumbnail Gallery */}
              {property.images.length > 1 && (
                <div className="p-4 flex gap-2 overflow-x-auto">
                  {property.images.map((image, index) => {
                    const getThumbnailUrl = () => {
                      try {
                        if (image?.asset) {
                          const url = urlFor(image.asset)
                            .width(160)
                            .height(160)
                            .url();
                          return url || null;
                        }
                        return null;
                      } catch (error) {
                        return null;
                      }
                    };

                    const thumbnailUrl = getThumbnailUrl();

                    if (!thumbnailUrl) return null;

                    return (
                      <button
                        key={index}
                        onClick={() => setCurrentImageIndex(index)}
                        className={`relative w-20 h-20 flex-shrink-0 rounded-lg overflow-hidden ${
                          index === currentImageIndex
                            ? "ring-2 ring-primary"
                            : "opacity-60 hover:opacity-100"
                        }`}
                      >
                        <Image
                          src={thumbnailUrl}
                          alt={image.alt || `Thumbnail ${index + 1}`}
                          fill
                          className="object-cover"
                        />
                      </button>
                    );
                  })}
                </div>
              )}
            </div>

            {/* Property Details */}
            <div className="bg-white rounded-lg shadow-md p-6">
              <h1 className="text-3xl font-bold text-gray-900 mb-4">
                {property.title}
              </h1>

              <div className="flex items-center text-gray-600 mb-6">
                <MapPin size={20} className="mr-2" />
                <span className="text-lg">
                  {property.location.name}, {property.location.city.name},{" "}
                  {property.location.state.name}
                </span>
              </div>

              <div className="flex flex-wrap gap-6 mb-6 pb-6 border-b border-gray-200">
                {property.bedrooms && (
                  <div className="flex items-center">
                    <Bed size={24} className="mr-2 text-primary" />
                    <div>
                      <p className="text-sm text-gray-600">Bedrooms</p>
                      <p className="font-semibold">{property.bedrooms}</p>
                    </div>
                  </div>
                )}
                {property.bathrooms && (
                  <div className="flex items-center">
                    <Bath size={24} className="mr-2 text-primary" />
                    <div>
                      <p className="text-sm text-gray-600">Bathrooms</p>
                      <p className="font-semibold">{property.bathrooms}</p>
                    </div>
                  </div>
                )}
                {property.area && (
                  <div className="flex items-center">
                    <Maximize size={24} className="mr-2 text-primary" />
                    <div>
                      <p className="text-sm text-gray-600">Area</p>
                      <p className="font-semibold">{property.area} sqm</p>
                    </div>
                  </div>
                )}
                {property.structure && (
                  <div className="flex items-center">
                    <Building2 size={24} className="mr-2 text-primary" />
                    <div>
                      <p className="text-sm text-gray-600">Structure</p>
                      <p className="font-semibold">
                        {property.structure.title}
                      </p>
                    </div>
                  </div>
                )}
                {property.floors && (
                  <div className="flex items-center">
                    <Building2 size={24} className="mr-2 text-primary" />
                    <div>
                      <p className="text-sm text-gray-600">Floors</p>
                      <p className="font-semibold">
                        {property.floors}{" "}
                        {property.floors === 1 ? "floor" : "floors"}
                      </p>
                    </div>
                  </div>
                )}
                {property.floorPosition !== undefined &&
                  property.floorPosition !== null && (
                    <div className="flex items-center">
                      <Building2 size={24} className="mr-2 text-primary" />
                      <div>
                        <p className="text-sm text-gray-600">Floor Position</p>
                        <p className="font-semibold">
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
                    <Car size={24} className="mr-2 text-primary" />
                    <div>
                      <p className="text-sm text-gray-600">Parking</p>
                      <p className="font-semibold">{property.parking} spaces</p>
                    </div>
                  </div>
                )}
                {property.yearBuilt && (
                  <div className="flex items-center">
                    <Calendar size={24} className="mr-2 text-primary" />
                    <div>
                      <p className="text-sm text-gray-600">Year Built</p>
                      <p className="font-semibold">{property.yearBuilt}</p>
                    </div>
                  </div>
                )}
              </div>

              <div>
                <h2 className="text-2xl font-bold text-gray-900 mb-4">
                  Description
                </h2>
                <p className="text-gray-600 leading-relaxed">
                  {property.description}
                </p>
              </div>
            </div>

            {/* Features */}
            {property.features && property.features.length > 0 && (
              <div className="bg-white rounded-lg shadow-md p-6">
                <h2 className="text-2xl font-bold text-gray-900 mb-4">
                  Features & Amenities
                </h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {property.features.map((feature, index) => (
                    <div key={index} className="flex items-center">
                      <Check
                        size={20}
                        className="text-success mr-2 flex-shrink-0"
                      />
                      <span className="text-gray-700">{feature}</span>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>

          {/* Sidebar */}
          <div className="lg:col-span-1">
            <div className="bg-white rounded-lg shadow-md p-6 sticky top-24">
              <div className="mb-6">
                <p className="text-sm text-gray-600 mb-1">Price</p>
                <p className="text-4xl font-bold text-primary">
                  {formatPrice(property.price)}
                </p>
                {getPriceLabel(propertyTypeSlug) && (
                  <p className="text-sm text-gray-600 mt-1">
                    {getPriceLabel(propertyTypeSlug)}
                  </p>
                )}
              </div>

              {property.furnished !== undefined && (
                <div className="mb-6 pb-6 border-b border-gray-200">
                  <p className="text-sm text-gray-600">Status</p>
                  <p className="font-semibold">
                    {property.furnished ? "Furnished" : "Unfurnished"}
                  </p>
                </div>
              )}

              <div className="space-y-4">
                <Button variant="primary" className="w-full">
                  Schedule a Tour
                </Button>
                <Button variant="secondary" className="w-full">
                  Make an Inquiry
                </Button>
              </div>

              <div className="mt-6 pt-6 border-t border-gray-200">
                <h3 className="font-semibold text-gray-900 mb-4">Need Help?</h3>
                <p className="text-sm text-gray-600 mb-4">
                  Contact our team for more information about this property.
                </p>
                <div className="space-y-2 text-sm">
                  <p className="text-gray-700">
                    <span className="font-medium">Phone:</span> +234 801 234
                    5678
                  </p>
                  <p className="text-gray-700">
                    <span className="font-medium">Email:</span>{" "}
                    info@limerproperties.com
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
