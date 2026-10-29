import assert from "node:assert/strict";
import fs from "node:fs";
import ts from "typescript";
const source = ts.transpile(fs.readFileSync("src/timeline-model.ts", "utf8"), {
  module: ts.ModuleKind.ES2022,
});
const { advanceTimeline, timelinePosition } = await import(
  "data:text/javascript;base64," + Buffer.from(source).toString("base64")
);
const auto = {
  name: "fixture",
  duration: 1000,
  hold: 700,
  reset: 350,
  auto: true,
};
assert.deepEqual(timelinePosition(0, auto), { progress: 0, phase: "motion" });
assert.deepEqual(timelinePosition(500, auto), {
  progress: 0.5,
  phase: "motion",
});
assert.deepEqual(timelinePosition(1000, auto), { progress: 1, phase: "hold" });
assert.deepEqual(timelinePosition(1699, auto), { progress: 1, phase: "hold" });
assert.deepEqual(timelinePosition(1875, auto), {
  progress: 0.5,
  phase: "reset",
});
assert.equal(timelinePosition(2050, auto).progress, 0);
const start = { elapsed: 0, cycles: 0, paused: false };
assert.deepEqual(advanceTimeline(start, 2050, auto), {
  elapsed: 0,
  cycles: 1,
  paused: false,
});
assert.deepEqual(advanceTimeline(start, 4200, auto), {
  elapsed: 100,
  cycles: 2,
  paused: false,
});
const paused = { elapsed: 450, cycles: 2, paused: true };
assert.strictEqual(advanceTimeline(paused, 6000, auto), paused);
assert.deepEqual(advanceTimeline(start, 5000, { ...auto, auto: false }), {
  elapsed: 1000,
  cycles: 0,
  paused: true,
});
assert.deepEqual(advanceTimeline(start, 0, auto), start);
assert.equal(timelinePosition(1000, { ...auto, reset: 0 }).phase, "hold");
console.log(
  "Timeline model checks passed: motion/hold/reset boundaries, wrap, multiple wraps, immediate pause, manual completion and zero-delta resume.",
);

const specSource = ts.transpile(
  fs.readFileSync("src/timeline-specs.ts", "utf8"),
  { module: ts.ModuleKind.ES2022 },
);
const { timelineSpecs } = await import(
  "data:text/javascript;base64," + Buffer.from(specSource).toString("base64")
);
assert.equal(Object.keys(timelineSpecs).length, 22);
assert.equal(Object.values(timelineSpecs).filter((s) => s.auto).length, 21);
assert.equal(timelineSpecs[24].auto, false);
for (const s of Object.values(timelineSpecs)) {
  assert(s.duration > 0);
  assert.equal(s.hold, 700);
  assert(s.reset >= 0);
}
console.log(
  "Timeline registry checks passed: 21 automatic examples, 1 manual-only feedback example, valid durations and end holds.",
);
