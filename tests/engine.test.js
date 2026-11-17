'use strict';
const test = require('node:test');
const assert = require('node:assert/strict');
const fs = require('node:fs');
const path = require('node:path');
const Engine = require('../js/engine.js');
const routes = require('./routes.json');
const source = fs.readFileSync(path.join(__dirname, '../docs/nora-pov-forgatokonyv.md'), 'utf8');
// The legal choice IDs come from the manuscript rather than a duplicate game map.
const story = { scenes: [...source.matchAll(/^## ([0-7])\. JELENET[^\n]*\n([\s\S]*?)(?=^## [0-7]\. JELENET|(?![\s\S]))/gm)].map(match => ({
  id: Number(match[1]), choices: [...match[2].matchAll(/^\*\*([A-E]) – /gm)].map(choice => ({ id: choice[1] }))
})) };
const action = (state, type, value) => Engine.transition(state, { type, value }, story);
const sceneOne = () => action(action(Engine.createState(), 'START'), 'NEXT');
function play(config, stopBefore = 7) {
  let state = sceneOne();
  for (let scene = 1; scene < stopBefore; scene++) {
    if (scene === 6 && config.corrected) state = action(state, 'CORRECT');
    assert.equal(state.scene, scene);
    assert.equal(state.view, 'scene');
    state = action(state, 'SELECT', config.choices[scene]);
    if (state.view === 'confirmation') state = action(state, 'CONFIRM', config.publications[scene]);
    assert.equal(state.view, 'feedback');
    assert.ok(Engine.normalize(state, story));
    state = action(state, 'NEXT');
  }
  return state;
}
function memory(initial = null) {
  const values = new Map([['other-project', 'preserve']]);
  if (initial !== null) values.set(Engine.STORAGE_KEY, initial);
  return { values, getItem: key => values.get(key) ?? null, setItem: (key, value) => values.set(key, value), removeItem: key => values.delete(key) };
}
const letters = ['A', 'B', 'C', 'D'];

test('A nyitóképernyő és a 0–7. jelenet kizárólag szabályos sorrendben járható be', () => {
  assert.deepEqual(story.scenes.map(scene => scene.id), [0, 1, 2, 3, 4, 5, 6, 7]);
  assert.deepEqual(story.scenes.map(scene => scene.choices.length), [0, 4, 4, 4, 4, 4, 5, 0]);
  const initial = Engine.createState();
  for (const type of ['NEXT', 'SELECT', 'CONFIRM', 'CORRECT']) assert.deepEqual(action(initial, type, 'A'), initial);
  const zero = action(initial, 'START');
  assert.equal(zero.scene, 0); assert.equal(zero.view, 'scene');
  assert.deepEqual(action(zero, 'SELECT', 'A'), zero);
  const one = action(zero, 'NEXT');
  assert.equal(one.scene, 1); assert.deepEqual(action(one, 'NEXT'), one);
  for (const value of [null, 1, 'E', 'toString', {}, '']) assert.deepEqual(action(one, 'SELECT', value), one);
  const before = structuredClone(one);
  const chosen = action(one, 'SELECT', 'A');
  assert.deepEqual(one, before, 'A tranzíció nem módosítja a bemenetét.');
  assert.equal(chosen.view, 'feedback');
  assert.deepEqual(action(chosen, 'SELECT', 'B'), chosen, 'Megerősített döntés visszamenőleg nem írható át.');
  assert.equal(action(chosen, 'NEXT').scene, 2);
});

test('Mind az öt befejezésnek van ellenőrizhető, végigjátszható tesztútvonala', () => {
  for (const [expected, config] of Object.entries(routes)) {
    const state = play(config);
    assert.equal(state.view, 'ending'); assert.equal(state.scene, 7);
    assert.equal(Engine.ending(state), expected);
    assert.deepEqual(state.decisions, config.choices);
    assert.deepEqual(state.publications, config.publications);
    for (const type of ['START', 'NEXT', 'SELECT', 'CONFIRM', 'CORRECT']) assert.deepEqual(action(state, type, 'A'), state);
    assert.deepEqual(action(state, 'RESTART'), Engine.createState());
  }
});

test('A fenyegetés, a tervezet és a megerősített nyilvános tett külön állapot', () => {
  const draft = { choices: { ...routes.R1.choices, 3: 'D', 5: 'D', 6: 'B' }, publications: { 5: false }, corrected: false };
  let state = play(draft, 5);
  assert.equal(Engine.facts(state).revengeThreat, true);
  assert.equal(Engine.facts(state).retaliation, false);
  state = action(state, 'SELECT', 'D');
  assert.equal(state.view, 'confirmation');
  assert.equal(Engine.facts(state).retaliation, false);
  assert.deepEqual(action(state, 'NEXT'), state, 'A közzétételi megerősítés nem ugorható át.');
  for (const value of ['true', 'false', null, 0, 1]) assert.deepEqual(action(state, 'CONFIRM', value), state);
  const withdrawn = action(state, 'CONFIRM', false);
  assert.equal(Engine.facts(withdrawn).selfRegulation, true);
  assert.equal(Engine.facts(withdrawn).retaliation, false);
  assert.equal(Engine.facts(action(state, 'CONFIRM', true)).retaliation, true);
  const ending = play(draft);
  assert.equal(Engine.ending(ending), 'R2', 'A fenyegetés és a visszavont tervezet nem kényszerít R5-re.');
});

test('A végső megtorlás előtt az Átgondolom még visszavisz a kapcsolat jövőjéhez', () => {
  const before = play(routes.R1, 6);
  const pending = action(before, 'SELECT', 'E');
  assert.equal(pending.view, 'confirmation');
  assert.equal(Engine.ending(pending), null);
  assert.equal(Engine.facts(pending).retaliation, false);
  assert.deepEqual(action(pending, 'CONFIRM', false), before);
  let changed = action(action(pending, 'CONFIRM', false), 'SELECT', 'C');
  changed = action(changed, 'NEXT');
  assert.equal(Engine.ending(changed), 'R3');
});

test('A korábbi tényleges sérelem nem törlődik az utolsó válasz megváltoztatásától', () => {
  const config = { choices: { ...routes.R1.choices, 5: 'D', 6: 'C' }, publications: { 5: true }, corrected: false };
  assert.equal(Engine.ending(play(config)), 'R5');
  config.corrected = true;
  assert.equal(Engine.ending(play(config)), 'R3', 'A korrekció és a megbocsátás külön, történetben látható döntés.');
  config.choices[6] = 'D';
  assert.equal(Engine.ending(play(config)), 'R4');
  config.choices[6] = 'A';
  assert.equal(Engine.ending(play(config)), 'R2', 'A korrekció nem teremti meg Áron elmaradt jóvátételét.');
});

test('R1 tényleges jóvátételt igényel; egy indulatos mondat nem minősíti a játékost', () => {
  for (const initial of letters) {
    const config = { ...routes.R1, choices: { ...routes.R1.choices, 1: initial } };
    assert.equal(Engine.ending(play(config)), 'R1', 'A nyilvános számonkérés nem automatikusan rossz válasz.');
  }
  const threat = { ...routes.R1, choices: { ...routes.R1.choices, 3: 'D' } };
  assert.equal(Engine.ending(play(threat)), 'R2');
  assert.equal(Engine.ending(play({ ...threat, corrected: true })), 'R1');
  for (const repair of ['B', 'C']) assert.equal(Engine.ending(play({ ...routes.R1, choices: { ...routes.R1.choices, 5: repair } })), 'R2');
  assert.equal(Engine.ending(play(routes.R3)), 'R3');
  assert.equal(Engine.ending(play(routes.R4)), 'R4');
});

test('Áron bocsánatkérése Nóra reakcióitól független; a tiltás mellett csak korlátozott saját kapcsolatfelvétel engedett', () => {
  for (const first of letters) for (const second of letters) for (const third of letters) {
    const config = { choices: { ...routes.R1.choices, 1: first, 2: second, 3: third, 4: 'D' }, publications: {}, corrected: false };
    const beforeApology = play(config, 4);
    assert.equal(Engine.facts(beforeApology).apologyHeard, true);
    for (const repair of letters) {
      const publications = repair === 'D' ? { 5: false } : {};
      const after = play({ ...config, choices: { ...config.choices, 5: repair }, publications }, 6);
      assert.equal(Engine.facts(after).noContact, true);
      assert.equal(Engine.facts(after).limitedOutreach, ['A', 'B'].includes(repair));
      assert.equal(Engine.facts(after).boundaryRespected, true);
    }
  }
});

test('Minden döntés-, megerősítés- és korrekciókombináció következetes befejezést ad', () => {
  let journeys = 0;
  const totals = { R1: 0, R2: 0, R3: 0, R4: 0, R5: 0 };
  for (const a of letters) for (const b of letters) for (const c of letters) for (const d of letters) {
    for (const fifth of [...letters.slice(0, 3).map(choice => [choice, null]), ['D', false], ['D', true]]) {
      const config = { choices: { 1: a, 2: b, 3: c, 4: d, 5: fifth[0] }, publications: fifth[1] === null ? {} : { 5: fifth[1] }, corrected: false };
      const base = play(config, 6);
      const corrections = Engine.facts(base).correctionAvailable ? [false, true] : [false];
      for (const corrected of corrections) {
        const ready = corrected ? action(base, 'CORRECT') : base;
        assert.deepEqual(action(action(ready, 'SELECT', 'E'), 'CONFIRM', false), ready);
        for (const future of [...letters, 'E']) {
          let state = action(ready, 'SELECT', future);
          if (future === 'E') state = action(state, 'CONFIRM', true);
          state = action(state, 'NEXT');
          const result = Engine.ending(state), facts = Engine.facts(state);
          assert.ok(Engine.normalize(state, story));
          assert.equal(state.scene, 7); assert.equal(state.view, 'ending');
          assert.ok(own(totals, result));
          totals[result]++; journeys++;
          if (result === 'R1') {
            assert.equal(facts.repairPrivate, true);
            assert.equal(facts.retaliation, false);
            assert.equal(facts.unresolvedThreat, false);
          }
          if (result === 'R5') assert.equal(facts.retaliation, true, 'Csak megerősített tett okozhat R5-öt.');
          if (facts.unresolvedRetaliation) assert.equal(result, 'R5');
          else if (future === 'C') assert.equal(result, 'R3');
          else if (future === 'D') assert.equal(result, 'R4');
          assert.equal(facts.apologyHeard, true);
          assert.equal(facts.noContact, d === 'D');
          assert.equal('score' in state, false);
        }
      }
    }
  }
  assert.equal(journeys, 9920);
  assert.ok(Object.values(totals).every(count => count > 0));
  console.log(`✓ ${journeys} teljes döntési útvonal: ${JSON.stringify(totals)}`);
});

function own(object, key) { return Object.prototype.hasOwnProperty.call(object, key); }

test('Minden olvasási és döntési szakasz biztonságosan menthető és újratölthető', () => {
  const store = memory();
  let state = Engine.createState();
  const actions = [{ type: 'START' }, { type: 'NEXT' }];
  for (let scene = 1; scene <= 6; scene++) {
    actions.push({ type: 'SELECT', value: routes.R5.choices[scene] });
    if (scene === 5 || scene === 6) actions.push({ type: 'CONFIRM', value: true });
    actions.push({ type: 'NEXT' });
  }
  for (const event of actions) {
    assert.equal(Engine.save(store, state), true);
    assert.deepEqual(Engine.load(store, story), { state, recovered: false, storageAvailable: true });
    state = Engine.transition(state, event, story);
  }
  assert.equal(Engine.ending(state), 'R5');
  assert.equal(Engine.save(store, state), true);
  assert.deepEqual(Engine.load(store, story).state, state);
  assert.equal(store.values.get('other-project'), 'preserve');
});

test('Sérült, átugrott vagy hamis visszajelzést tartalmazó mentés biztonságosan helyreáll', () => {
  const complete = play(routes.R5);
  const invalid = [null, [], false, 42, 'state', {}, { ...complete, version: 2 },
    { ...complete, scene: 6 }, { ...complete, view: 'scene' }, { ...complete, corrected: 'yes' },
    { ...complete, decisions: { ...complete.decisions, 1: 'missing' } },
    { ...complete, decisions: { ...complete.decisions, 7: 'A' } },
    { ...complete, decisions: { 1: 'A' } },
    { ...complete, publications: { 5: 'true', 6: true } },
    { ...complete, publications: { 6: true } },
    { ...complete, publications: { 5: true, 6: false } },
    { ...complete, publications: { 5: true, 6: true, 1: false } },
    { ...Engine.createState(), scene: 4 }, { ...Engine.createState(), corrected: true },
    { ...sceneOne(), decisions: { 1: 'A' } },
    { ...play(routes.R1, 6), corrected: true },
    { ...play(routes.R1, 5), publications: { 5: false } }
  ];
  for (const candidate of invalid) {
    assert.equal(Engine.normalize(candidate, story), null, JSON.stringify(candidate));
    const store = memory(JSON.stringify(candidate));
    const loaded = Engine.load(store, story);
    assert.equal(loaded.recovered, true);
    assert.deepEqual(loaded.state, Engine.createState());
  }
  assert.equal(Engine.load(memory('{broken'), story).recovered, true);
  const forged = { ...complete, score: 100, noContact: false, ending: 'R1' };
  assert.deepEqual(Engine.normalize(forged, story), complete);
  assert.equal(Engine.ending(forged), 'R5');
});

test('Tárolóhiba és újrajátszás esetén más alkalmazás munkája nem sérül', () => {
  const store = memory();
  Engine.save(store, play(routes.R1));
  assert.deepEqual(Engine.reset(store), Engine.createState());
  assert.equal(store.values.get('other-project'), 'preserve');
  assert.deepEqual(JSON.parse(store.values.get(Engine.STORAGE_KEY)), Engine.createState());
  for (const storage of [null, {}, { getItem() { throw new Error('blocked'); } }]) {
    assert.deepEqual(Engine.load(storage, story), { state: Engine.createState(), recovered: false, storageAvailable: false });
  }
  const quota = { getItem: () => JSON.stringify(play(routes.R3)), setItem() { throw new Error('quota'); } };
  const loaded = Engine.load(quota, story);
  assert.equal(Engine.ending(loaded.state), 'R3'); assert.equal(loaded.storageAvailable, false);
  assert.equal(Engine.save(store, { view: 'invalid' }), false);
  assert.deepEqual(Engine.reset({ removeItem() { throw new Error('blocked'); }, setItem() { throw new Error('blocked'); } }), Engine.createState());
});
