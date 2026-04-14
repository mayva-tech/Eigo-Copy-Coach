import AsyncStorage from '@react-native-async-storage/async-storage';
import { create } from 'zustand';
import { createJSONStorage, persist } from 'zustand/middleware';

import { DEFAULT_TRACK_ID, TRACKS } from '@/src/data/tracks';
import type { TrackConfig, TrackId, WordEntry } from '@/src/types/track.types';

// ─── Types ───────────────────────────────────────────────────────────

interface TrackState {
  activeTrackId: TrackId;
  /** In-memory cache. NOT persisted — reloads lazily each session. */
  wordCache: Partial<Record<TrackId, WordEntry[]>>;
  isLoading: boolean;
  error: string | null;
}

interface TrackActions {
  setActiveTrack: (id: TrackId) => void;
  /**
   * Load words for the given track (or active track).
   * Returns cached data if already loaded this session.
   */
  loadTrackWords: (id?: TrackId) => Promise<WordEntry[]>;
  /** Convenience: get the TrackConfig for the active track. */
  getActiveTrackConfig: () => TrackConfig | undefined;
  /** Clear word cache (e.g. after data update). */
  clearWordCache: () => void;
}

// ─── Store ───────────────────────────────────────────────────────────

export const useTrackStore = create<TrackState & TrackActions>()(
  persist(
    (set, get) => ({
      // ── State ────────────────────────────────────────────────
      activeTrackId: DEFAULT_TRACK_ID,
      wordCache: {},
      isLoading: false,
      error: null,

      // ── Actions ──────────────────────────────────────────────

      setActiveTrack: (id) => {
        if (!TRACKS[id]) {
          console.warn(`[useTrackStore] Unknown track id: ${id}`);
          return;
        }
        set({ activeTrackId: id, error: null });
      },

      loadTrackWords: async (id) => {
        const trackId = id ?? get().activeTrackId;
        const config = TRACKS[trackId];

        if (!config) {
          throw new Error(`[useTrackStore] Unknown track: ${trackId}`);
        }

        // Return cached if available
        const cached = get().wordCache[trackId];
        if (cached) return cached;

        set({ isLoading: true, error: null });

        try {
          const words = await config.loadWords();

          set((state) => ({
            isLoading: false,
            wordCache: { ...state.wordCache, [trackId]: words },
          }));

          return words;
        } catch (e) {
          const msg = e instanceof Error ? e.message : 'Failed to load words';
          set({ isLoading: false, error: msg });
          throw e;
        }
      },

      getActiveTrackConfig: () => {
        return TRACKS[get().activeTrackId];
      },

      clearWordCache: () => {
        set({ wordCache: {} });
      },
    }),
    {
      name: 'eigo-track-store',
      storage: createJSONStorage(() => AsyncStorage),
      // Only persist the selected track — NOT the word cache
      partialize: (state) => ({
        activeTrackId: state.activeTrackId,
      }),
    },
  ),
);
