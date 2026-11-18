/* Screen history is separate from story rules and the browser History API. */
(function (root, factory) {
  'use strict';
  const api = factory();
  if (typeof module === 'object' && module.exports) module.exports = api;
  else root.TorottHidNavigation = api;
})(typeof globalThis !== 'undefined' ? globalThis : this, function () {
  'use strict';
  const STORAGE_KEY = 'torott_hid_navigation_v1';
  const VERSION = 1;
  const clone = value => JSON.parse(JSON.stringify(value));
  const equal = (left, right) => JSON.stringify(left) === JSON.stringify(right);
  const record = value => value !== null && typeof value === 'object' && !Array.isArray(value);
  function newRunId() {
    if (typeof globalThis.crypto === 'object' && typeof globalThis.crypto.randomUUID === 'function') {
      return globalThis.crypto.randomUUID();
    }
    return 'run-' + Date.now().toString(36) + '-' + Math.random().toString(36).slice(2);
  }

  // Older releases saved only the current story state. Rebuild earlier screens
  // by replaying that state's decisions through the existing, unchanged engine.
  function reconstruct(target, engine, story) {
    const snapshots = [];
    let current = engine.createState();
    for (let count = 0; count < 100; count++) {
      snapshots.push(current);
      if (equal(current, target)) return snapshots;
      let action;
      if (current.view === 'start') action = { type: 'START' };
      else if (current.view === 'scene' && current.scene === 0) action = { type: 'NEXT' };
      else if (current.view === 'scene' && current.scene === 6 && target.corrected && !current.corrected) {
        action = { type: 'CORRECT' };
      } else if (current.view === 'scene' && target.decisions[current.scene]) {
        action = { type: 'SELECT', value: target.decisions[current.scene] };
      } else if (current.view === 'confirmation' &&
          Object.prototype.hasOwnProperty.call(target.publications, current.scene)) {
        action = { type: 'CONFIRM', value: target.publications[current.scene] };
      } else if (current.view === 'feedback') action = { type: 'NEXT' };
      else break;
      const next = engine.transition(current, action, story);
      if (equal(next, current)) break;
      current = next;
    }
    // A normalized legacy state remains usable even if its precise old route
    // cannot be inferred; never invent extra decisions to manufacture a history.
    return [target];
  }

  function create(options) {
    const { engine, story, storage } = options;
    const initial = engine.normalize(options.initialState, story) || engine.createState();
    let runId, entries, position, nextId;

    function readSaved() {
      if (options.recovered) return null;
      try {
        const saved = JSON.parse(storage.getItem(STORAGE_KEY));
        if (!record(saved) || saved.version !== VERSION ||
            typeof saved.runId !== 'string' || !/^[A-Za-z0-9_.-]{1,128}$/.test(saved.runId) ||
            !Array.isArray(saved.entries) || saved.entries.length < 1 || saved.entries.length > 10000 ||
            !Number.isSafeInteger(saved.position) || saved.position < 0 || saved.position >= saved.entries.length ||
            !Number.isSafeInteger(saved.nextId) || saved.nextId < 1) return null;
        let previousId = -1;
        const normalized = [];
        for (const entry of saved.entries) {
          if (!record(entry) || !Number.isSafeInteger(entry.id) || entry.id <= previousId) return null;
          const snapshot = engine.normalize(entry.snapshot, story);
          if (!snapshot) return null;
          normalized.push({ id: entry.id, snapshot });
          previousId = entry.id;
        }
        if (saved.nextId <= previousId || !equal(normalized[saved.position].snapshot, initial)) return null;
        return { ...saved, entries: normalized };
      } catch (_) { return null; }
    }

    const saved = readSaved();
    if (saved) {
      ({ runId, entries, position, nextId } = saved);
    } else {
      runId = newRunId();
      entries = reconstruct(initial, engine, story).map((snapshot, id) => ({ id, snapshot }));
      position = entries.length - 1;
      nextId = entries.length;
    }

    return Object.freeze({
      get current() { return clone(entries[position].snapshot); },
      get runId() { return runId; },
      get entryId() { return entries[position].id; },
      get canBack() { return position > 0; },
      get canForward() { return position < entries.length - 1; },
      get trail() { return clone(entries); },
      get position() { return position; },
      move(delta) {
        if (!Number.isSafeInteger(delta) || delta === 0 || position + delta < 0 || position + delta >= entries.length) return false;
        position += delta;
        return true;
      },
      restore(entryId) {
        const target = entries.findIndex(entry => entry.id === entryId);
        if (target < 0) return false;
        position = target;
        return true;
      },
      push(candidate) {
        const snapshot = engine.normalize(candidate, story);
        if (!snapshot || equal(snapshot, entries[position].snapshot)) return false;
        entries = entries.slice(0, position + 1);
        entries.push({ id: nextId++, snapshot });
        position = entries.length - 1;
        return true;
      },
      restart() {
        runId = newRunId();
        entries = [{ id: 0, snapshot: engine.createState() }];
        position = 0;
        nextId = 1;
      },
      save() {
        try {
          if (!storage || typeof storage.setItem !== 'function') return false;
          storage.setItem(STORAGE_KEY, JSON.stringify({ version: VERSION, runId, entries, position, nextId }));
          return true;
        } catch (_) { return false; }
      }
    });
  }
  return Object.freeze({ STORAGE_KEY, create });
});
