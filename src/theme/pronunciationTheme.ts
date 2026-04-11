import { Platform, StyleSheet } from 'react-native';

/** Warm, calm “premium coach” palette — aligned with app mockups. */
export const theme = {
  colors: {
    background: '#F7F3E9',
    surface: '#F2EBE1',
    surfaceElevated: '#FFFBF5',
    surfaceSoft: '#EDE6DB',
    border: '#E5DDD0',
    borderSubtle: '#EBE4D8',
    text: '#3C362A',
    textSecondary: '#6B6358',
    textMuted: '#8C8475',
    darkCard: '#3D362D',
    darkCardMuted: '#D4C4A8',
    onDark: '#F9F5F0',
    accentGold: '#C5A367',
    accentGoldDeep: '#9A7A45',
    /** Muted steel blue — meaning / tips and similar “learn more” CTAs. */
    accentBlue: '#4A6787',
    onAccentBlue: '#FFFFFF',
    /** Lighter blue fill (e.g. back / secondary within blue family). */
    accentBlueLight: '#9FB8CE',
    onAccentBlueLight: '#2A3D4F',
    accentSand: '#D4B896',
    terracotta: '#B35C44',
    terracottaRing: '#C9A067',
    successOlive: '#849460',
    successSoft: '#E4EBDC',
    retryAmber: '#C9A067',
    retrySoft: '#F3E8D4',
    practiceTerracotta: '#A65D50',
    practiceSoft: '#F0E0DC',
    /** Muted cool tint for example-sentence blocks — reads “light blue” without breaking warm UI. */
    exampleSentenceSoft: '#E6EEF3',
    exampleSentenceBorder: '#C2CED6',
    dangerText: '#A65D50',
    white: '#FFFFFF',
  },
  /** Tight vertical rhythm — closer to reference mock density. */
  space: {
    xs: 4,
    sm: 8,
    md: 12,
    lg: 16,
    xl: 22,
    xxl: 26,
  },
  radius: {
    sm: 10,
    md: 14,
    lg: 18,
    xl: 22,
    pill: 999,
  },
  /** System serif stack — no extra font load. */
  fontDisplay: Platform.select({
    ios: 'Georgia',
    android: 'serif',
    default: 'serif',
  }) as string,
  fontBody: undefined as string | undefined,
} as const;

export const typography = StyleSheet.create({
  displayL: {
    fontFamily: theme.fontDisplay,
    fontSize: 28,
    fontWeight: '400',
    color: theme.colors.text,
    letterSpacing: -0.5,
  },
  displayM: {
    fontFamily: theme.fontDisplay,
    fontSize: 22,
    fontWeight: '400',
    color: theme.colors.text,
  },
  displayOnDark: {
    fontFamily: theme.fontDisplay,
    fontSize: 24,
    fontWeight: '400',
    color: theme.colors.onDark,
  },
  wordHero: {
    fontFamily: theme.fontDisplay,
    fontSize: 38,
    fontWeight: '400',
    color: theme.colors.onDark,
    textAlign: 'center',
    lineHeight: 42,
  },
  sectionLabel: {
    fontSize: 10,
    fontWeight: '700',
    letterSpacing: 2.2,
    color: theme.colors.textMuted,
    textTransform: 'uppercase',
  },
  body: {
    fontSize: 13,
    lineHeight: 20,
    color: theme.colors.textSecondary,
  },
  bodySmall: {
    fontSize: 13,
    lineHeight: 18,
    color: theme.colors.textSecondary,
  },
  statNumber: {
    fontFamily: theme.fontDisplay,
    fontSize: 24,
    fontWeight: '400',
    color: theme.colors.text,
    textAlign: 'center',
    lineHeight: 28,
  },
  statLabel: {
    fontSize: 9,
    fontWeight: '700',
    letterSpacing: 1.1,
    color: theme.colors.textMuted,
    textAlign: 'center',
    textTransform: 'uppercase',
    marginTop: 4,
    lineHeight: 12,
  },
});
