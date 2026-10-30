import assert from 'node:assert/strict';
import fs from 'node:fs';
import ts from 'typescript';
const load = source => import('data:text/javascript;base64,' + Buffer.from(ts.transpile(source, {module:ts.ModuleKind.ES2022})).toString('base64'));
const registry = fs.readFileSync('src/timeline-specs.ts','utf8').replace(/import[^;]+;/g,'');
const src = fs.readFileSync('src/demo-options.ts','utf8').replace(/import[^;]+;/g,'');
const mock = 'const useSyncExternalStore = (_subscribe, snapshot) => snapshot(); const localStorage = {getItem:()=>null,setItem:()=>{},removeItem:()=>{}};';
const options = await load(mock + registry + src);
assert.equal(Object.keys(options.demoOptions).length,48);
for(let id=1;id<=48;id++) {
 const spec=options.demoOptions[id]; assert.ok(spec.label); assert.ok(spec.min<=spec.initial && spec.initial<=spec.max); assert.ok(spec.step>0);
 options.setDemoOption(id, spec.max+100); assert.equal(options.useDemoOptions(id),spec.max);
 options.setDemoOption(id, spec.min-100); assert.equal(options.useDemoOptions(id),spec.min);
 options.setDemoOption(id,NaN); assert.equal(options.useDemoOptions(id),spec.min);
 assert.ok(options.demoOptionPrompt(id).includes(spec.label));
}
options.resetDemoOptions(); for(let id=1;id<=48;id++) assert.equal(options.useDemoOptions(id),options.demoOptions[id].initial);
const luminance = hex => { const rgb=hex.match(/[a-f0-9]{2}/gi).map(v=>parseInt(v,16)/255).map(v=>v<=.04045?v/12.92:((v+.055)/1.055)**2.4); return rgb[0]*.2126+rgb[1]*.7152+rgb[2]*.0722; };
const css=fs.readFileSync('src/index.css','utf8');
for(const match of css.matchAll(/:root(?:\.dark)?\[data-accent="(\w+)"\] \{([^}]+)\}/g)) {
 const tokens=Object.fromEntries([...match[2].matchAll(/(--[\w-]+): (#[a-f0-9]{6})/g)].map(m=>[m[1],m[2]]));
 for(const [a,b] of [['--primary','--primary-foreground'],['--accent','--accent-foreground']]) { const x=luminance(tokens[a]),y=luminance(tokens[b]); const ratio=(Math.max(x,y)+.05)/(Math.min(x,y)+.05); assert.ok(ratio>=4.5, `${match[0]} contrast ${ratio}`); console.log(`${match[0].split(' {')[0]} ${a}: ${ratio.toFixed(2)}:1`); }
}
console.log('Settings checks passed: 48 option bounds/reset/prompts; 12 light/dark semantic text pairs >=4.5:1.');
