import { createAudioPlayer, type AudioPlayer } from 'expo-audio';
import { useLocalSearchParams, useRouter } from 'expo-router';
import { useCallback, useEffect, useRef } from 'react';
import { Alert, ScrollView, StyleSheet, Text, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

import AppButton from '@/src/components/common/AppButton';
import ScreenHeader from '@/src/components/common/ScreenHeader';
import AttemptScoreCard from '@/src/components/practice/AttemptScoreCard';
import MouthCoachCard from '@/src/components/practice/MouthCoachCard';
import RecordingPanel from '@/src/components/practice/RecordingPanel';
import WordHeroCard from '@/src/components/practice/WordHeroCard';
import WrongCorrectCard from '@/src/components/practice/WrongCorrectCard';
import { colors } from '@/src/constants/colors';
import { ROUTES } from '@/src/constants/routes';
import { useAudioPractice } from '@/src/features/practice/hooks/useAudioPractice';
import { usePracticeSession } from '@/src/features/practice/hooks/usePracticeSession';
import { playUri } from '@/src/services/audio/audioPlaybackService';
import { speakEnglishWord } from '@/src/services/audio/referenceSpeech';
import { getPremiumVoicePaywallTrigger } from '@/src/services/paywall/paywallTriggers';
import { getLessonAudio } from '@/src/services/tts/getLessonAudio';
import { usePlanStore } from '@/src/store/planStore';

/**
 * Practice reference audio — locked behavior (do not regress):
 * - **Play / Slow** = core practice reference only. Free → on-device TTS; premium → backend MP3.
 *   Never opens paywall. Recording, scoring, review queue, and next/prev word flows stay untouched.
 * - **Natural voice** = free-only preview CTA (`plan === 'free'`). Hidden for premium subscribers.
 * - **Paywall** = only when free preview quota is exhausted (`getPremiumVoicePaywallTrigger`), on Natural voice.
 * - **Fallback** = if backend/file playback fails or player is missing, always `speakEnglishWord` (learner still hears something).
 */
export default function PracticeScreen() {
  const router = useRouter();
  const params = useLocalSearchParams<{ lessonId?: string }>();
  const lessonId = params.lessonId ?? 'lesson-01';

  const plan = usePlanStore((state) => state.plan);
  const premiumHearCount = usePlanStore((state) => state.premiumHearCount);
  const incrementPremiumHearCount = usePlanStore((state) => state.incrementPremiumHearCount);
  const markPaywallSeen = usePlanStore((state) => state.markPaywallSeen);

  const referencePlayerRef = useRef<AudioPlayer | null>(null);

  useEffect(() => {
    const p = createAudioPlayer(null);
    p.volume = 1.0;
    p.muted = false;
    referencePlayerRef.current = p;
    return () => {
      referencePlayerRef.current?.remove();
    };
  }, []);

  const {
    currentWord,
    currentIndex,
    words,
    progressLabel,
    feedback,
    recordedUri,
    applyReferenceFeedback,
    registerAttemptResult,
    nextWord,
    previousWord,
  } = usePracticeSession(lessonId);

  const audio = useAudioPractice(recordedUri);

  /** Practice screen: only called when free Natural-voice previews are exhausted — not from Play/Slow. */
  const openPaywall = useCallback(
    (reason: string) => {
      markPaywallSeen();
      router.push({ pathname: '/paywall', params: { reason } });
    },
    [markPaywallSeen, router],
  );

  /**
   * Core practice reference (Play / Slow). No paywall on this path.
   * @returns Free core: true after device TTS. Premium/preview pipeline: true only if `file://` playback succeeded;
   *   false if missing player, fetch error, or `speakEnglishWord` fallback (preview quota increments only on true).
   */
  const handlePlayReferenceAudio = useCallback(
    async (mode: 'normal' | 'slow', usePremiumVoice: boolean): Promise<boolean> => {
      if (!currentWord) return false;

      applyReferenceFeedback(mode);

      if (!usePremiumVoice && plan === 'free') {
        void speakEnglishWord(currentWord.word, mode === 'slow' ? 'slow' : 'normal');
        return true;
      }

      try {
        const audioUri = await getLessonAudio({
          text: currentWord.word,
          usePremiumVoice,
          mode,
        });

        const player = referencePlayerRef.current;
        if (!player) {
          void speakEnglishWord(currentWord.word, mode === 'slow' ? 'slow' : 'normal');
          return false;
        }

        await playUri(player, audioUri);
        return true;
      } catch (error) {
        console.error('Failed to play reference audio', error);
        void speakEnglishWord(currentWord.word, mode === 'slow' ? 'slow' : 'normal');
        return false;
      }
    },
    [applyReferenceFeedback, currentWord, plan],
  );

  /** Free-only Natural voice: backend preview until quota exhausted, then paywall. Premium users never see this CTA. */
  const handlePremiumPreviewTap = useCallback(() => {
    if (plan !== 'free') return;

    const paywallCheck = getPremiumVoicePaywallTrigger({
      plan,
      premiumHearCount,
    });

    if (paywallCheck.shouldShow) {
      openPaywall(paywallCheck.reason ?? 'premium_voice_preview_limit');
      return;
    }

    void (async () => {
      const ok = await handlePlayReferenceAudio('normal', true);
      if (ok) {
        // Only increment after premium preview audio actually starts successfully.
        // Do not increment on fallback-to-device-TTS cases.
        incrementPremiumHearCount();
      }
    })();
  }, [
    handlePlayReferenceAudio,
    incrementPremiumHearCount,
    openPaywall,
    plan,
    premiumHearCount,
  ]);

  if (!currentWord) {
    return (
      <SafeAreaView style={styles.safeArea}>
        <View style={styles.emptyWrap}>
          <Text style={styles.emptyTitle}>レッスンが見つかりません</Text>
          <AppButton label="ホームへ戻る" onPress={() => router.replace(ROUTES.HOME)} />
        </View>
      </SafeAreaView>
    );
  }

  const isFirst = currentIndex === 0;
  const isLast = currentIndex === words.length - 1;

  const handleStartRecording = async () => {
    try {
      await audio.startRecording();
    } catch (error) {
      console.error(error);
      Alert.alert('マイクが必要です', '録音するにはマイクの許可が必要です。');
    }
  };

  const handleStopRecording = async () => {
    try {
      const uri = await audio.stopRecording();
      await registerAttemptResult(uri);
    } catch (error) {
      console.error(error);
      Alert.alert('録音エラー', '録音の停止に失敗しました。もう一度試してください。');
    }
  };

  return (
    <SafeAreaView style={styles.safeArea}>
      <ScrollView contentContainerStyle={styles.container} showsVerticalScrollIndicator={false}>
        <ScreenHeader
          eyebrow="Practice"
          title="1語ずつ、短く練習"
          subtitle={`Lesson: ${lessonId}  •  ${progressLabel}`}
        />

        <WordHeroCard
          word={currentWord.word}
          meaningJa={currentWord.meaningJa}
          sayItLike={currentWord.sayItLike}
          onPlay={() => void handlePlayReferenceAudio('normal', plan === 'premium')}
          onSlow={() => void handlePlayReferenceAudio('slow', plan === 'premium')}
          onPremiumVoice={plan === 'free' ? handlePremiumPreviewTap : undefined}
        />

        <WrongCorrectCard
          avoidGuide={currentWord.avoidGuide}
          sayItLike={currentWord.sayItLike}
        />

        <MouthCoachCard mouthTipJa={currentWord.mouthTipJa} />

        <RecordingPanel
          isRecording={audio.status.isRecording}
          hasRecording={audio.status.hasRecording}
          micGranted={audio.status.micGranted}
          onStart={handleStartRecording}
          onStop={handleStopRecording}
          onReplay={() => {
            void audio.playRecording();
          }}
        />

        <AttemptScoreCard
          tone={feedback.tone}
          title={feedback.title}
          body={feedback.body}
          score={feedback.score}
        />

        <View style={styles.navRow}>
          <AppButton
            label="前へ"
            variant="secondary"
            onPress={previousWord}
          />
          <AppButton
            label={isLast ? 'おわり' : '次へ'}
            onPress={isLast ? () => router.push(ROUTES.REVIEW) : nextWord}
          />
        </View>

        {!isFirst && (
          <View style={styles.backRow}>
            <Text style={styles.backText}>前の単語に戻っても大丈夫。</Text>
          </View>
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
  container: {
    paddingHorizontal: 20,
    paddingTop: 16,
    paddingBottom: 24,
    gap: 11,
  },
  navRow: {
    gap: 12,
  },
  backRow: {
    alignItems: 'center',
    marginTop: -4,
  },
  backText: {
    fontSize: 13,
    color: colors.textMuted,
  },
  emptyWrap: {
    flex: 1,
    paddingHorizontal: 20,
    paddingVertical: 16,
    alignItems: 'center',
    justifyContent: 'center',
    gap: 11,
    backgroundColor: colors.background,
  },
  emptyTitle: {
    fontSize: 22,
    fontWeight: '800',
    color: colors.text,
  },
});
