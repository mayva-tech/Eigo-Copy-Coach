import { router } from 'expo-router';
import { ScrollView, StyleSheet, Text, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import AppButton from '@/src/components/common/AppButton';
import AppCard from '@/src/components/common/AppCard';
import ScreenHeader from '@/src/components/common/ScreenHeader';
import { colors } from '@/src/constants/colors';
import { dailyLesson01 } from '@/src/data/lessons/dailyLesson01';
import { useI18n } from '@/src/lib/i18n/useI18n';
import { ROUTES } from '@/src/constants/routes';

export default function HomeScreen() {
  const { t } = useI18n();

  return (
    <SafeAreaView style={styles.safeArea}>
      <ScrollView contentContainerStyle={styles.container} showsVerticalScrollIndicator={false}>
        <ScreenHeader
          eyebrow={t('home.title')}
          title={t('home.shellHeadline')}
          subtitle={t('home.shellSubtitle')}
        />

        <AppCard>
          <Text style={styles.cardLabel}>{t('home.today3Words')}</Text>
          <Text style={styles.cardTitle}>{t('home.dailyPracticeTitle')}</Text>
          <Text style={styles.cardBody}>{t('home.quickPracticeBody')}</Text>

          <View style={styles.wordList}>
            {dailyLesson01.map((item, index) => (
              <View key={item.id} style={styles.wordRow}>
                <Text style={styles.wordIndex}>{index + 1}</Text>
                <View>
                  <Text style={styles.wordText}>{item.word}</Text>
                  <Text style={styles.wordHint}>
                    {t('home.sayLikePrefix')}: {item.sayItLike}
                  </Text>
                </View>
              </View>
            ))}
          </View>

          <View style={styles.cardActions}>
            <AppButton
              label={t('home.startTodayPractice')}
              onPress={() => router.push(ROUTES.PRACTICE)}
            />
          </View>
        </AppCard>

        <AppCard>
          <Text style={styles.cardLabel}>{t('home.katakanaWarning')}</Text>
          <Text style={styles.cardTitle}>{t('home.fixThisHabit')}</Text>
          <Text style={styles.cardBody}>{t('home.habitBody')}</Text>
        </AppCard>

        <View style={styles.bottomActions}>
          <AppButton
            label={t('home.viewOnboarding')}
            variant="secondary"
            onPress={() => router.push(ROUTES.ONBOARDING)}
          />
          <AppButton
            label={t('home.linkReview')}
            variant="secondary"
            onPress={() => router.push(ROUTES.REVIEW)}
          />
          <AppButton
            label={t('home.linkSettings')}
            variant="secondary"
            onPress={() => router.push(ROUTES.SETTINGS)}
          />
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: colors.background,
  },
  container: {
    padding: 20,
    gap: 16,
  },
  cardLabel: {
    fontSize: 13,
    fontWeight: '800',
    color: colors.textMuted,
    textTransform: 'uppercase',
    letterSpacing: 0.7,
    marginBottom: 8,
  },
  cardTitle: {
    fontSize: 22,
    fontWeight: '800',
    color: colors.text,
    marginBottom: 8,
  },
  cardBody: {
    fontSize: 15,
    lineHeight: 22,
    color: colors.textSoft,
  },
  wordList: {
    marginTop: 16,
    gap: 12,
  },
  wordRow: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    gap: 12,
  },
  wordIndex: {
    width: 24,
    height: 24,
    borderRadius: 12,
    textAlign: 'center',
    textAlignVertical: 'center',
    backgroundColor: colors.primarySoft,
    color: colors.primary,
    fontSize: 13,
    fontWeight: '800',
    overflow: 'hidden',
    paddingTop: 3,
  },
  wordText: {
    fontSize: 17,
    fontWeight: '700',
    color: colors.text,
    marginBottom: 2,
  },
  wordHint: {
    fontSize: 14,
    color: colors.textSoft,
  },
  cardActions: {
    marginTop: 18,
  },
  bottomActions: {
    gap: 12,
    marginBottom: 30,
  },
});
