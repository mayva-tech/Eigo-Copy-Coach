import { useLocalSearchParams, useNavigation } from 'expo-router';
import { useLayoutEffect } from 'react';
import { StyleSheet, Text, View } from 'react-native';

import { jpLessons } from '@/src/data/lessons/jp';
import { useI18n } from '@/src/lib/i18n/useI18n';
import { useScreenColors } from '@/src/utils/screen-colors';

export function LessonScreen() {
  const c = useScreenColors();
  const navigation = useNavigation();
  const { t } = useI18n();
  const { lessonId } = useLocalSearchParams<{ lessonId: string }>();
  const lesson = jpLessons.find((l) => l.id === lessonId);

  useLayoutEffect(() => {
    navigation.setOptions({ title: t('navigation.lesson') });
  }, [navigation, t]);

  return (
    <View style={[styles.container, { backgroundColor: c.background }]}>
      <Text style={[styles.title, { color: c.text }]}>{lesson?.titleJa ?? lessonId}</Text>
      <Text style={[styles.body, { color: c.textMuted }]}>
        {t('practice.lessonBody')} ({lessonId})
      </Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 24,
    gap: 12,
  },
  title: {
    fontSize: 22,
    fontWeight: '700',
  },
  body: {
    fontSize: 16,
    lineHeight: 24,
  },
});
