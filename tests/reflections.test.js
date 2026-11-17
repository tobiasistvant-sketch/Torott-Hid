'use strict';
const test = require('node:test');
const assert = require('node:assert/strict');
const fs = require('node:fs');
const path = require('node:path');
const vm = require('node:vm');
const reflections = require('../js/reflections.js');

const root = path.resolve(__dirname, '..');
const sourceFile = 'docs/ot-befejezes-reflexios-oldalak.md';
const source = fs.readFileSync(path.join(root, sourceFile), 'utf8');
const lines = source.split(/\r?\n/);
const sections = source.split(/^## 0[1-5]  /m).slice(1).map(part => part.split(/^06  TANÁRI MÓDSZERTANI ÚTMUTATÓ/m)[0]);

function subsection(section, title) {
  const after = section.split('### ' + title + '\n')[1];
  assert.ok(after, title);
  return after.split(/\n### |\n\s*TANÁRI MEGJEGYZÉS/)[0].trim().split(/\r?\n/).map(line => line.trim()).filter(Boolean);
}

test('Mind az öt reflexió címe, kiemelése, erkölcsi tanítása és két kérdése forráshű', () => {
  assert.deepEqual(Object.keys(reflections), ['R1', 'R2', 'R3', 'R4', 'R5']);
  assert.equal(sections.length, 5);
  for (const [index, section] of sections.entries()) {
    const id = 'R' + (index + 1);
    const reflection = reflections[id];
    const header = section.split(/\r?\n/);
    assert.equal(reflection.id, id);
    assert.equal(reflection.title, header[0]);
    assert.equal(reflection.subtitle, header[1]);
    assert.equal(reflection.quote, header.find(line => line.startsWith('„')));
    assert.equal(reflection.quoteKind, 'pedagogical', 'A saját pedagógiai kiemelés nem bibliai idézet.');
    assert.deepEqual(reflection.moral, subsection(section, 'MIT TANULHATUNK EBBŐL?'));
    assert.deepEqual(reflection.questions, subsection(section, 'GONDOLKODJ EL!').map(line => line.replace(/^•\s*/, '')));
    assert.equal(reflection.questions.length, 2);
    assert.equal(reflection.sourceSummary, subsection(section, 'MI TÖRTÉNT?')[0], 'Az eredeti összefoglaló kizárólag ellenőrizhető referencia.');
    assert.deepEqual(reflection.source.file, sourceFile);
    assert.equal(lines[reflection.source.line - 1], '## 0' + (index + 1) + '  ' + reflection.title);
  }
});

test('Az igehelyek változatlanok, az új magyarázatok elkülönített és dokumentált kiegészítések', () => {
  const ledger = fs.readFileSync(path.join(root, 'docs/reflection-additions.md'), 'utf8');
  const ids = new Set();
  for (const [index, reflection] of Object.values(reflections).entries()) {
    const text = reflection.scriptures.map(scripture => scripture.reference + ' – ' + scripture.label).join(' Kiegészítő ige: ');
    assert.equal(text, subsection(sections[index], 'BIBLIAI IRÁNYTŰ')[0]);
    for (const scripture of reflection.scriptures) {
      assert.equal('quote' in scripture, false, 'Új, nem ellenőrzött szó szerinti bibliai idézet nem került az adatokba.');
      assert.equal(scripture.explanation.origin, 'addition');
      assert.ok(!ids.has(scripture.explanation.id));
      ids.add(scripture.explanation.id);
      assert.ok(scripture.explanation.text.length > 100);
      assert.ok(ledger.includes(scripture.explanation.id));
      assert.ok(ledger.includes(scripture.explanation.text));
    }
  }
  assert.equal(ids.size, 6);
  assert.deepEqual(reflections.R5.scriptures.map(scripture => scripture.reference), ['Mt 5,21–26', 'Jak 1,19–20']);
});

test('A tanári háttér és az eredeti R5-összefoglaló nem keveredik a megjelenítendő reflexiós törzsszövegbe', () => {
  for (const reflection of Object.values(reflections)) {
    const studentFields = JSON.stringify({ title: reflection.title, subtitle: reflection.subtitle,
      quote: reflection.quote, moral: reflection.moral, scriptures: reflection.scriptures, questions: reflection.questions });
    for (const marker of ['TANÁRI MEGJEGYZÉS', 'TANKÖNYVI KAPCSOLÓDÁS', 'TANTERVI ILLESZKEDÉS', 'PDF-oldal']) {
      assert.ok(!studentFields.includes(marker), marker);
    }
    assert.ok(!studentFields.includes('Áron mentegetőzött, nem vállalt felelősséget'));
  }
  assert.match(reflections.R5.moral.join(' '), /Áron eredeti felelőssége nem szűnik meg/);
  assert.match(reflections.R3.scriptures[0].explanation.text, /nem teszi egyenlővé a megbocsátást/);
  assert.match(reflections.R4.scriptures[0].explanation.text, /nem jelentheti a kapcsolat vagy a bizalom kikényszerítését/);
});

test('A reflexiós adatok közvetlenül betölthetők böngészőben és Node-ban is', () => {
  const browser = {};
  vm.runInNewContext(fs.readFileSync(path.join(root, 'js/reflections.js'), 'utf8'), browser);
  assert.deepEqual(JSON.parse(JSON.stringify(browser.TorottHidReflections)), reflections);
});
