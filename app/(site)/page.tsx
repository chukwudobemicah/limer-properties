"use client";

import React from "react";
import HomeHero from "@/component/HomeHero";
import WhyStrip from "@/component/WhyStrip";
import FeaturedListings from "@/component/FeaturedListings";
import PropertyManagementServices from "@/component/PropertyManagementServices";
import StaffingBand from "@/component/StaffingBand";
import ContactSection from "@/component/ContactSection";
import { useSanityProperties } from "@/hooks/useSanityProperties";
import { useSanityCompanyInfo } from "@/hooks/useSanityCompanyInfo";

export default function Home() {
  const { properties, loading } = useSanityProperties();
  const { companyInfo } = useSanityCompanyInfo();

  // Featured first; fall back to the newest listings so the grid is never empty.
  const featured = properties.filter((property) => property.isFeatured);
  const showcase = (featured.length > 0 ? featured : properties).slice(0, 4);

  return (
    <div className="min-h-screen bg-white">
      <HomeHero featured={showcase[0]} companyInfo={companyInfo} />
      <WhyStrip />
      <FeaturedListings properties={showcase} companyInfo={companyInfo} loading={loading} />
      <PropertyManagementServices companyInfo={companyInfo} />
      <StaffingBand />
      <ContactSection />
    </div>
  );
}
