const { test, expect } = require('@playwright/test');
const engine = require('../js/engine.js');
const story = require('../js/story.js');
const adaptations = require('../js/adaptations.js');
const KEY = engine.STORAGE_KEY;
const main = page => page.locator('#main-content');
const action = (page, name) => page.locator(`[data-action="${name}"]`);
const previous = page => action(page, 'screen-back');
const forward = page => action(page, 'screen-forward');
const saved = page => page.evaluate(key => JSON.parse(sessionStorage.getItem(key)), KEY);

async function phase(page, view, scene) {
  await expect(main(page)).toHaveAttribute('data-view', view);
  await expect(main(page)).toHaveAttribute('data-scene', String(scene));
  await expect(previous(page)).toBeVisible();
  await expect(forward(page)).toBeVisible();
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
async function select(page, scene, choice) {
  await phase(page, 'scene', scene);
  await page.locator('#choice-' + choice).click();
  await phase(page, 'feedback', scene);
}
async function advance(page, scene, choice) {
  await select(page, scene, choice);
  await action(page, 'next').click();
  await phase(page, scene === 6 ? 'ending' : 'scene', scene + 1);
}
async function rewindToChoice(page, scene) {
  for (let tries = 0; tries < 40; tries++) {
    if (await main(page).getAttribute('data-view') === 'scene' && await main(page).getAttribute('data-scene') === String(scene)) return;
    await expect(previous(page)).toBeEnabled();
    await previous(page).click();
  }
  throw new Error('A megtekintett döntési képernyő nem érhető el visszalépéssel.');
}

test('A két navigációs gomb már betöltéskor látható, és állandó helyen marad', async ({ page }) => {
  await page.goto('/');
  await phase(page, 'start', 0);
  await expect(previous(page)).toHaveText('← Előző képernyő');
  await expect(forward(page)).toHaveText('Következő képernyő →');
  await expect(previous(page)).toBeDisabled();
  await expect(forward(page)).toBeDisabled();
  await page.evaluate(() => { window.navigationContainerForTest = document.querySelector('[data-action="screen-back"]').parentElement; });
  await action(page, 'start').click();
  await phase(page, 'scene', 0);
  expect(await page.evaluate(() => window.navigationContainerForTest === document.querySelector('[data-action="screen-back"]').parentElement)).toBe(true);
  await expect(previous(page)).toBeEnabled();
  await expect(forward(page)).toBeDisabled();
});

test('A kért teljes navigációs próba: 0 → 1 → vissza → előre, A helyett B, majd újratöltés', async ({ page }) => {
  await begin(page);
  const choiceScreen = await saved(page);
  await previous(page).click();
  await phase(page, 'scene', 0);
  await forward(page).click();
  await phase(page, 'scene', 1);
  expect(await saved(page)).toEqual(choiceScreen);
  await select(page, 1, 'A');
  await expect(main(page).locator('.comic-image')).toHaveAttribute('src', 'design/references/Iskolai folyosói titokdráma.png');
  await previous(page).click();
  await phase(page, 'scene', 1);
  await select(page, 1, 'B');
  await expect(main(page).locator('.comic-image')).toHaveAttribute('src', /01B_elvonulas_kovetkezmeny\.webp$/);
  const changed = await saved(page);
  expect(changed.decisions).toEqual({ 1: 'B' });
  await expect(forward(page)).toBeDisabled();
  await page.reload();
  await phase(page, 'feedback', 1);
  await expect(main(page).locator('.comic-image')).toHaveAttribute('src', /01B_elvonulas_kovetkezmeny\.webp$/);
  expect(await saved(page)).toEqual(changed);
});

test('Egy korai új döntés eldobja az elhagyott jövő döntéseit, közzétételeit és visszavonását', async ({ page }) => {
  await begin(page);
  const route = ['A', 'B', 'D', 'A', 'D'];
  for (let number = 1; number <= 5; number++) await advance(page, number, route[number - 1]);
  await expect(action(page, 'correct')).toHaveCount(0);
  expect((await saved(page)).corrected).toBe(false);
  await advance(page, 6, 'D');
  await expect(main(page)).toHaveAttribute('data-ending', 'R5');
  await rewindToChoice(page, 1);
  await select(page, 1, 'B');
  const changed = await saved(page);
  expect(changed.decisions).toEqual({ 1: 'B' });
  expect(changed.publications).toEqual({});
  expect(changed.corrected).toBe(false);
  await expect(forward(page)).toBeDisabled();
  await action(page, 'next').click();
  await phase(page, 'scene', 2);
  const before = adaptations.blocksForScene(await saved(page), story, engine).find(block => block.id === 's2-pause');
  expect(before).toBeTruthy();
  await expect(main(page).locator('.story-block:visible').filter({ hasText: before.text })).toHaveCount(1);
  await expect(main(page)).not.toContainText('A folyosón mindenki felénk fordult.');
  await page.reload();
  expect((await saved(page)).decisions).toEqual({ 1: 'B' });
});

test('A visszalépéskor végzett újratöltés megőrzi a későbbi, már bejárt képernyőket is', async ({ page }) => {
  await begin(page);
  await advance(page, 1, 'B');
  await advance(page, 2, 'B');
  const latest = await saved(page);
  await previous(page).click();
  await phase(page, 'feedback', 2);
  const feedback = await saved(page);
  await previous(page).click();
  await phase(page, 'scene', 2);
  const middle = await saved(page);
  await page.reload();
  await phase(page, 'scene', 2);
  expect(await saved(page)).toEqual(middle);
  await expect(forward(page)).toBeEnabled();
  await forward(page).click();
  await phase(page, 'feedback', 2);
  expect(await saved(page)).toEqual(feedback);
  await forward(page).click();
  await phase(page, 'scene', 3);
  expect(await saved(page)).toEqual(latest);
  await expect(forward(page)).toBeDisabled();
});

test('A böngésző Vissza és Előre az újratöltés és az A → B ágváltás után is helyes állapotot állít vissza', async ({ page }) => {
  await begin(page);
  await advance(page, 1, 'A');
  await page.goBack();
  await phase(page, 'feedback', 1);
  expect((await saved(page)).decisions[1]).toBe('A');
  await page.goBack();
  await phase(page, 'scene', 1);
  expect((await saved(page)).decisions).toEqual({});
  await page.goForward();
  await phase(page, 'feedback', 1);
  await page.goBack();
  await phase(page, 'scene', 1);
  await select(page, 1, 'B');
  await page.reload();
  await phase(page, 'feedback', 1);
  await page.goBack();
  await phase(page, 'scene', 1);
  await page.goForward();
  await phase(page, 'feedback', 1);
  expect((await saved(page)).decisions).toEqual({ 1: 'B' });
});

test('Az ismételt újratöltés nem duplázza meg a böngésző történeti előzményeit', async ({ page }) => {
  await begin(page);
  await advance(page, 1, 'A');
  const historyLength = await page.evaluate(() => history.length);
  for (let number = 0; number < 3; number++) {
    await page.reload();
    await phase(page, 'scene', 2);
    expect(await page.evaluate(() => history.length)).toBe(historyLength);
  }
  await page.goBack();
  await phase(page, 'feedback', 1);
  await page.goBack();
  await phase(page, 'scene', 1);
});

test('A régi formátumú, csak aktuális állapotot tartalmazó mentésből is visszaléphető a történet', async ({ page }) => {
  await page.goto('/');
  await page.evaluate(key => sessionStorage.setItem(key, JSON.stringify({
    version: 1, view: 'scene', scene: 2, decisions: { 1: 'B' }, publications: {}, corrected: false
  })), KEY);
  await page.goto('/?legacy-navigation-test=1');
  await phase(page, 'scene', 2);
  await previous(page).click();
  await phase(page, 'feedback', 1);
  await previous(page).click();
  await phase(page, 'scene', 1);
  await forward(page).click();
  await phase(page, 'feedback', 1);
  expect((await saved(page)).decisions).toEqual({ 1: 'B' });
});

test('A történet kezdetén túli böngésző-Vissza ténylegesen elhagyhatja az oldalt', async ({ page }) => {
  await page.goto('/README.md?outside-navigation-test=1');
  const outside = page.url();
  await page.goto('/?finite-navigation-test=1');
  await phase(page, 'start', 0);
  await action(page, 'start').click();
  await action(page, 'next').click();
  await phase(page, 'scene', 1);
  await page.goBack();
  await phase(page, 'scene', 0);
  await page.goBack();
  await phase(page, 'start', 0);
  await expect(previous(page)).toBeDisabled();
  await page.goBack();
  await expect(page).toHaveURL(outside);
  await page.goForward();
  await phase(page, 'start', 0);
});

test('A játékbeli két gomb a böngésző History API-jának teljes tiltásakor is működik', async ({ page }) => {
  await page.addInitScript(() => {
    for (const name of ['pushState', 'replaceState', 'go', 'back', 'forward']) {
      Object.defineProperty(History.prototype, name, { configurable: true, value() { throw new DOMException('blocked', 'SecurityError'); } });
    }
  });
  await begin(page);
  await advance(page, 1, 'A');
  await previous(page).click();
  await phase(page, 'feedback', 1);
  await previous(page).click();
  await phase(page, 'scene', 1);
  await forward(page).click();
  await phase(page, 'feedback', 1);
  await previous(page).click();
  await select(page, 1, 'B');
  expect((await saved(page)).decisions).toEqual({ 1: 'B' });
  await expect(forward(page)).toBeDisabled();
});

test('Tiltott munkamenettároló esetén is használható a memóriában vezetett vissza- és előrelépés', async ({ page }) => {
  await page.addInitScript(() => Object.defineProperty(window, 'sessionStorage', { get() { throw new Error('blocked'); } }));
  await begin(page);
  await expect(page.locator('#storage-note')).toBeVisible();
  await select(page, 1, 'A');
  await previous(page).click();
  await phase(page, 'scene', 1);
  await forward(page).click();
  await phase(page, 'feedback', 1);
  await previous(page).click();
  await select(page, 1, 'B');
  await expect(main(page).locator('.comic-image')).toHaveAttribute('src', /01B_elvonulas_kovetkezmeny\.webp$/);
  await expect(forward(page)).toBeDisabled();
});

test('Sérült mentéskor a régi böngésző- vagy navigációs előzmény nem rejti el az újrakezdés jelzését', async ({ page }) => {
  await begin(page);
  await select(page, 1, 'A');
  await page.evaluate(key => sessionStorage.setItem(key, '{broken'), KEY);
  await page.reload();
  await phase(page, 'start', 0);
  await expect(page.locator('#storage-note')).toBeVisible();
  await expect(page.locator('#storage-note')).toContainText('A korábbi mentés nem volt olvasható.');
  expect(await saved(page)).toEqual(engine.createState());
  await expect(previous(page)).toBeDisabled();
  await expect(forward(page)).toBeDisabled();
});

test('A képregény nagyítása és bezárása nem változtatja meg a képernyőtörténetet', async ({ page }) => {
  await begin(page);
  await select(page, 1, 'A');
  await previous(page).click();
  await phase(page, 'scene', 1);
  const before = await saved(page);
  const historyLength = await page.evaluate(() => history.length);
  const opener = action(page, 'open-comic');
  await opener.click();
  await expect(page.locator('#comic-dialog')).toBeVisible();
  await action(page, 'comic-zoom-in').click();
  await action(page, 'close-comic').click();
  await expect(page.locator('#comic-dialog')).not.toBeVisible();
  await expect(opener).toBeFocused();
  expect(await saved(page)).toEqual(before);
  expect(await page.evaluate(() => history.length)).toBe(historyLength);
  await expect(forward(page)).toBeEnabled();
  await forward(page).click();
  await phase(page, 'feedback', 1);
  expect((await saved(page)).decisions[1]).toBe('A');
});

test('Az újrajátszás és az újratöltés után régi böngészőbejegyzés sem éleszti fel az elhagyott döntéseket', async ({ page }) => {
  await begin(page);
  await select(page, 1, 'A');
  await page.evaluate(() => sessionStorage.setItem('other-app-test', 'preserve'));
  await action(page, 'restart').first().click();
  await page.locator('#reset-dialog button[value="restart"]').click();
  await phase(page, 'start', 0);
  await expect(previous(page)).toBeDisabled();
  await expect(forward(page)).toBeDisabled();
  await page.reload();
  await phase(page, 'start', 0);
  expect(await saved(page)).toEqual(engine.createState());
  expect(await page.evaluate(() => sessionStorage.getItem('other-app-test'))).toBe('preserve');
  await page.goBack();
  await phase(page, 'start', 0);
  expect(await saved(page)).toEqual(engine.createState());
});

test('Az elhagyott A ág régi böngészőbejegyzései nem élednek fel a játékbeli B ágváltás után', async ({ page }) => {
  await page.goto('/README.md?abandoned-branch-sentinel=1');
  const outside = page.url();
  await begin(page);
  await advance(page, 1, 'A');
  await previous(page).click();
  await phase(page, 'feedback', 1);
  await previous(page).click();
  await phase(page, 'scene', 1);
  await select(page, 1, 'B');
  const historyLength = await page.evaluate(() => history.length);
  let exited = false;
  for (let steps = 0; steps < 15; steps++) {
    await page.goBack();
    expect(await page.evaluate(() => history.length)).toBe(historyLength);
    if (page.url() === outside) { exited = true; break; }
    expect((await saved(page)).decisions[1]).not.toBe('A');
    await expect(main(page).locator('.comic-image[src$="Iskolai folyosói titokdráma.png"]')).toHaveCount(0);
  }
  expect(exited, 'A véges böngésző-előzményből ki lehessen lépni a játékot megelőző oldalra.').toBe(true);
});
