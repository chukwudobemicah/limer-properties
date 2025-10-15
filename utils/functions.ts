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
  propertyTitle: string,
  propertyId: string,
  detailsUrl?: string,
  imageUrl?: string
): string {
  const phoneNumber =
    process.env.NEXT_PUBLIC_WHATSAPP_NUMBER || "2348012345678";

  let message = `Hello Limer Properties,\n\nI'm interested in the property: *${propertyTitle}*\n\nProperty ID: ${propertyId}`;

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
