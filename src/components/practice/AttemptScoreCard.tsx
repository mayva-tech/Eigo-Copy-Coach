import { StyleSheet, Text, View } from 'react-native';
import AppCard from '@/src/components/common/AppCard';
import { colors } from '@/src/constants/colors';
import type { PracticeFeedbackTone } from '@/src/features/practice/types/practice.types';

type AttemptScoreCardProps = {
  tone: PracticeFeedbackTone;
  title: string;
  body: string;
  score: number | null;
};

export default function AttemptScoreCard({
  tone,
  title,
  body,
  score,
}: AttemptScoreCardProps) {
  return (
    <AppCard>
      <View style={styles.header}>
        <Text style={styles.title}>{title}</Text>
        {score !== null ? (
          <View
            style={[
              styles.scoreBadge,
              tone === 'good'
                ? styles.scoreGood
                : tone === 'warn'
                  ? styles.scoreWarn
                  : styles.scoreNeutral,
            ]}
          >
            <Text style={styles.scoreText}>{score}</Text>
          </View>
        ) : null}
      </View>

      <Text style={styles.body}>{body}</Text>
    </AppCard>
  );
}

const styles = StyleSheet.create({
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 10,
  },
  title: {
    flex: 1,
    fontSize: 18,
    fontWeight: '800',
    color: colors.text,
    marginRight: 10,
  },
  body: {
    fontSize: 15,
    lineHeight: 22,
    color: colors.textSoft,
  },
  scoreBadge: {
    minWidth: 50,
    paddingHorizontal: 12,
    paddingVertical: 8,
    borderRadius: 999,
    alignItems: 'center',
    justifyContent: 'center',
  },
  scoreNeutral: {
    backgroundColor: colors.surfaceSoft,
  },
  scoreGood: {
    backgroundColor: colors.successSoft,
  },
  scoreWarn: {
    backgroundColor: colors.dangerSoft,
  },
  scoreText: {
    fontSize: 14,
    fontWeight: '800',
    color: colors.text,
  },
});
