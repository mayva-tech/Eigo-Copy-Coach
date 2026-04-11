# Cursor Task: Fix rawToToeic mapper in src/data/toeicWords.ts

## The problem

`rawToToeic` only sets 9 of the 16 required `ToeicWord` fields.
Three supplemental data files already contain the missing data but are never
imported or used in the mapper. TypeScript fails because every field on
`ToeicWord` is non-optional.

Missing fields and where their data lives:

| Missing field(s)               | Source file              | Exported constant         |
|-------------------------------|--------------------------|---------------------------|
| `definitionsJa`, `exampleJa`, `synonymsJa` | `./toeicBackCardJa`  | `TOEIC_BACK_CARD_JA`  |
| `antonyms`, `antonymsJa`      | `./toeicAntonyms`        | `TOEIC_ANTONYMS`          |
| `tipJa`                       | `./toeicTipJa`           | `TOEIC_TIP_JA`            |

---

## STEP 1 — Add three imports at the top of src/data/toeicWords.ts

Find this existing import line (it is already there):
```ts
import { phraseJaFor } from './toeicPhrasesJa';
```

Add these three lines directly after it:
```ts
import { TOEIC_BACK_CARD_JA } from './toeicBackCardJa';
import { TOEIC_ANTONYMS } from './toeicAntonyms';
import { TOEIC_TIP_JA } from './toeicTipJa';
```

---

## STEP 2 — Replace the rawToToeic function body

Find and replace the entire `rawToToeic` function — from `function rawToToeic`
through its closing `}` — with this:

```ts
function rawToToeic(w: RawToeicWord): ToeicWord {
  const definitions = w.pos
    .map((p) => w.defs[p])
    .filter((d): d is string => typeof d === 'string' && d.length > 0);

  const backCard = TOEIC_BACK_CARD_JA[w.id];
  const antonymRow = TOEIC_ANTONYMS[w.id];

  return {
    id: w.id,
    word: w.word,
    stressHint: w.stress,
    difficulty: w.difficulty,
    partOfSpeech: w.pos,
    meaningJa: backCard?.defs[0] ?? '',
    definitions,
    definitionsJa: backCard?.defs ?? [],
    example: w.examples[0] ?? '',
    exampleJa: backCard?.example ?? '',
    phrases: w.phrases.map((en, i) => ({ en, ja: phraseJaFor(w.id, i) })),
    synonyms: w.synonyms,
    synonymsJa: backCard?.synonyms ? [...backCard.synonyms] : [],
    antonyms: antonymRow?.en ? [...antonymRow.en] : [],
    antonymsJa: antonymRow?.ja ? [...antonymRow.ja] : [],
    pronunciationTipJa: stripIPAFromTip(w.pronNote),
    tipJa: TOEIC_TIP_JA[w.id] ?? '',
  };
}
```

---

## STEP 3 — Verify nothing else needs to change

- `TOEIC_WORDS` export line (`export const TOEIC_WORDS: ToeicWord[] = RAW_TOEIC_WORDS.map(rawToToeic);`) stays exactly as-is.
- `stripIPAFromTip` function stays exactly as-is.
- `RAW_TOEIC_WORDS` array stays exactly as-is.
- `RawToeicWord` type stays exactly as-is.
- No other files need to be touched.

---

## Why this works

The three supplemental files (`toeicBackCardJa`, `toeicAntonyms`, `toeicTipJa`)
are keyed by word `id`. For any word id that has no entry in the lookup
(e.g. newly added words 101–151 that don't yet have Japanese data), the
optional-chaining fallbacks (`?? ''` and `? [...x] : []`) return safe empty
values that satisfy the TypeScript type without crashing.

This means the app will compile immediately, and Japanese data can be filled
in for the new words incrementally without another compile break.

---

## Expected result after this fix

- `tsc` compiles with zero type errors on `toeicWords.ts`
- All 16 `ToeicWord` fields are populated for every word
- Words 1–100 get full Japanese data (already in supplemental files)
- Words 101–151 (new replacements) get empty-string fallbacks until
  their Japanese data is added to the supplemental files
- No runtime crashes
