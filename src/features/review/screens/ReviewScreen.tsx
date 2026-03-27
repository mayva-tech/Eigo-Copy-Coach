import { ScrollView, StyleSheet, Text } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import AppCard from '@/src/components/common/AppCard';
import ScreenHeader from '@/src/components/common/ScreenHeader';
import { colors } from '@/src/constants/colors';
import { useI18n } from '@/src/lib/i18n/useI18n';

export default function ReviewScreen() {
  const { t } = useI18n();

  return (
    <SafeAreaView style={styles.safeArea}>
      <ScrollView contentContainerStyle={styles.container}>
        <ScreenHeader
          eyebrow={t('navigation.review')}
          title={t('review.title')}
          subtitle={t('review.subtitle')}
        />

        <AppCard>
          <Text style={styles.title}>{t('review.emptyTitle')}</Text>
          <Text style={styles.body}>{t('review.emptyBody')}</Text>
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
  title: {
    fontSize: 20,
    fontWeight: '800',
    color: colors.text,
    marginBottom: 8,
  },
  body: {
    fontSize: 15,
    lineHeight: 22,
    color: colors.textSoft,
  },
});
