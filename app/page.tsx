"use client";

import React from "react";
import Hero from "@/component/Hero";
import FilterBar from "@/component/FilterBar";
import PropertyCard from "@/component/PropertyCard";
import ContactSection from "@/component/ContactSection";
import { properties, locations } from "@/data/properties";
import { usePropertyFilter } from "@/hooks/usePropertyFilter";
import { CheckCircle } from "lucide-react";

export default function Home() {
  const {
    selectedType,
    selectedLocation,
    filteredProperties,
    handleTypeChange,
    handleLocationChange,
  } = usePropertyFilter({ properties });

  const featuredProperties = properties.filter(
    (property) => property.isFeatured
  );

  return (
    <div className="min-h-screen">
      {/* Hero Section with Slider */}
      <Hero />

      {/* Filter Section */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-16">
        <FilterBar
          selectedType={selectedType}
          selectedLocation={selectedLocation}
          onTypeChange={handleTypeChange}
          onLocationChange={handleLocationChange}
          locations={locations}
        />
      </section>

      {/* Featured Properties Section */}
      <section className="py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              Featured Properties
            </h2>
            <p className="text-lg text-gray-600">
              Discover our hand-picked selection of premium properties
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {featuredProperties.map((property) => (
              <PropertyCard key={property.id} property={property} />
            ))}
          </div>
        </div>
      </section>

      {/* All Properties Section */}
      <section id="properties" className="py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              All Properties
            </h2>
            <p className="text-lg text-gray-600">
              Browse through our extensive collection of properties
            </p>
          </div>

          {filteredProperties.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {filteredProperties.map((property) => (
                <PropertyCard key={property.id} property={property} />
              ))}
            </div>
          ) : (
            <div className="text-center py-12">
              <p className="text-gray-600 text-lg">
                No properties found matching your filters. Please try adjusting
                your search criteria.
              </p>
            </div>
          )}
        </div>
      </section>

      {/* Why Choose Us Section */}
      <section className="py-16 bg-primary text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              Why Choose Limer Properties?
            </h2>
            <p className="text-lg text-white/90">
              We make finding your dream property easy and stress-free
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            <div className="text-center">
              <div className="bg-white/10 rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-4">
                <CheckCircle size={32} />
              </div>
              <h3 className="text-xl font-bold mb-2">Verified Listings</h3>
              <p className="text-white/80">
                All our properties are thoroughly verified for your peace of
                mind
              </p>
            </div>

            <div className="text-center">
              <div className="bg-white/10 rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-4">
                <CheckCircle size={32} />
              </div>
              <h3 className="text-xl font-bold mb-2">Expert Support</h3>
              <p className="text-white/80">
                Our team of experts is ready to guide you every step of the way
              </p>
            </div>

            <div className="text-center">
              <div className="bg-white/10 rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-4">
                <CheckCircle size={32} />
              </div>
              <h3 className="text-xl font-bold mb-2">Wide Selection</h3>
              <p className="text-white/80">
                Choose from a diverse range of properties across Nigeria
              </p>
            </div>

            <div className="text-center">
              <div className="bg-white/10 rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-4">
                <CheckCircle size={32} />
              </div>
              <h3 className="text-xl font-bold mb-2">Best Prices</h3>
              <p className="text-white/80">
                Get the best value for your investment with competitive pricing
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <ContactSection />
    </div>
  );
}
