import { ReactNode } from 'react';
import { StyleSheet, View } from 'react-native';
import { colors } from '@/src/constants/colors';

type AppCardProps = {
  children: ReactNode;
};

export default function AppCard({ children }: AppCardProps) {
  return <View style={styles.card}>{children}</View>;
}

const styles = StyleSheet.create({
  card: {
    backgroundColor: colors.surface,
    borderRadius: 24,
    padding: 18,
    borderWidth: 1,
    borderColor: colors.border,
  },
});
