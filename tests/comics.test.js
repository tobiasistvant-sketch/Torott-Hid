'use strict';
const test = require('node:test');
const assert = require('node:assert/strict');
const fs = require('node:fs');
const path = require('node:path');
const crypto = require('node:crypto');
const vm = require('node:vm');
const comics = require('../js/comics.js');
const j3Manifest = require('../design/references/manifest.json');
const j4Manifest = require('../docs/manifest_J4_0.0.4.json');
const fullManifest = require('../docs/manifest_J5_J6_HID_0.0.4.json');
const originalAssets = {
  '00_jelenet_a_titok_kozosen.webp': '7279ca8f8928b177e576e6179fb5b7e50aa2c3faa85f268ab9d012dadc77fc4c',
  '01_jelenet_a_folyoson_kozosen.webp': 'ef591c8720efe44a25b1c48a1c764e671fff86d932fb27b1d899e302978ea6ae',
  '01A_nyilvanos_szamonkeres_kovetkezmeny.webp': 'b19973fa5e095fa2f7c746917a7158520495f9ddcf1059b0c2a743360d1d3d08',
  '01B_elvonulas_kovetkezmeny.webp': '9201604eefd57f5ae8ecb4d974972b516ebb1193b2f7e7387c61e28ef6004ad7',
  '01C_osztalytarsak_kikerdezese_kovetkezmeny.webp': '3ecc0aa9f72058ab0de75dd806eecd4e568a8a390258ad72e2fde5a2bb570ccb',
  '01D_pletyka_leallitasa_kovetkezmeny.webp': 'e32e0a4b072c7e7e3a01afaa0ee5a7d131e1d694a20695f9cf523f3882d7d53c',
  '02_jelenet_aron_elso_uzenete_kozosen.webp': '24a48d4b9bfedee94193e584c7965a697297615b4737504cdbb8154364b8bf6c',
  '02A_soha_nem_bocsatom_meg_kovetkezmeny.webp': '9e7174aca709bde96a05d332f6c95207ecf5a71a576a07cfe4804630f11f1919',
  '02B_igeret_szamonkerese_kovetkezmeny.webp': '52140e7b0678eba2ced8e0c537c59847ebf776ff9b499a8dc87f02488068f2a9',
  '02C_idot_ker_kovetkezmeny.webp': '7769ced928a8268b31d4a1604115257a37d695853de27581e29033fb6e0226cc',
  '02D_felejtsuk_el_kovetkezmeny.webp': 'db26b8a5369273c4d07fc75bae41b8d26ed5846219a593f96bfff24577e6ff7d'
};
const comicEntries = Object.values(comics.scenes).concat(Object.values(comics.sceneVariants).flatMap(Object.values), Object.values(comics.consequences).flatMap(Object.values));
const bridgeEntries = Object.values(comics.bridges);
const entries = comicEntries.concat(bridgeEntries);
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

test('A korábbi huszonegy és az új manifest tizennyolc képe a valódi, lapos GitHub-útvonalakon szerepel', () => {
  assert.equal(entries.length, 39);
  assert.equal(comicEntries.length, 33);
  assert.equal(bridgeEntries.length, 6);
  assert.equal(new Set(entries.map(entry => entry.id)).size, 39);
  assert.equal(new Set(entries.map(entry => entry.src)).size, 39);
  assert.deepEqual(Object.keys(comics.scenes), ['0', '1', '2', '3', '4', '5', '6']);
  assert.deepEqual(Object.keys(comics.consequences), ['1', '2', '3', '4', '5', '6']);
  for (const scene of [1, 2, 3, 4, 5]) assert.deepEqual(Object.keys(comics.consequences[scene]), ['A', 'B', 'C', 'D']);
  assert.deepEqual(Object.keys(comics.consequences[6]), ['A', 'B', 'C', 'D', 'E']);
  assert.equal(j3Manifest.images.length, 5);
  assert.equal(j4Manifest.image_files.length, 5);
  for (const item of [...j3Manifest.images, ...j4Manifest.image_files]) assert.equal(item.approved, true);
  const expected = [...Object.keys(originalAssets), ...j3Manifest.images.map(entry => path.basename(entry.webp)),
    ...j4Manifest.image_files.map(entry => path.basename(entry.webp)),
    ...fullManifest.images.map(entry => path.basename(entry.webp))].map(name => 'design/references/' + name).sort();
  assert.deepEqual(entries.map(entry => entry.src).sort(), expected);
  for (const entry of entries) {
    assert.ok(!entry.src.includes('KEPEK/'));
    assert.equal(path.basename(entry.src), path.basename(entry.src.replaceAll('\\', '/')));
    const bytes = fs.readFileSync(path.resolve(__dirname, '..', entry.src));
    assert.equal(crypto.createHash('sha256').update(bytes).digest('hex'), entry.sha256, entry.id + ' feltöltött bináris változatlan');
    if (originalAssets[path.basename(entry.src)]) assert.equal(entry.sha256, originalAssets[path.basename(entry.src)], 'Az eredeti tizenegy kép változatlan marad.');
    assert.deepEqual(webpSize(bytes), [entry.width, entry.height], entry.id + ' változatlan eredeti képarány');
  }
});

test('A közös képek, a külön monológ és a szöveget igénylő néma következményképek elkülönülnek', () => {
  assert.equal(comics.scenes[0].layout, 'replace-scene');
  assert.equal(comics.scenes[1].layout, 'replace-scene');
  assert.equal(comics.scenes[2].layout, 'ad3');
  assert.deepEqual(comics.scenes[1].beforeBlockIds, ['v004-j02-intro']);
  assert.deepEqual(comics.scenes[2].beforeBlockIds, ['v004-j03-intro', 's2-pause', 's2-facts', 's2-boundary']);
  assert.equal(comics.scenes[2].afterSourceLines, undefined);
  assert.deepEqual(comics.scenes[3].beforeBlockIds, ['v004-j06-A', 'v004-j06-B', 'v004-j06-C', 'v004-j06-D', 'v004-j07-intro']);
  assert.deepEqual(comics.scenes[4].beforeBlockIds, ['v004-j10-A', 'v004-j10-B', 'v004-j10-C', 'v004-j10-D']);
  assert.equal(comics.scenes[3].layout, 'replace-scene');
  assert.equal(comics.scenes[4].layout, 'replace-scene');
  for (const choice of ['A', 'B']) assert.equal(comics.consequences[1][choice].layout, 'illustrated-consequence');
  for (const choice of ['C', 'D']) assert.equal(comics.consequences[1][choice].layout, 'replace-consequence');
  for (const scene of [2, 3, 4, 5, 6]) for (const choice of Object.keys(comics.consequences[scene])) assert.equal(comics.consequences[scene][choice].layout, 'replace-consequence');
  assert.equal(comics.scenes[7], undefined);
  assert.equal(comics.consequences[7], undefined);
  assert.deepEqual(comics.scenes[5].beforeBlockIds, ['v1-j13-A', 'v1-j13-B', 'v1-j13-C', 'v1-j13-D']);
  assert.deepEqual(comics.sceneVariants[5].noContact.beforeBlockIds, comics.scenes[5].beforeBlockIds);
  assert.deepEqual(comics.scenes[6].beforeBlockIds, ['v1-j17-narr-A', 'v1-j17-narr-B', 'v1-j17-narr-C', 'v1-j17-narr-D', 'v1-j17-thought-A', 'v1-j17-thought-B', 'v1-j17-thought-C', 'v1-j17-thought-D']);
  assert.equal(comics.scenes[6].textless, true);
});

test('Minden képnek van olvasható magyar alternatívája és külön, szerkeszthető átirata', () => {
  for (const entry of comicEntries) {
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

test('J5 két nyitóképe elkülöníti Áron üzenetét az osztálytárs közvetett hírétől', () => {
  const direct = comics.scenes[5], indirect = comics.sceneVariants[5].noContact;
  assert.equal(direct.src, 'design/references/05_kozos_ABC_aron_uzenete.webp');
  assert.equal(indirect.src, 'design/references/05_kulon_D_kozvetett_hir.webp');
  assert.notEqual(direct.id, indirect.id);
  assert.equal(direct.transcript.filter(block => block.speaker === 'Áron' && block.channel === 'message').length, 1);
  assert.equal(indirect.transcript.some(block => block.speaker === 'Áron'), false);
  assert.equal(indirect.transcript.some(block => block.speaker === 'Nóra' && block.type === 'speech'), false);
  assert.ok(indirect.transcript.some(block => block.speaker === 'Osztálytárs' && block.text === 'Lili már nem beszél rólad. Áron szólt neki.'));
  assert.ok(indirect.transcript.some(block => block.type === 'thought' && block.text === 'Írjak neki én?'));
});

test('J5 A/B/C választásnál Nóra kezdeményez; az Áron-válasz nem kéretlen megkeresés', () => {
  for (const choice of ['A', 'B', 'C']) {
    const blocks = comics.consequences[5][choice].transcript;
    assert.equal(blocks[0].speaker, 'Nóra');
    assert.equal(blocks[0].channel, 'message');
    assert.equal(blocks[0].initiatesContact, true);
    for (const block of blocks.filter(block => block.speaker === 'Áron' && block.channel === 'message')) {
      assert.equal(block.replyToNora, true);
      assert.equal(block.initiatedBy, 'Nóra');
    }
  }
});

test('J5/J6 szövegei a friss dokumentumból és a feltöltött képekből származnak; J5D közzététel, J6E osztálytermi vita', () => {
  const approved = fs.readFileSync(path.resolve(__dirname, '../docs/02_szovegfrissitesek_0.0.4_TELJES.md'), 'utf8');
  for (const scene of [5, 6]) for (const entry of Object.values(comics.consequences[scene])) {
    for (const block of entry.transcript.filter(block => block.type === 'speech' && block.speaker !== 'Osztálytárs')) {
      assert.ok(approved.includes(block.text), entry.id + ': a párbeszéd pontos átirata');
    }
  }
  const publication = comics.consequences[5].D;
  assert.equal(publication.event, 'publication');
  assert.ok(publication.transcript.some(block => block.speaker === 'Nóra' && block.channel === 'class-group' && block.text === 'Tudjátok, Áron valójában egy ideje pszichológushoz jár. Én tudom, mert bízott bennem, de már nem érdekel.'));
  assert.deepEqual(publication.transcript.filter(block => block.speaker === 'Osztálytárs').map(block => block.text), ['Ez komoly?!', 'Nem is gondoltam!', 'Azta...', 'Hogy lehetett ilyen bizalmas?']);
  const confrontation = comics.consequences[6].E;
  assert.equal(confrontation.event, 'public-confrontation');
  assert.equal(confrontation.transcript.some(block => block.channel === 'class-group'), false);
  assert.equal(confrontation.transcript.some(block => block.text.includes('pszichológushoz')), false);
  assert.equal(confrontation.transcript.filter(block => block.type === 'speech').length, 3);
});

test('A hat hídkép külön cserélhető térképen marad, egyedi jóváhagyást nem állítunk róluk', () => {
  assert.deepEqual(Object.keys(comics.bridges), ['H0', 'R1', 'R2', 'R3', 'R4', 'R5']);
  const expected = fullManifest.images.filter(item => item.category === 'hidak');
  assert.equal(expected.length, 6);
  assert.deepEqual(bridgeEntries.map(entry => entry.src).sort(), expected.map(item => 'design/references/' + path.basename(item.webp)).sort());
  for (const bridge of bridgeEntries) {
    assert.equal(bridge.approval, 'awaiting_individual_approval');
    assert.equal(bridge.layout, 'bridge');
    assert.equal(bridge.kind, 'bridge');
    assert.equal(bridge.width, 1536);
    assert.equal(bridge.height, 1024);
    assert.ok(bridge.alt.length > 45);
    assert.deepEqual(bridge.transcript, []);
    assert.equal(comicEntries.some(entry => entry.src === bridge.src), false);
  }
});

test('Az elfogadott képfeliratok sajátosságai változtatás nélkül kerülnek az átiratba', () => {
  for (const choice of ['A', 'B', 'C']) assert.equal(comics.consequences[2][choice].transcript[0].text, 'Nóra keményen megfogalmazza fájdalmát.');
  assert.equal(comics.consequences[2].D.transcript.find(block => block.speaker === 'Áron').text, 'Rendben. Nem sürgetlek.');
  assert.equal(comics.scenes[0].transcript.at(-1).text, 'Végre valakinek elmondhattam. Áronban mindig bízom.');
  assert.ok(comics.consequences[1].D.transcript.some(block => block.text.includes('Ez nem pletyka téma.')));
  assert.equal(comics.consequences[2].A.title, 'A válasz következménye');
});

test('A J3/J4 jóváhagyott beszédei pontosak, a végleges J4–D kép válasz nélküli és a J3–C nem tartalmaz önvádat', () => {
  const approved = fs.readFileSync(path.resolve(__dirname, '../docs/02_szovegfrissitesek_0.0.4_TELJES.md'), 'utf8');
  for (const scene of [3, 4]) for (const choice of ['A', 'B', 'C', 'D']) {
    for (const block of comics.consequences[scene][choice].transcript.filter(block => block.type === 'speech')) {
      assert.ok(approved.includes(block.text), scene + choice + ': a jóváhagyott párbeszéd pontos átirata');
    }
  }
  for (const block of comics.scenes[4].transcript) assert.ok(approved.includes(block.text));
  assert.equal(comics.consequences[3].C.transcript.some(block => block.type === 'thought'), false);
  assert.ok(comics.consequences[4].C.transcript.some(block => block.text.includes('bosszút')));
  const boundary = comics.consequences[4].D;
  assert.equal(boundary.src, 'design/references/04D_ne_irj_tobbet_JOVAHAGYOTT.webp');
  assert.equal(boundary.sha256, 'b160f90643347b6aaa95879d41f01c43bd086bb7dcea8bd83b56e13b569b0e0d');
  assert.equal(boundary.transcript.some(block => block.speaker === 'Áron'), false);
  assert.deepEqual(boundary.transcript.map(block => block.text), ['Nem érdekel. Ne írj többet.', 'Áron nem küld több személyes üzenetet Nórának.']);
});

test('A képregényadat közvetlen böngészős betöltéshez és Node-teszthez is használható', () => {
  const browser = {};
  vm.runInNewContext(fs.readFileSync(path.resolve(__dirname, '../js/comics.js'), 'utf8'), browser);
  assert.equal(browser.TorottHidComics.scenes[2].id, comics.scenes[2].id);
  assert.equal(Object.keys(browser.TorottHidComics.consequences[2]).length, 4);
});
