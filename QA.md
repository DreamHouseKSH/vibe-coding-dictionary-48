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
