"use client";

import React, { useState } from "react";
import ContactMethodModal from "@/component/ContactMethodModal";
import { SanityCompanyInfo } from "@/types/sanity";

interface ManagementCTAProps {
  companyInfo: SanityCompanyInfo | null;
}

interface FormData {
  propertyType: string;
  propertyAddress: string;
  propertyState: string;
  propertyCountry: string;
}

const PROPERTY_TYPES = ["Land", "House", "Estate", "Apartment", "Commercial"];

export default function ManagementCTA({ companyInfo }: ManagementCTAProps) {
  const [showContactModal, setShowContactModal] = useState(false);
  const [formData, setFormData] = useState<FormData>({
    propertyType: "",
    propertyAddress: "",
    propertyState: "",
    propertyCountry: "",
  });

  const handleInputChange = (field: keyof FormData, value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  };

  const handleFormSubmit = (event: React.FormEvent) => {
    event.preventDefault();

    const { propertyType, propertyAddress, propertyState, propertyCountry } =
      formData;

    if (
      !propertyType ||
      !propertyAddress ||
      !propertyState ||
      !propertyCountry
    ) {
      alert("Please fill in all fields");
      return;
    }

    setShowContactModal(true);
  };

  const { propertyType, propertyAddress, propertyState, propertyCountry } =
    formData;

  const detailsMessage = `Property Type: ${propertyType}
Property Address: ${propertyAddress}
Property State: ${propertyState}
Property Country: ${propertyCountry}`;

  const emailData = {
    subject: "Property Management Services Inquiry",
    message: `Hello! I'm interested in your property management services.\n\n${detailsMessage}\n\nPlease provide more information.\n\nThank you!`,
  };

  const handleContact = (method: "whatsapp" | "email" | "call") => {
    if (!companyInfo) return;

    if (method === "call" && companyInfo.phone) {
      window.location.href = `tel:${companyInfo.phone.replace(/\s+/g, "")}`;
      setShowContactModal(false);
    } else if (method === "whatsapp" && companyInfo.phone) {
      const whatsappMessage = encodeURIComponent(
        `Hello! I'm interested in your property management services.\n\n${detailsMessage}\n\nPlease provide more information.`
      );
      const whatsappUrl = `https://wa.me/${companyInfo.phone.replace(
        /\D/g,
        ""
      )}?text=${whatsappMessage}`;
      window.open(whatsappUrl, "_blank", "noopener,noreferrer");
      setShowContactModal(false);
      setFormData({
        propertyType: "",
        propertyAddress: "",
        propertyState: "",
        propertyCountry: "",
      });
    }
    // Email is now handled by ContactMethodModal via API
  };

  return (
    <>
      <div className="bg-gradient-to-br from-primary/5 to-primary/10 rounded-xl p-4 sm:p-6 md:p-8">
        <h3 className="text-xl md:text-2xl font-bold text-gray-900 mb-2 text-center">
          Let's manage your property.
        </h3>
        <p className="text-gray-700 mb-6 text-center text-xs sm:text-sm md:text-base">
          Contact us today to discuss how we can help manage your property
          portfolio.
        </p>

        <form onSubmit={handleFormSubmit} className="space-y-4">
          <div className="space-y-3">
            {/* Property Type */}
            <div>
              <label
                htmlFor="management-property-type"
                className="block text-xs sm:text-sm font-medium text-gray-700 mb-1.5 sm:mb-2"
              >
                Property Type *
              </label>
              <input
                id="management-property-type"
                type="text"
                list="management-property-types-list"
                value={formData.propertyType}
                onChange={(event) =>
                  handleInputChange("propertyType", event.target.value)
                }
                placeholder="Land, House, Estate, Apartment, Commercial"
                className="w-full rounded-lg border border-gray-300 bg-white py-2 sm:py-2.5 px-3 sm:px-4 text-xs sm:text-sm text-gray-900 focus:border-primary focus:ring-2 focus:ring-primary/30 outline-none"
              />
              <datalist id="management-property-types-list">
                {PROPERTY_TYPES.map((type) => (
                  <option key={type} value={type} />
                ))}
              </datalist>
            </div>

            {/* Property Address */}
            <div>
              <label
                htmlFor="management-property-address"
                className="block text-xs sm:text-sm font-medium text-gray-700 mb-1.5 sm:mb-2"
              >
                Property Address *
              </label>
              <input
                id="management-property-address"
                type="text"
                value={formData.propertyAddress}
                onChange={(event) =>
                  handleInputChange("propertyAddress", event.target.value)
                }
                placeholder="Enter property address"
                className="w-full rounded-lg border border-gray-300 bg-white py-2 sm:py-2.5 px-3 sm:px-4 text-xs sm:text-sm text-gray-900 focus:border-primary focus:ring-2 focus:ring-primary/30 outline-none"
              />
            </div>

            {/* Property State */}
            <div>
              <label
                htmlFor="management-property-state"
                className="block text-xs sm:text-sm font-medium text-gray-700 mb-1.5 sm:mb-2"
              >
                Property State *
              </label>
              <input
                id="management-property-state"
                type="text"
                value={formData.propertyState}
                onChange={(event) =>
                  handleInputChange("propertyState", event.target.value)
                }
                placeholder="Enter state"
                className="w-full rounded-lg border border-gray-300 bg-white py-2 sm:py-2.5 px-3 sm:px-4 text-xs sm:text-sm text-gray-900 focus:border-primary focus:ring-2 focus:ring-primary/30 outline-none"
              />
            </div>

            {/* Property Country */}
            <div>
              <label
                htmlFor="management-property-country"
                className="block text-xs sm:text-sm font-medium text-gray-700 mb-1.5 sm:mb-2"
              >
                Property Country *
              </label>
              <input
                id="management-property-country"
                type="text"
                value={formData.propertyCountry}
                onChange={(event) =>
                  handleInputChange("propertyCountry", event.target.value)
                }
                placeholder="Enter country"
                className="w-full rounded-lg border border-gray-300 bg-white py-2 sm:py-2.5 px-3 sm:px-4 text-xs sm:text-sm text-gray-900 focus:border-primary focus:ring-2 focus:ring-primary/30 outline-none"
              />
            </div>
          </div>

          <div className="pt-2">
            <button
              type="submit"
              className="w-full bg-primary text-white px-4 sm:px-6 py-2.5 sm:py-3 rounded-lg font-semibold text-xs sm:text-sm hover:bg-primary-dark transition-colors"
            >
              Submit
            </button>
          </div>
        </form>
      </div>

      <ContactMethodModal
        isOpen={showContactModal}
        onClose={() => {
          setShowContactModal(false);
          setFormData({
            propertyType: "",
            propertyAddress: "",
            propertyState: "",
            propertyCountry: "",
          });
        }}
        companyInfo={companyInfo}
        onSubmit={handleContact}
        emailData={emailData}
      />
    </>
  );
}
