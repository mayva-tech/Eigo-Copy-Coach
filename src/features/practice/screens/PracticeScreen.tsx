import { Ionicons } from '@expo/vector-icons';
import { createAudioPlayer, type AudioPlayer } from 'expo-audio';
import { useLocalSearchParams, useRouter } from 'expo-router';
import { useCallback, useEffect, useMemo, useRef, useState } from 'react';
import { Alert, Animated, Platform, Pressable, StyleSheet, Text, View } from 'react-native';

import FeedbackCard from '@/src/components/ui/FeedbackCard';
import PracticeActions from '@/src/components/ui/PracticeActions';
import PrimaryButton from '@/src/components/ui/PrimaryButton';
import ProgressHeader from '@/src/components/ui/ProgressHeader';
import PromptCard from '@/src/components/ui/PromptCard';
import ScreenContainer from '@/src/components/ui/ScreenContainer';
import SecondaryButton from '@/src/components/ui/SecondaryButton';
import TipCard from '@/src/components/ui/TipCard';
import { ROUTES } from '@/src/constants/routes';
import { getStressHintForToeicPracticeWordId } from '@/src/data/toeicStressLookup';
import { useAudioPractice } from '@/src/features/practice/hooks/useAudioPractice';
import { usePracticeSession } from '@/src/features/practice/hooks/usePracticeSession';
import { analyzeClarityVsTts } from '@/src/services/audio/clarityAnalysis';
import { playUri } from '@/src/services/audio/audioPlaybackService';
import { speakEnglishHeadword } from '@/src/services/audio/referenceSpeech';
import { getLessonTitle, LESSON_TOEIC_ID } from '@/src/services/content/lessonRepository';
import { getPremiumVoicePaywallTrigger } from '@/src/services/paywall/paywallTriggers';
import { getLessonAudio } from '@/src/services/tts/getLessonAudio';
import { usePlanStore } from '@/src/store/planStore';
import { theme, typography } from '@/src/theme/pronunciationTheme';

export default function PracticeScreen() {
  const router = useRouter();
  const params = useLocalSearchParams<{ lessonId?: string | string[]; wordId?: string | string[] }>();
  const lessonIdRaw = params.lessonId;
  const lessonId = (Array.isArray(lessonIdRaw) ? lessonIdRaw[0] : lessonIdRaw) ?? 'lesson-01';
  const wordIdRaw = params.wordId;
  const initialWordId =
    wordIdRaw != null ? (Array.isArray(wordIdRaw) ? wordIdRaw[0] : wordIdRaw) : undefined;
  const lessonTitle = getLessonTitle(lessonId);

  const plan = usePlanStore((state) => state.plan);
  const premiumHearCount = usePlanStore((state) => state.premiumHearCount);
  const incrementPremiumHearCount = usePlanStore((state) => state.incrementPremiumHearCount);
  const markPaywallSeen = usePlanStore((state) => state.markPaywallSeen);

  const referencePlayerRef = useRef<AudioPlayer | null>(null);
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
  } = usePracticeSession(lessonId, initialWordId);

  const toeicHeadwordIdForNav = useMemo(() => {
    const id = currentWord?.id;
    if (id == null || !id.startsWith('toeic-')) return null;
    const n = parseInt(id.slice('toeic-'.length), 10);
    return Number.isNaN(n) ? null : n;
  }, [currentWord?.id]);

  const audio = useAudioPractice(recordedUri);
  const [clarity, setClarity] = useState<{ score: number; labelJa: string } | null>(null);
  const [clarityBusy, setClarityBusy] = useState(false);

  useEffect(() => {
    setClarity(null);
    setClarityBusy(false);
  }, [currentWord?.id]);

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

      const stressHint = getStressHintForToeicPracticeWordId(currentWord.id);
      const headwordMode = mode === 'slow' ? 'slow' : 'normal';

      if (!usePremiumVoice && plan === 'free') {
        void speakEnglishHeadword(currentWord.word, headwordMode, stressHint);
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
          void speakEnglishHeadword(currentWord.word, headwordMode, stressHint);
          return false;
        }

        await playUri(player, audioUri);
        return true;
      } catch (error) {
        console.error('Failed to play reference audio', error);
        void speakEnglishHeadword(currentWord.word, headwordMode, stressHint);
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
    void audio.playRecording(() => {
      void (async () => {
        if (!recordedUri || !currentWord) return;
        setClarityBusy(true);
        try {
          const ttsUri = await getLessonAudio({
            text: currentWord.word,
            usePremiumVoice: plan === 'premium',
            mode: 'normal',
          });
          const result = await analyzeClarityVsTts({
            userRecordingUri: recordedUri,
            ttsUri,
            sessionScore: feedback.score,
          });
          setClarity({ score: result.score, labelJa: result.labelJa });
        } catch {
          const s = feedback.score;
          setClarity({
            score: Math.round(s != null ? s : 78),
            labelJa: 'はっきり度（かんたん）',
          });
        } finally {
          setClarityBusy(false);
        }
      })();
    });
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

  if (!currentWord || words.length === 0) {
    const emptyToeic = lessonId === LESSON_TOEIC_ID;
    return (
      <ScreenContainer contentStyle={styles.screenContent}>
        <Text style={styles.emptyTitle}>
          {emptyToeic ? 'TOEIC れんしゅうリストはまだからです' : 'レッスンがみつからない'}
        </Text>
        {emptyToeic ? (
          <Text style={styles.emptySubtitle}>
            TOEIC たんご画面の「＋」をタップして、たんごをリストに追加してね。
          </Text>
        ) : null}
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

      <View style={styles.quickNavRow}>
        <Pressable
          onPress={() => router.push(ROUTES.ONBOARDING)}
          style={({ pressed }) => [styles.quickNavBtn, pressed && styles.quickNavPressed]}
          accessibilityRole="button"
          accessibilityLabel="オンボーディングへ"
        >
          <Ionicons name="school-outline" size={20} color={theme.colors.terracotta} />
          <View style={styles.quickNavTextCol}>
            <Text style={styles.quickNavTitle}>Start guide</Text>
            <Text style={styles.quickNavJa}>はじめに</Text>
          </View>
        </Pressable>
        {toeicHeadwordIdForNav != null ? (
          <Pressable
            onPress={() =>
              router.push({
                pathname: ROUTES.TOEIC,
                params: { wordId: String(toeicHeadwordIdForNav) },
              })
            }
            style={({ pressed }) => [styles.quickNavBtn, pressed && styles.quickNavPressed]}
            accessibilityRole="button"
            accessibilityLabel="TOEIC たんごカードへ"
          >
            <Ionicons name="book-outline" size={20} color={theme.colors.accentGoldDeep} />
            <View style={styles.quickNavTextCol}>
              <Text style={styles.quickNavTitle}>TOEIC word</Text>
              <Text style={styles.quickNavJa}>たんごカード</Text>
            </View>
          </Pressable>
        ) : null}
      </View>

      <PromptCard
        word={currentWord.word}
        meaningJa={currentWord.meaningJa}
        onListen={() => void handlePlayReferenceAudio('normal', plan === 'premium')}
        isRecording={audio.status.isRecording}
        onRecordPress={toggleRecord}
        recordDisabled={!audio.status.audioReady}
        hasRecording={audio.status.hasRecording}
        onReplayRecording={handleReplayRecording}
        clarityScore={clarity?.score ?? null}
        clarityLabelJa={clarity?.labelJa ?? null}
        clarityBusy={clarityBusy}
      />

      <View style={styles.audioExtras}>
        <Animated.View style={[styles.popWrap, { transform: [{ scale: slowPop }] }]}>
          <Pressable onPress={handleSlowTap} style={({ pressed }) => pressed && styles.linkPressed}>
            <Text style={[styles.link, styles.slowLink]}>
              Slow
              <Text style={styles.slowLinkJa}> ゆっくり</Text>
            </Text>
          </Pressable>
        </Animated.View>
        <Text style={styles.dot}>·</Text>
        {plan === 'free' ? (
          <Pressable onPress={handlePremiumPreviewTap}>
            <Text style={styles.link}>Natural voice</Text>
          </Pressable>
        ) : null}
      </View>

      <FeedbackCard
        lines={feedbackLines}
        tryAgainWord={showTryAgain ? currentWord.word : undefined}
        wordScores={feedback.wordScores}
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
        <SecondaryButton
          label="Previous"
          labelSuffixJa="まえへ"
          labelStyle={styles.navActionLabelEn}
          labelJaStyle={styles.navActionLabelJa}
          onPress={previousWord}
          flex={1}
        />
        <PrimaryButton
          label={isLast ? 'Done' : 'Next word'}
          labelSuffixJa={isLast ? 'おわる' : 'つぎのたんご'}
          labelStyle={styles.navActionLabelEn}
          labelJaStyle={styles.navActionLabelJa}
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
  quickNavRow: {
    flexDirection: 'row',
    gap: theme.space.xs,
    marginBottom: theme.space.xs,
  },
  quickNavBtn: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 8,
    paddingVertical: 10,
    paddingHorizontal: 8,
    borderRadius: theme.radius.md,
    borderWidth: 1,
    borderColor: theme.colors.borderSubtle,
    backgroundColor: theme.colors.surfaceSoft,
  },
  quickNavPressed: {
    opacity: 0.88,
  },
  quickNavTextCol: {
    gap: 0,
  },
  quickNavTitle: {
    fontSize: 12,
    fontWeight: '700',
    color: theme.colors.text,
  },
  quickNavJa: {
    fontSize: 10,
    fontWeight: '600',
    color: theme.colors.textMuted,
  },
  emptyTitle: {
    fontFamily: theme.fontDisplay,
    fontSize: 22,
    color: theme.colors.text,
    marginBottom: theme.space.sm,
  },
  emptySubtitle: {
    fontSize: 14,
    lineHeight: 20,
    color: theme.colors.textSecondary,
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
  slowLinkJa: {
    fontSize: 12,
    fontWeight: '600',
    color: theme.colors.textMuted,
  },
  dot: {
    color: theme.colors.textMuted,
    fontSize: 14,
  },
  popWrap: {
    alignSelf: 'center',
  },
  linkPressed: {
    opacity: 0.82,
  },
  navRow: {
    flexDirection: 'row',
    gap: theme.space.xs,
    alignItems: 'stretch',
    marginTop: 4,
  },
  navActionLabelEn: {
    fontFamily: Platform.select({
      ios: 'System',
      android: 'sans-serif',
      default: 'sans-serif',
    }),
    fontSize: 15,
    fontWeight: '700',
  },
  navActionLabelJa: {
    fontFamily: Platform.select({
      ios: 'System',
      android: 'sans-serif',
      default: 'sans-serif',
    }),
    fontSize: 15,
    fontWeight: '400',
    color: theme.colors.text,
  },
});
