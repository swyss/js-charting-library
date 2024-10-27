// eslint.config.mjs

import { defineConfig } from 'eslint-define-config';
import eslintPluginJest from 'eslint-plugin-jest';
import eslintPluginPrettier from 'eslint-plugin-prettier';

export default defineConfig([
    // Configuration for Test Files
    {
        files: ['**/*.test.js', '**/*.spec.js', 'tests/**/*.js'],
        plugins: {
            jest: eslintPluginJest,
            prettier: eslintPluginPrettier,
        },
        languageOptions: {
            ecmaVersion: 'latest',
            sourceType: 'module',
            globals: {
                describe: 'readonly',
                it: 'readonly',
                expect: 'readonly',
                beforeEach: 'readonly',
                afterEach: 'readonly',
                // Add more Jest globals if needed
            },
        },
        rules: {
            // Jest-specific rules
            'jest/no-disabled-tests': 'warn',
            'jest/no-focused-tests': 'error',
            'jest/no-identical-title': 'error',
            'jest/prefer-to-have-length': 'warn',
            'jest/valid-expect': 'error',

            // Prettier integration
            'prettier/prettier': 'error',

            // General ESLint rules
            'no-unused-vars': 'warn',
            'no-console': 'off',
            'semi': ['error', 'always'],
            'quotes': ['error', 'single'],
            // Add more rules as needed
        },
    },

    // Configuration for All JavaScript Files
    {
        files: ['**/*.js'],
        ignores: ['node_modules/**'],
        plugins: {
            prettier: eslintPluginPrettier,
        },
        languageOptions: {
            ecmaVersion: 'latest',
            sourceType: 'module',
            globals: {
                window: 'readonly',
                document: 'readonly',
                module: 'readonly',
                require: 'readonly',
                // Add more globals as needed
            },
        },
        rules: {
            // Prettier integration
            'prettier/prettier': 'error',

            // General ESLint rules
            'no-unused-vars': 'warn',
            'no-console': 'off',
            'semi': ['error', 'always'],
            'quotes': ['error', 'single'],
            // Add more rules as needed
        },
    },
]);
