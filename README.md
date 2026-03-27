# Eigo Copy Coach

Pronunciation training app built with Expo Router and Zustand.

## Start

```bash
npm install
npx expo start
```

Use `npx expo start -c` when you need a clean Metro cache.

## Release Notes (Current)

- Added first-run language flow with explicit confirmation screen (`Choose your language`).
- Added global route guards for startup flow:
  - `language-setup` -> `onboarding` -> `home`
- Added persisted language settings:
  - `uiLanguage`, `supportLanguage`, `targetLanguage`, `hasConfirmedLanguage`
- Added persisted onboarding completion state.
- Added Settings language controls:
  - App Language
  - Explanation Language
- Added reset actions in Settings:
  - Reset language setup
  - Full reset (language setup + onboarding)
- Merged localized shell copy into Home, Onboarding, Practice List, Review, and Settings.
