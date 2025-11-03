"use client";

import React, { useState } from "react";
import { createPortal } from "react-dom";
import { Phone, MessageCircle, Mail, X } from "lucide-react";
import { SanityCompanyInfo } from "@/types/sanity";

interface PropertyInquiryFormProps {
  companyInfo: SanityCompanyInfo | null;
}

interface FormData {
  propertyType: string;
  location: string;
  bedrooms: string;
  bathrooms: string;
  budget: string;
}

const PROPERTY_TYPES = ["Land", "House", "Estate", "Apartment", "Commercial"];

export default function PropertyInquiryForm({
  companyInfo,
}: PropertyInquiryFormProps) {
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [selectedMethod, setSelectedMethod] = useState<
    "whatsapp" | "email" | null
  >(null);
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

  const handleOpenForm = (method: "whatsapp" | "email" | "call") => {
    if (method === "call") {
      if (companyInfo?.phone) {
        window.location.href = `tel:${companyInfo.phone.replace(/\s+/g, "")}`;
      }
      return;
    }
    setSelectedMethod(method);
    setIsFormOpen(true);
  };

  const handleCloseForm = () => {
    setIsFormOpen(false);
    setSelectedMethod(null);
    setFormData({
      propertyType: "",
      location: "",
      bedrooms: "",
      bathrooms: "",
      budget: "",
    });
  };

  const handleSubmit = () => {
    if (!companyInfo) return;

    const { propertyType, location, bedrooms, bathrooms, budget } = formData;

    const detailsMessage = `Property Type: ${propertyType || "Any"}
Location: ${location || "Any"}
Bedrooms: ${bedrooms || "Any"}
Bathrooms: ${bathrooms || "Any"}
Budget: ${budget || "Any budget"}`;

    if (selectedMethod === "whatsapp" && companyInfo.phone) {
      const whatsappMessage = encodeURIComponent(
        `Hello! I'm looking for a property and couldn't find what I need on your website.\n\n${detailsMessage}\n\nPlease let me know if you have anything that matches my criteria.\n\nThank you!`
      );
      const whatsappUrl = `https://wa.me/${companyInfo.phone.replace(
        /\D/g,
        ""
      )}?text=${whatsappMessage}`;
      window.open(whatsappUrl, "_blank", "noopener,noreferrer");
    } else if (selectedMethod === "email" && companyInfo.email) {
      const subject = encodeURIComponent(
        "Property Inquiry - Couldn't Find What I'm Looking For"
      );
      const emailBody = encodeURIComponent(
        `Hello! I'm looking for a property and couldn't find what I need on your website.\n\n${detailsMessage}\n\nPlease let me know if you have anything that matches my criteria.\n\nThank you!`
      );
      const mailtoUrl = `mailto:${companyInfo.email}?subject=${subject}&body=${emailBody}`;
      window.location.href = mailtoUrl;
    }

    handleCloseForm();
  };

  return (
    <>
      <div className="bg-white rounded-lg shadow-md p-8 text-center">
        <h3 className="text-2xl font-bold text-gray-900 mb-4">
          Couldn't Find What You're Looking For?
        </h3>
        <p className="text-gray-600 mb-8">
          No worries! Let us know what you need and we'll find the perfect
          property for you.
        </p>

        <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
          {companyInfo?.phone && (
            <button
              onClick={() => handleOpenForm("call")}
              className="flex items-center justify-center gap-2 bg-primary text-white px-6 py-3 rounded-lg font-medium hover:bg-primary-dark transition-colors"
            >
              <Phone size={18} />
              Call Us Now
            </button>
          )}

          {companyInfo?.phone && (
            <button
              onClick={() => handleOpenForm("whatsapp")}
              className="flex items-center justify-center gap-2 bg-green-500 hover:bg-green-600 text-white px-6 py-3 rounded-lg font-medium transition-colors"
            >
              <MessageCircle size={18} />
              Send via WhatsApp
            </button>
          )}

          {companyInfo?.email && (
            <button
              onClick={() => handleOpenForm("email")}
              className="flex items-center justify-center gap-2 bg-gray-700 hover:bg-gray-800 text-white px-6 py-3 rounded-lg font-medium transition-colors"
            >
              <Mail size={18} />
              Send via Email
            </button>
          )}
        </div>
      </div>

      {/* Form Modal - Rendered via Portal */}
      {typeof window !== "undefined" &&
        isFormOpen &&
        createPortal(
          <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
            <div className="bg-white rounded-xl shadow-2xl max-w-md w-full p-6 md:p-8 max-h-[90vh] overflow-y-auto">
              <div className="flex items-center justify-between mb-6">
                <h3 className="text-xl font-bold text-gray-900">
                  Property Details
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
                </div>

                {/* Location */}
                <div>
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

                {/* Bedrooms */}
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

                {/* Bathrooms */}
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

                {/* Budget */}
                <div>
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
