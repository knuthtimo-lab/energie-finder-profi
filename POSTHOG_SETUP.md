# PostHog Analytics Setup

PostHog has been successfully integrated into the Energie Finder Profi project.

## Configuration

- **API Key**: `phc_jIkj0hQSY670vRaUVjSRSDOqmLCDGkL6GJy44iqE84M`
- **Host**: `https://app.posthog.com`
- **Initialization**: PostHog is automatically initialized in `main.tsx`

## Files Added/Modified

1. **`src/lib/posthog.ts`** - PostHog configuration and initialization
2. **`src/hooks/usePostHog.ts`** - React hook for easy PostHog usage
3. **`src/main.tsx`** - PostHog initialization on app start
4. **`src/components/HeroSection.tsx`** - Example tracking implementation
5. **`package.json`** - Added posthog-js dependency

## Usage

### Basic Event Tracking

```tsx
import { usePostHog } from '@/hooks/usePostHog'

const MyComponent = () => {
  const posthog = usePostHog()

  const handleClick = () => {
    posthog.capture('button_clicked', {
      button_name: 'search',
      page: 'home'
    })
  }

  return <button onClick={handleClick}>Click me</button>
}
```

### User Identification

```tsx
const posthog = usePostHog()

// Identify a user
posthog.identify('user_123', {
  email: 'user@example.com',
  name: 'John Doe'
})
```

### Feature Flags

```tsx
const posthog = usePostHog()

// Check if feature is enabled
const isNewFeatureEnabled = posthog.isFeatureEnabled('new_feature')

// Get feature flag value
const featureValue = posthog.getFeatureFlag('feature_with_value')
```

## Environment Variables

You can optionally set the PostHog API key via environment variable:

```env
VITE_POSTHOG_API_KEY=phc_jIkj0hQSY670vRaUVjSRSDOqmLCDGkL6GJy44iqE84M
```

## Current Tracking

The following events are currently being tracked:

- `hero_search_clicked` - When user clicks "Installateur Finden" in hero section
- `hero_view_all_clicked` - When user clicks "Alle Installateure Ansehen"

## PostHog Dashboard

Visit [https://app.posthog.com](https://app.posthog.com) to view analytics data, create funnels, and set up feature flags.
