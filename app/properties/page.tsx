"use client";

import React from "react";
import PropertyCard from "@/component/PropertyCard";
import AdvancedPropertyFilter from "@/component/AdvancedPropertyFilter";
import { useSanityProperties } from "@/hooks/useSanityProperties";
import { useSanityFilters } from "@/hooks/useSanityFilters";
import { useSanityPropertyFilter } from "@/hooks/useSanityPropertyFilter";
import { Loader2 } from "lucide-react";

export default function PropertiesPage() {
  const { properties, loading: propertiesLoading } = useSanityProperties();
  const { locations, loading: filtersLoading } = useSanityFilters();

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
    resetFilters,
  } = useSanityPropertyFilter({ properties });

  const loading = propertiesLoading || filtersLoading;

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
                <div className="bg-white rounded-lg shadow-md p-8">
                  <div className="flex justify-center items-center">
                    <Loader2 className="animate-spin text-primary" size={32} />
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
                  locations={locations.map((loc) => loc.slug.current)}
                  resultsCount={filteredProperties.length}
                />
              )}
            </aside>

            {/* Properties Grid */}
            <main className="lg:col-span-3">
              {loading ? (
                <div className="flex justify-center items-center py-12">
                  <Loader2 className="animate-spin text-primary" size={48} />
                </div>
              ) : filteredProperties.length > 0 ? (
                <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
                  {filteredProperties.map((property) => (
                    <PropertyCard key={property._id} property={property} />
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
