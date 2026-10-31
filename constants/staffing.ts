// Staffing & home services: placements for employers, jobs for applicants,
// and on-demand home/facility services. Landlord services (letting, rent
// collection, estate management) live under Property management instead.

export const STAFF_ROLES = [
  {
    key: "housemaid",
    cta: "Request a housemaid",
    title: "Housemaid",
    body: "Live-in or daily help with cleaning, laundry and running the home.",
  },
  {
    key: "nanny",
    cta: "Request a nanny",
    title: "Nanny & childcare assistant",
    body: "Patient, caring support for babies and young children.",
  },
  {
    key: "cook",
    cta: "Request a cook or chef",
    title: "Cook & chef",
    body: "Home cooks and trained chefs for families, events and businesses.",
  },
  {
    key: "security",
    cta: "Request security",
    title: "Security personnel",
    body: "Trained guards for homes, estates, offices and sites.",
  },
  {
    key: "driver",
    cta: "Request a driver",
    title: "Driver",
    body: "Experienced, licensed drivers for families and executives.",
  },
  {
    key: "office",
    cta: "Request office staff",
    title: "Office staff",
    body: "Receptionists, cleaners, messengers and office assistants.",
  },
] as const;

/** Options for "type of worker" / "job applying for". */
export const WORKER_TYPES = [
  "Housemaid",
  "Nanny / childcare assistant",
  "Cook / chef",
  "Security personnel",
  "Driver",
  "Office staff",
  "Cleaner",
  "Caregiver",
  "Gardener",
  "Laundry staff",
  "House manager / steward",
  "Other (please specify)",
];

/** The "anything else" option; picking it asks the person to type the role. */
export const OTHER_ROLE = "Other (please specify)";

/** Shown under the role cards so it's clear the list isn't exhaustive. */
export const MORE_ROLES = [
  "Cleaners",
  "Gardeners",
  "Caregivers",
  "Laundry staff",
  "House managers",
  "Stewards",
  "Messengers",
];

export const ROLE_TO_WORKER_TYPE: Record<string, string> = {
  housemaid: "Housemaid",
  nanny: "Nanny / childcare assistant",
  cook: "Cook / chef",
  security: "Security personnel",
  driver: "Driver",
  office: "Office staff",
};

export const HOME_SERVICES = [
  "House cleaning",
  "Office & commercial cleaning",
  "Property care & maintenance",
  "General maintenance & repairs",
  "Plumbing & electrical",
  "Painting & renovation",
  "Gardening & compound maintenance",
  "Facility management",
];

/** What an applicant sends in the first stage. Drivers also send their licence. */
export function getRequiredDocuments(workerType: string) {
  return workerType === "Driver"
    ? ["CV", "Driver's licence", "Full-length photo"]
    : ["CV", "Full-length photo"];
}

export const HIRE_STEPS = [
  { title: "Send your request", body: "Tell us who you need, the salary and when they should start." },
  { title: "We shortlist", body: "We match you with screened candidates who have guarantors on file." },
  { title: "Interview & placement", body: "Meet your shortlist, choose, and we handle the placement." },
];

export const APPLY_STEPS = [
  { title: "Send your details", body: "Fill the form and attach your documents in the WhatsApp chat." },
  { title: "Application & guarantors", body: "We'll send you an application form and two guarantor forms to fill." },
  { title: "Interview & placement", body: "Once you're verified, we invite you for an interview and place you." },
];
