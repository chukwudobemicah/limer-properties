import { createClient } from "@sanity/client";
import { config } from "dotenv";

// Load environment variables from .env.local
config({ path: ".env.local" });

const client = createClient({
  projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID!,
  dataset: process.env.NEXT_PUBLIC_SANITY_DATASET!,
  apiVersion: "2024-05-20",
  token: process.env.SANITY_API_TOKEN, // Need to add this to .env.local
  useCdn: false,
});

// Sample Cities
const cities = [
  { name: "Lagos" },
  { name: "Abuja" },
  { name: "Port Harcourt" },
  { name: "Ibadan" },
  { name: "Kano" },
  { name: "Enugu" },
  { name: "Benin City" },
  { name: "Calabar" },
  { name: "Jos" },
  { name: "Warri" },
  { name: "Owerri" },
  { name: "Abeokuta" },
];

// Sample States
const states = [
  { name: "Lagos State" },
  { name: "FCT" },
  { name: "Rivers State" },
  { name: "Oyo State" },
  { name: "Kano State" },
  { name: "Enugu State" },
  { name: "Edo State" },
  { name: "Cross River State" },
  { name: "Plateau State" },
  { name: "Delta State" },
  { name: "Imo State" },
  { name: "Ogun State" },
];

// Sample Property Types
const propertyTypes = [
  { title: "House for Sale" },
  { title: "House for Rent" },
  { title: "Land" },
  { title: "Shortlet" },
];

// Sample Property Structures
const propertyStructures = [
  { title: "Bungalow" },
  { title: "Duplex" },
  { title: "Flat" },
  { title: "Terrace" },
  { title: "Mansion" },
  { title: "Detached House" },
  { title: "Semi-Detached" },
];

async function seedData() {
  try {
    console.log("🌱 Starting to seed Sanity data...\n");

    // Create Cities
    console.log("📍 Creating cities...");
    const createdCities = await Promise.all(
      cities.map(async (city) => {
        const doc = await client.create({
          _type: "city",
          name: city.name,
          slug: {
            _type: "slug",
            current: city.name.toLowerCase().replace(/\s+/g, "-"),
          },
        });
        console.log(`  ✅ Created: ${doc.name}`);
        return doc;
      })
    );

    // Create States
    console.log("\n🗺️  Creating states...");
    const createdStates = await Promise.all(
      states.map(async (state) => {
        const doc = await client.create({
          _type: "state",
          name: state.name,
          slug: {
            _type: "slug",
            current: state.name.toLowerCase().replace(/\s+/g, "-"),
          },
        });
        console.log(`  ✅ Created: ${doc.name}`);
        return doc;
      })
    );

    // Create Property Types
    console.log("\n🏘️  Creating property types...");
    const createdPropertyTypes = await Promise.all(
      propertyTypes.map(async (type) => {
        const doc = await client.create({
          _type: "propertyType",
          title: type.title,
          slug: {
            _type: "slug",
            current: type.title.toLowerCase().replace(/\s+/g, "-"),
          },
        });
        console.log(`  ✅ Created: ${doc.title}`);
        return doc;
      })
    );

    // Create Property Structures
    console.log("\n🏗️  Creating property structures...");
    const createdStructures = await Promise.all(
      propertyStructures.map(async (structure) => {
        const doc = await client.create({
          _type: "propertyStructure",
          title: structure.title,
          slug: {
            _type: "slug",
            current: structure.title.toLowerCase().replace(/\s+/g, "-"),
          },
        });
        console.log(`  ✅ Created: ${doc.title}`);
        return doc;
      })
    );

    // Get cities and states for locations
    const lagosCity = createdCities.find((c) => c.name === "Lagos");
    const lagosState = createdStates.find((s) => s.name === "Lagos State");
    const abujaCity = createdCities.find((c) => c.name === "Abuja");
    const fct = createdStates.find((s) => s.name === "FCT");
    const phCity = createdCities.find((c) => c.name === "Port Harcourt");
    const riversState = createdStates.find((s) => s.name === "Rivers State");
    const ibadanCity = createdCities.find((c) => c.name === "Ibadan");
    const oyoState = createdStates.find((s) => s.name === "Oyo State");
    const beninCity = createdCities.find((c) => c.name === "Benin City");
    const edoState = createdStates.find((s) => s.name === "Edo State");
    const calabarCity = createdCities.find((c) => c.name === "Calabar");
    const crossRiverState = createdStates.find(
      (s) => s.name === "Cross River State"
    );

    // Create Sample Locations
    console.log("\n📌 Creating locations...");
    const locations = [
      // Lagos Locations (15)
      { name: "Lekki Phase 1", city: lagosCity!._id, state: lagosState!._id },
      { name: "Lekki Phase 2", city: lagosCity!._id, state: lagosState!._id },
      { name: "Ikeja GRA", city: lagosCity!._id, state: lagosState!._id },
      { name: "Victoria Island", city: lagosCity!._id, state: lagosState!._id },
      { name: "Ikoyi", city: lagosCity!._id, state: lagosState!._id },
      { name: "Banana Island", city: lagosCity!._id, state: lagosState!._id },
      { name: "Ajah", city: lagosCity!._id, state: lagosState!._id },
      { name: "Yaba", city: lagosCity!._id, state: lagosState!._id },
      { name: "Surulere", city: lagosCity!._id, state: lagosState!._id },
      { name: "Maryland", city: lagosCity!._id, state: lagosState!._id },
      { name: "Magodo", city: lagosCity!._id, state: lagosState!._id },
      { name: "Lekki Gardens", city: lagosCity!._id, state: lagosState!._id },
      { name: "Chevron", city: lagosCity!._id, state: lagosState!._id },
      { name: "Sangotedo", city: lagosCity!._id, state: lagosState!._id },
      { name: "Gbagada", city: lagosCity!._id, state: lagosState!._id },

      // Abuja Locations (10)
      { name: "Maitama", city: abujaCity!._id, state: fct!._id },
      { name: "Asokoro", city: abujaCity!._id, state: fct!._id },
      { name: "Wuse 2", city: abujaCity!._id, state: fct!._id },
      { name: "Gwarinpa", city: abujaCity!._id, state: fct!._id },
      { name: "Jabi", city: abujaCity!._id, state: fct!._id },
      { name: "Katampe", city: abujaCity!._id, state: fct!._id },
      { name: "Lifecamp", city: abujaCity!._id, state: fct!._id },
      { name: "Lugbe", city: abujaCity!._id, state: fct!._id },
      { name: "Kubwa", city: abujaCity!._id, state: fct!._id },
      { name: "Garki", city: abujaCity!._id, state: fct!._id },

      // Port Harcourt Locations (8)
      { name: "GRA Phase 1", city: phCity!._id, state: riversState!._id },
      { name: "GRA Phase 2", city: phCity!._id, state: riversState!._id },
      { name: "Old GRA", city: phCity!._id, state: riversState!._id },
      { name: "Trans Amadi", city: phCity!._id, state: riversState!._id },
      { name: "Rumuokoro", city: phCity!._id, state: riversState!._id },
      { name: "Ada George", city: phCity!._id, state: riversState!._id },
      { name: "Eliozu", city: phCity!._id, state: riversState!._id },
      { name: "D-Line", city: phCity!._id, state: riversState!._id },

      // Ibadan Locations (5)
      { name: "Bodija", city: ibadanCity!._id, state: oyoState!._id },
      { name: "Ring Road", city: ibadanCity!._id, state: oyoState!._id },
      { name: "Jericho", city: ibadanCity!._id, state: oyoState!._id },
      { name: "Bashorun", city: ibadanCity!._id, state: oyoState!._id },
      { name: "Oluyole Estate", city: ibadanCity!._id, state: oyoState!._id },

      // Benin City Locations (4)
      { name: "GRA", city: beninCity!._id, state: edoState!._id },
      { name: "Ikpoba Hill", city: beninCity!._id, state: edoState!._id },
      { name: "Ugbowo", city: beninCity!._id, state: edoState!._id },
      { name: "Airport Road", city: beninCity!._id, state: edoState!._id },

      // Calabar Locations (3)
      {
        name: "Marian Road",
        city: calabarCity!._id,
        state: crossRiverState!._id,
      },
      {
        name: "Housing Estate",
        city: calabarCity!._id,
        state: crossRiverState!._id,
      },
      {
        name: "Satellite Town",
        city: calabarCity!._id,
        state: crossRiverState!._id,
      },
    ];

    await Promise.all(
      locations.map(async (location) => {
        const doc = await client.create({
          _type: "location",
          name: location.name,
          city: {
            _type: "reference",
            _ref: location.city,
          },
          state: {
            _type: "reference",
            _ref: location.state,
          },
          slug: {
            _type: "slug",
            current: location.name.toLowerCase().replace(/\s+/g, "-"),
          },
        });
        console.log(`  ✅ Created: ${doc.name}`);
        return doc;
      })
    );

    console.log("\n✨ Seeding completed successfully!");
    console.log("\nCreated:");
    console.log(`  - ${createdCities.length} cities`);
    console.log(`  - ${createdStates.length} states`);
    console.log(`  - ${createdPropertyTypes.length} property types`);
    console.log(`  - ${createdStructures.length} property structures`);
    console.log(`  - ${locations.length} locations`);
    console.log("\n🎉 You can now start adding properties in the Studio!");
  } catch (error) {
    console.error("❌ Error seeding data:", error);
    throw error;
  }
}

seedData();
