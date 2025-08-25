module.exports = {
  parser: '@typescript-eslint/parser',
  env: {
    node: true,
    browser: true,
    es6: true,
    jest: true
  },
  extends: ['eslint:recommended'],
  parserOptions: {
    ecmaVersion: 2020,
    sourceType: 'module'
  },
  rules: {
    // Basic ESLint rules
    'no-console': 'warn',
    'no-unused-vars': 'off', // TypeScript handles this
    'no-undef': 'off' // TypeScript handles this
  },
  ignorePatterns: [
    'dist/',
    'node_modules/',
    'coverage/',
    '*.js',
    '!.eslintrc.js'
  ]
};
