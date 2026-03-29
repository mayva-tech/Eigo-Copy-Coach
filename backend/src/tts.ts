import textToSpeech from '@google-cloud/text-to-speech';

const client = new textToSpeech.TextToSpeechClient();

export type TtsRequestInput = {
  text: string;
  voiceName?: string;
  languageCode?: string;
  speakingRate?: number;
};

export async function synthesizeSpeech({
  text,
  voiceName = process.env.TTS_VOICE_NAME || 'en-US-Neural2-J',
  languageCode = process.env.TTS_LANGUAGE_CODE || 'en-US',
  speakingRate = 1.0,
}: TtsRequestInput): Promise<string> {
  const [response] = await client.synthesizeSpeech({
    input: { text },
    voice: {
      languageCode,
      name: voiceName,
    },
    audioConfig: {
      audioEncoding: 'MP3',
      speakingRate,
      // Slight boost so reference clips read well on phone speakers (typical range about -96..+16 dB).
      volumeGainDb: 4.0,
    },
  });

  const audioContent = response.audioContent;

  if (!audioContent) {
    throw new Error('No audio content returned from Google TTS');
  }

  return Buffer.from(audioContent as Uint8Array).toString('base64');
}
