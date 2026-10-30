/**
 * About-page content. Edit here — no component changes needed.
 */

export const CEO = {
  name: "Godfrey Akunwa Echezonam",
  role: "Chief Executive Officer",
  /**
   * Drop a 4:5 portrait into /public/images (e.g. /images/ceo.jpg)
   * and set the path here. While null, a placeholder frame is shown.
   */
  image: null as string | null,
  /** TODO: replace with a real quote from Godfrey. */
  quote:
    "A short quote from Godfrey on why he started Limer, or what clients can expect from the team.",
  /** TODO: replace with Godfrey's real bio. */
  bio: [
    "Godfrey leads Limer Estate & Facility Management. Bio paragraph one: his background, how long he has worked in real estate, and the areas of Lagos and Ogun he knows best.",
    "Bio paragraph two: qualifications or memberships, notable projects, and what he focuses on day to day at Limer.",
  ],
  /** Optional — the LinkedIn button only shows when this is set. */
  linkedin: null as string | null,
};

/** TODO: confirm these figures before launch. */
export const STATS = [
  { value: "500+", label: "Properties sold" },
  { value: "1,000+", label: "Happy clients" },
  { value: "150+", label: "Locations" },
  { value: "40+", label: "Years of experience" },
];

export const MISSION =
  "To deliver real estate services that exceed expectations through integrity, professionalism and innovation — making every property transaction seamless, transparent and rewarding.";

export const VISION =
  "To be Nigeria's leading real estate company, known for excellence, customer satisfaction and building sustainable communities across the nation.";

export const VALUES = [
  {
    title: "Integrity",
    body: "Honest, transparent and ethical in every deal we touch.",
  },
  {
    title: "Excellence",
    body: "The highest standard, from paperwork to property care.",
  },
  {
    title: "Customer focus",
    body: "Your goals and your peace of mind come first.",
  },
  {
    title: "Innovation",
    body: "New tools and better methods to serve you faster.",
  },
];
