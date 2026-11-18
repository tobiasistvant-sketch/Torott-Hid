const { test, expect } = require('@playwright/test');
const story = require('../js/story.js');
const reflections = require('../js/reflections.js');
const KEY = require('../js/engine.js').STORAGE_KEY;
const versionLabel = 'v' + require('../package.json').version;
const active = page => page.locator('#main-content');
const action = (page, name) => page.locator(`[data-action="${name}"]`);
const state = page => page.evaluate(key => JSON.parse(sessionStorage.getItem(key)), KEY);
const scene = number => story.scenes.find(item => item.id === number);
const choice = (number, letter) => scene(number).choices.find(item => item.id === letter);

async function phase(page, view, number) {
  await expect(active(page)).toHaveAttribute('data-view', view);
  if (number !== undefined) await expect(active(page)).toHaveAttribute('data-scene', String(number));
  await expect(page.locator('#chapters li')).toHaveCount(8);
  await expect(page.locator('#progress')).toHaveAttribute('aria-valuemax', '8');
  expect(await page.evaluate(() => document.documentElement.scrollWidth <= innerWidth)).toBe(true);
}
async function begin(page) {
  await page.goto('/');
  await phase(page, 'start', 0);
  await expect(page.locator('[data-app-version]').first()).toHaveText(versionLabel);
  await expect(active(page)).toContainText('Nóra');
  await action(page, 'start').click();
  await phase(page, 'scene', 0);
  await expect(active(page)).toContainText(scene(0).blocks.find(block => block.speaker === 'Áron').text);
  await action(page, 'next').click();
  await phase(page, 'scene', 1);
}
async function select(page, number, letter) {
  await phase(page, 'scene', number);
  await expect(page.locator('button.choice-card')).toHaveCount(scene(number).choices.length);
  await expect(action(page, 'choose')).toHaveCount(0);
  for (const item of scene(number).choices) await expect(page.locator(`button#choice-${item.id}`)).toContainText(item.label);
  // The answer card itself commits the choice; no separate confirmation button.
  await page.locator('#choice-' + letter).click();
}
async function confirm(page, number, publish) {
  await phase(page, 'confirmation', number);
  await expect(action(page, 'confirm').filter({ hasText: 'Átgondolom még' })).toBeVisible();
  await page.locator(`[data-action="confirm"][data-value="${publish}"]`).click();
  await phase(page, number === 6 && !publish ? 'scene' : 'feedback', number);
}
async function decide(page, number, letter, publish = true) {
  await select(page, number, letter);
  if ((number === 5 && letter === 'D') || (number === 6 && letter === 'E')) await confirm(page, number, publish);
  else await phase(page, 'feedback', number);
  await expect(page.locator('.consequence-card')).toBeVisible();
  await expect(active(page)).toContainText(choice(number, letter).label);
  await expect(active(page)).not.toContainText('Ezt választottad');
  await expect(active(page).locator('.screen-heading .eyebrow')).toContainText('A történet folytatódik');
  await action(page, 'next').click();
  await phase(page, number === 6 ? 'ending' : 'scene', number + 1);
}
async function through(page, route, last = 6, publications = {}) {
  await begin(page);
  for (let number = 1; number <= last; number++) await decide(page, number, route[number - 1], publications[number] ?? true);
}
async function ending(page, id, route) {
  await phase(page, 'ending', 7);
  await expect(active(page)).toHaveAttribute('data-ending', id);
  const item = reflections[id];
  await expect(page.locator('.ending-header h1')).toHaveText(item.title);
  for (const paragraph of item.moral) await expect(active(page)).toContainText(paragraph);
  for (const verse of item.scriptures) {
    await expect(active(page)).toContainText(verse.reference);
    await expect(active(page)).toContainText(verse.explanation.text);
  }
  await expect(page.locator('.question-list li')).toHaveCount(2);
  for (const question of item.questions) await expect(page.locator('.question-list')).toContainText(question);
  await expect(page.locator('.route-list li')).toHaveCount(6);
  for (let number = 1; number <= 6; number++) await expect(page.locator('.route-list')).toContainText(choice(number, route[number - 1]).label);
  await expect(page.locator('#progress')).toHaveAttribute('aria-valuenow', '8');
  for (const forbidden of ['Fejlesztői jelzés', 'Forráskapcsolat:', 'public_confrontation', 'evidence_of_repair', 'TANÁRI MEGJEGYZÉS', 'TANKÖNYVI KAPCSOLÓDÁS']) {
    await expect(active(page)).not.toContainText(forbidden);
  }
  await expect(active(page).locator('textarea, input[type="text"], [download]')).toHaveCount(0);
}
async function noDirectAronMessage(page) {
  const direct = active(page).locator('.story-block.speech[data-channel="message"]').filter({ has: page.locator('.speaker', { hasText: 'Áron' }) });
  await expect(direct).toHaveCount(0);
  await expect(active(page)).not.toContainText('Szóltam Lilinek, hogy nem lett volna szabad továbbadni. Ha szeretnéd, nyilvánosan is vállalom, hogy tőlem indult.');
}
const routes = [
  { id: 'R1', route: ['C', 'B', 'A', 'A', 'A', 'A'] },
  // The same final A has a different result when earlier repair stays uncertain.
  { id: 'R2', route: ['C', 'B', 'A', 'A', 'B', 'A'] },
  { id: 'R3', route: ['C', 'B', 'A', 'C', 'A', 'C'] },
  { id: 'R4', route: ['C', 'B', 'A', 'D', 'C', 'D'] },
  { id: 'R5', route: ['A', 'A', 'D', 'A', 'D', 'E'] }
];
for (const { id, route } of routes) {
  test(id + ': teljes Nóra-történet, saját reflexió és hat döntés visszanézése', async ({ page }) => {
    const errors = [], outside = [];
    page.on('pageerror', error => errors.push(error.message));
    page.on('request', request => { if (!request.url().startsWith('http://127.0.0.1:4176')) outside.push(request.url()); });
    await through(page, route);
    await ending(page, id, route);
    const saved = await state(page);
    expect(saved.scene).toBe(7); expect(saved.view).toBe('ending');
    expect(saved.decisions).toEqual(Object.fromEntries(route.map((letter, index) => [index + 1, letter])));
    if (id === 'R5') {
      expect(saved.publications).toEqual({ 5: true, 6: true });
      await expect(active(page)).toContainText('később');
      await expect(active(page)).not.toContainText('Áron mentegetőzött, nem vállalt felelősséget');
    }
    await page.reload(); await ending(page, id, route);
    expect(await state(page)).toEqual(saved);
    expect(errors).toEqual([]); expect(outside).toEqual([]);
  });
}
for (const repair of ['A', 'B', 'C', 'D']) {
  test('A „Ne írj többet” határ az 5/' + repair + ' döntés és a későbbi jelenet alatt is megmarad', async ({ page }) => {
    const route = ['C', 'B', 'A', 'D', repair, 'D'];
    await through(page, route, 4);
    await phase(page, 'scene', 5); await noDirectAronMessage(page);
    await expect(active(page)).toContainText('osztálytárs');
    await select(page, 5, repair);
    if (repair === 'D') await confirm(page, 5, false);
    await phase(page, 'feedback', 5); await noDirectAronMessage(page);
    await action(page, 'next').click();
    await phase(page, 'scene', 6); await noDirectAronMessage(page);
    expect((await state(page)).decisions[4]).toBe('D');
    await decide(page, 6, 'D'); await ending(page, 'R4', route);
  });
}

test('Az első reakció láthatóan megváltoztatja a későbbi jelenet szövegét', async ({ page, context }) => {
  await through(page, ['A'], 1);
  await phase(page, 'scene', 2);
  const publicReaction = await active(page).locator('.story-block').allTextContents();
  const other = await context.newPage();
  await through(other, ['B'], 1);
  await phase(other, 'scene', 2);
  const pauseReaction = await active(other).locator('.story-block').allTextContents();
  expect(publicReaction).not.toEqual(pauseReaction);
  expect((await state(page)).decisions[1]).toBe('A');
  expect((await state(other)).decisions[1]).toBe('B');
  await other.close();
});

test('A fenyegetés és az el nem küldött tervezet nem válik tényleges megtorlássá', async ({ page }) => {
  const route = ['C', 'B', 'D', 'C', 'D', 'C'];
  await through(page, route, 5, { 5: false });
  const saved = await state(page);
  expect(saved.publications).toEqual({ 5: false });
  expect(saved.view).toBe('scene'); expect(saved.scene).toBe(6);
  await decide(page, 6, 'C'); await ending(page, 'R3', route);
});

test('A 6/E közzététel előtt visszaléphető, és új jövőbeli döntés választható', async ({ page }) => {
  const route = ['C', 'B', 'A', 'A', 'A', 'C'];
  await through(page, route, 5);
  await select(page, 6, 'E');
  expect((await state(page)).publications).toEqual({});
  await page.reload(); await phase(page, 'confirmation', 6);
  await confirm(page, 6, false);
  expect((await state(page)).decisions[6]).toBeUndefined();
  await expect(action(page, 'choose')).toHaveCount(0);
  await decide(page, 6, 'C'); await ending(page, 'R3', route);
});
for (const corrected of [false, true]) {
  test('A korábbi tényleges közzététel ' + (corrected ? 'visszavonható, felelősségvállalással' : 'következménye nem törlődik az utolsó C választól'), async ({ page }) => {
    const route = ['C', 'B', 'A', 'A', 'D', 'C'];
    await through(page, route, 5, { 5: true });
    await expect(action(page, 'correct')).toBeVisible();
    if (corrected) {
      await action(page, 'correct').click();
      expect((await state(page)).corrected).toBe(true);
      await expect(action(page, 'correct')).toHaveCount(0);
    }
    await decide(page, 6, 'C'); await ending(page, corrected ? 'R3' : 'R5', route);
    expect((await state(page)).publications[5]).toBe(true);
  });
}
for (const third of ['C', 'D']) {
  test('Áron önálló bocsánatkérése a 3/' + third + ' reakció után is eljut Nórához', async ({ page }) => {
    await through(page, ['A', 'A', third], 3);
    await phase(page, 'scene', 4);
    const apology = scene(4).blocks.find(block => block.speaker === 'Áron');
    await expect(active(page)).toContainText(apology.text);
    await expect(active(page)).not.toContainText('jutalom');
  });
}

test('Újratöltés megőrzi a következményt, az újrajátszás tiszta állapotot indít', async ({ page }) => {
  await through(page, ['A', 'D', 'B'], 2);
  await select(page, 3, 'B'); await phase(page, 'feedback', 3);
  const saved = await state(page);
  await page.reload(); await phase(page, 'feedback', 3);
  expect(await state(page)).toEqual(saved);
  await page.evaluate(() => sessionStorage.setItem('another_app', 'preserve'));
  await action(page, 'restart').last().click();
  await page.locator('#reset-dialog button[value="cancel"]').click();
  expect(await state(page)).toEqual(saved);
  await action(page, 'restart').last().click();
  await page.locator('#reset-dialog button[value="restart"]').click();
  await phase(page, 'start', 0);
  expect(await state(page)).toEqual({ version: 1, view: 'start', scene: 0, decisions: {}, publications: {}, corrected: false });
  expect(await page.evaluate(() => sessionStorage.getItem('another_app'))).toBe('preserve');
  await action(page, 'start').click(); await action(page, 'next').click();
  await expect(page.locator('button.choice-card')).toHaveCount(4);
});

test('Sérült mentés biztonságosan új játékot indít, tiltott tárolóval is játszható', async ({ page, context }) => {
  await page.goto('/');
  await page.evaluate(key => sessionStorage.setItem(key, '{broken'), KEY);
  await page.reload(); await phase(page, 'start', 0);
  await expect(page.locator('#storage-note')).toBeVisible();
  const isolated = await context.newPage();
  await isolated.addInitScript(() => Object.defineProperty(window, 'sessionStorage', { get() { throw new Error('blocked'); } }));
  await begin(isolated);
  await expect(isolated.locator('#storage-note')).toBeVisible();
  await select(isolated, 1, 'B'); await phase(isolated, 'feedback', 1);
  await isolated.close();
});

test('Billentyűzettel választható, a fókusz és a megszakított újrakezdés megmarad', async ({ page }) => {
  await page.goto('/');
  await action(page, 'start').focus(); await page.keyboard.press('Enter');
  await phase(page, 'scene', 0); await expect(active(page).locator('h1')).toBeFocused();
  await action(page, 'next').focus(); await page.keyboard.press('Enter');
  await page.locator('#choice-A').focus(); await page.keyboard.press('Space');
  await phase(page, 'feedback', 1);
  await expect(active(page)).toContainText(choice(1, 'A').label);
  await action(page, 'restart').first().click();
  await expect(page.locator('#reset-dialog')).toBeVisible();
  for (let i = 0; i < 5; i++) {
    await page.keyboard.press('Tab');
    expect(await page.evaluate(() => !!document.activeElement.closest('#reset-dialog'))).toBe(true);
  }
  await page.keyboard.press('Escape'); await phase(page, 'feedback', 1);
  await expect(active(page)).toContainText(choice(1, 'A').label);
});

// Regression: browser history must restore earlier choices without replaying.
test('browser Back/Forward restores previous scene and branching choice', async ({ page }) => {
  await begin(page);
  await page.locator('#choice-A').click();
  await phase(page, 'feedback', 1);
  const firstUrl = page.url();
  await action(page, 'next').click();
  await phase(page, 'scene', 2);
  const secondUrl = page.url();
  expect(firstUrl).not.toBe(secondUrl);
  await page.goBack();
  await phase(page, 'feedback', 1);
  expect((await state(page)).decisions[1]).toBe('A');
  await page.goBack();
  await phase(page, 'scene', 1);
  expect((await state(page)).decisions[1]).toBeUndefined();
  await page.goForward();
  await phase(page, 'feedback', 1);
  expect((await state(page)).decisions[1]).toBe('A');
  await page.goBack();
  await phase(page, 'scene', 1);
  await page.locator('#choice-B').click();
  await phase(page, 'feedback', 1);
  expect((await state(page)).decisions[1]).toBe('B');
});
