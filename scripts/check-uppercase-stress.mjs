import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const p = path.join(__dirname, '..', 'src', 'data', 'toeicWords.ts');
const s = fs.readFileSync(p, 'utf8');
const re = /id:\s*(\d+),\s*word:"([^"]+)",\s*stress:"([^"]+)"/g;
let m;
const bad = [];
while ((m = re.exec(s))) {
  const id = Number(m[1]);
  const word = m[2];
  const stress = m[3];
  if (/^[A-Z]+$/.test(stress) && stress.length >= 4) bad.push({ id, word, stress });
}
console.log(JSON.stringify({ count: bad.length, bad }, null, 2));
