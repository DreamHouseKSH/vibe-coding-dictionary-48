import tsParser from "@typescript-eslint/parser";
import a11y from "eslint-plugin-jsx-a11y";
import local from "./scripts/ui-rules.mjs";
export default [
  {
    ignores: [
      "dist/**",
      "node_modules/**",
      "src/components/ui/**",
      "output/**",
    ],
  },
  {
    files: ["src/**/*.tsx", "src/**/*.ts"],
    languageOptions: {
      parser: tsParser,
      parserOptions: { ecmaFeatures: { jsx: true }, sourceType: "module" },
    },
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
];
