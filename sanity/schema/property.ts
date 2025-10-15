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
      title: "Status",
      type: "reference",
      to: [{ type: "propertyStatus" }],
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
      validation: (Rule) => Rule.min(0).integer(),
    }),
    defineField({
      name: "bathrooms",
      title: "Number of Bathrooms",
      type: "number",
      validation: (Rule) => Rule.min(0).integer(),
    }),
    defineField({
      name: "area",
      title: "Area (Square Meters)",
      type: "number",
      validation: (Rule) => Rule.required().positive(),
    }),
    defineField({
      name: "floors",
      title: "Number of Floors",
      type: "number",
      description: "Total number of stories/floors",
      validation: (Rule) => Rule.min(1).integer(),
    }),
    defineField({
      name: "parking",
      title: "Parking Spaces",
      type: "number",
      validation: (Rule) => Rule.min(0).integer(),
    }),
    defineField({
      name: "yearBuilt",
      title: "Year Built",
      type: "number",
      validation: (Rule) =>
        Rule.min(1900).max(new Date().getFullYear()).integer(),
    }),
    defineField({
      name: "furnished",
      title: "Furnished",
      type: "boolean",
      description: "Is this property furnished?",
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
      validation: (Rule) => Rule.required().min(1),
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
      status: "status.title",
    },
    prepare({ title, subtitle, media, status }) {
      return {
        title,
        subtitle: `${subtitle} - ${status}`,
        media,
      };
    },
  },
});
