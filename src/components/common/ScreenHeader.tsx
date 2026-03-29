import { StyleSheet, Text, View } from 'react-native';
import { colors } from '@/src/constants/colors';

type ScreenHeaderProps = {
  eyebrow?: string;
  /** When omitted, the large title line is not rendered (e.g. when the stack header shows the same title). */
  title?: string;
  subtitle?: string;
};

export default function ScreenHeader({
  eyebrow,
  title,
  subtitle,
}: ScreenHeaderProps) {
  return (
    <View style={styles.wrap}>
      {eyebrow ? (
        <Text style={[styles.eyebrow, !title && subtitle ? styles.eyebrowAboveSubtitle : null]}>
          {eyebrow}
        </Text>
      ) : null}
      {title ? <Text style={styles.title}>{title}</Text> : null}
      {subtitle ? <Text style={styles.subtitle}>{subtitle}</Text> : null}
    </View>
  );
}

const styles = StyleSheet.create({
  wrap: {
    marginBottom: 12,
  },
  eyebrow: {
    fontSize: 13,
    fontWeight: '800',
    textTransform: 'uppercase',
    letterSpacing: 0.7,
    color: colors.textMuted,
    marginBottom: 4,
  },
  eyebrowAboveSubtitle: {
    marginBottom: 8,
  },
  title: {
    fontSize: 30,
    lineHeight: 34,
    fontWeight: '800',
    color: colors.text,
    marginBottom: 4,
  },
  subtitle: {
    fontSize: 15,
    lineHeight: 22,
    color: colors.textSoft,
  },
});
