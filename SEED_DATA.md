# Seeding Sanity Data

This guide explains how to automatically populate your Sanity database with sample data.

## What Gets Created

The seed script will create:

### Cities (6)

- Lagos
- Abuja
- Port Harcourt
- Ibadan
- Kano
- Enugu

### States (6)

- Lagos State
- FCT
- Rivers State
- Oyo State
- Kano State
- Enugu State

### Property Types (4)

- House for Sale
- House for Rent
- Land
- Shortlet

### Property Structures (7)

- Bungalow
- Duplex
- Flat
- Terrace
- Mansion
- Detached House
- Semi-Detached

### Locations (14)

**Lagos:**

- Lekki Phase 1
- Ikeja GRA
- Victoria Island
- Ikoyi
- Lekki Phase 2
- Ajah
- Banana Island
- Yaba
- Surulere

**Abuja:**

- Maitama
- Asokoro
- Wuse 2
- Gwarinpa
- Jabi

## Setup

### 1. Get Your Sanity API Token

1. Go to https://www.sanity.io/manage
2. Select your project
3. Go to **API** tab
4. Click **Add API Token**
5. Give it a name like "Seed Script"
6. Set permissions to **Editor** (can create/edit documents)
7. Copy the token

### 2. Add Token to `.env.local`

Open your `.env.local` file and add:

```bash
SANITY_API_TOKEN=your-token-here
```

Your `.env.local` should now look like:

```bash
# WhatsApp Configuration
NEXT_PUBLIC_WHATSAPP_NUMBER=2348012345678

# Sanity CMS Configuration
NEXT_PUBLIC_SANITY_PROJECT_ID=xgbl25wn
NEXT_PUBLIC_SANITY_DATASET=production
NEXT_PUBLIC_SANITY_API_VERSION=2024-05-20

# Sanity API Token (for seeding data)
SANITY_API_TOKEN=your-token-here
```

### 3. Install Dependencies

```bash
pnpm install
```

### 4. Run the Seed Script

```bash
pnpm seed
```

You should see output like:

```
🌱 Starting to seed Sanity data...

📍 Creating cities...
  ✅ Created: Lagos
  ✅ Created: Abuja
  ...

🗺️  Creating states...
  ✅ Created: Lagos State
  ...

🏘️  Creating property types...
  ✅ Created: House for Sale
  ...

🏗️  Creating property structures...
  ✅ Created: Bungalow
  ...

📌 Creating locations...
  ✅ Created: Lekki Phase 1
  ...

✨ Seeding completed successfully!

Created:
  - 6 cities
  - 6 states
  - 4 property types
  - 7 property structures
  - 14 locations

🎉 You can now start adding properties in the Studio!
```

## Verify the Data

1. Open your Sanity Studio: http://localhost:3000/studio
2. Check the following sections:
   - City
   - State
   - Property Type
   - Property Structure
   - Location

All the data should be there!

## Important Notes

⚠️ **Run only once!** Running the script multiple times will create duplicate data.

⚠️ **Keep your token safe!** Never commit `.env.local` to git (it's already in `.gitignore`).

## Troubleshooting

### Error: "Insufficient permissions"

- Make sure your API token has **Editor** permissions
- Double-check the token in your `.env.local`

### Error: "Project ID not found"

- Verify `NEXT_PUBLIC_SANITY_PROJECT_ID` is correct in `.env.local`

### Data already exists

- If you want to re-seed, delete all documents from Sanity Studio first
- Or modify the script to check for existing data before creating

## Adding More Data

You can edit `scripts/seed-sanity.ts` to add more:

- Cities
- States
- Locations
- Property types
- Property structures

Just add them to the respective arrays in the script!
