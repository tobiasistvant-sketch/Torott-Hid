/* Author-approved 0.0.4 text revisions. Original source data stays unchanged.
 * Editorial instructions are not student-facing narrative blocks.
 */
(function (root, factory) {
  'use strict';
  const revisions = factory();
  if (typeof module === 'object' && module.exports) module.exports = revisions;
  else root.TorottHidRevisions = revisions;
})(typeof globalThis !== 'undefined' ? globalThis : this, function () {
  'use strict';
  const TEXT = 'docs/02_szovegfrissitesek_0.0.4_TELJES.md';
  const LIST = 'docs/01_javitasi_jegyzek_0.0.4_TELJES.md';
  const ORIGINAL = 'docs/nora-pov-forgatokonyv.md';
  const catalog = {};
  function block(id, type, text, line, speaker, channel, file = TEXT) {
    const item = { id, origin: file === ORIGINAL ? 'source' : 'approved-revision', type, text, source: { file, line } };
    if (speaker) item.speaker = speaker;
    if (channel) item.channel = channel;
    catalog[id] = item;
    return item;
  }
  const introductions = {
    1: [block('v004-j02-intro', 'narration', 'Hétfő reggel Nóra a szokásos módon érkezik az iskolába. A szombati beszélgetés után megkönnyebbült, hogy végre megoszthatta valakivel, ami otthon történik. Ám amikor végigsétál a folyosón, akaratlanul is meghallja két osztálytársa beszélgetését. A saját családjáról beszélnek…', 13, null, null, LIST)],
    2: [block('v004-j03-intro', 'narration', 'Nóra még mindig a folyosón történteken gondolkodik. Nehezen tudja elhinni, hogy Áron megszegte az ígéretét. A telefonja egyszer csak jelez: üzenete érkezett. Áron írt neki…', 18, null, null, LIST)]
  };
  const monologues = {
    3: {
      A: block('v004-j06-A', 'thought', 'Azt írtam, hogy soha nem bocsátok meg. Tegnap ezt éreztem. Most még azt sem tudom, végig tudom-e hallgatni. Mi van, ha tényleg elveszítem a legjobb barátomat? De ha most engedek, nem fogja azt hinni, hogy bármit megtehet velem?', 8, 'Nóra'),
      B: block('v004-j06-B', 'thought', 'Az ígéretéről kérdeztem. Most is azt szeretném, hogy ne kerülje meg. Lehet, hogy tényleg segíteni akart, de akkor miért nem engem kérdezett meg előbb? Nem azt akarom hallani, hogy nem volt rossz szándéka. Azt szeretném tudni, érti-e egyáltalán, miért fájt ez ennyire.', 11, 'Nóra'),
      C: block('v004-j06-C', 'thought', 'Tegnap időt kértem. Attól, hogy ma találkozunk, még nem kell mindent eldöntenem. Nem tudom, mit mondjak neki. Hiányzik, hogy úgy beszélgessünk, mint régen, de attól még nem tudok úgy tenni, mintha nem történt volna semmi.', 14, 'Nóra'),
      D: block('v004-j06-D', 'thought', 'Azt írtam, nincs semmi baj. De van. Nem akarok tovább úgy beszélni, mintha nem fájna. Talán csak azt szerettem volna, hogy minden olyan legyen, mint régen. De most, hogy találkozunk, fogalmam sincs, hogyan mondjam el neki, hogy egyáltalán nincs rendben köztünk semmi.', 17, 'Nóra')
    },
    4: {
      A: block('v004-j10-A', 'thought', 'Tegnap végre a szemébe mondtam, mennyire megbántott. Nem is vártam meg, mit válaszol. Talán azért, mert féltem, hogy megint csak magyarázkodni fog. Most mégis azon gondolkodom, vajon megértette-e, miért volt ez nekem ennyire fontos. Nem tudom, akarok-e még beszélni vele.', 97, 'Nóra'),
      B: block('v004-j10-B', 'thought', 'Tegnap végighallgatott. Nem szakított félbe, nem próbálta megmagyarázni, miért volt igaza. Azt mondta, nem gondolta végig. De vajon ez elég? Jólesett, hogy végre kimondhattam, amit érzek. Attól még nem tudom, képes leszek-e újra megbízni benne.', 100, 'Nóra'),
      C: block('v004-j10-C', 'thought', 'Tegnap nem akartam meghallgatni. Egyszerűen túl sok volt az egész. Áron nem erőltette, és nem jött utánam. Most legalább van egy kis nyugalmam. De attól, hogy nem beszélünk róla, még ugyanúgy fáj, ami történt. Nem tudom, mikor leszek kész arra, hogy újra szóba álljak vele.', 103, 'Nóra'),
      D: block('v004-j10-D', 'thought', 'Tegnap azt mondtam neki, hogy én is elárulom a titkát. Láttam rajta, mennyire megijedt. Akkor annyira dühös voltam, hogy azt akartam, ő is érezze, amit én. De még nem mondtam el senkinek. És most nem tudom, mit kezdjek azzal, amit kimondtam.', 106, 'Nóra')
    }
  };
  const common = {
    3: [
      block('v004-j07-intro', 'narration', 'Áron az udvar szélén megállítja Nórát. Nem ér hozzá, nem állja el az útját. Nóra eldöntheti, hogy most akar-e beszélgetni.', 20),
      block('v004-j07-offer', 'speech', 'Elmondanám, mi történt, ha szeretnéd. Nem akarom azt mondani, hogy semmi baj nem volt.', 140, 'Áron', null, ORIGINAL),
      block('v004-j07-question', 'thought', 'Hallgassam meg? Vagy túl korai? Attól, hogy meghallgatom, még nem kell megbocsátanom.', 141, 'Nóra', null, ORIGINAL)
    ],
    4: [
      block('v004-j11-narration', 'narration', 'Csütörtök délután Nóra telefonja rezeg. Áron írt neki. Ezúttal nem akarja megmagyarázni, miért mondta el a titkát.', 111),
      block('v004-j11-apology', 'speech', 'Nóra, sokat gondolkodtam azon, ami történt. Megígértem, hogy nem mondom el senkinek, mégis megtettem. Nem Lili hibája, hogy megbíztam benne a titkoddal. Én szegtem meg az ígéretemet. Sajnálom, hogy megbántottalak. Nem várom, hogy most válaszolj, és azt sem, hogy azonnal megbocsáss.', 114, 'Áron', 'message'),
      block('v004-j11-thought', 'thought', 'Most először nem próbálja megmagyarázni, miért tette. Egyszerűen kimondta, hogy hibázott. Ezt vártam tőle. Akkor miért érzem még mindig ugyanazt a fájdalmat?', 117, 'Nóra')
    ]
  };
  const feedback = {
    3: {
      A: [
        block('v004-j09-A-1', 'speech', 'Elmondtam neki, hogy a szüleid különköltöznek. Nem tudtam, hogyan segítsek neked, ezért tanácsot kértem tőle. Megígérte, hogy nem adja tovább.', 24, 'Áron'),
        block('v004-j09-A-2', 'speech', 'De nekem meg te ígérted meg, hogy senkinek nem mondod el. Még Lilinek sem!', 26, 'Nóra'),
        block('v004-j09-A-3', 'speech', 'Tudom... Azt hittem, Lili tud segíteni.', 28, 'Áron'),
        block('v004-j09-A-4', 'speech', 'És engem miért nem kérdeztél meg? Nem az volt a dolgod, hogy megoldd a problémámat. Csak annyit kértem, hogy őrizd meg a titkomat!', 30, 'Nóra'),
        block('v004-j09-A-exit', 'narration', 'Nóra elfordul, és elindul az iskolaépület felé. Áron utána néz, de nem próbálja megállítani.', 32)
      ],
      B: [
        block('v004-j09-B-1', 'speech', 'Először azt szeretném, hogy megértsd, nekem ez mit jelentett.', 36, 'Nóra'),
        block('v004-j09-B-2', 'speech', 'Rendben. Hallgatlak.', 38, 'Áron'),
        block('v004-j09-B-3', 'speech', 'Amikor a folyosón meghallottam, hogy rólam beszélnek, először azt hittem, rosszul hallok. Aztán kimondták a nevedet. Tudod, milyen érzés volt rájönni, hogy pont attól tudják, akiben a legjobban bíztam?', 40, 'Nóra'),
        block('v004-j09-B-4', 'speech', 'Nem... Ezt nem gondoltam végig.', 42, 'Áron'),
        block('v004-j09-B-5', 'speech', 'Én nem azért mondtam el neked, hogy segíts megoldani. Csak kellett valaki, akinek elmondhatom, és aki nem adja tovább.', 44, 'Nóra'),
        block('v004-j09-B-silence', 'narration', 'Áron lehajtja a fejét. Egy pillanatig egyikük sem szólal meg.', 46),
        block('v004-j09-B-thought', 'thought', 'Most legalább végighallgatott. De vajon tényleg megértette, mit tett, vagy csak nem tudja, mit mondjon?', 49, 'Nóra'),
        block('v004-j09-B-close', 'narration', 'Áron nem próbálja megtörni a csendet. Nóra még nem tudja, mit gondoljon a beszélgetésről.', 51)
      ],
      C: [
        block('v004-j09-C-1', 'speech', 'Csak mentegetőzni akarsz. Nem érdekel, amit mondasz.', 55, 'Nóra'),
        block('v004-j09-C-2', 'speech', 'Nem mentegetőzni akarok. Csak szeretném, ha tudnád, mi történt.', 57, 'Áron'),
        block('v004-j09-C-3', 'speech', 'Tudom, mi történt! Elmondtad Lilinek azt, amit rád bíztam. Most mit mondhatnál, amitől ez megváltozna?', 59, 'Nóra'),
        block('v004-j09-C-pause', 'narration', 'Áron egy pillanatig hallgat, majd hátralép.', 61),
        block('v004-j09-C-4', 'speech', 'Igazad van. Attól, hogy elmagyarázom, még nem változik meg. Rendben. Ha később mégis szeretnél beszélni, itt vagyok.', 63, 'Áron'),
        block('v004-j09-C-5', 'speech', 'Most nem akarok.', 65, 'Nóra'),
        block('v004-j09-C-exit', 'narration', 'Nóra elindul az iskolaépület felé. Áron nem követi, és nem szól utána.', 67)
      ],
      D: [
        block('v004-j09-D-1', 'speech', 'Ha te elmondtad a titkomat, én is elárulom a tiedet mindenkinek!', 73, 'Nóra'),
        block('v004-j09-D-look', 'narration', 'Nóra dühösen Áron szemébe néz.', 75),
        block('v004-j09-D-2', 'speech', 'Nóra… Ezt most komolyan mondod?', 77, 'Áron'),
        block('v004-j09-D-fear', 'narration', 'Áron arcáról eltűnik minden remény. Láthatóan megijed.', 79),
        block('v004-j09-D-3', 'speech', 'Most már tudod, milyen érzés attól félni, hogy mások megtudják a titkodat!', 81, 'Nóra'),
        block('v004-j09-D-exit', 'narration', 'Áron hátralép, elfordul, és szó nélkül elindul. Nóra ott marad az iskolaudvaron.', 83)
      ]
    },
    4: {
      A: [
        block('v004-j12-A-1', 'speech', 'Köszönöm, hogy elismerted. Még mindig fáj.', 124, 'Nóra', 'message'),
        block('v004-j12-A-2', 'speech', 'Értem. Mit szeretnél, mit tegyek a pletykával?', 126, 'Áron', 'message'),
        block('v004-j12-A-3', 'speech', 'Nem tudom, Áron. Nem nekem kellene kitalálnom, hogyan hozd helyre.', 128, 'Nóra', 'message'),
        block('v004-j12-A-4', 'speech', 'Igazad van. Átgondolom, mit tehetek.', 130, 'Áron', 'message'),
        block('v004-j12-A-close', 'narration', 'Nóra leteszi a telefont. Egyelőre nem ír többet.', 132)
      ],
      B: [
        block('v004-j12-B-1', 'speech', 'Most nem tudok megbocsátani. Kérlek, adj időt.', 135, 'Nóra', 'message'),
        block('v004-j12-B-2', 'speech', 'Rendben. Nem sürgetlek.', 137, 'Áron', 'message'),
        block('v004-j12-B-close', 'narration', 'Nóra felhúzott térdekkel ül az ágyon. A telefonját végül félreteszi, az ablak felé néz.', 139)
      ],
      C: [
        block('v004-j12-C-1', 'speech', 'Nem akarok bosszút állni. De nem tudom, leszünk-e újra barátok.', 142, 'Nóra', 'message'),
        block('v004-j12-C-2', 'speech', 'Megértem. Nem akarom eldönteni helyetted.', 144, 'Áron', 'message'),
        block('v004-j12-C-close', 'narration', 'Nóra elolvassa Áron válaszát. Morcos, dacos arccal karba teszi a kezét. Nem ír többet.', 146)
      ],
      D: [
        block('v004-j12-D-1', 'speech', 'Nem érdekel. Ne írj többet.', 149, 'Nóra', 'message'),
        block('v004-j12-D-silence', 'narration', 'Áron nem küld több személyes üzenetet Nórának.', 151),
        block('v004-j12-D-close', 'narration', 'Áron elolvassa az üzenetet, de nem válaszol. Nóra telefonja csendben marad.', 153)
      ]
    }
  };

  function sceneBlocks(state, originalBlocks) {
    if (state.scene === 1) {
      return introductions[1].concat(originalBlocks.filter(item => !(item.source && item.source.file === ORIGINAL && item.source.line === 71)));
    }
    if (state.scene === 2) {
      return introductions[2].concat(originalBlocks.filter(item => item.id !== 's2-public' &&
        !(item.source && item.source.file === ORIGINAL && [105, 136].includes(item.source.line))));
    }
    if (state.scene === 3 || state.scene === 4) {
      const selected = monologues[state.scene][state.decisions[state.scene - 1]];
      return (selected ? [selected] : []).concat(common[state.scene]);
    }
    return originalBlocks;
  }
  function feedbackBlocks(state, originalBlocks) {
    const choices = feedback[state.scene];
    return choices && choices[state.decisions[state.scene]] || originalBlocks;
  }
  return { introductions, monologues, common, feedback, catalog, sceneBlocks, feedbackBlocks };
});
