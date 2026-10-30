# Design-system enforcement

## Official integration

`@shadcn/lint` **0.2.3** is the official plugin published from [shadcn-ui/lint](https://github.com/shadcn-ui/lint). The earlier statement that an official tool could not be verified was incorrect and has been corrected. The attachment's specific names `eslint-plugin-shadcn`, `shadcn/component-import` and `shadcn/valid-component-composition` are not the supported package/rules; this project uses the actual official API.

References read: [SETUP.md](https://github.com/shadcn-ui/lint/blob/main/SETUP.md), [rules](https://github.com/shadcn-ui/lint/blob/main/docs/rules.md), [how it works](https://github.com/shadcn-ui/lint/blob/main/docs/how-it-works.md). SETUP defaults to registration without rule policies. This task explicitly requests enforceable design-system checks, so the following project policies are enabled deliberately.

Compatibility: the package requires Node >=20.19, ESLint >=9.30 and parser >=8.40. This project uses CI Node 24, ESLint 9.39.5, parser 8.72.1 and Tailwind 4.3.3. `components.json` discovers `@/components/ui` and the theme in `src/index.css`. That stylesheet imports `App.css`, allowing Tailwind/class discovery to see the actual custom playground selectors.

All six rules are errors for application and demo use sites:

| Rule | Policy |
| --- | --- |
| `shadcn/no-restyle` | Component appearance belongs in variants; only layout classes pass by default. |
| `shadcn/no-raw-colors` | Use the default theme's semantic tokens. |
| `shadcn/no-arbitrary-values` | Use Tailwind/theme scale values in use-site classes. |
| `shadcn/no-inline-styles` | Dynamic demo measurements travel through CSS custom properties. No ordinary property exemptions. |
| `shadcn/no-unknown-classes` | Validate classes against the installed Tailwind and theme; no grammar fallback warnings accepted. |
| `shadcn/require-static-classes` | Component classes must be statically readable. |

## Owned components and narrow demo contracts

Inside `src/components/ui`, `no-restyle`, `no-arbitrary-values` and `require-static-classes` are scoped off, following the official guidance: owned components define their variants, geometry and forwarded class props. Raw-color, inline-style and unknown-class checks **remain enabled** there. This is not an exclusion of the component directory from lint.

Named variants own catalog Card treatment, caption CardDescription, builder SheetContent/Textarea, circle Skeleton and leading-icon Input. Button owns responsive touch target sizes. App-level selectors that previously restyled those controls were removed. The default Nova neutral theme tokens are unchanged.

Only in `src/Demo.tsx`, Button's contract additionally permits these exact hover-example classes:

- `hover-demo`, `is-hovered`: demonstrate elevation on hover/focus/touch (17).

The same classes on an App Button fail `no-restyle`. Other appearance overrides still fail in Demo. No official rules are turned off in Demo. All inline motion variables remain checked; confetti uses theme colors, parallax uses `--parallax-y`, and glare position uses `--glare-x/y`. Timed animations now use one shared visible-time clock. SVG attributes and CSS custom properties are calculated from that same snapshot as the progress meter, without independent CSS/SMIL animations. Reduced motion uses manual static poses.

## Supplemental checks and proof

`npm run lint` executes the official plugin plus jsx-a11y and project rules. `npm run lint:ui` exercises seven official negative fixtures covering every official rule, positive fixtures, the Demo/App boundary, effective rule configuration, five supplemental negative fixtures and all 48 term/demo cases. `npm run check` runs these then TypeScript/build. The same command runs before GitHub Pages deployment in CI.

The supplemental `local/*` rules enforce canonical imports, component use instead of native controls and Dialog title/description composition. They supplement official lint rather than substitute for it.

## Limits

Official lint analyzes source usage; it is not proof of pixel identity, accessibility, or runtime behavior. As its documentation explains, plain CSS declarations and parent selectors are outside its rule analysis. Layout and educational scene geometry in `App.css` therefore require review and browser QA. Adding a class allow-list entry, a token, a variant or an ESLint override is a policy change and should be reviewed. There are no `eslint-disable` directives in the app/demo files; fixtures verify that the six official rules stay enabled.

## Automatic timeline policy

`TimedDemo.tsx` has no additional lint exceptions: all six official rules remain errors. Its dynamic values are readable CSS custom-property literals or native SVG geometry attributes. The only remaining Button effect exception used by gesture demos is the existing hover example. Timing and duration values are animation parameters rather than class-name appearance overrides.

## User settings and live demo options

The right-hand Settings Sheet is an explicit user-requested global overlay. Radix owns focus trapping, Escape and focus return; existing Dialog/Drawer demos stay inline-launchable. Theme/accent tokens live in `index.css`, including the portaled sheets/toasts; no lint exceptions were added. Light/dark/system and violet/blue/green presets use semantic tokens. `check-settings.mjs` verifies all 12 accent text pairs at >=4.5:1 (minimum 5.48:1).

Global preferences are validated and persisted locally. OS reduced motion always wins; the explicit reduction switch adds a manual-static override. Automatic looping and 0.25–2× clock speed share the original visible-only RAF clock. Turning looping off finishes the current motion once and pauses. Manual save feedback is never auto-started. Every demo has a bounded live option with units/reset, stored locally and included in copied prompts. Scene-specific CSS custom properties express geometry, not component restyling. Storage failures retain session functionality.
