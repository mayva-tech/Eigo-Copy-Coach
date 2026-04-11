import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const srcPath = path.join(__dirname, '..', 'src', 'data', 'toeicWords.ts');
const src = fs.readFileSync(srcPath, 'utf8');

const re = /id:\s*(\d+),\s*word:"([^"]+)"/g;
/** @type {{id:number,word:string}[]} */
const rows = [];
let m;
while ((m = re.exec(src))) {
  rows.push({ id: Number(m[1]), word: m[2] });
}

const seenId = new Map();
const dupIds = [];
for (const r of rows) {
  if (seenId.has(r.id)) dupIds.push({ id: r.id, firstWord: seenId.get(r.id), duplicateWord: r.word });
  else seenId.set(r.id, r.word);
}

const byWord = new Map();
for (const r of rows) {
  const k = r.word.toLowerCase();
  if (!byWord.has(k)) byWord.set(k, []);
  byWord.get(k).push(r.id);
}

const duplicateWords = [...byWord.entries()]
  .filter(([, ids]) => ids.length > 1)
  .map(([word, ids]) => ({ word, ids }));

console.log(
  JSON.stringify(
    {
      totalRows: rows.length,
      uniqueIds: seenId.size,
      duplicateIdCount: dupIds.length,
      duplicateIds: dupIds,
      duplicateWordCount: duplicateWords.length,
      duplicateWords,
    },
    null,
    2,
  ),
);
