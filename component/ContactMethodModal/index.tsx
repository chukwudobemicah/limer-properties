"use client";

import React, { useState } from "react";
import { createPortal } from "react-dom";
import {
  Phone,
  MessageCircle,
  Mail,
  X,
  Loader2,
  CheckCircle,
  AlertCircle,
} from "lucide-react";
import { SanityCompanyInfo } from "@/types/sanity";
import { useToast } from "@/component/Toast";

interface EmailData {
  subject: string;
  message: string;
  fromEmail?: string;
  fromName?: string;
}

interface ContactMethodModalProps {
  isOpen: boolean;
  onClose: () => void;
  companyInfo: SanityCompanyInfo | null;
  onSubmit: (method: "whatsapp" | "email" | "call") => void;
  emailData?: EmailData;
  title?: string;
  description?: string;
}

export default function ContactMethodModal({
  isOpen,
  onClose,
  companyInfo,
  onSubmit,
  emailData,
  title = "Choose Contact Method",
  description = "How would you like to send your inquiry?",
}: ContactMethodModalProps) {
  const [showEmailPreview, setShowEmailPreview] = useState(false);
  const [emailStatus, setEmailStatus] = useState<
    "idle" | "loading" | "success" | "error"
  >("idle");
  const [errorMessage, setErrorMessage] = useState<string>("");
  const { showToast } = useToast();

  if (!isOpen) return null;

  const handleEmail = async () => {
    if (!companyInfo?.email || !emailData) {
      setErrorMessage("Email data is missing");
      setEmailStatus("error");
      return;
    }

    setEmailStatus("loading");
    setErrorMessage("");

    try {
      const response = await fetch("/api/send-email", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          to: companyInfo.email,
          subject: emailData.subject,
          message: emailData.message,
          fromEmail: emailData.fromEmail,
          fromName: emailData.fromName,
        }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || "Failed to send email");
      }

      setEmailStatus("success");
      showToast({
        type: "success",
        title: "Email sent successfully!",
        message: "Your inquiry has been sent. We'll get back to you soon.",
        duration: 5000,
      });
      setTimeout(() => {
        onClose();
        setEmailStatus("idle");
        setErrorMessage("");
        setShowEmailPreview(false);
      }, 1500);
    } catch (error) {
      console.error("Email error:", error);
      const errorMsg =
        error instanceof Error
          ? error.message
          : "Failed to send email. Please try again.";
      setEmailStatus("error");
      setErrorMessage(errorMsg);
      showToast({
        type: "error",
        title: "Failed to send email",
        message: errorMsg,
        duration: 6000,
      });
    }
  };

  const handleContact = (method: "whatsapp" | "email" | "call") => {
    if (method === "email") {
      if (emailData) {
        setShowEmailPreview(true);
      } else {
        setErrorMessage("Email data is missing");
        setEmailStatus("error");
      }
    } else {
      onSubmit(method);
      onClose();
    }
  };

  const handleConfirmSend = () => {
    handleEmail();
  };

  const handleBackToMethods = () => {
    setShowEmailPreview(false);
    setEmailStatus("idle");
    setErrorMessage("");
  };

  const handleClose = () => {
    if (emailStatus === "loading") return; // Prevent closing while sending
    setEmailStatus("idle");
    setErrorMessage("");
    setShowEmailPreview(false);
    onClose();
  };

  return typeof window !== "undefined"
    ? createPortal(
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-xl shadow-2xl max-w-md w-full p-6 md:p-8 max-h-[90vh] overflow-y-auto">
            <div className="flex items-center justify-between mb-6">
              <h3 className="text-xl font-bold text-gray-900">
                {showEmailPreview ? "Review Your Email" : title}
              </h3>
              <button
                onClick={handleClose}
                disabled={emailStatus === "loading"}
                className="text-white bg-primary p-1 rounded-lg transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                aria-label="Close modal"
              >
                <X size={20} />
              </button>
            </div>

            {!showEmailPreview && (
              <p className="text-gray-700 mb-6 text-center text-sm md:text-base">
                {description}
              </p>
            )}

            {showEmailPreview ? (
              /* Email Preview View */
              <div className="space-y-4">
                {emailData && (
                  <>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        To:
                      </label>
                      <p className="text-sm text-gray-900 bg-gray-50 p-3 rounded-lg">
                        {companyInfo?.email || "N/A"}
                      </p>
                    </div>

                    {emailData.fromName && (
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                          From:
                        </label>
                        <p className="text-sm text-gray-900 bg-gray-50 p-3 rounded-lg">
                          {emailData.fromName}
                          {emailData.fromEmail && ` (${emailData.fromEmail})`}
                        </p>
                      </div>
                    )}

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Subject:
                      </label>
                      <p className="text-sm text-gray-900 bg-gray-50 p-3 rounded-lg">
                        {emailData.subject}
                      </p>
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Message:
                      </label>
                      <div className="text-sm text-gray-900 bg-gray-50 p-3 rounded-lg whitespace-pre-wrap max-h-60 overflow-y-auto">
                        {emailData.message}
                      </div>
                    </div>
                  </>
                )}

                {/* Success Message */}
                {emailStatus === "success" && (
                  <div className="p-4 bg-green-50 border border-green-200 rounded-lg flex items-center gap-2">
                    <CheckCircle className="text-green-600" size={20} />
                    <p className="text-green-800 text-sm">
                      Email sent successfully!
                    </p>
                  </div>
                )}

                {/* Error Message */}
                {emailStatus === "error" && (
                  <div className="p-4 bg-red-50 border border-red-200 rounded-lg flex items-start gap-2">
                    <AlertCircle
                      className="text-red-600 flex-shrink-0 mt-0.5"
                      size={20}
                    />
                    <div className="flex-1">
                      <p className="text-red-800 text-sm font-semibold">
                        Failed to send email
                      </p>
                      {errorMessage && (
                        <p className="text-red-700 text-xs mt-1">
                          {errorMessage}
                        </p>
                      )}
                    </div>
                  </div>
                )}

                <div className="flex flex-col gap-3 pt-4">
                  {emailStatus !== "success" && (
                    <>
                      <button
                        onClick={handleConfirmSend}
                        disabled={emailStatus === "loading"}
                        className="flex items-center justify-center gap-2 bg-primary hover:bg-primary-dark text-white px-4 md:px-6 py-2.5 md:py-3 rounded-lg font-semibold transition-colors text-sm md:text-base disabled:opacity-50 disabled:cursor-not-allowed"
                      >
                        {emailStatus === "loading" ? (
                          <>
                            <Loader2 size={18} className="animate-spin" />
                            Sending...
                          </>
                        ) : (
                          <>
                            <Mail size={18} />
                            Confirm & Send Email
                          </>
                        )}
                      </button>
                      <button
                        onClick={handleBackToMethods}
                        disabled={emailStatus === "loading"}
                        className="flex items-center justify-center gap-2 bg-gray-200 hover:bg-gray-300 text-gray-800 px-4 md:px-6 py-2.5 md:py-3 rounded-lg font-semibold transition-colors text-sm md:text-base disabled:opacity-50 disabled:cursor-not-allowed"
                      >
                        Back
                      </button>
                    </>
                  )}
                </div>
              </div>
            ) : (
              /* Contact Method Selection View */
              <div className="space-y-4">
                {/* Success Message */}
                {emailStatus === "success" && (
                  <div className="mb-4 p-4 bg-green-50 border border-green-200 rounded-lg flex items-center gap-2">
                    <CheckCircle className="text-green-600" size={20} />
                    <p className="text-green-800 text-sm">
                      Email sent successfully!
                    </p>
                  </div>
                )}

                {/* Error Message */}
                {emailStatus === "error" && (
                  <div className="mb-4 p-4 bg-red-50 border border-red-200 rounded-lg flex items-start gap-2">
                    <AlertCircle
                      className="text-red-600 flex-shrink-0 mt-0.5"
                      size={20}
                    />
                    <div className="flex-1">
                      <p className="text-red-800 text-sm font-semibold">
                        Failed to send email
                      </p>
                      {errorMessage && (
                        <p className="text-red-700 text-xs mt-1">
                          {errorMessage}
                        </p>
                      )}
                    </div>
                  </div>
                )}

                <div className="flex flex-col gap-3">
                  {/* {companyInfo?.phone && (
                <button
                  onClick={() => handleContact("call")}
                  className="flex items-center justify-center gap-2 bg-white text-primary px-4 md:px-6 py-2.5 md:py-3 rounded-lg font-semibold hover:bg-gray-100 transition-colors text-sm md:text-base border border-primary"
                >
                  <Phone size={18} />
                  Call
                </button>
              )} */}

                  {companyInfo?.phone && (
                    <button
                      onClick={() => handleContact("whatsapp")}
                      disabled={emailStatus === "loading"}
                      className="flex items-center justify-center gap-2 bg-green-500 hover:bg-green-600 text-white px-4 md:px-6 py-2.5 md:py-3 rounded-lg font-semibold transition-colors text-sm md:text-base disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                      <MessageCircle size={18} />
                      WhatsApp
                    </button>
                  )}

                  {companyInfo?.email && (
                    <button
                      onClick={() => handleContact("email")}
                      disabled={emailStatus === "loading" || !emailData}
                      className="flex items-center justify-center gap-2 bg-gray-700 hover:bg-gray-800 text-white px-4 md:px-6 py-2.5 md:py-3 rounded-lg font-semibold transition-colors text-sm md:text-base disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                      <Mail size={18} />
                      Email
                    </button>
                  )}
                </div>
              </div>
            )}
          </div>
        </div>,
        document.body
      )
    : null;
}
