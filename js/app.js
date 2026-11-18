/* Rendering and interaction only; source text, additions and rules are separate. */
(function () {
  'use strict';
  const S = window.TorottHidStory, A = window.TorottHidAdaptations;
  const R = window.TorottHidReflections, E = window.TorottHidEngine;
  const C = window.TorottHidComics || { scenes: {}, consequences: {} };
  const main = document.getElementById('main-content');
  if (!S || !A || !R || !E) {
    main.textContent = 'A történet egyik fájlja nem töltődött be. Frissítsd az oldalt.';
    return;
  }
  const version = window.TorottHidVersion.version;
  document.title = S.title + ' · ' + version + ' demó';
  let storage = null;
  try { storage = window.sessionStorage; } catch (_) { /* The story still works in memory. */ }
  const loaded = E.load(storage, S);
  let state = loaded.state, storageAvailable = loaded.storageAvailable, recovered = loaded.recovered;
  const dialog = document.getElementById('reset-dialog');
  const comicDialog = document.getElementById('comic-dialog');
  const comicViewerImage = document.getElementById('comic-viewer-image');
  const comicCanvas = document.getElementById('comic-canvas');
  const comicScroll = comicDialog.querySelector('.comic-viewer-scroll');
  const comicEntries = Object.values(C.scenes).concat(Object.values(C.consequences).flatMap(Object.values));
  const comicById = new Map(comicEntries.map(entry => [entry.id, entry]));
  let comicZoom = 1, comicOpener = null, comicReturnScroll = null, originalBodyOverflow = '';
  const esc = value => String(value).replace(/[&<>"']/g, c => ({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));
  const paras = items => items.map(text => '<p>' + esc(text) + '</p>').join('');
  const button = (text, action, secondary, disabled) => '<button type="button" class="btn ' + (secondary ? 'btn-secondary' : 'btn-primary') + '" data-action="' + action + '"' + (disabled ? ' disabled' : '') + '>' + esc(text) + '</button>';
  const heading = (eyebrow, title) => '<header class="screen-heading"><p class="eyebrow">' + esc(eyebrow) + '</p><h1 id="screen-title" tabindex="-1">' + esc(title) + '</h1></header>';
  const scene = () => S.scenes[state.scene];
  function blocksHTML(blocks) {
    return blocks.map(block => {
      const speaker = block.type === 'thought' ? 'Nóra · belső gondolat' : block.speaker;
      return '<article class="story-block ' + esc(block.type) + '"' + (block.channel ? ' data-channel="' + esc(block.channel) + '"' : '') + '>' +
        (speaker ? '<p class="speaker">' + esc(speaker) + (block.channel === 'message' ? ' · üzenet' : '') + '</p>' : '') +
        '<p class="block-text">' + esc(block.text) + '</p></article>';
    }).join('');
  }
  function comicHTML(entry, sourceBlocks) {
    const accompanying = entry.layout === 'illustrated-consequence'
      ? '<div class="comic-accompanying-text">' + blocksHTML(sourceBlocks) + '</div>' : '';
    return '<section class="comic" data-comic-id="' + esc(entry.id) + '">' +
      '<figure class="comic-media"><button type="button" class="comic-image-button" data-action="open-comic" data-comic-id="' + esc(entry.id) + '" aria-label="Képregény nagyítása: ' + esc(entry.title) + '">' +
      '<img class="comic-image" src="' + esc(entry.src) + '" width="' + entry.width + '" height="' + entry.height + '" alt="' + esc(entry.alt) + '" loading="lazy" decoding="async">' +
      '<span class="comic-zoom-hint">Képregény nagyítása</span></button><figcaption>' + esc(entry.title) + '</figcaption></figure>' +
      accompanying + '<details class="comic-transcript"><summary>Szöveges átirat</summary><div>' + blocksHTML(entry.transcript) + '</div></details>' +
      '<p class="comic-fallback-message" role="status" hidden>A kép most nem tölthető be. A történet szöveges változatával folytathatod.</p>' +
      '<div class="comic-source-fallback" tabindex="-1" hidden>' + blocksHTML(sourceBlocks) + '</div></section>';
  }
  function sceneContent(blocks) {
    const entry = C.scenes[state.scene];
    if (!entry) return blocksHTML(blocks);
    const beforeIds = entry.beforeBlockIds || [], afterLines = entry.afterSourceLines || [];
    const before = blocks.filter(block => beforeIds.includes(block.id));
    const after = blocks.filter(block => block.source && afterLines.includes(block.source.line));
    const covered = blocks.filter(block => !before.includes(block) && !after.includes(block));
    return blocksHTML(before) + comicHTML(entry, covered) + blocksHTML(after);
  }
  function revealComicFallback(id) {
    const frame = Array.from(main.querySelectorAll('.comic')).find(node => node.dataset.comicId === id);
    if (!frame) return;
    const focused = document.activeElement;
    const hiddenAreas = [frame.querySelector('.comic-media'), frame.querySelector('.comic-transcript'), frame.querySelector('.comic-accompanying-text')];
    const restoreFocus = hiddenAreas.some(node => node && node.contains(focused));
    frame.dataset.failed = 'true';
    frame.querySelector('.comic-media').hidden = true;
    frame.querySelector('.comic-transcript').hidden = true;
    const accompanying = frame.querySelector('.comic-accompanying-text');
    if (accompanying) accompanying.hidden = true;
    frame.querySelector('.comic-source-fallback').hidden = false;
    frame.querySelector('.comic-fallback-message').hidden = false;
    if (restoreFocus && !comicDialog.open) frame.querySelector('.comic-source-fallback').focus({ preventScroll: true });
  }
  function setComicZoom(value) {
    comicZoom = Math.max(1, Math.min(4, value));
    comicCanvas.style.width = (comicZoom * 100) + '%';
    document.getElementById('comic-zoom-status').textContent = Math.round(comicZoom * 100) + '%';
    if (comicZoom === 1) { comicScroll.scrollLeft = 0; comicScroll.scrollTop = 0; }
  }
  function openComic(id, opener) {
    const entry = comicById.get(id);
    if (!entry || comicDialog.open) return;
    comicOpener = opener;
    comicReturnScroll = { x: window.scrollX, y: window.scrollY };
    originalBodyOverflow = document.body.style.overflow;
    document.getElementById('comic-title').textContent = entry.title;
    comicDialog.dataset.comicId = id;
    comicViewerImage.alt = entry.alt;
    comicViewerImage.src = entry.src;
    setComicZoom(1);
    document.body.style.overflow = 'hidden';
    comicDialog.showModal();
    comicScroll.scrollLeft = 0; comicScroll.scrollTop = 0;
  }
  comicDialog.addEventListener('close', () => {
    document.body.style.overflow = originalBodyOverflow;
    comicViewerImage.removeAttribute('src');
    if (comicOpener && comicOpener.isConnected) {
      if (comicOpener.getClientRects().length) comicOpener.focus({ preventScroll: true });
      else {
        const frame = comicOpener.closest('.comic');
        if (frame) frame.querySelector('.comic-source-fallback').focus({ preventScroll: true });
      }
      if (comicReturnScroll) window.scrollTo({ left: comicReturnScroll.x, top: comicReturnScroll.y, behavior: 'instant' });
    }
    comicOpener = null; comicReturnScroll = null;
  });
  comicDialog.addEventListener('click', event => { if (event.target === comicDialog) comicDialog.close(); });
  comicDialog.addEventListener('keydown', event => {
    if (event.key !== 'Tab') return;
    const nodes = comicDialog.querySelectorAll('button:not([disabled]), [tabindex="0"]');
    const first = nodes[0], last = nodes[nodes.length - 1];
    if (event.shiftKey && document.activeElement === first) { event.preventDefault(); last.focus(); }
    else if (!event.shiftKey && document.activeElement === last) { event.preventDefault(); first.focus(); }
  });
  document.addEventListener('error', event => {
    const image = event.target;
    if (!(image instanceof HTMLImageElement)) return;
    if (image.matches('img.comic-image')) revealComicFallback(image.closest('.comic').dataset.comicId);
    else if (image === comicViewerImage && comicDialog.open) {
      revealComicFallback(comicDialog.dataset.comicId);
      comicDialog.close();
    }
  }, true);
  function startScreen() {
    return '<section class="hero"><div class="hero-copy"><p class="demo-badge">v' + esc(version) + ' demó</p>' +
      '<p class="eyebrow">XI. osztály · Református vallás</p><h1 id="screen-title" tabindex="-1">' + esc(S.title) + '</h1>' +
      '<p class="lead">' + esc(A.ui.intro) + '</p><p>' + esc(A.ui.role) + '</p><div class="actions">' + button('Belépek Nóra történetébe', 'start') + '</div>' +
      '<p class="session-note">' + esc(A.ui.demo) + '</p></div><aside class="hero-aside"><div class="bridge-emblem" aria-hidden="true"></div><h2>Harag és megbocsátás</h2><p>Morális dilemmák az emberi kapcsolatokban.</p></aside></section>' +
      '<section class="review-note"><p>' + esc(A.ui.care) + '</p><p>A haladás ezen a böngészőlapon újratöltés után is megmarad. A lap bezárásával a munkamenet véget ér.</p></section>';
  }
  function correctionPanel() {
    const f = E.facts(state);
    if (state.scene !== 6) return '';
    if (f.corrected) return '<p class="completion-feedback" role="status">' + esc(A.ui.corrected) + '</p>';
    if (!f.correctionAvailable) return '';
    const description = state.publications[5] ? A.ui.correctPost : f.revengeThreat ? A.ui.correctThreat : A.ui.correctTone;
    return '<aside class="correction-card"><h2>Egy korábbi mondatod vagy tetted</h2><p>' + esc(description) + '</p><div class="actions">' + button(A.ui.correction, 'correct', true) + '</div><p class="session-note">Ezt a lépést nem kötelező választanod.</p></aside>';
  }
  function sceneScreen() {
    const item = scene();
    const narrative = heading(state.scene + '. jelenet', item.title) +
      '<section class="scene-card"><p class="scene-time">' + esc(item.time) + '</p>' + sceneContent(A.blocksForScene(state, S, E)) + '</section>';
    if (!item.choices.length) return narrative + '<div class="actions">' + button('Tovább a történetben', 'next') + '</div>';
    return narrative + correctionPanel() + '<section class="choice-panel"><h2 class="choice-question">' + esc(item.question) + '</h2><div class="choice-list">' +
      item.choices.map(choice => '<button type="button" class="choice-card" id="choice-' + choice.id + '" data-action="select" data-value="' + choice.id + '"><span class="choice-letter" aria-hidden="true">' + choice.id + '</span><span class="choice-text">' + esc(choice.label) + '</span></button>').join('') +
      '</div></section>';
  }
  function feedbackScreen() {
    const item = scene(), choice = item.choices.find(c => c.id === state.decisions[state.scene]);
    const entry = (C.consequences[state.scene] || {})[choice.id];
    const feedback = A.feedbackBlocks(state, S, E);
    return heading(state.scene + '. jelenet · A történet folytatódik', item.title) + '<section class="consequence-card">' +
      (entry ? comicHTML(entry, feedback) : '<p class="selected-answer">' + esc(choice.label) + '</p><div class="consequence-body">' + blocksHTML(feedback) + '</div>') +
      '</section><div class="actions">' + button(state.scene === 6 ? 'A híd állapota' : 'Tovább a történetben', 'next') + '</div>';
  }
  function confirmationScreen() {
    return heading(state.scene + '. jelenet', 'Mielőtt közzétennéd') + '<section class="confirmation-card"><p>' + esc(A.ui.confirmation) + '</p>' +
      '<article class="story-block thought"><p class="speaker">Nóra · belső gondolat</p><p class="block-text">' + esc(A.sourceExcerpts.confirmationThought.text) + '</p></article>' +
      '<div class="actions"><button type="button" class="btn btn-secondary" data-action="confirm" data-value="false">Átgondolom még</button><button type="button" class="btn btn-primary" data-action="confirm" data-value="true">Közzéteszem</button></div></section>';
  }
  function historyHTML() {
    return '<ol class="route-list">' + Object.entries(state.decisions).map(([number, id]) => {
      const item = S.scenes[Number(number)], choice = item.choices.find(c => c.id === id);
      let note = '';
      if ((number === '5' && id === 'D') || (number === '6' && id === 'E')) note = state.publications[number] ? 'A közzétételt megerősítetted.' : 'A tervezetet nem tetted közzé.';
      if (number === '5' && state.publications[5] && state.corrected) note += ' Később visszavontad, és vállaltad érte a felelősséget.';
      return '<li><p class="route-scene">' + esc(number + '. ' + item.title) + '</p><p class="route-choice">' + esc(choice.label) + '</p>' + (note ? '<p class="summary-note">' + esc(note) + '</p>' : '') + '</li>';
    }).join('') + '</ol>';
  }
  function endingScreen() {
    const item = R[E.ending(state)];
    return '<header class="ending-header"><p class="eyebrow">7. jelenet · A híd állapota</p><div class="bridge-emblem ending-symbol" aria-hidden="true"></div><h1 id="screen-title" tabindex="-1">' + esc(item.title) + '</h1><p class="ending-subtitle">' + esc(item.subtitle) + '</p></header>' +
      '<section class="reflection-card"><h2>Mi történt a te történetedben?</h2>' + paras(A.summary(state, E)) + '<blockquote class="reflection-quote">' + esc(item.quote) + '</blockquote></section>' +
      '<section class="reflection-card"><h2>Mit tanulhatunk ebből?</h2>' + paras(item.moral) + '</section>' +
      '<section class="reflection-card"><h2>Bibliai iránytű</h2><div class="scripture-list">' + item.scriptures.map(verse => '<article><h3>' + esc(verse.reference) + ' – ' + esc(verse.label) + '</h3><p>' + esc(verse.explanation.text) + '</p></article>').join('') + '</div></section>' +
      '<section class="reflection-card"><h2>Gondolkodj el!</h2><ol class="question-list">' + item.questions.map(question => '<li>' + esc(question) + '</li>').join('') + '</ol><p class="summary-note">A kérdéseket magadban vagy a fiktív történetről beszélgetve is átgondolhatod.</p></section>' +
      '<section class="reflection-card"><h2>A döntési útvonalad</h2>' + historyHTML() + '</section><section class="review-note">' +
      blocksHTML(S.scenes[7].blocks) + '<p>' + esc(A.ui.finish) + '</p></section><div class="actions">' + button('Újrajátszom Nóra történetét', 'restart', true) + '</div>';
  }
  function updateNotice() {
    const note = document.getElementById('storage-note');
    note.hidden = storageAvailable && !recovered;
    note.textContent = !storageAvailable ? 'Ebben a böngészőben nem tudjuk menteni a haladásodat. A játék működik, de újratöltéskor elveszhet a munkamenet.' :
      recovered ? 'A korábbi mentés nem volt olvasható. Új történetet indítottunk.' : '';
  }
  function render(moveFocus) {
    const views = { start: startScreen, scene: sceneScreen, feedback: feedbackScreen, confirmation: confirmationScreen, ending: endingScreen };
    main.innerHTML = views[state.view]();
    main.dataset.view = state.view; main.dataset.scene = String(state.scene);
    if (state.view === 'ending') main.dataset.ending = E.ending(state); else delete main.dataset.ending;
    document.querySelectorAll('[data-app-version]').forEach(node => { node.textContent = 'v' + version; node.hidden = false; });
    document.querySelector('.restart-button').hidden = state.view === 'start';
    document.getElementById('chapters').innerHTML = S.scenes.map(item => '<li class="' + (state.view !== 'start' && item.id === state.scene ? 'current' : item.id < state.scene ? 'done' : '') + '"' + (state.view !== 'start' && item.id === state.scene ? ' aria-current="step"' : '') + ' aria-label="' + esc(item.id + '. ' + item.title) + '"><span class="chapter-number">' + item.id + '</span><span class="chapter-label">' + esc(item.title) + '</span></li>').join('');
    const value = state.view === 'ending' ? 8 : state.view === 'start' ? 0 : state.scene + (state.view === 'feedback' ? 1 : 0);
    const progress = document.getElementById('progress');
    progress.setAttribute('aria-valuenow', String(value)); progress.setAttribute('aria-valuetext', state.view === 'start' ? 'A történet kezdete' : state.scene + '. jelenet: ' + scene().title);
    document.getElementById('progress-fill').style.width = value / 8 * 100 + '%';
    updateNotice();
    if (moveFocus) { main.querySelector('h1').focus({ preventScroll: true }); window.scrollTo({ top: 0, behavior: 'instant' }); }
  }
  function dispatch(action) {
    if (comicDialog.open) { comicOpener = null; comicDialog.close(); }
    state = E.transition(state, action, S);
    if (state.view !== 'start') recovered = false;
    storageAvailable = E.save(storage, state);
    render(true);
  }
  document.addEventListener('click', event => {
    const control = event.target.closest('[data-action]');
    if (!control || control.disabled) return;
    const action = control.dataset.action;
    if (action === 'open-comic') openComic(control.dataset.comicId, control);
    else if (action === 'close-comic') comicDialog.close();
    else if (action === 'comic-zoom-in') setComicZoom(comicZoom + 0.5);
    else if (action === 'comic-zoom-out') setComicZoom(comicZoom - 0.5);
    else if (action === 'comic-zoom-reset') setComicZoom(1);
    else if (action === 'restart') { dialog.returnValue = 'cancel'; if (!dialog.open) dialog.showModal(); }
    else if (action === 'start') dispatch({ type: 'START' });
    else if (action === 'next') dispatch({ type: 'NEXT' });
    else if (action === 'select' && /^[A-E]$/.test(control.dataset.value || '')) dispatch({ type: 'SELECT', value: control.dataset.value });
    else if (action === 'confirm') dispatch({ type: 'CONFIRM', value: control.dataset.value === 'true' });
    else if (action === 'correct') dispatch({ type: 'CORRECT' });
  });
  dialog.addEventListener('close', () => { if (dialog.returnValue === 'restart') dispatch({ type: 'RESTART' }); });
  dialog.addEventListener('keydown', event => {
    if (event.key !== 'Tab') return;
    const buttons = dialog.querySelectorAll('button');
    if (event.shiftKey && document.activeElement === buttons[0]) { event.preventDefault(); buttons[buttons.length - 1].focus(); }
    else if (!event.shiftKey && document.activeElement === buttons[buttons.length - 1]) { event.preventDefault(); buttons[0].focus(); }
  });
  render(false);
})();
