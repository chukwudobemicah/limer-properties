import { defineConfig } from "sanity";
import { structureTool } from "sanity/structure";
import { visionTool } from "@sanity/vision";
import { schemaTypes } from "./sanity/schema";

export default defineConfig({
  name: "default",
  title: "Limer Estate And Facility Management LTD",
  // The Studio is mounted at /studio (app/studio/[[...tool]]). Without this it
  // writes URLs without the /studio prefix, so reloading a Studio page 404s.
  basePath: "/studio",

  projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID!,
  dataset: process.env.NEXT_PUBLIC_SANITY_DATASET!,

  plugins: [structureTool(), visionTool()],

  schema: {
    types: schemaTypes,
  },
});
