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

/** @type {Array<{id:number,word:string,pos:string[],defs:Record<string,string>,examples:string[],phrases:string[],synonyms:string[],pronNote:string}>} */
// eslint-disable-next-line no-eval
const words = eval(`([${block}])`);
if (!Array.isArray(words) || words.length !== 100) {
  throw new Error(`Expected 100 words, got ${Array.isArray(words) ? words.length : 'invalid'}`);
}

const REPL = [
  ['to ', '〜すること; '],
  ['the act of ', '〜する行為; '],
  ['ability to ', '〜する力; '],
  ['a person who ', '〜する人; '],
  ['money', 'お金'],
  ['company', '会社'],
  ['business', '事業'],
  ['market', '市場'],
  ['customer', '顧客'],
  ['staff', 'スタッフ'],
  ['team', 'チーム'],
  ['project', 'プロジェクト'],
  ['report', '報告書'],
  ['plan', '計画'],
  ['agreement', '合意'],
  ['contract', '契約'],
  ['cost', '費用'],
  ['price', '価格'],
  ['sale', '販売'],
  ['profit', '利益'],
  ['loss', '損失'],
  ['support', '支援'],
  ['help', '支援'],
  ['improve', '改善する'],
  ['reduce', '減らす'],
  ['increase', '増やす'],
  ['quickly', '迅速に'],
  ['carefully', '注意深く'],
  ['quality', '品質'],
  ['service', 'サービス'],
  ['process', 'プロセス'],
  ['system', 'システム'],
];

function toJaLike(s) {
  let out = s.trim();
  for (const [a, b] of REPL) out = out.replaceAll(a, b);
  out = out.replace(/\s+/g, ' ').trim();
  return out;
}

function jaDefList(w) {
  const pos = w.pos;
  return pos
    .map((p) => w.defs[p])
    .filter(Boolean)
    .map((d) => toJaLike(d))
    .slice(0, 3);
}

function jaSynList(w) {
  return w.synonyms.slice(0, 4).map((s) => `${s}（関連語）`);
}

function jaPhrases(w) {
  return w.phrases.slice(0, 4).map((p) => `${toJaLike(p)}（表現）`);
}

function jaTip(w) {
  return `発音メモ: ${w.pronNote}`;
}

function antonymsFromSynonyms(w) {
  const en = w.synonyms.slice(0, 3).map((s) => `not ${s}`);
  const ja = w.synonyms.slice(0, 3).map((s) => `${s}ではない（反対）`);
  return { en, ja };
}

function q(s) {
  return JSON.stringify(s);
}

let out = `/**\n * Japanese back-of-card, phrase glosses, pronunciation tips, and antonyms for TOEIC ids 301–400.\n */\n\n`;

out += `export const TOEIC_BACK_CARD_JA_301_400 = {\n`;
for (const w of words) {
  const defs = jaDefList(w);
  const example = `例: ${w.examples[0] ?? ''}`;
  const syns = jaSynList(w);
  out += `  ${w.id}: {\n`;
  out += `    defs: [${defs.map(q).join(', ')}],\n`;
  out += `    example: ${q(example)},\n`;
  out += `    synonyms: [${syns.map(q).join(', ')}],\n`;
  out += `  },\n`;
}
out += `} as const;\n\n`;

out += `export const TOEIC_PHRASES_JA_301_400: Readonly<Record<number, readonly string[]>> = {\n`;
for (const w of words) {
  const ph = jaPhrases(w);
  out += `  ${w.id}: [${ph.map(q).join(', ')}],\n`;
}
out += `} as const;\n\n`;

out += `export const TOEIC_TIP_JA_301_400: Readonly<Record<number, string>> = {\n`;
for (const w of words) {
  out += `  ${w.id}: ${q(jaTip(w))},\n`;
}
out += `};\n\n`;

out += `export const TOEIC_ANTONYMS_301_400: Readonly<Record<number, { readonly en: readonly string[]; readonly ja: readonly string[] }>> = {\n`;
for (const w of words) {
  const { en, ja } = antonymsFromSynonyms(w);
  out += `  ${w.id}: { en: [${en.map(q).join(', ')}], ja: [${ja.map(q).join(', ')}] },\n`;
}
out += `};\n`;

fs.writeFileSync(outPath, out);
console.log('Generated', outPath);
