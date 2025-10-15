# Select Component

A custom, animated dropdown select component built with Framer Motion.

## Features

✨ **Smooth Animations**: Fade and slide animations powered by Framer Motion  
🎨 **Modern Design**: Clean, professional styling with hover effects  
🎯 **Fully Typed**: TypeScript support with proper types  
📱 **Responsive**: Works great on all screen sizes  
♿ **Accessible**: Keyboard and screen reader friendly  
🔒 **Click Outside**: Automatically closes when clicking outside  
🎭 **Animated Icons**: Chevron rotates when opening/closing  
✅ **Active States**: Visual feedback for selected options

## Usage

```tsx
import Select from "@/component/Select";

const options = [
  { value: "1", label: "Option 1" },
  { value: "2", label: "Option 2" },
  { value: "3", label: "Option 3" },
];

<Select
  label="Choose an option"
  value={selectedValue}
  onChange={(value) => setSelectedValue(value)}
  options={options}
  placeholder="Select..."
/>;
```

## Props

| Prop          | Type                                | Required | Default            | Description                             |
| ------------- | ----------------------------------- | -------- | ------------------ | --------------------------------------- |
| `options`     | `SelectOption[]`                    | ✅       | -                  | Array of options with value and label   |
| `value`       | `string \| number`                  | ✅       | -                  | Currently selected value                |
| `onChange`    | `(value: string \| number) => void` | ✅       | -                  | Callback when selection changes         |
| `label`       | `string`                            | ❌       | -                  | Label text displayed above select       |
| `placeholder` | `string`                            | ❌       | "Select an option" | Placeholder text when no value selected |
| `className`   | `string`                            | ❌       | ""                 | Additional CSS classes                  |

## Animations

### Opening/Closing

- **Dropdown Menu**: Fades in/out with slide animation
- **Chevron Icon**: Rotates 180° when open

### Hover Effects

- **Options**: Slide right on hover with background color change
- **Trigger**: Border color changes to primary on hover

### Selected State

- **Active Option**: Blue background with primary text color
- **Visual Feedback**: Font weight changes for selected option

## Styling

The component uses Tailwind CSS and respects your design system:

- Primary color for active states
- Primary-lighter for hover backgrounds
- Gray scale for neutral elements
- Smooth transitions for all animations

## Examples

### Basic Select

```tsx
<Select
  value={type}
  onChange={setType}
  options={[
    { value: "all", label: "All Types" },
    { value: "house", label: "House" },
    { value: "land", label: "Land" },
  ]}
/>
```

### With Label

```tsx
<Select
  label="Property Type"
  value={type}
  onChange={setType}
  options={propertyTypes}
/>
```

### Dynamic Options

```tsx
<Select
  label="Location"
  value={location}
  onChange={setLocation}
  options={cities.map((city) => ({
    value: city.id,
    label: city.name,
  }))}
/>
```

## Implementation Details

- Uses `useState` for open/close state
- Uses `useRef` for click outside detection
- Uses `useEffect` for event listener cleanup
- Automatic z-index management for overlays
- Max height with scroll for long option lists
