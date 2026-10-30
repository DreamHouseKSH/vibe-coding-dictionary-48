import assert from 'node:assert/strict';
import fs from 'node:fs';
import ts from 'typescript';
const load = path => import('data:text/javascript;base64,' + Buffer.from(ts.transpile(fs.readFileSync(path,'utf8'),{module:ts.ModuleKind.ES2022})).toString('base64'));
const {terms}=await load('src/terms.ts'); const {extensions}=await load('src/extensions.ts');
assert.equal(terms.filter(t=>t.ep<3).length,48);assert.equal(terms.filter(t=>t.ep===3).length,8);
for(const t of terms.filter(t=>t.ep===3)) {const m=extensions[t.id];assert.equal(t.cat,'extension');assert.ok(t.prompt.length>40);for(const k of ['when','caution','related','priority','sourceName'])assert.ok(m[k].length>3);assert.match(m.source,/^https:\/\/(www\.w3\.org|react\.dev|developer\.mozilla\.org|design-system\.service\.gov\.uk)\//);}
assert.equal(Object.keys(extensions).length,8);
const css=fs.readFileSync('src/extension-patterns.css','utf8');assert.ok(css.includes('container-type: inline-size'));assert.ok(css.includes('@container'));
console.log('Extension checks passed: original48 + distinct8, complete teaching metadata, official sources, real container queries.');
