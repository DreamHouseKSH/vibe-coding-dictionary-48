# Animation timelines

21 eligible time-based examples automatically repeat: 19, 20, 25–42 and 48. Example 24 (save feedback) is manual and has no real submission. Modal/Drawer, clipboard, prompt selection, filtering and other actual actions never auto-execute.

Each automatic cycle has one forward motion duration (shown beside the start/end meter), a 700ms end hold, and a 350ms smooth reset. Floating, marquee and confetti have matching or invisible endpoints and need no reverse reset. The reset phase is explicitly labeled; its meter moves back with the same visual pose. The time label is **scene position**, not an unrelated wall-clock countdown.

`timeline-model.ts` calculates the cycle boundaries. `animation-clock.ts` provides one RAF source for all mounted clocks and cancels it on document hiding. `use-demo-timeline.ts` advances only active visible time and publishes one snapshot at up to 30fps. The pose, progress meter, Slider and time label all consume this snapshot. Time-based scenes do not run separate CSS animations, Motion animations, intervals or SMIL timelines. This guarantees that pausing also freezes the visible motion, and that a meter cannot continue over a paused scene.

Off-screen examples unmount at the actual viewport boundary. Their position and explicit user-pause state are retained in a bounded in-memory map (22 possible IDs) for this page session. Re-entering the viewport resumes from that position only if the user had not paused. Filtering has the same cleanup semantics. Hidden documents suspend and resume without counting the hidden interval or jumping to catch up. No preferences are written to browser storage.

Reduced motion disables automatic ticking. The start/end buttons and keyboard/touch Slider choose static poses immediately. The local setting also covers portaled UI overlays. Motion pauses when the Slider receives focus so a keyboard user can inspect a stable frame.

Scroll demos show actual scroll distance as a percentage. Pointer demos show real horizontal pointer/Slider input; hover shows actual hover/focus/touch state. They do not move the user's page or synthesize pointer gestures, and do not show a fabricated animation timer.

The spring is a normalized damped oscillation and bounce uses authored keyframes; these are educational visualizations, not a physics engine. The shared-element example changes the actual same card's width and internal layout, without scale-only substitution. The quadratic path's point is calculated directly from the same progress as the meter. The scramble is deterministic at a given clock position, so pause and seeking do not randomly change its letters.

Clock model tests run inside `npm run lint:ui`/`npm run check` and CI. Browser scenarios validate real loop boundaries, progress-to-pose equality, user controls, document-visibility event suspension (controlled when the test runner keeps tabs visible), off-screen/filter cleanup, reduced motion, real gesture meters and all 48 inline examples on desktop/mobile. Browser emulation remains distinct from physical iPhone testing.
