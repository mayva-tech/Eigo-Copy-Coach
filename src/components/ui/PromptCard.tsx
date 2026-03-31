import { Ionicons } from '@expo/vector-icons';
import { Pressable, StyleSheet, Text, View } from 'react-native';

import { theme, typography } from '@/src/theme/pronunciationTheme';

type PromptCardProps = {
  word: string;
  meaningJa?: string;
  onListen: () => void;
};

export default function PromptCard({ word, meaningJa, onListen }: PromptCardProps) {
  return (
    <View style={styles.card}>
      <Text style={styles.label}>
        SAY THIS WORD
        <Text style={styles.labelJa}> この単語を言う</Text>
      </Text>
      <Text
        style={typography.wordHero}
        numberOfLines={1}
        adjustsFontSizeToFit
        minimumFontScale={0.45}
      >
        {word}
      </Text>
      {meaningJa ? <Text style={styles.meaning}>{meaningJa}</Text> : null}

      <Pressable
        onPress={onListen}
        style={({ pressed }) => [styles.playOuter, pressed && styles.playPressed]}
        accessibilityRole="button"
        accessibilityLabel="Listen first"
      >
        <View style={styles.playInner}>
          <Ionicons name="play" size={22} color={theme.colors.darkCard} style={styles.playIcon} />
        </View>
      </Pressable>
      <Text style={styles.listenHint}>
        Listen first
        <Text style={styles.listenHintJa}> まず聞く</Text>
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
  label: {
    fontFamily: theme.fontDisplay,
    fontSize: 10,
    letterSpacing: 2.2,
    color: theme.colors.darkCardMuted,
    marginBottom: theme.space.sm,
    textTransform: 'uppercase',
  },
  labelJa: {
    fontSize: 11,
    fontWeight: '600',
    letterSpacing: 0,
    textTransform: 'none',
  },
  meaning: {
    fontSize: 13,
    color: theme.colors.darkCardMuted,
    marginTop: -theme.space.xs,
    marginBottom: theme.space.sm,
  },
  playOuter: {
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
  listenHint: {
    marginTop: theme.space.xs,
    fontFamily: theme.fontDisplay,
    fontSize: 16,
    color: theme.colors.darkCardMuted,
  },
  listenHintJa: {
    fontSize: 11,
    fontWeight: '600',
    letterSpacing: 0,
  },
});
