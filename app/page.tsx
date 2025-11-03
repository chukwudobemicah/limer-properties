"use client";

import React from "react";
import HeroSlider from "@/component/HeroSlider";
import FilterBar from "@/component/FilterBar";
import PropertyCard from "@/component/PropertyCard";
import ContactSection from "@/component/ContactSection";
import { useSanityProperties } from "@/hooks/useSanityProperties";
import { useSanityFilters } from "@/hooks/useSanityFilters";
import {
  PropertyPurpose,
  useSanityPropertyFilter,
} from "@/hooks/useSanityPropertyFilter";
import { useSanityCompanyInfo } from "@/hooks/useSanityCompanyInfo";
import PropertyCardSkeleton from "@/component/PropertyCardSkeleton";
import FilterBarSkeleton from "@/component/FilterBarSkeleton";
import { CheckCircle } from "lucide-react";
import Image from "next/image";

type Option = {
  value: string;
  label: string;
};

const buildOptions = <T extends { slug?: { current?: string }; _id: string }>(
  items: T[],
  getLabel: (item: T) => string
): Option[] => {
  const seenValues = new Set<string>();
  const seenLabels = new Set<string>();

  return items.reduce<Option[]>((options, item) => {
    const value = item.slug?.current ?? item._id;
    if (!value || seenValues.has(value)) {
      return options;
    }

    const label = getLabel(item).trim();
    const normalizedLabel = label.toLowerCase();
    if (normalizedLabel && seenLabels.has(normalizedLabel)) {
      return options;
    }

    seenValues.add(value);
    if (normalizedLabel) {
      seenLabels.add(normalizedLabel);
    }

    options.push({ value, label: label || value });
    return options;
  }, []);
};

export default function Home() {
  const { properties, loading: propertiesLoading } = useSanityProperties();
  const {
    locations,
    propertyTypes,
    structures,
    loading: filtersLoading,
  } = useSanityFilters();
  const { companyInfo, loading: companyLoading } = useSanityCompanyInfo();

  const {
    filteredProperties,
    selectedPurpose,
    setSelectedPurpose,
    searchTerm,
    setSearchTerm,
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
  } = useSanityPropertyFilter({ properties, initialPurpose: "land" });

  const propertyTypeOptions = React.useMemo(
    () =>
      buildOptions(
        propertyTypes,
        (type) => type.title ?? type.slug?.current ?? ""
      ),
    [propertyTypes]
  );

  const locationOptions = React.useMemo(
    () =>
      buildOptions(locations, (location) =>
        [location.name, location.city?.name, location.state?.name]
          .filter((segment): segment is string => Boolean(segment))
          .join(", ")
      ),
    [locations]
  );

  const structureOptions = React.useMemo(
    () => buildOptions(structures, (structure) => structure.title ?? ""),
    [structures]
  );

  const featuredProperties = properties.filter(
    (property) => property.isFeatured
  );

  const loading = propertiesLoading || filtersLoading || companyLoading;

  return (
    <div className="min-h-screen">
      {/* Hero Section with Slider */}
      <div className="relative min-h-[80vh] flex items-center justify-center isolate">
        <div className="absolute inset-0 bg-black opacity-40" />

        <div className="absolute w-full h-full left-1/2 -z-50 -translate-x-1/2 top-1/2 -translate-y-1/2">
          <Image
            src="https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?w=1920&q=80"
            alt="Background Image"
            fill
            priority
            sizes="100vw"
            className="object-cover"
          />
        </div>
        {/* <HeroSlider /> */}
        <div>
          {loading ? (
            <FilterBarSkeleton />
          ) : (
            <FilterBar
              selectedPurpose={selectedPurpose as PropertyPurpose}
              onPurposeChange={(purpose) => setSelectedPurpose(purpose)}
              searchTerm={searchTerm}
              onSearchTermChange={(term) => setSearchTerm(term)}
              selectedType={selectedType}
              onTypeChange={(type) => setSelectedType(type)}
              selectedBedrooms={selectedBedrooms}
              onBedroomsChange={(bedrooms) => setSelectedBedrooms(bedrooms)}
              selectedBathrooms={selectedBathrooms}
              onBathroomsChange={(bathrooms) => setSelectedBathrooms(bathrooms)}
              selectedStructure={selectedStructure}
              onStructureChange={(structure) => setSelectedStructure(structure)}
              selectedFurnished={selectedFurnished}
              onFurnishedChange={(status) => setSelectedFurnished(status)}
              selectedLocation={selectedLocation}
              onLocationChange={(location) => setSelectedLocation(location)}
              priceRange={priceRange}
              onPriceRangeChange={(range) => setPriceRange(range)}
              onResetFilters={() => resetFilters()}
              propertyTypeOptions={propertyTypeOptions}
              locationOptions={locationOptions}
              structureOptions={structureOptions}
            />
          )}
        </div>
      </div>

      {/* Filter Section */}
      {/* <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-16">
        {loading ? (
          <FilterBarSkeleton />
        ) : (
          <FilterBar
            selectedType={selectedType}
            selectedLocation={selectedLocation}
            onTypeChange={(value) => setSelectedType(value)}
            onLocationChange={(value) => setSelectedLocation(value)}
            locations={locations.map((loc) => loc.slug.current)}
          />
        )}
      </section> */}

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

          {loading ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {[...Array(6)].map((_, index) => (
                <PropertyCardSkeleton key={index} />
              ))}
            </div>
          ) : featuredProperties.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {featuredProperties.map((property) => (
                <PropertyCard
                  key={property._id}
                  property={property}
                  phoneNumber={companyInfo?.phone || ""}
                />
              ))}
            </div>
          ) : (
            <div className="text-center py-12">
              <p className="text-gray-600 text-lg">
                No featured properties available at the moment.
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
