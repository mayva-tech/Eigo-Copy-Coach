import { Ionicons } from '@expo/vector-icons';
import { router } from 'expo-router';
import { Pressable, StyleSheet, Text, View } from 'react-native';

import FocusAreaRow from '@/src/components/ui/FocusAreaRow';
import LessonHeroCard from '@/src/components/ui/LessonHeroCard';
import ScreenContainer from '@/src/components/ui/ScreenContainer';
import SectionLabel from '@/src/components/ui/SectionLabel';
import StatCard from '@/src/components/ui/StatCard';
import { ROUTES } from '@/src/constants/routes';
import { FOCUS_AREAS } from '@/src/data/focusAreas';
import { homeScreenJa } from '@/src/data/homeTranslations';
import { getLessonTitle, getLessonTitleJa } from '@/src/services/content/lessonRepository';
import { theme } from '@/src/theme/pronunciationTheme';

const DEFAULT_LESSON_ID = 'lesson-01';

/** Placeholder stats until streak / analytics are wired. */
const MOCK_STREAK = '7';
const MOCK_CLARITY = '83%';
const MOCK_WORDS = '24';

export default function HomeScreen() {
  const lessonId = DEFAULT_LESSON_ID;
  const lessonTitle = getLessonTitle(lessonId);
  const lessonTitleJa = getLessonTitleJa(lessonId);

  return (
    <ScreenContainer>
      <View style={styles.topRow}>
        <View style={styles.topLeft}>
          <SectionLabel style={styles.noMb} subtitleJa={homeScreenJa.dailyPracticeEyebrow}>
            DAILY PRACTICE
          </SectionLabel>
          <Text style={styles.brand}>Eigo Copy Coach</Text>
          <Text style={styles.brandJa}>{homeScreenJa.brandSubtitle}</Text>
        </View>
        <Pressable
          style={({ pressed }) => [styles.profile, pressed && styles.profilePressed]}
          onPress={() => router.push(ROUTES.SETTINGS)}
          accessibilityRole="button"
          accessibilityLabel="Profile and settings"
        >
          <Ionicons name="person-outline" size={22} color={theme.colors.text} />
        </Pressable>
      </View>

      <View style={styles.statsRow}>
        <StatCard
          value={MOCK_STREAK}
          labelLine1="DAY"
          labelLine2="STREAK"
          captionJa={homeScreenJa.statStreakCaption}
        />
        <StatCard value={MOCK_CLARITY} labelLine1="CLARITY" captionJa={homeScreenJa.statClarityCaption} />
        <StatCard
          value={MOCK_WORDS}
          labelLine1="WORDS"
          labelLine2="DONE"
          captionJa={homeScreenJa.statWordsCaption}
        />
      </View>

      <LessonHeroCard
        lessonTitle={lessonTitle}
        lessonTitleJa={lessonTitleJa}
        nowPracticingJa={homeScreenJa.nowPracticingEyebrow}
        continuePracticeJa={homeScreenJa.continuePracticeJa}
        onContinue={() => router.push(`/practice/${lessonId}`)}
      />

      <SectionLabel subtitleJa={homeScreenJa.focusAreasEyebrow}>FOCUS AREAS</SectionLabel>
      <View style={styles.focusCard}>
        {FOCUS_AREAS.map((item, index) => (
          <FocusAreaRow
            key={item.id}
            badge={item.badge}
            title={item.title}
            titleJa={item.titleJa}
            examples={item.examples}
            examplesJa={item.examplesJa}
            showDivider={index > 0}
            onPress={() => router.push(ROUTES.PRACTICE)}
          />
        ))}
      </View>
    </ScreenContainer>
  );
}

const styles = StyleSheet.create({
  noMb: {
    marginBottom: 2,
  },
  topRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    marginBottom: theme.space.md,
  },
  topLeft: {
    flex: 1,
    paddingRight: theme.space.md,
  },
  brand: {
    fontFamily: theme.fontDisplay,
    fontSize: 30,
    color: theme.colors.text,
    letterSpacing: -0.5,
    marginTop: 2,
    flexShrink: 1,
  },
  brandJa: {
    marginTop: 4,
    fontSize: 14,
    fontWeight: '700',
    color: theme.colors.text,
  },
  profile: {
    width: 44,
    height: 44,
    borderRadius: 22,
    borderWidth: 1,
    borderColor: theme.colors.border,
    backgroundColor: theme.colors.surfaceElevated,
    alignItems: 'center',
    justifyContent: 'center',
  },
  profilePressed: {
    opacity: 0.75,
  },
  statsRow: {
    flexDirection: 'row',
    gap: theme.space.xs,
    marginBottom: theme.space.md,
  },
  focusCard: {
    backgroundColor: theme.colors.surfaceElevated,
    borderRadius: theme.radius.xl,
    borderWidth: 1,
    borderColor: theme.colors.borderSubtle,
    paddingHorizontal: theme.space.sm,
    marginBottom: theme.space.sm,
  },
});
