import { HeaderBackButton } from '@react-navigation/elements';
import { Stack, router } from 'expo-router';
import { Platform } from 'react-native';

import { useTheme } from '@react-navigation/native';

export default function PracticeLayout() {
  const { colors } = useTheme();

  return (
    <Stack
      screenOptions={{
        headerTintColor: colors.primary,
        ...(Platform.OS === 'ios' && {
          headerBackButtonDisplayMode: 'minimal',
        }),
      }}>
      <Stack.Screen
        name="index"
        options={{
          headerLeft: (props) => (
            <HeaderBackButton
              {...props}
              onPress={() => {
                if (router.canGoBack()) {
                  router.back();
                }
              }}
            />
          ),
        }}
      />
      <Stack.Screen
        name="[lessonId]"
        options={{
          headerBackVisible: true,
          headerLeft: (props) => (
            <HeaderBackButton
              {...props}
              onPress={() => {
                if (router.canGoBack()) {
                  router.back();
                }
              }}
            />
          ),
        }}
      />
    </Stack>
  );
}
