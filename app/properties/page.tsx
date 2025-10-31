"use client";

import React, { useEffect, useMemo, useRef } from "react";
import { useSearchParams } from "next/navigation";
import PropertyCard from "@/component/PropertyCard";
import AdvancedPropertyFilter from "@/component/AdvancedPropertyFilter";
import { useSanityProperties } from "@/hooks/useSanityProperties";
import { useSanityFilters } from "@/hooks/useSanityFilters";
import {
  DEFAULT_MAX_PRICE,
  useSanityPropertyFilter,
} from "@/hooks/useSanityPropertyFilter";
import { useSanityCompanyInfo } from "@/hooks/useSanityCompanyInfo";
import PropertyCardSkeleton from "@/component/PropertyCardSkeleton";

export default function PropertiesPage() {
  const searchParams = useSearchParams();
  const { properties, loading: propertiesLoading } = useSanityProperties();
  const { locations, loading: filtersLoading } = useSanityFilters();
  const { companyInfo, loading: companyLoading } = useSanityCompanyInfo();

  const {
    filteredProperties,
    selectedType,
    setSelectedType,
    selectedLocation,
    setSelectedLocation,
    selectedBedrooms,
    setSelectedBedrooms,
    selectedBathrooms,
    setSelectedBathrooms,
    selectedStructure,
    setSelectedStructure,
    selectedFurnished,
    setSelectedFurnished,
    priceRange,
    setPriceRange,
    setSearchTerm,
    resetFilters,
  } = useSanityPropertyFilter({ properties, initialPurpose: "all" });

  const locationOptions = useMemo(() => {
    const seenLabels = new Set<string>();
    const seenValues = new Set<string>();

    return locations.reduce<Array<{ value: string; label: string }>>(
      (options, location) => {
        const value = location.slug?.current;
        if (!value) {
          return options;
        }

        if (seenValues.has(value)) {
          return options;
        }

        const label = [location.name, location.city?.name, location.state?.name]
          .filter((segment): segment is string => Boolean(segment))
          .join(", ")
          .trim();

        const normalizedLabel = label.toLowerCase();
        if (seenLabels.has(normalizedLabel)) {
          return options;
        }

        seenValues.add(value);
        seenLabels.add(normalizedLabel);
        options.push({ value, label: label || value });
        return options;
      },
      []
    );
  }, [locations]);

  const hasAppliedQueryParams = useRef(false);

  const loading = propertiesLoading || filtersLoading || companyLoading;

  // Handle URL query parameters
  useEffect(() => {
    if (hasAppliedQueryParams.current) {
      return;
    }

    const typeParam = searchParams.get("type");
    if (typeParam) {
      setSelectedType(typeParam);
    }

    const locationParam = searchParams.get("location");
    if (locationParam) {
      setSelectedLocation(locationParam);
    }

    const searchParam = searchParams.get("search");
    if (searchParam) {
      setSearchTerm(searchParam);
    }

    const bedroomsParam = searchParams.get("bedrooms");
    if (bedroomsParam) {
      if (bedroomsParam === "all") {
        setSelectedBedrooms("all");
      } else {
        const parsedBedrooms = Number(bedroomsParam);
        if (!Number.isNaN(parsedBedrooms)) {
          setSelectedBedrooms(parsedBedrooms);
        }
      }
    }

    const bathroomsParam = searchParams.get("bathrooms");
    if (bathroomsParam) {
      if (bathroomsParam === "all") {
        setSelectedBathrooms("all");
      } else {
        const parsedBathrooms = Number(bathroomsParam);
        if (!Number.isNaN(parsedBathrooms)) {
          setSelectedBathrooms(parsedBathrooms);
        }
      }
    }

    const structureParam = searchParams.get("structure");
    if (structureParam) {
      setSelectedStructure(structureParam);
    }

    const furnishedParam = searchParams.get("furnished");
    if (furnishedParam) {
      const normalizedFurnished = furnishedParam.toLowerCase();
      if (["all", "furnished", "unfurnished"].includes(normalizedFurnished)) {
        setSelectedFurnished(
          normalizedFurnished as "all" | "furnished" | "unfurnished"
        );
      }
    }

    const minPriceParam = searchParams.get("minPrice");
    const maxPriceParam = searchParams.get("maxPrice");

    let minPrice = 0;
    let maxPrice = DEFAULT_MAX_PRICE;
    let shouldUpdatePrice = false;

    if (minPriceParam) {
      const parsedMin = Number(minPriceParam);
      if (!Number.isNaN(parsedMin)) {
        minPrice = parsedMin;
        shouldUpdatePrice = true;
      }
    }

    if (maxPriceParam) {
      const parsedMax = Number(maxPriceParam);
      if (!Number.isNaN(parsedMax)) {
        maxPrice = parsedMax;
        shouldUpdatePrice = true;
      }
    }

    if (shouldUpdatePrice) {
      setPriceRange([minPrice, maxPrice]);
    }

    hasAppliedQueryParams.current = true;
  }, [
    searchParams,
    setSelectedType,
    setSelectedLocation,
    setSearchTerm,
    setSelectedBedrooms,
    setSelectedBathrooms,
    setSelectedStructure,
    setSelectedFurnished,
    setPriceRange,
  ]);

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Page Header */}
      <section className="bg-primary text-white py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h1 className="text-4xl md:text-5xl font-bold mb-4">
            Browse All Properties
          </h1>
          <p className="text-xl text-white/90">
            Find your perfect home from our extensive collection
          </p>
        </div>
      </section>

      {/* Main Content */}
      <section className="py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
            {/* Filter Sidebar */}
            <aside className="lg:col-span-1">
              {loading ? (
                <div className="bg-white rounded-lg shadow-md p-6 animate-pulse">
                  <div className="space-y-6">
                    <div>
                      <div className="h-5 bg-gray-200 rounded w-32 mb-3" />
                      <div className="h-10 bg-gray-200 rounded" />
                    </div>
                    <div>
                      <div className="h-5 bg-gray-200 rounded w-24 mb-3" />
                      <div className="h-10 bg-gray-200 rounded" />
                    </div>
                    <div>
                      <div className="h-5 bg-gray-200 rounded w-28 mb-3" />
                      <div className="h-10 bg-gray-200 rounded" />
                    </div>
                    <div>
                      <div className="h-5 bg-gray-200 rounded w-32 mb-3" />
                      <div className="h-10 bg-gray-200 rounded" />
                    </div>
                    <div>
                      <div className="h-5 bg-gray-200 rounded w-24 mb-3" />
                      <div className="h-10 bg-gray-200 rounded" />
                    </div>
                    <div>
                      <div className="h-5 bg-gray-200 rounded w-28 mb-3" />
                      <div className="h-10 bg-gray-200 rounded" />
                    </div>
                    <div className="pt-4">
                      <div className="h-12 bg-gray-200 rounded-lg" />
                    </div>
                  </div>
                </div>
              ) : (
                <AdvancedPropertyFilter
                  selectedType={selectedType}
                  selectedLocation={selectedLocation}
                  selectedBedrooms={selectedBedrooms}
                  selectedBathrooms={selectedBathrooms}
                  selectedStructure={selectedStructure}
                  selectedFurnished={selectedFurnished}
                  priceRange={priceRange}
                  onTypeChange={setSelectedType}
                  onLocationChange={setSelectedLocation}
                  onBedroomsChange={setSelectedBedrooms}
                  onBathroomsChange={setSelectedBathrooms}
                  onStructureChange={setSelectedStructure}
                  onFurnishedChange={setSelectedFurnished}
                  onPriceRangeChange={setPriceRange}
                  onResetFilters={resetFilters}
                  locationOptions={locationOptions}
                  resultsCount={filteredProperties.length}
                />
              )}
            </aside>

            {/* Properties Grid */}
            <main className="lg:col-span-3">
              {loading ? (
                <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
                  {[...Array(9)].map((_, index) => (
                    <PropertyCardSkeleton key={index} />
                  ))}
                </div>
              ) : filteredProperties.length > 0 ? (
                <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
                  {filteredProperties.map((property) => (
                    <PropertyCard
                      key={property._id}
                      property={property}
                      phoneNumber={companyInfo?.phone || ""}
                    />
                  ))}
                </div>
              ) : (
                <div className="bg-white rounded-lg shadow-md p-12 text-center">
                  <h3 className="text-2xl font-bold text-gray-900 mb-4">
                    No Properties Found
                  </h3>
                  <p className="text-gray-600 mb-6">
                    We couldn&apos;t find any properties matching your filters.
                    Try adjusting your search criteria.
                  </p>
                  <button
                    onClick={resetFilters}
                    className="bg-primary text-white px-6 py-3 rounded-lg font-medium hover:bg-primary-dark transition-colors"
                  >
                    Reset Filters
                  </button>
                </div>
              )}
            </main>
          </div>
        </div>
      </section>
    </div>
  );
}
