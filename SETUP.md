# Limer Properties - Setup Guide

## Quick Start

### 1. Install Dependencies

```bash
pnpm install
```

### 2. Run Development Server

```bash
pnpm dev
```

Visit [http://localhost:3000](http://localhost:3000) to see your site.

### 3. Build for Production

```bash
pnpm build
pnpm start
```

## Project Overview

### Pages

- **Home (`/`)**: Hero slider, featured properties, all properties with filters, why choose us section, and contact form
- **Property Details (`/property/[id]`)**: Detailed property page with image gallery, full description, features, and inquiry options
- **About (`/about`)**: Company story, mission, vision, core values, team, and statistics

### Key Features

- **Filtering System**: Filter properties by type (house for sale, house for rent, land, shortlet) and location
- **Featured Properties**: Showcase premium listings on the home page
- **Image Sliders**: Auto-rotating hero slider and property image galleries
- **Responsive Design**: Mobile-first approach with full tablet and desktop support
- **Blue Primary Theme**: Customizable color scheme using CSS variables

### Components

- `Header`: Sticky navigation with mobile menu
- `Footer`: Company info, links, and contact details
- `Hero`: Auto-rotating image slider with navigation
- `FilterBar`: Property filtering interface
- `PropertyCard`: Property listing card with image, details, and CTA
- `ContactSection`: Contact form and information
- `Button`: Reusable button component with variants
- `Loader`: Loading spinner with customization options

### Custom Hooks

- `usePropertyFilter`: Property filtering logic

### Utility Functions

- `cn()`: Class name utility
- `formatPrice()`: Nigerian Naira price formatting
- `formatNumber()`: Number formatting
- `truncateText()`: Text truncation

## Customization

### Update Property Listings

Edit `data/properties.ts` to add, remove, or modify properties.

### Change Colors

Modify CSS variables in `app/globals.css`:

```css
:root {
  --primary: #2563eb; /* Your primary color */
  --primary-dark: #1e40af;
  --primary-light: #3b82f6;
}
```

### Add New Locations

Update the `locations` array in `data/properties.ts`.

### Modify Contact Information

Update contact details in:

- `component/Footer/index.tsx`
- `component/ContactSection/index.tsx`
- `app/property/[id]/page.tsx`

## File Structure

```
limer-properties/
├── app/                     # Next.js App Router
│   ├── about/              # About page
│   ├── property/[id]/      # Dynamic property pages
│   ├── layout.tsx          # Root layout
│   ├── page.tsx            # Home page
│   └── globals.css         # Global styles
├── component/              # Reusable components
├── data/                   # Static data
├── hooks/                  # Custom React hooks
├── types/                  # TypeScript types
└── utils/                  # Utility functions
```

## Environment Variables

No environment variables required for the basic setup. If you add external APIs or services, create a `.env.local` file.

## Deployment

### Vercel (Recommended)

1. Push to GitHub
2. Import project in Vercel
3. Deploy automatically

### Other Platforms

```bash
pnpm build
```

Deploy the `.next` folder to your hosting platform.

## Support

For questions or issues, contact:

- Email: info@limerproperties.com
- Phone: +234 801 234 5678
