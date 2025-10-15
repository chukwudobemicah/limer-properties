# Limer Properties

A modern, responsive real estate website built with Next.js 15, React 19, TypeScript, and Tailwind CSS.

## Features

- 🏠 **Property Listings**: Browse houses for sale, rent, land, and shortlets
- 🔍 **Advanced Filtering**: Filter properties by type, location, bedrooms, and more
- 🎨 **Modern UI/UX**: Beautiful, responsive design with smooth animations
- 📱 **Mobile-First**: Optimized for all devices and screen sizes
- ⚡ **Fast Performance**: Built with Next.js for optimal speed and SEO
- 🎯 **Featured Properties**: Showcase premium listings
- 📸 **Image Galleries**: Interactive property image sliders
- 📄 **Detailed Property Pages**: Comprehensive property information
- 💼 **About Page**: Company information and team showcase
- 📞 **Contact Section**: Easy-to-use contact form

## Tech Stack

- **Framework**: Next.js 15 (App Router)
- **Language**: TypeScript
- **Styling**: Tailwind CSS with custom CSS variables
- **UI Components**: Custom-built, reusable components
- **Animations**: Framer Motion
- **Icons**: Lucide React
- **Package Manager**: pnpm

## Project Structure

```
limer-properties/
├── app/                      # Next.js app directory
│   ├── about/               # About page
│   ├── property/[id]/       # Dynamic property details page
│   ├── layout.tsx           # Root layout with header/footer
│   ├── page.tsx             # Home page
│   └── globals.css          # Global styles and CSS variables
├── component/               # Reusable components
│   ├── Button/
│   ├── ContactSection/
│   ├── FilterBar/
│   ├── Footer/
│   ├── Header/
│   ├── Hero/
│   ├── Loader/
│   ├── PropertyCard/
│   └── Toast/
├── data/                    # Static data
│   └── properties.ts        # Property listings data
├── hooks/                   # Custom React hooks
│   └── usePropertyFilter.ts
├── types/                   # TypeScript type definitions
│   └── property.ts
└── utils/                   # Utility functions
    └── functions.ts
```

## Getting Started

### Prerequisites

- Node.js 18+
- pnpm (or npm/yarn)

### Installation

1. Clone the repository:

```bash
git clone <repository-url>
cd limer-properties
```

2. Install dependencies:

```bash
pnpm install
```

3. Set up environment variables:

```bash
cp .env.local.example .env.local
```

Then edit `.env.local` and add your WhatsApp business number:

```bash
NEXT_PUBLIC_WHATSAPP_NUMBER=2348012345678
```

4. Run the development server:

```bash
pnpm dev
```

5. Open [http://localhost:3000](http://localhost:3000) in your browser

### Build for Production

```bash
pnpm build
pnpm start
```

## Environment Variables

Create a `.env.local` file in the root directory with the following variables:

```bash
# WhatsApp Business Number (country code without +)
NEXT_PUBLIC_WHATSAPP_NUMBER=2348012345678
```

### WhatsApp Integration

The PropertyCard component includes a WhatsApp button that opens WhatsApp with a pre-filled message. The message includes:

- Property title
- Property ID
- Professional greeting

Users can click the WhatsApp button to instantly contact you about any property.

## Customization

### Colors

The primary color scheme uses blue. You can customize colors in `app/globals.css`:

```css
:root {
  --primary: #2563eb;
  --primary-dark: #1e40af;
  --primary-light: #3b82f6;
  /* ... more colors */
}
```

### Property Data

Update property listings in `data/properties.ts`:

```typescript
export const properties: Property[] = [
  {
    id: "1",
    title: "Your Property Title",
    description: "Property description...",
    // ... more fields
  },
];
```

### Components

All components are located in the `component/` directory and are fully customizable. Each component is built with TypeScript and uses Tailwind CSS for styling.

## Key Components

### Button Component

Reusable button with primary/secondary variants and link support.

### PropertyCard Component

Displays property information with image, price, location, and features.

### FilterBar Component

Advanced filtering for property type and location.

### Hero Component

Auto-rotating image slider with navigation controls.

### Header Component

Responsive navigation with mobile menu.

### Footer Component

Company information, quick links, and contact details.

## Custom Hooks

### usePropertyFilter

Handles property filtering logic:

- Filter by property type
- Filter by location
- Returns filtered results

## Type Safety

The project uses TypeScript for full type safety:

- Property types defined in `types/property.ts`
- Custom utility functions in `utils/functions.ts`
- Type-safe components and hooks

## Performance Optimizations

- Image optimization with Next.js Image component
- Code splitting with dynamic imports
- Lazy loading of images
- Optimized bundle size

## Browser Support

- Chrome (latest)
- Firefox (latest)
- Safari (latest)
- Edge (latest)

## License

This project is private and proprietary.

## Support

For support, email info@limerproperties.com or call +234 801 234 5678.

---

Built with ❤️ by Limer Properties Team

# limer-properties
