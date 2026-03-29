import { useCallback, useState } from 'react';

import {
  ActivityIndicator,
  Alert,
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  View,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

import AppCard from '@/src/components/common/AppCard';
import ScreenHeader from '@/src/components/common/ScreenHeader';
import { LANGUAGE_NATIVE_LABELS } from '@/src/constants/languageLabels';
import { colors } from '@/src/constants/colors';
import { useI18n } from '@/src/lib/i18n/useI18n';
import { useAppStore } from '@/src/store/useAppStore';
import { useLanguageStore } from '@/src/store/language-store';
import { SUPPORTED_LANGUAGE_CODES } from '@/src/types/language';
import { playTtsFromDevBackend } from '@/src/services/audio/backendTtsPlay';
import { pressScaleStyle } from '@/src/utils/pressScale';

const DEV_TTS_DEFAULT =
  typeof process.env.EXPO_PUBLIC_TTS_DEV_URL === 'string'
    ? process.env.EXPO_PUBLIC_TTS_DEV_URL
    : '';

export default function SettingsScreen() {
  const { t, uiLanguage, supportLanguage, setUiLanguage, setSupportLanguage } = useI18n();
  const resetLanguageSetup = useLanguageStore((s) => s.resetLanguageSetup);
  const resetOnboarding = useAppStore((s) => s.resetOnboarding);

  const onResetLanguageSetup = () => {
    resetLanguageSetup();
  };

  const onFullReset = () => {
    resetLanguageSetup();
    resetOnboarding();
  };

  const [devTtsUrl, setDevTtsUrl] = useState(DEV_TTS_DEFAULT);
  const [devTtsBusy, setDevTtsBusy] = useState(false);

  const onDevTtsTest = useCallback(async () => {
    const url = devTtsUrl.trim();
    if (!url) {
      Alert.alert(
        'Add your computer address',
        'Use http:// and your PC’s Wi‑Fi address, for example http://192.168.1.10:8080 (not localhost on the phone).',
      );
      return;
    }
    setDevTtsBusy(true);
    try {
      await playTtsFromDevBackend(url, 'knife');
    } catch (e) {
      const msg = e instanceof Error ? e.message : String(e);
      Alert.alert('TTS test failed', msg);
    } finally {
      setDevTtsBusy(false);
    }
  }, [devTtsUrl]);

  return (
    <SafeAreaView style={styles.safeArea}>
      <ScrollView contentContainerStyle={styles.container}>
        <ScreenHeader
          eyebrow={t('navigation.settings')}
          title={t('settings.title')}
          subtitle={t('settings.shellSubtitle')}
        />

        <AppCard>
          <Text style={styles.sectionTitle}>{t('settings.sectionLanguage')}</Text>

          <View style={styles.row}>
            <Text style={styles.label}>{t('settings.appLanguage')}</Text>
            <Text style={styles.value}>{t('settings.appLanguageDesc')}</Text>
            <View style={styles.pills}>
              {SUPPORTED_LANGUAGE_CODES.map((code) => (
                <LanguagePill
                  key={`ui-${code}`}
                  label={LANGUAGE_NATIVE_LABELS[code]}
                  active={uiLanguage === code}
                  onPress={() => setUiLanguage(code)}
                />
              ))}
            </View>
          </View>

          <View style={styles.row}>
            <Text style={styles.label}>{t('settings.supportLanguage')}</Text>
            <Text style={styles.value}>{t('settings.supportLanguageDesc')}</Text>
            <View style={styles.pills}>
              {SUPPORTED_LANGUAGE_CODES.map((code) => (
                <LanguagePill
                  key={`support-${code}`}
                  label={LANGUAGE_NATIVE_LABELS[code]}
                  active={supportLanguage === code}
                  onPress={() => setSupportLanguage(code)}
                />
              ))}
            </View>
          </View>

          <View style={styles.rowNoDivider}>
            <Text style={styles.label}>{t('settings.resetLanguageSetup')}</Text>
            <Text style={styles.value}>{t('settings.resetLanguageSetupDesc')}</Text>
            <Pressable
              onPress={onResetLanguageSetup}
              style={({ pressed }) => [styles.resetButton, pressScaleStyle(pressed), pressed && styles.pressed]}>
              <Text style={styles.resetButtonText}>{t('settings.resetLanguageSetupAction')}</Text>
            </Pressable>
          </View>

          <View style={styles.rowNoDividerTopBorder}>
            <Text style={styles.label}>{t('settings.fullResetTitle')}</Text>
            <Text style={styles.value}>{t('settings.fullResetDesc')}</Text>
            <Pressable
              onPress={onFullReset}
              style={({ pressed }) => [styles.fullResetButton, pressScaleStyle(pressed), pressed && styles.pressed]}>
              <Text style={styles.fullResetButtonText}>{t('settings.fullResetAction')}</Text>
            </Pressable>
          </View>
        </AppCard>

        {__DEV__ ? (
          <AppCard>
            <Text style={styles.sectionTitle}>Developer: TTS server (Expo Go)</Text>
            <Text style={styles.value}>
              Phone and PC must be on the same Wi‑Fi. Use your PC’s IP (not localhost), backend running on port
              8080.
            </Text>
            <Text style={styles.label}>Server base URL</Text>
            <TextInput
              value={devTtsUrl}
              onChangeText={setDevTtsUrl}
              placeholder="http://192.168.x.x:8080"
              placeholderTextColor={colors.textMuted}
              autoCapitalize="none"
              autoCorrect={false}
              keyboardType="url"
              style={styles.devUrlInput}
            />
            <Pressable
              onPress={onDevTtsTest}
              disabled={devTtsBusy}
              style={({ pressed }) => [
                styles.devTestButton,
                pressScaleStyle(pressed),
                pressed && styles.pressed,
                devTtsBusy && styles.devTestButtonDisabled,
              ]}>
              {devTtsBusy ? (
                <ActivityIndicator color={colors.primary} />
              ) : (
                <Text style={styles.devTestButtonText}>Play test word (“knife”)</Text>
              )}
            </Pressable>
          </AppCard>
        ) : null}
      </ScrollView>
    </SafeAreaView>
  );
}

function LanguagePill({
  label,
  active,
  onPress,
}: {
  label: string;
  active: boolean;
  onPress: () => void;
}) {
  return (
    <Pressable
      onPress={onPress}
      style={({ pressed }) => [
        styles.pill,
        active && styles.pillActive,
        pressScaleStyle(pressed),
        pressed && styles.pressed,
      ]}>
      <Text style={[styles.pillText, active && styles.pillTextActive]}>{label}</Text>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: colors.background,
  },
  container: {
    padding: 20,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: '800',
    color: colors.text,
    marginBottom: 12,
  },
  row: {
    paddingVertical: 14,
    borderBottomWidth: 1,
    borderBottomColor: colors.border,
  },
  rowNoDivider: {
    paddingVertical: 14,
  },
  rowNoDividerTopBorder: {
    paddingVertical: 14,
    borderTopWidth: 1,
    borderTopColor: colors.border,
  },
  label: {
    fontSize: 14,
    fontWeight: '700',
    color: colors.textMuted,
    marginBottom: 4,
  },
  value: {
    fontSize: 16,
    color: colors.text,
    marginBottom: 10,
  },
  pills: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 8,
  },
  pill: {
    borderRadius: 999,
    borderWidth: 1,
    borderColor: colors.border,
    backgroundColor: colors.surfaceSoft,
    paddingHorizontal: 12,
    paddingVertical: 8,
  },
  pillActive: {
    borderColor: colors.primary,
    backgroundColor: colors.primarySoft,
  },
  pillText: {
    color: colors.text,
    fontSize: 13,
    fontWeight: '700',
  },
  pillTextActive: {
    color: colors.primary,
  },
  resetButton: {
    alignSelf: 'flex-start',
    borderRadius: 999,
    borderWidth: 1,
    borderColor: colors.primary,
    backgroundColor: colors.primarySoft,
    paddingHorizontal: 14,
    paddingVertical: 9,
    marginTop: 4,
  },
  resetButtonText: {
    color: colors.primary,
    fontSize: 13,
    fontWeight: '800',
  },
  fullResetButton: {
    alignSelf: 'flex-start',
    borderRadius: 999,
    borderWidth: 1,
    borderColor: colors.dangerText,
    backgroundColor: colors.dangerSoft,
    paddingHorizontal: 14,
    paddingVertical: 9,
    marginTop: 4,
  },
  fullResetButtonText: {
    color: colors.dangerText,
    fontSize: 13,
    fontWeight: '800',
  },
  pressed: {
    opacity: 0.86,
  },
  devUrlInput: {
    borderWidth: 1,
    borderColor: colors.border,
    borderRadius: 12,
    paddingHorizontal: 12,
    paddingVertical: 10,
    fontSize: 15,
    color: colors.text,
    marginBottom: 12,
  },
  devTestButton: {
    alignSelf: 'flex-start',
    borderRadius: 999,
    borderWidth: 1,
    borderColor: colors.primary,
    backgroundColor: colors.primarySoft,
    paddingHorizontal: 16,
    paddingVertical: 10,
    minWidth: 200,
    alignItems: 'center',
    justifyContent: 'center',
  },
  devTestButtonDisabled: {
    opacity: 0.6,
  },
  devTestButtonText: {
    color: colors.primary,
    fontSize: 14,
    fontWeight: '800',
  },
});
