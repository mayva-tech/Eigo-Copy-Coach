import { useMemo } from 'react';

import { TRACKS } from '@/src/data/tracks';
import { useProgressStore } from '@/src/store/useProgressStore';
import { FREE_LIMITS, useSubscriptionStore } from '@/src/store/useSubscriptionStore';
import { useTrackStore } from '@/src/store/useTrackStore';
import type { TrackId, WordEntry } from '@/src/types/track.types';

export interface GateResult {
  allowed: boolean;
  reason?: 'daily_limit' | 'word_limit' | 'track_locked' | 'pro_feature';
  messageKey?: string;
  context?: {
    used?: number;
    limit?: number;
    wordsAvailable?: number;
    wordsTotal?: number;
  };
}

export function useGatekeeper() {
  const isPro = useSubscriptionStore((s) => s.isPro());
  const todaySessionCount = useProgressStore((s) => s.getTodaySessionCount());
  const activeTrackId = useTrackStore((s) => s.activeTrackId);

  return useMemo(() => {
    function canStartSession(): GateResult {
      if (isPro) return { allowed: true };
      if (todaySessionCount >= FREE_LIMITS.maxDailySessions) {
        return {
          allowed: false,
          reason: 'daily_limit',
          messageKey: 'gate.daily_limit',
          context: { used: todaySessionCount, limit: FREE_LIMITS.maxDailySessions },
        };
      }
      return { allowed: true };
    }

    function canAccessTrack(trackId: TrackId): GateResult {
      if (isPro) return { allowed: true };
      if (trackId !== activeTrackId) {
        return { allowed: false, reason: 'track_locked', messageKey: 'gate.track_locked' };
      }
      return { allowed: true };
    }

    function filterWords(words: WordEntry[], trackId: TrackId): WordEntry[] {
      if (isPro) return words;
      const config = TRACKS[trackId];
      const limit = config?.freeWordLimit ?? FREE_LIMITS.maxWordsPerTrack;
      return words.slice(0, limit);
    }

    function checkWordLimit(trackId: TrackId, totalWords: number): GateResult {
      if (isPro) return { allowed: true };
      const config = TRACKS[trackId];
      const limit = config?.freeWordLimit ?? FREE_LIMITS.maxWordsPerTrack;
      if (totalWords <= limit) return { allowed: true };
      return {
        allowed: false,
        reason: 'word_limit',
        messageKey: 'gate.word_limit',
        context: { wordsAvailable: limit, wordsTotal: totalWords },
      };
    }

    function canAccessDetailedReview(): GateResult {
      if (isPro) return { allowed: true };
      return { allowed: false, reason: 'pro_feature', messageKey: 'gate.pro_review' };
    }

    function canUseSrsSelection(): GateResult {
      if (isPro) return { allowed: true };
      return { allowed: false, reason: 'pro_feature', messageKey: 'gate.pro_srs' };
    }

    function remainingSessions(): number {
      if (isPro) return Infinity;
      return Math.max(0, FREE_LIMITS.maxDailySessions - todaySessionCount);
    }

    return {
      isPro,
      canStartSession,
      canAccessTrack,
      filterWords,
      checkWordLimit,
      canAccessDetailedReview,
      canUseSrsSelection,
      remainingSessions,
    };
  }, [activeTrackId, isPro, todaySessionCount]);
}
