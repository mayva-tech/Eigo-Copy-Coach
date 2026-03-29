import { useLocalSearchParams, useRouter } from 'expo-router';
import { Pressable, StyleSheet, Text, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

import { usePlanStore } from '@/src/store/planStore';

export default function PaywallScreen() {
  const router = useRouter();
  const params = useLocalSearchParams<{ reason?: string }>();
  const setPlan = usePlanStore((state) => state.setPlan);

  function handleUpgradeMock() {
    setPlan('premium');
    router.back();
  }

  return (
    <SafeAreaView style={styles.safeArea}>
      <View style={styles.container}>
        <Text style={styles.title}>Hear natural premium voice</Text>
        <Text style={styles.body}>
          Premium gives smoother, clearer reference audio for shadowing practice.
        </Text>

        {params.reason ? <Text style={styles.reason}>Reason: {params.reason}</Text> : null}

        <Pressable style={styles.primaryButton} onPress={handleUpgradeMock}>
          <Text style={styles.primaryButtonText}>Continue with Premium</Text>
        </Pressable>

        <Pressable style={styles.secondaryButton} onPress={() => router.back()}>
          <Text style={styles.secondaryButtonText}>Not now</Text>
        </Pressable>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: '#FFFFFF',
  },
  container: {
    flex: 1,
    padding: 24,
    justifyContent: 'center',
    backgroundColor: '#FFFFFF',
  },
  title: {
    fontSize: 24,
    fontWeight: '600',
    marginBottom: 12,
    color: '#111111',
  },
  body: {
    fontSize: 16,
    lineHeight: 24,
    color: '#444444',
    marginBottom: 16,
  },
  reason: {
    fontSize: 13,
    color: '#777777',
    marginBottom: 24,
  },
  primaryButton: {
    backgroundColor: '#111111',
    paddingVertical: 14,
    borderRadius: 12,
    alignItems: 'center',
    marginBottom: 12,
  },
  primaryButtonText: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: '600',
  },
  secondaryButton: {
    paddingVertical: 14,
    borderRadius: 12,
    alignItems: 'center',
  },
  secondaryButtonText: {
    color: '#444444',
    fontSize: 15,
  },
});
