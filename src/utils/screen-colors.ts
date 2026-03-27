import { useColorScheme } from 'react-native';

/** Minimal light/dark surface + text colors for screens (replaces template theme helpers). */
export function useScreenColors() {
  const scheme = useColorScheme() ?? 'light';
  if (scheme === 'dark') {
    return {
      scheme: 'dark' as const,
      background: '#151718',
      text: '#ECEDEE',
      textMuted: '#9BA1A6',
      tint: '#4ec5e0',
      card: 'rgba(78, 197, 224, 0.12)',
    };
  }
  return {
    scheme: 'light' as const,
    background: '#fff',
    text: '#11181C',
    textMuted: '#687076',
    tint: '#0a7ea4',
    card: 'rgba(10, 126, 164, 0.12)',
  };
}
