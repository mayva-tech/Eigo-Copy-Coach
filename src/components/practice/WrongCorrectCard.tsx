import { StyleSheet, Text, View } from 'react-native';
import AppCard from '@/src/components/common/AppCard';
import { colors } from '@/src/constants/colors';

type WrongCorrectCardProps = {
  avoidGuide: string;
  sayItLike: string;
};

export default function WrongCorrectCard({
  avoidGuide,
  sayItLike,
}: WrongCorrectCardProps) {
  return (
    <AppCard>
      <Text style={styles.title}>ちがいを見る</Text>

      <View style={styles.compareWrap}>
        <View style={styles.side}>
          <Text style={styles.badLabel}>さけたい形</Text>
          <Text style={styles.badText}>{avoidGuide}</Text>
        </View>

        <View style={styles.divider} />

        <View style={styles.side}>
          <Text style={styles.goodLabel}>近づけたい形</Text>
          <Text style={styles.goodText}>{sayItLike}</Text>
        </View>
      </View>
    </AppCard>
  );
}

const styles = StyleSheet.create({
  title: {
    fontSize: 18,
    fontWeight: '800',
    color: colors.text,
    marginBottom: 14,
  },
  compareWrap: {
    flexDirection: 'row',
    backgroundColor: colors.surfaceSoft,
    borderRadius: 18,
    overflow: 'hidden',
  },
  side: {
    flex: 1,
    padding: 16,
  },
  divider: {
    width: 1,
    backgroundColor: colors.border,
  },
  badLabel: {
    fontSize: 12,
    fontWeight: '800',
    color: colors.dangerText,
    textTransform: 'uppercase',
    marginBottom: 8,
  },
  badText: {
    fontSize: 20,
    fontWeight: '800',
    color: colors.dangerText,
  },
  goodLabel: {
    fontSize: 12,
    fontWeight: '800',
    color: colors.successText,
    textTransform: 'uppercase',
    marginBottom: 8,
  },
  goodText: {
    fontSize: 20,
    fontWeight: '800',
    color: colors.successText,
  },
});
