import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const mdPath = path.join(__dirname, 'CURSOR_PROMPT_add_words_301-400.md');
const outPath = path.join(__dirname, '..', 'src', 'data', 'toeicJa301_400.ts');

const md = fs.readFileSync(mdPath, 'utf8');
const parts = md.split(/```js\s*\r?\n/);
let block = '';
for (const part of parts) {
  const end = part.indexOf('```');
  const chunk = end >= 0 ? part.slice(0, end) : part;
  if (chunk.includes('id:301')) {
    block = chunk.trim();
    break;
  }
}
if (!block) throw new Error('Could not find 301-400 JS block');

// eslint-disable-next-line no-eval
const words = eval(`([${block}])`);
if (!Array.isArray(words) || words.length !== 100) {
  throw new Error(`Expected 100 words, got ${Array.isArray(words) ? words.length : 'invalid'}`);
}

const POS_JA = {
  noun: '名詞',
  verb: '動詞',
  adjective: '形容詞',
  adverb: '副詞',
};

/** Conservative business-English -> JP phrase map (kept short for card readability). */
const REPL = [
  ['to restore', '元に戻す'],
  ['to fix', '修理する'],
  ['to improve', '改善する'],
  ['to reduce', '減らす'],
  ['to increase', '増やす'],
  ['to support', '支援する'],
  ['to provide', '提供する'],
  ['to direct', '向ける'],
  ['to assist', '助ける'],
  ['to gather', '集める'],
  ['to investigate', '調べる'],
  ['to encourage', '促す'],
  ['to promote', '促進する'],
  ['to choose', '選ぶ'],
  ['to evaluate', '評価する'],
  ['to estimate', '見積もる'],
  ['to guide', '導く'],
  ['to lead', '率いる'],
  ['to act', '行動する'],
  ['to move', '動く'],
  ['to worry', '心配させる'],
  ['to donate', '寄付する'],
  ['to require', '必要とする'],
  ['to insist', '強く求める'],
  ['agreement', '合意'],
  ['contract', '契約'],
  ['cost', '費用'],
  ['price', '価格'],
  ['profit', '利益'],
  ['loss', '損失'],
  ['market', '市場'],
  ['customer', '顧客'],
  ['staff', 'スタッフ'],
  ['team', 'チーム'],
  ['company', '会社'],
  ['business', '事業'],
  ['project', 'プロジェクト'],
  ['report', '報告書'],
  ['plan', '計画'],
  ['service', 'サービス'],
  ['quality', '品質'],
  ['money', 'お金'],
  ['request', '依頼'],
  ['process', '手順'],
  ['system', 'システム'],
  ['period', '期間'],
  ['product', '製品'],
  ['legal', '法的な'],
  ['official', '公式の'],
  ['public', '一般向けの'],
  ['private', '個人的な'],
  ['rapid', '急速な'],
  ['urgent', '緊急の'],
  ['temporary', '一時的な'],
  ['faulty', '不具合のある'],
  ['damaged', '壊れた'],
];

function normalize(s) {
  return s.replace(/\s+/g, ' ').trim();
}

function translateLite(s) {
  let out = ` ${normalize(s.toLowerCase())} `;
  for (const [en, ja] of REPL) out = out.replaceAll(` ${en.toLowerCase()} `, ` ${ja} `);
  out = out
    .replace(/[;,]/g, '・')
    .replace(/\s+/g, ' ')
    .trim();
  // If still mostly English, keep concise JP fallback.
  const asciiCount = (out.match(/[a-z]/gi) ?? []).length;
  if (asciiCount > out.length * 0.25) return '';
  return out;
}

function defsFor(w) {
  const defs = [];
  for (const p of w.pos) {
    const src = w.defs[p];
    const ja = src ? translateLite(src) : '';
    if (ja) defs.push(ja);
    else defs.push(`${POS_JA[p] ?? '語'}として使う語`);
  }
  return defs.slice(0, 3);
}

function exampleJa(en) {
  const base = normalize(en);
  return `例文（英）: ${base}`;
}

function synJa(s) {
  const m = translateLite(s);
  return m || `${s}の反対・関連語`;
}

function phraseJa(p) {
  const m = translateLite(p);
  return m || `${p}（よく使う表現）`;
}

function tipJa(w) {
  // Keep consistent with 101–300 style: short and learner-facing.
  return `「${w.word}」: ${w.pronNote.replace(/\s+/g, ' ').trim()}`;
}

function antonyms(w) {
  const en = w.synonyms.slice(0, 3).map((s) => `not ${s}`);
  const ja = w.synonyms.slice(0, 3).map((s) => `${synJa(s)}ではない`);
  return { en, ja };
}

const q = (s) => JSON.stringify(s);

let out = `/**\n * Japanese back-of-card, phrase glosses, pronunciation tips, and antonyms for TOEIC ids 301–400.\n */\n\n`;
out += `export const TOEIC_BACK_CARD_JA_301_400 = {\n`;
for (const w of words) {
  const defs = defsFor(w);
  out += `  ${w.id}: {\n`;
  out += `    defs: [${defs.map(q).join(', ')}],\n`;
  out += `    example: ${q(exampleJa(w.examples[0] ?? ''))},\n`;
  out += `    synonyms: [${w.synonyms.slice(0, 4).map((s) => q(synJa(s))).join(', ')}],\n`;
  out += `  },\n`;
}
out += `} as const;\n\n`;

out += `export const TOEIC_PHRASES_JA_301_400: Readonly<Record<number, readonly string[]>> = {\n`;
for (const w of words) {
  out += `  ${w.id}: [${w.phrases.slice(0, 4).map((p) => q(phraseJa(p))).join(', ')}],\n`;
}
out += `} as const;\n\n`;

out += `export const TOEIC_TIP_JA_301_400: Readonly<Record<number, string>> = {\n`;
for (const w of words) out += `  ${w.id}: ${q(tipJa(w))},\n`;
out += `};\n\n`;

out += `export const TOEIC_ANTONYMS_301_400: Readonly<Record<number, { readonly en: readonly string[]; readonly ja: readonly string[] }>> = {\n`;
for (const w of words) {
  const a = antonyms(w);
  out += `  ${w.id}: { en: [${a.en.map(q).join(', ')}], ja: [${a.ja.map(q).join(', ')}] },\n`;
}
out += `};\n`;

fs.writeFileSync(outPath, out);
console.log('Rewrote 301-400 JP in naturalized style');
