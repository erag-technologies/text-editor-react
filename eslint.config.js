import eslint from '@eslint/js';
import prettier from 'eslint-config-prettier/flat';
import globals from 'globals';
import reactHooks from 'eslint-plugin-react-hooks';
import tseslint from 'typescript-eslint';

export default tseslint.config(
    { ignores: ['dist/**', 'node_modules/**'] },
    eslint.configs.recommended,
    ...tseslint.configs.recommended,
    {
        files: ['**/*.{ts,tsx}'],
        languageOptions: {
            globals: { ...globals.browser },
        },
        plugins: { 'react-hooks': reactHooks },
        rules: {
            'react-hooks/rules-of-hooks': 'error',
            'react-hooks/exhaustive-deps': 'warn',
            '@typescript-eslint/no-explicit-any': 'error',
            'no-undef': 'off',
            'no-duplicate-imports': 'error',
            complexity: ['warn', 24],
            'max-lines': ['warn', { max: 700, skipBlankLines: true, skipComments: true }],
        },
    },
    {
        files: ['vite.config.ts'],
        languageOptions: {
            globals: { ...globals.node },
        },
    },
    prettier,
);
