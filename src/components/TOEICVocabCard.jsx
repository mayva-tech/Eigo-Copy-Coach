import { useState } from "react";

const TOEIC_WORDS = [
  {
    id: 1,
    word: "preserve",
    ipa: "prɪˈzɜrv",
    stressHint: "stress on 2nd syllable: pri-ZERV",
    partOfSpeech: ["verb", "noun"],
    definitions: {
      verb: "to keep safe, to protect",
      noun: "food preserved, jam",
    },
    examples: [
      "We need to preserve the environment.",
      "She preserves old photographs in albums.",
    ],
    phrases: ["preserve the environment", "preserve history", "preserve data"],
    synonyms: ["maintain", "protect", "conserve", "save"],
    pronunciationNote:
      "Japanese speakers: avoid inserting a vowel between 'pr' — keep it a clean blend: /pr/",
    difficulty: "R-blend",
  },
  {
    id: 2,
    word: "promote",
    ipa: "prəˈmoʊt",
    stressHint: "stress on 2nd syllable: pruh-MOTE",
    partOfSpeech: ["verb"],
    definitions: {
      verb: "to support or encourage; to advance in rank",
    },
    examples: [
      "They promote a product through advertising.",
      "She was promoted to manager.",
    ],
    phrases: ["promote a product", "promote teamwork", "promote growth"],
    synonyms: ["advance", "support", "encourage", "market"],
    pronunciationNote:
      "Japanese speakers: the final 't' is a clear stop — don't add a vowel: pro-MOT, not pro-MO-to",
    difficulty: "Final consonant",
  },
  {
    id: 3,
    word: "respective",
    ipa: "rɪˈspɛktɪv",
    stressHint: "stress on 2nd syllable: ri-SPEK-tiv",
    partOfSpeech: ["adjective"],
    definitions: {
      adjective: "belonging separately to each; individual",
    },
    examples: [
      "They returned to their respective roles.",
      "Each team has its respective responsibilities.",
    ],
    phrases: [
      "respective roles",
      "respective responsibilities",
      "respective fields",
    ],
    synonyms: ["individual", "corresponding", "separate", "particular"],
    pronunciationNote:
      "Japanese speakers: R at the start — curl tongue back, don't substitute L: /r/ not /l/",
    difficulty: "R vs L",
  },
  {
    id: 4,
    word: "proceed",
    ipa: "prəˈsiːd",
    stressHint: "stress on 2nd syllable: pruh-SEED",
    partOfSpeech: ["verb"],
    definitions: {
      verb: "to go forward; to continue an action",
    },
    examples: [
      "Please proceed with caution.",
      "You may proceed to checkout.",
    ],
    phrases: [
      "proceed with caution",
      "proceed to checkout",
      "proceed as planned",
    ],
    synonyms: ["continue", "advance", "move forward", "go ahead"],
    pronunciationNote:
      "Japanese speakers: long /iː/ vowel in '-ceed' — hold it: pro-SEEED, not pro-SID",
    difficulty: "Long vowel",
  },
  {
    id: 5,
    word: "establish",
    ipa: "ɪˈstæblɪʃ",
    stressHint: "stress on 2nd syllable: i-STAB-lish",
    partOfSpeech: ["verb"],
    definitions: {
      verb: "to set up or found; to prove or show",
    },
    examples: [
      "They established a new policy.",
      "She established herself as an expert.",
    ],
    phrases: [
      "establish a policy",
      "establish contact",
      "establish guidelines",
    ],
    synonyms: ["found", "create", "set up", "institute"],
    pronunciationNote:
      "Japanese speakers: the /æ/ in '-tab-' is a low wide vowel — mouth opens wide, like 'cat'",
    difficulty: "Vowel /æ/",
  },
];

const DIFFICULTY_COLORS = {
  "R vs L": { bg: "#7c3d3d", label: "#ffb4b4" },
  "R-blend": { bg: "#3d5c7c", label: "#b4d4ff" },
  "Final consonant": { bg: "#4a3d7c", label: "#c4b4ff" },
  "Long vowel": { bg: "#3d7c5c", label: "#b4ffd4" },
  "Vowel /æ/": { bg: "#7c6e3d", label: "#ffe8b4" },
};

export default function TOEICVocabCard() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [flipped, setFlipped] = useState(false);
  const [practicing, setPracticing] = useState(false);
  const [showIPA, setShowIPA] = useState(false);

  const word = TOEIC_WORDS[currentIndex];
  const diffStyle = DIFFICULTY_COLORS[word.difficulty] || {
    bg: "#555",
    label: "#fff",
  };

  const next = () => {
    setFlipped(false);
    setPracticing(false);
    setShowIPA(false);
    setCurrentIndex((i) => (i + 1) % TOEIC_WORDS.length);
  };
  const prev = () => {
    setFlipped(false);
    setPracticing(false);
    setShowIPA(false);
    setCurrentIndex((i) => (i - 1 + TOEIC_WORDS.length) % TOEIC_WORDS.length);
  };

  return (
    <div style={styles.shell}>
      {/* Header */}
      <div style={styles.header}>
        <div style={styles.headerLeft}>
          <span style={styles.headerTitle}>TOEIC</span>
          <span style={styles.headerSub}>Vocabulary + Pronunciation</span>
        </div>
        <div style={styles.counter}>
          {currentIndex + 1} / {TOEIC_WORDS.length}
        </div>
      </div>

      {/* Progress bar */}
      <div style={styles.progressTrack}>
        <div
          style={{
            ...styles.progressFill,
            width: `${((currentIndex + 1) / TOEIC_WORDS.length) * 100}%`,
          }}
        />
      </div>

      {/* Card */}
      <div
        style={{
          ...styles.card,
          background: flipped
            ? "linear-gradient(160deg, #1a1a2e 0%, #16213e 100%)"
            : "linear-gradient(160deg, #f5f0e8 0%, #ede4d0 100%)",
        }}
      >
        {/* Difficulty badge */}
        <div
          style={{
            ...styles.diffBadge,
            background: diffStyle.bg,
            color: diffStyle.label,
          }}
        >
          {word.difficulty}
        </div>

        {!flipped ? (
          /* FRONT — Word face */
          <div style={styles.front}>
            <div style={styles.wordRow}>
              <span style={styles.wordText}>{word.word}</span>
              <div style={styles.posTags}>
                {word.partOfSpeech.map((p) => (
                  <span key={p} style={styles.posTag}>
                    {p}
                  </span>
                ))}
              </div>
            </div>

            <button
              style={styles.ipaToggle}
              onClick={() => setShowIPA((v) => !v)}
            >
              {showIPA ? (
                <span style={styles.ipaText}>[{word.ipa}]</span>
              ) : (
                <span style={styles.ipaHint}>tap to see IPA</span>
              )}
            </button>

            <p style={styles.stressHint}>{word.stressHint}</p>

            <div style={styles.phrasesBox}>
              {word.phrases.map((ph) => (
                <span key={ph} style={styles.phrase}>
                  {ph}
                </span>
              ))}
            </div>

            <button style={styles.flipBtn} onClick={() => setFlipped(true)}>
              See meaning & pronunciation tips →
            </button>
          </div>
        ) : (
          /* BACK — Meaning + Pronunciation focus */
          <div style={styles.back}>
            <div style={styles.wordSmall}>{word.word}</div>
            <span style={styles.ipaTextBack}>[{word.ipa}]</span>

            {/* Definitions */}
            {word.partOfSpeech.map((pos) => (
              <div key={pos} style={styles.defRow}>
                <span style={styles.posTagBack}>{pos}</span>
                <span style={styles.defText}>{word.definitions[pos]}</span>
              </div>
            ))}

            {/* Example sentences */}
            <div style={styles.exampleBox}>
              {word.examples.map((ex, i) => (
                <p key={i} style={styles.example}>
                  "{ex}"
                </p>
              ))}
            </div>

            {/* Pronunciation note — the key feature */}
            <div style={styles.pronNote}>
              <div style={styles.pronNoteLabel}>🎯 Pronunciation tip for Japanese speakers</div>
              <p style={styles.pronNoteText}>{word.pronunciationNote}</p>
            </div>

            {/* Synonyms */}
            <div style={styles.synonymRow}>
              {word.synonyms.map((s) => (
                <span key={s} style={styles.synonym}>
                  {s}
                </span>
              ))}
            </div>

            <button style={styles.practiceBtn} onClick={() => setPracticing(true)}>
              🎤 Practice pronunciation
            </button>

            {practicing && (
              <div style={styles.practiceBox}>
                <p style={styles.practiceText}>
                  Say it aloud: <strong style={{ color: "#d4a843" }}>{word.word}</strong>
                </p>
                <p style={styles.practiceSubText}>
                  Focus: {word.pronunciationNote.split("—")[1]?.trim() || word.difficulty}
                </p>
              </div>
            )}

            <button style={styles.flipBackBtn} onClick={() => setFlipped(false)}>
              ← Back to word
            </button>
          </div>
        )}
      </div>

      {/* Navigation */}
      <div style={styles.nav}>
        <button style={styles.navBtn} onClick={prev}>
          ‹ Prev
        </button>
        <button style={styles.navBtnNext} onClick={next}>
          Next ›
        </button>
      </div>

      <p style={styles.footer}>eigo-copy-coach · TOEIC Vocabulary</p>
    </div>
  );
}

const styles = {
  shell: {
    fontFamily: "Georgia, 'Times New Roman', serif",
    background: "#0d0d0d",
    minHeight: "100vh",
    padding: "20px 16px 40px",
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    gap: 16,
  },
  header: {
    width: "100%",
    maxWidth: 420,
    display: "flex",
    justifyContent: "space-between",
    alignItems: "flex-end",
  },
  headerLeft: { display: "flex", flexDirection: "column" },
  headerTitle: {
    fontSize: 22,
    fontWeight: "bold",
    color: "#d4a843",
    letterSpacing: 3,
    textTransform: "uppercase",
  },
  headerSub: { fontSize: 11, color: "#888", letterSpacing: 1 },
  counter: {
    fontSize: 13,
    color: "#666",
    fontFamily: "monospace",
    border: "1px solid #333",
    padding: "3px 10px",
    borderRadius: 4,
  },
  progressTrack: {
    width: "100%",
    maxWidth: 420,
    height: 2,
    background: "#222",
    borderRadius: 2,
  },
  progressFill: {
    height: "100%",
    background: "#d4a843",
    borderRadius: 2,
    transition: "width 0.4s ease",
  },
  card: {
    width: "100%",
    maxWidth: 420,
    minHeight: 480,
    borderRadius: 12,
    padding: "28px 24px 24px",
    position: "relative",
    border: "1px solid #333",
    boxShadow: "0 8px 40px rgba(0,0,0,0.6)",
    transition: "background 0.3s ease",
    boxSizing: "border-box",
  },
  diffBadge: {
    position: "absolute",
    top: 16,
    right: 16,
    fontSize: 10,
    fontFamily: "monospace",
    padding: "3px 8px",
    borderRadius: 4,
    textTransform: "uppercase",
    letterSpacing: 1,
  },
  // FRONT
  front: { display: "flex", flexDirection: "column", gap: 16 },
  wordRow: { display: "flex", alignItems: "flex-end", gap: 12 },
  wordText: {
    fontSize: 42,
    fontWeight: "bold",
    color: "#2c1a00",
    lineHeight: 1,
    letterSpacing: -1,
  },
  posTags: { display: "flex", flexDirection: "column", gap: 4, marginBottom: 4 },
  posTag: {
    fontSize: 10,
    color: "#8b6914",
    border: "1px solid #c4a44a",
    padding: "1px 6px",
    borderRadius: 3,
    textTransform: "uppercase",
    letterSpacing: 1,
  },
  ipaToggle: {
    background: "transparent",
    border: "1px dashed #c4a44a",
    borderRadius: 6,
    padding: "6px 12px",
    cursor: "pointer",
    alignSelf: "flex-start",
  },
  ipaText: {
    fontFamily: "monospace",
    fontSize: 18,
    color: "#5c3d00",
    letterSpacing: 2,
  },
  ipaHint: { fontSize: 11, color: "#a08040", fontStyle: "italic" },
  stressHint: {
    fontSize: 12,
    color: "#7a5c20",
    fontStyle: "italic",
    margin: 0,
    padding: "6px 10px",
    background: "rgba(196,164,74,0.12)",
    borderLeft: "3px solid #c4a44a",
    borderRadius: "0 4px 4px 0",
  },
  phrasesBox: { display: "flex", flexWrap: "wrap", gap: 8 },
  phrase: {
    fontSize: 12,
    color: "#3d2a00",
    background: "rgba(196,164,74,0.15)",
    padding: "4px 10px",
    borderRadius: 20,
    border: "1px solid rgba(196,164,74,0.3)",
  },
  flipBtn: {
    marginTop: 8,
    background: "#2c1a00",
    color: "#d4a843",
    border: "1px solid #d4a843",
    borderRadius: 8,
    padding: "10px 20px",
    cursor: "pointer",
    fontFamily: "Georgia, serif",
    fontSize: 13,
    letterSpacing: 0.5,
  },
  // BACK
  back: { display: "flex", flexDirection: "column", gap: 12 },
  wordSmall: {
    fontSize: 24,
    fontWeight: "bold",
    color: "#d4a843",
    letterSpacing: 1,
  },
  ipaTextBack: {
    fontFamily: "monospace",
    fontSize: 16,
    color: "#8ba8cc",
    letterSpacing: 2,
  },
  defRow: { display: "flex", gap: 8, alignItems: "center" },
  posTagBack: {
    fontSize: 10,
    color: "#d4a843",
    border: "1px solid #d4a843",
    padding: "1px 6px",
    borderRadius: 3,
    textTransform: "uppercase",
    letterSpacing: 1,
    whiteSpace: "nowrap",
  },
  defText: { fontSize: 14, color: "#ddd", lineHeight: 1.4 },
  exampleBox: {
    borderLeft: "2px solid #333",
    paddingLeft: 12,
    display: "flex",
    flexDirection: "column",
    gap: 4,
  },
  example: { fontSize: 12, color: "#aaa", margin: 0, fontStyle: "italic", lineHeight: 1.5 },
  pronNote: {
    background: "rgba(212,168,67,0.08)",
    border: "1px solid rgba(212,168,67,0.3)",
    borderRadius: 8,
    padding: "10px 14px",
  },
  pronNoteLabel: { fontSize: 11, color: "#d4a843", marginBottom: 6, letterSpacing: 0.5 },
  pronNoteText: { fontSize: 13, color: "#ccc", margin: 0, lineHeight: 1.6 },
  synonymRow: { display: "flex", flexWrap: "wrap", gap: 6 },
  synonym: {
    fontSize: 11,
    color: "#8ba8cc",
    border: "1px solid #2a3d55",
    padding: "2px 8px",
    borderRadius: 3,
  },
  practiceBtn: {
    background: "rgba(212,168,67,0.15)",
    color: "#d4a843",
    border: "1px solid #d4a843",
    borderRadius: 8,
    padding: "10px",
    cursor: "pointer",
    fontFamily: "Georgia, serif",
    fontSize: 13,
    letterSpacing: 0.5,
  },
  practiceBox: {
    background: "rgba(212,168,67,0.06)",
    border: "1px dashed rgba(212,168,67,0.4)",
    borderRadius: 8,
    padding: "12px",
    textAlign: "center",
  },
  practiceText: { margin: "0 0 4px", fontSize: 14, color: "#ccc" },
  practiceSubText: { margin: 0, fontSize: 11, color: "#888", fontStyle: "italic" },
  flipBackBtn: {
    background: "transparent",
    color: "#555",
    border: "none",
    cursor: "pointer",
    fontFamily: "Georgia, serif",
    fontSize: 12,
    alignSelf: "flex-start",
    padding: 0,
  },
  nav: {
    display: "flex",
    gap: 12,
    width: "100%",
    maxWidth: 420,
  },
  navBtn: {
    flex: 1,
    padding: "12px",
    background: "#111",
    color: "#666",
    border: "1px solid #333",
    borderRadius: 8,
    cursor: "pointer",
    fontFamily: "Georgia, serif",
    fontSize: 14,
  },
  navBtnNext: {
    flex: 1,
    padding: "12px",
    background: "#1a1400",
    color: "#d4a843",
    border: "1px solid #d4a843",
    borderRadius: 8,
    cursor: "pointer",
    fontFamily: "Georgia, serif",
    fontSize: 14,
  },
  footer: {
    fontSize: 10,
    color: "#333",
    letterSpacing: 2,
    textTransform: "uppercase",
    margin: 0,
  },
};
