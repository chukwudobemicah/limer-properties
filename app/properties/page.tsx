"use client";

import React, { Suspense, useEffect, useRef, useState } from "react";
import { useSearchParams } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import { Filter, X } from "lucide-react";
import PropertyCard from "@/component/PropertyCard";
import AdvancedPropertyFilter from "@/component/AdvancedPropertyFilter";
import PropertyInquiryForm from "@/component/PropertyInquiryForm";
import { useSanityProperties } from "@/hooks/useSanityProperties";
import { useSanityFilters } from "@/hooks/useSanityFilters";
import {
  DEFAULT_MAX_PRICE,
  useSanityPropertyFilter,
} from "@/hooks/useSanityPropertyFilter";
import { useSanityCompanyInfo } from "@/hooks/useSanityCompanyInfo";
import PropertyCardSkeleton from "@/component/PropertyCardSkeleton";

function PropertiesContent() {
  const searchParams = useSearchParams();
  const [isFilterDrawerOpen, setIsFilterDrawerOpen] = useState(false);
  const { properties, loading: propertiesLoading } = useSanityProperties();
  const { loading: filtersLoading } = useSanityFilters();
  const { companyInfo, loading: companyLoading } = useSanityCompanyInfo();

  const {
    filteredProperties,
    selectedType,
    setSelectedType,
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
    searchTerm,
    setSearchTerm,
    resetFilters,
  } = useSanityPropertyFilter({ properties, initialPurpose: "all" });

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
    const searchParam = searchParams.get("search");

    // Support both "location" and "search" params for backward compatibility
    if (searchParam) {
      setSearchTerm(searchParam);
    } else if (locationParam) {
      setSearchTerm(locationParam);
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
    setSearchTerm,
    setSelectedBedrooms,
    setSelectedBathrooms,
    setSelectedStructure,
    setSelectedFurnished,
    setPriceRange,
  ]);

  const filterComponent = (
    <AdvancedPropertyFilter
      searchTerm={searchTerm}
      selectedBedrooms={selectedBedrooms}
      selectedBathrooms={selectedBathrooms}
      selectedStructure={selectedStructure}
      selectedFurnished={selectedFurnished}
      priceRange={priceRange}
      onSearchTermChange={setSearchTerm}
      onBedroomsChange={setSelectedBedrooms}
      onBathroomsChange={setSelectedBathrooms}
      onStructureChange={setSelectedStructure}
      onFurnishedChange={setSelectedFurnished}
      onPriceRangeChange={setPriceRange}
      onResetFilters={resetFilters}
      resultsCount={filteredProperties.length}
    />
  );

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Page Header */}
      <section className="bg-primary text-white py-12">
        <div className="max-w-[95%] mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between mb-4">
            <h1 className="text-4xl md:text-5xl font-bold">
              Properties For Sale
            </h1>
            <button
              onClick={() => setIsFilterDrawerOpen(true)}
              className="lg:hidden inline-flex items-center gap-2 bg-white/20 hover:bg-white/30 backdrop-blur-sm text-white px-4 py-2 rounded-lg text-sm font-medium transition-colors duration-200"
            >
              <Filter size={20} />
              Filters
            </button>
          </div>
          <p className="text-xl text-white/90">
            Find your property from our extensive collection of properties for
            sale
          </p>
        </div>
      </section>

      {/* Main Content */}
      <section className="py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
            {/* Filter Sidebar - Hidden on mobile */}
            <aside className="hidden lg:block lg:col-span-1">
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
                filterComponent
              )}
            </aside>

            {/* Properties Grid */}
            <main className="lg:col-span-3">
              {loading ? (
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {[...Array(9)].map((_, index) => (
                    <PropertyCardSkeleton key={index} />
                  ))}
                </div>
              ) : filteredProperties.length > 0 ? (
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {filteredProperties.map((property) => (
                    <PropertyCard
                      key={property._id}
                      property={property}
                      phoneNumber={companyInfo?.phone || ""}
                    />
                  ))}
                </div>
              ) : (
                <PropertyInquiryForm
                  companyInfo={companyInfo}
                  locationQuery={searchTerm}
                  priceRange={priceRange}
                />
              )}
            </main>
          </div>
        </div>
      </section>

      {/* Mobile Filter Drawer */}
      <AnimatePresence>
        {isFilterDrawerOpen && (
          <>
            {/* Backdrop */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.2 }}
              onClick={() => setIsFilterDrawerOpen(false)}
              className="fixed inset-0 bg-black/50 z-40 lg:hidden"
            />

            {/* Drawer */}
            <motion.div
              initial={{ x: "100%" }}
              animate={{ x: 0 }}
              exit={{ x: "100%" }}
              transition={{ type: "tween", duration: 0.3 }}
              className="fixed top-0 right-0 bottom-0 w-full max-w-sm bg-white shadow-xl z-50 lg:hidden overflow-y-auto"
            >
              <div className="sticky top-0 bg-white border-b border-gray-200 px-6 py-4 flex items-center justify-between z-10">
                <h2 className="text-xl font-bold text-gray-900">Filters</h2>
                <button
                  onClick={() => setIsFilterDrawerOpen(false)}
                  className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
                  aria-label="Close filters"
                >
                  <X size={24} className="text-gray-600" />
                </button>
              </div>

              <div className="p-6">
                {loading ? (
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
                  </div>
                ) : (
                  <div className="bg-white rounded-lg shadow-none p-0">
                    {filterComponent}
                    <button
                      onClick={() => setIsFilterDrawerOpen(false)}
                      className="w-full mt-6 bg-primary text-white px-6 py-3 rounded-lg font-medium hover:bg-primary-dark transition-colors"
                    >
                      Apply Filters
                    </button>
                  </div>
                )}
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </div>
  );
}

export default function PropertiesPage() {
  return (
    <Suspense
      fallback={
        <div className="min-h-screen bg-gray-50 flex items-center justify-center">
          <div className="text-center">
            <div className="inline-block h-8 w-8 animate-spin rounded-full border-4 border-solid border-primary border-r-transparent"></div>
            <p className="mt-4 text-gray-600">Loading properties...</p>
          </div>
        </div>
      }
    >
      <PropertiesContent />
    </Suspense>
  );
}
