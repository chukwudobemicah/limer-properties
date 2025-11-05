import { type ClassValue, clsx } from "clsx";

export function cn(...inputs: ClassValue[]) {
  return clsx(inputs);
}

export function formatPrice(price: number): string {
  return new Intl.NumberFormat("en-NG", {
    style: "currency",
    currency: "NGN",
    minimumFractionDigits: 0,
  }).format(price);
}

export function formatNumber(number: number): string {
  return new Intl.NumberFormat("en-US").format(number);
}

export function truncateText(text: string, maxLength: number): string {
  if (text.length <= maxLength) return text;
  return text.slice(0, maxLength) + "...";
}

export function generateWhatsAppLink(
  phoneNumber: string,
  propertyTitle: string,
  propertyId: string,
  detailsUrl?: string,
  imageUrl?: string
): string {
  let message = `Hello Limer Estate And Facility Management LTD,\n\nI'm interested in the property: *${propertyTitle}*\n\nProperty ID: ${propertyId}`;

  if (detailsUrl) {
    message += `\n\nView Details: ${detailsUrl}`;
  }

  if (imageUrl) {
    message += `\n\nProperty Image: ${imageUrl}`;
  }

  message += `\n\nCould you please provide more details?\n\nThank you!`;

  const encodedMessage = encodeURIComponent(message);

  return `https://wa.me/${phoneNumber}?text=${encodedMessage}`;
}

export function generateTourWhatsAppLink(
  phoneNumber: string,
  propertyTitle: string,
  propertyId: string,
  detailsUrl?: string
): string {
  let message = `Hello Limer Estate And Facility Management LTD,\n\nI would like to schedule a tour for the property: *${propertyTitle}*\n\nProperty ID: ${propertyId}`;

  if (detailsUrl) {
    message += `\n\nView Details: ${detailsUrl}`;
  }

  message += `\n\nPlease let me know your available dates and times for a property viewing.\n\nThank you!`;

  const encodedMessage = encodeURIComponent(message);

  return `https://wa.me/${phoneNumber}?text=${encodedMessage}`;
}

export function generateInquiryWhatsAppLink(
  phoneNumber: string,
  propertyTitle: string,
  propertyId: string,
  detailsUrl?: string
): string {
  let message = `Hello Limer Estate And Facility Management LTD,\n\nI have some questions about the property: *${propertyTitle}*\n\nProperty ID: ${propertyId}`;

  if (detailsUrl) {
    message += `\n\nView Details: ${detailsUrl}`;
  }

  message += `\n\nI would appreciate if you could provide more information about this property.\n\nThank you!`;

  const encodedMessage = encodeURIComponent(message);

  return `https://wa.me/${phoneNumber}?text=${encodedMessage}`;
}
