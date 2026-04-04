import type { ToeicWord } from './toeicWordTypes';
import { phraseJaFor } from './toeicPhrasesJa';

/** Raw import from TOEICVocabCard (1).jsx — stress hints + English tips (IPA stripped for display). */
export type RawToeicWord = {
  id: number;
  word: string;
  stress: string;
  pos: string[];
  defs: Record<string, string>;
  examples: string[];
  phrases: string[];
  synonyms: string[];
  difficulty: string;
  pronNote: string;
};

export const RAW_TOEIC_WORDS: RawToeicWord[] = [
  {
    id:1, word:"preserve", stress:"pri-ZERV",
    pos:["verb","noun"],
    defs:{ verb:"to keep safe, to protect", noun:"food preserved in jars; a protected area" },
    examples:["We must preserve the environment.","This forest is a wildlife preserve."],
    phrases:["preserve the environment","preserve history","preserve data"],
    synonyms:["protect","maintain","conserve","safeguard"],
    difficulty:"R-blend",
    pronNote:"'pr' is ONE blend — no vowel between /p/ and /r/: pri-ZERV, not pu-ri-ZERV"
  },
  {
    id:2, word:"promote", stress:"pruh-MOTE",
    pos:["verb"],
    defs:{ verb:"to support or advertise; to advance someone in rank" },
    examples:["They promote the product online.","She was promoted to senior manager."],
    phrases:["promote a product","promote teamwork","get promoted"],
    synonyms:["advertise","advance","boost","support"],
    difficulty:"R-blend",
    pronNote:"'pr' blend at start: pruh-MOTE. Final 't' stops cleanly — don't add /u/ after it"
  },
  {
    id:3, word:"respective", stress:"ri-SPEK-tiv",
    pos:["adjective"],
    defs:{ adjective:"belonging separately to each one mentioned" },
    examples:["They returned to their respective offices.","Each team member has their respective duties."],
    phrases:["respective roles","respective responsibilities","their respective fields"],
    synonyms:["individual","separate","corresponding","own"],
    difficulty:"R vs L",
    pronNote:"Starts with /r/ — curl tongue back, don't touch the roof: ri-SPEK-tiv, not li-SPEK-tiv"
  },
  {
    id:4, word:"proceed", stress:"pruh-SEED",
    pos:["verb"],
    defs:{ verb:"to go forward; to continue doing something" },
    examples:["Please proceed with the presentation.","You may proceed to the checkout counter."],
    phrases:["proceed with caution","proceed to checkout","proceed as planned"],
    synonyms:["continue","advance","go ahead","move forward"],
    difficulty:"Long vowel",
    pronNote:"The '-ceed' has a long /iː/ vowel — hold it: pruh-SEEED. Don't shorten to /ɪ/"
  },
  {
    id:5, word:"imperative", stress:"im-PER-uh-tiv",
    pos:["adjective","noun"],
    defs:{ adjective:"of vital importance, absolutely necessary", noun:"an essential or urgent thing" },
    examples:["It is imperative that we file on time.","Cost reduction is a business imperative."],
    phrases:["imperative need","moral imperative","it is imperative that"],
    synonyms:["essential","crucial","vital","necessary"],
    difficulty:"Word stress",
    pronNote:"Stress falls on the 2nd syllable: im-PER-uh-tiv. Don't stress the 'im' at the start"
  },
  {
    id:6, word:"beverage", stress:"BEV-uh-rij",
    pos:["noun"],
    defs:{ noun:"any drink, especially one other than water" },
    examples:["Would you like a hot beverage?","Alcoholic beverages are not permitted on site."],
    phrases:["order a beverage","serve beverages","alcoholic beverage","hot beverage"],
    synonyms:["drink","refreshment","liquid"],
    difficulty:"Word stress",
    pronNote:"3 syllables, stress on 1st: BEV-uh-rij. Japanese learners often add a 4th syllable — resist it"
  },
  {
    id:7, word:"inventory", stress:"IN-ven-tor-ee",
    pos:["noun","verb"],
    defs:{ noun:"a detailed list of stock or goods on hand", verb:"to make an itemized list of goods" },
    examples:["We need to conduct a full inventory.","The warehouse is inventoried every quarter."],
    phrases:["conduct an inventory","maintain inventory","inventory check","take inventory"],
    synonyms:["stock","stocklist","catalogue","supply count"],
    difficulty:"Word stress",
    pronNote:"4 syllables, stress on 1st: IN-ven-tor-ee. Don't stress 'ven' — keep it short"
  },
  {
    id:8, word:"eligible", stress:"EL-ih-jih-bul",
    pos:["adjective"],
    defs:{ adjective:"satisfying conditions required; qualified to be chosen" },
    examples:["Are you eligible for the promotion?","Only full-time staff are eligible to vote."],
    phrases:["eligible for a position","eligible to apply","eligible candidate","eligible for benefits"],
    synonyms:["qualified","suitable","entitled","permitted"],
    difficulty:"Word stress",
    pronNote:"Stress on 1st syllable: EL-ih-jih-bul. The 'g' makes a soft /dʒ/ sound like 'judge'"
  },
  {
    id:9, word:"equip", stress:"ih-KWIP",
    pos:["verb"],
    defs:{ verb:"to supply someone with necessary tools or skills" },
    examples:["We need to equip the team with better tools.","The seminar equips participants with key skills."],
    phrases:["equip with tools","equip a team","well-equipped","fully equipped office"],
    synonyms:["supply","furnish","provide","outfit"],
    difficulty:"Final consonant",
    pronNote:"Final /p/ — close both lips firmly and stop: ih-KWIP. Don't add /u/ after it"
  },
  {
    id:10, word:"inform", stress:"in-FORM",
    pos:["verb"],
    defs:{ verb:"to give information; to notify someone officially" },
    examples:["Please inform all staff of the schedule change.","We were informed about the delay by email."],
    phrases:["inform someone of","keep informed","inform in advance","be informed"],
    synonyms:["notify","tell","advise","alert"],
    difficulty:"Final consonant",
    pronNote:"Final /m/ — lips close fully: in-FORM. Not in-FO-mu. The /r/ before /m/ is light"
  },
  {
    id:11, word:"banquet", stress:"BANK-wit",
    pos:["noun","verb"],
    defs:{ noun:"a large, formal, elaborate meal for many people", verb:"to hold or attend a feast" },
    examples:["The annual awards banquet is on Friday.","We banqueted to celebrate the company's 50th year."],
    phrases:["attend a banquet","host a banquet","banquet hall","annual banquet"],
    synonyms:["feast","formal dinner","gala","reception"],
    difficulty:"Vowel /æ/",
    pronNote:"/æ/ in the first syllable — mouth wide open like 'bad': BANK-wit, not BONK-wit"
  },
  {
    id:12, word:"commission", stress:"kuh-MISH-un",
    pos:["noun","verb"],
    defs:{ noun:"a fee paid for a service; a group given authority", verb:"to formally order or authorize work" },
    examples:["She earns a 12% sales commission.","The city commissioned a new sculpture."],
    phrases:["sales commission","commission fee","on commission","commission a report"],
    synonyms:["fee","payment","authorize","appoint"],
    difficulty:"Word stress",
    pronNote:"Stress on 2nd syllable: kuh-MISH-un. The '-ssi-' makes a /ʃ/ sound — like 'fish'"
  },
  {
    id:13, word:"portable", stress:"POR-tuh-bul",
    pos:["adjective","noun"],
    defs:{ adjective:"designed to be easily carried or moved", noun:"a portable device or object" },
    examples:["A portable charger is essential for travel.","She bought a portable Bluetooth speaker."],
    phrases:["portable device","portable charger","portable speaker","portable solution"],
    synonyms:["lightweight","mobile","handheld","compact"],
    difficulty:"Word stress",
    pronNote:"Stress on 1st syllable: POR-tuh-bul. Don't over-stress '-able' at the end"
  },
  {
    id:14, word:"presence", stress:"PREZ-unss",
    pos:["noun"],
    defs:{ noun:"the state of being present; personal bearing or impression" },
    examples:["Your presence is required at the board meeting.","She has a commanding presence on stage."],
    phrases:["in someone's presence","make your presence known","online presence","presence of mind"],
    synonyms:["attendance","existence","appearance","aura"],
    difficulty:"R-blend",
    pronNote:"'pr' blend: PREZ-unss. No vowel between /p/ and /r/ — treat them as one unit"
  },
  {
    id:15, word:"launch", stress:"LAWNCH",
    pos:["noun","verb"],
    defs:{ noun:"the introduction of a new product or service", verb:"to introduce or start something" },
    examples:["The product launch exceeded all expectations.","They launched a new mobile app last month."],
    phrases:["product launch","launch a campaign","launch date","soft launch"],
    synonyms:["introduction","release","start","debut"],
    difficulty:"Vowel length",
    pronNote:"Long /ɔː/ vowel — like 'law' or 'dawn': LAWNCH. Not LANCH with a short /æ/"
  },
  {
    id:16, word:"executive", stress:"ig-ZEK-yuh-tiv",
    pos:["adjective","noun"],
    defs:{ adjective:"relating to senior management", noun:"a person with senior managerial authority" },
    examples:["She joined the company as a top executive.","He made an executive decision to close the branch."],
    phrases:["executive decision","executive board","chief executive","executive suite"],
    synonyms:["manager","director","senior officer","administrator"],
    difficulty:"Word stress",
    pronNote:"Stress on 2nd syllable: ig-ZEK-yuh-tiv. Note the /gz/ sound: ig-ZEK, not ek-ZEK"
  },
  {
    id:17, word:"resume", stress:"REZ-yoo-may (n) · rih-ZOOM (v)",
    pos:["noun","verb"],
    defs:{ noun:"a document summarizing work history and qualifications (CV)", verb:"to begin again after stopping" },
    examples:["Please email your resume before the interview.","Work will resume after the lunch break."],
    phrases:["submit a resume","resume operations","resume work","update your resume"],
    synonyms:["CV","curriculum vitae","continue","restart"],
    difficulty:"Word stress",
    pronNote:"Two totally different pronunciations! Noun: REZ-yoo-may (3 syllables). Verb: rih-ZOOM (2 syllables)"
  },
  {
    id:18, word:"cover", stress:"KUV-ur",
    pos:["noun","verb"],
    defs:{ noun:"something that goes over or protects another thing", verb:"to place something over; to deal with a topic" },
    examples:["The report covers all key financial metrics.","She covered her face with her hands."],
    phrases:["cover a topic","cover expenses","cover letter","insurance cover"],
    synonyms:["lid","top","protect","include"],
    difficulty:"Final consonant",
    pronNote:"Final /r/ in American English — tongue tip curls back slightly: KUV-ur. Not KUV-a"
  },
  {
    id:19, word:"associate", stress:"uh-SOH-shee-ayt (v) · uh-SOH-shee-it (n)",
    pos:["verb","noun","adjective"],
    defs:{ verb:"to connect or link in one's mind; to work with", noun:"a colleague or partner", adjective:"having partial status" },
    examples:["I associate this brand with quality.","She is a business associate of mine."],
    phrases:["associate with","business associate","associate member","associate professor"],
    synonyms:["colleague","partner","connect","link"],
    difficulty:"Word stress",
    pronNote:"Verb: uh-SOH-shee-AYT (4 syllables, stress on 2nd). Noun: uh-SOH-shee-it. The stress shifts!"
  },
  {
    id:20, word:"direct", stress:"dih-REKT",
    pos:["adjective","verb","adverb"],
    defs:{ adjective:"going straight from one point to another; frank", verb:"to manage or aim something", adverb:"in a straight line" },
    examples:["Please send it direct to the client.","She directed the team through the crisis."],
    phrases:["direct contact","direct route","direct someone","direct flight"],
    synonyms:["straight","manage","guide","frank"],
    difficulty:"Final consonant",
    pronNote:"Final /t/ stops cleanly: dih-REKT. Don't add a vowel after. Both /d/ sounds are voiced"
  },
  {
    id:21, word:"grant", stress:"GRANT",
    pos:["noun","verb"],
    defs:{ noun:"a sum of money given for a purpose, especially by government or an institution", verb:"to formally give or allow" },
    examples:["She received a research grant.","The manager granted her request for extra leave."],
    phrases:["grant permission","grant a request","research grant","grant access"],
    synonyms:["award","allowance","give","permit"],
    difficulty:"Vowel /æ/",
    pronNote:"/æ/ vowel — mouth wide open like 'cat': GRANT. Not GRONT. One syllable, clean /t/ at end"
  },
  {
    id:22, word:"reserve", stress:"rih-ZERV",
    pos:["noun","verb"],
    defs:{ noun:"a supply kept for future use; a reserved quality", verb:"to book or set aside in advance" },
    examples:["We keep a cash reserve for emergencies.","Please reserve a table for four."],
    phrases:["reserve a seat","reserve a room","in reserve","nature reserve"],
    synonyms:["book","set aside","supply","store"],
    difficulty:"R vs L",
    pronNote:"Starts AND ends with /r/: rih-ZERV. Make sure both are clear /r/, not /l/. /ɜː/ vowel like 'her'"
  },
  {
    id:23, word:"withdraw", stress:"with-DRAW",
    pos:["verb"],
    defs:{ verb:"to take back or remove; to take money from a bank account" },
    examples:["I need to withdraw cash from the ATM.","She withdrew her complaint after the meeting."],
    phrases:["withdraw money","withdraw a statement","withdraw from","cash withdrawal"],
    synonyms:["remove","take out","pull out","retract"],
    difficulty:"TH sound",
    pronNote:"'-th-' in the middle: /ð/ (voiced) — tongue between teeth, not 'with-DRAW' with /d/"
  },
  {
    id:24, word:"versatile", stress:"VUR-suh-til",
    pos:["adjective"],
    defs:{ adjective:"able to adapt to many different functions or activities" },
    examples:["She is a versatile employee who can handle many tasks.","This software is versatile and easy to use."],
    phrases:["versatile tool","versatile performer","versatile skill set","versatile approach"],
    synonyms:["adaptable","flexible","multi-skilled","all-around"],
    difficulty:"Word stress",
    pronNote:"Stress on 1st syllable: VUR-suh-til. The final '-ile' is reduced to /ɪl/ in American English"
  },
  {
    id:25, word:"contribute", stress:"kun-TRIB-yoot",
    pos:["verb"],
    defs:{ verb:"to give or provide a part of something; to help cause a result" },
    examples:["Everyone is expected to contribute to the project.","Stress can contribute to health problems."],
    phrases:["contribute to","contribute ideas","make a contribution","contribute funds"],
    synonyms:["give","donate","add","provide"],
    difficulty:"R-blend",
    pronNote:"'tr' blend inside: kun-TRIB-yoot. No extra vowel between /t/ and /r/. Stress on 2nd syllable"
  },
  {
    id:26, word:"negotiate", stress:"nih-GOH-shee-ayt",
    pos:["verb"],
    defs:{ verb:"to discuss terms in order to reach a mutual agreement" },
    examples:["We need to negotiate a better contract.","The two parties negotiated for three hours."],
    phrases:["negotiate a deal","negotiate terms","negotiate a salary","open to negotiation"],
    synonyms:["bargain","discuss","mediate","broker"],
    difficulty:"Word stress",
    pronNote:"Stress on 2nd syllable: nih-GOH-shee-ayt. The '-tia-' sounds like /ʃ/ — like 'she'"
  },
  {
    id:27, word:"accomplish", stress:"uh-KOM-plish",
    pos:["verb"],
    defs:{ verb:"to successfully complete a task or achieve a goal" },
    examples:["We accomplished our sales target this quarter.","What did you accomplish in your last role?"],
    phrases:["accomplish a goal","mission accomplished","accomplish tasks","accomplish objectives"],
    synonyms:["achieve","complete","fulfill","attain"],
    difficulty:"Word stress",
    pronNote:"Stress on 2nd syllable: uh-KOM-plish. Final /ʃ/ sound — like 'fish'. Don't add extra vowel"
  },
  {
    id:28, word:"proposal", stress:"pruh-POH-zul",
    pos:["noun"],
    defs:{ noun:"a formal plan or suggestion put forward for consideration" },
    examples:["They submitted a detailed business proposal.","The board accepted the proposal unanimously."],
    phrases:["business proposal","submit a proposal","proposal review","reject a proposal"],
    synonyms:["plan","suggestion","offer","bid"],
    difficulty:"R-blend",
    pronNote:"'pr' blend: pruh-POH-zul. No vowel between /p/ and /r/. Stress on 2nd syllable"
  },
  {
    id:29, word:"accommodate", stress:"uh-KOM-uh-dayt",
    pos:["verb"],
    defs:{ verb:"to provide with lodging or space; to adapt to a need or request" },
    examples:["The conference center can accommodate 300 guests.","We will try to accommodate your schedule."],
    phrases:["accommodate guests","accommodate a request","accommodate changes","fully accommodate"],
    synonyms:["house","adjust","adapt","cater to"],
    difficulty:"Word stress",
    pronNote:"5 syllables: uh-KOM-uh-dayt. Stress on 2nd syllable. Double 'c' and double 'm' — common spelling trap too"
  },
  {
    id:30, word:"collaborate", stress:"kuh-LAB-uh-rayt",
    pos:["verb"],
    defs:{ verb:"to work jointly with others on a project or task" },
    examples:["Our teams collaborate across time zones.","The two companies collaborated on the new design."],
    phrases:["collaborate on","collaborate with","close collaboration","collaborate effectively"],
    synonyms:["cooperate","partner","team up","work together"],
    difficulty:"Vowel /æ/",
    pronNote:"/æ/ in '-lab-': kuh-LAB-uh-rayt. Mouth wide open like 'lab'. Not kuh-LOB"
  },
  {
    id:31, word:"allocate", stress:"AL-uh-kayt",
    pos:["verb"],
    defs:{ verb:"to distribute resources or duties for a specific purpose" },
    examples:["We allocated 30% of the budget to marketing.","Time has been allocated for Q&A."],
    phrases:["allocate budget","allocate resources","allocate time","allocate funds"],
    synonyms:["assign","distribute","allot","designate"],
    difficulty:"Vowel /æ/",
    pronNote:"Initial /æ/: AL-uh-kayt. Wide open mouth for the first syllable. Not OL-uh-kayt"
  },
  {
    id:32, word:"mandatory", stress:"MAN-duh-tor-ee",
    pos:["adjective"],
    defs:{ adjective:"required by law, rules, or authority; compulsory" },
    examples:["Attendance at the safety briefing is mandatory.","A background check is mandatory for this role."],
    phrases:["mandatory training","mandatory attendance","mandatory requirement","mandatory review"],
    synonyms:["compulsory","required","obligatory","necessary"],
    difficulty:"Vowel /æ/",
    pronNote:"/æ/ in 'man-': MAN-duh-tor-ee. Wide open mouth like 'man'. 4 syllables, stress on 1st"
  },
  {
    id:33, word:"reimburse", stress:"ree-im-BURSS",
    pos:["verb"],
    defs:{ verb:"to repay money that someone has spent on your behalf" },
    examples:["The company will reimburse all travel expenses.","Please keep receipts to be reimbursed."],
    phrases:["reimburse expenses","fully reimbursed","reimburse travel costs","expense reimbursement"],
    synonyms:["repay","refund","compensate","pay back"],
    difficulty:"Word stress",
    pronNote:"3 syllables, stress on last: ree-im-BURSS. /ɜː/ vowel like 'her'. Don't confuse with 'reimpose'"
  },
  {
    id:34, word:"regulations", stress:"reg-yoo-LAY-shunz",
    pos:["noun"],
    defs:{ noun:"official rules made by an authority to control conduct" },
    examples:["All employees must comply with health and safety regulations.","New data privacy regulations came into effect this year."],
    phrases:["comply with regulations","safety regulations","government regulations","violate regulations"],
    synonyms:["rules","laws","guidelines","requirements"],
    difficulty:"R vs L",
    pronNote:"Starts with /r/: reg-yoo-LAY-shunz. Stress on 3rd syllable. Don't substitute /l/ for initial /r/"
  },
  {
    id:35, word:"effective", stress:"ih-FEK-tiv",
    pos:["adjective"],
    defs:{ adjective:"producing the desired result; operative from a certain time" },
    examples:["The new procedure is more effective.","The policy is effective immediately."],
    phrases:["highly effective","effective immediately","cost-effective","effective strategy"],
    synonyms:["successful","efficient","productive","operational"],
    difficulty:"Word stress",
    pronNote:"Stress on 2nd syllable: ih-FEK-tiv. Clear /k/ sound before '-tiv'. 3 syllables"
  },
  {
    id:36, word:"acknowledge", stress:"ak-NOL-ij",
    pos:["verb"],
    defs:{ verb:"to confirm receipt of; to recognize or accept as true" },
    examples:["Please acknowledge receipt of this email.","She acknowledged the error in the report."],
    phrases:["acknowledge receipt","acknowledge a mistake","widely acknowledged","acknowledge a request"],
    synonyms:["confirm","recognize","admit","accept"],
    difficulty:"Silent letter",
    pronNote:"The 'k' after 'ac' is part of /k/ sound: ak-NOL-ij. Only 3 syllables. The 'e' at the end is silent"
  },
  {
    id:37, word:"available", stress:"uh-VAY-luh-bul",
    pos:["adjective"],
    defs:{ adjective:"able to be used, obtained, or reached; not occupied" },
    examples:["Is the conference room available at 3pm?","The product will be available from next month."],
    phrases:["readily available","available position","available for comment","make available"],
    synonyms:["accessible","free","obtainable","on hand"],
    difficulty:"Word stress",
    pronNote:"4 syllables, stress on 2nd: uh-VAY-luh-bul. The '-able' ending is reduced: /əbl/"
  },
  {
    id:38, word:"acquire", stress:"uh-KWIRE",
    pos:["verb"],
    defs:{ verb:"to come to possess or obtain; to develop a skill or habit" },
    examples:["The company acquired a smaller startup.","She acquired excellent project management skills."],
    phrases:["acquire skills","acquire a company","merger and acquisition","acquire knowledge"],
    synonyms:["obtain","gain","purchase","develop"],
    difficulty:"Word stress",
    pronNote:"Stress on 2nd syllable: uh-KWIRE. /kw/ cluster at start of 2nd syllable — don't split it"
  },
  {
    id:39, word:"retain", stress:"rih-TAYN",
    pos:["verb"],
    defs:{ verb:"to keep possession of; to hire a professional for a fee" },
    examples:["The company wants to retain its best talent.","He retained a lawyer to handle the case."],
    phrases:["retain employees","retain information","staff retention","retain a lawyer"],
    synonyms:["keep","hold","maintain","preserve"],
    difficulty:"R vs L",
    pronNote:"Starts with /r/: rih-TAYN. /r/ not /l/. Stress on 2nd syllable. Long /eɪ/ vowel"
  },
  {
    id:40, word:"distribute", stress:"dih-STRIB-yoot",
    pos:["verb"],
    defs:{ verb:"to give out shares of something; to spread over an area" },
    examples:["Please distribute the handouts to all attendees.","The company distributes goods across 30 countries."],
    phrases:["distribute materials","distribute profits","distribution network","widely distributed"],
    synonyms:["hand out","deliver","spread","circulate"],
    difficulty:"Word stress",
    pronNote:"Stress on 2nd syllable: dih-STRIB-yoot. /str/ cluster — no extra vowel inside: not dih-su-TRIB"
  },
  {
    id:41, word:"revenue", stress:"REV-ih-nyoo",
    pos:["noun"],
    defs:{ noun:"the total income generated by a business or government" },
    examples:["Annual revenue increased by 18% this year.","Tax revenue funds public services."],
    phrases:["annual revenue","generate revenue","revenue growth","revenue stream"],
    synonyms:["income","earnings","proceeds","turnover"],
    difficulty:"Word stress",
    pronNote:"Stress on 1st syllable: REV-ih-nyoo. 3 syllables. Final '-nue' sounds like /njuː/ — like 'new'"
  },
  {
    id:42, word:"conduct", stress:"KON-dukt (n) · kun-DUKT (v)",
    pos:["noun","verb"],
    defs:{ noun:"the way a person behaves; the manner of managing an activity", verb:"to organize and carry out; to behave in a certain way" },
    examples:["His professional conduct impressed the panel.","We will conduct an audit next week."],
    phrases:["code of conduct","conduct a meeting","conduct research","conduct a survey"],
    synonyms:["behavior","manage","run","carry out"],
    difficulty:"Word stress",
    pronNote:"Stress SHIFTS: Noun KON-dukt (1st syllable). Verb kun-DUKT (2nd syllable). Same letters, different rhythm!"
  },
  {
    id:43, word:"maintain", stress:"mayn-TAYN",
    pos:["verb"],
    defs:{ verb:"to keep in good condition; to continue having or doing" },
    examples:["We must maintain high quality standards.","She maintained contact with her clients."],
    phrases:["maintain standards","maintain equipment","maintain records","maintain contact"],
    synonyms:["keep","preserve","sustain","uphold"],
    difficulty:"Final consonant",
    pronNote:"Final /n/ — tongue tip touches the ridge behind upper teeth: mayn-TAYN. Don't drop the final /n/"
  },
  {
    id:44, word:"approve", stress:"uh-PROOV",
    pos:["verb"],
    defs:{ verb:"to officially agree to; to believe something is good" },
    examples:["The board approved the annual budget.","Has this been approved by management?"],
    phrases:["approve a request","board approval","pending approval","get approved"],
    synonyms:["authorize","sanction","endorse","ratify"],
    difficulty:"R-blend",
    pronNote:"'pr' blend: uh-PROOV. /pr/ as one unit. Long /uː/ vowel at the end. Rhymes with 'groove'"
  },
  {
    id:45, word:"priority", stress:"pry-OR-ih-tee",
    pos:["noun"],
    defs:{ noun:"something considered most important; the right to receive attention first" },
    examples:["Customer satisfaction is our top priority.","Safety must take priority over speed."],
    phrases:["top priority","set priorities","priority list","priority access"],
    synonyms:["main concern","precedence","urgency","first concern"],
    difficulty:"R-blend",
    pronNote:"'pr' blend: pry-OR-ih-tee. /pr/ as one unit — no vowel between them. 4 syllables, stress on 2nd"
  },
  {
    id:46, word:"prospective", stress:"pruh-SPEK-tiv",
    pos:["adjective"],
    defs:{ adjective:"likely to become something in the future; potential" },
    examples:["We met with several prospective clients this week.","Prospective employees must pass a background check."],
    phrases:["prospective client","prospective employee","prospective buyer","prospective student"],
    synonyms:["potential","future","likely","expected"],
    difficulty:"R-blend",
    pronNote:"'pr' blend: pruh-SPEK-tiv. /pr/ as one unit. Stress on 2nd syllable. 3 syllables total"
  },
  {
    id:47, word:"substantial", stress:"sub-STAN-shul",
    pos:["adjective"],
    defs:{ adjective:"of considerable importance, size, or worth; solid and real" },
    examples:["There was a substantial increase in profits.","She received a substantial pay rise."],
    phrases:["substantial increase","substantial evidence","substantial investment","substantial portion"],
    synonyms:["significant","considerable","major","large"],
    difficulty:"Vowel /æ/",
    pronNote:"/æ/ in '-stan-': sub-STAN-shul. Mouth wide open. The '-tial' sounds like /ʃəl/ — like 'shall'"
  },
  {
    id:48, word:"survey", stress:"SUR-vay (n) · sur-VAY (v)",
    pos:["noun","verb"],
    defs:{ noun:"a study or investigation of opinions or conditions", verb:"to investigate or examine carefully" },
    examples:["Please complete our customer satisfaction survey.","We surveyed 1,000 employees about work-life balance."],
    phrases:["conduct a survey","customer survey","survey results","salary survey"],
    synonyms:["poll","study","questionnaire","examine"],
    difficulty:"Word stress",
    pronNote:"Stress shifts: Noun SUR-vay (1st). Verb sur-VAY (2nd). /ɜː/ vowel like 'her' in first syllable"
  },
  {
    id:49, word:"strategy", stress:"STRAT-ih-jee",
    pos:["noun"],
    defs:{ noun:"a plan of action designed to achieve a major aim" },
    examples:["What is the company's long-term strategy?","They developed a new marketing strategy."],
    phrases:["marketing strategy","exit strategy","long-term strategy","business strategy"],
    synonyms:["plan","approach","method","game plan"],
    difficulty:"Vowel /æ/",
    pronNote:"/æ/ in 'strat-': STRAT-ih-jee. Wide open mouth. Final /dʒ/ like 'judge'. 3 syllables"
  },
  {
    id:50, word:"evaluate", stress:"ih-VAL-yoo-ayt",
    pos:["verb"],
    defs:{ verb:"to assess or judge the quality, value, or nature of something" },
    examples:["We need to evaluate the results carefully.","The committee evaluated all applications."],
    phrases:["evaluate performance","evaluate options","evaluate candidates","evaluation criteria"],
    synonyms:["assess","appraise","judge","measure"],
    difficulty:"Vowel /æ/",
    pronNote:"/æ/ in '-val-': ih-VAL-yoo-ayt. Wide open mouth like 'val' in 'valley'. 5 syllables total"
  },
  {
    id:51, word:"implement", stress:"IM-plih-munt",
    pos:["verb","noun"],
    defs:{ verb:"to put a decision, plan, or agreement into effect", noun:"a tool or instrument" },
    examples:["We will implement the new system next quarter.","The company implemented stricter security policies."],
    phrases:["implement a plan","implement changes","implement a policy","full implementation"],
    synonyms:["execute","carry out","apply","enforce"],
    difficulty:"Word stress",
    pronNote:"Stress on 1st syllable: IM-plih-munt. /pl/ cluster in middle — no extra vowel between /p/ and /l/"
  },
  {
    id:52, word:"demonstrate", stress:"DEM-un-strayt",
    pos:["verb"],
    defs:{ verb:"to show clearly by giving proof or example" },
    examples:["She demonstrated the software features.","Please demonstrate your problem-solving approach."],
    phrases:["demonstrate skills","product demonstration","demonstrate commitment","demonstrate ability"],
    synonyms:["show","prove","display","illustrate"],
    difficulty:"Word stress",
    pronNote:"Stress on 1st syllable: DEM-un-strayt. /str/ cluster near the end — no vowel inside the cluster"
  },
  {
    id:53, word:"complimentary", stress:"kom-plih-MEN-tuh-ree",
    pos:["adjective"],
    defs:{ adjective:"given free of charge; expressing praise or admiration" },
    examples:["Breakfast is complimentary for all hotel guests.","He made several complimentary remarks about her work."],
    phrases:["complimentary breakfast","complimentary ticket","complimentary service","complimentary copy"],
    synonyms:["free","gratis","flattering","praising"],
    difficulty:"Word stress",
    pronNote:"5 syllables, stress on 3rd: kom-plih-MEN-tuh-ree. Don't confuse with 'complementary' (completing)"
  },
  {
    id:54, word:"reference", stress:"REF-ruhns",
    pos:["noun","verb"],
    defs:{ noun:"a mention or citation; a letter vouching for someone's character", verb:"to cite as a source" },
    examples:["Please provide two professional references.","In reference to your email of last Monday..."],
    phrases:["provide a reference","reference letter","frame of reference","for future reference"],
    synonyms:["citation","testimonial","mention","source"],
    difficulty:"Word stress",
    pronNote:"Often only 2 syllables in natural speech: REF-ruhns. The middle 'e' is swallowed. Don't say REF-er-ence"
  },
  {
    id:55, word:"personnel", stress:"pur-suh-NEL",
    pos:["noun"],
    defs:{ noun:"the people employed by an organization; the department managing staff" },
    examples:["All personnel must wear ID badges.","Contact the personnel department to update your details."],
    phrases:["personnel department","key personnel","military personnel","personnel file"],
    synonyms:["staff","employees","workforce","human resources"],
    difficulty:"Word stress",
    pronNote:"Stress on the LAST syllable: pur-suh-NEL. Often confused with 'personal' (stress on 1st syllable)"
  },
  {
    id:56, word:"initiative", stress:"ih-NISH-uh-tiv",
    pos:["noun"],
    defs:{ noun:"the power or ability to act independently; a new plan or program" },
    examples:["Take initiative — don't wait to be asked.","This is a company-wide cost-cutting initiative."],
    phrases:["take initiative","new initiative","strategic initiative","launch an initiative"],
    synonyms:["drive","enterprise","plan","program"],
    difficulty:"Word stress",
    pronNote:"5 syllables, stress on 2nd: ih-NISH-uh-tiv. The '-tia-' sounds like /ʃ/ — like 'fish'"
  },
  {
    id:57, word:"submit", stress:"sub-MIT",
    pos:["verb"],
    defs:{ verb:"to hand in or present for consideration or approval" },
    examples:["Please submit your report by end of day Friday.","All applications must be submitted online."],
    phrases:["submit a report","submit an application","submission deadline","submit for review"],
    synonyms:["hand in","file","present","send"],
    difficulty:"Final consonant",
    pronNote:"Final /t/ stops cleanly: sub-MIT. Don't add a vowel — not sub-MI-to. Stress on 2nd syllable"
  },
  {
    id:58, word:"projection", stress:"pruh-JEK-shun",
    pos:["noun"],
    defs:{ noun:"an estimate of future figures; an image projected onto a surface" },
    examples:["The sales projection for Q3 looks strong.","Financial projections are due by Monday."],
    phrases:["sales projection","financial projection","earnings projection","projection screen"],
    synonyms:["forecast","estimate","prediction","outlook"],
    difficulty:"R-blend",
    pronNote:"'pr' blend: pruh-JEK-shun. /pr/ as one unit. /dʒ/ sound in the middle like 'judge'. 3 syllables"
  },
  {
    id:59, word:"property", stress:"PROP-ur-tee",
    pos:["noun"],
    defs:{ noun:"a building or land; a quality or characteristic of something" },
    examples:["The company owns commercial property downtown.","This is protected intellectual property."],
    phrases:["commercial property","intellectual property","property damage","property value"],
    synonyms:["building","real estate","asset","characteristic"],
    difficulty:"R-blend",
    pronNote:"'pr' blend: PROP-ur-tee. /pr/ as one unit — not /pu-r/. Stress on 1st syllable. 3 syllables"
  },
  {
    id:60, word:"training", stress:"TRAYN-ing",
    pos:["noun","verb"],
    defs:{ noun:"the process of teaching skills required for a job", verb:"present participle of train" },
    examples:["New employees undergo two weeks of training.","She is training the new sales team."],
    phrases:["staff training","training program","on-the-job training","training session"],
    synonyms:["instruction","coaching","development","education"],
    difficulty:"R-blend",
    pronNote:"'tr' blend: TRAYN-ing. No vowel between /t/ and /r/ — not tu-RAYN. /eɪ/ diphthong in 'train'"
  },
  {
    id:61, word:"warranty", stress:"WOR-un-tee",
    pos:["noun"],
    defs:{ noun:"a written guarantee issued by a seller promising repair or replacement if needed" },
    examples:["The laptop comes with a two-year warranty.","Is this product still under warranty?"],
    phrases:["product warranty","under warranty","warranty period","warranty claim"],
    synonyms:["guarantee","assurance","pledge","promise"],
    difficulty:"Word stress",
    pronNote:"3 syllables, stress on 1st: WOR-un-tee. /ɒ/ vowel like 'want'. Don't say WAR-ran-tee with 3 stressed syllables"
  },
  {
    id:62, word:"recruit", stress:"rih-KROOT",
    pos:["verb","noun"],
    defs:{ verb:"to find and hire new employees or members", noun:"a newly hired or enlisted person" },
    examples:["We are actively recruiting for three positions.","The new recruit will start Monday."],
    phrases:["recruit staff","new recruit","recruiting process","campus recruitment"],
    synonyms:["hire","enlist","sign up","enroll"],
    difficulty:"R vs L",
    pronNote:"Starts with /r/: rih-KROOT. /r/ not /l/. Long /uː/ vowel at the end. Stress on 2nd syllable"
  },
  {
    id:63, word:"anticipate", stress:"an-TIS-ih-payt",
    pos:["verb"],
    defs:{ verb:"to expect or predict; to take action in advance" },
    examples:["We anticipate strong demand in Q4.","Anticipate problems before they arise."],
    phrases:["anticipate demand","as anticipated","anticipate changes","fail to anticipate"],
    synonyms:["expect","foresee","predict","prepare for"],
    difficulty:"Vowel /æ/",
    pronNote:"Initial /æ/: an-TIS-ih-payt. Open wide for the first syllable. Stress on 2nd syllable. 5 syllables total"
  },
  {
    id:64, word:"previous", stress:"PREE-vee-us",
    pos:["adjective"],
    defs:{ adjective:"existing or occurring before in time or order" },
    examples:["Please review the previous quarter's results.","She has previous experience in logistics."],
    phrases:["previous experience","previous quarter","previous meeting","previous employer"],
    synonyms:["prior","earlier","past","former"],
    difficulty:"R-blend",
    pronNote:"'pr' blend: PREE-vee-us. /pr/ as one unit. Stress on 1st syllable. Long /iː/ vowel: PREE"
  },
  {
    id:65, word:"liability", stress:"ly-uh-BIL-ih-tee",
    pos:["noun"],
    defs:{ noun:"legal or financial responsibility; a disadvantage" },
    examples:["The company accepts no liability for the damage.","Poor communication is a liability in any organization."],
    phrases:["legal liability","limited liability","product liability","assume liability"],
    synonyms:["responsibility","obligation","risk","burden"],
    difficulty:"Word stress",
    pronNote:"5 syllables, stress on 3rd: ly-uh-BIL-ih-tee. Not to be confused with 'reliability' (6 syllables)"
  },
  {
    id:66, word:"resolution", stress:"rez-uh-LOO-shun",
    pos:["noun"],
    defs:{ noun:"a firm decision; the solving of a problem; a formal statement voted on" },
    examples:["We passed a resolution to freeze hiring.","A quick resolution to the dispute was reached."],
    phrases:["conflict resolution","pass a resolution","New Year's resolution","dispute resolution"],
    synonyms:["decision","solution","determination","settlement"],
    difficulty:"R vs L",
    pronNote:"Starts with /r/: rez-uh-LOO-shun. Stress on 3rd syllable. Long /uː/ in '-loo-'. 4 syllables"
  },
  {
    id:67, word:"sufficient", stress:"suh-FISH-unt",
    pos:["adjective"],
    defs:{ adjective:"enough for the purpose; adequate" },
    examples:["Do we have sufficient funds to proceed?","The evidence is not sufficient for approval."],
    phrases:["sufficient funds","sufficient time","sufficient evidence","sufficient reason"],
    synonyms:["enough","adequate","ample","satisfactory"],
    difficulty:"TH/SH sounds",
    pronNote:"'-fici-' sounds like /ʃ/ — like 'fish': suh-FISH-unt. Not suh-FIK-ee-unt. Stress on 2nd syllable"
  },
  {
    id:68, word:"consecutive", stress:"kun-SEK-yuh-tiv",
    pos:["adjective"],
    defs:{ adjective:"following each other in unbroken sequence" },
    examples:["Profits rose for five consecutive quarters.","She won the award for three consecutive years."],
    phrases:["consecutive days","consecutive quarters","consecutive wins","consecutive terms"],
    synonyms:["successive","sequential","continuous","in a row"],
    difficulty:"Word stress",
    pronNote:"5 syllables, stress on 2nd: kun-SEK-yuh-tiv. The '-utu-' sounds like /jʊt/ — like 'you-tiv'"
  },
  {
    id:69, word:"throughout", stress:"throo-OWT",
    pos:["preposition","adverb"],
    defs:{ preposition:"in every part of; from beginning to end of", adverb:"in every part; for the whole time" },
    examples:["The new policy applies throughout the organization.","She remained calm throughout the presentation."],
    phrases:["throughout the year","throughout the company","throughout the process","throughout history"],
    synonyms:["all through","everywhere","across","from start to finish"],
    difficulty:"TH sound",
    pronNote:"Starts with /θr/ cluster — tongue between teeth for /θ/, then /r/: throo-OWT. Not t-ROO-owt"
  },
  {
    id:70, word:"invoice", stress:"IN-voyss",
    pos:["noun","verb"],
    defs:{ noun:"a document listing goods or services provided with the amount owed", verb:"to send a bill to someone" },
    examples:["Please send the invoice to our accounts department.","We invoiced the client for the completed work."],
    phrases:["send an invoice","invoice number","outstanding invoice","settle an invoice"],
    synonyms:["bill","statement","receipt","charge"],
    difficulty:"Final consonant",
    pronNote:"Final /s/ — not /su/: IN-voyss. The '-ice' ending sounds like /ɪs/. 2 clear syllables"
  },
  {
    id:71, word:"recommend", stress:"rek-uh-MEND",
    pos:["verb"],
    defs:{ verb:"to suggest as being good or suitable; to advise a course of action" },
    examples:["I highly recommend the afternoon workshop.","She was recommended for the senior position."],
    phrases:["highly recommended","recommend a product","letter of recommendation","strongly recommend"],
    synonyms:["suggest","endorse","advise","propose"],
    difficulty:"R vs L",
    pronNote:"Starts with /r/: rek-uh-MEND. Stress on 3rd syllable. Final /d/ — don't drop it: -MEND not -MEN"
  },
  {
    id:72, word:"quarter", stress:"KWOR-tur",
    pos:["noun"],
    defs:{ noun:"one of four equal parts; a three-month business period" },
    examples:["Sales rose 12% in the third quarter.","We report earnings on a quarterly basis."],
    phrases:["third quarter","quarterly report","Q3 results","fiscal quarter"],
    synonyms:["three months","term","period","one fourth"],
    difficulty:"Word stress",
    pronNote:"KWOR-tur: /kw/ cluster at start, /ɔː/ vowel like 'four'. Don't say KWA-tur with /æ/"
  },
  {
    id:73, word:"efficient", stress:"ih-FISH-unt",
    pos:["adjective"],
    defs:{ adjective:"achieving maximum productivity with minimum wasted effort or resource" },
    examples:["The new system is far more efficient.","She is an efficient and reliable employee."],
    phrases:["fuel-efficient","efficient process","efficient use of resources","highly efficient"],
    synonyms:["productive","effective","streamlined","capable"],
    difficulty:"TH/SH sounds",
    pronNote:"'-fici-' sounds like /ʃ/: ih-FISH-unt. Like 'fish'. NOT ih-FI-see-unt. 3 syllables"
  },
  {
    id:74, word:"department", stress:"dih-PART-munt",
    pos:["noun"],
    defs:{ noun:"a division of a large organization dealing with a specific area of activity" },
    examples:["She heads the marketing department.","Forward your query to the HR department."],
    phrases:["HR department","sales department","department head","department meeting"],
    synonyms:["division","section","unit","branch"],
    difficulty:"Word stress",
    pronNote:"Stress on 2nd syllable: dih-PART-munt. /r/ in 'part' is clear. 3 syllables — not 4"
  },
  {
    id:75, word:"arrange", stress:"uh-RAYNJ",
    pos:["verb"],
    defs:{ verb:"to put in a neat or required order; to organize or plan" },
    examples:["Can you arrange a meeting for Tuesday?","She arranged all the files in chronological order."],
    phrases:["arrange a meeting","arrange transportation","arrange in order","arrange a schedule"],
    synonyms:["organize","plan","set up","coordinate"],
    difficulty:"R vs L",
    pronNote:"Starts with /ər/: uh-RAYNJ. The /r/ is in the second syllable — /r/ not /l/. /eɪ/ diphthong"
  },
  {
    id:76, word:"headquarters", stress:"HED-kwor-turz",
    pos:["noun"],
    defs:{ noun:"the main offices of an organization" },
    examples:["The company's headquarters is in Singapore.","Report to headquarters first thing Monday."],
    phrases:["company headquarters","regional headquarters","global headquarters","move headquarters"],
    synonyms:["main office","HQ","central office","home base"],
    difficulty:"Word stress",
    pronNote:"Stress on 1st syllable: HED-kwor-turz. Often said as 'HQ' in conversation. /kw/ cluster in middle"
  },
  {
    id:77, word:"delegate", stress:"DEL-ih-gayt (v) · DEL-ih-git (n)",
    pos:["verb","noun"],
    defs:{ verb:"to assign responsibility or authority to another person", noun:"a person sent to represent others" },
    examples:["A good manager knows how to delegate.","She served as a delegate at the annual conference."],
    phrases:["delegate responsibility","conference delegate","delegate authority","delegate tasks"],
    synonyms:["assign","entrust","representative","envoy"],
    difficulty:"Word stress",
    pronNote:"Verb: DEL-ih-GAYT (stress on 3rd syllable, long /eɪ/). Noun: DEL-ih-git (stress on 1st, reduced ending)"
  },
  {
    id:78, word:"complaint", stress:"kum-PLAYNT",
    pos:["noun"],
    defs:{ noun:"an expression of dissatisfaction or grievance; a formal statement of dissatisfaction" },
    examples:["She filed a formal complaint with HR.","We received several complaints about the new policy."],
    phrases:["file a complaint","customer complaint","lodge a complaint","handle complaints"],
    synonyms:["grievance","objection","protest","dissatisfaction"],
    difficulty:"R-blend",
    pronNote:"'pl' blend inside: kum-PLAYNT. No extra vowel between /p/ and /l/. /eɪ/ diphthong. Final /t/ is clean"
  },
  {
    id:79, word:"reimbursement", stress:"ree-im-BURS-munt",
    pos:["noun"],
    defs:{ noun:"the action of repaying a person for money spent" },
    examples:["Submit all receipts for reimbursement.","Travel reimbursement is processed within 30 days."],
    phrases:["expense reimbursement","travel reimbursement","full reimbursement","request reimbursement"],
    synonyms:["repayment","refund","compensation","payback"],
    difficulty:"Word stress",
    pronNote:"4 syllables, stress on 3rd: ree-im-BURS-munt. /ɜː/ like 'her'. The '-ment' is unstressed at end"
  },
  {
    id:80, word:"register", stress:"REJ-is-ter",
    pos:["verb","noun"],
    defs:{ verb:"to officially record or sign up", noun:"an official list or record" },
    examples:["Please register for the seminar by Friday.","Check the register to confirm your room number."],
    phrases:["register for an event","voter registration","cash register","register a complaint"],
    synonyms:["sign up","enroll","record","log"],
    difficulty:"Word stress",
    pronNote:"Stress on 1st syllable: REJ-is-ter. The 'g' makes a /dʒ/ sound. 3 syllables total"
  },
  {
    id:81, word:"outstanding", stress:"owt-STAN-ding",
    pos:["adjective"],
    defs:{ adjective:"exceptionally good; not yet paid or resolved" },
    examples:["She produced outstanding results this year.","There are two outstanding invoices from last month."],
    phrases:["outstanding performance","outstanding balance","outstanding invoice","outstanding issue"],
    synonyms:["excellent","unpaid","exceptional","overdue"],
    difficulty:"Vowel /æ/",
    pronNote:"/æ/ in '-stand-': owt-STAN-ding. Wide open mouth. Stress on 2nd syllable. 3 syllables total"
  },
  {
    id:82, word:"productivity", stress:"proh-duk-TIV-ih-tee",
    pos:["noun"],
    defs:{ noun:"the effectiveness of effort measured by the rate of output per unit of input" },
    examples:["Remote working tools improved team productivity.","We need to measure and improve productivity."],
    phrases:["increase productivity","productivity tools","productivity metrics","boost productivity"],
    synonyms:["efficiency","output","performance","throughput"],
    difficulty:"R-blend",
    pronNote:"'pr' blend: proh-duk-TIV-ih-tee. 5 syllables, stress on 4th. /pr/ as one unit at the start"
  },
  {
    id:83, word:"approval", stress:"uh-PROO-vul",
    pos:["noun"],
    defs:{ noun:"the action of officially agreeing to something; a favorable opinion" },
    examples:["The project needs board approval before it starts.","She gained approval for the new budget."],
    phrases:["board approval","pending approval","get approval","require approval"],
    synonyms:["authorization","consent","endorsement","sanction"],
    difficulty:"R-blend",
    pronNote:"'pr' blend: uh-PROO-vul. /pr/ as one unit. Long /uː/ vowel. 3 syllables, stress on 2nd"
  },
  {
    id:84, word:"legitimate", stress:"lih-JIT-ih-mit",
    pos:["adjective"],
    defs:{ adjective:"conforming to law; reasonable and justifiable" },
    examples:["Is this a legitimate business operation?","She had a legitimate reason for missing the meeting."],
    phrases:["legitimate business","legitimate concern","legitimate claim","legitimate reason"],
    synonyms:["legal","valid","genuine","lawful"],
    difficulty:"R vs L",
    pronNote:"Starts with /l/: lih-JIT-ih-mit. /l/ not /r/. /dʒ/ in the middle like 'judge'. 4 syllables"
  },
  {
    id:85, word:"candidate", stress:"KAN-dih-dayt",
    pos:["noun"],
    defs:{ noun:"a person who applies for a job or is nominated for something" },
    examples:["She is a strong candidate for the director role.","All candidates must complete the written test."],
    phrases:["job candidate","qualified candidate","ideal candidate","shortlisted candidate"],
    synonyms:["applicant","contender","nominee","prospect"],
    difficulty:"Vowel /æ/",
    pronNote:"Initial /æ/: KAN-dih-dayt. Wide open mouth on first syllable. 3 syllables, stress on 1st"
  },
  {
    id:86, word:"procedure", stress:"pruh-SEE-jur",
    pos:["noun"],
    defs:{ noun:"an established or official way of doing something" },
    examples:["Follow the standard procedure for filing claims.","New security procedures are now in place."],
    phrases:["standard procedure","follow a procedure","safety procedure","filing procedure"],
    synonyms:["process","method","protocol","routine"],
    difficulty:"R-blend",
    pronNote:"'pr' blend: pruh-SEE-jur. Long /iː/ in '-see-'. /dʒ/ sound in the middle. 3 syllables"
  },
  {
    id:87, word:"communicate", stress:"kuh-MYOO-nih-kayt",
    pos:["verb"],
    defs:{ verb:"to share or exchange information or ideas with others" },
    examples:["It is vital to communicate clearly with your team.","We communicate mainly via email and Slack."],
    phrases:["communicate clearly","communicate with clients","internal communication","communicate effectively"],
    synonyms:["convey","share","express","relay"],
    difficulty:"Word stress",
    pronNote:"5 syllables, stress on 2nd: kuh-MYOO-nih-kayt. /mj/ cluster sounds like 'myoo' — like 'music'"
  },
  {
    id:88, word:"flexible", stress:"FLEK-sih-bul",
    pos:["adjective"],
    defs:{ adjective:"able to be changed or adapted; not rigid in schedule or approach" },
    examples:["We offer flexible working hours to all staff.","Be flexible when negotiating terms."],
    phrases:["flexible hours","flexible schedule","flexible approach","flexible working"],
    synonyms:["adaptable","adjustable","versatile","open"],
    difficulty:"Word stress",
    pronNote:"Stress on 1st syllable: FLEK-sih-bul. /fl/ blend at start. '-ible' is reduced: /sɪbəl/"
  },
  {
    id:89, word:"transaction", stress:"tran-ZAK-shun",
    pos:["noun"],
    defs:{ noun:"an instance of buying or selling; any business deal or exchange" },
    examples:["The transaction was completed successfully.","All financial transactions are logged automatically."],
    phrases:["financial transaction","complete a transaction","transaction record","business transaction"],
    synonyms:["deal","exchange","trade","operation"],
    difficulty:"Vowel /æ/",
    pronNote:"Two /æ/ vowels: tran-ZAK-shun. Wide open mouth for both. Stress on 2nd syllable"
  },
  {
    id:90, word:"correspond", stress:"kor-ih-SPOND",
    pos:["verb"],
    defs:{ verb:"to communicate by exchanging letters or emails; to be in agreement or equivalent" },
    examples:["We correspond with overseas clients by email.","The figures don't correspond with last year's data."],
    phrases:["correspond with","correspond to","business correspondence","correspond regularly"],
    synonyms:["communicate","match","write","agree"],
    difficulty:"Word stress",
    pronNote:"Stress on 3rd syllable: kor-ih-SPOND. 3 syllables. /r/ in first syllable — light but present"
  },
  {
    id:91, word:"resign", stress:"rih-ZINE",
    pos:["verb"],
    defs:{ verb:"to voluntarily leave a job or position" },
    examples:["She resigned from her role last Friday.","He submitted his resignation letter via email."],
    phrases:["resign from a position","letter of resignation","tender one's resignation","resign effective"],
    synonyms:["quit","step down","leave","vacate"],
    difficulty:"Silent letter",
    pronNote:"The 'g' is completely silent: rih-ZINE. Not rih-ZIG-n. Just 2 syllables. /aɪ/ diphthong at end"
  },
  {
    id:92, word:"relocate", stress:"ree-loh-KAYT",
    pos:["verb"],
    defs:{ verb:"to move to a new place, especially for work or business" },
    examples:["The head office will relocate to Osaka next year.","Are you willing to relocate for this position?"],
    phrases:["relocate to another city","office relocation","willing to relocate","corporate relocation"],
    synonyms:["move","transfer","migrate","shift"],
    difficulty:"R vs L",
    pronNote:"Starts with /r/: ree-loh-KAYT. /r/ at start, then /l/ in middle — both must be clear. 3 syllables"
  },
  {
    id:93, word:"proficient", stress:"pruh-FISH-unt",
    pos:["adjective"],
    defs:{ adjective:"competent or skilled in doing something" },
    examples:["She is proficient in English and Mandarin.","We need a candidate proficient in Excel."],
    phrases:["proficient in English","highly proficient","proficiency test","proficiency level"],
    synonyms:["skilled","competent","expert","capable"],
    difficulty:"R-blend",
    pronNote:"'pr' blend: pruh-FISH-unt. /pr/ as one unit. '-fici-' sounds like /ʃ/ — like 'fish'. 3 syllables"
  },
  {
    id:94, word:"credential", stress:"krih-DEN-shul",
    pos:["noun"],
    defs:{ noun:"a qualification, achievement, or experience that makes someone suitable for a role" },
    examples:["Please submit your academic credentials.","His credentials for the job are impressive."],
    phrases:["academic credentials","professional credentials","verify credentials","strong credentials"],
    synonyms:["qualification","certificate","diploma","accreditation"],
    difficulty:"R-blend",
    pronNote:"'cr' blend: krih-DEN-shul. /kr/ as one unit. '-tial' sounds like /ʃəl/. Stress on 2nd syllable"
  },
  {
    id:95, word:"overview", stress:"OH-ver-vyoo",
    pos:["noun"],
    defs:{ noun:"a general summary or description of a subject or situation" },
    examples:["Please give a brief overview of the project.","The report provides a comprehensive overview."],
    phrases:["project overview","general overview","brief overview","overview of the situation"],
    synonyms:["summary","outline","synopsis","rundown"],
    difficulty:"Word stress",
    pronNote:"Stress on 1st syllable: OH-ver-vyoo. 3 syllables. '-view' sounds like 'vyoo' — /v/ not /b/"
  },
  {
    id:96, word:"analyze", stress:"AN-uh-lyze",
    pos:["verb"],
    defs:{ verb:"to examine methodically and in detail; to interpret data" },
    examples:["We need to analyze the sales data carefully.","The team analyzed the results of the survey."],
    phrases:["analyze data","analyze results","data analysis","analyze trends"],
    synonyms:["examine","assess","evaluate","study"],
    difficulty:"Vowel /æ/",
    pronNote:"Initial /æ/: AN-uh-lyze. Wide open mouth on first syllable. Stress on 1st. 3 syllables"
  },
  {
    id:97, word:"require", stress:"rih-KWIRE",
    pos:["verb"],
    defs:{ verb:"to need something; to make something necessary or compulsory" },
    examples:["This position requires five years of experience.","All visitors are required to sign in."],
    phrases:["require approval","require documentation","as required","required qualifications"],
    synonyms:["need","demand","necessitate","call for"],
    difficulty:"R vs L",
    pronNote:"Starts with /r/: rih-KWIRE. Then /kw/ cluster. Make sure /r/ at start is clear, not /l/. 2 syllables"
  },
  {
    id:98, word:"responsible", stress:"rih-SPON-sih-bul",
    pos:["adjective"],
    defs:{ adjective:"having an obligation to do something; being the cause of something" },
    examples:["Who is responsible for this project?","She is a responsible and dedicated employee."],
    phrases:["responsible for","hold responsible","jointly responsible","responsible party"],
    synonyms:["accountable","liable","dependable","reliable"],
    difficulty:"R vs L",
    pronNote:"Starts with /r/: rih-SPON-sih-bul. /r/ not /l/. 4 syllables. Stress on 2nd syllable"
  },
  {
    id:99, word:"establish", stress:"ih-STAB-lish",
    pos:["verb"],
    defs:{ verb:"to set up or found; to make something recognized or accepted" },
    examples:["The company was established in 1990.","We need to establish clear communication guidelines."],
    phrases:["establish a company","establish contact","establish guidelines","newly established"],
    synonyms:["found","set up","create","institute"],
    difficulty:"Vowel /æ/",
    pronNote:"/æ/ in '-tab-': ih-STAB-lish. Wide open mouth like 'tab'. Not ih-STOB-lish. 3 syllables"
  },
  {
    id:100, word:"agenda", stress:"uh-JEN-duh",
    pos:["noun"],
    defs:{ noun:"a list of items to be discussed at a meeting; a set of underlying goals" },
    examples:["The agenda for today's meeting has been circulated.","What is on the agenda for the quarterly review?"],
    phrases:["meeting agenda","set the agenda","agenda item","hidden agenda"],
    synonyms:["schedule","program","plan","itinerary"],
    difficulty:"Word stress",
    pronNote:"Stress on 2nd syllable: uh-JEN-duh. The 'g' makes a /dʒ/ sound like 'jump'. 3 syllables"
  },
];

/** Remove slash-wrapped IPA chunks and stray phonetic symbols for learner-facing tips. */
export function stripIPAFromTip(text: string): string {
  let s = text;
  s = s.replace(/\/[^/\n]+\//g, '');
  s = s.replace(/[\u0250-\u02FF]/g, '');
  s = s.replace(/[ˈˌːɪəʊæɒʌɜθðʃʒŋ]/g, '');
  s = s.replace(/\s{2,}/g, ' ').trim();
  return s;
}

function rawToToeic(w: RawToeicWord): ToeicWord {
  const definitions = w.pos
    .map((p) => w.defs[p])
    .filter((d): d is string => typeof d === 'string' && d.length > 0);
  return {
    id: w.id,
    word: w.word,
    stressHint: w.stress,
    difficulty: w.difficulty,
    partOfSpeech: w.pos,
    meaningJa: '',
    definitions,
    example: w.examples[0] ?? '',
    phrases: w.phrases.map((en, i) => ({ en, ja: phraseJaFor(w.id, i) })),
    synonyms: w.synonyms,
    pronunciationTipJa: stripIPAFromTip(w.pronNote),
  };
}

export const TOEIC_WORDS: ToeicWord[] = RAW_TOEIC_WORDS.map(rawToToeic);
