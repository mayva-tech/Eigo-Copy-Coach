import { useLocalSearchParams, useRouter } from 'expo-router';
import { useMemo } from 'react';
import { ScrollView, StyleSheet, Text, View } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

import CoachNoteCard from '@/src/components/review/CoachNoteCard';
import ResultRow, { type ResultStatus } from '@/src/components/review/ResultRow';
import ScoreGauge from '@/src/components/review/ScoreGauge';
import PrimaryButton from '@/src/components/ui/PrimaryButton';
import SecondaryButton from '@/src/components/ui/SecondaryButton';
import { ROUTES } from '@/src/constants/routes';
import { getLessonTitle, getLessonWords } from '@/src/services/content/lessonRepository';
import { useSessionSummaryStore } from '@/src/store/sessionSummaryStore';
import { theme, typography } from '@/src/theme/pronunciationTheme';

function scoreToStatus(score: number): ResultStatus {
  if (score >= 88) return 'clear';
  if (score >= 70) return 'retry';
  return 'practice_more';
}

function buildCoachNote(weakWords: string[]): string {
  if (weakWords.length === 0) {
    return 'Nice work today. Keep listening closely and matching the shape of each word.';
  }
  const sample = weakWords.slice(0, 2).map((w) => `"${w}"`).join(' and ');
  return `Your overall clarity is improving. Spend a little extra time on ${sample} — same time tomorrow, short sessions work best.`;
}

const BTN_RADIUS = 20;
const BTN_MIN_H = 52;

export default function SessionCompleteScreen() {
  const router = useRouter();
  const insets = useSafeAreaInsets();
  const params = useLocalSearchParams<{ lessonId?: string }>();
  const lessonId = params.lessonId ?? 'lesson-01';

  const entries = useSessionSummaryStore((s) => s.entries);

  const lessonTitle = getLessonTitle(lessonId);
  const words = getLessonWords(lessonId);

  const byId = useMemo(
    () => Object.fromEntries(entries.map((e) => [e.wordId, e.score])),
    [entries],
  );

  const rows = useMemo(() => {
    return words.map((w) => {
      const s = byId[w.id];
      const status: ResultStatus = s === undefined ? 'clear' : scoreToStatus(s);
      return { word: w.word, status, score: s };
    });
  }, [words, byId]);

  const clarity = useMemo(() => {
    const nums = entries.map((e) => e.score);
    if (!nums.length) return 72;
    return Math.round(nums.reduce((a, b) => a + b, 0) / nums.length);
  }, [entries]);

  const coachNote = useMemo(() => {
    const weak = rows.filter((r) => r.status === 'practice_more').map((r) => r.word);
    return buildCoachNote(weak);
  }, [rows]);

  const goHome = () => {
    useSessionSummaryStore.getState().clearSession();
    router.replace(ROUTES.HOME);
  };

  const practiceWeak = () => {
    useSessionSummaryStore.getState().clearSession();
    router.replace(`/practice/${lessonId}`);
  };

  const btnShared = {
    minHeight: BTN_MIN_H,
    borderRadius: BTN_RADIUS,
  };

  return (
    <View style={[styles.safe, { paddingTop: insets.top }]}>
      <ScrollView
        style={styles.scroll}
        contentContainerStyle={[
          styles.scrollInner,
          { paddingBottom: Math.max(insets.bottom, 12) + 20 },
        ]}
        showsVerticalScrollIndicator={false}
      >
        <Text style={styles.eyebrow}>SESSION COMPLETE</Text>
        <Text style={styles.title}>{lessonTitle}</Text>
        <Text style={styles.sub}>
          About 5 min · {words.length} {words.length === 1 ? 'word' : 'words'}
        </Text>

        <ScoreGauge score={clarity} />

        <Text style={styles.sectionWord}>WORD BY WORD</Text>
        <View style={styles.list}>
          {rows.map((r) => (
            <ResultRow key={r.word} word={r.word} status={r.status} />
          ))}
        </View>

        <View style={styles.coachWrap}>
          <CoachNoteCard note={coachNote} />
        </View>

        <View style={styles.actions}>
          <View style={styles.actionHalf}>
            <SecondaryButton
              label="Home"
              onPress={goHome}
              style={btnShared}
            />
          </View>
          <View style={styles.actionHalf}>
            <PrimaryButton
              label="Practice weak words"
              onPress={practiceWeak}
              style={btnShared}
            />
          </View>
        </View>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  safe: {
    flex: 1,
    backgroundColor: theme.colors.background,
  },
  scroll: {
    flex: 1,
  },
  scrollInner: {
    paddingHorizontal: 22,
    /** Extra space below status bar so SESSION COMPLETE isn’t tight to the top. */
    paddingTop: theme.space.xl,
  },
  eyebrow: {
    fontSize: 10,
    fontWeight: '700',
    letterSpacing: 2.4,
    color: theme.colors.textMuted,
    textTransform: 'uppercase',
    marginBottom: theme.space.sm,
  },
  title: {
    fontFamily: theme.fontDisplay,
    fontSize: 30,
    lineHeight: 36,
    color: theme.colors.text,
    marginBottom: theme.space.sm,
    letterSpacing: -0.3,
  },
  sub: {
    ...typography.body,
    fontSize: 15,
    lineHeight: 22,
    color: theme.colors.textMuted,
    marginBottom: theme.space.lg,
  },
  sectionWord: {
    fontSize: 10,
    fontWeight: '700',
    letterSpacing: 2.4,
    color: theme.colors.textMuted,
    textTransform: 'uppercase',
    marginTop: theme.space.xs,
    marginBottom: theme.space.md,
  },
  list: {
    gap: 12,
    marginBottom: theme.space.xl,
  },
  coachWrap: {
    marginBottom: theme.space.xl,
  },
  actions: {
    flexDirection: 'row',
    gap: 12,
    alignItems: 'stretch',
    marginTop: theme.space.sm,
  },
  actionHalf: {
    flex: 1,
    minWidth: 0,
  },
});
