# Cursor Task: Fix Japanese Coherence Issues in TOEIC Data Files

## Files to edit
- `src/data/toeicBackCardJa.ts`
- `src/data/toeicPhrasesJa.ts`
- `src/data/toeicAntonyms.ts`

## How to apply
Each fix below shows the **exact string to find** and the **replacement**.
Make each change independently. Do not change any surrounding structure.

---

## FILE 1 — src/data/toeicBackCardJa.ts

### [4] proceed — remove non-synonym from synonyms list
Find:
```
    synonyms: ['続ける', '前進する', 'どうぞ進んで', '前に進める'],
```
Replace with:
```
    synonyms: ['続ける', '前進する', '進行する', '前に進める'],
```

---

### [6] beverage — fix descriptive phrase disguised as synonym
Find:
```
    synonyms: ['飲み物', '軽食に付く飲み物', '液体'],
```
Replace with:
```
    synonyms: ['飲み物', 'ドリンク', '液体'],
```

---

### [12] commission — remove verb phrase from noun synonyms
Find:
```
    synonyms: ['手数料', '報酬', '正式に依頼する', '任命する'],
```
Replace with:
```
    synonyms: ['手数料', '報酬', '仲介料', '委託料'],
```

---

### [14] presence — fix vague synonym '外見・印象'
Find:
```
    synonyms: ['出席', '存在', '外見・印象', '雰囲気'],
```
Replace with:
```
    synonyms: ['出席', '存在', '存在感', '雰囲気'],
```

---

### [15] launch — replace overly formal/traditional '披露' with natural business term
Find:
```
    defs: ['新製品・サービスのお披露目', '始める・打ち出す'],
```
Replace with:
```
    defs: ['新製品・サービスの発売・公開', '始める・打ち出す'],
```

---

### [20] direct — replace adjective synonym with verb synonym
Find:
```
    synonyms: ['まっすぐな', '管理する', '導く', '率直な'],
```
Replace with:
```
    synonyms: ['指導する', '管理する', '導く', '向ける'],
```

---

### [36] acknowledge — remove informal parenthetical from synonym label
Find:
```
    synonyms: ['確認する', '認める', '認める（過ちなど）', '受け入れる'],
```
Replace with:
```
    synonyms: ['確認する', '認める', '受け止める', '受け入れる'],
```

---

### [44] approve — fix wildly inconsistent register in synonym list
Find:
```
    synonyms: ['認める', 'OKする', '支持する', '公にみとめる'],
```
Replace with:
```
    synonyms: ['承認する', '認可する', '支持する', '賛成する'],
```

---

### [45] priority — shorten overly long synonym to single word
Find:
```
    synonyms: ['最優先の関心事', '優先権', '緊急性', '第一の関心'],
```
Replace with:
```
    synonyms: ['最優先事項', '優先権', '緊急性', '重要度'],
```

---

### [48] survey — remove verb from noun synonym list
Find:
```
    synonyms: ['世論調査', '調査', 'アンケート', '検討する'],
```
Replace with:
```
    synonyms: ['世論調査', '調査', 'アンケート', '意見収集'],
```

---

### [49] strategy — replace gaming-register synonym with business term
Find:
```
    synonyms: ['計画', 'やり方', '方法', '勝ちパターン'],
```
Replace with:
```
    synonyms: ['計画', 'やり方', '方法', '戦略的アプローチ'],
```

---

### [51] implement — replace weak synonym 'やってみる' (= try)
Find:
```
    synonyms: ['実行する', 'やってみる', '当てはめる', 'しっかり行う'],
```
Replace with:
```
    synonyms: ['実行する', '導入する', '当てはめる', '施行する'],
```

---

### [56] initiative — replace unnatural Japanese compound
Find:
```
    synonyms: ['積極性', '起業家精神っぽさ', '計画', 'プログラム'],
```
Replace with:
```
    synonyms: ['積極性', '自発性', '計画', 'プログラム'],
```

---

### [60] training — remove grammar note disguised as a definition
Find:
```
    defs: ['仕事のスキルを教えるプロセス', 'trainの現在分詞（〜している）'],
```
Replace with:
```
    defs: ['仕事のスキルを教えるプロセス・研修', '（動詞）訓練する・指導する'],
```

---

### [72] quarter — fix wrong-context synonym '4分の1'
Find:
```
    synonyms: ['3か月', '期間', '区間', '4分の1'],
```
Replace with:
```
    synonyms: ['3か月間', '四半期', '期間', '会計期間'],
```

---

### [82] productivity — fix wrong synonym '処理能力' (= processing capacity, IT term)
Find:
```
    synonyms: ['効率', '生産高', 'パフォーマンス', '処理能力'],
```
Replace with:
```
    synonyms: ['効率', '生産高', 'パフォーマンス', '作業効率'],
```

---

### [90] correspond — remove overly casual synonym '合う'
Find:
```
    synonyms: ['連絡を取る', '一致する', '書く', '合う'],
```
Replace with:
```
    synonyms: ['連絡を取る', '一致する', '書く', '対応する'],
```

---

### [95] overview — replace informal '全体の説明' and 'ざっくり説明'
Find:
```
    synonyms: ['要約', 'あらまし', '全体の説明', 'ざっくり説明'],
```
Replace with:
```
    synonyms: ['要約', 'あらまし', '概要', '全体像'],
```

---

### [97] require — replace grammatically unnatural synonym
Find:
```
    synonyms: ['要る', '求める', '〜せざるを得なくする', '必要とする'],
```
Replace with:
```
    synonyms: ['要る', '求める', '義務づける', '必要とする'],
```

---

### [99] establish — add variety to synonyms (currently all mean the same thing)
Find:
```
    synonyms: ['創業する', '立ち上げる', '作る', '設ける'],
```
Replace with:
```
    synonyms: ['設立する', '立ち上げる', '証明する', '構築する'],
```

---

## FILE 2 — src/data/toeicPhrasesJa.ts

### [4] phrase index 1 — WRONG MEANING: '会計のところへ行く' ≠ 'proceed to checkout'
Find:
```
  4: ["気をつけて進む", "会計のところへ行く", "予定どおりに進む"],
```
Replace with:
```
  4: ["気をつけて進む", "レジに向かう", "予定どおりに進む"],
```

---

### [12] phrase index 3 — WRONG MEANING: 'レポートを正式にお願いする' ≠ 'commission a project'
Find:
```
  12: ["売れた分のお金（手数料）", "手数料", "売れたらもらえる仕組み", "レポートを正式にお願いする"],
```
Replace with:
```
  12: ["売れた分のお金（手数料）", "手数料", "売れたらもらえる仕組み", "仕事を正式に依頼する"],
```

---

### [14] phrase index 3 — vague; tighten '존在感を示す' for 'make your presence known'
Find:
```
  14: ["だれかの目の前で", "ここにいるとわかるようにする", "ネット上での顔つき", "あわてずに考える力"],
```
Replace with:
```
  14: ["だれかの目の前で", "存在感を示す", "ネット上での存在感", "いざという時の冷静さ"],
```

---

### [19] phrase index 3 — overly informal and niche 'associate professor' gloss
Find:
```
  19: ["～と一緒に思われる", "仕事の知り合い", "本会員ではない会員", "大学のちょい下の先生"],
```
Replace with:
```
  19: ["～と結びつけて考える", "仕事上の知り合い", "準会員", "准教授"],
```

---

### [23] phrase index 3 — WRONG: '現金を受け取ること' = receiving cash ≠ 'cash withdrawal'
Find:
```
  23: ["ATMなどからお金を出す", "言ったことを取り消す", "グループなどをやめる", "現金を受け取ること"],
```
Replace with:
```
  23: ["ATMなどからお金を出す", "発言を取り消す", "グループなどを脱退する", "現金の引き出し"],
```

---

### [34] phrase index 3 — WRONG: 'ルールを破る' is an antonym, not a phrase gloss for 'regulations'
Find:
```
  34: ["ルールを守る", "安全のルール", "国のルール", "ルールを破る"],
```
Replace with:
```
  34: ["ルールを守る", "安全に関する規則", "政府の規制", "規則に従う"],
```

---

### [37] phrase index 2 — imprecise: '取材に答えられる' ≠ 'available for comment'
Find:
```
  37: ["すぐ手に入る", "募集している職", "取材に答えられる", "使えるようにする"],
```
Replace with:
```
  37: ["すぐ手に入る", "募集中のポジション", "コメントできる状態", "利用できるようにする"],
```

---

### [58] phrase index 3 — jarring second meaning in finance context; relabel clearly
Find:
```
  58: ["売上の予想", "お金の予想", "利益の予想", "映写（えいしゃ）スクリーン"],
```
Replace with:
```
  58: ["売上の予測", "財務の見通し", "利益の予想", "プロジェクター画面への投影"],
```

---

### [72] phrase index 0 — overly specific/redundant '1年の3番目の四半期'
Find:
```
  72: ["1年の3番目の四半期", "3か月ごとの報告", "7〜9月の結果", "会計年度の区切り"],
```
Replace with:
```
  72: ["3か月ごとの期間", "四半期ごとの報告", "第3四半期の結果", "会計上の区切り"],
```

---

### [82] phrase index 1 — vague '仕事を早くする道具' ≠ 'productivity tools'
Find:
```
  82: ["仕事の量を増やす", "仕事を早くする道具", "仕事の量の数字", "仕事の量を上げる"],
```
Replace with:
```
  82: ["生産性を上げる", "生産性向上ツール", "生産性の指標", "作業効率を高める"],
```

---

## FILE 3 — src/data/toeicAntonyms.ts

### [45] priority — 'low priority' is a phrase, not a word
Find:
```
  45: { en: ['afterthought', 'triviality', 'low priority'], ja: ['後回し', 'どうでもいいこと', '優先度が低い'] },
```
Replace with:
```
  45: { en: ['afterthought', 'triviality', 'secondary'], ja: ['後回し', 'どうでもいいこと', '二番手'] },
```

---

### [58] projection — antonyms are wrong (result/fact are not opposites of a forecast)
Find:
```
  58: { en: ['actual', 'result', 'fact'], ja: ['実際', '結果', '事実'] },
```
Replace with:
```
  58: { en: ['actuality', 'outcome', 'certainty'], ja: ['実績', '実際の結果', '確定事項'] },
```

---

### [72] quarter — 'year' is not an antonym of quarter
Find:
```
  72: { en: ['year', 'whole', 'entirety'], ja: ['年', '全体', '全体性'] },
```
Replace with:
```
  72: { en: ['whole year', 'entirety', 'totality'], ja: ['通年', '全体', '年間全体'] },
```

---

### [74] department — 'merger' is not an antonym of department
Find:
```
  74: { en: ['whole firm', 'merger', 'unity'], ja: ['会社全体', '合併', '統一'] },
```
Replace with:
```
  74: { en: ['whole organization', 'enterprise', 'conglomerate'], ja: ['組織全体', '企業全体', 'コングロマリット'] },
```

---

### [89] transaction — antonyms are not structural opposites of a transaction
Find:
```
  89: { en: ['stagnation', 'inactivity', 'delay'], ja: ['停滞', '不活動', '遅延'] },
```
Replace with:
```
  89: { en: ['cancellation', 'reversal', 'void'], ja: ['取り消し', '無効化', '無効'] },
```

---

### [95] overview — 'drill-down' is tech jargon, not suitable for TOEIC register
Find:
```
  95: { en: ['detail', 'drill-down', 'specifics'], ja: ['詳細', '詳細分析', '具体的な内容'] },
```
Replace with:
```
  95: { en: ['detail', 'breakdown', 'specifics'], ja: ['詳細', '内訳', '具体的な内容'] },
```

---

## Summary

| File | Changes |
|------|---------|
| `toeicBackCardJa.ts` | 19 synonym/def fixes (register, wrong POS, unnatural Japanese) |
| `toeicPhrasesJa.ts` | 9 phrase gloss fixes (wrong meanings, antonym used as phrase, vague) |
| `toeicAntonyms.ts` | 6 antonym fixes (factually incorrect or wrong register) |
| **Total** | **34 targeted fixes** |

All fixes are surgical string replacements — no structural changes to any file.
