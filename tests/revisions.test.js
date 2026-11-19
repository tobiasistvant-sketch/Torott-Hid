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
    const messages = after.filter(block => block.type === 'speech' && block.channel === 'message');
    if (messages.length) {
      assert.equal(messages[0].speaker, 'Nóra');
      assert.equal(messages[0].initiatedBy, 'Nóra');
      for (const reply of messages.filter(block => block.speaker === 'Áron')) assert.equal(reply.inReplyTo, 'Nóra');
    }
  }
});

test('Az adatréteg nem jelenít meg szerkesztői utasításokat és a többi jelenetet változatlanul hagyja', () => {
  const all = Object.values(R.catalog).map(block => block.text).join('\n');
  for (const instruction of ['Nincs külön, Nórát elítélő', 'Nincs új monológ', 'Képi pontosítás', 'JOVAHAGYOTT.webp', 'A fenyegetés nem azonos']) assert.ok(!all.includes(instruction));
  for (const number of [0, 7]) {
    const source = [{ text: 'unchanged' }];
    assert.equal(R.sceneBlocks({ scene: number, decisions: {} }, source), source);
    assert.equal(R.feedbackBlocks({ scene: number, decisions: {} }, source), source);
  }
  const browser = {};
  vm.runInNewContext(fs.readFileSync(path.join(root, 'js/revisions.js'), 'utf8'), browser);
  assert.equal(browser.TorottHidRevisions.monologues[4].D.text, R.monologues[4].D.text);
});

test('J–13: a J4 négy választását a négy teljes, szó szerinti J5-monológ követi', () => {
  for (const letter of ['A', 'B', 'C', 'D']) {
    const state = stateAt(5, { 1: 'C', 2: 'B', 3: 'A', 4: letter });
    const expected = quotationAfter(text, '## J4–' + letter + ' → J5');
    const blocks = R.sceneBlocks(state, A.blocksForScene(state, S, E));
    assert.equal(blocks[0], R.monologues[5][letter]);
    assert.equal(blocks[0].text, expected);
    assert.equal(blocks.filter(block => Object.values(R.monologues[5]).includes(block)).length, 1);
  }
  assert.equal(new Set(Object.values(R.monologues[5]).map(block => block.text)).size, 4);
});

test('J–14: J4–D után közvetett hír, A/B/C után pontos közvetlen üzenet következik', () => {
  for (const letter of ['A', 'B', 'C', 'D']) {
    const state = stateAt(5, { 1: 'C', 2: 'B', 3: 'A', 4: letter });
    const blocks = R.sceneBlocks(state, A.blocksForScene(state, S, E));
    if (letter === 'D') {
      assert.ok(!blocks.some(block => block.speaker === 'Áron' && block.channel === 'message'));
      assert.ok(blocks.some(block => block.speaker === 'Osztálytárs' && block.text === 'Lili már nem beszél rólad. Áron szólt neki.'));
      assert.ok(blocks.some(block => block.type === 'thought' && block.text === 'Írjak neki én?'));
      assert.ok(!blocks.some(block => block.speaker === 'Nóra' && block.type === 'speech'));
    } else {
      const message = blocks.find(block => block.speaker === 'Áron' && block.channel === 'message');
      assert.equal(message.text, quotationAfter(text, '**J4 A/B/C után – Áron közvetlen üzenete:**'));
      assert.ok(blocks.some(block => block.type === 'thought' && block.text === 'Mit írjak vissza?'));
    }
  }
});

test('J–15/J–16: az új J5 ágak jóváhagyott szövegei és a tényleges közzététel elkülönülnek', () => {
  for (const letter of ['A', 'B', 'C', 'D']) {
    const before = stateAt(5, { 1: 'C', 2: 'B', 3: 'A', 4: 'D' });
    const state = E.transition(before, { type: 'SELECT', value: letter }, S);
    assert.equal(state.view, 'feedback', 'Nincs második megerősítő vagy piszkozatképernyő.');
    const blocks = R.feedbackBlocks(state, A.feedbackBlocks(state, S, E));
    assert.equal(blocks, R.feedback[5][letter]);
    const start = text.indexOf(letter === 'D' ? '# J–16 – J5–D' : '## J5–' + letter + ' –');
    const end = text.indexOf('\n## ', start + 5);
    const section = text.slice(start, end < 0 ? undefined : end);
    for (const block of blocks) assert.ok(section.includes(block.text), letter + ': pontos jóváhagyott forrás');
    assert.equal(state.publications[5] === true, letter === 'D');
    if (letter === 'D') {
      assert.equal(blocks[0].type, 'thought');
      assert.ok(blocks.some(block => block.speaker === 'Nóra' && block.channel === 'class-group' && block.text === 'Tudjátok, Áron valójában egy ideje pszichológushoz jár. Én tudom, mert bízott bennem, de már nem érdekel.'));
      assert.ok(!JSON.stringify(blocks).includes('A tervezet még nem került nyilvánosságra.'));
      assert.ok(!JSON.stringify(blocks).includes('Attól, hogy fáj, biztosan jobban leszek'));
    }
  }
  assert.ok(text.includes(R.publicationFact));
});

test('A J5 és J6 aktív választásfeliratai a friss jóváhagyott megszólalásokból származnak', () => {
  for (const number of [5, 6]) for (const [letter, override] of Object.entries(R.choiceOverrides[number])) {
    const first = R.feedback[number][letter].find(block => block.speaker === 'Nóra');
    assert.equal(override.label, '„' + first.text + '”');
    assert.deepEqual(override.source, first.source);
  }
  assert.deepEqual(Object.keys(R.choiceOverrides[6]), ['A', 'B', 'C', 'D', 'E']);
  assert.ok(R.choiceOverrides[6].E.label.includes('az egész osztály') === false);
  assert.equal(R.choiceOverrides[6].E.label, '„Te komolyan azt hiszed, hogy ezek után minden mehet tovább, mintha semmi sem történt volna?”');
});

test('J–17: J5 A/B/C/D után a teljes jóváhagyott narráció és monológ a helyes sorrendben jelenik meg', () => {
  for (const letter of ['A', 'B', 'C', 'D']) {
    const state = stateAt(6, { 1: 'C', 2: 'B', 3: 'A', 4: 'B', 5: letter });
    const heading = '## J5–' + letter + ' → J6';
    const section = text.slice(text.indexOf(heading));
    const blocks = R.sceneBlocks(state, A.blocksForScene(state, S, E));
    assert.equal(blocks[0], R.narrations[6][letter]);
    assert.equal(blocks[1], R.monologues[6][letter]);
    assert.equal(blocks[0].text, quotationAfter(section, '**Narráció:**'));
    assert.equal(blocks[1].text, quotationAfter(section, '**Nóra – belső monológ:**'));
    assert.deepEqual(blocks.slice(2), R.common[6]);
  }
});

test('J–18: mind az öt J6 párbeszéd a jóváhagyott szakaszhoz tartozik; E nem új titokközlés', () => {
  for (const letter of ['A', 'B', 'C', 'D', 'E']) {
    const before = stateAt(6, { 1: 'C', 2: 'B', 3: 'A', 4: 'A', 5: 'A' });
    const state = E.transition(before, { type: 'SELECT', value: letter }, S);
    assert.equal(state.view, 'feedback');
    const blocks = R.feedbackBlocks(state, A.feedbackBlocks(state, S, E));
    assert.equal(blocks, R.feedback[6][letter]);
    const section = text.split('## J6–' + letter + ' –')[1].split('\n## ')[0];
    for (const block of blocks) assert.ok(section.includes(block.text), letter);
    assert.equal(Object.prototype.hasOwnProperty.call(state.publications, 6), false);
    if (letter === 'E') {
      assert.equal(E.facts(state).finalPublicConflict, true);
      assert.equal(E.facts(state).retaliation, false);
      assert.ok(!JSON.stringify(blocks).includes('pszichológushoz jár'));
    }
  }
});

test('Az összegzés megőrzi a megtörtént J5D tényét, és J6E esetén nem talál ki titokközlést', () => {
  for (const fifth of ['A', 'B', 'C', 'D']) {
    const before = stateAt(6, { 1: 'C', 2: 'B', 3: 'A', 4: 'D', 5: fifth });
    const feedback = E.transition(before, { type: 'SELECT', value: 'E' }, S);
    const ended = E.transition(feedback, { type: 'NEXT' }, S);
    const summary = R.summary(ended, A.summary(ended, E), E);
    assert.equal(E.ending(ended), 'R5');
    assert.ok(summary.includes(R.feedback[6].E.at(-1).text));
    assert.ok(!summary.some(line => line.includes('A megerősített nyilvános megtorlás')));
    assert.ok(!summary.some(line => line.includes('A későbbi szándékod már változhatott')));
    assert.equal(summary.includes(R.narrations[6].D.text), fifth === 'D');
  }
  let state = stateAt(6, { 1: 'C', 2: 'B', 3: 'A', 4: 'D', 5: 'D' });
  state = E.transition(state, { type: 'CORRECT' }, S);
  state = E.transition(state, { type: 'SELECT', value: 'C' }, S);
  state = E.transition(state, { type: 'NEXT' }, S);
  const summary = R.summary(state, A.summary(state, E), E);
  assert.equal(state.publications[5], true);
  assert.ok(summary.includes(R.narrations[6].D.text), 'A kifejezett későbbi korrekció sem teszi meg nem történtté a közlést.');
});

test('Az öt hídreflexió és közös kérdés szó szerint az R-dokumentumból származik', () => {
  const lines = fs.readFileSync(path.join(root, R.endingQuestions.source.file), 'utf8').split(/\r?\n/);
  assert.equal(lines[R.endingQuestions.source.commonLine - 1], '**Közös kérdés:** ' + R.endingQuestions.common);
  assert.deepEqual(Object.keys(R.endingQuestions.byEnding), ['R1', 'R2', 'R3', 'R4', 'R5']);
  for (const [id, question] of Object.entries(R.endingQuestions.byEnding)) {
    assert.equal(lines[R.endingQuestions.source.byEndingLines[id] - 1], question);
  }
});

test('A teljes J4 × J5 × J6 kombináció jóváhagyott szöveget és valós állapotfüggő lezárást ad', () => {
  const endings = new Set();
  let count = 0;
  for (const fourth of ['A', 'B', 'C', 'D']) for (const fifth of ['A', 'B', 'C', 'D']) for (const sixth of ['A', 'B', 'C', 'D', 'E']) {
    const atFive = stateAt(5, { 1: 'C', 2: 'B', 3: 'A', 4: fourth });
    assert.equal(R.sceneBlocks(atFive, A.blocksForScene(atFive, S, E))[0], R.monologues[5][fourth]);
    const chosenFive = E.transition(atFive, { type: 'SELECT', value: fifth }, S);
    assert.equal(chosenFive.view, 'feedback');
    assert.equal(R.feedbackBlocks(chosenFive, A.feedbackBlocks(chosenFive, S, E)), R.feedback[5][fifth]);
    const atSix = E.transition(chosenFive, { type: 'NEXT' }, S);
    const openingSix = R.sceneBlocks(atSix, A.blocksForScene(atSix, S, E));
    assert.equal(openingSix[0], R.narrations[6][fifth]);
    assert.equal(openingSix[1], R.monologues[6][fifth]);
    const chosenSix = E.transition(atSix, { type: 'SELECT', value: sixth }, S);
    assert.equal(chosenSix.view, 'feedback', 'J20 szerint egyik J6 ág sem zárolt.');
    assert.equal(R.feedbackBlocks(chosenSix, A.feedbackBlocks(chosenSix, S, E)), R.feedback[6][sixth]);
    assert.equal(chosenSix.publications[5] === true, fifth === 'D');
    assert.equal(Object.hasOwn(chosenSix.publications, 6), false);
    const end = E.transition(chosenSix, { type: 'NEXT' }, S);
    const ending = E.ending(end);
    endings.add(ending);
    if (fifth === 'D' || sixth === 'E') assert.equal(ending, 'R5');
    count++;
  }
  assert.equal(count, 80);
  assert.deepEqual(Array.from(endings).sort(), ['R1', 'R2', 'R3', 'R4', 'R5']);
});
