# Sanity CMS Setup Guide for Limer Properties

## 🚀 Quick Start

### Step 1: Create a Sanity Project

1. Visit [https://www.sanity.io/manage](https://www.sanity.io/manage)
2. Sign up or log in
3. Click "Create project"
4. Name your project: **Limer Properties**
5. Choose dataset name: **production**
6. Copy your **Project ID**

### Step 2: Configure Environment Variables

Add your Sanity credentials to `.env.local`:

```bash
# Sanity CMS Configuration
NEXT_PUBLIC_SANITY_PROJECT_ID=your-project-id-here
NEXT_PUBLIC_SANITY_DATASET=production
```

### Step 3: Access Sanity Studio

Sanity Studio is embedded in your Next.js app at the `/studio` route:

**Development**: http://localhost:3000/studio  
**Production**: https://your-domain.com/studio

No need to run a separate command! Just visit `/studio` in your browser.

### Step 4: Add Data (Important Order!)

**You MUST add data in this specific order!**

#### 4.1 Add Cities (First!)

Go to **City** and create:

- `Lagos`
- `Abuja`
- `Port Harcourt`
- `Ibadan`
- Add more as needed...

#### 4.2 Add States (Second!)

Go to **State** and create:

- `Lagos State`
- `FCT`
- `Rivers State`
- `Oyo State`
- Add more as needed...

#### 4.3 Add Property Types

Go to **Property Type** and create:

- `House for Sale` (slug will auto-generate)
- `House for Rent`
- `Land`
- `Shortlet`

#### 4.4 Add Property Structures

Go to **Property Structure** and create:

- `Bungalow` (slug will auto-generate)
- `Duplex`
- `Flat`
- `Terrace`
- `Mansion`

#### 4.5 Add Locations (After Cities & States!)

Go to **Location** and create (example):

- **Name**: `Lekki Phase 1` | **City**: Select "Lagos" | **State**: Select "Lagos State"
- **Name**: `Ikeja GRA` | **City**: Select "Lagos" | **State**: Select "Lagos State"
- **Name**: `Victoria Island` | **City**: Select "Lagos" | **State**: Select "Lagos State"
- **Name**: `Ikoyi` | **City**: Select "Lagos" | **State**: Select "Lagos State"
- Add more as needed...

### Step 5: Add Properties

Now you can add properties! Go to **Property** and:

1. **Title**: Enter property title
2. **Slug**: Click generate
3. **Property Type**: Select from dropdown (values you created)
4. **Property Status**: Select (Available, Sold, or Rented)
5. **Location**: Select from dropdown
6. **Structure**: Select from dropdown (optional)
7. **Description**: Enter full description
8. **Price**: Enter price in Naira
9. **Images**: Upload property photos
10. **Bedrooms/Bathrooms**: Enter numbers
11. **Area**: Square meters
12. **Features**: Add amenities (Swimming Pool, 24/7 Security, etc.)
13. **Featured**: Toggle if should appear on homepage

## 📝 Schema Overview

### Filter Schemas (Create First!)

These are reference schemas that properties use:

```
propertyType     → For filtering by sale/rent/land/shortlet
location         → For filtering by area
propertyStructure → For filtering by bungalow/duplex/flat
propertyStatus   → For property availability status
```

### Property Schema

Main schema that **references** the filter schemas above.

## 🎨 Using in Next.js

### Fetch All Properties

```typescript
import { useSanityProperties } from "@/hooks/useSanityProperties";

const { properties, loading, error } = useSanityProperties();
```

### Fetch Filter Options

```typescript
import { useSanityFilters } from "@/hooks/useSanityFilters";

const { propertyTypes, locations, structures, statuses, loading } =
  useSanityFilters();
```

### Filter Properties

```typescript
import { useSanityPropertyFilter } from "@/hooks/useSanityPropertyFilter";

const {
  filteredProperties,
  setSelectedType,
  setSelectedLocation,
  // ... more filter methods
} = useSanityPropertyFilter({ properties });
```

### Display Images

```typescript
import { urlFor } from "@/lib/sanity.image";

<Image
  src={urlFor(property.images[0].asset).width(800).height(600).url()}
  alt={property.images[0].alt || property.title}
  width={800}
  height={600}
/>;
```

## 🔧 Common Tasks

### Add a New Location

1. Go to Sanity Studio
2. Click **Location**
3. Click **Create**
4. Fill in Name, City, State
5. Generate Slug
6. Publish

### Add a New Property Type

1. Go to **Property Type**
2. Create new document
3. **Title**: Display name (e.g., "Commercial Property")
4. **Value**: Code name (e.g., "commercial")
5. **Description**: Optional
6. Publish

### Update a Property

1. Find property in Sanity Studio
2. Click to open
3. Make changes
4. Click **Publish**
5. Changes appear on website immediately

### Delete a Property

1. Open property
2. Click three dots (...)
3. Select **Delete**
4. Confirm

## 🌐 Deploy Sanity Studio

When ready to deploy your Sanity Studio:

```bash
pnpm sanity:deploy
```

This will deploy to: `https://your-project-name.sanity.studio`

## 📊 Data Migration

If you have existing properties in `data/properties.ts`, you need to:

1. Add all filter values first (types, locations, structures, statuses)
2. Manually create properties in Sanity Studio OR
3. Use Sanity's import tool (see Sanity docs)

## 🔐 Security & Permissions

### CORS Origins

Add your website domain in Sanity settings:

1. Go to [https://www.sanity.io/manage](https://www.sanity.io/manage)
2. Select your project
3. Go to **API** → **CORS Origins**
4. Add `http://localhost:3000` (development)
5. Add your production URL when deploying

## 🚨 Troubleshooting

### "No properties found"

- Check that `NEXT_PUBLIC_SANITY_PROJECT_ID` is set correctly
- Check that properties are **published** (not just saved as drafts)
- Check that filter values exist (types, locations, etc.)

### "Cannot find reference"

- Make sure you created filter values BEFORE creating properties
- Property Types, Locations, Structures must exist first

### Images not loading

- Check CORS settings in Sanity
- Verify image URLs are being generated correctly
- Check browser console for errors

## 📚 Resources

- [Sanity Documentation](https://www.sanity.io/docs)
- [GROQ Query Language](https://www.sanity.io/docs/groq)
- [Next.js + Sanity Guide](https://www.sanity.io/guides/nextjs)

## 🎯 Best Practices

1. **Always create filter values first** before adding properties
2. **Use descriptive titles** for better admin experience
3. **Optimize images** before uploading (Sanity has limits)
4. **Set featured flag** for homepage properties
5. **Add alt text** to all images for SEO
6. **Use slug generator** for consistent URLs
7. **Preview before publishing** to check everything looks good

---

Need help? Check the Sanity documentation or contact support.
