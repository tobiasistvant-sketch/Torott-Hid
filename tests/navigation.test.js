'use strict';
const test = require('node:test');
const assert = require('node:assert/strict');
const fs = require('node:fs');
const vm = require('node:vm');
const path = require('node:path');
const Navigation = require('../js/navigation.js');
const Engine = require('../js/engine.js');
const story = require('../js/story.js');
const routes = require('./routes.json');
const act = (state, type, value) => Engine.transition(state, { type, value }, story);
function memory() {
  const values = new Map([['other-project', 'preserve']]);
  return { values, getItem: key => values.get(key) ?? null, setItem: (key, value) => values.set(key, value) };
}
function create(storage = memory(), initialState = Engine.createState(), recovered = false) {
  return Navigation.create({ engine: Engine, story, storage, initialState, recovered });
}
function advance(navigation, type, value) {
  assert.equal(navigation.push(act(navigation.current, type, value)), true);
}
function one(navigation) {
  advance(navigation, 'START');
  advance(navigation, 'NEXT');
}
function snapshotsFor(config) {
  let state = Engine.createState();
  const snapshots = [state];
  const step = (type, value) => { state = act(state, type, value); snapshots.push(state); };
  step('START'); step('NEXT');
  for (let number = 1; number <= 6; number++) {
    if (number === 6 && config.corrected) step('CORRECT');
    step('SELECT', config.choices[number]);
    step('NEXT');
  }
  return snapshots;
}

test('A navigációs gombok önálló képernyőlistát járnak be, a határokon nincs állapotváltozás', () => {
  const navigation = create();
  assert.equal(navigation.canBack, false);
  assert.equal(navigation.canForward, false);
  assert.equal(navigation.move(-1), false);
  assert.equal(navigation.move(1), false);
  one(navigation);
  assert.equal(navigation.current.scene, 1);
  assert.equal(navigation.canBack, true);
  const id = navigation.entryId;
  assert.equal(navigation.move(-1), true);
  assert.equal(navigation.current.scene, 0);
  assert.equal(navigation.canForward, true);
  assert.equal(navigation.move(1), true);
  assert.equal(navigation.entryId, id);
  assert.equal(navigation.move(0), false);
  assert.equal(navigation.move(0.5), false);
});

test('Újratöltés után a kurzor és a később már bejárt képernyők is visszaállnak', () => {
  const storage = memory();
  const navigation = create(storage);
  one(navigation);
  advance(navigation, 'SELECT', 'A');
  advance(navigation, 'NEXT');
  const later = navigation.current;
  navigation.move(-2);
  const earlier = navigation.current;
  assert.equal(navigation.save(), true);
  const reloaded = create(storage, earlier);
  assert.equal(reloaded.runId, navigation.runId);
  assert.equal(reloaded.entryId, navigation.entryId);
  assert.deepEqual(reloaded.trail, navigation.trail);
  assert.equal(reloaded.canForward, true);
  assert.equal(reloaded.move(2), true);
  assert.deepEqual(reloaded.current, later);
});

test('Másik korábbi döntés levágja a régi jövőt, a közzétételt és a korrekciót is', () => {
  const config = { choices: { 1: 'A', 2: 'B', 3: 'D', 4: 'A', 5: 'D', 6: 'C' }, publications: { 5: true }, corrected: true };
  const navigation = create();
  for (const snapshot of snapshotsFor(config).slice(1)) assert.equal(navigation.push(snapshot), true);
  const discardedIds = navigation.trail.slice(3).map(entry => entry.id);
  const priorMaximum = navigation.entryId;
  assert.equal(navigation.current.corrected, true);
  assert.deepEqual(navigation.current.publications, { 5: true });
  assert.equal(navigation.restore(2), true);
  assert.equal(navigation.current.scene, 1);
  advance(navigation, 'SELECT', 'B');
  assert.deepEqual(navigation.current.decisions, { 1: 'B' });
  assert.deepEqual(navigation.current.publications, {});
  assert.equal(navigation.current.corrected, false);
  assert.equal(navigation.canForward, false);
  assert.ok(navigation.entryId > priorMaximum, 'Egy levágott böngészőbejegyzés azonosítója nem használható újra.');
  for (const id of discardedIds) assert.equal(navigation.restore(id), false);
});

test('A tárolt következő azonosító újratöltés és új elágazás után sem használható újra', () => {
  const storage = memory(), navigation = create(storage);
  one(navigation);
  advance(navigation, 'SELECT', 'A');
  const discarded = navigation.entryId;
  navigation.move(-1);
  advance(navigation, 'SELECT', 'B');
  navigation.save();
  const reloaded = create(storage, navigation.current);
  reloaded.move(-1);
  advance(reloaded, 'SELECT', 'C');
  assert.ok(reloaded.entryId > navigation.entryId);
  assert.equal(reloaded.restore(discarded), false);
});

test('A régi, egyetlen pillanatképes mentés minden szakasza az állapotgéppel rekonstruálható', () => {
  const configs = [
    ...Object.values(routes),
    { choices: { 1: 'A', 2: 'B', 3: 'D', 4: 'A', 5: 'D', 6: 'C' }, publications: { 5: true }, corrected: true },
    { choices: { 1: 'C', 2: 'B', 3: 'A', 4: 'D', 5: 'D', 6: 'D' }, publications: { 5: true }, corrected: false }
  ];
  let checked = 0;
  for (const config of configs) {
    const snapshots = snapshotsFor(config);
    for (let index = 0; index < snapshots.length; index++) {
      const navigation = create(memory(), snapshots[index]);
      assert.deepEqual(navigation.current, snapshots[index]);
      assert.deepEqual(navigation.trail.map(entry => entry.snapshot), snapshots.slice(0, index + 1));
      checked++;
    }
  }
  assert.ok(checked > 100);
});

test('Sérült vagy másik mentéshez tartozó előzmény nem írja felül a tényleges játékállást', () => {
  const storage = memory(), navigation = create(storage);
  one(navigation);
  advance(navigation, 'SELECT', 'B');
  navigation.save();
  const valid = JSON.parse(storage.getItem(Navigation.STORAGE_KEY));
  const malformed = [
    '{broken',
    JSON.stringify({ ...valid, version: 99 }),
    JSON.stringify({ ...valid, runId: '<script>' }),
    JSON.stringify({ ...valid, entries: [] }),
    JSON.stringify({ ...valid, position: -1 }),
    JSON.stringify({ ...valid, position: valid.entries.length }),
    JSON.stringify({ ...valid, nextId: valid.entries.at(-1).id }),
    JSON.stringify({ ...valid, entries: valid.entries.map((entry, index) => ({ ...entry, id: index ? 0 : entry.id })) }),
    JSON.stringify({ ...valid, entries: valid.entries.map((entry, index) => index ? { ...entry, snapshot: { ...entry.snapshot, view: 'unknown' } } : entry) })
  ];
  for (const raw of malformed) {
    storage.setItem(Navigation.STORAGE_KEY, raw);
    const recovered = create(storage, navigation.current);
    assert.deepEqual(recovered.current, navigation.current);
    assert.notEqual(recovered.runId, valid.runId);
    assert.equal(recovered.canBack, true);
  }
  storage.setItem(Navigation.STORAGE_KEY, JSON.stringify(valid));
  const differentState = act(act(Engine.createState(), 'START'), 'NEXT');
  const different = create(storage, differentState);
  assert.deepEqual(different.current, differentState);
  assert.equal(different.canForward, false);
  assert.notEqual(different.runId, valid.runId);
});

test('Sérült főmentés után a régi előzmény és böngészőazonosító nem éleszti újra a döntéseket', () => {
  const storage = memory(), old = create(storage);
  one(old);
  advance(old, 'SELECT', 'A');
  old.save();
  const fresh = create(storage, Engine.createState(), true);
  assert.deepEqual(fresh.current, Engine.createState());
  assert.equal(fresh.trail.length, 1);
  assert.notEqual(fresh.runId, old.runId);
  assert.equal(fresh.restore(old.entryId), false);
});

test('Régi tervezet migrálása új, érvényes előzményt épít, a mentett jövő nem teszi közzé a titkot', () => {
  const storage = memory();
  const snapshots = snapshotsFor({ choices: { 1: 'C', 2: 'B', 3: 'A', 4: 'D', 5: 'D', 6: 'C' }, corrected: false });
  const atFive = snapshots.find(state => state.scene === 5 && state.view === 'scene');
  const draft = snapshots.find(state => state.scene === 5 && state.view === 'feedback');
  const legacy = { ...draft, version: 1, publications: { 5: false } };
  storage.setItem(Engine.STORAGE_KEY, JSON.stringify(legacy));
  storage.setItem(Navigation.STORAGE_KEY, JSON.stringify({
    version: 1, runId: 'previous-playthrough', position: 1, nextId: 2,
    entries: [{ id: 0, snapshot: { ...atFive, version: 1 } }, { id: 1, snapshot: legacy }]
  }));
  const loaded = Engine.load(storage, story);
  assert.equal(loaded.migrated, true);
  assert.deepEqual(loaded.state, atFive);
  const navigation = create(storage, loaded.state, loaded.recovered);
  assert.notEqual(navigation.runId, 'previous-playthrough');
  assert.equal(navigation.canBack, true);
  assert.equal(navigation.canForward, false);
  assert.deepEqual(navigation.current, atFive);
  assert.equal(Engine.facts(navigation.current).retaliation, false);
  assert.ok(navigation.trail.every(entry => entry.snapshot.version === Engine.VERSION));
  navigation.save();
  assert.deepEqual(JSON.parse(storage.getItem(Engine.STORAGE_KEY)), atFive);
});

test('Újrakezdés külön munkamenet-azonosítót és tiszta előzményt indít, más tárolókulcsot megőriz', () => {
  const storage = memory(), navigation = create(storage);
  storage.setItem(Engine.STORAGE_KEY, 'engine-key-is-managed-by-app');
  one(navigation);
  advance(navigation, 'SELECT', 'B');
  const oldRun = navigation.runId, oldEntry = navigation.entryId;
  navigation.restart();
  assert.notEqual(navigation.runId, oldRun);
  assert.equal(navigation.canBack, false);
  assert.equal(navigation.canForward, false);
  assert.deepEqual(navigation.current, Engine.createState());
  assert.equal(navigation.restore(oldEntry), false);
  assert.equal(navigation.save(), true);
  assert.equal(storage.getItem('other-project'), 'preserve');
  assert.equal(storage.getItem(Engine.STORAGE_KEY), 'engine-key-is-managed-by-app');
  assert.equal(create(storage, navigation.current).canBack, false);
});

test('Tiltott vagy betelt tároló mellett a teljes navigáció memóriában tovább működik', () => {
  const blocked = { getItem() { throw new Error('blocked'); }, setItem() { throw new Error('full'); } };
  for (const storage of [null, blocked]) {
    const navigation = create(storage);
    one(navigation);
    advance(navigation, 'SELECT', 'D');
    const state = navigation.current;
    assert.equal(navigation.save(), false);
    assert.equal(navigation.move(-1), true);
    assert.equal(navigation.move(1), true);
    assert.deepEqual(navigation.current, state);
  }
});

test('A külső kód nem módosíthatja a tárolt pillanatképeket és az érvénytelen lépés nem vágja le a jövőt', () => {
  const navigation = create();
  one(navigation);
  advance(navigation, 'SELECT', 'A');
  navigation.move(-1);
  const before = navigation.trail;
  navigation.current.decisions[1] = 'D';
  navigation.trail[0].snapshot.scene = 7;
  assert.equal(navigation.push(navigation.current), false);
  assert.equal(navigation.push({ view: 'fake' }), false);
  assert.deepEqual(navigation.trail, before);
  assert.equal(navigation.canForward, true);
});

test('Az előzménykezelő közvetlen böngészős betöltéssel is elérhető', () => {
  const context = {};
  vm.runInNewContext(fs.readFileSync(path.join(__dirname, '../js/navigation.js'), 'utf8'), context);
  assert.equal(typeof context.TorottHidNavigation.create, 'function');
  assert.equal(context.TorottHidNavigation.STORAGE_KEY, Navigation.STORAGE_KEY);
});
