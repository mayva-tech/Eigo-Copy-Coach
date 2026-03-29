import { Ionicons } from '@expo/vector-icons';
import { router } from 'expo-router';
import { useEffect } from 'react';
import { Pressable, ScrollView, StyleSheet, Text, View } from 'react-native';
import { SafeAreaView, useSafeAreaInsets } from 'react-native-safe-area-context';

import AppButton from '@/src/components/common/AppButton';
import AppCard from '@/src/components/common/AppCard';
import ScreenHeader from '@/src/components/common/ScreenHeader';
import { colors } from '@/src/constants/colors';
import { ROUTES } from '@/src/constants/routes';
import { loadReviewQueue } from '@/src/services/storage/practiceStorage';
import { usePracticeStore } from '@/src/store/usePracticeStore';

export default function ReviewScreen() {
  const insets = useSafeAreaInsets();
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

  const handleBack = () => {
    if (router.canGoBack()) {
      router.back();
    } else {
      router.replace(ROUTES.HOME);
    }
  };

  return (
    <SafeAreaView style={styles.safeArea} edges={['bottom', 'left', 'right']}>
      <View style={[styles.topBar, { paddingTop: insets.top + 12 }]}>
        <Pressable
          accessibilityRole="button"
          accessibilityLabel="戻る"
          onPress={handleBack}
          style={({ pressed }) => [styles.backHit, pressed && styles.backPressed]}
        >
          <Ionicons name="chevron-back" size={26} color={colors.primary} />
        </Pressable>
        <Text style={styles.topBarTitle}>復習</Text>
        <View style={styles.topBarSpacer} />
      </View>

      <ScrollView
        style={styles.scroll}
        contentContainerStyle={styles.container}
        showsVerticalScrollIndicator={false}
      >
        <ScreenHeader
          eyebrow="Review"
          subtitle="点数が低かった単語をここに集めます。"
        />

        {reviewQueue.length === 0 ? (
          <AppCard>
            <Text style={styles.title}>まだ復習データはありません</Text>
            <Text style={styles.body}>
              練習後に「もう一回やりたい単語」や「苦手な音」をここへ表示します。
            </Text>
          </AppCard>
        ) : (
          <>
            <View style={styles.list}>
              {reviewQueue.map((item) => (
                <AppCard key={item.id}>
                  <Text style={styles.word}>{item.word}</Text>
                  <Text style={styles.line}>こう言う: {item.sayItLike}</Text>
                  <Text style={styles.line}>さけたい形: {item.avoidGuide}</Text>
                  <Text style={styles.line}>口のコツ: {item.mouthTipJa}</Text>
                  <Text style={styles.score}>score: {item.score}</Text>
                </AppCard>
              ))}
            </View>

            <AppButton
              label="復習データを消す"
              variant="secondary"
              onPress={handleClear}
            />
          </>
        )}
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: colors.background,
  },
  topBar: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 6,
    paddingBottom: 12,
    borderBottomWidth: StyleSheet.hairlineWidth,
    borderBottomColor: colors.border,
    backgroundColor: colors.background,
  },
  backHit: {
    width: 44,
    height: 44,
    alignItems: 'center',
    justifyContent: 'center',
  },
  backPressed: {
    opacity: 0.65,
  },
  topBarTitle: {
    flex: 1,
    textAlign: 'center',
    fontSize: 17,
    fontWeight: '700',
    color: colors.text,
  },
  topBarSpacer: {
    width: 44,
  },
  scroll: {
    flex: 1,
  },
  container: {
    padding: 20,
    gap: 16,
    paddingBottom: 32,
  },
  list: {
    gap: 12,
  },
  title: {
    fontSize: 20,
    fontWeight: '800',
    color: colors.text,
    marginBottom: 8,
  },
  body: {
    fontSize: 15,
    lineHeight: 22,
    color: colors.textSoft,
  },
  word: {
    fontSize: 20,
    fontWeight: '800',
    color: colors.text,
    marginBottom: 8,
  },
  line: {
    fontSize: 14,
    lineHeight: 21,
    color: colors.textSoft,
    marginBottom: 4,
  },
  score: {
    marginTop: 6,
    fontSize: 14,
    fontWeight: '800',
    color: colors.primary,
  },
});
