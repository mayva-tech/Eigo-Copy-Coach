import { useEffect, useState } from 'react';
import { ActivityIndicator, View } from 'react-native';

import { useAppStore } from '@/src/store/app-store';
import { useLanguageStore } from '@/src/store/language-store';

function bothHydrated() {
  return useLanguageStore.persist.hasHydrated() && useAppStore.persist.hasHydrated();
}

export function LanguageHydrationGate({ children }: { children: React.ReactNode }) {
  const [ready, setReady] = useState(bothHydrated);

  useEffect(() => {
    if (bothHydrated()) {
      setReady(true);
      return;
    }
    const unsubLang = useLanguageStore.persist.onFinishHydration(() => {
      if (bothHydrated()) setReady(true);
    });
    const unsubApp = useAppStore.persist.onFinishHydration(() => {
      if (bothHydrated()) setReady(true);
    });
    return () => {
      unsubLang();
      unsubApp();
    };
  }, []);

  if (!ready) {
    return (
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
        <ActivityIndicator size="large" />
      </View>
    );
  }

  return <>{children}</>;
}
