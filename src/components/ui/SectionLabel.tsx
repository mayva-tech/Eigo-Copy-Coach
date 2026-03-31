import { StyleSheet, Text } from 'react-native';

import { theme, typography } from '@/src/theme/pronunciationTheme';

type SectionLabelProps = {
  children: string;
  /** Japanese gloss on the same line as the English title, smaller type. */
  subtitleJa?: string;
  style?: object;
};

export default function SectionLabel({ children, subtitleJa, style }: SectionLabelProps) {
  return (
    <Text style={[typography.sectionLabel, styles.wrap, style]}>
      {children}
      {subtitleJa ? <Text style={styles.subtitleJa}> {subtitleJa}</Text> : null}
    </Text>
  );
}

const styles = StyleSheet.create({
  wrap: {
    marginBottom: theme.space.xs,
  },
  subtitleJa: {
    fontSize: 11,
    fontWeight: '600',
    color: theme.colors.textMuted,
    letterSpacing: 0,
    textTransform: 'none',
  },
});
