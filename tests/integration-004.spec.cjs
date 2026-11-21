const { test, expect } = require('@playwright/test');
const crypto = require('node:crypto');
const engine = require('../js/engine.js');
const story = require('../js/story.js');
const adaptations = require('../js/adaptations.js');
const revisions = require('../js/revisions.js');
const KEY = engine.STORAGE_KEY;
const NAV_KEY = require('../js/navigation.js').STORAGE_KEY;
const main = page => page.locator('#main-content');
const action = (page, name) => page.locator(`[data-action="${name}"]`);
const saved = page => page.evaluate(key => JSON.parse(sessionStorage.getItem(key)), KEY);
const INTRO1 = 'Hétfő reggel Nóra a szokásos módon érkezik az iskolába. A szombati beszélgetés után megkönnyebbült, hogy végre megoszthatta valakivel, ami otthon történik. Ám amikor végigsétál a folyosón, akaratlanul is meghallja két osztálytársa beszélgetését. A saját családjáról beszélnek…';
const INTRO2 = 'Nóra még mindig a folyosón történteken gondolkodik. Nehezen tudja elhinni, hogy Áron megszegte az ígéretét. A telefonja egyszer csak jelez: üzenete érkezett. Áron írt neki…';
const INTRO3 = 'Áron az udvar szélén megállítja Nórát. Nem ér hozzá, nem állja el az útját. Nóra eldöntheti, hogy most akar-e beszélgetni.';
const APOLOGY = 'Nóra, sokat gondolkodtam azon, ami történt. Megígértem, hogy nem mondom el senkinek, mégis megtettem. Nem Lili hibája, hogy megbíztam benne a titkoddal. Én szegtem meg az ígéretemet. Sajnálom, hogy megbántottalak. Nem várom, hogy most válaszolj, és azt sem, hogy azonnal megbocsáss.';
// Expected wording comes from the approved cumulative document, independently
// of the application's revision and image mapping data.
const MONO3 = {
  A: 'Azt írtam, hogy soha nem bocsátok meg. Tegnap ezt éreztem. Most még azt sem tudom, végig tudom-e hallgatni. Mi van, ha tényleg elveszítem a legjobb barátomat? De ha most engedek, nem fogja azt hinni, hogy bármit megtehet velem?',
  B: 'Az ígéretéről kérdeztem. Most is azt szeretném, hogy ne kerülje meg. Lehet, hogy tényleg segíteni akart, de akkor miért nem engem kérdezett meg előbb? Nem azt akarom hallani, hogy nem volt rossz szándéka. Azt szeretném tudni, érti-e egyáltalán, miért fájt ez ennyire.',
  C: 'Tegnap időt kértem. Attól, hogy ma találkozunk, még nem kell mindent eldöntenem. Nem tudom, mit mondjak neki. Hiányzik, hogy úgy beszélgessünk, mint régen, de attól még nem tudok úgy tenni, mintha nem történt volna semmi.',
  D: 'Azt írtam, nincs semmi baj. De van. Nem akarok tovább úgy beszélni, mintha nem fájna. Talán csak azt szerettem volna, hogy minden olyan legyen, mint régen. De most, hogy találkozunk, fogalmam sincs, hogyan mondjam el neki, hogy egyáltalán nincs rendben köztünk semmi.'
};
const MONO4 = {
  A: 'Tegnap végre a szemébe mondtam, mennyire megbántott. Nem is vártam meg, mit válaszol. Talán azért, mert féltem, hogy megint csak magyarázkodni fog. Most mégis azon gondolkodom, vajon megértette-e, miért volt ez nekem ennyire fontos. Nem tudom, akarok-e még beszélni vele.',
  B: 'Tegnap végighallgatott. Nem szakított félbe, nem próbálta megmagyarázni, miért volt igaza. Azt mondta, nem gondolta végig. De vajon ez elég? Jólesett, hogy végre kimondhattam, amit érzek. Attól még nem tudom, képes leszek-e újra megbízni benne.',
  C: 'Tegnap nem akartam meghallgatni. Egyszerűen túl sok volt az egész. Áron nem erőltette, és nem jött utánam. Most legalább van egy kis nyugalmam. De attól, hogy nem beszélünk róla, még ugyanúgy fáj, ami történt. Nem tudom, mikor leszek kész arra, hogy újra szóba álljak vele.',
  D: 'Tegnap azt mondtam neki, hogy én is elárulom a titkát. Láttam rajta, mennyire megijedt. Akkor annyira dühös voltam, hogy azt akartam, ő is érezze, amit én. De még nem mondtam el senkinek. És most nem tudom, mit kezdjek azzal, amit kimondtam.'
};
const BRANCHES = [
  { scene: 3, letter: 'A', file: '03A_szembesites_kovetkezmeny.webp', texts: ['De nekem meg te ígérted meg, hogy senkinek nem mondod el. Még Lilinek sem!', 'És engem miért nem kérdeztél meg? Nem az volt a dolgod, hogy megoldd a problémámat. Csak annyit kértem, hogy őrizd meg a titkomat!'] },
  { scene: 3, letter: 'B', file: '03B_meghallgatas_kovetkezmeny.webp', texts: ['Rendben. Hallgatlak.', 'Nem... Ezt nem gondoltam végig.', 'Most legalább végighallgatott. De vajon tényleg megértette, mit tett, vagy csak nem tudja, mit mondjon?'] },
  { scene: 3, letter: 'C', file: '03C_beszelgetes_elutasitasa_kovetkezmeny.webp', texts: ['Most nem akarok.', 'Ha később mégis szeretnél beszélni, itt vagyok.'] },
  { scene: 3, letter: 'D', file: '03D_fenyegetes_kovetkezmeny.webp', texts: ['Ha te elmondtad a titkomat, én is elárulom a tiedet mindenkinek!', 'Most már tudod, milyen érzés attól félni, hogy mások megtudják a titkodat!'] },
  { scene: 4, letter: 'A', file: '04A_fajdalom_es_felelosseg.webp', texts: ['Köszönöm, hogy elismerted. Még mindig fáj.', 'Nem tudom, Áron. Nem nekem kellene kitalálnom, hogyan hozd helyre.', 'Igazad van. Átgondolom, mit tehetek.'] },
  { scene: 4, letter: 'B', file: '04B_idokeres.webp', texts: ['Most nem tudok megbocsátani. Kérlek, adj időt.', 'Rendben. Nem sürgetlek.'] },
  { scene: 4, letter: 'C', file: '04C_bosszu_es_baratsag.webp', texts: ['Nem akarok bosszút állni. De nem tudom, leszünk-e újra barátok.', 'Megértem. Nem akarom eldönteni helyetted.'] },
  { scene: 4, letter: 'D', file: '04D_ne_irj_tobbet_JOVAHAGYOTT.webp', texts: ['Nem érdekel. Ne írj többet.', 'Áron nem küld több személyes üzenetet Nórának.'] }
];
const COMMON = { 3: '03_jelenet_kozosen_nyito_kepregeny.webp', 4: '04_kozos_bocsanatkeres.webp' };
async function phase(page, view, scene) {
  await expect(main(page)).toHaveAttribute('data-view', view);
  await expect(main(page)).toHaveAttribute('data-scene', String(scene));
  await expect(action(page, 'screen-back')).toBeVisible();
  await expect(action(page, 'screen-forward')).toBeVisible();
  expect(await page.evaluate(() => document.documentElement.scrollWidth <= innerWidth)).toBe(true);
}
async function begin(page) {
  await page.goto('/');
  await phase(page, 'start', 0);
  await action(page, 'start').click();
  await phase(page, 'scene', 0);
  await action(page, 'next').click();
  await phase(page, 'scene', 1);
}
async function select(page, scene, letter) {
  await phase(page, 'scene', scene);
  await page.locator('#choice-' + letter).click();
  await phase(page, 'feedback', scene);
  expect((await saved(page)).decisions[scene]).toBe(letter);
}
async function next(page, scene) {
  await action(page, 'next').click();
  await phase(page, 'scene', scene);
}
async function throughTwo(page, second = 'B') {
  await begin(page);
  await select(page, 1, 'C'); await next(page, 2);
  await select(page, 2, second); await next(page, 3);
}
function targetState(scene, decisions = {}) {
  let result = engine.transition(engine.createState(), { type: 'START' }, story);
  result = engine.transition(result, { type: 'NEXT' }, story);
  for (let number = 1; number < scene; number++) {
    result = engine.transition(result, { type: 'SELECT', value: decisions[number] || (number === 1 ? 'C' : 'B') }, story);
    result = engine.transition(result, { type: 'NEXT' }, story);
  }
  expect(engine.normalize(result, story)).not.toBeNull();
  return result;
}
async function seed(page, scene, decisions) {
  await page.goto('/');
  const snapshot = targetState(scene, decisions);
  await page.evaluate(({ key, navKey, snapshot }) => {
    sessionStorage.setItem(key, JSON.stringify(snapshot));
    sessionStorage.removeItem(navKey);
  }, { key: KEY, navKey: NAV_KEY, snapshot });
  await page.reload();
  await phase(page, 'scene', scene);
}
async function loaded(page, file) {
  const comic = main(page).locator('.comic');
  await expect(comic).toHaveCount(1);
  const image = comic.locator('img.comic-image');
  await expect(image).toHaveAttribute('src', 'design/references/' + file);
  await image.scrollIntoViewIfNeeded();
  await expect.poll(() => image.evaluate(node => node.complete && node.naturalWidth > 0)).toBe(true);
  const dimensions = await image.evaluate(node => ({ rendered: node.clientWidth / node.clientHeight, natural: node.naturalWidth / node.naturalHeight, fit: getComputedStyle(node).objectFit }));
  expect(dimensions.rendered).toBeCloseTo(dimensions.natural, 2);
  expect(dimensions.fit).toBe('contain');
  await expect(comic.locator('.comic-transcript')).toBeVisible();
  await expect(comic.locator('details.comic-transcript')).not.toHaveAttribute('open');
  await expect(comic.locator('summary')).toHaveText('Szöveg');
  await expect(comic.locator('.comic-source-fallback')).toBeHidden();
  await comic.locator('summary').click();
  await expect(comic.locator('.comic-transcript')).toHaveAttribute('open');
  return comic;
}
async function before(left, right) {
  expect(await left.evaluate((node, target) => !!(node.compareDocumentPosition(document.querySelector(target)) & Node.DOCUMENT_POSITION_FOLLOWING), right)).toBe(true);
}

test('J–01/J–02/J–03: alapértelmezett átirat, külön felvezetők és a két tiltott extra blokk hiánya', async ({ page }) => {
  await begin(page);
  await loaded(page, '01_jelenet_a_folyoson_kozosen.webp');
  const intro = main(page).locator('.scene-card > .story-block').filter({ hasText: INTRO1 });
  await expect(intro).toHaveCount(1);
  await before(intro, '.comic');
  await select(page, 1, 'A'); await next(page, 2);
  const secondIntro = main(page).locator('.scene-card > .story-block').filter({ hasText: INTRO2 });
  await expect(secondIntro).toHaveCount(1);
  await before(secondIntro, '.comic');
  const comic = await loaded(page, '02_jelenet_aron_elso_uzenete_kozosen.webp');
  await expect(main(page)).not.toContainText('A folyosón mindenki felénk fordult. Jó volt végre kimondani, de most még nehezebb megszólalnom.');
  await expect(main(page)).not.toContainText('Kérlek, ezt ne az egész osztály előtt beszéljük meg.');
  const speech = 'Nóra, beszélhetünk? Tudom, hogy dühös vagy. Nem akartalak megbántani. Csak tanácsot kértem Lilitől.';
  await expect(comic.locator('.comic-transcript')).toContainText(speech);
  await expect(main(page).locator('.block-text:visible').filter({ hasText: speech })).toHaveCount(1);
  await expect(main(page).getByRole('button', { name: /szöveg(?:es)? átirat/i })).toHaveCount(0);
});

test('J–04 és nyitott J–05: nincs ismétlődő 2A idézet, a 2B kép eredeti és változatlan', async ({ page }) => {
  await seed(page, 2, { 1: 'A' });
  await select(page, 2, 'A');
  const comic = await loaded(page, '02A_soha_nem_bocsatom_meg_kovetkezmeny.webp');
  await expect(main(page).locator('.selected-answer')).toHaveCount(0);
  await expect(comic.locator('figcaption')).not.toContainText('Ezt soha nem bocsátom meg neked!');
  await expect(main(page).locator('.block-text:visible').filter({ hasText: 'Most az egész osztály tudja. Ezt soha nem bocsátom meg neked!' })).toHaveCount(1);
  const response = await page.request.get('/design/references/02B_igeret_szamonkerese_kovetkezmeny.webp');
  expect(response.ok()).toBe(true);
  expect(crypto.createHash('sha256').update(await response.body()).digest('hex')).toBe('52140e7b0678eba2ced8e0c537c59847ebf776ff9b499a8dc87f02488068f2a9');
});

for (const letter of ['A', 'B', 'C', 'D']) {
  test('J–06/J–07: a 2/' + letter + ' után pontosan a jóváhagyott 3. jelenetbeli monológ és sorrend látszik', async ({ page }) => {
    await throughTwo(page, letter);
    const monologue = main(page).locator('.scene-card > .story-block.thought').filter({ hasText: MONO3[letter] });
    await expect(monologue).toHaveCount(1);
    await expect(monologue.locator('.block-text')).toHaveText(MONO3[letter]);
    const narration = main(page).locator('.scene-card > .story-block.narration').filter({ hasText: INTRO3 });
    await expect(narration).toHaveCount(1);
    await before(monologue, '.scene-card > .story-block.narration');
    await before(narration, '.comic');
    await loaded(page, COMMON[3]);
    await before(main(page).locator('.comic'), '.choice-panel');
    for (const other of ['A', 'B', 'C', 'D'].filter(item => item !== letter)) await expect(main(page)).not.toContainText(MONO3[other]);
    expect((await saved(page)).decisions[2]).toBe(letter);
  });

  test('J–10/J–11: a 3/' + letter + ' után a megfelelő monológ és a változatlan közös bocsánatkérés látszik', async ({ page }) => {
    await throughTwo(page);
    await select(page, 3, letter); await next(page, 4);
    const monologue = main(page).locator('.scene-card > .story-block.thought').filter({ hasText: MONO4[letter] });
    await expect(monologue).toHaveCount(1);
    await expect(monologue.locator('.block-text')).toHaveText(MONO4[letter]);
    await before(monologue, '.comic');
    const comic = await loaded(page, COMMON[4]);
    await expect(comic.locator('.comic-transcript')).toContainText(APOLOGY);
    await expect(main(page).locator('.block-text:visible').filter({ hasText: APOLOGY })).toHaveCount(1);
    for (const other of ['A', 'B', 'C', 'D'].filter(item => item !== letter)) await expect(main(page)).not.toContainText(MONO4[other]);
    await expect(comic.locator('.comic-media')).not.toContainText('4. jelenet');
    expect((await saved(page)).decisions[3]).toBe(letter);
  });
}

for (const item of BRANCHES) test('J–08/J–09/J–12: a ' + item.scene + '/' + item.letter + ' döntés saját jóváhagyott képet és szöveget kap', async ({ page }) => {
  await seed(page, item.scene);
  await select(page, item.scene, item.letter);
  const comic = await loaded(page, item.file);
  for (const text of item.texts) await expect(comic.locator('.comic-transcript')).toContainText(text);
  await expect(main(page).locator('.selected-answer')).toHaveCount(0);
  await expect(comic.locator('.comic-media')).not.toContainText(/Nóra:|Áron:|Nóra · belső gondolat|4\. jelenet/);
  if (item.scene === 3 && item.letter === 'C') {
    await expect(comic.locator('.comic-transcript .story-block.thought')).toHaveCount(0);
    await expect(main(page)).not.toContainText('Nincs külön, Nórát elítélő');
  }
  if (item.scene === 3 && item.letter === 'D') {
    const facts = engine.facts(await saved(page));
    expect(facts.revengeThreat).toBe(true);
    expect(facts.retaliation).toBe(false);
    expect((await saved(page)).publications).toEqual({});
  }
  if (item.scene === 4 && item.letter === 'B') await expect(main(page)).not.toContainText('Nincs új monológ');
  if (item.scene === 4 && item.letter === 'C') await expect(comic.locator('.comic-transcript')).toContainText('bosszút');
  if (item.scene === 4 && item.letter === 'D') {
    await expect(comic.locator('.comic-transcript .story-block.speech').filter({ has: page.locator('.speaker', { hasText: 'Áron' }) })).toHaveCount(0);
    await expect(comic.locator('.comic-transcript')).not.toContainText('Rendben');
    expect(engine.facts(await saved(page)).noContact).toBe(true);
  }
});

test('A 2., 3. és 4. döntés visszalépéses módosítása frissíti a monológot, képet és határállapotot, újratöltés után is', async ({ page }) => {
  await throughTwo(page, 'B');
  await action(page, 'screen-back').click(); await phase(page, 'feedback', 2);
  await action(page, 'screen-back').click(); await phase(page, 'scene', 2);
  await select(page, 2, 'D'); await next(page, 3);
  await expect(main(page)).toContainText(MONO3.D);
  await expect(main(page)).not.toContainText(MONO3.B);
  await select(page, 3, 'C'); await loaded(page, '03C_beszelgetes_elutasitasa_kovetkezmeny.webp'); await next(page, 4);
  await expect(main(page)).toContainText(MONO4.C);
  await action(page, 'screen-back').click(); await phase(page, 'feedback', 3);
  await action(page, 'screen-back').click(); await phase(page, 'scene', 3);
  await select(page, 3, 'D'); await loaded(page, '03D_fenyegetes_kovetkezmeny.webp'); await next(page, 4);
  await expect(main(page)).toContainText(MONO4.D);
  await expect(main(page)).not.toContainText(MONO4.C);
  const beforeReload = await saved(page);
  await page.reload(); await phase(page, 'scene', 4);
  expect(await saved(page)).toEqual(beforeReload);
  await expect(main(page)).toContainText(MONO4.D);
  await page.goBack(); await phase(page, 'feedback', 3); await loaded(page, '03D_fenyegetes_kovetkezmeny.webp');
  await page.goForward(); await phase(page, 'scene', 4); await loaded(page, COMMON[4]);
  await select(page, 4, 'D'); await loaded(page, '04D_ne_irj_tobbet_JOVAHAGYOTT.webp');
  expect(engine.facts(await saved(page)).noContact).toBe(true);
  await action(page, 'screen-back').click(); await phase(page, 'scene', 4);
  await select(page, 4, 'A'); await loaded(page, '04A_fajdalom_es_felelosseg.webp');
  expect(engine.facts(await saved(page)).noContact).toBe(false);
  await next(page, 5);
  await expect(main(page)).not.toContainText('Árontól nem érkezik új személyes üzenet.');
});

test('J4–D után az ötödik és hatodik jelenet sem küld tiltott személyes Áron-üzenetet', async ({ page }) => {
  await throughTwo(page);
  await select(page, 3, 'C'); await next(page, 4);
  await select(page, 4, 'D');
  await loaded(page, '04D_ne_irj_tobbet_JOVAHAGYOTT.webp');
  for (const scene of [5, 6]) {
    await next(page, scene);
    expect(engine.facts(await saved(page)).noContact).toBe(true);
    await expect(main(page).locator('.story-block.speech[data-channel="message"]').filter({ has: page.locator('.speaker', { hasText: 'Áron' }) })).toHaveCount(0);
    if (scene === 5) {
      await expect(main(page)).toContainText('Lili már nem beszél rólad. Áron szólt neki.');
      await select(page, 5, 'C');
    }
  }
});

test('Mind a tíz új kép hibája esetén a jóváhagyott szöveg, a döntések és az állapot használhatók maradnak', async ({ page }) => {
  test.setTimeout(90000);
  await page.route('**/design/references/03*.webp', route => route.abort());
  await page.route('**/design/references/04*.webp', route => route.abort());
  const entries = [
    { scene: 3, file: COMMON[3] }, { scene: 4, file: COMMON[4] }, ...BRANCHES
  ];
  for (const item of entries) {
    await seed(page, item.scene);
    if (item.letter) await select(page, item.scene, item.letter);
    const snapshot = await saved(page);
    const comic = main(page).locator('.comic');
    await expect(comic.locator('.comic-source-fallback')).toBeVisible();
    await expect(comic.locator('.comic-media')).toBeHidden();
    await expect(comic.locator('.comic-transcript')).toBeHidden();
    const blocks = item.letter ? revisions.feedbackBlocks(snapshot, adaptations.feedbackBlocks(snapshot, story, engine)) : revisions.sceneBlocks(snapshot, adaptations.blocksForScene(snapshot, story, engine));
    for (const block of blocks) await expect(main(page)).toContainText(block.text);
    expect(await saved(page)).toEqual(snapshot);
    if (item.letter) await expect(action(page, 'next')).toBeEnabled();
    else await expect(main(page).locator('button.choice-card')).toHaveCount(4);
  }
});

test('Az új jelenet csak az aktuális képet kéri le, és annak nagyítása változatlan navigációval zárható be', async ({ page }) => {
  await page.goto('/');
  const snapshot = targetState(3, { 1: 'C', 2: 'B' });
  await page.evaluate(({ key, navKey, snapshot }) => { sessionStorage.setItem(key, JSON.stringify(snapshot)); sessionStorage.removeItem(navKey); }, { key: KEY, navKey: NAV_KEY, snapshot });
  const requests = [];
  page.on('request', request => { if (/\/design\/references\/.*\.webp$/.test(request.url())) requests.push(new URL(request.url()).pathname); });
  await page.reload(); await phase(page, 'scene', 3);
  const comic = await loaded(page, COMMON[3]);
  expect([...new Set(requests)]).toEqual(['/design/references/' + COMMON[3]]);
  const beforeZoom = await saved(page);
  const historyLength = await page.evaluate(() => history.length);
  const opener = comic.locator('[data-action="open-comic"]');
  await opener.click();
  await expect(page.locator('#comic-dialog')).toBeVisible();
  await action(page, 'comic-zoom-in').click();
  await expect.poll(() => page.locator('.comic-viewer-scroll').evaluate(node => node.scrollWidth > node.clientWidth)).toBe(true);
  expect(await page.evaluate(() => document.documentElement.scrollWidth <= innerWidth)).toBe(true);
  await action(page, 'close-comic').click();
  await expect(opener).toBeFocused();
  expect(await saved(page)).toEqual(beforeZoom);
  expect(await page.evaluate(() => history.length)).toBe(historyLength);
});
