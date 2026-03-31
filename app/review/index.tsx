import { Redirect } from 'expo-router';

/** Deep links / legacy path → History tab. */
export default function ReviewRedirect() {
  return <Redirect href="/(tabs)/history" />;
}
