import { router, useLocalSearchParams } from 'expo-router';
import { ScrollView, StyleSheet, Text, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import AppButton from '@/src/components/common/AppButton';
import ScreenHeader from '@/src/components/common/ScreenHeader';
import AttemptScoreCard from '@/src/components/practice/AttemptScoreCard';
import MouthCoachCard from '@/src/components/practice/MouthCoachCard';
import RecordingPanel from '@/src/components/practice/RecordingPanel';
import SoundBlockChip from '@/src/components/practice/SoundBlockChip';
import WordHeroCard from '@/src/components/practice/WordHeroCard';
import WrongCorrectCard from '@/src/components/practice/WrongCorrectCard';
import { colors } from '@/src/constants/colors';
import { ROUTES } from '@/src/constants/routes';
import { usePracticeSession } from '@/src/features/practice/hooks/usePracticeSession';

export default function PracticeScreen() {
  const params = useLocalSearchParams<{ lessonId?: string }>();
  const lessonId = params.lessonId ?? 'lesson-01';

  const {
    currentWord,
    currentIndex,
    words,
    progressLabel,
    isRecording,
    selectedBlockId,
    feedback,
    playNormal,
    playSlow,
    selectBlock,
    startRecording,
    stopRecording,
    nextWord,
    previousWord,
  } = usePracticeSession(lessonId);

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
          sayItLike={currentWord.sayItLike}
          onPlay={playNormal}
          onSlow={playSlow}
        />

        {!!currentWord.soundBlocks?.length && (
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>音のかたまり</Text>
            <Text style={styles.sectionBody}>
              1つずつ押して、音の形を分けてつかもう。
            </Text>

            <View style={styles.blocksWrap}>
              {currentWord.soundBlocks.map((block) => (
                <SoundBlockChip
                  key={block.id}
                  label={block.label}
                  hint={block.hint}
                  selected={selectedBlockId === block.id}
                  onPress={() => selectBlock(block.id, block.label, block.hint)}
                />
              ))}
            </View>
          </View>
        )}

        <WrongCorrectCard
          avoidGuide={currentWord.avoidGuide}
          sayItLike={currentWord.sayItLike}
        />

        <MouthCoachCard mouthTipJa={currentWord.mouthTipJa} />

        <RecordingPanel
          isRecording={isRecording}
          onStart={startRecording}
          onStop={stopRecording}
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
    padding: 20,
    gap: 16,
    paddingBottom: 32,
  },
  section: {
    backgroundColor: colors.surface,
    borderRadius: 24,
    padding: 18,
    borderWidth: 1,
    borderColor: colors.border,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: '800',
    color: colors.text,
    marginBottom: 8,
  },
  sectionBody: {
    fontSize: 15,
    lineHeight: 22,
    color: colors.textSoft,
    marginBottom: 14,
  },
  blocksWrap: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 10,
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
    padding: 20,
    alignItems: 'center',
    justifyContent: 'center',
    gap: 16,
    backgroundColor: colors.background,
  },
  emptyTitle: {
    fontSize: 22,
    fontWeight: '800',
    color: colors.text,
  },
});
