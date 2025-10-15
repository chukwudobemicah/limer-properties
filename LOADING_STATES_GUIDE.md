# Loading States Guide

## Overview

This project uses two types of loading indicators:

1. **Skeleton Loaders** (Primary - 90% of use cases)
2. **Spinner Loader** (Secondary - 10% of use cases)

---

## 🎯 Skeleton Loaders (Use Most of the Time)

### What are Skeletons?

Animated placeholder components that mimic the layout and structure of the actual content being loaded.

### When to Use Skeletons:

✅ **Content Loading**

- Property cards
- Property details page
- Filter bars
- Lists of items
- Profile pages
- Dashboard widgets

✅ **Benefits**

- Better perceived performance
- Users see the structure of what's coming
- Reduces layout shift (CLS)
- More professional look
- Familiar pattern from Facebook, LinkedIn, etc.

### Available Skeleton Components:

1. **`<PropertyCardSkeleton />`**
   - Use when loading property cards
   - Already styled to match PropertyCard layout
2. **`<FilterBarSkeleton />`**

   - Use when loading filter options
   - Matches FilterBar structure

3. **`<PropertyDetailsSkeleton />`**
   - Use for full property details page
   - Complete page skeleton

### Example Usage:

```tsx
{
  loading ? (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
      {[...Array(6)].map((_, index) => (
        <PropertyCardSkeleton key={index} />
      ))}
    </div>
  ) : (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
      {properties.map((property) => (
        <PropertyCard key={property._id} property={property} />
      ))}
    </div>
  );
}
```

---

## ⭕ Spinner Loader (Use Sparingly)

### What is it?

The `<Loader />` component - a spinning circle indicator.

### When to Use Spinners:

✅ **Button Actions**

- Form submissions
- Save/Update operations
- "Load More" buttons

```tsx
<button disabled={loading}>
  {loading ? <Loader size="sm" /> : "Save Property"}
</button>
```

✅ **Short Async Operations**

- Quick API calls (< 500ms)
- Inline actions
- Modals/Dialogs opening

```tsx
{
  loading ? <Loader size="md" text="Processing..." /> : <SuccessMessage />;
}
```

✅ **Indeterminate Progress**

- File uploads without progress
- Background tasks
- WebSocket connections

```tsx
<Loader size="lg" text="Connecting to server..." fullScreen={true} />
```

### Loader Component Props:

```tsx
interface LoadingProps {
  size?: "sm" | "md" | "lg" | "xl"; // Default: "md"
  text?: string; // Optional loading text
  fullScreen?: boolean; // Full screen overlay
  className?: string; // Additional classes
  color?: "primary" | "white" | "current"; // Color theme
}
```

---

## 🚫 When NOT to Use Spinners

❌ **Don't use for:**

- Page loads (use skeletons)
- Content lists (use skeletons)
- Multiple items loading at once (use skeletons)
- Any content that has a clear structure

---

## 📊 Current Implementation

### Pages Using Skeletons:

1. **Home Page** (`app/page.tsx`)

   - Filter bar: `<FilterBarSkeleton />`
   - Featured properties: `<PropertyCardSkeleton />` × 6
   - All properties: `<PropertyCardSkeleton />` × 9

2. **Properties Page** (`app/properties/page.tsx`)

   - Filter sidebar: Custom skeleton
   - Property grid: `<PropertyCardSkeleton />` × 9

3. **Property Details** (`app/property/[id]/page.tsx`)
   - Full page: `<PropertyDetailsSkeleton />`

### Where Spinner Could Be Used:

1. **Contact Form** (Future)

   ```tsx
   <button type="submit" disabled={submitting}>
     {submitting ? <Loader size="sm" /> : "Send Message"}
   </button>
   ```

2. **Image Upload** (Future)

   ```tsx
   {
     uploading && <Loader size="md" text="Uploading image..." />;
   }
   ```

3. **WhatsApp Redirect** (Future)
   ```tsx
   <Loader size="sm" text="Opening WhatsApp..." />
   ```

---

## 🎨 Creating Custom Skeletons

If you need a new skeleton, follow this pattern:

```tsx
export default function YourComponentSkeleton() {
  return (
    <div className="bg-white rounded-lg shadow-md p-6 animate-pulse">
      {/* Mimic the actual component structure */}
      <div className="h-6 bg-gray-200 rounded w-3/4 mb-4" />
      <div className="h-4 bg-gray-200 rounded w-1/2 mb-2" />
      <div className="space-y-2">
        <div className="h-3 bg-gray-200 rounded w-full" />
        <div className="h-3 bg-gray-200 rounded w-5/6" />
      </div>
    </div>
  );
}
```

### Key CSS Classes:

- `animate-pulse` - Tailwind's built-in pulse animation
- `bg-gray-200` - Skeleton background color
- `rounded` - Match your component's border radius

---

## ✅ Best Practices

### Do's:

✅ Use skeletons for content-heavy pages
✅ Match skeleton layout to actual component
✅ Show multiple skeleton items (6-9) for lists
✅ Add `key={index}` when mapping skeleton arrays
✅ Use appropriate sizing (h-6, h-4, h-3, etc.)

### Don'ts:

❌ Don't mix spinners and skeletons on the same page
❌ Don't use spinners for page-level loading
❌ Don't show single skeleton for grid layouts
❌ Don't make skeletons too complex
❌ Don't forget to remove loading states after data loads

---

## 📱 Mobile Considerations

Skeletons automatically work responsively because they mirror your component's responsive layout:

```tsx
// This skeleton will be responsive like the grid it represents
<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
  {[...Array(6)].map((_, i) => (
    <PropertyCardSkeleton key={i} />
  ))}
</div>
```

---

## 🎯 Quick Decision Tree

**Need a loading indicator?**

```
Is it content with a clear structure?
├─ YES → Use Skeleton Loader
│  ├─ Property cards? → <PropertyCardSkeleton />
│  ├─ Filter bar? → <FilterBarSkeleton />
│  ├─ Property details? → <PropertyDetailsSkeleton />
│  └─ Custom layout? → Create new skeleton
│
└─ NO → Is it an action/operation?
   ├─ YES → Use Spinner <Loader />
   │  ├─ Button action? → size="sm"
   │  ├─ Modal/inline? → size="md"
   │  └─ Full screen? → size="lg" fullScreen={true}
   │
   └─ UNSURE → Default to Skeleton
```

---

## 🚀 Summary

**Rule of Thumb:**

> "If the content has a shape, use a skeleton. If it's an action, use a spinner."

Most of the time, you'll use **skeletons**. The `<Loader />` component is kept for specific button actions and quick operations.

This approach gives users the best experience - they see what's coming before it loads! 🎉
