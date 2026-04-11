import { Ionicons } from '@expo/vector-icons';
import { useRef } from 'react';
import { ActivityIndicator, Animated, Pressable, StyleSheet, Text, View } from 'react-native';

import RecordButton from './RecordButton';
import { theme, typography } from '@/src/theme/pronunciationTheme';

type PromptCardProps = {
  word: string;
  meaningJa?: string;
  onListen: () => void;
  isRecording: boolean;
  onRecordPress: () => void;
  recordDisabled?: boolean;
  hasRecording?: boolean;
  onReplayRecording?: () => void;
  /** After replay + TTS comparison (practice screen). */
  clarityScore?: number | null;
  clarityLabelJa?: string | null;
  clarityBusy?: boolean;
};

export default function PromptCard({
  word,
  meaningJa,
  onListen,
  isRecording,
  onRecordPress,
  recordDisabled,
  hasRecording,
  onReplayRecording,
  clarityScore,
  clarityLabelJa,
  clarityBusy,
}: PromptCardProps) {
  const replayPop = useRef(new Animated.Value(1)).current;

  const handleReplay = () => {
    if (onReplayRecording) {
      Animated.sequence([
        Animated.timing(replayPop, { toValue: 1.14, duration: 110, useNativeDriver: true }),
        Animated.timing(replayPop, { toValue: 1, duration: 140, useNativeDriver: true }),
      ]).start();
      onReplayRecording();
    }
  };

  return (
    <View style={styles.card}>
      <Text
        style={typography.wordHero}
        numberOfLines={1}
        adjustsFontSizeToFit
        minimumFontScale={0.45}
      >
        {word}
      </Text>
      {meaningJa ? <Text style={styles.meaning}>{meaningJa}</Text> : null}

      <View style={styles.iconRow}>
        <Pressable
          onPress={onListen}
          style={({ pressed }) => [pressed && styles.playPressed]}
          accessibilityRole="button"
          accessibilityLabel="Listen first"
        >
          <View style={styles.playInner}>
            <Ionicons name="play" size={22} color={theme.colors.darkCard} style={styles.playIcon} />
          </View>
        </Pressable>

        <RecordButton
          compact
          isRecording={isRecording}
          onPress={onRecordPress}
          disabled={recordDisabled}
        />

        {hasRecording && onReplayRecording ? (
          <Animated.View style={{ transform: [{ scale: replayPop }] }}>
            <Pressable
              onPress={handleReplay}
              style={({ pressed }) => [styles.replayPill, pressed && styles.replayPressed]}
              accessibilityRole="button"
              accessibilityLabel="Play recording"
            >
              <Ionicons name="play" size={22} color={theme.colors.textSecondary} />
            </Pressable>
          </Animated.View>
        ) : null}

        {hasRecording ? (
          <View style={styles.clarityBlock} accessibilityLabel="Clarity vs reference">
            <Text style={styles.clarityEyebrow}>CLARITY</Text>
            {clarityBusy ? (
              <ActivityIndicator size="small" color={theme.colors.accentGold} style={styles.claritySpinner} />
            ) : clarityScore != null ? (
              <Text style={styles.clarityScoreText}>{Math.round(clarityScore)}%</Text>
            ) : (
              <Text style={styles.clarityDash}>—</Text>
            )}
            {clarityLabelJa ? (
              <Text style={styles.claritySubJa} numberOfLines={2}>
                {clarityLabelJa}
              </Text>
            ) : null}
          </View>
        ) : null}
      </View>

      <Text style={styles.listenHint}>
        Listen first
        <Text style={styles.listenHintJa}> まずきく</Text>
      </Text>
      <Text style={styles.tapLabel}>
        {isRecording ? (
          <>
            Tap to stop
            <Text style={styles.tapLabelJa}> タップで録音停止</Text>
          </>
        ) : (
          <>
            Tap to speak
            <Text style={styles.tapLabelJa}> タップしていう</Text>
          </>
        )}
      </Text>
    </View>
  );
}

const styles = StyleSheet.create({
  card: {
    backgroundColor: theme.colors.darkCard,
    borderRadius: theme.radius.xl,
    paddingHorizontal: theme.space.md,
    paddingVertical: theme.space.lg,
    alignItems: 'center',
  },
  meaning: {
    fontSize: 13,
    color: theme.colors.darkCardMuted,
    marginTop: theme.space.md,
    marginBottom: theme.space.sm,
  },
  iconRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    flexWrap: 'wrap',
    gap: theme.space.md,
    marginTop: theme.space.xs,
  },
  playPressed: {
    opacity: 0.85,
    transform: [{ scale: 0.98 }],
  },
  playInner: {
    width: 64,
    height: 64,
    borderRadius: 32,
    backgroundColor: theme.colors.accentGold,
    alignItems: 'center',
    justifyContent: 'center',
  },
  playIcon: {
    marginLeft: 3,
  },
  replayPill: {
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
  clarityBlock: {
    alignItems: 'center',
    justifyContent: 'center',
    minWidth: 72,
    maxWidth: 104,
    paddingHorizontal: 4,
  },
  clarityEyebrow: {
    fontSize: 9,
    fontWeight: '700',
    letterSpacing: 1.2,
    color: theme.colors.darkCardMuted,
    marginBottom: 2,
  },
  clarityScoreText: {
    fontFamily: theme.fontDisplay,
    fontSize: 20,
    fontWeight: '600',
    color: theme.colors.accentGold,
  },
  clarityDash: {
    fontFamily: theme.fontDisplay,
    fontSize: 18,
    color: theme.colors.darkCardMuted,
  },
  claritySpinner: {
    marginVertical: 4,
  },
  claritySubJa: {
    fontSize: 9,
    fontWeight: '600',
    color: theme.colors.darkCardMuted,
    textAlign: 'center',
    marginTop: 2,
    lineHeight: 12,
  },
  listenHint: {
    marginTop: theme.space.sm,
    fontFamily: theme.fontDisplay,
    fontSize: 16,
    color: theme.colors.darkCardMuted,
  },
  listenHintJa: {
    fontSize: 11,
    fontWeight: '600',
    letterSpacing: 0,
  },
  tapLabel: {
    marginTop: theme.space.xs,
    fontFamily: theme.fontDisplay,
    fontSize: 13,
    color: theme.colors.darkCardMuted,
    textAlign: 'center',
  },
  tapLabelJa: {
    fontSize: 11,
    fontWeight: '600',
    color: theme.colors.darkCardMuted,
  },
});
