import { ScrollView, StyleSheet, Text, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

import AppButton from '@/src/components/common/AppButton';
import AppCard from '@/src/components/common/AppCard';
import { colors } from '@/src/constants/colors';

type PaywallScreenProps = {
  /** Primary CTA — e.g. start trial or open native purchase flow */
  onSubscribePress?: () => void;
};

export default function PaywallScreen({ onSubscribePress }: PaywallScreenProps) {
  return (
    <SafeAreaView style={styles.safeArea}>
      <ScrollView
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}>
        <View style={styles.headerBlock}>
          <Text style={styles.title}>はつおん、もうすこしクリアに</Text>
          <Text style={styles.subtitle}>
            おなじたんごでも、音がかわるとわかりやすくなる
          </Text>
        </View>

        <Text style={styles.valueBody}>
          音のかたちがはっきりすると、ききとりやすさがすこしずつかわるよ。あせらず、じぶんのペースで。
        </Text>

        <AppCard>
          <Text style={styles.sectionLabel}>きこえ方のイメージ</Text>
          <View style={styles.compareRow}>
            <Text style={styles.compareLabel}>ふつうの音声</Text>
            <Text style={styles.compareArrow}>→</Text>
            <Text style={styles.compareExampleMuted}>nai-fu</Text>
          </View>
          <View style={[styles.compareRow, styles.compareRowLast]}>
            <Text style={styles.compareLabel}>クリアな音声</Text>
            <Text style={styles.compareArrow}>→</Text>
            <Text style={styles.compareExample}>naif</Text>
          </View>
        </AppCard>

        <Text style={styles.planSectionTitle}>プラン</Text>

        <AppCard>
          <Text style={styles.planName}>無料プラン</Text>
          <Bullet text="まいにち3語のれんしゅう" />
          <Bullet text="ふつうの音声できく" />
          <Bullet text="かんたんなふくしゅう" last />
        </AppCard>

        <AppCard style={styles.premiumCard}>
          <Text style={styles.planNamePremium}>Premium</Text>
          <Bullet text="もっと自然でききとりやすい音声" />
          <Bullet text="ゆっくりさいせい" />
          <Bullet text="音の区切りでさいせい" />
          <Bullet text="ぜんぶのレッスン" />
          <Bullet text="ふくしゅうはたくさん保存" last />
        </AppCard>

        <AppButton
          label="クリアな音声でれんしゅうする"
          onPress={() => onSubscribePress?.()}
        />

        <View style={styles.footer}>
          <Text style={styles.footerLine}>7日間ただ / いつでもやめる</Text>
          <Text style={styles.footerSoft}>まずは無料のままでもOK。</Text>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

function Bullet({ text, last }: { text: string; last?: boolean }) {
  return (
    <View style={[styles.bulletRow, last && styles.bulletRowLast]}>
      <Text style={styles.bulletDot}>・</Text>
      <Text style={styles.bulletText}>{text}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: colors.background,
  },
  scrollContent: {
    padding: 20,
    paddingBottom: 40,
    gap: 16,
  },
  headerBlock: {
    marginBottom: 4,
  },
  title: {
    fontSize: 24,
    lineHeight: 32,
    fontWeight: '800',
    color: colors.text,
    marginBottom: 10,
  },
  subtitle: {
    fontSize: 15,
    lineHeight: 22,
    color: colors.textSoft,
  },
  valueBody: {
    fontSize: 15,
    lineHeight: 24,
    color: colors.textSoft,
  },
  sectionLabel: {
    fontSize: 13,
    fontWeight: '700',
    color: colors.textMuted,
    marginBottom: 14,
    letterSpacing: 0.3,
  },
  compareRow: {
    flexDirection: 'row',
    alignItems: 'center',
    flexWrap: 'wrap',
    gap: 8,
    marginBottom: 12,
  },
  compareRowLast: {
    marginBottom: 0,
  },
  compareLabel: {
    fontSize: 14,
    fontWeight: '600',
    color: colors.textSoft,
    minWidth: 88,
  },
  compareArrow: {
    fontSize: 14,
    color: colors.textMuted,
  },
  compareExampleMuted: {
    fontSize: 17,
    fontWeight: '700',
    color: colors.textMuted,
    fontVariant: ['tabular-nums'],
  },
  compareExample: {
    fontSize: 17,
    fontWeight: '800',
    color: colors.primary,
    fontVariant: ['tabular-nums'],
  },
  planSectionTitle: {
    fontSize: 15,
    fontWeight: '800',
    color: colors.textMuted,
    marginTop: 4,
    marginBottom: -4,
  },
  planName: {
    fontSize: 17,
    fontWeight: '800',
    color: colors.text,
    marginBottom: 12,
  },
  planNamePremium: {
    fontSize: 17,
    fontWeight: '800',
    color: colors.primary,
    marginBottom: 12,
  },
  premiumCard: {
    backgroundColor: colors.primarySoft,
  },
  bulletRow: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    gap: 6,
    marginBottom: 8,
  },
  bulletRowLast: {
    marginBottom: 0,
  },
  bulletDot: {
    fontSize: 15,
    lineHeight: 22,
    color: colors.textMuted,
    marginTop: 1,
  },
  bulletText: {
    flex: 1,
    fontSize: 15,
    lineHeight: 22,
    color: colors.textSoft,
  },
  footer: {
    marginTop: 8,
    gap: 8,
    alignItems: 'center',
  },
  footerLine: {
    fontSize: 13,
    lineHeight: 20,
    color: colors.textMuted,
    textAlign: 'center',
  },
  footerSoft: {
    fontSize: 13,
    lineHeight: 20,
    color: colors.textSoft,
    textAlign: 'center',
  },
});
