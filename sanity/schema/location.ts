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
      type: "string",
      description: "e.g., Lagos, Abuja",
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "state",
      title: "State",
      type: "string",
      description: "e.g., Lagos, FCT",
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
      subtitle: "city",
      state: "state",
    },
    prepare({ title, subtitle, state }) {
      return {
        title,
        subtitle: `${subtitle}, ${state}`,
      };
    },
  },
});
