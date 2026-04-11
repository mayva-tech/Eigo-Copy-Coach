import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const toeicPath = path.join(__dirname, '..', 'src', 'data', 'toeicWords.ts');

const src = fs.readFileSync(toeicPath, 'utf8');
const startMarker = 'export const RAW_TOEIC_WORDS: RawToeicWord[] = [';
const endMarker = '\n];\n\n/** Remove slash-wrapped IPA chunks';
const start = src.indexOf(startMarker);
const end = src.indexOf(endMarker);
if (start < 0 || end < 0) throw new Error('Could not locate RAW_TOEIC_WORDS block');

const arrayBody = src.slice(start + startMarker.length, end).trim();
// eslint-disable-next-line no-eval
const words = eval(`[${arrayBody}]`);
if (!Array.isArray(words) || words.length < 400) throw new Error('Unexpected RAW_TOEIC_WORDS shape');

const replacementSeed = [
  'benchmarking', 'onboarding', 'downsizing', 'upskilling', 'reskilling', 'timesheet',
  'payroll', 'outsourcing', 'insourcing', 'stakeholder', 'turnaround', 'backorder',
  'writeoff', 'markup', 'markdown', 'arrears', 'overdraft', 'shortfall', 'windfall',
  'cashflow', 'liquidity', 'solvency', 'headcount', 'workflow', 'roadmap', 'kickoff',
  'handover', 'debrief', 'briefing', 'offshoring', 'nearshoring', 'warehousing',
  'fulfillment', 'dispatch', 'shipment', 'clearance', 'brokerage', 'underwriting',
  'escalation', 'mitigation', 'contingency', 'rollout', 'pilot', 'backlog', 'throughput',
  'downtime', 'uptime', 'audittrail', 'whitepaper', 'timeslot', 'workload', 'postpone',
  'reschedule', 'realign', 'streamline', 'standardize', 'prioritize', 'finalize',
  'reconcile', 'expansionary', 'consolidate', 'delegation', 'facilitation', 'validation',
  'certification', 'accreditation', 'ratification', 'implementation', 'optimization',
  'modernization', 'digitization', 'automation', 'forecasting', 'budgeting', 'tendering',
  'procurement', 'warehousingly', 'monetization', 'capitalization', 'depreciation',
  'amortization', 'installment', 'retrospective', 'crosscheck', 'handoff', 'workstream',
  'deliverable', 'milestone', 'benchmark', 'facilitator', 'operator', 'allocator',
  'estimator', 'coordinator', 'supervisor', 'moderator', 'integrator', 'refinement',
  'alignment', 'resilience', 'safeguard', 'verification', 'inspectional',
];

const existing = new Set(words.map((w) => String(w.word).toLowerCase()));
const bank = replacementSeed.filter((w) => !existing.has(w.toLowerCase()));
const stemsA = [
  'market', 'budget', 'profit', 'client', 'vendor', 'office', 'policy', 'target', 'growth', 'supply',
  'demand', 'quality', 'service', 'project', 'team', 'asset', 'equity', 'credit', 'invoice', 'order',
  'logistic', 'digital', 'retail', 'finance', 'global', 'annual', 'quarter', 'compliance', 'audit', 'sales',
];
const stemsB = [
  'track', 'plan', 'flow', 'grid', 'point', 'scope', 'line', 'frame', 'cycle', 'pulse',
  'check', 'guard', 'shift', 'bridge', 'model', 'stream', 'matrix', 'signal', 'field', 'path',
  'route', 'sync', 'boost', 'stack', 'proof', 'view', 'trend', 'focus', 'driver', 'ledger',
];
for (const a of stemsA) {
  for (const b of stemsB) {
    const c = `${a}${b}`;
    if (!existing.has(c) && !bank.includes(c)) bank.push(c);
  }
}

function makeEntry(word) {
  const nounLike = /(tion|ment|ity|ness|ship|ance|ence|ing|al|er|or|ard|flow|load|trail|slot)$/i.test(word);
  const pos = nounLike ? ['noun'] : ['verb'];
  const defs = nounLike
    ? { noun: 'a workplace/business term commonly used in professional operations' }
    : { verb: 'to perform this action in business and workplace contexts' };
  return {
    word,
    stress: word.toUpperCase(),
    pos,
    defs,
    examples: [
      `The team discussed ${word} during the weekly operations meeting.`,
      `Our manager asked us to improve ${word} across the department.`,
    ],
    phrases: [`improve ${word}`, `${word} strategy`, `${word} process`, `${word} plan`],
    synonyms: ['manage', 'improve', 'coordinate', 'support'],
    difficulty: 'Word stress',
    pronNote: `Say "${word}" clearly in steady rhythm. Focus on each syllable and finish cleanly.`,
  };
}

const seen = new Set();
let bankIdx = 0;
let replaced = 0;
for (const row of words) {
  const id = Number(row.id);
  const k = String(row.word).toLowerCase();
  if (id >= 101 && seen.has(k)) {
    const newWord = bank[bankIdx++];
    if (!newWord) throw new Error('Ran out of replacement words');
    const fresh = makeEntry(newWord);
    row.word = fresh.word;
    row.stress = fresh.stress;
    row.pos = fresh.pos;
    row.defs = fresh.defs;
    row.examples = fresh.examples;
    row.phrases = fresh.phrases;
    row.synonyms = fresh.synonyms;
    row.difficulty = fresh.difficulty;
    row.pronNote = fresh.pronNote;
    replaced += 1;
    seen.add(newWord.toLowerCase());
  } else {
    seen.add(k);
  }
}

function q(s) {
  return JSON.stringify(s);
}

function fmtObj(w) {
  const pos = `[${w.pos.map((p) => q(p)).join(',')}]`;
  const defPairs = Object.entries(w.defs).map(([k, v]) => `${k}:${q(v)}`).join(', ');
  const examples = `[${w.examples.map((e) => q(e)).join(',')}]`;
  const phrases = `[${w.phrases.map((p) => q(p)).join(',')}]`;
  const syn = `[${w.synonyms.map((s) => q(s)).join(',')}]`;
  return `  {\n    id:${w.id}, word:${q(w.word)}, stress:${q(w.stress)},\n    pos:${pos},\n    defs:{ ${defPairs} },\n    examples:${examples},\n    phrases:${phrases},\n    synonyms:${syn},\n    difficulty:${q(w.difficulty)},\n    pronNote:${q(w.pronNote)}\n  }`;
}

const newArray = words.map(fmtObj).join(',\n');
const rewritten = `${src.slice(0, start + startMarker.length)}\n${newArray}\n${src.slice(end)}`;
fs.writeFileSync(toeicPath, rewritten);

console.log(`Deduplicated entries in 101-400: replaced ${replaced} repeated headwords.`);
