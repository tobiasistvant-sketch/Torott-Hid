/* Demo additions are explicit editable data, separate from the source transcript.
 * Source excerpts retain a source pointer. See docs/demo-notes.md for review.
 */
(function (root, factory) {
  'use strict';
  const api = factory();
  if (typeof module === 'object' && module.exports) module.exports = api;
  else root.TorottHidAdaptations = api;
})(typeof globalThis !== 'undefined' ? globalThis : this, function () {
  'use strict';
  const catalog = {};
  function add(id, type, text, speaker) {
    const block = { id, origin: 'addition', type, text };
    if (speaker) block.speaker = speaker;
    catalog[id] = block;
    return block;
  }
  const sourceExcerpts = {
    publicRequest: { origin: 'source', type: 'speech', speaker: 'Áron', channel: 'message', text: 'Kérlek, ezt ne az egész osztály előtt beszéljük meg.', source: { file: 'docs/nora-pov-forgatokonyv.md', line: 136 } },
    clarification: { origin: 'source', type: 'speech', speaker: 'Áron', text: 'Azt hittem, Lili tud segíteni.', source: { file: 'docs/nora-pov-forgatokonyv.md', line: 171 } },
    permissionQuestion: { origin: 'source', type: 'speech', speaker: 'Nóra', text: 'De miért mondtad el az engedélyem nélkül?', source: { file: 'docs/nora-pov-forgatokonyv.md', line: 171 } },
    confirmationThought: { origin: 'source', type: 'thought', speaker: 'Nóra', text: 'Attól, hogy fáj, biztosan jobban leszek, ha neki is fáj?', source: { file: 'docs/nora-pov-forgatokonyv.md', line: 244 } }
  };
  const opening = add('opening-pad', 'narration', 'Szombat délután az iskola melletti padon ültök Áronnal. Egy ideje keresed a szavakat. Most végre elmondod neki, mi történik otthon.');
  const firstReactions = {
    A: add('s2-public', 'thought', 'A folyosón mindenki felénk fordult. Jó volt végre kimondani, de most még nehezebb megszólalnom.', 'Nóra'),
    B: add('s2-pause', 'thought', 'Reggel inkább eljöttem. Most már nem minden mondatot ugyanazzal a lendülettel küldenék el.', 'Nóra'),
    C: add('s2-facts', 'thought', 'Az osztálytársaktól már tudom, hogy Lili Árontól hallotta. Azt még nem, hogy Áron miért mondta el neki.', 'Nóra'),
    D: add('s2-boundary', 'thought', 'Megkértem őket, hogy ne beszéljenek rólam. De Áronnal még nem tisztáztam, mi történt.', 'Nóra')
  };
  const messageReactions = {
    A: add('s3-final-words', 'thought', 'Azt írtam, hogy soha nem bocsátok meg. Tegnap ezt éreztem. Most még azt sem tudom, végig tudom-e hallgatni.', 'Nóra'),
    B: add('s3-promise', 'thought', 'Az ígéretéről kérdeztem. Most is azt szeretném, hogy ne kerülje meg.', 'Nóra'),
    C: add('s3-time', 'thought', 'Tegnap időt kértem. Attól, hogy ma találkozunk, még nem kell mindent eldöntenem.', 'Nóra'),
    D: add('s3-premature-peace', 'thought', 'Azt írtam, nincs semmi baj. De van. Nem akarok tovább úgy beszélni, mintha nem fájna.', 'Nóra')
  };
  const afterRefusal = add('s4-refused-talk', 'narration', 'Kedden nem akartál beszélgetni. Áron nem követett. Csütörtökön egy rövid üzenet érkezik tőle.');
  const afterThreat = add('s4-threat-memory', 'thought', 'Azt mondtam, én is elárulom a titkát. Még nem tettem meg. Most itt van ez az üzenet.', 'Nóra');
  const indirect = add('s5-indirect', 'narration', 'Árontól nem érkezik új személyes üzenet. Egy osztálytársadtól tudod meg, hogy megkérte Lilit: ne beszéljen tovább rólad. Nem üzentet neked, és választ sem kér.');
  const limited = add('s5-limited-outreach', 'narration', 'Ha jóvátételt kérsz, te kezdeményezel egy egyszeri, erre az ügyre korlátozott üzenetet. Ettől a korábbi határod nem változik meg.');
  const waiting = add('s5-waiting', 'thought', 'Időt kértem tőle. Most sem kell úgy tennem, mintha már készen állnék mindenre.', 'Nóra');
  const uncertain = add('s5-uncertain', 'thought', 'Nem akarok visszavágni. De attól, hogy tehet valamit, még nem tudom, mi lesz velünk.', 'Nóra');
  const privateWeeks = add('s6-private-repair', 'narration', 'Áron újra szólt Lilinek, és nem ismételte el a családi részleteket. Azóta nem avatkozott be újra az engedélyed nélkül. A következő hetekben is tartotta ezt.');
  const publicWeeks = add('s6-public-repair', 'narration', 'Áron csak annyit mondott az osztálynak, hogy megszegte egy barátja bizalmát. A családodról nem beszélt. Néhányan még így is kérdezősködtek; egy nyilvános mondattól nem lett minden egyértelmű.');
  const rejectedWeeks = add('s6-rejected-help', 'narration', 'Miután visszautasítottad a segítségét, Áron visszahúzódott. Most is csak a közös feladattal kapcsolatban szól hozzád.');
  const unwithdrawn = add('s6-publication-remains', 'narration', 'A múlt heti nyilvános közlésedet még nem vontad vissza. Mások is belekeveredtek a vitába. A közös projekt ettől nem tud úgy kezdődni, mintha semmi sem történt volna.');
  const withdrewDraft = add('s6-draft-withdrawn', 'thought', 'Akkor végül nem küldtem el. Ettől még fáj, ami történt, de legalább nem került ki egy újabb titok.', 'Nóra');
  const correctedPost = add('s6-corrected-post', 'narration', 'Visszavontad a saját bántó közlésedet, és vállaltad érte a felelősséget. Akik már olvasták, attól még nem felejtik el azonnal. Áron eredeti titoksértését ez sem teszi meg nem történtté.');
  const correctedThreat = add('s6-corrected-threat', 'narration', 'Kimondtad, hogy a fenyegetést visszavonod, és nem adod tovább Áron titkát. A saját mondatodért vállaltál felelősséget; nem a titoksértésért.');
  const correctedTone = add('s6-corrected-tone', 'narration', 'A saját hangnemedet is szóba hoztad. Ez nem jelenti, hogy a folyosón kimondott fájdalmad vagy Áron titoksértése jelentéktelenné vált volna.');
  const noHelp = add('s5-no-help-no-contact', 'narration', 'Nem küldesz új üzenetet, és nem kérsz további segítséget. Áron nem keres meg. A korábban kimondott határ megmarad.');
  const noHelpTalk = add('s5-no-help-talk', 'narration', 'Visszautasítod a további segítségét. Áron ennyit válaszol: „Rendben. Nem erőltetem.” Ezután visszahúzódik.');
  const draftWithheld = add('s5-withheld', 'narration', 'Nem teszed közzé a tervezetet. A haragod nem tűnik el, de Áron titka nem kerül ki. Később még eldöntheted, mit szeretnél a kapcsolatotokkal.');
  const published = add('s5-published', 'narration', 'Közzéteszed a bántó tartalmat. Többen elolvassák, és már mások is részei a vitának. A saját eredeti sérelmed ettől nem múlt el.');
  const acknowledged = 'Áron kezdetben a jó szándékára hivatkozott. Később elismerte, hogy megszegte az ígéretét, és bocsánatot kért. Ez az ő felelősségvállalása volt, nem a te válaszaid jutalma.';
  const summaryTexts = {
    acknowledged,
    private: 'Kérésedre Áron újra megkérte Lilit, hogy állítsa le a pletykát. Nem osztott meg új családi részletet, és a következő hetekben is tiszteletben tartotta a határaidat.',
    public: 'Engedélyeddel Áron nyilvánosan vállalta, hogy megszegte a bizalmadat. A családodról nem beszélt. Ez új figyelmet is keltett, ezért a jóvátétel eredménye még nem egyértelmű.',
    noRepair: 'További jóvátételt nem kértél tőle. A személyes távolságodat tiszteletben tartotta.',
    R1: 'Lehetőséget adtál a barátság lassú újjáépítésére. A bizalom nem lett egyszerre teljes: a következő időszakban is a tettek számítanak.',
    R2: 'A beszélgetés és a közeledés lehetősége nyitva marad, de a bizalom még bizonytalan. Nem kell gyorsabban lezárnod ezt a folyamatot.',
    R3: 'Kimondtad, hogy nem akarsz haragban maradni, és megbocsátasz. A korábbi szoros barátságot mégsem folytatnád. Áron szomorúan, de vita nélkül elfogadja a döntésedet.',
    R4: 'Személyes távolságot kértél. Áron ezután csak a szükséges iskolai ügyekben szólít meg. Nem kellett örökre szóló ítéletet mondanod a kapcsolatotokról.',
    R5: 'A megerősített nyilvános megtorlás új sérelmet okozott. A konfliktus másokat is bevont, és a bizalom tovább sérült. Ettől Áron eredeti titoksértéséért való felelőssége nem szűnt meg.',
    R5Earlier: 'A későbbi szándékod már változhatott, de a korábbi bántó nyilvános közlésedet még nem vontad vissza. A történet ezért most a tovább mélyülő konfliktusnál áll meg.',
    draft: 'A bosszút kilátásba helyezted, de a tervezetet végül nem tetted közzé.',
    correction: 'A korábbi bántó közlésedet visszavontad, és vállaltad érte a felelősséget. A korábbi sérelmek és a kapcsolat rendezése ettől még időt igényelnek.'
  };
  function blocksForScene(state, story, engine) {
    const scene = story.scenes[state.scene];
    const f = engine.facts(state);
    let blocks = scene.blocks.slice();
    if (state.scene === 0) blocks.unshift(opening);
    if (state.scene === 2) {
      if (f.publicConfrontation) blocks.splice(blocks.findIndex(block => block.speaker === 'Áron') + 1, 0, sourceExcerpts.publicRequest);
      blocks.unshift(firstReactions[state.decisions[1]]);
    }
    if (state.scene === 3) blocks.unshift(messageReactions[state.decisions[2]]);
    if (state.scene === 4 && state.decisions[3] === 'C') blocks.unshift(afterRefusal);
    if (state.scene === 4 && state.decisions[3] === 'D') blocks.unshift(afterThreat);
    if (state.scene === 5) {
      blocks = [blocks[0]].concat(f.noContact ? [indirect, limited] : scene.contactBlocks, blocks.slice(1));
      if (state.decisions[4] === 'B') blocks.push(waiting);
      if (state.decisions[4] === 'C') blocks.push(uncertain);
    }
    if (state.scene === 6) {
      if (f.repairPrivate) blocks.push(privateWeeks);
      if (f.repairPublic) blocks.push(publicWeeks);
      if (f.aidRejected) blocks.push(rejectedWeeks);
      if (f.selfRegulation) blocks.push(withdrewDraft);
      if (f.unresolvedRetaliation) blocks.push(unwithdrawn);
      if (f.corrected) blocks.push(f.retaliation ? correctedPost : f.revengeThreat ? correctedThreat : correctedTone);
    }
    return blocks.filter(Boolean);
  }
  function feedbackBlocks(state, story, engine) {
    const scene = story.scenes[state.scene];
    const choice = scene.choices.find(item => item.id === state.decisions[state.scene]);
    const f = engine.facts(state);
    if (state.scene === 5 && choice.id === 'C') return [f.noContact ? noHelp : noHelpTalk];
    if (state.scene === 5 && choice.id === 'D') return [state.publications[5] ? published : draftWithheld];
    const blocks = [{ type: 'narration', text: choice.immediate, origin: 'source', source: { file: story.sourceFile, line: choice.source.immediateLine } }];
    if (state.scene === 3 && ['A', 'B'].includes(choice.id)) blocks.push(sourceExcerpts.clarification, sourceExcerpts.permissionQuestion);
    return blocks;
  }
  function summary(state, engine) {
    const f = engine.facts(state), result = engine.ending(state), text = [summaryTexts.acknowledged];
    if (f.repairPrivate) text.push(summaryTexts.private);
    else if (f.repairPublic) text.push(summaryTexts.public);
    else if (state.decisions[5] === 'C') text.push(summaryTexts.noRepair);
    if (f.selfRegulation) text.push(summaryTexts.draft);
    if (f.corrected && state.publications[5] === true) text.push(summaryTexts.correction);
    text.push(summaryTexts[result]);
    if (result === 'R5' && !state.publications[6]) text.push(summaryTexts.R5Earlier);
    return text;
  }
  const ui = {
    intro: 'Nóra egy bizalmas családi hírt mondott el a barátjának. Áron megígérte, hogy nem adja tovább. Mégis megtette.',
    role: 'Ebben a történetben Nórát irányítod: az ő szavait, reakcióit és határait választod meg. Áron önálló szereplő; nem dönthetsz helyette.',
    demo: 'Szöveges demó · A történet szövege munkaváltozat.',
    care: 'Minden szereplő és helyzet fiktív. Nem kell saját családi vagy baráti élményedet megosztanod. Nincs pontozás és nincs kikényszerített megbocsátás.',
    confirmation: 'A tervezet még nem került nyilvánosságra. Most még visszaléphetsz; a harag kimondása és a másik ember nyilvános bántása nem ugyanaz.',
    correction: 'A saját sértő reakciómért én is felelős vagyok.',
    correctPost: 'Ezzel visszavonod a saját bántó nyilvános közlésedet, és vállalod érte a felelősséget. A történtek nem tűnnek el, és Áron eredeti felelőssége is megmarad.',
    correctThreat: 'Ezzel visszavonod a fenyegetést. Nem adod tovább Áron titkát, és a saját mondatodért vállalsz felelősséget.',
    correctTone: 'Ha szeretnéd, a saját hangnemedet is szóba hozhatod. A fájdalmadat nem kell letagadnod, és Áron eredeti felelősségét sem veszed át.',
    corrected: 'A saját reakciódat is tisztáztad. Most önállóan dönthetsz arról, milyen jövőt szeretnél a kapcsolatnak.',
    finish: 'Nóra története most lezárult. Lépj ki a szerepből: a kérdéseket a fiktív történetről is átgondolhatod, saját élmények megosztása nélkül.'
  };
  return { catalog, sourceExcerpts, summaryTexts, ui, blocksForScene, feedbackBlocks, summary };
});
