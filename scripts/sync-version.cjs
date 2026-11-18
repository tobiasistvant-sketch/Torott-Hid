'use strict';
const fs = require('node:fs');
const path = require('node:path');
const root = path.resolve(__dirname, '..');
const { version } = require(path.join(root, 'package.json'));
if (!/^(0|[1-9]\d*)\.(0|[1-9]\d*)\.(0|[1-9]\d*)$/.test(version)) throw new Error('Érvénytelen szemantikus verzió.');
const source = '/* Generated from package.json. */\n(function(root){\n  var metadata = Object.freeze({version: ' + JSON.stringify(version) + '});\n  if (typeof module === "object" && module.exports) module.exports = metadata;\n  else root.TorottHidVersion = metadata;\n})(typeof globalThis !== "undefined" ? globalThis : this);\n';
const htmlTarget = path.join(root, 'index.html');
const html = fs.readFileSync(htmlTarget, 'utf8')
  .replace(/(<title>A Törött híd · )[^<]+( demó<\/title>)/, '$1' + version + '$2')
  .replace(/Nóra történetének \d+\.\d+\.\d+(?:-es, szöveges)? demója/, 'Nóra történetének ' + version + ' demója')
  .replace(/src="(js\/[^"?]+\.js)(?:\?[^\"]*)?"/g, 'src="$1?v=' + version + '"')
  .replace(/href="(css\/[^"?]+\.css)(?:\?[^\"]*)?"/g, 'href="$1?v=' + version + '"');
const outputs = new Map([['js/version.js', source], ['index.html', html]]);
for (const [relative, expected] of outputs) {
  const target = path.join(root, relative);
  if (process.argv.includes('--check')) {
    if (!fs.existsSync(target) || fs.readFileSync(target, 'utf8') !== expected) throw new Error('Futtasd: npm run version:sync (' + relative + ')');
  } else fs.writeFileSync(target, expected);
}
