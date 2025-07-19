import js from '@eslint/js';
import tseslint from 'typescript-eslint';

export default [
  js.configs.recommended,
  ...tseslint.configs.recommended,
  {
    files: ['**/*.ts'],
    languageOptions: {
      parser: tseslint.parser,
    },
    rules: {
      'no-console': 'warn',
      '@typescript-eslint/no-explicit-any': 'off',
      '@typescript-eslint/no-require-imports': 'off',
      'no-trailing-spaces': 'error',
      'keyword-spacing': ['error', { before: true, after: true }],
      'comma-spacing': ['error', { before: false, after: true }],
      'object-curly-spacing': ['error', 'always'],
      'semi-spacing': ['error', { before: false, after: true }],
      'indent': ['error', 2],
      'space-before-function-paren': ['error', {
      anonymous: 'always', // Cho phép async (user) => {...}
      named: 'never',
      asyncArrow: 'always'
    }]
    },
  },
];
