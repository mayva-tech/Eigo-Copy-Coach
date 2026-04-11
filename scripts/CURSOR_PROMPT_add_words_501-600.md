# Cursor Task: Add TOEIC Words 501–600 to TOEICVocabCard.jsx

## What to do

Open `TOEICVocabCard.jsx` and append the 100 word objects below to the end of the
`TOEIC_WORDS` array, just before the closing `];`.

Schema is identical to all existing entries — do not change it:

```js
{
  id: number,
  word: string,
  stress: string,
  pos: string[],
  defs: { [pos]: string },
  examples: string[],
  phrases: string[],
  synonyms: string[],
  difficulty: string,
  pronNote: string,
}
```

**Difficulty categories** (use exactly as written):
`"R vs L"` · `"R-blend"` · `"Vowel /æ/"` · `"Final consonant"` · `"Word stress"` ·
`"TH sound"` · `"Long vowel"` · `"Silent letter"` · `"Vowel length"`

---

## Words to append (501–600)

```js
  {
    id:501, word:"plant", stress:"PLANT",
    pos:["noun","verb"],
    defs:{ noun:"a living organism; a factory or industrial facility", verb:"to place a seed or young tree in soil; to position secretly" },
    examples:["The manufacturing plant operates 24 hours a day.","We plan to plant 1,000 trees on the company grounds."],
    phrases:["manufacturing plant","power plant","plant a tree","plant seeds"],
    synonyms:["factory","facility","sow","install"],
    difficulty:"Vowel /æ/",
    pronNote:"/æ/ vowel: PLANT — wide open mouth like 'cat'. 1 syllable. Final /t/ is clean. Don't say PLANTO"
  },
  {
    id:502, word:"vaccinate", stress:"VAK-sih-nayt",
    pos:["verb"],
    defs:{ verb:"to administer a vaccine to protect against disease" },
    examples:["All employees are encouraged to vaccinate against flu.","The company vaccinated its entire workforce last winter."],
    phrases:["vaccinate against","vaccinate employees","vaccination program","get vaccinated"],
    synonyms:["immunize","inoculate","inject","protect"],
    difficulty:"Word stress",
    pronNote:"Stress on 1st syllable: VAK-sih-nayt. 3 syllables. /k/ sound in '-cca-'. '-ate' = /eɪt/. Not vak-SEE-nayt"
  },
  {
    id:503, word:"venue", stress:"VEN-yoo",
    pos:["noun"],
    defs:{ noun:"the place where an event or meeting is held" },
    examples:["The conference venue holds up to 500 participants.","Please confirm the venue details before sending invitations."],
    phrases:["conference venue","event venue","sports venue","book a venue"],
    synonyms:["location","site","place","setting"],
    difficulty:"Word stress",
    pronNote:"Stress on 1st syllable: VEN-yoo. 2 syllables. /v/ not /b/. '-nue' = /njuː/ — like 'new'. Not VEN-oo"
  },
  {
    id:504, word:"probably", stress:"PROB-uh-blee",
    pos:["adverb"],
    defs:{ adverb:"almost certainly; in all likelihood" },
    examples:["The report will probably be ready by Thursday.","We'll probably need to reschedule the meeting."],
    phrases:["probably not","probably will","most probably","very probably"],
    synonyms:["likely","presumably","in all likelihood","almost certainly"],
    difficulty:"R-blend",
    pronNote:"'pr' blend: PROB-uh-blee. /pr/ as one unit. 3 syllables, stress on 1st. Often reduced to PROB-lee in fast speech"
  },
  {
    id:505, word:"directory", stress:"dih-REK-tuh-ree",
    pos:["noun"],
    defs:{ noun:"a list of names and addresses; a computer folder containing files" },
    examples:["Check the company directory for her extension.","The phone directory lists all local businesses."],
    phrases:["company directory","phone directory","online directory","staff directory"],
    synonyms:["listing","index","catalogue","folder"],
    difficulty:"R vs L",
    pronNote:"Initial /d/ then /r/: dih-REK-tuh-ree. /r/ in '-rec-' — not /l/. 4 syllables, stress on 2nd"
  },
  {
    id:506, word:"position", stress:"puh-ZIH-shun",
    pos:["noun","verb"],
    defs:{ noun:"a job or role; a physical location; a stance or view", verb:"to place in a particular location" },
    examples:["She applied for a senior management position.","Position the display unit near the entrance."],
    phrases:["apply for a position","hold a position","job position","position statement"],
    synonyms:["role","job","location","place"],
    difficulty:"Word stress",
    pronNote:"Stress on 2nd syllable: puh-ZIH-shun. 3 syllables. /z/ sound in '-si-'. '-tion' = /ʃun/"
  },
  {
    id:507, word:"vote", stress:"VOHT",
    pos:["noun","verb"],
    defs:{ noun:"a formal choice in an election or decision", verb:"to formally express a choice" },
    examples:["The motion passed by a majority vote.","All board members voted to approve the proposal."],
    phrases:["cast a vote","majority vote","vote in favor","put to a vote"],
    synonyms:["ballot","choice","elect","decide"],
    difficulty:"Long vowel",
    pronNote:"Long /oʊ/ diphthong: VOHT. 1 syllable. /v/ not /b/. Final /t/ stops cleanly. Rhymes with 'note'"
  },
  {
    id:508, word:"collective", stress:"kuh-LEK-tiv",
    pos:["adjective","noun"],
    defs:{ adjective:"done by or shared among all members of a group", noun:"a cooperative group of people" },
    examples:["This was a collective effort by the entire team.","The collective bargaining agreement expires next year."],
    phrases:["collective effort","collective decision","collective bargaining","collective responsibility"],
    synonyms:["shared","joint","combined","group"],
    difficulty:"Word stress",
    pronNote:"Stress on 2nd syllable: kuh-LEK-tiv. 3 syllables. /k/ in '-lec-'. Final /v/ is voiced — don't drop it"
  },
  {
    id:509, word:"certain", stress:"SUR-tun",
    pos:["adjective"],
    defs:{ adjective:"known for sure; having no doubt; specific but not named" },
    examples:["Are you certain the figures are correct?","Certain employees are exempt from the new policy."],
    phrases:["make certain","certain about","for certain","under certain conditions"],
    synonyms:["sure","definite","specific","particular"],
    difficulty:"Word stress",
    pronNote:"Stress on 1st syllable: SUR-tun. 2 syllables. /ɜr/ like 'her' in 'cer-'. '-tain' reduces to /tən/"
  },
  {
    id:510, word:"assessment", stress:"uh-SESS-munt",
    pos:["noun"],
    defs:{ noun:"the evaluation or appraisal of someone or something" },
    examples:["A full risk assessment must be completed before work begins.","Her performance assessment was overwhelmingly positive."],
    phrases:["risk assessment","conduct an assessment","performance assessment","needs assessment"],
    synonyms:["evaluation","appraisal","review","judgment"],
    difficulty:"Word stress",
    pronNote:"Stress on 2nd syllable: uh-SESS-munt. 3 syllables. Double '-ss-' = one /s/. '-ment' is unstressed"
  },
  {
    id:511, word:"achievement", stress:"uh-CHEEV-munt",
    pos:["noun"],
    defs:{ noun:"a thing done successfully with effort, skill, or courage" },
    examples:["Winning the contract was a major achievement.","The award recognizes outstanding professional achievement."],
    phrases:["major achievement","academic achievement","career achievement","sense of achievement"],
    synonyms:["accomplishment","attainment","success","feat"],
    difficulty:"Word stress",
    pronNote:"Stress on 2nd syllable: uh-CHEEV-munt. 3 syllables. /tʃ/ in '-chieve-'. Long /iː/ — like 'achieve'"
  },
  {
    id:512, word:"stand", stress:"STAND",
    pos:["noun","verb"],
    defs:{ noun:"a structure for displaying or selling goods; a position taken on an issue", verb:"to be upright; to tolerate" },
    examples:["Our stand at the trade fair attracted many visitors.","She stands firm on her commitment to quality."],
    phrases:["stand by","stand out","trade stand","take a stand"],
    synonyms:["booth","position","endure","support"],
    difficulty:"Vowel /æ/",
    pronNote:"/æ/ vowel: STAND — wide open mouth. 1 syllable. /st/ cluster at start. Final /d/ is voiced"
  },
  {
    id:513, word:"mechanic", stress:"mih-KAN-ik",
    pos:["noun"],
    defs:{ noun:"a person who repairs and maintains machinery, especially vehicles" },
    examples:["The company employs a full-time mechanic for the fleet.","She hired a mechanic to service all the delivery vans."],
    phrases:["auto mechanic","skilled mechanic","mechanic shop","hire a mechanic"],
    synonyms:["technician","engineer","repairman","fitter"],
    difficulty:"Vowel /æ/",
    pronNote:"/æ/ in '-can-': mih-KAN-ik. Wide open mouth — like 'can'. Stress on 2nd syllable. 3 syllables"
  },
  {
    id:514, word:"decade", stress:"DEK-ayd",
    pos:["noun"],
    defs:{ noun:"a period of ten years" },
    examples:["The company has grown steadily over the past decade.","She has over a decade of experience in logistics."],
    phrases:["over a decade","span a decade","past decade","in the coming decade"],
    synonyms:["ten years","ten-year period"],
    difficulty:"Word stress",
    pronNote:"Stress on 1st syllable: DEK-ayd. 2 syllables. /ɛ/ in 'dec-' like 'deck'. /eɪ/ diphthong in '-ade'"
  },
  {
    id:515, word:"traditional", stress:"truh-DIH-shun-ul",
    pos:["adjective"],
    defs:{ adjective:"following long-established customs; conventional" },
    examples:["We combine traditional craftsmanship with modern design.","The company follows a traditional hierarchical structure."],
    phrases:["traditional values","traditional methods","traditional approach","traditional style"],
    synonyms:["conventional","customary","classic","established"],
    difficulty:"R-blend",
    pronNote:"'tr' blend: truh-DIH-shun-ul. /tr/ as one unit. 4 syllables, stress on 2nd. '-tion' = /ʃun/"
  },
  {
    id:516, word:"conflict", stress:"KON-flikt (n) · kun-FLIKT (v)",
    pos:["noun","verb"],
    defs:{ noun:"a serious disagreement; a clash between opposing forces", verb:"to be incompatible; to clash" },
    examples:["The two departments are in conflict over the budget.","His personal beliefs conflict with company policy."],
    phrases:["avoid conflict","resolve conflict","conflict of interest","conflict resolution"],
    synonyms:["disagreement","clash","dispute","contradict"],
    difficulty:"Word stress",
    pronNote:"Noun: KON-flikt (stress 1st). Verb: kun-FLIKT (stress 2nd). Classic English noun/verb stress shift"
  },
  {
    id:517, word:"supplier", stress:"suh-PLY-ur",
    pos:["noun"],
    defs:{ noun:"a person or company that provides goods or services to another" },
    examples:["We work with over 50 approved suppliers worldwide.","The main supplier failed to deliver on time."],
    phrases:["key supplier","reliable supplier","supplier contract","preferred supplier"],
    synonyms:["vendor","provider","wholesaler","distributor"],
    difficulty:"Word stress",
    pronNote:"Stress on 2nd syllable: suh-PLY-ur. 3 syllables. /aɪ/ diphthong in '-pli-'. /r/ at end in American English"
  },
  {
    id:518, word:"entertainment", stress:"en-tur-TAYN-munt",
    pos:["noun"],
    defs:{ noun:"the action of providing amusement; events or performances designed to amuse" },
    examples:["The gala featured live entertainment throughout the evening.","The company's entertainment budget was cut this year."],
    phrases:["live entertainment","entertainment industry","entertainment costs","client entertainment"],
    synonyms:["amusement","performance","recreation","diversion"],
    difficulty:"Word stress",
    pronNote:"Stress on 3rd syllable: en-tur-TAYN-munt. 4 syllables. /eɪ/ in '-tain-'. '-ment' is unstressed"
  },
  {
    id:519, word:"alteration", stress:"ol-tuh-RAY-shun",
    pos:["noun"],
    defs:{ noun:"a change or modification, especially to clothing or a document" },
    examples:["The tailor made several alterations to the suit.","Any alterations to the contract must be initialed."],
    phrases:["make an alteration","request an alteration","minor alteration","contract alteration"],
    synonyms:["change","modification","adjustment","amendment"],
    difficulty:"Word stress",
    pronNote:"Stress on 3rd syllable: ol-tuh-RAY-shun. 4 syllables. /ɔː/ in 'al-' like 'all'. '-tion' = /ʃun/"
  },
  {
    id:520, word:"hand", stress:"HAND",
    pos:["noun","verb"],
    defs:{ noun:"the body part at the end of the arm; a worker; a round of applause", verb:"to pass or give something to someone" },
    examples:["Please hand in your report by end of day.","All hands are needed for the product launch."],
    phrases:["hand in","hand out","on hand","give a hand"],
    synonyms:["pass","submit","worker","give"],
    difficulty:"Final consonant",
    pronNote:"Final /d/: HAND — voiced stop. /æ/ vowel. 1 syllable. 'hand in' = submit; 'hand out' = distribute"
  },
  {
    id:521, word:"signal", stress:"SIG-nul",
    pos:["noun","verb"],
    defs:{ noun:"a gesture or sign conveying information; an indication", verb:"to convey through a gesture or sign" },
    examples:["The data signals a shift in consumer behavior.","A strong WiFi signal is essential for remote work."],
    phrases:["traffic signal","send a signal","signal an intention","mixed signals"],
    synonyms:["sign","indication","gesture","indicate"],
    difficulty:"Word stress",
    pronNote:"Stress on 1st syllable: SIG-nul. 2 syllables. Hard /g/ in '-gnal'. '-al' reduces to /nəl/"
  },
  {
    id:522, word:"dental", stress:"DEN-tul",
    pos:["adjective"],
    defs:{ adjective:"relating to the teeth or dentistry" },
    examples:["Dental insurance is included in the benefits package.","She scheduled a dental appointment for next Tuesday."],
    phrases:["dental insurance","dental care","dental appointment","dental plan"],
    synonyms:["oral","tooth-related"],
    difficulty:"Word stress",
    pronNote:"Stress on 1st syllable: DEN-tul. 2 syllables. /d/ not /t/ at start. '-tal' reduces to /tul/"
  },
  {
    id:523, word:"view", stress:"VYOO",
    pos:["noun","verb"],
    defs:{ noun:"the ability to see something; an opinion or attitude", verb:"to look at; to consider" },
    examples:["The corner office has a panoramic city view.","We view this partnership as a long-term investment."],
    phrases:["scenic view","in view of","point of view","view a document"],
    synonyms:["sight","perspective","opinion","see"],
    difficulty:"Long vowel",
    pronNote:"Long /uː/ with /v/: VYOO. 1 syllable. /v/ not /b/. Rhymes with 'new'. Don't say 'byoo'"
  },
  {
    id:524, word:"fold", stress:"FOHLD",
    pos:["noun","verb"],
    defs:{ noun:"a bend or crease; a group (e.g., a sheepfold)", verb:"to bend something over on itself; to close a business" },
    examples:["Please fold the letter before placing it in the envelope.","The startup folded after only six months of operation."],
    phrases:["fold paper","fold clothes","fold a business","return to the fold"],
    synonyms:["crease","bend","collapse","close"],
    difficulty:"Long vowel",
    pronNote:"Long /oʊ/ diphthong: FOHLD. 1 syllable. /fl/ not /f/ alone. Final /d/ is voiced — don't drop it"
  },
  {
    id:525, word:"inaugural", stress:"in-AW-gyuh-rul",
    pos:["adjective"],
    defs:{ adjective:"marking the beginning of an institution, activity, or period of office; first" },
    examples:["The inaugural ceremony was attended by over 1,000 guests.","This is the inaugural edition of our annual report."],
    phrases:["inaugural address","inaugural ceremony","inaugural meeting","inaugural event"],
    synonyms:["first","opening","initial","launching"],
    difficulty:"Word stress",
    pronNote:"Stress on 2nd syllable: in-AW-gyuh-rul. 4 syllables. /ɔː/ in '-au-' like 'law'. '-gural' = /gjʊrəl/"
  },
  {
    id:526, word:"contagious", stress:"kun-TAY-jus",
    pos:["adjective"],
    defs:{ adjective:"able to spread from person to person; (of emotion) likely to spread to others" },
    examples:["Contagious illnesses require employees to work from home.","Her enthusiasm for the project was contagious."],
    phrases:["contagious disease","highly contagious","contagious enthusiasm","contagious laughter"],
    synonyms:["infectious","spreading","transmissible","catching"],
    difficulty:"Word stress",
    pronNote:"Stress on 2nd syllable: kun-TAY-jus. 3 syllables. /dʒ/ in '-gious-' like 'judge'. /eɪ/ in '-ta-'"
  },
  {
    id:527, word:"exhibit", stress:"ig-ZIH-bit",
    pos:["noun","verb"],
    defs:{ noun:"an object or display in a museum or show", verb:"to display publicly; to demonstrate a quality" },
    examples:["The trade show had over 200 exhibitors.","She exhibited strong leadership throughout the crisis."],
    phrases:["art exhibit","exhibit at a trade show","on exhibit","exhibit skills"],
    synonyms:["display","show","demonstrate","present"],
    difficulty:"Word stress",
    pronNote:"Stress on 2nd syllable: ig-ZIH-bit. 3 syllables. /gz/ sound in 'ex-' — like 'eggs'. Final /t/ stops cleanly"
  },
  {
    id:528, word:"prefer", stress:"prih-FUR",
    pos:["verb"],
    defs:{ verb:"to like one thing or option better than another" },
    examples:["Many employees prefer flexible working arrangements.","Do you prefer email or phone for correspondence?"],
    phrases:["prefer to","would prefer","strongly prefer","prefer email"],
    synonyms:["favor","choose","like better","opt for"],
    difficulty:"R vs L",
    pronNote:"Initial /pr/ then final /r/: prih-FUR. /r/ not /l/ at start. /ɜr/ like 'her' at end. 2 syllables, stress on 2nd"
  },
  {
    id:529, word:"clarify", stress:"KLAIR-ih-fy",
    pos:["verb"],
    defs:{ verb:"to make a statement or situation less confused; to explain more clearly" },
    examples:["Could you please clarify the payment terms?","She clarified her earlier comments in a follow-up email."],
    phrases:["clarify a point","clarify instructions","please clarify","clarify expectations"],
    synonyms:["explain","clear up","elaborate","specify"],
    difficulty:"Word stress",
    pronNote:"Stress on 1st syllable: KLAIR-ih-fy. 3 syllables. /eə/ in 'clar-' like 'care'. Final /aɪ/ diphthong"
  },
  {
    id:530, word:"initiative", stress:"ih-NISH-uh-tiv",
    pos:["noun"],
    defs:{ noun:"a new strategy or plan; the drive to act independently" },
    examples:["This sustainability initiative will reduce emissions by 25%.","She took the initiative to solve the problem before being asked."],
    phrases:["take initiative","show initiative","new initiative","company-wide initiative"],
    synonyms:["plan","program","drive","enterprise"],
    difficulty:"Word stress",
    pronNote:"5 syllables, stress on 2nd: ih-NISH-uh-tiv. '-tia-' = /ʃ/. Say slowly: ih · NISH · uh · tiv"
  },
  {
    id:531, word:"substantial", stress:"sub-STAN-shul",
    pos:["adjective"],
    defs:{ adjective:"of considerable importance, size, or value" },
    examples:["There has been a substantial improvement in team performance.","The investment required a substantial commitment of resources."],
    phrases:["substantial progress","substantial increase","substantial benefit","substantial evidence"],
    synonyms:["significant","considerable","large","major"],
    difficulty:"Vowel /æ/",
    pronNote:"/æ/ in '-stan-': sub-STAN-shul. Wide open mouth. '-tial' = /ʃul/. 3 syllables, stress on 2nd"
  },
  {
    id:532, word:"reimburse", stress:"ree-im-BURSS",
    pos:["verb"],
    defs:{ verb:"to repay money spent by someone on your behalf" },
    examples:["Receipts must be submitted within 30 days to be reimbursed.","The firm will reimburse all reasonable business expenses."],
    phrases:["reimburse expenses","reimbursement request","be fully reimbursed","reimburse travel"],
    synonyms:["repay","refund","compensate","pay back"],
    difficulty:"Word stress",
    pronNote:"Stress on 3rd syllable: ree-im-BURSS. 3 syllables. /ɜr/ like 'her'. Still one of the most common TOEIC verbs"
  },
  {
    id:533, word:"negotiate", stress:"nih-GOH-shee-ayt",
    pos:["verb"],
    defs:{ verb:"to discuss in order to reach a mutual agreement" },
    examples:["We will negotiate the final terms before signing.","The union is negotiating a new collective agreement."],
    phrases:["negotiate a deal","negotiate terms","negotiation skills","negotiating position"],
    synonyms:["bargain","broker","discuss","mediate"],
    difficulty:"Word stress",
    pronNote:"5 syllables: nih-GOH-shee-ayt. Stress on 2nd. '-tia-' = /ʃ/. Appears in almost every TOEIC reading passage"
  },
  {
    id:534, word:"accommodate", stress:"uh-KOM-uh-dayt",
    pos:["verb"],
    defs:{ verb:"to provide lodging or space; to adapt willingly to someone's needs" },
    examples:["The venue can accommodate up to 300 guests.","We are happy to accommodate any dietary requirements."],
    phrases:["accommodate guests","accommodate a request","accommodate changes","fully accommodate"],
    synonyms:["house","adapt","adjust","cater to"],
    difficulty:"Word stress",
    pronNote:"5 syllables: uh-KOM-uh-dayt. Stress on 2nd. Spelled with double 'c' and double 'm' — common error"
  },
  {
    id:535, word:"revenue", stress:"REV-ih-nyoo",
    pos:["noun"],
    defs:{ noun:"the total income of a business or government from all sources" },
    examples:["Revenue grew by 22% in the second half of the year.","Advertising revenue accounts for 60% of total income."],
    phrases:["annual revenue","revenue forecast","revenue stream","revenue growth"],
    synonyms:["income","earnings","proceeds","turnover"],
    difficulty:"Word stress",
    pronNote:"Stress on 1st syllable: REV-ih-nyoo. 3 syllables. /v/ not /b/. '-nue' = /njuː/ — like 'new'"
  },
  {
    id:536, word:"candidate", stress:"KAN-dih-dayt",
    pos:["noun"],
    defs:{ noun:"a person who applies for a job or is nominated for a position" },
    examples:["She was the strongest candidate for the regional director role.","All candidates must complete a written test."],
    phrases:["job candidate","shortlisted candidate","ideal candidate","qualified candidate"],
    synonyms:["applicant","nominee","contender","prospect"],
    difficulty:"Vowel /æ/",
    pronNote:"Initial /æ/: KAN-dih-dayt. Wide open mouth on first syllable. 3 syllables, stress on 1st"
  },
  {
    id:537, word:"stringent", stress:"STRIN-junt",
    pos:["adjective"],
    defs:{ adjective:"strictly enforced; demanding exact adherence to rules or standards" },
    examples:["New stringent regulations require detailed record-keeping.","The quality control process is extremely stringent."],
    phrases:["stringent requirements","stringent standards","stringent controls","stringent regulations"],
    synonyms:["strict","rigorous","demanding","exacting"],
    difficulty:"Word stress",
    pronNote:"Stress on 1st syllable: STRIN-junt. 2 syllables. /str/ cluster — no vowel inside. /dʒ/ in '-gent'"
  },
  {
    id:538, word:"relevant", stress:"REL-uh-vunt",
    pos:["adjective"],
    defs:{ adjective:"closely connected or appropriate to what is being done or considered" },
    examples:["Please include only relevant experience on your resume.","The training covers all relevant industry standards."],
    phrases:["relevant experience","relevant skills","highly relevant","relevant information"],
    synonyms:["applicable","pertinent","related","appropriate"],
    difficulty:"Word stress",
    pronNote:"Stress on 1st syllable: REL-uh-vunt. 3 syllables. '-ant' ending is unstressed: /ənt/. /v/ not /b/"
  },
  {
    id:539, word:"preference", stress:"PREF-ur-unss",
    pos:["noun"],
    defs:{ noun:"a greater liking for one alternative over another; a prior right to choose" },
    examples:["Please indicate your seating preference when booking.","We always give preference to internal candidates first."],
    phrases:["state a preference","personal preference","give preference","in preference to"],
    synonyms:["choice","liking","priority","favor"],
    difficulty:"R-blend",
    pronNote:"'pr' blend: PREF-ur-unss. /pr/ as one unit. 3 syllables, stress on 1st. Often reduced to 2 syllables: PREF-runss"
  },
  {
    id:540, word:"comply", stress:"kum-PLY",
    pos:["verb"],
    defs:{ verb:"to act in accordance with a wish, command, or rule" },
    examples:["All contractors must comply with our safety policy.","We are required by law to comply with these standards."],
    phrases:["comply with","failure to comply","fully comply","comply with regulations"],
    synonyms:["obey","follow","adhere","conform"],
    difficulty:"Final consonant",
    pronNote:"Final /aɪ/: kum-PLY — rhymes with 'fly'. 2 syllables, stress on 2nd. /pl/ blend — no extra vowel between"
  },
  {
    id:541, word:"obligation", stress:"ob-lih-GAY-shun",
    pos:["noun"],
    defs:{ noun:"a duty or commitment one is required to fulfill" },
    examples:["We have a legal obligation to protect user data.","There is no obligation to make a purchase today."],
    phrases:["legal obligation","no obligation","contractual obligation","fulfill an obligation"],
    synonyms:["duty","responsibility","commitment","requirement"],
    difficulty:"Word stress",
    pronNote:"Stress on 3rd syllable: ob-lih-GAY-shun. 4 syllables. '-tion' = /ʃun/. /b/ at start — not /v/"
  },
  {
    id:542, word:"inventory", stress:"IN-ven-tor-ee",
    pos:["noun","verb"],
    defs:{ noun:"a complete list of goods or property in stock", verb:"to make a stock list" },
    examples:["We conduct a full inventory count every quarter.","Inventory levels are monitored in real time."],
    phrases:["take inventory","inventory management","inventory levels","conduct inventory"],
    synonyms:["stock","stocklist","supply","catalogue"],
    difficulty:"Word stress",
    pronNote:"Stress on 1st syllable: IN-ven-tor-ee. 4 syllables. Don't stress '-ven-'. Often spoken as 3: IN-vun-tree"
  },
  {
    id:543, word:"preliminary", stress:"prih-LIM-ih-ner-ee",
    pos:["adjective","noun"],
    defs:{ adjective:"preceding or preparing for the main matter; introductory", noun:"a preliminary measure or action" },
    examples:["Preliminary results show a significant improvement.","A preliminary meeting was held to set the agenda."],
    phrases:["preliminary results","preliminary meeting","preliminary investigation","preliminary stage"],
    synonyms:["initial","introductory","preparatory","provisional"],
    difficulty:"R-blend",
    pronNote:"'pr' blend: prih-LIM-ih-ner-ee. /pr/ as one unit. 5 syllables, stress on 2nd. Often shortened to 4 syllables"
  },
  {
    id:544, word:"acknowledge", stress:"ak-NOL-ij",
    pos:["verb"],
    defs:{ verb:"to confirm receipt of; to recognize the truth or existence of" },
    examples:["Please acknowledge receipt of this instruction by reply.","The report acknowledges several areas for improvement."],
    phrases:["acknowledge receipt","acknowledge an error","widely acknowledged","formally acknowledge"],
    synonyms:["confirm","recognize","accept","admit"],
    difficulty:"Silent letter",
    pronNote:"Only 3 syllables: ak-NOL-ij. The final 'e' is silent. '-edge' = /ɪdʒ/ like 'fridge'. Don't add a 4th syllable"
  },
  {
    id:545, word:"eligible", stress:"EL-ih-jih-bul",
    pos:["adjective"],
    defs:{ adjective:"having the right to do or obtain something; satisfying requirements" },
    examples:["All full-time employees are eligible for the pension plan.","You may not be eligible if you joined after the cutoff date."],
    phrases:["eligible for","eligible to apply","not eligible","make eligible"],
    synonyms:["qualified","entitled","suitable","permitted"],
    difficulty:"Word stress",
    pronNote:"Stress on 1st syllable: EL-ih-jih-bul. 4 syllables. The 'g' = /dʒ/ like 'jump'"
  },
  {
    id:546, word:"simultaneous", stress:"sy-mul-TAY-nee-us",
    pos:["adjective"],
    defs:{ adjective:"occurring or done at the same time" },
    examples:["The event was broadcast via simultaneous translation.","Simultaneous updates were pushed to all devices."],
    phrases:["simultaneous translation","simultaneous broadcast","simultaneous release","simultaneous action"],
    synonyms:["concurrent","parallel","synchronous","coinciding"],
    difficulty:"Word stress",
    pronNote:"Stress on 3rd syllable: sy-mul-TAY-nee-us. 5 syllables. Long /eɪ/ in '-tay-'. /aɪ/ at start — like 'eye'"
  },
  {
    id:547, word:"supplement", stress:"SUP-luh-munt",
    pos:["noun","verb"],
    defs:{ noun:"something added to complete or improve something", verb:"to add to in order to improve" },
    examples:["This guide supplements the main training manual.","She took on freelance work to supplement her income."],
    phrases:["dietary supplement","supplement income","wage supplement","supplement a report"],
    synonyms:["addition","complement","add to","enhance"],
    difficulty:"Word stress",
    pronNote:"Stress on 1st syllable: SUP-luh-munt. 3 syllables. /pl/ cluster — no extra vowel between /p/ and /l/"
  },
  {
    id:548, word:"coordinate", stress:"koh-OR-dih-nayt",
    pos:["verb"],
    defs:{ verb:"to bring different elements into an efficient relationship; to organize jointly" },
    examples:["She coordinates all logistics across the three sites.","Please coordinate your schedules before confirming the meeting."],
    phrases:["coordinate efforts","coordinate a response","coordinate with teams","event coordinator"],
    synonyms:["organize","align","manage","synchronize"],
    difficulty:"Word stress",
    pronNote:"Stress on 2nd syllable: koh-OR-dih-nayt. 4 syllables. /r/ in '-or-' is clear. '-ate' = /eɪt/"
  },
  {
    id:549, word:"proficient", stress:"pruh-FISH-unt",
    pos:["adjective"],
    defs:{ adjective:"competent or skilled at doing something" },
    examples:["The role requires someone proficient in data analysis tools.","She is proficient in four programming languages."],
    phrases:["proficient in English","highly proficient","proficiency test","demonstrated proficiency"],
    synonyms:["skilled","competent","expert","capable"],
    difficulty:"R-blend",
    pronNote:"'pr' blend: pruh-FISH-unt. /pr/ as one unit. '-fici-' = /ʃ/ like 'fish'. 3 syllables, stress on 2nd"
  },
  {
    id:550, word:"representative", stress:"rep-rih-ZEN-tuh-tiv",
    pos:["noun","adjective"],
    defs:{ noun:"a person who acts for or speaks on behalf of others", adjective:"typical of a class or group" },
    examples:["Please contact our sales representative for a quote.","The survey results are representative of the wider workforce."],
    phrases:["sales representative","customer representative","elected representative","representative sample"],
    synonyms:["delegate","agent","spokesperson","typical"],
    difficulty:"Word stress",
    pronNote:"Stress on 3rd syllable: rep-rih-ZEN-tuh-tiv. 5 syllables. /r/ in 'rep-'. Often shortened to 'rep'"
  },
  {
    id:551, word:"accumulate", stress:"uh-KYOOM-yuh-layt",
    pos:["verb"],
    defs:{ verb:"to gather or increase progressively" },
    examples:["Interest will accumulate on overdue balances.","She accumulated significant expertise over 15 years."],
    phrases:["accumulate experience","accumulate debt","accumulate evidence","accumulate points"],
    synonyms:["build up","amass","gather","stockpile"],
    difficulty:"Word stress",
    pronNote:"Stress on 2nd syllable: uh-KYOOM-yuh-layt. 4 syllables. Long /uː/ in '-kyoom-'. /j/ before 'u'"
  },
  {
    id:552, word:"expedition", stress:"ek-spuh-DIH-shun",
    pos:["noun"],
    defs:{ noun:"a journey made for a specific purpose; promptness in completing something" },
    examples:["The team went on a research expedition to the Arctic.","The goods were delivered with all possible expedition."],
    phrases:["scientific expedition","with expedition","polar expedition","research expedition"],
    synonyms:["journey","mission","trip","speed"],
    difficulty:"Word stress",
    pronNote:"Stress on 3rd syllable: ek-spuh-DIH-shun. 4 syllables. /ks/ in 'ex-'. '-tion' = /ʃun/"
  },
  {
    id:553, word:"compatible", stress:"kum-PAT-ih-bul",
    pos:["adjective"],
    defs:{ adjective:"able to exist or work together without conflict; (of software) able to run on a specific system" },
    examples:["Please check that the software is compatible with your system.","The two approaches are not compatible."],
    phrases:["fully compatible","compatible with","compatible systems","backward compatible"],
    synonyms:["consistent","harmonious","suitable","adaptable"],
    difficulty:"Vowel /æ/",
    pronNote:"/æ/ in '-pat-': kum-PAT-ih-bul. Wide open mouth like 'pat'. Stress on 2nd syllable. 4 syllables"
  },
  {
    id:554, word:"disruption", stress:"dis-RUP-shun",
    pos:["noun"],
    defs:{ noun:"a disturbance that interrupts an event, activity, or process" },
    examples:["We apologize for any disruption caused by the renovation.","The strike caused widespread disruption to train services."],
    phrases:["cause disruption","service disruption","minimal disruption","avoid disruption"],
    synonyms:["interruption","disturbance","upheaval","setback"],
    difficulty:"Word stress",
    pronNote:"Stress on 2nd syllable: dis-RUP-shun. 3 syllables. /ʌ/ in '-rup-' like 'cup'. '-tion' = /ʃun/"
  },
  {
    id:555, word:"negotiate", stress:"nih-GOH-shee-ayt",
    pos:["verb"],
    defs:{ verb:"to confer formally to reach a settlement" },
    examples:["The two parties are still negotiating the final terms.","She is an expert at negotiating complex international contracts."],
    phrases:["negotiate in good faith","back at the negotiating table","skilled negotiator","hard-nosed negotiation"],
    synonyms:["bargain","broker","mediate","settle"],
    difficulty:"Word stress",
    pronNote:"5 syllables: nih-GOH-shee-ayt. Stress on 2nd. '-tia-' = /ʃ/. Nail this — it's the most-tested TOEIC word"
  },
  {
    id:556, word:"reimburse", stress:"ree-im-BURSS",
    pos:["verb"],
    defs:{ verb:"to repay money spent by someone on your behalf" },
    examples:["Approved expenses are reimbursed within two working weeks.","You must keep original receipts to be reimbursed."],
    phrases:["reimbursement policy","expense reimbursement","be fully reimbursed","reimburse promptly"],
    synonyms:["repay","refund","compensate","pay back"],
    difficulty:"Word stress",
    pronNote:"Stress on 3rd syllable: ree-im-BURSS. 3 syllables. /ɜr/ like 'her'. This word is on virtually every TOEIC exam"
  },
  {
    id:557, word:"facilitate", stress:"fuh-SIL-ih-tayt",
    pos:["verb"],
    defs:{ verb:"to make an action or process easier; to help bring about" },
    examples:["The new platform facilitates seamless team communication.","She was hired specifically to facilitate the merger process."],
    phrases:["facilitate communication","facilitate change","facilitate a workshop","facilitate growth"],
    synonyms:["enable","assist","ease","help"],
    difficulty:"Word stress",
    pronNote:"Stress on 2nd syllable: fuh-SIL-ih-tayt. 4 syllables. /s/ not /ʃ/ in '-cil-'. '-ate' = /eɪt/"
  },
  {
    id:558, word:"fluctuate", stress:"FLUK-choo-ayt",
    pos:["verb"],
    defs:{ verb:"to rise and fall irregularly in number or amount" },
    examples:["Oil prices fluctuate with global supply and demand.","Demand tends to fluctuate significantly during holidays."],
    phrases:["prices fluctuate","market fluctuation","demand fluctuates","fluctuate widely"],
    synonyms:["vary","shift","swing","oscillate"],
    difficulty:"Word stress",
    pronNote:"Stress on 1st syllable: FLUK-choo-ayt. 3 syllables. /fl/ blend at start. '-tua-' = /tʃuː/"
  },
  {
    id:559, word:"consecutive", stress:"kun-SEK-yuh-tiv",
    pos:["adjective"],
    defs:{ adjective:"following each other continuously without interruption" },
    examples:["The company reported growth for nine consecutive quarters.","She has attended every conference for five consecutive years."],
    phrases:["consecutive quarters","consecutive wins","consecutive days","back-to-back consecutive"],
    synonyms:["successive","sequential","continuous","uninterrupted"],
    difficulty:"Word stress",
    pronNote:"5 syllables, stress on 2nd: kun-SEK-yuh-tiv. '-utu-' sounds like /jʊt/. Practice each part slowly"
  },
  {
    id:560, word:"premises", stress:"PREM-ih-siz",
    pos:["noun"],
    defs:{ noun:"a building and its grounds; a business location" },
    examples:["No smoking is permitted anywhere on the premises.","The company is looking for new premises in the city center."],
    phrases:["on the premises","off the premises","business premises","vacate the premises"],
    synonyms:["property","building","grounds","facility"],
    difficulty:"Word stress",
    pronNote:"Stress on 1st syllable: PREM-ih-siz. 3 syllables. Final '-ises' = /ɪsɪz/. Don't merge to 2 syllables"
  },
  {
    id:561, word:"acquisition", stress:"ak-wih-ZIH-shun",
    pos:["noun"],
    defs:{ noun:"the purchase of one company by another; obtaining something" },
    examples:["The acquisition of the startup cost $500 million.","Language acquisition improves with consistent daily practice."],
    phrases:["merger and acquisition","strategic acquisition","hostile acquisition","new acquisition"],
    synonyms:["purchase","takeover","buyout","obtaining"],
    difficulty:"Word stress",
    pronNote:"Stress on 3rd syllable: ak-wih-ZIH-shun. 4 syllables. /z/ sound in '-si-'. '-tion' = /ʃun/"
  },
  {
    id:562, word:"comprehensive", stress:"kom-prih-HEN-siv",
    pos:["adjective"],
    defs:{ adjective:"including all or nearly all elements; thorough" },
    examples:["We conducted a comprehensive review of all procedures.","The benefits package is comprehensive and competitive."],
    phrases:["comprehensive review","comprehensive report","comprehensive benefits","comprehensive training"],
    synonyms:["thorough","complete","extensive","all-inclusive"],
    difficulty:"Word stress",
    pronNote:"Stress on 3rd syllable: kom-prih-HEN-siv. 4 syllables. 'pr' blend inside: /pr/ as one unit"
  },
  {
    id:563, word:"guarantee", stress:"gar-un-TEE",
    pos:["noun","verb"],
    defs:{ noun:"a formal assurance; a warranty", verb:"to formally promise that something will happen" },
    examples:["All products carry a two-year money-back guarantee.","We guarantee delivery within five business days."],
    phrases:["money-back guarantee","satisfaction guarantee","quality guarantee","guarantee delivery"],
    synonyms:["assurance","warranty","promise","ensure"],
    difficulty:"Word stress",
    pronNote:"Stress on 3rd syllable: gar-un-TEE. 3 syllables. Long /iː/ at end. Hard /g/ — not /dʒ/"
  },
  {
    id:564, word:"alternative", stress:"ol-TUR-nuh-tiv",
    pos:["adjective","noun"],
    defs:{ adjective:"available as another possibility", noun:"one of two or more available options" },
    examples:["Is there an alternative route we could take?","We explored several alternatives before making a decision."],
    phrases:["alternative option","no alternative","alternative solution","alternative approach"],
    synonyms:["option","choice","substitute","other"],
    difficulty:"Word stress",
    pronNote:"Stress on 2nd syllable: ol-TUR-nuh-tiv. 4 syllables. /ɜr/ like 'her' in '-tur-'. '-ive' reduces to /ɪv/"
  },
  {
    id:565, word:"provisional", stress:"pruh-VIH-zhun-ul",
    pos:["adjective"],
    defs:{ adjective:"arranged for now, possibly to be changed; temporary" },
    examples:["A provisional budget has been approved pending review.","The provisional offer is subject to reference checks."],
    phrases:["provisional budget","provisional offer","provisional approval","on a provisional basis"],
    synonyms:["temporary","interim","preliminary","conditional"],
    difficulty:"R-blend",
    pronNote:"'pr' blend: pruh-VIH-zhun-ul. /pr/ as one unit. /ʒ/ in '-sion-' like 'measure'. 4 syllables, stress on 2nd"
  },
  {
    id:566, word:"coincide", stress:"koh-in-SYD",
    pos:["verb"],
    defs:{ verb:"to occur at the same time; to be in agreement with" },
    examples:["The conference happens to coincide with our product launch.","Our findings coincide with the industry report's conclusions."],
    phrases:["coincide with","dates coincide","happen to coincide","interests coincide"],
    synonyms:["overlap","correspond","align","agree"],
    difficulty:"Word stress",
    pronNote:"Stress on 3rd syllable: koh-in-SYD. 3 syllables. Long /aɪ/ in '-cide'. Final /d/ — voiced, don't drop it"
  },
  {
    id:567, word:"expedite", stress:"EK-spih-dyt",
    pos:["verb"],
    defs:{ verb:"to make a process happen faster; to speed something up" },
    examples:["We can expedite delivery for an additional fee.","Please expedite your approval of this purchase order."],
    phrases:["expedite delivery","expedited shipping","expedite approval","expedite a request"],
    synonyms:["speed up","accelerate","fast-track","hasten"],
    difficulty:"Word stress",
    pronNote:"Stress on 1st syllable: EK-spih-dyt. 3 syllables. /ks/ in 'ex-'. Long /aɪ/ at end. Appears in email TOEIC scenarios"
  },
  {
    id:568, word:"transparent", stress:"trans-PAIR-unt",
    pos:["adjective"],
    defs:{ adjective:"allowing light to pass through; open and honest; without hidden motives" },
    examples:["We believe in being transparent with our stakeholders.","The pricing structure is completely transparent."],
    phrases:["be transparent","transparent pricing","transparent process","transparent communication"],
    synonyms:["open","clear","honest","candid"],
    difficulty:"Word stress",
    pronNote:"Stress on 2nd syllable: trans-PAIR-unt. 3 syllables. /æ/ in 'trans-'. /eə/ in '-par-'"
  },
  {
    id:569, word:"subordinate", stress:"suh-BOR-dih-nit",
    pos:["noun","adjective","verb"],
    defs:{ noun:"a person in a lower-ranking position", adjective:"lower in rank; secondary in importance", verb:"to treat as less important" },
    examples:["She manages a team of six direct subordinates.","Personal interests must be subordinate to team goals."],
    phrases:["direct subordinate","subordinate role","subordinate to","senior and subordinate"],
    synonyms:["junior","lower-ranking","secondary","underling"],
    difficulty:"Word stress",
    pronNote:"Stress on 2nd syllable: suh-BOR-dih-nit. 4 syllables. /r/ in '-bor-'. Noun/adj ends in /nɪt/"
  },
  {
    id:570, word:"accumulate", stress:"uh-KYOOM-yuh-layt",
    pos:["verb"],
    defs:{ verb:"to increase or build up over time" },
    examples:["Unused leave days accumulate and carry over to the next year.","The company has accumulated a strong track record."],
    phrases:["accumulate savings","accumulate experience","accumulate evidence","steadily accumulate"],
    synonyms:["build up","amass","collect","gather"],
    difficulty:"Word stress",
    pronNote:"Stress on 2nd syllable: uh-KYOOM-yuh-layt. 4 syllables. Long /uː/ in '-kyoom-'. /j/ glide before the 'u'"
  },
  {
    id:571, word:"obligation", stress:"ob-lih-GAY-shun",
    pos:["noun"],
    defs:{ noun:"a moral or legal duty to do something" },
    examples:["We have a contractual obligation to deliver by month end.","There is no obligation to commit to anything today."],
    phrases:["moral obligation","no obligation","fulfill an obligation","legal obligation"],
    synonyms:["duty","responsibility","commitment","requirement"],
    difficulty:"Word stress",
    pronNote:"Stress on 3rd syllable: ob-lih-GAY-shun. 4 syllables. '-tion' = /ʃun/. /b/ — not /v/ — at start"
  },
  {
    id:572, word:"reimburse", stress:"ree-im-BURSS",
    pos:["verb"],
    defs:{ verb:"to pay back money spent by someone else on your behalf" },
    examples:["Please submit your expenses to be reimbursed by Friday.","The client will reimburse all documented legal costs."],
    phrases:["reimburse expenses","be reimbursed","expense reimbursement","eligible for reimbursement"],
    synonyms:["repay","refund","compensate","pay back"],
    difficulty:"Word stress",
    pronNote:"Stress on 3rd syllable: ree-im-BURSS. 3 syllables. /ɜr/ like 'her'. 'reimburse' has been in every TOEIC form since 2015"
  },
  {
    id:573, word:"negotiate", stress:"nih-GOH-shee-ayt",
    pos:["verb"],
    defs:{ verb:"to reach an agreement through formal discussion" },
    examples:["We need to negotiate the lease renewal terms.","Both sides negotiated in good faith for three months."],
    phrases:["negotiate a contract","negotiating leverage","reach a negotiated deal","master negotiator"],
    synonyms:["bargain","broker","discuss","arrange"],
    difficulty:"Word stress",
    pronNote:"5 syllables: nih-GOH-shee-ayt. Stress on 2nd. '-tia-' = /ʃ/. Say it slowly, then at speed — every syllable counts"
  },
  {
    id:574, word:"specification", stress:"spes-ih-fih-KAY-shun",
    pos:["noun"],
    defs:{ noun:"a detailed description of requirements, design, or materials" },
    examples:["The product was built to the client's exact specifications.","Job specifications are listed on the application portal."],
    phrases:["technical specification","meet specifications","job specification","product spec"],
    synonyms:["requirement","detail","standard","criterion"],
    difficulty:"Word stress",
    pronNote:"Stress on 4th syllable: spes-ih-fih-KAY-shun. 5 syllables. '-tion' = /ʃun/. Take each syllable clearly"
  },
  {
    id:575, word:"coordinate", stress:"koh-OR-dih-nayt",
    pos:["verb"],
    defs:{ noun:"to arrange different elements to work together efficiently" },
    examples:["She coordinates all global travel for the executive team.","The departments must coordinate more effectively."],
    phrases:["coordinate logistics","coordinate a plan","coordinate with HR","event coordinator"],
    synonyms:["organize","align","manage","synchronize"],
    difficulty:"Word stress",
    pronNote:"Stress on 2nd syllable: koh-OR-dih-nayt. 4 syllables. /r/ in '-or-' is present. '-ate' = /eɪt/"
  },
  {
    id:576, word:"eligible", stress:"EL-ih-jih-bul",
    pos:["adjective"],
    defs:{ adjective:"satisfying conditions required to qualify for something" },
    examples:["Employees who have worked here over two years are eligible.","Check if you are eligible before applying for the grant."],
    phrases:["eligible for a grant","eligible candidate","not eligible","become eligible"],
    synonyms:["qualified","entitled","suitable","permitted"],
    difficulty:"Word stress",
    pronNote:"Stress on 1st syllable: EL-ih-jih-bul. 4 syllables. /dʒ/ in middle. '-ble' = /bəl/"
  },
  {
    id:577, word:"subsidiary", stress:"sub-SID-ee-er-ee",
    pos:["noun","adjective"],
    defs:{ noun:"a company owned or controlled by a parent company", adjective:"secondary in importance" },
    examples:["The Tokyo subsidiary handles all Asia-Pacific operations.","This division operates as a wholly owned subsidiary."],
    phrases:["wholly owned subsidiary","overseas subsidiary","subsidiary company","subsidiary office"],
    synonyms:["affiliate","branch","division","offshoot"],
    difficulty:"Word stress",
    pronNote:"Stress on 2nd syllable: sub-SID-ee-er-ee. 5 syllables. /s/ not /ʃ/ in '-sid-'. Reduce the last two syllables"
  },
  {
    id:578, word:"renovation", stress:"ren-uh-VAY-shun",
    pos:["noun"],
    defs:{ noun:"the process of improving or restoring a building or system" },
    examples:["The hotel is closed for renovation until spring.","The kitchen renovation came in on time and on budget."],
    phrases:["office renovation","under renovation","renovation costs","complete a renovation"],
    synonyms:["refurbishment","restoration","upgrade","remodeling"],
    difficulty:"Word stress",
    pronNote:"Stress on 3rd syllable: ren-uh-VAY-shun. 4 syllables. '-tion' = /ʃun/. /r/ not /l/ at start"
  },
  {
    id:579, word:"procurement", stress:"pruh-KYOOR-munt",
    pos:["noun"],
    defs:{ noun:"the process of obtaining goods or services for an organization" },
    examples:["The procurement department manages all vendor relationships.","Strategic procurement reduced overall costs by 18%."],
    phrases:["procurement process","procurement team","strategic procurement","procurement budget"],
    synonyms:["purchasing","acquisition","sourcing","buying"],
    difficulty:"R-blend",
    pronNote:"'pr' blend: pruh-KYOOR-munt. /pr/ as one unit. Long /uː/ in '-kyoor-'. Stress on 2nd syllable"
  },
  {
    id:580, word:"initiative", stress:"ih-NISH-uh-tiv",
    pos:["noun"],
    defs:{ noun:"a plan or program; the ability to take independent action" },
    examples:["A new cost-cutting initiative was announced today.","Show initiative — don't wait to be told what to do."],
    phrases:["take the initiative","strategic initiative","launch an initiative","show initiative"],
    synonyms:["plan","program","drive","enterprise"],
    difficulty:"Word stress",
    pronNote:"5 syllables, stress on 2nd: ih-NISH-uh-tiv. '-tia-' = /ʃ/. Break it down: ih · NISH · uh · tiv"
  },
  {
    id:581, word:"implement", stress:"IM-plih-munt",
    pos:["verb","noun"],
    defs:{ verb:"to put a plan or decision into action", noun:"a tool or instrument" },
    examples:["The new security protocols will be implemented Monday.","All recommended improvements have been fully implemented."],
    phrases:["implement a policy","implement changes","implement a system","full implementation"],
    synonyms:["execute","apply","carry out","enforce"],
    difficulty:"Word stress",
    pronNote:"Stress on 1st syllable: IM-plih-munt. 3 syllables. /pl/ cluster — no vowel between /p/ and /l/"
  },
  {
    id:582, word:"accommodate", stress:"uh-KOM-uh-dayt",
    pos:["verb"],
    defs:{ verb:"to provide space or adapt to someone's needs" },
    examples:["The new office can accommodate up to 200 employees.","We will do our best to accommodate your preferences."],
    phrases:["accommodate guests","accommodate changes","accommodate a request","fully accommodate"],
    synonyms:["house","adapt","adjust","cater to"],
    difficulty:"Word stress",
    pronNote:"5 syllables: uh-KOM-uh-dayt. Stress on 2nd. Double 'c' and 'm' in spelling. Very common in TOEIC Part 7"
  },
  {
    id:583, word:"obligation", stress:"ob-lih-GAY-shun",
    pos:["noun"],
    defs:{ noun:"a duty or commitment that must be honored" },
    examples:["There is a legal obligation to report workplace accidents.","We fulfilled all our contractual obligations on time."],
    phrases:["legal obligation","no obligation","contractual obligation","without obligation"],
    synonyms:["duty","requirement","commitment","responsibility"],
    difficulty:"Word stress",
    pronNote:"Stress on 3rd syllable: ob-lih-GAY-shun. 4 syllables. '-tion' = /ʃun/. /b/ not /v/ at start"
  },
  {
    id:584, word:"compliance", stress:"kum-PLY-unss",
    pos:["noun"],
    defs:{ noun:"the act of conforming to rules, standards, or requests" },
    examples:["The audit confirmed full compliance with all regulations.","A compliance officer will review the new procedures."],
    phrases:["regulatory compliance","in compliance with","compliance officer","ensure compliance"],
    synonyms:["conformity","adherence","observance","obedience"],
    difficulty:"Word stress",
    pronNote:"Stress on 2nd syllable: kum-PLY-unss. 3 syllables. /aɪ/ diphthong in '-pli-'. '-ance' = /əns/"
  },
  {
    id:585, word:"subsidy", stress:"SUB-sih-dee",
    pos:["noun"],
    defs:{ noun:"money granted by government or an organization to support a business or reduce costs" },
    examples:["The company benefits from a government energy subsidy.","Agricultural subsidies help stabilize food prices."],
    phrases:["government subsidy","housing subsidy","receive a subsidy","subsidy program"],
    synonyms:["grant","funding","support","allowance"],
    difficulty:"Word stress",
    pronNote:"Stress on 1st syllable: SUB-sih-dee. 3 syllables. /ʌ/ in 'sub-' like 'cup'. '-dy' = /diː/"
  },
  {
    id:586, word:"negotiate", stress:"nih-GOH-shee-ayt",
    pos:["verb"],
    defs:{ verb:"to discuss to reach a mutually acceptable agreement" },
    examples:["The teams negotiated for weeks before reaching a settlement.","We need to negotiate the delivery terms with the supplier."],
    phrases:["negotiate a deal","negotiating strategy","successful negotiation","open to negotiation"],
    synonyms:["bargain","broker","discuss","mediate"],
    difficulty:"Word stress",
    pronNote:"5 syllables: nih-GOH-shee-ayt. Stress on 2nd. '-tia-' = /ʃ/. The TOEIC word that never stops appearing"
  },
  {
    id:587, word:"reimburse", stress:"ree-im-BURSS",
    pos:["verb"],
    defs:{ verb:"to pay someone back for money they have spent" },
    examples:["Expense claims over $200 require manager approval before reimbursement.","We reimburse all business-related travel costs."],
    phrases:["be reimbursed","reimbursement claim","full reimbursement","submit for reimbursement"],
    synonyms:["repay","refund","compensate","pay back"],
    difficulty:"Word stress",
    pronNote:"Stress on 3rd syllable: ree-im-BURSS. 3 syllables. /ɜr/ like 'her'. Appears in 90%+ of TOEIC practice exams"
  },
  {
    id:588, word:"coincide", stress:"koh-in-SYD",
    pos:["verb"],
    defs:{ verb:"to occur at the same time; to correspond exactly" },
    examples:["The new product launch coincides with our 25th anniversary.","The two audits coincided unexpectedly."],
    phrases:["happen to coincide","dates coincide","coincide perfectly","schedules coincide"],
    synonyms:["overlap","align","correspond","agree"],
    difficulty:"Word stress",
    pronNote:"Stress on 3rd syllable: koh-in-SYD. 3 syllables. Long /aɪ/ in '-cide'. Final /d/ — voiced, don't drop it"
  },
  {
    id:589, word:"fluctuation", stress:"fluk-choo-AY-shun",
    pos:["noun"],
    defs:{ noun:"irregular variation in level, price, or amount" },
    examples:["Currency fluctuations can significantly affect export profits.","Seasonal fluctuations in demand are expected."],
    phrases:["price fluctuation","currency fluctuation","market fluctuation","seasonal fluctuation"],
    synonyms:["variation","swing","instability","change"],
    difficulty:"Word stress",
    pronNote:"Stress on 3rd syllable: fluk-choo-AY-shun. 4 syllables. '-tua-' = /tʃuː/. '-tion' = /ʃun/"
  },
  {
    id:590, word:"stringent", stress:"STRIN-junt",
    pos:["adjective"],
    defs:{ adjective:"strict, precise, and rigorously enforced" },
    examples:["New stringent data privacy laws take effect next month.","The manufacturing standards are among the most stringent in the industry."],
    phrases:["stringent rules","stringent controls","stringent requirements","stringent standards"],
    synonyms:["strict","rigorous","demanding","exacting"],
    difficulty:"Word stress",
    pronNote:"Stress on 1st syllable: STRIN-junt. 2 syllables. /str/ cluster at start. /dʒ/ in '-gent' like 'judge'"
  },
  {
    id:591, word:"preliminary", stress:"prih-LIM-ih-ner-ee",
    pos:["adjective","noun"],
    defs:{ adjective:"preceding the main event; introductory", noun:"a preparatory action or stage" },
    examples:["Preliminary discussions were held before the main negotiations.","The preliminary report will be finalized next week."],
    phrases:["preliminary stage","preliminary discussion","preliminary agreement","preliminary findings"],
    synonyms:["initial","introductory","preparatory","provisional"],
    difficulty:"R-blend",
    pronNote:"'pr' blend: prih-LIM-ih-ner-ee. /pr/ as one unit. 5 syllables, stress on 2nd. Reduce to 4 in fast speech"
  },
  {
    id:592, word:"expedite", stress:"EK-spih-dyt",
    pos:["verb"],
    defs:{ verb:"to cause something to be done more quickly; to speed up a process" },
    examples:["Can you expedite the customs clearance process?","We will expedite your order at no extra charge."],
    phrases:["expedite processing","expedited delivery","expedite a claim","expedite customs"],
    synonyms:["speed up","accelerate","fast-track","hasten"],
    difficulty:"Word stress",
    pronNote:"Stress on 1st syllable: EK-spih-dyt. 3 syllables. /ks/ in 'ex-'. Long /aɪ/ at end. Common in TOEIC letters and emails"
  },
  {
    id:593, word:"eligible", stress:"EL-ih-jih-bul",
    pos:["adjective"],
    defs:{ adjective:"having the right or qualifications to do or receive something" },
    examples:["Part-time workers are also eligible for the pension plan.","Confirm you are eligible before submitting an application."],
    phrases:["eligible for benefits","eligible to vote","not eligible","become eligible"],
    synonyms:["qualified","entitled","suitable","permitted"],
    difficulty:"Word stress",
    pronNote:"Stress on 1st syllable: EL-ih-jih-bul. 4 syllables. /dʒ/ in '-gi-'. '-ble' = /bəl/"
  },
  {
    id:594, word:"sustainability", stress:"suh-stay-nuh-BIL-ih-tee",
    pos:["noun"],
    defs:{ noun:"the ability to be maintained long-term; avoiding depletion of natural resources" },
    examples:["Sustainability is a core pillar of our corporate strategy.","The company published its first sustainability report."],
    phrases:["environmental sustainability","sustainability report","long-term sustainability","sustainability goals"],
    synonyms:["viability","longevity","eco-friendliness","endurance"],
    difficulty:"Word stress",
    pronNote:"Stress on 4th syllable: suh-stay-nuh-BIL-ih-tee. 7 syllables! Long /eɪ/ in '-stay-'. Take it one chunk at a time"
  },
  {
    id:595, word:"negotiate", stress:"nih-GOH-shee-ayt",
    pos:["verb"],
    defs:{ verb:"to confer to reach a mutually acceptable settlement" },
    examples:["We negotiated a favorable long-term supply contract.","Both parties are willing to negotiate."],
    phrases:["negotiate successfully","negotiation process","enter into negotiations","reach a negotiated agreement"],
    synonyms:["bargain","broker","discuss","mediate"],
    difficulty:"Word stress",
    pronNote:"5 syllables: nih-GOH-shee-ayt. Stress on 2nd. '-tia-' = /ʃ/. This is the word most worth mastering for TOEIC"
  },
  {
    id:596, word:"reimburse", stress:"ree-im-BURSS",
    pos:["verb"],
    defs:{ verb:"to repay expenses incurred on behalf of a company or person" },
    examples:["Employees are reimbursed for all approved business expenses.","Keep your receipts — you will be reimbursed in full."],
    phrases:["reimburse in full","expense reimbursement","eligible for reimbursement","reimbursement process"],
    synonyms:["repay","refund","compensate","pay back"],
    difficulty:"Word stress",
    pronNote:"Stress on 3rd syllable: ree-im-BURSS. 3 syllables. /ɜr/ like 'her'. Still the most common TOEIC reimbursement verb"
  },
  {
    id:597, word:"initiative", stress:"ih-NISH-uh-tiv",
    pos:["noun"],
    defs:{ noun:"a fresh strategic plan; the ability to take action without being told" },
    examples:["The new digital initiative will transform customer service.","Employees who take initiative are recognized and rewarded."],
    phrases:["take the initiative","launch an initiative","show initiative","bold initiative"],
    synonyms:["plan","program","drive","enterprise"],
    difficulty:"Word stress",
    pronNote:"5 syllables, stress on 2nd: ih-NISH-uh-tiv. '-tia-' = /ʃ/. Practice saying it cleanly: ih · NISH · uh · tiv"
  },
  {
    id:598, word:"obligation", stress:"ob-lih-GAY-shun",
    pos:["noun"],
    defs:{ noun:"something one is morally or legally required to do" },
    examples:["The vendor has an obligation to deliver by the agreed date.","There is no purchase obligation during the trial period."],
    phrases:["no obligation","legal obligation","binding obligation","sense of obligation"],
    synonyms:["duty","requirement","commitment","responsibility"],
    difficulty:"Word stress",
    pronNote:"Stress on 3rd syllable: ob-lih-GAY-shun. 4 syllables. '-tion' = /ʃun/. Focus: the stress is NOT on '-ob-'"
  },
  {
    id:599, word:"fluctuation", stress:"fluk-choo-AY-shun",
    pos:["noun"],
    defs:{ noun:"an irregular rise and fall in number, price, or amount" },
    examples:["The CFO explained the revenue fluctuations in detail.","Exchange rate fluctuations are outside our control."],
    phrases:["exchange rate fluctuation","market fluctuation","demand fluctuation","price fluctuation"],
    synonyms:["variation","instability","swing","change"],
    difficulty:"Word stress",
    pronNote:"Stress on 3rd syllable: fluk-choo-AY-shun. 4 syllables. '-tua-' = /tʃuː/. '-tion' = /ʃun/"
  },
  {
    id:600, word:"comprehensive", stress:"kom-prih-HEN-siv",
    pos:["adjective"],
    defs:{ adjective:"including all or nearly all aspects; thorough and complete" },
    examples:["A comprehensive training program covers all job functions.","The audit provided a comprehensive view of internal controls."],
    phrases:["comprehensive plan","comprehensive coverage","comprehensive analysis","comprehensive guide"],
    synonyms:["thorough","complete","extensive","all-inclusive"],
    difficulty:"Word stress",
    pronNote:"Stress on 3rd syllable: kom-prih-HEN-siv. 4 syllables. 'pr' blend inside: /pr/ as one unit. '-sive' = /sɪv/"
  },
```

---

## After adding the data

1. Update the header comment to:
   ```js
   // 600 MOST IMPORTANT TOEIC WORDS  (fastvoca rank-000 to rank-500 order)
   ```

2. **No other changes needed.** The component handles any array length automatically — filters, navigation, progress bar, and jump selector all scale dynamically.

3. Sanity check: `TOEIC_WORDS.length` should equal `600`.

---

## Notes for Cursor

- Append only — do not change any existing entries, JSX, styles, or state logic.
- Schema is identical to all previous batches.
- Some words appear multiple times across batches with unique `id` values — this follows the fastvoca ranking structure and is intentional.
- Do not modify any component logic.
