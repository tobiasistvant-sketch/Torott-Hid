'use strict';

const test = require('node:test');
const assert = require('node:assert/strict');
const fs = require('node:fs');
const path = require('node:path');
const vm = require('node:vm');
const story = require('../js/story.js');
const crypto = require('node:crypto');

const project = path.resolve(__dirname, '..');
const manuscript = fs.readFileSync(path.join(project, story.sourceFile), 'utf8').split(/\r?\n/);
const sourceLine = pointer => {
  assert.equal(pointer.file, 'docs/nora-pov-forgatokonyv.md');
  assert.ok(Number.isInteger(pointer.line) && pointer.line > 0 && pointer.line <= manuscript.length);
  return manuscript[pointer.line - 1];
};
const sections = manuscript.join('\n').split(/^## [0-7]\. JELENET – /m).slice(1);

test('A teljes 0–7. jelenetsor és mind a 25 eredeti döntés a forrásból származik', () => {
  assert.equal(story.title, 'A Törött híd');
  assert.deepEqual(story.scenes.map(scene => scene.id), [0, 1, 2, 3, 4, 5, 6, 7]);
  assert.deepEqual(story.scenes.map(scene => scene.choices.length), [0, 4, 4, 4, 4, 4, 5, 0]);
  for (const scene of story.scenes) {
    assert.equal(sourceLine(scene.source), `## ${scene.id}. JELENET – ${scene.title}`);
    assert.equal(manuscript[scene.source.line], scene.time);
    const section = sections[scene.id];
    const decisions = Array.from(section.matchAll(/^\*\*([A-E]) – (.+)\*\*$/gm), match => ({ id: match[1], label: match[2] }));
    assert.deepEqual(scene.choices.map(({ id, label }) => ({ id, label })), decisions);
    if (!decisions.length) continue;
    const question = section.match(/^\*\*KÉRDÉS(?: A JÁTÉKOSNAK)?: (.+)\*\*$/m)[1];
    assert.equal(scene.question, question);
    assert.ok(sourceLine(scene.questionSource).includes(scene.question));
    for (const choice of scene.choices) {
      assert.equal(sourceLine(choice.source), `**${choice.id} – ${choice.label}**`);
      assert.equal(manuscript[choice.source.immediateLine - 1], '**Azonnali következmény:** ' + choice.immediate);
      assert.equal(manuscript[choice.source.laterLine - 1], '**Későbbi hatás:** ' + choice.later);
    }
  }
});

test('A párbeszédek és gondolatok szöveghűek, a forráshivatkozások ellenőrizhetők', () => {
  for (const scene of story.scenes) {
    for (const block of [...scene.blocks, ...(scene.contactBlocks || [])]) {
      assert.ok(['narration', 'speech', 'thought'].includes(block.type));
      assert.ok(block.text.length > 0);
      const original = sourceLine(block.source);
      if (block.speaker) {
        const quotation = original.match(/: „(.*)”$/);
        assert.ok(quotation, `${scene.id}: ${original}`);
        assert.equal(block.text, quotation[1]);
      } else {
        assert.ok(original.includes(block.text), `${scene.id}: ${block.text}`);
      }
    }
  }
  assert.deepEqual(story.scenes[0].blocks.filter(block => block.type === 'speech').map(block => block.speaker), ['Nóra', 'Áron', 'Nóra', 'Áron']);
  assert.equal(story.scenes[7].blocks[0].speaker, 'Narrátor');
  assert.equal(story.scenes[2].blocks.find(block => block.type === 'thought').text, 'Csak tanácsot akart kérni? De hát megígérte, hogy senkinek sem mondja el! Lehet, hogy nem akart megbántani, de attól még elárulta a titkomat.');
  assert.equal(story.scenes[6].choices.find(choice => choice.id === 'C').label, '„Nem akarok tovább haragudni rád. Megbocsátok, de nem hiszem, hogy ezek után ugyanolyan barátok tudnánk lenni, mint régen.”');
});

test('A pedagógiai és fejlesztői megjegyzések nem kerülnek a megjelenítendő történeti blokkokba', () => {
  const renderable = JSON.stringify(story.scenes.flatMap(scene => [...scene.blocks, ...(scene.contactBlocks || [])]));
  for (const marker of ['Jelenet célja:', 'Forráskapcsolat:', 'Fejlesztői jelzés', 'FELTÉTELES MEGJELENÍTÉS', 'Képregény képkocka', 'tension+=', 'retaliation=', '(wtf?)']) {
    assert.equal(renderable.includes(marker), false, marker);
  }
  for (const scene of story.scenes) {
    assert.ok(scene.blocks.length > 0);
    assert.equal(scene.blocks.some(block => 'when' in block || 'points' in block || 'score' in block), false);
  }
});

test('Áron bocsánatkérése állandó forráselem, az 5. jelenet üzenete külön feltételes blokk', () => {
  const apology = story.scenes[4].blocks.find(block => block.speaker === 'Áron');
  assert.equal(apology.channel, 'message');
  assert.equal(apology.text, 'Megígértem, hogy megtartom a titkodat, mégis továbbadtam. Ezt én rontottam el, nem Lili a kifogás. Sajnálom. Nem várok azonnali választ.');
  const repair = story.scenes[5];
  assert.equal(repair.blocks.some(block => block.speaker === 'Áron'), false);
  assert.equal(repair.contactBlocks.length, 1);
  assert.equal(repair.contactBlocks[0].speaker, 'Áron');
  assert.equal(repair.contactBlocks[0].channel, 'message');
  assert.match(repair.contactBlocks[0].text, /nem akarok rólad beszélni az engedélyed nélkül/);
  assert.ok(!repair.blocks[0].text.includes('Ha a 4. jelenetben'));
  assert.ok(!story.scenes[6].blocks[0].text.includes('Ha az 5. jelenetben'));
});

test('A történeti adatfájl Node-ban és közvetlenül a böngészőben is betölthető', () => {
  const browser = {};
  vm.runInNewContext(fs.readFileSync(path.join(project, 'js/story.js'), 'utf8'), browser);
  assert.deepEqual(JSON.parse(JSON.stringify(browser.TorottHidStory)), story);
});


test('A CSS/JS gyorsítótár-azonosítója a tényleges fájltartalomhoz kötődik, a játékverzióhoz különül', () => {
  const html = fs.readFileSync(path.join(project, 'index.html'), 'utf8');
  const version = require('../package.json').version;
  const assets = [...html.matchAll(/(?:src|href)="((?:js|css)\/[^"?]+)\?v=([^"]+)"/g)];
  assert.equal(assets.length, 10);
  for (const [, relative, cacheKey] of assets) {
    const hash = crypto.createHash('sha256').update(fs.readFileSync(path.join(project, relative))).digest('hex').slice(0, 12);
    assert.equal(cacheKey, version + '-' + hash, relative);
  }
  assert.equal(require('../js/version.js').version, version);
});
