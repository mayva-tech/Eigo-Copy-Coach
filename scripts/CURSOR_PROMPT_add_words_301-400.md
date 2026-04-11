# Cursor Task: Add TOEIC Words 301–400 to TOEICVocabCard.jsx

## What to do

Open `TOEICVocabCard.jsx` and append the 100 word objects below to the end of the
`TOEIC_WORDS` array, just before the closing `];`.

The schema is identical to all existing entries — do not change it:

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

## Words to append (301–400)

```js
  {
    id:301, word:"repair", stress:"rih-PAIR",
    pos:["noun","verb"],
    defs:{ noun:"the act of fixing something damaged or broken", verb:"to restore something to good condition" },
    examples:["The roof is in need of urgent repair.","We sent the printer away to be repaired."],
    phrases:["repair a car","repair damage","under repair","repair costs"],
    synonyms:["fix","mend","restore","service"],
    difficulty:"R vs L",
    pronNote:"Initial /r/: rih-PAIR — /r/ not /l/. /eə/ diphthong in '-pair'. 2 syllables, stress on 2nd"
  },
  {
    id:302, word:"aim", stress:"AYM",
    pos:["noun","verb"],
    defs:{ noun:"a purpose or intention; a desired outcome", verb:"to direct toward a target; to intend" },
    examples:["Our aim is to double revenue within two years.","This campaign aims to raise brand awareness."],
    phrases:["aim high","aim for success","primary aim","aim to achieve"],
    synonyms:["goal","target","intend","objective"],
    difficulty:"Long vowel",
    pronNote:"Long /eɪ/ diphthong: AYM — one syllable, rhymes with 'game'. Don't shorten to /ɛm/"
  },
  {
    id:303, word:"credit", stress:"KRED-it",
    pos:["noun","verb"],
    defs:{ noun:"financial trust extended to a borrower; recognition for an achievement", verb:"to add money to an account; to acknowledge" },
    examples:["We can extend a credit line of $50,000.","The refund will be credited to your account."],
    phrases:["extend credit","credit limit","credit score","take credit for"],
    synonyms:["loan","recognition","trust","acknowledge"],
    difficulty:"Final consonant",
    pronNote:"Final /t/: KRED-it — clean stop. 2 syllables, stress on 1st. /ɛ/ vowel in 'cred-' like 'bed'"
  },
  {
    id:304, word:"financial", stress:"fih-NAN-shul",
    pos:["adjective"],
    defs:{ adjective:"relating to finance, money, or economic activity" },
    examples:["Please review the financial report before the meeting.","She sought financial advice from an accountant."],
    phrases:["financial report","financial aid","financial statement","financial year"],
    synonyms:["monetary","economic","fiscal","budgetary"],
    difficulty:"Word stress",
    pronNote:"Stress on 2nd syllable: fih-NAN-shul. 3 syllables. '-cial' sounds like /ʃul/. /æ/ in '-nan-'"
  },
  {
    id:305, word:"attract", stress:"uh-TRAKT",
    pos:["verb"],
    defs:{ verb:"to draw in or pull toward; to arouse interest or liking" },
    examples:["The new campaign attracted thousands of new customers.","We need to attract top talent to the company."],
    phrases:["attract attention","attract customers","attract investment","attract talent"],
    synonyms:["draw","pull","appeal to","entice"],
    difficulty:"Final consonant",
    pronNote:"Final /t/: uh-TRAKT — clean stop. /tr/ blend inside — no extra vowel. 2 syllables, stress on 2nd"
  },
  {
    id:306, word:"dig", stress:"DIG",
    pos:["noun","verb"],
    defs:{ noun:"an archaeological excavation; a remark aimed at someone", verb:"to break up and move earth; to investigate" },
    examples:["Workers dug the trench in one afternoon.","Archaeologists are conducting a dig at the site."],
    phrases:["dig a hole","dig up information","archaeological dig","dig deeper"],
    synonyms:["excavate","unearth","investigate","burrow"],
    difficulty:"Final consonant",
    pronNote:"Final /g/: DIG — voiced stop, tongue against back of mouth. 1 syllable. Don't add /u/ after"
  },
  {
    id:307, word:"harvest", stress:"HAR-vust",
    pos:["noun","verb"],
    defs:{ noun:"the process or period of gathering crops; a crop gathered", verb:"to gather a crop or resource" },
    examples:["This year's harvest exceeded all expectations.","We harvested data from over 10,000 users."],
    phrases:["harvest season","harvest crops","bumper harvest","harvest data"],
    synonyms:["gather","collect","reap","yield"],
    difficulty:"Word stress",
    pronNote:"Stress on 1st syllable: HAR-vust. 2 syllables. /r/ in 'har-' is clear. Final /t/ stops cleanly"
  },
  {
    id:308, word:"aid", stress:"AYD",
    pos:["noun","verb"],
    defs:{ noun:"help or support, especially of a practical nature", verb:"to help or assist" },
    examples:["The charity provides aid to disaster victims.","Visual charts aid understanding of complex data."],
    phrases:["provide aid","financial aid","first aid","foreign aid"],
    synonyms:["help","support","assist","relief"],
    difficulty:"Long vowel",
    pronNote:"Long /eɪ/ diphthong: AYD — one syllable, rhymes with 'paid'. Final /d/ is voiced — don't drop it"
  },
  {
    id:309, word:"emphasis", stress:"EM-fuh-sis",
    pos:["noun"],
    defs:{ noun:"special importance, value, or prominence given to something" },
    examples:["The training places strong emphasis on communication skills.","There is a growing emphasis on work-life balance."],
    phrases:["place emphasis on","with emphasis on","strong emphasis","shift the emphasis"],
    synonyms:["stress","focus","importance","weight"],
    difficulty:"Word stress",
    pronNote:"Stress on 1st syllable: EM-fuh-sis. 3 syllables. /f/ not /p/ in '-pha-'. Plural: emphases"
  },
  {
    id:310, word:"foster", stress:"FOS-tur",
    pos:["verb","adjective"],
    defs:{ verb:"to encourage or promote the development of something; to care for temporarily", adjective:"denoting a foster family arrangement" },
    examples:["The company works hard to foster innovation.","We aim to foster a collaborative work environment."],
    phrases:["foster innovation","foster a relationship","foster an environment","foster growth"],
    synonyms:["encourage","nurture","promote","cultivate"],
    difficulty:"Word stress",
    pronNote:"Stress on 1st syllable: FOS-tur. 2 syllables. /ɒ/ vowel in 'fos-' like 'off'. Final /r/ in American English"
  },
  {
    id:311, word:"personal", stress:"PUR-sun-ul",
    pos:["adjective"],
    defs:{ adjective:"of or belonging to a particular person; private rather than official" },
    examples:["Please do not share personal information without consent.","She brought a personal touch to every client meeting."],
    phrases:["personal information","personal opinion","personal data","personal development"],
    synonyms:["private","individual","own","direct"],
    difficulty:"Word stress",
    pronNote:"Stress on 1st syllable: PUR-sun-ul. 3 syllables. /ɜr/ like 'her' in 'per-'. Don't confuse with 'personnel'"
  },
  {
    id:312, word:"selection", stress:"sih-LEK-shun",
    pos:["noun"],
    defs:{ noun:"the action of carefully choosing; a range of things available to choose from" },
    examples:["We offer a wide selection of products.","The selection process takes about two weeks."],
    phrases:["wide selection","selection process","selection criteria","product selection"],
    synonyms:["choice","range","variety","assortment"],
    difficulty:"Word stress",
    pronNote:"Stress on 2nd syllable: sih-LEK-shun. 3 syllables. '-tion' = /ʃun/. /k/ sound in '-lec-'"
  },
  {
    id:313, word:"popular", stress:"POP-yuh-lur",
    pos:["adjective"],
    defs:{ adjective:"liked or admired by many people; intended for the general public" },
    examples:["This is our most popular product line.","The seminar was more popular than expected."],
    phrases:["popular demand","popular opinion","popular belief","highly popular"],
    synonyms:["well-liked","favored","mainstream","in demand"],
    difficulty:"Word stress",
    pronNote:"Stress on 1st syllable: POP-yuh-lur. 3 syllables. /j/ sound before '-u-'. /ɒ/ in 'pop-' like 'top'"
  },
  {
    id:314, word:"donation", stress:"doh-NAY-shun",
    pos:["noun"],
    defs:{ noun:"a gift of money or goods to a cause or organization" },
    examples:["We gratefully accept donations of any amount.","The company made a generous donation to the local hospital."],
    phrases:["make a donation","charitable donation","accept donations","donation drive"],
    synonyms:["gift","contribution","grant","offering"],
    difficulty:"Word stress",
    pronNote:"Stress on 2nd syllable: doh-NAY-shun. 3 syllables. Long /oʊ/ in 'do-'. '-tion' = /ʃun/"
  },
  {
    id:315, word:"attain", stress:"uh-TAYN",
    pos:["verb"],
    defs:{ verb:"to succeed in achieving something; to reach a particular age or level" },
    examples:["She attained her professional certification last year.","The company attained record sales in Q3."],
    phrases:["attain a goal","attain success","attain certification","attain targets"],
    synonyms:["achieve","reach","accomplish","gain"],
    difficulty:"Final consonant",
    pronNote:"Final /n/: uh-TAYN — tongue tip to ridge. Don't drop it. 2 syllables, stress on 2nd. /eɪ/ diphthong"
  },
  {
    id:316, word:"value", stress:"VAL-yoo",
    pos:["noun","verb"],
    defs:{ noun:"the monetary worth of something; importance or usefulness", verb:"to estimate the worth of; to regard highly" },
    examples:["We offer excellent value for money.","We truly value your feedback and loyalty."],
    phrases:["add value","value for money","face value","core values"],
    synonyms:["worth","importance","price","appreciate"],
    difficulty:"Word stress",
    pronNote:"Stress on 1st syllable: VAL-yoo. 2 syllables. /j/ glide between '-l-' and '-ue'. /æ/ in 'val-'"
  },
  {
    id:317, word:"lead", stress:"LEED (v/n) · LED (metal)",
    pos:["noun","verb"],
    defs:{ noun:"a position in front; a clue; a heavy metal element", verb:"to guide or direct; to be in first place" },
    examples:["She was asked to lead the new project team.","Our product maintains a lead in market share."],
    phrases:["lead a team","take the lead","sales lead","lead by example"],
    synonyms:["guide","direct","head","front"],
    difficulty:"Long vowel",
    pronNote:"As verb/noun (guide): LEED — long /iː/. As metal: LED — short /ɛ/. Same spelling, different pronunciation!"
  },
  {
    id:318, word:"community", stress:"kuh-MYOO-nih-tee",
    pos:["noun"],
    defs:{ noun:"a group of people living in the same area or sharing common interests" },
    examples:["We invest heavily in the local community.","The online community grew to over 100,000 members."],
    phrases:["local community","business community","online community","community engagement"],
    synonyms:["society","group","neighborhood","network"],
    difficulty:"Word stress",
    pronNote:"Stress on 2nd syllable: kuh-MYOO-nih-tee. 4 syllables. /mj/ cluster — like 'music'"
  },
  {
    id:319, word:"rush", stress:"RUSH",
    pos:["noun","verb"],
    defs:{ noun:"a sudden rapid movement; a period of intense activity", verb:"to move or act with urgent haste" },
    examples:["There's no need to rush — take your time.","We're in a rush to finish the proposal today."],
    phrases:["rush hour","rush to finish","in a rush","rush delivery"],
    synonyms:["hurry","dash","speed","scramble"],
    difficulty:"Final consonant",
    pronNote:"Final /ʃ/: RUSH — like 'fish' ending. 1 syllable. /ʌ/ vowel like 'cup'. Don't add vowel after /ʃ/"
  },
  {
    id:320, word:"concern", stress:"kun-SURN",
    pos:["noun","verb"],
    defs:{ noun:"a matter that causes worry; a business or company", verb:"to relate to; to make someone worried" },
    examples:["Safety is our primary concern.","Please raise any concerns at the team meeting."],
    phrases:["express concern","raise a concern","of concern","a going concern"],
    synonyms:["worry","issue","matter","involve"],
    difficulty:"Final consonant",
    pronNote:"Final /n/: kun-SURN — tongue tip to ridge. /ɜr/ like 'her' in '-cern'. 2 syllables, stress on 2nd"
  },
  {
    id:321, word:"donate", stress:"DOH-nayt",
    pos:["verb"],
    defs:{ verb:"to give money, goods, or time to a charity or cause" },
    examples:["The firm donated $50,000 to the relief fund.","Employees are encouraged to donate blood annually."],
    phrases:["donate money","donate to charity","donate clothing","donate time"],
    synonyms:["give","contribute","grant","present"],
    difficulty:"Word stress",
    pronNote:"Stress on 1st syllable: DOH-nayt. 2 syllables. Long /oʊ/ in 'do-'. Final /t/ stops cleanly"
  },
  {
    id:322, word:"demand", stress:"dih-MAND",
    pos:["noun","verb"],
    defs:{ noun:"a need or desire for a product or service; an insistent request", verb:"to require or insist upon" },
    examples:["Demand for electric vehicles is rising sharply.","The client demanded a full refund."],
    phrases:["meet demand","high demand","supply and demand","on demand"],
    synonyms:["require","request","need","insist"],
    difficulty:"Vowel /æ/",
    pronNote:"/æ/ in '-mand': dih-MAND. Wide open mouth like 'man'. Final /d/ — voiced, don't drop it"
  },
  {
    id:323, word:"defective", stress:"dih-FEK-tiv",
    pos:["adjective"],
    defs:{ adjective:"imperfect or faulty; not working properly" },
    examples:["Customers may return any defective product for a full refund.","A defective component caused the system failure."],
    phrases:["defective product","defective part","defective item","return defective goods"],
    synonyms:["faulty","broken","flawed","malfunctioning"],
    difficulty:"Word stress",
    pronNote:"Stress on 2nd syllable: dih-FEK-tiv. 3 syllables. /k/ sound in '-fec-'. Final /v/ is voiced"
  },
  {
    id:324, word:"awareness", stress:"uh-WAIR-nuss",
    pos:["noun"],
    defs:{ noun:"knowledge or perception of a situation or fact; public knowledge of an issue" },
    examples:["The campaign raised awareness of workplace safety.","Brand awareness increased significantly after the launch."],
    phrases:["raise awareness","brand awareness","public awareness","awareness campaign"],
    synonyms:["knowledge","understanding","consciousness","recognition"],
    difficulty:"Word stress",
    pronNote:"Stress on 2nd syllable: uh-WAIR-nuss. 3 syllables. /eə/ vowel in '-ware-'. Final /s/ is clean"
  },
  {
    id:325, word:"operate", stress:"OP-ur-ayt",
    pos:["verb"],
    defs:{ verb:"to control the functioning of something; to manage a business; to perform surgery" },
    examples:["She operates a chain of retail stores.","Please read the manual before operating the machine."],
    phrases:["operate a machine","operate a business","operate efficiently","fully operational"],
    synonyms:["run","manage","function","work"],
    difficulty:"Word stress",
    pronNote:"Stress on 1st syllable: OP-ur-ayt. 3 syllables. /ɒ/ in 'op-' like 'top'. '-ate' ending = /eɪt/"
  },
  {
    id:326, word:"notice", stress:"NOH-tiss",
    pos:["noun","verb"],
    defs:{ noun:"a written announcement; advance warning of intent", verb:"to become aware of; to observe" },
    examples:["Please give two weeks' notice before leaving.","Did you notice the updated schedule on the board?"],
    phrases:["give notice","at short notice","notice period","until further notice"],
    synonyms:["observe","announcement","warning","see"],
    difficulty:"Word stress",
    pronNote:"Stress on 1st syllable: NOH-tiss. 2 syllables. Long /oʊ/ in 'no-'. Final /s/ — not /z/"
  },
  {
    id:327, word:"applicant", stress:"AP-lih-kunt",
    pos:["noun"],
    defs:{ noun:"a person who formally applies for a job, program, or permission" },
    examples:["We received over 200 applicants for the position.","All applicants must submit a resume and cover letter."],
    phrases:["job applicant","successful applicant","shortlist applicants","applicant pool"],
    synonyms:["candidate","interviewee","prospect","petitioner"],
    difficulty:"Vowel /æ/",
    pronNote:"Initial /æ/: AP-lih-kunt. Wide open mouth on first syllable. 3 syllables, stress on 1st"
  },
  {
    id:328, word:"process", stress:"PROH-sess (n) · PROH-sess or pruh-SESS (v)",
    pos:["noun","verb"],
    defs:{ noun:"a series of actions taken to achieve a result", verb:"to perform a series of operations on; to handle" },
    examples:["The approval process takes about five business days.","All orders are processed within 24 hours."],
    phrases:["approval process","process an order","hiring process","due process"],
    synonyms:["procedure","method","handle","system"],
    difficulty:"R-blend",
    pronNote:"'pr' blend: PROH-sess. /pr/ as one unit. 2 syllables, stress on 1st. Long /oʊ/ in 'pro-'"
  },
  {
    id:329, word:"foundation", stress:"fown-DAY-shun",
    pos:["noun"],
    defs:{ noun:"the underlying basis for something; a charitable organization; the base of a building" },
    examples:["The merger was built on a foundation of trust.","She donated to the children's education foundation."],
    phrases:["solid foundation","on the foundation of","charitable foundation","foundation course"],
    synonyms:["basis","base","groundwork","organization"],
    difficulty:"Word stress",
    pronNote:"Stress on 2nd syllable: fown-DAY-shun. 3 syllables. /aʊ/ diphthong in 'foun-'. '-tion' = /ʃun/"
  },
  {
    id:330, word:"restriction", stress:"rih-STRIK-shun",
    pos:["noun"],
    defs:{ noun:"a rule or condition that limits what is allowed" },
    examples:["There are no restrictions on the number of entries.","Travel restrictions remain in place for some regions."],
    phrases:["travel restriction","impose restrictions","no restrictions","lift a restriction"],
    synonyms:["limit","constraint","ban","regulation"],
    difficulty:"R vs L",
    pronNote:"Initial /r/: rih-STRIK-shun. /r/ not /l/. /str/ cluster inside. 3 syllables, stress on 2nd"
  },
  {
    id:331, word:"negotiate", stress:"nih-GOH-shee-ayt",
    pos:["verb"],
    defs:{ verb:"to discuss terms in order to reach a mutual agreement" },
    examples:["We will negotiate the contract terms next week.","Both sides are willing to negotiate."],
    phrases:["negotiate a deal","open to negotiate","negotiate in good faith","negotiation breakdown"],
    synonyms:["bargain","broker","mediate","discuss"],
    difficulty:"Word stress",
    pronNote:"5 syllables: nih-GOH-shee-ayt. Stress on 2nd. '-tia-' = /ʃ/. Very frequent in TOEIC Parts 6 and 7"
  },
  {
    id:332, word:"warehouse", stress:"WAIR-howss",
    pos:["noun","verb"],
    defs:{ noun:"a large building for storing goods", verb:"to store in a warehouse" },
    examples:["The goods are stored in our central warehouse.","All surplus stock is warehoused offsite."],
    phrases:["central warehouse","warehouse management","warehouse staff","store in a warehouse"],
    synonyms:["storage facility","depot","stockroom","distribution center"],
    difficulty:"Word stress",
    pronNote:"Stress on 1st syllable: WAIR-howss. 2 syllables. /eə/ in 'ware-'. /aʊ/ diphthong in '-house'"
  },
  {
    id:333, word:"exceptional", stress:"ik-SEP-shun-ul",
    pos:["adjective"],
    defs:{ adjective:"unusually good; outstanding; forming an exception; not typical" },
    examples:["She delivers exceptional results every quarter.","Refunds are only given in exceptional circumstances."],
    phrases:["exceptional service","exceptional circumstances","truly exceptional","exceptional performance"],
    synonyms:["outstanding","extraordinary","remarkable","unusual"],
    difficulty:"Word stress",
    pronNote:"Stress on 2nd syllable: ik-SEP-shun-ul. 4 syllables. '-tion' = /ʃun/. '-al' unstressed at end"
  },
  {
    id:334, word:"potential", stress:"puh-TEN-shul",
    pos:["noun","adjective"],
    defs:{ noun:"latent qualities that may develop into something greater", adjective:"having the capacity to develop" },
    examples:["The new hire shows great potential.","There is potential for significant cost savings."],
    phrases:["growth potential","potential client","full potential","unlock potential"],
    synonyms:["promise","possibility","prospect","capable"],
    difficulty:"Word stress",
    pronNote:"Stress on 2nd syllable: puh-TEN-shul. 3 syllables. '-tial' = /ʃul/. Long /ɛ/ in '-ten-'"
  },
  {
    id:335, word:"revision", stress:"rih-VIH-zhun",
    pos:["noun"],
    defs:{ noun:"the action of revising; an amended version of something" },
    examples:["The contract is under revision.","Please submit your revision by end of day."],
    phrases:["under revision","submit a revision","revision process","request revisions"],
    synonyms:["amendment","update","edit","correction"],
    difficulty:"R vs L",
    pronNote:"Initial /r/: rih-VIH-zhun. /r/ not /l/. /ʒ/ sound in '-sion-' like 'measure'. 3 syllables, stress on 2nd"
  },
  {
    id:336, word:"sufficient", stress:"suh-FISH-unt",
    pos:["adjective"],
    defs:{ adjective:"enough for the purpose; adequate in quantity or quality" },
    examples:["We don't have sufficient staff to handle the volume.","Is the evidence sufficient to proceed?"],
    phrases:["sufficient funds","sufficient time","more than sufficient","sufficient evidence"],
    synonyms:["enough","adequate","ample","satisfactory"],
    difficulty:"TH/SH sounds",
    pronNote:"'-fici-' = /ʃ/: suh-FISH-unt. Like 'fish'. NOT 'fiss-ee-ent'. 3 syllables, stress on 2nd"
  },
  {
    id:337, word:"promote", stress:"pruh-MOTE",
    pos:["verb"],
    defs:{ verb:"to raise to a higher position; to support or publicize actively" },
    examples:["She was promoted to vice president last month.","We actively promote our products at trade fairs."],
    phrases:["get promoted","promote a product","promote awareness","promote teamwork"],
    synonyms:["advance","advertise","elevate","market"],
    difficulty:"R-blend",
    pronNote:"'pr' blend: pruh-MOTE. /pr/ as one unit — no /u/ between them. Final /t/ stops cleanly"
  },
  {
    id:338, word:"inquiry", stress:"IN-kwuh-ree",
    pos:["noun"],
    defs:{ noun:"a request for information; an official investigation" },
    examples:["We received over 500 inquiries after the ad ran.","An internal inquiry is being conducted."],
    phrases:["make an inquiry","respond to inquiries","formal inquiry","sales inquiry"],
    synonyms:["question","query","investigation","request"],
    difficulty:"Word stress",
    pronNote:"Stress on 1st syllable: IN-kwuh-ree. 3 syllables. /kw/ cluster. Also heard as in-KWYE-ree (British)"
  },
  {
    id:339, word:"launch", stress:"LAWNCH",
    pos:["noun","verb"],
    defs:{ noun:"the introduction of a new product, service, or initiative", verb:"to introduce or begin something new" },
    examples:["The product launch drew media attention worldwide.","We will launch the new platform in Q2."],
    phrases:["product launch","launch a campaign","soft launch","launch date"],
    synonyms:["introduce","release","debut","unveil"],
    difficulty:"Vowel length",
    pronNote:"Long /ɔː/: LAWNCH — like 'law'. Don't shorten to /æ/: not LANCH. 1 syllable"
  },
  {
    id:340, word:"accommodate", stress:"uh-KOM-uh-dayt",
    pos:["verb"],
    defs:{ verb:"to provide lodging or space for; to adapt to a need or request" },
    examples:["The new office can accommodate 150 employees.","We will do our best to accommodate your schedule."],
    phrases:["accommodate requests","accommodate changes","accommodate guests","fully accommodate"],
    synonyms:["house","adapt","adjust","fit"],
    difficulty:"Word stress",
    pronNote:"5 syllables: uh-KOM-uh-dayt. Stress on 2nd. Spelled with double 'c' and double 'm'"
  },
  {
    id:341, word:"resolve", stress:"rih-ZOLV",
    pos:["verb","noun"],
    defs:{ verb:"to settle or find a solution to a problem", noun:"firm determination to do something" },
    examples:["We resolved the customer complaint within 24 hours.","She showed great resolve under pressure."],
    phrases:["resolve a dispute","resolve an issue","conflict resolution","firm resolve"],
    synonyms:["settle","solve","determine","fix"],
    difficulty:"R vs L",
    pronNote:"Initial /r/: rih-ZOLV. /r/ not /l/. /z/ sound in '-so-'. Final /v/ is voiced. 2 syllables, stress on 2nd"
  },
  {
    id:342, word:"specification", stress:"spes-ih-fih-KAY-shun",
    pos:["noun"],
    defs:{ noun:"a detailed description of design, materials, or dimensions; a requirement" },
    examples:["The product must meet all technical specifications.","Please review the job specification carefully."],
    phrases:["technical specification","meet specifications","job specification","product spec"],
    synonyms:["requirement","detail","standard","description"],
    difficulty:"Word stress",
    pronNote:"Stress on 4th syllable: spes-ih-fih-KAY-shun. 5 syllables. '-tion' = /ʃun/. Don't rush"
  },
  {
    id:343, word:"prior", stress:"PRY-ur",
    pos:["adjective","adverb"],
    defs:{ adjective:"existing or coming before in time; more important", adverb:"before a particular time" },
    examples:["Prior experience in sales is required.","Please notify us prior to your arrival."],
    phrases:["prior experience","prior to","prior notice","prior approval"],
    synonyms:["previous","earlier","before","preceding"],
    difficulty:"R-blend",
    pronNote:"'pr' blend: PRY-ur. /pr/ as one unit. /aɪ/ diphthong. 2 syllables, stress on 1st"
  },
  {
    id:344, word:"negotiate", stress:"nih-GOH-shee-ayt",
    pos:["verb"],
    defs:{ verb:"to discuss to reach agreement; to find a way through a difficulty" },
    examples:["We need to negotiate better terms with the supplier.","She negotiated a landmark deal."],
    phrases:["negotiate a contract","negotiate salary","negotiating position","room to negotiate"],
    synonyms:["discuss","broker","arrange","bargain"],
    difficulty:"Word stress",
    pronNote:"5 syllables: nih-GOH-shee-ayt. Stress on 2nd. '-tia-' = /ʃ/. One of TOEIC's most tested words"
  },
  {
    id:345, word:"comprehensive", stress:"kom-prih-HEN-siv",
    pos:["adjective"],
    defs:{ adjective:"including or dealing with all or nearly all aspects; thorough" },
    examples:["We offer a comprehensive benefits package.","She provided a comprehensive overview of the project."],
    phrases:["comprehensive report","comprehensive benefits","comprehensive training","comprehensive review"],
    synonyms:["thorough","complete","extensive","full"],
    difficulty:"Word stress",
    pronNote:"Stress on 3rd syllable: kom-prih-HEN-siv. 4 syllables. 'pr' blend inside — /pr/ as one unit"
  },
  {
    id:346, word:"relocate", stress:"ree-loh-KAYT",
    pos:["verb"],
    defs:{ verb:"to move to a different place, especially for work" },
    examples:["The head office will relocate to Singapore next year.","Would you be willing to relocate for this role?"],
    phrases:["relocate to another city","office relocation","willing to relocate","corporate relocation"],
    synonyms:["move","transfer","migrate","shift"],
    difficulty:"R vs L",
    pronNote:"Initial /r/: ree-loh-KAYT. /r/ at start, then /l/ in middle — both must be clear and distinct"
  },
  {
    id:347, word:"establish", stress:"ih-STAB-lish",
    pos:["verb"],
    defs:{ verb:"to set up or found; to show something to be true" },
    examples:["The firm was established in 1978.","We need to establish clear guidelines."],
    phrases:["establish a company","establish contact","establish guidelines","newly established"],
    synonyms:["found","set up","create","confirm"],
    difficulty:"Vowel /æ/",
    pronNote:"/æ/ in '-tab-': ih-STAB-lish. Wide open mouth like 'tab'. 3 syllables, stress on 2nd"
  },
  {
    id:348, word:"participant", stress:"par-TIS-ih-punt",
    pos:["noun"],
    defs:{ noun:"a person who takes part in an activity or event" },
    examples:["All participants will receive a certificate.","We expect 200 participants at the conference."],
    phrases:["conference participant","active participant","all participants","participant feedback"],
    synonyms:["attendee","delegate","member","contributor"],
    difficulty:"Word stress",
    pronNote:"Stress on 2nd syllable: par-TIS-ih-punt. 4 syllables. /r/ in 'par-' is clear. /s/ not /ʃ/ in '-tic-'"
  },
  {
    id:349, word:"coordinate", stress:"koh-OR-dih-nayt (v) · koh-OR-dih-nit (n/adj)",
    pos:["verb","noun"],
    defs:{ verb:"to organize elements to work together effectively", noun:"a set of values that show an exact position" },
    examples:["She coordinates all events for the sales division.","Enter the GPS coordinates into the navigation system."],
    phrases:["coordinate efforts","coordinate a meeting","GPS coordinates","coordinate teams"],
    synonyms:["organize","manage","arrange","synchronize"],
    difficulty:"Word stress",
    pronNote:"Stress on 2nd syllable: koh-OR-dih-nayt. 4 syllables. /r/ in '-or-' is clear. /dɪ/ not /ʒ/ in middle"
  },
  {
    id:350, word:"proficiency", stress:"pruh-FISH-un-see",
    pos:["noun"],
    defs:{ noun:"a high degree of competence or skill in a particular area" },
    examples:["A proficiency test is required for all applicants.","Her proficiency in Japanese impressed the team."],
    phrases:["language proficiency","proficiency test","demonstrate proficiency","level of proficiency"],
    synonyms:["skill","competence","expertise","mastery"],
    difficulty:"R-blend",
    pronNote:"'pr' blend: pruh-FISH-un-see. /pr/ as one unit. '-fici-' = /ʃ/. 4 syllables, stress on 2nd"
  },
  {
    id:351, word:"certificate", stress:"sur-TIF-ih-kit",
    pos:["noun"],
    defs:{ noun:"an official document recording a fact or granting recognition" },
    examples:["Participants receive a certificate upon completion.","A gift certificate makes a thoughtful present."],
    phrases:["gift certificate","training certificate","certificate of completion","earn a certificate"],
    synonyms:["credential","diploma","license","document"],
    difficulty:"Word stress",
    pronNote:"Stress on 2nd syllable: sur-TIF-ih-kit. 4 syllables. '-ate' noun ending reduces to /ɪt/"
  },
  {
    id:352, word:"reimburse", stress:"ree-im-BURSS",
    pos:["verb"],
    defs:{ verb:"to repay someone for money they have spent" },
    examples:["We will reimburse all approved travel costs.","Submit your receipts to be reimbursed within 30 days."],
    phrases:["reimburse expenses","expense reimbursement","fully reimbursed","reimburse travel"],
    synonyms:["repay","refund","compensate","pay back"],
    difficulty:"Word stress",
    pronNote:"Stress on 3rd syllable: ree-im-BURSS. 3 syllables. /ɜr/ like 'her'. One of the most common TOEIC verbs"
  },
  {
    id:353, word:"initiative", stress:"ih-NISH-uh-tiv",
    pos:["noun"],
    defs:{ noun:"a fresh approach to something; personal enterprise" },
    examples:["This green initiative aims to cut emissions by 30%.","She shows real initiative on the job."],
    phrases:["take the initiative","strategic initiative","show initiative","launch an initiative"],
    synonyms:["plan","effort","drive","enterprise"],
    difficulty:"Word stress",
    pronNote:"5 syllables, stress on 2nd: ih-NISH-uh-tiv. '-tia-' = /ʃ/. Practice: ih-NISH … uh-tiv"
  },
  {
    id:354, word:"distinguish", stress:"dih-STING-gwish",
    pos:["verb"],
    defs:{ verb:"to recognize or treat as different; to be a mark of difference" },
    examples:["What distinguishes us from our competitors?","She was distinguished by her exceptional leadership."],
    phrases:["distinguish between","distinguished career","clearly distinguish","distinguish from"],
    synonyms:["differentiate","discern","separate","identify"],
    difficulty:"Word stress",
    pronNote:"Stress on 2nd syllable: dih-STING-gwish. 3 syllables. /ŋgw/ cluster in '-ngui-'. Final /ʃ/"
  },
  {
    id:355, word:"transparent", stress:"trans-PAIR-unt",
    pos:["adjective"],
    defs:{ adjective:"easy to see through; open and honest; without hidden motives" },
    examples:["We believe in transparent communication with clients.","The pricing is completely transparent — no hidden fees."],
    phrases:["be transparent","transparent pricing","transparent process","fully transparent"],
    synonyms:["open","clear","honest","candid"],
    difficulty:"Word stress",
    pronNote:"Stress on 2nd syllable: trans-PAIR-unt. 3 syllables. /eə/ in '-par-'. /æ/ in 'trans-'"
  },
  {
    id:356, word:"revenue", stress:"REV-ih-nyoo",
    pos:["noun"],
    defs:{ noun:"the total income generated by a business or government" },
    examples:["Q3 revenue came in above forecast.","New revenue streams helped offset the decline."],
    phrases:["annual revenue","revenue growth","revenue stream","generate revenue"],
    synonyms:["income","earnings","proceeds","turnover"],
    difficulty:"Word stress",
    pronNote:"Stress on 1st syllable: REV-ih-nyoo. 3 syllables. /v/ not /b/. '-nue' sounds like /njuː/"
  },
  {
    id:357, word:"confidential", stress:"kon-fih-DEN-shul",
    pos:["adjective"],
    defs:{ adjective:"intended to be kept secret; entrusted with private information" },
    examples:["All personnel files are strictly confidential.","Please mark the document as confidential."],
    phrases:["strictly confidential","confidential information","keep confidential","confidential report"],
    synonyms:["secret","private","classified","sensitive"],
    difficulty:"Word stress",
    pronNote:"Stress on 3rd syllable: kon-fih-DEN-shul. 4 syllables. '-tial' = /ʃul/. Don't rush '-den-'"
  },
  {
    id:358, word:"subsidiary", stress:"sub-SID-ee-er-ee",
    pos:["noun","adjective"],
    defs:{ noun:"a company controlled by a larger parent company", adjective:"secondary in importance" },
    examples:["The company has subsidiaries in twelve countries.","This division operates as a wholly owned subsidiary."],
    phrases:["wholly owned subsidiary","subsidiary company","overseas subsidiary","create a subsidiary"],
    synonyms:["affiliate","branch","division","offshoot"],
    difficulty:"Word stress",
    pronNote:"Stress on 2nd syllable: sub-SID-ee-er-ee. 5 syllables. /s/ not /ʃ/ in '-sid-'. Reduce the last two syllables"
  },
  {
    id:359, word:"acknowledge", stress:"ak-NOL-ij",
    pos:["verb"],
    defs:{ verb:"to confirm receipt of; to recognize or accept as true" },
    examples:["Please acknowledge receipt of this memo.","The manager acknowledged the team's hard work."],
    phrases:["acknowledge receipt","widely acknowledged","acknowledge an error","acknowledge a request"],
    synonyms:["confirm","recognize","admit","accept"],
    difficulty:"Silent letter",
    pronNote:"Only 3 syllables: ak-NOL-ij. The 'g' before '-e' is completely silent. Final '-edge' = /ɪdʒ/"
  },
  {
    id:360, word:"supplement", stress:"SUP-luh-munt (n/adj) · SUP-luh-ment (v)",
    pos:["noun","verb"],
    defs:{ noun:"something added to improve or complete; an additional section", verb:"to add to something to improve it" },
    examples:["This document supplements the main report.","She takes vitamin supplements every morning."],
    phrases:["dietary supplement","supplement income","supplement a report","wage supplement"],
    synonyms:["addition","complement","add to","enhance"],
    difficulty:"Word stress",
    pronNote:"Stress on 1st syllable: SUP-luh-munt. 3 syllables. /pl/ cluster — no extra vowel between /p/ and /l/"
  },
  {
    id:361, word:"fluctuate", stress:"FLUK-choo-ayt",
    pos:["verb"],
    defs:{ verb:"to rise and fall irregularly in level or value" },
    examples:["Commodity prices fluctuate daily.","Demand tends to fluctuate with economic conditions."],
    phrases:["prices fluctuate","fluctuate widely","market fluctuation","demand fluctuates"],
    synonyms:["vary","swing","oscillate","shift"],
    difficulty:"Word stress",
    pronNote:"Stress on 1st syllable: FLUK-choo-ayt. 3 syllables. /fl/ blend at start. '-tua-' = /tʃuː/"
  },
  {
    id:362, word:"patron", stress:"PAY-trun",
    pos:["noun"],
    defs:{ noun:"a regular customer; a person who gives financial support to an organization" },
    examples:["We appreciate every patron of this establishment.","The gallery's patrons include several major corporations."],
    phrases:["loyal patron","patron of the arts","valued patron","regular patron"],
    synonyms:["customer","supporter","sponsor","client"],
    difficulty:"Word stress",
    pronNote:"Stress on 1st syllable: PAY-trun. 2 syllables. Long /eɪ/ in 'pay-'. Final /n/ — don't drop it"
  },
  {
    id:363, word:"proposal", stress:"pruh-POH-zul",
    pos:["noun"],
    defs:{ noun:"a formal plan or suggestion put forward for acceptance" },
    examples:["Please submit your proposal by the end of the month.","The merger proposal was approved by shareholders."],
    phrases:["business proposal","submit a proposal","accept a proposal","project proposal"],
    synonyms:["plan","offer","suggestion","bid"],
    difficulty:"R-blend",
    pronNote:"'pr' blend: pruh-POH-zul. /pr/ as one unit. Stress on 2nd syllable. Long /oʊ/ in '-po-'"
  },
  {
    id:364, word:"mandatory", stress:"MAN-duh-tor-ee",
    pos:["adjective"],
    defs:{ adjective:"required by law or authority; compulsory" },
    examples:["Attendance at the induction is mandatory.","A background check is mandatory for this position."],
    phrases:["mandatory training","mandatory attendance","mandatory disclosure","make mandatory"],
    synonyms:["compulsory","required","obligatory","enforced"],
    difficulty:"Vowel /æ/",
    pronNote:"/æ/ in 'man-': MAN-duh-tor-ee. Wide open mouth. 4 syllables, stress on 1st"
  },
  {
    id:365, word:"premises", stress:"PREM-ih-siz",
    pos:["noun"],
    defs:{ noun:"a building and the land belonging to it; business property" },
    examples:["No alcohol is permitted on the premises.","All staff must wear ID badges on the premises."],
    phrases:["on the premises","off the premises","business premises","vacate the premises"],
    synonyms:["property","building","grounds","facility"],
    difficulty:"Word stress",
    pronNote:"Stress on 1st syllable: PREM-ih-siz. 3 syllables. The '-ises' ending = /ɪsɪz/. Don't merge last two syllables"
  },
  {
    id:366, word:"regulatory", stress:"REG-yuh-luh-tor-ee",
    pos:["adjective"],
    defs:{ adjective:"relating to the rules used to control an activity or system" },
    examples:["We must comply with all regulatory requirements.","A regulatory review is scheduled for next quarter."],
    phrases:["regulatory requirements","regulatory compliance","regulatory body","regulatory approval"],
    synonyms:["governing","supervisory","controlling","official"],
    difficulty:"R vs L",
    pronNote:"Initial /r/: REG-yuh-luh-tor-ee. /r/ not /l/. 5 syllables, stress on 1st. Often reduced to 4 syllables"
  },
  {
    id:367, word:"abundant", stress:"uh-BUN-dunt",
    pos:["adjective"],
    defs:{ adjective:"existing or available in large quantities; plentiful" },
    examples:["The region has abundant natural resources.","She showed abundant enthusiasm for the new role."],
    phrases:["abundant resources","abundant supply","in abundant quantities","abundant evidence"],
    synonyms:["plentiful","ample","copious","rich"],
    difficulty:"Word stress",
    pronNote:"Stress on 2nd syllable: uh-BUN-dunt. 3 syllables. /ʌ/ in 'bun-' like 'sun'. Final /t/ stops cleanly"
  },
  {
    id:368, word:"negotiate", stress:"nih-GOH-shee-ayt",
    pos:["verb"],
    defs:{ verb:"to hold discussions with a view to reaching agreement" },
    examples:["The two sides are still negotiating.","She negotiated a better deal than expected."],
    phrases:["negotiate terms","negotiate a price","negotiation skills","hard to negotiate"],
    synonyms:["bargain","broker","discuss","settle"],
    difficulty:"Word stress",
    pronNote:"5 syllables: nih-GOH-shee-ayt. Stress on 2nd. '-tia-' = /ʃ/. The most misspoken word in TOEIC"
  },
  {
    id:369, word:"itinerary", stress:"eye-TIN-uh-rer-ee",
    pos:["noun"],
    defs:{ noun:"a detailed plan or route for a journey or event" },
    examples:["I'll send you the conference itinerary tomorrow.","Please review the travel itinerary before your trip."],
    phrases:["travel itinerary","conference itinerary","detailed itinerary","finalize the itinerary"],
    synonyms:["schedule","agenda","route","travel plan"],
    difficulty:"Word stress",
    pronNote:"Stress on 2nd syllable: eye-TIN-uh-rer-ee. 5 syllables — often reduced to 4 in fast speech: eye-TIN-er-ee"
  },
  {
    id:370, word:"disruption", stress:"dis-RUP-shun",
    pos:["noun"],
    defs:{ noun:"a disturbance that interrupts an event or process" },
    examples:["We apologize for any disruption to your service.","The strike caused significant operational disruption."],
    phrases:["cause disruption","service disruption","avoid disruption","minimal disruption"],
    synonyms:["interruption","disturbance","upheaval","setback"],
    difficulty:"Word stress",
    pronNote:"Stress on 2nd syllable: dis-RUP-shun. 3 syllables. /ʌ/ in '-rup-' like 'cup'. '-tion' = /ʃun/"
  },
  {
    id:371, word:"incorporate", stress:"in-KOR-pur-ayt",
    pos:["verb"],
    defs:{ verb:"to include or absorb into a larger structure; to form a legal corporation" },
    examples:["Please incorporate all feedback into the revised draft.","The company was incorporated in Delaware in 2005."],
    phrases:["incorporate feedback","incorporate changes","fully incorporated","incorporated company"],
    synonyms:["include","integrate","embed","merge"],
    difficulty:"Word stress",
    pronNote:"Stress on 2nd syllable: in-KOR-pur-ayt. 4 syllables. /r/ in '-cor-' is clear. '-ate' = /eɪt/"
  },
  {
    id:372, word:"substantial", stress:"sub-STAN-shul",
    pos:["adjective"],
    defs:{ adjective:"of considerable size, value, or importance; solidly built" },
    examples:["The renovation required a substantial investment.","She has substantial experience in project management."],
    phrases:["substantial investment","substantial improvement","substantial savings","substantial portion"],
    synonyms:["considerable","significant","large","major"],
    difficulty:"Vowel /æ/",
    pronNote:"/æ/ in '-stan-': sub-STAN-shul. Wide open mouth. '-tial' = /ʃul/. 3 syllables, stress on 2nd"
  },
  {
    id:373, word:"circulation", stress:"sur-kyuh-LAY-shun",
    pos:["noun"],
    defs:{ noun:"movement through a closed system; the distribution of a newspaper or document" },
    examples:["The memo was put into circulation this morning.","The magazine has a circulation of 200,000."],
    phrases:["in circulation","put into circulation","wide circulation","circulation figures"],
    synonyms:["distribution","flow","spread","movement"],
    difficulty:"Word stress",
    pronNote:"Stress on 3rd syllable: sur-kyuh-LAY-shun. 4 syllables. /r/ in 'cir-' is clear. '-tion' = /ʃun/"
  },
  {
    id:374, word:"simultaneously", stress:"sy-mul-TAY-nee-us-lee",
    pos:["adverb"],
    defs:{ adverb:"at the same time as something else" },
    examples:["The announcement was made simultaneously in three cities.","She managed two major projects simultaneously."],
    phrases:["occur simultaneously","broadcast simultaneously","run simultaneously","happen simultaneously"],
    synonyms:["at the same time","concurrently","together","at once"],
    difficulty:"Word stress",
    pronNote:"Stress on 3rd syllable: sy-mul-TAY-nee-us-lee. 6 syllables! /aɪ/ at start. Take it one syllable at a time"
  },
  {
    id:375, word:"reimburse", stress:"ree-im-BURSS",
    pos:["verb"],
    defs:{ verb:"to pay someone back for money they have spent" },
    examples:["All receipts must be submitted to be reimbursed.","The company will reimburse up to $1,000 per trip."],
    phrases:["reimburse costs","reimbursement policy","expense reimbursement","reimburse in full"],
    synonyms:["repay","refund","compensate","pay back"],
    difficulty:"Word stress",
    pronNote:"Stress on 3rd syllable: ree-im-BURSS. 3 syllables. /ɜr/ like 'her'. Final /s/ — don't add vowel after"
  },
  {
    id:376, word:"inventory", stress:"IN-ven-tor-ee",
    pos:["noun","verb"],
    defs:{ noun:"a complete list of goods in stock", verb:"to make a stock list" },
    examples:["We conduct a full inventory every January.","Inventory levels are checked daily in the warehouse."],
    phrases:["conduct inventory","inventory management","inventory levels","take inventory"],
    synonyms:["stock","stocklist","supply","catalogue"],
    difficulty:"Word stress",
    pronNote:"Stress on 1st syllable: IN-ven-tor-ee. 4 syllables. Don't stress '-ven-'. Often spoken as 3 syllables: IN-vun-tree"
  },
  {
    id:377, word:"consecutive", stress:"kun-SEK-yuh-tiv",
    pos:["adjective"],
    defs:{ adjective:"following each other in unbroken sequence" },
    examples:["The company reported growth for eight consecutive quarters.","She attended five consecutive seminars."],
    phrases:["consecutive quarters","consecutive days","consecutive wins","three consecutive years"],
    synonyms:["successive","sequential","continuous","unbroken"],
    difficulty:"Word stress",
    pronNote:"5 syllables, stress on 2nd: kun-SEK-yuh-tiv. '-utu-' sounds like /jʊt/. Practice the full rhythm"
  },
  {
    id:378, word:"prerequisite", stress:"pree-REK-wih-zit",
    pos:["noun","adjective"],
    defs:{ noun:"something required as a prior condition", adjective:"required as a prior condition" },
    examples:["A degree is a prerequisite for this position.","Prior experience is a prerequisite for enrollment."],
    phrases:["prerequisite for","meet prerequisites","required prerequisite","list prerequisites"],
    synonyms:["requirement","condition","precondition","necessity"],
    difficulty:"R-blend",
    pronNote:"'pr' blend twice: pree-REK-wih-zit. /pr/ then /r/. Stress on 2nd syllable. 4 syllables. /kw/ cluster inside"
  },
  {
    id:379, word:"audit", stress:"AW-dit",
    pos:["noun","verb"],
    defs:{ noun:"an official financial or compliance inspection", verb:"to conduct an official inspection of accounts" },
    examples:["An external audit is scheduled for next month.","The finance team audits all expenses quarterly."],
    phrases:["conduct an audit","internal audit","tax audit","audit results"],
    synonyms:["inspection","review","examination","check"],
    difficulty:"Word stress",
    pronNote:"Stress on 1st syllable: AW-dit. 2 syllables. /ɔː/ vowel in 'au-' like 'law'. Final /t/ is clean"
  },
  {
    id:380, word:"negotiate", stress:"nih-GOH-shee-ayt",
    pos:["verb"],
    defs:{ verb:"to confer to reach a mutually acceptable agreement" },
    examples:["The teams will negotiate final contract terms tomorrow.","She is skilled at negotiating complex deals."],
    phrases:["negotiate a contract","negotiating table","reach a negotiated settlement","skilled negotiator"],
    synonyms:["bargain","broker","mediate","arrange"],
    difficulty:"Word stress",
    pronNote:"5 syllables: nih-GOH-shee-ayt. Stress on 2nd. '-tia-' = /ʃ/. Say it slowly first, then at natural pace"
  },
  {
    id:381, word:"obligation", stress:"ob-lih-GAY-shun",
    pos:["noun"],
    defs:{ noun:"a duty, moral responsibility, or binding commitment" },
    examples:["We have an obligation to our customers.","There is no obligation to purchase after the trial."],
    phrases:["legal obligation","no obligation","contractual obligation","fulfill an obligation"],
    synonyms:["duty","responsibility","commitment","requirement"],
    difficulty:"Word stress",
    pronNote:"Stress on 3rd syllable: ob-lih-GAY-shun. 4 syllables. '-tion' = /ʃun/. /b/ — not /v/"
  },
  {
    id:382, word:"streamline", stress:"STREEM-lyn",
    pos:["verb","adjective"],
    defs:{ verb:"to make a system or organization more efficient by removing unnecessary steps", adjective:"having a smooth, efficient form" },
    examples:["We need to streamline the approval process.","The new software streamlines expense reporting."],
    phrases:["streamline operations","streamline processes","streamline workflow","streamlined design"],
    synonyms:["simplify","optimize","modernize","smooth"],
    difficulty:"R-blend",
    pronNote:"'str' cluster: STREEM-lyn. /str/ as one unit — no extra vowel. Long /iː/ in '-ream'. 2 syllables"
  },
  {
    id:383, word:"simultaneously", stress:"sy-mul-TAY-nee-us-lee",
    pos:["adverb"],
    defs:{ adverb:"happening or done at the same time" },
    examples:["Both press releases were issued simultaneously.","The software processes multiple requests simultaneously."],
    phrases:["work simultaneously","release simultaneously","broadcast simultaneously","occur simultaneously"],
    synonyms:["concurrently","at once","together","at the same time"],
    difficulty:"Word stress",
    pronNote:"Stress on 3rd syllable: sy-mul-TAY-nee-us-lee. 6 syllables! Long /eɪ/ in '-tay-'. Very advanced word"
  },
  {
    id:384, word:"brochure", stress:"broh-SHOOR",
    pos:["noun"],
    defs:{ noun:"a small booklet giving information about a product, service, or event" },
    examples:["Please collect a brochure from the reception desk.","We redesigned our product brochure for the trade show."],
    phrases:["product brochure","download a brochure","company brochure","travel brochure"],
    synonyms:["pamphlet","leaflet","booklet","flyer"],
    difficulty:"R-blend",
    pronNote:"'br' blend: broh-SHOOR. /br/ as one unit. /ʃ/ in '-chure'. Long /uː/ at end. 2 syllables, stress on 2nd"
  },
  {
    id:385, word:"expedite", stress:"EK-spih-dyt",
    pos:["verb"],
    defs:{ verb:"to make something happen sooner or more quickly" },
    examples:["Can you expedite the delivery of this order?","We will do our best to expedite the review process."],
    phrases:["expedite delivery","expedite a request","expedited shipping","expedite the process"],
    synonyms:["speed up","accelerate","fast-track","hasten"],
    difficulty:"Word stress",
    pronNote:"Stress on 1st syllable: EK-spih-dyt. 3 syllables. /ks/ in 'ex-'. Long /aɪ/ at end"
  },
  {
    id:386, word:"reimburse", stress:"ree-im-BURSS",
    pos:["verb"],
    defs:{ verb:"to pay back money to someone who spent it for you" },
    examples:["You will be reimbursed for all pre-approved expenses.","Please keep receipts in order to be reimbursed."],
    phrases:["reimburse employees","reimbursement form","expense reimbursement","full reimbursement"],
    synonyms:["repay","refund","compensate","make whole"],
    difficulty:"Word stress",
    pronNote:"Stress on 3rd syllable: ree-im-BURSS. 3 syllables. /ɜr/ like 'her'. Critical TOEIC vocabulary — master it"
  },
  {
    id:387, word:"enterprise", stress:"EN-tur-pryz",
    pos:["noun"],
    defs:{ noun:"a business or company; a bold initiative or project" },
    examples:["She founded a successful small enterprise.","Free enterprise drives innovation and growth."],
    phrases:["business enterprise","free enterprise","enterprise software","small enterprise"],
    synonyms:["business","company","venture","initiative"],
    difficulty:"Word stress",
    pronNote:"Stress on 1st syllable: EN-tur-pryz. 3 syllables. 'pr' blend inside: /pr/ as one unit"
  },
  {
    id:388, word:"coordinate", stress:"koh-OR-dih-nayt",
    pos:["verb"],
    defs:{ verb:"to bring the different elements of a complex activity into a harmonious relationship" },
    examples:["She coordinates the schedules of all five regional offices.","Please coordinate with the logistics team."],
    phrases:["coordinate efforts","coordinate a response","coordinate with","event coordinator"],
    synonyms:["organize","manage","arrange","align"],
    difficulty:"Word stress",
    pronNote:"Stress on 2nd syllable: koh-OR-dih-nayt. 4 syllables. /r/ in '-or-' is clear. Don't rush the middle"
  },
  {
    id:389, word:"comply", stress:"kum-PLY",
    pos:["verb"],
    defs:{ verb:"to act in accordance with rules, wishes, or requests" },
    examples:["All staff must comply with the new health regulations.","Failure to comply may result in penalties."],
    phrases:["comply with regulations","comply with standards","failure to comply","fully comply"],
    synonyms:["obey","follow","adhere","conform"],
    difficulty:"Final consonant",
    pronNote:"Final /aɪ/: kum-PLY — long diphthong, rhymes with 'fly'. 2 syllables, stress on 2nd. /pl/ blend"
  },
  {
    id:390, word:"compensate", stress:"KOM-pun-sayt",
    pos:["verb"],
    defs:{ verb:"to give something to make up for a loss, injury, or disadvantage" },
    examples:["The company compensated customers affected by the delay.","We will compensate you for your overtime hours."],
    phrases:["compensate for","compensate employees","compensate fully","financial compensation"],
    synonyms:["pay","reimburse","make up for","reward"],
    difficulty:"Word stress",
    pronNote:"Stress on 1st syllable: KOM-pun-sayt. 3 syllables. /ɒ/ in 'com-' like 'top'. '-ate' = /eɪt/"
  },
  {
    id:391, word:"relevant", stress:"REL-uh-vunt",
    pos:["adjective"],
    defs:{ adjective:"closely connected to the matter at hand; appropriate to the current situation" },
    examples:["Please include only relevant information in your report.","Do you have relevant experience for this role?"],
    phrases:["relevant experience","relevant skills","highly relevant","relevant information"],
    synonyms:["applicable","pertinent","related","appropriate"],
    difficulty:"Word stress",
    pronNote:"Stress on 1st syllable: REL-uh-vunt. 3 syllables. '-ant' ending is unstressed: /ənt/. /v/ not /b/"
  },
  {
    id:392, word:"collaborate", stress:"kuh-LAB-uh-rayt",
    pos:["verb"],
    defs:{ verb:"to work jointly with others on a project or task" },
    examples:["Our teams collaborate across three time zones.","They collaborated on the joint report."],
    phrases:["collaborate with","collaborate on a project","close collaboration","collaborate effectively"],
    synonyms:["cooperate","partner","team up","work together"],
    difficulty:"Vowel /æ/",
    pronNote:"/æ/ in '-lab-': kuh-LAB-uh-rayt. Wide open mouth — like 'lab'. Not kuh-LOB. Stress on 2nd syllable"
  },
  {
    id:393, word:"initiative", stress:"ih-NISH-uh-tiv",
    pos:["noun"],
    defs:{ noun:"a new plan or program; the capacity to act independently" },
    examples:["A new sustainability initiative was announced today.","Managers who show initiative are fast-tracked."],
    phrases:["take initiative","strategic initiative","new initiative","show initiative"],
    synonyms:["plan","program","drive","enterprise"],
    difficulty:"Word stress",
    pronNote:"5 syllables, stress on 2nd: ih-NISH-uh-tiv. '-tia-' = /ʃ/. Say it: ih … NISH … uh … tiv"
  },
  {
    id:394, word:"procurement", stress:"pruh-KYOOR-munt",
    pos:["noun"],
    defs:{ noun:"the process of obtaining goods or services for an organization" },
    examples:["The procurement team handles all vendor contracts.","Efficient procurement reduces overhead costs significantly."],
    phrases:["procurement process","procurement team","strategic procurement","procurement costs"],
    synonyms:["purchasing","acquisition","sourcing","buying"],
    difficulty:"R-blend",
    pronNote:"'pr' blend: pruh-KYOOR-munt. /pr/ as one unit. Long /uː/ in '-kyoor-'. Stress on 2nd syllable"
  },
  {
    id:395, word:"fluctuation", stress:"fluk-choo-AY-shun",
    pos:["noun"],
    defs:{ noun:"an irregular variation in level, price, or amount" },
    examples:["Currency fluctuations affected our import costs.","Seasonal fluctuations in demand are normal."],
    phrases:["price fluctuation","market fluctuation","currency fluctuation","seasonal fluctuation"],
    synonyms:["variation","swing","change","instability"],
    difficulty:"Word stress",
    pronNote:"Stress on 3rd syllable: fluk-choo-AY-shun. 4 syllables. '-tua-' = /tʃuː/. '-tion' = /ʃun/"
  },
  {
    id:396, word:"eligibility", stress:"el-ih-jih-BIL-ih-tee",
    pos:["noun"],
    defs:{ noun:"the quality of being eligible; fulfillment of the conditions required" },
    examples:["Please check your eligibility before applying.","Eligibility criteria are listed on the application form."],
    phrases:["check eligibility","eligibility criteria","confirm eligibility","eligibility requirements"],
    synonyms:["qualification","suitability","entitlement","fitness"],
    difficulty:"Word stress",
    pronNote:"Stress on 4th syllable: el-ih-jih-BIL-ih-tee. 6 syllables! /dʒ/ sound in '-gi-'. Take it slowly"
  },
  {
    id:397, word:"renovation", stress:"ren-uh-VAY-shun",
    pos:["noun"],
    defs:{ noun:"the process of improving or updating a building or system" },
    examples:["The office renovation will be complete by March.","The renovation project came in under budget."],
    phrases:["office renovation","under renovation","renovation costs","complete a renovation"],
    synonyms:["refurbishment","restoration","upgrade","remodeling"],
    difficulty:"Word stress",
    pronNote:"Stress on 3rd syllable: ren-uh-VAY-shun. 4 syllables. '-tion' = /ʃun/. /r/ at start — not /l/"
  },
  {
    id:398, word:"outstanding", stress:"owt-STAN-ding",
    pos:["adjective"],
    defs:{ adjective:"exceptionally good; not yet paid or resolved" },
    examples:["The team delivered outstanding results this year.","There are several outstanding payments to resolve."],
    phrases:["outstanding performance","outstanding balance","outstanding issues","settle outstanding debts"],
    synonyms:["excellent","unpaid","exceptional","overdue"],
    difficulty:"Vowel /æ/",
    pronNote:"/æ/ in '-stand-': owt-STAN-ding. Wide open mouth. Stress on 2nd syllable. 3 syllables"
  },
  {
    id:399, word:"stringent", stress:"STRIN-junt",
    pos:["adjective"],
    defs:{ adjective:"strict, precise, and exacting; rigorously enforced" },
    examples:["The new environmental standards are highly stringent.","Stringent quality controls are applied at every stage."],
    phrases:["stringent requirements","stringent standards","stringent controls","stringent regulations"],
    synonyms:["strict","rigorous","demanding","exacting"],
    difficulty:"Word stress",
    pronNote:"Stress on 1st syllable: STRIN-junt. 2 syllables. /str/ cluster — no extra vowels. /dʒ/ in '-gent'"
  },
  {
    id:400, word:"coincide", stress:"koh-in-SYD",
    pos:["verb"],
    defs:{ verb:"to occur at the same time; to correspond in nature or position" },
    examples:["The conference dates coincide with the trade expo.","Our findings coincide exactly with the earlier data."],
    phrases:["coincide with","dates coincide","schedules coincide","happen to coincide"],
    synonyms:["overlap","correspond","align","match"],
    difficulty:"Word stress",
    pronNote:"Stress on 3rd syllable: koh-in-SYD. 3 syllables. Long /aɪ/ in '-cide'. Final /d/ — don't drop it"
  },
```

---

## After adding the data

1. Update the header comment to:
   ```js
   // 400 MOST IMPORTANT TOEIC WORDS  (fastvoca rank-000 to rank-300 order)
   ```

2. **No other changes needed.** The component handles any array length automatically — filters, navigation, progress bar, and jump selector all scale dynamically.

3. Sanity check: `TOEIC_WORDS.length` should equal `400`.

---

## Notes for Cursor

- Append only — do not restructure any existing entries or JSX.
- Schema is identical to all previous entries.
- Some words appear across batches with different `id` values — this is intentional (TOEIC ranks the same word in multiple tiers).
- Do not modify any styles, state, or component logic.
