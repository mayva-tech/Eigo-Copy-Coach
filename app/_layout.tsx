import { Stack, usePathname, useRootNavigationState, useRouter } from 'expo-router';
import { StatusBar } from 'expo-status-bar';
import { useEffect } from 'react';
import { SafeAreaProvider } from 'react-native-safe-area-context';

import { LanguageHydrationGate } from '@/src/components/LanguageHydrationGate';
import { useAppStore } from '@/src/store/useAppStore';
import { useLanguageStore } from '@/src/store/language-store';
import { usePracticeStore } from '@/src/store/usePracticeStore';

function PracticeReviewQueueHydration() {
  useEffect(() => {
    void usePracticeStore.getState().hydrateReviewQueue();
  }, []);
  return null;
}

export default function RootLayout() {
  return (
    <SafeAreaProvider>
      <StatusBar style="dark" />
      <LanguageHydrationGate>
        <PracticeReviewQueueHydration />
        <RootNavigator />
      </LanguageHydrationGate>
    </SafeAreaProvider>
  );
}

function RootNavigator() {
  const router = useRouter();
  const pathname = usePathname();
  const navigationState = useRootNavigationState();
  const hasConfirmedLanguage = useLanguageStore((s) => s.hasConfirmedLanguage);
  const onboardingComplete = useAppStore((s) => s.onboardingComplete);

  useEffect(() => {
    if (!navigationState?.key) {
      return;
    }

    // Defer past first layout so the Stack is mounted (avoids iOS: "navigate before mounting Root Layout").
    const t = setTimeout(() => {
      const inLanguageSetup = pathname === '/language-setup';
      const inOnboarding = pathname === '/onboarding';

      if (!hasConfirmedLanguage) {
        if (!inLanguageSetup) {
          router.replace('/language-setup');
        }
        return;
      }

      if (!onboardingComplete) {
        if (!inOnboarding) {
          router.replace('/onboarding');
        }
        return;
      }

      if (inLanguageSetup || inOnboarding) {
        router.replace('/');
      }
    }, 0);

    return () => clearTimeout(t);
  }, [hasConfirmedLanguage, onboardingComplete, pathname, navigationState?.key, router]);

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
      <Stack.Screen name="paywall" />
      <Stack.Screen name="review" />
      <Stack.Screen name="settings" />
    </Stack>
  );
}
