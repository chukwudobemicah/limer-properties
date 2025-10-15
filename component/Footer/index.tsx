import React from "react";
import Link from "next/link";
import {
  Mail,
  Phone,
  MapPin,
  Facebook,
  Instagram,
  Twitter,
} from "lucide-react";

export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-gray-900 text-gray-300">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* Company Info */}
          <div>
            <h3 className="text-white text-xl font-bold mb-4">
              Limer Properties
            </h3>
            <p className="text-sm mb-4">
              Your trusted partner in finding the perfect property. We offer a
              wide range of houses, lands, and shortlets across Nigeria.
            </p>
            <div className="flex space-x-4">
              <a
                href="https://facebook.com"
                target="_blank"
                rel="noopener noreferrer"
                className="hover:text-primary transition-colors"
                aria-label="Facebook"
              >
                <Facebook size={20} />
              </a>
              <a
                href="https://instagram.com"
                target="_blank"
                rel="noopener noreferrer"
                className="hover:text-primary transition-colors"
                aria-label="Instagram"
              >
                <Instagram size={20} />
              </a>
              <a
                href="https://twitter.com"
                target="_blank"
                rel="noopener noreferrer"
                className="hover:text-primary transition-colors"
                aria-label="Twitter"
              >
                <Twitter size={20} />
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="text-white font-semibold mb-4">Quick Links</h4>
            <ul className="space-y-2">
              <li>
                <Link
                  href="/"
                  className="hover:text-primary transition-colors text-sm"
                >
                  Home
                </Link>
              </li>
              <li>
                <Link
                  href="/#properties"
                  className="hover:text-primary transition-colors text-sm"
                >
                  Properties
                </Link>
              </li>
              <li>
                <Link
                  href="/about"
                  className="hover:text-primary transition-colors text-sm"
                >
                  About Us
                </Link>
              </li>
              <li>
                <Link
                  href="/#contact"
                  className="hover:text-primary transition-colors text-sm"
                >
                  Contact
                </Link>
              </li>
            </ul>
          </div>

          {/* Property Types */}
          <div>
            <h4 className="text-white font-semibold mb-4">Property Types</h4>
            <ul className="space-y-2">
              <li>
                <Link
                  href="/?type=house-sale"
                  className="hover:text-primary transition-colors text-sm"
                >
                  Houses for Sale
                </Link>
              </li>
              <li>
                <Link
                  href="/?type=house-rent"
                  className="hover:text-primary transition-colors text-sm"
                >
                  Houses for Rent
                </Link>
              </li>
              <li>
                <Link
                  href="/?type=land"
                  className="hover:text-primary transition-colors text-sm"
                >
                  Land
                </Link>
              </li>
              <li>
                <Link
                  href="/?type=shortlet"
                  className="hover:text-primary transition-colors text-sm"
                >
                  Shortlets
                </Link>
              </li>
            </ul>
          </div>

          {/* Contact Info */}
          <div>
            <h4 className="text-white font-semibold mb-4">Contact Us</h4>
            <ul className="space-y-3">
              <li className="flex items-start">
                <MapPin size={18} className="mr-2 mt-1 flex-shrink-0" />
                <span className="text-sm">
                  123 Lekki Phase 1, Lagos, Nigeria
                </span>
              </li>
              <li className="flex items-center">
                <Phone size={18} className="mr-2 flex-shrink-0" />
                <a
                  href="tel:+2348012345678"
                  className="text-sm hover:text-primary transition-colors"
                >
                  +234 801 234 5678
                </a>
              </li>
              <li className="flex items-center">
                <Mail size={18} className="mr-2 flex-shrink-0" />
                <a
                  href="mailto:info@limerproperties.com"
                  className="text-sm hover:text-primary transition-colors"
                >
                  info@limerproperties.com
                </a>
              </li>
            </ul>
          </div>
        </div>

        <div className="border-t border-gray-800 mt-8 pt-8 text-center">
          <p className="text-sm">
            &copy; {currentYear} Limer Properties. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
}
