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
      name: "value",
      title: "Value",
      type: "string",
      description: "Unique identifier (e.g., bungalow, duplex, flat)",
      validation: (Rule) => Rule.required().regex(/^[a-z-]+$/),
    }),
    defineField({
      name: "floors",
      title: "Typical Number of Floors",
      type: "number",
      description: "Default number of floors for this structure type",
    }),
    defineField({
      name: "description",
      title: "Description",
      type: "text",
      rows: 3,
    }),
  ],
  preview: {
    select: {
      title: "title",
      subtitle: "floors",
    },
    prepare({ title, subtitle }) {
      return {
        title,
        subtitle: subtitle ? `${subtitle} floor(s)` : undefined,
      };
    },
  },
});
