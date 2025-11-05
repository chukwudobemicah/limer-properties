"use client";

import React, { useState, useMemo } from "react";
import ContactMethodModal from "@/component/ContactMethodModal";
import { SanityCompanyInfo } from "@/types/sanity";
import { DEFAULT_MAX_PRICE } from "@/hooks/useSanityPropertyFilter";
import Select from "@/component/Select";

interface PropertyInquiryFormProps {
  companyInfo: SanityCompanyInfo | null;
  locationQuery?: string;
  priceRange?: [number, number];
  heading?: string;
}

interface FormData {
  propertyType: string;
  location: string;
  bedrooms: string;
  bathrooms: string;
  budget: string;
}

const PROPERTY_TYPES = ["Land", "House", "Estate", "Apartment", "Commercial"];

const RENT_PROPERTY_TYPES = [
  { value: "studio-apartment", label: "Studio Apartment" },
  { value: "mini-flat", label: "Mini Flat" },
  { value: "2-bedrooms-flat", label: "2 Bedrooms Flat" },
  { value: "3-bedrooms-flat", label: "3 Bedrooms Flat" },
  { value: "duplex", label: "Duplex" },
];

const formatPrice = (price: number): string => {
  return `₦${new Intl.NumberFormat("en-NG", {
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
  }).format(price)}`;
};

export default function PropertyInquiryForm({
  companyInfo,
  locationQuery,
  priceRange,
  heading,
}: PropertyInquiryFormProps) {
  const isForRent = heading?.toLowerCase().includes("rent");

  const headingText = useMemo(() => {
    if (heading) {
      return heading;
    }

    const parts: string[] = ["Couldn't find property"];

    if (locationQuery?.trim()) {
      parts.push(`in ${locationQuery.trim()}`);
    }

    if (
      priceRange &&
      (priceRange[0] > 0 || priceRange[1] < DEFAULT_MAX_PRICE)
    ) {
      const priceParts: string[] = [];
      if (priceRange[0] > 0) {
        priceParts.push(formatPrice(priceRange[0]));
      }
      if (priceRange[1] < DEFAULT_MAX_PRICE) {
        priceParts.push(formatPrice(priceRange[1]));
      }

      if (priceParts.length > 0) {
        const priceText =
          priceParts.length === 2
            ? `${priceParts[0]} - ${priceParts[1]}`
            : priceParts[0];
        parts.push(`within ${priceText}`);
      }
    }

    return parts.join(" ") + "?";
  }, [locationQuery, priceRange, heading]);
  const [showContactModal, setShowContactModal] = useState(false);
  const [formData, setFormData] = useState<FormData>({
    propertyType: "",
    location: "",
    bedrooms: "",
    bathrooms: "",
    budget: "",
  });

  const handleInputChange = (field: keyof FormData, value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  };

  const handleFormSubmit = (event: React.FormEvent) => {
    event.preventDefault();
    setShowContactModal(true);
  };

  const { propertyType, location, bedrooms, bathrooms, budget } = formData;

  // Get the label for property type if it's from the rent dropdown
  const getPropertyTypeLabel = () => {
    if (!propertyType) return "Any";
    if (isForRent) {
      const selectedOption = RENT_PROPERTY_TYPES.find(
        (option) => option.value === propertyType
      );
      return selectedOption?.label || propertyType;
    }
    return propertyType;
  };

  const detailsMessage = isForRent
    ? `Property Type: ${getPropertyTypeLabel()}
Location: ${location || "Any"}
Budget: ${budget || "Any budget"}`
    : `Property Type: ${propertyType || "Any"}
Location: ${location || "Any"}
Bedrooms: ${bedrooms || "Any"}
Bathrooms: ${bathrooms || "Any"}
Budget: ${budget || "Any budget"}`;

  const emailData = {
    subject: "Property Inquiry - Couldn't Find What I'm Looking For",
    message: `Hello! I'm looking for a property and couldn't find what I need on your website.\n\n${detailsMessage}\n\nPlease let me know if you have anything that matches my criteria.\n\nThank you!`,
  };

  const handleContact = (method: "whatsapp" | "email" | "call") => {
    if (!companyInfo) return;

    if (method === "call" && companyInfo.phone) {
      window.location.href = `tel:${companyInfo.phone.replace(/\s+/g, "")}`;
      setShowContactModal(false);
    } else if (method === "whatsapp" && companyInfo.phone) {
      const whatsappMessage = encodeURIComponent(
        `Hello! I'm looking for a property and couldn't find what I need on your website.\n\n${detailsMessage}\n\nPlease let me know if you have anything that matches my criteria.\n\nThank you!`
      );
      const whatsappUrl = `https://wa.me/${companyInfo.phone.replace(
        /\D/g,
        ""
      )}?text=${whatsappMessage}`;
      window.open(whatsappUrl, "_blank", "noopener,noreferrer");
      setShowContactModal(false);
    }
    // Email is now handled by ContactMethodModal via API
  };

  const handleModalClose = () => {
    setShowContactModal(false);
    // Reset form after successful email send (handled by ContactMethodModal)
  };

  return (
    <>
      <div className="bg-white rounded-lg shadow-md p-8">
        <h3 className="text-2xl font-bold text-gray-900 mb-4 text-center">
          {headingText}
        </h3>
        <p className="text-gray-600 mb-6 text-center">
          No worries! Let us know what you need and we'll find the perfect
          property for you.
        </p>

        <form onSubmit={handleFormSubmit} className="space-y-4">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {/* Property Type */}
            <div className="sm:col-span-2">
              {isForRent ? (
                <Select
                  label="Property Type"
                  value={formData.propertyType}
                  onChange={(value) =>
                    handleInputChange("propertyType", String(value))
                  }
                  options={RENT_PROPERTY_TYPES}
                  placeholder="Select property type"
                  labelId="property-type"
                />
              ) : (
                <>
                  <label
                    htmlFor="property-type"
                    className="block text-sm font-medium text-gray-700 mb-2"
                  >
                    Property Type
                  </label>
                  <input
                    id="property-type"
                    type="text"
                    list="property-types-list"
                    value={formData.propertyType}
                    onChange={(event) =>
                      handleInputChange("propertyType", event.target.value)
                    }
                    placeholder="Land, House, Estate, Apartment, Commercial"
                    className="w-full rounded-lg border border-gray-300 bg-white py-2.5 px-4 text-sm text-gray-900 focus:border-primary focus:ring-2 focus:ring-primary/30 outline-none"
                  />
                  <datalist id="property-types-list">
                    {PROPERTY_TYPES.map((type) => (
                      <option key={type} value={type} />
                    ))}
                  </datalist>
                </>
              )}
            </div>

            {/* Location */}
            <div className="sm:col-span-2">
              <label
                htmlFor="location"
                className="block text-sm font-medium text-gray-700 mb-2"
              >
                Location
              </label>
              <input
                id="location"
                type="text"
                value={formData.location}
                onChange={(event) =>
                  handleInputChange("location", event.target.value)
                }
                placeholder="Enter preferred location"
                className="w-full rounded-lg border border-gray-300 bg-white py-2.5 px-4 text-sm text-gray-900 focus:border-primary focus:ring-2 focus:ring-primary/30 outline-none"
              />
            </div>

            {/* Bedrooms - Only show if not for rent */}
            {!isForRent && (
              <div>
                <label
                  htmlFor="bedrooms"
                  className="block text-sm font-medium text-gray-700 mb-2"
                >
                  Bedrooms
                </label>
                <input
                  id="bedrooms"
                  type="text"
                  value={formData.bedrooms}
                  onChange={(event) =>
                    handleInputChange("bedrooms", event.target.value)
                  }
                  placeholder="Number of bedrooms"
                  className="w-full rounded-lg border border-gray-300 bg-white py-2.5 px-4 text-sm text-gray-900 focus:border-primary focus:ring-2 focus:ring-primary/30 outline-none"
                />
              </div>
            )}

            {/* Bathrooms - Only show if not for rent */}
            {!isForRent && (
              <div>
                <label
                  htmlFor="bathrooms"
                  className="block text-sm font-medium text-gray-700 mb-2"
                >
                  Bathrooms
                </label>
                <input
                  id="bathrooms"
                  type="text"
                  value={formData.bathrooms}
                  onChange={(event) =>
                    handleInputChange("bathrooms", event.target.value)
                  }
                  placeholder="Number of bathrooms"
                  className="w-full rounded-lg border border-gray-300 bg-white py-2.5 px-4 text-sm text-gray-900 focus:border-primary focus:ring-2 focus:ring-primary/30 outline-none"
                />
              </div>
            )}

            {/* Budget */}
            <div className="sm:col-span-2">
              <label
                htmlFor="budget"
                className="block text-sm font-medium text-gray-700 mb-2"
              >
                Budget
              </label>
              <input
                id="budget"
                type="text"
                value={formData.budget}
                onChange={(event) =>
                  handleInputChange("budget", event.target.value)
                }
                placeholder="Your budget range"
                className="w-full rounded-lg border border-gray-300 bg-white py-2.5 px-4 text-sm text-gray-900 focus:border-primary focus:ring-2 focus:ring-primary/30 outline-none"
              />
            </div>
          </div>

          <div className="pt-2">
            <button
              type="submit"
              className="w-full bg-primary text-white px-6 py-3 rounded-lg font-medium hover:bg-primary-dark transition-colors"
            >
              Submit
            </button>
          </div>
        </form>
      </div>

      <ContactMethodModal
        isOpen={showContactModal}
        onClose={handleModalClose}
        companyInfo={companyInfo}
        onSubmit={handleContact}
        emailData={emailData}
      />
    </>
  );
}
