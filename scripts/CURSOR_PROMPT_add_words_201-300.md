# Cursor Task: Add TOEIC Words 201–300 to TOEICVocabCard.jsx

## What to do

Open `TOEICVocabCard.jsx` and append the 100 word objects below to the end of the `TOEIC_WORDS` array, just before the closing `];`.

The schema is identical to existing entries — do not change it:

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
`"R vs L"` · `"R-blend"` · `"Vowel /æ/"` · `"Final consonant"` · `"Word stress"` · `"TH sound"` · `"Long vowel"` · `"Silent letter"` · `"Vowel length"`

---

## Words to append (201–300)

```js
  {
    id:201, word:"bounce", stress:"BOWNSS",
    pos:["noun","verb"],
    defs:{ noun:"a rebound or spring back", verb:"to spring back after hitting a surface; to recover" },
    examples:["Sales bounced back strongly in Q4.","The ball bounced off the wall."],
    phrases:["bounce back","bounce a ball","bounce an idea","bounce rate"],
    synonyms:["rebound","recover","spring","jump"],
    difficulty:"Final consonant",
    pronNote:"Final /s/: BOWNSS — clean sibilant. /aʊ/ diphthong in 'boun-'. Don't add a vowel after the /s/"
  },
  {
    id:202, word:"escort", stress:"ES-kort (n) · ih-SKORT (v)",
    pos:["noun","verb"],
    defs:{ noun:"a person or group accompanying another for protection or courtesy", verb:"to accompany someone officially" },
    examples:["A security escort accompanied the CEO.","She was escorted to the conference room."],
    phrases:["provide an escort","security escort","escort to","under escort"],
    synonyms:["companion","guide","accompany","chaperone"],
    difficulty:"Word stress",
    pronNote:"Noun: ES-kort (stress 1st). Verb: ih-SKORT (stress 2nd). Classic English noun/verb stress shift"
  },
  {
    id:203, word:"scrutinize", stress:"SKROO-tih-nyz",
    pos:["verb"],
    defs:{ verb:"to examine or inspect closely and thoroughly" },
    examples:["Auditors scrutinized every financial record.","The contract was scrutinized before signing."],
    phrases:["scrutinize the data","scrutinize a contract","closely scrutinize","carefully scrutinize"],
    synonyms:["examine","inspect","analyze","study"],
    difficulty:"R-blend",
    pronNote:"'scr' cluster: SKROO-tih-nyz — /skr/ as one unit. Long /uː/ in 'scroo'. 3 syllables, stress on 1st"
  },
  {
    id:204, word:"attentive", stress:"uh-TEN-tiv",
    pos:["adjective"],
    defs:{ adjective:"paying close attention; considerate of others' needs" },
    examples:["The staff were attentive and professional.","Be attentive to customer feedback."],
    phrases:["be attentive to","attentive service","attentive listener","highly attentive"],
    synonyms:["alert","watchful","observant","considerate"],
    difficulty:"Word stress",
    pronNote:"Stress on 2nd syllable: uh-TEN-tiv. 3 syllables. Final /v/ — voiced, don't drop it"
  },
  {
    id:205, word:"pension", stress:"PEN-shun",
    pos:["noun","verb"],
    defs:{ noun:"a regular payment made to a retired person", verb:"to pension off: to retire someone with a pension" },
    examples:["She receives a generous pension after 30 years.","The pension plan was updated this year."],
    phrases:["pension plan","receive a pension","pension fund","pension scheme"],
    synonyms:["retirement pay","annuity","allowance","benefit"],
    difficulty:"Word stress",
    pronNote:"Stress on 1st syllable: PEN-shun. 2 syllables. '-sion' sounds like /ʃun/ — like 'shun'"
  },
  {
    id:206, word:"rebate", stress:"REE-bayt",
    pos:["noun","verb"],
    defs:{ noun:"a partial refund to someone who has paid too much; a discount", verb:"to give a rebate" },
    examples:["Customers are eligible for a $50 rebate.","Apply for your tax rebate before the deadline."],
    phrases:["offer a rebate","apply for a rebate","cash rebate","tax rebate"],
    synonyms:["refund","discount","deduction","kickback"],
    difficulty:"Word stress",
    pronNote:"Stress on 1st syllable: REE-bayt. 2 syllables. Long /iː/ in 'ree-'. /eɪ/ diphthong at end"
  },
  {
    id:207, word:"curb", stress:"KURB",
    pos:["noun","verb"],
    defs:{ noun:"a check or restraint on something", verb:"to restrain or keep under control" },
    examples:["We must curb unnecessary spending.","New measures were introduced to curb inflation."],
    phrases:["curb spending","curb inflation","curb enthusiasm","put a curb on"],
    synonyms:["restrict","limit","control","restrain"],
    difficulty:"Final consonant",
    pronNote:"Final /b/: KURB — voiced stop, lips close firmly. /ɜr/ vowel like 'her'. 1 syllable"
  },
  {
    id:208, word:"consistency", stress:"kun-SIS-tun-see",
    pos:["noun"],
    defs:{ noun:"the quality of behaving or performing in a similar way over time" },
    examples:["Consistency is key to building customer trust.","We need to maintain consistency across all branches."],
    phrases:["maintain consistency","ensure consistency","lack of consistency","consistency in quality"],
    synonyms:["uniformity","steadiness","reliability","regularity"],
    difficulty:"Word stress",
    pronNote:"Stress on 2nd syllable: kun-SIS-tun-see. 4 syllables. The /s/ in middle — not /ʃ/"
  },
  {
    id:209, word:"significant", stress:"sig-NIF-ih-kunt",
    pos:["adjective"],
    defs:{ adjective:"important; of large enough size or effect to be noticed" },
    examples:["There was a significant drop in productivity.","She made a significant contribution to the project."],
    phrases:["significant impact","significant amount","significant change","highly significant"],
    synonyms:["important","notable","considerable","meaningful"],
    difficulty:"Word stress",
    pronNote:"Stress on 2nd syllable: sig-NIF-ih-kunt. 4 syllables. The '-ficant' ending is all unstressed"
  },
  {
    id:210, word:"structure", stress:"STRUK-chur",
    pos:["noun","verb"],
    defs:{ noun:"the arrangement of parts; a building or framework", verb:"to arrange or organize in a systematic way" },
    examples:["The organizational structure was redesigned.","Please structure your report clearly."],
    phrases:["organizational structure","corporate structure","fee structure","structure a plan"],
    synonyms:["framework","organization","arrangement","system"],
    difficulty:"R-blend",
    pronNote:"'str' cluster: STRUK-chur — /str/ as one unit, no extra vowels. 2 syllables, stress on 1st"
  },
  {
    id:211, word:"steadily", stress:"STED-ih-lee",
    pos:["adverb"],
    defs:{ adverb:"in a regular, even, and continuous way" },
    examples:["Sales have grown steadily over the past year.","She worked steadily through the afternoon."],
    phrases:["grow steadily","improve steadily","rise steadily","work steadily"],
    synonyms:["gradually","consistently","evenly","regularly"],
    difficulty:"Word stress",
    pronNote:"Stress on 1st syllable: STED-ih-lee. 3 syllables. The /ɛ/ vowel — like 'bed', not 'steed'"
  },
  {
    id:212, word:"stagnant", stress:"STAG-nunt",
    pos:["adjective"],
    defs:{ adjective:"showing no activity, growth, or development; motionless" },
    examples:["The economy has been stagnant for two years.","Stagnant sales prompted a strategic review."],
    phrases:["stagnant economy","stagnant growth","stagnant market","stagnant water"],
    synonyms:["motionless","inactive","flat","sluggish"],
    difficulty:"Final consonant",
    pronNote:"Final /t/: STAG-nunt — clean stop. 2 syllables, stress on 1st. /æ/ vowel in 'stag-'"
  },
  {
    id:213, word:"predecessor", stress:"PRED-ih-ses-ur",
    pos:["noun"],
    defs:{ noun:"a person who held a position before the current holder; a thing replaced by another" },
    examples:["Her predecessor held the role for ten years.","This model is faster than its predecessor."],
    phrases:["predecessor in office","direct predecessor","predecessor company","immediate predecessor"],
    synonyms:["forerunner","former holder","antecedent","precursor"],
    difficulty:"Word stress",
    pronNote:"Stress on 1st syllable: PRED-ih-ses-ur. 4 syllables. The double 's' makes one /s/ sound"
  },
  {
    id:214, word:"deduct", stress:"dih-DUKT",
    pos:["verb"],
    defs:{ verb:"to subtract an amount from a total; to take away" },
    examples:["Tax will be deducted from your salary.","We deducted the discount from the final bill."],
    phrases:["deduct taxes","deduct expenses","tax deduction","deduct from salary"],
    synonyms:["subtract","remove","take off","reduce"],
    difficulty:"Final consonant",
    pronNote:"Final /t/: dih-DUKT — clean stop. Stress on 2nd syllable. 2 syllables"
  },
  {
    id:215, word:"invent", stress:"in-VENT",
    pos:["verb"],
    defs:{ verb:"to create or design something new; to fabricate a story" },
    examples:["She invented a new filing system that saved hours.","The process was invented in the 1990s."],
    phrases:["invent a device","invent a process","newly invented","invent a solution"],
    synonyms:["create","design","devise","originate"],
    difficulty:"Final consonant",
    pronNote:"Final /t/: in-VENT — clean stop. /v/ is voiced — don't confuse with /b/. 2 syllables, stress on 2nd"
  },
  {
    id:216, word:"exquisite", stress:"EK-skwih-zit",
    pos:["adjective"],
    defs:{ adjective:"extremely beautiful and delicate; intensely felt" },
    examples:["The hotel lobby has exquisite decor.","She has exquisite attention to detail."],
    phrases:["exquisite taste","exquisite detail","exquisite design","exquisite craftsmanship"],
    synonyms:["beautiful","refined","elegant","superb"],
    difficulty:"Word stress",
    pronNote:"Stress on 1st syllable: EK-skwih-zit. 3 syllables. /kskw/ cluster — no extra vowels inside"
  },
  {
    id:217, word:"yield", stress:"YEELD",
    pos:["noun","verb"],
    defs:{ noun:"the amount produced; a return on investment", verb:"to produce or provide; to give way" },
    examples:["The investment yielded a 12% return.","This crop yields three harvests per year."],
    phrases:["yield a profit","crop yield","yield results","high yield"],
    synonyms:["produce","return","output","generate"],
    difficulty:"Long vowel",
    pronNote:"Long /iː/: YEELD — rhymes with 'field'. Initial /j/ sound like 'yes'. 1 syllable"
  },
  {
    id:218, word:"inclement", stress:"in-KLEM-unt",
    pos:["adjective"],
    defs:{ adjective:"of weather: unpleasantly cold, wet, or severe" },
    examples:["The event was postponed due to inclement weather.","Staff were advised to work from home during inclement conditions."],
    phrases:["inclement weather","inclement conditions","due to inclement weather","inclement forecast"],
    synonyms:["harsh","severe","stormy","rough"],
    difficulty:"Word stress",
    pronNote:"Stress on 2nd syllable: in-KLEM-unt. 3 syllables. The /kl/ cluster — no extra vowel between them"
  },
  {
    id:219, word:"transportation", stress:"trans-por-TAY-shun",
    pos:["noun"],
    defs:{ noun:"the action of transporting; a system of conveyance" },
    examples:["Public transportation was disrupted by the strike.","We will arrange transportation to the venue."],
    phrases:["public transportation","arrange transportation","transportation costs","transportation network"],
    synonyms:["transit","conveyance","travel","logistics"],
    difficulty:"Word stress",
    pronNote:"Stress on 3rd syllable: trans-por-TAY-shun. 4 syllables. '-tion' = /ʃun/. /æ/ in 'trans-'"
  },
  {
    id:220, word:"endeavor", stress:"in-DEV-ur",
    pos:["noun","verb"],
    defs:{ noun:"an attempt to achieve a goal; a serious effort", verb:"to try hard to do something" },
    examples:["Thank you for your endeavors on this project.","We will endeavor to respond within 24 hours."],
    phrases:["make an endeavor","best endeavors","endeavor to complete","joint endeavor"],
    synonyms:["effort","attempt","try","undertaking"],
    difficulty:"Word stress",
    pronNote:"Stress on 2nd syllable: in-DEV-ur. 3 syllables. /v/ is voiced. '-or' ending = /ur/"
  },
  {
    id:221, word:"precaution", stress:"prih-KAW-shun",
    pos:["noun"],
    defs:{ noun:"a measure taken in advance to prevent harm or deal with risk" },
    examples:["Please take all necessary precautions.","As a precaution, the building was evacuated."],
    phrases:["take a precaution","as a precaution","safety precaution","extra precaution"],
    synonyms:["safeguard","measure","provision","care"],
    difficulty:"R-blend",
    pronNote:"'pr' blend: prih-KAW-shun — /pr/ as one unit. Stress on 2nd syllable. 3 syllables"
  },
  {
    id:222, word:"alternative", stress:"ol-TUR-nuh-tiv",
    pos:["adjective","noun"],
    defs:{ adjective:"available as another possibility", noun:"one of two or more available possibilities" },
    examples:["Is there an alternative route to the office?","We explored several alternatives before deciding."],
    phrases:["alternative option","alternative solution","no alternative","alternative approach"],
    synonyms:["option","choice","substitute","other"],
    difficulty:"Word stress",
    pronNote:"Stress on 2nd syllable: ol-TUR-nuh-tiv. 4 syllables. /ɜr/ like 'her' in '-tur-'"
  },
  {
    id:223, word:"freshness", stress:"FRESH-nuss",
    pos:["noun"],
    defs:{ noun:"the quality of being fresh, new, or invigorating" },
    examples:["The freshness of the ingredients is guaranteed.","Customers appreciate the freshness of our produce."],
    phrases:["maintain freshness","freshness guarantee","product freshness","freshness of ideas"],
    synonyms:["newness","crispness","vitality","novelty"],
    difficulty:"Final consonant",
    pronNote:"Final /s/: FRESH-nuss — two syllables. /ʃ/ in 'fresh-' like 'fish'. Stress on 1st syllable"
  },
  {
    id:224, word:"perishable", stress:"PER-ih-shuh-bul",
    pos:["adjective"],
    defs:{ adjective:"likely to decay or go bad quickly, especially food" },
    examples:["Perishable goods must be refrigerated during transport.","Please handle perishable items with care."],
    phrases:["perishable goods","perishable food","perishable items","non-perishable"],
    synonyms:["biodegradable","short-lived","fragile","decaying"],
    difficulty:"Word stress",
    pronNote:"Stress on 1st syllable: PER-ih-shuh-bul. 4 syllables. /ʃ/ sound in '-sha-'. /r/ in 'per-'"
  },
  {
    id:225, word:"elegant", stress:"EL-ih-gunt",
    pos:["adjective"],
    defs:{ adjective:"pleasingly graceful and stylish; pleasingly ingenious and simple" },
    examples:["The new office has an elegant, minimalist design.","She found an elegant solution to the problem."],
    phrases:["elegant design","elegant solution","elegant style","elegant presentation"],
    synonyms:["graceful","stylish","refined","sophisticated"],
    difficulty:"Word stress",
    pronNote:"Stress on 1st syllable: EL-ih-gunt. 3 syllables. The 'g' makes a hard /g/ sound — not /dʒ/"
  },
  {
    id:226, word:"specify", stress:"SPES-ih-fy",
    pos:["verb"],
    defs:{ verb:"to identify clearly and definitively; to state as a requirement" },
    examples:["Please specify your preferred delivery date.","The contract specifies payment terms."],
    phrases:["specify requirements","as specified","please specify","specify a date"],
    synonyms:["state","detail","define","designate"],
    difficulty:"Word stress",
    pronNote:"Stress on 1st syllable: SPES-ih-fy. 3 syllables. /s/ not /ʃ/ in 'spec-'. Final /aɪ/ diphthong"
  },
  {
    id:227, word:"confidential", stress:"kon-fih-DEN-shul",
    pos:["adjective"],
    defs:{ adjective:"intended to be kept secret; entrusted with secrets" },
    examples:["All personnel records are strictly confidential.","Please treat this information as confidential."],
    phrases:["strictly confidential","confidential information","keep confidential","confidential report"],
    synonyms:["secret","private","classified","sensitive"],
    difficulty:"Word stress",
    pronNote:"Stress on 3rd syllable: kon-fih-DEN-shul. 4 syllables. '-tial' sounds like /ʃul/"
  },
  {
    id:228, word:"reimburse", stress:"ree-im-BURSS",
    pos:["verb"],
    defs:{ verb:"to repay a person for money they have spent" },
    examples:["Submit your receipts and we will reimburse you.","Travel expenses will be reimbursed within 10 days."],
    phrases:["reimburse expenses","reimburse travel costs","fully reimbursed","reimburse employees"],
    synonyms:["repay","refund","compensate","pay back"],
    difficulty:"Word stress",
    pronNote:"Stress on 3rd syllable: ree-im-BURSS. 3 syllables. /ɜr/ like 'her'. Final /s/ is clean"
  },
  {
    id:229, word:"commodity", stress:"kuh-MOD-ih-tee",
    pos:["noun"],
    defs:{ noun:"a raw material or primary agricultural product; something useful or valuable" },
    examples:["Oil is one of the world's most traded commodities.","Time is a precious commodity in business."],
    phrases:["commodity market","commodity price","basic commodity","precious commodity"],
    synonyms:["product","goods","resource","material"],
    difficulty:"Word stress",
    pronNote:"Stress on 2nd syllable: kuh-MOD-ih-tee. 4 syllables. /ɒ/ vowel in 'mod-'"
  },
  {
    id:230, word:"abundant", stress:"uh-BUN-dunt",
    pos:["adjective"],
    defs:{ adjective:"existing or available in large quantities; plentiful" },
    examples:["The region has abundant natural resources.","She showed abundant enthusiasm for the project."],
    phrases:["abundant resources","abundant supply","abundant evidence","in abundant supply"],
    synonyms:["plentiful","ample","rich","generous"],
    difficulty:"Word stress",
    pronNote:"Stress on 2nd syllable: uh-BUN-dunt. 3 syllables. /ʌ/ vowel in 'bun-' like 'sun'"
  },
  {
    id:231, word:"provisional", stress:"pruh-VIH-zhun-ul",
    pos:["adjective"],
    defs:{ adjective:"arranged or existing for the present, possibly to be changed later; temporary" },
    examples:["This is a provisional schedule subject to change.","A provisional agreement was reached last night."],
    phrases:["provisional agreement","provisional schedule","on a provisional basis","provisional approval"],
    synonyms:["temporary","interim","preliminary","tentative"],
    difficulty:"R-blend",
    pronNote:"'pr' blend: pruh-VIH-zhun-ul. /pr/ as one unit. 4 syllables, stress on 2nd. /ʒ/ in '-sion-'"
  },
  {
    id:232, word:"lucrative", stress:"LOO-kruh-tiv",
    pos:["adjective"],
    defs:{ adjective:"producing a great deal of profit; financially rewarding" },
    examples:["She landed a lucrative consulting contract.","The export market proved very lucrative."],
    phrases:["lucrative deal","lucrative market","lucrative contract","highly lucrative"],
    synonyms:["profitable","rewarding","high-paying","productive"],
    difficulty:"Long vowel",
    pronNote:"Long /uː/ in 'loo-': LOO-kruh-tiv. 3 syllables, stress on 1st. /kr/ blend — no extra vowel"
  },
  {
    id:233, word:"reimburse", stress:"ree-im-BURSS",
    pos:["verb"],
    defs:{ verb:"to pay back money to someone who has spent it" },
    examples:["Employees will be reimbursed for all work-related travel.","Please submit a claim to be reimbursed."],
    phrases:["reimburse fully","expense reimbursement","reimburse the cost","reimbursement policy"],
    synonyms:["repay","refund","compensate","make whole"],
    difficulty:"Word stress",
    pronNote:"Stress on 3rd syllable: ree-im-BURSS. /ɜr/ vowel like 'her'. 3 syllables — don't drop the middle one"
  },
  {
    id:234, word:"unanimous", stress:"yoo-NAN-ih-mus",
    pos:["adjective"],
    defs:{ adjective:"fully agreed by all people involved; without opposition" },
    examples:["The board reached a unanimous decision.","The vote was unanimous in favor of the proposal."],
    phrases:["unanimous decision","unanimous vote","unanimous agreement","nearly unanimous"],
    synonyms:["agreed","united","undivided","consistent"],
    difficulty:"Word stress",
    pronNote:"Stress on 2nd syllable: yoo-NAN-ih-mus. 4 syllables. Initial /j/ sound like 'you'"
  },
  {
    id:235, word:"surplus", stress:"SUR-plus",
    pos:["noun","adjective"],
    defs:{ noun:"an amount left over when requirements have been met; excess", adjective:"more than what is needed" },
    examples:["We have a budget surplus of $20,000 this year.","Surplus inventory was moved to the warehouse."],
    phrases:["budget surplus","trade surplus","surplus stock","surplus funds"],
    synonyms:["excess","remainder","overflow","extra"],
    difficulty:"Word stress",
    pronNote:"Stress on 1st syllable: SUR-plus. 2 syllables. /ɜr/ like 'her'. Final /s/ is clean"
  },
  {
    id:236, word:"innovative", stress:"IN-uh-vay-tiv",
    pos:["adjective"],
    defs:{ adjective:"featuring new methods or ideas; original and creative" },
    examples:["The company is known for its innovative products.","We need innovative solutions to remain competitive."],
    phrases:["innovative approach","innovative design","highly innovative","innovative solution"],
    synonyms:["creative","original","inventive","pioneering"],
    difficulty:"Word stress",
    pronNote:"Stress on 1st syllable: IN-uh-vay-tiv. 4 syllables. /v/ not /b/ in '-va-'. Don't stress '-nov-'"
  },
  {
    id:237, word:"adjacent", stress:"uh-JAY-sunt",
    pos:["adjective"],
    defs:{ adjective:"next to or adjoining something else" },
    examples:["The meeting room is adjacent to the main office.","Please park in the adjacent lot."],
    phrases:["adjacent to","adjacent building","adjacent room","adjacent area"],
    synonyms:["next to","neighboring","nearby","adjoining"],
    difficulty:"Word stress",
    pronNote:"Stress on 2nd syllable: uh-JAY-sunt. 3 syllables. /dʒ/ sound in 'ja-' like 'judge'"
  },
  {
    id:238, word:"collaborate", stress:"kuh-LAB-uh-rayt",
    pos:["verb"],
    defs:{ verb:"to work jointly with others toward a common goal" },
    examples:["The two departments collaborated on the new campaign.","We collaborate with international partners regularly."],
    phrases:["collaborate on","collaborate with","close collaboration","collaborate effectively"],
    synonyms:["cooperate","partner","team up","work together"],
    difficulty:"Vowel /æ/",
    pronNote:"/æ/ in '-lab-': kuh-LAB-uh-rayt. Wide open mouth like 'lab'. Stress on 2nd syllable"
  },
  {
    id:239, word:"negotiate", stress:"nih-GOH-shee-ayt",
    pos:["verb"],
    defs:{ verb:"to discuss terms in order to reach a mutual agreement" },
    examples:["Both parties agreed to negotiate in good faith.","She negotiated a favorable settlement."],
    phrases:["negotiate a deal","negotiate terms","open to negotiation","skilled negotiator"],
    synonyms:["bargain","broker","discuss","mediate"],
    difficulty:"Word stress",
    pronNote:"5 syllables: nih-GOH-shee-ayt. Stress on 2nd. '-tia-' = /ʃ/. Each syllable must land clearly"
  },
  {
    id:240, word:"accustomed", stress:"uh-KUS-tumd",
    pos:["adjective"],
    defs:{ adjective:"used to something; familiar with through habit or experience" },
    examples:["She quickly became accustomed to the new software.","He is accustomed to working under pressure."],
    phrases:["accustomed to","become accustomed","get accustomed","well accustomed"],
    synonyms:["used to","familiar with","adapted","comfortable with"],
    difficulty:"Word stress",
    pronNote:"Stress on 2nd syllable: uh-KUS-tumd. 3 syllables. Final /d/ is light — almost silent in fast speech"
  },
  {
    id:241, word:"subsidize", stress:"SUB-sih-dyz",
    pos:["verb"],
    defs:{ verb:"to support financially, typically with public funds" },
    examples:["The government subsidizes public transportation.","Training costs are partially subsidized by the company."],
    phrases:["subsidize costs","government subsidy","subsidize training","partially subsidized"],
    synonyms:["fund","support","finance","underwrite"],
    difficulty:"Word stress",
    pronNote:"Stress on 1st syllable: SUB-sih-dyz. 3 syllables. Final /z/ is voiced. Don't say SUB-sih-dyz-u"
  },
  {
    id:242, word:"incentive", stress:"in-SEN-tiv",
    pos:["noun"],
    defs:{ noun:"a thing that motivates or encourages someone to do something" },
    examples:["The bonus serves as an incentive for high performers.","What incentives does the company offer?"],
    phrases:["financial incentive","provide incentives","incentive program","sales incentive"],
    synonyms:["motivation","reward","inducement","encouragement"],
    difficulty:"Word stress",
    pronNote:"Stress on 2nd syllable: in-SEN-tiv. 3 syllables. /s/ not /ʃ/ in '-cen-'. Final /v/ is voiced"
  },
  {
    id:243, word:"beverage", stress:"BEV-uh-rij",
    pos:["noun"],
    defs:{ noun:"a drink of any type, especially other than water" },
    examples:["Hot beverages are available in the break room.","The reception will include light food and beverages."],
    phrases:["hot beverage","alcoholic beverage","complimentary beverage","beverage service"],
    synonyms:["drink","refreshment","liquid","potion"],
    difficulty:"Word stress",
    pronNote:"3 syllables, stress on 1st: BEV-uh-rij. Don't add a 4th syllable. /dʒ/ at the end like 'fridge'"
  },
  {
    id:244, word:"patron", stress:"PAY-trun",
    pos:["noun"],
    defs:{ noun:"a customer, especially a regular one; a person who gives financial support" },
    examples:["We value every patron of our establishment.","The museum's patrons include several corporations."],
    phrases:["loyal patron","regular patron","patron of the arts","valued patron"],
    synonyms:["customer","client","supporter","sponsor"],
    difficulty:"Word stress",
    pronNote:"Stress on 1st syllable: PAY-trun. 2 syllables. Long /eɪ/ in 'pay-'. Final /n/ — don't drop it"
  },
  {
    id:245, word:"launch", stress:"LAWNCH",
    pos:["noun","verb"],
    defs:{ noun:"the introduction of a new product or venture", verb:"to start or introduce something new" },
    examples:["The product launch exceeded all expectations.","They launched a new customer loyalty program."],
    phrases:["product launch","launch a campaign","launch event","soft launch"],
    synonyms:["introduce","release","unveil","debut"],
    difficulty:"Vowel length",
    pronNote:"Long /ɔː/ vowel: LAWNCH — like 'law'. Don't shorten to /æ/: not LANCH. 1 syllable"
  },
  {
    id:246, word:"premises", stress:"PREM-ih-siz",
    pos:["noun"],
    defs:{ noun:"a building and the land it stands on; the grounds of a business" },
    examples:["Smoking is not permitted on the premises.","All visitors must sign in before entering the premises."],
    phrases:["on the premises","off the premises","business premises","leave the premises"],
    synonyms:["building","property","grounds","facility"],
    difficulty:"Word stress",
    pronNote:"Stress on 1st syllable: PREM-ih-siz. 3 syllables. The final '-ises' = /ɪsɪz/. Not 'PREMises'"
  },
  {
    id:247, word:"negotiate", stress:"nih-GOH-shee-ayt",
    pos:["verb"],
    defs:{ verb:"to confer to reach agreement; to find a way through a difficult situation" },
    examples:["We managed to negotiate a better price.","She negotiated the sharp bend in the road safely."],
    phrases:["negotiate terms","negotiate successfully","in negotiation","negotiate a path"],
    synonyms:["bargain","discuss","navigate","broker"],
    difficulty:"Word stress",
    pronNote:"5 syllables: nih-GOH-shee-ayt. Stress on 2nd. '-tia-' = /ʃ/. This word trips up many learners"
  },
  {
    id:248, word:"itinerary", stress:"eye-TIN-uh-rer-ee",
    pos:["noun"],
    defs:{ noun:"a planned route or journey; a detailed travel plan" },
    examples:["The itinerary for the business trip is attached.","Please review the conference itinerary."],
    phrases:["travel itinerary","conference itinerary","detailed itinerary","finalize the itinerary"],
    synonyms:["schedule","agenda","travel plan","route"],
    difficulty:"Word stress",
    pronNote:"Stress on 2nd syllable: eye-TIN-uh-rer-ee. 5 syllables. Long /aɪ/ at start. Often reduced to 4 syllables"
  },
  {
    id:249, word:"vicinity", stress:"vih-SIN-ih-tee",
    pos:["noun"],
    defs:{ noun:"the area near or surrounding a particular place" },
    examples:["There are several hotels in the vicinity of the venue.","Police searched the vicinity for clues."],
    phrases:["in the vicinity","nearby vicinity","immediate vicinity","in close vicinity"],
    synonyms:["neighborhood","area","surroundings","proximity"],
    difficulty:"Word stress",
    pronNote:"Stress on 2nd syllable: vih-SIN-ih-tee. 4 syllables. /s/ not /ʃ/ in '-cin-'"
  },
  {
    id:250, word:"surplus", stress:"SUR-plus",
    pos:["noun","adjective"],
    defs:{ noun:"an excess amount remaining after requirements are met", adjective:"more than what is needed" },
    examples:["The department ended the year with a budget surplus.","Surplus equipment was donated to local schools."],
    phrases:["budget surplus","trade surplus","surplus inventory","surplus funds"],
    synonyms:["excess","leftover","extra","overflow"],
    difficulty:"Word stress",
    pronNote:"Stress on 1st syllable: SUR-plus. 2 syllables. /ɜr/ like 'her'. Final /s/ is crisp"
  },
  {
    id:251, word:"adequate", stress:"AD-ih-kwit",
    pos:["adjective"],
    defs:{ adjective:"satisfactory or acceptable in quality or quantity" },
    examples:["Is the current staffing level adequate?","Make sure there is adequate lighting in the workspace."],
    phrases:["adequate resources","adequate time","adequate funding","more than adequate"],
    synonyms:["sufficient","enough","acceptable","satisfactory"],
    difficulty:"Word stress",
    pronNote:"Stress on 1st syllable: AD-ih-kwit. 3 syllables. '-ate' ending reduces to /ɪt/ for adjectives"
  },
  {
    id:252, word:"proficient", stress:"pruh-FISH-unt",
    pos:["adjective"],
    defs:{ adjective:"competent or skilled in doing something" },
    examples:["Applicants must be proficient in Microsoft Excel.","She is highly proficient in both languages."],
    phrases:["proficient in English","highly proficient","proficiency test","proficiency level"],
    synonyms:["skilled","competent","expert","capable"],
    difficulty:"R-blend",
    pronNote:"'pr' blend: pruh-FISH-unt. /pr/ as one unit. '-fici-' = /ʃ/ like 'fish'. 3 syllables, stress on 2nd"
  },
  {
    id:253, word:"retention", stress:"rih-TEN-shun",
    pos:["noun"],
    defs:{ noun:"the act of keeping someone or something; the continued possession of something" },
    examples:["Employee retention is a major challenge this year.","Data retention policies must comply with regulations."],
    phrases:["employee retention","staff retention","customer retention","data retention"],
    synonyms:["keeping","maintenance","preservation","holding"],
    difficulty:"Word stress",
    pronNote:"Stress on 2nd syllable: rih-TEN-shun. 3 syllables. '-tion' = /ʃun/. /r/ at start — not /l/"
  },
  {
    id:254, word:"authorize", stress:"AW-thur-yz",
    pos:["verb"],
    defs:{ verb:"to give official permission or approval for something" },
    examples:["Only the CFO can authorize payments over $10,000.","You are not authorized to access this file."],
    phrases:["authorize a payment","authorized personnel","officially authorize","authorize access"],
    synonyms:["approve","permit","sanction","empower"],
    difficulty:"TH sound",
    pronNote:"'-thor-' has /θ/: AW-thur-yz. Tongue between teeth for /θ/. 3 syllables, stress on 1st"
  },
  {
    id:255, word:"commitment", stress:"kuh-MIT-munt",
    pos:["noun"],
    defs:{ noun:"a pledge or undertaking; dedication to a cause or activity" },
    examples:["We appreciate your commitment to the project.","This role requires a long-term financial commitment."],
    phrases:["show commitment","commitment to quality","long-term commitment","honor a commitment"],
    synonyms:["dedication","pledge","promise","obligation"],
    difficulty:"Final consonant",
    pronNote:"Final /t/: kuh-MIT-munt — clean stop. Don't add vowel. Stress on 2nd syllable. 3 syllables"
  },
  {
    id:256, word:"provisional", stress:"pruh-VIH-zhun-ul",
    pos:["adjective"],
    defs:{ adjective:"arranged for the present, possibly to be altered later; temporary" },
    examples:["A provisional timetable has been circulated.","The budget is provisional pending final approval."],
    phrases:["provisional agreement","provisional budget","provisional schedule","provisional offer"],
    synonyms:["temporary","interim","preliminary","conditional"],
    difficulty:"R-blend",
    pronNote:"'pr' blend: pruh-VIH-zhun-ul. /pr/ as one unit. /ʒ/ sound in '-sion-'. 4 syllables"
  },
  {
    id:257, word:"renovation", stress:"ren-uh-VAY-shun",
    pos:["noun"],
    defs:{ noun:"the action of improving or updating a building or system" },
    examples:["The office is closed for renovation until March.","The renovation project came in under budget."],
    phrases:["office renovation","under renovation","renovation project","complete a renovation"],
    synonyms:["refurbishment","restoration","upgrade","remodel"],
    difficulty:"Word stress",
    pronNote:"Stress on 3rd syllable: ren-uh-VAY-shun. 4 syllables. '-tion' = /ʃun/. /r/ at start"
  },
  {
    id:258, word:"implement", stress:"IM-plih-munt",
    pos:["verb","noun"],
    defs:{ verb:"to put a plan into effect", noun:"a tool used for a particular purpose" },
    examples:["We will implement the new policy next month.","The changes were fully implemented by Q2."],
    phrases:["implement a plan","implement changes","implement a system","full implementation"],
    synonyms:["execute","apply","carry out","enforce"],
    difficulty:"Word stress",
    pronNote:"Stress on 1st syllable: IM-plih-munt. /pl/ cluster — no extra vowel between /p/ and /l/. 3 syllables"
  },
  {
    id:259, word:"complimentary", stress:"kom-plih-MEN-tuh-ree",
    pos:["adjective"],
    defs:{ adjective:"given free; expressing a compliment or praise" },
    examples:["Complimentary breakfast is included with your stay.","He gave a complimentary review of her work."],
    phrases:["complimentary breakfast","complimentary ticket","complimentary copy","complimentary service"],
    synonyms:["free","gratis","praising","flattering"],
    difficulty:"Word stress",
    pronNote:"5 syllables, stress on 3rd: kom-plih-MEN-tuh-ree. Don't confuse with 'complementary' (completing)"
  },
  {
    id:260, word:"compile", stress:"kum-PYLE",
    pos:["verb"],
    defs:{ verb:"to collect information and assemble it in a list or report" },
    examples:["Please compile the quarterly sales figures.","She compiled a comprehensive report on market trends."],
    phrases:["compile a report","compile data","compile a list","compile statistics"],
    synonyms:["gather","collect","assemble","put together"],
    difficulty:"Final consonant",
    pronNote:"Final /l/: kum-PYLE — tongue touches ridge. /aɪ/ diphthong in '-pile'. 2 syllables, stress on 2nd"
  },
  {
    id:261, word:"eligible", stress:"EL-ih-jih-bul",
    pos:["adjective"],
    defs:{ adjective:"satisfying the conditions required to qualify; having the right to do something" },
    examples:["You are eligible for a full refund within 30 days.","Not all employees are eligible for overtime pay."],
    phrases:["eligible for","eligible candidate","make eligible","eligible to vote"],
    synonyms:["qualified","entitled","suitable","permitted"],
    difficulty:"Word stress",
    pronNote:"Stress on 1st syllable: EL-ih-jih-bul. 4 syllables. The 'g' makes a /dʒ/ sound like 'judge'"
  },
  {
    id:262, word:"delegate", stress:"DEL-ih-gayt (v) · DEL-ih-git (n)",
    pos:["verb","noun"],
    defs:{ verb:"to assign a task or responsibility to another person", noun:"a person sent to represent others" },
    examples:["A good leader knows when to delegate.","She served as a delegate at the international summit."],
    phrases:["delegate responsibility","delegate authority","conference delegate","delegate tasks"],
    synonyms:["assign","entrust","representative","envoy"],
    difficulty:"Word stress",
    pronNote:"Verb: DEL-ih-GAYT (stress 3rd, long /eɪ/). Noun: DEL-ih-git (stress 1st, reduced ending). Different!"
  },
  {
    id:263, word:"substantial", stress:"sub-STAN-shul",
    pos:["adjective"],
    defs:{ adjective:"of considerable size, value, or importance; solidly built" },
    examples:["The company made a substantial profit last quarter.","There is substantial evidence to support the claim."],
    phrases:["substantial increase","substantial evidence","substantial investment","substantial portion"],
    synonyms:["significant","considerable","large","major"],
    difficulty:"Vowel /æ/",
    pronNote:"/æ/ in '-stan-': sub-STAN-shul. Wide open mouth. '-tial' = /ʃəl/. 3 syllables, stress on 2nd"
  },
  {
    id:264, word:"terminate", stress:"TUR-mih-nayt",
    pos:["verb"],
    defs:{ verb:"to bring something to an end; to dismiss from employment" },
    examples:["The contract will terminate on December 31st.","He was terminated after repeated policy violations."],
    phrases:["terminate a contract","terminate employment","termination notice","contract termination"],
    synonyms:["end","cancel","dismiss","conclude"],
    difficulty:"Word stress",
    pronNote:"Stress on 1st syllable: TUR-mih-nayt. 3 syllables. /ɜr/ like 'her' in 'ter-'"
  },
  {
    id:265, word:"negotiate", stress:"nih-GOH-shee-ayt",
    pos:["verb"],
    defs:{ verb:"to discuss and reach a mutually acceptable agreement" },
    examples:["The union will negotiate new wage terms next week.","We need to negotiate with the supplier on pricing."],
    phrases:["negotiate a price","skilled negotiator","negotiation process","hard to negotiate"],
    synonyms:["bargain","discuss","settle","arrange"],
    difficulty:"Word stress",
    pronNote:"5 syllables: nih-GOH-shee-ayt. Stress on 2nd. '-tia-' = /ʃ/. Practice slowly then speed up"
  },
  {
    id:266, word:"deteriorate", stress:"dih-TEER-ee-uh-rayt",
    pos:["verb"],
    defs:{ verb:"to become progressively worse in quality or condition" },
    examples:["Relations between the two companies deteriorated last year.","Equipment can deteriorate if not maintained."],
    phrases:["deteriorate quickly","conditions deteriorate","deteriorate over time","situation deteriorates"],
    synonyms:["worsen","decline","degrade","erode"],
    difficulty:"Word stress",
    pronNote:"Stress on 2nd syllable: dih-TEER-ee-uh-rayt. 5 syllables. Long /ɪər/ in '-teer-'"
  },
  {
    id:267, word:"fluctuate", stress:"FLUK-choo-ayt",
    pos:["verb"],
    defs:{ verb:"to rise and fall irregularly in number or amount" },
    examples:["Exchange rates fluctuate daily.","Demand tends to fluctuate with the seasons."],
    phrases:["fluctuate widely","prices fluctuate","demand fluctuates","market fluctuation"],
    synonyms:["vary","change","oscillate","swing"],
    difficulty:"Word stress",
    pronNote:"Stress on 1st syllable: FLUK-choo-ayt. 3 syllables. /fl/ blend at start. '-tua-' = /tʃuː/"
  },
  {
    id:268, word:"mandatory", stress:"MAN-duh-tor-ee",
    pos:["adjective"],
    defs:{ adjective:"required by law or authority; not optional" },
    examples:["Safety training is mandatory for all employees.","A valid ID is mandatory for entry."],
    phrases:["mandatory training","mandatory attendance","mandatory requirement","mandatory disclosure"],
    synonyms:["compulsory","required","obligatory","enforced"],
    difficulty:"Vowel /æ/",
    pronNote:"/æ/ in 'man-': MAN-duh-tor-ee. Wide open mouth. 4 syllables, stress on 1st"
  },
  {
    id:269, word:"oversight", stress:"OH-ver-syt",
    pos:["noun"],
    defs:{ noun:"supervision and management of a process; an unintentional failure to notice something" },
    examples:["The project failed due to a lack of oversight.","The error was an oversight on my part."],
    phrases:["regulatory oversight","lack of oversight","oversight committee","due to an oversight"],
    synonyms:["supervision","error","management","omission"],
    difficulty:"Word stress",
    pronNote:"Stress on 1st syllable: OH-ver-syt. 3 syllables. Long /aɪ/ in 'sight'. /v/ not /b/"
  },
  {
    id:270, word:"consecutive", stress:"kun-SEK-yuh-tiv",
    pos:["adjective"],
    defs:{ adjective:"following each other in unbroken order" },
    examples:["The team won five consecutive championships.","Revenue grew for the third consecutive quarter."],
    phrases:["consecutive quarters","consecutive days","three consecutive years","consecutive wins"],
    synonyms:["successive","sequential","continuous","unbroken"],
    difficulty:"Word stress",
    pronNote:"5 syllables, stress on 2nd: kun-SEK-yuh-tiv. '-utu-' sounds like /jʊt/. Don't rush through it"
  },
  {
    id:271, word:"disruption", stress:"dis-RUP-shun",
    pos:["noun"],
    defs:{ noun:"disturbance that interrupts an event, activity, or process" },
    examples:["The strike caused significant disruption to services.","We apologize for any disruption this may cause."],
    phrases:["cause disruption","service disruption","minimal disruption","business disruption"],
    synonyms:["interruption","disturbance","interference","upheaval"],
    difficulty:"Word stress",
    pronNote:"Stress on 2nd syllable: dis-RUP-shun. 3 syllables. /ʌ/ vowel in '-rup-' like 'cup'"
  },
  {
    id:272, word:"prominent", stress:"PROM-ih-nunt",
    pos:["adjective"],
    defs:{ adjective:"important and well-known; projecting or sticking out" },
    examples:["She is a prominent figure in the finance sector.","Put the disclaimer in a prominent position."],
    phrases:["prominent figure","prominent role","prominent position","nationally prominent"],
    synonyms:["notable","leading","conspicuous","well-known"],
    difficulty:"R-blend",
    pronNote:"'pr' blend: PROM-ih-nunt. /pr/ as one unit — not /pu-r/. 3 syllables, stress on 1st"
  },
  {
    id:273, word:"reconcile", stress:"REK-un-syl",
    pos:["verb"],
    defs:{ verb:"to restore friendly relations; to make accounts consistent; to accept a situation" },
    examples:["We need to reconcile the accounts before month end.","The two parties were finally reconciled."],
    phrases:["reconcile accounts","reconcile differences","bank reconciliation","reconcile figures"],
    synonyms:["balance","settle","resolve","harmonize"],
    difficulty:"Word stress",
    pronNote:"Stress on 1st syllable: REK-un-syl. 3 syllables. /r/ at start — not /l/. Final /l/ is clear"
  },
  {
    id:274, word:"procurement", stress:"pruh-KYOOR-munt",
    pos:["noun"],
    defs:{ noun:"the action of obtaining or purchasing goods and services" },
    examples:["The procurement department handles all supplier contracts.","Procurement costs were reduced by 15%."],
    phrases:["procurement process","procurement team","strategic procurement","procurement policy"],
    synonyms:["purchasing","acquisition","sourcing","supply"],
    difficulty:"R-blend",
    pronNote:"'pr' blend: pruh-KYOOR-munt. /pr/ as one unit. Long /uː/ in '-kyoor-'. Stress on 2nd syllable"
  },
  {
    id:275, word:"initiative", stress:"ih-NISH-uh-tiv",
    pos:["noun"],
    defs:{ noun:"a new plan or strategy; personal drive to act" },
    examples:["This is a company-wide sustainability initiative.","Employees who show initiative are quickly promoted."],
    phrases:["take initiative","strategic initiative","launch an initiative","show initiative"],
    synonyms:["plan","drive","effort","enterprise"],
    difficulty:"Word stress",
    pronNote:"5 syllables, stress on 2nd: ih-NISH-uh-tiv. '-tia-' = /ʃ/. Practice the rhythm: ih-NISH-uh-tiv"
  },
  {
    id:276, word:"subordinate", stress:"suh-BOR-dih-nit (n/adj) · suh-BOR-dih-nayt (v)",
    pos:["noun","adjective","verb"],
    defs:{ noun:"a person under the authority of another", adjective:"lower in rank", verb:"to treat as less important" },
    examples:["She manages a team of four subordinates.","Personal interests must be subordinate to team goals."],
    phrases:["direct subordinate","subordinate role","subordinate to","subordinate staff"],
    synonyms:["junior","lower-ranking","underling","secondary"],
    difficulty:"Word stress",
    pronNote:"Stress on 2nd syllable: suh-BOR-dih-nit. 4 syllables. /r/ in '-bor-' — light. Noun/adj ends in /nɪt/"
  },
  {
    id:277, word:"disruption", stress:"dis-RUP-shun",
    pos:["noun"],
    defs:{ noun:"a disturbance or problem that interrupts an event or process" },
    examples:["IT disruptions can cost companies thousands per hour.","We aim to complete the work with minimal disruption."],
    phrases:["minimal disruption","service disruption","cause disruption","avoid disruption"],
    synonyms:["interruption","disturbance","setback","upheaval"],
    difficulty:"Word stress",
    pronNote:"Stress on 2nd syllable: dis-RUP-shun. 3 syllables. /ʌ/ like 'cup'. Final '-tion' = /ʃun/"
  },
  {
    id:278, word:"credentials", stress:"krih-DEN-shulz",
    pos:["noun"],
    defs:{ noun:"qualifications, achievements, or experiences that make someone suitable" },
    examples:["Please bring your credentials to the interview.","Her credentials for the role are impressive."],
    phrases:["verify credentials","professional credentials","academic credentials","strong credentials"],
    synonyms:["qualifications","certificates","references","proof"],
    difficulty:"R-blend",
    pronNote:"'cr' blend: krih-DEN-shulz. /kr/ as one unit. '-tials' = /ʃəlz/. Stress on 2nd syllable"
  },
  {
    id:279, word:"accommodate", stress:"uh-KOM-uh-dayt",
    pos:["verb"],
    defs:{ verb:"to provide space or make adjustments for someone's needs" },
    examples:["Can the venue accommodate 300 guests?","We will do our best to accommodate your request."],
    phrases:["accommodate guests","accommodate a request","accommodate changes","fully accommodate"],
    synonyms:["house","adapt","adjust","cater to"],
    difficulty:"Word stress",
    pronNote:"5 syllables: uh-KOM-uh-dayt. Stress on 2nd. Double 'c' and double 'm'. Very common spelling error"
  },
  {
    id:280, word:"substantial", stress:"sub-STAN-shul",
    pos:["adjective"],
    defs:{ adjective:"of considerable size or importance; real and tangible" },
    examples:["A substantial fee applies for late cancellations.","The team made substantial progress this quarter."],
    phrases:["substantial progress","substantial fee","substantial difference","substantial gain"],
    synonyms:["significant","considerable","large","solid"],
    difficulty:"Vowel /æ/",
    pronNote:"/æ/ in '-stan-': sub-STAN-shul. Wide open mouth. '-tial' = /ʃul/. 3 syllables, stress on 2nd"
  },
  {
    id:281, word:"reimburse", stress:"ree-im-BURSS",
    pos:["verb"],
    defs:{ verb:"to pay back money to someone who has spent it on your behalf" },
    examples:["All approved expenses will be reimbursed monthly.","Keep all receipts to be reimbursed."],
    phrases:["reimburse expenses","expense reimbursement","be reimbursed","reimburse travel"],
    synonyms:["repay","refund","compensate","pay back"],
    difficulty:"Word stress",
    pronNote:"Stress on 3rd syllable: ree-im-BURSS. 3 syllables. /ɜr/ like 'her'. Don't drop the 'im-' in the middle"
  },
  {
    id:282, word:"notification", stress:"noh-tih-fih-KAY-shun",
    pos:["noun"],
    defs:{ noun:"the action of informing someone; a notice or announcement" },
    examples:["You will receive a notification once your order ships.","Prior notification is required for all absences."],
    phrases:["send a notification","receive notification","prior notification","push notification"],
    synonyms:["notice","alert","announcement","advisory"],
    difficulty:"Word stress",
    pronNote:"Stress on 4th syllable: noh-tih-fih-KAY-shun. 5 syllables. '-tion' = /ʃun/. Don't rush"
  },
  {
    id:283, word:"acquisition", stress:"ak-wih-ZIH-shun",
    pos:["noun"],
    defs:{ noun:"the purchase of one company by another; the learning of a skill" },
    examples:["The acquisition was valued at $2 billion.","Language acquisition takes time and practice."],
    phrases:["merger and acquisition","hostile acquisition","complete an acquisition","acquisition cost"],
    synonyms:["purchase","takeover","buyout","procurement"],
    difficulty:"Word stress",
    pronNote:"Stress on 3rd syllable: ak-wih-ZIH-shun. 4 syllables. /z/ sound in '-si-'. '-tion' = /ʃun/"
  },
  {
    id:284, word:"facilitate", stress:"fuh-SIL-ih-tayt",
    pos:["verb"],
    defs:{ verb:"to make something easier; to help bring something about" },
    examples:["The new software facilitates faster communication.","She facilitated the workshop for 50 participants."],
    phrases:["facilitate communication","facilitate a meeting","facilitate growth","facilitate change"],
    synonyms:["enable","assist","ease","support"],
    difficulty:"Word stress",
    pronNote:"Stress on 2nd syllable: fuh-SIL-ih-tayt. 4 syllables. /s/ not /ʃ/ in '-cil-'"
  },
  {
    id:285, word:"coordinates", stress:"koh-OR-dih-nits",
    pos:["verb","noun"],
    defs:{ verb:"to organize elements to work together effectively", noun:"a set of figures locating a point" },
    examples:["She coordinates all logistics for the annual conference.","Enter the GPS coordinates into the system."],
    phrases:["coordinates efforts","coordinates teams","GPS coordinates","event coordinates"],
    synonyms:["organizes","manages","arranges","oversees"],
    difficulty:"Word stress",
    pronNote:"Verb stress on 2nd: koh-OR-dih-nayts. 4 syllables. /r/ in 'or-' is clear. /dɪ/ not /ʒ/ in middle"
  },
  {
    id:286, word:"consequently", stress:"KON-sih-kwent-lee",
    pos:["adverb"],
    defs:{ adverb:"as a result; therefore" },
    examples:["The shipment was delayed; consequently, the launch was postponed.","Budgets were cut; consequently, staffing was reduced."],
    phrases:["consequently delayed","consequently reduced","and consequently","consequently affected"],
    synonyms:["therefore","as a result","thus","hence"],
    difficulty:"Word stress",
    pronNote:"Stress on 1st syllable: KON-sih-kwent-lee. 4 syllables. /kw/ cluster inside — no extra vowel"
  },
  {
    id:287, word:"respectively", stress:"rih-SPEK-tiv-lee",
    pos:["adverb"],
    defs:{ adverb:"in the order already mentioned; separately" },
    examples:["The first and second prizes were $500 and $250 respectively.","Tokyo and Osaka ranked first and second respectively."],
    phrases:["respectively ranked","respectively named","first and second respectively","noted respectively"],
    synonyms:["in that order","separately","individually","each"],
    difficulty:"R vs L",
    pronNote:"Initial /r/: rih-SPEK-tiv-lee. /r/ not /l/ at start. 4 syllables, stress on 2nd. '-ly' unstressed"
  },
  {
    id:288, word:"accommodate", stress:"uh-KOM-uh-dayt",
    pos:["verb"],
    defs:{ verb:"to provide lodging for; to adapt to a wish or need" },
    examples:["The new hotel can accommodate 500 guests.","We will do our best to accommodate you."],
    phrases:["accommodate a group","accommodate a preference","accommodate changes","fully accommodate"],
    synonyms:["house","cater to","fit","adapt"],
    difficulty:"Word stress",
    pronNote:"5 syllables: uh-KOM-uh-dayt. Stress on 2nd. Two double letters: 'cc' and 'mm'. Common exam word"
  },
  {
    id:289, word:"surplus", stress:"SUR-plus",
    pos:["noun","adjective"],
    defs:{ noun:"an excess amount beyond what is needed", adjective:"excess; more than required" },
    examples:["The trade surplus increased by 8% this quarter.","Surplus equipment was auctioned off."],
    phrases:["budget surplus","trade surplus","surplus stock","surplus labor"],
    synonyms:["excess","overflow","extra","remainder"],
    difficulty:"Word stress",
    pronNote:"Stress on 1st syllable: SUR-plus. 2 syllables. /ɜr/ like 'her'. Final /s/ is clean — don't add a vowel"
  },
  {
    id:290, word:"brochure", stress:"broh-SHOOR",
    pos:["noun"],
    defs:{ noun:"a small booklet or pamphlet containing information about a product or service" },
    examples:["Please pick up a brochure at the front desk.","The product brochure lists all available options."],
    phrases:["product brochure","download a brochure","travel brochure","company brochure"],
    synonyms:["pamphlet","leaflet","booklet","flyer"],
    difficulty:"R-blend",
    pronNote:"'br' blend: broh-SHOOR. /br/ as one unit. /ʃ/ in '-chure'. Long /uː/ at end. 2 syllables, stress on 2nd"
  },
  {
    id:291, word:"reimburse", stress:"ree-im-BURSS",
    pos:["verb"],
    defs:{ verb:"to repay money spent on behalf of a company or person" },
    examples:["The company reimburses up to $500 per month for commuting.","Will I be reimbursed for my hotel expenses?"],
    phrases:["reimburse travel costs","reimbursement claim","fully reimburse","reimburse promptly"],
    synonyms:["repay","refund","compensate","pay back"],
    difficulty:"Word stress",
    pronNote:"Stress on 3rd syllable: ree-im-BURSS. 3 syllables. /ɜr/ like 'her'. Common TOEIC word — practice it!"
  },
  {
    id:292, word:"proprietor", stress:"pruh-PRY-uh-tur",
    pos:["noun"],
    defs:{ noun:"the owner of a business or property" },
    examples:["The proprietor of the restaurant greeted every table.","She became proprietor after her father retired."],
    phrases:["sole proprietor","business proprietor","proprietor of","restaurant proprietor"],
    synonyms:["owner","landlord","holder","manager"],
    difficulty:"R-blend",
    pronNote:"'pr' blend twice: pruh-PRY-uh-tur. /pr/ as one unit both times. /aɪ/ diphthong in '-pri-'. 4 syllables"
  },
  {
    id:293, word:"obligation", stress:"ob-lih-GAY-shun",
    pos:["noun"],
    defs:{ noun:"a duty, commitment, or moral responsibility" },
    examples:["There is no obligation to purchase after the free trial.","We have an obligation to our shareholders."],
    phrases:["legal obligation","no obligation","fulfill an obligation","contractual obligation"],
    synonyms:["duty","responsibility","commitment","requirement"],
    difficulty:"Word stress",
    pronNote:"Stress on 3rd syllable: ob-lih-GAY-shun. 4 syllables. '-tion' = /ʃun/. /b/ — not /v/ — at start"
  },
  {
    id:294, word:"fluctuation", stress:"fluk-choo-AY-shun",
    pos:["noun"],
    defs:{ noun:"an irregular rising and falling in number or amount" },
    examples:["Currency fluctuations can affect import costs.","Price fluctuations are normal in volatile markets."],
    phrases:["price fluctuation","market fluctuation","currency fluctuation","seasonal fluctuation"],
    synonyms:["variation","swing","change","instability"],
    difficulty:"Word stress",
    pronNote:"Stress on 3rd syllable: fluk-choo-AY-shun. 4 syllables. '-tua-' = /tʃuː/. '-tion' = /ʃun/"
  },
  {
    id:295, word:"sustainability", stress:"suh-stay-nuh-BIL-ih-tee",
    pos:["noun"],
    defs:{ noun:"the ability to be maintained over the long term; avoidance of depleting natural resources" },
    examples:["The company published its sustainability report.","Sustainability is central to our business strategy."],
    phrases:["environmental sustainability","sustainability report","sustainability goals","long-term sustainability"],
    synonyms:["viability","longevity","eco-friendliness","endurance"],
    difficulty:"Word stress",
    pronNote:"Stress on 4th syllable: suh-stay-nuh-BIL-ih-tee. 7 syllables! Long /eɪ/ in '-stay-'. Take it slow"
  },
  {
    id:296, word:"reimburse", stress:"ree-im-BURSS",
    pos:["verb"],
    defs:{ verb:"to pay someone back for expenses they have incurred" },
    examples:["Submit receipts to be reimbursed within 30 days.","The client agreed to reimburse all legal fees."],
    phrases:["reimburse all costs","reimbursement process","eligible for reimbursement","reimburse in full"],
    synonyms:["repay","refund","settle","compensate"],
    difficulty:"Word stress",
    pronNote:"Stress on 3rd syllable: ree-im-BURSS. 3 syllables. /ɜr/ vowel like 'her'. Very common in TOEIC reading"
  },
  {
    id:297, word:"provisional", stress:"pruh-VIH-zhun-ul",
    pos:["adjective"],
    defs:{ adjective:"provided for the time being; subject to change" },
    examples:["The provisional figures will be confirmed next week.","She accepted a provisional offer from the company."],
    phrases:["provisional figures","provisional offer","provisional agreement","on a provisional basis"],
    synonyms:["temporary","interim","conditional","tentative"],
    difficulty:"R-blend",
    pronNote:"'pr' blend: pruh-VIH-zhun-ul. /pr/ as one unit. /ʒ/ in '-sion-'. 4 syllables, stress on 2nd"
  },
  {
    id:298, word:"coincide", stress:"koh-in-SYD",
    pos:["verb"],
    defs:{ verb:"to occur at the same time; to correspond in nature or position" },
    examples:["The conference dates coincide with the trade fair.","Our findings coincide with earlier research."],
    phrases:["coincide with","happen to coincide","dates coincide","schedules coincide"],
    synonyms:["overlap","correspond","agree","match"],
    difficulty:"Word stress",
    pronNote:"Stress on 3rd syllable: koh-in-SYD. 3 syllables. Long /aɪ/ in '-cide'. Final /d/ — don't drop it"
  },
  {
    id:299, word:"stringent", stress:"STRIN-junt",
    pos:["adjective"],
    defs:{ adjective:"strict, precise, and exacting; rigorously enforced" },
    examples:["The new safety standards are extremely stringent.","We must comply with stringent data protection laws."],
    phrases:["stringent requirements","stringent regulations","stringent standards","stringent controls"],
    synonyms:["strict","rigorous","demanding","tight"],
    difficulty:"Word stress",
    pronNote:"Stress on 1st syllable: STRIN-junt. 2 syllables. /str/ cluster — no extra vowels. /dʒ/ in '-gent'"
  },
  {
    id:300, word:"expedite", stress:"EK-spih-dyt",
    pos:["verb"],
    defs:{ verb:"to make something happen more quickly; to speed up a process" },
    examples:["Please expedite the delivery of these parts.","Can you expedite your review of the proposal?"],
    phrases:["expedite delivery","expedite a request","expedite the process","expedited shipping"],
    synonyms:["speed up","accelerate","hasten","fast-track"],
    difficulty:"Word stress",
    pronNote:"Stress on 1st syllable: EK-spih-dyt. 3 syllables. /ks/ cluster in 'ex-'. Long /aɪ/ at end"
  },
```

---

## After adding the data

1. Update the header comment from:
   ```js
   // 200 MOST IMPORTANT TOEIC WORDS
   ```
   to:
   ```js
   // 300 MOST IMPORTANT TOEIC WORDS  (fastvoca rank-000 to rank-200 order)
   ```

2. **No other changes needed.** The component handles any array length automatically.

3. Sanity check after edit: `TOEIC_WORDS.length` should equal `300`.
