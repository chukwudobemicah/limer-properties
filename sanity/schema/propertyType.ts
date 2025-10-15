import { defineField, defineType } from "sanity";
import { Tag } from "lucide-react";

export default defineType({
  name: "propertyType",
  title: "Property Type",
  type: "document",
  icon: Tag,
  fields: [
    defineField({
      name: "title",
      title: "Type Name",
      type: "string",
      description: "e.g., House for Sale, House for Rent, Land, Shortlet",
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "value",
      title: "Value",
      type: "string",
      description:
        "Unique identifier (e.g., house-sale, house-rent, land, shortlet)",
      validation: (Rule) => Rule.required().regex(/^[a-z-]+$/),
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
      subtitle: "value",
    },
  },
});
