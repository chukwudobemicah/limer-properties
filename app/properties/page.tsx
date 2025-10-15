"use client";

import React from "react";
import PropertyCard from "@/component/PropertyCard";
import AdvancedPropertyFilter from "@/component/AdvancedPropertyFilter";
import { properties, locations } from "@/data/properties";
import { useAdvancedPropertyFilter } from "@/hooks/useAdvancedPropertyFilter";

export default function PropertiesPage() {
  const {
    selectedType,
    selectedLocation,
    selectedBedrooms,
    selectedBathrooms,
    selectedStructure,
    selectedFurnished,
    priceRange,
    filteredProperties,
    setSelectedType,
    setSelectedLocation,
    setSelectedBedrooms,
    setSelectedBathrooms,
    setSelectedStructure,
    setSelectedFurnished,
    setPriceRange,
    resetFilters,
  } = useAdvancedPropertyFilter({ properties });

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
                locations={locations}
                resultsCount={filteredProperties.length}
              />
            </aside>

            {/* Properties Grid */}
            <main className="lg:col-span-3">
              {filteredProperties.length > 0 ? (
                <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
                  {filteredProperties.map((property) => (
                    <PropertyCard key={property.id} property={property} />
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
