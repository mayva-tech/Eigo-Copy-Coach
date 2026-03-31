import { StyleSheet, Text, View } from 'react-native';
import Svg, { Circle, Line, Path } from 'react-native-svg';

import { theme } from '@/src/theme/pronunciationTheme';

type ScoreGaugeProps = {
  /** 0–100 */
  score: number;
};

/** Semicircle center (full circle center; we draw upper half only). */
const CX = 130;
const CY = 130;
const R = 96;
const STROKE = 12;

/** Upper semicircle: diameter at y = CY, bulge toward smaller y (upward on screen). */
const ARC_PATH = `M ${CX - R} ${CY} A ${R} ${R} 0 0 1 ${CX + R} ${CY}`;
const ARC_LEN = Math.PI * R;

function clampScore(n: number) {
  return Math.min(100, Math.max(0, n));
}

export default function ScoreGauge({ score }: ScoreGaugeProps) {
  const t = clampScore(score) / 100;
  const dashOffset = ARC_LEN * (1 - t);

  const angle = Math.PI * (1 - t);
  const inner = R - 14;
  const tipX = CX + inner * Math.cos(angle);
  const tipY = CY - inner * Math.sin(angle);

  return (
    <View style={styles.wrap}>
      <View style={styles.svgWrap}>
        <Svg width={260} height={138} viewBox="0 0 260 140">
          {/* Track — one continuous arc */}
          <Path
            d={ARC_PATH}
            stroke={theme.colors.borderSubtle}
            strokeWidth={STROKE}
            strokeLinecap="round"
            fill="none"
          />
          {/* Progress — same path, dash reveals completed portion (no gap at joint) */}
          <Path
            d={ARC_PATH}
            stroke={theme.colors.accentGold}
            strokeWidth={STROKE}
            strokeLinecap="round"
            fill="none"
            strokeDasharray={`${ARC_LEN} ${ARC_LEN}`}
            strokeDashoffset={dashOffset}
          />
          <Line
            x1={CX}
            y1={CY}
            x2={tipX}
            y2={tipY}
            stroke={theme.colors.text}
            strokeWidth={1.5}
            strokeLinecap="round"
          />
          <Circle cx={CX} cy={CY} r={4} fill={theme.colors.text} />
        </Svg>
      </View>

      <Text style={styles.score}>{Math.round(clampScore(score))}%</Text>
      <Text style={styles.label}>CLARITY SCORE</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  wrap: {
    alignItems: 'center',
    marginTop: theme.space.md,
    marginBottom: theme.space.lg,
  },
  svgWrap: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  score: {
    marginTop: theme.space.md,
    fontFamily: theme.fontDisplay,
    fontSize: 36,
    fontWeight: '600',
    color: theme.colors.text,
    letterSpacing: -0.5,
  },
  label: {
    marginTop: theme.space.sm,
    fontSize: 10,
    fontWeight: '700',
    letterSpacing: 2.4,
    color: theme.colors.textMuted,
    textTransform: 'uppercase',
  },
});
