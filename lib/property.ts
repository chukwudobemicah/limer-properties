import { SanityProperty } from "@/types/sanity";
import { urlFor } from "@/lib/sanity.image";
import { formatPrice } from "@/utils/functions";

export type TypeSlug =
  | "house-for-sale"
  | "house-for-rent"
  | "land"
  | "shortlet"
  | "other";

/** Normalises Sanity's propertyType (string or legacy reference). */
export function getTypeSlug(propertyType: SanityProperty["propertyType"]): TypeSlug {
  const raw =
    typeof propertyType === "string"
      ? propertyType
      : propertyType?.slug?.current || propertyType?.title || "";
  const normalized = raw.toLowerCase().trim().replace(/\s+/g, "-");

  if (normalized.includes("land")) return "land";
  if (normalized.includes("shortlet")) return "shortlet";
  if (normalized.includes("rent")) return "house-for-rent";
  if (normalized.includes("sale")) return "house-for-sale";
  return "other";
}

/** e.g. "Land · For sale", "House · For rent". */
export function getTypeLabel(slug: TypeSlug): string {
  switch (slug) {
    case "land":
      return "Land · For sale";
    case "house-for-sale":
      return "House · For sale";
    case "house-for-rent":
      return "House · For rent";
    case "shortlet":
      return "Shortlet";
    default:
      return "Property";
  }
}

export function getPriceSuffix(slug: TypeSlug): string {
  if (slug === "house-for-rent") return "/ year";
  if (slug === "shortlet") return "/ night";
  return "";
}

const titleCase = (value: string) =>
  value
    .toLowerCase()
    .replace(/(^|[\s-])([a-z])/g, (_, separator, letter) => separator + letter.toUpperCase());

/** Full location string, cleaned of trailing punctuation. */
export function getLocation(location: SanityProperty["location"]): string {
  let value = "";
  if (typeof location === "string") {
    value = location;
  } else if (location && typeof location === "object") {
    value = [location.name, location.city?.name, location.state?.name]
      .filter(Boolean)
      .join(", ");
  }
  value = value.replace(/\s+/g, " ").replace(/[.\s]+$/, "").trim();
  // Fix shouting: "HAPPY LAND ESTATE ETI-OSA" -> "Happy Land Estate Eti-Osa"
  if (value && value === value.toUpperCase()) value = titleCase(value);
  return value;
}

/**
 * Known areas, broadest (LGA) first. Location text in Sanity is free-form
 * ("around Ofada, Sky Garden City Estate @ Someke Ofada, Ogun state."), so we
 * look for a recognisable area name rather than trusting comma positions.
 */
const KNOWN_AREAS = [
  "Ibeju-Lekki",
  "Eti-Osa",
  "Epe",
  "Ikorodu",
  "Badagry",
  "Ikoyi",
  "Victoria Island",
  "Lekki",
  "Ajah",
  "Ikeja",
  "Yaba",
  "Surulere",
  "Gbagada",
  "Magodo",
  "Ofada",
  "Mowe",
  "Ibafo",
  "Sagamu",
  "Abeokuta",
  "Olokunla",
  "Sangotedo",
  "Abijo",
  "Awoyaya",
  "Lakowe",
  "Bogije",
  "Abuja",
];

/** Short area name for tags, filters and spec rows, e.g. "Ibeju-Lekki". */
export function getAreaName(location: SanityProperty["location"]): string {
  const full = getLocation(location);
  if (!full) return "—";
  const haystack = full.toLowerCase().replace(/\s*-\s*/g, "-");
  const known = KNOWN_AREAS.find((area) => haystack.includes(area.toLowerCase()));
  if (known) return known;

  const parts = full
    .split(/[,@]/)
    .map((part) => part.trim())
    .filter((part) => part && !/state$/i.test(part) && !/^nigeria$/i.test(part));
  const pick = parts[parts.length - 1] || full;
  // Keep it tag-sized.
  return titleCase(pick.split(/\s+/).slice(0, 3).join(" "));
}

export function getSizeLabel(property: SanityProperty): string {
  return property.area ? `${property.area.toLocaleString("en-NG")} m²` : "On request";
}

export function getImageUrl(
  property: SanityProperty,
  width = 800,
  height = 536,
): string | null {
  const image = property.images?.find((item) => item?.asset);
  if (!image) return null;
  try {
    return urlFor(image.asset).width(width).height(height).fit("crop").auto("format").url();
  } catch {
    return null;
  }
}

export function getPropertyPath(property: SanityProperty): string {
  return `/property/${property.slug?.current ?? property._id}`;
}

export function getPropertyWhatsAppMessage(
  property: SanityProperty,
  origin?: string,
): string {
  const link = origin ? `\n${origin}${getPropertyPath(property)}` : "";
  return `Hello Limer! I'm interested in "${property.title}" (${getLocation(
    property.location,
  )}) listed at ${formatPrice(property.price)}. Is it still available?${link}`;
}

/** Bucketing used by the Properties page tabs. */
export function matchesTab(slug: TypeSlug, tab: PropertyTab): boolean {
  switch (tab) {
    case "all":
      return true;
    case "sale":
      return slug === "house-for-sale" || slug === "land";
    case "rent":
      return slug === "house-for-rent";
    case "land":
      return slug === "land";
    case "shortlet":
      return slug === "shortlet";
  }
}

export type PropertyTab = "all" | "sale" | "rent" | "land" | "shortlet";

export const PROPERTY_TABS: { value: PropertyTab; label: string }[] = [
  { value: "all", label: "All" },
  { value: "sale", label: "For sale" },
  { value: "rent", label: "For rent" },
  { value: "land", label: "Land" },
  { value: "shortlet", label: "Shortlets" },
];

/** Maps legacy ?type= values (house-sale, house-for-rent, …) to a tab. */
export function tabFromParam(value: string | null): PropertyTab {
  if (!value) return "all";
  const v = value.toLowerCase();
  if (v.includes("land")) return "land";
  if (v.includes("shortlet")) return "shortlet";
  if (v.includes("rent")) return "rent";
  if (v.includes("sale")) return "sale";
  if (["all", "sale", "rent", "land", "shortlet"].includes(v)) return v as PropertyTab;
  return "all";
}
