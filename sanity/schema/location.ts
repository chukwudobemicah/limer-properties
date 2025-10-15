import { defineField, defineType } from "sanity";
import { MapPin } from "lucide-react";

export default defineType({
  name: "location",
  title: "Location",
  type: "document",
  icon: MapPin,
  fields: [
    defineField({
      name: "name",
      title: "Location Name",
      type: "string",
      description: "e.g., Lekki Phase 1, Ikeja GRA, Victoria Island",
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "city",
      title: "City",
      type: "reference",
      to: [{ type: "city" }],
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "state",
      title: "State",
      type: "reference",
      to: [{ type: "state" }],
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "slug",
      title: "Slug",
      type: "slug",
      description: "Auto-generated URL-friendly version",
      options: {
        source: "name",
        maxLength: 96,
      },
      validation: (Rule) => Rule.required(),
    }),
  ],
  preview: {
    select: {
      title: "name",
      city: "city.name",
      state: "state.name",
    },
    prepare({ title, city, state }) {
      return {
        title,
        subtitle: `${city}, ${state}`,
      };
    },
  },
});
