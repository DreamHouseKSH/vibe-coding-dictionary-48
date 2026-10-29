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
assert.equal(terms.length, 48);
assert.equal(new Set(terms.map((t) => t.id)).size, 48);
const demos = fs.readFileSync("src/Demo.tsx", "utf8");
for (const t of terms)
  assert(new RegExp(`case ${t.id}:`).test(demos), `missing demo ${t.id}`);
const pkg = JSON.parse(fs.readFileSync("package.json", "utf8"));
for (const [name, ver] of Object.entries(pkg.dependencies))
  assert(/^\d/.test(ver), `pin ${name}`);
assert(!fs.readFileSync("index.html", "utf8").includes("cdn.tailwindcss.com"));
console.log(
  "UI checks passed: 5 negative fixtures, positive fixture, canonical components, 48 demo cases, pinned production dependencies.",
);
