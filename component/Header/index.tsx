"use client";

import React, { useState } from "react";
import Link from "next/link";
import { Menu, X } from "lucide-react";
import Button from "@/component/Button";
import Image from "next/image";
import ContactMethodModal from "@/component/ContactMethodModal";
import { useSanityCompanyInfo } from "@/hooks/useSanityCompanyInfo";

export default function Header() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [showContactModal, setShowContactModal] = useState(false);
  const { companyInfo } = useSanityCompanyInfo();

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  const emailData = {
    subject: "Inquiry - Limer Properties",
    message:
      "Hello! I'd like to get in touch with Limer Properties. Please provide more information.\n\nThank you!",
  };

  const handleContact = (method: "whatsapp" | "email" | "call") => {
    if (!companyInfo) return;

    if (method === "call" && companyInfo.phone) {
      window.location.href = `tel:${companyInfo.phone.replace(/\s+/g, "")}`;
    } else if (method === "whatsapp" && companyInfo.phone) {
      const whatsappMessage = encodeURIComponent(
        "Hello! I'd like to get in touch with Limer Properties. Please provide more information."
      );
      const whatsappUrl = `https://wa.me/${companyInfo.phone.replace(
        /\D/g,
        ""
      )}?text=${whatsappMessage}`;
      window.open(whatsappUrl, "_blank", "noopener,noreferrer");
    }
    // Email is now handled by ContactMethodModal via API
  };

  return (
    <header className="bg-white shadow-sm sticky top-0 z-50 md:py-2">
      <nav className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <Link href="/" className="flex items-center">
            {/* <span className="text-2xl font-bold text-primary">
              Limer Estate And Facility Management LTD
            </span> */}
            <Image
              src="/images/logo.png"
              alt="Limer Estate And Facility Management LTD"
              width={100}
              height={100}
              priority
              quality={100}
              className="w-48 md:w-68"
            />
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-8">
            <Link
              href="/"
              className="text-gray-700 hover:text-primary transition-colors duration-200"
            >
              Home
            </Link>
            <Link
              href="/properties"
              className="text-gray-700 hover:text-primary transition-colors duration-200"
            >
              Properties
            </Link>
            <Link
              href="/about"
              className="text-gray-700 hover:text-primary transition-colors duration-200"
            >
              About
            </Link>
            {/* <Link
              href="/studio"
              className="text-gray-700 hover:text-primary transition-colors duration-200"
            >
              Studio
            </Link> */}
            <Button variant="primary" onClick={() => setShowContactModal(true)}>
              Contact Us
            </Button>
          </div>

          {/* Mobile Menu Button */}
          <button
            onClick={toggleMobileMenu}
            className="md:hidden text-gray-700 hover:text-primary transition-colors"
            aria-label="Toggle menu"
          >
            {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>

        {/* Mobile Navigation */}
        {isMobileMenuOpen && (
          <div className="md:hidden py-4 border-t border-gray-200">
            <div className="flex flex-col space-y-4">
              <Link
                href="/"
                onClick={toggleMobileMenu}
                className="text-gray-700 hover:text-primary transition-colors duration-200"
              >
                Home
              </Link>
              <Link
                href="/properties"
                onClick={toggleMobileMenu}
                className="text-gray-700 hover:text-primary transition-colors duration-200"
              >
                Properties
              </Link>
              <Link
                href="/about"
                onClick={toggleMobileMenu}
                className="text-gray-700 hover:text-primary transition-colors duration-200"
              >
                About
              </Link>
              {/* <Link
                href="/studio"
                onClick={toggleMobileMenu}
                className="text-gray-700 hover:text-primary transition-colors duration-200"
              >
                Studio
              </Link> */}
              <Button
                variant="primary"
                onClick={() => {
                  setShowContactModal(true);
                  toggleMobileMenu();
                }}
                className="w-full"
              >
                Contact Us
              </Button>
            </div>
          </div>
        )}
      </nav>
      <ContactMethodModal
        isOpen={showContactModal}
        onClose={() => setShowContactModal(false)}
        companyInfo={companyInfo}
        onSubmit={handleContact}
        emailData={emailData}
        title="Contact Us"
        description="How would you like to get in touch with us?"
      />
    </header>
  );
}
