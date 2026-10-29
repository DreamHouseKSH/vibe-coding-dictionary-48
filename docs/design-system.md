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

Only in `src/Demo.tsx`, Button's contract additionally permits these exact educational classes:

- `hover-demo`, `is-hovered`: demonstrate elevation on hover/focus/touch (17).
- `smooth-demo`, `selected-demo`: demonstrate a 200ms state transition (20).
- `morph`, `morphed`: demonstrate the three-line menu becoming an X (38).

The same classes on an App Button fail `no-restyle`. Other appearance overrides still fail in Demo. No official rules are turned off in Demo. All inline motion variables remain checked; confetti uses theme colors, parallax uses `--parallax-y`, and glare position uses `--glare-x/y`. Motion Path uses a responsive SVG; its finite animation is omitted when motion is reduced.

## Supplemental checks and proof

`npm run lint` executes the official plugin plus jsx-a11y and project rules. `npm run lint:ui` exercises seven official negative fixtures covering every official rule, positive fixtures, the Demo/App boundary, effective rule configuration, five supplemental negative fixtures and all 48 term/demo cases. `npm run check` runs these then TypeScript/build. The same command runs before GitHub Pages deployment in CI.

The supplemental `local/*` rules enforce canonical imports, component use instead of native controls and Dialog title/description composition. They supplement official lint rather than substitute for it.

## Limits

Official lint analyzes source usage; it is not proof of pixel identity, accessibility, or runtime behavior. As its documentation explains, plain CSS declarations and parent selectors are outside its rule analysis. Layout and educational scene geometry in `App.css` therefore require review and browser QA. Adding a class allow-list entry, a token, a variant or an ESLint override is a policy change and should be reviewed. There are no `eslint-disable` directives in the app/demo files; fixtures verify that the six official rules stay enabled.
