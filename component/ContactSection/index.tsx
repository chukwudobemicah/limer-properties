"use client";

import React, { useState } from "react";
import { Mail, Phone, MapPin } from "lucide-react";
import { useSanityCompanyInfo } from "@/hooks/useSanityCompanyInfo";
import Button from "@/component/Button";
import ContactMethodModal from "@/component/ContactMethodModal";

export default function ContactSection() {
  const { companyInfo } = useSanityCompanyInfo();
  const [showContactModal, setShowContactModal] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    phone: "",
    message: "",
  });

  const handleChange = (
    event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = event.target;
    setFormData((previous) => ({
      ...previous,
      [name]: value,
    }));
  };

  const handleFormSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setShowContactModal(true);
  };

  const handleContact = (method: "whatsapp" | "email" | "call") => {
    if (!companyInfo) return;

    const { name, phone, message } = formData;

    const detailsMessage = `Name: ${name}
Phone: ${phone}

Message:
${message}`;

    if (method === "call" && companyInfo.phone) {
      window.location.href = `tel:${companyInfo.phone.replace(/\s+/g, "")}`;
    } else if (method === "whatsapp" && companyInfo.phone) {
      const whatsappMessage = encodeURIComponent(detailsMessage);
      const whatsappUrl = `https://wa.me/${companyInfo.phone.replace(
        /\D/g,
        ""
      )}?text=${whatsappMessage}`;
      window.open(whatsappUrl, "_blank", "noopener,noreferrer");
    } else if (method === "email" && companyInfo.email) {
      const subject = encodeURIComponent(
        `Contact Form Submission from ${name}`
      );
      const emailBody = encodeURIComponent(detailsMessage);
      const mailtoUrl = `mailto:${companyInfo.email}?subject=${subject}&body=${emailBody}`;
      window.location.href = mailtoUrl;
    }

    // Reset form after sending
    setShowContactModal(false);
    setFormData({ name: "", phone: "", message: "" });
  };

  return (
    <section id="contact" className="py-16 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
            Get In Touch
          </h2>
          <p className="text-lg text-gray-600">
            Have questions? We&apos;d love to hear from you.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          {/* Contact Information */}
          <div>
            <h3 className="text-2xl font-bold text-gray-900 mb-6">
              Contact Information
            </h3>
            <div className="space-y-6">
              {companyInfo?.address && (
                <div className="flex items-start">
                  <div className="bg-primary-lighter p-3 rounded-lg">
                    <MapPin className="text-primary" size={24} />
                  </div>
                  <div className="ml-4">
                    <h4 className="font-semibold text-gray-900">Address</h4>
                    <p className="text-gray-600 mt-1">{companyInfo.address}</p>
                  </div>
                </div>
              )}

              {companyInfo?.phone && (
                <div className="flex items-start">
                  <div className="bg-primary-lighter p-3 rounded-lg">
                    <Phone className="text-primary" size={24} />
                  </div>
                  <div className="ml-4">
                    <h4 className="font-semibold text-gray-900">Phone</h4>
                    <p className="text-gray-600 mt-1">{companyInfo.phone}</p>
                  </div>
                </div>
              )}

              {companyInfo?.email && (
                <div className="flex items-start">
                  <div className="bg-primary-lighter p-3 rounded-lg">
                    <Mail className="text-primary" size={24} />
                  </div>
                  <div className="ml-4">
                    <h4 className="font-semibold text-gray-900">Email</h4>
                    <p className="text-gray-600 mt-1">{companyInfo.email}</p>
                  </div>
                </div>
              )}
            </div>

            <div className="mt-8">
              <h4 className="font-semibold text-gray-900 mb-4">
                Business Hours
              </h4>
              <div className="space-y-2 text-gray-600">
                <p>Monday - Friday: 9:00 AM - 6:00 PM</p>
                <p>Saturday: 10:00 AM - 4:00 PM</p>
                <p>Sunday: Closed</p>
              </div>
            </div>
          </div>

          {/* Contact Form */}
          <div className="bg-white p-8 rounded-lg shadow-md">
            <form onSubmit={handleFormSubmit}>
              <div className="mb-4">
                <label
                  htmlFor="name"
                  className="block text-sm font-medium text-gray-700 mb-2"
                >
                  Name
                </label>
                <input
                  type="text"
                  id="name"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  required
                  className="w-full px-4 py-3 text-black border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
                  placeholder="Your name"
                />
              </div>

              <div className="mb-4">
                <label
                  htmlFor="phone"
                  className="block text-sm font-medium text-gray-700 mb-2"
                >
                  Phone
                </label>
                <input
                  type="tel"
                  id="phone"
                  name="phone"
                  value={formData.phone}
                  onChange={handleChange}
                  className="w-full px-4 py-3 text-black border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
                  placeholder="+234 800 000 0000"
                />
              </div>

              <div className="mb-6">
                <label
                  htmlFor="message"
                  className="block text-sm font-medium text-gray-700 mb-2"
                >
                  Message
                </label>
                <textarea
                  id="message"
                  name="message"
                  value={formData.message}
                  onChange={handleChange}
                  required
                  rows={5}
                  className="w-full px-4 py-3 text-black border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent resize-none"
                  placeholder="Your message..."
                />
              </div>

              <Button type="submit" variant="primary" className="w-full">
                Submit
              </Button>
            </form>
          </div>
        </div>
      </div>

      <ContactMethodModal
        isOpen={showContactModal}
        onClose={() => setShowContactModal(false)}
        companyInfo={companyInfo}
        onSubmit={handleContact}
      />
    </section>
  );
}
