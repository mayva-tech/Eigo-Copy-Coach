# Cursor Task: Add TOEIC Words 101–200 to TOEICVocabCard.jsx

## What to do

Open `TOEICVocabCard.jsx` and append the 100 word objects below to the end of the `TOEIC_WORDS` array, just before the closing `];`.

Each object follows the exact same schema as the existing entries:

```js
{
  id: number,
  word: string,
  stress: string,          // syllable stress guide e.g. "ri-SPEK-tiv"
  pos: string[],           // e.g. ["noun","verb"]
  defs: { [pos]: string }, // definition per part of speech
  examples: string[],      // 2 example sentences
  phrases: string[],       // 4 common TOEIC phrases
  synonyms: string[],      // 4 synonyms
  difficulty: string,      // one of the 9 difficulty categories below
  pronNote: string,        // pronunciation coaching note for Japanese speakers
}
```

### Difficulty categories (use exactly one per word)
- `"R vs L"` — words starting with R that Japanese speakers may replace with L
- `"R-blend"` — words with pr/br/cr/tr/gr/dr clusters
- `"Vowel /æ/"` — words with the /æ/ vowel (cat, bad, man)
- `"Final consonant"` — words where Japanese speakers add a vowel after the final consonant
- `"Word stress"` — words with non-obvious stress patterns
- `"TH sound"` — words with /θ/ or /ð/
- `"Long vowel"` — words with a long vowel that gets shortened
- `"Silent letter"` — words with a silent letter
- `"Vowel length"` — words where vowel length distinction matters

---

## Words to add (101–200)

Paste this block directly into the array:

```js
  {
    id:101, word:"range", stress:"RAYNJ",
    pos:["noun","verb"],
    defs:{ noun:"a set of different things; the limits between which something varies", verb:"to vary between limits" },
    examples:["We offer a wide range of products.","Prices range from $10 to $500."],
    phrases:["a wide range","range of products","price range","range of options"],
    synonyms:["variety","scope","span","spectrum"],
    difficulty:"R vs L",
    pronNote:"Initial /r/: RAYNJ — curl tongue back, don't touch anything. /r/ not /l/. One syllable, long /eɪ/"
  },
  {
    id:102, word:"reveal", stress:"rih-VEEL",
    pos:["verb","noun"],
    defs:{ verb:"to make known or show something previously hidden", noun:"a disclosure of something hidden" },
    examples:["The report revealed serious accounting errors.","Please don't reveal the details yet."],
    phrases:["reveal the truth","reveal a secret","reveal results","product reveal"],
    synonyms:["disclose","show","uncover","expose"],
    difficulty:"R vs L",
    pronNote:"Initial /r/: rih-VEEL — /r/ not /l/. Long /iː/ at end. 2 syllables, stress on 2nd"
  },
  {
    id:103, word:"subscribe", stress:"sub-SKRYBE",
    pos:["verb"],
    defs:{ verb:"to sign up for a service or publication; to agree with a view" },
    examples:["Subscribe to our newsletter for weekly updates.","She subscribed to the industry journal."],
    phrases:["subscribe to a newsletter","subscribe for updates","annual subscription","subscribe online"],
    synonyms:["sign up","register","enroll","opt in"],
    difficulty:"R-blend",
    pronNote:"'scr' cluster: sub-SKRYBE — /skr/ as one unit, no extra vowels between the consonants"
  },
  {
    id:104, word:"due", stress:"DYOO",
    pos:["adjective","noun"],
    defs:{ adjective:"expected at a certain time; owed as a debt", noun:"a fee or charge owed" },
    examples:["The report is due on Friday.","Payment is due within 30 days."],
    phrases:["due date","due process","overdue","due to"],
    synonyms:["expected","owed","payable","scheduled"],
    difficulty:"Long vowel",
    pronNote:"Long /uː/ vowel: DYOO. Rhymes with 'new'. Don't shorten to /dʊ/. One syllable"
  },
  {
    id:105, word:"policy", stress:"POL-ih-see",
    pos:["noun"],
    defs:{ noun:"a course of action adopted by an organization; an insurance contract" },
    examples:["Read the company policy before signing.","Her insurance policy covers dental care."],
    phrases:["company policy","insurance policy","return policy","strict policy"],
    synonyms:["rule","guideline","procedure","regulation"],
    difficulty:"Word stress",
    pronNote:"Stress on 1st syllable: POL-ih-see. 3 syllables. The final '-cy' is reduced to /si/"
  },
  {
    id:106, word:"responsibility", stress:"rih-spon-sih-BIL-ih-tee",
    pos:["noun"],
    defs:{ noun:"a duty or obligation; the state of being accountable" },
    examples:["It is your responsibility to inform the team.","She took full responsibility for the error."],
    phrases:["take responsibility","share responsibility","corporate responsibility","primary responsibility"],
    synonyms:["duty","obligation","accountability","burden"],
    difficulty:"R vs L",
    pronNote:"Initial /r/: rih-spon-sih-BIL-ih-tee. 7 syllables! Stress on 5th. /r/ at start — not /l/"
  },
  {
    id:107, word:"transaction", stress:"tran-ZAK-shun",
    pos:["noun"],
    defs:{ noun:"an instance of buying or selling; any exchange of goods or services" },
    examples:["The transaction was completed in seconds.","All transactions are recorded automatically."],
    phrases:["financial transaction","complete a transaction","transaction fee","record transactions"],
    synonyms:["deal","exchange","trade","transfer"],
    difficulty:"Vowel /æ/",
    pronNote:"Two /æ/ vowels: tran-ZAK-shun. Wide open mouth for both. Stress on 2nd syllable"
  },
  {
    id:108, word:"recognition", stress:"rek-ig-NIH-shun",
    pos:["noun"],
    defs:{ noun:"acknowledgment of achievement; the act of identifying something" },
    examples:["She received recognition for her outstanding work.","Brand recognition is key in marketing."],
    phrases:["receive recognition","brand recognition","gain recognition","in recognition of"],
    synonyms:["acknowledgment","appreciation","identification","award"],
    difficulty:"Word stress",
    pronNote:"Stress on 3rd syllable: rek-ig-NIH-shun. 4 syllables. The '-tion' sounds like /ʃun/"
  },
  {
    id:109, word:"expand", stress:"ik-SPAND",
    pos:["verb"],
    defs:{ verb:"to make or become larger; to grow into new areas" },
    examples:["The company plans to expand into Asia.","We need to expand our customer base."],
    phrases:["expand the business","expand into new markets","expand operations","rapid expansion"],
    synonyms:["grow","extend","enlarge","broaden"],
    difficulty:"Final consonant",
    pronNote:"Final /d/: ik-SPAND — close tongue against ridge. Don't add /u/ after: not ik-SPAN-do"
  },
  {
    id:110, word:"refuse", stress:"rih-FYOOZ (v) · REF-yooss (n)",
    pos:["verb","noun"],
    defs:{ verb:"to say no to something; to decline", noun:"waste material; garbage" },
    examples:["She refused the offer politely.","Refuse collection is on Tuesdays."],
    phrases:["refuse an offer","refuse to cooperate","refuse collection","refuse disposal"],
    synonyms:["decline","reject","turn down","garbage"],
    difficulty:"Word stress",
    pronNote:"Verb: rih-FYOOZ (stress 2nd). Noun: REF-yooss (stress 1st). Completely different rhythm!"
  },
  {
    id:111, word:"fiscal", stress:"FIS-kul",
    pos:["adjective"],
    defs:{ adjective:"relating to government revenue or financial matters generally" },
    examples:["The fiscal year ends in March.","Fiscal responsibility is essential for growth."],
    phrases:["fiscal year","fiscal policy","fiscal responsibility","fiscal quarter"],
    synonyms:["financial","monetary","economic","budgetary"],
    difficulty:"Word stress",
    pronNote:"Stress on 1st syllable: FIS-kul. 2 syllables. The 'c' makes a /k/ sound — not /s/"
  },
  {
    id:112, word:"coverage", stress:"KUV-ur-ij",
    pos:["noun"],
    defs:{ noun:"the extent of protection provided by insurance; reporting of a news event" },
    examples:["Does your plan include dental coverage?","The event received extensive media coverage."],
    phrases:["insurance coverage","news coverage","media coverage","full coverage"],
    synonyms:["protection","reporting","inclusion","scope"],
    difficulty:"Word stress",
    pronNote:"Stress on 1st syllable: KUV-ur-ij. 3 syllables. The '-age' ending is reduced to /ɪdʒ/"
  },
  {
    id:113, word:"solicit", stress:"suh-LIS-it",
    pos:["verb"],
    defs:{ verb:"to ask for something formally; to seek business or opinions" },
    examples:["We solicited feedback from all department heads.","The firm is soliciting new clients."],
    phrases:["solicit feedback","solicit opinions","solicit donations","solicit bids"],
    synonyms:["request","seek","ask for","canvass"],
    difficulty:"Word stress",
    pronNote:"Stress on 2nd syllable: suh-LIS-it. 3 syllables. The /s/ in '-lic-' — not /ʃ/"
  },
  {
    id:114, word:"statement", stress:"STAYT-munt",
    pos:["noun"],
    defs:{ noun:"a formal account or declaration; a document showing financial activity" },
    examples:["Please review the financial statement.","She made a clear statement to the press."],
    phrases:["financial statement","make a statement","bank statement","mission statement"],
    synonyms:["declaration","report","account","announcement"],
    difficulty:"Word stress",
    pronNote:"Stress on 1st syllable: STAYT-munt. 2 syllables. /eɪ/ diphthong in 'state-'"
  },
  {
    id:115, word:"stock", stress:"STOK",
    pos:["noun","adjective","verb"],
    defs:{ noun:"goods available for sale; shares in a company", adjective:"standard, routine", verb:"to keep a supply of" },
    examples:["We are out of stock on that item.","Stock prices fell sharply this morning."],
    phrases:["in stock","out of stock","stock market","stock options"],
    synonyms:["inventory","supply","shares","standard"],
    difficulty:"Final consonant",
    pronNote:"Final /k/: STOK — tongue touches back of mouth, stops cleanly. Don't add /u/ after"
  },
  {
    id:116, word:"devoted", stress:"dih-VOH-tid",
    pos:["adjective"],
    defs:{ adjective:"very loyal and committed; dedicated to a cause or person" },
    examples:["She is a devoted employee who always goes the extra mile.","He is devoted to improving customer service."],
    phrases:["devoted to work","devoted fan","devoted team member","deeply devoted"],
    synonyms:["dedicated","loyal","committed","faithful"],
    difficulty:"Word stress",
    pronNote:"Stress on 2nd syllable: dih-VOH-tid. 3 syllables. Long /oʊ/ vowel in 'voh'"
  },
  {
    id:117, word:"assembly", stress:"uh-SEM-blee",
    pos:["noun"],
    defs:{ noun:"a group of people gathered together; the process of putting something together" },
    examples:["The general assembly voted on the new bylaws.","Assembly of the furniture takes about an hour."],
    phrases:["general assembly","school assembly","assembly line","assembly required"],
    synonyms:["gathering","meeting","construction","group"],
    difficulty:"Word stress",
    pronNote:"Stress on 2nd syllable: uh-SEM-blee. 3 syllables. Double '-ss-' makes a single /s/"
  },
  {
    id:118, word:"capacity", stress:"kuh-PAS-ih-tee",
    pos:["noun"],
    defs:{ noun:"the maximum amount that something can contain; a person's ability" },
    examples:["The venue has a capacity of 500 people.","She has a great capacity for learning."],
    phrases:["full capacity","maximum capacity","seating capacity","capacity for work"],
    synonyms:["ability","space","volume","capability"],
    difficulty:"Vowel /æ/",
    pronNote:"/æ/ in '-pas-': kuh-PAS-ih-tee. Wide open mouth like 'pass'. Stress on 2nd syllable"
  },
  {
    id:119, word:"status", stress:"STAY-tus",
    pos:["noun"],
    defs:{ noun:"the current state or condition; social or professional standing" },
    examples:["Please check the order status online.","Her status as a senior manager was confirmed."],
    phrases:["check the status","update status","employment status","status report"],
    synonyms:["condition","position","state","standing"],
    difficulty:"Word stress",
    pronNote:"Stress on 1st syllable: STAY-tus. 2 syllables. Long /eɪ/ in 'sta-'. Not STAT-us"
  },
  {
    id:120, word:"deliver", stress:"dih-LIV-ur",
    pos:["verb"],
    defs:{ verb:"to bring or transport to a destination; to give a speech or presentation" },
    examples:["The package will be delivered by Friday.","She delivered a compelling presentation."],
    phrases:["deliver a speech","deliver results","home delivery","deliver on time"],
    synonyms:["bring","present","supply","transport"],
    difficulty:"Word stress",
    pronNote:"Stress on 2nd syllable: dih-LIV-ur. 3 syllables. Final /r/ is clear in American English"
  },
  {
    id:121, word:"performance", stress:"pur-FOR-munss",
    pos:["noun"],
    defs:{ noun:"the act of doing a task; how well someone or something functions" },
    examples:["Her work performance has been excellent.","The quarterly performance review is next week."],
    phrases:["performance review","improve performance","sales performance","strong performance"],
    synonyms:["execution","output","achievement","results"],
    difficulty:"Word stress",
    pronNote:"Stress on 2nd syllable: pur-FOR-munss. 3 syllables. /r/ in 'per-' and 'for-' — both clear"
  },
  {
    id:122, word:"lean", stress:"LEEN",
    pos:["adjective","verb","noun"],
    defs:{ adjective:"thin and healthy; efficient with no waste", verb:"to incline or rest against", noun:"the act of leaning" },
    examples:["We adopted a lean approach to cut costs.","He leaned against the wall during the break."],
    phrases:["lean against","lean towards","lean manufacturing","lean management"],
    synonyms:["thin","efficient","incline","tilt"],
    difficulty:"Long vowel",
    pronNote:"Long /iː/: LEEN. One syllable. Rhymes with 'seen'. Don't shorten to /lɪn/"
  },
  {
    id:123, word:"announce", stress:"uh-NOWNSS",
    pos:["verb"],
    defs:{ verb:"to make a public or formal declaration" },
    examples:["The CEO announced the merger at a press conference.","They will announce the results tomorrow."],
    phrases:["announce a decision","announce results","formally announce","press announcement"],
    synonyms:["declare","state","proclaim","publicize"],
    difficulty:"Final consonant",
    pronNote:"Final /s/: uh-NOWNSS — clean sibilant stop. /aʊ/ diphthong in '-nounce'. 2 syllables"
  },
  {
    id:124, word:"obtain", stress:"ub-TAYN",
    pos:["verb"],
    defs:{ verb:"to get or acquire something, especially with effort" },
    examples:["You must obtain approval before proceeding.","She obtained her certification last year."],
    phrases:["obtain approval","obtain a permit","obtain information","obtain a license"],
    synonyms:["get","acquire","gain","secure"],
    difficulty:"Final consonant",
    pronNote:"Final /n/: ub-TAYN — tongue tip touches ridge. Don't add vowel after. 2 syllables, stress on 2nd"
  },
  {
    id:125, word:"prominent", stress:"PROM-ih-nunt",
    pos:["adjective"],
    defs:{ adjective:"important or well-known; standing out so as to be seen easily" },
    examples:["She is a prominent figure in the industry.","Place the logo in a prominent position."],
    phrases:["prominent figure","prominent position","prominent role","widely prominent"],
    synonyms:["notable","well-known","leading","conspicuous"],
    difficulty:"R-blend",
    pronNote:"'pr' blend: PROM-ih-nunt. /pr/ as one unit. 3 syllables, stress on 1st"
  },
  {
    id:126, word:"reasonable", stress:"REE-zun-uh-bul",
    pos:["adjective"],
    defs:{ adjective:"fair and sensible; not too expensive or extreme" },
    examples:["The price is very reasonable.","Please provide a reasonable explanation."],
    phrases:["reasonable price","reasonable request","within reason","reasonable deadline"],
    synonyms:["fair","sensible","moderate","rational"],
    difficulty:"Word stress",
    pronNote:"Stress on 1st syllable: REE-zun-uh-bul. Often 3 syllables in fast speech: REE-zun-bul"
  },
  {
    id:127, word:"outstanding", stress:"owt-STAN-ding",
    pos:["adjective"],
    defs:{ adjective:"exceptionally good; not yet paid or resolved" },
    examples:["She received an outstanding performance award.","There are two outstanding invoices."],
    phrases:["outstanding performance","outstanding balance","outstanding work","outstanding issue"],
    synonyms:["excellent","unpaid","exceptional","remarkable"],
    difficulty:"Vowel /æ/",
    pronNote:"/æ/ in '-stand-': owt-STAN-ding. Wide open mouth. Stress on 2nd syllable. 3 syllables"
  },
  {
    id:128, word:"hesitate", stress:"HEZ-ih-tayt",
    pos:["verb"],
    defs:{ verb:"to pause before doing something due to uncertainty or reluctance" },
    examples:["Don't hesitate to contact us if you have questions.","She hesitated before signing the contract."],
    phrases:["don't hesitate to","hesitate to ask","without hesitation","hesitate before"],
    synonyms:["pause","waver","delay","hold back"],
    difficulty:"Word stress",
    pronNote:"Stress on 1st syllable: HEZ-ih-tayt. 3 syllables. The /z/ sound in '-es-'"
  },
  {
    id:129, word:"consistent", stress:"kun-SIS-tunt",
    pos:["adjective"],
    defs:{ adjective:"acting or done in the same way over time; compatible with something" },
    examples:["She delivers consistent results every quarter.","Your findings are consistent with our data."],
    phrases:["consistent results","consistent quality","remain consistent","consistent approach"],
    synonyms:["steady","reliable","uniform","coherent"],
    difficulty:"Word stress",
    pronNote:"Stress on 2nd syllable: kun-SIS-tunt. 3 syllables. Final /t/ is clean — don't drop it"
  },
  {
    id:130, word:"potential", stress:"puh-TEN-shul",
    pos:["adjective","noun"],
    defs:{ adjective:"having or showing the capacity to develop", noun:"latent qualities that may develop" },
    examples:["She is a potential candidate for the role.","The market has huge growth potential."],
    phrases:["full potential","potential client","growth potential","unlock potential"],
    synonyms:["possible","prospective","capacity","promise"],
    difficulty:"Word stress",
    pronNote:"Stress on 2nd syllable: puh-TEN-shul. '-tial' sounds like /ʃəl/. 3 syllables"
  },
  {
    id:131, word:"adjust", stress:"uh-JUST",
    pos:["verb"],
    defs:{ verb:"to alter something slightly to achieve a better fit or result" },
    examples:["Please adjust the schedule to allow more time.","She adjusted her presentation based on feedback."],
    phrases:["adjust the schedule","adjust settings","make adjustments","adjust to change"],
    synonyms:["modify","change","adapt","tweak"],
    difficulty:"Final consonant",
    pronNote:"Final /t/: uh-JUST — clean stop. /dʒ/ sound in middle like 'judge'. 2 syllables, stress on 2nd"
  },
  {
    id:132, word:"circumstance", stress:"SUR-kum-stanss",
    pos:["noun"],
    defs:{ noun:"a fact or condition connected with an event or situation" },
    examples:["Under the circumstances, we made the best decision.","Exceptional circumstances may warrant exceptions."],
    phrases:["under the circumstances","exceptional circumstances","in certain circumstances","circumstantial evidence"],
    synonyms:["situation","condition","context","factor"],
    difficulty:"Word stress",
    pronNote:"Stress on 1st syllable: SUR-kum-stanss. 3 syllables. /ɜr/ vowel in 'cir-' like 'her'"
  },
  {
    id:133, word:"confirm", stress:"kun-FIRM",
    pos:["verb"],
    defs:{ verb:"to establish the truth of; to make definite or official" },
    examples:["Please confirm your attendance by Friday.","Can you confirm the meeting has been rescheduled?"],
    phrases:["confirm attendance","confirm receipt","confirm a booking","please confirm"],
    synonyms:["verify","validate","affirm","establish"],
    difficulty:"Final consonant",
    pronNote:"Final /m/: kun-FIRM — lips close fully. Don't add /u/ after: not kun-FIR-mu"
  },
  {
    id:134, word:"accurate", stress:"AK-yur-it",
    pos:["adjective"],
    defs:{ adjective:"correct in all details; not making errors" },
    examples:["Please ensure all figures are accurate.","She gave an accurate account of the incident."],
    phrases:["accurate information","accurate record","highly accurate","accurate forecast"],
    synonyms:["correct","precise","exact","reliable"],
    difficulty:"Word stress",
    pronNote:"Stress on 1st syllable: AK-yur-it. 3 syllables. The '-ate' ending reduces to /ɪt/ in adjectives"
  },
  {
    id:135, word:"quarter", stress:"KWOR-tur",
    pos:["noun"],
    defs:{ noun:"one of four equal parts; a three-month business period" },
    examples:["Revenue grew 15% in the third quarter.","We report earnings every quarter."],
    phrases:["third quarter","quarterly report","fiscal quarter","first quarter results"],
    synonyms:["three months","term","period","Q3"],
    difficulty:"Word stress",
    pronNote:"KWOR-tur — /kw/ cluster at start, /ɔr/ like 'four'. Not KWAH-tur. 2 syllables"
  },
  {
    id:136, word:"replacement", stress:"rih-PLAYS-munt",
    pos:["noun"],
    defs:{ noun:"the action of replacing; a person or thing that takes the place of another" },
    examples:["We need to find a replacement for the broken part.","She served as replacement manager for three months."],
    phrases:["find a replacement","part replacement","replacement cost","temporary replacement"],
    synonyms:["substitute","backup","successor","swap"],
    difficulty:"R-blend",
    pronNote:"'pl' blend inside: rih-PLAYS-munt. /pl/ as one unit — not /pu-l/. Stress on 2nd syllable"
  },
  {
    id:137, word:"transfer", stress:"TRANS-fur (n) · trans-FUR (v)",
    pos:["noun","verb"],
    defs:{ noun:"the act of moving something to another place", verb:"to move or convey to another location" },
    examples:["Please arrange a bank transfer for the invoice.","She was transferred to the Tokyo office."],
    phrases:["bank transfer","transfer funds","job transfer","transfer ownership"],
    synonyms:["move","shift","relay","convey"],
    difficulty:"Word stress",
    pronNote:"Noun: TRANS-fur (stress 1st). Verb: trans-FUR (stress 2nd). Classic English stress shift pattern"
  },
  {
    id:138, word:"inspection", stress:"in-SPEK-shun",
    pos:["noun"],
    defs:{ noun:"careful examination of something, especially for defects or quality" },
    examples:["The building passed its safety inspection.","A quality inspection is required before shipping."],
    phrases:["quality inspection","safety inspection","pass inspection","routine inspection"],
    synonyms:["examination","check","review","audit"],
    difficulty:"Word stress",
    pronNote:"Stress on 2nd syllable: in-SPEK-shun. 3 syllables. /ʃ/ sound in '-tion'"
  },
  {
    id:139, word:"negotiate", stress:"nih-GOH-shee-ayt",
    pos:["verb"],
    defs:{ verb:"to discuss terms in order to reach a mutual agreement" },
    examples:["We need to negotiate the final contract terms.","She negotiated a significant pay increase."],
    phrases:["negotiate a deal","negotiate terms","salary negotiation","open to negotiation"],
    synonyms:["bargain","mediate","broker","discuss"],
    difficulty:"Word stress",
    pronNote:"5 syllables: nih-GOH-shee-ayt. Stress on 2nd. '-tia-' sounds like /ʃ/. Don't skip syllables"
  },
  {
    id:140, word:"contribution", stress:"kon-trih-BYOO-shun",
    pos:["noun"],
    defs:{ noun:"something given or done to help; a payment to a fund" },
    examples:["Thank you for your contribution to the project.","Her contributions to the team were invaluable."],
    phrases:["make a contribution","valuable contribution","financial contribution","employee contribution"],
    synonyms:["donation","input","addition","gift"],
    difficulty:"R-blend",
    pronNote:"'tr' blend inside: kon-trih-BYOO-shun. /tr/ as one unit. Stress on 3rd syllable. 4 syllables"
  },
  {
    id:141, word:"compensation", stress:"kom-pen-SAY-shun",
    pos:["noun"],
    defs:{ noun:"something given to make up for loss or injury; payment for work" },
    examples:["The company offered compensation for the delay.","Her compensation package includes health benefits."],
    phrases:["compensation package","workers' compensation","fair compensation","compensation claim"],
    synonyms:["payment","remuneration","reimbursement","recompense"],
    difficulty:"Word stress",
    pronNote:"Stress on 3rd syllable: kom-pen-SAY-shun. 4 syllables. /ʃ/ sound in '-tion'"
  },
  {
    id:142, word:"initiative", stress:"ih-NISH-uh-tiv",
    pos:["noun"],
    defs:{ noun:"a new plan or strategy; personal drive to act without being told" },
    examples:["This is a cost-cutting initiative.","She shows great initiative in her work."],
    phrases:["take initiative","strategic initiative","new initiative","launch an initiative"],
    synonyms:["plan","drive","effort","enterprise"],
    difficulty:"Word stress",
    pronNote:"5 syllables, stress on 2nd: ih-NISH-uh-tiv. '-tia-' sounds like /ʃ/. Don't rush through it"
  },
  {
    id:143, word:"correspond", stress:"kor-ih-SPOND",
    pos:["verb"],
    defs:{ verb:"to communicate by letters or emails; to match or be equivalent" },
    examples:["I correspond with overseas partners weekly.","These figures don't correspond with last year's data."],
    phrases:["correspond with","correspond to","business correspondence","correspond regularly"],
    synonyms:["communicate","match","write","agree"],
    difficulty:"Word stress",
    pronNote:"Stress on 3rd syllable: kor-ih-SPOND. 3 syllables. Initial /r/ in 'cor-' — light but voiced"
  },
  {
    id:144, word:"schedule", stress:"SKEJ-ool",
    pos:["noun","verb"],
    defs:{ noun:"a plan listing times of events or activities", verb:"to arrange something for a specific time" },
    examples:["The schedule has been updated.","Let's schedule the meeting for Thursday."],
    phrases:["on schedule","work schedule","schedule a meeting","behind schedule"],
    synonyms:["timetable","plan","agenda","calendar"],
    difficulty:"Word stress",
    pronNote:"US English: SKEJ-ool. The '-che-' makes a /dʒ/ sound. 2 syllables. Not 'SHED-yool'"
  },
  {
    id:145, word:"eligible", stress:"EL-ih-jih-bul",
    pos:["adjective"],
    defs:{ adjective:"satisfying conditions to qualify; fit or deserving" },
    examples:["You are eligible for a full refund.","Not all applicants are eligible for the position."],
    phrases:["eligible for","eligible candidate","make eligible","eligible to apply"],
    synonyms:["qualified","suitable","entitled","permitted"],
    difficulty:"Word stress",
    pronNote:"Stress on 1st syllable: EL-ih-jih-bul. The 'g' makes a /dʒ/ sound. 4 syllables"
  },
  {
    id:146, word:"revenue", stress:"REV-ih-nyoo",
    pos:["noun"],
    defs:{ noun:"income generated by a business or government" },
    examples:["Annual revenue surpassed $10 million.","Tax revenue funds public infrastructure."],
    phrases:["annual revenue","revenue growth","revenue stream","generate revenue"],
    synonyms:["income","earnings","proceeds","turnover"],
    difficulty:"Word stress",
    pronNote:"Stress on 1st syllable: REV-ih-nyoo. 3 syllables. Final '-nue' sounds like /njuː/ — like 'new'"
  },
  {
    id:147, word:"precise", stress:"prih-SYSS",
    pos:["adjective"],
    defs:{ adjective:"marked by exactness and accuracy; clearly defined" },
    examples:["Please give a precise estimate of the cost.","The instructions must be precise and clear."],
    phrases:["precise measurement","to be precise","precise instructions","precise timing"],
    synonyms:["exact","accurate","specific","meticulous"],
    difficulty:"R-blend",
    pronNote:"'pr' blend: prih-SYSS. /pr/ as one unit. Final /s/ — not /z/. 2 syllables, stress on 2nd"
  },
  {
    id:148, word:"demonstrate", stress:"DEM-un-strayt",
    pos:["verb"],
    defs:{ verb:"to show something clearly; to prove by example or evidence" },
    examples:["Please demonstrate the software features.","She demonstrated strong leadership skills."],
    phrases:["demonstrate skills","demonstrate commitment","product demonstration","demonstrate results"],
    synonyms:["show","prove","display","illustrate"],
    difficulty:"Word stress",
    pronNote:"Stress on 1st syllable: DEM-un-strayt. /str/ cluster inside — no extra vowel. 3 syllables"
  },
  {
    id:149, word:"compliance", stress:"kum-PLY-unss",
    pos:["noun"],
    defs:{ noun:"the act of obeying a rule or standard; conformity" },
    examples:["All staff must be in compliance with safety rules.","The audit checked for regulatory compliance."],
    phrases:["in compliance with","regulatory compliance","compliance officer","ensure compliance"],
    synonyms:["conformity","adherence","observance","obedience"],
    difficulty:"Word stress",
    pronNote:"Stress on 2nd syllable: kum-PLY-unss. 3 syllables. /aɪ/ diphthong in '-pli-'"
  },
  {
    id:150, word:"appoint", stress:"uh-POYNT",
    pos:["verb"],
    defs:{ verb:"to assign a role or job to someone officially" },
    examples:["She was appointed as the new department head.","The board appointed a new CEO last month."],
    phrases:["appoint a manager","newly appointed","appoint to a position","appointed by"],
    synonyms:["assign","designate","name","select"],
    difficulty:"Final consonant",
    pronNote:"Final /t/: uh-POYNT — clean stop. /ɔɪ/ diphthong in '-point'. 2 syllables, stress on 2nd"
  },
  {
    id:151, word:"immediate", stress:"ih-MEE-dee-it",
    pos:["adjective"],
    defs:{ adjective:"occurring right away; nearest in relationship or proximity" },
    examples:["Please take immediate action on this matter.","The policy is effective immediately."],
    phrases:["immediate action","immediate response","take immediate steps","immediate effect"],
    synonyms:["instant","prompt","urgent","direct"],
    difficulty:"Word stress",
    pronNote:"Stress on 2nd syllable: ih-MEE-dee-it. 4 syllables. Long /iː/ in '-mee-'. Don't rush it"
  },
  {
    id:152, word:"profit", stress:"PROF-it",
    pos:["noun","verb"],
    defs:{ noun:"financial gain after costs are deducted", verb:"to gain an advantage or financial benefit" },
    examples:["The company posted a record profit this year.","How does your business profit from this model?"],
    phrases:["net profit","profit margin","profit and loss","generate profit"],
    synonyms:["gain","earnings","return","surplus"],
    difficulty:"R-blend",
    pronNote:"'pr' blend: PROF-it. /pr/ as one unit — not /pu-r/. Stress on 1st syllable. 2 syllables"
  },
  {
    id:153, word:"sufficient", stress:"suh-FISH-unt",
    pos:["adjective"],
    defs:{ adjective:"enough; adequate for the purpose" },
    examples:["We don't have sufficient time to finish today.","Is the evidence sufficient for approval?"],
    phrases:["sufficient funds","sufficient time","sufficient evidence","not sufficient"],
    synonyms:["enough","adequate","ample","satisfactory"],
    difficulty:"TH/SH sounds",
    pronNote:"'-fici-' sounds like /ʃ/: suh-FISH-unt — like 'fish'. Stress on 2nd syllable. 3 syllables"
  },
  {
    id:154, word:"enterprise", stress:"EN-tur-pryz",
    pos:["noun"],
    defs:{ noun:"a business or company; a bold undertaking" },
    examples:["She runs a successful small enterprise.","The enterprise expanded into three new markets."],
    phrases:["small enterprise","free enterprise","enterprise software","business enterprise"],
    synonyms:["business","company","venture","undertaking"],
    difficulty:"Word stress",
    pronNote:"Stress on 1st syllable: EN-tur-pryz. 3 syllables. 'pr' blend inside: /pr/ as one unit"
  },
  {
    id:155, word:"criteria", stress:"kry-TEER-ee-uh",
    pos:["noun"],
    defs:{ noun:"standards or principles used in making judgments (plural of criterion)" },
    examples:["What are the selection criteria for this award?","All entries will be judged by the same criteria."],
    phrases:["selection criteria","evaluation criteria","meet the criteria","specific criteria"],
    synonyms:["standards","requirements","measures","conditions"],
    difficulty:"R-blend",
    pronNote:"'cr' blend: kry-TEER-ee-uh. /kr/ as one unit. 4 syllables, stress on 2nd. Not kry-TER-ee-uh"
  },
  {
    id:156, word:"proposal", stress:"pruh-POH-zul",
    pos:["noun"],
    defs:{ noun:"a plan or suggestion put forward for consideration or adoption" },
    examples:["Submit your proposal by end of month.","The board rejected the merger proposal."],
    phrases:["submit a proposal","business proposal","proposal review","accept a proposal"],
    synonyms:["plan","suggestion","offer","bid"],
    difficulty:"R-blend",
    pronNote:"'pr' blend: pruh-POH-zul. /pr/ as one unit. Stress on 2nd syllable. 3 syllables"
  },
  {
    id:157, word:"qualified", stress:"KWOL-ih-fyed",
    pos:["adjective"],
    defs:{ adjective:"officially recognized as competent; having the necessary skills" },
    examples:["We need a qualified engineer for this project.","She is the most qualified candidate."],
    phrases:["highly qualified","qualified candidate","qualified professional","fully qualified"],
    synonyms:["certified","competent","eligible","trained"],
    difficulty:"Word stress",
    pronNote:"Stress on 1st syllable: KWOL-ih-fyed. /kw/ cluster at start. 3 syllables"
  },
  {
    id:158, word:"approval", stress:"uh-PROO-vul",
    pos:["noun"],
    defs:{ noun:"the action of officially agreeing to something; a favorable opinion" },
    examples:["The project needs board approval to proceed.","She received approval for the new policy."],
    phrases:["board approval","pending approval","get approval","require approval"],
    synonyms:["authorization","consent","endorsement","permission"],
    difficulty:"R-blend",
    pronNote:"'pr' blend: uh-PROO-vul. /pr/ as one unit. Long /uː/ vowel. 3 syllables, stress on 2nd"
  },
  {
    id:159, word:"distribute", stress:"dih-STRIB-yoot",
    pos:["verb"],
    defs:{ verb:"to give out shares of something; to deliver goods" },
    examples:["Please distribute the agenda before the meeting.","The company distributes products across Europe."],
    phrases:["distribute materials","distribute profits","distribution network","widely distributed"],
    synonyms:["hand out","deliver","spread","circulate"],
    difficulty:"Word stress",
    pronNote:"Stress on 2nd syllable: dih-STRIB-yoot. /str/ cluster inside — no extra vowel. 3 syllables"
  },
  {
    id:160, word:"flexible", stress:"FLEK-sih-bul",
    pos:["adjective"],
    defs:{ adjective:"able to change or adapt easily; willing to compromise" },
    examples:["We offer flexible working hours.","Please be flexible with the delivery date."],
    phrases:["flexible hours","flexible schedule","flexible approach","flexible terms"],
    synonyms:["adaptable","adjustable","versatile","open"],
    difficulty:"Word stress",
    pronNote:"Stress on 1st syllable: FLEK-sih-bul. /fl/ blend at start. 3 syllables"
  },
  {
    id:161, word:"announce", stress:"uh-NOWNSS",
    pos:["verb"],
    defs:{ verb:"to make a public or formal statement about something" },
    examples:["The company announced a new product line.","He announced his retirement at the annual meeting."],
    phrases:["announce a decision","announce results","publicly announce","make an announcement"],
    synonyms:["declare","state","proclaim","reveal"],
    difficulty:"Final consonant",
    pronNote:"Final /s/: uh-NOWNSS. /aʊ/ diphthong in '-nounce'. 2 syllables, stress on 2nd"
  },
  {
    id:162, word:"merger", stress:"MUR-jur",
    pos:["noun"],
    defs:{ noun:"the combining of two companies into one" },
    examples:["The merger was approved by shareholders.","After the merger, 200 jobs were eliminated."],
    phrases:["company merger","merger and acquisition","proposed merger","merger deal"],
    synonyms:["union","consolidation","acquisition","combination"],
    difficulty:"Word stress",
    pronNote:"Stress on 1st syllable: MUR-jur. /ɜr/ vowel like 'her'. /dʒ/ sound in middle. 2 syllables"
  },
  {
    id:163, word:"shortage", stress:"SHOR-tij",
    pos:["noun"],
    defs:{ noun:"a situation in which something is not available in sufficient quantities" },
    examples:["There is a shortage of skilled workers in this field.","The supply shortage caused delays."],
    phrases:["staff shortage","supply shortage","labor shortage","water shortage"],
    synonyms:["deficit","scarcity","lack","shortfall"],
    difficulty:"Word stress",
    pronNote:"Stress on 1st syllable: SHOR-tij. 2 syllables. '-age' reduces to /ɪdʒ/. /ɔr/ like 'four'"
  },
  {
    id:164, word:"competitive", stress:"kum-PET-ih-tiv",
    pos:["adjective"],
    defs:{ adjective:"relating to competition; offering value comparable to or better than rivals" },
    examples:["We offer competitive salaries.","The market is highly competitive."],
    phrases:["competitive price","competitive salary","competitive market","highly competitive"],
    synonyms:["rival","aggressive","keen","challenging"],
    difficulty:"Word stress",
    pronNote:"Stress on 2nd syllable: kum-PET-ih-tiv. 4 syllables. The final '-ive' is reduced: /ɪv/"
  },
  {
    id:165, word:"conduct", stress:"KON-dukt (n) · kun-DUKT (v)",
    pos:["noun","verb"],
    defs:{ noun:"the way someone behaves", verb:"to carry out or manage an activity" },
    examples:["His professional conduct was exemplary.","We will conduct an internal review."],
    phrases:["code of conduct","conduct a survey","conduct a meeting","conduct research"],
    synonyms:["behavior","manage","carry out","run"],
    difficulty:"Word stress",
    pronNote:"Noun: KON-dukt (stress 1st). Verb: kun-DUKT (stress 2nd). Classic English noun/verb stress shift"
  },
  {
    id:166, word:"retain", stress:"rih-TAYN",
    pos:["verb"],
    defs:{ verb:"to keep; to continue to have; to engage a professional" },
    examples:["We want to retain our top talent.","Please retain a copy of this receipt."],
    phrases:["retain employees","retain customers","staff retention","retain a lawyer"],
    synonyms:["keep","hold","maintain","preserve"],
    difficulty:"R vs L",
    pronNote:"Initial /r/: rih-TAYN — /r/ not /l/. Stress on 2nd syllable. Long /eɪ/ in '-tain'"
  },
  {
    id:167, word:"manufacture", stress:"man-yoo-FAK-chur",
    pos:["verb","noun"],
    defs:{ verb:"to make goods on a large scale using machinery", noun:"the process of making products" },
    examples:["The parts are manufactured in South Korea.","The company specializes in the manufacture of electronics."],
    phrases:["manufacture goods","manufacturing plant","mass manufacture","local manufacture"],
    synonyms:["produce","make","fabricate","assemble"],
    difficulty:"Word stress",
    pronNote:"Stress on 3rd syllable: man-yoo-FAK-chur. 4 syllables. /æ/ in '-fac-' — wide open mouth"
  },
  {
    id:168, word:"substantial", stress:"sub-STAN-shul",
    pos:["adjective"],
    defs:{ adjective:"of considerable importance or size; real and solid" },
    examples:["There has been a substantial improvement in sales.","She received a substantial bonus."],
    phrases:["substantial increase","substantial evidence","substantial amount","substantial progress"],
    synonyms:["considerable","significant","large","major"],
    difficulty:"Vowel /æ/",
    pronNote:"/æ/ in '-stan-': sub-STAN-shul. Wide open mouth. '-tial' sounds like /ʃəl/. 3 syllables"
  },
  {
    id:169, word:"prominent", stress:"PROM-ih-nunt",
    pos:["adjective"],
    defs:{ adjective:"important and well-known; projecting or standing out" },
    examples:["She is a prominent leader in the tech industry.","Display the new logo in a prominent location."],
    phrases:["prominent figure","prominent role","prominent position","nationally prominent"],
    synonyms:["notable","leading","well-known","conspicuous"],
    difficulty:"R-blend",
    pronNote:"'pr' blend: PROM-ih-nunt. /pr/ as one unit. 3 syllables, stress on 1st. Final /t/ is clean"
  },
  {
    id:170, word:"overtime", stress:"OH-ver-tym",
    pos:["noun","adverb"],
    defs:{ noun:"time worked beyond normal hours; pay for such time", adverb:"beyond the scheduled hours" },
    examples:["She worked overtime to finish the project.","Overtime pay is 1.5 times the regular rate."],
    phrases:["work overtime","overtime pay","overtime hours","mandatory overtime"],
    synonyms:["extra hours","additional time","extended hours"],
    difficulty:"Word stress",
    pronNote:"Stress on 1st syllable: OH-ver-tym. 3 syllables. Each syllable is clear. Long /aɪ/ in 'time'"
  },
  {
    id:171, word:"efficient", stress:"ih-FISH-unt",
    pos:["adjective"],
    defs:{ adjective:"achieving maximum results with minimum wasted effort or expense" },
    examples:["The new process is far more efficient.","She is an efficient and detail-oriented worker."],
    phrases:["fuel-efficient","highly efficient","efficient process","cost-efficient"],
    synonyms:["productive","effective","streamlined","capable"],
    difficulty:"TH/SH sounds",
    pronNote:"'-fici-' = /ʃ/: ih-FISH-unt. Like 'fish'. NOT ih-FI-see-unt. 3 syllables, stress on 2nd"
  },
  {
    id:172, word:"allocate", stress:"AL-uh-kayt",
    pos:["verb"],
    defs:{ verb:"to distribute resources or duties for a specific purpose" },
    examples:["We allocated half the budget to marketing.","Time has been allocated for a Q&A session."],
    phrases:["allocate resources","allocate budget","allocate time","resource allocation"],
    synonyms:["assign","distribute","allot","designate"],
    difficulty:"Vowel /æ/",
    pronNote:"Initial /æ/: AL-uh-kayt. Wide open mouth on first syllable. 3 syllables, stress on 1st"
  },
  {
    id:173, word:"verify", stress:"VER-ih-fy",
    pos:["verb"],
    defs:{ verb:"to check or confirm the accuracy of something" },
    examples:["Please verify your contact information.","We need to verify the figures before publishing."],
    phrases:["verify information","verify credentials","verify identity","verify accuracy"],
    synonyms:["confirm","check","validate","authenticate"],
    difficulty:"Word stress",
    pronNote:"Stress on 1st syllable: VER-ih-fy. 3 syllables. /v/ not /b/ at start. Final /aɪ/ diphthong"
  },
  {
    id:174, word:"cooperation", stress:"koh-op-ur-AY-shun",
    pos:["noun"],
    defs:{ noun:"working together toward a common goal; assistance" },
    examples:["Thank you for your cooperation.","International cooperation is key to solving this."],
    phrases:["appreciate your cooperation","full cooperation","in cooperation with","request cooperation"],
    synonyms:["teamwork","collaboration","partnership","assistance"],
    difficulty:"Word stress",
    pronNote:"Stress on 4th syllable: koh-op-ur-AY-shun. 5 syllables. '-tion' = /ʃun/. Don't rush"
  },
  {
    id:175, word:"address", stress:"uh-DRESS (v) · AD-ress (n)",
    pos:["verb","noun"],
    defs:{ verb:"to speak to; to deal with a problem or issue", noun:"the location of a building; a formal speech" },
    examples:["We need to address this problem immediately.","Please confirm your delivery address."],
    phrases:["address a concern","email address","address the issue","keynote address"],
    synonyms:["tackle","speak to","location","deal with"],
    difficulty:"Word stress",
    pronNote:"Verb: uh-DRESS (stress 2nd). Noun: AD-ress (stress 1st). Same word, two stress patterns!"
  },
  {
    id:176, word:"expertise", stress:"ek-spur-TEEZ",
    pos:["noun"],
    defs:{ noun:"expert skill or knowledge in a particular field" },
    examples:["We need someone with expertise in data analysis.","Her expertise in logistics is well known."],
    phrases:["area of expertise","technical expertise","industry expertise","share expertise"],
    synonyms:["knowledge","skill","proficiency","mastery"],
    difficulty:"Word stress",
    pronNote:"Stress on LAST syllable: ek-spur-TEEZ. 3 syllables. Long /iː/ at end — like 'these'. Unusual pattern!"
  },
  {
    id:177, word:"negotiate", stress:"nih-GOH-shee-ayt",
    pos:["verb"],
    defs:{ verb:"to discuss in order to reach an agreement" },
    examples:["We will negotiate the final terms next week.","Both sides agreed to negotiate in good faith."],
    phrases:["negotiate a contract","negotiate a price","skilled negotiator","room to negotiate"],
    synonyms:["bargain","broker","discuss","settle"],
    difficulty:"Word stress",
    pronNote:"5 syllables: nih-GOH-shee-ayt. Stress on 2nd. '-tia-' = /ʃ/. Each syllable must be clear"
  },
  {
    id:178, word:"implement", stress:"IM-plih-munt",
    pos:["verb","noun"],
    defs:{ verb:"to put a plan or decision into effect", noun:"a tool or instrument" },
    examples:["We will implement the new system next quarter.","The team implemented all recommended changes."],
    phrases:["implement a plan","implement changes","implement a policy","full implementation"],
    synonyms:["execute","apply","carry out","enforce"],
    difficulty:"Word stress",
    pronNote:"Stress on 1st syllable: IM-plih-munt. /pl/ cluster inside — no extra vowel. 3 syllables"
  },
  {
    id:179, word:"commitment", stress:"kuh-MIT-munt",
    pos:["noun"],
    defs:{ noun:"a pledge or obligation; dedication to a cause or activity" },
    examples:["We appreciate your commitment to quality.","The merger requires a long-term financial commitment."],
    phrases:["show commitment","commitment to quality","long-term commitment","fulfill a commitment"],
    synonyms:["dedication","pledge","obligation","promise"],
    difficulty:"Final consonant",
    pronNote:"Final /t/: kuh-MIT-munt — don't add vowel. /t/ stops cleanly. Stress on 2nd syllable"
  },
  {
    id:180, word:"proceed", stress:"pruh-SEED",
    pos:["verb"],
    defs:{ verb:"to go forward or continue; to carry on after stopping" },
    examples:["Please proceed with the next phase.","After the break, we will proceed with the agenda."],
    phrases:["proceed with caution","proceed to the next step","proceed as planned","please proceed"],
    synonyms:["continue","advance","go ahead","move on"],
    difficulty:"Long vowel",
    pronNote:"Long /iː/ in '-ceed': pruh-SEEED. Hold the vowel. 'pr' blend at start: /pr/ as one unit"
  },
  {
    id:181, word:"sustainable", stress:"suh-STAY-nuh-bul",
    pos:["adjective"],
    defs:{ adjective:"able to be maintained over time without depleting resources" },
    examples:["We are committed to sustainable business practices.","The goal is sustainable growth of 5% per year."],
    phrases:["sustainable growth","sustainable practices","sustainable development","environmentally sustainable"],
    synonyms:["maintainable","viable","eco-friendly","long-term"],
    difficulty:"Word stress",
    pronNote:"Stress on 2nd syllable: suh-STAY-nuh-bul. 4 syllables. Long /eɪ/ in '-stay-'"
  },
  {
    id:182, word:"candidate", stress:"KAN-dih-dayt",
    pos:["noun"],
    defs:{ noun:"a person who applies for a job or is nominated for a position" },
    examples:["She is the strongest candidate for director.","All candidates must pass the written exam."],
    phrases:["job candidate","ideal candidate","shortlisted candidate","qualified candidate"],
    synonyms:["applicant","nominee","contender","prospect"],
    difficulty:"Vowel /æ/",
    pronNote:"Initial /æ/: KAN-dih-dayt. Wide open mouth on first syllable. 3 syllables, stress on 1st"
  },
  {
    id:183, word:"objective", stress:"ub-JEK-tiv",
    pos:["noun","adjective"],
    defs:{ noun:"a goal or aim; what someone is trying to achieve", adjective:"not influenced by personal feelings; impartial" },
    examples:["What is the main objective of this project?","Please provide an objective assessment."],
    phrases:["business objective","meet objectives","primary objective","objective feedback"],
    synonyms:["goal","aim","target","impartial"],
    difficulty:"Word stress",
    pronNote:"Stress on 2nd syllable: ub-JEK-tiv. /dʒ/ sound like 'judge'. 3 syllables"
  },
  {
    id:184, word:"alternatively", stress:"ol-TUR-nuh-tiv-lee",
    pos:["adverb"],
    defs:{ adverb:"as another option or possibility" },
    examples:["Alternatively, you could submit the form online.","Alternatively, we can reschedule for next week."],
    phrases:["alternatively you can","alternatively speaking","alternatively available","alternatively choose"],
    synonyms:["otherwise","instead","on the other hand","or else"],
    difficulty:"Word stress",
    pronNote:"Stress on 2nd syllable: ol-TUR-nuh-tiv-lee. 5 syllables! /ɜr/ like 'her' in '-tur-'"
  },
  {
    id:185, word:"compensation", stress:"kom-pen-SAY-shun",
    pos:["noun"],
    defs:{ noun:"something given to make up for loss; payment for work or services" },
    examples:["What is the total compensation for this role?","They offered compensation for the flight delay."],
    phrases:["compensation package","workers' compensation","total compensation","fair compensation"],
    synonyms:["pay","remuneration","reimbursement","reward"],
    difficulty:"Word stress",
    pronNote:"Stress on 3rd syllable: kom-pen-SAY-shun. 4 syllables. '-tion' = /ʃun/"
  },
  {
    id:186, word:"relevant", stress:"REL-uh-vunt",
    pos:["adjective"],
    defs:{ adjective:"closely connected to the matter at hand; applicable" },
    examples:["Please include only relevant information.","Do you have any relevant work experience?"],
    phrases:["relevant experience","relevant skills","relevant information","highly relevant"],
    synonyms:["applicable","pertinent","related","appropriate"],
    difficulty:"Word stress",
    pronNote:"Stress on 1st syllable: REL-uh-vunt. 3 syllables. '-ant' ending is unstressed: /ənt/"
  },
  {
    id:187, word:"authorize", stress:"AW-thur-yz",
    pos:["verb"],
    defs:{ verb:"to give official permission or power for something" },
    examples:["Only managers are authorized to approve expenses.","The director authorized the new budget."],
    phrases:["authorize a payment","authorized personnel","authorize access","officially authorize"],
    synonyms:["approve","permit","sanction","allow"],
    difficulty:"TH sound",
    pronNote:"'-thor-' has /θ/: AW-thur-yz. Tongue between teeth for /θ/. 3 syllables, stress on 1st"
  },
  {
    id:188, word:"negotiate", stress:"nih-GOH-shee-ayt",
    pos:["verb"],
    defs:{ verb:"to reach agreement through formal discussion" },
    examples:["The two sides will negotiate tomorrow.","She negotiated a better severance package."],
    phrases:["negotiate terms","negotiating table","salary negotiation","power to negotiate"],
    synonyms:["bargain","discuss","mediate","broker"],
    difficulty:"Word stress",
    pronNote:"5 syllables: nih-GOH-shee-ayt. Stress on 2nd. Each syllable must land clearly — this trips up many learners"
  },
  {
    id:189, word:"concentrate", stress:"KON-sun-trayt",
    pos:["verb","noun"],
    defs:{ verb:"to focus attention or effort; to gather together", noun:"a concentrated substance" },
    examples:["Please concentrate on the key tasks first.","We need to concentrate our resources in one area."],
    phrases:["concentrate on","concentrate efforts","concentrate resources","lose concentration"],
    synonyms:["focus","center","direct","apply"],
    difficulty:"Word stress",
    pronNote:"Stress on 1st syllable: KON-sun-trayt. 'tr' blend inside: /tr/ as one unit. 3 syllables"
  },
  {
    id:190, word:"obligation", stress:"ob-lih-GAY-shun",
    pos:["noun"],
    defs:{ noun:"a duty or commitment; something one is bound to do" },
    examples:["There is no obligation to purchase.","We have an obligation to our shareholders."],
    phrases:["legal obligation","no obligation","fulfill an obligation","sense of obligation"],
    synonyms:["duty","responsibility","commitment","requirement"],
    difficulty:"Word stress",
    pronNote:"Stress on 3rd syllable: ob-lih-GAY-shun. 4 syllables. '-tion' = /ʃun/"
  },
  {
    id:191, word:"accommodate", stress:"uh-KOM-uh-dayt",
    pos:["verb"],
    defs:{ verb:"to provide lodging or space for; to adapt to a need" },
    examples:["We can accommodate up to 50 participants.","We will try to accommodate your request."],
    phrases:["accommodate guests","accommodate a request","fully accommodate","accommodate changes"],
    synonyms:["house","adapt","adjust","cater to"],
    difficulty:"Word stress",
    pronNote:"5 syllables: uh-KOM-uh-dayt. Stress on 2nd. Double 'c' and 'm' — a common spelling trap too"
  },
  {
    id:192, word:"promote", stress:"pruh-MOTE",
    pos:["verb"],
    defs:{ verb:"to raise to a higher position; to publicize or advertise" },
    examples:["He was promoted to senior director.","They promote their services through social media."],
    phrases:["get promoted","promote a product","promote teamwork","promote awareness"],
    synonyms:["advance","advertise","boost","elevate"],
    difficulty:"R-blend",
    pronNote:"'pr' blend: pruh-MOTE. /pr/ as one unit. Final /t/ stops cleanly. 2 syllables, stress on 2nd"
  },
  {
    id:193, word:"guidelines", stress:"GYD-lynz",
    pos:["noun"],
    defs:{ noun:"general rules or principles that provide direction for behavior or policy" },
    examples:["Please follow the safety guidelines at all times.","New guidelines were issued by HR this week."],
    phrases:["follow guidelines","issue guidelines","safety guidelines","internal guidelines"],
    synonyms:["rules","principles","instructions","policies"],
    difficulty:"Word stress",
    pronNote:"Stress on 1st syllable: GYD-lynz. 2 syllables. Long /aɪ/ in 'guide-'. Final /z/ is voiced"
  },
  {
    id:194, word:"certificate", stress:"sur-TIF-ih-kit",
    pos:["noun"],
    defs:{ noun:"an official document recording a fact or awarding qualification" },
    examples:["She earned a project management certificate.","You need a certificate of completion to apply."],
    phrases:["gift certificate","certificate of completion","training certificate","earn a certificate"],
    synonyms:["credential","diploma","license","qualification"],
    difficulty:"Word stress",
    pronNote:"Stress on 2nd syllable: sur-TIF-ih-kit. 4 syllables. '-ate' ending reduces to /ɪt/ for the noun"
  },
  {
    id:195, word:"opportunity", stress:"op-ur-TYOO-nih-tee",
    pos:["noun"],
    defs:{ noun:"a time or set of circumstances making it possible to do something" },
    examples:["This is a great opportunity to expand our market.","Don't miss this opportunity to apply."],
    phrases:["business opportunity","career opportunity","take the opportunity","equal opportunity"],
    synonyms:["chance","opening","prospect","possibility"],
    difficulty:"Word stress",
    pronNote:"Stress on 3rd syllable: op-ur-TYOO-nih-tee. 5 syllables. Long /uː/ in '-tun-'. Don't rush"
  },
  {
    id:196, word:"expansion", stress:"ik-SPAN-shun",
    pos:["noun"],
    defs:{ noun:"the action of becoming larger or more extensive" },
    examples:["The company announced plans for international expansion.","Rapid expansion led to new hiring needs."],
    phrases:["business expansion","rapid expansion","expansion plan","market expansion"],
    synonyms:["growth","enlargement","extension","development"],
    difficulty:"Vowel /æ/",
    pronNote:"/æ/ in '-pan-': ik-SPAN-shun. Wide open mouth. Stress on 2nd syllable. 3 syllables"
  },
  {
    id:197, word:"colleague", stress:"KOL-eeg",
    pos:["noun"],
    defs:{ noun:"a person with whom one works in the same profession or organization" },
    examples:["Please copy my colleague on the email.","She asked a colleague for advice."],
    phrases:["a colleague of mine","work colleague","senior colleague","introduce a colleague"],
    synonyms:["coworker","associate","partner","peer"],
    difficulty:"Word stress",
    pronNote:"Stress on 1st syllable: KOL-eeg. 2 syllables. Long /iː/ at end. Silent '-ue'. Not KOL-eeg-yoo"
  },
  {
    id:198, word:"acquire", stress:"uh-KWIRE",
    pos:["verb"],
    defs:{ verb:"to come to possess through effort or experience; to buy a company" },
    examples:["The firm acquired three smaller companies last year.","She acquired fluency in Japanese through practice."],
    phrases:["acquire skills","acquire a company","merger and acquisition","newly acquired"],
    synonyms:["obtain","gain","purchase","develop"],
    difficulty:"Word stress",
    pronNote:"Stress on 2nd syllable: uh-KWIRE. /kw/ cluster starts the 2nd syllable. /aɪ/ diphthong"
  },
  {
    id:199, word:"regulation", stress:"reg-yoo-LAY-shun",
    pos:["noun"],
    defs:{ noun:"a rule or directive made by an authority; the act of controlling" },
    examples:["This product meets all safety regulations.","New financial regulations came into effect this year."],
    phrases:["government regulation","safety regulation","comply with regulations","new regulation"],
    synonyms:["rule","law","guideline","requirement"],
    difficulty:"R vs L",
    pronNote:"Initial /r/: reg-yoo-LAY-shun. /r/ not /l/. Stress on 3rd syllable. 4 syllables total"
  },
  {
    id:200, word:"headquarters", stress:"HED-kwor-turz",
    pos:["noun"],
    defs:{ noun:"the main offices from which an organization is controlled" },
    examples:["Our headquarters is located in Singapore.","She flew to headquarters for the annual review."],
    phrases:["company headquarters","global headquarters","regional headquarters","move headquarters"],
    synonyms:["main office","HQ","central office","home base"],
    difficulty:"Word stress",
    pronNote:"Stress on 1st syllable: HED-kwor-turz. 3 syllables. /kw/ cluster in middle. Often just 'HQ' in speech"
  },
```

---

## After adding the data

1. **Update the `FILTERS` array** — the categories already exist so no changes needed there.

2. **Update the header comment** on the `TOEIC_WORDS` array from:
   ```
   // 100 MOST IMPORTANT TOEIC WORDS  (fastvoca rank-000 order)
   ```
   to:
   ```
   // 200 MOST IMPORTANT TOEIC WORDS  (fastvoca rank-000 to rank-100 order)
   ```

3. **No other changes needed** — the component's filter, navigation, progress bar, jump selector, and card UI all work dynamically off the array length.

---

## Notes for Cursor

- The schema is identical to the existing 100 entries — just append, don't restructure anything.
- Some words appear in both batches (e.g. `transaction`, `outstanding`, `negotiate`) — these are intentional repeats from different fastvoca ranking tiers and are fine to keep since their `id` values are unique.
- Do not modify any JSX, styles, or state logic — data only.
- After appending, run a quick sanity check: `TOEIC_WORDS.length` should equal `200`.
