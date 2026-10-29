import { plugin as shadcn } from "@shadcn/lint";
import tsParser from "@typescript-eslint/parser";
import a11y from "eslint-plugin-jsx-a11y";
import local from "./scripts/ui-rules.mjs";
export default [
  { ignores: ["dist/**", "node_modules/**", "output/**"] },
  {
    files: ["src/**/*.tsx", "src/**/*.ts"],
    languageOptions: {
      parser: tsParser,
      parserOptions: { ecmaFeatures: { jsx: true }, sourceType: "module" },
    },
    plugins: { shadcn },
    settings: {
      shadcn: {
        note: "See docs/design-system.md for policy and educational demo contracts.",
      },
    },
    rules: {
      "shadcn/no-restyle": ["error", { allow: ["layout"] }],
      "shadcn/no-raw-colors": "error",
      "shadcn/no-arbitrary-values": "error",
      "shadcn/no-inline-styles": "error",
      "shadcn/no-unknown-classes": "error",
      "shadcn/require-static-classes": "error",
    },
    linterOptions: { reportUnusedDisableDirectives: "error" },
  },
  {
    // Owned component internals define their own sizes and appearance (official guidance).
    // Token, inline-style and class-existence checks stay enabled here.
    files: ["src/components/ui/**"],
    rules: {
      "shadcn/no-restyle": "off",
      "shadcn/no-arbitrary-values": "off",
      "shadcn/require-static-classes": "off",
    },
  },
  {
    files: ["src/**/*.tsx", "src/**/*.ts"],
    ignores: ["src/components/ui/**"],
    plugins: { "jsx-a11y": a11y, local: { rules: local } },
    rules: {
      ...a11y.configs.recommended.rules,
      "jsx-a11y/no-noninteractive-tabindex": [
        "error",
        { roles: ["tabpanel", "region"] },
      ],
      "local/use-ui-primitives": "error",
      "local/canonical-ui-imports": "error",
      "local/dialog-description": "error",
    },
  },
  {
    files: ["src/Demo.tsx"],
    // Only three named educational effects may change a Button's appearance.
    rules: {
      "shadcn/no-restyle": [
        "error",
        {
          allow: ["layout"],
          contracts: [
            {
              pattern: "^Button$",
              allow: [
                "layout",
                "hover-demo",
                "is-hovered",
                "smooth-demo",
                "selected-demo",
                "morph",
                "morphed",
              ],
            },
          ],
        },
      ],
    },
  },
];
