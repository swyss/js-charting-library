// eslint.config.mjs

import eslintPluginJest from 'eslint-plugin-jest';

export default [
    {
        // Specify the files where Jest globals are available
        files: ['**/*.test.js', '**/*.spec.js', 'tests/**/*.js'],
        plugins: {
            jest: eslintPluginJest,
        },
        languageOptions: {
            globals: {
                // Include Jest globals
                ...eslintPluginJest.environments.globals.globals,
            },
        },
        env: {
            // Set the Jest testing environment
            'jest/globals': true,
        },
        rules: {
            // You can include Jest-specific rules here
            // For example:
            'jest/no-disabled-tests': 'warn',
            'jest/no-focused-tests': 'error',
            'jest/no-identical-title': 'error',
            'jest/prefer-to-have-length': 'warn',
            'jest/valid-expect': 'error',
        },
    },
    {
        // General ESLint configuration for other files
        files: ['**/*.js'],
        ignores: ['node_modules/**'],
        languageOptions: {
            ecmaVersion: 2021,
            sourceType: 'module',
        },
        env: {
            browser: true,
            es2021: true,
            node: true,
        },
        rules: {
            // Your general ESLint rules
            'no-unused-vars': 'warn',
            'no-console': 'off',
            // ... other rules
        },
    },
];
