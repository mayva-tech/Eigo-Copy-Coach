import { colors } from '@/src/constants/colors';

export const theme = {
  colors,
  spacing: {
    xs: 6,
    sm: 10,
    md: 16,
    lg: 20,
    xl: 24,
    xxl: 32,
  },
  radius: {
    sm: 12,
    md: 18,
    lg: 24,
    pill: 999,
  },
  typography: {
    title: 30,
    heading: 22,
    body: 15,
    small: 13,
  },
} as const;

