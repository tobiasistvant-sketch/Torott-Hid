'use strict';
const test = require('node:test');
const assert = require('node:assert/strict');
const fs = require('node:fs');
const path = require('node:path');
const Engine = require('../js/engine.js');
const routes = require('./routes.json');
const source = fs.readFileSync(path.join(__dirname, '../docs/nora-pov-forgatokonyv.md'), 'utf8');
// IDs still come from the source manuscript; v1.0 changes acts, not branch IDs.
const story = { scenes: [...source.matchAll(/^## ([0-7])\. JELENET[^\n]*\n([\s\S]*?)(?=^## [0-7]\. JELENET|(?![\s\S]))/gm)].map(match => ({
  id: Number(match[1]), choices: [...match[2].matchAll(/^\*\*([A-E]) – /gm)].map(choice => ({ id: choice[1] }))
})) };
const action = (state, type, value) => Engine.transition(state, { type, value }, story);
const sceneOne = () => action(action(Engine.createState(), 'START'), 'NEXT');
const own = (object, key) => Object.prototype.hasOwnProperty.call(object, key);
const letters = ['A', 'B', 'C', 'D'];
function play(config, stopBefore = 7) {
  let state = sceneOne();
  for (let scene = 1; scene < stopBefore; scene++) {
    if (scene === 6 && config.corrected) state = action(state, 'CORRECT');
    assert.equal(state.scene, scene);
    assert.equal(state.view, 'scene');
    state = action(state, 'SELECT', config.choices[scene]);
    assert.equal(state.view, 'feedback', 'Minden válasz egy kattintással a következményhez vezet.');
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

test('A nyitóképernyő és a 0–7. jelenet kizárólag szabályos sorrendben járható be', () => {
  assert.deepEqual(story.scenes.map(scene => scene.id), [0, 1, 2, 3, 4, 5, 6, 7]);
  assert.deepEqual(story.scenes.map(scene => scene.choices.length), [0, 4, 4, 4, 4, 4, 5, 0]);
  const initial = Engine.createState();
  assert.equal(initial.version, Engine.VERSION); assert.equal(Engine.VERSION, 2);
  for (const type of ['NEXT', 'SELECT', 'CONFIRM', 'CORRECT']) assert.deepEqual(action(initial, type, 'A'), initial);
  const zero = action(initial, 'START');
  assert.equal(zero.scene, 0); assert.equal(zero.view, 'scene');
  assert.deepEqual(action(zero, 'SELECT', 'A'), zero);
  const one = action(zero, 'NEXT');
  assert.equal(one.scene, 1); assert.deepEqual(action(one, 'NEXT'), one);
  for (const value of [null, 1, 'E', 'toString', {}, '']) assert.deepEqual(action(one, 'SELECT', value), one);
  const before = structuredClone(one), chosen = action(one, 'SELECT', 'A');
  assert.deepEqual(one, before, 'A tranzíció nem módosítja a bemenetét.');
  assert.equal(chosen.view, 'feedback');
  assert.deepEqual(action(chosen, 'SELECT', 'B'), chosen);
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

test('A J3 fenyegetés nem közzététel; J5–D viszont azonnal megtörtént nyilvános tett', () => {
  const config = { choices: { ...routes.R1.choices, 3: 'D', 5: 'D', 6: 'D' }, corrected: false };
  const before = play(config, 5);
  assert.equal(Engine.facts(before).revengeThreat, true);
  assert.equal(Engine.facts(before).retaliation, false);
  const published = action(before, 'SELECT', 'D');
  assert.equal(published.view, 'feedback');
  assert.deepEqual(published.publications, { 5: true });
  assert.equal(Engine.facts(published).retaliation, true);
  assert.equal(Engine.facts(published).selfRegulation, false);
  for (const value of [true, false, 'false', null, 0]) assert.deepEqual(action(published, 'CONFIRM', value), published);
  assert.equal(action(published, 'NEXT').scene, 6);
  assert.equal(Engine.ending(play(config)), 'R5');
});

test('J6–E osztály előtti konfliktus, nem egy második titokközlés vagy megerősítő panel', () => {
  const before = play(routes.R1, 6), confronted = action(before, 'SELECT', 'E');
  assert.equal(confronted.view, 'feedback');
  assert.deepEqual(confronted.publications, {});
  assert.equal(Engine.facts(confronted).finalPublicConflict, true);
  assert.equal(Engine.facts(confronted).future, 'public_conflict');
  assert.equal(Engine.facts(confronted).retaliation, false);
  assert.equal(Engine.facts(confronted).revengeIntent, false);
  assert.equal(Engine.ending(confronted), 'R5');
  assert.deepEqual(action(confronted, 'CONFIRM', false), confronted);
  assert.equal(action(confronted, 'NEXT').view, 'ending');
});

test('A zárolás előtti mentések korrekciója továbbra is betölthető, új zárolt döntés nem hozható', () => {
  const config = { choices: { ...routes.R1.choices, 5: 'D', 6: 'D' }, corrected: false };
  const before = play(config, 6);
  for (const value of ['A', 'B', 'C']) assert.deepEqual(action(before, 'SELECT', value), before);
  const legacy = { ...play(config), decisions: { ...config.choices, 6: 'C' } };
  assert.equal(Engine.ending(legacy), 'R5');
  const explicitlyCorrected = { ...legacy, corrected: true };
  assert.deepEqual(Engine.load(memory(JSON.stringify(explicitlyCorrected)), story).state, explicitlyCorrected);
  assert.equal(Engine.ending(explicitlyCorrected), 'R3', 'A korábbi, külön korrekciós döntés megmarad.');
  assert.deepEqual(explicitlyCorrected.publications, { 5: true });
  assert.equal(Engine.facts(explicitlyCorrected).retaliation, true);
  for (const [value, expected] of [['D', 'R4'], ['A', 'R2'], ['E', 'R5']]) {
    assert.equal(Engine.ending({ ...explicitlyCorrected, decisions: { ...legacy.decisions, 6: value } }), expected);
  }
});

test('R1 tényleges jóvátételt igényel; egy indulatos mondat nem minősíti a játékost', () => {
  for (const initial of letters) {
    const config = { ...routes.R1, choices: { ...routes.R1.choices, 1: initial } };
    assert.equal(Engine.ending(play(config)), 'R1');
  }
  const threat = { ...routes.R1, choices: { ...routes.R1.choices, 3: 'D' } };
  assert.equal(Engine.ending(play(threat)), 'R2');
  assert.equal(Engine.ending(play({ ...threat, corrected: true })), 'R1');
  for (const repair of ['B', 'C']) assert.equal(Engine.ending(play({ ...routes.R1, choices: { ...routes.R1.choices, 5: repair } })), 'R2');
  assert.equal(Engine.ending(play(routes.R3)), 'R3'); assert.equal(Engine.ending(play(routes.R4)), 'R4');
});

test('A kapcsolatfelvételi tiltás mellett csak Nóra kezdeményezhet korlátozott választ', () => {
  for (const first of letters) for (const second of letters) for (const third of letters) {
    const config = { choices: { ...routes.R1.choices, 1: first, 2: second, 3: third, 4: 'D' }, corrected: false };
    assert.equal(Engine.facts(play(config, 4)).apologyHeard, true);
    for (const repair of letters) {
      if (repair === 'A') {
        const before = play(config, 5);
        assert.deepEqual(action(before, 'SELECT', repair), before);
        continue;
      }
      const after = play({ ...config, choices: { ...config.choices, 5: repair } }, 6);
      assert.equal(Engine.facts(after).noContact, true);
      assert.equal(Engine.facts(after).limitedOutreach, ['A', 'B', 'C'].includes(repair));
      assert.equal(Engine.facts(after).boundaryRespected, true);
      assert.equal(Engine.facts(after).retaliation, repair === 'D');
    }
  }
});

test('A J4–J5–J6 kombinációk közül csak a jóváhagyott zárolások akadályozzák a továbblépést', () => {
  let checked = 0;
  for (const fourth of letters) for (const fifth of letters) for (const sixth of [...letters, 'E']) {
    const config = { choices: { ...routes.R1.choices, 4: fourth, 5: fifth, 6: sixth }, corrected: false };
    if (fourth === 'D' && fifth === 'A') {
      const before = play(config, 5);
      assert.deepEqual(action(before, 'SELECT', fifth), before);
      continue;
    }
    if (fifth === 'D' && ['A', 'B', 'C'].includes(sixth)) {
      const before = play(config, 6);
      assert.deepEqual(action(before, 'SELECT', sixth), before);
      continue;
    }
    const state = play(config), facts = Engine.facts(state);
    assert.equal(state.decisions[4], fourth); assert.equal(state.decisions[5], fifth); assert.equal(state.decisions[6], sixth);
    assert.equal(facts.noContact, fourth === 'D');
    assert.deepEqual(state.publications, fifth === 'D' ? { 5: true } : {});
    assert.equal(facts.finalPublicConflict, sixth === 'E');
    assert.equal(facts.retaliation, fifth === 'D');
    const expected = fifth === 'D' || sixth === 'E' ? 'R5' : ({ A: fifth === 'A' ? 'R1' : 'R2', B: 'R2', C: 'R3', D: 'R4' })[sixth];
    assert.equal(Engine.ending(state), expected); checked++;
  }
  assert.equal(checked, 63);
});

test('Minden döntés- és korábbi explicit korrekciókombináció következetes befejezést ad', () => {
  let journeys = 0;
  const totals = { R1: 0, R2: 0, R3: 0, R4: 0, R5: 0 };
  for (const a of letters) for (const b of letters) for (const c of letters) for (const d of letters) for (const fifth of letters) {
    if (d === 'D' && fifth === 'A') continue;
    const config = { choices: { 1: a, 2: b, 3: c, 4: d, 5: fifth }, corrected: false }, base = play(config, 6);
    const corrections = Engine.facts(base).correctionAvailable ? [false, true] : [false];
    for (const corrected of corrections) {
      const ready = corrected ? action(base, 'CORRECT') : base;
      for (const future of [...letters, 'E']) {
        if (fifth === 'D' && ['A', 'B', 'C'].includes(future)) {
          assert.deepEqual(action(ready, 'SELECT', future), ready);
          continue;
        }
        const state = action(action(ready, 'SELECT', future), 'NEXT'), result = Engine.ending(state), facts = Engine.facts(state);
        assert.ok(Engine.normalize(state, story));
        assert.equal(state.scene, 7); assert.equal(state.view, 'ending'); assert.ok(own(totals, result));
        totals[result]++; journeys++;
        if (result === 'R1') {
          assert.equal(facts.repairPrivate, true); assert.equal(facts.retaliation, false); assert.equal(facts.unresolvedThreat, false);
        }
        if (result === 'R5') assert.ok(facts.unresolvedRetaliation || facts.finalPublicConflict);
        if (facts.unresolvedRetaliation || facts.finalPublicConflict) assert.equal(result, 'R5');
        else if (future === 'C') assert.equal(result, 'R3'); else if (future === 'D') assert.equal(result, 'R4');
        assert.equal(facts.apologyHeard, true); assert.equal(facts.noContact, d === 'D'); assert.equal('score' in state, false);
      }
    }
  }
  assert.equal(journeys, 6084); assert.ok(Object.values(totals).every(count => count > 0));
  console.log(`✓ ${journeys} teljes döntési útvonal: ${JSON.stringify(totals)}`);
});

test('Minden olvasási és döntési szakasz biztonságosan menthető és újratölthető', () => {
  const store = memory(); let state = Engine.createState();
  const actions = [{ type: 'START' }, { type: 'NEXT' }];
  for (let scene = 1; scene <= 6; scene++) actions.push({ type: 'SELECT', value: routes.R5.choices[scene] }, { type: 'NEXT' });
  for (const event of actions) {
    assert.equal(Engine.save(store, state), true);
    assert.deepEqual(Engine.load(store, story), { state, recovered: false, storageAvailable: true });
    state = Engine.transition(state, event, story);
  }
  assert.equal(Engine.ending(state), 'R5'); assert.equal(Engine.save(store, state), true);
  assert.deepEqual(Engine.load(store, story).state, state); assert.equal(store.values.get('other-project'), 'preserve');
});

test('Sérült, átugrott vagy kitalált közzétételt tartalmazó mentés biztonságosan helyreáll', () => {
  const complete = play(routes.R5);
  const invalid = [null, [], false, 42, 'state', {}, { ...complete, version: 99 },
    { ...complete, scene: 6 }, { ...complete, view: 'scene' }, { ...complete, corrected: 'yes' },
    { ...complete, decisions: { ...complete.decisions, 1: 'missing' } },
    { ...complete, decisions: { ...complete.decisions, 7: 'A' } }, { ...complete, decisions: { 1: 'A' } },
    { ...complete, publications: { 5: 'true' } }, { ...complete, publications: {} }, { ...complete, publications: { 5: false } },
    { ...complete, publications: { 5: true, 6: true } },
    { ...Engine.createState(), scene: 4 }, { ...Engine.createState(), corrected: true },
    { ...sceneOne(), decisions: { 1: 'A' } }, { ...play(routes.R1, 6), corrected: true },
    { ...play(routes.R1, 5), publications: { 5: false } },
    { ...play(routes.R1, 5), view: 'confirmation', decisions: { ...play(routes.R1, 5).decisions, 5: 'D' } }
  ];
  for (const candidate of invalid) {
    assert.equal(Engine.normalize(candidate, story), null, JSON.stringify(candidate));
    const loaded = Engine.load(memory(JSON.stringify(candidate)), story);
    assert.equal(loaded.recovered, true); assert.deepEqual(loaded.state, Engine.createState());
  }
  assert.equal(Engine.load(memory('{broken'), story).recovered, true);
  const forged = { ...complete, score: 100, noContact: false, ending: 'R1' };
  assert.deepEqual(Engine.normalize(forged, story), complete); assert.equal(Engine.ending(forged), 'R5');
});

test('A régi változatlan útvonalak a korábbi döntések elvesztése nélkül migrálódnak', () => {
  for (const route of [routes.R1, routes.R2, routes.R3, routes.R4]) for (const stop of [2, 3, 4, 5, 6, 7]) {
    const current = play(route, stop), legacy = { ...current, version: 1 };
    assert.equal(Engine.normalize(legacy, story), null);
    assert.deepEqual(Engine.migrate(legacy, story), { state: current, rewound: false });
    const store = memory(JSON.stringify(legacy));
    assert.deepEqual(Engine.load(store, story), { state: current, recovered: false, storageAvailable: true });
    assert.deepEqual(JSON.parse(store.values.get(Engine.STORAGE_KEY)), current);
  }
});

test('Régi J5–D tervezetből soha nem lesz visszamenőleg közzététel', () => {
  const beforeFive = play(routes.R1, 5), common = { ...beforeFive, version: 1, decisions: { ...beforeFive.decisions, 5: 'D' } };
  const drafts = [
    { ...common, view: 'confirmation' }, { ...common, view: 'feedback', publications: { 5: false } },
    { ...common, scene: 6, view: 'scene', publications: { 5: false } },
    { ...common, scene: 7, view: 'ending', decisions: { ...common.decisions, 6: 'C' }, publications: { 5: false } }
  ];
  for (const legacy of drafts) {
    assert.deepEqual(Engine.migrate(legacy, story), { state: beforeFive, rewound: true });
    const loaded = Engine.load(memory(JSON.stringify(legacy)), story);
    assert.equal(loaded.migrated, true); assert.equal(loaded.recovered, false); assert.deepEqual(loaded.state, beforeFive);
    assert.equal(Engine.facts(loaded.state).retaliation, false); assert.equal(loaded.state.decisions[4], legacy.decisions[4]);
  }
});

test('Régi J6–E titokközlésből az új jelenet előtt ismét a játékos dönt, a korábbi valódi közzététel megmarad', () => {
  for (const fifth of ['A', 'D']) {
    const beforeSix = play({ choices: { ...routes.R1.choices, 5: fifth }, corrected: false }, 6);
    const common = { ...beforeSix, version: 1, decisions: { ...beforeSix.decisions, 6: 'E' } };
    const previous = [
      { ...common, view: 'confirmation' }, { ...common, view: 'feedback', publications: { ...common.publications, 6: true } },
      { ...common, scene: 7, view: 'ending', publications: { ...common.publications, 6: true } }
    ];
    for (const legacy of previous) {
      assert.deepEqual(Engine.migrate(legacy, story), { state: beforeSix, rewound: true });
      const loaded = Engine.load(memory(JSON.stringify(legacy)), story);
      assert.equal(loaded.migrated, true); assert.deepEqual(loaded.state, beforeSix);
      assert.deepEqual(loaded.state.publications, fifth === 'D' ? { 5: true } : {}); assert.equal(loaded.state.decisions[6], undefined);
    }
  }
  assert.equal(Engine.migrate({ ...Engine.createState(), version: 1, publications: { 6: true } }, story), null);
});

test('Tárolóhiba és újrajátszás esetén más alkalmazás munkája nem sérül', () => {
  const store = memory(); Engine.save(store, play(routes.R1));
  assert.deepEqual(Engine.reset(store), Engine.createState()); assert.equal(store.values.get('other-project'), 'preserve');
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
