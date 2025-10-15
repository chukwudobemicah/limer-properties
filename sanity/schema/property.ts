import { defineField, defineType } from "sanity";
import { Building } from "lucide-react";

export default defineType({
  name: "property",
  title: "Property",
  type: "document",
  icon: Building,
  fields: [
    defineField({
      name: "title",
      title: "Property Title",
      type: "string",
      description: "e.g., Luxury 5 Bedroom Duplex in Lekki",
      validation: (Rule) => Rule.required().max(100),
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
    defineField({
      name: "propertyType",
      title: "Property Type",
      type: "reference",
      to: [{ type: "propertyType" }],
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "status",
      title: "Property Status",
      type: "string",
      options: {
        list: [
          { title: "Available", value: "available" },
          { title: "Sold", value: "sold" },
          { title: "Rented", value: "rented" },
        ],
        layout: "dropdown",
      },
      initialValue: "available",
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "location",
      title: "Location",
      type: "reference",
      to: [{ type: "location" }],
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "structure",
      title: "Property Structure",
      type: "reference",
      to: [{ type: "propertyStructure" }],
      description: "Bungalow, Duplex, Flat, etc.",
    }),
    defineField({
      name: "description",
      title: "Description",
      type: "text",
      rows: 5,
      validation: (Rule) => Rule.required().min(50).max(1000),
    }),
    defineField({
      name: "price",
      title: "Price (NGN)",
      type: "number",
      validation: (Rule) => Rule.required().positive(),
    }),
    defineField({
      name: "images",
      title: "Property Images",
      type: "array",
      of: [
        {
          type: "image",
          options: {
            hotspot: true,
          },
          fields: [
            {
              name: "alt",
              type: "string",
              title: "Alternative text",
              description: "Important for SEO and accessibility",
            },
            {
              name: "caption",
              type: "string",
              title: "Caption",
            },
          ],
        },
      ],
      validation: (Rule) => Rule.required().min(1),
    }),
    defineField({
      name: "bedrooms",
      title: "Number of Bedrooms",
      type: "number",
      description: "Optional - only for residential properties",
      validation: (Rule) => Rule.min(0).integer(),
    }),
    defineField({
      name: "bathrooms",
      title: "Number of Bathrooms",
      type: "number",
      description: "Optional - only for residential properties",
      validation: (Rule) => Rule.min(0).integer(),
    }),
    defineField({
      name: "area",
      title: "Area (Square Meters)",
      type: "number",
      description: "Optional - not needed for all property types",
      validation: (Rule) => Rule.positive(),
    }),
    defineField({
      name: "floors",
      title: "Number of Floors",
      type: "number",
      description: "Optional - total number of stories/floors in the building",
      validation: (Rule) => Rule.min(1).integer(),
    }),
    defineField({
      name: "floorPosition",
      title: "Floor Position",
      type: "number",
      description:
        "Optional - for flats/apartments, which floor is this unit on? (e.g., 3 for 3rd floor)",
      validation: (Rule) => Rule.min(0).integer(),
    }),
    defineField({
      name: "parking",
      title: "Parking Spaces",
      type: "number",
      description: "Optional - number of parking spaces available",
      validation: (Rule) => Rule.min(0).integer(),
    }),
    defineField({
      name: "yearBuilt",
      title: "Year Built",
      type: "number",
      description: "Optional - year the property was constructed",
      validation: (Rule) =>
        Rule.min(1900).max(new Date().getFullYear()).integer(),
    }),
    defineField({
      name: "furnished",
      title: "Furnished",
      type: "boolean",
      description: "Optional - only relevant for rental properties",
      initialValue: false,
    }),
    defineField({
      name: "features",
      title: "Features & Amenities",
      type: "array",
      of: [{ type: "string" }],
      options: {
        layout: "tags",
      },
      description: "Optional - add relevant features for this property",
    }),
    defineField({
      name: "isFeatured",
      title: "Featured Property",
      type: "boolean",
      description: "Show this property on the homepage?",
      initialValue: false,
    }),
    defineField({
      name: "publishedAt",
      title: "Published At",
      type: "datetime",
      initialValue: () => new Date().toISOString(),
    }),
  ],
  preview: {
    select: {
      title: "title",
      subtitle: "propertyType.title",
      media: "images.0",
      status: "status",
    },
    prepare({ title, subtitle, media, status }) {
      const statusLabel =
        status === "available"
          ? "Available"
          : status === "sold"
          ? "Sold"
          : "Rented";
      return {
        title,
        subtitle: `${subtitle} - ${statusLabel}`,
        media,
      };
    },
  },
});
