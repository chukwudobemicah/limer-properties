import { defineField, defineType } from "sanity";
import { Home } from "lucide-react";

export default defineType({
  name: "propertyStructure",
  title: "Property Structure",
  type: "document",
  icon: Home,
  fields: [
    defineField({
      name: "title",
      title: "Structure Name",
      type: "string",
      description: "e.g., Bungalow, Duplex, Flat, Terrace, Mansion",
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "slug",
      title: "Slug",
      type: "slug",
      options: {
        source: "title",
        maxLength: 96,
      },
      validation: (Rule) => Rule.required(),
    }),
  ],
});
