import { defineField, defineType } from "sanity";

export default defineType({
  name: "companyInfo",
  title: "Company Information",
  type: "document",
  fields: [
    defineField({
      name: "companyName",
      title: "Company Name",
      type: "string",
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "phone",
      title: "Phone Number",
      type: "string",
      description: "Phone number in international format (e.g., 2348012345678)",
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "email",
      title: "Email Address",
      type: "string",
      validation: (Rule) => Rule.required().email(),
    }),
    defineField({
      name: "address",
      title: "Physical Address",
      type: "text",
      rows: 3,
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "description",
      title: "Company Description",
      type: "text",
      rows: 4,
      description: "Brief description about the company",
    }),
    defineField({
      name: "socials",
      title: "Social Media Links",
      type: "object",
      fields: [
        defineField({
          name: "facebook",
          title: "Facebook URL",
          type: "url",
        }),
        defineField({
          name: "instagram",
          title: "Instagram URL",
          type: "url",
        }),
        defineField({
          name: "twitter",
          title: "Twitter/X URL",
          type: "url",
        }),
        defineField({
          name: "linkedin",
          title: "LinkedIn URL",
          type: "url",
        }),
        defineField({
          name: "tiktok",
          title: "TikTok URL",
          type: "url",
        }),
        defineField({
          name: "whatsapp",
          title: "WhatsApp URL",
          type: "url",
          description:
            "WhatsApp business link (e.g., https://wa.me/2348012345678)",
        }),
      ],
    }),
  ],
  preview: {
    select: {
      title: "companyName",
      subtitle: "email",
    },
  },
});
