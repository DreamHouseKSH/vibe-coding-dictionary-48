# Verification record

Source input: `붙여넣은 텍스트.txt`, 79,060 bytes, fully materialized and read locally. The original pasted shell and HTML were inspected as reference, not executed. Its proposed video timestamps and purported official shadcn lint plugin were not treated as verified facts.

## Automated checks

- `npm run check`: ESLint with jsx-a11y and local UI rules, five negative fixtures, positive fixture, 48 unique term IDs and 48 demo dispatch cases, pinned production dependencies, TypeScript and production build.
- `npm ci --dry-run --ignore-scripts`: lockfile clean-install compatibility.
- GitHub Actions checks the pushed source and deploys only the resulting checked `dist` artifact.

## Real browser coverage

Desktop Chromium at 1440×1000:

- All 48 demos opened and exercised. Nested modal/drawer, tabs, accordion, sorting, tooltip keyboard/click alternative, toast, carousel, skeleton, reveal, actual scroll offsets, text/number replay and cleanup, SVG, shared layout detail, pinning and pointer Slider alternatives.
- 24 UI demos verified focus restoration. A focus-scope timing bug found by this check was fixed by restoring focus on the next animation frame after close.
- Search, no results and reset, category count, two-term builder, clear, disabled empty copy, denied clipboard handling.
- System reduced-motion checked for parallax, typewriter, scramble, count up, magnetic, cursor, tilt and confetti.

Mobile validation and final layout/clipboard/wheel assertions are recorded by the retained `scripts/browser-*.js` functions. Screenshots stay under ignored `output/playwright/` for QA, not application assets.

## Limits

Video transcripts could not be retrieved from the available public pages/search. The site labels the supplied summary as unverified and links both originals. No fabricated timestamp links. No independent confirmation of channel endorsement. No paid API, external runtime font/CDN dependencies or credentials added. Browser emulation does not establish real-device compatibility in every browser.

Final results: all 48 demos fit within the 390×844 viewport; no horizontal page overflow; four keyboard Slider alternatives and the local motion switch passed. A 25-Tab focus-trap cycle stayed inside the dialog. Clipboard success and denial paths passed. Native wheel input advanced the horizontal track. Shared card width changed from approximately 267px in the list to 582px in detail, with the same layoutId rather than a scale-only effect. Desktop browser batches reported no page errors.
