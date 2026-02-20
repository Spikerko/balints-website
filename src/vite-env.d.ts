/* eslint-disable @typescript-eslint/no-explicit-any */
/// <reference types="vite/client" />

export {};

declare global {
  interface Window {
    umami?: {
      /**
       * Track a pageview manually. If called with no arguments, it records current pageview.
       */
      track: (eventName?: string, data?: Record<string, any>) => void

      /**
       * Identify the current user for session association.
       * @param userId A unique identifier for the user (e.g., from your auth system).
       * @param traits Optional additional attributes for the user.
       */
      identify: (userId: string, traits?: Record<string, any>) => void
    }
  }
}