/**
 * Native TOEIC word card (preview / embeddable). Production full-screen flow:
 * `src/features/toeic/screens/ToeicVocabScreen.tsx`.
 */
import { Ionicons } from '@expo/vector-icons';
import { useState } from 'react';
import { Pressable, ScrollView, StyleSheet, Text, View } from 'react-native';

import RecordButton from '@/src/components/ui/RecordButton';
import { TOEIC_WORDS } from '@/src/data/toeicWords';
import { useAudioPractice } from '@/src/features/practice/hooks/useAudioPractice';
import { speakEnglishHeadword } from '@/src/services/audio/referenceSpeech';
import { theme } from '@/src/theme/pronunciationTheme';

export default function TOEICVocabCard() {
  const [index, setIndex] = useState(0);
  const [flipped, setFlipped] = useState(false);
  const word = TOEIC_WORDS[index] ?? TOEIC_WORDS[0]!;
  const [recordedUri, setRecordedUri] = useState<string | null>(null);
  const audio = useAudioPractice(recordedUri);

  const onPrev = () => {
    setFlipped(false);
    setRecordedUri(null);
    setIndex((i) => (i - 1 + TOEIC_WORDS.length) % TOEIC_WORDS.length);
  };

  const onNext = () => {
    setFlipped(false);
    setRecordedUri(null);
    setIndex((i) => (i + 1) % TOEIC_WORDS.length);
  };

  const toggleRecord = async () => {
    if (audio.status.isRecording) {
      const uri = await audio.stopRecording();
      setRecordedUri(uri);
    } else {
      try {
        await audio.startRecording();
      } catch {
        /* permission handled in full app via Alert */
      }
    }
  };

  return (
    <ScrollView style={styles.shell} contentContainerStyle={styles.shellContent}>
      <Text style={styles.eyebrow}>TOEIC · Native preview</Text>
      <View style={styles.headerRow}>
        <Text style={styles.counter}>
          {index + 1} / {TOEIC_WORDS.length}
        </Text>
      </View>

      <View style={[styles.card, flipped && styles.cardFlipped]}>
        {!flipped ? (
          <>
            <Text style={styles.word}>{word.word}</Text>
            <Text style={styles.stress}>{word.stressHint}</Text>
            <View style={styles.listenRow}>
              <Pressable
                style={({ pressed }) => [styles.listenBtn, pressed && styles.pressed]}
                onPress={() => void speakEnglishHeadword(word.word, 'normal', word.stressHint)}
              >
                <Ionicons name="play" size={18} color={theme.colors.darkCard} />
                <Text style={styles.listenBtnText}>Play</Text>
              </Pressable>
              <Pressable
                style={({ pressed }) => [styles.listenBtn, styles.listenBtnSlow, pressed && styles.pressed]}
                onPress={() => void speakEnglishHeadword(word.word, 'slow', word.stressHint)}
              >
                <Text style={styles.listenBtnText}>Slow</Text>
              </Pressable>
            </View>
            <View style={styles.recordRow}>
              <RecordButton
                isRecording={audio.status.isRecording}
                onPress={() => void toggleRecord()}
                disabled={!audio.status.audioReady}
              />
              <Text style={styles.hint}>Tap mic · expo-audio</Text>
            </View>
            <Pressable style={({ pressed }) => [styles.flipBtn, pressed && styles.pressed]} onPress={() => setFlipped(true)}>
              <Text style={styles.flipBtnText}>Meaning &amp; tips →</Text>
            </Pressable>
          </>
        ) : (
          <>
            <Text style={styles.backWord}>{word.word}</Text>
            {word.definitions.map((d, i) => (
              <Text key={`d-${i}`} style={styles.def}>
                {d.trim() ? `- ${d}` : ''}
                {word.definitionsJa[i] ? `\n${word.definitionsJa[i]}` : ''}
              </Text>
            ))}
            <Pressable style={({ pressed }) => [styles.flipBtn, pressed && styles.pressed]} onPress={() => setFlipped(false)}>
              <Text style={styles.flipBtnText}>← Back</Text>
            </Pressable>
          </>
        )}
      </View>

      <View style={styles.navRow}>
        <Pressable style={({ pressed }) => [styles.navBtn, pressed && styles.pressed]} onPress={onPrev}>
          <Text style={styles.navText}>Prev</Text>
        </Pressable>
        <Pressable style={({ pressed }) => [styles.navBtn, styles.navBtnPrimary, pressed && styles.pressed]} onPress={onNext}>
          <Text style={styles.navTextPrimary}>Next</Text>
        </Pressable>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  shell: {
    alignSelf: 'stretch',
    maxHeight: 520,
  },
  shellContent: {
    paddingBottom: theme.space.md,
    gap: theme.space.sm,
  },
  eyebrow: {
    fontSize: 10,
    fontWeight: '700',
    letterSpacing: 1.2,
    color: theme.colors.textMuted,
  },
  headerRow: {
    flexDirection: 'row',
    justifyContent: 'flex-end',
  },
  counter: {
    fontSize: 12,
    fontWeight: '700',
    color: theme.colors.textMuted,
  },
  card: {
    backgroundColor: theme.colors.surfaceElevated,
    borderRadius: theme.radius.lg,
    borderWidth: 1,
    borderColor: theme.colors.borderSubtle,
    padding: theme.space.md,
    gap: theme.space.sm,
  },
  cardFlipped: {
    gap: theme.space.xs,
  },
  word: {
    fontFamily: theme.fontDisplay,
    fontSize: 32,
    color: theme.colors.text,
  },
  stress: {
    fontSize: 16,
    fontStyle: 'italic',
    color: theme.colors.textSecondary,
  },
  listenRow: {
    flexDirection: 'row',
    gap: theme.space.xs,
  },
  listenBtn: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 6,
    paddingVertical: 10,
    borderRadius: theme.radius.md,
    backgroundColor: theme.colors.accentGold,
  },
  listenBtnSlow: {
    backgroundColor: theme.colors.surfaceSoft,
    borderWidth: 1,
    borderColor: theme.colors.border,
  },
  listenBtnText: {
    fontSize: 15,
    fontWeight: '700',
    color: theme.colors.darkCard,
  },
  recordRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: theme.space.sm,
  },
  hint: {
    flex: 1,
    fontSize: 12,
    color: theme.colors.textMuted,
  },
  flipBtn: {
    alignSelf: 'flex-start',
    paddingVertical: 6,
  },
  flipBtnText: {
    fontSize: 14,
    fontWeight: '700',
    color: theme.colors.accentGoldDeep,
  },
  backWord: {
    fontFamily: theme.fontDisplay,
    fontSize: 20,
    color: theme.colors.text,
  },
  def: {
    fontSize: 14,
    lineHeight: 20,
    color: theme.colors.textSecondary,
  },
  navRow: {
    flexDirection: 'row',
    gap: theme.space.xs,
  },
  navBtn: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    minHeight: 44,
    borderRadius: theme.radius.md,
    borderWidth: 1,
    borderColor: theme.colors.borderSubtle,
    backgroundColor: theme.colors.surfaceSoft,
  },
  navBtnPrimary: {
    borderColor: theme.colors.accentGold,
    backgroundColor: theme.colors.accentGold,
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
  pressed: {
    opacity: 0.88,
  },
});
