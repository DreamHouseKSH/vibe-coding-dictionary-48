import assert from "node:assert/strict";
import fs from "node:fs";
import { ESLint } from "eslint";
import ts from "typescript";
const eslint = new ESLint();
const bad = [
  ["<button>Bad</button>", "local/use-ui-primitives"],
  [
    'import { Button } from "../components/ui/button"',
    "local/canonical-ui-imports",
  ],
  ['import { Dialog } from "radix-ui"', "local/canonical-ui-imports"],
  [
    "<DialogContent><DialogTitle>Bad</DialogTitle></DialogContent>",
    "local/dialog-description",
  ],
  ['<img src="x" />', "jsx-a11y/alt-text"],
];
for (const [code, rule] of bad) {
  const [r] = await eslint.lintText(code, {
    filePath: "src/negative-fixture.tsx",
  });
  assert(
    r.messages.some((m) => m.ruleId === rule),
    `negative fixture did not fail: ${rule}`,
  );
}
// These fixtures execute the published official plugin through the real project config.
const officialBad = [
  [
    'import { Button } from "@/components/ui/button"; const A=()=> <Button className="p-4">Save</Button>',
    "shadcn/no-restyle",
  ],
  ['<div className="bg-pink-500">Raw palette</div>', "shadcn/no-raw-colors"],
  ['<div className="p-[13px]">Arbitrary</div>', "shadcn/no-arbitrary-values"],
  ["<div style={{padding:13}}>Inline</div>", "shadcn/no-inline-styles"],
  [
    '<div style={{"--label-color":"#ff0000"}}>Raw custom property</div>',
    "shadcn/no-inline-styles",
  ],
  ['<div className="rounded-huge">Typo</div>', "shadcn/no-unknown-classes"],
  [
    'import { Button } from "@/components/ui/button"; const A=({tone}:{tone:string})=> <Button className={tone}>Dynamic</Button>',
    "shadcn/require-static-classes",
  ],
];
for (const [code, rule] of officialBad) {
  const [result] = await eslint.lintText(code, {
    filePath: "src/official-negative-fixture.tsx",
  });
  const diagnostic = result.messages.find((m) => m.ruleId === rule);
  assert(diagnostic, `official negative fixture did not fail: ${rule}`);
  assert(result.errorCount > 0, `official rule was not an error: ${rule}`);
  console.log(`EXPECTED FAILURE ${rule}: ${diagnostic.message}`);
}
const officialRules = [...new Set(officialBad.map(([, rule]) => rule))];
for (const file of [
  "src/App.tsx",
  "src/Demo.tsx",
  "src/InlineDemo.tsx",
  "src/TimedDemo.tsx",
  "src/GestureProgress.tsx",
]) {
  const config = await eslint.calculateConfigForFile(file);
  for (const rule of officialRules)
    assert.equal(
      config.rules[rule][0],
      2,
      `${file}: ${rule} must stay enabled`,
    );
  assert(
    !/eslint-disable/.test(fs.readFileSync(file, "utf8")),
    `unexpected rule bypass in ${file}`,
  );
}
const uiConfig = await eslint.calculateConfigForFile(
  "src/components/ui/button.tsx",
);
for (const rule of [
  "shadcn/no-raw-colors",
  "shadcn/no-inline-styles",
  "shadcn/no-unknown-classes",
])
  assert.equal(uiConfig.rules[rule][0], 2);
const [officialGood] = await eslint.lintText(
  'import { Button } from "@/components/ui/button"; const A=()=> <Button variant="outline" size="lg" className="mt-4 w-full">OK</Button>',
  { filePath: "src/official-positive-fixture.tsx" },
);
assert.equal(officialGood.errorCount, 0, JSON.stringify(officialGood.messages));
const [demoGood] = await eslint.lintText(
  'import { Button } from "@/components/ui/button"; const A=()=> <Button className="hover-demo">Effect</Button>',
  { filePath: "src/Demo.tsx" },
);
assert.equal(demoGood.errorCount, 0, JSON.stringify(demoGood.messages));
const [demoBad] = await eslint.lintText(
  'import { Button } from "@/components/ui/button"; const A=()=> <Button className="p-4">No bypass</Button>',
  { filePath: "src/Demo.tsx" },
);
assert(
  demoBad.messages.some((m) => m.ruleId === "shadcn/no-restyle"),
  "demo contract must still reject ordinary restyling",
);
const [chromeBad] = await eslint.lintText(
  'import { Button } from "@/components/ui/button"; const A=()=> <Button className="hover-demo">Not chrome</Button>',
  { filePath: "src/App.tsx" },
);
assert(
  chromeBad.messages.some((m) => m.ruleId === "shadcn/no-restyle"),
  "demo effect must not leak into app chrome",
);
const [good] = await eslint.lintText(
  'import { Button } from "@/components/ui/button"; const A = () => <Button>OK</Button>',
  { filePath: "src/positive-fixture.tsx" },
);
assert.equal(good.errorCount, 0);
const cfg = JSON.parse(fs.readFileSync("components.json", "utf8"));
assert.equal(cfg.tailwind.cssVariables, true);
for (const name of [
  "button",
  "dialog",
  "sheet",
  "tabs",
  "accordion",
  "input",
  "textarea",
  "switch",
  "tooltip",
  "slider",
])
  assert(fs.existsSync(`src/components/ui/${name}.tsx`));
const termsText = ts.transpile(fs.readFileSync("src/terms.ts", "utf8"), {
  module: ts.ModuleKind.ES2022,
});
const { terms } = await import(
  "data:text/javascript;base64," + Buffer.from(termsText).toString("base64")
);
assert.equal(terms.length, 56);
assert.equal(new Set(terms.map((t) => t.id)).size, 56);
const demos =
  fs.readFileSync("src/Demo.tsx", "utf8") +
  fs.readFileSync("src/TimedDemo.tsx", "utf8") + fs.readFileSync("src/ExtensionAsync.tsx", "utf8") + fs.readFileSync("src/ExtensionPatterns.tsx", "utf8");
for (const t of terms)
  assert(new RegExp(`case ${t.id}:`).test(demos), `missing demo ${t.id}`);
const pkg = JSON.parse(fs.readFileSync("package.json", "utf8"));
for (const [name, ver] of Object.entries(pkg.dependencies))
  assert(/^\d/.test(ver), `pin ${name}`);
assert(!fs.readFileSync("index.html", "utf8").includes("cdn.tailwindcss.com"));
console.log(
  "UI checks passed: 7 official negative fixtures covering all 6 rules, positive fixtures and demo/chrome boundary; 5 supplemental fixtures; canonical components; 56 demo cases; pinned production dependencies.",
);

await import("./check-timeline.mjs");

await import("./check-settings.mjs");

await import("./check-extensions.mjs");
