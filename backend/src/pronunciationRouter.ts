/**
 * pronunciationRouter.ts
 */

import express, { Request, Response } from 'express';
import * as sdk from 'microsoft-cognitiveservices-speech-sdk';
import * as os from 'os';
import * as fs from 'fs';
import * as path from 'path';
import * as crypto from 'crypto';

// Use require() for CJS modules to avoid ESM default-import interop issues under tsx
// eslint-disable-next-line @typescript-eslint/no-require-imports
const ffmpeg = require('fluent-ffmpeg') as typeof import('fluent-ffmpeg');
// eslint-disable-next-line @typescript-eslint/no-require-imports
const ffmpegInstaller = require('@ffmpeg-installer/ffmpeg') as { path: string; version: string };

ffmpeg.setFfmpegPath(ffmpegInstaller.path);

const router = express.Router();

router.get('/score-pronunciation/health', (_req: Request, res: Response) => {
  const hasKey = !!process.env.AZURE_SPEECH_KEY?.trim();
  const hasRegion = !!process.env.AZURE_SPEECH_REGION?.trim();
  res.json({
    ok: hasKey && hasRegion,
    azure: hasKey && hasRegion ? 'configured' : 'missing_credentials',
    timestamp: new Date().toISOString(),
  });
});

interface ScoreRequest {
  audioBase64: string;
  referenceText: string;
  locale?: string;
}

interface WordResult {
  word: string;
  accuracyScore: number;
  errorType: 'None' | 'Mispronunciation' | 'Omission' | 'Insertion';
}

interface ScoreResponse {
  accuracyScore: number;
  fluencyScore: number;
  completenessScore: number;
  pronunciationScore: number;
  words: WordResult[];
  feedback: string;
}

function getAzureConfig(): { key: string; region: string } {
  const key = process.env.AZURE_SPEECH_KEY?.trim();
  const region = process.env.AZURE_SPEECH_REGION?.trim();
  if (!key || !region) {
    throw new Error('AZURE_SPEECH_KEY and AZURE_SPEECH_REGION must be set in .env.');
  }
  return { key, region };
}

function validateRequest(body: unknown): ScoreRequest {
  const { audioBase64, referenceText, locale } = (body ?? {}) as Record<string, unknown>;
  if (!audioBase64 || typeof audioBase64 !== 'string' || audioBase64.trim() === '') {
    throw Object.assign(new Error('Missing or empty audioBase64'), { statusCode: 400 });
  }
  if (!referenceText || typeof referenceText !== 'string' || referenceText.trim() === '') {
    throw Object.assign(new Error('Missing or empty referenceText'), { statusCode: 400 });
  }
  return {
    audioBase64,
    referenceText: referenceText.trim(),
    locale: typeof locale === 'string' && locale.trim() ? locale.trim() : 'en-US',
  };
}

function decodeBase64ToTempFile(audioBase64: string): string {
  const inputPath = path.join(os.tmpdir(), `pronunciation-in-${crypto.randomUUID()}.audio`);
  const audioBuffer = Buffer.from(audioBase64, 'base64');
  if (audioBuffer.length < 512) {
    throw Object.assign(
      new Error(`Audio buffer too small (${audioBuffer.length} bytes). Recording may be empty.`),
      { statusCode: 422 },
    );
  }
  fs.writeFileSync(inputPath, audioBuffer);
  return inputPath;
}

function convertToWav(inputPath: string): Promise<string> {
  const outputPath = path.join(os.tmpdir(), `pronunciation-wav-${crypto.randomUUID()}.wav`);
  return new Promise((resolve, reject) => {
    ffmpeg(inputPath)
      .audioFrequency(16000)
      .audioChannels(1)
      .audioCodec('pcm_s16le')
      .format('wav')
      .on('error', (err: Error) => {
        fs.unlink(inputPath, () => {});
        reject(new Error(`ffmpeg conversion failed: ${err.message}`));
      })
      .on('end', () => {
        fs.unlink(inputPath, () => {});
        resolve(outputPath);
      })
      .save(outputPath);
  });
}

async function runAzureAssessment(
  wavPath: string,
  referenceText: string,
  locale: string,
  azureKey: string,
  azureRegion: string,
): Promise<sdk.SpeechRecognitionResult> {
  const speechConfig = sdk.SpeechConfig.fromSubscription(azureKey, azureRegion);
  speechConfig.speechRecognitionLanguage = locale;
  const pronunciationConfig = new sdk.PronunciationAssessmentConfig(
    referenceText,
    sdk.PronunciationAssessmentGradingSystem.HundredMark,
    sdk.PronunciationAssessmentGranularity.Phoneme,
    true,
  );
  const audioConfig = sdk.AudioConfig.fromWavFileInput(fs.readFileSync(wavPath));
  const recognizer = new sdk.SpeechRecognizer(speechConfig, audioConfig);
  pronunciationConfig.applyTo(recognizer);
  try {
    const result = await new Promise<sdk.SpeechRecognitionResult>((resolve, reject) => {
      recognizer.recognizeOnceAsync(
        (r) => resolve(r),
        (err) => reject(new Error(String(err))),
      );
    });
    return result;
  } finally {
    recognizer.close();
    fs.unlink(wavPath, () => {});
  }
}

function mapAzureResult(result: sdk.SpeechRecognitionResult): Omit<ScoreResponse, 'feedback'> {
  if (result.reason === sdk.ResultReason.NoMatch) {
    throw Object.assign(
      new Error('No speech detected. Recording may be silent, too short, or too noisy.'),
      { statusCode: 422 },
    );
  }
  if (result.reason !== sdk.ResultReason.RecognizedSpeech) {
    const detail = sdk.CancellationDetails.fromResult(result);
    throw new Error(`Azure recognition failed: ${sdk.CancellationReason[detail.reason]} — ${detail.errorDetails}`);
  }
  const assessment = sdk.PronunciationAssessmentResult.fromResult(result);
  const rawJson = result.properties.getProperty(sdk.PropertyId.SpeechServiceResponse_JsonResult);
  const jsonResult = rawJson ? JSON.parse(rawJson) : null;
  if (!jsonResult?.NBest?.[0]) {
    throw new Error('Azure returned no NBest data. Cannot extract word-level scores.');
  }
  const rawWords: Array<{
    Word: string;
    PronunciationAssessment?: { AccuracyScore?: number; ErrorType?: string };
  }> = jsonResult.NBest[0].Words ?? [];
  const words: WordResult[] = rawWords.map((w) => ({
    word: w.Word ?? '',
    accuracyScore: Math.round(w.PronunciationAssessment?.AccuracyScore ?? 0),
    errorType: (w.PronunciationAssessment?.ErrorType ?? 'None') as WordResult['errorType'],
  }));
  return {
    accuracyScore: Math.round(assessment.accuracyScore ?? 0),
    fluencyScore: Math.round(assessment.fluencyScore ?? 0),
    completenessScore: Math.round(assessment.completenessScore ?? 0),
    pronunciationScore: Math.round(assessment.pronunciationScore ?? 0),
    words,
  };
}

function buildFeedback(words: WordResult[], pronunciationScore: number): string {
  const omissions = words.filter((w) => w.errorType === 'Omission');
  if (omissions.length > 0) {
    const w = omissions[0].word;
    return `「${w}」の音が聞こえません。語尾まで発音しましょう。 / Missing sound in "${w}" — try to complete it.`;
  }
  const insertions = words.filter((w) => w.errorType === 'Insertion');
  if (insertions.length > 0) {
    const w = insertions[0].word;
    return `「${w}」に余分な音が入っています。カタカナ読みに注意。 / Extra sound near "${w}" — avoid adding vowels between consonants.`;
  }
  const mispronounced = words
    .filter((w) => w.errorType === 'Mispronunciation')
    .sort((a, b) => a.accuracyScore - b.accuracyScore);
  if (mispronounced.length > 0) {
    const w = mispronounced[0].word;
    const score = mispronounced[0].accuracyScore;
    if (score < 40) return `「${w}」の発音がかなりちがいます。ゆっくり確認してください。 / "${w}" sounds quite different — listen slowly and try again.`;
    return `「${w}」の発音を確認しましょう。 / Watch the pronunciation of "${w}".`;
  }
  if (pronunciationScore >= 90) return 'とてもよい発音です！ / Excellent pronunciation — well done!';
  if (pronunciationScore >= 75) return 'いい感じです。もう少し自然に言えるか試してみよう。 / Good job! Try to sound a bit more natural.';
  if (pronunciationScore >= 60) return 'もう一度チャレンジしてみよう。音をもっとはっきり出して。 / Try once more and aim for clearer sounds.';
  return 'ゆっくりきいてもう一度試してください。 / Listen to the slow version and try again.';
}

// GET probe — test the route is alive
router.get('/score-pronunciation', (_req: Request, res: Response) => {
  res.json({
    ok: true,
    route: 'POST /score-pronunciation',
    azureKeySet: !!process.env.AZURE_SPEECH_KEY?.trim(),
    azureRegionSet: !!process.env.AZURE_SPEECH_REGION?.trim(),
    ffmpegPath: ffmpegInstaller.path,
  });
});

router.post('/score-pronunciation', async (req: Request, res: Response) => {
  let request: ScoreRequest;
  try {
    request = validateRequest(req.body);
  } catch (err) {
    const e = err as Error & { statusCode?: number };
    return res.status(e.statusCode ?? 400).json({ error: e.message });
  }

  let azureConfig: { key: string; region: string };
  try {
    azureConfig = getAzureConfig();
  } catch (err) {
    const message = err instanceof Error ? err.message : String(err);
    console.error('[score-pronunciation] Azure config error:', message);
    return res.status(500).json({ error: message });
  }

  let inputPath: string;
  try {
    inputPath = decodeBase64ToTempFile(request.audioBase64);
  } catch (err) {
    const e = err as Error & { statusCode?: number };
    return res.status(e.statusCode ?? 400).json({ error: e.message });
  }

  let wavPath: string;
  try {
    wavPath = await convertToWav(inputPath);
  } catch (err) {
    const message = err instanceof Error ? err.message : String(err);
    console.error('[score-pronunciation] Conversion error:', message);
    return res.status(422).json({ error: `Audio conversion failed: ${message}` });
  }

  let rawResult: sdk.SpeechRecognitionResult;
  try {
    rawResult = await runAzureAssessment(
      wavPath,
      request.referenceText,
      request.locale ?? 'en-US',
      azureConfig.key,
      azureConfig.region,
    );
  } catch (err) {
    const message = err instanceof Error ? err.message : String(err);
    console.error('[score-pronunciation] Azure error:', message);
    return res.status(500).json({ error: message });
  }

  let scored: Omit<ScoreResponse, 'feedback'>;
  try {
    scored = mapAzureResult(rawResult);
  } catch (err) {
    const e = err as Error & { statusCode?: number };
    console.error('[score-pronunciation] Mapping error:', e.message);
    return res.status(e.statusCode ?? 500).json({ error: e.message });
  }

  const payload: ScoreResponse = {
    ...scored,
    feedback: buildFeedback(scored.words, scored.pronunciationScore),
  };

  if (process.env.NODE_ENV !== 'production') {
    console.log('[score-pronunciation]', {
      referenceText: request.referenceText,
      pronunciationScore: payload.pronunciationScore,
      wordCount: payload.words.length,
      errors: payload.words.filter((w) => w.errorType !== 'None').map((w) => `${w.word}:${w.errorType}`),
    });
  }

  return res.json(payload);
});

export default router;
