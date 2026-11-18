'use strict';
const test = require('node:test');
const assert = require('node:assert/strict');
const fs = require('node:fs');
const path = require('node:path');
const crypto = require('node:crypto');
const vm = require('node:vm');
const comics = require('../js/comics.js');
const manifest = require('../design/references/manifest.json');
const entries = Object.values(comics.scenes).concat(Object.values(comics.consequences).flatMap(Object.values));
function webpSize(bytes) {
  assert.equal(bytes.toString('ascii', 0, 4), 'RIFF');
  assert.equal(bytes.toString('ascii', 8, 12), 'WEBP');
  assert.equal(bytes.readUInt32LE(4) + 8, bytes.length);
  for (let offset = 12; offset + 8 <= bytes.length;) {
    const kind = bytes.toString('ascii', offset, offset + 4);
    const length = bytes.readUInt32LE(offset + 4), data = offset + 8;
    assert.ok(data + length <= bytes.length, 'A WebP-adatblokk teljes.');
    if (kind === 'VP8 ') {
      assert.equal(bytes.subarray(data + 3, data + 6).toString('hex'), '9d012a');
      return [bytes.readUInt16LE(data + 6) & 0x3fff, bytes.readUInt16LE(data + 8) & 0x3fff];
    }
    if (kind === 'VP8L') {
      assert.equal(bytes[data], 0x2f);
      const packed = bytes.readUInt32LE(data + 1);
      return [(packed & 0x3fff) + 1, ((packed >>> 14) & 0x3fff) + 1];
    }
    if (kind === 'VP8X') return [bytes.readUIntLE(data + 4, 3) + 1, bytes.readUIntLE(data + 7, 3) + 1];
    offset = data + length + (length % 2);
  }
  assert.fail('Hiányzik a WebP méretadata.');
}

test('Pontosan a tizenegy jóváhagyott kép szerepel a valódi, lapos GitHub-útvonalakon', () => {
  assert.equal(entries.length, 11);
  assert.equal(new Set(entries.map(entry => entry.id)).size, 11);
  assert.equal(new Set(entries.map(entry => entry.src)).size, 11);
  assert.deepEqual(Object.keys(comics.scenes), ['0', '1', '2']);
  assert.deepEqual(Object.keys(comics.consequences), ['1', '2']);
  for (const scene of [1, 2]) assert.deepEqual(Object.keys(comics.consequences[scene]), ['A', 'B', 'C', 'D']);
  const expected = manifest.entries.map(entry => 'design/references/' + path.basename(entry.webp)).sort();
  assert.deepEqual(entries.map(entry => entry.src).sort(), expected);
  for (const entry of entries) {
    assert.ok(!entry.src.includes('KEPEK/'));
    assert.equal(path.basename(entry.src), path.basename(entry.src.replaceAll('\\', '/')));
    const bytes = fs.readFileSync(path.resolve(__dirname, '..', entry.src));
    assert.equal(crypto.createHash('sha256').update(bytes).digest('hex'), entry.sha256, entry.id + ' jóváhagyott bináris');
    assert.deepEqual(webpSize(bytes), [entry.width, entry.height], entry.id + ' változatlan eredeti képarány');
  }
});

test('A közös képek, a külön monológ és a szöveget igénylő néma következményképek elkülönülnek', () => {
  assert.equal(comics.scenes[0].layout, 'replace-scene');
  assert.equal(comics.scenes[1].layout, 'replace-scene');
  assert.equal(comics.scenes[2].layout, 'ad3');
  assert.deepEqual(comics.scenes[2].beforeBlockIds, ['s2-public', 's2-pause', 's2-facts', 's2-boundary']);
  assert.deepEqual(comics.scenes[2].afterSourceLines, [136]);
  for (const choice of ['A', 'B']) assert.equal(comics.consequences[1][choice].layout, 'illustrated-consequence');
  for (const choice of ['C', 'D']) assert.equal(comics.consequences[1][choice].layout, 'replace-consequence');
  for (const choice of ['A', 'B', 'C', 'D']) assert.equal(comics.consequences[2][choice].layout, 'replace-consequence');
  for (const scene of [3, 4, 5, 6, 7]) {
    assert.equal(comics.scenes[scene], undefined);
    assert.equal(comics.consequences[scene], undefined);
  }
});

test('Minden képnek van olvasható magyar alternatívája és külön, szerkeszthető átirata', () => {
  for (const entry of entries) {
    assert.ok(entry.title.length > 3);
    assert.ok(entry.alt.length > 45);
    assert.equal(entry.transcriptSource, 'approved-image');
    assert.ok(entry.transcript.length);
    for (const block of entry.transcript) {
      assert.ok(['narration', 'speech', 'thought'].includes(block.type));
      assert.ok(block.text.length > 4);
      if (block.type !== 'narration') assert.ok(block.speaker);
    }
  }
});

test('Az elfogadott képfeliratok sajátosságai változtatás nélkül kerülnek az átiratba', () => {
  for (const choice of ['A', 'B', 'C']) assert.equal(comics.consequences[2][choice].transcript[0].text, 'Nóra keményen megfogalmazza fájdalmát.');
  assert.equal(comics.consequences[2].D.transcript.find(block => block.speaker === 'Áron').text, 'Rendben. Nem sürgetlek.');
  assert.equal(comics.scenes[0].transcript.at(-1).text, 'Végre valakinek elmondhattam. Áronban mindig bízom.');
  assert.ok(comics.consequences[1].D.transcript.some(block => block.text.includes('Ez nem pletyka téma.')));
});

test('A képregényadat közvetlen böngészős betöltéshez és Node-teszthez is használható', () => {
  const browser = {};
  vm.runInNewContext(fs.readFileSync(path.resolve(__dirname, '../js/comics.js'), 'utf8'), browser);
  assert.equal(browser.TorottHidComics.scenes[2].id, comics.scenes[2].id);
  assert.equal(Object.keys(browser.TorottHidComics.consequences[2]).length, 4);
});
