import { router } from 'expo-router';
import { StyleSheet, Text, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import AppButton from '@/src/components/common/AppButton';
import AppCard from '@/src/components/common/AppCard';
import ScreenHeader from '@/src/components/common/ScreenHeader';
import { colors } from '@/src/constants/colors';
import { useI18n } from '@/src/lib/i18n/useI18n';
import { ROUTES } from '@/src/constants/routes';
import { useAppStore } from '@/src/store/useAppStore';

export default function OnboardingScreen() {
  const setOnboardingComplete = useAppStore((state) => state.setOnboardingComplete);
  const { t } = useI18n();

  const handleStart = () => {
    setOnboardingComplete(true);
    router.replace(ROUTES.HOME);
  };

  return (
    <SafeAreaView style={styles.safeArea}>
      <View style={styles.container}>
        <ScreenHeader
          eyebrow={t('navigation.onboarding')}
          title={t('onboarding.shellTitle')}
          subtitle={t('onboarding.shellSubtitle')}
        />

        <View style={styles.stack}>
          <AppCard>
            <Text style={styles.step}>1</Text>
            <Text style={styles.cardTitle}>{t('onboarding.step1Title')}</Text>
            <Text style={styles.cardBody}>{t('onboarding.step1Body')}</Text>
          </AppCard>

          <AppCard>
            <Text style={styles.step}>2</Text>
            <Text style={styles.cardTitle}>{t('onboarding.step2Title')}</Text>
            <Text style={styles.cardBody}>{t('onboarding.step2Body')}</Text>
          </AppCard>

          <AppCard>
            <Text style={styles.step}>3</Text>
            <Text style={styles.cardTitle}>{t('onboarding.step3Title')}</Text>
            <Text style={styles.cardBody}>{t('onboarding.step3Body')}</Text>
          </AppCard>
        </View>

        <AppButton label={t('onboarding.startButton')} onPress={handleStart} />
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: colors.background,
  },
  container: {
    flex: 1,
    padding: 20,
    justifyContent: 'space-between',
  },
  stack: {
    gap: 14,
    marginBottom: 24,
  },
  step: {
    width: 28,
    height: 28,
    borderRadius: 14,
    textAlign: 'center',
    textAlignVertical: 'center',
    backgroundColor: colors.primarySoft,
    color: colors.primary,
    fontWeight: '800',
    marginBottom: 10,
    overflow: 'hidden',
    paddingTop: 4,
  },
  cardTitle: {
    fontSize: 20,
    fontWeight: '800',
    color: colors.text,
    marginBottom: 6,
  },
  cardBody: {
    fontSize: 15,
    lineHeight: 22,
    color: colors.textSoft,
  },
});
