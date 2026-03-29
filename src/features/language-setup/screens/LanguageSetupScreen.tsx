import * as Localization from 'expo-localization';
import { Redirect } from 'expo-router';
import { useMemo, useState } from 'react';
import { Pressable, ScrollView, StyleSheet, Text, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

import { LANGUAGE_NATIVE_LABELS } from '@/src/constants/languageLabels';
import { mapDeviceLocaleToLanguageCode } from '@/src/lib/i18n/localeMap';
import { tUi } from '@/src/lib/i18n/resolveUi';
import type { UiKey } from '@/src/lib/i18n/uiCatalog';
import { SUPPORTED_LANGUAGE_CODES, type LanguageCode } from '@/src/types/language';
import { useLanguageStore } from '@/src/store/language-store';
import { pressScaleStyle } from '@/src/utils/pressScale';
import { useScreenColors } from '@/src/utils/screen-colors';

type Step = 'pick' | 'confirm';

export function LanguageSetupScreen() {
  const c = useScreenColors();
  const suggested = useMemo(
    () => mapDeviceLocaleToLanguageCode(Localization.getLocales()[0]?.languageTag),
    []
  );
  const [pickerLocale, setPickerLocale] = useState<LanguageCode>(suggested);
  const [selected, setSelected] = useState<LanguageCode>(suggested);
  const [step, setStep] = useState<Step>('pick');

  const setLanguagePair = useLanguageStore((s) => s.setLanguagePair);
  const confirmLanguage = useLanguageStore((s) => s.confirmLanguage);
  const hasConfirmedLanguage = useLanguageStore((s) => s.hasConfirmedLanguage);

  if (hasConfirmedLanguage) {
    return <Redirect href="/" />;
  }

  const label = (key: UiKey) => tUi(pickerLocale, key);

  const onPickLanguage = (code: LanguageCode) => {
    setSelected(code);
    setPickerLocale(code);
  };

  const onContinueFromPick = () => {
    setStep('confirm');
  };

  const onConfirmFinal = () => {
    setLanguagePair(selected, selected);
    confirmLanguage();
  };

  const onChange = () => {
    setStep('pick');
  };

  return (
    <SafeAreaView style={[styles.root, { backgroundColor: c.background }]} edges={['top']}>
      <ScrollView style={styles.root} contentContainerStyle={styles.content}>
        <Text style={[styles.title, { color: c.text }]}>{label('languageSetup.title')}</Text>
        <Text style={[styles.sub, { color: c.textMuted }]}>{label('languageSetup.subtitle')}</Text>

        {step === 'pick' && (
          <>
            {selected === suggested ? (
              <View style={[styles.banner, { backgroundColor: c.card }]}>
                <Text style={[styles.bannerText, { color: c.textMuted }]}>
                  {label('languageSetup.suggestedBanner')}
                </Text>
              </View>
            ) : null}
            <View style={styles.list}>
              {SUPPORTED_LANGUAGE_CODES.map((code) => {
                const active = selected === code;
                return (
                  <Pressable
                    key={code}
                    onPress={() => onPickLanguage(code)}
                    style={({ pressed }) => [
                      styles.row,
                      { borderColor: active ? c.tint : 'transparent', backgroundColor: c.card },
                      pressScaleStyle(pressed),
                    ]}>
                    <Text style={[styles.rowLabel, { color: c.text }]}>
                      {LANGUAGE_NATIVE_LABELS[code]}
                    </Text>
                  </Pressable>
                );
              })}
            </View>
            <Pressable
              style={({ pressed }) => [styles.primary, { backgroundColor: c.tint }, pressScaleStyle(pressed)]}
              onPress={onContinueFromPick}>
              <Text style={styles.primaryLabel}>{label('languageSetup.continue')}</Text>
            </Pressable>
          </>
        )}

        {step === 'confirm' && (
          <>
            <Text style={[styles.confirmTitle, { color: c.text }]}>
              {label('languageSetup.confirmTitle')}
            </Text>
            <Text style={[styles.confirmBody, { color: c.textMuted }]}>
              {label('languageSetup.confirmBody')}
            </Text>
            <Text style={[styles.chosen, { color: c.text }]}>{LANGUAGE_NATIVE_LABELS[selected]}</Text>
            <Pressable
              style={({ pressed }) => [styles.primary, { backgroundColor: c.tint }, pressScaleStyle(pressed)]}
              onPress={onConfirmFinal}>
              <Text style={styles.primaryLabel}>{label('languageSetup.continue')}</Text>
            </Pressable>
            <Pressable style={({ pressed }) => [styles.secondary, pressScaleStyle(pressed)]} onPress={onChange}>
              <Text style={[styles.secondaryLabel, { color: c.tint }]}>{label('languageSetup.change')}</Text>
            </Pressable>
          </>
        )}
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  root: { flex: 1 },
  content: { padding: 24, paddingBottom: 48, gap: 12 },
  title: { fontSize: 26, fontWeight: '700' },
  sub: { fontSize: 16, lineHeight: 22, marginBottom: 8 },
  banner: { padding: 12, borderRadius: 10 },
  bannerText: { fontSize: 13 },
  list: { gap: 10, marginTop: 8 },
  row: {
    paddingVertical: 14,
    paddingHorizontal: 16,
    borderRadius: 12,
    borderWidth: 2,
  },
  rowLabel: { fontSize: 17, fontWeight: '600' },
  primary: { marginTop: 20, paddingVertical: 16, borderRadius: 12, alignItems: 'center' },
  primaryLabel: { color: '#fff', fontSize: 17, fontWeight: '700' },
  confirmTitle: { fontSize: 20, fontWeight: '700', marginTop: 8 },
  confirmBody: { fontSize: 15, lineHeight: 22 },
  chosen: { fontSize: 18, fontWeight: '600', marginVertical: 8 },
  secondary: { paddingVertical: 12, alignItems: 'center' },
  secondaryLabel: { fontSize: 16, fontWeight: '600' },
});
