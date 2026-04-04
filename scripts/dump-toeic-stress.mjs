import fs from 'fs';

const t = fs.readFileSync('src/data/toeicWords.ts', 'utf8');
const re = /id:(\d+), word:"([^"]+)", stress:"([^"]+)"/g;
const out = [];
let m;
while ((m = re.exec(t))) {
  out.push({ id: +m[1], word: m[2], stress: m[3] });
}
fs.writeFileSync('scripts/_stress-dump.json', JSON.stringify(out, null, 2), 'utf8');
console.log('count', out.length);
