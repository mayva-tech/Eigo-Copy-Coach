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
      <Text style={styles.title}>声に出してみる</Text>
      <Text style={styles.body}>
        まずは完璧じゃなくていい。聞こえた形をそのまま言えば大丈夫。
      </Text>

      <View style={styles.statusWrap}>
        <View style={[styles.dot, isRecording && styles.dotActive]} />
        <Text style={styles.statusText}>
          {isRecording
            ? '録音中… 話してみよう'
            : micGranted
              ? '録音できます'
              : 'マイク許可が必要です'}
        </Text>
      </View>

      <View style={styles.actions}>
        {isRecording ? (
          <AppButton label="録音を止める" onPress={onStop} />
        ) : (
          <AppButton label="録音する" onPress={onStart} />
        )}

        <AppButton label="自分の声を聞く" variant="secondary" onPress={onReplay} />
      </View>

      {!hasRecording ? (
        <Text style={styles.footnote}>まだ録音はありません。</Text>
      ) : (
        <Text style={styles.footnote}>最新の録音を再生できます。</Text>
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
