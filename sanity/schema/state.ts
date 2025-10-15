import { defineField, defineType } from "sanity";
import { MapPin } from "lucide-react";

export default defineType({
  name: "state",
  title: "State",
  type: "document",
  icon: MapPin,
  fields: [
    defineField({
      name: "name",
      title: "State Name",
      type: "string",
      description: "e.g., Lagos State, FCT, Rivers State",
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
