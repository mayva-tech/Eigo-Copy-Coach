import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const mdPath = path.join(__dirname, 'CURSOR_PROMPT_add_words_101-200.md');
const tsPath = path.join(__dirname, '..', 'src', 'data', 'toeicWords.ts');

const md = fs.readFileSync(mdPath, 'utf8');
const parts = md.split(/```js\s*\r?\n/);
let block = '';
for (const part of parts) {
  const end = part.indexOf('```');
  const chunk = end >= 0 ? part.slice(0, end) : part;
  if (chunk.includes('id:101')) {
    block = chunk.trimEnd();
    break;
  }
}
if (!block) throw new Error('Could not find words 101–200 js block in markdown');

const ids = [...block.matchAll(/id:(\d+)/g)].map((m) => Number(m[1]));
if (ids.length !== 100) throw new Error(`Expected 100 word objects, got ${ids.length}`);

let src = fs.readFileSync(tsPath, 'utf8');
const endMarker =
  '    pronNote:"Stress on 2nd syllable: uh-JEN-duh. The \'g\' makes a /dʒ/ sound like \'jump\'. 3 syllables"\n  },\n];';
if (!src.includes(endMarker)) throw new Error('End marker (id:100 agenda) not found in toeicWords.ts');

src = src.replace(endMarker, `    pronNote:"Stress on 2nd syllable: uh-JEN-duh. The 'g' makes a /dʒ/ sound like 'jump'. 3 syllables"\n  },\n${block}\n];`);

fs.writeFileSync(tsPath, src);
console.log('Appended words', ids[0], '–', ids[ids.length - 1], `(${ids.length} entries)`);
