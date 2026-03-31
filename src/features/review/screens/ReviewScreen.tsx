import { router } from 'expo-router';
import { useEffect } from 'react';
import { Pressable, StyleSheet, Text, View } from 'react-native';

import PrimaryButton from '@/src/components/ui/PrimaryButton';
import ScreenContainer from '@/src/components/ui/ScreenContainer';
import SectionLabel from '@/src/components/ui/SectionLabel';
import SecondaryButton from '@/src/components/ui/SecondaryButton';
import { loadReviewQueue } from '@/src/services/storage/practiceStorage';
import { usePracticeStore } from '@/src/store/usePracticeStore';
import { theme, typography } from '@/src/theme/pronunciationTheme';

export default function ReviewScreen() {
  const reviewQueue = usePracticeStore((state) => state.reviewQueue);
  const setReviewQueue = usePracticeStore((state) => state.setReviewQueue);
  const clearReviewQueue = usePracticeStore((state) => state.clearReviewQueue);

  useEffect(() => {
    void (async () => {
      const items = await loadReviewQueue();
      setReviewQueue(items);
    })();
  }, [setReviewQueue]);

  const handleClear = () => {
    clearReviewQueue();
  };

  return (
    <ScreenContainer>
      <SectionLabel>HISTORY</SectionLabel>
      <Text style={styles.title}>Words to revisit</Text>
      <Text style={[typography.body, styles.sub]}>
        点数が低かった単語をここに集めます。短く聞いて、もう一度だけ真似してみましょう。
      </Text>

      {reviewQueue.length === 0 ? (
        <View style={styles.emptyCard}>
          <Text style={styles.emptyTitle}>まだデータはありません</Text>
          <Text style={typography.body}>
            練習後に「もう一回やりたい単語」がここへ追加されます。
          </Text>
        </View>
      ) : (
        <>
          <View style={styles.list}>
            {reviewQueue.map((item) => (
              <Pressable
                key={item.id}
                style={({ pressed }) => [styles.row, pressed && styles.rowPressed]}
                onPress={() => router.push(`/practice/lesson-01`)}
              >
                <View style={styles.dot} />
                <View style={styles.rowBody}>
                  <Text style={styles.word}>{item.word}</Text>
                  <Text style={styles.meta}>こう言う: {item.sayItLike}</Text>
                  <Text style={styles.meta}>口のコツ: {item.mouthTipJa}</Text>
                  <Text style={styles.score}>Score {item.score}</Text>
                </View>
              </Pressable>
            ))}
          </View>

          <SecondaryButton label="Clear history" onPress={handleClear} />
          <View style={{ height: theme.space.xs }} />
          <PrimaryButton label="Practice this lesson" onPress={() => router.push('/practice/lesson-01')} />
        </>
      )}
    </ScreenContainer>
  );
}

const styles = StyleSheet.create({
  title: {
    fontFamily: theme.fontDisplay,
    fontSize: 24,
    color: theme.colors.text,
    marginBottom: 2,
    lineHeight: 30,
  },
  sub: {
    color: theme.colors.textMuted,
    marginBottom: theme.space.md,
    fontSize: 14,
    lineHeight: 19,
  },
  emptyCard: {
    backgroundColor: theme.colors.surfaceElevated,
    borderRadius: theme.radius.xl,
    borderWidth: 1,
    borderColor: theme.colors.borderSubtle,
    padding: theme.space.md,
    gap: theme.space.xs,
  },
  emptyTitle: {
    fontFamily: theme.fontDisplay,
    fontSize: 18,
    color: theme.colors.text,
  },
  list: {
    gap: theme.space.xs,
    marginBottom: theme.space.md,
  },
  row: {
    flexDirection: 'row',
    backgroundColor: theme.colors.surfaceElevated,
    borderRadius: theme.radius.lg,
    borderWidth: 1,
    borderColor: theme.colors.borderSubtle,
    padding: theme.space.sm,
    gap: theme.space.sm,
  },
  rowPressed: {
    opacity: 0.85,
  },
  dot: {
    width: 10,
    height: 10,
    borderRadius: 5,
    marginTop: 4,
    backgroundColor: theme.colors.retryAmber,
  },
  rowBody: {
    flex: 1,
    minWidth: 0,
  },
  word: {
    fontFamily: theme.fontDisplay,
    fontSize: 18,
    color: theme.colors.text,
    marginBottom: 2,
  },
  meta: {
    fontSize: 13,
    color: theme.colors.textMuted,
    lineHeight: 18,
  },
  score: {
    marginTop: 6,
    fontSize: 13,
    fontWeight: '800',
    color: theme.colors.accentGoldDeep,
  },
});
