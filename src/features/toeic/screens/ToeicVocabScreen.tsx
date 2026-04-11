import { Ionicons } from '@expo/vector-icons';
import { useLocalSearchParams, useRouter } from 'expo-router';
import { useEffect, useMemo, useRef, useState, type ReactNode } from 'react';
import {
  Alert,
  Animated,
  Easing,
  Modal,
  Platform,
  Pressable,
  StyleSheet,
  Text,
  View,
  type PressableProps,
  type StyleProp,
  type ViewStyle,
} from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

import PrimaryButton from '@/src/components/ui/PrimaryButton';
import RecordButton from '@/src/components/ui/RecordButton';
import ScreenContainer from '@/src/components/ui/ScreenContainer';
import SecondaryButton from '@/src/components/ui/SecondaryButton';
import { ROUTES } from '@/src/constants/routes';
import { formatPartOfSpeechLine } from '@/src/data/partOfSpeechJa';
import { pronunciationFocusParts } from '@/src/data/pronunciationFocusJa';
import { TOEIC_WORDS } from '@/src/data/toeicWords';
import { useAudioPractice } from '@/src/features/practice/hooks/useAudioPractice';
import {
  speakEnglishPhraseSample,
  speakEnglishWord,
  speakJapaneseText,
} from '@/src/services/audio/referenceSpeech';
import { useToeicPracticeStore } from '@/src/store/useToeicPracticeStore';
import { useToeicWordStatsStore } from '@/src/store/useToeicWordStatsStore';
import { theme } from '@/src/theme/pronunciationTheme';

const TAP_POP_SCALE = 1.1;

/** Brief scale “pop” on tap (same idea as replay); `contentStyle` should hold row/flex layout. */
function TapPopPressable({
  children,
  onPress,
  style,
  contentStyle,
  ...rest
}: Omit<PressableProps, 'onPress' | 'style' | 'children'> & {
  onPress: () => void;
  children: ReactNode;
  style?: PressableProps['style'];
  contentStyle?: StyleProp<ViewStyle>;
}) {
  const pop = useRef(new Animated.Value(1)).current;
  const handlePress = () => {
    Animated.sequence([
      Animated.timing(pop, { toValue: TAP_POP_SCALE, duration: 95, useNativeDriver: true }),
      Animated.timing(pop, { toValue: 1, duration: 125, useNativeDriver: true }),
    ]).start();
    onPress();
  };
  return (
    <Pressable {...rest} onPress={handlePress} style={style}>
      <Animated.View style={[contentStyle, { transform: [{ scale: pop }] }]}>{children}</Animated.View>
    </Pressable>
  );
}

function parseWordIdParam(raw: string | string[] | undefined): number | null {
  if (raw == null) return null;
  const s = Array.isArray(raw) ? raw[0] : raw;
  const id = parseInt(String(s), 10);
  return Number.isNaN(id) ? null : id;
}

const WORD_COUNT = TOEIC_WORDS.length;

function shuffleWordIndices(): number[] {
  const arr = Array.from({ length: WORD_COUNT }, (_, i) => i);
  for (let i = arr.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    const t = arr[i]!;
    arr[i] = arr[j]!;
    arr[j] = t;
  }
  return arr;
}

export default function ToeicVocabScreen() {
  const insets = useSafeAreaInsets();
  const router = useRouter();
  const params = useLocalSearchParams<{ wordId?: string | string[] }>();
  /** Position in current order (0..n-1). In sequential mode this equals the word’s index in {@link TOEIC_WORDS}. */
  const [slotIndex, setSlotIndex] = useState(0);
  /** Tap shuffle icon: arms random (icon throbs). Tap Next: builds shuffle and advances. Tap icon again: off. */
  const [randomArmed, setRandomArmed] = useState(false);
  const [shuffledOrder, setShuffledOrder] = useState<number[] | null>(null);
  const [flipped, setFlipped] = useState(false);
  const [pronTypeExamplesOpen, setPronTypeExamplesOpen] = useState(false);
  const [recordedUri, setRecordedUri] = useState<string | null>(null);
  /** Phrase English line only — rates are separate from headword Play/Slow (see referenceSpeech). */
  const [phraseEnglishMode, setPhraseEnglishMode] = useState<'baseline' | 'fast'>('baseline');
  const replayPop = useRef(new Animated.Value(1)).current;
  const randomThrob = useRef(new Animated.Value(1)).current;
  const shuffleActive = shuffledOrder != null;
  const randomIconActive = randomArmed || shuffleActive;
  const wordIndex = shuffleActive ? shuffledOrder![slotIndex]! : slotIndex;
  const word = TOEIC_WORDS[wordIndex];
  const toeicId = word?.id;
  const addCurrentToeicHeadword = useToeicPracticeStore((s) => s.addCurrentToeicHeadword);
  const inPracticeList = useToeicPracticeStore(
    (s) => toeicId != null && s.words.some((w) => w.id === `toeic-${toeicId}`),
  );
  const recordHeadwordPlayback = useToeicWordStatsStore((s) => s.recordHeadwordPlayback);
  const weeklyActivityCount = useToeicWordStatsStore((s) =>
    toeicId != null ? s.getWeeklyActivityCount(toeicId) : 0,
  );
  const displayConfidence = useToeicWordStatsStore((s) =>
    toeicId != null ? s.getDisplayConfidence(toeicId) : null,
  );
  const hasPracticeScores = useToeicWordStatsStore((s) => {
    if (toeicId == null) return false;
    return (s.byId[toeicId]?.practiceScores.length ?? 0) > 0;
  });
  const adjustUserConfidence = useToeicWordStatsStore((s) => s.adjustUserConfidence);
  const progress = useMemo(() => `${slotIndex + 1}/${WORD_COUNT}`, [slotIndex]);
  const audio = useAudioPractice(recordedUri);

  useEffect(() => {
    setRecordedUri(null);
  }, [wordIndex]);

  useEffect(() => {
    if (!randomIconActive) {
      randomThrob.stopAnimation();
      randomThrob.setValue(1);
      return;
    }
    const loop = Animated.loop(
      Animated.sequence([
        Animated.timing(randomThrob, {
          toValue: 1.18,
          duration: 520,
          easing: Easing.inOut(Easing.ease),
          useNativeDriver: true,
        }),
        Animated.timing(randomThrob, {
          toValue: 1,
          duration: 520,
          easing: Easing.inOut(Easing.ease),
          useNativeDriver: true,
        }),
      ]),
    );
    loop.start();
    return () => loop.stop();
  }, [randomIconActive, randomThrob]);

  useEffect(() => {
    const id = parseWordIdParam(params.wordId);
    if (id == null) return;
    const idx = TOEIC_WORDS.findIndex((w) => w.id === id);
    if (idx < 0) return;
    setRandomArmed(false);
    setShuffledOrder(null);
    setSlotIndex(idx);
    setFlipped(false);
  }, [params.wordId]);

  if (!word) return null;

  const pronunciationFocus = pronunciationFocusParts(word.difficulty);
  const pronunciationTypeExamples = useMemo(
    () =>
      TOEIC_WORDS.filter((w) => w.difficulty === word.difficulty)
        .filter((w) => w.id !== word.id)
        .slice(0, 7),
    [word.difficulty, word.id],
  );

  const jumpToWordId = (id: number) => {
    const idx = TOEIC_WORDS.findIndex((w) => w.id === id);
    if (idx < 0) return;
    setRandomArmed(false);
    setShuffledOrder(null);
    setSlotIndex(idx);
    setFlipped(false);
    setPronTypeExamplesOpen(false);
  };

  const onPrev = () => {
    setFlipped(false);
    setSlotIndex((s) => (s - 1 + WORD_COUNT) % WORD_COUNT);
  };

  const onNext = () => {
    setFlipped(false);
    if (randomArmed && !shuffleActive) {
      const shuffled = shuffleWordIndices();
      const currentWordIdx = slotIndex;
      const pos = shuffled.indexOf(currentWordIdx);
      const start = pos >= 0 ? pos : 0;
      setShuffledOrder(shuffled);
      setSlotIndex((start + 1) % WORD_COUNT);
      setRandomArmed(false);
      return;
    }
    setSlotIndex((s) => (s + 1) % WORD_COUNT);
  };

  const onRandomIconPress = () => {
    setFlipped(false);
    if (randomArmed || shuffleActive) {
      const naturalIdx = shuffleActive ? shuffledOrder![slotIndex]! : slotIndex;
      setRandomArmed(false);
      setShuffledOrder(null);
      setSlotIndex(naturalIdx);
    } else {
      setRandomArmed(true);
    }
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

  const handleAddHeadwordToPractice = () => {
    const already = useToeicPracticeStore.getState().isToeicWordInPracticeList(word.id);
    Alert.alert(
      'れんしゅうリストに追加？',
      `「${word.word}」を発音れんしゅうのリストにいれます。`,
      [
        { text: 'キャンセル', style: 'cancel' },
        {
          text: already ? '先頭に更新' : '追加する',
          onPress: () => {
            addCurrentToeicHeadword(word);
            Alert.alert(
              already ? '更新したよ' : '追加したよ',
              'れんしゅう一覧から「TOEIC 単語練習」をひらいてね。',
              [
                { text: 'OK' },
                { text: 'いまひらく', onPress: () => router.push(ROUTES.PRACTICE_TOEIC) },
              ],
            );
          },
        },
      ],
    );
  };

  const goHome = () => {
    router.replace(ROUTES.HOME);
  };

  return (
    <ScreenContainer contentStyle={styles.content} edges={['top', 'left', 'right', 'bottom']}>
      <Text style={styles.eyebrow}>TOEIC VOCAB + PRONUNCIATION</Text>
      <View style={styles.headerRow}>
        <Pressable
          onPress={goHome}
          style={({ pressed }) => [styles.homeIconHit, pressed && styles.navPressed]}
          accessibilityRole="button"
          accessibilityLabel="ホームへ たぶ"
        >
          <View style={styles.homeIconCircle}>
            <Ionicons name="home-outline" size={22} color={theme.colors.terracotta} />
          </View>
        </Pressable>
        <View style={styles.headerTitleWrap}>
          <Text style={styles.title}>TOEIC Words</Text>
        </View>
        <View style={styles.headerCounterCol}>
          <Pressable
            onPress={onRandomIconPress}
            style={({ pressed }) => [styles.randomIconHit, pressed && styles.navPressed]}
            accessibilityRole="button"
            accessibilityLabel={
              randomIconActive
                ? 'Turn off random order'
                : 'Arm random order — tap Next to jump shuffled'
            }
            accessibilityState={{ selected: randomIconActive }}
          >
            <Animated.View style={{ transform: [{ scale: randomThrob }] }}>
              <Ionicons
                name={randomIconActive ? 'shuffle' : 'shuffle-outline'}
                size={22}
                color={randomIconActive ? theme.colors.accentGoldDeep : theme.colors.textMuted}
              />
            </Animated.View>
          </Pressable>
          <Text style={styles.counter}>{progress}</Text>
        </View>
      </View>

      <View style={[styles.card, flipped && styles.cardFlipped]}>
        <View style={styles.wordHeadBlock}>
          <Text style={styles.word}>{word.word}</Text>
          {word.meaningJa ? <Text style={styles.meaning}>{word.meaningJa}</Text> : null}
        </View>
        <View style={styles.posRow}>
          <View style={styles.posColumn}>
            <Text style={styles.posText}>{formatPartOfSpeechLine(word.partOfSpeech)}</Text>
            {!flipped ? <Text style={styles.stress}>{word.stressHint}</Text> : null}
          </View>
          {!flipped ? (
            <Pressable
              style={({ pressed }) => [styles.badge, pressed && styles.navPressed]}
              onPress={() => setPronTypeExamplesOpen(true)}
              accessibilityRole="button"
              accessibilityLabel="Show pronunciation type examples"
            >
              <Text style={styles.badgeLineEn}>{pronunciationFocus.en}</Text>
              {pronunciationFocus.ja ? (
                <Text style={styles.badgeLineJa}>{pronunciationFocus.ja}</Text>
              ) : null}
            </Pressable>
          ) : null}
        </View>

        {!flipped ? (
          <>
            <View style={styles.listenRow}>
              <PrimaryButton
                label="Play"
                labelSuffixJa="ながす"
                labelStyle={styles.listenPlayLabel}
                labelJaStyle={styles.listenPlayLabelJa}
                onPress={() => {
                  recordHeadwordPlayback(word.id);
                  void speakEnglishWord(word.word, 'normal');
                }}
                flex={1}
              />
              <SecondaryButton
                label="Slow"
                labelSuffixJa="ゆっくり"
                labelStyle={styles.listenSlowLabel}
                labelJaStyle={styles.listenSlowLabelJaSame}
                onPress={() => {
                  recordHeadwordPlayback(word.id);
                  void speakEnglishWord(word.word, 'slow');
                }}
                flex={1}
              />
            </View>

            <View style={styles.recordBlock}>
              <View style={styles.recordRow}>
                <View style={styles.recordLeftCluster}>
                  {audio.status.isRecording ? (
                    <View style={styles.recordLeftTextBlock}>
                      <Text style={styles.tapLabel}>Tap to stop</Text>
                      <Text style={styles.tapLabelJa}>タップで録音停止</Text>
                    </View>
                  ) : audio.status.hasRecording ? (
                    <View style={styles.recordLeftTextBlock}>
                      <Animated.View style={{ transform: [{ scale: replayPop }] }}>
                        <Pressable
                          onPress={handleReplayRecording}
                          style={({ pressed }) => [styles.replayPill, pressed && styles.replayPressed]}
                          accessibilityRole="button"
                          accessibilityLabel="Play recording"
                        >
                          <Ionicons name="play" size={22} color={theme.colors.textSecondary} />
                        </Pressable>
                      </Animated.View>
                      <Text style={styles.tapLabelSecondary}>Tap to speak</Text>
                      <Text style={styles.tapLabelJaSecondary}>タップしていう</Text>
                    </View>
                  ) : (
                    <View style={styles.recordLeftTextBlock}>
                      <Text style={styles.tapLabel}>Tap to speak</Text>
                      <Text style={styles.tapLabelJa}>タップしていう</Text>
                    </View>
                  )}
                  <View style={styles.recordMicCluster}>
                    <RecordButton
                      isRecording={audio.status.isRecording}
                      onPress={toggleRecord}
                      disabled={!audio.status.audioReady}
                    />
                    <Pressable
                      onPress={handleAddHeadwordToPractice}
                      style={({ pressed }) => [styles.addPracticeOuter, pressed && styles.navPressed]}
                      accessibilityRole="button"
                      accessibilityLabel="Add this word to pronunciation practice list"
                    >
                      <View style={styles.addPracticeInner}>
                        <Ionicons name="add" size={28} color={theme.colors.terracotta} />
                      </View>
                      <Text style={styles.addPracticeCaption}>Add</Text>
                      <Text style={styles.addPracticeCaptionJa}>練習</Text>
                    </Pressable>
                  </View>
                </View>
                <View style={styles.recordRightSpacer}>
                  <View
                    style={[
                      styles.headwordStatsBox,
                      inPracticeList ? styles.headwordStatsBoxInList : styles.headwordStatsBoxNotInList,
                    ]}
                  >
                    <View style={styles.headwordStatsRow}>
                      <Ionicons
                        name={inPracticeList ? 'checkmark-circle' : 'ellipse-outline'}
                        size={15}
                        color={inPracticeList ? theme.colors.successOlive : theme.colors.practiceTerracotta}
                      />
                      <Text
                        style={[
                          styles.headwordStatsListText,
                          inPracticeList ? styles.headwordStatsListTextInList : styles.headwordStatsListTextNotInList,
                        ]}
                        numberOfLines={1}
                      >
                        {inPracticeList ? 'リスト済' : '未練習'}
                      </Text>
                    </View>
                    <Text style={styles.headwordStatsLine} numberOfLines={1}>
                      7日: {weeklyActivityCount}回
                    </Text>
                    <View style={styles.headwordStatsConfidenceBlock}>
                      <Text
                        style={[styles.headwordStatsLine, styles.headwordStatsConfidenceValue]}
                        numberOfLines={1}
                      >
                        自信{' '}
                        {displayConfidence != null ? `${displayConfidence}%` : '—'}
                      </Text>
                      {!hasPracticeScores && toeicId != null ? (
                        <View style={styles.headwordStatsStepper}>
                          <Pressable
                            onPress={() => adjustUserConfidence(toeicId, -5)}
                            style={({ pressed }) => [
                              styles.headwordStatsStepBtn,
                              inPracticeList ? styles.headwordStatsStepBtnInList : styles.headwordStatsStepBtnNotInList,
                              pressed && styles.navPressed,
                            ]}
                            hitSlop={6}
                            accessibilityRole="button"
                            accessibilityLabel="自信を下げる"
                          >
                            <Text style={styles.headwordStatsStepBtnText}>−</Text>
                          </Pressable>
                          <Pressable
                            onPress={() => adjustUserConfidence(toeicId, 5)}
                            style={({ pressed }) => [
                              styles.headwordStatsStepBtn,
                              inPracticeList ? styles.headwordStatsStepBtnInList : styles.headwordStatsStepBtnNotInList,
                              pressed && styles.navPressed,
                            ]}
                            hitSlop={6}
                            accessibilityRole="button"
                            accessibilityLabel="自信を上げる"
                          >
                            <Text style={styles.headwordStatsStepBtnText}>＋</Text>
                          </Pressable>
                        </View>
                      ) : null}
                    </View>
                    {hasPracticeScores ? (
                      <Text style={styles.headwordStatsHint} numberOfLines={2}>
                        れんしゅうスコアのへいきん
                      </Text>
                    ) : (
                      <Text style={styles.headwordStatsHint} numberOfLines={2}>
                        自己評価
                      </Text>
                    )}
                  </View>
                </View>
              </View>
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
                    もとどおり
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
                    ゆっくり
                  </Text>
                </Pressable>
              </View>
            </View>
            <View style={styles.phraseList}>
              {word.phrases.map((p, i) => (
                <View key={`${p.en}-${i}`} style={styles.phraseCardOuter}>
                  <View style={styles.chipBlock}>
                    <TapPopPressable
                      onPress={() => void speakEnglishPhraseSample(p.en, phraseEnglishMode)}
                      style={({ pressed }) => [pressed && styles.navPressed]}
                      contentStyle={styles.phraseEnRow}
                      accessibilityRole="button"
                      accessibilityLabel={`Speak English: ${p.en}`}
                    >
                      <Ionicons name="volume-medium" size={14} color={theme.colors.textMuted} style={styles.chipIcon} />
                      <Text style={styles.chipEn}>{p.en}</Text>
                    </TapPopPressable>
                    {p.ja ? (
                      <TapPopPressable
                        onPress={() => void speakJapaneseText(p.ja, phraseEnglishMode)}
                        style={({ pressed }) => [pressed && styles.navPressed]}
                        contentStyle={styles.phraseJaRow}
                        accessibilityRole="button"
                        accessibilityLabel={`日本語で読み上げ: ${p.ja}`}
                      >
                        <Ionicons name="language" size={14} color={theme.colors.accentGoldDeep} style={styles.chipIcon} />
                        <Text style={styles.chipJa}>{p.ja}</Text>
                      </TapPopPressable>
                    ) : null}
                  </View>
                </View>
              ))}
            </View>
            <PrimaryButton
              variant="blue"
              label="See meaning & tips"
              labelSuffixJa="いみとコツ"
              onPress={() => setFlipped(true)}
            />
          </>
        ) : (
          <View style={styles.backFaceStack}>
            {word.definitions.map((d, i) => (
              <View key={`def-${word.id}-${i}`} style={styles.backCardBlockInStack}>
                {d.trim() ? (
                  <Text style={[styles.body, styles.bodyBack]}>- {d}</Text>
                ) : null}
                {word.definitionsJa[i] ? (
                  <Text style={[styles.bodyJa, styles.bodyJaBack]}>{word.definitionsJa[i]}</Text>
                ) : null}
              </View>
            ))}
            <Text style={[styles.section, styles.sectionOnBack, styles.exampleSectionAfterDefinitions]}>
              Example れいぶん
            </Text>
            <View style={styles.backCardBlockInStack}>
              <View style={[styles.chipBlock, styles.exampleSentenceBlock, styles.chipBlockBack]}>
                <TapPopPressable
                  onPress={() => void speakEnglishPhraseSample(word.example, 'fast')}
                  style={({ pressed }) => [pressed && styles.navPressed]}
                  contentStyle={[styles.phraseEnRow, styles.phraseRowBack]}
                  accessibilityRole="button"
                  accessibilityLabel={`Speak English: ${word.example}`}
                >
                  <Ionicons name="volume-medium" size={14} color={theme.colors.textMuted} style={styles.chipIcon} />
                  <Text style={styles.chipEn}>{word.example}</Text>
                </TapPopPressable>
                {word.exampleJa ? (
                  <TapPopPressable
                    onPress={() => void speakJapaneseText(word.exampleJa, 'fast')}
                    style={({ pressed }) => [pressed && styles.navPressed]}
                    contentStyle={[styles.phraseJaRow, styles.phraseJaRowBack]}
                    accessibilityRole="button"
                    accessibilityLabel={`日本語で例文: ${word.exampleJa}`}
                  >
                    <Ionicons name="language" size={14} color={theme.colors.accentGoldDeep} style={styles.chipIcon} />
                    <Text style={styles.chipJa}>{word.exampleJa}</Text>
                  </TapPopPressable>
                ) : null}
              </View>
            </View>
            <Text style={[styles.section, styles.sectionOnBack]}>コツ</Text>
            <View style={[styles.tipCardFrame, styles.tipCardFrameBack]}>
              {word.tipJa ? (
                <Text style={[styles.body, styles.bodyBack, styles.tipTextInFrame]}>{word.tipJa}</Text>
              ) : null}
            </View>
            {word.antonyms.length > 0 ? (
              <View style={[styles.synAntPairedOuter, styles.synAntPairedOuterBack, styles.synAntAfterKotsu]}>
                <View style={styles.synAntTitleRow}>
                  <View style={styles.synAntHalf}>
                    <Text style={styles.synonymPanelTitleGreen}>Synonyms 類義語</Text>
                  </View>
                  <View style={styles.synAntHalf}>
                    <Text style={styles.antonymPanelTitlePink}>Antonyms 反義語</Text>
                  </View>
                </View>
                {Array.from(
                  { length: Math.max(word.synonyms.length, word.antonyms.length) },
                  (_, i) => (
                    <View key={`synant-pair-${i}`} style={styles.synAntPairedRow}>
                      <View style={[styles.synAntCellGreen, styles.synAntHalf, styles.synAntCellBack]}>
                        {i < word.synonyms.length ? (
                          <View style={[styles.synonymPairStackCompact, styles.synonymPairStackBack]}>
                            <TapPopPressable
                              onPress={() => void speakEnglishWord(word.synonyms[i]!, 'normal')}
                              style={({ pressed }) => [styles.synonymEnPressable, pressed && styles.navPressed]}
                              contentStyle={styles.synonymChipInner}
                              accessibilityRole="button"
                              accessibilityLabel={`Speak: ${word.synonyms[i]}`}
                            >
                              <Ionicons name="volume-medium" size={12} color={theme.colors.successOlive} />
                              <Text style={[styles.synonymChip, styles.synonymChipOnGreen]}>{word.synonyms[i]}</Text>
                            </TapPopPressable>
                            {word.synonymsJa[i] ? (
                              <TapPopPressable
                                onPress={() => void speakJapaneseText(word.synonymsJa[i]!, 'fast')}
                                style={({ pressed }) => [styles.synonymJaPressableStack, pressed && styles.navPressed]}
                                contentStyle={styles.synonymJaBelowEn}
                                accessibilityRole="button"
                                accessibilityLabel={`日本語: ${word.synonymsJa[i]}`}
                              >
                                <Ionicons name="language" size={12} color={theme.colors.successOlive} style={styles.synonymJaIconBelow} />
                                <Text style={[styles.synonymChipJa, styles.synonymChipJaOnGreen]}>{word.synonymsJa[i]}</Text>
                              </TapPopPressable>
                            ) : null}
                          </View>
                        ) : null}
                      </View>
                      <View style={[styles.synAntCellPink, styles.synAntHalf, styles.synAntCellBack]}>
                        {i < word.antonyms.length ? (
                          <View style={[styles.synonymPairStackCompact, styles.synonymPairStackBack]}>
                            <TapPopPressable
                              onPress={() => void speakEnglishWord(word.antonyms[i]!, 'normal')}
                              style={({ pressed }) => [styles.synonymEnPressable, pressed && styles.navPressed]}
                              contentStyle={styles.synonymChipInner}
                              accessibilityRole="button"
                              accessibilityLabel={`Speak: ${word.antonyms[i]}`}
                            >
                              <Ionicons name="volume-medium" size={12} color={theme.colors.practiceTerracotta} />
                              <Text style={[styles.synonymChip, styles.synonymChipOnPink]}>{word.antonyms[i]}</Text>
                            </TapPopPressable>
                            {word.antonymsJa[i] ? (
                              <TapPopPressable
                                onPress={() => void speakJapaneseText(word.antonymsJa[i]!, 'fast')}
                                style={({ pressed }) => [styles.synonymJaPressableStack, pressed && styles.navPressed]}
                                contentStyle={styles.synonymJaBelowEn}
                                accessibilityRole="button"
                                accessibilityLabel={`日本語: ${word.antonymsJa[i]}`}
                              >
                                <Ionicons name="language" size={12} color={theme.colors.practiceTerracotta} style={styles.synonymJaIconBelow} />
                                <Text style={[styles.synonymChipJa, styles.synonymChipJaOnPink]}>{word.antonymsJa[i]}</Text>
                              </TapPopPressable>
                            ) : null}
                          </View>
                        ) : null}
                      </View>
                    </View>
                  ),
                )}
              </View>
            ) : (
              <View style={[styles.synonymSectionWithPlainTitle, styles.synAntAfterKotsu]}>
                <Text style={styles.synonymPanelTitleGreen}>Synonyms 類義語</Text>
                <View
                  style={[
                    styles.synonymPanel,
                    styles.synonymPanelGreen,
                    styles.synonymPanelFullWidth,
                    styles.synonymPanelBack,
                  ]}
                >
                  <View style={[styles.synonymListInPanel, styles.synonymListInPanelBack]}>
                  {word.synonyms.map((s, i) => (
                    <View key={`syn-${i}-${s}`} style={[styles.synonymPairStack, styles.synonymPairStackBack]}>
                      <TapPopPressable
                        onPress={() => void speakEnglishWord(s, 'normal')}
                        style={({ pressed }) => [styles.synonymEnPressable, pressed && styles.navPressed]}
                        contentStyle={styles.synonymChipInner}
                        accessibilityRole="button"
                        accessibilityLabel={`Speak: ${s}`}
                      >
                        <Ionicons name="volume-medium" size={12} color={theme.colors.successOlive} />
                        <Text style={[styles.synonymChip, styles.synonymChipOnGreen]}>{s}</Text>
                      </TapPopPressable>
                      {word.synonymsJa[i] ? (
                        <TapPopPressable
                          onPress={() => void speakJapaneseText(word.synonymsJa[i]!, 'fast')}
                          style={({ pressed }) => [styles.synonymJaPressableStack, pressed && styles.navPressed]}
                          contentStyle={styles.synonymJaBelowEn}
                          accessibilityRole="button"
                          accessibilityLabel={`日本語: ${word.synonymsJa[i]}`}
                        >
                          <Ionicons name="language" size={12} color={theme.colors.successOlive} style={styles.synonymJaIconBelow} />
                          <Text style={[styles.synonymChipJa, styles.synonymChipJaOnGreen]}>{word.synonymsJa[i]}</Text>
                        </TapPopPressable>
                      ) : null}
                    </View>
                  ))}
                  </View>
                </View>
              </View>
            )}
            <PrimaryButton
              variant="blueLight"
              label="Back to word"
              labelSuffixJa="もどる"
              onPress={() => setFlipped(false)}
              style={styles.backToWordButton}
            />
          </View>
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
      <View style={{ height: Math.max(insets.bottom, theme.space.md) }} />

      <Modal
        visible={pronTypeExamplesOpen}
        transparent
        animationType="fade"
        onRequestClose={() => setPronTypeExamplesOpen(false)}
      >
        <View style={styles.pronTypeModalOverlay}>
          <Pressable
            style={styles.pronTypeModalBackdrop}
            onPress={() => setPronTypeExamplesOpen(false)}
            accessibilityRole="button"
            accessibilityLabel="Close pronunciation examples"
          />
          <View style={styles.pronTypeModalCard}>
            <View style={styles.pronTypeModalHeader}>
              <Text style={styles.pronTypeModalTitle}>Pronunciation Type Examples</Text>
              <Pressable
                onPress={() => setPronTypeExamplesOpen(false)}
                style={({ pressed }) => [styles.pronTypeModalClose, pressed && styles.navPressed]}
                accessibilityRole="button"
                accessibilityLabel="Close pronunciation type examples"
              >
                <Ionicons name="close" size={18} color={theme.colors.textSecondary} />
              </Pressable>
            </View>
            <Text style={styles.pronTypeModalSub}>
              {pronunciationFocus.en}
              {pronunciationFocus.ja ? ` · ${pronunciationFocus.ja}` : ''}
            </Text>
            <View style={styles.pronTypeExamplesList}>
              {pronunciationTypeExamples.map((ex) => (
                <Pressable
                  key={`pron-type-${ex.id}`}
                  onPress={() => jumpToWordId(ex.id)}
                  style={({ pressed }) => [styles.pronTypeExampleRow, pressed && styles.navPressed]}
                  accessibilityRole="button"
                  accessibilityLabel={`Go to ${ex.word}`}
                >
                  <Text style={styles.pronTypeExampleWord}>{ex.word}</Text>
                  <Text style={styles.pronTypeExampleMeaning} numberOfLines={1}>
                    {ex.meaningJa || ex.definitionsJa[0] || ex.definitions[0] || ''}
                  </Text>
                </Pressable>
              ))}
            </View>
          </View>
        </View>
      </Modal>
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
    alignItems: 'flex-end',
    gap: theme.space.sm,
    marginBottom: theme.space.xs,
  },
  homeIconHit: {
    padding: 2,
    marginBottom: 2,
  },
  homeIconCircle: {
    width: 44,
    height: 44,
    borderRadius: 22,
    backgroundColor: theme.colors.retrySoft,
    borderWidth: 1,
    borderColor: theme.colors.accentGold,
    alignItems: 'center',
    justifyContent: 'center',
  },
  headerTitleWrap: {
    flex: 1,
    minWidth: 0,
  },
  title: {
    fontFamily: theme.fontDisplay,
    fontSize: 28,
    color: theme.colors.text,
  },
  headerCounterCol: {
    flexShrink: 0,
    alignItems: 'flex-end',
    gap: 2,
  },
  randomIconHit: {
    paddingVertical: 2,
    paddingHorizontal: 4,
    marginBottom: -2,
  },
  counter: {
    fontSize: 13,
    fontWeight: '700',
    color: theme.colors.textMuted,
  },
  card: {
    backgroundColor: theme.colors.surfaceElevated,
    borderRadius: theme.radius.xl,
    borderWidth: 1,
    borderColor: theme.colors.borderSubtle,
    padding: theme.space.md,
    gap: theme.space.xs,
  },
  /** Tighter vertical rhythm when showing meaning / tips (back face). */
  cardFlipped: {
    gap: 2,
    paddingVertical: theme.space.sm,
    paddingHorizontal: theme.space.md,
  },
  backFaceStack: {
    width: '100%',
    gap: 3,
  },
  backCardBlockInStack: {
    gap: 1,
    marginBottom: 0,
  },
  sectionOnBack: {
    marginTop: 0,
  },
  /** Extra air between definition/meaning blocks and the example sentence. */
  exampleSectionAfterDefinitions: {
    marginTop: theme.space.md,
  },
  chipBlockBack: {
    paddingVertical: 1,
    paddingHorizontal: 9,
  },
  phraseRowBack: {
    paddingVertical: 2,
  },
  phraseJaRowBack: {
    paddingTop: 2,
    paddingBottom: 2,
  },
  bodyBack: {
    fontSize: 15,
    lineHeight: 19,
  },
  bodyJaBack: {
    fontSize: 12,
    lineHeight: 17,
  },
  tipCardFrameBack: {
    paddingVertical: theme.space.sm,
    paddingHorizontal: theme.space.sm,
    marginBottom: 0,
    gap: 6,
  },
  synAntPairedOuterBack: {
    marginTop: 0,
    marginBottom: 0,
    gap: 6,
  },
  /** Breathing room below コツ card before Synonyms / Antonyms. */
  synAntAfterKotsu: {
    marginTop: theme.space.md,
  },
  synAntCellBack: {
    paddingVertical: 8,
    paddingHorizontal: theme.space.sm,
    gap: 4,
  },
  synonymPairStackBack: {
    gap: 4,
    marginBottom: 0,
  },
  synonymPanelBack: {
    paddingVertical: 8,
    paddingHorizontal: theme.space.sm,
    gap: 6,
  },
  synonymListInPanelBack: {
    gap: 4,
  },
  backToWordButton: {
    minHeight: 40,
    paddingVertical: 6,
    marginTop: 2,
  },
  wordHeadBlock: {
    gap: 2,
    marginBottom: 0,
  },
  posRow: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    justifyContent: 'space-between',
    gap: 10,
    /** Clear headword descenders (g, p, y, j) — was overlapping when margin was negative-tight. */
    marginTop: theme.space.sm,
  },
  /** POS + stress stacked so stress stays tight under word-type; badge on the right only. */
  posColumn: {
    flex: 1,
    minWidth: 0,
    gap: 4,
  },
  badge: {
    flexShrink: 0,
    maxWidth: '46%',
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
    /** Slightly taller than font so descenders don’t crowd the line below. */
    lineHeight: 40,
    marginBottom: 0,
    paddingBottom: 0,
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
    lineHeight: 16,
    letterSpacing: 0,
  },
  meaning: {
    fontSize: 16,
    fontWeight: '700',
    color: theme.colors.text,
    marginTop: 0,
    marginBottom: 0,
    lineHeight: 20,
  },
  listenRow: {
    flexDirection: 'row',
    gap: theme.space.xs,
    marginVertical: theme.space.xs,
  },
  listenPlayLabel: {
    fontFamily: Platform.select({
      ios: 'System',
      android: 'sans-serif',
      default: 'sans-serif',
    }),
    fontSize: 15,
    fontWeight: '700',
  },
  listenPlayLabelJa: {
    fontFamily: Platform.select({
      ios: 'System',
      android: 'sans-serif',
      default: 'sans-serif',
    }),
    fontSize: 15,
    fontWeight: '400',
  },
  listenSlowLabel: {
    fontSize: 15,
    fontWeight: '700',
    color: theme.colors.text,
  },
  listenSlowLabelJaSame: {
    fontSize: 15,
    fontWeight: '400',
    color: theme.colors.text,
  },
  recordBlock: {
    marginVertical: 4,
    width: '100%',
  },
  recordRow: {
    flexDirection: 'row',
    alignItems: 'center',
    width: '100%',
    gap: theme.space.sm,
  },
  /** Tap copy + mic + add — grouped on the left; stats use remaining width on the right. */
  recordLeftCluster: {
    flexDirection: 'row',
    alignItems: 'center',
    flexShrink: 1,
    minWidth: 0,
    gap: 10,
  },
  recordLeftTextBlock: {
    gap: 2,
    alignItems: 'flex-start',
    flexShrink: 1,
    minWidth: 0,
  },
  recordMicCluster: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    flexShrink: 0,
  },
  addPracticeOuter: {
    alignItems: 'center',
    justifyContent: 'center',
    width: 64,
  },
  addPracticeInner: {
    width: 56,
    height: 56,
    borderRadius: 28,
    borderWidth: 2,
    borderColor: theme.colors.terracottaRing,
    backgroundColor: theme.colors.surfaceSoft,
    alignItems: 'center',
    justifyContent: 'center',
  },
  addPracticeCaption: {
    fontSize: 9,
    fontWeight: '700',
    color: theme.colors.textSecondary,
    marginTop: 2,
  },
  addPracticeCaptionJa: {
    fontSize: 9,
    color: theme.colors.textMuted,
  },
  recordRightSpacer: {
    flex: 1,
    minWidth: 84,
    flexDirection: 'row',
    justifyContent: 'flex-end',
    alignItems: 'stretch',
    paddingLeft: 2,
  },
  headwordStatsBox: {
    flexGrow: 1,
    width: '100%',
    /** Inner width still fits 「リスト済」 / 「未練習」 on one line (list label 10pt). */
    minWidth: 84,
    maxWidth: 102,
    borderWidth: 1,
    borderRadius: theme.radius.sm,
    paddingHorizontal: 5,
    paddingVertical: 5,
    gap: 3,
  },
  headwordStatsBoxInList: {
    backgroundColor: theme.colors.successSoft,
    borderColor: theme.colors.successOlive,
  },
  headwordStatsBoxNotInList: {
    backgroundColor: theme.colors.practiceSoft,
    borderColor: theme.colors.practiceTerracotta,
  },
  headwordStatsRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    alignSelf: 'stretch',
    gap: 2,
  },
  headwordStatsListText: {
    fontSize: 10,
    fontWeight: '700',
    flexShrink: 0,
    textAlign: 'center',
  },
  headwordStatsListTextInList: {
    color: theme.colors.successOlive,
  },
  headwordStatsListTextNotInList: {
    color: theme.colors.practiceTerracotta,
  },
  headwordStatsLine: {
    fontSize: 10,
    fontWeight: '600',
    color: theme.colors.textMuted,
    textAlign: 'center',
    alignSelf: 'stretch',
  },
  headwordStatsConfidenceValue: {
    fontSize: 12,
    fontWeight: '700',
    lineHeight: 16,
    color: theme.colors.textSecondary,
  },
  headwordStatsConfidenceBlock: {
    gap: 4,
    alignItems: 'center',
    alignSelf: 'stretch',
  },
  headwordStatsStepper: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
  },
  headwordStatsStepBtn: {
    minWidth: 22,
    paddingVertical: 2,
    paddingHorizontal: 6,
    borderRadius: 4,
    borderWidth: StyleSheet.hairlineWidth,
    backgroundColor: theme.colors.surfaceElevated,
  },
  headwordStatsStepBtnInList: {
    borderColor: theme.colors.successOlive,
  },
  headwordStatsStepBtnNotInList: {
    borderColor: theme.colors.practiceTerracotta,
  },
  headwordStatsStepBtnText: {
    fontSize: 12,
    fontWeight: '700',
    color: theme.colors.textSecondary,
    textAlign: 'center',
  },
  headwordStatsHint: {
    fontSize: 11,
    lineHeight: 15,
    fontWeight: '600',
    color: theme.colors.textMuted,
    textAlign: 'center',
    alignSelf: 'stretch',
  },
  tapLabel: {
    fontFamily: theme.fontDisplay,
    fontSize: 13,
    color: theme.colors.textSecondary,
  },
  tapLabelJa: {
    fontSize: 11,
    color: theme.colors.textMuted,
  },
  tapLabelSecondary: {
    fontFamily: theme.fontDisplay,
    fontSize: 12,
    color: theme.colors.textSecondary,
    marginTop: 4,
  },
  tapLabelJaSecondary: {
    fontSize: 10,
    color: theme.colors.textMuted,
  },
  replayPill: {
    alignSelf: 'flex-start',
    alignItems: 'center',
    justifyContent: 'center',
    minWidth: 44,
    minHeight: 44,
    paddingHorizontal: 10,
    borderRadius: theme.radius.pill,
    backgroundColor: theme.colors.surfaceSoft,
    borderWidth: 1,
    borderColor: theme.colors.borderSubtle,
  },
  replayPressed: {
    opacity: 0.8,
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
    paddingVertical: 3,
    backgroundColor: theme.colors.surfaceSoft,
  },
  exampleSentenceBlock: {
    backgroundColor: theme.colors.exampleSentenceSoft,
    borderColor: theme.colors.exampleSentenceBorder,
  },
  phraseEnRow: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    gap: 8,
    paddingVertical: 4,
    borderRadius: theme.radius.sm,
  },
  phraseJaRow: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    gap: 8,
    paddingTop: 4,
    paddingBottom: 4,
    marginTop: 0,
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
    fontSize: 15,
    color: '#000000',
    lineHeight: 21,
    minWidth: 0,
  },
  chipJa: {
    flex: 1,
    fontSize: 13,
    fontWeight: '600',
    color: '#000000',
    lineHeight: 19,
    minWidth: 0,
  },
  synonymList: {
    width: '100%',
    alignSelf: 'stretch',
  },
  synAntPairedOuter: {
    width: '100%',
    marginTop: 4,
    marginBottom: 4,
    gap: theme.space.sm,
  },
  synAntPairedRow: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    gap: theme.space.sm,
    width: '100%',
  },
  /** Column titles only — no bordered “pill” behind Synonyms / Antonyms labels. */
  synAntTitleRow: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    gap: theme.space.sm,
    width: '100%',
    paddingBottom: 2,
  },
  synonymSectionWithPlainTitle: {
    width: '100%',
    alignSelf: 'stretch',
    gap: 6,
  },
  synAntHalf: {
    flex: 1,
    minWidth: 0,
  },
  synAntCellGreen: {
    borderRadius: theme.radius.md,
    borderWidth: 1,
    paddingHorizontal: theme.space.sm,
    paddingVertical: theme.space.sm,
    gap: 8,
    backgroundColor: theme.colors.successSoft,
    borderColor: theme.colors.successOlive,
  },
  synAntCellPink: {
    borderRadius: theme.radius.md,
    borderWidth: 1,
    paddingHorizontal: theme.space.sm,
    paddingVertical: theme.space.sm,
    gap: 8,
    backgroundColor: theme.colors.practiceSoft,
    borderColor: theme.colors.practiceTerracotta,
  },
  synonymPairStackCompact: {
    flexDirection: 'column',
    alignItems: 'flex-start',
    width: '100%',
    gap: 6,
  },
  synonymPanel: {
    flex: 1,
    minWidth: 0,
    borderRadius: theme.radius.md,
    borderWidth: 1,
    paddingHorizontal: theme.space.sm,
    paddingVertical: theme.space.sm,
    gap: 8,
  },
  synonymPanelFullWidth: {
    flex: 0,
    width: '100%',
    alignSelf: 'stretch',
  },
  synonymPanelGreen: {
    backgroundColor: theme.colors.successSoft,
    borderColor: theme.colors.successOlive,
  },
  synonymPanelTitleGreen: {
    fontSize: 10,
    fontWeight: '700',
    letterSpacing: 0.8,
    color: theme.colors.successOlive,
    textTransform: 'uppercase',
  },
  antonymPanelTitlePink: {
    fontSize: 10,
    fontWeight: '700',
    letterSpacing: 0.8,
    color: theme.colors.practiceTerracotta,
    textTransform: 'uppercase',
  },
  synonymListInPanel: {
    width: '100%',
    alignSelf: 'stretch',
  },
  synonymChipOnGreen: {
    borderColor: theme.colors.successOlive,
    backgroundColor: theme.colors.surfaceElevated,
  },
  synonymChipJaOnGreen: {
    color: theme.colors.textSecondary,
  },
  synonymChipOnPink: {
    borderColor: theme.colors.practiceTerracotta,
    backgroundColor: theme.colors.surfaceElevated,
  },
  synonymChipJaOnPink: {
    color: theme.colors.textSecondary,
  },
  synonymPairStack: {
    flexDirection: 'column',
    alignItems: 'flex-start',
    width: '100%',
    marginBottom: 12,
    gap: 6,
  },
  synonymEnPressable: {
    flexShrink: 0,
    borderRadius: 999,
  },
  synonymChipInner: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
  },
  synonymChip: {
    fontSize: 13,
    color: theme.colors.text,
    borderWidth: 1,
    borderColor: theme.colors.borderSubtle,
    borderRadius: 999,
    paddingHorizontal: 8,
    paddingVertical: 4,
    backgroundColor: theme.colors.surfaceSoft,
  },
  synonymJaPressableStack: {
    alignSelf: 'stretch',
    width: '100%',
    minWidth: 0,
    paddingTop: 0,
    paddingLeft: 2,
  },
  synonymJaBelowEn: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    gap: 6,
    width: '100%',
    minWidth: 0,
  },
  synonymJaIconBelow: {
    marginTop: 1,
    flexShrink: 0,
  },
  synonymChipJa: {
    flex: 1,
    flexShrink: 1,
    fontSize: 12,
    lineHeight: 16,
    fontWeight: '600',
    color: theme.colors.text,
    minWidth: 0,
  },
  tipCardFrame: {
    width: '100%',
    alignSelf: 'stretch',
    borderWidth: 1,
    borderColor: theme.colors.borderSubtle,
    borderRadius: theme.radius.md,
    paddingHorizontal: theme.space.sm,
    paddingVertical: theme.space.sm,
    backgroundColor: theme.colors.surfaceSoft,
    overflow: 'hidden',
    marginBottom: 6,
    gap: 8,
  },
  tipTextInFrame: {
    width: '100%',
    maxWidth: '100%',
  },
  backCardBlock: {
    gap: 2,
    marginBottom: 6,
  },
  body: {
    fontSize: 15,
    lineHeight: 21,
    color: theme.colors.textSecondary,
  },
  bodyJa: {
    fontSize: 13,
    lineHeight: 19,
    fontWeight: '600',
    color: theme.colors.textMuted,
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
  pronTypeModalOverlay: {
    flex: 1,
    justifyContent: 'center',
    padding: theme.space.lg,
  },
  pronTypeModalBackdrop: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: 'rgba(0,0,0,0.28)',
  },
  pronTypeModalCard: {
    backgroundColor: theme.colors.surfaceElevated,
    borderRadius: theme.radius.lg,
    borderWidth: 1,
    borderColor: theme.colors.border,
    padding: theme.space.md,
    gap: theme.space.xs,
    maxHeight: '72%',
  },
  pronTypeModalTitle: {
    fontSize: 15,
    fontWeight: '700',
    color: theme.colors.text,
  },
  pronTypeModalHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    gap: 8,
  },
  pronTypeModalClose: {
    width: 30,
    height: 30,
    borderRadius: 15,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: theme.colors.surfaceSoft,
    borderWidth: 1,
    borderColor: theme.colors.borderSubtle,
  },
  pronTypeModalSub: {
    fontSize: 12,
    color: theme.colors.textMuted,
    marginBottom: 4,
  },
  pronTypeExamplesList: {
    gap: 6,
  },
  pronTypeExampleRow: {
    paddingHorizontal: 10,
    paddingVertical: 8,
    borderRadius: theme.radius.sm,
    borderWidth: 1,
    borderColor: theme.colors.borderSubtle,
    backgroundColor: theme.colors.surfaceSoft,
  },
  pronTypeExampleWord: {
    fontSize: 14,
    fontWeight: '700',
    color: theme.colors.text,
  },
  pronTypeExampleMeaning: {
    marginTop: 2,
    fontSize: 12,
    color: theme.colors.textSecondary,
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
