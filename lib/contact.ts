import { COMPANY_DETAILS } from "@/constants/companydetails";
import { SanityCompanyInfo } from "@/types/sanity";

/** Digits-only phone, preferring the number managed in Sanity. */
export function getPhoneDigits(companyInfo?: SanityCompanyInfo | null): string {
  const raw =
    companyInfo?.phone ||
    process.env.NEXT_PUBLIC_WHATSAPP_NUMBER ||
    COMPANY_DETAILS.phone;
  return raw.replace(/\D/g, "");
}

export function getCompanyEmail(companyInfo?: SanityCompanyInfo | null): string {
  return companyInfo?.email || COMPANY_DETAILS.email;
}

export function getPhoneDisplay(companyInfo?: SanityCompanyInfo | null): string {
  const digits = getPhoneDigits(companyInfo);
  // 2347014123777 -> +234 701 412 3777
  const match = digits.match(/^(234)(\d{3})(\d{3})(\d{4})$/);
  return match
    ? `+${match[1]} ${match[2]} ${match[3]} ${match[4]}`
    : `+${digits}`;
}

export const DEFAULT_WHATSAPP_MESSAGE =
  "Hello Limer! I'd like to speak with an advisor about a property.";

export function getWhatsAppUrl(
  message: string = DEFAULT_WHATSAPP_MESSAGE,
  companyInfo?: SanityCompanyInfo | null,
): string {
  return `https://wa.me/${getPhoneDigits(companyInfo)}?text=${encodeURIComponent(
    message,
  )}`;
}

export function getTelUrl(companyInfo?: SanityCompanyInfo | null): string {
  return `tel:+${getPhoneDigits(companyInfo)}`;
}

interface SendEmailInput {
  to: string;
  subject: string;
  message: string;
  fromEmail?: string;
  fromName?: string;
}

/** Posts to the existing Resend-backed /api/send-email route. */
export async function sendEmail(input: SendEmailInput): Promise<void> {
  const response = await fetch("/api/send-email", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(input),
  });

  if (!response.ok) {
    const data = await response.json().catch(() => ({}));
    throw new Error(data.error || "Failed to send email");
  }
}
