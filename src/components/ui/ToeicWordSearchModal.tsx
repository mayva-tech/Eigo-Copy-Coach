import { Ionicons } from '@expo/vector-icons';
import { useEffect, useMemo, useRef, useState } from 'react';
import {
  FlatList,
  KeyboardAvoidingView,
  Modal,
  Platform,
  Pressable,
  StyleSheet,
  Text,
  TextInput,
  View,
} from 'react-native';

import { formatPartOfSpeechLine } from '@/src/data/partOfSpeechJa';
import type { ToeicWord } from '@/src/data/toeicWordTypes';
import { TOEIC_WORDS } from '@/src/data/toeicWords';
import { theme } from '@/src/theme/pronunciationTheme';

const MAX_SUGGESTIONS = 28;

function isSubsequence(needle: string, haystack: string): boolean {
  let i = 0;
  for (let j = 0; j < haystack.length && i < needle.length; j++) {
    if (needle[i] === haystack[j]) i += 1;
  }
  return i === needle.length;
}

function levenshtein(a: string, b: string): number {
  if (a === b) return 0;
  if (a.length === 0) return b.length;
  if (b.length === 0) return a.length;
  const prev = Array.from({ length: b.length + 1 }, (_, i) => i);
  const curr = new Array<number>(b.length + 1);
  for (let i = 1; i <= a.length; i++) {
    curr[0] = i;
    for (let j = 1; j <= b.length; j++) {
      const cost = a[i - 1] === b[j - 1] ? 0 : 1;
      curr[j] = Math.min(
        prev[j] + 1,
        curr[j - 1] + 1,
        prev[j - 1] + cost,
      );
    }
    for (let j = 0; j <= b.length; j++) prev[j] = curr[j]!;
  }
  return prev[b.length]!;
}

function matchScore(headword: string, definitions: string[], queryLower: string): number {
  const w = headword.toLowerCase();
  const defs = definitions.map((d) => d.toLowerCase());
  if (!queryLower) return 0;
  if (w === queryLower) return 10_000;
  if (w.startsWith(queryLower)) return 5000 - w.length;
  const i = w.indexOf(queryLower);
  if (i >= 0) return 2000 - i * 10 - w.length * 0.01;

  // Typo-tolerant fallback on headword for short/near spellings (e.g. "acomodate").
  if (queryLower.length >= 3) {
    const dist = levenshtein(queryLower, w);
    const allow = Math.max(1, Math.floor(queryLower.length / 4));
    if (dist <= allow) return 1200 - dist * 120 - w.length * 0.01;
    if (isSubsequence(queryLower, w)) return 900 - w.length * 0.01;
  }

  // Also match by English definition text.
  for (const d of defs) {
    if (d.includes(queryLower)) return 700;
  }

  return 0;
}

type ToeicWordSearchModalProps = {
  visible: boolean;
  onClose: () => void;
  /** Called with TOEIC card `id` (not array index). */
  onSelectWordId: (id: number) => void;
};

export default function ToeicWordSearchModal({ visible, onClose, onSelectWordId }: ToeicWordSearchModalProps) {
  const [query, setQuery] = useState('');
  const inputRef = useRef<TextInput>(null);

  useEffect(() => {
    if (!visible) {
      setQuery('');
      return;
    }
    const t = setTimeout(() => inputRef.current?.focus(), 80);
    return () => clearTimeout(t);
  }, [visible]);

  const suggestions = useMemo(() => {
    const q = query.trim().toLowerCase();
    if (q.length === 0) return [];
    const rows: { w: ToeicWord; score: number }[] = [];
    for (const w of TOEIC_WORDS) {
      const score = matchScore(w.word, w.definitions, q);
      if (score > 0) rows.push({ w, score });
    }
    rows.sort((a, b) => b.score - a.score || a.w.word.localeCompare(b.w.word));
    return rows.slice(0, MAX_SUGGESTIONS).map((r) => r.w);
  }, [query]);

  const pick = (id: number) => {
    onSelectWordId(id);
    onClose();
  };

  return (
    <Modal visible={visible} animationType="fade" transparent onRequestClose={onClose}>
      <KeyboardAvoidingView
        style={styles.overlay}
        behavior={Platform.OS === 'ios' ? 'padding' : undefined}
      >
        <Pressable style={styles.backdrop} onPress={onClose} accessibilityRole="button" accessibilityLabel="Close search" />
        <View style={styles.sheet} accessibilityViewIsModal>
          <View style={styles.header}>
            <View style={styles.headerText}>
              <Text style={styles.title}>Search word</Text>
              <Text style={styles.titleJa}>TOEIC 単語を検索</Text>
            </View>
            <Pressable
              onPress={onClose}
              hitSlop={12}
              style={({ pressed }) => [styles.closeBtn, pressed && styles.closeBtnPressed]}
              accessibilityRole="button"
              accessibilityLabel="Close"
            >
              <Ionicons name="close" size={24} color={theme.colors.text} />
            </Pressable>
          </View>

          <View style={styles.inputRow}>
            <Ionicons name="search" size={18} color={theme.colors.textMuted} style={styles.searchIcon} />
            <TextInput
              ref={inputRef}
              value={query}
              onChangeText={setQuery}
              placeholder="Type a headword…"
              placeholderTextColor={theme.colors.textMuted}
              autoCapitalize="none"
              autoCorrect={false}
              {...(Platform.OS === 'ios' ? { clearButtonMode: 'while-editing' as const } : {})}
              style={styles.input}
              returnKeyType="search"
            />
          </View>

          <FlatList
            data={suggestions}
            keyExtractor={(item) => `toeic-${item.id}`}
            keyboardShouldPersistTaps="handled"
            style={styles.list}
            contentContainerStyle={styles.listContent}
            ListEmptyComponent={
              <Text style={styles.empty}>
                {query.trim().length === 0
                  ? '入力すると候補が表示されます。'
                  : '一致する単語がありません。'}
              </Text>
            }
            renderItem={({ item }) => {
              const gloss = item.definitions[0] ?? '';
              const shortGloss = gloss.length > 72 ? `${gloss.slice(0, 70)}…` : gloss;
              return (
                <Pressable
                  style={({ pressed }) => [styles.row, pressed && styles.rowPressed]}
                  onPress={() => pick(item.id)}
                  accessibilityRole="button"
                  accessibilityLabel={`${item.word}, ${shortGloss}`}
                >
                  <Text style={styles.word}>{item.word}</Text>
                  <Text style={styles.meta} numberOfLines={2}>
                    {formatPartOfSpeechLine(item.partOfSpeech)}
                    {shortGloss ? ` · ${shortGloss}` : ''}
                  </Text>
                </Pressable>
              );
            }}
          />
        </View>
      </KeyboardAvoidingView>
    </Modal>
  );
}

const styles = StyleSheet.create({
  overlay: {
    flex: 1,
    justifyContent: 'center',
    paddingHorizontal: theme.space.md,
  },
  backdrop: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: 'rgba(60, 54, 42, 0.45)',
  },
  sheet: {
    maxHeight: '78%',
    backgroundColor: theme.colors.surfaceElevated,
    borderRadius: theme.radius.lg,
    borderWidth: 1,
    borderColor: theme.colors.borderSubtle,
    paddingBottom: theme.space.sm,
    zIndex: 1,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    justifyContent: 'space-between',
    paddingHorizontal: theme.space.md,
    paddingTop: theme.space.md,
    paddingBottom: theme.space.xs,
  },
  headerText: {
    flex: 1,
    paddingRight: theme.space.sm,
    gap: 2,
  },
  title: {
    fontFamily: theme.fontDisplay,
    fontSize: 20,
    color: theme.colors.text,
  },
  titleJa: {
    fontSize: 12,
    fontWeight: '700',
    color: theme.colors.textMuted,
  },
  closeBtn: {
    padding: 4,
    borderRadius: theme.radius.sm,
  },
  closeBtnPressed: {
    opacity: 0.7,
  },
  inputRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginHorizontal: theme.space.md,
    marginBottom: theme.space.xs,
    paddingHorizontal: theme.space.sm,
    minHeight: 44,
    borderRadius: theme.radius.md,
    borderWidth: 1,
    borderColor: theme.colors.border,
    backgroundColor: theme.colors.surfaceSoft,
  },
  searchIcon: {
    marginRight: 6,
  },
  input: {
    flex: 1,
    fontSize: 16,
    color: theme.colors.text,
    paddingVertical: Platform.OS === 'ios' ? 10 : 8,
  },
  list: {
    maxHeight: 360,
  },
  listContent: {
    paddingHorizontal: theme.space.sm,
    paddingBottom: theme.space.sm,
  },
  empty: {
    paddingHorizontal: theme.space.md,
    paddingVertical: theme.space.lg,
    fontSize: 14,
    color: theme.colors.textMuted,
    textAlign: 'center',
  },
  row: {
    paddingVertical: 10,
    paddingHorizontal: theme.space.sm,
    borderRadius: theme.radius.sm,
    marginBottom: 4,
  },
  rowPressed: {
    backgroundColor: theme.colors.surfaceSoft,
  },
  word: {
    fontSize: 17,
    fontWeight: '800',
    color: theme.colors.text,
  },
  meta: {
    marginTop: 3,
    fontSize: 12,
    color: theme.colors.textSecondary,
    lineHeight: 16,
  },
});
