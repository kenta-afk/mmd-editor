import js from "@eslint/js";
import globals from "globals";
import ts from "typescript-eslint";

export default [
  { ignores: ["dist", "node_modules", "build", ".vite"] },
  {
    files: ["src/**/*.{ts,tsx}"],
    languageOptions: {
      ecmaVersion: 2021,
      sourceType: "module",
      globals: globals.browser,
      parser: ts.parser,
      parserOptions: {
        ecmaFeatures: {
          jsx: true,
        },
      },
    },
    plugins: {
      "@typescript-eslint": ts.plugin,
    },
    rules: {
      ...js.configs.recommended.rules,
      ...ts.configs.recommended[0].rules,
      "@typescript-eslint/no-unused-vars": [
        "error",
        {
          argsIgnorePattern: "^_",
        },
      ],
    },
  },
];
