import HomeScreen from '@/src/features/home/screens/HomeScreen';
import { Redirect } from 'expo-router';
import { useLanguageStore } from '@/src/store/language-store';
import { useAppStore } from '@/src/store/useAppStore';

export default function HomeRoute() {
  const hasConfirmedLanguage = useLanguageStore((s) => s.hasConfirmedLanguage);
  const onboardingComplete = useAppStore((s) => s.onboardingComplete);

  if (!hasConfirmedLanguage) {
    return <Redirect href="/language-setup" />;
  }
  if (!onboardingComplete) {
    return <Redirect href="/onboarding" />;
  }

  return <HomeScreen />;
}
