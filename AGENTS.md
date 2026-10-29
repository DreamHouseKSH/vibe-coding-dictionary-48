# Project working rules

After UI changes, run `npm run check` and fix every error. This includes the official `@shadcn/lint` rules and their failure fixtures.

Use variants in `src/components/ui` for component-owned appearance. Follow `docs/design-system.md`; do not expand exceptions or disable official rules to silence a finding.

Keep all 48 examples directly usable in their cards, preserve visibility cleanup and reduced-motion behavior, and use overlays only for the actual Modal/Drawer examples and prompt builder. Re-run the relevant `scripts/browser-inline*.js` scenario after interaction changes.
