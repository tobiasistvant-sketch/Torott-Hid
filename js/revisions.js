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

  // v1.0 additions retain the approved J0–J4 catalog above unchanged.
  const narrations = { 6: {} };
  monologues[5] = {
    A: block("v1-j13-A", "thought", "Azt mondtam Áronnak, hogy nem nekem kell kitalálnom, hogyan hozza helyre, amit elrontott. Ő azt ígérte, átgondolja. Azóta azon kapom magam, hogy figyelem, történik-e valami. De honnan fogom tudni, hogy tényleg tett valamit? És ha megpróbálja helyrehozni, nem lesz abból még több beszéd rólam?", 171, "Nóra"),
    B: block("v1-j13-B", "thought", "Áron tényleg nem sürgetett. Nem kérdezte meg újra, hogy megbocsátok-e, és nem próbált úgy beszélni velem, mintha minden rendben lenne. Jólesett, hogy békén hagyott. Csakhogy attól, hogy én időt kértem, a többiek még ugyanúgy beszélhetnek rólam. Nem akarok újra belekeveredni ebbe az egészbe. De meddig lehet úgy várni, hogy közben semmi sem változik?", 174, "Nóra"),
    C: block("v1-j13-C", "thought", "Azt mondtam, nem akarok bosszút állni. És ezt komolyan is gondoltam. De attól még dühös vagyok, amikor eszembe jut, hogy mások a családomról beszélnek. Áron szeretné, ha újra megbíznék benne. Csakhogy most nem a barátságunkról akarok dönteni. Előbb azt szeretném, hogy végre ne legyen mindenkinek köze ahhoz, ami otthon történik.", 177, "Nóra"),
    D: block("v1-j13-D", "thought", "Áron nem írt többet. Pontosan azt tette, amit kértem. Először megkönnyebbültem, hogy nem kell újabb üzeneteket olvasnom tőle. Aztán egy osztálytársamtól megtudtam, hogy beszélt Lilivel, és megkérte, ne terjessze tovább a történetemet. Nem szólt róla nekem. Talán mert megtiltottam, hogy keressen. Most nem tudom, sikerült-e bármit elérnie. És azt sem, akarok-e egyáltalán beszélni vele erről.", 180, "Nóra")
  };
  narrations[6] = {
    A: block("v1-j17-narr-A", "narration", "Három hét telt el. Áron beszélt Lilivel, és azóta nem avatkozott bele újra Nóra ügyébe. Az iskolában lassan elcsendesedtek a találgatások, bár néha még felbukkan egy-egy félmondat. Nóra és Áron ezalatt alig beszéltek egymással. Most egy közös osztályprojekt miatt ismét egymás mellé kerülnek.", 237),
    B: block("v1-j17-narr-B", "narration", "Áron három héttel ezelőtt az osztály előtt ismerte el, hogy továbbadott egy rábízott titkot. Nóra családjáról nem árult el újabb részleteket. Néhány osztálytárs azonban még utána is kérdezősködött, mások viszont abbahagyták a találgatást. Azóta Nóra többször észrevette, hogy Áron mintha mondani szeretne neki valamit, de végül egyikük sem kezdeményezett beszélgetést. Most egy osztályprojektben együtt kell dolgozniuk.", 244),
    C: block("v1-j17-narr-C", "narration", "Három hét telt el azóta, hogy Nóra elutasította Áron további segítségét. Áron nem próbálta rábeszélni semmire, és nem kereste személyes beszélgetéssel. Az iskolában néha találkoztak, de többnyire elmentek egymás mellett. Nóra közben megtanulta, milyen nélküle tölteni a szüneteket. Most egy közös osztályprojekt miatt mégis egymás mellé ültetik őket.", 251),
    D: block("v1-j17-narr-D", "narration", "Három héttel ezelőtt Nóra az osztály közös csoportjába írta azt, amit Áron korábban bizalmasan elmondott neki. Az üzenetet többen elolvasták, és hamar beszédtéma lett belőle. Áron azóta kerüli Nórát. Nem veszekedett vele, nem próbált visszavágni, egyszerűen megszakította a személyes kapcsolatot. Most egy közös osztályprojektben mégis egymás mellé kerülnek. Áron szó nélkül előveszi a füzetét.", 258)
  };
  monologues[6] = {
    A: block("v1-j17-thought-A", "thought", "Végül tényleg beszélt Lilivel. Nem kérkedett vele, nem várta, hogy megköszönjem. És mostanában már nem fordulnak utánam annyian a folyosón. Néha azon kapom magam, hogy majdnem odaszólok neki valamit, ahogy régen. Aztán eszembe jut, ami történt. Vajon lehet még úgy beszélgetni vele, hogy ne gondoljak folyton arra, amit elmondott?", 240, "Nóra"),
    B: block("v1-j17-thought-B", "thought", "Amikor kiállt az osztály elé, azt hittem, elsüllyedek szégyenemben. Mindenki minket figyelt. De aztán, amikor valaki kérdezősködni kezdett, Áron nem mondott többet. Furcsa volt látni, hogy most éppen ő hallgatott el valamit, amit régen gondolkodás nélkül továbbadott. Nem tudom, segített-e ezzel, vagy csak még kellemetlenebb lett minden. De arra a pillanatra biztosan emlékezni fogok.", 247, "Nóra"),
    C: block("v1-j17-thought-C", "thought", "Azt mondtam, nincs szükségem a segítségére. Ő pedig tényleg békén hagyott. Eleinte jó volt, hogy nem kellett folyton azon gondolkodnom, mit mondjak neki. De közben valahogy hozzászoktam, hogy már nem ül mellettem a szünetekben, nem küld vicces képeket, és nem vár meg az iskola előtt. Most itt ül mellettem, és szinte idegennek érzem. Vajon ő is így van ezzel?", 254, "Nóra"),
    D: block("v1-j17-thought-D", "thought", "Amikor elküldtem azt az üzenetet, annyira dühös voltam, hogy látni akartam, mi történik. És történt is. Az osztályban napokig erről beszéltek. Áron pedig azóta úgy megy el mellettem, mintha ott sem lennék. Néha eszembe jut, mennyire szerettem volna, hogy megértse, mit éreztem, amikor az én titkom kiderült. Most már mindketten tudjuk, milyen, amikor valaki továbbadja azt, amit rábíztunk. Csak éppen egymással nem beszélünk.", 261, "Nóra")
  };
  common[5] = {
    ABC: [
      block("v1-j14-direct", "speech", "Szóltam Lilinek, hogy nem lett volna szabad továbbadni. Ha szeretnéd, nyilvánosan is vállalom, hogy tőlem indult. De nem akarok rólad beszélni az engedélyed nélkül.", 184, "Áron", "message"),
      block("v1-j14-answer-question", "thought", "Mit írjak vissza?", 186, "Nóra")
    ],
    D: [
      block("v1-j14-indirect-context", "narration", "Áron nem küld személyes üzenetet. Nóra egy osztálytársától tudja meg, hogy Áron beszélt Lilivel.", 189),
      block("v1-j14-classmate", "speech", "Lili már nem beszél rólad. Áron szólt neki.", 189, "Osztálytárs", "message"),
      block("v1-j14-own-initiative", "thought", "Írjak neki én?", 189, "Nóra")
    ]
  };
  common[6] = [
    block("v1-j18-classroom", "narration", "Nóra és Áron egymás mellett ül, de másfelé néznek", 104, null, null, LIST)
  ];
  feedback[5] = {
    A: [
      block("v1-j15-A-1", "speech", "Beszélj Lilivel, hogy álljon le. Kérlek, ne foglalkozzatok ezzel többet.", 194, "Nóra", "message"),
      block("v1-j15-A-2", "speech", "Lili, már beszéltünk erről, de még mindig terjed a pletyka. Kérlek, ne beszélj többet Nóra családjáról.", 196, "Áron"),
      block("v1-j15-A-3", "speech", "Jó, rendben. Nem hozom fel többet.", 198, "Lili"),
      block("v1-j15-A-4", "speech", "Beszéltem vele. Megígérte, hogy nem folytatja.", 200, "Áron", "message"),
      block("v1-j15-A-5", "narration", "Nóra elolvassa az üzenetet, félreteszi a telefonját, és nem válaszol. A pletyka megszűnése nem garantált.", 202)
    ],
    B: [
      block("v1-j15-B-1", "speech", "Mondhatod az osztálynak azt is, hogy megszegted a bizalmamat. DE A CSALÁDOMRÓL egy szót se.", 205, "Nóra", "message"),
      block("v1-j15-B-2", "speech", "Figyeljetek, szeretnék mondani valamit. Nóra megbízott bennem, én meg továbbadtam olyasmit, amit nem kellett volna. Nagyon elrontottam.", 207, "Áron", "classroom"),
      block("v1-j15-B-3", "speech", "De akkor mi történt pontosan?", 209, "Osztálytárs", "classroom"),
      block("v1-j15-B-4", "speech", "Nem fogom elmondani. Pont ez volt a baj, hogy először sem kellett volna beszélnem róla.", 211, "Áron", "classroom"),
      block("v1-j15-B-5", "narration", "Nóra figyeli Áront, néhány diák összesúg. Nóra nem szólal meg.", 213)
    ],
    C: [
      block("v1-j15-C-1", "speech", "Nem kell a segítséged többé már.", 216, "Nóra", "message"),
      block("v1-j15-C-2", "speech", "Rendben. Nem erőltetem.", 218, "Áron", "message"),
      block("v1-j15-C-3", "narration", "Másnap az iskolai folyosón Áron és Nóra elhaladnak egymás mellett, nem kezdeményeznek beszélgetést.", 220)
    ],
    D: [
      block("v1-j15-D-1", "thought", "Majd én is közzéteszek rólad valamit, hogy érezd, milyen.", 223, "Nóra"),
      block("v1-j15-D-2", "speech", "Tudjátok, Áron valójában egy ideje pszichológushoz jár. Én tudom, mert bízott bennem, de már nem érdekel.", 227, "Nóra", "class-group"),
      block("v1-j15-D-3", "narration", "Nóra az osztály közös üzenetváltásában nyilvánosságra hozza Áron bizalmas információját, és megnyomja a küldés gombot. Az osztály reagál, Áron elolvassa. Nóra és Áron később elkerülik egymást.", 225)
    ]
  };
  feedback[6] = {
    A: [
      block("v1-j18-A-1", "speech", "Szeretném, ha lassan újra barátok lehetnénk. Nem egyik napról a másikra.", 267, "Nóra"),
      block("v1-j18-A-2", "speech", "Én is szeretném. De tudom, hogy időbe telik.", 269, "Áron"),
      block("v1-j18-A-3", "narration", "Egymás felé fordulnak, óvatos mosoly; visszatérnek a közös projektfüzethez.", 271)
    ],
    B: [
      block("v1-j18-B-1", "speech", "Szeretnék esélyt adni a beszélgetésnek, de most még bizonytalan vagyok.", 274, "Nóra"),
      block("v1-j18-B-2", "speech", "Rendben. Nem kell most eldöntenünk mindent.", 276, "Áron"),
      block("v1-j18-B-3", "narration", "Rövid szemkontaktus, majd közös munka. A feszültség még érződik.", 278)
    ],
    C: [
      block("v1-j18-C-1", "speech", "Nem akarok tovább haragudni rád. Megbocsátok, de nem hiszem, hogy ezek után ugyanolyan barátok tudnánk lenni, mint régen.", 281, "Nóra"),
      block("v1-j18-C-2", "speech", "Sajnálom, hogy így alakult. De megértem.", 283, "Áron"),
      block("v1-j18-C-3", "narration", "Egymásra néznek, majd külön folytatják a munkát.", 285)
    ],
    D: [
      block("v1-j18-D-1", "speech", "Kérlek, ne keress személyesen. Csak a szükséges iskolai ügyeket beszéljük meg.", 288, "Nóra"),
      block("v1-j18-D-2", "speech", "Rendben. Akkor maradjunk a projektnél.", 290, "Áron"),
      block("v1-j18-D-3", "narration", "Áron visszafordul a füzetéhez, Nóra is a feladatára figyel.", 292)
    ],
    E: [
      block("v1-j18-E-1", "speech", "Te komolyan azt hiszed, hogy ezek után minden mehet tovább, mintha semmi sem történt volna?", 295, "Nóra"),
      block("v1-j18-E-2", "speech", "Nem. De ezt most miért az egész osztály előtt kell megbeszélnünk?", 297, "Áron"),
      block("v1-j18-E-3", "speech", "Amikor az én titkomat elmondtad, akkor sem zavart, hogy mások is megtudják!", 299, "Nóra"),
      block("v1-j18-E-4", "narration", "Áron becsukja a füzetét, elfordul. Az osztály figyel, a tanár észreveszi a konfliktust.", 301)
    ]
  };
  // Nóra initiates each optional J5 reply. After J4–D, this permits only
  // that limited exchange; it does not remove the personal-contact boundary.
  for (const letter of ['A', 'B', 'C']) {
    feedback[5][letter][0].initiatedBy = 'Nóra';
    for (const item of feedback[5][letter].slice(1)) {
      if (item.speaker === 'Áron' && item.channel === 'message') item.inReplyTo = 'Nóra';
    }
  }
  const choiceOverrides = {};
  for (const number of [5, 6]) {
    choiceOverrides[number] = Object.fromEntries(Object.entries(feedback[number]).map(([letter, blocks]) => {
      const spoken = blocks.find(item => item.speaker === 'Nóra');
      return [letter, { label: '„' + spoken.text + '”', source: spoken.source }];
    }));
  }
  const publicationFact = 'Nóra az osztály közös üzenetváltásában nyilvánosságra hozza Áron bizalmas információját, és megnyomja a küldés gombot.';
  const endingQuestions = {
    common: 'Mit jelképezhet a híd Nóra és Áron történetében?',
    byEnding: {
      R1: 'Mit mutat a képen az, hogy mindketten elindultak a másik felé? Elég-e egy bocsánatkérés a bizalom helyreállításához?',
      R2: 'Miért állhatnak meg a szereplők egy félig megjavított híd két végén? Mi segíthet abban, hogy a kapcsolat ne siettetve, hanem biztonságosan alakuljon?',
      R3: 'Ha a híd járható, miért dönthetnek mégis a külön út mellett? Miben különbözik a megbocsátás a kibéküléstől?',
      R4: 'Mit jelenthet a lezárt kapu? Mikor fontos elfogadni a másik ember által kijelölt határt?',
      R5: 'Milyen döntések vezettek a híd összeomlásához? Minden összeomlott hidat újjá kell építeni?'
    },
    source: { file: 'docs/04_R_reflexios_kerdesek.md', commonLine: 5, byEndingLines: { R1: 8, R2: 11, R3: 14, R4: 17, R5: 20 } }
  };
  // These old summary sentences presuppose the superseded confirmation / J6
  // disclosure mechanic. They must not describe the new classroom exchange.
  const obsoleteSummaryClaims = new Set([
    'A megerősített nyilvános megtorlás új sérelmet okozott. A konfliktus másokat is bevont, és a bizalom tovább sérült. Ettől Áron eredeti titoksértéséért való felelőssége nem szűnt meg.',
    'A későbbi szándékod már változhatott, de a korábbi bántó nyilvános közlésedet még nem vontad vissza. A történet ezért most a tovább mélyülő konfliktusnál áll meg.'
  ]);
  function summary(state, originalSummary, engine) {
    const revised = originalSummary.filter(text => !obsoleteSummaryClaims.has(text));
    if (state.publications[5] === true) revised.splice(1, 0, narrations[6].D.text);
    if (engine.ending(state) === 'R5') {
      revised.push(...feedback[6][state.decisions[6]].filter(item => item.type === 'narration').map(item => item.text));
    }
    return revised;
  }

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
    if (state.scene === 5) {
      const selected = monologues[5][state.decisions[4]];
      const opening = common[5][state.decisions[4] === 'D' ? 'D' : 'ABC'];
      return (selected ? [selected] : []).concat(opening);
    }
    if (state.scene === 6) {
      const prior = state.decisions[5];
      return [narrations[6][prior], monologues[6][prior]].filter(Boolean).concat(common[6]);
    }
    return originalBlocks;
  }
  function feedbackBlocks(state, originalBlocks) {
    if (state.scene === 1 && state.decisions[1] === 'B') return [];
    const choices = feedback[state.scene];
    return choices && choices[state.decisions[state.scene]] || originalBlocks;
  }
  return { introductions, monologues, narrations, common, feedback, choiceOverrides, publicationFact, endingQuestions, catalog, sceneBlocks, feedbackBlocks, summary };
});
