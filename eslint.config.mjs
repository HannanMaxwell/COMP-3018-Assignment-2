import eslint from "@eslint/js";
import tseslint from "typescript-eslint";
import tsParser from "@typescript-eslint/parser";

export default tseslint.config(
    {
        ignores: [
            "**/dist/*",
            "**coverage/*",
            "**.github/*",
            "eslint.config.mjs",
            "jest.config.ts",
        ],
    },
    eslint.configs.recommended,
    ...tseslint.configs.recommended,
    {
        languageOptions: {
            parser: tsParser,
            parserOptions: {
                project: "./tsconfig.json",
                tsconfigRootDir: import.meta.dirname,
            },
        },
    },
    {
        files: ["./**/*.ts", "./**/*.tsx"],
    },
    {
        rules: {
            "@typescript-eslint/explicit-function-return-type": "warn",
            "@typescript-eslint/typedef": [
                "warn",
                {
                    parameter: true,
                    propertyDeclaration: true,
                    variableDeclaration: false,
                    memberVariableDeclaration: true,
                    variableDeclarationIgnoreFunction: true,
                },
            ],
            "@typescript-eslint/no-unused-vars": [
                "error",
                { argsIgnorePattern: "^_" },
            ],
            "@typescript-eslint/no-require-imports": "off",
            "@typescript-eslint/no-var-requires": "off",
            "@typescript-eslint/no-explicit-any": "warn",
            "@typescript-eslint/no-inferrable-types": "off",
        },
    }
);