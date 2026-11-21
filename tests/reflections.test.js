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
const replacementFile = 'docs/Torott_Hid_R1_R5_Bovitett_IGEVERSEKKEL_CODINAK.md';
const replacements = fs.readFileSync(path.join(root, replacementFile), 'utf8').split(/^## R[1-5] – [^\n]+\n/m).slice(1).map(part => part.split('\n## Megjegyzés')[0]);

function subsection(section, title) {
  const after = section.split('### ' + title + '\n')[1];
  assert.ok(after, title);
  return after.split(/\n### |\n\s*TANÁRI MEGJEGYZÉS/)[0].trim().split(/\r?\n/).map(line => line.trim()).filter(Boolean);
}

test('Az öt reflexió címe, felirata, kiemelése és korábbi kérdései változatlanok', () => {
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
    assert.deepEqual(reflection.questions, subsection(section, 'GONDOLKODJ EL!').map(line => line.replace(/^•\s*/, '')));
    assert.equal(reflection.questions.length, 2);
    assert.equal(reflection.sourceSummary, subsection(section, 'MI TÖRTÉNT?')[0], 'Az eredeti összefoglaló kizárólag ellenőrizhető referencia.');
    assert.deepEqual(reflection.source.file, sourceFile);
    assert.equal(lines[reflection.source.line - 1], '## 0' + (index + 1) + '  ' + reflection.title);
  }
});

test('Az öt teljes tanítás és mind a 15 igevers a felhasználó új forrásából származik', () => {
  assert.equal(replacements.length, 5);
  const ids = new Set();
  for (const [index, reflection] of Object.values(reflections).entries()) {
    const [teaching, bible] = replacements[index].split('### Bibliai iránytű\n');
    assert.equal(reflection.moral.join('\n\n'), teaching.split('### Mit tanulhatunk ebből?\n')[1].trim());
    assert.equal(reflection.contentSource, replacementFile);
    const passages = bible.split(/^#### /m).slice(1);
    assert.equal(reflection.scriptures.length, 3);
    for (const [number, scripture] of reflection.scriptures.entries()) {
      const passage = passages[number];
      assert.equal(passage.split('\n')[0], scripture.reference + ' – ' + scripture.label);
      assert.equal(scripture.quote, passage.match(/<\/summary>\s*([\s\S]*?)\s*<\/details>/)[1].trim());
      assert.equal(scripture.explanation.paragraphs.join('\n\n'), passage.split('</details>')[1].trim());
      assert.equal(scripture.explanation.text, scripture.explanation.paragraphs.join('\n\n'));
      assert.equal(scripture.explanation.origin, 'user-provided');
      assert.equal(scripture.source.file, replacementFile);
      assert.ok(!ids.has(scripture.explanation.id));
      ids.add(scripture.explanation.id);
    }
  }
  assert.equal(ids.size, 15);
  assert.equal(reflections.R3.scriptures[2].reference, 'Ef 4,32');
  assert.equal(reflections.R3.scriptures[2].quote, reflections.R1.scriptures[1].quote);
});

test('Az idézet és az útvonal natív, alapból zárt panelt kap; a dinamikus összegzés megmarad', () => {
  const app = fs.readFileSync(path.join(root, 'js/app.js'), 'utf8');
  new vm.Script(app);
  const bible = app.split("'<section class=\"reflection-card\"><h2>Bibliai iránytű</h2>")[1].split(".join('')")[0];
  assert.ok(bible.indexOf('<h3>') < bible.indexOf('<details'));
  assert.ok(bible.indexOf('</details>') < bible.indexOf('paras(verse.explanation.paragraphs)'));
  assert.match(bible, /Az igevers elolvasása/);
  assert.match(app, /<details class="route-details"><summary>A döntési útvonalad<\/summary>/);
  assert.doesNotMatch(app, /<details[^>]*\bopen\b/);
  assert.ok(app.includes('U.summary(state, A.summary(state, E), E)'));
});

test('A reflexiós adatok közvetlenül betölthetők böngészőben és Node-ban is', () => {
  const browser = {};
  vm.runInNewContext(fs.readFileSync(path.join(root, 'js/reflections.js'), 'utf8'), browser);
  assert.deepEqual(JSON.parse(JSON.stringify(browser.TorottHidReflections)), reflections);
});
