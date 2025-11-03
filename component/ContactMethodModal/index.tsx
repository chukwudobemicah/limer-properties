"use client";

import React from "react";
import { createPortal } from "react-dom";
import { Phone, MessageCircle, Mail, X } from "lucide-react";
import { SanityCompanyInfo } from "@/types/sanity";

interface ContactMethodModalProps {
  isOpen: boolean;
  onClose: () => void;
  companyInfo: SanityCompanyInfo | null;
  onSubmit: (method: "whatsapp" | "email" | "call") => void;
  title?: string;
  description?: string;
}

export default function ContactMethodModal({
  isOpen,
  onClose,
  companyInfo,
  onSubmit,
  title = "Choose Contact Method",
  description = "How would you like to send your inquiry?",
}: ContactMethodModalProps) {
  if (!isOpen) return null;

  const handleContact = (method: "whatsapp" | "email" | "call") => {
    onSubmit(method);
    onClose();
  };

  return typeof window !== "undefined"
    ? createPortal(
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-xl shadow-2xl max-w-md w-full p-6 md:p-8">
            <div className="flex items-center justify-between mb-6">
              <h3 className="text-xl font-bold text-gray-900">{title}</h3>
              <button
                onClick={onClose}
                className="text-white bg-primary p-1 rounded-lg transition-colors"
                aria-label="Close modal"
              >
                <X size={20} />
              </button>
            </div>

            <p className="text-gray-700 mb-6 text-center text-sm md:text-base">
              {description}
            </p>

            <div className="flex flex-col gap-3">
              {companyInfo?.phone && (
                <button
                  onClick={() => handleContact("call")}
                  className="flex items-center justify-center gap-2 bg-white text-primary px-4 md:px-6 py-2.5 md:py-3 rounded-lg font-semibold hover:bg-gray-100 transition-colors text-sm md:text-base border border-primary"
                >
                  <Phone size={18} />
                  Call
                </button>
              )}

              {companyInfo?.phone && (
                <button
                  onClick={() => handleContact("whatsapp")}
                  className="flex items-center justify-center gap-2 bg-green-500 hover:bg-green-600 text-white px-4 md:px-6 py-2.5 md:py-3 rounded-lg font-semibold transition-colors text-sm md:text-base"
                >
                  <MessageCircle size={18} />
                  WhatsApp
                </button>
              )}

              {companyInfo?.email && (
                <button
                  onClick={() => handleContact("email")}
                  className="flex items-center justify-center gap-2 bg-gray-700 hover:bg-gray-800 text-white px-4 md:px-6 py-2.5 md:py-3 rounded-lg font-semibold transition-colors text-sm md:text-base"
                >
                  <Mail size={18} />
                  Email
                </button>
              )}
            </div>
          </div>
        </div>,
        document.body
      )
    : null;
}
