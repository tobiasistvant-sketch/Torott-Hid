/* A Törött híd — pure, event-driven progression; no score or moral ranking. */
(function (root, factory) {
  'use strict';
  const api = factory();
  if (typeof module === 'object' && module.exports) module.exports = api;
  else root.TorottHidEngine = api;
})(typeof globalThis !== 'undefined' ? globalThis : this, function () {
  'use strict';

  const VERSION = 1;
  const STORAGE_KEY = 'torott_hid_demo_v1';
  const VIEWS = ['start', 'scene', 'feedback', 'confirmation', 'ending'];
  const own = (object, key) => Object.prototype.hasOwnProperty.call(object, key);
  const record = value => value !== null && typeof value === 'object' && !Array.isArray(value);

  function createState() {
    return { version: VERSION, view: 'start', scene: 0, decisions: {}, publications: {}, corrected: false };
  }

  function choicesFor(scene, story) {
    if (story && Array.isArray(story.scenes)) {
      const item = story.scenes.find(candidate => candidate.id === scene);
      return item && Array.isArray(item.choices) ? item.choices.map(choice => choice.id) : [];
    }
    return scene >= 1 && scene <= 6 ? (scene === 6 ? ['A', 'B', 'C', 'D', 'E'] : ['A', 'B', 'C', 'D']) : [];
  }

  function canCorrect(state) {
    return state.decisions[1] === 'A' || state.decisions[3] === 'D' || state.publications[5] === true;
  }

  /** Reconstruct only reachable phase shapes, never trust supplied derived flags. */
  function normalize(candidate, story) {
    if (!record(candidate) || candidate.version !== VERSION || !VIEWS.includes(candidate.view) ||
        !Number.isInteger(candidate.scene) || candidate.scene < 0 || candidate.scene > 7 ||
        !record(candidate.decisions) || !record(candidate.publications) || typeof candidate.corrected !== 'boolean') return null;
    const { view, scene } = candidate;
    if ((view === 'start' && scene !== 0) || (view === 'scene' && scene > 6) ||
        (view === 'feedback' && (scene < 1 || scene > 6)) ||
        (view === 'confirmation' && scene !== 5 && scene !== 6) ||
        (view === 'ending' && scene !== 7)) return null;
    const through = view === 'start' ? 0 : view === 'scene' ? Math.max(0, scene - 1) : view === 'ending' ? 6 : scene;
    const keys = Object.keys(candidate.decisions);
    if (keys.length !== through) return null;
    const decisions = {};
    for (let number = 1; number <= through; number++) {
      if (!own(candidate.decisions, number) || !choicesFor(number, story).includes(candidate.decisions[number])) return null;
      decisions[number] = candidate.decisions[number];
    }
    const publications = {};
    for (const key of Object.keys(candidate.publications)) {
      if (!['5', '6'].includes(key) || typeof candidate.publications[key] !== 'boolean') return null;
      publications[key] = candidate.publications[key];
    }
    const confirmingFive = view === 'confirmation' && scene === 5;
    const confirmingSix = view === 'confirmation' && scene === 6;
    if (confirmingFive && decisions[5] !== 'D') return null;
    if (confirmingSix && decisions[6] !== 'E') return null;
    const fiveRequired = decisions[5] === 'D' && !confirmingFive;
    if (fiveRequired !== own(publications, 5)) return null;
    if (own(publications, 5) && decisions[5] !== 'D') return null;
    const sixRequired = decisions[6] === 'E' && !confirmingSix;
    if (sixRequired !== own(publications, 6) || (sixRequired && publications[6] !== true)) return null;
    if (candidate.corrected && (scene < 6 || !canCorrect({ decisions, publications }))) return null;
    return { version: VERSION, view, scene, decisions, publications, corrected: candidate.corrected };
  }

  /** Actions affect Nóra's choices. Áron's apology is an independent scripted event. */
  function transition(state, action, story) {
    const next = normalize(state, story) || createState();
    if (!record(action) || typeof action.type !== 'string') return next;
    if (action.type === 'RESTART') return createState();
    if (next.view === 'ending') return next;
    if (action.type === 'START' && next.view === 'start') {
      next.view = 'scene';
    } else if (action.type === 'SELECT' && next.view === 'scene' &&
        choicesFor(next.scene, story).includes(action.value)) {
      next.decisions[next.scene] = action.value;
      next.view = (next.scene === 5 && action.value === 'D') || (next.scene === 6 && action.value === 'E')
        ? 'confirmation' : 'feedback';
    } else if (action.type === 'CONFIRM' && next.view === 'confirmation' && typeof action.value === 'boolean') {
      if (next.scene === 6 && !action.value) {
        // An unposted draft is not a completed future decision or a retaliation.
        delete next.decisions[6];
        next.view = 'scene';
      } else {
        next.publications[next.scene] = action.value;
        next.view = 'feedback';
      }
    } else if (action.type === 'CORRECT' && next.view === 'scene' && next.scene === 6 && canCorrect(next)) {
      // The view labels this as an actual withdrawal/repair of Nóra's own act.
      next.corrected = true;
    } else if (action.type === 'NEXT') {
      if (next.view === 'scene' && next.scene === 0) next.scene = 1;
      else if (next.view === 'feedback') {
        next.scene++;
        next.view = next.scene === 7 ? 'ending' : 'scene';
      }
    }
    return next;
  }

  function facts(state) {
    const clean = normalize(state) || createState();
    const d = clean.decisions, p = clean.publications;
    const retaliation = p[5] === true || p[6] === true;
    const selfRegulation = d[5] === 'D' && p[5] === false;
    return {
      publicConfrontation: d[1] === 'A',
      pauseRequested: d[1] === 'B' || d[2] === 'C',
      factsKnown: d[1] === 'C' || d[3] === 'A',
      prematureClosure: d[2] === 'D',
      finalWords: d[2] === 'A',
      accountabilityDiscussion: d[2] === 'B',
      harmExpressed: d[3] === 'B',
      conversationOpen: d[4] === 'A' || (['A', 'B'].includes(d[3]) && d[4] !== 'D'),
      boundaryStated: d[1] === 'D' || d[2] === 'C' || d[3] === 'C' || ['B', 'D'].includes(d[4]) || ['A', 'C'].includes(d[5]) || d[6] === 'D',
      noContact: d[4] === 'D',
      limitedOutreach: d[4] === 'D' && ['A', 'B'].includes(d[5]),
      repairPrivate: d[5] === 'A',
      repairPublic: d[5] === 'B',
      aidRejected: d[5] === 'C',
      revengeThreat: d[3] === 'D',
      revengeIntent: d[3] === 'D' || d[5] === 'D' || d[6] === 'E',
      retaliation,
      unresolvedRetaliation: p[6] === true || (p[5] === true && !clean.corrected),
      selfRegulation,
      corrected: clean.corrected,
      correctionAvailable: clean.view === 'scene' && clean.scene === 6 && canCorrect(clean) && !clean.corrected,
      unresolvedThreat: d[3] === 'D' && !clean.corrected && !selfRegulation,
      apologyHeard: clean.scene >= 4,
      boundaryRespected: clean.scene >= 5,
      forgiveness: d[6] === 'C' ? 'declared' : d[4] === 'C' ? 'direction' : 'undecided',
      future: ({ A: 'open', B: 'cautious', C: 'separate', D: 'distance', E: 'public_retaliation' })[d[6]] || 'undecided'
    };
  }

  /** Demo interpretation: unresolved actual harm is not erased by a final label. */
  function ending(state) {
    const clean = normalize(state);
    if (!clean || !own(clean.decisions, 6) || clean.view === 'confirmation') return null;
    const context = facts(clean);
    if (context.unresolvedRetaliation) return 'R5';
    if (clean.decisions[6] === 'C') return 'R3';
    if (clean.decisions[6] === 'D') return 'R4';
    if (clean.decisions[6] === 'B') return 'R2';
    if (clean.decisions[6] === 'A') {
      return context.repairPrivate && !context.retaliation && !context.unresolvedThreat ? 'R1' : 'R2';
    }
    return null;
  }

  function save(storage, state) {
    const clean = normalize(state);
    if (!clean) return false;
    try {
      if (!storage || typeof storage.setItem !== 'function') return false;
      storage.setItem(STORAGE_KEY, JSON.stringify(clean));
      return true;
    } catch (_) { return false; }
  }

  function load(storage, story) {
    let raw;
    try {
      if (!storage || typeof storage.getItem !== 'function') throw new Error('Unavailable storage');
      raw = storage.getItem(STORAGE_KEY);
    } catch (_) {
      return { state: createState(), recovered: false, storageAvailable: false };
    }
    let state = null;
    if (raw !== null) {
      try { state = normalize(JSON.parse(raw), story); } catch (_) { /* recover below */ }
    }
    const recovered = raw !== null && !state;
    state = state || createState();
    return { state, recovered, storageAvailable: save(storage, state) };
  }

  function reset(storage) {
    const state = createState();
    try { if (storage && typeof storage.removeItem === 'function') storage.removeItem(STORAGE_KEY); } catch (_) { /* Try writing below. */ }
    save(storage, state);
    return state;
  }

  return Object.freeze({ VERSION, STORAGE_KEY, createState, normalize, transition, facts, ending, save, load, reset });
});
