import { createAudioPlayer, type AudioPlayer } from 'expo-audio';
import { useLocalSearchParams, useRouter } from 'expo-router';
import { useCallback, useEffect, useRef } from 'react';
import { Alert, Animated, Pressable, StyleSheet, Text, View } from 'react-native';

import FeedbackCard from '@/src/components/ui/FeedbackCard';
import PracticeActions from '@/src/components/ui/PracticeActions';
import PrimaryButton from '@/src/components/ui/PrimaryButton';
import ProgressHeader from '@/src/components/ui/ProgressHeader';
import PromptCard from '@/src/components/ui/PromptCard';
import RecordButton from '@/src/components/ui/RecordButton';
import ScreenContainer from '@/src/components/ui/ScreenContainer';
import SecondaryButton from '@/src/components/ui/SecondaryButton';
import TipCard from '@/src/components/ui/TipCard';
import WaveformDisplay from '@/src/components/ui/WaveformDisplay';
import { ROUTES } from '@/src/constants/routes';
import { useAudioPractice } from '@/src/features/practice/hooks/useAudioPractice';
import { usePracticeSession } from '@/src/features/practice/hooks/usePracticeSession';
import { playUri } from '@/src/services/audio/audioPlaybackService';
import { speakEnglishWord } from '@/src/services/audio/referenceSpeech';
import { getLessonTitle } from '@/src/services/content/lessonRepository';
import { getPremiumVoicePaywallTrigger } from '@/src/services/paywall/paywallTriggers';
import { getLessonAudio } from '@/src/services/tts/getLessonAudio';
import { usePlanStore } from '@/src/store/planStore';
import { theme, typography } from '@/src/theme/pronunciationTheme';

export default function PracticeScreen() {
  const router = useRouter();
  const params = useLocalSearchParams<{ lessonId?: string }>();
  const lessonId = params.lessonId ?? 'lesson-01';
  const lessonTitle = getLessonTitle(lessonId);

  const plan = usePlanStore((state) => state.plan);
  const premiumHearCount = usePlanStore((state) => state.premiumHearCount);
  const incrementPremiumHearCount = usePlanStore((state) => state.incrementPremiumHearCount);
  const markPaywallSeen = usePlanStore((state) => state.markPaywallSeen);

  const referencePlayerRef = useRef<AudioPlayer | null>(null);
  const replayPop = useRef(new Animated.Value(1)).current;
  const slowPop = useRef(new Animated.Value(1)).current;

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
    feedback,
    recordedUri,
    applyReferenceFeedback,
    registerAttemptResult,
    nextWord,
    previousWord,
    retryCurrentWord,
  } = usePracticeSession(lessonId);

  const audio = useAudioPractice(recordedUri);

  const openPaywall = useCallback(
    (reason: string) => {
      markPaywallSeen();
      router.push({ pathname: '/paywall', params: { reason } });
    },
    [markPaywallSeen, router],
  );

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

  const handleBack = () => {
    if (router.canGoBack()) {
      router.back();
    } else {
      router.replace(ROUTES.HOME);
    }
  };

  const handleStartRecording = async () => {
    try {
      await audio.startRecording();
    } catch (error) {
      console.error(error);
      Alert.alert('マイクがひつよう', '録音するにはマイクをOKしてね。');
    }
  };

  const handleStopRecording = async () => {
    try {
      const uri = await audio.stopRecording();
      await registerAttemptResult(uri);
    } catch (error) {
      console.error(error);
      Alert.alert('録音エラー', 'とまらなかった。もういちどためしてね。');
    }
  };

  const toggleRecord = () => {
    if (audio.status.isRecording) {
      void handleStopRecording();
    } else {
      void handleStartRecording();
    }
  };

  const handleReplayRecording = () => {
    Animated.sequence([
      Animated.timing(replayPop, {
        toValue: 1.14,
        duration: 110,
        useNativeDriver: true,
      }),
      Animated.timing(replayPop, {
        toValue: 1,
        duration: 140,
        useNativeDriver: true,
      }),
    ]).start();
    void audio.playRecording();
  };

  const handleSlowTap = () => {
    Animated.sequence([
      Animated.timing(slowPop, {
        toValue: 1.16,
        duration: 95,
        useNativeDriver: true,
      }),
      Animated.timing(slowPop, {
        toValue: 1,
        duration: 130,
        useNativeDriver: true,
      }),
    ]).start();
    void handlePlayReferenceAudio('slow', plan === 'premium');
  };

  if (!currentWord) {
    return (
      <ScreenContainer>
        <Text style={styles.emptyTitle}>レッスンがみつからない</Text>
        <PrimaryButton label="ホームへもどる" onPress={() => router.replace(ROUTES.HOME)} />
      </ScreenContainer>
    );
  }

  const isLast = currentIndex === words.length - 1;
  const progressCurrent = currentIndex + 1;
  const feedbackLines = [feedback.title, feedback.body].filter((s) => s.trim().length > 0);
  const showTryAgain = feedback.score != null;
  const tipText = `${currentWord.mouthTipJa} カタカナみたいに言わない: ${currentWord.avoidGuide}`;

  const finishSession = () => {
    router.push({
      pathname: ROUTES.SESSION_COMPLETE,
      params: { lessonId },
    });
  };

  return (
    <ScreenContainer contentStyle={styles.screenContent}>
      <ProgressHeader
        current={progressCurrent}
        total={words.length}
        lessonTitle={lessonTitle}
        onBack={handleBack}
      />

      <PromptCard
        word={currentWord.word}
        meaningJa={currentWord.meaningJa}
        onListen={() => void handlePlayReferenceAudio('normal', plan === 'premium')}
      />

      <View style={styles.audioExtras}>
        <Animated.View style={[styles.popWrap, { transform: [{ scale: slowPop }] }]}>
          <Pressable onPress={handleSlowTap} style={({ pressed }) => pressed && styles.linkPressed}>
            <Text style={[styles.link, styles.slowLink]}>Slow</Text>
          </Pressable>
        </Animated.View>
        <Text style={styles.dot}>·</Text>
        {plan === 'free' ? (
          <Pressable onPress={handlePremiumPreviewTap}>
            <Text style={styles.link}>Natural voice</Text>
          </Pressable>
        ) : null}
      </View>

      <WaveformDisplay variant="gold" />

      <View style={styles.recordBlock}>
        <RecordButton
          isRecording={audio.status.isRecording}
          onPress={toggleRecord}
          disabled={!audio.status.audioReady}
        />
        <Text style={styles.tapLabel}>Tap to speak タップしていう</Text>
        {audio.status.hasRecording ? (
          <Animated.View style={[styles.replayPopWrap, { transform: [{ scale: replayPop }] }]}>
            <Pressable
              onPress={handleReplayRecording}
              style={({ pressed }) => [styles.replayHit, pressed && styles.replayPressed]}
            >
              <Text style={styles.replay}>Play my recording</Text>
            </Pressable>
          </Animated.View>
        ) : null}
      </View>

      <FeedbackCard
        lines={feedbackLines}
        tryAgainWord={showTryAgain ? currentWord.word : undefined}
      />

      <TipCard text={tipText} />

      <PracticeActions
        onSkip={() => (isLast ? finishSession() : nextWord())}
        onTryAgain={retryCurrentWord}
        skipLabel={isLast ? 'Finish' : 'Skip'}
        skipLabelJa={isLast ? 'おわる' : 'とばす'}
        tryAgainLabel="Try again"
        tryAgainLabelJa="もういちど"
      />

      <View style={styles.navRow}>
        <SecondaryButton label="Previous" labelSuffixJa="まえへ" onPress={previousWord} flex={1} />
        <PrimaryButton
          label={isLast ? 'Done' : 'Next word'}
          labelSuffixJa={isLast ? 'おわる' : 'つぎのたんご'}
          onPress={isLast ? finishSession : nextWord}
          flex={1}
        />
      </View>
    </ScreenContainer>
  );
}

const styles = StyleSheet.create({
  screenContent: {
    paddingTop: theme.space.sm,
    paddingBottom: theme.space.lg,
    gap: theme.space.xs,
  },
  emptyTitle: {
    fontFamily: theme.fontDisplay,
    fontSize: 22,
    color: theme.colors.text,
    marginBottom: theme.space.md,
  },
  audioExtras: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: theme.space.xs,
    marginTop: -2,
    marginBottom: 2,
  },
  link: {
    ...typography.bodySmall,
    fontWeight: '700',
    color: theme.colors.accentGoldDeep,
    textDecorationLine: 'underline',
  },
  slowLink: {
    fontSize: 15,
  },
  dot: {
    color: theme.colors.textMuted,
    fontSize: 14,
  },
  recordBlock: {
    alignItems: 'center',
    gap: theme.space.xs,
    marginVertical: 4,
  },
  tapLabel: {
    fontFamily: theme.fontDisplay,
    fontSize: 13,
    color: theme.colors.textSecondary,
  },
  replayHit: {
    paddingVertical: 2,
  },
  replayPopWrap: {
    alignSelf: 'center',
  },
  popWrap: {
    alignSelf: 'center',
  },
  replayPressed: {
    opacity: 0.8,
  },
  linkPressed: {
    opacity: 0.82,
  },
  replay: {
    fontSize: 13,
    fontWeight: '600',
    color: theme.colors.textMuted,
    textDecorationLine: 'underline',
  },
  navRow: {
    flexDirection: 'row',
    gap: theme.space.xs,
    alignItems: 'stretch',
    marginTop: 4,
  },
});
