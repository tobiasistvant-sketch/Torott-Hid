'use strict';
const test = require('node:test');
const assert = require('node:assert/strict');
const fs = require('node:fs');
const S = require('../js/story.js'), E = require('../js/engine.js'), A = require('../js/adaptations.js');
const routes = require('./routes.json');
function atScene(number, choices, publication, corrected) {
  let s = E.transition(E.createState(), { type: 'START' }, S);
  s = E.transition(s, { type: 'NEXT' }, S);
  for (let n = 1; n < number; n++) {
    if (n === 6 && corrected) s = E.transition(s, { type: 'CORRECT' }, S);
    s = E.transition(s, { type: 'SELECT', value: choices[n] }, S);
    if (s.view === 'confirmation') s = E.transition(s, { type: 'CONFIRM', value: publication[n] }, S);
    s = E.transition(s, { type: 'NEXT' }, S);
  }
  return s;
}
test('A kiegészítések és a pontos feltételes forrásidézetek ellenőrizhetően különülnek el', () => {
  for (const [id, block] of Object.entries(A.catalog)) {
    assert.equal(block.origin, 'addition'); assert.equal(block.id, id);
    assert.ok(block.text.length > 20);
  }
  for (const block of Object.values(A.sourceExcerpts)) {
    assert.equal(block.origin, 'source');
    const lines = fs.readFileSync(block.source.file, 'utf8').split(/\r?\n/);
    assert.ok(lines[block.source.line - 1].includes(block.text), block.text);
  }
});
test('A korábbi reakciók ténylegesen módosítják a későbbi elbeszélést', () => {
  const publicState = atScene(2, {1:'A'}, {}), quietState = atScene(2, {1:'B'}, {});
  const publicBlocks = A.blocksForScene(publicState, S, E), quietBlocks = A.blocksForScene(quietState, S, E);
  assert.notDeepEqual(publicBlocks, quietBlocks);
  assert.ok(publicBlocks.some(b => b.text === A.sourceExcerpts.publicRequest.text));
  assert.ok(!quietBlocks.some(b => b.text === A.sourceExcerpts.publicRequest.text));
  const unresolved = atScene(3, {1:'C',2:'D'}, {});
  assert.ok(A.blocksForScene(unresolved, S, E).some(b => b.id === 's3-premature-peace'));
});
test('A kapcsolatfelvételi tilalom mind a négy jóvátételi útvonalon megmarad', () => {
  for (const repair of ['A','B','C','D']) {
    const decisions = {1:'C',2:'B',3:'A',4:'D',5:repair};
    let s = atScene(5, decisions, {});
    const before = A.blocksForScene(s,S,E);
    assert.ok(before.some(b => b.id === 's5-indirect'));
    assert.ok(!before.some(b => b.speaker === 'Áron' && b.channel === 'message'));
    s = E.transition(s,{type:'SELECT',value:repair},S);
    if (s.view === 'confirmation') s = E.transition(s,{type:'CONFIRM',value:false},S);
    assert.ok(!A.feedbackBlocks(s,S,E).some(b => b.speaker === 'Áron' && b.channel === 'message'));
    s = E.transition(s,{type:'NEXT'},S);
    assert.equal(E.facts(s).noContact,true);
    assert.ok(!A.blocksForScene(s,S,E).some(b => b.speaker === 'Áron' && b.channel === 'message'));
  }
});
test('Engedélyezett kapcsolatnál az eredeti Áron-üzenet és a beszélgetési változat megjelenik', () => {
  const s = atScene(5,{1:'C',2:'B',3:'A',4:'A'},{});
  assert.ok(A.blocksForScene(s,S,E).some(b=>b.speaker==='Áron' && b.channel==='message'));
  const talk=E.transition(atScene(3,{1:'C',2:'B'},{}),{type:'SELECT',value:'A'},S);
  assert.ok(A.feedbackBlocks(talk,S,E).some(b=>b.text===A.sourceExcerpts.permissionQuestion.text));
});
test('Minden lezárás a tényleges útvonalat foglalja össze, R5 megőrzi Áron bocsánatkérését', () => {
  for (const [id, route] of Object.entries(routes)) {
    const s=atScene(7,route.choices,route.publications,route.corrected);
    assert.equal(E.ending(s),id);
    const text=A.summary(s,E).join(' ');
    assert.ok(text.includes('elismerte') && text.includes('bocsánatot kért'),id);
    assert.ok(!text.includes('nem vállalt felelősséget'));
    if (id==='R5') assert.ok(text.includes('megerősített nyilvános'));
    for (const marker of ['Fejlesztői jelzés','Forráskapcsolat','evidence_of_repair','tension+=','játék megmutathat']) assert.ok(!text.includes(marker));
  }
});
test('A tervezet visszavonása és a tényleges közlés korrekciója eltérő visszajelzést ad', () => {
  const choices={1:'C',2:'B',3:'D',4:'A',5:'D',6:'C'};
  let s=atScene(5,choices,{});
  s=E.transition(s,{type:'SELECT',value:'D'},S);s=E.transition(s,{type:'CONFIRM',value:false},S);
  assert.equal(A.feedbackBlocks(s,S,E)[0].id,'s5-withheld');
  const pending=atScene(6,choices,{5:true});
  assert.ok(A.blocksForScene(pending,S,E).some(b=>b.id==='s6-publication-remains'));
  const corrected=E.transition(pending,{type:'CORRECT'},S);
  assert.ok(A.blocksForScene(corrected,S,E).some(b=>b.id==='s6-corrected-post'));
  assert.ok(!A.blocksForScene(corrected,S,E).some(b=>b.id==='s6-publication-remains'));
});
test('Egy visszavont fenyegetés után tett új közlés nem válik utólag visszavont bejegyzéssé', () => {
  const choices={1:'A',2:'B',3:'D',4:'A',5:'A',6:'E'};
  const s=atScene(7,choices,{6:true},true);
  assert.equal(s.corrected,true);assert.equal(E.ending(s),'R5');
  assert.equal(s.publications[5],undefined);
  assert.ok(!A.summary(s,E).includes(A.summaryTexts.correction));
});
