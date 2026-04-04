import fs from 'fs';

const t = fs.readFileSync('src/data/toeicWords.ts', 'utf8');
const start = t.indexOf('export const RAW_TOEIC_WORDS');
const arr = t.slice(start);
const re = /id:(\d+)[\s\S]*?phrases:\[([\s\S]*?)\]\s*,\s*synonyms:/g;
const out = [];
let m;
while ((m = re.exec(arr))) {
  const id = +m[1];
  const inner = m[2].trim();
  const phrases = JSON.parse(`[${inner}]`);
  out.push({ id, phrases });
}
fs.writeFileSync('scripts/_phrases-dump.json', JSON.stringify(out, null, 2), 'utf8');
console.log('words', out.length);
