# WhatsApp Integration Setup

## Overview

Limer Properties includes WhatsApp integration that allows potential buyers/renters to instantly contact you about properties they're interested in.

## Setup Instructions

### 1. Get Your WhatsApp Number

You need a WhatsApp Business number. This can be:

- Your personal WhatsApp number
- A WhatsApp Business account number
- WhatsApp Business API number

**Format**: Country code + number (no + sign, no spaces)

Examples:

- Nigeria: `2348012345678`
- UK: `447700900123`
- USA: `11234567890`

### 2. Add to Environment Variables

Create or edit `.env.local` in the project root:

```bash
NEXT_PUBLIC_WHATSAPP_NUMBER=2348012345678
```

Replace with your actual WhatsApp number.

### 3. Restart Development Server

If the server is running, restart it for changes to take effect:

```bash
# Stop the server (Ctrl+C)
# Then restart
pnpm dev
```

## How It Works

### User Experience

1. User browses properties on your website
2. Clicks the **WhatsApp** button on a property card
3. WhatsApp opens (web or app) with a pre-filled message
4. User can edit the message and send

### Pre-filled Message

The default message includes:

```
Hello Limer Properties,

I'm interested in the property: *[Property Title]*

Property ID: [ID]

Could you please provide more details?

Thank you!
```

## Customization

### Change the Message Template

Edit the `generateWhatsAppLink` function in `utils/functions.ts`:

```typescript
export function generateWhatsAppLink(
  propertyTitle: string,
  propertyId: string
): string {
  const phoneNumber =
    process.env.NEXT_PUBLIC_WHATSAPP_NUMBER || "2348012345678";

  // Customize this message
  const message = `Your custom message here
  
Property: *${propertyTitle}*
ID: ${propertyId}

Your custom text...`;

  const encodedMessage = encodeURIComponent(message);
  return `https://wa.me/${phoneNumber}?text=${encodedMessage}`;
}
```

### Message Formatting

WhatsApp supports basic formatting:

- `*bold text*` → **bold text**
- `_italic text_` → _italic text_
- `~strikethrough~` → ~~strikethrough~~
- `` `monospace` `` → `monospace`

### Add More Property Details

You can pass additional property information:

```typescript
export function generateWhatsAppLink(
  propertyTitle: string,
  propertyId: string,
  propertyPrice?: number,
  propertyLocation?: string
): string {
  const phoneNumber =
    process.env.NEXT_PUBLIC_WHATSAPP_NUMBER || "2348012345678";

  const message = `Hello Limer Properties,

I'm interested in: *${propertyTitle}*

📍 Location: ${propertyLocation}
💰 Price: ${propertyPrice}
🆔 ID: ${propertyId}

Please send more details.

Thank you!`;

  const encodedMessage = encodeURIComponent(message);
  return `https://wa.me/${phoneNumber}?text=${encodedMessage}`;
}
```

## Testing

### Test on Desktop

1. Click the WhatsApp button on any property
2. WhatsApp Web should open in a new tab
3. Message should be pre-filled
4. You can send a test message to yourself

### Test on Mobile

1. Open the website on your phone
2. Click the WhatsApp button
3. WhatsApp app should open
4. Message should be pre-filled

## Troubleshooting

### WhatsApp button doesn't work

**Check**:

1. Environment variable is set correctly
2. Number format is correct (country code + number, no +)
3. Dev server was restarted after adding .env.local

### Wrong number receiving messages

**Fix**: Update `NEXT_PUBLIC_WHATSAPP_NUMBER` in `.env.local`

### Want to use different numbers for different properties

You can create a mapping in your property data:

```typescript
// In types/property.ts
export interface Property {
  // ... existing fields
  whatsappContact?: string; // optional WhatsApp number
}

// In utils/functions.ts
export function generateWhatsAppLink(
  propertyTitle: string,
  propertyId: string,
  customNumber?: string
): string {
  const phoneNumber =
    customNumber || process.env.NEXT_PUBLIC_WHATSAPP_NUMBER || "2348012345678";
  // ... rest of function
}
```

## Production Deployment

### Vercel

Add environment variable in Vercel dashboard:

1. Go to Project Settings → Environment Variables
2. Add `NEXT_PUBLIC_WHATSAPP_NUMBER`
3. Set value to your WhatsApp number
4. Redeploy

### Other Platforms

Add the environment variable according to your platform's documentation.

## Security Notes

- The `NEXT_PUBLIC_` prefix makes this variable accessible in the browser
- This is intentional for WhatsApp links
- Your number will be visible to users (they can see the WhatsApp chat anyway)
- Consider using a business number rather than personal

## Support

For issues or questions about WhatsApp integration, contact your development team.
