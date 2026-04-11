import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const target = path.join(__dirname, '..', 'src', 'data', 'toeicJa301_400.ts');
let src = fs.readFileSync(target, 'utf8');

const DATA = {
  301: {
    defs: ['修理; 修繕', '修理する; 元どおりに直す'],
    example: '屋根の緊急修理が必要です。',
    synonyms: ['直す', '修繕する', '復旧する', '整備する'],
    phrases: ['車を修理する', '損傷を修理する', '修理中', '修理費用'],
    tip: '語頭は r 音。rih-PAIR で2音節、後ろを強く読む。',
    antEn: ['break', 'damage', 'ruin'],
    antJa: ['壊す', '損なう', '台無しにする'],
  },
  302: {
    defs: ['目標; ねらい', '狙う; 〜を目指す'],
    example: '私たちの目標は2年で売上を倍にすることです。',
    synonyms: ['目標', 'ターゲット', '意図', '目的'],
    phrases: ['高い目標を持つ', '成功を目指す', '主な目的', '達成を目指す'],
    tip: 'AYM は1音節。長い /eɪ/ をはっきり。',
    antEn: ['drift', 'ignore', 'miss'],
    antJa: ['目的なく進む', '無視する', '外す'],
  },
  303: {
    defs: ['信用取引; 与信', '信用する; 貸方計上する'],
    example: '5万ドルの与信枠を設定できます。',
    synonyms: ['信用', '与信', '評価', '認める'],
    phrases: ['与信を与える', '利用限度額', 'クレジットスコア', '功績を認める'],
    tip: 'KRED-it は1音節目を強く。語尾 t を軽く止める。',
    antEn: ['debit', 'distrust', 'blame'],
    antJa: ['借方', '不信', '責任を負わせる'],
  },
  304: {
    defs: ['財務の; 金融の'],
    example: '会議前に財務報告書を確認してください。',
    synonyms: ['財政の', '経済の', '会計の', '金融の'],
    phrases: ['財務報告書', '財政支援', '財務諸表', '会計年度'],
    tip: 'fih-NAN-shul は2音節目を強く。-cial は「シャル」。',
    antEn: ['nonfinancial', 'personal', 'informal'],
    antJa: ['非財務の', '個人的な', '非公式の'],
  },
  305: {
    defs: ['引きつける; 魅了する'],
    example: '新しいキャンペーンは多くの顧客を引きつけた。',
    synonyms: ['引き寄せる', '惹きつける', '呼び込む', '魅了する'],
    phrases: ['注目を集める', '顧客を引きつける', '投資を呼び込む', '人材を引きつける'],
    tip: 'uh-TRAKT。語尾 t をはっきり止める。',
    antEn: ['repel', 'discourage', 'deter'],
    antJa: ['遠ざける', '意欲を失わせる', '思いとどまらせる'],
  },
  306: {
    defs: ['掘る; 掘り起こす', '発掘調査'],
    example: '作業員は午後のうちに溝を掘った。',
    synonyms: ['掘削する', '掘り出す', '調べる', '掘り進める'],
    phrases: ['穴を掘る', '情報を掘り起こす', '発掘調査', 'さらに深掘りする'],
    tip: 'DIG は1音節。語尾 g を濁して終える。',
    antEn: ['bury', 'cover', 'fill'],
    antJa: ['埋める', '覆う', '穴を埋め戻す'],
  },
  307: {
    defs: ['収穫; 収穫期', '収穫する; 採取する'],
    example: '今年の収穫は予想を上回った。',
    synonyms: ['収集', '採取', '刈り取る', '実り'],
    phrases: ['収穫期', '作物を収穫する', '豊作', 'データを収集する'],
    tip: 'HAR-vust。1音節目を強く、語尾 t を軽く止める。',
    antEn: ['plant', 'sow', 'waste'],
    antJa: ['植える', '種をまく', '無駄にする'],
  },
  308: {
    defs: ['援助; 支援', '援助する; 助ける'],
    example: 'その団体は被災者を支援している。',
    synonyms: ['支援', '補助', '手助け', '救済'],
    phrases: ['支援を提供する', '財政支援', '応急処置', '対外援助'],
    tip: 'AYD は1音節。長い /eɪ/ と語尾 d を意識。',
    antEn: ['hinder', 'obstruct', 'harm'],
    antJa: ['妨げる', '阻害する', '害を与える'],
  },
  309: {
    defs: ['強調; 重点'],
    example: '研修ではコミュニケーションを特に重視している。',
    synonyms: ['強調', '焦点', '重要性', '重み'],
    phrases: ['〜を強調する', '〜に重点を置いて', '強い重視', '重点を移す'],
    tip: 'EM-fuh-sis。1音節目を強く、f 音をはっきり。',
    antEn: ['neglect', 'downplay', 'ignore'],
    antJa: ['軽視する', '重要視しない', '無視する'],
  },
  310: {
    defs: ['育成する; 促進する', '里親の（養育の）'],
    example: '会社はイノベーションを育てる文化を重視している。',
    synonyms: ['育てる', '促す', '後押しする', '培う'],
    phrases: ['イノベーションを育てる', '関係を育む', '環境を整える', '成長を促す'],
    tip: 'FOS-tur。1音節目を強く、2音節で短く。',
    antEn: ['suppress', 'hinder', 'discourage'],
    antJa: ['抑える', '妨げる', '意欲をくじく'],
  },
  311: {
    defs: ['個人的な; 私的な'],
    example: '同意なしに個人情報を共有しないでください。',
    synonyms: ['個人の', '私的な', '本人の', 'プライベートな'],
    phrases: ['個人情報', '個人的な意見', '個人データ', '自己成長'],
    tip: 'PUR-sun-ul。1音節目を強く、personnel と区別。',
    antEn: ['public', 'official', 'corporate'],
    antJa: ['公的な', '公式の', '法人の'],
  },
  312: {
    defs: ['選択; 選抜', '品ぞろえ'],
    example: '当店は幅広い商品ラインをそろえています。',
    synonyms: ['選択', '選考', '種類', '品ぞろえ'],
    phrases: ['幅広い品ぞろえ', '選考プロセス', '選考基準', '商品ライン'],
    tip: 'sih-LEK-shun。2音節目を強く、-tion は「ション」。',
    antEn: ['rejection', 'exclusion', 'scarcity'],
    antJa: ['除外', '不採用', '種類の少なさ'],
  },
  313: {
    defs: ['人気のある; 大衆向けの'],
    example: 'これは当社で最も人気のある製品シリーズです。',
    synonyms: ['人気の', '好評な', '主流の', '需要が高い'],
    phrases: ['人気需要', '世論', '一般的な見方', '非常に人気がある'],
    tip: 'POP-yuh-lur。1音節目を強く読む。',
    antEn: ['unpopular', 'niche', 'rare'],
    antJa: ['不人気の', 'ニッチな', 'まれな'],
  },
  314: {
    defs: ['寄付; 寄贈'],
    example: '私たちは金額を問わず寄付を歓迎します。',
    synonyms: ['寄付', '寄贈', '拠出', '贈与'],
    phrases: ['寄付をする', '慈善寄付', '寄付を受け付ける', '寄付キャンペーン'],
    tip: 'doh-NAY-shun。2音節目を強く、-tion は「ション」。',
    antEn: ['withdrawal', 'taking', 'refusal'],
    antJa: ['引き上げ', '取り立て', '提供拒否'],
  },
  315: {
    defs: ['達成する; 到達する'],
    example: '彼女は昨年、専門資格を取得した。',
    synonyms: ['達成する', '到達する', '成し遂げる', '獲得する'],
    phrases: ['目標を達成する', '成功を収める', '資格を取得する', '目標値に到達する'],
    tip: 'uh-TAYN。2音節目を強く、語尾 n を落とさない。',
    antEn: ['fail', 'miss', 'fall short'],
    antJa: ['失敗する', '届かない', '基準に達しない'],
  },
  316: {
    defs: ['価値; 重要性', '価値を見積もる; 高く評価する'],
    example: '私たちはコストに対する価値を重視しています。',
    synonyms: ['価値', '値打ち', '価格', '評価する'],
    phrases: ['価値を付加する', '費用対効果', '額面価値', '中核となる価値観'],
    tip: 'VAL-yoo。1音節目を強く、/æ/ をはっきり。',
    antEn: ['devalue', 'underrate', 'disregard'],
    antJa: ['価値を下げる', '過小評価する', '軽視する'],
  },
  317: {
    defs: ['先導; 先頭', '導く; 率いる'],
    example: '彼女は新しいプロジェクトチームを率いることになった。',
    synonyms: ['導く', '指揮する', '先頭', '主導する'],
    phrases: ['チームを率いる', '先頭に立つ', '見込み客', '模範を示して導く'],
    tip: 'lead は意味で発音が変わる。動詞は LEED、金属は LED。',
    antEn: ['follow', 'trail', 'obey'],
    antJa: ['従う', '後に続く', '指示に従う'],
  },
  318: {
    defs: ['地域社会; コミュニティ'],
    example: '私たちは地域コミュニティへの投資を重視している。',
    synonyms: ['地域社会', '共同体', '近隣', 'ネットワーク'],
    phrases: ['地域コミュニティ', '業界コミュニティ', 'オンラインコミュニティ', '地域連携'],
    tip: 'kuh-MYOO-nih-tee。2音節目を強く、4音節。',
    antEn: ['isolation', 'alienation', 'separation'],
    antJa: ['孤立', '疎外', '分断'],
  },
  319: {
    defs: ['急ぎ; ラッシュ', '急ぐ; 急いで行う'],
    example: '急ぐ必要はないので落ち着いて進めてください。',
    synonyms: ['急ぐ', '突進する', '急行する', '慌ただしさ'],
    phrases: ['通勤ラッシュ', '急いで仕上げる', '急いでいる状態', '特急配送'],
    tip: 'RUSH。語尾は /ʃ/、母音を足さない。',
    antEn: ['delay', 'pause', 'linger'],
    antJa: ['遅らせる', '一時停止する', 'ゆっくり進む'],
  },
  320: {
    defs: ['懸念; 心配事', '関係する; 心配させる'],
    example: '安全性は私たちの最優先の懸念事項です。',
    synonyms: ['懸念', '問題', '関心事', '関わる'],
    phrases: ['懸念を示す', '懸念を提起する', '懸念事項である', '継続企業として存続する'],
    tip: 'kun-SURN。2音節目を強く、語尾 n を残す。',
    antEn: ['confidence', 'assurance', 'calm'],
    antJa: ['安心', '確信', '平静'],
  },
  321: {
    defs: ['寄付する; 提供する'],
    example: 'その企業は救援基金に5万ドルを寄付した。',
    synonyms: ['寄付する', '拠出する', '提供する', '贈る'],
    phrases: ['お金を寄付する', '慈善団体に寄付する', '衣類を寄付する', '時間を寄付する'],
    tip: 'DOH-nayt。1音節目を強く、語尾 t を止める。',
    antEn: ['withhold', 'take', 'refuse'],
    antJa: ['差し控える', '取り上げる', '拒否する'],
  },
  322: {
    defs: ['需要; 要求', '要求する; 強く求める'],
    example: '電気自動車への需要は急速に伸びている。',
    synonyms: ['需要', '要請', '必要性', '要求する'],
    phrases: ['需要を満たす', '高需要', '需要と供給', 'オンデマンド'],
    tip: 'dih-MAND。2音節目を強く、/æ/ を大きく開く。',
    antEn: ['supply', 'surplus', 'abundance'],
    antJa: ['供給', '余剰', '潤沢さ'],
  },
  323: {
    defs: ['欠陥のある; 不良の'],
    example: '不良品は全額返金の対象です。',
    synonyms: ['不良の', '故障した', '欠陥のある', '正常に動かない'],
    phrases: ['不良品', '不良部品', '不良項目', '不良品を返品する'],
    tip: 'dih-FEK-tiv。2音節目を強く、語尾 v を濁す。',
    antEn: ['sound', 'intact', 'functional'],
    antJa: ['正常な', '無傷の', '機能する'],
  },
  324: {
    defs: ['認知; 意識', '周知'],
    example: 'この施策で職場安全への認知が高まった。',
    synonyms: ['認識', '理解', '意識', '周知'],
    phrases: ['認知を高める', 'ブランド認知', '社会的認知', '啓発キャンペーン'],
    tip: 'uh-WAIR-nuss。2音節目を強く、-ware を明確に。',
    antEn: ['ignorance', 'unawareness', 'blindness'],
    antJa: ['無知', '認知不足', '見落とし'],
  },
  325: {
    defs: ['操作する; 運営する', '（事業を）経営する'],
    example: '彼女は小売店チェーンを運営している。',
    synonyms: ['運営する', '管理する', '作動させる', '機能する'],
    phrases: ['機械を操作する', '事業を運営する', '効率よく運営する', '全面稼働の'],
    tip: 'OP-ur-ayt。1音節目を強く、-ate は /eɪt/。',
    antEn: ['halt', 'shut down', 'cease'],
    antJa: ['停止する', '閉鎖する', '中止する'],
  },
};

const ids = Array.from({ length: 25 }, (_, i) => 301 + i);
const q = (s) => JSON.stringify(s);

function buildBackBlock() {
  let out = '';
  for (const id of ids) {
    const d = DATA[id];
    out += `  ${id}: {\n`;
    out += `    defs: [${d.defs.map(q).join(', ')}],\n`;
    out += `    example: ${q(d.example)},\n`;
    out += `    synonyms: [${d.synonyms.map(q).join(', ')}],\n`;
    out += `  },\n`;
  }
  return out;
}

function buildPhrasesBlock() {
  let out = '';
  for (const id of ids) {
    const d = DATA[id];
    out += `  ${id}: [${d.phrases.map(q).join(', ')}],\n`;
  }
  return out;
}

function buildTipsBlock() {
  let out = '';
  for (const id of ids) {
    out += `  ${id}: ${q(DATA[id].tip)},\n`;
  }
  return out;
}

function buildAntonymsBlock() {
  let out = '';
  for (const id of ids) {
    const d = DATA[id];
    out += `  ${id}: { en: [${d.antEn.map(q).join(', ')}], ja: [${d.antJa.map(q).join(', ')}] },\n`;
  }
  return out;
}

src = src.replace(/  301: \{[\s\S]*?  326: \{/m, `${buildBackBlock()}  326: {`);
src = src.replace(/  301: \[[\s\S]*?  326: \[/m, `${buildPhrasesBlock()}  326: [`);
src = src.replace(/  301: "[\s\S]*?  326: "/m, `${buildTipsBlock()}  326: "`);
src = src.replace(
  /  301: \{ en: \[[\s\S]*?  326: \{ en: \[/m,
  `${buildAntonymsBlock()}  326: { en: [`,
);

fs.writeFileSync(target, src);
console.log('Rewrote natural JP for 301-325 in toeicJa301_400.ts');
