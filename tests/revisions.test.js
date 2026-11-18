'use strict';
const test = require('node:test');
const assert = require('node:assert/strict');
const fs = require('node:fs');
const path = require('node:path');
const vm = require('node:vm');
const R = require('../js/revisions.js');
const E = require('../js/engine.js');
const S = require('../js/story.js');
const A = require('../js/adaptations.js');
const root = path.join(__dirname, '..');
const text = fs.readFileSync(path.join(root, 'docs/02_szovegfrissitesek_0.0.4_TELJES.md'), 'utf8');
const list = fs.readFileSync(path.join(root, 'docs/01_javitasi_jegyzek_0.0.4_TELJES.md'), 'utf8');
function quotationAfter(document, heading) {
  const start = document.indexOf(heading);
  assert.ok(start >= 0, heading);
  const match = document.slice(start + heading.length).match(/^> (.+)$/m);
  assert.ok(match, heading);
  return match[1];
}
function stateAt(scene, decisions) {
  let state = E.transition(E.createState(), { type: 'START' }, S);
  state = E.transition(state, { type: 'NEXT' }, S);
  for (let n = 1; n < scene; n++) {
    state = E.transition(state, { type: 'SELECT', value: decisions[n] }, S);
    if (state.view === 'confirmation') state = E.transition(state, { type: 'CONFIRM', value: false }, S);
    state = E.transition(state, { type: 'NEXT' }, S);
  }
  return state;
}

test('Minden új diákszöveg pontos, ellenőrizhető részlet a jóváhagyott dokumentumokból', () => {
  const ids = new Set();
  for (const [id, block] of Object.entries(R.catalog)) {
    assert.equal(id, block.id);
    assert.ok(!ids.has(id)); ids.add(id);
    const lines = fs.readFileSync(path.join(root, block.source.file), 'utf8').split(/\r?\n/);
    assert.ok(Number.isInteger(block.source.line) && block.source.line > 0);
    assert.ok(lines[block.source.line - 1].includes(block.text), id + ': pontos forrásszöveg');
    assert.equal(block.origin, block.source.file === S.sourceFile ? 'source' : 'approved-revision');
    assert.ok(['speech', 'thought', 'narration'].includes(block.type));
    if (block.type !== 'narration') assert.ok(block.speaker);
  }
});

test('J–06 és J–10: mind a nyolc külön monológ teljes, szó szerinti és a megfelelő előzményhez tartozik', () => {
  for (const letter of ['A', 'B', 'C', 'D']) {
    const third = stateAt(3, { 1: 'C', 2: letter });
    const fourth = stateAt(4, { 1: 'C', 2: 'B', 3: letter });
    const expectedThird = quotationAfter(text, '### Ha a játékos a 2' + letter + ' választ adta');
    const expectedFourth = quotationAfter(text, '## 3' + letter + ' → 4. jelenet');
    assert.equal(R.sceneBlocks(third, A.blocksForScene(third, S, E))[0].text, expectedThird);
    assert.equal(R.sceneBlocks(fourth, A.blocksForScene(fourth, S, E))[0].text, expectedFourth);
    assert.equal(R.monologues[3][letter].text, expectedThird);
    assert.equal(R.monologues[4][letter].text, expectedFourth);
  }
  assert.equal(new Set(Object.values(R.monologues[3]).map(block => block.text)).size, 4);
  assert.equal(new Set(Object.values(R.monologues[4]).map(block => block.text)).size, 4);
});

test('J–02 és J–03: a felvezetés új, és csak a két tiltott különblokk tűnik el', () => {
  assert.equal(R.introductions[1][0].text, quotationAfter(list, '## J–02'));
  assert.equal(R.introductions[2][0].text, quotationAfter(list, '### J–03/A'));
  const first = stateAt(1, {});
  const firstBlocks = R.sceneBlocks(first, A.blocksForScene(first, S, E));
  assert.equal(firstBlocks[0], R.introductions[1][0]);
  assert.ok(!firstBlocks.some(block => block.source.file === S.sourceFile && block.source.line === 71));
  const oldMonologues = { B: 's2-pause', C: 's2-facts', D: 's2-boundary' };
  for (const letter of ['A', 'B', 'C', 'D']) {
    const state = stateAt(2, { 1: letter });
    const original = A.blocksForScene(state, S, E);
    const blocks = R.sceneBlocks(state, original);
    assert.equal(blocks[0], R.introductions[2][0]);
    assert.ok(!blocks.some(block => block.id === 's2-public'));
    assert.ok(!blocks.some(block => block.source && block.source.file === S.sourceFile && [105, 136].includes(block.source.line)));
    if (letter !== 'A') assert.ok(blocks.some(block => block.id === oldMonologues[letter]));
    for (const block of original.filter(block => block.type === 'speech' && block.source.line === 106)) assert.ok(blocks.includes(block));
  }
});

test('J–07 és J–11: a monológot a külön narráció és a teljes jóváhagyott közös tartalom követi', () => {
  const third = stateAt(3, { 1: 'C', 2: 'C' });
  const thirdBlocks = R.sceneBlocks(third, A.blocksForScene(third, S, E));
  assert.equal(thirdBlocks[0], R.monologues[3].C);
  assert.equal(thirdBlocks[1].text, quotationAfter(text, '## J–07'));
  assert.deepEqual(thirdBlocks.slice(2).map(block => block.text), S.scenes[3].blocks.slice(1).map(block => block.text));
  const fourth = stateAt(4, { 1: 'C', 2: 'B', 3: 'D' });
  const fourthBlocks = R.sceneBlocks(fourth, A.blocksForScene(fourth, S, E));
  assert.equal(fourthBlocks[0], R.monologues[4].D);
  assert.equal(fourthBlocks[1].text, quotationAfter(text, '**Narráció:**'));
  assert.equal(fourthBlocks[2].text, quotationAfter(text, '**Áron – üzenet:**'));
  assert.equal(fourthBlocks[3].text, quotationAfter(text.slice(text.indexOf('# J–11')), '**Nóra – belső gondolat:**'));
  assert.equal(fourthBlocks[2].channel, 'message');
});

test('J–09 és J–12: minden következmény a megfelelő jóváhagyott szakaszból származik', () => {
  for (const number of [3, 4]) for (const letter of ['A', 'B', 'C', 'D']) {
    const prior = number === 3 ? { 1: 'C', 2: 'B' } : { 1: 'C', 2: 'B', 3: 'A' };
    const before = stateAt(number, prior);
    const chosen = E.transition(before, { type: 'SELECT', value: letter }, S);
    const blocks = R.feedbackBlocks(chosen, A.feedbackBlocks(chosen, S, E));
    assert.equal(blocks, R.feedback[number][letter]);
    const section = number === 3 ? text.split('## J–09 – 3' + letter + ':')[1].split('\n## ')[0] : text.split('## J4–' + letter)[1].split('\n## ')[0];
    for (const block of blocks) assert.ok(section.includes(block.text), number + letter + ': nem szivárog át másik ág szövege');
    assert.equal(chosen.decisions[number], letter);
    if (number === 4) for (const block of blocks.filter(block => block.type === 'speech')) assert.equal(block.channel, 'message');
  }
});

test('A 3C határállítás önvád nélkül marad; a 3D fenyegetés nem válik megtorlássá', () => {
  assert.ok(!R.feedback[3].C.some(block => block.type === 'thought'));
  assert.ok(!R.feedback[3].C.some(block => /önvád|elítélő|büntet/i.test(block.text)));
  const third = stateAt(3, { 1: 'C', 2: 'B' });
  const threat = E.transition(third, { type: 'SELECT', value: 'D' }, S);
  assert.deepEqual(threat.publications, {});
  assert.equal(E.facts(threat).revengeThreat, true);
  assert.equal(E.facts(threat).retaliation, false);
  assert.ok(R.monologues[4].D.text.includes('De még nem mondtam el senkinek.'));
});

test('J4–C megőrzi a bosszú szót; J4–D után Áron nem küld záró választ, a későbbi határ is érvényes', () => {
  assert.ok(R.feedback[4].C[0].text.includes('bosszú'));
  assert.ok(S.scenes[4].choices.find(choice => choice.id === 'C').label.includes('bosszú'));
  assert.deepEqual(R.feedback[4].D.filter(block => block.type === 'speech').map(block => block.speaker), ['Nóra']);
  assert.ok(R.feedback[4].D.some(block => block.text === 'Áron nem küld több személyes üzenetet Nórának.'));
  for (const repair of ['A', 'B', 'C', 'D']) {
    const fifth = stateAt(5, { 1: 'C', 2: 'B', 3: 'C', 4: 'D' });
    assert.equal(E.facts(fifth).noContact, true);
    const before = R.sceneBlocks(fifth, A.blocksForScene(fifth, S, E));
    assert.ok(!before.some(block => block.speaker === 'Áron' && block.channel === 'message'));
    let feedback = E.transition(fifth, { type: 'SELECT', value: repair }, S);
    if (feedback.view === 'confirmation') feedback = E.transition(feedback, { type: 'CONFIRM', value: false }, S);
    const after = R.feedbackBlocks(feedback, A.feedbackBlocks(feedback, S, E));
    assert.ok(!after.some(block => block.speaker === 'Áron' && block.channel === 'message'));
  }
});

test('Az adatréteg nem jelenít meg szerkesztői utasításokat és a többi jelenetet változatlanul hagyja', () => {
  const all = Object.values(R.catalog).map(block => block.text).join('\n');
  for (const instruction of ['Nincs külön, Nórát elítélő', 'Nincs új monológ', 'Képi pontosítás', 'JOVAHAGYOTT.webp', 'A fenyegetés nem azonos']) assert.ok(!all.includes(instruction));
  for (const number of [0, 5, 6, 7]) {
    const source = [{ text: 'unchanged' }];
    assert.equal(R.sceneBlocks({ scene: number, decisions: {} }, source), source);
    assert.equal(R.feedbackBlocks({ scene: number, decisions: {} }, source), source);
  }
  const browser = {};
  vm.runInNewContext(fs.readFileSync(path.join(root, 'js/revisions.js'), 'utf8'), browser);
  assert.equal(browser.TorottHidRevisions.monologues[4].D.text, R.monologues[4].D.text);
});
