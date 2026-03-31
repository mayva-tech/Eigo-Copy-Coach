import type { Href } from 'expo-router';

export const ROUTES = {
  /** Main app shell (bottom tabs). Group root is omitted from generated Href; cast keeps navigation valid at runtime. */
  HOME: '/(tabs)' as Href,
  ONBOARDING: '/onboarding',
  PRACTICE: '/practice',
  /** Saved weak words — same as History tab. */
  REVIEW: '/(tabs)/history',
  SESSION_COMPLETE: '/session-complete',
  SETTINGS: '/settings',
} as const;
