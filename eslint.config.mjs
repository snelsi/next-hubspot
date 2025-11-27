import eslint from "@eslint/js";
import tseslint from "typescript-eslint";
import reactPlugin from "eslint-plugin-react";
import reactHooks from "eslint-plugin-react-hooks";
import eslintConfigPrettier from "eslint-config-prettier";

const eslintConfig = tseslint.config(
  eslint.configs.recommended,
  tseslint.configs.recommended,
  reactPlugin.configs.flat.recommended,
  reactPlugin.configs.flat["jsx-runtime"],
  reactHooks.configs.flat.recommended,
  eslintConfigPrettier,
  {
    settings: {
      react: {
        version: "detect",
      },
    },
  },
);

export default eslintConfig;
