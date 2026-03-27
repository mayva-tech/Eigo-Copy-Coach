import { StyleSheet, Text, View } from 'react-native';
import AppButton from '@/src/components/common/AppButton';
import AppCard from '@/src/components/common/AppCard';
import { colors } from '@/src/constants/colors';

type RecordingPanelProps = {
  isRecording: boolean;
  onStart: () => void;
  onStop: () => void;
};

export default function RecordingPanel({
  isRecording,
  onStart,
  onStop,
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
          {isRecording ? '録音中… 話してみよう' : '録音待機中'}
        </Text>
      </View>

      <View style={styles.actions}>
        {isRecording ? (
          <AppButton label="録音を止める" onPress={onStop} />
        ) : (
          <AppButton label="録音する" onPress={onStart} />
        )}
      </View>
    </AppCard>
  );
}

const styles = StyleSheet.create({
  title: {
    fontSize: 18,
    fontWeight: '800',
    color: colors.text,
    marginBottom: 10,
  },
  body: {
    fontSize: 15,
    lineHeight: 22,
    color: colors.textSoft,
    marginBottom: 14,
  },
  statusWrap: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
    marginBottom: 16,
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
    marginTop: 4,
  },
});
