import { useEffect } from 'react'
import { posthog } from '../lib/posthog'

export const usePostHog = () => {
  useEffect(() => {
    // PostHog is already initialized in main.tsx
    return () => {
      // Cleanup if needed
    }
  }, [])

  return {
    capture: (event: string, properties?: Record<string, any>) => {
      posthog.capture(event, properties)
    },
    identify: (userId: string, properties?: Record<string, any>) => {
      posthog.identify(userId, properties)
    },
    reset: () => {
      posthog.reset()
    },
    isFeatureEnabled: (flag: string) => {
      return posthog.isFeatureEnabled(flag)
    },
    getFeatureFlag: (flag: string) => {
      return posthog.getFeatureFlag(flag)
    }
  }
}
