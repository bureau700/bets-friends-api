module.exports = {
  root: true,
  parser: '@typescript-eslint/parser',
  parserOptions: {
    ecmaVersion: 2018,
    sourceType: 'module',
  },
  extends: [
    'airbnb-base',
    'plugin:@typescript-eslint/recommended',
    'prettier',
    'prettier/@typescript-eslint',
  ],
  plugins: [
    'import',
    'prettier',
    'promise',
    '@typescript-eslint',
    'jest',
    'graphql',
  ],
  globals: {
    __DEV__: true,
    fetch: true,
  },
  rules: {
    'prettier/prettier': ['error'],
    'sort-imports': 'off',
    'import/order': 'warn',
    'max-classes-per-file': 'warn',
    'no-plusplus': 'off',
    'import/prefer-default-export': 'off',
    'class-methods-use-this': 'off',
    'object-curly-spacing': 'error',
    'no-useless-constructor': 'off',

    // TypeScript
    '@typescript-eslint/camelcase': 'off',
    '@typescript-eslint/explicit-function-return-type': 'off',
    '@typescript-eslint/explicit-member-accessibility': 'off',
    '@typescript-eslint/interface-name-prefix': 'off',
    '@typescript-eslint/no-unused-vars': 'error',
    '@typescript-eslint/no-object-literal-type-assertion': 'off',
    '@typescript-eslint/prefer-interface': 'off',
    '@typescript-eslint/no-empty-function': 'off',
    '@typescript-eslint/no-useless-constructor': 'error',

    // Jest
    'jest/no-disabled-tests': 'warn',
    'jest/no-focused-tests': 'error',
    'jest/no-identical-title': 'error',
    'jest/prefer-to-have-length': 'warn',
    'jest/valid-expect': 'error',

    // Import
    // FIXME
    'import/no-unresolved': 'off',
    'import/extensions': 'off',
  },
  settings: {
    'import/resolver': {
      node: {
        extensions: ['.ts', '.jsx', '.tsx', '.json', '.js'],
      },
    },
    'import/extensions': ['.ts', '.mjs', '.jsx', '.tsx'],
    'import/parsers': {
      '@typescript-eslint/parser': ['.ts', '.tsx'],
    },
  },
  env: {
    'jest/globals': true,
  },
  overrides: [
    {
      files: ['__tests__/**/*.ts'],
      rules: {
        '@typescript-eslint/no-non-null-assertion': 'off',
        '@typescript-eslint/no-explicit-any': 'off',
        '@typescript-eslint/ban-types': 'off',
        'no-param-reassign': 'off',
        'no-underscore-dangle': 'off',
      },
    },
  ],
};
