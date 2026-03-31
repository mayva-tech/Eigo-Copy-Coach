import { Stack, usePathname, useRootNavigationState, useRouter } from 'expo-router';
import { StatusBar } from 'expo-status-bar';
import { useEffect } from 'react';
import { SafeAreaProvider } from 'react-native-safe-area-context';

import { LanguageHydrationGate } from '@/src/components/LanguageHydrationGate';
import { ROUTES } from '@/src/constants/routes';
import { useAppStore } from '@/src/store/useAppStore';
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
  const onboardingComplete = useAppStore((s) => s.onboardingComplete);

  useEffect(() => {
    if (!navigationState?.key) {
      return;
    }

    // Defer past first layout so the Stack is mounted (avoids iOS: "navigate before mounting Root Layout").
    const t = setTimeout(() => {
      const inOnboarding = pathname === '/onboarding';

      if (!onboardingComplete) {
        if (!inOnboarding) {
          router.replace('/onboarding');
        }
        return;
      }

      if (inOnboarding) {
        router.replace(ROUTES.HOME);
      }
    }, 0);

    return () => clearTimeout(t);
  }, [onboardingComplete, pathname, navigationState?.key, router]);

  return (
    <Stack
      screenOptions={{
        headerShown: false,
        animation: 'slide_from_right',
      }}>
      <Stack.Screen name="(tabs)" />
      <Stack.Screen name="onboarding" />
      <Stack.Screen name="practice" />
      <Stack.Screen name="paywall" />
      <Stack.Screen name="review" />
      <Stack.Screen name="session-complete" />
      <Stack.Screen name="settings" />
    </Stack>
  );
}
