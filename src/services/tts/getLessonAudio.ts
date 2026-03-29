import { getBasicLessonAudio } from './getBasicLessonAudio';
import { getPremiumLessonAudio } from './getPremiumLessonAudio';

type Params = {
  text: string;
  usePremiumVoice: boolean;
  /** Passed through to basic/premium TTS (Play/Slow). */
  mode?: 'normal' | 'slow';
};

export async function getLessonAudio({
  text,
  usePremiumVoice,
  mode = 'normal',
}: Params): Promise<string> {
  if (usePremiumVoice) {
    return await getPremiumLessonAudio(text, mode);
  }

  return await getBasicLessonAudio(text, mode);
}
