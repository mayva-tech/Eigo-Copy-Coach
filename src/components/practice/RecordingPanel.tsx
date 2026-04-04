import { StyleSheet, Text, View } from 'react-native';

import AppButton from '@/src/components/common/AppButton';
import AppCard from '@/src/components/common/AppCard';
import { colors } from '@/src/constants/colors';

type RecordingPanelProps = {
  isRecording: boolean;
  hasRecording: boolean;
  micGranted: boolean;
  onStart: () => void;
  onStop: () => void;
  onReplay: () => void;
};

export default function RecordingPanel({
  isRecording,
  hasRecording,
  micGranted,
  onStart,
  onStop,
  onReplay,
}: RecordingPanelProps) {
  return (
    <AppCard>
      <Text style={styles.title}>声にだしてみる</Text>
      <Text style={styles.body}>
        まずはぜんぜんパーフェクトじゃなくていい。きこえたとおりにいえばOK。
      </Text>

      <View style={styles.statusWrap}>
        <View style={[styles.dot, isRecording && styles.dotActive]} />
        <Text style={styles.statusText}>
          {isRecording
            ? '録音ちゅう… はなしてみよう'
            : micGranted
              ? '録音できるよ'
              : 'マイクをOKしてね'}
        </Text>
      </View>

      <View style={styles.actions}>
        {isRecording ? (
          <AppButton label="録音をとめる" onPress={onStop} />
        ) : (
          <AppButton label="録音する" onPress={onStart} />
        )}

        <AppButton label="じぶんの声をきく" variant="secondary" onPress={onReplay} />
      </View>

      {!hasRecording ? (
        <Text style={styles.footnote}>まだ録音はないよ。</Text>
      ) : (
        <Text style={styles.footnote}>さいしんの録音をきけるよ。</Text>
      )}
    </AppCard>
  );
}

const styles = StyleSheet.create({
  title: {
    fontSize: 18,
    fontWeight: '800',
    color: colors.text,
    marginBottom: 6,
  },
  body: {
    fontSize: 15,
    lineHeight: 22,
    color: colors.textSoft,
    marginBottom: 10,
  },
  statusWrap: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
    marginBottom: 11,
  },
  dot: {
    width: 12,
    height: 12,
    borderRadius: 6,
    backgroundColor: '#C8BEB2',
  },
  dotActive: {
    backgroundColor: '#D9534F',
  },
  statusText: {
    fontSize: 14,
    color: colors.text,
    fontWeight: '700',
  },
  actions: {
    gap: 9,
  },
  footnote: {
    marginTop: 8,
    fontSize: 13,
    color: colors.textMuted,
  },
});
