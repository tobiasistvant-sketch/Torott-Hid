'use strict';
const fs = require('node:fs');
const path = require('node:path');
const crypto = require('node:crypto');
const root = path.resolve(__dirname, '..');
const { version, appStatus: status } = require(path.join(root, 'package.json'));
if (!/^(0|[1-9]\d*)\.(0|[1-9]\d*)\.(0|[1-9]\d*)$/.test(version)) throw new Error('Érvénytelen szemantikus verzió.');
if (typeof status !== 'string' || !status.trim()) throw new Error('Hiányzó alkalmazásstátusz.');
const displayVersion = version.endsWith('.0') ? version.slice(0, -2) : version;
const metadata = { version, displayVersion, status };
const source = '/* Generated from package.json. */\n(function(root){\n  var metadata = Object.freeze(' + JSON.stringify(metadata) + ');\n  if (typeof module === "object" && module.exports) module.exports = metadata;\n  else root.TorottHidVersion = metadata;\n})(typeof globalThis !== "undefined" ? globalThis : this);\n';
const escape = text => text.replace(/[&<>\"]/g, value => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;' }[value]));
const release = 'v' + displayVersion + ' · ' + status;
const assetURL = relative => {
  const contents = relative === 'js/version.js' ? source : fs.readFileSync(path.join(root, relative));
  const hash = crypto.createHash('sha256').update(contents).digest('hex').slice(0, 12);
  return relative + '?v=' + version + '-' + hash;
};
const htmlTarget = path.join(root, 'index.html');
const html = fs.readFileSync(htmlTarget, 'utf8')
  .replace(/<title>[^<]*<\/title>/, '<title>A Törött híd · ' + escape(release) + '</title>')
  .replace(/(<meta name="description" content=")[^"]*(">)/, '$1A Törött híd: interaktív erkölcsi döntéstörténet a haragról, a megbocsátásról és a bizalomról. ' + escape(release) + '.$2')
  .replace(/(<p data-release-credit>)[^<]*(<\/p>)/, '$1MI-támogatott fejlesztés · ' + escape(release) + '$2')
  .replace(/src="(js\/[^"?]+\.js)(?:\?[^\"]*)?"/g, (_, asset) => 'src="' + assetURL(asset) + '"')
  .replace(/href="(css\/[^"?]+\.css)(?:\?[^\"]*)?"/g, (_, asset) => 'href="' + assetURL(asset) + '"');
const outputs = new Map([['js/version.js', source], ['index.html', html]]);
for (const [relative, expected] of outputs) {
  const target = path.join(root, relative);
  if (process.argv.includes('--check')) {
    if (!fs.existsSync(target) || fs.readFileSync(target, 'utf8') !== expected) throw new Error('Futtasd: npm run version:sync (' + relative + ')');
  } else fs.writeFileSync(target, expected);
}
