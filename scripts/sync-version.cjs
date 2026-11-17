'use strict';
const fs = require('node:fs');
const path = require('node:path');
const root = path.resolve(__dirname, '..');
const { version } = require(path.join(root, 'package.json'));
if (!/^(0|[1-9]\d*)\.(0|[1-9]\d*)\.(0|[1-9]\d*)$/.test(version)) throw new Error('Érvénytelen szemantikus verzió.');
const source = '/* Generated from package.json. */\n(function(root){\n  var metadata = Object.freeze({version: ' + JSON.stringify(version) + '});\n  if (typeof module === "object" && module.exports) module.exports = metadata;\n  else root.TorottHidVersion = metadata;\n})(typeof globalThis !== "undefined" ? globalThis : this);\n';
const target = path.join(root, 'js/version.js');
if (process.argv.includes('--check')) {
  if (!fs.existsSync(target) || fs.readFileSync(target, 'utf8') !== source) throw new Error('Futtasd: npm run version:sync');
} else fs.writeFileSync(target, source);
