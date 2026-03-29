import { Pressable, StyleSheet, Text, View } from 'react-native';

import type { WordEntry } from '@/src/types/content';
import { pressScaleStyle } from '@/src/utils/pressScale';
import { useScreenColors } from '@/src/utils/screen-colors';

type Props = {
  word: WordEntry;
  guidanceTip: string;
  onListen: () => void;
  onRecord: () => void;
  onCompare: () => void;
  onNext: () => void;
  labels: {
    tapToListen: string;
    listenAgain: string;
    record: string;
    compare: string;
    next: string;
    a11yListen: string;
  };
};

export function PronunciationPracticeCard({
  word,
  guidanceTip,
  onListen,
  onRecord,
  onCompare,
  onNext,
  labels,
}: Props) {
  const c = useScreenColors();
  const chipBg = c.scheme === 'dark' ? 'rgba(255,255,255,0.08)' : 'rgba(0,0,0,0.06)';

  return (
    <View style={[styles.card, { backgroundColor: c.card }]}>
      <Text style={[styles.word, { color: c.text }]}>{word.word}</Text>
      <Pressable
        accessibilityRole="button"
        accessibilityLabel={labels.a11yListen}
        onPress={onListen}
        style={({ pressed }) => [styles.listenBtn, { backgroundColor: c.tint }, pressScaleStyle(pressed)]}>
        <Text style={styles.listenBtnText}>{labels.tapToListen}</Text>
      </Pressable>
      <Text style={[styles.guidance, { color: c.textMuted }]}>{guidanceTip}</Text>
      <View style={styles.actions}>
        <Pressable
          style={({ pressed }) => [styles.action, { backgroundColor: chipBg }, pressScaleStyle(pressed)]}
          onPress={onListen}>
          <Text style={[styles.actionText, { color: c.text }]}>{labels.listenAgain}</Text>
        </Pressable>
        <Pressable
          style={({ pressed }) => [styles.action, { backgroundColor: chipBg }, pressScaleStyle(pressed)]}
          onPress={onRecord}>
          <Text style={[styles.actionText, { color: c.text }]}>{labels.record}</Text>
        </Pressable>
        <Pressable
          style={({ pressed }) => [styles.action, { backgroundColor: chipBg }, pressScaleStyle(pressed)]}
          onPress={onCompare}>
          <Text style={[styles.actionText, { color: c.text }]}>{labels.compare}</Text>
        </Pressable>
        <Pressable
          style={({ pressed }) => [
            styles.action,
            styles.actionPrimary,
            { backgroundColor: c.tint },
            pressScaleStyle(pressed),
          ]}
          onPress={onNext}>
          <Text style={[styles.actionText, styles.actionPrimaryText]}>{labels.next}</Text>
        </Pressable>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  card: {
    borderRadius: 16,
    paddingHorizontal: 20,
    paddingVertical: 15,
    gap: 9,
  },
  word: {
    fontSize: 32,
    fontWeight: '800',
    letterSpacing: 0.5,
  },
  listenBtn: {
    alignSelf: 'flex-start',
    paddingVertical: 8,
    paddingHorizontal: 16,
    borderRadius: 10,
  },
  listenBtnText: {
    color: '#fff',
    fontWeight: '700',
    fontSize: 15,
  },
  guidance: {
    fontSize: 15,
    lineHeight: 22,
  },
  actions: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 8,
    marginTop: 2,
  },
  action: {
    paddingVertical: 6,
    paddingHorizontal: 12,
    borderRadius: 8,
  },
  actionPrimary: {},
  actionText: {
    fontSize: 14,
    fontWeight: '600',
  },
  actionPrimaryText: {
    color: '#fff',
  },
});
