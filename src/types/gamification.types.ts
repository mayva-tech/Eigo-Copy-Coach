// --- Gamification Types ----------------------------------------------

import type { MasteryLevel } from './track.types';

export const XP_TABLE = {
  wordAttempt: 5,
  wordPass: 15,
  wordPerfect: 30,
  sessionComplete: 25,
  sessionPerfect: 50,
  streakDay: 10,
  masteryUp: 20,
} as const;

export const LEVEL_THRESHOLDS = [
  0, 100, 250, 500, 850, 1300, 1900, 2600, 3500, 4600, 6000, 7800, 10000, 13000, 17000,
] as const;

export type AchievementId =
  | 'streak_3' | 'streak_7' | 'streak_14' | 'streak_30' | 'streak_60' | 'streak_100'
  | 'words_10' | 'words_25' | 'words_50' | 'words_100' | 'words_200'
  | 'sessions_10' | 'sessions_50' | 'sessions_100'
  | 'first_perfect' | 'perfect_5' | 'perfect_session'
  | 'first_mastered' | 'mastered_10' | 'mastered_25'
  | 'first_session' | 'first_pass';

export interface AchievementDef {
  id: AchievementId;
  titleKey: string;
  descKey: string;
  icon: string;
  xpReward: number;
  category: 'streak' | 'mastery' | 'session' | 'score' | 'milestone';
}

export const ACHIEVEMENTS: AchievementDef[] = [
  { id: 'first_session', titleKey: 'ach.first_session', descKey: 'ach.first_session.desc', icon: '??', xpReward: 50, category: 'milestone' },
  { id: 'first_pass', titleKey: 'ach.first_pass', descKey: 'ach.first_pass.desc', icon: '??', xpReward: 30, category: 'milestone' },
  { id: 'streak_3', titleKey: 'ach.streak_3', descKey: 'ach.streak_3.desc', icon: '??', xpReward: 50, category: 'streak' },
  { id: 'streak_7', titleKey: 'ach.streak_7', descKey: 'ach.streak_7.desc', icon: '??', xpReward: 100, category: 'streak' },
  { id: 'streak_14', titleKey: 'ach.streak_14', descKey: 'ach.streak_14.desc', icon: '??', xpReward: 150, category: 'streak' },
  { id: 'streak_30', titleKey: 'ach.streak_30', descKey: 'ach.streak_30.desc', icon: '??', xpReward: 300, category: 'streak' },
  { id: 'streak_60', titleKey: 'ach.streak_60', descKey: 'ach.streak_60.desc', icon: '??', xpReward: 500, category: 'streak' },
  { id: 'streak_100', titleKey: 'ach.streak_100', descKey: 'ach.streak_100.desc', icon: '??', xpReward: 1000, category: 'streak' },
  { id: 'words_10', titleKey: 'ach.words_10', descKey: 'ach.words_10.desc', icon: '??', xpReward: 50, category: 'mastery' },
  { id: 'words_25', titleKey: 'ach.words_25', descKey: 'ach.words_25.desc', icon: '??', xpReward: 100, category: 'mastery' },
  { id: 'words_50', titleKey: 'ach.words_50', descKey: 'ach.words_50.desc', icon: '??', xpReward: 200, category: 'mastery' },
  { id: 'words_100', titleKey: 'ach.words_100', descKey: 'ach.words_100.desc', icon: '??', xpReward: 400, category: 'mastery' },
  { id: 'words_200', titleKey: 'ach.words_200', descKey: 'ach.words_200.desc', icon: '??', xpReward: 800, category: 'mastery' },
  { id: 'sessions_10', titleKey: 'ach.sessions_10', descKey: 'ach.sessions_10.desc', icon: '???', xpReward: 75, category: 'session' },
  { id: 'sessions_50', titleKey: 'ach.sessions_50', descKey: 'ach.sessions_50.desc', icon: '???', xpReward: 200, category: 'session' },
  { id: 'sessions_100', titleKey: 'ach.sessions_100', descKey: 'ach.sessions_100.desc', icon: '???', xpReward: 500, category: 'session' },
  { id: 'first_perfect', titleKey: 'ach.first_perfect', descKey: 'ach.first_perfect.desc', icon: '??', xpReward: 75, category: 'score' },
  { id: 'perfect_5', titleKey: 'ach.perfect_5', descKey: 'ach.perfect_5.desc', icon: '??', xpReward: 200, category: 'score' },
  { id: 'perfect_session', titleKey: 'ach.perfect_session', descKey: 'ach.perfect_session.desc', icon: '?', xpReward: 300, category: 'score' },
  { id: 'first_mastered', titleKey: 'ach.first_mastered', descKey: 'ach.first_mastered.desc', icon: '?', xpReward: 100, category: 'mastery' },
  { id: 'mastered_10', titleKey: 'ach.mastered_10', descKey: 'ach.mastered_10.desc', icon: '?', xpReward: 300, category: 'mastery' },
  { id: 'mastered_25', titleKey: 'ach.mastered_25', descKey: 'ach.mastered_25.desc', icon: '??', xpReward: 600, category: 'mastery' },
];

export interface WordProgress {
  masteryLevel: MasteryLevel;
  totalAttempts: number;
  bestScore: number;
  lastPracticedAt: string;
  consecutivePasses: number;
  perfectCount: number;
}

export interface DayRecord {
  date: string;
  sessionsCompleted: number;
  wordsAttempted: number;
  wordsPassed: number;
  averageScore: number;
  xpEarned: number;
}

export function levelFromXp(totalXp: number): number {
  let level = 1;
  for (let i = 1; i < LEVEL_THRESHOLDS.length; i++) {
    if (totalXp >= LEVEL_THRESHOLDS[i]) level = i + 1;
    else break;
  }
  return level;
}

export function xpToNextLevel(totalXp: number): { currentLevel: number; xpIntoLevel: number; xpNeeded: number; progress: number } {
  const level = levelFromXp(totalXp);
  const currentThreshold = LEVEL_THRESHOLDS[level - 1] ?? 0;
  const nextThreshold = LEVEL_THRESHOLDS[level] ?? LEVEL_THRESHOLDS[LEVEL_THRESHOLDS.length - 1];
  const xpIntoLevel = totalXp - currentThreshold;
  const xpNeeded = nextThreshold - currentThreshold;
  return {
    currentLevel: level,
    xpIntoLevel,
    xpNeeded,
    progress: xpNeeded > 0 ? Math.min(xpIntoLevel / xpNeeded, 1) : 1,
  };
}
