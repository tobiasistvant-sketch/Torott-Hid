const { test, expect } = require('@playwright/test');
const fs = require('node:fs');
const path = require('node:path');
const engine = require('../js/engine.js');
const story = require('../js/story.js');
const adaptations = require('../js/adaptations.js');
const revisions = require('../js/revisions.js');
const routes = require('./routes.json');
const KEY = engine.STORAGE_KEY;
const NAV_KEY = require('../js/navigation.js').STORAGE_KEY;
const documentText = fs.readFileSync(path.join(__dirname, '../docs/02_szovegfrissitesek_0.0.4_TELJES.md'), 'utf8');
const reflectionText = fs.readFileSync(path.join(__dirname, '../docs/04_R_reflexios_kerdesek.md'), 'utf8');
const main = page => page.locator('#main-content');
const action = (page, name) => page.locator(`[data-action="${name}"]`);
const saved = page => page.evaluate(key => JSON.parse(sessionStorage.getItem(key)), KEY);
const NO_CONTACT_FILE = '05_kulon_D_kozvetett_hir.webp';
const DIRECT_FILE = '05_kozos_ABC_aron_uzenete.webp';
const CLASSROOM_FILE = '06_kozos_osztalyterem.webp';
const POST_TEXT = 'Tudjátok, Áron valójában egy ideje pszichológushoz jár. Én tudom, mert bízott bennem, de már nem érdekel.';
const WARNING = 'A tervezet még nem került nyilvánosságra.';
const WARNING_THOUGHT = 'Attól, hogy fáj, biztosan jobban leszek, ha neki is fáj?';
const END_FILES = {
  R1: 'R1_a_hid_ujjaepul.webp', R2: 'R2_a_hid_meg_epul.webp',
  R3: 'R3_megbocsatas_kulon_utakon.webp', R4: 'R4_lezart_hid.webp', R5: 'R5_osszeomlott_hid.webp'
};
const FEEDBACK_FILES = {
  5: { A: '05A_lilivel_beszel.webp', B: '05B_osztaly_elott_felelosseg.webp', C: '05C_segites_elutasitasa.webp', D: '05D_bosszu_kozzetetel.webp' },
  6: { A: '06A_ujrakezdes.webp', B: '06B_bizonytalan_kozeledes.webp', C: '06C_megbocsatas_kulon_utak.webp', D: '06D_szemelyes_kapcsolat_lezarasa.webp', E: '06E_nyilvanos_szembesites.webp' }
};
// Read the independent approved manuscript, not the renderer's branch maps.
function section(start, text = documentText) {
  const lines = text.split(/\r?\n/), index = lines.findIndex(line => line.startsWith(start));
  if (index < 0) throw new Error('Missing approved document section: ' + start);
  const next = lines.findIndex((line, number) => number > index && /^#{1,2} /.test(line));
  return lines.slice(index + 1, next < 0 ? lines.length : next).join('\n');
}
const MONO5 = Object.fromEntries(['A', 'B', 'C', 'D'].map(letter => [letter, section('## J4–' + letter + ' → J5').split('\n').find(line => line.startsWith('> ')).slice(2)]));
const OPEN6 = Object.fromEntries(['A', 'B', 'C', 'D'].map(letter => [letter, section('## J5–' + letter + ' → J6').split('\n').filter(line => line.startsWith('> ')).map(line => line.slice(2))]));
const DIALOGUES = { 5: {}, 6: {} };
for (const number of [5, 6]) for (const letter of number === 5 ? ['A', 'B', 'C', 'D'] : ['A', 'B', 'C', 'D', 'E']) {
  const prefix = number === 5 && letter === 'D' ? '# J–16 – J5–D' : '## J' + number + '–' + letter + ' –';
  const approved = section(prefix).split('**Eltávolítandó')[0];
  DIALOGUES[number][letter] = Array.from(approved.matchAll(/„([^”]+)”/g), match => match[1]);
}
const QUESTIONS = Object.fromEntries(Object.keys(END_FILES).map(id => [id, section('## ' + id + ' –', reflectionText).split('\n').filter(line => line.trim() && !line.startsWith('**')).join('\n')]));

async function phase(page, view, scene) {
  await expect(main(page)).toHaveAttribute('data-view', view);
  await expect(main(page)).toHaveAttribute('data-scene', String(scene));
  await expect(action(page, 'screen-back')).toBeVisible();
  await expect(action(page, 'screen-forward')).toBeVisible();
  expect(await page.evaluate(() => document.documentElement.scrollWidth <= innerWidth)).toBe(true);
}
function snapshotAt(number, decisions = {}, view = 'scene') {
  let state = engine.transition(engine.createState(), { type: 'START' }, story);
  state = engine.transition(state, { type: 'NEXT' }, story);
  for (let scene = 1; scene < number; scene++) {
    state = engine.transition(state, { type: 'SELECT', value: decisions[scene] || (scene === 1 ? 'C' : scene === 3 ? 'A' : 'B') }, story);
    state = engine.transition(state, { type: 'NEXT' }, story);
  }
  if (view === 'feedback') state = engine.transition(state, { type: 'SELECT', value: decisions[number] || 'A' }, story);
  expect(engine.normalize(state, story)).not.toBeNull();
  return state;
}
async function seed(page, snapshot, suffix = '') {
  await page.goto('/');
  await page.evaluate(({ key, navKey, snapshot }) => {
    sessionStorage.setItem(key, JSON.stringify(snapshot));
    sessionStorage.removeItem(navKey);
  }, { key: KEY, navKey: NAV_KEY, snapshot });
  if (suffix) await page.goto('/?' + suffix);
  else await page.reload();
  await phase(page, snapshot.view, snapshot.scene);
}
async function choose(page, scene, letter) {
  await phase(page, 'scene', scene);
  await expect(page.locator('#choice-' + letter)).toBeEnabled();
  await page.locator('#choice-' + letter).click();
  await phase(page, 'feedback', scene);
  await expect(action(page, 'confirm')).toHaveCount(0);
  await expect(main(page)).not.toContainText(WARNING);
  await expect(main(page)).not.toContainText(WARNING_THOUGHT);
}
async function next(page, scene) {
  await action(page, 'next').click();
  await phase(page, scene === 7 ? 'ending' : 'scene', scene);
}
async function image(page, file) {
  const node = main(page).locator('img.comic-image');
  await expect(node).toHaveAttribute('src', 'design/references/' + file);
  await node.scrollIntoViewIfNeeded();
  await expect.poll(() => node.evaluate(img => img.complete && img.naturalWidth > 0)).toBe(true);
  const dimensions = await node.evaluate(img => ({ actual: img.clientWidth / img.clientHeight, natural: img.naturalWidth / img.naturalHeight, fit: getComputedStyle(img).objectFit }));
  expect(dimensions.actual).toBeCloseTo(dimensions.natural, 2);
  expect(dimensions.fit).toBe('contain');
  await expect(main(page).locator('.comic-transcript')).toBeVisible();
  await expect(main(page).locator('details, summary')).toHaveCount(0);
  await expect(main(page).locator('.bridge-illustration')).toHaveCount(0);
}
async function bridge(page, id) {
  const holder = main(page).locator('.bridge-illustration');
  await expect(holder).toHaveCount(1);
  await expect(holder).toHaveAttribute('data-bridge-id', id);
  const node = holder.locator('img');
  await expect(node).toHaveAttribute('src', 'design/references/' + (id === 'H0' ? 'H0_fokepernyo_ep_hid.webp' : END_FILES[id]));
  await expect(node).toHaveAttribute('alt', /\S+/);
  await node.scrollIntoViewIfNeeded();
  await expect.poll(() => node.evaluate(img => img.complete && img.naturalWidth > 0)).toBe(true);
  const dimensions = await node.evaluate(img => ({ actual: img.clientWidth / img.clientHeight, natural: img.naturalWidth / img.naturalHeight, fit: getComputedStyle(img).objectFit }));
  expect(dimensions.actual).toBeCloseTo(dimensions.natural, 2);
  expect(dimensions.fit).toBe('contain');
  await expect(holder.locator('.bridge-fallback')).toBeHidden();
}
function expectedEnding(fifth, sixth) {
  if (fifth === 'D' || sixth === 'E') return 'R5';
  if (sixth === 'C') return 'R3';
  if (sixth === 'D') return 'R4';
  if (sixth === 'B') return 'R2';
  return fifth === 'A' ? 'R1' : 'R2';
}
async function precedes(node, selector) {
  expect(await node.evaluate((element, target) => !!(element.compareDocumentPosition(document.querySelector(target)) & Node.DOCUMENT_POSITION_FOLLOWING), selector)).toBe(true);
}

for (const fourth of ['A', 'B', 'C', 'D']) for (const fifth of ['A', 'B', 'C', 'D']) {
  test('v1.0: J4/' + fourth + ' → J5/' + fifth + ' → mind az öt J6-választás, teljes 80-as ágellenőrzés', async ({ page }) => {
    test.setTimeout(90000);
    await seed(page, snapshotAt(4));
    await choose(page, 4, fourth);
    await next(page, 5);
    const monologue = main(page).locator('.scene-card > .story-block.thought .block-text');
    await expect(monologue).toHaveText(MONO5[fourth]);
    await precedes(monologue, '.comic');
    await image(page, fourth === 'D' ? NO_CONTACT_FILE : DIRECT_FILE);
    for (const other of ['A', 'B', 'C', 'D'].filter(letter => letter !== fourth)) await expect(main(page)).not.toContainText(MONO5[other]);
    const direct = main(page).locator('.comic-transcript .story-block.speech[data-channel="message"]').filter({ has: page.locator('.speaker', { hasText: 'Áron' }) });
    if (fourth === 'D') {
      await expect(direct).toHaveCount(0);
      await expect(main(page)).toContainText('Lili már nem beszél rólad. Áron szólt neki.');
      await expect(main(page)).toContainText('Írjak neki én?');
    } else await expect(direct).not.toHaveCount(0);
    await choose(page, 5, fifth);
    await image(page, FEEDBACK_FILES[5][fifth]);
    for (const text of DIALOGUES[5][fifth]) await expect(main(page).locator('.comic-transcript')).toContainText(text);
    const fifthState = await saved(page);
    expect(fifthState.decisions[4]).toBe(fourth);
    expect(fifthState.decisions[5]).toBe(fifth);
    expect(fifthState.publications).toEqual(fifth === 'D' ? { 5: true } : {});
    expect(engine.facts(fifthState).noContact).toBe(fourth === 'D');
    if (fourth === 'D' && ['A', 'B', 'C'].includes(fifth)) {
      await expect(main(page).locator('.comic-transcript .story-block.speech .speaker').first()).toContainText('Nóra');
      expect(engine.facts(fifthState).limitedOutreach).toBe(true);
    }
    await next(page, 6);
    const narration = main(page).locator('.scene-card > .story-block.narration .block-text');
    const thought = main(page).locator('.scene-card > .story-block.thought .block-text');
    await expect(narration).toHaveText(OPEN6[fifth][0]);
    await expect(thought).toHaveText(OPEN6[fifth][1]);
    await precedes(narration, '.scene-card > .story-block.thought');
    await precedes(thought, '.comic');
    await image(page, CLASSROOM_FILE);
    const sixthState = await saved(page);
    for (const sixth of ['A', 'B', 'C', 'D', 'E']) await test.step('J4/' + fourth + ' → J5/' + fifth + ' → J6/' + sixth, async () => {
      if (sixth !== 'A') {
        await action(page, 'screen-back').click(); await phase(page, 'feedback', 6);
        await action(page, 'screen-back').click(); await phase(page, 'scene', 6);
        expect(await saved(page)).toEqual(sixthState);
      }
      await expect(main(page).locator('button.choice-card')).toHaveCount(5);
      for (const letter of ['A', 'B', 'C', 'D', 'E']) await expect(page.locator('#choice-' + letter)).toBeEnabled();
      await choose(page, 6, sixth);
      await image(page, FEEDBACK_FILES[6][sixth]);
      for (const text of DIALOGUES[6][sixth]) await expect(main(page).locator('.comic-transcript')).toContainText(text);
      const actual = await saved(page);
      expect(actual.decisions).toEqual({ 1: 'C', 2: 'B', 3: 'A', 4: fourth, 5: fifth, 6: sixth });
      expect(actual.publications).toEqual(fifth === 'D' ? { 5: true } : {});
      expect(engine.facts(actual).retaliation).toBe(fifth === 'D');
      expect(engine.facts(actual).finalPublicConflict).toBe(sixth === 'E');
      if (sixth === 'E') await expect(main(page).locator('.comic-transcript')).not.toContainText(POST_TEXT);
      await next(page, 7);
      const outcome = expectedEnding(fifth, sixth);
      await expect(main(page)).toHaveAttribute('data-ending', outcome);
      await bridge(page, outcome);
      await expect(main(page).locator('.comic')).toHaveCount(0);
      await expect(main(page).locator('.question-list')).toContainText('Mit jelképezhet a híd Nóra és Áron történetében?');
      await expect(main(page).locator('.question-list')).toContainText(QUESTIONS[outcome]);
      const actions = await main(page).locator('[data-action]').evaluateAll(nodes => nodes.map(node => node.dataset.action));
      expect(actions).toEqual(['restart']);
      await expect(main(page)).not.toContainText('A tervezetet nem tetted közzé.');
      await expect(main(page)).not.toContainText('A közzétételt megerősítetted.');
      expect((await saved(page)).publications).toEqual(actual.publications);
    });
  });
}

for (const colorScheme of ['light', 'dark']) test('v1.0: pontos státusz és diszkrét, olvasható, nem félkövér szerzői lábléc (' + colorScheme + ')', async ({ page }) => {
  await page.emulateMedia({ colorScheme });
  await page.goto('/');
  await phase(page, 'start', 0);
  for (const version of await page.locator('[data-app-version]').allTextContents()) expect(version).toBe('v1.0');
  await expect(page).toHaveTitle(/A Törött híd.*v1\.0.*Fejlesztés alatt/);
  await expect(page.locator('body')).not.toContainText(/demó|demo|v0\.0\.[234]/i);
  const credits = page.locator('.app-footer .footer-credits');
  await expect(credits.locator('p')).toHaveText(['Koncepció és fejlesztés: Tóbiás István Tamás', 'MI-támogatott fejlesztés · v1.0 · Fejlesztés alatt']);
  await expect(page.locator('.app-footer')).toContainText('XI. osztály · Református vallás');
  await expect(page.locator('.app-footer')).toContainText('Nincs pontozás. A döntéseid ezen a böngészőlapon maradnak.');
  await expect(credits.locator('strong, b, button')).toHaveCount(0);
  const metrics = await credits.locator('p').evaluateAll(nodes => {
    const components = value => value.match(/[\d.]+/g).slice(0, 3).map(Number).map(channel => channel / 255);
    const luminance = rgb => rgb.map(channel => channel <= 0.04045 ? channel / 12.92 : ((channel + 0.055) / 1.055) ** 2.4).reduce((value, channel, i) => value + channel * [0.2126, 0.7152, 0.0722][i], 0);
    return nodes.map(node => {
      const style = getComputedStyle(node);
      let parent = node;
      while (parent.parentElement && getComputedStyle(parent).backgroundColor === 'rgba(0, 0, 0, 0)') parent = parent.parentElement;
      const first = luminance(components(style.color)), second = luminance(components(getComputedStyle(parent).backgroundColor));
      return { weight: Number(style.fontWeight), size: parseFloat(style.fontSize), contrast: (Math.max(first, second) + 0.05) / (Math.min(first, second) + 0.05) };
    });
  });
  for (const item of metrics) { expect(item.weight).toBe(400); expect(item.size).toBeGreaterThanOrEqual(12); expect(item.contrast).toBeGreaterThanOrEqual(4.5); }
  await bridge(page, 'H0');
});

test('v1.0: a hat híd csak a kezdő- és a megfelelő záróképernyőn jelenik meg, előtöltés nélkül', async ({ page }) => {
  const requested = [];
  page.on('request', request => { if (/\/design\/references\/(?:H0_|R[1-5]_).*\.webp$/.test(request.url())) requested.push(new URL(request.url()).pathname); });
  await page.goto('/');
  await bridge(page, 'H0');
  expect([...new Set(requested)]).toEqual(['/design/references/H0_fokepernyo_ep_hid.webp']);
  await action(page, 'start').click(); await phase(page, 'scene', 0);
  await expect(main(page).locator('.bridge-illustration')).toHaveCount(0);
  for (const [id, route] of Object.entries(routes)) {
    const state = snapshotAt(7, route.choices);
    await seed(page, state);
    await expect(main(page)).toHaveAttribute('data-ending', id);
    await bridge(page, id);
    await expect(main(page).locator('.comic')).toHaveCount(0);
  }
  expect([...new Set(requested)].sort()).toEqual(['H0_fokepernyo_ep_hid.webp', ...Object.values(END_FILES)].map(file => '/design/references/' + file).sort());
});

test('v1.0: mind a tizenkét új képregény hibája jóváhagyott, működő szöveges tartalékot ad', async ({ page }) => {
  test.setTimeout(120000);
  await page.route('**/design/references/05*.webp', route => route.abort());
  await page.route('**/design/references/06*.webp', route => route.abort());
  const targets = [
    { scene: 5, decisions: { 4: 'A' } }, { scene: 5, decisions: { 4: 'D' } }, { scene: 6, decisions: { 5: 'A' } },
    ...['A', 'B', 'C', 'D'].map(letter => ({ scene: 5, letter })),
    ...['A', 'B', 'C', 'D', 'E'].map(letter => ({ scene: 6, letter }))
  ];
  for (const target of targets) {
    await seed(page, snapshotAt(target.scene, target.decisions));
    if (target.letter) await choose(page, target.scene, target.letter);
    const state = await saved(page), comic = main(page).locator('.comic');
    await expect(comic.locator('.comic-source-fallback')).toBeVisible();
    await expect(comic.locator('.comic-media')).toBeHidden();
    await expect(comic.locator('.comic-transcript')).toBeHidden();
    const blocks = target.letter ? revisions.feedbackBlocks(state, adaptations.feedbackBlocks(state, story, engine)) : revisions.sceneBlocks(state, adaptations.blocksForScene(state, story, engine));
    for (const block of blocks) await expect(main(page)).toContainText(block.text);
    expect(await saved(page)).toEqual(state);
    if (target.letter) await expect(action(page, 'next')).toBeEnabled();
    else await expect(main(page).locator('button.choice-card')).toHaveCount(target.scene === 6 ? 5 : 4);
  }
});

test('v1.0: a hat híd képhibája mellett is működik a kezdés, az öt reflexió és az újrajátszás', async ({ page }) => {
  await page.route(/\/design\/references\/(?:H0_|R[1-5]_).*\.webp$/, route => route.abort());
  await page.goto('/');
  await expect(main(page).locator('.bridge-fallback')).toBeVisible();
  await expect(action(page, 'start')).toBeEnabled();
  for (const [id, route] of Object.entries(routes)) {
    await seed(page, snapshotAt(7, route.choices));
    const frame = main(page).locator('.bridge-illustration');
    await expect(frame).toHaveAttribute('data-bridge-id', id);
    await expect(frame.locator('.bridge-fallback')).toBeVisible();
    await expect(main(page).locator('.question-list')).toContainText(QUESTIONS[id]);
    await expect(action(page, 'restart').last()).toBeEnabled();
  }
});

test('v1.0: régi, el nem küldött J5D mentése nem válik visszamenőleg közzététellé', async ({ page }) => {
  await page.goto('/');
  const legacy = { version: 1, view: 'ending', scene: 7, decisions: { 1: 'C', 2: 'B', 3: 'A', 4: 'D', 5: 'D', 6: 'C' }, publications: { 5: false }, corrected: false };
  await page.evaluate(({ key, navKey, legacy }) => { sessionStorage.setItem(key, JSON.stringify(legacy)); sessionStorage.removeItem(navKey); }, { key: KEY, navKey: NAV_KEY, legacy });
  await page.goto('/?legacy-draft-v1=1');
  await phase(page, 'scene', 5);
  const migrated = await saved(page);
  expect(migrated.version).toBe(engine.VERSION);
  expect(migrated.decisions).toEqual({ 1: 'C', 2: 'B', 3: 'A', 4: 'D' });
  expect(migrated.publications).toEqual({});
  await expect(page.locator('#storage-note')).toBeVisible();
  await expect(page.locator('#storage-note')).not.toContainText('nem volt olvasható');
  await image(page, NO_CONTACT_FILE);
  await choose(page, 5, 'D');
  expect((await saved(page)).publications).toEqual({ 5: true });
});

test('v1.0: a régi titokközlő J6E helyett a játékos újra választhat a vita előtt', async ({ page }) => {
  await page.goto('/');
  const legacy = { version: 1, view: 'ending', scene: 7, decisions: { 1: 'C', 2: 'B', 3: 'A', 4: 'D', 5: 'D', 6: 'E' }, publications: { 5: true, 6: true }, corrected: false };
  await page.evaluate(({ key, navKey, legacy }) => { sessionStorage.setItem(key, JSON.stringify(legacy)); sessionStorage.removeItem(navKey); }, { key: KEY, navKey: NAV_KEY, legacy });
  await page.goto('/?legacy-publication-v1=1');
  await phase(page, 'scene', 6);
  expect((await saved(page)).decisions).toEqual({ 1: 'C', 2: 'B', 3: 'A', 4: 'D', 5: 'D' });
  expect((await saved(page)).publications).toEqual({ 5: true });
  for (const letter of ['A', 'B', 'C', 'D', 'E']) await expect(page.locator('#choice-' + letter)).toBeEnabled();
  await choose(page, 6, 'E');
  await expect(main(page).locator('.comic-transcript')).not.toContainText(POST_TEXT);
  expect((await saved(page)).publications).toEqual({ 5: true });
});

test('v1.0: billentyűzetes J5D, újratöltés, Vissza/Előre és tiszta újrajátszás', async ({ page }) => {
  await seed(page, snapshotAt(5, { 4: 'D' }));
  await page.evaluate(() => { localStorage.setItem('other-local-app', 'preserve'); sessionStorage.setItem('other-session-app', 'preserve'); });
  await page.locator('#choice-D').focus(); await page.keyboard.press('Enter');
  await phase(page, 'feedback', 5);
  await image(page, FEEDBACK_FILES[5].D);
  const published = await saved(page);
  expect(published.publications).toEqual({ 5: true });
  await page.reload(); await phase(page, 'feedback', 5);
  expect(await saved(page)).toEqual(published);
  await page.goBack(); await phase(page, 'scene', 5);
  expect((await saved(page)).publications).toEqual({});
  await page.goForward(); await phase(page, 'feedback', 5);
  expect(await saved(page)).toEqual(published);
  await action(page, 'screen-back').focus(); await page.keyboard.press('Enter');
  await phase(page, 'scene', 5);
  await page.locator('#choice-C').focus(); await page.keyboard.press('Space');
  await phase(page, 'feedback', 5);
  await image(page, FEEDBACK_FILES[5].C);
  expect((await saved(page)).publications).toEqual({});
  await action(page, 'restart').first().click();
  await page.locator('#reset-dialog button[value="restart"]').click();
  await phase(page, 'start', 0);
  expect(await saved(page)).toEqual(engine.createState());
  expect(await page.evaluate(() => localStorage.getItem('other-local-app'))).toBe('preserve');
  expect(await page.evaluate(() => sessionStorage.getItem('other-session-app'))).toBe('preserve');
  expect(await page.evaluate(() => Object.keys(localStorage))).toEqual(['other-local-app']);
  await page.goBack(); await phase(page, 'start', 0);
  expect((await saved(page)).publications).toEqual({});
});

test('v1.0: közvetlen történetlink új böngészőlapon nem másolja át a másik lap döntéseit', async ({ page, context }) => {
  await seed(page, snapshotAt(5, { 4: 'D' }));
  await choose(page, 5, 'D');
  const original = await saved(page), url = page.url();
  const other = await context.newPage();
  await other.goto(url);
  await phase(other, 'start', 0);
  expect(await saved(other)).toEqual(engine.createState());
  expect(await saved(page)).toEqual(original);
  await other.close();
});
