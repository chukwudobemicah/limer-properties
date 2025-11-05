"use client";

import React, { useState } from "react";
import Image from "next/image";
import { Target, Eye, Award, Users, CheckCircle } from "lucide-react";
import Button from "@/component/Button";
import ContactMethodModal from "@/component/ContactMethodModal";
import { useSanityCompanyInfo } from "@/hooks/useSanityCompanyInfo";

export default function AboutPage() {
  const [showContactModal, setShowContactModal] = useState(false);
  const { companyInfo } = useSanityCompanyInfo();

  const handleContact = (method: "whatsapp" | "email" | "call") => {
    if (!companyInfo) return;

    if (method === "call" && companyInfo.phone) {
      window.location.href = `tel:${companyInfo.phone.replace(/\s+/g, "")}`;
    } else if (method === "whatsapp" && companyInfo.phone) {
      const whatsappMessage = encodeURIComponent(
        "Hello! I'd like to get in touch with Limer Estate And Facility Management LTD. Please provide more information."
      );
      const whatsappUrl = `https://wa.me/${companyInfo.phone.replace(
        /\D/g,
        ""
      )}?text=${whatsappMessage}`;
      window.open(whatsappUrl, "_blank", "noopener,noreferrer");
    } else if (method === "email" && companyInfo.email) {
      const subject = encodeURIComponent(
        "Inquiry - Limer Estate And Facility Management LTD"
      );
      const emailBody = encodeURIComponent(
        "Hello! I'd like to get in touch with Limer Estate And Facility Management LTD. Please provide more information.\n\nThank you!"
      );
      const mailtoUrl = `mailto:${companyInfo.email}?subject=${subject}&body=${emailBody}`;
      window.location.href = mailtoUrl;
    }
  };
  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero Section */}
      <section className="bg-primary text-white py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h1 className="text-4xl md:text-5xl font-bold mb-6">
              About Limer Estate And Facility Management LTD
            </h1>
            <p className="text-xl md:text-2xl text-white/90 max-w-3xl mx-auto">
              Your trusted partner in finding the perfect property across
              Nigeria
            </p>
          </div>
        </div>
      </section>

      {/* Our Story Section */}
      <section className="py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-6">
                Our Story
              </h2>
              <div className="space-y-4 text-gray-600 leading-relaxed">
                <p>
                  Founded with a vision to revolutionize the real estate
                  industry in Nigeria, Limer Estate And Facility Management LTD
                  has grown to become one of the most trusted names in property
                  acquisition and management.
                </p>
                <p>
                  We understand that finding the perfect property is more than
                  just a transaction—it&apos;s about finding a place to call
                  home, a space to build your dreams, or an investment that
                  secures your future.
                </p>
                <p>
                  With years of experience and a deep understanding of the
                  Nigerian real estate market, we are committed to providing
                  exceptional service, transparency, and value to all our
                  clients.
                </p>
              </div>
              <div className="mt-8">
                <Button
                  variant="primary"
                  onClick={() => setShowContactModal(true)}
                >
                  Get in Touch
                </Button>
              </div>
            </div>
            <div className="relative h-96 lg:h-full min-h-[400px] rounded-lg overflow-hidden shadow-xl">
              <Image
                src="https://images.unsplash.com/photo-1560518883-ce09059eeffa?w=800&q=80"
                alt="Modern office building"
                fill
                className="object-cover"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Mission & Vision Section */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
            <div className="text-center p-8 bg-primary-lighter rounded-lg">
              <div className="bg-primary text-white rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-4">
                <Target size={32} />
              </div>
              <h3 className="text-2xl font-bold text-gray-900 mb-4">
                Our Mission
              </h3>
              <p className="text-gray-700 leading-relaxed">
                To provide exceptional real estate services that exceed client
                expectations through integrity, professionalism, and innovation.
                We strive to make property transactions seamless, transparent,
                and rewarding for everyone involved.
              </p>
            </div>

            <div className="text-center p-8 bg-primary-lighter rounded-lg">
              <div className="bg-primary text-white rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-4">
                <Eye size={32} />
              </div>
              <h3 className="text-2xl font-bold text-gray-900 mb-4">
                Our Vision
              </h3>
              <p className="text-gray-700 leading-relaxed">
                To be the leading real estate company in Nigeria, recognized for
                our commitment to excellence, customer satisfaction, and
                contribution to the development of sustainable communities
                across the nation.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Core Values Section */}
      <section className="py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              Our Core Values
            </h2>
            <p className="text-lg text-gray-600">
              The principles that guide everything we do
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            <div className="text-center p-6">
              <div className="bg-primary-lighter rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-4">
                <CheckCircle className="text-primary" size={32} />
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-2">
                Integrity
              </h3>
              <p className="text-gray-600">
                We conduct our business with honesty, transparency, and ethical
                practices
              </p>
            </div>

            <div className="text-center p-6">
              <div className="bg-primary-lighter rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-4">
                <Award className="text-primary" size={32} />
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-2">
                Excellence
              </h3>
              <p className="text-gray-600">
                We strive for the highest standards in everything we do
              </p>
            </div>

            <div className="text-center p-6">
              <div className="bg-primary-lighter rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-4">
                <Users className="text-primary" size={32} />
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-2">
                Customer Focus
              </h3>
              <p className="text-gray-600">
                Our clients&apos; satisfaction and success are our top
                priorities
              </p>
            </div>

            <div className="text-center p-6">
              <div className="bg-primary-lighter rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-4">
                <CheckCircle className="text-primary" size={32} />
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-2">
                Innovation
              </h3>
              <p className="text-gray-600">
                We embrace new technologies and methods to serve you better
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-16 bg-primary text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
            <div>
              <p className="text-5xl font-bold mb-2">500+</p>
              <p className="text-white/90">Properties Sold</p>
            </div>
            <div>
              <p className="text-5xl font-bold mb-2">1000+</p>
              <p className="text-white/90">Happy Clients</p>
            </div>
            <div>
              <p className="text-5xl font-bold mb-2">50+</p>
              <p className="text-white/90">Locations</p>
            </div>
            <div>
              <p className="text-5xl font-bold mb-2">10+</p>
              <p className="text-white/90">Years Experience</p>
            </div>
          </div>
        </div>
      </section>

      {/* Team Section */}
      <section className="py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              Meet Our Team
            </h2>
            <p className="text-lg text-gray-600">
              Dedicated professionals committed to your success
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="text-center">
              <div className="relative h-64 mb-4 rounded-lg overflow-hidden">
                <Image
                  src="https://images.unsplash.com/photo-1560250097-0b93528c311a?w=400&q=80"
                  alt="Team member"
                  fill
                  className="object-cover"
                />
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-1">
                John Adebayo
              </h3>
              <p className="text-primary font-medium mb-2">CEO & Founder</p>
              <p className="text-gray-600 text-sm">
                Leading the company with vision and dedication to excellence
              </p>
            </div>

            <div className="text-center">
              <div className="relative h-64 mb-4 rounded-lg overflow-hidden">
                <Image
                  src="https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=400&q=80"
                  alt="Team member"
                  fill
                  className="object-cover"
                />
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-1">
                Sarah Okonkwo
              </h3>
              <p className="text-primary font-medium mb-2">Head of Sales</p>
              <p className="text-gray-600 text-sm">
                Expert in connecting clients with their dream properties
              </p>
            </div>

            <div className="text-center">
              <div className="relative h-64 mb-4 rounded-lg overflow-hidden">
                <Image
                  src="https://images.unsplash.com/photo-1556157382-97eda2d62296?w=400&q=80"
                  alt="Team member"
                  fill
                  className="object-cover"
                />
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-1">
                Michael Obi
              </h3>
              <p className="text-primary font-medium mb-2">Property Manager</p>
              <p className="text-gray-600 text-sm">
                Ensuring seamless property management and client satisfaction
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 bg-gray-100">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
            Ready to Find Your Dream Property?
          </h2>
          <p className="text-lg text-gray-600 mb-8">
            Let our experienced team help you navigate the real estate market
            and find the perfect property for your needs.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button variant="primary" href="/properties">
              Browse Properties
            </Button>
            <Button
              variant="secondary"
              onClick={() => setShowContactModal(true)}
            >
              Contact Us
            </Button>
          </div>
        </div>
      </section>
      <ContactMethodModal
        isOpen={showContactModal}
        onClose={() => setShowContactModal(false)}
        companyInfo={companyInfo}
        onSubmit={handleContact}
        title="Contact Us"
        description="How would you like to get in touch with us?"
      />
    </div>
  );
}
