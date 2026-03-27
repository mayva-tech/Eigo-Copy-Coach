import { Redirect, Stack, usePathname } from 'expo-router';
import { StatusBar } from 'expo-status-bar';
import { SafeAreaProvider } from 'react-native-safe-area-context';

import { LanguageHydrationGate } from '@/src/components/LanguageHydrationGate';
import { useAppStore } from '@/src/store/useAppStore';
import { useLanguageStore } from '@/src/store/language-store';

export default function RootLayout() {
  return (
    <SafeAreaProvider>
      <StatusBar style="dark" />
      <LanguageHydrationGate>
        <RootNavigator />
      </LanguageHydrationGate>
    </SafeAreaProvider>
  );
}

function RootNavigator() {
  const pathname = usePathname();
  const hasConfirmedLanguage = useLanguageStore((s) => s.hasConfirmedLanguage);
  const onboardingComplete = useAppStore((s) => s.onboardingComplete);

  if (!hasConfirmedLanguage && pathname !== '/language-setup') {
    return <Redirect href="/language-setup" />;
  }

  if (hasConfirmedLanguage && !onboardingComplete && pathname !== '/onboarding') {
    return <Redirect href="/onboarding" />;
  }

  return (
    <Stack
      screenOptions={{
        headerShown: false,
        animation: 'slide_from_right',
      }}>
      <Stack.Screen name="language-setup" />
      <Stack.Screen name="index" />
      <Stack.Screen name="onboarding" />
      <Stack.Screen name="practice" />
      <Stack.Screen name="review" />
      <Stack.Screen name="settings" />
    </Stack>
  );
}
