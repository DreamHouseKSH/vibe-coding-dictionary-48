# Verification record — inline demos and official lint

## Input and source integrity

The original `붙여넣은 텍스트.txt` (79,060 bytes) was fully materialized and read. Pasted shell/HTML were reference material, not executed. Both video titles were verified; transcripts and detailed timestamps remain unavailable. The site labels its supplied summary accordingly and avoids timestamp claims or endorsement.

## Official lint correction

Official `@shadcn/lint@0.2.3` is installed and pinned. Its SETUP, rules and how-it-works documentation were read. Earlier research missed the official repository; README now corrects that explicitly. See [design-system policy](docs/design-system.md).

The first official lint run found 24 violations. Corrections moved app component appearance into variants, replaced ordinary inline properties with dynamic CSS variables, removed an unused unknown class, added the missing tilt perspective selector and gave educational Button effects exact file-scoped contracts. Generated component internals remain covered by token/inline/class-existence rules.

`npm run lint:ui` executes seven official negative fixtures: Button padding restyle, raw palette color, arbitrary padding, ordinary inline padding, raw color in a custom property, unknown utility and unreadable dynamic Button classes. Each must produce an error with the exact official rule ID. Positive fixtures and the Demo/App contract boundary also run. Existing five project/accessibility fixtures are supplemental. All 48 data IDs and demo dispatch cases are checked.

## Revised UI

All 48 examples are directly rendered inside their cards. IntersectionObserver mounts near-visible demos and unmounts off-screen ones, cancelling timers/observers/library animations. There is no catalog-wide demo modal. Only the actual Modal/Drawer examples and prompt builder use overlays. Looping effects require explicit start/stop. Card copy/selection controls are independent of demo controls.

Browser scenarios under `scripts/browser-inline*.js` validate desktop/mobile examples, overlay keyboard focus and Escape, direct replay, filtering during animation, off-screen cleanup, builder, clipboard success/denial, responsive layout, reduced motion and pointer alternatives. Production preview is used to avoid HMR affecting lifecycle checks.

## Delivery verification

GitHub Actions runs a clean `npm ci` and `npm run check` before deploying the checked artifact. Final handoff records the exact successful workflow, source SHA and Pages deployment; public HTML is compared with the checked local build. No unrelated repository or TTS changes.

## Limits

Official lint cannot analyze arbitrary plain CSS declarations/parent selectors, and is not a runtime or accessibility proof. Browser QA covers those changed flows. Mobile viewport/touch emulation is not physical-device verification. Source-video transcript details remain unverified.

## Recorded results for this correction

- All 48 inline desktop examples passed; no page errors. At most 9 demos mounted concurrently.
- All 48 examples passed in a 390×844 touch-emulated mobile context; no page overflow. At most 3 demos mounted concurrently.
- Actual Modal and Drawer each passed 15 Tab cycles, Escape and trigger focus restoration.
- Filtering a running count-up unmounted its demo; off-screen floating loop cleanup passed.
- Copy success/denial, automatic expansion of the affected manual-copy field, independent copy/select actions, replay/cancel and builder clear/empty states passed.
- 11 system reduced-motion examples passed, including finite SVG Motion Path and confetti.
- Official lint, 7 official failure fixtures, positive and Demo/App boundary fixtures, 5 supplemental fixtures, TypeScript/build and lockfile clean-install dry run passed.
- The local motion toggle also passed computed-style checks on both portaled overlays: animation and transition duration were 0s even without the OS preference.

## Automatic loop and progress enhancement

21 time-based examples now repeat automatically while visible; example 24 remains a manual-only save-feedback illustration. Each visual pose, progress value, scene-time label and seek position consumes the same clock snapshot. No independent cosmetic timer, CSS animation or SMIL timeline runs in those 22 examples. The shared RAF source publishes at up to 30fps, suspends off-screen/hidden, and preserves explicit user pause and position through filtering/remount in a bounded page-session map.

New verification results:

- Clock model: forward/hold/reset boundaries, wrapping, multiple wraps, immediate pause, manual completion and zero-delta resume passed. Registry checks confirm 21 automatic examples and one manual example.
- Browser: visible wrap after a 700ms end hold, smooth reset, pause/resume/replay, retained pause after filtering, off-screen suspension and no hidden-interval catch-up passed.
- Actual pose equality: at progress 0.17308, the quadratic-path dot was x=65 and y≈51.33876 and the meter was 17.30769%; all derive from the same position (within rounding tolerance).
- The browser runner keeps background tabs marked visible. Hidden-document behavior was therefore tested with a controlled `document.hidden`/`visibilitychange` event, explicitly reported as simulated rather than a native tab-switch result.
- All 48 examples passed desktop and 390×844 touch-mobile smoke with no page errors or horizontal page overflow; maximum mounted examples were 9 desktop and 2 mobile.
- All 22 timed examples passed OS reduced-motion static start/end controls, plus local reduced-motion suspension. Sliders are keyboard/touch operable with labels on the actual thumbs.
- Scroll and pointer meters match real input positions; they do not auto-scroll or synthesize pointer input. Actual Modal/Drawer open only on explicit action. Save feedback never auto-runs.
- Copy/select/builder success and failure paths leave a user-paused timeline unchanged.

See [timeline design and limits](docs/animation-timelines.md) and `scripts/browser-timeline*.js` for the retained scenarios. The prior modal-only/initial-inline test scripts were replaced by the current timeline scenarios; the portaled-overlay reduced-motion regression remains.
