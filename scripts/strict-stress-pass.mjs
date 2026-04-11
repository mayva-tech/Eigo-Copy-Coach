import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const p = path.join(__dirname, '..', 'src', 'data', 'toeicWords.ts');
let s = fs.readFileSync(p, 'utf8');

const re = /(id:\s*(\d+),\s*word:"([^"]+)",\s*stress:)"([^"]+)"/g;
let m;
const issues = [];
let fixed = 0;

function hasBadArtifacts(stress) {
  return (
    /-[a-z]-/i.test(stress) ||
    /[A-Z]{2,}[a-z]{0,2}-[A-Z]{2,}/.test(stress) ||
    /[a-z]{1,2}[A-Z]{2,}/.test(stress) ||
    /--/.test(stress) ||
    /[^A-Za-z ()·\-'/.]/.test(stress)
  );
}

function safeNormalize(word) {
  const w = word.toLowerCase().replace(/[^a-z]/g, '');
  if (!w) return word;
  if (w.startsWith('market')) {
    const tail = w.slice('market'.length);
    return tail ? `MAR-ket-${tail}` : 'MAR-ket';
  }
  // keep known dual-pronunciation forms untouched by returning null
  return null;
}

s = s.replace(re, (full, prefix, idRaw, word, stress) => {
  const id = Number(idRaw);
  if (hasBadArtifacts(stress)) {
    const norm = safeNormalize(word);
    if (norm) {
      fixed += 1;
      issues.push({ id, word, from: stress, to: norm, fixed: true });
      return `${prefix}"${norm}"`;
    }
    issues.push({ id, word, from: stress, fixed: false });
  }
  return full;
});

fs.writeFileSync(p, s);
console.log(JSON.stringify({ issues: issues.length, fixed, unresolved: issues.filter((x) => !x.fixed).length, sample: issues.slice(0, 30) }, null, 2));
