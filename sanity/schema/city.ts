import { defineField, defineType } from "sanity";
import { Building2 } from "lucide-react";

export default defineType({
  name: "city",
  title: "City",
  type: "document",
  icon: Building2,
  fields: [
    defineField({
      name: "name",
      title: "City Name",
      type: "string",
      description: "e.g., Lagos, Abuja, Port Harcourt",
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "slug",
      title: "Slug",
      type: "slug",
      options: {
        source: "name",
        maxLength: 96,
      },
      validation: (Rule) => Rule.required(),
    }),
  ],
});
