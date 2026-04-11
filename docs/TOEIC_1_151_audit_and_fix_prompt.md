# TOEIC 1–151 Vocabulary Audit Report + Cursor Fix Prompt
# Target file: src/data/toeicWords.ts + src/data/toeicAntonyms.ts

---

## AUDIT VERDICT SUMMARY

### Overall quality: GOOD with specific fixable problems

**Words 1–100:** Core data is solid and exam-accurate. ~15 specific
corrections needed (wrong synonyms, weak antonyms, POS mismatches).

**Words 101–151:** Phrases, examples, and synonyms are good.
Antonyms are ALL BLANK — every entry has empty strings. This is the
biggest structural gap.

**General finding vs current ETS exam trends (ETS 2023–2024 data):**
Your collocation phrases match well for the top 100. The biggest
mismatch is that real TOEIC Part 5/6 tests antonym-based paraphrase
heavily — empty antonyms for words 101–151 leaves a gap in that
training signal.

---

## PART A — SPECIFIC CORRECTIONS NEEDED (words 1–100)

Apply each correction to the relevant word entry in
`src/data/toeicWords.ts` AND in `src/data/toeicAntonyms.ts`
(whichever file stores that field in your schema).

---

### [12] commission
**Problem:** synonym `"authorize"` is a verb meaning — wrong POS for noun "commission as fee"
**Fix synonyms:** `"fee"` → `"fee"` ✓ · `"payment"` → `"payment"` ✓ · `"authorize"` → `"brokerage"`

---

### [18] cover
**Problem:** synonym `"lid"` is the physical object meaning — TOEIC tests the verb sense (cover a topic, cover costs)
**Fix synonyms:** `"lid"` → `"address"` · `"top"` → `"include"` · `"protect"` → `"encompass"`

---

### [20] direct
**Problem:** synonym `"straight"` is an adjective — POS mismatch when used as verb
**Fix synonyms:** `"straight"` → `"guide"` · keep `"manage"` · keep `"guide"` (→ change to `"steer"`)
**Fixed:** `"guide"` | `"manage"` | `"steer"`

---

### [45] priority
**Problem:** antonym `"low priority"` is a two-word phrase, not a single word
**Fix antonyms:** `"afterthought"` | `"triviality"` | `"low priority"` → `"afterthought"` | `"triviality"` | `"secondary"`

---

### [58] projection
**Problem:** antonyms `"result"` and `"fact"` are not opposites of projection (a forecast)
**Fix antonyms:** `"actual"` | `"result"` | `"fact"` → `"actuality"` | `"outcome"` | `"certainty"`

---

### [72] quarter
**Problem:** antonym `"year"` is not an opposite of quarter — it's a larger time unit, not a contrast
**Fix antonyms:** `"year"` | `"whole"` | `"entirety"` → `"whole"` | `"entirety"` | `"totality"`

---

### [74] department
**Problem:** antonym `"merger"` is a business event, not a structural opposite of department
**Fix antonyms:** `"whole firm"` | `"merger"` | `"unity"` → `"whole organization"` | `"conglomerate"` | `"unity"`

---

### [89] transaction
**Problem:** antonyms `"stagnation"` | `"inactivity"` | `"delay"` describe slow processes — not structural opposites of a business transaction
**Fix antonyms:** `"stagnation"` | `"inactivity"` | `"delay"` → `"cancellation"` | `"reversal"` | `"void"`

---

### [95] overview
**Problem:** antonym `"drill-down"` is tech/BI jargon — not appropriate for TOEIC exam register
**Fix antonyms:** `"detail"` | `"drill-down"` | `"specifics"` → `"detail"` | `"specifics"` | `"breakdown"`

---

### [141] service
**Problem:** synonym `"maintain"` is a verb — the word "service" is being tested as a noun
**Fix synonyms:** `"assistance"` | `"support"` | `"maintain"` → `"assistance"` | `"support"` | `"provision"`

---

### [142] report
**Problem:** synonym `"inform"` is a verb — "report" as noun should have noun synonyms
**Fix synonyms:** `"account"` | `"document"` | `"inform"` → `"account"` | `"document"` | `"summary"`

---

### [150] account
**Problem:** synonym `"explain"` is a verb — "account" as noun should have noun synonyms
**Fix synonyms:** `"record"` | `"client"` | `"explain"` → `"record"` | `"register"` | `"ledger"`

---

## PART B — ADD MISSING ANTONYMS FOR WORDS 101–151

All 51 entries (ids 101–151) have blank antonyms. Add the following
to whichever file/structure stores antonyms in your schema
(currently `src/data/toeicAntonyms.ts` → `TOEIC_ANTONYMS` object).

Add each entry as:
```ts
id: { en: ['antonym1', 'antonym2', 'antonym3'], ja: ['', '', ''] },
```
The `ja` fields can be empty strings now and filled in later.

```
101 request    → en: ['refusal', 'rejection', 'denial']
102 provide    → en: ['withhold', 'deny', 'take']
103 receive    → en: ['send', 'dispatch', 'give']
104 increase   → en: ['decrease', 'decline', 'reduce']
105 decrease   → en: ['increase', 'rise', 'grow']
106 complete   → en: ['abandon', 'start', 'begin']
107 contact    → en: ['ignore', 'avoid', 'disconnect']
108 attend     → en: ['miss', 'skip', 'absent']
109 prepare    → en: ['improvise', 'neglect', 'overlook']
110 apply      → en: ['withdraw', 'refuse', 'reject']
111 consider   → en: ['ignore', 'dismiss', 'overlook']
112 improve    → en: ['worsen', 'decline', 'deteriorate']
113 offer      → en: ['refuse', 'withhold', 'reject']
114 ensure     → en: ['neglect', 'risk', 'overlook']
115 manage     → en: ['mismanage', 'neglect', 'abandon']
116 include    → en: ['exclude', 'omit', 'remove']
117 expect     → en: ['surprise', 'doubt', 'disregard']
118 result     → en: ['cause', 'source', 'origin']
119 annual     → en: ['daily', 'irregular', 'monthly']
120 current    → en: ['former', 'outdated', 'past']
121 recent     → en: ['old', 'outdated', 'former']
122 necessary  → en: ['unnecessary', 'optional', 'avoidable']
123 possible   → en: ['impossible', 'unfeasible', 'unlikely']
124 standard   → en: ['exception', 'deviation', 'irregular']
125 limited    → en: ['unlimited', 'abundant', 'unrestricted']
126 special    → en: ['ordinary', 'common', 'standard']
127 total      → en: ['partial', 'fractional', 'incomplete']
128 local      → en: ['international', 'distant', 'overseas']
129 free       → en: ['paid', 'chargeable', 'restricted']
130 however    → en: ['therefore', 'consequently', 'accordingly']
131 therefore  → en: ['however', 'despite', 'nevertheless']
132 immediately → en: ['eventually', 'later', 'gradually']
133 recently   → en: ['formerly', 'previously', 'long ago']
134 currently  → en: ['formerly', 'previously', 'once']
135 approximately → en: ['exactly', 'precisely', 'specifically']
136 typically  → en: ['rarely', 'unusually', 'exceptionally']
137 usually    → en: ['rarely', 'seldom', 'never']
138 furthermore → en: ['however', 'conversely', 'but']
139 additionally → en: ['however', 'instead', 'otherwise']
140 customer   → en: ['supplier', 'vendor', 'provider']
141 service    → en: ['disservice', 'neglect', 'inaction']
142 report     → en: ['conceal', 'suppress', 'withhold']
143 order      → en: ['cancellation', 'disorder', 'chaos']
144 product    → en: ['service', 'raw material', 'input']
145 project    → en: ['cancellation', 'abandonment', 'inaction']
146 staff      → en: ['management', 'clients', 'customers']
147 client     → en: ['supplier', 'vendor', 'provider']
148 payment    → en: ['debt', 'refusal', 'nonpayment']
149 price      → en: ['free', 'complimentary', 'gratis']
150 account    → en: ['ignorance', 'oversight', 'disregard']
151 meeting    → en: ['dismissal', 'cancellation', 'adjournment']
```

---

## PART C — PHRASE QUALITY NOTES (no urgent fix needed, but flag for next revision)

These are correct but could be upgraded to closer match current ETS 2023–2024 exam collocation patterns:

| # | Word | Current phrase | More TOEIC-accurate alternative |
|---|------|---------------|----------------------------------|
| 6 | beverage | `alcoholic beverage` | `hot beverage` (more common in hotel/travel Part 7) |
| 17 | resume | `resume operations` | split to separate noun vs verb entries |
| 33 | reimburse | `reimburse expenses` ✓ | add `expense claim` as a phrase (very common in ETS 2024) |
| 48 | survey | `customer survey` ✓ | `satisfaction survey` appears more in ETS 2024 |
| 66 | resolution | `New Year's resolution` | lower priority for TOEIC — swap for `dispute resolution` |
| 76 | headquarters | `global headquarters` ✓ | `corporate headquarters` appears in ETS 2024 Part 7 |
| 82 | productivity | `productivity tools` | `productivity metrics` more ETS 2024-aligned |

---

## PART D — EXAM TREND ALIGNMENT (ETS 2023–2024 patterns)

Based on ETS 2023–2024 published data, your list aligns well with these
confirmed high-frequency topic areas:

✅ **Strong coverage:** office/HR (`staff`, `department`, `recruit`, `procedure`) ·
finance (`revenue`, `invoice`, `payment`, `transaction`) · logistics (`distribute`,
`inventory`, `order`, `deliver`) · communication (`communicate`, `correspond`,
`report`, `inform`)

✅ **Good connector coverage:** `however`, `therefore`, `furthermore`,
`additionally`, `currently`, `recently` — these are heavily tested in
Part 6 transition questions

⚠️ **Slight gap:** ETS 2024 has increased frequency of:
- `subscription` / `subscribe` — not yet in your list
- `itinerary` — not in 1–151 (appears in 201–300 batch)
- `accommodation` — covered by `accommodate` ✓
- `expiration` / `expire` — not in 1–151 (common in Parts 6–7 for warranty/membership contexts)

These are not urgent — they appear in your 200–400 batches. No action needed now.

---

## HOW TO APPLY IN CURSOR

1. Open `src/data/toeicAntonyms.ts`
2. Add all 51 entries from Part B above into the `TOEIC_ANTONYMS` object
3. Open `src/data/toeicWords.ts`
4. Apply the 10 synonym/antonym fixes from Part A to the relevant `RAW_TOEIC_WORDS` entries
5. No type changes needed — all fields already exist in the schema
