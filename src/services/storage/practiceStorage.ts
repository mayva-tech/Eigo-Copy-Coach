import AsyncStorage from '@react-native-async-storage/async-storage';

import type { ReviewItem } from '@/src/store/usePracticeStore';

export const REVIEW_QUEUE_STORAGE_KEY = 'practice_review_queue_v1';

export async function saveReviewQueue(items: ReviewItem[]): Promise<void> {
  try {
    await AsyncStorage.setItem(REVIEW_QUEUE_STORAGE_KEY, JSON.stringify(items));
  } catch (error) {
    console.error('saveReviewQueue error', error);
  }
}

export async function loadReviewQueue(): Promise<ReviewItem[]> {
  try {
    const raw = await AsyncStorage.getItem(REVIEW_QUEUE_STORAGE_KEY);
    if (!raw) {
      return [];
    }
    const parsed = JSON.parse(raw) as ReviewItem[];
    return Array.isArray(parsed) ? parsed : [];
  } catch (error) {
    console.error('loadReviewQueue error', error);
    return [];
  }
}

export async function clearStoredReviewQueue(): Promise<void> {
  try {
    await AsyncStorage.removeItem(REVIEW_QUEUE_STORAGE_KEY);
  } catch (error) {
    console.error('clearStoredReviewQueue error', error);
  }
}
