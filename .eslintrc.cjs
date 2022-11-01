/* eslint-env node */
require('@rushstack/eslint-patch/modern-module-resolution');

module.exports = {
  root: true,
  parserOptions: {
    ecmaVersion: 2022,
    sourceType: 'module',
  },
  extends: [
    'prettier',
    'plugin:vue/vue3-essential',
    'eslint:recommended',
    '@vue/eslint-config-typescript/recommended',
    '@vue/eslint-config-prettier',
  ],
  env: {
    'vue/setup-compiler-macros': true,
    commonjs: true,
  },
  rules: {
    'vue/multi-word-component-names': ['off'],
    'vue/valid-v-slot': ['off'],
    'no-empty': ['error', { allowEmptyCatch: true }],
  },
};
