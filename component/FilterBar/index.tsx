"use client";

import React, { useState } from "react";
import { Search } from "lucide-react";
import Select from "@/component/Select";
import Link from "next/link";
import { motion } from "framer-motion";

interface FilterBarProps {
  selectedType: string;
  selectedLocation: string;
  onTypeChange: (type: string) => void;
  onLocationChange: (location: string) => void;
  locations: string[];
}

export default function FilterBar({
  selectedType,
  selectedLocation,
  onTypeChange,
  onLocationChange,
  locations,
}: FilterBarProps) {
  const [searchQuery, setSearchQuery] = useState("");
  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    // Scroll to properties section
    const propertiesSection = document.getElementById("properties");
    if (propertiesSection) {
      propertiesSection.scrollIntoView({ behavior: "smooth" });
    }
  };
  return (
    <motion.div
      initial={{ y: 20, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ delay: 0.6, duration: 0.5 }}
      className="max-w-2xl mx-auto"
    >
      <form onSubmit={handleSearch} className="flex gap-2">
        <div className="flex-1 relative">
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search by location, property type..."
            className="w-full px-6 py-2.5 rounded-full text-white border border-white text-lg outline-none focus:ring-2 focus:ring-primary"
          />
        </div>
        <button
          type="submit"
          className="bg-primary hover:bg-primary-dark text-white px-8 py-4 rounded-full font-medium transition-colors duration-200 flex items-center gap-2"
        >
          <Search size={20} />
          <span className="hidden sm:inline">Search</span>
        </button>
      </form>

      {/* Quick Links */}
      <div className="mt-6 flex flex-wrap justify-center gap-3">
        <Link
          href="/properties?type=house-for-sale"
          className="bg-white/20 hover:bg-white/30 backdrop-blur-sm text-white px-4 py-2 rounded-full text-sm font-medium transition-colors duration-200"
        >
          Houses for Sale
        </Link>
        <Link
          href="/properties?type=house-for-rent"
          className="bg-white/20 hover:bg-white/30 backdrop-blur-sm text-white px-4 py-2 rounded-full text-sm font-medium transition-colors duration-200"
        >
          Houses for Rent
        </Link>
        <Link
          href="/properties?type=land"
          className="bg-white/20 hover:bg-white/30 backdrop-blur-sm text-white px-4 py-2 rounded-full text-sm font-medium transition-colors duration-200"
        >
          Land
        </Link>
        <Link
          href="/properties?type=shortlet"
          className="bg-white/20 hover:bg-white/30 backdrop-blur-sm text-white px-4 py-2 rounded-full text-sm font-medium transition-colors duration-200"
        >
          Shortlets
        </Link>
      </div>
    </motion.div>
  );
}
