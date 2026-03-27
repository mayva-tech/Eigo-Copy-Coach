import { router } from 'expo-router';
import { ScrollView, StyleSheet, Text, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import AppButton from '@/src/components/common/AppButton';
import AppCard from '@/src/components/common/AppCard';
import ScreenHeader from '@/src/components/common/ScreenHeader';
import { colors } from '@/src/constants/colors';
import { dailyLesson01 } from '@/src/data/lessons/dailyLesson01';
import { useI18n } from '@/src/lib/i18n/useI18n';

export default function PracticeListScreen() {
  const { t } = useI18n();

  return (
    <SafeAreaView style={styles.safeArea}>
      <ScrollView contentContainerStyle={styles.container}>
        <ScreenHeader
          eyebrow={t('navigation.practice')}
          title={t('practiceList.title')}
          subtitle={t('practiceList.subtitle')}
        />

        <AppCard>
          <Text style={styles.cardTitle}>{t('practiceList.lessonTitle')}</Text>
          <Text style={styles.cardBody}>{t('practiceList.lessonBody')}</Text>

          <View style={styles.list}>
            {dailyLesson01.map((item) => (
              <View key={item.id} style={styles.row}>
                <Text style={styles.word}>{item.word}</Text>
                <Text style={styles.hint}>{item.sayItLike}</Text>
              </View>
            ))}
          </View>

          <View style={styles.actions}>
            <AppButton
              label={t('practiceList.openLesson')}
              onPress={() => router.push('/practice/lesson-01')}
            />
          </View>
        </AppCard>
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
  },
  cardTitle: {
    fontSize: 22,
    fontWeight: '800',
    color: colors.text,
    marginBottom: 8,
  },
  cardBody: {
    fontSize: 15,
    lineHeight: 22,
    color: colors.textSoft,
  },
  list: {
    marginTop: 16,
    gap: 10,
  },
  row: {
    paddingVertical: 10,
    borderBottomWidth: 1,
    borderBottomColor: colors.border,
  },
  word: {
    fontSize: 17,
    fontWeight: '700',
    color: colors.text,
  },
  hint: {
    marginTop: 4,
    fontSize: 14,
    color: colors.textSoft,
  },
  actions: {
    marginTop: 18,
  },
});
