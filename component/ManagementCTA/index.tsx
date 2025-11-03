"use client";

import React, { useState } from "react";
import { createPortal } from "react-dom";
import { Phone, MessageCircle, Mail, X } from "lucide-react";
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
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [selectedMethod, setSelectedMethod] = useState<
    "whatsapp" | "email" | null
  >(null);
  const [formData, setFormData] = useState<FormData>({
    propertyType: "",
    propertyAddress: "",
    propertyState: "",
    propertyCountry: "",
  });

  const handleInputChange = (field: keyof FormData, value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  };

  const handleOpenForm = (method: "whatsapp" | "email") => {
    setSelectedMethod(method);
    setIsFormOpen(true);
  };

  const handleCloseForm = () => {
    setIsFormOpen(false);
    setSelectedMethod(null);
    setFormData({
      propertyType: "",
      propertyAddress: "",
      propertyState: "",
      propertyCountry: "",
    });
  };

  const handleSubmit = () => {
    if (!companyInfo) return;

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

    const detailsMessage = `Property Type: ${propertyType}
Property Address: ${propertyAddress}
Property State: ${propertyState}
Property Country: ${propertyCountry}`;

    if (selectedMethod === "whatsapp" && companyInfo.phone) {
      const whatsappMessage = encodeURIComponent(
        `Hello! I'm interested in your property management services.\n\n${detailsMessage}\n\nPlease provide more information.`
      );
      const whatsappUrl = `https://wa.me/${companyInfo.phone.replace(
        /\D/g,
        ""
      )}?text=${whatsappMessage}`;
      window.open(whatsappUrl, "_blank", "noopener,noreferrer");
    } else if (selectedMethod === "email" && companyInfo.email) {
      const subject = encodeURIComponent(
        "Property Management Services Inquiry"
      );
      const emailBody = encodeURIComponent(
        `Hello! I'm interested in your property management services.\n\n${detailsMessage}\n\nPlease provide more information.\n\nThank you!`
      );
      const mailtoUrl = `mailto:${companyInfo.email}?subject=${subject}&body=${emailBody}`;
      window.location.href = mailtoUrl;
    }

    handleCloseForm();
  };

  return (
    <>
      <div className="bg-gradient-to-br from-primary to-primary-dark rounded-xl p-6 md:p-8 text-white flex flex-col justify-center">
        <h3 className="text-xl md:text-2xl font-bold mb-3 md:mb-4">
          Ready to Get Started?
        </h3>
        <p className="text-white/90 mb-6 md:mb-8 text-sm md:text-base">
          Contact us today to discuss how we can help manage your property
          portfolio.
        </p>

        {companyInfo && (
          <div className="space-y-3 md:space-y-4">
            {companyInfo.phone && (
              <a
                href={`tel:${companyInfo.phone.replace(/\s+/g, "")}`}
                className="flex items-center justify-center gap-2 md:gap-3 bg-white text-primary px-4 md:px-6 py-2.5 md:py-3 rounded-full font-semibold hover:bg-gray-100 transition-colors text-sm md:text-base"
              >
                <Phone size={18} className="md:w-5 md:h-5" />
                Call Us Now
              </a>
            )}

            {companyInfo.phone && (
              <button
                onClick={() => handleOpenForm("whatsapp")}
                className="flex items-center justify-center gap-2 md:gap-3 bg-green-500 hover:bg-green-600 text-white px-4 md:px-6 py-2.5 md:py-3 rounded-full font-semibold transition-colors text-sm md:text-base w-full"
              >
                <MessageCircle size={18} className="md:w-5 md:h-5" />
                Message on WhatsApp
              </button>
            )}

            {companyInfo.email && (
              <button
                onClick={() => handleOpenForm("email")}
                className="flex items-center justify-center gap-2 md:gap-3 bg-white/10 hover:bg-white/20 text-white px-4 md:px-6 py-2.5 md:py-3 rounded-full font-semibold transition-colors border border-white/30 text-sm md:text-base w-full"
              >
                <Mail size={18} className="md:w-5 md:h-5" />
                Send Email
              </button>
            )}
          </div>
        )}

        {!companyInfo && (
          <p className="text-white/80 text-xs md:text-sm">
            Loading contact information...
          </p>
        )}
      </div>

      {/* Form Modal - Rendered via Portal */}
      {typeof window !== "undefined" &&
        isFormOpen &&
        createPortal(
          <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
            <div className="bg-white rounded-xl shadow-2xl max-w-md w-full p-6 md:p-8 max-h-[90vh] overflow-y-auto">
              <div className="flex items-center justify-between mb-6">
                <h3 className="text-xl font-bold text-gray-900">
                  Property Information
                </h3>
                <button
                  onClick={handleCloseForm}
                  className="text-white bg-primary p-1 rounded-lg transition-colors"
                  aria-label="Close form"
                >
                  <X size={20} />
                </button>
              </div>

              <div className="space-y-4">
                {/* Property Type */}
                <div>
                  <label
                    htmlFor="property-type"
                    className="block text-sm font-medium text-gray-700 mb-2"
                  >
                    Property Type *
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
                </div>

                {/* Property Address */}
                <div>
                  <label
                    htmlFor="property-address"
                    className="block text-sm font-medium text-gray-700 mb-2"
                  >
                    Property Address *
                  </label>
                  <input
                    id="property-address"
                    type="text"
                    value={formData.propertyAddress}
                    onChange={(event) =>
                      handleInputChange("propertyAddress", event.target.value)
                    }
                    placeholder="Enter property address"
                    className="w-full rounded-lg border border-gray-300 bg-white py-2.5 px-4 text-sm text-gray-900 focus:border-primary focus:ring-2 focus:ring-primary/30 outline-none"
                  />
                </div>

                {/* Property State */}
                <div>
                  <label
                    htmlFor="property-state"
                    className="block text-sm font-medium text-gray-700 mb-2"
                  >
                    Property State *
                  </label>
                  <input
                    id="property-state"
                    type="text"
                    value={formData.propertyState}
                    onChange={(event) =>
                      handleInputChange("propertyState", event.target.value)
                    }
                    placeholder="Enter state"
                    className="w-full rounded-lg border border-gray-300 bg-white py-2.5 px-4 text-sm text-gray-900 focus:border-primary focus:ring-2 focus:ring-primary/30 outline-none"
                  />
                </div>

                {/* Property Country */}
                <div>
                  <label
                    htmlFor="property-country"
                    className="block text-sm font-medium text-gray-700 mb-2"
                  >
                    Property Country *
                  </label>
                  <input
                    id="property-country"
                    type="text"
                    value={formData.propertyCountry}
                    onChange={(event) =>
                      handleInputChange("propertyCountry", event.target.value)
                    }
                    placeholder="Enter country"
                    className="w-full rounded-lg border border-gray-300 bg-white py-2.5 px-4 text-sm text-gray-900 focus:border-primary focus:ring-2 focus:ring-primary/30 outline-none"
                  />
                </div>
              </div>

              <div className="mt-6 flex gap-3">
                <button
                  onClick={handleCloseForm}
                  className="flex-1 rounded-lg border border-gray-300 px-4 py-2.5 text-sm font-semibold text-gray-700 transition-colors hover:bg-gray-50"
                >
                  Cancel
                </button>
                <button
                  onClick={handleSubmit}
                  className="flex-1 rounded-lg bg-primary px-4 py-2.5 text-sm font-semibold text-white transition-colors hover:bg-primary-dark"
                >
                  {selectedMethod === "whatsapp"
                    ? "Submit via WhatsApp"
                    : "Submit via Email"}
                </button>
              </div>
            </div>
          </div>,
          document.body
        )}
    </>
  );
}
