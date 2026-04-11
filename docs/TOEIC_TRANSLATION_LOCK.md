# TOEIC JA/EN Translation Behavior Lock

This file locks the expected behavior for TOEIC vocabulary localization in this app.
Apply these rules to all current and future TOEIC ranges (including newly added lists).

## 1) Runtime Merge Order (source priority)

For all TOEIC IDs, final displayed Japanese is resolved in this order:

1. Base inline maps (`1-100`) inside aggregate files
2. Batch files (`toeicJa101_200.ts`, `toeicJa201_300.ts`, `toeicJa301_400.ts`, ...)
3. Placeholder/fix overlay maps (spread last; highest priority)

If the same ID exists in multiple layers, the last spread wins.

## 2) Behavior Must Stay Consistent Across All IDs

For each TOEIC word ID, always provide and resolve:

- Back card: `defs`, `example`, `synonyms`
- Phrase list JA (index-aligned with English phrase list)
- Tip JA (single pronunciation/support string)
- Antonyms JA/EN pair row

Padding/fallback behavior must remain stable:

- Missing JA list items are padded by existing helper behavior (no crashes).
- Missing optional JA text falls back to empty string where current code does so.

## 3) Content Style Lock (JA)

Japanese output must be:

- Plain, learner-friendly, natural Japanese
- Meaning-based translation (not katakana transliteration)
- Short, classroom-usable phrasing
- Consistent tone across ranges

Avoid:

- Placeholder/meta text like `Xではない（反対）`
- Mixed debug notes or stress metadata in content maps
- Unnecessary loanword-heavy wording when a clear Japanese equivalent exists

## 4) Alignment Rules

- Word ID is source-of-truth key; never shift IDs.
- JA phrases must keep the same order/length expectations as EN phrases.
- Antonym rows must be real contrasts (EN + JA), not placeholders.
- New ranges (for example `401-500`, `501-600`) must follow the same structure and style.

## 5) Change Protocol For New TOEIC Batches

When adding a new range:

1. Add/align JA maps for back cards, phrases, tips, antonyms.
2. Add overlay fixes only where needed (and keep them intentional).
3. Verify compile: `npx tsc --noEmit`.
4. Spot-check sample IDs in app before finalizing.

## 6) Non-Negotiable Standard

This lock is the standing standard for this project's TOEIC localization behavior.
Future TOEIC prompts should follow this file unless the user explicitly requests a new policy.

