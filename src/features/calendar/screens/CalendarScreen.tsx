import { Ionicons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';
import { useCallback, useMemo, useState } from 'react';
import {
  FlatList,
  Modal,
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  View,
} from 'react-native';

import ScreenContainer from '@/src/components/ui/ScreenContainer';
import SectionLabel from '@/src/components/ui/SectionLabel';
import { ROUTES } from '@/src/constants/routes';
import { TOEIC_WORDS } from '@/src/data/toeicWords';
import type { UiKey } from '@/src/lib/i18n/uiCatalog';
import { tUi } from '@/src/lib/i18n/resolveUi';
import { useI18n } from '@/src/lib/i18n/useI18n';
import { useToeicWordStatsStore } from '@/src/store/useToeicWordStatsStore';
import { theme } from '@/src/theme/pronunciationTheme';
import {
  aggregateActivityByDay,
  dayKeyLocal,
  daysInMonth,
  rollingSevenDayActivityTotal,
  streakConsecutiveDaysLenient,
  wordsWithActivityOnDay,
} from '@/src/utils/activityCalendar';

const WEEKDAYS_EN = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'] as const;
const WEEKDAYS_JA = ['日', '月', '火', '水', '木', '金', '土'] as const;

const TOEIC_WORD_BY_ID = (() => {
  const m = new Map<number, string>();
  for (const w of TOEIC_WORDS) m.set(w.id, w.word);
  return m;
})();

function formatDayKeyShort(dk: string, isJa: boolean): string {
  const parts = dk.split('-').map(Number);
  if (parts.length !== 3 || parts.some((n) => Number.isNaN(n))) return dk;
  const [y, mo, d] = parts;
  return new Date(y, mo - 1, d).toLocaleDateString(isJa ? 'ja-JP' : 'en-US', {
    month: 'short',
    day: 'numeric',
  });
}

export default function CalendarScreen() {
  const router = useRouter();
  const { supportLanguage } = useI18n();
  const t = (key: UiKey) => tUi(supportLanguage, key);
  const isJa = supportLanguage === 'ja';

  const byId = useToeicWordStatsStore((s) => s.byId);
  const countsByDay = useMemo(() => aggregateActivityByDay(byId), [byId]);
  const streak = useMemo(() => streakConsecutiveDaysLenient(countsByDay), [countsByDay]);
  const weekTotal = useMemo(() => rollingSevenDayActivityTotal(countsByDay), [countsByDay]);

  const now = new Date();
  const [viewYear, setViewYear] = useState(now.getFullYear());
  const [viewMonth, setViewMonth] = useState(now.getMonth());
  const [detailDayKey, setDetailDayKey] = useState<string | null>(null);

  const wordsForDetailDay = useMemo(() => {
    if (detailDayKey == null) return [];
    return wordsWithActivityOnDay(byId, detailDayKey, (id) => TOEIC_WORD_BY_ID.get(id));
  }, [byId, detailDayKey]);

  const detailDayFormatted = useMemo(() => {
    if (detailDayKey == null) return '';
    const parts = detailDayKey.split('-').map(Number);
    if (parts.length !== 3 || parts.some((n) => Number.isNaN(n))) return detailDayKey;
    const [y, mo, d] = parts;
    const date = new Date(y, mo - 1, d);
    const loc = isJa ? 'ja-JP' : 'en-US';
    return date.toLocaleDateString(loc, { weekday: 'long', month: 'long', day: 'numeric', year: 'numeric' });
  }, [detailDayKey, isJa]);

  const closeDayDetail = useCallback(() => setDetailDayKey(null), []);

  const openToeicWord = useCallback(
    (toeicId: number) => {
      closeDayDetail();
      router.push({
        pathname: ROUTES.TOEIC,
        params: { wordId: String(toeicId) },
      });
    },
    [closeDayDetail, router],
  );

  const grid = useMemo(() => {
    const firstDow = new Date(viewYear, viewMonth, 1).getDay();
    const dim = daysInMonth(viewYear, viewMonth);
    const cells: ({ type: 'blank' } | { type: 'day'; day: number })[] = [];
    for (let i = 0; i < firstDow; i++) cells.push({ type: 'blank' });
    for (let d = 1; d <= dim; d++) cells.push({ type: 'day', day: d });
    while (cells.length % 7 !== 0) cells.push({ type: 'blank' });
    return cells;
  }, [viewYear, viewMonth]);

  const todayKey = dayKeyLocal(new Date());

  const monthTitle = useMemo(() => {
    const d = new Date(viewYear, viewMonth, 1);
    const loc = isJa ? 'ja-JP' : 'en-US';
    return d.toLocaleString(loc, { month: 'long', year: 'numeric' });
  }, [viewYear, viewMonth, isJa]);

  const weekdays = isJa ? WEEKDAYS_JA : WEEKDAYS_EN;

  const goPrev = () => {
    if (viewMonth === 0) {
      setViewMonth(11);
      setViewYear((y) => y - 1);
    } else {
      setViewMonth((m) => m - 1);
    }
  };

  const goNext = () => {
    if (viewMonth === 11) {
      setViewMonth(0);
      setViewYear((y) => y + 1);
    } else {
      setViewMonth((m) => m + 1);
    }
  };

  return (
    <ScreenContainer contentStyle={styles.screen}>
      <ScrollView contentContainerStyle={styles.scroll} showsVerticalScrollIndicator={false}>
        <SectionLabel subtitleJa={t('calendar.eyebrowSub')}>{t('calendar.eyebrow')}</SectionLabel>
        <Text style={styles.title}>{t('calendar.title')}</Text>
        <Text style={styles.subtitle}>{t('calendar.subtitle')}</Text>

        <View style={styles.statsRow}>
          <View style={styles.statPill}>
            <Text style={styles.statValue}>{streak}</Text>
            <Text style={[styles.statLabel, isJa && styles.statLabelNoUpper]}>{t('calendar.statStreak')}</Text>
            {isJa ? null : <Text style={styles.statLabelJa}>{t('calendar.statStreakSub')}</Text>}
          </View>
          <View style={styles.statPill}>
            <Text style={styles.statValue}>{weekTotal}</Text>
            <Text style={[styles.statLabel, isJa && styles.statLabelNoUpper]}>{t('calendar.statWeek')}</Text>
            {isJa ? null : <Text style={styles.statLabelJa}>{t('calendar.statWeekSub')}</Text>}
          </View>
        </View>

        <View style={styles.monthNav}>
          <Pressable
            onPress={goPrev}
            style={({ pressed }) => [styles.monthArrow, pressed && styles.pressed]}
            accessibilityRole="button"
            accessibilityLabel={t('calendar.a11yPrevMonth')}
          >
            <Ionicons name="chevron-back" size={22} color={theme.colors.text} />
          </Pressable>
          <Text style={styles.monthTitle}>{monthTitle}</Text>
          <Pressable
            onPress={goNext}
            style={({ pressed }) => [styles.monthArrow, pressed && styles.pressed]}
            accessibilityRole="button"
            accessibilityLabel={t('calendar.a11yNextMonth')}
          >
            <Ionicons name="chevron-forward" size={22} color={theme.colors.text} />
          </Pressable>
        </View>

        <View style={styles.weekdayRow}>
          {weekdays.map((w) => (
            <Text key={w} style={styles.weekday}>
              {w}
            </Text>
          ))}
        </View>

        <View style={styles.grid}>
          {grid.map((cell, i) => {
            if (cell.type === 'blank') {
              return <View key={`b-${i}`} style={styles.cell} />;
            }
            const { day } = cell;
            const dk = dayKeyLocal(new Date(viewYear, viewMonth, day));
            const n = countsByDay[dk] ?? 0;
            const isToday = dk === todayKey;
            const active = n > 0;
            const inner = (
              <>
                <Text style={[styles.dayNum, active && styles.dayNumActive]}>{day}</Text>
                {active ? <Text style={styles.dotCount}>{n > 99 ? '99+' : n}</Text> : null}
              </>
            );
            return active ? (
              <Pressable
                key={`d-${dk}`}
                onPress={() => setDetailDayKey(dk)}
                style={({ pressed }) => [
                  styles.cell,
                  isToday && styles.cellToday,
                  styles.cellActive,
                  pressed && styles.cellPressed,
                ]}
                accessibilityRole="button"
                accessibilityLabel={t('calendar.a11yDayCell')
                  .replace('{date}', formatDayKeyShort(dk, isJa))
                  .replace('{n}', String(n))}
              >
                {inner}
              </Pressable>
            ) : (
              <View
                key={`d-${dk}`}
                style={[styles.cell, isToday && styles.cellToday]}
              >
                {inner}
              </View>
            );
          })}
        </View>

        <Text style={styles.legend}>
          {t('calendar.legend')}
          {' '}
          {t('calendar.legendTap')}
        </Text>
      </ScrollView>

      <Modal
        visible={detailDayKey != null}
        animationType="fade"
        transparent
        onRequestClose={closeDayDetail}
      >
        <View style={styles.modalBackdrop}>
          <Pressable style={StyleSheet.absoluteFill} onPress={closeDayDetail} accessibilityRole="button" />
          <View style={styles.modalCard}>
            <View style={styles.modalHeader}>
              <View style={styles.modalHeaderText}>
                <Text style={styles.modalDateLine}>{detailDayFormatted}</Text>
                <Text style={styles.modalTitle}>{t('calendar.wordsOnDayTitle')}</Text>
              </View>
              <Pressable
                onPress={closeDayDetail}
                style={({ pressed }) => [styles.modalCloseHit, pressed && styles.pressed]}
                accessibilityRole="button"
                accessibilityLabel={t('calendar.modalClose')}
              >
                <Ionicons name="close" size={26} color={theme.colors.textSecondary} />
              </Pressable>
            </View>
            {wordsForDetailDay.length === 0 ? (
              <Text style={styles.modalEmpty}>{t('calendar.dayDetailEmpty')}</Text>
            ) : (
              <FlatList
                data={wordsForDetailDay}
                keyExtractor={(item) => `w-${item.toeicId}`}
                style={styles.modalList}
                renderItem={({ item }) => (
                  <Pressable
                    onPress={() => openToeicWord(item.toeicId)}
                    style={({ pressed }) => [styles.wordRow, pressed && styles.wordRowPressed]}
                    accessibilityRole="button"
                    accessibilityLabel={t('calendar.a11yOpenWord').replace('{word}', item.word)}
                  >
                    <Text style={styles.wordRowWord} numberOfLines={2}>
                      {item.word}
                    </Text>
                    <View style={styles.wordRowRight}>
                      <Text style={styles.wordRowCount}>
                        {t('calendar.wordRowEvents').replace('{n}', String(item.count))}
                      </Text>
                      <Ionicons name="chevron-forward" size={18} color={theme.colors.textMuted} />
                    </View>
                  </Pressable>
                )}
              />
            )}
            <Pressable
              onPress={closeDayDetail}
              style={({ pressed }) => [styles.modalDismissBtn, pressed && styles.pressed]}
            >
              <Text style={styles.modalDismissText}>{t('calendar.modalClose')}</Text>
            </Pressable>
          </View>
        </View>
      </Modal>
    </ScreenContainer>
  );
}

const styles = StyleSheet.create({
  screen: {
    paddingTop: theme.space.sm,
  },
  scroll: {
    paddingBottom: theme.space.xl,
    gap: theme.space.sm,
  },
  title: {
    fontFamily: theme.fontDisplay,
    fontSize: 26,
    color: theme.colors.text,
    marginBottom: 2,
  },
  subtitle: {
    fontSize: 13,
    color: theme.colors.textMuted,
    marginBottom: theme.space.xs,
  },
  statsRow: {
    flexDirection: 'row',
    gap: theme.space.sm,
    marginTop: theme.space.xs,
  },
  statPill: {
    flex: 1,
    borderRadius: theme.radius.md,
    borderWidth: 1,
    borderColor: theme.colors.borderSubtle,
    backgroundColor: theme.colors.surfaceElevated,
    paddingVertical: theme.space.sm,
    paddingHorizontal: theme.space.sm,
    alignItems: 'center',
    gap: 2,
  },
  statValue: {
    fontFamily: theme.fontDisplay,
    fontSize: 28,
    color: theme.colors.text,
  },
  statLabel: {
    fontSize: 11,
    fontWeight: '700',
    color: theme.colors.textSecondary,
    textTransform: 'uppercase',
    letterSpacing: 0.6,
  },
  statLabelNoUpper: {
    textTransform: 'none',
    letterSpacing: 0.2,
  },
  statLabelJa: {
    fontSize: 10,
    color: theme.colors.textMuted,
  },
  monthNav: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginTop: theme.space.md,
  },
  monthArrow: {
    padding: 8,
    marginHorizontal: -4,
  },
  monthTitle: {
    fontFamily: theme.fontDisplay,
    fontSize: 18,
    color: theme.colors.text,
  },
  pressed: {
    opacity: 0.65,
  },
  weekdayRow: {
    flexDirection: 'row',
    marginTop: theme.space.xs,
  },
  weekday: {
    flex: 1,
    textAlign: 'center',
    fontSize: 10,
    fontWeight: '700',
    color: theme.colors.textMuted,
    letterSpacing: 0.5,
  },
  grid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    width: '100%',
    marginTop: 4,
  },
  cell: {
    width: '14.28%',
    aspectRatio: 1,
    maxHeight: 52,
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 4,
  },
  cellToday: {
    borderWidth: 1,
    borderColor: theme.colors.accentGold,
    borderRadius: theme.radius.sm,
  },
  cellActive: {
    backgroundColor: theme.colors.successSoft,
  },
  cellPressed: {
    opacity: 0.88,
  },
  dayNum: {
    fontSize: 14,
    fontWeight: '600',
    color: theme.colors.textSecondary,
  },
  dayNumActive: {
    color: theme.colors.successOlive,
  },
  dotCount: {
    fontSize: 9,
    fontWeight: '700',
    color: theme.colors.successOlive,
    marginTop: 1,
  },
  legend: {
    fontSize: 12,
    lineHeight: 17,
    color: theme.colors.textMuted,
    marginTop: theme.space.sm,
  },
  modalBackdrop: {
    flex: 1,
    backgroundColor: 'rgba(60, 54, 42, 0.45)',
    justifyContent: 'center',
    paddingHorizontal: theme.space.md,
  },
  modalCard: {
    maxHeight: '78%',
    borderRadius: theme.radius.lg,
    backgroundColor: theme.colors.surfaceElevated,
    borderWidth: 1,
    borderColor: theme.colors.borderSubtle,
    paddingBottom: theme.space.sm,
  },
  modalHeader: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    justifyContent: 'space-between',
    paddingHorizontal: theme.space.md,
    paddingTop: theme.space.md,
    paddingBottom: theme.space.xs,
    gap: theme.space.sm,
  },
  modalHeaderText: {
    flex: 1,
    minWidth: 0,
    gap: 4,
  },
  modalDateLine: {
    fontSize: 13,
    fontWeight: '600',
    color: theme.colors.textMuted,
  },
  modalTitle: {
    fontFamily: theme.fontDisplay,
    fontSize: 20,
    color: theme.colors.text,
  },
  modalCloseHit: {
    padding: 4,
    marginTop: -4,
    marginRight: -4,
  },
  modalList: {
    maxHeight: 320,
    paddingHorizontal: theme.space.md,
  },
  modalEmpty: {
    fontSize: 14,
    color: theme.colors.textMuted,
    paddingHorizontal: theme.space.md,
    paddingVertical: theme.space.md,
  },
  wordRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    gap: theme.space.sm,
    paddingVertical: 10,
    paddingHorizontal: 2,
    borderBottomWidth: StyleSheet.hairlineWidth,
    borderBottomColor: theme.colors.borderSubtle,
  },
  wordRowPressed: {
    opacity: 0.82,
    backgroundColor: theme.colors.surfaceSoft,
    marginHorizontal: -2,
    paddingHorizontal: 4,
    borderRadius: theme.radius.sm,
  },
  wordRowRight: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
    flexShrink: 0,
  },
  wordRowWord: {
    flex: 1,
    fontSize: 15,
    fontWeight: '600',
    color: theme.colors.text,
  },
  wordRowCount: {
    fontSize: 12,
    fontWeight: '700',
    color: theme.colors.successOlive,
    flexShrink: 0,
  },
  modalDismissBtn: {
    marginTop: theme.space.sm,
    marginHorizontal: theme.space.md,
    paddingVertical: 12,
    alignItems: 'center',
    borderRadius: theme.radius.md,
    backgroundColor: theme.colors.surfaceSoft,
    borderWidth: 1,
    borderColor: theme.colors.border,
  },
  modalDismissText: {
    fontSize: 15,
    fontWeight: '700',
    color: theme.colors.text,
  },
});
