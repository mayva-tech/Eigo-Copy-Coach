import { Ionicons } from '@expo/vector-icons';
import { Tabs } from 'expo-router';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

import type { UiKey } from '@/src/lib/i18n/uiCatalog';
import { tUi } from '@/src/lib/i18n/resolveUi';
import { useLanguageStore } from '@/src/store/language-store';
import { theme } from '@/src/theme/pronunciationTheme';

const TAB_BAR_CONTENT_HEIGHT = 54;

export default function TabsLayout() {
  const insets = useSafeAreaInsets();
  const tabBarBottomInset = insets.bottom;
  const supportLanguage = useLanguageStore((s) => s.supportLanguage);
  const t = (key: UiKey) => tUi(supportLanguage, key);

  return (
    <Tabs
      screenOptions={{
        headerShown: false,
        tabBarActiveTintColor: theme.colors.text,
        tabBarInactiveTintColor: theme.colors.textMuted,
        tabBarStyle: {
          backgroundColor: theme.colors.background,
          borderTopColor: theme.colors.border,
          paddingTop: 4,
          paddingBottom: tabBarBottomInset,
          height: TAB_BAR_CONTENT_HEIGHT + tabBarBottomInset,
        },
        tabBarLabelStyle: {
          fontSize: 9,
          fontWeight: '700',
          letterSpacing: 0.3,
        },
      }}>
      <Tabs.Screen
        name="index"
        options={{
          title: 'Home',
          tabBarIcon: ({ color, size }) => <Ionicons name="home-outline" size={size} color={color} />,
        }}
      />
      <Tabs.Screen
        name="history"
        options={{
          title: 'History',
          tabBarIcon: ({ color, size }) => <Ionicons name="time-outline" size={size} color={color} />,
        }}
      />
      <Tabs.Screen
        name="calendar"
        options={{
          title: t('navigation.calendar'),
          tabBarIcon: ({ color, size }) => <Ionicons name="calendar-outline" size={size} color={color} />,
        }}
      />
      <Tabs.Screen
        name="guide"
        options={{
          title: 'Guide',
          tabBarIcon: ({ color, size }) => <Ionicons name="book-outline" size={size} color={color} />,
        }}
      />
    </Tabs>
  );
}
