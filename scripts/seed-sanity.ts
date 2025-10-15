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
];

// Sample States
const states = [
  { name: "Lagos State" },
  { name: "FCT" },
  { name: "Rivers State" },
  { name: "Oyo State" },
  { name: "Kano State" },
  { name: "Enugu State" },
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

    // Get Lagos city and Lagos State for locations
    const lagosCity = createdCities.find((c) => c.name === "Lagos");
    const lagosState = createdStates.find((s) => s.name === "Lagos State");
    const abujaCity = createdCities.find((c) => c.name === "Abuja");
    const fct = createdStates.find((s) => s.name === "FCT");

    // Create Sample Locations
    console.log("\n📌 Creating locations...");
    const locations = [
      {
        name: "Lekki Phase 1",
        city: lagosCity!._id,
        state: lagosState!._id,
      },
      {
        name: "Ikeja GRA",
        city: lagosCity!._id,
        state: lagosState!._id,
      },
      {
        name: "Victoria Island",
        city: lagosCity!._id,
        state: lagosState!._id,
      },
      {
        name: "Ikoyi",
        city: lagosCity!._id,
        state: lagosState!._id,
      },
      {
        name: "Lekki Phase 2",
        city: lagosCity!._id,
        state: lagosState!._id,
      },
      {
        name: "Ajah",
        city: lagosCity!._id,
        state: lagosState!._id,
      },
      {
        name: "Banana Island",
        city: lagosCity!._id,
        state: lagosState!._id,
      },
      {
        name: "Yaba",
        city: lagosCity!._id,
        state: lagosState!._id,
      },
      {
        name: "Surulere",
        city: lagosCity!._id,
        state: lagosState!._id,
      },
      {
        name: "Maitama",
        city: abujaCity!._id,
        state: fct!._id,
      },
      {
        name: "Asokoro",
        city: abujaCity!._id,
        state: fct!._id,
      },
      {
        name: "Wuse 2",
        city: abujaCity!._id,
        state: fct!._id,
      },
      {
        name: "Gwarinpa",
        city: abujaCity!._id,
        state: fct!._id,
      },
      {
        name: "Jabi",
        city: abujaCity!._id,
        state: fct!._id,
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
