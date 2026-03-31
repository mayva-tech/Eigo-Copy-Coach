import { type ReactNode } from 'react';
import { StyleSheet, Text } from 'react-native';

import ScreenContainer from '@/src/components/ui/ScreenContainer';
import SectionLabel from '@/src/components/ui/SectionLabel';
import { theme, typography } from '@/src/theme/pronunciationTheme';

type PlaceholderTabScreenProps = {
  eyebrow: string;
  title: string;
  body: string;
  footer?: ReactNode;
};

export default function PlaceholderTabScreen({
  eyebrow,
  title,
  body,
  footer,
}: PlaceholderTabScreenProps) {
  return (
    <ScreenContainer>
      <SectionLabel>{eyebrow}</SectionLabel>
      <Text style={styles.title}>{title}</Text>
      <Text style={typography.body}>{body}</Text>
      {footer}
    </ScreenContainer>
  );
}

const styles = StyleSheet.create({
  title: {
    fontFamily: theme.fontDisplay,
    fontSize: 24,
    color: theme.colors.text,
    marginBottom: theme.space.xs,
    lineHeight: 30,
  },
});
