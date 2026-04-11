import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const target = path.join(__dirname, '..', 'src', 'data', 'toeicWords.ts');
let src = fs.readFileSync(target, 'utf8');

function syllableChunks(word) {
  const w = word.toLowerCase().replace(/[^a-z]/g, '');
  if (!w) return [];
  const parts = w.match(/[^aeiouy]*[aeiouy]+(?:[^aeiouy]+(?=[^aeiouy]*[aeiouy]|$))?/g);
  return parts && parts.length ? parts : [w];
}

function toStress(word) {
  const parts = syllableChunks(word);
  if (parts.length === 1) {
    const p = parts[0];
    if (p.length <= 3) return p.toUpperCase();
    return `${p.slice(0, 3).toUpperCase()}-${p.slice(3)}`;
  }
  const stressIdx = parts.length === 2 ? 1 : 1; // simple learner-friendly default
  return parts.map((p, i) => (i === stressIdx ? p.toUpperCase() : p.toLowerCase())).join('-');
}

const re = /(id:\s*\d+,\s*word:"([^"]+)",\s*stress:)"([^"]+)"/g;
let changed = 0;
src = src.replace(re, (full, prefix, word, stress) => {
  if (!/^[A-Z]+$/.test(stress) || stress.length < 4) return full;
  changed += 1;
  return `${prefix}"${toStress(word)}"`;
});

fs.writeFileSync(target, src);
console.log(`Normalized stress format for ${changed} entries.`);
