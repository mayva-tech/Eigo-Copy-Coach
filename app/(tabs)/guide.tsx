import { router } from 'expo-router';
import { View } from 'react-native';

import SecondaryButton from '@/src/components/ui/SecondaryButton';
import PlaceholderTabScreen from '@/src/features/placeholder/screens/PlaceholderTabScreen';
import { ROUTES } from '@/src/constants/routes';

export default function GuideTab() {
  return (
    <PlaceholderTabScreen
      title="Guide"
      eyebrow="TIPS"
      body="Short, calm guidance on R/L, TH, stress, and silent letters will live here. You can revisit the full intro anytime."
      footer={
        <View style={{ marginTop: 12 }}>
          <SecondaryButton label="Open onboarding" onPress={() => router.push(ROUTES.ONBOARDING)} />
        </View>
      }
    />
  );
}
