import js from "@eslint/js";
import globals from "globals";
import tseslint from "typescript-eslint";
import playwrightPlugin from "eslint-plugin-playwright";

// In .mts, we can strictly type the config array
export default tseslint.config(
    // 1. Base JS Rules
    {
        ignores: ["dist/**", "node_modules/**", "playwright-report/**", "test-results/**"]
    },
    js.configs.recommended,

    // 2. Base TS Rules (Type Checked!)
    // In .mts, we must cast this or use the helper to avoid type errors
    ...tseslint.configs.recommendedTypeChecked,

    // 3. Global Settings
    {
        languageOptions: {
            parserOptions: {
                project: true,
                tsconfigRootDir: import.meta.dirname, // Node 20+ feature
            },
            globals: {
                ...globals.node,
                ...globals.browser,
            }
        },
    },

    // 4. MAIN RULES (Global)
    {
        files: ["**/*.ts"],
        rules: {
            "@typescript-eslint/no-explicit-any": "warn",
            "@typescript-eslint/no-floating-promises": "error",
            "@typescript-eslint/no-unused-vars": ["warn", { argsIgnorePattern: "^_" }],
            "no-console": "warn"
        }
    },

    // 5. PLAYWRIGHT TEST SPECIFIC RULES
    {
        files: ["tests/**/*.spec.ts", "tests/**/*.setup.ts"],
        plugins: {
            playwright: playwrightPlugin,
        },
        rules: {
            ...playwrightPlugin.configs['flat/recommended'].rules,
            "no-console": "off",
            "playwright/no-wait-for-timeout": "error",
            "playwright/no-focused-test": "error",
            "playwright/valid-title": "error"
        }
    }
);