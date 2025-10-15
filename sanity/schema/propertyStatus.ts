import { defineField, defineType } from "sanity";
import { CheckCircle } from "lucide-react";

export default defineType({
  name: "propertyStatus",
  title: "Property Status",
  type: "document",
  icon: CheckCircle,
  fields: [
    defineField({
      name: "title",
      title: "Status Name",
      type: "string",
      description: "e.g., Available, Sold, Rented",
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "value",
      title: "Value",
      type: "string",
      description: "Unique identifier (e.g., available, sold, rented)",
      validation: (Rule) => Rule.required().regex(/^[a-z-]+$/),
    }),
    defineField({
      name: "color",
      title: "Color",
      type: "string",
      description: "Hex color for this status (e.g., #10b981 for available)",
      validation: (Rule) =>
        Rule.required().regex(/^#[0-9A-Fa-f]{6}$/, {
          name: "hex",
          invert: false,
        }),
    }),
  ],
  preview: {
    select: {
      title: "title",
      subtitle: "value",
    },
  },
});
