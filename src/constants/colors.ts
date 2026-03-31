import { theme } from '@/src/theme/pronunciationTheme';

/**
 * Legacy semantic map used across the app — values follow warm coach palette.
 */
export const colors = {
  background: theme.colors.background,
  surface: theme.colors.surfaceElevated,
  surfaceSoft: theme.colors.surfaceSoft,
  border: theme.colors.border,
  text: theme.colors.text,
  textSoft: theme.colors.textSecondary,
  textMuted: theme.colors.textMuted,
  primary: theme.colors.accentGold,
  primarySoft: theme.colors.surfaceSoft,
  accent: theme.colors.accentGoldDeep,
  dangerSoft: theme.colors.practiceSoft,
  dangerText: theme.colors.dangerText,
  successSoft: theme.colors.successSoft,
  successText: theme.colors.successOlive,
  darkCard: theme.colors.darkCard,
  onDark: theme.colors.onDark,
  terracotta: theme.colors.terracotta,
} as const;
