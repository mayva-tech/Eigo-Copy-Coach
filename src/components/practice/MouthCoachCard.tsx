import { StyleSheet, Text } from 'react-native';
import AppCard from '@/src/components/common/AppCard';
import { colors } from '@/src/constants/colors';

type MouthCoachCardProps = {
  mouthTipJa: string;
};

export default function MouthCoachCard({ mouthTipJa }: MouthCoachCardProps) {
  return (
    <AppCard>
      <Text style={styles.title}>口のコツ</Text>
      <Text style={styles.body}>{mouthTipJa}</Text>
    </AppCard>
  );
}

const styles = StyleSheet.create({
  title: {
    fontSize: 18,
    fontWeight: '800',
    color: colors.text,
    marginBottom: 10,
  },
  body: {
    fontSize: 15,
    lineHeight: 22,
    color: colors.textSoft,
  },
});
