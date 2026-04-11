import { Platform, StyleSheet, View } from 'react-native';

import PrimaryButton from './PrimaryButton';
import SecondaryButton from './SecondaryButton';
import { theme } from '@/src/theme/pronunciationTheme';

type PracticeActionsProps = {
  onSkip: () => void;
  onTryAgain: () => void;
  skipLabel?: string;
  skipLabelJa?: string;
  tryAgainLabel?: string;
  tryAgainLabelJa?: string;
};

export default function PracticeActions({
  onSkip,
  onTryAgain,
  skipLabel = 'Skip',
  skipLabelJa = 'とばす',
  tryAgainLabel = 'Try again',
  tryAgainLabelJa = 'もういちど',
}: PracticeActionsProps) {
  return (
    <View style={styles.row}>
      <SecondaryButton
        label={skipLabel}
        labelSuffixJa={skipLabelJa}
        labelStyle={styles.actionLabelEn}
        labelJaStyle={styles.actionLabelJa}
        onPress={onSkip}
        flex={1}
      />
      <PrimaryButton
        label={tryAgainLabel}
        labelSuffixJa={tryAgainLabelJa}
        labelStyle={styles.actionLabelEn}
        labelJaStyle={styles.actionLabelJa}
        onPress={onTryAgain}
        flex={1}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  row: {
    flexDirection: 'row',
    gap: theme.space.xs,
    marginTop: theme.space.sm,
  },
  actionLabelEn: {
    fontFamily: Platform.select({
      ios: 'System',
      android: 'sans-serif',
      default: 'sans-serif',
    }),
    fontSize: 15,
    fontWeight: '700',
  },
  actionLabelJa: {
    fontFamily: Platform.select({
      ios: 'System',
      android: 'sans-serif',
      default: 'sans-serif',
    }),
    fontSize: 15,
    fontWeight: '400',
    color: theme.colors.text,
  },
});
