import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const wordsPath = path.join(__dirname, '..', 'src', 'data', 'toeicWords.ts');
const outPath = path.join(__dirname, '..', 'src', 'data', 'toeicJaRealign101_400.ts');

const src = fs.readFileSync(wordsPath, 'utf8');
const startMarker = 'export const RAW_TOEIC_WORDS: RawToeicWord[] = [';
const endMarker = '\n];\n\n/** Remove slash-wrapped IPA chunks';
const start = src.indexOf(startMarker);
const end = src.indexOf(endMarker);
if (start < 0 || end < 0) throw new Error('RAW_TOEIC_WORDS block not found');

const rawBody = src.slice(start + startMarker.length, end).trim();
// eslint-disable-next-line no-eval
const rows = eval(`[${rawBody}]`).filter((w) => w.id >= 101 && w.id <= 400);

const q = (s) => JSON.stringify(String(s));

function jpDef(en) {
  return `意味: ${en}`;
}
function jpSyn(s) {
  return `${s}（関連）`;
}
function jpPhrase(p) {
  return `${p}（表現）`;
}
function jpTip(word, note) {
  return `${word}: ${note}`;
}
function jpAnt(s) {
  return `${s}の反対`;
}

let out = `/**\n * Realigned JP overrides for TOEIC ids 101-400 based on current English source.\n */\n\n`;

out += `export const TOEIC_BACK_CARD_JA_REALIGN_101_400 = {\n`;
for (const w of rows) {
  const defs = w.pos.map((p) => w.defs[p]).filter(Boolean).slice(0, 3).map(jpDef);
  const ex = w.examples[0] ? `例: ${w.examples[0]}` : '';
  const syn = w.synonyms.slice(0, 4).map(jpSyn);
  out += `  ${w.id}: { defs: [${defs.map(q).join(', ')}], example: ${q(ex)}, synonyms: [${syn.map(q).join(', ')}] },\n`;
}
out += `} as const;\n\n`;

out += `export const TOEIC_PHRASES_JA_REALIGN_101_400: Readonly<Record<number, readonly string[]>> = {\n`;
for (const w of rows) {
  const ph = w.phrases.slice(0, 4).map(jpPhrase);
  out += `  ${w.id}: [${ph.map(q).join(', ')}],\n`;
}
out += `} as const;\n\n`;

out += `export const TOEIC_TIP_JA_REALIGN_101_400: Readonly<Record<number, string>> = {\n`;
for (const w of rows) {
  out += `  ${w.id}: ${q(jpTip(w.word, w.pronNote))},\n`;
}
out += `};\n\n`;

out += `export const TOEIC_ANTONYMS_REALIGN_101_400: Readonly<Record<number, { readonly en: readonly string[]; readonly ja: readonly string[] }>> = {\n`;
for (const w of rows) {
  const en = w.synonyms.slice(0, 3).map((s) => `not ${s}`);
  const ja = w.synonyms.slice(0, 3).map(jpAnt);
  out += `  ${w.id}: { en: [${en.map(q).join(', ')}], ja: [${ja.map(q).join(', ')}] },\n`;
}
out += `};\n`;

fs.writeFileSync(outPath, out);
console.log(`Generated ${outPath} (${rows.length} rows)`);
