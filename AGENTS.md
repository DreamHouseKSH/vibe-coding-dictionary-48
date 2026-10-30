# Project working rules

After UI changes, run `npm run check` and fix every error. This includes the official `@shadcn/lint` rules and their failure fixtures.

Use variants in `src/components/ui` for component-owned appearance. Follow `docs/design-system.md`; do not expand exceptions or disable official rules to silence a finding.

Keep all 48 examples directly usable in their cards, preserve visibility cleanup and reduced-motion behavior, and use overlays only for the actual Modal/Drawer examples prompt builder, and the user-requested global settings drawer. Re-run the relevant `scripts/browser-timeline*.js` scenario and the retained overlay check after interaction changes.

Timed demos must derive their visual pose and progress/time readout from the same `useDemoTimeline` snapshot. Keep the shared RAF source, visibility pause, reduced-motion static controls and manual-only save feedback. Run `scripts/browser-timeline*.js` after clock changes; no independent decorative progress timers.
