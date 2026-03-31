import cors from 'cors';
import 'dotenv/config';
import express from 'express';
import fs from 'fs';
import crypto from 'node:crypto';
import { synthesizeSpeech } from './tts.js';

const keyPath = (process.env.GOOGLE_APPLICATION_CREDENTIALS || '').trim();

if (!keyPath) {
  console.warn(
    '[credentials] GOOGLE_APPLICATION_CREDENTIALS is not set. Set it to your service account JSON path.',
  );
} else if (!fs.existsSync(keyPath)) {
  console.warn('[credentials] Key file not found:', keyPath);
} else {
  try {
    const raw = fs.readFileSync(keyPath, 'utf8');
    const json = JSON.parse(raw) as { private_key?: string };
    if (json.private_key) {
      crypto.createPrivateKey(json.private_key);
    }
  } catch (e) {
    const msg = e instanceof Error ? e.message : String(e);
    console.error(
      '[credentials] Invalid service account file or private_key PEM (this causes gRPC "DECODER routines::unsupported").',
      '\n  Fix: download a new JSON key from GCP (IAM → Service account → Keys), save as UTF-8 without BOM,',
      '\n  and quote the path in .env if it contains spaces, e.g. GOOGLE_APPLICATION_CREDENTIALS="C:/Users/.../key.json"',
      '\n  Underlying error:',
      msg,
    );
  }
}

const app = express();

app.use(cors());
app.use(express.json({ limit: '1mb' }));
app.get('/', (_req, res) => {
  res.json({ message: 'TTS backend is running' });
});
app.get('/health', (_req, res) => {
  res.json({ ok: true });
});

app.get('/tts', (_req, res) => {
  res.status(405).set('Allow', 'POST').json({
    error:
      'TTS uses POST, not GET. Send JSON: { "text": "hello", "mode": "normal" | "slow" }. Example (PowerShell): Invoke-RestMethod -Uri http://localhost:8080/tts -Method Post -ContentType "application/json" -Body \'{"text":"hello"}\'',
  });
});

app.post('/tts', async (req, res) => {
  try {
    const {
      text,
      mode: modeRaw,
      voiceName,
    }: {
      text?: string;
      mode?: string;
      voiceName?: string;
    } = req.body ?? {};

    if (!text || typeof text !== 'string') {
      return res.status(400).json({ success: false, error: 'Missing text' });
    }

    const mode =
      typeof modeRaw === 'string' && modeRaw.toLowerCase().trim() === 'slow'
        ? 'slow'
        : 'normal';

    // Google speakingRate: 1.0 = default; ~0.5 ≈ 2× slower, 0.25 = min (≈ 4× slower than 1.0).
    const speakingRate = mode === 'slow' ? 0.25 : 0.5;

    const audioBase64 = await synthesizeSpeech({
      text,
      voiceName,
      speakingRate,
    });

    return res.json({
      success: true,
      mimeType: 'audio/mpeg',
      audioBase64,
    });
  } catch (error) {
    console.error('TTS error:', error);

    const message =
      error instanceof Error ? error.message : 'Unknown server error';

    return res.status(500).json({
      success: false,
      error: message,
    });
  }
});

const port = Number(process.env.PORT || 8080);

app.listen(port, '0.0.0.0', () => {
  console.log('TTS server running on:');
  console.log(`- http://localhost:${port}`);
  console.log(`- http://192.168.11.40:${port}  <-- replace with your current LAN IP`);
});
