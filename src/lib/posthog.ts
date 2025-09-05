import posthog from 'posthog-js'

const POSTHOG_API_KEY = import.meta.env.VITE_POSTHOG_API_KEY || 'phc_jIkj0hQSY670vRaUVjSRSDOqmLCDGkL6GJy44iqE84M'

export const initPostHog = () => {
  if (typeof window !== 'undefined') {
    posthog.init(POSTHOG_API_KEY, {
      api_host: 'https://app.posthog.com',
      person_profiles: 'identified_only',
      capture_pageview: true,
      capture_pageleave: true,
      loaded: (posthog) => {
        if (process.env.NODE_ENV === 'development') {
          console.log('PostHog loaded successfully')
        }
      }
    })
  }
}

export { posthog }
