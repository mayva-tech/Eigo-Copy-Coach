import { useEffect, useMemo, useRef, useState } from 'react';
import { Alert, Animated, Pressable, StyleSheet, Text, View } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

import PrimaryButton from '@/src/components/ui/PrimaryButton';
import RecordButton from '@/src/components/ui/RecordButton';
import ScreenContainer from '@/src/components/ui/ScreenContainer';
import SecondaryButton from '@/src/components/ui/SecondaryButton';
import WaveformDisplay from '@/src/components/ui/WaveformDisplay';
import { useAudioPractice } from '@/src/features/practice/hooks/useAudioPractice';
import {
  speakEnglishPhraseSample,
  speakEnglishWord,
  speakJapaneseText,
} from '@/src/services/audio/referenceSpeech';
import { formatPartOfSpeechLine } from '@/src/data/partOfSpeechJa';
import { pronunciationFocusParts } from '@/src/data/pronunciationFocusJa';
import { TOEIC_WORDS } from '@/src/data/toeicWords';
import { theme } from '@/src/theme/pronunciationTheme';

export default function ToeicVocabScreen() {
  const [index, setIndex] = useState(0);
  const [flipped, setFlipped] = useState(false);
  const [recordedUri, setRecordedUri] = useState<string | null>(null);
  /** Phrase English line only — rates are separate from headword Play/Slow (see referenceSpeech). */
  const [phraseEnglishMode, setPhraseEnglishMode] = useState<'baseline' | 'fast'>('baseline');
  const replayPop = useRef(new Animated.Value(1)).current;
  const word = TOEIC_WORDS[index];
  const progress = useMemo(() => `${index + 1}/${TOEIC_WORDS.length}`, [index]);
  const audio = useAudioPractice(recordedUri);

  useEffect(() => {
    setRecordedUri(null);
  }, [index]);

  if (!word) return null;

  const pronunciationFocus = pronunciationFocusParts(word.difficulty);

  const onPrev = () => {
    setFlipped(false);
    setIndex((i) => (i - 1 + TOEIC_WORDS.length) % TOEIC_WORDS.length);
  };

  const onNext = () => {
    setFlipped(false);
    setIndex((i) => (i + 1) % TOEIC_WORDS.length);
  };

  const handleStartRecording = async () => {
    try {
      await audio.startRecording();
    } catch {
      Alert.alert('マイクがひつよう', '録音するにはマイクをOKしてね。');
    }
  };

  const handleStopRecording = async () => {
    try {
      const uri = await audio.stopRecording();
      setRecordedUri(uri);
    } catch {
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
      Animated.timing(replayPop, { toValue: 1.14, duration: 110, useNativeDriver: true }),
      Animated.timing(replayPop, { toValue: 1, duration: 140, useNativeDriver: true }),
    ]).start();
    void audio.playRecording();
  };

  return (
    <ScreenContainer contentStyle={styles.content}>
      <Text style={styles.eyebrow}>TOEIC VOCAB + PRONUNCIATION</Text>
      <View style={styles.headerRow}>
        <Text style={styles.title}>TOEIC Words</Text>
        <Text style={styles.counter}>{progress}</Text>
      </View>

      <View style={styles.card}>
        <View style={styles.badge}>
          <Text style={styles.badgeLineEn}>{pronunciationFocus.en}</Text>
          {pronunciationFocus.ja ? (
            <Text style={styles.badgeLineJa}>{pronunciationFocus.ja}</Text>
          ) : null}
        </View>
        <Text style={styles.word}>{word.word}</Text>
        {word.meaningJa ? <Text style={styles.meaning}>{word.meaningJa}</Text> : null}
        <Text style={styles.posText}>{formatPartOfSpeechLine(word.partOfSpeech)}</Text>

        {!flipped ? (
          <>
            <View style={styles.pronunciationBlock}>
              <Text style={styles.stress}>{word.stressHint}</Text>
            </View>
            <View style={styles.listenRow}>
              <PrimaryButton label="Play" labelSuffixJa="ながす" onPress={() => void speakEnglishWord(word.word, 'normal')} flex={1} />
              <SecondaryButton label="Slow" labelSuffixJa="ゆっくり" onPress={() => void speakEnglishWord(word.word, 'slow')} flex={1} />
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

            <View style={styles.phraseSectionHeader}>
              <View style={styles.phraseSectionTitleCol}>
                <Text style={styles.section}>Phrases よくつかう文</Text>
                <Text style={styles.phraseTapHint}>上＝英語の声 · 下＝日本語の声</Text>
              </View>
              <View style={styles.phraseSpeedToggle} accessibilityRole="tablist">
                <Pressable
                  onPress={() => setPhraseEnglishMode('fast')}
                  style={({ pressed }) => [
                    styles.phraseSpeedSegment,
                    phraseEnglishMode === 'fast' && styles.phraseSpeedSegmentActive,
                    pressed && styles.navPressed,
                  ]}
                  accessibilityRole="tab"
                  accessibilityState={{ selected: phraseEnglishMode === 'fast' }}
                >
                  <Text
                    style={[
                      styles.phraseSpeedSegmentText,
                      phraseEnglishMode === 'fast' && styles.phraseSpeedSegmentTextActive,
                    ]}
                  >
                    Normal
                  </Text>
                  <Text
                    style={[
                      styles.phraseSpeedSegmentSub,
                      phraseEnglishMode === 'fast' && styles.phraseSpeedSegmentSubActive,
                    ]}
                  >
                    はやめ
                  </Text>
                </Pressable>
                <Pressable
                  onPress={() => setPhraseEnglishMode('baseline')}
                  style={({ pressed }) => [
                    styles.phraseSpeedSegment,
                    styles.phraseSpeedSegmentRight,
                    phraseEnglishMode === 'baseline' && styles.phraseSpeedSegmentActive,
                    pressed && styles.navPressed,
                  ]}
                  accessibilityRole="tab"
                  accessibilityState={{ selected: phraseEnglishMode === 'baseline' }}
                >
                  <Text
                    style={[
                      styles.phraseSpeedSegmentText,
                      phraseEnglishMode === 'baseline' && styles.phraseSpeedSegmentTextActive,
                    ]}
                  >
                    Slow
                  </Text>
                  <Text
                    style={[
                      styles.phraseSpeedSegmentSub,
                      phraseEnglishMode === 'baseline' && styles.phraseSpeedSegmentSubActive,
                    ]}
                  >
                    もとどおり
                  </Text>
                </Pressable>
              </View>
            </View>
            <View style={styles.phraseList}>
              {word.phrases.map((p, i) => (
                <View key={`${p.en}-${i}`} style={styles.phraseCardOuter}>
                  <View style={styles.chipBlock}>
                    <Pressable
                      onPress={() => void speakEnglishPhraseSample(p.en, phraseEnglishMode)}
                      style={({ pressed }) => [styles.phraseEnRow, pressed && styles.navPressed]}
                      accessibilityRole="button"
                      accessibilityLabel={`Speak English: ${p.en}`}
                    >
                      <Ionicons name="volume-medium" size={14} color={theme.colors.textMuted} style={styles.chipIcon} />
                      <Text style={styles.chipEn}>{p.en}</Text>
                    </Pressable>
                    {p.ja ? (
                      <Pressable
                        onPress={() => void speakJapaneseText(p.ja, phraseEnglishMode)}
                        style={({ pressed }) => [styles.phraseJaRow, pressed && styles.navPressed]}
                        accessibilityRole="button"
                        accessibilityLabel={`日本語で読み上げ: ${p.ja}`}
                      >
                        <Ionicons name="language" size={14} color={theme.colors.accentGoldDeep} style={styles.chipIcon} />
                        <Text style={styles.chipJa}>{p.ja}</Text>
                      </Pressable>
                    ) : null}
                  </View>
                </View>
              ))}
            </View>
            <PrimaryButton label="See meaning & tips" labelSuffixJa="いみとコツ" onPress={() => setFlipped(true)} />
          </>
        ) : (
          <>
            <Text style={styles.section}>Meanings いみ（英語）</Text>
            {word.definitions.map((d) => (
              <Text key={d} style={styles.body}>- {d}</Text>
            ))}
            <Text style={styles.section}>Example れいぶん</Text>
            <Text style={styles.body}>{word.example}</Text>
            <Text style={styles.section}>Tip コツ</Text>
            <Text style={styles.body}>{word.pronunciationTipJa}</Text>
            <Text style={styles.section}>Synonyms にたいみの語</Text>
            <View style={styles.chips}>
              {word.synonyms.map((s) => (
                <Pressable
                  key={s}
                  onPress={() => void speakEnglishWord(s, 'normal')}
                  style={({ pressed }) => [styles.synonymChipPressable, pressed && styles.navPressed]}
                >
                  <View style={styles.synonymChipInner}>
                    <Ionicons name="volume-medium" size={12} color={theme.colors.textMuted} />
                    <Text style={styles.synonymChip}>{s}</Text>
                  </View>
                </Pressable>
              ))}
            </View>
            <SecondaryButton label="Back to word" labelSuffixJa="もどる" onPress={() => setFlipped(false)} />
          </>
        )}
      </View>

      <View style={styles.navRow}>
        <Pressable
          onPress={onPrev}
          style={({ pressed }) => [styles.navButton, pressed && styles.navPressed]}
        >
          <Text style={styles.navText}>Back まえへ</Text>
        </Pressable>
        <Pressable
          onPress={onNext}
          style={({ pressed }) => [styles.navButton, styles.navButtonPrimary, pressed && styles.navPressed]}
        >
          <Text style={styles.navTextPrimary}>Next つぎへ</Text>
        </Pressable>
      </View>
    </ScreenContainer>
  );
}

const styles = StyleSheet.create({
  content: {
    paddingTop: theme.space.md,
  },
  eyebrow: {
    fontSize: 10,
    fontWeight: '700',
    letterSpacing: 1.4,
    color: theme.colors.textMuted,
  },
  headerRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-end',
    marginBottom: theme.space.xs,
  },
  title: {
    fontFamily: theme.fontDisplay,
    fontSize: 28,
    color: theme.colors.text,
  },
  counter: {
    fontSize: 13,
    fontWeight: '700',
    color: theme.colors.textMuted,
  },
  card: {
    position: 'relative',
    backgroundColor: theme.colors.surfaceElevated,
    borderRadius: theme.radius.xl,
    borderWidth: 1,
    borderColor: theme.colors.borderSubtle,
    padding: theme.space.md,
    gap: theme.space.xs,
  },
  badge: {
    position: 'absolute',
    top: 10,
    right: 10,
    maxWidth: '58%',
    alignItems: 'flex-end',
    gap: 2,
    backgroundColor: theme.colors.surfaceSoft,
    borderRadius: theme.radius.sm,
    borderWidth: 1,
    borderColor: theme.colors.accentGold,
    paddingHorizontal: 8,
    paddingVertical: 5,
  },
  badgeLineEn: {
    fontSize: 10,
    fontWeight: '800',
    letterSpacing: 0.2,
    color: theme.colors.accentGoldDeep,
    textAlign: 'right',
    lineHeight: 13,
  },
  badgeLineJa: {
    fontSize: 10,
    fontWeight: '700',
    color: theme.colors.text,
    textAlign: 'right',
    lineHeight: 16,
    letterSpacing: 0.2,
  },
  word: {
    fontFamily: theme.fontDisplay,
    fontSize: 34,
    color: theme.colors.text,
    lineHeight: 38,
  },
  pronunciationBlock: {
    marginTop: 4,
  },
  stress: {
    fontSize: 17,
    color: theme.colors.textSecondary,
    fontStyle: 'italic',
    lineHeight: 24,
  },
  posText: {
    fontSize: 12,
    fontWeight: '700',
    color: theme.colors.textMuted,
    lineHeight: 18,
  },
  meaning: {
    fontSize: 15,
    fontWeight: '700',
    color: theme.colors.text,
    marginBottom: 2,
  },
  listenRow: {
    flexDirection: 'row',
    gap: theme.space.xs,
    marginVertical: theme.space.xs,
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
  replayPressed: {
    opacity: 0.8,
  },
  replay: {
    fontSize: 13,
    fontWeight: '600',
    color: theme.colors.textMuted,
    textDecorationLine: 'underline',
  },
  section: {
    fontSize: 11,
    fontWeight: '700',
    letterSpacing: 1,
    color: theme.colors.textMuted,
    textTransform: 'uppercase',
    marginTop: 4,
  },
  phraseSectionHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    gap: 10,
    marginTop: 4,
  },
  phraseSectionTitleCol: {
    flex: 1,
    minWidth: 0,
  },
  phraseSpeedToggle: {
    flexDirection: 'row',
    flexShrink: 0,
    borderRadius: theme.radius.sm,
    borderWidth: 1,
    borderColor: theme.colors.borderSubtle,
    overflow: 'hidden',
    backgroundColor: theme.colors.surfaceSoft,
  },
  phraseSpeedSegment: {
    paddingHorizontal: 10,
    paddingVertical: 6,
    alignItems: 'center',
    justifyContent: 'center',
    minWidth: 64,
    borderRightWidth: StyleSheet.hairlineWidth,
    borderRightColor: theme.colors.borderSubtle,
  },
  phraseSpeedSegmentRight: {
    borderRightWidth: 0,
  },
  phraseSpeedSegmentActive: {
    backgroundColor: theme.colors.accentGold,
  },
  phraseSpeedSegmentText: {
    fontSize: 11,
    fontWeight: '800',
    color: theme.colors.textMuted,
    letterSpacing: 0.3,
  },
  phraseSpeedSegmentTextActive: {
    color: theme.colors.darkCard,
  },
  phraseSpeedSegmentSub: {
    fontSize: 9,
    fontWeight: '600',
    color: theme.colors.textMuted,
    marginTop: 1,
    opacity: 0.85,
  },
  phraseSpeedSegmentSubActive: {
    color: theme.colors.darkCard,
    opacity: 0.9,
  },
  /** Full-width stack: wrapped row + no width on children collapses to icon-only columns on RN. */
  phraseList: {
    alignSelf: 'stretch',
    width: '100%',
    gap: 8,
  },
  phraseTapHint: {
    fontSize: 11,
    color: theme.colors.textMuted,
    marginTop: -2,
    marginBottom: 4,
  },
  phraseCardOuter: {
    width: '100%',
    borderRadius: theme.radius.md,
  },
  chips: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 6,
  },
  chipBlock: {
    width: '100%',
    borderWidth: 1,
    borderColor: theme.colors.borderSubtle,
    borderRadius: theme.radius.md,
    paddingHorizontal: 10,
    paddingVertical: 4,
    backgroundColor: theme.colors.surfaceSoft,
  },
  phraseEnRow: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    gap: 8,
    paddingVertical: 6,
    borderRadius: theme.radius.sm,
  },
  phraseJaRow: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    gap: 8,
    paddingVertical: 8,
    marginTop: 2,
    borderTopWidth: StyleSheet.hairlineWidth,
    borderTopColor: theme.colors.borderSubtle,
    borderRadius: theme.radius.sm,
  },
  chipIcon: {
    marginTop: 2,
    flexShrink: 0,
  },
  chipEn: {
    flex: 1,
    fontSize: 13,
    color: theme.colors.textSecondary,
    lineHeight: 18,
    minWidth: 0,
  },
  chipJa: {
    flex: 1,
    fontSize: 12,
    fontWeight: '600',
    color: theme.colors.textMuted,
    lineHeight: 17,
    minWidth: 0,
  },
  synonymChipPressable: {
    borderRadius: 999,
  },
  synonymChipInner: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
  },
  synonymChip: {
    fontSize: 12,
    color: theme.colors.textSecondary,
    borderWidth: 1,
    borderColor: theme.colors.borderSubtle,
    borderRadius: 999,
    paddingHorizontal: 8,
    paddingVertical: 4,
    backgroundColor: theme.colors.surfaceSoft,
  },
  body: {
    fontSize: 15,
    lineHeight: 21,
    color: theme.colors.textSecondary,
  },
  navRow: {
    flexDirection: 'row',
    gap: theme.space.xs,
  },
  navButton: {
    flex: 1,
    borderRadius: theme.radius.md,
    borderWidth: 1,
    borderColor: theme.colors.border,
    backgroundColor: theme.colors.surfaceSoft,
    minHeight: 44,
    alignItems: 'center',
    justifyContent: 'center',
  },
  navButtonPrimary: {
    borderColor: theme.colors.accentGold,
    backgroundColor: theme.colors.accentGold,
  },
  navPressed: {
    opacity: 0.85,
  },
  navText: {
    fontSize: 14,
    fontWeight: '700',
    color: theme.colors.text,
  },
  navTextPrimary: {
    fontSize: 14,
    fontWeight: '700',
    color: theme.colors.darkCard,
  },
});
