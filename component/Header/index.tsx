"use client";

import React, { useState } from "react";
import Link from "next/link";
import { Menu, X } from "lucide-react";
import Button from "@/component/Button";

export default function Header() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  return (
    <header className="bg-white shadow-sm sticky top-0 z-50">
      <nav className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <Link href="/" className="flex items-center">
            <span className="text-2xl font-bold text-primary">
              Limer Properties
            </span>
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
            <Link
              href="/studio"
              className="text-gray-700 hover:text-primary transition-colors duration-200"
            >
              Studio
            </Link>
            <Button variant="primary" href="/#contact">
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
              <Link
                href="/studio"
                onClick={toggleMobileMenu}
                className="text-gray-700 hover:text-primary transition-colors duration-200"
              >
                Studio
              </Link>
              <Button variant="primary" href="/#contact" className="w-full">
                Contact Us
              </Button>
            </div>
          </div>
        )}
      </nav>
    </header>
  );
}
